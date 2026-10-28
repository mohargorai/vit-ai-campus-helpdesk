# 🎓 [VIT AI Campus Helpdesk Assistant](https://vit-ai-campus-helpdesk.onrender.com)
> **Production AI-Powered Student Inquiry & Support Resolution System**  
> *Developed for AI Innovate-a-thon • 5th Semester*

[![Live Website](https://img.shields.io/badge/Live%20Website-onrender.com-46E3B7?logo=render&logoColor=white)](https://vit-ai-campus-helpdesk.onrender.com)
[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Dependencies](https://img.shields.io/badge/Dependencies-Zero%20(Pure%20Native)-success)](#technology-stack)
[![UI: Monochromatic](https://img.shields.io/badge/Design-Monochrome%20Aesthetic-black)](#design--user-experience)
[![Device Compatibility](https://img.shields.io/badge/Mobile-Responsive-60a5fa)](#screen-size-responsiveness)

---

## 📌 Overview

The **[VIT AI Campus Helpdesk Assistant](https://vit-ai-campus-helpdesk.onrender.com)** is an intelligent, low-latency, role-adapted support platform designed for university students, faculty, and administrative officers. Built with zero external npm dependencies, it delivers instant, grounded answers to daily campus inquiries—including classroom and lab navigation, attendance relaxations (9-pointer rules), hostel night leave protocols, FFCS add/drop procedures, and faculty advisement hours.

When inquiries fall outside the approved knowledge base, the system automatically routes them to the **Desk MB-102 Student Welfare Office Escalation Queue**, generating a trackable ticket for verified administrative review.

---

## ✨ Key Capabilities

- **🧠 Grounded Hybrid AI Engine**:
  - Direct integration with Google Gemini (`gemini-1.5-flash` / `gemini-2.0-flash`) and Groq (`llama-3.3-70b-versatile`).
  - Built-in Deterministic Local RAG fallback providing 100% offline uptime and zero-latency retrieval.
  - Transparent citations referencing specific VIT handbooks, Dean Academics circulars, and Student Welfare regulations.

- **🛡️ Out-of-Scope Detection & Automatic Escalation**:
  - Automatically detects non-campus, speculative, or policy-restricted questions.
  - Automatically creates a tracked ticket (e.g. `Ticket #VIT-2026-XXXX`) synchronized across student and staff dashboards in real-time.

- **👥 Multi-Role Portal Architecture**:
  - **🎓 Student Portal**: Instant natural language search, ticket tracking, and roll number customization.
  - **👨‍💼 Staff Console (Desk MB-102)**: Real-time escalation queue, one-click official reply dispatch, and resolution audits.
  - **🛡️ Administrator Root**: Isolated settings console for live Gemini API key configuration, email server verification, and automated benchmark test execution.

- **🎙️ Real-Time Voice Input & Audio Transcription**:
  - Native Web Speech Recognition with hardware microphone detection and dynamic constraint fallbacks.
  - Integrated Text-to-Speech (TTS) voice playback with live visual waveform meters.

- **📧 Real Multi-Provider Password Recovery**:
  - Zero-dependency native TLS v1.2 SMTP client for direct dispatch to `@vitstudent.ac.in` and `@vit.ac.in`.
  - Integrated EmailJS and Resend API provider fallback for sandbox testing and serverless cloud deploys.

---

## 🏗️ Architecture & Technology Stack

```
┌────────────────────────────────────────────────────────────────┐
│                         FRONTEND                               │
│   • Semantic HTML5 & Modern Viewport Architecture              │
│   • Vanilla CSS3 (Pure Monochromatic Surface Design System)     │
│   • Vanilla JavaScript (ES2022, Reactive State Store)          │
│   • Web Speech API (Hardware STT / Speech Synthesis TTS)       │
│   • W3C Credential Management API (Google Password Manager)    │
└───────────────────────────────┬────────────────────────────────┘
                                │ Fetch / REST APIs
                                ▼
┌────────────────────────────────────────────────────────────────┐
│                   BACKEND (Node.js Native)                     │
│   • Zero-Dependency Node.js HTTP Server (`server.js`)          │
│   • Dynamic Routing & CORS Middleware                          │
│   • Native TLS v1.2 SMTP Dispatch (`tls.connect(465)`)         │
│   • Resend & Gemini AI Proxy Endpoints                         │
│   • Atomic JSON File Persistence (`data/accounts`, `tickets`)  │
└────────────────────────────────────────────────────────────────┘
```

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | HTML5, CSS3, ES2022 JavaScript, Web Speech API, W3C Credential Management API |
| **Backend** | Node.js Native Runtime (`http`, `tls`, `fs`, `path`, `crypto`) |
| **Dependencies** | **0 (Zero External Runtime NPM Packages)** |
| **Storage** | Atomic JSON persistence with `fs.renameSync` transaction safety |
| **Supported Browsers** | Chrome, Edge, Safari, Firefox, Opera, Android Chrome, iOS Safari |

---

## 📱 Screen Size Responsiveness

The user interface has been audited across all standard viewports:

- **Desktop & Ultra-wide (>= 1280px)**: Multi-column view, split chat panel, sticky action dock, and slide-out preferences drawer.
- **Tablets & Small Laptops (768px – 1024px)**: Fluid layouts, adaptive metric rows, responsive modal dialogs.
- **Mobile Phones (320px – 767px)**:
  - 58px compact header with responsive icon actions.
  - Centered floating prompt capsule optimized for single-thumb typing.
  - Safe area inset padding (`env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`).
  - 16px font sizing on inputs to prevent iOS Safari auto-zoom.

---

## 🚀 Getting Started

### 🌐 Live Production Access
Launch **[VIT AI Campus Helpdesk Assistant](https://vit-ai-campus-helpdesk.onrender.com)** directly in your browser.

---

### Local Development Setup

#### Prerequisites
- [Node.js](https://nodejs.org/) version **18.0.0** or higher.
- No npm installation step is needed (pure native standard library).

#### Installation & Launch

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mohargorai/vit-ai-campus-helpdesk.git
   cd vit-ai-campus-helpdesk
   ```

2. **Start the application**:
   ```bash
   npm start
   # or directly with Node:
   node server.js
   ```

3. **Access the Helpdesk**:
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## ⚙️ Configuration & Environment Variables

The server operates out-of-the-box with default campus data. For production cloud deployments, the following environment variables can be configured:

| Variable | Default | Description |
| :--- | :--- | :--- |
| `PORT` | `3000` | Port on which the HTTP server listens (automatically bound by cloud hosts). |
| `HOST` | `0.0.0.0` | Network interface binding address. |
| `GEMINI_API_KEY` | *(Configurable in Settings)* | Google Gemini API key for real-time generative responses. |
| `EMAILJS_SERVICE_ID` | `""` | Optional: EmailJS Service ID for password recovery emails. |
| `EMAILJS_TEMPLATE_ID` | `""` | Optional: EmailJS Template ID. |
| `EMAILJS_PUBLIC_KEY` | `""` | Optional: EmailJS Public Key. |
| `SMTP_USER` | `""` | Official campus Gmail / Google Workspace address for password reset emails. |
| `SMTP_PASS` | `""` | 16-character Google App Password for native TLS email dispatch. |

---

## 👥 Access & Authentication

Students sign in with their `@vitstudent.ac.in` university credentials to ask campus queries, review verified citations, and track resolution tickets.

---

## 🏆 Project Team

**Campus AI Development Team**  
*AI Innovate-a-thon • 5th Semester*

- **Mohar Gorai** — *Lead Developer*
- **Devkanti Sarkar** — *Core Contributor*
- **Agrima Gupta** — *Core Contributor*
- **Sahil Kumar Bhagat** — *Core Contributor*

---