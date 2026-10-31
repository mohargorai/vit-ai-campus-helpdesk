/**
 * VIT AI Campus Helpdesk - Password Security Migration Script
 * Scans data/accounts.json for plain-text or weakly hashed passwords
 * and safely re-hashes them using bcrypt with salt rounds >= 12.
 */

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const BCRYPT_SALT_ROUNDS = 12;
const ACCOUNTS_FILE = path.join(__dirname, 'data', 'accounts.json');

function isBcryptHash(str) {
  if (typeof str !== 'string') return false;
  return /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(str);
}

async function runMigration() {
  console.log('[MIGRATION] Starting password hash audit & migration...');
  
  if (!fs.existsSync(ACCOUNTS_FILE)) {
    console.log('[MIGRATION] No data/accounts.json file found. Nothing to migrate.');
    return { migrated: 0, total: 0 };
  }

  let accounts = [];
  try {
    accounts = JSON.parse(fs.readFileSync(ACCOUNTS_FILE, 'utf8'));
    if (!Array.isArray(accounts)) {
      console.error('[MIGRATION_ERROR] accounts.json is not an array.');
      return { migrated: 0, total: 0 };
    }
  } catch (err) {
    console.error('[MIGRATION_ERROR] Failed to read or parse accounts.json:', err.message);
    return { migrated: 0, total: 0 };
  }

  let migratedCount = 0;
  let alreadySecureCount = 0;

  for (const account of accounts) {
    const rawPass = account.password;
    if (!rawPass || typeof rawPass !== 'string') {
      continue;
    }

    if (isBcryptHash(rawPass)) {
      alreadySecureCount++;
      continue;
    }

    // Weak / plain-text password detected: re-hash with bcrypt (salt rounds = 12)
    const hashed = await bcrypt.hash(rawPass, BCRYPT_SALT_ROUNDS);
    account.password = hashed;
    migratedCount++;
    console.log(`[MIGRATED] Re-hashed password for account: ${account.email} (Role: ${account.role})`);
  }

  if (migratedCount > 0) {
    const tempFile = ACCOUNTS_FILE + '.tmp.' + Date.now();
    fs.writeFileSync(tempFile, JSON.stringify(accounts, null, 2), 'utf8');
    fs.renameSync(tempFile, ACCOUNTS_FILE);
    console.log(`[MIGRATION_SUCCESS] Successfully migrated ${migratedCount} account(s) to bcrypt (cost ${BCRYPT_SALT_ROUNDS}).`);
  } else {
    console.log(`[MIGRATION_COMPLETE] All ${alreadySecureCount} accounts already have secure bcrypt hashes.`);
  }

  return { migrated: migratedCount, total: accounts.length };
}

if (require.main === module) {
  runMigration().then(() => {
    process.exit(0);
  }).catch(err => {
    console.error('[MIGRATION_FAILED]', err);
    process.exit(1);
  });
}

module.exports = { runMigration, isBcryptHash, BCRYPT_SALT_ROUNDS };
