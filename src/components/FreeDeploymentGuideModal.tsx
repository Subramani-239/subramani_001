/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Rocket,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Server,
  Cloud,
  Layers,
  Sparkles,
  X,
  FileCode,
  DollarSign
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FreeDeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const FreeDeploymentGuideModal: React.FC<FreeDeploymentGuideModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;
  const t = translations[lang];

  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const vercelSteps = `# 1. Install dependencies & build
npm install
npm run build

# 2. Deploy to Vercel (100% Free Hobby Tier)
npx vercel --prod`;

  const netlifySteps = `# Build production bundle
npm run build

# Output will be generated in the '/dist' folder.
# Simply drag and drop the 'dist' folder to https://app.netlify.com/drop`;

  return (
    <div
      role="dialog"
      aria-label="Free Deployment Guide"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
    >
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl">
              <Rocket className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-stone-900">
                  {t.deployment.title}
                </h2>
                <span className="text-[11px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                  $0 Free Tier
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                {t.deployment.sub}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Zero-Cost Architecture Explanation */}
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              {lang === 'ta'
                ? 'ஏன் இந்த தளத்திற்கு எந்த கட்டணமும் தேவையில்லை?'
                : 'Why SHERISE requires zero dollars and no paid upgrades'}
            </span>
          </div>
          <p className="text-xs text-emerald-900 leading-relaxed">
            {lang === 'ta'
              ? 'SHERISE முற்றிலும் நவீன உலாவி தொழில்நுட்பங்களை (Web Speech Synthesis, Speech Recognition, LocalStorage) அடிப்படையாகக் கொண்டு கட்டமைக்கப்பட்டுள்ளது. தகவல்கள் பயனரின் சொந்த போனிலேயே பாதுகாப்பாக சேமிக்கப்படுவதால், கட்டண டேட்டாபேஸ் அல்லது பிரீமியம் சர்வர்கள் தேவையில்லை. 100% வாழ்நாள் இலவசம்!'
              : 'SHERISE runs directly inside modern web browsers using native Web Speech APIs, local client routing, and device localStorage. Because user records, speech, and calculators operate on the client device, you do NOT need expensive databases, monthly server subscriptions, or paid API upgrades.'}
          </p>
        </div>

        {/* Free Hosting Options */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
            <Cloud className="w-4 h-4 text-purple-600" />
            <span>
              {lang === 'ta' ? 'இலவச ஹோஸ்டிங் வழிகள் (தேர்வு செய்க)' : 'Free-Tier Hosting Providers ($0 Forever)'}
            </span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Vercel */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between font-bold text-stone-900">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-black" />
                  <span>Vercel (Hobby Free)</span>
                </span>
                <span className="text-emerald-700 font-extrabold">Free</span>
              </div>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                {lang === 'ta'
                  ? 'வேகமான உலகளாவிய CDN, இலவச SSL (https://), கஸ்டம் டொமைன் வசதி.'
                  : 'Fast global edge CDN, automatic HTTPS SSL certificates, and custom domains.'}
              </p>
              <div className="pt-1">
                <button
                  onClick={() => handleCopyCode(vercelSteps, 'vercel')}
                  className="flex items-center gap-1 px-2.5 py-1 bg-white border border-stone-300 rounded-lg text-[11px] font-semibold text-stone-700 hover:bg-stone-100"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedSection === 'vercel' ? t.common.copied : 'Copy Commands'}</span>
                </button>
              </div>
            </div>

            {/* Netlify */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between font-bold text-stone-900">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                  <span>Netlify (Drop / Starter)</span>
                </span>
                <span className="text-emerald-700 font-extrabold">Free</span>
              </div>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                {lang === 'ta'
                  ? 'எந்த கட்டளையும் இன்றி, dist கோப்புறையை இணையதளத்தில் இழுத்து விட்டு (Drag & Drop) உடனடியாக வெளியிடலாம்.'
                  : 'Zero commands needed! Drag and drop the compiled dist folder onto app.netlify.com/drop.'}
              </p>
              <div className="pt-1">
                <button
                  onClick={() => handleCopyCode(netlifySteps, 'netlify')}
                  className="flex items-center gap-1 px-2.5 py-1 bg-white border border-stone-300 rounded-lg text-[11px] font-semibold text-stone-700 hover:bg-stone-100"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedSection === 'netlify' ? t.common.copied : 'Copy Instructions'}</span>
                </button>
              </div>
            </div>

            {/* GitHub Pages */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between font-bold text-stone-900">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-800" />
                  <span>GitHub Pages</span>
                </span>
                <span className="text-emerald-700 font-extrabold">Free</span>
              </div>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                {lang === 'ta'
                  ? 'உங்கள் GitHub ரெப்போவில் இருந்தே நேரடியாக இலவசமாக இயக்கலாம்.'
                  : 'Host free directly from your GitHub repository using the gh-pages branch.'}
              </p>
            </div>

            {/* Cloudflare Pages */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between font-bold text-stone-900">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <span>Cloudflare Pages</span>
                </span>
                <span className="text-emerald-700 font-extrabold">Unlimited Free</span>
              </div>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                {lang === 'ta'
                  ? 'அளவு கடந்த அலைவரிசை (Unlimited bandwidth), DDoS பாதுகாப்புடன் இலவசம்.'
                  : 'Unlimited bandwidth, high speed, and DDoS protection for static websites.'}
              </p>
            </div>
          </div>
        </div>

        {/* Clear Identification of External Services & Configuration */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>
              {lang === 'ta'
                ? 'வெளிப்புற சேவைகள் & தேவைகள் விளக்கம்'
                : 'External Services & Configuration Identification'}
            </span>
          </h3>

          <div className="border border-stone-200 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-700 font-bold">
                <tr>
                  <th className="p-3">Feature / Component</th>
                  <th className="p-3">Service Used</th>
                  <th className="p-3">Cost & Requirement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="p-3 font-bold text-stone-900">
                    {lang === 'ta' ? 'குரல் வாசிப்பு (Text-to-Speech)' : 'Voice Read-Aloud (TTS)'}
                  </td>
                  <td className="p-3 text-stone-600">Browser Web Speech API</td>
                  <td className="p-3 font-semibold text-emerald-700">100% Free (No API key needed)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-stone-900">
                    {lang === 'ta' ? 'குரல் வழிசெலுத்தல்' : 'Voice Command Navigation'}
                  </td>
                  <td className="p-3 text-stone-600">Web SpeechRecognition API</td>
                  <td className="p-3 font-semibold text-emerald-700">100% Free (Native browser support)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-stone-900">
                    {lang === 'ta' ? 'வரவு-செலவு & சேமிப்பு தரவுகள்' : 'Cashbook & Savings Storage'}
                  </td>
                  <td className="p-3 text-stone-600">Browser LocalStorage</td>
                  <td className="p-3 font-semibold text-emerald-700">100% Free (Stores securely on phone)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-stone-900">
                    {lang === 'ta' ? 'அரசு திட்டங்கள் & வழிகாட்டிகள்' : 'Govt Schemes & Guides'}
                  </td>
                  <td className="p-3 text-stone-600">Bundled Offline JSON Data</td>
                  <td className="p-3 font-semibold text-emerald-700">100% Free (Works without continuous internet)</td>
                </tr>
                <tr className="bg-amber-50/40">
                  <td className="p-3 font-bold text-stone-900">
                    {lang === 'ta' ? 'விருப்பத்திற்குரியது: ஜெமினி AI உரையாடல்' : 'Optional: Gemini AI Generative Chat'}
                  </td>
                  <td className="p-3 text-stone-600">Google Gemini API (@google/genai)</td>
                  <td className="p-3 text-amber-800">
                    Optional: Generous Free Tier exists (requires GEMINI_API_KEY if dynamic LLM chat is turned on).
                  </td>
                </tr>
                <tr className="bg-stone-50/50">
                  <td className="p-3 font-bold text-stone-900">
                    {lang === 'ta' ? 'விருப்பத்திற்குரியது: பல சாதன கிளவுட் சிங்க்' : 'Optional: Multi-Device Cloud Sync'}
                  </td>
                  <td className="p-3 text-stone-600">Firebase Spark (Firestore)</td>
                  <td className="p-3 text-stone-600">
                    Optional: Free Spark tier up to 50k reads/day. App functions completely without it via localStorage.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition"
          >
            {t.common.close}
          </button>
        </div>
      </div>
    </div>
  );
};
