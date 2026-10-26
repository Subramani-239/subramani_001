/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  User,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Clock,
  Coins,
  MapPin,
  HeartHandshake,
  BookOpen,
  ArrowRight,
  RefreshCw,
  PhoneCall,
  ShieldCheck,
  Fingerprint,
  ScanFace,
  Camera,
  X,
  ExternalLink,
  AlertCircle,
  FileText
} from 'lucide-react';
import { Language, UserProfile, ActiveTab } from '../types';
import { sampleDemoProfiles, generateDemoId } from '../data/demoProfilesData';
import { translations } from '../data/translations';
import { formatCurrency } from '../utils/calculator';
import { speakText } from '../utils/speech';

interface ProfileViewProps {
  lang: Language;
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onNavigate: (tab: ActiveTab) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  lang,
  userProfile,
  onUpdateProfile,
  onNavigate,
}) => {
  const t = translations[lang];

  const [formData, setFormData] = useState<UserProfile>(userProfile);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeDemoModal, setActiveDemoModal] = useState<'aadhaar' | 'face' | null>(null);
  const [aadhaarSimulatedStep, setAadhaarSimulatedStep] = useState(false);
  const [faceSimulatedStep, setFaceSimulatedStep] = useState(false);

  const handleSwitchDemoProfile = (demo: UserProfile) => {
    setFormData(demo);
    onUpdateProfile(demo);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    try {
      confetti({ particleCount: 30, spread: 45 });
    } catch {
      // ignore
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    try {
      confetti({ particleCount: 40, spread: 60 });
    } catch {
      // ignore
    }
  };

  const handleSpeakProfile = () => {
    const textToSpeak =
      lang === 'ta'
        ? `சுயவிவரம்: ${formData.name}. நிலை: ${t.profile.roles[formData.role]}. ஊர்: ${formData.location}. தெரிந்த திறன்கள்: ${formData.skills.join(', ')}. ஒதுக்கும் நேரம்: ${formData.availableHoursPerDay} மணிநேரம். ஆரம்ப சேமிப்பு: ${formatCurrency(formData.availableBudget, 'ta')}.`
        : lang === 'hi'
        ? `प्रोफाइल: ${formData.name}। स्थिति: ${t.profile.roles[formData.role]}। स्थान: ${formData.location}। हुनर: ${formData.skills.join(', ')}। उपलब्ध समय: ${formData.availableHoursPerDay} घंटे। बचत: ${formatCurrency(formData.availableBudget, 'hi')}।`
        : `Profile: ${formData.name}. Status: ${t.profile.roles[formData.role]}. Location: ${formData.location}. Skills: ${formData.skills.join(', ')}. Time: ${formData.availableHoursPerDay} hours daily. Capital: ${formatCurrency(formData.availableBudget, 'en')}.`;
    speakText(textToSpeak, lang);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-700 via-pink-700 to-purple-700 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2">
            <User className="w-3.5 h-3.5 text-amber-300" />
            <span>{t.common.demoBadge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {t.profile.title}
          </h1>
          <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
            {t.profile.sub}
          </p>
        </div>
      </div>

      {/* Mandatory Hackathon Privacy & Demo Notice */}
      <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl flex items-start gap-3 text-xs text-amber-950">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold block">{t.profile.demoNotice}</span>
          <p className="text-[11px] text-amber-900 leading-relaxed">
            {t.common.realDisclaimer}
          </p>
        </div>
      </div>

      {/* Success Notification */}
      {saveSuccess && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-950 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
          <span>{t.profile.profileSavedNotice}</span>
        </div>
      )}

      {/* Sample Persona Quick Switcher */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-600" />
              <span>{t.profile.switchDemoTitle}</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {lang === 'ta'
                ? 'ஹேக்கத்தான் செயல்முறை விளக்கத்திற்கு மாதிரி பயனர் சுயவிவரங்களை எளிதாக மாற்றலாம்.'
                : 'Click any sample persona below to immediately simulate different user journeys.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {sampleDemoProfiles.map((demo) => {
            const isSelected = formData.id === demo.id;
            return (
              <button
                key={demo.id}
                onClick={() => handleSwitchDemoProfile(demo)}
                className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-500 shadow-xs'
                    : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-stone-900">{demo.name}</span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-stone-200 rounded text-stone-700">
                      {demo.id}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-rose-700 mb-1">
                    {t.profile.roles[demo.role]}
                  </div>
                  <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                    {demo.bio}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[10px] text-stone-500">
                  <span>{demo.location}</span>
                  <span className="font-bold text-emerald-700">
                    {formatCurrency(demo.availableBudget, lang)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Profile Form */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex items-start justify-between border-b border-stone-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 bg-purple-100 text-purple-900 rounded-lg flex items-center gap-1.5">
                <span>{t.profile.uniqueIdLabel}</span>
                <span className="font-mono font-black">{formData.id}</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-900 rounded-full">
                Simulated ID
              </span>
            </div>
            <h2 className="text-lg font-bold text-stone-900 mt-1">
              {formData.name}
            </h2>
            <p className="text-xs text-stone-500">{formData.location}</p>
          </div>

          <button
            onClick={handleSpeakProfile}
            className="p-2 text-stone-500 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition border border-stone-200"
            title="Listen to profile details"
          >
            <span className="text-xs font-bold flex items-center gap-1">
              🔊 {t.common.listen}
            </span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-stone-700 block mb-1">
                {t.profile.nameLabel}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">
                {t.profile.roleLabel}
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-rose-500"
              >
                <option value="homemaker">{t.profile.roles.homemaker}</option>
                <option value="dropout">{t.profile.roles.dropout}</option>
                <option value="rural_artisan">{t.profile.roles.rural_artisan}</option>
                <option value="entrepreneur">{t.profile.roles.entrepreneur}</option>
                <option value="student">{t.profile.roles.student}</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">
                {t.profile.locationLabel}
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">
                {t.profile.languageLabel}
              </label>
              <select
                value={formData.preferredLanguage}
                onChange={(e) =>
                  setFormData({ ...formData, preferredLanguage: e.target.value as Language })
                }
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-rose-500"
              >
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">
                {t.profile.availableTimeLabel}
              </label>
              <input
                type="number"
                min="1"
                max="12"
                value={formData.availableHoursPerDay}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availableHoursPerDay: Math.max(1, Number(e.target.value)),
                  })
                }
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">
                {t.profile.budgetLabel}
              </label>
              <input
                type="number"
                min="0"
                step="500"
                value={formData.availableBudget}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availableBudget: Math.max(0, Number(e.target.value)),
                  })
                }
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">
              {t.profile.skillsLabel} (comma separated)
            </label>
            <input
              type="text"
              value={formData.skills.join(', ')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  skills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                })
              }
              placeholder="e.g. Tailoring, Cooking, Pickles, Embroidery"
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">
              {t.profile.bioLabel}
            </label>
            <textarea
              rows={2}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-rose-500 resize-none"
            />
          </div>

          {/* Trusted Emergency Contact Settings */}
          <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 font-bold text-rose-950">
              <PhoneCall className="w-4 h-4 text-rose-600" />
              <span>{t.emergency.sosShareTitle}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-stone-700 block mb-0.5">
                  {t.profile.trustedContactLabel}
                </label>
                <input
                  type="text"
                  value={formData.trustedContactName || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, trustedContactName: e.target.value })
                  }
                  placeholder="e.g. Sister / Mother / SHG Leader"
                  className="w-full p-2 bg-white border border-rose-200 rounded-xl"
                />
              </div>
              <div>
                <label className="font-semibold text-stone-700 block mb-0.5">
                  {t.profile.trustedPhoneLabel}
                </label>
                <input
                  type="tel"
                  value={formData.trustedContactPhone || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, trustedContactPhone: e.target.value })
                  }
                  placeholder="e.g. 9840123456"
                  className="w-full p-2 bg-white border border-rose-200 rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                const newId = generateDemoId();
                setFormData({ ...formData, id: newId });
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-stone-600 hover:text-stone-900 border border-stone-200 rounded-xl"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? 'புதிய Demo ID உருவாக்கு' : 'Regenerate Demo ID'}</span>
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-xs transition"
            >
              {t.profile.saveProfileBtn}
            </button>
          </div>
        </form>
      </div>

      {/* Profile Verification Section (Aadhaar & Face ID) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>
                {lang === 'ta'
                  ? 'அடையாள சரிபார்ப்பு பிரிவுகள் (Identity Verification - Demo Mode)'
                  : lang === 'hi'
                  ? 'पहचान सत्यापन अनुभाग (Identity Verification - Demo Mode)'
                  : 'Identity Verification Sections'}
              </span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {lang === 'ta'
                ? 'முற்றிலும் விருப்பமானது. மாதிரி ஹேக்கத்தான் செயல்முறை விளக்கத்திற்காக மட்டுமே; உண்மையான தகவல்கள் கோரப்படுவதில்லை.'
                : 'Both options are completely optional. Designed for sandbox demonstration without collecting real identity data.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Aadhaar Verification */}
          <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 bg-blue-50 text-blue-700 rounded-2xl border border-blue-200">
                    <Fingerprint className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900">
                      {t.profile.verification?.aadhaarTitle || 'Aadhaar Verification'}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                      {t.profile.verification?.optionalBadge || 'Optional / Demo Only'}
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-[11px] font-bold inline-flex items-center gap-1.5 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>{t.profile.verification?.demoModeBadge || 'Demo Mode — Not Connected'}</span>
                </span>
              </div>

              {/* Status Display */}
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-stone-700 font-medium">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{t.profile.verification?.aadhaarStatus || 'Status: Demo Sandbox (Not Connected to UIDAI)'}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-md">
                  Sandbox
                </span>
              </div>

              {/* Privacy Notice */}
              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-[11px] text-amber-950 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {t.profile.verification?.aadhaarNotice ||
                    'For hackathon demonstration only. In production, this would integrate with UIDAI Aadhaar Paperless Offline e-KYC or DigiLocker via licensed AUA/KUA gateway with consent and OTP. No real Aadhaar number or identity documents are requested or stored.'}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] text-stone-500">
                {lang === 'ta' ? 'மாதிரி திரையை திறக்க' : 'Simulate sandbox flow'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setAadhaarSimulatedStep(false);
                  setActiveDemoModal('aadhaar');
                }}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5 shadow-xs"
              >
                <span>{t.profile.verification?.openDemoBtn || 'Open Demo'}</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Card 2: Face ID Verification */}
          <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 bg-purple-50 text-purple-700 rounded-2xl border border-purple-200">
                    <ScanFace className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900">
                      {t.profile.verification?.faceIdTitle || 'Face ID Verification'}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                      {t.profile.verification?.optionalBadge || 'Optional / Demo Only'}
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-[11px] font-bold inline-flex items-center gap-1.5 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>{t.profile.verification?.demoModeBadge || 'Demo Mode — Not Connected'}</span>
                </span>
              </div>

              {/* Status Display */}
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-stone-700 font-medium">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{t.profile.verification?.faceStatus || 'Status: Demo Sandbox (Not Connected to Biometric Service)'}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-md">
                  Sandbox
                </span>
              </div>

              {/* Privacy Notice */}
              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-[11px] text-amber-950 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {t.profile.verification?.faceNotice ||
                    'For hackathon demonstration only. In production, this would integrate with a certified liveness detection and biometric authentication provider compliant with local data privacy regulations. No real camera access, face images, or biometric data are captured or stored.'}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] text-stone-500">
                {lang === 'ta' ? 'மாதிரி திரையை திறக்க' : 'Simulate sandbox flow'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setFaceSimulatedStep(false);
                  setActiveDemoModal('face');
                }}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5 shadow-xs"
              >
                <span>{t.profile.verification?.openDemoBtn || 'Open Demo'}</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Demo Simulation Modal */}
      {activeDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl p-6 sm:p-7 space-y-5 animate-scaleUp">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-2xl border ${
                    activeDemoModal === 'aadhaar'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-purple-50 text-purple-700 border-purple-200'
                  }`}
                >
                  {activeDemoModal === 'aadhaar' ? (
                    <Fingerprint className="w-6 h-6" />
                  ) : (
                    <ScanFace className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      Demo Mode — Not Connected
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-600">
                      Optional
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 mt-1">
                    {activeDemoModal === 'aadhaar'
                      ? t.profile.verification?.demoModalTitleAadhaar || 'Aadhaar Verification Demo (UIDAI Sandbox Mock)'
                      : t.profile.verification?.demoModalTitleFace || 'Face ID Biometric Verification Demo (Liveness Sandbox Mock)'}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveDemoModal(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Explanatory Sandbox Box */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl text-xs space-y-2 text-stone-700">
              <p className="leading-relaxed">
                {activeDemoModal === 'aadhaar'
                  ? t.profile.verification?.demoExplanationAadhaar ||
                    'In production, this would integrate via a licensed UIDAI AUA/KUA gateway or DigiLocker using user-consented OTP verification. This demo is isolated with test mock data only.'
                  : t.profile.verification?.demoExplanationFace ||
                    'In production, this would integrate with a certified biometric liveness detection provider compliant with Indian digital personal data protection laws. This demo is isolated with test mock flows only.'}
              </p>
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px] font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
                <span>
                  {lang === 'ta'
                    ? 'பாதுகாப்பு உறுதி: உங்கள் உண்மையான ஆதார் எண் அல்லது முகப் படம் எதுவும் இந்த இணையதளத்தில் சேகரிக்கப்படவோ சரிபார்க்கப்படவோ இல்லை.'
                    : 'Privacy Safeguard: No real identity numbers or face images are collected or stored. Verification is not claimed as completed.'}
                </span>
              </div>
            </div>

            {/* Sandbox Simulation Canvas */}
            <div className="p-5 bg-stone-950 text-white rounded-2xl space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-[11px] text-stone-400 border-b border-stone-800 pb-2">
                <span>SANDBOX SIMULATION CONSOLE</span>
                <span className="text-amber-400">STATUS: OFFLINE MOCK</span>
              </div>

              {activeDemoModal === 'aadhaar' ? (
                <div className="space-y-2 text-stone-300 text-xs">
                  <div className="flex items-center justify-between">
                    <span>Masked Test ID:</span>
                    <span className="text-emerald-400 font-bold">XXXX-XXXX-9012 (Demo Only)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Consent Hash:</span>
                    <span className="text-stone-400">e3b0c44298fc1c149afbf4c8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Simulated Gateway:</span>
                    <span className="text-stone-400">uidai-sandbox-mock.local (Disconnected)</span>
                  </div>
                  {aadhaarSimulatedStep && (
                    <div className="p-2.5 bg-stone-900 rounded-xl border border-stone-800 text-[11px] text-amber-300">
                      ℹ️ Mock Sandbox Test: Sample packet checked in browser memory. Real verification remains unconnected.
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2 text-stone-300 text-xs">
                  <div className="flex items-center justify-between">
                    <span>Camera Permission:</span>
                    <span className="text-stone-400">Not Requested (Simulated)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Liveness Mesh Test:</span>
                    <span className="text-emerald-400 font-bold">Mock 3D Landmarks Vector [Demo]</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Biometric Provider:</span>
                    <span className="text-stone-400">biometric-sandbox-mock.local (Disconnected)</span>
                  </div>
                  {faceSimulatedStep && (
                    <div className="p-2.5 bg-stone-900 rounded-xl border border-stone-800 text-[11px] text-amber-300">
                      ℹ️ Mock Sandbox Test: Sample geometry checked in browser memory. No face capture was performed.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => {
                  if (activeDemoModal === 'aadhaar') {
                    setAadhaarSimulatedStep(true);
                  } else {
                    setFaceSimulatedStep(true);
                  }
                }}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold rounded-xl text-xs transition border border-stone-300"
              >
                {lang === 'ta' ? 'மாதிரி சோதனையை இயக்கு' : 'Simulate Sandbox Step'}
              </button>

              <button
                type="button"
                onClick={() => setActiveDemoModal(null)}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition shadow-xs"
              >
                {t.profile.verification?.closeDemoBtn || 'Close Demo'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cross-Feature Connections Card */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-3xl p-5 sm:p-7 space-y-3">
        <h3 className="text-sm font-bold text-purple-950 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-purple-700" />
          <span>{t.profile.connectedInfo}</span>
        </h3>
        <p className="text-xs text-purple-900 leading-relaxed">
          {lang === 'ta'
            ? `உங்கள் திறன்கள் (${formData.skills.join(', ')}) மற்றும் சேமிப்பு (${formatCurrency(formData.availableBudget, lang)}) அடிப்படையில் பரிந்துரைக்கப்படும் அடுத்த படிகள்:`
            : `Based on your skills (${formData.skills.join(', ')}) and starting capital (${formatCurrency(formData.availableBudget, lang)}), here are your direct next steps:`}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <button
            onClick={() => onNavigate('business-generator')}
            className="p-3 bg-white border border-purple-200 rounded-xl text-left hover:border-purple-400 transition"
          >
            <div className="font-bold text-xs text-stone-900">
              {t.nav.businessGenerator}
            </div>
            <div className="text-[11px] text-stone-500 line-clamp-1">
              {lang === 'ta' ? 'திறன் சார்ந்த திட்டம்' : 'Generate matched plan'}
            </div>
          </button>

          <button
            onClick={() => onNavigate('skills-learning')}
            className="p-3 bg-white border border-purple-200 rounded-xl text-left hover:border-purple-400 transition"
          >
            <div className="font-bold text-xs text-stone-900">
              {t.nav.skillsLearning}
            </div>
            <div className="text-[11px] text-stone-500 line-clamp-1">
              {lang === 'ta' ? 'புதிய பாடங்கள் படிக்க' : 'Explore skill courses'}
            </div>
          </button>

          <button
            onClick={() => onNavigate('schemes')}
            className="p-3 bg-white border border-purple-200 rounded-xl text-left hover:border-purple-400 transition"
          >
            <div className="font-bold text-xs text-stone-900">
              {t.nav.schemes}
            </div>
            <div className="text-[11px] text-stone-500 line-clamp-1">
              {lang === 'ta' ? 'தகுதியான அரசு சலுகைகள்' : 'Check matching schemes'}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
