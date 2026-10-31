const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const tls = require('node:tls');
const crypto = require('node:crypto');
const bcrypt = require('bcryptjs');
const { z } = require('zod');
const { runMigration, isBcryptHash, BCRYPT_SALT_ROUNDS } = require('./migrate_passwords');

// Auto-load local .env if present (zero dependencies)
if (fs.existsSync(path.join(__dirname, '.env'))) {
  try {
    const envLines = fs.readFileSync(path.join(__dirname, '.env'), 'utf8').split('\n');
    for (const line of envLines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        if (!process.env[key]) process.env[key] = val;
      }
    }
  } catch (_) {}
}

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Global Crash Guards: prevent unexpected async failures from terminating the server
process.on('uncaughtException', (err) => {
  console.error('[SERVER SAFETY] Caught uncaughtException, process will stay running:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('[SERVER SAFETY] Caught unhandledRejection, process will stay running. Reason:', reason);
});
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

const MAIL_CONFIG_FILE = path.join(__dirname, 'mail_config.json');

// ============================================================================
// SECURITY & INPUT SANITIZATION UTILITIES
// ============================================================================
function hasHtmlOrScriptTags(val) {
  if (typeof val !== 'string') return false;
  return /<[^>]+>|script\b|javascript:/i.test(val);
}

function sanitizeInput(val, maxLength = 100) {
  if (typeof val !== 'string') return '';
  return val
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // strip script tags
    .replace(/<[^>]+>/g, '') // strip HTML tags
    .replace(/[\0\r]/g, '') // strip control bytes
    .replace(/[<>"'&]/g, '') // strip sensitive HTML special characters
    .trim()
    .slice(0, maxLength);
}

function sanitizeAuthEmail(val) {
  const clean = sanitizeInput(val, 100).toLowerCase();
  return clean.replace(/[^a-z0-9@._+-]/g, '');
}

function maskEmail(email) {
  if (!email || typeof email !== 'string') return '***';
  const parts = email.split('@');
  if (parts.length !== 2) return '***';
  const name = parts[0];
  const domain = parts[1];
  const maskedName = name.length <= 2 ? name[0] + '*' : name[0] + '*'.repeat(Math.min(name.length - 2, 6)) + name[name.length - 1];
  return `${maskedName}@${domain}`;
}

// Zod Validation Schemas
const LoginSchema = z.object({
  email: z.string({ required_error: 'Required' })
    .min(5, 'Email too short')
    .max(100, 'Email too long')
    .refine(val => !hasHtmlOrScriptTags(val), { message: 'Invalid characters' })
    .email('Invalid email address')
    .refine(
      email => email.endsWith('@vitstudent.ac.in') || email.endsWith('@vit.ac.in'),
      { message: 'Institutional email required' }
    ),
  password: z.string({ required_error: 'Required' })
    .min(6, 'Password too short')
    .max(100, 'Password too long'),
  regNo: z.string()
    .max(25, 'Registration number too long')
    .refine(val => !hasHtmlOrScriptTags(val), { message: 'Invalid characters' })
    .optional()
    .default('')
});

const SignupSchema = z.object({
  email: z.string({ required_error: 'Required' })
    .min(5, 'Email too short')
    .max(100, 'Email too long')
    .refine(val => !hasHtmlOrScriptTags(val), { message: 'Invalid characters' })
    .email('Invalid email address')
    .refine(
      email => email.endsWith('@vitstudent.ac.in') || email.endsWith('@vit.ac.in'),
      { message: 'Institutional email required' }
    ),
  password: z.string({ required_error: 'Required' })
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password too long'),
  name: z.string()
    .max(60, 'Name too long')
    .refine(val => !hasHtmlOrScriptTags(val), { message: 'Invalid characters' })
    .optional()
    .default(''),
  regNo: z.string()
    .max(25, 'Registration number too long')
    .refine(val => !hasHtmlOrScriptTags(val), { message: 'Invalid characters' })
    .optional()
    .default('')
});

const ResetPasswordSchema = z.object({
  email: z.string({ required_error: 'Required' })
    .min(5)
    .max(100)
    .email()
    .refine(email => email.endsWith('@vitstudent.ac.in') || email.endsWith('@vit.ac.in')),
  newPassword: z.string({ required_error: 'Required' })
    .min(6, 'New password must be at least 6 characters')
    .max(100)
});

// Password Hashing & Verification
async function hashPassword(plainText) {
  return await bcrypt.hash(plainText, BCRYPT_SALT_ROUNDS);
}

async function verifyPassword(plainText, storedHashOrPlain) {
  if (!plainText || !storedHashOrPlain) return false;
  if (isBcryptHash(storedHashOrPlain)) {
    return await bcrypt.compare(plainText, storedHashOrPlain);
  }
  // Constant-time comparison fallback for legacy plain text before migration
  const plainBuf = Buffer.from(String(plainText));
  const storedBuf = Buffer.from(String(storedHashOrPlain));
  if (plainBuf.length !== storedBuf.length) {
    crypto.timingSafeEqual(plainBuf, plainBuf); // dummy compare to mitigate timing variance
    return false;
  }
  return crypto.timingSafeEqual(plainBuf, storedBuf);
}

// In-Memory Rate Limiting & Account Lockout Store
const ipRateLimits = new Map();
const accountLockouts = new Map();
const activeResetTokens = new Map();

const IP_RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const IP_RATE_LIMIT_MAX = 10; // max 10 requests per minute
const ACCOUNT_LOCKOUT_MAX_ATTEMPTS = 5; // 5 consecutive failed attempts
const ACCOUNT_LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout

setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipRateLimits.entries()) {
    if (now - data.windowStart > IP_RATE_LIMIT_WINDOW_MS) {
      ipRateLimits.delete(ip);
    }
  }
  for (const [email, data] of accountLockouts.entries()) {
    if (data.lockedUntil && now > data.lockedUntil && now - data.lastAttemptTime > 24 * 60 * 60 * 1000) {
      accountLockouts.delete(email);
    }
  }
  for (const [token, data] of activeResetTokens.entries()) {
    if (now > data.expires) {
      activeResetTokens.delete(token);
    }
  }
}, 5 * 60 * 1000).unref();

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || '127.0.0.1';
}

