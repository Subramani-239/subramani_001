/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Sparkles,
  Globe,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Shield,
  Menu,
  X,
  Home,
  FileCheck2,
  GraduationCap,
  Sparkle,
  Calculator,
  Users,
  Lock,
  Rocket,
  AlertTriangle,
  MessageCircle,
  GraduationCap as LearnIcon,
  UserCheck,
  Briefcase,
  CreditCard,
  ChevronDown
} from 'lucide-react';
import { Language, ActiveTab } from '../types';
import { translations } from '../data/translations';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  isSpeaking: boolean;
  onToggleSpeakPage: () => void;
  isListeningVoice: boolean;
  onToggleVoiceRecognition: () => void;
  onTriggerQuickShield: () => void;
  onOpenDeploymentGuide: () => void;
  fontSize: 'normal' | 'large';
  onToggleFontSize: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  activeTab,
  onTabChange,
  isSpeaking,
  onToggleSpeakPage,
  isListeningVoice,
  onToggleVoiceRecognition,
  onTriggerQuickShield,
  onOpenDeploymentGuide,
  fontSize,
  onToggleFontSize,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const t = translations[lang];

  // The 8 Primary Main Navigation items required by spec
  const primaryNavItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: t.nav.home || 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'skills-learning', label: t.nav.learn || 'Learn', icon: <LearnIcon className="w-4 h-4" /> },
    { id: 'find-teachers', label: t.nav.findTeachers || 'Find Teachers', icon: <Users className="w-4 h-4" /> },
    { id: 'earn', label: t.nav.earn || 'Earn', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'entrepreneurs', label: t.nav.entrepreneurs || 'Entrepreneurs', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'schemes', label: t.nav.schemes || 'Government Schemes', icon: <FileCheck2 className="w-4 h-4" /> },
    { id: 'payments', label: t.nav.payments || 'Payments', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'profile', label: t.nav.profile || 'Profile', icon: <UserCheck className="w-4 h-4" /> },
  ];

  // Preserved Secondary Features in "More" Menu
  const secondaryNavItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'emergency-help', label: t.nav.emergencyHelp, icon: <AlertTriangle className="w-4 h-4 text-rose-500" /> },
    { id: 'budget-calculator', label: t.nav.budgetCalculator, icon: <Calculator className="w-4 h-4 text-blue-500" /> },
    { id: 'community', label: t.nav.community, icon: <Users className="w-4 h-4 text-pink-500" /> },
    { id: 'chat-call', label: t.nav.chatCall, icon: <MessageCircle className="w-4 h-4 text-teal-500" /> },
    { id: 'skills', label: t.nav.skills, icon: <Sparkle className="w-4 h-4 text-amber-500" /> },
    { id: 'business-generator', label: t.nav.businessGenerator, icon: <Sparkles className="w-4 h-4 text-purple-500" /> },
    { id: 'education', label: t.nav.education, icon: <GraduationCap className="w-4 h-4 text-emerald-500" /> },
    { id: 'privacy', label: t.nav.privacy, icon: <Lock className="w-4 h-4 text-stone-500" /> },
  ];

  const handleNavClick = (tabId: ActiveTab) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
  };

  const languages: { code: Language; label: string }[] = [
    { code: 'ta', label: 'தமிழ்' },
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-xs">
      {/* Top utility & safety bar */}
      <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 text-white px-3 sm:px-6 py-1.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-rose-50 hidden sm:inline">
            {lang === 'ta'
              ? 'அரசு அங்கீகாரம் & பெண்களின் தன்னம்பிக்கை தளம்'
              : lang === 'hi'
              ? 'सरकारी मान्यता प्राप्त महिला सशक्तिकरण एवं स्वावलंबन मंच'
              : 'Verified Empowerment & Financial Dignity for Women'}
          </span>
          <span className="font-medium text-rose-50 sm:hidden">SHERISE</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Font Size Accessibility Toggle */}
          <button
            onClick={onToggleFontSize}
            className="px-2 py-0.5 bg-white/20 hover:bg-white/30 rounded text-[11px] font-bold transition flex items-center gap-1"
            title={fontSize === 'normal' ? t.common.fontIncrease : t.common.fontDecrease}
            aria-label={fontSize === 'normal' ? t.common.fontIncrease : t.common.fontDecrease}
          >
            <span>{fontSize === 'normal' ? 'A+' : 'A-'}</span>
          </button>

          {/* 3-Way Language Selector */}
          <div className="flex items-center bg-black/20 rounded-full p-0.5 text-[11px] font-bold">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => onLanguageChange(l.code)}
                className={`px-2 py-0.5 rounded-full transition ${
                  lang === l.code
                    ? 'bg-white text-rose-800 shadow-2xs font-extrabold'
                    : 'text-rose-100 hover:text-white'
                }`}
                aria-label={`Switch to ${l.label}`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Quick Shield Emergency Discreet Button */}
          <button
            onClick={onTriggerQuickShield}
            className="flex items-center gap-1 px-2.5 py-0.5 bg-amber-400 text-stone-900 hover:bg-amber-300 font-bold rounded-full text-xs transition shadow-xs"
            title={t.common.discreetTooltip}
            aria-label={t.common.discreetShield}
          >
            <Shield className="w-3.5 h-3.5 fill-stone-900" />
            <span className="hidden sm:inline">{t.common.discreetShield}</span>
          </button>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Brand */}
        <BrandLogo
          size="md"
          variant="dark"
          showTagline={true}
          regionBadge={lang === 'ta' ? 'தமிழ்நாடு' : lang === 'hi' ? 'भारत' : 'India'}
          onClick={() => onTabChange('dashboard')}
        />

        {/* Audio Assistance, Emergency Quick Trigger, and Voice Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Direct Red Emergency Button for quick 1-tap access */}
          <button
            onClick={() => onTabChange('emergency-help')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition shadow-xs ${
              activeTab === 'emergency-help'
                ? 'bg-rose-700 text-white ring-2 ring-rose-400'
                : 'bg-rose-600 hover:bg-rose-700 text-white'
            }`}
            title="112 Emergency SOS Help"
            aria-label="Open emergency assistance"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <AlertTriangle className="w-4 h-4 fill-white text-rose-600" />
            <span className="font-extrabold">{lang === 'ta' ? 'அவசரம் 112' : lang === 'hi' ? 'आपातकाल 112' : 'SOS 112'}</span>
          </button>

          {/* Read aloud TTS button */}
          <button
            onClick={onToggleSpeakPage}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
              isSpeaking
                ? 'bg-rose-100 border-rose-300 text-rose-700 animate-pulse'
                : 'bg-rose-50/70 border-rose-200 text-rose-900 hover:bg-rose-100'
            }`}
            title={isSpeaking ? t.common.stopAudio : t.common.readAloud}
            aria-label={isSpeaking ? t.common.stopAudio : t.common.readAloud}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4 text-rose-600" />
                <span className="hidden md:inline">{t.common.stopAudio}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-rose-600" />
                <span className="hidden md:inline">{t.common.listen}</span>
              </>
            )}
          </button>

          {/* Voice Command Recognition Button */}
          <button
            onClick={onToggleVoiceRecognition}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
              isListeningVoice
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-md animate-bounce'
                : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
            title={isListeningVoice ? 'Listening...' : t.common.voiceNavHint}
            aria-label={isListeningVoice ? 'Listening voice commands' : 'Start voice navigation'}
          >
            {isListeningVoice ? (
              <>
                <MicOff className="w-4 h-4 text-white" />
                <span className="hidden md:inline">
                  {lang === 'ta' ? 'கேட்கிறது...' : lang === 'hi' ? 'सुन रहा है...' : 'Listening...'}
                </span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 text-emerald-600" />
                <span className="hidden md:inline">
                  {lang === 'ta' ? 'குரல் வழிசெலுத்தல்' : lang === 'hi' ? 'आवाज से खोजें' : 'Voice Nav'}
                </span>
              </>
            )}
          </button>

          {/* Free deployment guide modal trigger */}
          <button
            onClick={onOpenDeploymentGuide}
            className="hidden xl:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition"
            aria-label="View free deployment guide"
          >
            <Rocket className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.nav.deploymentGuide}</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-700 hover:text-rose-600 lg:hidden rounded-lg hover:bg-rose-50 transition"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Navigation Tabs */}
      <nav
        aria-label="Desktop primary navigation"
        className="hidden lg:block bg-rose-50/40 border-t border-rose-100/60 relative"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* The 8 Primary Required Nav Items */}
          <div className="flex items-center gap-1 py-1 overflow-x-auto no-scrollbar">
            {primaryNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    handleNavClick(item.id);
                    setMoreDropdownOpen(false);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
                    isActive
                      ? 'bg-rose-600 text-white shadow-xs font-bold'
                      : 'text-stone-700 hover:bg-rose-100/60 hover:text-rose-950'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Preserved Features "More" Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition ${
                  moreDropdownOpen || secondaryNavItems.some((s) => s.id === activeTab)
                    ? 'bg-rose-100 text-rose-900 font-bold'
                    : 'text-stone-600 hover:bg-rose-100/50 hover:text-stone-900'
                }`}
                aria-expanded={moreDropdownOpen}
              >
                <span>{lang === 'ta' ? 'கூடுதல் கருவிகள்' : lang === 'hi' ? 'अधिक' : 'More'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreDropdownOpen && (
                <div
                  className="absolute right-0 mt-1 w-56 bg-white border border-rose-200 rounded-2xl shadow-xl py-2 z-50 animate-fadeIn"
                  onMouseLeave={() => setMoreDropdownOpen(false)}
                >
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-400 border-b border-stone-100 mb-1">
                    {lang === 'ta' ? 'பாதுகாக்கப்பட்ட அம்சங்கள்' : 'Preserved Tools'}
                  </div>
                  {secondaryNavItems.map((sub) => {
                    const isSubActive = activeTab === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => {
                          handleNavClick(sub.id);
                          setMoreDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left transition ${
                          isSubActive
                            ? 'bg-rose-50 text-rose-800 font-bold'
                            : 'text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {sub.icon}
                        <span className="truncate">{sub.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-label="Mobile Navigation Menu"
          className="lg:hidden bg-white border-b border-rose-200 shadow-xl px-4 py-4 space-y-4 animate-fadeIn max-h-[80vh] overflow-y-auto"
        >
          {/* Primary Nav Section */}
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 mb-2">
              {lang === 'ta' ? 'முதன்மை சேவைகள்' : lang === 'hi' ? 'मुख्य सेवाएं' : 'Main Services'}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {primaryNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition ${
                      isActive
                        ? 'bg-rose-600 text-white shadow-xs font-bold'
                        : 'bg-stone-50 hover:bg-rose-50 text-stone-800'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className={isActive ? 'text-white' : 'text-rose-600'}>
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary & Preserved Features */}
          <div className="pt-2 border-t border-stone-100">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 mb-2">
              {lang === 'ta' ? 'கூடுதல் சேவைகள்' : lang === 'hi' ? 'अन्य सुविधाएं' : 'Additional Tools'}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {secondaryNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-left transition ${
                      isActive
                        ? 'bg-rose-100 text-rose-900 font-bold border border-rose-300'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.icon}
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenDeploymentGuide();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200 w-full justify-center"
            >
              <Rocket className="w-4 h-4 text-amber-600" />
              <span>{t.nav.deploymentGuide}</span>
            </button>
          </div>
        </div>
      )}

      {/* Listening Banner if voice navigation is actively listening */}
      {isListeningVoice && (
        <div className="bg-emerald-600 text-white px-4 py-2 text-center text-xs font-medium flex items-center justify-center gap-2 shadow-inner">
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
          <span>{t.common.listeningVoice}</span>
        </div>
      )}
    </header>
  );
};
