/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  Volume2,
  ExternalLink,
  PhoneCall,
  CheckCircle2,
  FileText,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Building2,
  Scale,
  MapPin,
  Info,
  ArrowLeft
} from 'lucide-react';
import { Language, Scheme } from '../types';
import { schemesData } from '../data/schemesData';
import { translations } from '../data/translations';
import { speakText } from '../utils/speech';

interface SchemesViewProps {
  lang: Language;
  savedSchemeIds: string[];
  onToggleSaveScheme: (schemeId: string) => void;
  onNavigateBack?: () => void;
}

export const SchemesView: React.FC<SchemesViewProps> = ({
  lang,
  savedSchemeIds,
  onToggleSaveScheme,
  onNavigateBack,
}) => {
  const t = translations[lang];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [selectedSchemeForModal, setSelectedSchemeForModal] = useState<Scheme | null>(null);

  // Eligibility Wizard State
  const [showWizard, setShowWizard] = useState(false);
  const [wizardAge, setWizardAge] = useState<string>('21-40');
  const [wizardStatus, setWizardStatus] = useState<string>('homemaker');
  const [wizardIncome, setWizardIncome] = useState<string>('bpl');
  const [wizardResults, setWizardResults] = useState<Scheme[] | null>(null);

  // Ensure scroll is at top when view loads
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Listen for browser popstate to close modal if open
  useEffect(() => {
    const handlePopState = () => {
      if (selectedSchemeForModal) {
        setSelectedSchemeForModal(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedSchemeForModal]);

  const handleOpenModal = (scheme: Scheme) => {
    setSelectedSchemeForModal(scheme);
    try {
      window.history.pushState({ modal: 'scheme-details' }, '');
    } catch {
      // ignore
    }
  };

  const handleCloseModal = () => {
    setSelectedSchemeForModal(null);
  };

  const governmentLevels = [
    { 
      id: 'all', 
      label: lang === 'ta' ? 'அனைத்து திட்டங்கள் (40)' : lang === 'hi' ? 'सभी 40 योजनाएं' : 'All Schemes (40)' 
    },
    { 
      id: 'puducherry', 
      label: lang === 'ta' ? '🌴 புதுச்சேரி அரசு (16)' : lang === 'hi' ? '🌴 पुदुचेरी सरकार (16)' : '🌴 Puducherry UT (16)' 
    },
    { 
      id: 'tamil_nadu', 
      label: lang === 'ta' ? '🏛️ தமிழ்நாடு அரசு (16)' : lang === 'hi' ? '🏛️ तमिलनाडु सरकार (16)' : '🏛️ Tamil Nadu (16)' 
    },
    { 
      id: 'central', 
      label: lang === 'ta' ? '🇮🇳 மத்திய அரசு (8)' : lang === 'hi' ? '🇮🇳 केंद्र सरकार (8)' : '🇮🇳 Central Govt (8)' 
    },
  ];

  const categories = [
    { id: 'all', label: t.schemes.catAll },
    { id: 'financial_aid', label: t.schemes.catFinancial },
    { id: 'education', label: t.schemes.catEducation },
    { id: 'equipment', label: t.schemes.catEquipment },
    { id: 'livelihood', label: t.schemes.catLivelihood },
  ];

  const getLocalized = (ta?: string, hi?: string, en?: string): string => {
    if (lang === 'ta' && ta) return ta;
    if (lang === 'hi' && hi) return hi;
    return en || ta || '';
  };

  const filteredSchemes = useMemo(() => {
    return schemesData.filter((scheme) => {
      // Exclude all loans and loan categories (Requirement 4)
      if (scheme.isLoan || scheme.category === 'shg_loan') {
        return false;
      }

      // Government level filter
      if (selectedLevel !== 'all') {
        if (scheme.governmentLevel !== selectedLevel) return false;
      }
      // Category match
      if (selectedCategory !== 'all' && scheme.category !== selectedCategory) {
        return false;
      }

      // Saved only match
      if (showSavedOnly && !savedSchemeIds.includes(scheme.id)) {
        return false;
      }
      // Search query match across languages
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle =
          scheme.title.toLowerCase().includes(query) ||
          scheme.titleTa.toLowerCase().includes(query) ||
          (scheme.titleHi && scheme.titleHi.toLowerCase().includes(query));
        const matchesBenefits =
          scheme.benefits.toLowerCase().includes(query) ||
          scheme.benefitsTa.toLowerCase().includes(query) ||
          (scheme.benefitsHi && scheme.benefitsHi.toLowerCase().includes(query));
        const matchesDept =
          scheme.department.toLowerCase().includes(query) ||
          scheme.departmentTa.toLowerCase().includes(query) ||
          (scheme.departmentHi && scheme.departmentHi.toLowerCase().includes(query));
        const matchesState =
          scheme.stateOrUt && scheme.stateOrUt.toLowerCase().includes(query);
        const matchesOffice =
          scheme.officeOrServiceCenter && scheme.officeOrServiceCenter.toLowerCase().includes(query);
        return matchesTitle || matchesBenefits || matchesDept || matchesState || matchesOffice;
      }
      return true;
    });
  }, [selectedLevel, selectedCategory, showSavedOnly, searchQuery, savedSchemeIds]);

  const handleSpeakScheme = (scheme: Scheme) => {
    const title = getLocalized(scheme.titleTa, scheme.titleHi, scheme.title);
    const benefits = getLocalized(scheme.benefitsTa, scheme.benefitsHi, scheme.benefits);
    const eligibilityList = lang === 'ta' ? scheme.eligibilityTa : lang === 'hi' && scheme.eligibilityHi ? scheme.eligibilityHi : scheme.eligibility;
    const docsList = lang === 'ta' ? scheme.documentsRequiredTa : lang === 'hi' && scheme.documentsRequiredHi ? scheme.documentsRequiredHi : scheme.documentsRequired;

    const textToSpeak =
      lang === 'ta'
        ? `${title}. வழங்கும் பயன்கள்: ${benefits}. தகுதி: ${eligibilityList.join('. ')}. தேவையான ஆவணங்கள்: ${docsList.join(', ')}.`
        : lang === 'hi'
        ? `${title}। लाभ: ${benefits}। पात्रता: ${eligibilityList.join('. ')}। आवश्यक दस्तावेज: ${docsList.join(', ')}।`
        : `${title}. Benefits: ${benefits}. Eligibility: ${eligibilityList.join('. ')}. Documents required: ${docsList.join(', ')}.`;
    speakText(textToSpeak, lang);
  };

  const handleRunEligibilityWizard = () => {
    let approxAge = 28;
    if (wizardAge === 'under21') approxAge = 19;
    if (wizardAge === 'above40') approxAge = 45;

    const matched = schemesData.filter((scheme) => {
      if (scheme.minAge && approxAge < scheme.minAge) return false;
      if (scheme.maxAge && approxAge > scheme.maxAge) return false;

      if (scheme.targetGroup.length > 0) {
        const matchesRole = scheme.targetGroup.some(
          (role) => role === wizardStatus || role === 'rural'
        );
        if (!matchesRole) return false;
      }

      if (scheme.id === 'sathiyavani-muthu-sewing' && wizardIncome === 'above2_5l') {
        return false;
      }

      return true;
    });

    setWizardResults(matched);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Breadcrumb & Back Bar */}
      <div className="flex items-center justify-between text-xs font-semibold text-stone-600 bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (selectedSchemeForModal) {
                handleCloseModal();
              } else if (onNavigateBack) {
                onNavigateBack();
              }
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-300 hover:bg-stone-100 rounded-lg text-stone-800 font-bold transition shadow-2xs"
            aria-label="Back"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.common.back}</span>
          </button>
          <span>{lang === 'ta' ? 'முகப்பு' : lang === 'hi' ? 'होम' : 'Home'}</span>
          <span>/</span>
          <span className="text-rose-700 font-bold">{t.nav.schemes}</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-stone-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="hidden sm:inline">
            {lang === 'ta' ? 'அதிகாரப்பூர்வ அரசு தகவல்கள்' : lang === 'hi' ? 'सत्यापित सरकारी पोर्टल' : 'Official Gazette Grounded'}
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-700 via-rose-600 to-pink-600 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
              {lang === 'ta' ? 'அரசு அங்கீகரித்த திட்டங்கள்' : lang === 'hi' ? 'सरकारी सत्यापित योजनाएं' : 'Government Verified Schemes'}
            </span>
            <span className="px-2.5 py-1 bg-emerald-500/30 text-emerald-100 rounded-full text-xs font-medium border border-emerald-300/30">
              {schemesData.length} {lang === 'ta' ? 'திட்டங்கள்' : lang === 'hi' ? 'योजनाएं' : 'Schemes'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {t.schemes.title}
          </h1>
          <p className="text-xs sm:text-sm text-rose-100 leading-relaxed mb-4">
            {t.schemes.sub}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowWizard(!showWizard)}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-400 text-stone-900 hover:bg-amber-300 font-bold text-xs sm:text-sm rounded-full shadow-md transition active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.schemes.checkEligibility}</span>
            </button>

            <span className="text-xs text-rose-200">
              {lang === 'ta'
                ? 'தமிழ்நாடு, புதுச்சேரி மற்றும் மத்திய அரசு அதிகாரப்பூர்வ தரவுகளின்படி சரிபார்க்கப்பட்டது'
                : lang === 'hi'
                ? 'तमिलनाडु, पुदुचेरी एवं केंद्र सरकार के आधिकारिक पोर्टल से सत्यापित'
                : 'Central, Tamil Nadu & Puducherry official verified schemes'}
            </span>
          </div>
        </div>
      </div>

      {/* Trust & Transparency Notice */}
      <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-950">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-bold">
            {lang === 'ta' ? 'முக்கிய அறிவிப்பு & வெளிப்படைத்தன்மை:' : lang === 'hi' ? 'पारदर्शिता एवं महत्वपूर्ण सूचना:' : 'Transparency & Official Notice:'}
          </strong>{' '}
          {lang === 'ta'
            ? 'இங்குள்ள திட்டங்கள் அனைத்தும் அதிகாரப்பூர்வ அரசு அறிவிக்கைகள் மற்றும் இணையதளங்கள் அடிப்படையில் சரிபார்க்கப்பட்டவை. SHERISE இடைத்தரகர் அல்ல; எவ்வித கட்டணமும் வசூலிப்பதில்லை. அரசு தகுதி விதிகளுக்கு உட்பட்டு விண்ணப்பங்கள் நேரடியாக அரசு அலுவலகம் அல்லது அதிகாரப்பூர்வ போர்ட்டலில் சமர்ப்பிக்கப்பட வேண்டும்.'
            : lang === 'hi'
            ? 'सभी योजनाएं आधिकारिक सरकारी अधिसूचनाओं और पोर्टलों के आधार पर सत्यापित हैं। SHERISE कोई बिचौलिया नहीं है और कोई शुल्क नहीं लेता। आवेदन केवल संबंधित सरकारी कार्यालय या अधिकृत पोर्टल पर ही जमा करें।'
            : 'All schemes are verified from official government portals and gazettes. SHERISE does not charge any fees or guarantee approvals. Final eligibility and sanctions are strictly determined by the respective government authority.'}
        </div>
      </div>

      {/* Interactive Eligibility Wizard Modal/Card */}
      {showWizard && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-5 sm:p-7 shadow-md space-y-4 animate-fadeIn">
          <div className="flex items-start justify-between border-b border-amber-200/80 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h2 className="text-base font-extrabold text-stone-900">
                  {lang === 'ta'
                    ? '3 கேள்விகளில் உங்கள் தகுதியை கண்டறியுங்கள்'
                    : lang === 'hi'
                    ? '3 प्रश्नों में अपनी पात्रता की जांच करें'
                    : 'Instant 3-Question Eligibility Check'}
                </h2>
                <p className="text-xs text-stone-600">
                  {lang === 'ta'
                    ? 'உங்களுக்கு மிகவும் பொருத்தமான திட்டங்கள் உடனடியாக வரிசைப்படுத்தப்படும்'
                    : lang === 'hi'
                    ? 'आपके लिए उपयुक्त योजनाएं तुरंत प्रदर्शित की जाएंगी'
                    : 'Personalized scheme recommendations tailored to you'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowWizard(false)}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
              aria-label="Close eligibility wizard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Question 1: Age */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-800 block">
                {lang === 'ta' ? '1. உங்கள் வயது வரம்பு:' : lang === 'hi' ? '1. आपकी आयु सीमा:' : '1. Your Age Group:'}
              </label>
              <select
                value={wizardAge}
                onChange={(e) => setWizardAge(e.target.value)}
                className="w-full text-xs font-medium p-2.5 bg-white border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500"
              >
                <option value="under21">{lang === 'ta' ? '21 வயதுக்கு கீழ்' : lang === 'hi' ? '21 वर्ष से कम' : 'Below 21 years'}</option>
                <option value="21-40">{lang === 'ta' ? '21 முதல் 40 வயது வரை' : lang === 'hi' ? '21 से 40 वर्ष' : '21 to 40 years'}</option>
                <option value="above40">{lang === 'ta' ? '40 வயதுக்கு மேல்' : lang === 'hi' ? '40 वर्ष से अधिक' : 'Above 40 years'}</option>
              </select>
            </div>

            {/* Question 2: Current Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-800 block">
                {lang === 'ta' ? '2. உங்கள் தற்போதைய நிலை:' : lang === 'hi' ? '2. आपकी वर्तमान स्थिति:' : '2. Your Current Status:'}
              </label>
              <select
                value={wizardStatus}
                onChange={(e) => setWizardStatus(e.target.value)}
                className="w-full text-xs font-medium p-2.5 bg-white border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500"
              >
                <option value="homemaker">
                  {lang === 'ta' ? 'இல்லத்தரசி (வீட்டுத் தலைவி)' : lang === 'hi' ? 'गृहणी (गृहिणी)' : 'Homemaker / Mother'}
                </option>
                <option value="dropout">
                  {lang === 'ta' ? 'கல்வியை பாதியில் நிறுத்தியவர்' : lang === 'hi' ? 'शिक्षा अधूरी छोड़ने वाली' : 'Discontinued Studies'}
                </option>
                <option value="entrepreneur">
                  {lang === 'ta' ? 'சுயஉதவிக்குழு / சிறுதொழில்' : lang === 'hi' ? 'एसएचजी सदस्य / उद्यमी' : 'SHG Member / Entrepreneur'}
                </option>
                <option value="student">
                  {lang === 'ta' ? 'மாணவி (உயர்கல்வி)' : lang === 'hi' ? 'छात्रा (उच्च शिक्षा)' : 'Student (Higher Ed)'}
                </option>
              </select>
            </div>

            {/* Question 3: Income band */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-800 block">
                {lang === 'ta' ? '3. குடும்ப ஆண்டு வருமானம்:' : lang === 'hi' ? '3. पारिवारिक वार्षिक आय:' : '3. Family Annual Income:'}
              </label>
              <select
                value={wizardIncome}
                onChange={(e) => setWizardIncome(e.target.value)}
                className="w-full text-xs font-medium p-2.5 bg-white border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500"
              >
                <option value="bpl">
                  {lang === 'ta' ? '₹72,000-க்குள் (BPL ஏழ்மை நிலை)' : lang === 'hi' ? '₹72,000 से कम (बीपीएल)' : 'Under ₹72,000 (BPL)'}
                </option>
                <option value="under2_5l">
                  {lang === 'ta' ? '₹72,000 முதல் ₹2.5 லட்சம் வரை' : lang === 'hi' ? '₹72,000 से ₹2.5 लाख तक' : '₹72,000 to ₹2.5 Lakhs'}
                </option>
                <option value="above2_5l">
                  {lang === 'ta' ? '₹2.5 லட்சத்திற்கு மேல்' : lang === 'hi' ? '₹2.5 लाख से अधिक' : 'Above ₹2.5 Lakhs'}
                </option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleRunEligibilityWizard}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
            >
              {lang === 'ta' ? 'எனக்கான திட்டங்களை காட்டு' : lang === 'hi' ? 'मेरी योजनाएं देखें' : 'Find My Eligible Schemes'}
            </button>

            {wizardResults && (
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-lg">
                {lang === 'ta'
                  ? `${wizardResults.length} திட்டங்கள் உங்களுக்கு பொருந்துகிறது!`
                  : lang === 'hi'
                  ? `${wizardResults.length} योजनाएं आपके लिए उपयुक्त हैं!`
                  : `Found ${wizardResults.length} matching schemes!`}
              </span>
            )}
          </div>

          {/* Wizard Results Highlight List */}
          {wizardResults && (
            <div className="pt-3 border-t border-amber-200 space-y-2">
              <h3 className="text-xs font-bold text-stone-800">
                {lang === 'ta' ? 'உங்களுக்கு பரிந்துரைக்கப்படும் திட்டங்கள்:' : lang === 'hi' ? 'आपके लिए अनुशंसित योजनाएं:' : 'Your Matched Schemes:'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {wizardResults.map((scheme) => (
                  <div
                    key={scheme.id}
                    onClick={() => setSelectedSchemeForModal(scheme)}
                    className="p-3 bg-white rounded-xl border border-amber-300 hover:border-rose-400 cursor-pointer flex items-center justify-between transition shadow-2xs"
                  >
                    <div>
                      <div className="font-bold text-xs text-stone-900">
                        {getLocalized(scheme.titleTa, scheme.titleHi, scheme.title)}
                      </div>
                      <div className="text-[11px] text-rose-700 font-semibold line-clamp-1">
                        {getLocalized(scheme.benefitsTa, scheme.benefitsHi, scheme.benefits)}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400 shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Multi-Criteria Filters Container */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs space-y-3.5">
        {/* Search bar & Saved button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'ta'
                  ? 'திட்டம் பெயர், துறை, மாநிலம், பயன்களை தேடுக...'
                  : lang === 'hi'
                  ? 'योजना का नाम, विभाग, राज्य या लाभ खोजें...'
                  : 'Search schemes by title, department, state, or keywords...'
              }
              className="w-full pl-9 pr-8 py-2 text-xs border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Bookmarked / Saved Toggle */}
          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition shrink-0 ${
              showSavedOnly
                ? 'bg-rose-100 border-rose-300 text-rose-800'
                : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            {showSavedOnly ? (
              <BookmarkCheck className="w-4 h-4 text-rose-600 fill-rose-600" />
            ) : (
              <Bookmark className="w-4 h-4 text-stone-500" />
            )}
            <span>
              {lang === 'ta'
                ? `சேமித்தவை (${savedSchemeIds.length})`
                : lang === 'hi'
                ? `सहेजे गए (${savedSchemeIds.length})`
                : `Saved (${savedSchemeIds.length})`}
            </span>
          </button>
        </div>

        {/* Filter Row 1: Government Level */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            {lang === 'ta' ? 'அரசு நிலை / பிராந்தியம்:' : lang === 'hi' ? 'सरकार स्तर / क्षेत्र:' : 'Government Level / Region:'}
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {governmentLevels.map((lvl) => {
              const isSelected = selectedLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => setSelectedLevel(lvl.id)}
                  className={`px-3 py-1.5 rounded-full font-semibold transition whitespace-nowrap ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {lvl.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Row 2: Categories */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            {lang === 'ta' ? 'திட்ட வகை:' : lang === 'hi' ? 'योजना श्रेणी:' : 'Scheme Category:'}
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full font-semibold transition whitespace-nowrap ${
                    isSelected
                      ? 'bg-rose-600 text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scheme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSchemes.map((scheme) => {
          const isSaved = savedSchemeIds.includes(scheme.id);
          const title = getLocalized(scheme.titleTa, scheme.titleHi, scheme.title);
          const dept = getLocalized(scheme.departmentTa, scheme.departmentHi, scheme.department);
          const benefits = getLocalized(scheme.benefitsTa, scheme.benefitsHi, scheme.benefits);
          const badge = getLocalized(scheme.badgeTa, scheme.badgeHi, scheme.badge);
          const eligibilityList = lang === 'ta' ? scheme.eligibilityTa : lang === 'hi' && scheme.eligibilityHi ? scheme.eligibilityHi : scheme.eligibility;
          const office = getLocalized(scheme.officeOrServiceCenterTa, scheme.officeOrServiceCenterHi, scheme.officeOrServiceCenter);

          return (
            <div
              key={scheme.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Header row: Grant Badge & Region Pill */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                      {lang === 'ta' ? '✨ 100% இலவச அரசு மானியம்' : lang === 'hi' ? '✨ 100% मुफ्त सरकारी अनुदान' : '✨ 100% Free Government Grant'}
                    </span>

                    {scheme.stateOrUt && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        📍 {scheme.stateOrUt}
                      </span>
                    )}

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                      {badge || (lang === 'ta' ? 'அரசு திட்டம்' : lang === 'hi' ? 'सरकारी योजना' : 'Govt Scheme')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Read Aloud button */}
                    <button
                      onClick={() => handleSpeakScheme(scheme)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 rounded-full hover:bg-rose-50 transition"
                      title={t.common.readAloud}
                      aria-label={`Listen to ${title}`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    {/* Bookmark save button */}
                    <button
                      onClick={() => onToggleSaveScheme(scheme.id)}
                      className={`p-1.5 rounded-full transition ${
                        isSaved
                          ? 'text-rose-600 bg-rose-50'
                          : 'text-stone-400 hover:text-rose-600 hover:bg-stone-50'
                      }`}
                      title={isSaved ? t.common.saved : t.common.save}
                      aria-label={isSaved ? 'Remove from saved' : 'Save scheme'}
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-4 h-4 fill-rose-600 text-rose-600" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Scheme Title */}
                <h3 className="text-base font-bold text-stone-900 leading-snug mb-1">
                  {title}
                </h3>

                <p className="text-[11px] text-stone-600 font-medium mb-3 flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-stone-400 shrink-0" />
                  <span className="line-clamp-1">{dept}</span>
                </p>

                {/* Benefits Banner */}
                <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl mb-3">
                  <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide flex items-center gap-1 mb-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.schemes.benefitsHeader}</span>
                  </div>
                  <p className="text-xs font-semibold text-emerald-950 leading-relaxed">
                    {benefits}
                  </p>
                </div>

                {/* Where to Apply Office Callout */}
                {office && (
                  <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-[11px] text-stone-700 mb-3 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-stone-900">
                        {lang === 'ta' ? 'விண்ணப்பிக்கும் இடம்:' : lang === 'hi' ? 'आवेदन का स्थान:' : 'Where to Apply:'}
                      </strong>{' '}
                      {office}
                    </div>
                  </div>
                )}

                {/* Eligibility preview */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-stone-600">
                    {t.schemes.whoCanApply}
                  </span>
                  <ul className="text-xs text-stone-600 space-y-1">
                    {eligibilityList.slice(0, 2).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-rose-500 font-bold shrink-0">•</span>
                        <span className="line-clamp-2">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Verification Date */}
                {scheme.verificationDate && (
                  <div className="mt-3 flex items-center gap-2 text-[10px] text-stone-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-600" />
                      <span>{lang === 'ta' ? 'சரிபார்க்கப்பட்டது:' : lang === 'hi' ? 'सत्यापित:' : 'Verified:'} {scheme.verificationDate}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                {scheme.helpline ? (
                  <a
                    href={`tel:${scheme.helpline.split('/')[0].trim()}`}
                    className="flex items-center gap-1 text-[11px] font-bold text-stone-600 hover:text-rose-700"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-rose-500" />
                    <span>{scheme.helpline}</span>
                  </a>
                ) : (
                  <span className="text-[11px] text-stone-600">
                    {t.common.verifiedGovt}
                  </span>
                )}

                <button
                  onClick={() => handleOpenModal(scheme)}
                  className="flex items-center gap-1 px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl transition"
                >
                  <span>{t.common.viewDetails}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-6">
          <AlertCircle className="w-10 h-10 text-stone-400 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-stone-800">
            {lang === 'ta' ? 'திட்டங்கள் எதுவும் கிடைக்கவில்லை' : lang === 'hi' ? 'कोई योजना नहीं मिली' : 'No schemes match your filter'}
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            {lang === 'ta'
              ? 'தயவுசெய்து தேடல் சொல்லை மாற்றவும் அல்லது வடிகட்டியை நீக்கவும்.'
              : lang === 'hi'
              ? 'कृपया खोज शब्द बदलें या फ़िल्टर रीसेट करें।'
              : 'Try clearing your search query or choosing another category.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedLevel('all');
              setSelectedCategory('all');
              setShowSavedOnly(false);
            }}
            className="mt-3 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold"
          >
            {lang === 'ta' ? 'அனைத்து வடிகட்டிகளையும் நீக்கு' : lang === 'hi' ? 'फ़िल्टर रीसेट करें' : 'Reset All Filters'}
          </button>
        </div>
      )}

      {/* Scheme Full Details Modal Drawer */}
      {selectedSchemeForModal && (
        <div
          role="dialog"
          aria-label="Scheme Full Details"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-stone-100 pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                    {lang === 'ta' ? '✨ 100% இலவச மானிய உதவி (Non-Repayable Grant)' : lang === 'hi' ? '✨ 100% निःशुल्क सरकारी अनुदान' : '✨ 100% Non-Repayable Grant'}
                  </span>
                  {selectedSchemeForModal.stateOrUt && (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900">
                      📍 {selectedSchemeForModal.stateOrUt}
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-extrabold text-stone-900 leading-snug">
                  {getLocalized(selectedSchemeForModal.titleTa, selectedSchemeForModal.titleHi, selectedSchemeForModal.title)}
                </h2>
                <p className="text-xs text-stone-500 font-medium mt-0.5">
                  {getLocalized(selectedSchemeForModal.departmentTa, selectedSchemeForModal.departmentHi, selectedSchemeForModal.department)}
                </p>
              </div>

              <button
                onClick={handleCloseModal}
                className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Read Aloud button in modal */}
            <div className="flex items-center justify-between p-3 bg-rose-50 rounded-2xl border border-rose-200 text-xs">
              <span className="font-semibold text-rose-900">
                {lang === 'ta'
                  ? 'இந்த திட்ட விவரங்களை தமிழில் வாசித்து கேட்க விரும்புகிறீர்களா?'
                  : lang === 'hi'
                  ? 'क्या आप इस योजना का विवरण सुनना चाहती हैं?'
                  : 'Would you like to listen to these scheme instructions?'}
              </span>
              <button
                onClick={() => handleSpeakScheme(selectedSchemeForModal)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 text-white font-bold rounded-xl shadow-xs hover:bg-rose-700"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{t.common.listen}</span>
              </button>
            </div>

            {/* Official Source & Verification Pill */}
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs space-y-1.5 text-stone-600">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>{lang === 'ta' ? 'அதிகாரப்பூர்வ துறை:' : lang === 'hi' ? 'आधिकारिक विभाग:' : 'Official Authority:'}</strong>{' '}
                  {selectedSchemeForModal.sourceName || selectedSchemeForModal.officialSource}
                </span>
              </div>
              <div className="text-[11px] text-stone-500 pl-5">
                {lang === 'ta' ? 'சரிபார்க்கப்பட்ட நிலை: 2026 அரசு அரசிதழ் / அதிகாரப்பூர்வ இணையதளம்' : lang === 'hi' ? 'सत्यापन स्थिति: 2026 आधिकारिक गजट' : 'Verification Status: 2026 Official Gazette / Verified Web Portal'}
              </div>
            </div>

            {/* Where to apply location guidance */}
            {selectedSchemeForModal.officeOrServiceCenter && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-blue-900">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>
                    {lang === 'ta' ? 'விண்ணப்பிக்க அணுக வேண்டிய அரசு அலுவலகம் / மையம்:' : lang === 'hi' ? 'आवेदन हेतु संपर्क केंद्र / सरकारी कार्यालय:' : 'Where to Apply (Office / Service Center):'}
                  </span>
                </div>
                <p className="pl-5 leading-relaxed font-medium">
                  {getLocalized(
                    selectedSchemeForModal.officeOrServiceCenterTa,
                    selectedSchemeForModal.officeOrServiceCenterHi,
                    selectedSchemeForModal.officeOrServiceCenter
                  )}
                </p>
              </div>
            )}

            {/* Benefits section */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t.schemes.benefitsHeader}</span>
              </h3>
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-semibold text-emerald-950 leading-relaxed">
                {getLocalized(selectedSchemeForModal.benefitsTa, selectedSchemeForModal.benefitsHi, selectedSchemeForModal.benefits)}
              </div>
            </div>

            {/* Who can apply */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-stone-900">
                {t.schemes.whoCanApply}
              </h3>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {(lang === 'ta'
                  ? selectedSchemeForModal.eligibilityTa
                  : lang === 'hi' && selectedSchemeForModal.eligibilityHi
                  ? selectedSchemeForModal.eligibilityHi
                  : selectedSchemeForModal.eligibility
                ).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Documents */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-rose-600" />
                <span>{t.schemes.requiredDocs}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(lang === 'ta'
                  ? selectedSchemeForModal.documentsRequiredTa
                  : lang === 'hi' && selectedSchemeForModal.documentsRequiredHi
                  ? selectedSchemeForModal.documentsRequiredHi
                  : selectedSchemeForModal.documentsRequired
                ).map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How to apply */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-stone-900">
                {t.schemes.applicationSteps}
              </h3>
              <ol className="space-y-2 text-xs text-stone-700">
                {(lang === 'ta'
                  ? selectedSchemeForModal.applicationStepsTa
                  : lang === 'hi' && selectedSchemeForModal.applicationStepsHi
                  ? selectedSchemeForModal.applicationStepsHi
                  : selectedSchemeForModal.applicationSteps
                ).map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-2 bg-stone-50 rounded-xl">
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Links, Helplines and Back Footer */}
            <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCloseModal}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{lang === 'ta' ? 'பட்டியலுக்கு திரும்பு' : lang === 'hi' ? 'सूची पर वापस' : 'Back to Schemes'}</span>
                </button>

                {selectedSchemeForModal.helpline && (
                  <a
                    href={`tel:${selectedSchemeForModal.helpline.split('/')[0].trim()}`}
                    className="flex items-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 rounded-xl text-xs font-bold text-rose-800"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
                    <span>
                      {t.common.helpline}: {selectedSchemeForModal.helpline}
                    </span>
                  </a>
                )}
              </div>

              {selectedSchemeForModal.officialUrl && (
                <a
                  href={selectedSchemeForModal.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  <span>{t.common.officialSite}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