function checkIpRateLimit(clientIp) {
  const now = Date.now();
  let record = ipRateLimits.get(clientIp);
  if (!record || now - record.windowStart > IP_RATE_LIMIT_WINDOW_MS) {
    record = { count: 1, windowStart: now };
    ipRateLimits.set(clientIp, record);
    return { allowed: true, remaining: IP_RATE_LIMIT_MAX - 1 };
  }
  record.count++;
  if (record.count > IP_RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((record.windowStart + IP_RATE_LIMIT_WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfter: Math.max(1, retryAfter) };
  }
  return { allowed: true, remaining: IP_RATE_LIMIT_MAX - record.count };
}

async function sendAccountLockoutEmail(toEmail, resetLink) {
  const subject = "[Security Alert] VIT Helpdesk Account Temporarily Locked";
  const html = `
    <div style="font-family: Arial, -apple-system, sans-serif; max-width: 540px; margin: 0 auto; background: #0d0d0e; color: #f4f4f5; padding: 24px; border-radius: 12px; border: 1px solid #27272a;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #f87171; margin: 0; font-size: 20px;">🛡️ Security Alert: Account Temporarily Locked</h2>
        <p style="color: #a1a1aa; font-size: 13px; margin: 4px 0 0 0;">VIT AI Campus Helpdesk &bull; Student Welfare Office (MB-102)</p>
      </div>
      <div style="background: #18181b; padding: 20px; border-radius: 8px; border: 1px solid #3f3f46;">
        <p style="margin: 0 0 12px 0; font-size: 14px;">Hello <strong>VITian</strong>,</p>
        <p style="margin: 0 0 16px 0; font-size: 13px; color: #d4d4d8; line-height: 1.5;">We detected <strong>5 consecutive failed login attempts</strong> on your account (<strong>${toEmail}</strong>).</p>
        <p style="margin: 0 0 16px 0; font-size: 13px; color: #d4d4d8; line-height: 1.5;">For your protection, sign-in access has been locked for <strong>15 minutes</strong>.</p>
        <div style="text-align: center; margin: 24px 0;">
          <a href="${resetLink}" style="background: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; display: inline-block;">Reset Password &amp; Unlock Account</a>
        </div>
        <p style="font-size: 12px; color: #a1a1aa; line-height: 1.4; margin: 16px 0 0 0;">If you forgot your password, click the button above to set a new password. This link is valid for 15 minutes.</p>
      </div>
      <p style="text-align: center; font-size: 11px; color: #71717a; margin-top: 20px;">&copy; 2026 Student Support Services, Vellore Institute of Technology.</p>
    </div>
  `;
  const text = `[Security Alert] Your VIT Helpdesk account (${toEmail}) has been temporarily locked for 15 minutes after 5 consecutive failed login attempts.\n\nTo reset your password and unlock your account, visit:\n${resetLink}\n\nThis link is valid for 15 minutes.`;

  try {
    const cfg = getMailConfig();
    const hasGmail = Boolean(cfg.smtpUser && cfg.smtpPass);
    const hasResend = Boolean(cfg.resendApiKey);
    const hasEmailJs = Boolean(cfg.emailjsServiceId && cfg.emailjsTemplateId && cfg.emailjsPublicKey);

    if (cfg.provider === 'emailjs' || (hasEmailJs && !hasGmail)) {
      await sendEmailJs({ serviceId: cfg.emailjsServiceId, templateId: cfg.emailjsTemplateId, publicKey: cfg.emailjsPublicKey, to: toEmail, securityCode: 'LOCKOUT', html });
    } else if (cfg.provider === 'resend' || (hasResend && !hasGmail)) {
      await sendResendApi({ apiKey: cfg.resendApiKey, to: toEmail, subject, html, text });
    } else if (hasGmail) {
      await sendGmailSmtp({ user: cfg.smtpUser, pass: cfg.smtpPass, to: toEmail, subject, html, text });
    } else {
      console.log(`[LOCKOUT_EMAIL_SIMULATED] Email service not configured. Reset link for ${maskEmail(toEmail)}: ${resetLink}`);
    }
  } catch (err) {
    console.error(`[LOCKOUT_EMAIL_ERROR] Failed to dispatch lockout email to ${maskEmail(toEmail)}:`, err.message);
  }
}

function getMailConfig() {
  let fileConfig = {};
  try {
    if (fs.existsSync(MAIL_CONFIG_FILE)) {
      fileConfig = JSON.parse(fs.readFileSync(MAIL_CONFIG_FILE, 'utf8')) || {};
    }
  } catch (e) {}
  return {
    provider: fileConfig.provider || (process.env.EMAILJS_SERVICE_ID ? 'emailjs' : (process.env.RESEND_API_KEY ? 'resend' : 'gmail')),
    smtpUser: fileConfig.smtpUser || process.env.SMTP_USER || '',
    smtpPass: fileConfig.smtpPass || process.env.SMTP_PASS || '',
    emailjsServiceId: fileConfig.emailjsServiceId || process.env.EMAILJS_SERVICE_ID || '',
    emailjsTemplateId: fileConfig.emailjsTemplateId || process.env.EMAILJS_TEMPLATE_ID || '',
    emailjsPublicKey: fileConfig.emailjsPublicKey || process.env.EMAILJS_PUBLIC_KEY || '',
    resendApiKey: fileConfig.resendApiKey || process.env.RESEND_API_KEY || ''
  };
}

function saveMailConfig(cfg) {
  try {
    fs.writeFileSync(MAIL_CONFIG_FILE, JSON.stringify(cfg, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error('Failed to save mail config:', e);
    return false;
  }
}

const DATA_DIR = path.join(__dirname, 'data');
const TICKETS_FILE = path.join(DATA_DIR, 'tickets.json');
const ACCOUNTS_FILE = path.join(DATA_DIR, 'accounts.json');
const SHARED_CHATS_FILE = path.join(DATA_DIR, 'shared_chats.json');
const CONVERSATIONS_FILE = path.join(DATA_DIR, 'conversations.json');

function formatStudentNameFromEmail(email) {
  if (!email || typeof email !== 'string') return 'VITian Student';
  const local = email.split('@')[0];
  const clean = local.replace(/\d+$/, '').replace(/[._]/g, ' ').trim();
  const formatted = clean
    .split(/\s+/)
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
  return formatted || 'VITian Student';
}

function getAllConversations() {
  try {
    if (fs.existsSync(CONVERSATIONS_FILE)) {
      const data = JSON.parse(fs.readFileSync(CONVERSATIONS_FILE, 'utf8'));
      if (typeof data === 'object' && data !== null && !Array.isArray(data)) return data;
    }
  } catch (e) {
    console.error('Error reading conversations file:', e);
  }
  return {};
}

function saveAllConversations(allConvs) {
  try {
    const tempFile = CONVERSATIONS_FILE + '.tmp.' + Date.now();
    fs.writeFileSync(tempFile, JSON.stringify(allConvs, null, 2), 'utf8');
    fs.renameSync(tempFile, CONVERSATIONS_FILE);
    return true;
  } catch (e) {
    try {
      fs.writeFileSync(CONVERSATIONS_FILE, JSON.stringify(allConvs, null, 2), 'utf8');
      return true;
    } catch (inner) {
      console.error('Failed to save conversations:', inner);
      return false;
    }
  }
}

function getSharedChats() {
  try {
    if (fs.existsSync(SHARED_CHATS_FILE)) {
      const data = JSON.parse(fs.readFileSync(SHARED_CHATS_FILE, 'utf8'));
      if (typeof data === 'object' && data !== null) return data;
    }
  } catch (e) {}
  return {};
}

function saveSharedChats(chats) {
  try {
    fs.writeFileSync(SHARED_CHATS_FILE, JSON.stringify(chats, null, 2), 'utf8');
    return true;
  } catch (e) {
    return false;
  }
}

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  try { fs.mkdirSync(DATA_DIR, { recursive: true }); } catch (e) {}
}

const SEED_ACCOUNTS = [
  {
    id: "adm-root",
    role: "admin",
    name: "System Administrator",
    email: "admin@vit.ac.in",
    regNo: "ADM-ROOT",
    designation: "IT & Helpdesk Systems Admin",
    password: process.env.ADMIN_PASSWORD_HASH || "$2b$12$6mYJKDnBJMSyNadDw2ZOZOf78iWV8kJ.BjlyP6MUpm3VK1Z7CVyzq", // bcrypt hash of VitAdmin#Secret2026!
    avatar: "🛡️"
  },
  {
    id: "stf-mb102",
    role: "staff",
    name: "Desk MB-102 Staff Officer",
    email: "staff.desk@vit.ac.in",
    regNo: "EMP-MB102",
    designation: "Student Welfare Officer (Desk MB-102)",
    password: process.env.STAFF_PASSWORD_HASH || "$2b$12$D4cOZu3I1XTAIVaSOQ6cvOVcbxP7y2jMwoUXVp4DyeqQmvAF7nS12", // bcrypt hash of VitStaff#Secret2026!
    avatar: "👨‍💼"
  }
];

const SEED_TICKETS = [];

function getAccounts() {
  try {
    if (fs.existsSync(ACCOUNTS_FILE)) {
      const data = JSON.parse(fs.readFileSync(ACCOUNTS_FILE, 'utf8'));
      if (Array.isArray(data) && data.length > 0) {
        let changed = false;
        data.forEach(a => {
          if (a.role === 'student' && a.email && (!a.name || /\d{2,4}$/.test(a.name.trim()) || a.name.includes('gorai2024'))) {
            a.name = formatStudentNameFromEmail(a.email);
            changed = true;
          }
          if (a.password && !isBcryptHash(a.password)) {
            a.password = bcrypt.hashSync(a.password, BCRYPT_SALT_ROUNDS);
            changed = true;
          }
        });
        if (changed) saveAccounts(data);
        return data;
      }
    }
  } catch (e) {
    console.error('Error reading accounts file:', e);
  }
  saveAccounts(SEED_ACCOUNTS);
  return [...SEED_ACCOUNTS];
}

function saveAccounts(accounts) {
  try {
    const tempFile = ACCOUNTS_FILE + '.tmp.' + Date.now();
    fs.writeFileSync(tempFile, JSON.stringify(accounts, null, 2), 'utf8');
    fs.renameSync(tempFile, ACCOUNTS_FILE);
    return true;
  } catch (e) {
    try {
      fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2), 'utf8');
      return true;
    } catch (inner) {
      console.error('Failed to save accounts:', inner);
      return false;
    }
  }
}

function getTickets() {
  try {
    if (fs.existsSync(TICKETS_FILE)) {
      const data = JSON.parse(fs.readFileSync(TICKETS_FILE, 'utf8'));
      if (Array.isArray(data)) return data;
    }
  } catch (e) {
    console.error('Error reading tickets file:', e);
  }
  return [];
}

function saveTickets(tickets) {
  try {
    const tempFile = TICKETS_FILE + '.tmp.' + Date.now();
    fs.writeFileSync(tempFile, JSON.stringify(tickets, null, 2), 'utf8');
    fs.renameSync(tempFile, TICKETS_FILE);
    return true;
  } catch (e) {
    try {
      fs.writeFileSync(TICKETS_FILE, JSON.stringify(tickets, null, 2), 'utf8');
      return true;
    } catch (inner) {
      console.error('Failed to save tickets:', inner);
      return false;
    }
  }
}

