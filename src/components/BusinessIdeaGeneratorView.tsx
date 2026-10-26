/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Printer,
  Volume2,
  CheckCircle2,
  Coins,
  Clock,
  MapPin,
  Users,
  ShieldAlert,
  ArrowRight,
  RotateCcw,
  ShoppingBag,
  Store,
  Scale,
  Navigation,
  Compass,
  AlertTriangle,
  Info,
  Check,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import {
  Language,
  ActiveTab,
  LocationBusinessIdea,
  BusinessIdeaInput,
  LocationQuery,
  BudgetItemPlan
} from '../types';
import {
  recommendLocationBusinesses,
  transferItemsToBudgetPlan
} from '../utils/businessPlannerLogic';
import { RawMaterialFinderModal } from './RawMaterialFinderModal';
import { translations } from '../data/translations';
import { speakText } from '../utils/speech';
import { formatCurrency } from '../utils/calculator';

interface BusinessIdeaGeneratorViewProps {
  lang: Language;
  onNavigate?: (tab: ActiveTab) => void;
  onNavigateBack?: () => void;
}

export const BusinessIdeaGeneratorView: React.FC<BusinessIdeaGeneratorViewProps> = ({
  lang,
  onNavigate,
  onNavigateBack,
}) => {
  const t = translations[lang];

  // Location State
  const [stateOrUt, setStateOrUt] = useState<'puducherry' | 'tamil_nadu' | 'other'>('puducherry');
  const [district, setDistrict] = useState<string>('Puducherry');
  const [town, setTown] = useState<string>('Puducherry Town');
  const [locality, setLocality] = useState<string>('Lawspet');
  const [isGpsLoading, setIsGpsLoading] = useState<boolean>(false);
  const [gpsMessage, setGpsMessage] = useState<string | null>(null);

  // Questionnaire States
  const [currentProfession, setCurrentProfession] = useState<string>('Homemaker');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Cooking', 'Stitching']);
  const [budgetAmount, setBudgetAmount] = useState<number>(25000);
  const [workingHours, setWorkingHours] = useState<'1-2' | '2-3' | '3-4' | 'full_day' | 'flexible'>('2-3');
  const [preferredCategory, setPreferredCategory] = useState<string>('all');
  const [interests, setInterests] = useState<string[]>(['Food', 'Home Craft']);

  // Modal State
  const [isRawMaterialModalOpen, setIsRawMaterialModalOpen] = useState<boolean>(false);
  const [selectedPlanForSourcing, setSelectedPlanForSourcing] = useState<LocationBusinessIdea | null>(null);
  const [transferToast, setTransferToast] = useState<string | null>(null);

  // Active Recommended Plans
  const [recommendations, setRecommendations] = useState<LocationBusinessIdea[]>(() => {
    return recommendLocationBusinesses({
      location: {
        stateOrUt: 'puducherry',
        district: 'Puducherry',
        town: 'Puducherry Town',
        locality: 'Lawspet',
      },
      currentProfession: 'Homemaker',
      skills: ['Cooking', 'Stitching'],
      budgetAmount: 25000,
      workingHours: '2-3',
      preferredCategory: 'all',
      interests: ['Food', 'Home Craft'],
    });
  });

  const [selectedIdeaId, setSelectedIdeaId] = useState<string>(() => recommendations[0]?.id || 'idea-pondy-idli-batter');

  const activePlan = useMemo(() => {
    return recommendations.find((r) => r.id === selectedIdeaId) || recommendations[0];
  }, [recommendations, selectedIdeaId]);

  // Handle GPS location detection with user consent
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setGpsMessage(
        lang === 'ta'
          ? 'உங்கள் உலாவியில் GPS இருப்பிட சேவை ஆதரிக்கப்படவில்லை. தயவுசெய்து கீழே கையேடாக தேர்ந்தெடுக்கவும்.'
          : 'Geolocation is not supported by your browser. Please select your district manually below.'
      );
      return;
    }

    setIsGpsLoading(true);
    setGpsMessage(
      lang === 'ta'
        ? 'இருப்பிட அனுமதி கேட்கப்படுகிறது...'
        : 'Requesting location permission...'
    );

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setIsGpsLoading(false);

        // Approximate regional detection based on Tamil Nadu / Puducherry bounding coordinates
        // Puducherry ~ 11.94 N, 79.80 E; Karaikal ~ 10.92 N, 79.83 E; Chennai ~ 13.08 N, 80.27 E; Madurai ~ 9.92 N, 78.11 E
        let detectedDistrict = 'Puducherry';
        let detectedState: 'puducherry' | 'tamil_nadu' = 'puducherry';
        let detectedTown = 'Puducherry Town';

        if (latitude >= 10.85 && latitude <= 11.05 && longitude >= 79.75 && longitude <= 79.90) {
          detectedDistrict = 'Karaikal';
          detectedState = 'puducherry';
          detectedTown = 'Karaikal Town';
        } else if (latitude >= 12.9 && latitude <= 13.3) {
          detectedDistrict = 'Chennai';
          detectedState = 'tamil_nadu';
          detectedTown = 'Chennai Central';
        } else if (latitude >= 9.7 && latitude <= 10.1) {
          detectedDistrict = 'Madurai';
          detectedState = 'tamil_nadu';
          detectedTown = 'Madurai';
        } else if (latitude >= 10.8 && latitude <= 11.2 && longitude <= 77.2) {
          detectedDistrict = 'Coimbatore';
          detectedState = 'tamil_nadu';
          detectedTown = 'Coimbatore';
        } else if (latitude >= 11.5 && latitude <= 11.8 && longitude <= 78.3) {
          detectedDistrict = 'Salem';
          detectedState = 'tamil_nadu';
          detectedTown = 'Salem';
        }

        setStateOrUt(detectedState);
        setDistrict(detectedDistrict);
        setTown(detectedTown);
        setGpsMessage(
          lang === 'ta'
            ? `உங்கள் இருப்பிடம் வெற்றிகரமாக கண்டறியப்பட்டது: ${detectedDistrict} (${detectedState === 'puducherry' ? 'புதுச்சேரி' : 'தமிழ்நாடு'})`
            : `Location detected: ${detectedDistrict} (${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E)`
        );

        // Automatically trigger updated recommendations
        handleGeneratePlan(detectedState, detectedDistrict, detectedTown, locality);
      },
      (error) => {
        setIsGpsLoading(false);
        setGpsMessage(
          lang === 'ta'
            ? 'இருப்பிட அனுமதி வழங்கப்படவில்லை. கவலை வேண்டாம், கீழே உள்ள பட்டியலில் உங்கள் மாவட்டத்தை தேர்ந்தெடுக்கலாம்.'
            : 'Location access denied or unavailable. You can easily pick your district and town manually below.'
        );
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  // Generate / Refresh Recommendations
  const handleGeneratePlan = (
    sState = stateOrUt,
    sDist = district,
    sTown = town,
    sLoc = locality
  ) => {
    const input: BusinessIdeaInput = {
      location: {
        stateOrUt: sState,
        district: sDist,
        town: sTown,
        locality: sLoc,
      },
      currentProfession,
      skills: selectedSkills,
      budgetAmount,
      workingHours,
      preferredCategory,
      interests,
    };

    const results = recommendLocationBusinesses(input);
    setRecommendations(results);
    if (results[0]) {
      setSelectedIdeaId(results[0].id);
    }

    try {
      confetti({ particleCount: 35, spread: 55, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
  };

  // Toggle skills chips
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Transfer shopping list into Budget Planner
  const handleTransferToBudgetPlanner = () => {
    if (!activePlan) return;
    try {
      const savedStr = localStorage.getItem('sherise_budget_plan_items');
      const existing: BudgetItemPlan[] = savedStr ? JSON.parse(savedStr) : [];
      const merged = transferItemsToBudgetPlan(existing, activePlan.starterShoppingList);
      localStorage.setItem('sherise_budget_plan_items', JSON.stringify(merged));

      setTransferToast(
        lang === 'ta'
          ? `${activePlan.starterShoppingList.length} பொருட்கள் உங்கள் பட்ஜெட் திட்டத்திற்கு மாற்றப்பட்டன!`
          : `${activePlan.starterShoppingList.length} items transferred to your Itemized Budget!`
      );

      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      } catch {
        // ignore
      }

      setTimeout(() => setTransferToast(null), 4500);
    } catch {
      // ignore
    }
  };

  // Read plan aloud
  const handleSpeakPlan = () => {
    if (!activePlan) return;
    const title = lang === 'ta' ? activePlan.titleTa : activePlan.title;
    const reason = lang === 'ta' ? activePlan.suitabilityReasonTa : activePlan.suitabilityReason;
    const profit = lang === 'ta' ? activePlan.expectedMonthlyProfitTa : activePlan.expectedMonthlyProfit;
    const cost = formatCurrency(activePlan.estimatedStartupCost, lang);

    const speech =
      lang === 'ta'
        ? `${title}. பகுதிக்கு ஏற்ற காரணம்: ${reason}. ஆரம்ப முதலீடு சுமார்: ${cost}. எதிர்பார்க்கப்படும் மாத லாபம்: ${profit}.`
        : `${title}. Locality rationale: ${reason}. Startup cost: ${cost}. Expected monthly profit: ${profit}.`;

    speakText(speech, lang);
  };

  // District options by state
  const districtList = useMemo(() => {
    if (stateOrUt === 'puducherry') {
      return ['Puducherry', 'Karaikal', 'Mahe', 'Yanam'];
    }
    return [
      'Chennai',
      'Madurai',
      'Coimbatore',
      'Salem',
      'Tiruchirappalli',
      'Vellore',
      'Tirunelveli',
      'Thanjavur',
      'Erode',
      'Tiruppur',
      'Dindigul',
      'Cuddalore',
    ];
  }, [stateOrUt]);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Breadcrumb & Consistent Back Navigation */}
      <div className="flex items-center justify-between text-xs font-semibold text-stone-600 bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5">
        <div className="flex items-center gap-2">
          {onNavigateBack && (
            <button
              onClick={onNavigateBack}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-300 hover:bg-stone-100 rounded-lg text-stone-800 font-bold transition shadow-2xs"
              aria-label="Back"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.common.back}</span>
            </button>
          )}
          <span>{lang === 'ta' ? 'முகப்பு' : lang === 'hi' ? 'होम' : 'Home'}</span>
          <span>/</span>
          <span className="text-purple-700 font-bold">{t.nav.businessGenerator}</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-stone-500">
          <Compass className="w-4 h-4 text-purple-600" />
          <span className="hidden sm:inline">
            {lang === 'ta' ? 'பகுதி சார்ந்த உள்ளூர் தொழில் வழிகாட்டி' : 'Locality-Based Feasibility Engine'}
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-800 to-pink-800 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2 backdrop-blur-xs">
            {lang === 'ta' ? 'பகுதி & திறன் அடிப்படையிலான தொழில் வழிகாட்டி' : 'Location-Based Enterprise Roadmap'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {lang === 'ta'
              ? 'உள்ளூர் தொழில் யோசனை & தொடக்க பட்ஜெட் திட்டம்'
              : 'Location-Based Business Idea Generator'}
          </h1>
          <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
            {lang === 'ta'
              ? 'உங்கள் மாவட்டம், ஊர், கையில் உள்ள பட்ஜெட் மற்றும் நேரத்திற்கேற்ப உண்மையான உள்ளூர் தேவை, போட்டி மற்றும் மூலப்பொருள் விலையுடன் கூடிய தொழில் திட்டங்களை பெறுங்கள்.'
              : 'Discover feasible micro-enterprises tailored to your town, district, and spare hours. Inspect local customer demand, competition, starter equipment, and connect directly to raw material suppliers.'}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsRawMaterialModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-white text-purple-900 font-bold text-xs rounded-xl hover:bg-purple-50 transition shadow-xs"
            >
              <Store className="w-4 h-4 text-teal-600" />
              <span>{lang === 'ta' ? 'உள்ளூர் மூலப்பொருள் சந்தைகளை காண்க' : 'Open Local Raw Material Finder'}</span>
            </button>

            {onNavigate && (
              <button
                onClick={() => onNavigate('budget-calculator')}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-purple-900/60 hover:bg-purple-900/80 text-white rounded-xl text-xs font-bold transition border border-purple-400/40"
              >
                <Coins className="w-4 h-4 text-amber-300" />
                <span>{lang === 'ta' ? 'பட்ஜெட் கால்குலேட்டர்' : 'Budget Calculator'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Decorative background watermark */}
        <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none select-none text-9xl">
          💡
        </div>
      </div>

      {/* SECTION 1: QUESTIONNAIRE & LOCATION SETUP */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-6">
        <div className="border-b border-stone-100 pb-3">
          <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
            <Compass className="w-5 h-5 text-purple-600" />
            <span>
              {lang === 'ta' ? '1. உங்கள் இருப்பிடம் & பின்னணி விவரங்கள்' : '1. Your Location & Personal Profile'}
            </span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {lang === 'ta'
              ? 'காரைக்கால், புதுச்சேரி அல்லது தமிழகத்தின் உங்கள் பகுதிக்கான தேவையை கணக்கிட உதவுகிறது.'
              : 'Enables tailored demand analysis for your exact district (e.g. Karaikal coast vs Puducherry town).'}
          </p>
        </div>

        {/* Location Detection & Manual Selectors */}
        <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-purple-600" />
              <span>{lang === 'ta' ? 'தொழில் தொடங்க விரும்பும் இடம்:' : 'Business Location:'}</span>
            </span>

            {/* GPS Detection Button with Consent */}
            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={isGpsLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-purple-300 hover:bg-purple-100 text-purple-900 rounded-xl text-xs font-bold transition shadow-2xs"
            >
              <Navigation className={`w-3.5 h-3.5 text-purple-600 ${isGpsLoading ? 'animate-spin' : ''}`} />
              <span>
                {isGpsLoading
                  ? lang === 'ta'
                    ? 'கண்டறிகிறது...'
                    : 'Locating...'
                  : lang === 'ta'
                  ? '📍 என் இருப்பிடத்தை தானாக கண்டறி (GPS)'
                  : '📍 Detect Location with Consent'}
              </span>
            </button>
          </div>

          {gpsMessage && (
            <div className="text-[11px] p-2 bg-white rounded-xl border border-purple-200 text-purple-900 font-medium">
              {gpsMessage}
            </div>
          )}

          {/* Manual Location Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                {lang === 'ta' ? 'மாநிலம் / பிராந்தியம்:' : 'State / UT:'}
              </label>
              <select
                value={stateOrUt}
                onChange={(e) => {
                  const val = e.target.value as 'puducherry' | 'tamil_nadu' | 'other';
                  setStateOrUt(val);
                  setDistrict(val === 'puducherry' ? 'Puducherry' : 'Chennai');
                }}
                className="w-full p-2 bg-white border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-purple-500"
              >
                <option value="puducherry">🌴 Puducherry (UT) - புதுச்சேரி</option>
                <option value="tamil_nadu">🏛️ Tamil Nadu - தமிழ்நாடு</option>
                <option value="other">🗺️ Other States / UTs</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                {lang === 'ta' ? 'மாவட்டம்:' : 'District:'}
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full p-2 bg-white border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-purple-500"
              >
                {districtList.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                {lang === 'ta' ? 'வட்டம் / ஊர்:' : 'Town / Taluk:'}
              </label>
              <input
                type="text"
                value={town}
                onChange={(e) => setTown(e.target.value)}
                placeholder="e.g. Puducherry Town / Karaikal"
                className="w-full p-2 bg-white border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                {lang === 'ta' ? 'பகுதி / தெரு (Locality):' : 'Locality / Area:'}
              </label>
              <input
                type="text"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="e.g. Lawspet / Harbour / Temple"
                className="w-full p-2 bg-white border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Profile, Skills, Budget & Hours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* Profession & Category */}
          <div className="space-y-3">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                {lang === 'ta' ? 'தற்போதைய தொழில் / பின்னணி:' : 'Current Profession / Status:'}
              </label>
              <select
                value={currentProfession}
                onChange={(e) => setCurrentProfession(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-purple-500"
              >
                <option value="Homemaker">Homemaker / இல்லத்தரசி</option>
                <option value="Discontinued student">Discontinued Student / பாதியில் நின்ற கல்வி</option>
                <option value="Daily wage earner">Daily Wage Worker / தினசரி கூலி</option>
                <option value="Tailor">Home Tailor / தையல் கலைஞர்</option>
                <option value="Street vendor">Street Vendor / சிறு வியாபாரி</option>
                <option value="Unemployed">Seeking First Job / முதல் வேலை தேடுபவர்</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                {lang === 'ta' ? 'விருப்பமான தொழில் துறை:' : 'Preferred Industry / Category:'}
              </label>
              <select
                value={preferredCategory}
                onChange={(e) => setPreferredCategory(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">{lang === 'ta' ? 'அனைத்து பிரிவுகளும் (All)' : 'All Industries'}</option>
                <option value="food_catering">Food & Evening Snacks (உணவு & தின்பண்டங்கள்)</option>
                <option value="tailoring_garments">Tailoring & Apparel (தையல் & உடைகள்)</option>
                <option value="handicrafts_eco">Handicrafts & Temple Kits (கைவினை & பூஜை)</option>
                <option value="agriculture_poultry">Flowers, Poultry & Agri (மலர்கள் & விவசாயம்)</option>
              </select>
            </div>

            {/* Skills selection */}
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                {lang === 'ta' ? 'உங்களுக்கு தெரிந்த திறன்கள் (ஒன்றுக்கு மேற்பட்டவை தேர்வு செய்யலாம்):' : 'Skills You Have (Select all that apply):'}
              </label>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Cooking', 'Stitching', 'Handicraft', 'Cleaning', 'Customer handling', 'Mobile / Computer', 'Flower stringing', 'Basic accounting'].map((sk) => {
                  const isSelected = selectedSkills.includes(sk);
                  return (
                    <button
                      type="button"
                      key={sk}
                      onClick={() => toggleSkill(sk)}
                      className={`px-3 py-1 rounded-xl text-xs font-semibold transition ${
                        isSelected
                          ? 'bg-purple-700 text-white shadow-2xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '} {sk}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Budget & Hours */}
          <div className="space-y-3">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                {lang === 'ta' ? 'கையில் உள்ள ஆரம்ப மூலதனம் / முதலீடு (₹):' : 'Available Startup Capital / Budget (₹):'}
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="number"
                  min="500"
                  step="500"
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(Math.max(0, parseInt(e.target.value) || 0))}
                  className="flex-1 p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold text-sm text-stone-900 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Quick budget pill buttons */}
              <div className="flex flex-wrap gap-1.5">
                {[5000, 15000, 25000, 50000, 100000].map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => setBudgetAmount(amt)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                      budgetAmount === amt
                        ? 'bg-purple-100 text-purple-900 border border-purple-300'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                {lang === 'ta' ? 'ஒரு நாளில் ஒதுக்கக்கூடிய வேலை நேரம்:' : 'Available Daily Working Hours:'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: '1-2', label: '1 - 2 Hours / மணி' },
                  { id: '2-3', label: '2 - 3 Hours / மணி' },
                  { id: '3-4', label: '3 - 4 Hours / மணி' },
                  { id: 'full_day', label: 'Full day / முழு நாள்' },
                ].map((hr) => (
                  <button
                    type="button"
                    key={hr.id}
                    onClick={() => setWorkingHours(hr.id as any)}
                    className={`p-2 rounded-xl text-xs font-bold transition text-left ${
                      workingHours === hr.id
                        ? 'bg-purple-700 text-white shadow-2xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {hr.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleGeneratePlan()}
                className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold text-xs sm:text-sm transition shadow-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>
                  {lang === 'ta' ? 'எனக்கான உள்ளூர் தொழில் திட்டங்களை உருவாக்கு' : 'Generate Feasible Business Plans'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: RECOMMENDED PLANS DISPLAY */}
      {recommendations.length > 0 && activePlan && (
        <div className="space-y-6">
          {/* Toast Notification */}
          {transferToast && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-950 rounded-2xl text-xs font-bold flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{transferToast}</span>
              </div>
              {onNavigate && (
                <button
                  onClick={() => onNavigate('budget-calculator')}
                  className="px-3 py-1 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 transition"
                >
                  {lang === 'ta' ? 'பட்ஜெட் கால்குலேட்டரில் காண்க →' : 'View in Budget Planner →'}
                </button>
              )}
            </div>
          )}

          {/* Plan Selector Carousel/Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {recommendations.map((rec) => (
              <button
                key={rec.id}
                onClick={() => setSelectedIdeaId(rec.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 ${
                  selectedIdeaId === rec.id
                    ? 'bg-purple-900 text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <span>{lang === 'ta' ? rec.titleTa : rec.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white">
                  ₹{rec.estimatedStartupCost}
                </span>
              </button>
            ))}
          </div>

          {/* Active Plan Detail Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            {/* Header info */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-900">
                    📍 {district} ({town})
                  </span>
                  <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900">
                    💰 {lang === 'ta' ? 'ஆரம்ப முதலீடு:' : 'Startup Budget:'} {formatCurrency(activePlan.estimatedStartupCost, lang)}
                  </span>
                  <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                    ⏱️ {activePlan.dailyTimeRequired}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 leading-snug">
                  {lang === 'ta' ? activePlan.titleTa : activePlan.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
                  {lang === 'ta' ? activePlan.suitabilityReasonTa : activePlan.suitabilityReason}
                </p>
              </div>

              {/* Utility actions: Speak, Print */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleSpeakPlan}
                  className="p-2 text-stone-500 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition border border-stone-200"
                  title="Read Plan Aloud"
                  aria-label="Read plan aloud"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => window.print()}
                  className="p-2 text-stone-500 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition border border-stone-200"
                  title="Print Plan"
                  aria-label="Print plan"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Profit & Economics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs">
                <span className="font-bold text-emerald-950 uppercase tracking-wide block mb-1">
                  {lang === 'ta' ? 'எதிர்பார்க்கப்படும் நிகர லாபம்:' : 'Expected Monthly Profit:'}
                </span>
                <span className="text-sm font-extrabold text-emerald-900">
                  {lang === 'ta' ? activePlan.expectedMonthlyProfitTa : activePlan.expectedMonthlyProfit}
                </span>
              </div>

              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 text-xs">
                <span className="font-bold text-purple-950 uppercase tracking-wide block mb-1">
                  {lang === 'ta' ? 'பரிந்துரைக்கப்படும் தொடக்க மூலதனம்:' : 'Estimated Startup Cost:'}
                </span>
                <span className="text-sm font-extrabold text-purple-900">
                  {formatCurrency(activePlan.estimatedStartupCost, lang)}
                </span>
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs">
                <span className="font-bold text-amber-950 uppercase tracking-wide block mb-1">
                  {lang === 'ta' ? 'தினசரி வேலை நேரம்:' : 'Time Investment:'}
                </span>
                <span className="text-sm font-extrabold text-amber-900">
                  {activePlan.dailyTimeRequired}
                </span>
              </div>
            </div>

            {/* Local Demand Checklist */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-purple-600" />
                <span>
                  {lang === 'ta' ? 'பணம் முதலீடு செய்வதற்கு முன் நீங்கள் கவனிக்க வேண்டிய தேவை (Demand Checklist):' : 'Local Customer Demand Factors to Investigate:'}
                </span>
              </h4>
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 space-y-2 text-xs text-stone-700">
                {(lang === 'ta' ? activePlan.customerDemandFactorsTa : activePlan.customerDemandFactors).map((factor, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Competition Analysis */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1 text-xs">
              <span className="font-bold text-stone-900 flex items-center gap-1">
                <Scale className="w-4 h-4 text-stone-600" />
                <span>{lang === 'ta' ? 'உள்ளூர் போட்டி பகுப்பாய்வு & தனித்துவ வழி:' : 'Local Competition Analysis & Your Edge:'}</span>
              </span>
              <p className="text-stone-600 leading-relaxed">
                {lang === 'ta' ? activePlan.competitionAnalysisTa : activePlan.competitionAnalysis}
              </p>
            </div>

            {/* STARTER EQUIPMENT & MATERIALS SHOPPING LIST */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-purple-600" />
                    <span>
                      {lang === 'ta' ? 'தொடக்க பொருட்கள் & உபகரணங்கள் பட்டியல் (Shopping List)' : 'Starter Materials & Equipment List'}
                    </span>
                  </h4>
                  <span className="text-xs text-stone-500">
                    {activePlan.starterShoppingList.length} {lang === 'ta' ? 'பொருட்கள் திட்டமிடப்பட்டுள்ளன' : 'item(s) specified with realistic prices'}
                  </span>
                </div>

                {/* Transfer button to Budget Planner */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedPlanForSourcing(activePlan);
                      setIsRawMaterialModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-xl text-xs font-bold transition border border-teal-300 shadow-2xs"
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>{lang === 'ta' ? 'மூலப்பொருள் சந்தை & விலை ஒப்பீடு' : 'Find Suppliers & Compare Quotes'}</span>
                  </button>

                  <button
                    onClick={handleTransferToBudgetPlanner}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition shadow-xs"
                  >
                    <Coins className="w-3.5 h-3.5" />
                    <span>{lang === 'ta' ? 'பட்ஜெட் பிளானருக்கு மாற்று' : 'Transfer to Budget Planner'}</span>
                  </button>
                </div>
              </div>

              {/* Items Table */}
              <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-2.5 px-4">{lang === 'ta' ? 'பொருள் பெயர்' : 'Item Name'}</th>
                      <th className="py-2.5 px-4">{lang === 'ta' ? 'வகை' : 'Category'}</th>
                      <th className="py-2.5 px-4 text-center">{lang === 'ta' ? 'அளவு' : 'Qty'}</th>
                      <th className="py-2.5 px-4 text-right">{lang === 'ta' ? 'மதிப்பிடப்பட்ட விலை' : 'Unit Cost'}</th>
                      <th className="py-2.5 px-4 text-right">{lang === 'ta' ? 'மொத்தம்' : 'Subtotal'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 bg-white">
                    {activePlan.starterShoppingList.map((item) => (
                      <tr key={item.id} className="hover:bg-stone-50/80 transition">
                        <td className="py-2 px-4 font-semibold text-stone-900">
                          <div>{item.itemName}</div>
                          {item.notes && <div className="text-[10px] text-stone-400 font-normal">{item.notes}</div>}
                        </td>
                        <td className="py-2 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-stone-600">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-2 px-4 text-center font-bold text-stone-800">
                          {item.quantity}
                        </td>
                        <td className="py-2 px-4 text-right text-stone-700">
                          ₹{item.estimatedUnitCost}
                        </td>
                        <td className="py-2 px-4 text-right font-bold text-stone-900">
                          ₹{item.quantity * item.estimatedUnitCost}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-purple-50 font-extrabold text-stone-900 border-t border-purple-200">
                    <tr>
                      <td colSpan={4} className="py-2.5 px-4 text-right uppercase text-[11px] text-purple-950">
                        {lang === 'ta' ? 'மொத்த தொடக்க செலவு:' : 'Total Starter Cost:'}
                      </td>
                      <td className="py-2.5 px-4 text-right text-sm text-purple-900">
                        ₹
                        {activePlan.starterShoppingList.reduce(
                          (acc, cur) => acc + cur.quantity * cur.estimatedUnitCost,
                          0
                        )}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Risks & Mitigation */}
            <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-2 text-xs">
              <span className="font-bold text-rose-950 flex items-center gap-1.5 uppercase tracking-wide">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>{lang === 'ta' ? 'உண்மையான சவால்கள் & கவனிக்க வேண்டியவை (Risks):' : 'Key Business Risks & Precautions:'}</span>
              </span>
              <ul className="space-y-1 text-rose-900">
                {(lang === 'ta' ? activePlan.risksTa : activePlan.risks).map((risk, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="font-bold">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 7-Day Launch Steps */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                {lang === 'ta' ? 'முதல் 7 நாட்களில் செய்ய வேண்டிய ஆரம்ப படிகள்:' : 'Actionable First Steps (Day 1 to 7):'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {(lang === 'ta' ? activePlan.firstStepsTa : activePlan.firstSteps).map((step, idx) => (
                  <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-700 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-stone-700 font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-3 bg-stone-100 rounded-xl text-[11px] text-stone-500 flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
              <span>{lang === 'ta' ? activePlan.disclaimerNoteTa : activePlan.disclaimerNote}</span>
            </div>
          </div>
        </div>
      )}

      {/* RAW MATERIAL FINDER & QUOTATION COMPARISON MODAL */}
      <RawMaterialFinderModal
        lang={lang}
        isOpen={isRawMaterialModalOpen}
        onClose={() => setIsRawMaterialModalOpen(false)}
        defaultDistrict={district}
        defaultCategory={activePlan?.category || 'all'}
        initialShoppingList={activePlan?.starterShoppingList || []}
        onNavigateToBudgetPlanner={onNavigate ? () => onNavigate('budget-calculator') : undefined}
      />
    </div>
  );
};
