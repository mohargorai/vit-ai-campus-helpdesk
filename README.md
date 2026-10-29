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

The **[VIT AI Campus Helpdesk Assistant](https://vit-ai-campus-helpdesk.onrender.com)** is an intelligent, low-latency, role-adapted support platform designed for university students, faculty, and administrative officers. Built with zero external npm dependencies, it delivers instant, grounded answers to daily campus inquiries—including classroom and lab navigation (SJT, TT, MB, PRP), attendance regulations (75% rule & 9-pointer relaxations), hostel night leave protocols, FFCS add/drop procedures, and faculty advisement hours.

When inquiries fall outside the approved knowledge base, the system automatically routes them to the **Desk MB-102 Student Welfare Office Escalation Queue**, generating a trackable ticket for verified administrative review and staff replies.

---

## ✨ Key Capabilities

- **💬 Harmonized Multi-Thread Chat History Sidebar**:
  - Full multi-conversation management with dedicated dock/collapse controls and `+ New Chat` workflow.
  - Contextual 3-dot action popover on every conversation: **Share Conversation** (clipboard export), **Pin chat to top**, **Inline In-Place Rename** (seamless editing right in the chat row without browser dialogs), **Archive chat**, and **Delete**.
  - Unified **Apple Spring (0.52s Fluid)** motion architecture with matching `16px` card curvature and zero-jerk continuous layout push.
  - Off-canvas slide drawer with backdrop blur on mobile and tablet.

- **🧠 Grounded Multi-Turn Conversational AI Engine**:
  - **Conversational Memory & Follow-Up Confirmation**: Resolves multi-turn follow-ups (*"you sure about that?"*, *"are you sure?"*, *"really?"*, *"can you confirm that?"*) by re-grounding with prior context across all model providers without generating false tickets.
  - **Google Gemini**: Powered by `gemini-3.5-flash` with multi-turn chat history context and automated environment fallback (`GEMINI_API_KEY`).
  - **Groq Cloud AI**: Ultra-fast free-tier cloud generation powered by `qwen/qwen3.8-27b` and `openai/gpt-oss-120b` with full message history arrays.
  - **Local Campus RAG**: 100% offline deterministic keyword/intent retrieval with zero latency and zero external network calls.
  - **Dynamic Atmospheric Horizon Sky**: Smooth time-dynamic sky gradients transitioning seamlessly across Morning, Afternoon, Evening, and Night.
  - **Google Gemini**: Powered by `gemini-3.5-flash` with automatic server-side environment fallback (`GEMINI_API_KEY`).
  - **Groq Cloud AI**: Ultra-fast free-tier cloud generation powered by `qwen/qwen3.8-27b` and `openai/gpt-oss-120b`.
  - **Local Campus RAG**: 100% offline deterministic keyword/intent retrieval with zero latency and zero external network calls.
  - Transparent citations referencing specific VIT handbooks, Dean Academics circulars, and Student Welfare regulations.

- **🛡️ Out-of-Scope Detection & Automatic Escalation**:
  - Detects non-campus, speculative, or policy-restricted questions.
  - Automatically creates a tracked ticket (e.g. `Ticket #VIT-2026-XXXX`) synchronized across student and staff dashboards in real-time.

- **👥 Multi-Role Portal Architecture**:
  - **🎓 Student Portal**: Instant natural language search, ticket tracking, and roll number customization with strict privacy isolation (students only view their own tickets).
  - **👨‍💼 Staff Console (Desk MB-102)**: Real-time escalation queue, quick canned response templates, one-click official reply dispatch, and queue clearing.
  - **🛡️ Administrator Root**: Isolated settings console for live API key configuration, email server verification, and automated 10-test benchmark evaluation suite.

- **🎙️ Real-Time Voice Input & Audio Transcription**:
  - Native Web Speech Recognition with hardware microphone detection and dynamic constraint fallbacks.
  - Multimodal Gemini audio speech-to-text proxy (`/api/transcribe`) for audio decoding.
  - Integrated Text-to-Speech (TTS) voice playback with Indian English (`en-IN`) campus dialect presets.

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
│   • Multi-Thread Chat History Manager (localStorage)           │
│   • Web Speech API (Hardware STT / Speech Synthesis TTS)       │
│   • W3C Credential Management API (Google Password Manager)    │
└───────────────────────────────┬────────────────────────────────┘
                                │ Fetch / REST APIs
                                ▼
┌────────────────────────────────────────────────────────────────┐
│                   BACKEND (Node.js Native)                     │
│   • Zero-Dependency Node.js HTTP Server (`server.js`)          │
│   • Dynamic Routing & CORS Middleware                          │
│   • Gemini & Groq Cloud AI Proxy (`/api/generate`)             │
│   • Gemini Audio Multimodal Transcribe (`/api/transcribe`)     │
│   • Native TLS v1.2 SMTP Dispatch (`tls.connect(465)`)         │
│   • Atomic JSON File Persistence (`data/accounts`, `tickets`)  │
└────────────────────────────────────────────────────────────────┘
```

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | HTML5, CSS3, ES2022 JavaScript, Web Speech API, W3C Credential Management API |
| **Backend** | Node.js Native Runtime (`http`, `tls`, `fs`, `path`, `crypto`) |
| **Dependencies** | **0 (Zero External Runtime NPM Packages)** |
| **Storage** | Atomic JSON persistence with `fs.renameSync` transaction safety + Browser `localStorage` |
| **Supported Browsers** | Chrome, Edge, Safari, Firefox, Opera, Android Chrome, iOS Safari |

---

## 📱 Screen Size Responsiveness

The user interface is optimized across all standard viewports:

- **Desktop & Ultra-wide (≥1024px)**: 
  - Harmonized floating cards with `16px` border curvature and `14px` viewport insets.
  - Symmetrical side-by-side push layout with continuous numeric `padding-left` interpolation (`0.52s cubic-bezier(0.32, 0.72, 0, 1)`).
  - Floating top-left dock controls that smoothly fade and translate in tandem with the sidebar.
- **Tablets & Small Laptops (768px – 1023px)**: 
  - Off-canvas slide-over frosted drawers (`top: 10px; bottom: 10px; border-radius: 14px`) with backdrop blur.
  - Adaptive metric rows and touch-optimized responsive dialogs.
- **Mobile Phones (320px – 767px)**:
  - Full-screen distraction-free interface with touch-optimized floating toggle buttons.
  - Gemini capsule pill input with `48px - 52px` height and `16px` font sizing to prevent iOS Safari auto-zoom.
  - Streamlined horizontal suggestion pills and centered low-profile footer guidance.
  - Safe area inset padding (`env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`).

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

2. **Configure Environment Variables** (Optional for local testing):
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   GEMINI_API_KEY=your_gemini_api_key_here
   GROQ_API_KEY=your_groq_api_key_here
   ```

3. **Start the application**:
   ```bash
   npm start
   # or directly with Node:
   node server.js
   ```

4. **Access the Helpdesk**:
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## ⚙️ Configuration & Environment Variables

| Variable | Default | Description |
| :--- | :--- | :--- |
| `PORT` | `3000` | Port on which the HTTP server listens (automatically bound by Render / cloud hosts). |
| `HOST` | `0.0.0.0` | Network interface binding address. |
| `GEMINI_API_KEY` | `""` | Google Gemini API key for real-time generative responses. |
| `GROQ_API_KEY` | `""` | Groq Cloud API key for ultra-fast free-tier generation. |
| `EMAILJS_SERVICE_ID` | `""` | Optional: EmailJS Service ID for password recovery emails. |
| `EMAILJS_TEMPLATE_ID` | `""` | Optional: EmailJS Template ID. |
| `EMAILJS_PUBLIC_KEY` | `""` | Optional: EmailJS Public Key. |
| `SMTP_USER` | `""` | Official campus Gmail / Google Workspace address for password reset emails. |
| `SMTP_PASS` | `""` | 16-character Google App Password for native TLS email dispatch. |

---

## 👥 Access & Authentication

- **Student Login**: Sign in with `@vitstudent.ac.in` credentials to ask campus queries, review verified citations, manage past conversations, and track personal resolution tickets.
- **Staff Login**: Sign in with `@vit.ac.in` credentials to access the Desk MB-102 resolution queue and send official replies.
- **Admin**: Sign in with administrator credentials for API key management and benchmark audits.

---

## 🏆 Project Team

**Campus AI Development Team**  
*AI Innovate-a-thon • 5th Semester*

- **Mohar Gorai** — *Lead Developer*
- **Devkanti Sarkar** — *Core Contributor*
- **Agrima Gupta** — *Core Contributor*
- **Sahil Kumar Bhagat** — *Core Contributor*

---