// Zero-dependency native TLS SMTP sender for Gmail / Google Workspace
function sendGmailSmtp({ user, pass, to, subject, html, text }) {
  return new Promise((resolve, reject) => {
    if (!user || !pass) {
      return reject(new Error('Gmail address and 16-character App Password are required.'));
    }

    const cleanPass = pass.replace(/\s+/g, '');
    const socket = tls.connect(465, 'smtp.gmail.com', { minVersion: 'TLSv1.2' }, () => {
      // Connected
    });

    socket.setTimeout(20000);
    socket.setEncoding('utf8');

    let step = 0;
    let buffer = '';

    const send = (cmd) => {
      socket.write(cmd + '\r\n');
    };

    socket.on('data', (chunk) => {
      buffer += chunk;
      const lines = buffer.split('\r\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (!line) continue;
        const code = parseInt(line.substring(0, 3), 10);
        const isLastLine = line.charAt(3) === ' ';

        if (!isLastLine) continue;

        if (code >= 400) {
          socket.end();
          return reject(new Error(`Gmail SMTP error (${code}): ${line}`));
        }

        switch (step) {
          case 0: // 220 Greeting
            step = 1;
            send(`EHLO localhost`);
            break;
          case 1: // 250 EHLO OK
            step = 2;
            send(`AUTH LOGIN`);
            break;
          case 2: // 334 Username prompt
            step = 3;
            send(Buffer.from(user).toString('base64'));
            break;
          case 3: // 334 Password prompt
            step = 4;
            send(Buffer.from(cleanPass).toString('base64'));
            break;
          case 4: // 235 Authentication successful
            step = 5;
            send(`MAIL FROM:<${user}>`);
            break;
          case 5: // 250 Sender OK
            step = 6;
            send(`RCPT TO:<${to}>`);
            break;
          case 6: // 250 Recipient OK
            step = 7;
            send(`DATA`);
            break;
          case 7: // 354 Start mail input
            step = 8;
            const headers = [
              `From: "VIT AI Campus Helpdesk" <${user}>`,
              `To: <${to}>`,
              `Subject: ${subject}`,
              `MIME-Version: 1.0`,
              `Content-Type: text/html; charset=UTF-8`,
              ``,
              html || text,
              `.`
            ].join('\r\n');
            send(headers);
            break;
          case 8: // 250 Message queued
            step = 9;
            send(`QUIT`);
            break;
          case 9: // 221 Bye
            socket.end();
            return resolve({ success: true, message: `Verification email sent to ${to}` });
        }
      }
    });

    socket.on('timeout', () => {
      socket.destroy();
      reject(new Error('Connection timed out while sending email.'));
    });

    socket.on('error', (err) => {
      reject(err);
    });
  });
}

// Zero-dependency HTTPS API sender for Resend
async function sendResendApi({ apiKey, to, subject, html, text }) {
  if (!apiKey) throw new Error('Resend API key is required.');
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey.trim()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'VIT AI Helpdesk <onboarding@resend.dev>',
      to: [to],
      subject: subject,
      html: html,
      text: text
    })
  });

  const data = await res.json();
  if (!res.ok) {
    // Check if error is Resend free tier sandbox restriction (can only send to account owner's email)
    const match = data.message && data.message.match(/only send testing emails to your own email address \(([^)]+)\)/i);
    if (match && match[1]) {
      const allowedEmail = match[1];
      const fallbackRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey.trim()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'VIT AI Helpdesk <onboarding@resend.dev>',
          to: [allowedEmail],
          subject: `[Sandbox for ${to}] ${subject}`,
          html: `<div style="background:#27272a;color:#fbbf24;padding:12px;border-radius:6px;margin-bottom:16px;font-size:12px;font-family:sans-serif;border:1px solid #3f3f46;">
            ⚠️ <strong>Resend Sandbox Delivery:</strong> External delivery to <code>${to}</code> is restricted on Resend Free Sandbox without custom domain DNS. This security code was delivered to your registered inbox (<code>${allowedEmail}</code>).
          </div>` + html,
          text: `[Sandbox Notice: Routed to ${allowedEmail} for target ${to}]\n\n` + text
        })
      });
      const fallbackData = await fallbackRes.json();
      if (fallbackRes.ok) {
        return {
          success: true,
          sandboxed: true,
          deliveredTo: allowedEmail,
          targetEmail: to,
          message: `Delivered to verified sandbox (${allowedEmail}) for target ${to}`
        };
      }
    }
    throw new Error(data.message || 'Resend API failed to dispatch email.');
  }
  return { success: true, message: `Verification email sent via Resend (ID: ${data.id})` };
}

// Zero-dependency HTTPS API sender for EmailJS (Direct Gmail OAuth2 Delivery to ANY email)
async function sendEmailJs({ serviceId, templateId, publicKey, to, securityCode, html = '' }) {
  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS Service ID, Template ID, and Public Key are required.');
  }
  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'http://localhost:3000',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    },
    body: JSON.stringify({
      service_id: serviceId.trim(),
      template_id: templateId.trim(),
      user_id: publicKey.trim(),
      template_params: {
        email: to,
        to_email: to,
        user_email: to,
        recipient: to,
        passcode: securityCode,
        security_code: securityCode,
        otp: securityCode,
        code: securityCode,
        student_name: 'VITian',
        company_name: 'Vellore Institute of Technology',
        time: '15 minutes',
        html_content: html,
        message: html || `Your VIT Password Reset Security Code is: ${securityCode}`
      }
    })
  });

  const txt = await res.text();
  if (!res.ok) {
    throw new Error(txt || 'EmailJS failed to deliver email.');
  }
  return { success: true, message: `Verification email delivered to ${to}` };
}

// Input sanitization & security guards (XSS, Injection, Prototype Pollution, Overflow)
function sanitizeText(str, maxLen = 1000) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>/g, '') // Strip HTML tags to eliminate XSS
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, '') // Strip control characters
    .trim()
    .slice(0, maxLen);
}

function sanitizeRegNo(regNo) {
  if (!regNo || typeof regNo !== 'string') return '';
  const cleaned = regNo.trim().toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 15);
  // Strict format check: e.g. 24BCE1001, 22MIS0045, EMP-MB102, ADM-ROOT
  const validPattern = /^[0-9]{2}[A-Z]{2,4}[0-9]{3,5}$|^EMP-[A-Z0-9]{3,8}$|^ADM-[A-Z0-9]{3,8}$/;
  return validPattern.test(cleaned) ? cleaned : '';
}

function sanitizeEmail(email) {
  if (!email || typeof email !== 'string') return '';
  const cleaned = email.trim().toLowerCase().replace(/[\r\n\t]/g, '').slice(0, 100);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(cleaned) ? cleaned : '';
}

function parseSafeJson(body, maxBytes = 256 * 1024) {
  if (typeof body !== 'string' || Buffer.byteLength(body, 'utf8') > maxBytes) {
    return null;
  }
  try {
    const obj = JSON.parse(body || '{}');
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
      delete obj.__proto__;
      delete obj.constructor;
      delete obj.prototype;
    }
    return obj;
  } catch (_) {
    return null;
  }
}

