# SHERISE - Free-Tier Hosting & Deployment Guide

## 1. Overview
**SHERISE** (பெண்களின் சுயசார்பு & முன்னேற்ற களம்) is a mobile-first, high-accessibility progressive web application engineered specifically for rural women, homemakers, women who discontinued education, and women who want to earn income from home using their skills.

It provides complete bilingual support (**Tamil தமிழ்** and **English**), voice-assisted audio narration (Web Speech API), verified government schemes with an interactive eligibility checker, second-chance education roadmaps, skill-based micro-livelihoods, a business idea generator, an SHG loan EMI & profit calculator, an interactive sisterhood community, and an emergency panic screen disguise ("Quick Shield").

---

## 2. Why SHERISE Requires $0 and No Paid Upgrades
SHERISE is architected as an ultra-fast, zero-overhead static Single Page Application (SPA):
1. **Client-Side Processing**: All calculations (SHG loan EMI formulas, profit margins, eligibility matrix) run on the user's browser in milliseconds with zero backend server lag.
2. **Audio & Voice**: Built natively using the browser's built-in **Web Speech Synthesis** and **Speech Recognition** APIs. **No third-party paid voice API keys (like ElevenLabs or Google Cloud TTS bills) are required.**
3. **Local Privacy Storage**: User cashbook entries, bookmarked schemes, and PIN configurations reside in the device's secure `localStorage`, eliminating the need for paid databases or multi-tenant server bills.

---

## 3. How to Deploy on 100% Free-Tier Services

### Option A: Vercel (Recommended - Fastest $0 Hosting)
Vercel offers a lifetime **Hobby Free Tier** with global CDN edge routing and automatic HTTPS SSL.

1. **Build the production bundle**:
   ```bash
   npm install
   npm run build
   ```
2. **Deploy via CLI**:
   ```bash
   npx vercel --prod
   ```
   Or connect your GitHub repository directly at [https://vercel.com/new](https://vercel.com/new).
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

---

### Option B: Netlify ($0 Starter Tier - No Command Line Needed!)
1. Run:
   ```bash
   npm run build
   ```
2. Open your browser and go to: [https://app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the `dist/` directory directly onto the web page.
4. Your site will be live instantly with a free `*.netlify.app` domain and free SSL!

---

### Option C: Cloudflare Pages (100% Free with Unlimited Bandwidth)
1. Go to [https://pages.cloudflare.com](https://pages.cloudflare.com).
2. Connect your GitHub repository.
3. Configure build settings:
   - **Framework**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Deploy! Cloudflare Pages offers unlimited requests and bandwidth on its free tier.

---

### Option D: GitHub Pages (Host Directly from GitHub)
1. In `package.json`, add:
   ```json
   "homepage": "https://<your-username>.github.io/<your-repo-name>"
   ```
2. Install `gh-pages`:
   ```bash
   npm install --save-dev gh-pages
   ```
3. Add deploy scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Run:
   ```bash
   npm run deploy
   ```

---

## 4. Clear Identification of Features & External Services

| Feature | Internal vs. External | Cost | Notes |
| :--- | :--- | :--- | :--- |
| **Voice Narration (Read Aloud)** | Internal (Web Speech API) | **$0 Free** | Native in Android Chrome, Edge, Safari. No API key needed. |
| **Voice Navigation** | Internal (SpeechRecognition API) | **$0 Free** | Native in Chromium & Android browsers. |
| **Verified Schemes & Roadmaps** | Internal Static Data | **$0 Free** | Works offline and low-bandwidth. |
| **Loan & Profit Calculator** | Internal Pure Functions | **$0 Free** | Tested via unit tests with `node:test`. |
| **Local Cashbook & PIN Lock** | Internal (`localStorage`) | **$0 Free** | No cloud database bill. Private to phone. |
| **Optional: Gemini AI Generative Chat** | External (`@google/genai`) | **$0 Free Tier available** | Optional: AI Studio provides generous free RPM without credit card if custom conversational LLM chat is added. |
| **Optional: Multi-device Cloud Sync** | External (Firebase Firestore) | **$0 Free Tier (Spark)** | Up to 50,000 reads/day free. App is 100% functional without it. |

---

## 5. Running Locally for Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
