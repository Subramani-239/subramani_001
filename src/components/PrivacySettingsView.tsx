/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Eye,
  Trash2,
  Download,
  CheckCircle2,
  Volume2,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { Language, PrivacyConfig } from '../types';
import { translations } from '../data/translations';
import { speakText } from '../utils/speech';

interface PrivacySettingsViewProps {
  lang: Language;
  privacyConfig: PrivacyConfig;
  onUpdatePrivacyConfig: (newConfig: Partial<PrivacyConfig>) => void;
  onTriggerQuickShield: () => void;
  onClearAllLocalData: () => void;
}

export const PrivacySettingsView: React.FC<PrivacySettingsViewProps> = ({
  lang,
  privacyConfig,
  onUpdatePrivacyConfig,
  onTriggerQuickShield,
  onClearAllLocalData,
}) => {
  const t = translations[lang];

  const [pinInput, setPinInput] = useState(privacyConfig.pinCode);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleSavePin = () => {
    if (pinInput.length === 4) {
      onUpdatePrivacyConfig({ pinCode: pinInput, pinLockEnabled: true });
      setSuccessNotice(
        lang === 'ta' ? '4 இலக்க PIN வெற்றிகரமாக அமைக்கப்பட்டது.' : '4-digit PIN saved successfully.'
      );
      setTimeout(() => setSuccessNotice(null), 3500);
    }
  };

  const handleExportData = () => {
    try {
      const exportObject = {
        budget: localStorage.getItem('sherise_budget_records'),
        posts: localStorage.getItem('sherise_community_posts'),
        savedSchemes: localStorage.getItem('sherise_saved_schemes'),
        exportDate: new Date().toISOString(),
      };
      const blob = new Blob([JSON.stringify(exportObject, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sherise_my_records_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-800 via-stone-900 to-rose-950 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2">
            {lang === 'ta' ? 'தனியுரிமை & பாதுகாப்பு' : 'Privacy & Security Controls'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {t.privacy.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {t.privacy.sub}
          </p>
        </div>
      </div>

      {successNotice && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-2xl text-xs font-bold text-emerald-900 flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* 1. Quick Shield Disguise Feature */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 shadow-2xs space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900">
                {t.privacy.discreetModeTitle}
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                {t.privacy.discreetModeDesc}
              </p>
            </div>
          </div>

          <button
            onClick={onTriggerQuickShield}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-xl shadow-xs transition"
          >
            <Eye className="w-4 h-4" />
            <span>{lang === 'ta' ? 'இப்போது பரிசோதிக்கவும்' : 'Test Disguise Now'}</span>
          </button>
        </div>

        <p className="text-xs text-stone-600 bg-amber-50/70 p-3 rounded-xl border border-amber-200">
          {lang === 'ta'
            ? 'குடும்பத்தில் யாராவது உங்கள் தொலைபேசியை எட்டிப் பார்த்தால், மேல் மூலையில் உள்ள கவச பொத்தானைத் தொட்டால் உடனே சமையல் ரசக் குறிப்பு வந்துவிடும். உங்களைத் தவிர வேறு யாருக்கும் சந்தேகம் வராது.'
            : 'If someone approaches your phone, tapping the top shield button immediately transforms the screen into a harmless traditional rasam recipe.'}
        </p>
      </div>

      {/* 2. 4-Digit PIN Security */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 shadow-2xs space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-rose-100 text-rose-800 rounded-2xl">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900">
                {t.privacy.pinProtectionTitle}
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                {t.privacy.pinProtectionDesc}
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={privacyConfig.pinLockEnabled}
              onChange={(e) => onUpdatePrivacyConfig({ pinLockEnabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-stone-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
          </label>
        </div>

        {privacyConfig.pinLockEnabled && (
          <div className="pt-2 flex items-center gap-3">
            <input
              type="password"
              maxLength={4}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
              placeholder="4-digit PIN"
              className="w-32 text-center text-sm tracking-widest font-mono p-2 bg-stone-50 border border-stone-300 rounded-xl"
            />
            <button
              onClick={handleSavePin}
              disabled={pinInput.length !== 4}
              className="px-4 py-2 bg-rose-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl"
            >
              {lang === 'ta' ? 'PIN சேமிக்க' : 'Set PIN'}
            </button>
          </div>
        )}
      </div>

      {/* 3. Local Storage & Data Clearing */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 shadow-2xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 text-purple-800 rounded-2xl">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900">
              {t.privacy.storageTitle}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {t.privacy.storageDesc}
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportData}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-bold text-xs transition"
          >
            <Download className="w-4 h-4 text-stone-600" />
            <span>{lang === 'ta' ? 'என் கணக்குகளை பதிவிறக்கம் செய்ய' : 'Download My Data Backup'}</span>
          </button>

          {!showClearConfirm ? (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl font-bold text-xs transition"
            >
              <Trash2 className="w-4 h-4 text-rose-600" />
              <span>{t.privacy.clearDataBtn}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 p-2 bg-rose-100 rounded-xl">
              <span className="text-xs font-bold text-rose-950">
                {lang === 'ta' ? 'நிச்சயமாக அழிக்க விரும்புகிறீர்களா?' : 'Are you sure?'}
              </span>
              <button
                onClick={() => {
                  onClearAllLocalData();
                  setShowClearConfirm(false);
                  setSuccessNotice(t.privacy.clearSuccess);
                  setTimeout(() => setSuccessNotice(null), 3500);
                }}
                className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold"
              >
                {lang === 'ta' ? 'ஆம், அழி' : 'Yes, Delete'}
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-2 py-1 text-xs text-stone-600"
              >
                {t.common.close}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