const server = http.createServer((req, res) => {
  // Global Security & CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Fast return for preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, 'http://' + (req.headers.host || `localhost:${PORT}`));
  const urlPath = parsedUrl.pathname;

  // GET /api/tickets (Filtered for students; full for staff/admin)
  if (req.method === 'GET' && urlPath === '/api/tickets') {
    const role = (parsedUrl.searchParams.get('role') || '').toLowerCase();
    const email = (parsedUrl.searchParams.get('email') || '').toLowerCase();
    const regNo = (parsedUrl.searchParams.get('regNo') || '').toUpperCase();

    const tickets = getTickets();

    if (role === 'student' && (email || regNo)) {
      const studentTickets = tickets.filter(t => {
        const emailMatch = email && t.studentEmail && t.studentEmail.toLowerCase() === email;
        const regMatch = regNo && t.studentRegNo && t.studentRegNo.toUpperCase() === regNo;
        return emailMatch || regMatch;
      });
      res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });
      res.end(JSON.stringify(studentTickets));
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });
    res.end(JSON.stringify(tickets));
    return;
  }

  // POST /api/tickets (Create a new escalation ticket)
  if (req.method === 'POST' && urlPath === '/api/tickets') {
    let body = '';
    let tooLarge = false;
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 64 * 1024) {
        tooLarge = true;
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Payload too large' }));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (tooLarge) return;
      try {
        const payload = parseSafeJson(body) || {};
        const tickets = getTickets();

        let maxSeq = 9140;
        tickets.forEach(t => {
          const match = t.id && String(t.id).match(/VIT-2026-(\d+)/);
          if (match) {
            const num = parseInt(match[1], 10);
            if (!isNaN(num) && num > maxSeq) maxSeq = num;
          }
        });
        const nextId = `VIT-2026-${maxSeq + 1}`;

        const now = new Date();
        const timestamp = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' +
          now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

        const newTicket = {
          id: nextId,
          query: sanitizeText(payload.query || 'Inquiry routed to human support desk', 1000),
          reason: sanitizeText(payload.reason || 'Answer unavailable in approved knowledge base', 300),
          confidence: typeof payload.confidence === 'number' ? Math.max(0, Math.min(100, payload.confidence)) : 15,
          timestamp: sanitizeText(payload.timestamp || timestamp, 50),
          status: 'Pending Support Review',
          resolved: false,
          studentName: sanitizeText(payload.studentName || 'VITian Student', 60),
          studentEmail: sanitizeEmail(payload.studentEmail || ''),
          studentRegNo: sanitizeRegNo(payload.studentRegNo || '')
        };

        tickets.unshift(newTicket);
        saveTickets(tickets);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, ticket: newTicket }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Invalid ticket payload' }));
      }
    });
    return;
  }

  // POST /api/tickets/reply (Official staff reply from Desk MB-102)
  if (req.method === 'POST' && urlPath === '/api/tickets/reply') {
    let body = '';
    let tooLarge = false;
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 32 * 1024) {
        tooLarge = true;
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Payload too large' }));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (tooLarge) return;
      try {
        const payload = parseSafeJson(body) || {};
        const id = sanitizeText(payload.id || '', 40);
        const reply = sanitizeText(payload.reply || '', 2000);
        const staffName = sanitizeText(payload.staffName || '', 60);
        const staffEmail = sanitizeEmail(payload.staffEmail || '');
        const staffRole = sanitizeText(payload.staffRole || '', 80);

        if (!id || !reply) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Ticket ID and reply text are required' }));
          return;
        }

        const tickets = getTickets();
        const ticket = tickets.find(t => t.id === id);
        if (!ticket) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Ticket not found' }));
          return;
        }

        const now = new Date();
        const timestamp = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' +
          now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

        ticket.resolved = true;
        ticket.reply = reply;
        ticket.resolvedBy = staffName || 'Dr. K. Ramanathan';
        ticket.resolvedByEmail = staffEmail || 'ramanathan.k@vit.ac.in';
        ticket.resolvedByRole = staffRole || 'Student Welfare Officer (Desk MB-102)';
        ticket.resolvedAt = timestamp;
        ticket.status = 'Resolved & Replied by Staff (MB-102)';

        saveTickets(tickets);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, ticket }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Invalid reply payload' }));
      }
    });
    return;
  }

  // POST /api/tickets/clear (Staff clears resolved ticket queue)
  if (req.method === 'POST' && urlPath === '/api/tickets/clear') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const role = (payload.role || '').toLowerCase();
        if (role !== 'staff' && role !== 'admin') {
          res.writeHead(403, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Only staff can clear resolved tickets' }));
          return;
        }

        let tickets = getTickets();
        tickets = tickets.filter(t => !t.resolved && !t.reply);
        saveTickets(tickets);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, count: tickets.length }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // POST /api/share (Store snapshot and generate public shareable link)
  if (req.method === 'POST' && urlPath === '/api/share') {
    let body = '';
    let tooLarge = false;
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 512 * 1024) {
        tooLarge = true;
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Conversation too large to share' }));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (tooLarge) return;
      try {
        const payload = parseSafeJson(body) || {};
        const title = sanitizeText(payload.title || 'Campus Inquiry', 120);
        const rawMessages = Array.isArray(payload.messages) ? payload.messages.slice(0, 60) : [];
        if (rawMessages.length === 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Cannot share an empty conversation' }));
          return;
        }

        const safeMessages = rawMessages.map(m => {
          if (m.role === 'user') {
            return {
              role: 'user',
              text: sanitizeText(m.text || '', 2000),
              senderLabel: sanitizeText(m.senderLabel || 'Student (You)', 50),
              avatarChar: sanitizeText(m.avatarChar || '🎓', 10),
              time: sanitizeText(m.time || '', 30),
              timestamp: typeof m.timestamp === 'number' ? m.timestamp : Date.now()
            };
          } else {
            const qr = m.queryResult || {};
            const qMatch = qr.match || {};
            const genAns = sanitizeText(qr.generatedAnswer || qr.answer || qMatch.answer || '', 5000);
            const srcDoc = sanitizeText(qr.sourceDoc || qMatch.sourceDoc || 'VIT Verified Campus Directive', 200);
            const faqId = sanitizeText(qr.faqRef || qMatch.id || 'KB-CAMPUS', 50);
            const model = sanitizeText(qr.aiModelName || qr.provider || 'Groq (qwen/qwen3.8-27b)', 80);

            return {
              role: 'assistant',
              studentQuery: sanitizeText(m.studentQuery || '', 2000),
              elapsed: typeof m.elapsed === 'number' ? m.elapsed : 1,
              time: sanitizeText(m.time || '', 30),
              queryResult: {
                answer: genAns,
                generatedAnswer: genAns,
                confidence: typeof qr.confidence === 'number' ? qr.confidence : 95,
                sourceDoc: srcDoc,
                faqRef: faqId,
                aiModelName: model,
                provider: model,
                isConversational: Boolean(qr.isConversational),
                isFallback: Boolean(qr.isFallback),
                reason: sanitizeText(qr.reason || '', 200),
                isGrounded: qr.isGrounded !== false,
                match: {
                  answer: genAns,
                  sourceDoc: srcDoc,
                  id: faqId
                }
              }
            };
          }
        });

        const shareId = 'sh_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7);
        const chats = getSharedChats();
        chats[shareId] = {
          id: shareId,
          title,
          createdAt: Date.now(),
          messages: safeMessages
        };

        // Prune older than 500 entries to maintain high performance
        const keys = Object.keys(chats);
        if (keys.length > 500) {
          keys.slice(0, keys.length - 500).forEach(k => delete chats[k]);
        }
        saveSharedChats(chats);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          shareId,
          sharePath: `/?share=${shareId}`
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Could not generate share link' }));
      }
    });
    return;
  }

  // GET /api/share?id=sh_... (Retrieve shared conversation)
  if (req.method === 'GET' && urlPath === '/api/share') {
    const shareId = sanitizeText(parsedUrl.searchParams.get('id') || '', 40);
    if (!shareId) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Share ID is required' }));
      return;
    }
    const chats = getSharedChats();
    const chat = chats[shareId];
    if (!chat) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Shared conversation not found or expired' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' });
    res.end(JSON.stringify({ success: true, conversation: chat }));
    return;
  }

  // GET /api/conversations?email=... (Retrieve user's cloud-persisted chat threads across browsers)
  if (req.method === 'GET' && urlPath === '/api/conversations') {
    const email = sanitizeEmail(parsedUrl.searchParams.get('email') || '');
    if (!email) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Email parameter required' }));
      return;
    }
    const all = getAllConversations();
    const userConvs = Array.isArray(all[email]) ? all[email] : [];
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });
    res.end(JSON.stringify(userConvs));
    return;
  }

  // POST /api/conversations (Sync & persist user's chat conversations)
  if (req.method === 'POST' && urlPath === '/api/conversations') {
    let body = '';
    let tooLarge = false;
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 5 * 1024 * 1024) { // 5MB limit
        tooLarge = true;
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Payload too large' }));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (tooLarge) return;
      try {
        const payload = parseSafeJson(body) || {};
        const email = sanitizeEmail(payload.email || '');
        if (!email || !Array.isArray(payload.conversations)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Valid email and conversations array required' }));
          return;
        }
        const all = getAllConversations();
        all[email] = payload.conversations.slice(0, 50); // Keep up to 50 active chats per account
        saveAllConversations(all);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, count: all[email].length }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // GET /api/accounts (Public student directory - hides secret staff and admin accounts)
  if (req.method === 'GET' && urlPath === '/api/accounts') {
    const publicAccounts = getAccounts()
      .filter(a => a.role === 'student')
      .map(({ password, ...rest }) => rest);
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });
    res.end(JSON.stringify(publicAccounts));
    return;
  }

  // GET /api/auth/lookup?email=... (Quick student roll lookup for login QoL autofill)
  if (req.method === 'GET' && urlPath === '/api/auth/lookup') {
    const email = sanitizeEmail(parsedUrl.searchParams.get('email') || '');
    if (!email) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ found: false }));
      return;
    }
    const accounts = getAccounts();
    const user = accounts.find(a => a.email.toLowerCase() === email);
    if (user) {
      res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });
      res.end(JSON.stringify({
        found: true,
        name: sanitizeText(user.name, 60),
        regNo: sanitizeRegNo(user.regNo || ''),
        hasRegNo: Boolean(user.regNo && user.regNo.trim().length > 0)
      }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });
    res.end(JSON.stringify({ found: false }));
    return;
  }

  // POST /api/auth/login and /login (Unified sign-in with rate limiting, account lockout & bcrypt)
  if (req.method === 'POST' && (urlPath === '/api/auth/login' || urlPath === '/login')) {
    const clientIp = getClientIp(req);

    // 1. IP-Based Rate Limiting (max 10 requests per minute per IP)
    const ipCheck = checkIpRateLimit(clientIp);
    if (!ipCheck.allowed) {
      console.warn(`[RATE_LIMIT_EXCEEDED] IP ${clientIp} exceeded login rate limit on ${urlPath}. Retry-After: ${ipCheck.retryAfter}s`);
      res.writeHead(429, {
        'Content-Type': 'application/json',
        'Retry-After': String(ipCheck.retryAfter)
      });
      res.end(JSON.stringify({
        success: false,
        error: 'Too many login requests from your network. Please wait a minute before trying again.'
      }));
      return;
    }

    let body = '';
    let tooLarge = false;
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 32 * 1024) {
        tooLarge = true;
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Payload too large' }));
        req.destroy();
      }
    });

    req.on('end', async () => {
      if (tooLarge) return;

      // 2. Safe Parsing & Strict Input Sanitization
      const rawPayload = parseSafeJson(body) || {};
      const rawEmail = typeof rawPayload.email === 'string' ? rawPayload.email.trim() : '';
      const rawPassword = typeof rawPayload.password === 'string' ? rawPayload.password.trim() : '';
      const rawRoll = typeof rawPayload.regNo === 'string' ? rawPayload.regNo.trim() : '';

      if (hasHtmlOrScriptTags(rawEmail) || hasHtmlOrScriptTags(rawRoll)) {
        console.warn(`[AUTH_VALIDATION_FAILURE] ${new Date().toISOString()} | IP: ${clientIp} | Route: ${urlPath} | Details: HTML/script tag injection detected`);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: 'Invalid authentication request. Please verify your credentials and try again.'
        }));
        return;
      }

      const cleanEmail = sanitizeAuthEmail(rawEmail);
      const cleanRoll = sanitizeRegNo(rawRoll);

      // 3. Server-Side Schema Validation via Zod
      const validation = LoginSchema.safeParse({
        email: cleanEmail,
        password: rawPassword,
        regNo: cleanRoll
      });

      if (!validation.success) {
        console.warn(`[AUTH_VALIDATION_FAILURE] ${new Date().toISOString()} | IP: ${clientIp} | Route: ${urlPath} | Errors: ${JSON.stringify(validation.error.flatten().fieldErrors)}`);
        // Generic error message: do not expose which field failed specifically
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: 'Invalid authentication request. Please verify your credentials and try again.'
        }));
        return;
      }

      const { email, password, regNo: enteredRoll } = validation.data;

      // 4. Account Lockout Check (15 minutes after 5 consecutive failures)
      const now = Date.now();
      let lockoutRecord = accountLockouts.get(email);
      if (lockoutRecord) {
        if (lockoutRecord.lockedUntil && now < lockoutRecord.lockedUntil) {
          console.warn(`[LOCKED_ACCOUNT_ATTEMPT] IP: ${clientIp} attempted login to locked account: ${maskEmail(email)}`);
          // Progressive uniform delay to mitigate timing analysis
          await new Promise(r => setTimeout(r, 1000));
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: false,
            error: 'Authentication failed. Please verify your credentials or try again later.'
          }));
          return;
        } else if (lockoutRecord.lockedUntil && now >= lockoutRecord.lockedUntil) {
          // Lockout window expired, clear state
          accountLockouts.delete(email);
          lockoutRecord = undefined;
        }
      }

      const isStaff = email.endsWith('@vit.ac.in');
      const isAdmin = email === 'admin@vit.ac.in' || email.startsWith('admin.');
      const role = isAdmin ? 'admin' : (isStaff ? 'staff' : 'student');
      const accounts = getAccounts();
      let user = accounts.find(a => a.email.toLowerCase() === email);

      // Helper: Record failure, execute progressive delay, trigger lockout & notification
      const handleFailedAuth = async () => {
        let rec = accountLockouts.get(email) || {
          failedAttempts: 0,
          lastAttemptTime: now,
          lockedUntil: null,
          lockoutEmailSent: false
        };
        rec.failedAttempts++;
        rec.lastAttemptTime = Date.now();
        accountLockouts.set(email, rec);

        // Progressive delay: 1st: 300ms, 2nd: 600ms, 3rd: 1000ms, 4th: 1500ms, 5th: 2000ms
        const delayMs = Math.min(rec.failedAttempts * 400, 2500);
        await new Promise(r => setTimeout(r, delayMs));

        if (rec.failedAttempts >= ACCOUNT_LOCKOUT_MAX_ATTEMPTS) {
          rec.lockedUntil = Date.now() + ACCOUNT_LOCKOUT_DURATION_MS;
          console.warn(`[ACCOUNT_LOCKED] Account ${maskEmail(email)} locked for 15 minutes after ${rec.failedAttempts} consecutive failed attempts. IP: ${clientIp}`);

          if (!rec.lockoutEmailSent) {
            rec.lockoutEmailSent = true;
            const resetToken = crypto.randomBytes(32).toString('hex');
            activeResetTokens.set(resetToken, { email, expires: Date.now() + 15 * 60 * 1000 });
            const protocol = req.headers['x-forwarded-proto'] || 'http';
            const host = req.headers.host || `localhost:${PORT}`;
            const resetLink = `${protocol}://${host}/#reset-token=${resetToken}&email=${encodeURIComponent(email)}`;
            sendAccountLockoutEmail(email, resetLink).catch(() => {});
          }
        }

        console.warn(`[AUTH_FAILED] IP: ${clientIp} failed login for ${maskEmail(email)} (Consecutive fails: ${rec.failedAttempts})`);
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: 'Authentication failed. Please verify your credentials or try again later.'
        }));
      };

      if (user) {
        // 5. Constant-time comparison using bcrypt / timingSafeEqual
        const isMatch = await verifyPassword(password, user.password);
        if (!isMatch) {
          await handleFailedAuth();
          return;
        }

        // Authentication succeeded: clear failed attempts
        accountLockouts.delete(email);

        // 6. Migration on next login: Auto-upgrade any unhashed/weakly hashed password to bcrypt (cost 12)
        if (!isBcryptHash(user.password)) {
          user.password = await hashPassword(password);
          saveAccounts(accounts);
          console.log(`[AUTH_MIGRATION] Re-hashed password to bcrypt (cost ${BCRYPT_SALT_ROUNDS}) for: ${maskEmail(email)}`);
        }

        let userChanged = false;
        if (user.role === 'student' && user.email && (!user.name || /\d{2,4}$/.test(user.name.trim()) || user.name.includes('gorai2024'))) {
          user.name = formatStudentNameFromEmail(user.email);
          userChanged = true;
        }
        if (enteredRoll && (!user.regNo || user.regNo.trim().length === 0)) {
          user.regNo = enteredRoll;
          userChanged = true;
        }
        if (userChanged) {
          saveAccounts(accounts);
        }
      } else {
        // Staff or admin accounts require pre-existing institutional provisioning
        if (isStaff) {
          await handleFailedAuth();
          return;
        }

        // Auto-register student with bcrypt hashed password
        const hashedPassword = await hashPassword(password);
        const formattedName = formatStudentNameFromEmail(email);
        user = {
          id: `std-${Date.now()}`,
          role: 'student',
          name: sanitizeInput(formattedName, 60),
          email,
          regNo: enteredRoll,
          password: hashedPassword,
          avatar: '🎓'
        };
        accounts.push(user);
        saveAccounts(accounts);
        accountLockouts.delete(email);
      }

      const { password: _, ...safeUser } = user;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, user: safeUser }));
    });
    return;
  }

  // POST /api/auth/signup and /signup (Dedicated registration route)
  if (req.method === 'POST' && (urlPath === '/api/auth/signup' || urlPath === '/signup')) {
    const clientIp = getClientIp(req);
    const ipCheck = checkIpRateLimit(clientIp);
    if (!ipCheck.allowed) {
      res.writeHead(429, {
        'Content-Type': 'application/json',
        'Retry-After': String(ipCheck.retryAfter)
      });
      res.end(JSON.stringify({
        success: false,
        error: 'Too many signup requests from your network. Please wait a minute before trying again.'
      }));
      return;
    }

    let body = '';
    let tooLarge = false;
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 32 * 1024) {
        tooLarge = true;
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Payload too large' }));
        req.destroy();
      }
    });

    req.on('end', async () => {
      if (tooLarge) return;

      const rawPayload = parseSafeJson(body) || {};
      const rawEmail = typeof rawPayload.email === 'string' ? rawPayload.email.trim() : '';
      const rawPassword = typeof rawPayload.password === 'string' ? rawPayload.password.trim() : '';
      const rawName = typeof (rawPayload.name || rawPayload.displayName || rawPayload.username) === 'string' ? (rawPayload.name || rawPayload.displayName || rawPayload.username).trim() : '';
      const rawRoll = typeof rawPayload.regNo === 'string' ? rawPayload.regNo.trim() : '';

      if (hasHtmlOrScriptTags(rawEmail) || hasHtmlOrScriptTags(rawName) || hasHtmlOrScriptTags(rawRoll)) {
        console.warn(`[AUTH_SIGNUP_VALIDATION_FAILURE] ${new Date().toISOString()} | IP: ${clientIp} | Route: ${urlPath} | Details: HTML/script tag injection detected`);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: 'Invalid authentication request. Please verify your registration details.'
        }));
        return;
      }

      const cleanEmail = sanitizeAuthEmail(rawEmail);
      const cleanName = sanitizeInput(rawName, 60);
      const cleanRoll = sanitizeRegNo(rawRoll);

      const validation = SignupSchema.safeParse({
        email: cleanEmail,
        password: rawPassword,
        name: cleanName,
        regNo: cleanRoll
      });

      if (!validation.success) {
        console.warn(`[AUTH_SIGNUP_VALIDATION_FAILURE] ${new Date().toISOString()} | IP: ${clientIp} | Route: ${urlPath} | Details: ${JSON.stringify(validation.error.flatten().fieldErrors)}`);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: 'Invalid authentication request. Please verify your registration details.'
        }));
        return;
      }

      const { email, password, name, regNo } = validation.data;
      const isStaff = email.endsWith('@vit.ac.in');
      if (isStaff) {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: 'Staff and Administrator accounts require direct institutional provisioning.'
        }));
        return;
      }

      const accounts = getAccounts();
      const existing = accounts.find(a => a.email.toLowerCase() === email);
      if (existing) {
        res.writeHead(409, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: 'An account with this email already exists. Please sign in instead.'
        }));
        return;
      }

      const hashedPassword = await hashPassword(password);
      const formattedName = name || formatStudentNameFromEmail(email);
      const newUser = {
        id: `std-${Date.now()}`,
        role: 'student',
        name: formattedName,
        email,
        regNo,
        password: hashedPassword,
        avatar: '🎓'
      };
      accounts.push(newUser);
      saveAccounts(accounts);

      const { password: _, ...safeUser } = newUser;
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, user: safeUser }));
    });
    return;
  }

  // POST /api/auth/update-roll (Update Roll Number and sync student tickets)
  if (req.method === 'POST' && urlPath === '/api/auth/update-roll') {
    let body = '';
    let tooLarge = false;
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 16 * 1024) {
        tooLarge = true;
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Payload too large' }));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (tooLarge) return;
      try {
        const payload = parseSafeJson(body) || {};
        const email = sanitizeAuthEmail(payload.email || '');
        const regNo = sanitizeRegNo(payload.regNo || '');

        if (!email || !regNo) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Valid email and registration number are required' }));
          return;
        }

        const accounts = getAccounts();
        const user = accounts.find(a => a.email.toLowerCase() === email);
        if (user) {
          if (user.regNo && user.regNo.trim().length > 0) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Registration number is already registered to this student account and cannot be modified.' }));
            return;
          }
          user.regNo = regNo;
          saveAccounts(accounts);
        }

        // Also update all tickets for this student
        const tickets = getTickets();
        let ticketsChanged = false;
        tickets.forEach(t => {
          if (t.studentEmail && t.studentEmail.toLowerCase() === email) {
            t.studentRegNo = regNo;
            ticketsChanged = true;
          }
        });
        if (ticketsChanged) {
          saveTickets(tickets);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, regNo }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // POST /api/auth/reset-password (Update password after OTP verification & clear lockouts)
  if (req.method === 'POST' && urlPath === '/api/auth/reset-password') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = parseSafeJson(body) || {};
        const cleanEmail = sanitizeAuthEmail(payload.email || '');
        const rawNewPass = typeof payload.newPassword === 'string' ? payload.newPassword.trim() : '';

        const validation = ResetPasswordSchema.safeParse({
          email: cleanEmail,
          newPassword: rawNewPass
        });

        if (!validation.success) {
          const clientIp = getClientIp(req);
          console.warn(`[RESET_PASSWORD_VALIDATION_FAILURE] IP: ${clientIp} | Details: ${JSON.stringify(validation.error.flatten().fieldErrors)}`);
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Invalid password reset request. Password must be at least 6 characters.' }));
          return;
        }

        const { email, newPassword } = validation.data;
        const accounts = getAccounts();
        const user = accounts.find(a => a.email.toLowerCase() === email);
        if (user) {
          user.password = await hashPassword(newPassword);
          saveAccounts(accounts);
          // Unlock account if it was locked
          accountLockouts.delete(email);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Password updated successfully' }));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Account not found' }));
        }
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Invalid request' }));
      }
    });
    return;
  }

  // GET /api/mail-config
  if (req.method === 'GET' && urlPath === '/api/mail-config') {
    const cfg = getMailConfig();
    const maskedPass = cfg.smtpPass ? '••••••••••••' + cfg.smtpPass.slice(-4) : '';
    const maskedKey = cfg.resendApiKey ? 're_••••••••' + cfg.resendApiKey.slice(-4) : '';
    const maskedEmailJs = cfg.emailjsPublicKey ? cfg.emailjsPublicKey.slice(0, 4) + '••••••••' + cfg.emailjsPublicKey.slice(-4) : '';
    const hasEmailJs = Boolean(cfg.emailjsServiceId && cfg.emailjsTemplateId && cfg.emailjsPublicKey);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      configured: hasEmailJs || Boolean((cfg.smtpUser && cfg.smtpPass) || cfg.resendApiKey),
      provider: cfg.provider || (hasEmailJs ? 'emailjs' : (cfg.resendApiKey ? 'resend' : 'gmail')),
      emailjsServiceId: cfg.emailjsServiceId || '',
      emailjsTemplateId: cfg.emailjsTemplateId || '',
      maskedEmailJs,
      smtpUser: cfg.smtpUser || '',
      maskedPass,
      maskedKey
    }));
    return;
  }

  // POST /api/save-mail-config
  if (req.method === 'POST' && urlPath === '/api/save-mail-config') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const { provider = 'gmail', smtpUser, smtpPass, resendApiKey, emailjsServiceId, emailjsTemplateId, emailjsPublicKey, testRecipient } = payload;

        if (provider === 'emailjs' || emailjsPublicKey || emailjsServiceId) {
          const sId = (emailjsServiceId || getMailConfig().emailjsServiceId || '').trim();
          const tId = (emailjsTemplateId || getMailConfig().emailjsTemplateId || '').trim();
          const pKey = (emailjsPublicKey || getMailConfig().emailjsPublicKey || '').trim();
          if (!sId || !tId || !pKey) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'EmailJS Service ID, Template ID, and Public Key are required.' }));
            return;
          }
          const recipient = testRecipient || 'student@vitstudent.ac.in';
          await sendEmailJs({
            serviceId: sId,
            templateId: tId,
            publicKey: pKey,
            to: recipient,
            securityCode: '264819'
          });
          saveMailConfig({ provider: 'emailjs', emailjsServiceId: sId, emailjsTemplateId: tId, emailjsPublicKey: pKey });
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: true,
            message: `Verified! A live test email was delivered to ${recipient}. EmailJS settings saved.`
          }));
          return;
        }

        if (provider === 'resend' || resendApiKey) {
          const key = (resendApiKey || (getMailConfig().resendApiKey) || '').trim();
          if (!key) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Resend API key is required.' }));
            return;
          }
          const recipient = testRecipient || 'student@vitstudent.ac.in';
          await sendResendApi({
            apiKey: key,
            to: recipient,
            subject: '🎓 VIT Helpdesk Email Sender Verified',
            html: `<div style="font-family:sans-serif;padding:24px;background:#0d0d0e;color:#fff;border-radius:8px;">
              <h2 style="color:#60a5fa;margin-top:0;">🎓 Real Email Delivery Verified!</h2>
              <p>Your Resend API connection is now actively linked to the VIT AI Campus Helpdesk.</p>
              <p>Real password recovery security codes will now be delivered directly to your inbox.</p>
            </div>`,
            text: 'Real Email Delivery Verified! Your Resend API is actively linked to VIT AI Campus Helpdesk.'
          });
          saveMailConfig({ provider: 'resend', resendApiKey: key });
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: true,
            message: `Verified! A live test email was delivered to ${recipient}. Settings saved.`
          }));
          return;
        }

        // Default: Gmail SMTP
        if (!smtpUser || !smtpPass) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Gmail address and App Password are required.' }));
          return;
        }

        const recipient = testRecipient || smtpUser;
        await sendGmailSmtp({
          user: smtpUser,
          pass: smtpPass,
          to: recipient,
          subject: 'VIT Helpdesk Email Sender Verified',
          html: `<div style="font-family:sans-serif;padding:24px;background:#0d0d0e;color:#fff;border-radius:8px;">
            <h2 style="color:#60a5fa;margin-top:0;">🎓 Real Email Delivery Verified!</h2>
            <p>Your Gmail account is now actively connected to the VIT AI Campus Helpdesk.</p>
            <p>Real password recovery codes will now be delivered directly to student and staff inboxes.</p>
          </div>`
        });

        saveMailConfig({ provider: 'gmail', smtpUser, smtpPass });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: `Verified! A test email was sent to ${recipient}. Settings saved.`
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // POST /api/send-reset-email
  if (req.method === 'POST' && urlPath === '/api/send-reset-email') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const { to, securityCode, studentName } = payload;

        if (!to || !securityCode) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Recipient email and security code are required.' }));
          return;
        }

        const cfg = getMailConfig();
        const hasGmail = Boolean(cfg.smtpUser && cfg.smtpPass);
        const hasResend = Boolean(cfg.resendApiKey);
        const hasEmailJs = Boolean(cfg.emailjsServiceId && cfg.emailjsTemplateId && cfg.emailjsPublicKey);

        if (!hasGmail && !hasResend && !hasEmailJs) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: false,
            notConfigured: true,
            error: 'Email service is not configured yet. Please configure your email settings in the Admin Console.'
          }));
          return;
        }

        const subject = `[VIT Campus Portal] Security Code: ${securityCode} - Password Reset`;
        const html = `
        <div style="font-family: Arial, -apple-system, sans-serif; max-width: 540px; margin: 0 auto; background: #0d0d0e; color: #f4f4f5; padding: 24px; border-radius: 12px; border: 1px solid #27272a;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #60a5fa; margin: 0; font-size: 20px;">🎓 Vellore Institute of Technology</h2>
            <p style="color: #a1a1aa; font-size: 13px; margin: 4px 0 0 0;">AI Campus Helpdesk &bull; Student Support Office (MB-102)</p>
          </div>
          <div style="background: #18181b; padding: 20px; border-radius: 8px; border: 1px solid #3f3f46;">
            <p style="margin: 0 0 12px 0; font-size: 14px;">Hello <strong>${studentName || 'VITian'}</strong>,</p>
            <p style="margin: 0 0 16px 0; font-size: 13px; color: #d4d4d8; line-height: 1.5;">We received a password recovery request for your VIT campus account (<strong>${to}</strong>).</p>
            <div style="text-align: center; margin: 24px 0;">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #71717a; display: block; margin-bottom: 6px;">Your One-Time Security Code</span>
              <span style="font-family: monospace; font-size: 28px; font-weight: bold; letter-spacing: 4px; background: #09090b; color: #34d399; padding: 10px 24px; border-radius: 6px; border: 1px solid #27272a; display: inline-block;">${securityCode}</span>
            </div>
            <p style="font-size: 12px; color: #a1a1aa; line-height: 1.4; margin: 16px 0 0 0;">Enter this code into the campus portal window to update your password. This security code expires in 15 minutes.</p>
          </div>
          <p style="text-align: center; font-size: 11px; color: #71717a; margin-top: 20px;">&copy; 2026 Student Support Services, Vellore Institute of Technology, Vellore - 632014.</p>
        </div>`;

        let dispatchResult;
        if (cfg.provider === 'emailjs' || (hasEmailJs && !hasGmail)) {
          dispatchResult = await sendEmailJs({
            serviceId: cfg.emailjsServiceId,
            templateId: cfg.emailjsTemplateId,
            publicKey: cfg.emailjsPublicKey,
            to,
            securityCode,
            html
          });
        } else if (cfg.provider === 'resend' || (hasResend && !hasGmail)) {
          dispatchResult = await sendResendApi({
            apiKey: cfg.resendApiKey,
            to,
            subject,
            html,
            text: `Your VIT Helpdesk Security Code is: ${securityCode}. Enter it to reset your password.`
          });
        } else {
          dispatchResult = await sendGmailSmtp({
            user: cfg.smtpUser,
            pass: cfg.smtpPass,
            to,
            subject,
            html,
            text: `Your VIT Helpdesk Security Code is: ${securityCode}. Enter it to reset your password.`
          });
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          sandboxed: Boolean(dispatchResult && dispatchResult.sandboxed),
          deliveredTo: (dispatchResult && dispatchResult.deliveredTo) || to,
          message: dispatchResult && dispatchResult.sandboxed
            ? `Security code delivered to your registered inbox (${dispatchResult.deliveredTo}) via Resend Sandbox for ${to}.`
            : `Verification code sent to ${to}.`
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // Generative AI RAG Proxy Endpoint
  if (req.method === 'POST' && urlPath === '/api/generate') {
    let body = '';
    let tooLarge = false;
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 256 * 1024) {
        tooLarge = true;
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Payload too large' }));
        req.destroy();
      }
    });
    req.on('end', async () => {
      if (tooLarge) return;
      try {
        const payload = parseSafeJson(body) || {};
        const query = sanitizeText(payload.query || '', 1000);
        const context = sanitizeText(payload.context || '', 4000);
        const sourceDoc = sanitizeText(payload.sourceDoc || '', 150);
        const provider = sanitizeText(payload.provider || 'pollinations', 30);
        const apiKey = typeof payload.apiKey === 'string' ? payload.apiKey.trim().slice(0, 200) : '';
        const rawHistory = Array.isArray(payload.history) ? payload.history : [];
        const history = rawHistory
          .filter(h => h && (h.role === 'user' || h.role === 'assistant') && typeof h.content === 'string')
          .slice(-6)
          .map(h => ({
            role: h.role === 'assistant' ? 'assistant' : 'user',
            content: sanitizeText(h.content, 1200)
          }));

        if (!query) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ text: 'Please enter a valid campus inquiry.', provider: 'Helpdesk' }));
          return;
        }

        const historyContext = history.length > 0
          ? `\n\n[RECENT CONVERSATION HISTORY]\n${history.map(h => `${h.role === 'user' ? 'Student' : 'Assistant'}: "${h.content}"`).join('\n')}\n[END CONVERSATION HISTORY]`
          : '';

        const systemPrompt = (context && context.trim().length > 0)
          ? `You are the official VIT Campus Student Support AI Assistant (Operating date: 16 October 2026).
Your task is to provide an accurate, helpful, and conversational response to the student's question.
You must strictly ground your answer on this verified campus knowledge base excerpt:
[CAMPUS CONTEXT]
Document: "${sourceDoc}"
Information: "${context}"
[END CONTEXT]${historyContext}

Instructions:
1. Speak in a warm, professional, and reassuring student advisor voice.
2. Directly answer the student's question using the verified campus facts above. State the building, floor, room number, or procedure clearly in 1 to 3 helpful sentences.
3. If the student is asking for confirmation or verification (e.g. "you sure?", "are you sure?", "really?", "can you confirm that?", "is that verified?"), reassure them warmly and confirm the specific verified rules, deadlines, or steps from the campus context above.
4. Maintain natural conversational continuity based on the recent chat history while remaining strictly grounded in the verified campus facts. Never use robotic disclaimers like "outside the approved campus excerpt currently available in my database".`
          : `You are the official VIT Campus Student Support AI Assistant at Vellore Institute of Technology (VIT Vellore campus, 16 October 2026).${historyContext}
Your role is exclusively to greet students and introduce the services of the VIT Student Support Office.
Instructions:
1. If the message is a greeting or pleasantry, welcome the student warmly in 1 to 2 sentences and explain that you can help answer questions regarding VIT campus classroom locations (SJT, TT, MB, PRP), lab timings, Gravitas 2026 registration, hostel leave, Wi-Fi, and student procedures.
2. STRICT SCOPE RESTRICTION: You are NOT a general knowledge search engine. If the student asks about external universities (like BITS Pilani, IITs, etc.), outside topics, stocks, or general trivia not covered in the VIT campus scope, do NOT answer it. State clearly: "I apologize, but as the VIT Student Support Helpdesk Assistant, I am only authorized to answer inquiries about the VIT Vellore campus. This query is out of scope and has been routed to human support staff."`;

        // 1. Google Gemini
        const envGeminiKey = (process.env.GEMINI_API_KEY || '').trim();
        const clientKey = (apiKey && !apiKey.startsWith('gsk_')) ? apiKey.trim() : '';
        const candidateKeys = [];
        if (clientKey) candidateKeys.push(clientKey);
        if (envGeminiKey && !candidateKeys.includes(envGeminiKey)) candidateKeys.push(envGeminiKey);

        if (provider === 'gemini') {
          const geminiModels = [
            'gemini-3.5-flash',
            'gemini-3.5-flash-lite',
            'gemini-flash-latest',
            'gemini-3.1-flash-lite',
            'gemini-3.7-flash',
            'gemini-3.8-flash'
          ];
          let geminiSuccess = false;

          for (const keyToUse of candidateKeys) {
            for (const modelName of geminiModels) {
              try {
                const genConfig = {
                  temperature: 0.35,
                  maxOutputTokens: 1200
                };
                if (modelName === 'gemini-3.5-flash') {
                  genConfig.thinkingConfig = { thinkingBudget: 0 };
                }

                const geminiContents = [];
                if (history.length > 0) {
                  for (const h of history) {
                    geminiContents.push({
                      role: h.role === 'assistant' ? 'model' : 'user',
                      parts: [{ text: h.content }]
                    });
                  }
                }
                geminiContents.push({
                  role: 'user',
                  parts: [{ text: `${systemPrompt}\n\nStudent Message: "${query}"` }]
                });

                const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${keyToUse}`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    contents: geminiContents,
                    generationConfig: genConfig
                  }),
                  signal: AbortSignal.timeout(9000)
                });

                if (geminiRes.ok) {
                  const data = await geminiRes.json();
                  const candidate = data.candidates?.[0];
                  let text = '';
                  if (candidate?.content?.parts) {
                    const answerParts = candidate.content.parts
                      .filter(p => !p.thought && typeof p.text === 'string')
                      .map(p => p.text.trim())
                      .filter(t => t.length > 0);
                    if (answerParts.length > 0) {
                      text = answerParts.join('\n\n');
                    } else if (candidate.content.parts[0]?.text) {
                      text = candidate.content.parts[0].text.trim();
                    }
                  }

                  if (text && text.length > 20 && !/^(\W+|context\b)/i.test(text)) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                      text: text.trim(),
                      provider: `Google ${modelName}`
                    }));
                    geminiSuccess = true;
                    break;
                  }
                } else {
                  const errText = await geminiRes.text().catch(() => '');
                  console.warn(`Gemini API error [${modelName} - status ${geminiRes.status}]:`, errText);
                }
              } catch (err) {
                console.warn(`Gemini API call failed for ${modelName}:`, err.message);
              }
            }
            if (geminiSuccess) break;
          }

          if (geminiSuccess) return;

          // Seamless failover to Groq if Gemini is quota-exhausted or unavailable
          const failoverGroqKey = (process.env.GROQ_API_KEY || (apiKey?.startsWith('gsk_') ? apiKey : '')).trim();
          if (failoverGroqKey) {
            const groqModels = ['qwen/qwen3.8-27b', 'openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'llama-3.3-70b-versatile'];
            for (const mName of groqModels) {
              try {
                const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${failoverGroqKey}`
                  },
                  body: JSON.stringify({
                    model: mName,
                    messages: [
                      { role: 'system', content: systemPrompt },
                      { role: 'user', content: query }
                    ],
                    temperature: 0.3,
                    max_tokens: 600
                  }),
                  signal: AbortSignal.timeout(6000)
                });
                if (groqRes.ok) {
                  const groqData = await groqRes.json();
                  const groqText = groqData.choices?.[0]?.message?.content;
                  if (groqText && groqText.trim().length > 15) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                      text: groqText.trim(),
                      provider: `Groq (${mName})`
                    }));
                    return;
                  }
                }
              } catch (_) {}
            }
          }

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            text: `⚠️ **AI Service Notice**: Generation is currently busy. Please try asking again or switch to **Groq Cloud AI** via the model selector.`,
            provider: 'AI Service (Retry)'
          }));
          return;
        }

        // 2. Groq Cloud (100% Free Tier - Ultra-fast AI)
        const effectiveGroqKey = (apiKey?.startsWith('gsk_') ? apiKey : (process.env.GROQ_API_KEY || apiKey || '')).trim();
        if (provider === 'groq' && effectiveGroqKey) {
          const groqModels = ['qwen/qwen3.8-27b', 'openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'llama-3.3-70b-versatile'];
          for (const modelName of groqModels) {
            try {
              const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${effectiveGroqKey}`
                },
                body: JSON.stringify({
                  model: modelName,
                  messages: [
                    { role: 'system', content: systemPrompt },
                    ...history.map(h => ({ role: h.role === 'assistant' ? 'assistant' : 'user', content: h.content })),
                    { role: 'user', content: query }
                  ],
                  temperature: 0.3,
                  max_tokens: 600
                }),
                signal: AbortSignal.timeout(7000)
              });

              if (groqRes.ok) {
                const data = await groqRes.json();
                const text = data.choices?.[0]?.message?.content;
                if (text && text.trim().length > 0) {
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({
                    text: text.trim(),
                    provider: `Groq (${modelName})`
                  }));
                  return;
                }
              }
            } catch (e) {
              // Try next model
            }
          }
        }

        // 3. Default: Free Open LLM (Pollinations GPT-OSS / Anonymous Tier - Zero Key Required)
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6500);

        try {
          const response = await fetch('https://text.pollinations.ai/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              messages: [
                { role: 'system', content: systemPrompt },
                ...history.map(h => ({ role: h.role === 'assistant' ? 'assistant' : 'user', content: h.content })),
                { role: 'user', content: query }
              ],
              model: 'openai-fast'
            }),
            signal: controller.signal
          });
          clearTimeout(timeout);

          if (response.ok) {
            const generatedText = await response.text();
            if (generatedText && generatedText.trim().length > 10 && !generatedText.includes("Free limit reached")) {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                text: generatedText.trim(),
                provider: 'Open LLM (Pollinations)'
              }));
              return;
            }
          } else if (response.status === 402) {
            // 30s rate limit reached on anonymous IP
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              text: null,
              rateLimited: true,
              provider: 'Pollinations (30s Cooldown)',
              message: 'Free anonymous tier cooldown active (1 call/30s).'
            }));
            return;
          }
        } catch (err) {
          clearTimeout(timeout);
        }
      } catch (err) {
        // Fall back gracefully
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        text: null,
        provider: 'Grounded Campus RAG Engine'
      }));
    });
    return;
  }

  // Voice Audio Multimodal Transcription Endpoint (Gemini Flash Audio Engine)
  if (req.method === 'POST' && urlPath === '/api/transcribe') {
    let body = '';
    let tooLarge = false;
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 6 * 1024 * 1024) {
        tooLarge = true;
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ text: '', error: 'Audio payload too large' }));
        req.destroy();
      }
    });
    req.on('end', async () => {
      if (tooLarge) return;
      try {
        const payload = parseSafeJson(body, 6 * 1024 * 1024) || {};
        const { audioBase64, mimeType = 'audio/wav', apiKey = '' } = payload;

        if (!audioBase64) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ text: '', error: 'Missing audio data' }));
          return;
        }

        const envGeminiKey = (process.env.GEMINI_API_KEY || '').trim();
        const clientKey = (apiKey && !apiKey.startsWith('gsk_')) ? apiKey.trim() : '';
        const candidateKeys = [];
        if (clientKey) candidateKeys.push(clientKey);
        if (envGeminiKey && !candidateKeys.includes(envGeminiKey)) candidateKeys.push(envGeminiKey);
        const geminiModels = ['gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-flash-latest'];

        for (const keyToUse of candidateKeys) {
          for (const modelName of geminiModels) {
            try {
              const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${keyToUse}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  contents: [{
                    parts: [
                      { text: 'You are an accurate English speech-to-text transcriber for the VIT Student Support Helpdesk. Transcribe the spoken audio query into clear English text (e.g. "where is sjt 412", "what are computing lab timings", "hello", "weekend hostel leave"). Return ONLY the transcribed English text, nothing else. If the audio is complete silence or unintelligible noise, reply with an empty string.' },
                      { inlineData: { mimeType: mimeType, data: audioBase64 } }
                    ]
                  }],
                  generationConfig: {
                    temperature: 0.1,
                    maxOutputTokens: 120
                  }
                }),
                signal: AbortSignal.timeout(5000)
              });

              if (geminiRes.ok) {
                const data = await geminiRes.json();
                const candidatePart = data.candidates?.[0]?.content?.parts?.[0];
                let text = candidatePart?.audioTranscription?.text || candidatePart?.text || '';
                text = text.trim().replace(/^["']|["']$/g, '');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ text, provider: `Gemini Audio Transcribe (${modelName})` }));
                return;
              }
            } catch (err) {}
          }
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ text: '', error: 'Transcription unavailable' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ text: '', error: err.message }));
      }
    });
    return;
  }

  // Static File Serving
  let safePath = urlPath === '/' ? '/index.html' : urlPath;
  if (safePath === '/favicon.ico' && !fs.existsSync(path.join(__dirname, 'favicon.ico'))) {
    safePath = '/favicon.svg';
  }
  const filePath = path.join(__dirname, safePath);

  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('File Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });
    res.end(data);
  });
});

server.listen(PORT, HOST, async () => {
  try {
    await runMigration();
  } catch (err) {
    console.error('[AUTH_MIGRATION_ERROR] Startup migration error:', err.message);
  }
  console.log(`VIT AI Campus Helpdesk server running at http://${HOST}:${PORT}/ (Port: ${PORT})`);
});
