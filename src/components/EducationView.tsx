/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  BookOpen,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Clock,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  CheckSquare,
  Square,
  AlertCircle,
  FileCheck,
  Award,
  Compass
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { speakText } from '../utils/speech';
import {
  EducationStage,
  LearnerGoal,
  generateEducationRoadmap,
  verificationChecklist,
  RoadmapStep
} from '../utils/educationRoadmap';
import confetti from 'canvas-confetti';

interface EducationViewProps {
  lang: Language;
  onNavigateBack?: () => void;
}

export const EducationView: React.FC<EducationViewProps> = ({ lang, onNavigateBack }) => {
  const t = translations[lang];

  // Scroll to top cleanly on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const [activeTab, setActiveTab] = useState<'roadmap' | 'verification' | 'directory' | 'digital-safety'>('roadmap');

  // Intake State
  const [selectedStage, setSelectedStage] = useState<EducationStage>('discontinued_11_12');
  const [selectedGoal, setSelectedGoal] = useState<LearnerGoal>('formal_degree');
  const [studyTime, setStudyTime] = useState<string>('1-2');
  const [studyMode, setStudyMode] = useState<string>('home_distance');

  // Completed Steps State (stored in localStorage)
  const [completedStepIds, setCompletedStepIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_education_progress');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const toggleStepCompleted = (stepId: string) => {
    setCompletedStepIds((prev) => {
      const exists = prev.includes(stepId);
      const next = exists ? prev.filter((id) => id !== stepId) : [...prev, stepId];
      try {
        localStorage.setItem('sherise_education_progress', JSON.stringify(next));
      } catch {
        // ignore
      }
      if (!exists) {
        try {
          confetti({ particleCount: 25, spread: 45 });
        } catch {
          // ignore
        }
      }
      return next;
    });
  };

  const roadmapData = generateEducationRoadmap(selectedStage, selectedGoal, lang);

  const stagesList: { id: EducationStage; labelEn: string; labelTa: string; labelHi: string }[] = [
    {
      id: 'completed_10th',
      labelEn: 'Passed Class 10 (Want +2, Diploma or Career)',
      labelTa: '10-ஆம் வகுப்பு முடித்தேன் (+2, டிப்ளமோ அல்லது வேலை)',
      labelHi: '10वीं उत्तीर्ण (12वीं, डिप्लोमा या करियर चाहते हैं)'
    },
    {
      id: 'discontinued_11_12',
      labelEn: 'Discontinued in Class 11 or 12',
      labelTa: '11 அல்லது 12-ஆம் வகுப்பில் படிப்பை நிறுத்தினேன்',
      labelHi: '11वीं या 12वीं में पढ़ाई छूट गई'
    },
    {
      id: 'completed_12th',
      labelEn: 'Passed Class 12 (+2 Completed, Want Degree)',
      labelTa: '12-ஆம் வகுப்பு முடித்தேன் (+2 தேர்ச்சி, பட்டம் தேவை)',
      labelHi: '12वीं उत्तीर्ण (कॉलेज डिग्री या कौशल चाहते हैं)'
    },
    {
      id: 'college_discontinued',
      labelEn: 'Started College but Discontinued (1st / 2nd Year)',
      labelTa: 'கல்லூரியில் சேர்ந்து 1 அல்லது 2-ஆம் ஆண்டில் நின்றேன்',
      labelHi: 'कॉलेज शुरू किया किंतु बीच में छूट गया (पहला/दूसरा वर्ष)'
    },
    {
      id: 'college_some_semesters',
      labelEn: 'Completed Some Semesters / Have Pending Papers',
      labelTa: 'சில செமஸ்டர்கள் முடித்தேன் / அரியர் பாடங்கள் உள்ளன',
      labelHi: 'कुछ सेमेस्टर पूरे किए / बैक पेपर बाकी हैं'
    },
    {
      id: 'graduate_skill_upgrade',
      labelEn: 'Already Graduated, Need Job-Ready Skills',
      labelTa: 'பட்டம் முடித்தேன், உடனடி வருமான திறன் தேவை',
      labelHi: 'स्नातक पूरा किया, रोजगार कौशल चाहिए'
    },
    {
      id: 'unsure_next',
      labelEn: 'Unsure What to Study Next (Need Guidance)',
      labelTa: 'அடுத்து என்ன படிப்பது என்று தெளிவாக தெரியவில்லை',
      labelHi: 'आगे क्या पढ़ें यह तय नहीं है (मार्गदर्शन चाहिए)'
    }
  ];

  const getLocalized = (ta?: string, hi?: string, en?: string): string => {
    if (lang === 'ta' && ta) return ta;
    if (lang === 'hi' && hi) return hi;
    return en || ta || '';
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Breadcrumb & Back Bar */}
      <div className="flex items-center justify-between text-xs font-semibold text-stone-600 bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5">
        <div className="flex items-center gap-2">
          {onNavigateBack && (
            <button
              onClick={onNavigateBack}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-300 hover:bg-stone-100 rounded-lg text-stone-800 font-bold transition shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.common.back}</span>
            </button>
          )}
          <span>{lang === 'ta' ? 'முகப்பு' : lang === 'hi' ? 'होम' : 'Home'}</span>
          <span>/</span>
          <span className="text-emerald-700 font-bold">{t.nav.education}</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-stone-500">
          <GraduationCap className="w-4 h-4 text-emerald-600" />
          <span>
            {lang === 'ta' ? 'இரண்டாம் வாய்ப்பு & திறந்தநிலைக் கல்வி' : lang === 'hi' ? 'द्वितीय अवसर एवं मुक्त शिक्षा' : 'Second Chances & Open Education'}
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-800 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-3xl">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2">
            {lang === 'ta' ? 'கல்வியை மீண்டும் தொடங்கும் வழிகாட்டி' : lang === 'hi' ? 'शिक्षा पुनः शुरुआत संपूर्ण मार्गदर्शिका' : 'Education Restart & Recovery Guide'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {t.education.title}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed mb-4">
            {t.education.sub}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() =>
                speakText(
                  lang === 'ta'
                    ? 'கல்வி மறுதொடக்க வழிகாட்டி. நீங்கள் 10-ஆம் வகுப்பிற்குப் பின் நின்றிருந்தாலும், அல்லது கல்லூரியை பாதியில் நிறுத்தியிருந்தாலும், வீட்டில் இருந்தே தேசிய திறந்தநிலைப் பள்ளி மற்றும் தொலைதூர பல்கலைக்கழகங்கள் மூலம் படிப்பை முடிக்கலாம். உங்களின் முந்தைய மதிப்பெண்களை டிரான்ஸ்பர் செய்யும் வாய்ப்பும் உண்டு.'
                    : lang === 'hi'
                    ? 'शिक्षा पुनः शुरुआत मार्गदर्शन। यदि आपकी पढ़ाई 10वीं, 12वीं या कॉलेज में छूट गई थी, तो आप घर बैठे एनआईओएस और मुक्त विश्वविद्यालयों के माध्यम से अपनी डिग्री पूरी कर सकती हैं।'
                    : 'Education Restart Guidance. Complete your 10th, 12th or college degree at your own pace from home with recognized government open universities.',
                  lang
                )
              }
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white text-emerald-900 hover:bg-emerald-50 rounded-full font-bold text-xs transition shadow-xs"
            >
              <Volume2 className="w-4 h-4 text-emerald-700" />
              <span>{t.common.listen}</span>
            </button>

            <span className="text-xs text-emerald-200">
              {lang === 'ta'
                ? 'வயது வரம்பில்லை • அசல் TC தேவையில்லை • அரசு தேர்வு சான்றிதழ் சமம்'
                : lang === 'hi'
                ? 'कोई आयु सीमा नहीं • टीसी की बाध्यता नहीं • सरकारी डिग्री समान मान्य'
                : 'No age barrier • Direct self-declaration • 100% Govt Recognized'}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap ${
            activeTab === 'roadmap'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>{lang === 'ta' ? 'எனக்கான மறுதொடக்க திட்டம் (Roadmap)' : lang === 'hi' ? 'मेरा रोडमैप (Roadmap)' : 'My Restart Roadmap'}</span>
        </button>

        <button
          onClick={() => setActiveTab('verification')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap ${
            activeTab === 'verification'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{lang === 'ta' ? 'சேரும் முன் சரிபார்க்க வேண்டியவை (மோசடி எச்சரிக்கை)' : lang === 'hi' ? 'दाखिला पूर्व जांच व धोखाधड़ी से बचाव' : 'Before You Choose a Course'}</span>
        </button>

        <button
          onClick={() => setActiveTab('directory')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap ${
            activeTab === 'directory'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{lang === 'ta' ? 'அரசு திறந்தநிலைப் படிப்புகள் & சான்றிதழ்கள்' : lang === 'hi' ? 'सरकारी मुक्त पाठ्यक्रम व डिग्री' : 'Open Programs & Degree Directory'}</span>
        </button>

        <button
          onClick={() => setActiveTab('digital-safety')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap ${
            activeTab === 'digital-safety'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>{lang === 'ta' ? 'ஸ்மார்ட்போன் & டிஜிலாக்கர் பாதுகாப்பு' : lang === 'hi' ? 'स्मार्टफोन व डिजिलॉकर सुरक्षा' : 'Smartphone & DigiLocker Safety'}</span>
        </button>
      </div>

      {/* TAB 1: PERSONALIZED ROADMAP */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Interactive Needs Assessment Card */}
          <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 shadow-2xs space-y-4">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <h2 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-emerald-600" />
                  <span>
                    {lang === 'ta'
                      ? 'உங்கள் நிலையை தேர்ந்தெடுத்து தனிப்பயன் வழிகாட்டியைப் பெறுங்கள்'
                      : lang === 'hi'
                      ? 'अपनी स्थिति चुनें और व्यक्तिगत रोडमैप प्राप्त करें'
                      : 'Select Your Situation to Generate a Custom Action Plan'}
                  </span>
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  {lang === 'ta'
                    ? 'எந்தவித தனிநபர் ரகசிய விவரங்களையும் நாங்கள் கோருவதில்லை; உங்கள் சூழ்நிலைக்குத் தகுந்த சட்டரீதியான வழிகள் மட்டுமே பரிந்துரைக்கப்படுகின்றன.'
                    : lang === 'hi'
                    ? 'हम कोई संवेदनशील व्यक्तिगत जानकारी नहीं मांगते; केवल आपकी आवश्यकता अनुसार वैध विकल्प दर्शाए जाते हैं।'
                    : 'We collect no sensitive personal data. Guidance is tailored purely to your educational stage.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Question 1: Stage */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-800 block">
                  {lang === 'ta' ? '1. உங்கள் தற்போதைய கல்வி நிலை என்ன?' : lang === 'hi' ? '1. आपकी वर्तमान शैक्षिक स्थिति क्या है?' : '1. What is your current education stage?'}
                </label>
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value as EducationStage)}
                  className="w-full text-xs font-semibold p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                >
                  {stagesList.map((stg) => (
                    <option key={stg.id} value={stg.id}>
                      {lang === 'ta' ? stg.labelTa : lang === 'hi' ? stg.labelHi : stg.labelEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Question 2: Primary Goal */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-800 block">
                  {lang === 'ta' ? '2. உங்கள் முக்கிய இலக்கு என்ன?' : lang === 'hi' ? '2. आपका प्राथमिक लक्ष्य क्या है?' : '2. What is your primary learning goal?'}
                </label>
                <select
                  value={selectedGoal}
                  onChange={(e) => setSelectedGoal(e.target.value as LearnerGoal)}
                  className="w-full text-xs font-semibold p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="formal_degree">
                    {lang === 'ta' ? 'அரசு அங்கீகாரம் பெற்ற பள்ளி / கல்லூரி பட்டம் பெறுதல்' : lang === 'hi' ? 'मान्यता प्राप्त स्कूल / कॉलेज डिग्री पूर्ण करना' : 'Complete Formal Board (+2) or College Degree'}
                  </option>
                  <option value="vocational_skill">
                    {lang === 'ta' ? 'உடனடி சுயதொழில் அல்லது கைவினைத் திறன்' : lang === 'hi' ? 'तुरंत रोजगार या व्यावहारिक कौशल' : 'Practical Vocational Skill & Self-Employment'}
                  </option>
                  <option value="employment_wfh">
                    {lang === 'ta' ? 'டிஜிட்டல் அலுவலகம் & வீட்டிலிருந்து வேலை' : lang === 'hi' ? 'डिजिटल कौशल व वर्क फ्रॉम होम' : 'Digital Literacy & Work From Home'}
                  </option>
                  <option value="flexible_learning">
                    {lang === 'ta' ? 'குறைந்த செலவில் பகுதி நேர திறந்தநிலை கற்றல்' : lang === 'hi' ? 'कम लागत में अंशकालिक मुक्त अध्ययन' : 'Low-Cost Flexible Distance Learning'}
                  </option>
                </select>
              </div>

              {/* Question 3: Available Study Time */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-800 block">
                  {lang === 'ta' ? '3. படிக்க ஒதுக்கக்கூடிய தினசரி நேரம்:' : lang === 'hi' ? '3. अध्ययन हेतु प्रतिदिन उपलब्ध समय:' : '3. Daily available study time:'}
                </label>
                <select
                  value={studyTime}
                  onChange={(e) => setStudyTime(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="1-2">{lang === 'ta' ? 'தினமும் 1 முதல் 2 மணிநேரம் (மதிய ஓய்வு நேரம்)' : lang === 'hi' ? 'प्रतिदिन 1-2 घंटे (दोपहर फुर्सत में)' : '1 - 2 hours daily (Afternoon / Evening leisure)'}</option>
                  <option value="3-4">{lang === 'ta' ? 'தினமும் 3 முதல் 4 மணிநேரம்' : lang === 'hi' ? 'प्रतिदिन 3-4 घंटे' : '3 - 4 hours daily'}</option>
                  <option value="weekends">{lang === 'ta' ? 'சனி மற்றும் ஞாயிறு மட்டும்' : lang === 'hi' ? 'केवल सप्ताहांत (शनिवार व रविवार)' : 'Weekends only'}</option>
                </select>
              </div>

              {/* Question 4: Study Mode */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-800 block">
                  {lang === 'ta' ? '4. விரும்பும் கற்றல் முறை:' : lang === 'hi' ? '4. अध्ययन का पसंदीदा माध्यम:' : '4. Preferred study mode:'}
                </label>
                <select
                  value={studyMode}
                  onChange={(e) => setStudyMode(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="home_distance">{lang === 'ta' ? 'வீட்டிலிருந்தே அஞ்சல் வழி புத்தகங்கள் மூலம் படித்தல்' : lang === 'hi' ? 'घर बैठे डाक द्वारा प्राप्त किताबों से पढ़ाई' : 'Study from home with free mailed books (No daily classes)'}</option>
                  <option value="practical_center">{lang === 'ta' ? 'அருகில் உள்ள அரசு மையத்தில் நேரடி செய்முறைப் பயிற்சி' : lang === 'hi' ? 'निकटतम सरकारी केंद्र पर प्रायोगिक प्रशिक्षण' : 'In-person weekend practical centers'}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Empathy Reassurance Banner */}
          <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-teal-950 uppercase tracking-wide">
                {lang === 'ta' ? 'தோழியின் ஊக்கக்குரல்:' : lang === 'hi' ? 'प्रेरणा संदेश:' : 'Encouragement Note:'}
              </h3>
              <p className="text-xs text-teal-900 mt-1 leading-relaxed">
                {getLocalized(roadmapData.empathyNoteTa, roadmapData.empathyNoteHi, roadmapData.empathyNote)}
              </p>
            </div>
          </div>

          {/* Generated Roadmap Steps (Checkable & Actionable) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-stone-900">
                  {getLocalized(roadmapData.headlineTa, roadmapData.headlineHi, roadmapData.headline)}
                </h3>
                <p className="text-xs text-stone-500">
                  {lang === 'ta'
                    ? 'ஒவ்வொரு படியையும் முடித்தவுடன் டிக் செய்து உங்கள் முன்னேற்றத்தை சேமிக்கலாம்.'
                    : lang === 'hi'
                    ? 'प्रत्येक चरण पूरा होने पर टिक लगाकर अपनी प्रगति सहेजें।'
                    : 'Check off each milestone as you complete it. Your progress is saved locally.'}
                </p>
              </div>

              <div className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                {completedStepIds.filter((id) => roadmapData.steps.some((s) => s.id === id)).length} / {roadmapData.steps.length} {lang === 'ta' ? 'முடிந்தது' : lang === 'hi' ? 'पूर्ण' : 'Done'}
              </div>
            </div>

            <div className="space-y-3">
              {roadmapData.steps.map((step) => {
                const isCompleted = completedStepIds.includes(step.id);
                return (
                  <div
                    key={step.id}
                    className={`rounded-2xl border p-4 sm:p-5 transition shadow-2xs ${
                      isCompleted
                        ? 'bg-emerald-50/60 border-emerald-300'
                        : 'bg-white border-stone-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Checkbox toggle */}
                      <button
                        onClick={() => toggleStepCompleted(step.id)}
                        className="mt-0.5 text-stone-400 hover:text-emerald-700 transition shrink-0"
                        aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                      >
                        {isCompleted ? (
                          <CheckSquare className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Square className="w-5 h-5 text-stone-400" />
                        )}
                      </button>

                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4
                            className={`text-sm font-bold ${
                              isCompleted ? 'text-emerald-950 line-through' : 'text-stone-900'
                            }`}
                          >
                            {step.stepNumber}. {getLocalized(step.titleTa, step.titleHi, step.title)}
                          </h4>

                          <span className="text-[11px] font-semibold px-2.5 py-0.5 bg-stone-100 text-stone-700 rounded-full flex items-center gap-1">
                            <Clock className="w-3 h-3 text-stone-400" />
                            <span>{step.estimatedDuration}</span>
                          </span>
                        </div>

                        <p className="text-xs text-stone-700 leading-relaxed">
                          {getLocalized(step.descriptionTa, step.descriptionHi, step.description)}
                        </p>

                        {/* Metadata row: Portal, Cost, Action Link */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs">
                          <div className="flex flex-wrap items-center gap-3 text-stone-600">
                            <span>
                              <strong>{lang === 'ta' ? 'அதிகாரப்பூர்வ தளம்:' : lang === 'hi' ? 'आधिकारिक संस्थान:' : 'Official Institution:'}</strong>{' '}
                              {step.institutionOrPortal}
                            </span>
                            <span>•</span>
                            <span className="text-emerald-700 font-bold">
                              {getLocalized(step.costEstimateTa, step.costEstimateHi, step.costEstimate)}
                            </span>
                          </div>

                          {step.portalUrl && step.portalUrl.startsWith('http') && (
                            <a
                              href={step.portalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 underline ml-auto"
                            >
                              <span>{lang === 'ta' ? 'அரசு போர்ட்டலை பார்க்க' : lang === 'hi' ? 'आधिकारिक पोर्टल खोलें' : 'Open Official Portal'}</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COURSE VERIFICATION & SCAM PRECAUTIONS */}
      {activeTab === 'verification' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Scam Alert Callout */}
          <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-5 sm:p-7 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-rose-900 font-extrabold text-base">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>
                {lang === 'ta'
                  ? 'மோசடி எச்சரிக்கை: போலி பட்டங்கள் மற்றும் இடைத்தரகர்களிடம் ஏமாறாதீர்கள்!'
                  : lang === 'hi'
                  ? 'सावधानी: फर्जी डिग्रियों और बिचौलियों से सावधान रहें!'
                  : 'Fraud Warning: Protect Yourself from Fake Degrees & Scam Agents'}
              </span>
            </div>
            <p className="text-xs text-rose-950 leading-relaxed">
              {lang === 'ta'
                ? 'படிப்பை பாதியில் நிறுத்திய பெண்களின் அவசரத்தை பயன்படுத்தி "பரீட்சையே எழுதாமல் 6 மாதத்தில் டிகிரி தருகிறோம்", "நேரடி பாஸ் கேரண்டி" என்று சமூக ஊடகங்களிலும் கிராமப்புறங்களிலும் பல தனியார் ஏஜெண்டுகள் ₹20,000 முதல் ₹50,000 வரை பறிக்கிறார்கள். இதுபோன்ற அங்கீகாரமற்ற சான்றிதழ்கள் அரசு வேலை மற்றும் பாஸ்போர்ட் சரிபார்ப்பில் செல்லாது.'
                : lang === 'hi'
                ? '"बिना परीक्षा दिए 6 महीने में डिग्री" या "100% पास गारंटी" का दावा करने वाले बिचौलियों से बचें। ऐसे अनधिकृत प्रमाणपत्र किसी भी सरकारी नौकरी या आगे की पढ़ाई के लिए अमान्य होते हैं।'
                : 'Scam agents target women who discontinued studies by promising "Guaranteed Degree without writing exams" or "Direct Pass in 3 months" for hefty sums. Unaccredited certificates are legally invalid for government employment, higher education, or passport verification.'}
            </p>
          </div>

          {/* 4 Pillars of Course Verification */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-wide">
              {lang === 'ta' ? 'சேருவதற்கு முன் சரிபார்க்க வேண்டிய 4 முக்கிய காரணிகள்:' : lang === 'hi' ? 'प्रवेश पूर्व 4 अनिवार्य सत्यापन बिंदु:' : '4 Essential Checks Before Enrolling:'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {verificationChecklist.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                      <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{getLocalized(item.titleTa, item.titleHi, item.title)}</span>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      {getLocalized(item.checkTa, item.checkHi, item.check)}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-stone-500">
                      {lang === 'ta' ? 'சரிபார்க்க வேண்டிய போர்டல்:' : lang === 'hi' ? 'सत्यापन पोर्टल:' : 'Verification Portal:'}
                    </span>
                    <a
                      href={item.officialPortal}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                    >
                      <span>{item.officialPortal.replace('https://', '')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: OPEN PROGRAMS & DEGREE DIRECTORY */}
      {activeTab === 'directory' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: NIOS */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {lang === 'ta' ? 'மத்திய அரசு திறந்தநிலை பள்ளி' : lang === 'hi' ? 'राष्ट्रीय मुक्त विद्यालयी शिक्षा' : 'Govt of India Open School'}
                  </span>
                  <h3 className="text-base font-bold text-stone-900 mt-1">
                    NIOS 10th & 12th Board Examinations
                  </h3>
                </div>
                <Award className="w-5 h-5 text-emerald-600" />
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {lang === 'ta'
                  ? 'பள்ளி மாற்றுச் சான்றிதழ் (TC) இல்லாவிட்டாலும் வயது சான்று கொண்டு நேரடியாக சேரலாம். தமிழ் வழியில் இலவச பாடப்புத்தகங்கள் வீட்டிற்கு அனுப்பப்படும். 5 வருடங்களில் 9 தவணைகளில் தேர்வு எழுதலாம்.'
                  : 'Direct admission based on Aadhaar self-declaration even without school Transfer Certificate. Books sent free to home. Pass 5 subjects in flexible installments over 5 years.'}
              </p>

              <div className="p-2.5 bg-stone-50 rounded-xl text-xs space-y-1">
                <div><strong>{lang === 'ta' ? 'செலவு:' : 'Cost:'}</strong> Approx ₹2,000 - ₹3,500 total</div>
                <div><strong>{lang === 'ta' ? 'தகுதி:' : 'Eligibility:'}</strong> 14+ for 10th, 10th pass for 12th</div>
              </div>

              <a
                href="https://sdmis.nios.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                <span>sdmis.nios.ac.in</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Card 2: IGNOU */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                    {lang === 'ta' ? 'மத்திய திறந்தநிலைப் பல்கலைக்கழகம்' : lang === 'hi' ? 'केंद्रीय मुक्त विश्वविद्यालय' : 'Central Open University'}
                  </span>
                  <h3 className="text-base font-bold text-stone-900 mt-1">
                    IGNOU Bachelor Degrees (BA, B.Com, BSW, BTS)
                  </h3>
                </div>
                <GraduationCap className="w-5 h-5 text-blue-600" />
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {lang === 'ta'
                  ? 'யுஜிசி (UGC-DEB) அங்கீகாரம் பெற்ற முழு பட்டப்படிப்பு. தினமும் கல்லூரி செல்ல வேண்டியதில்லை. மாவட்ட அரசு கல்லூரிகளில் வார இறுதி உதவி வகுப்புகள் மற்றும் தேர்வுகள் நடைபெறும்.'
                  : 'World’s largest open university offering UGC-DEB recognized Bachelor’s degrees. Weekend counseling sessions at district colleges with distance self-study modules.'}
              </p>

              <div className="p-2.5 bg-stone-50 rounded-xl text-xs space-y-1">
                <div><strong>{lang === 'ta' ? 'செலவு:' : 'Cost:'}</strong> ₹3,000 - ₹5,000 per year</div>
                <div><strong>{lang === 'ta' ? 'தகுதி:' : 'Eligibility:'}</strong> 10+2 or equivalent from any recognized board</div>
              </div>

              <a
                href="https://ignouadmission.samarth.edu.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-800"
              >
                <span>ignouadmission.samarth.edu.in</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Card 3: TNOU */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                    {lang === 'ta' ? 'தமிழ்நாடு அரசு பல்கலைக்கழகம்' : lang === 'hi' ? 'तमिलनाडु सरकार विश्वविद्यालय' : 'Govt of Tamil Nadu Open University'}
                  </span>
                  <h3 className="text-base font-bold text-stone-900 mt-1">
                    TNOU Distance Degrees & Vocational Diplomas
                  </h3>
                </div>
                <BookOpen className="w-5 h-5 text-rose-600" />
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {lang === 'ta'
                  ? 'தமிழ் வழியில் பாடப்புத்தகங்கள் மற்றும் தேர்வுகள். இல்லத்தரசிகள், கிராமப்புற பெண்களுக்கு சிறப்பு சலுகைகள். அஞ்சல் வழியாக வீட்டுக்கே பாடப் புத்தகங்கள் அனுப்பப்படும்.'
                  : 'Tamil and English medium degree programs with localized learner support centers across all 38 districts of Tamil Nadu.'}
              </p>

              <div className="p-2.5 bg-stone-50 rounded-xl text-xs space-y-1">
                <div><strong>{lang === 'ta' ? 'செலவு:' : 'Cost:'}</strong> Subsidized govt fees (SC/ST concessions)</div>
                <div><strong>{lang === 'ta' ? 'தள முகவரி:' : 'Portal:'}</strong> tnou.ac.in</div>
              </div>

              <a
                href="https://tnou.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 hover:text-rose-800"
              >
                <span>tnou.ac.in</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Card 4: PMKVY / Skill India */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                    {lang === 'ta' ? 'இலவச அரசு தொழிற்பயிற்சி' : lang === 'hi' ? 'मुफ्त सरकारी कौशल प्रशिक्षण' : '100% Free Govt Vocational Training'}
                  </span>
                  <h3 className="text-base font-bold text-stone-900 mt-1">
                    PMKVY & State Skill Development Missions
                  </h3>
                </div>
                <Sparkles className="w-5 h-5 text-amber-600" />
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {lang === 'ta'
                  ? 'தையல் மற்றும் ஆடை வடிவமைப்பு, அழகுக்கலை, உணவு பதப்படுத்துதல், மற்றும் கணினி டேட்டா என்ட்ரி ஆகியவற்றில் 100% இலவச அரசு பயிற்சி மற்றும் NCVET சான்றிதழ்.'
                  : 'Short-term free industry courses with NSQF certification and placement assistance for self-employment or local jobs.'}
              </p>

              <div className="p-2.5 bg-stone-50 rounded-xl text-xs space-y-1">
                <div><strong>{lang === 'ta' ? 'செலவு:' : 'Cost:'}</strong> 100% Free with Govt Stipend</div>
                <div><strong>{lang === 'ta' ? 'தள முகவரி:' : 'Portal:'}</strong> skillindiadigital.gov.in</div>
              </div>

              <a
                href="https://www.skillindiadigital.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800"
              >
                <span>skillindiadigital.gov.in</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SMARTPHONE & DIGILOCKER SAFETY */}
      {activeTab === 'digital-safety' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-2xs space-y-5">
            <h3 className="text-base font-extrabold text-stone-900">
              {lang === 'ta' ? 'டிஜிட்டல் ஆவணங்கள் மற்றும் மொபைல் பாதுகாப்பு' : lang === 'hi' ? 'डिजिटल दस्तावेज व मोबाइल सुरक्षा' : 'Digital Certificates & Mobile Safety'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <h4 className="text-xs font-bold text-stone-900">DigiLocker App</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === 'ta'
                    ? 'மத்திய அரசின் அதிகாரப்பூர்வ டிஜிலாக்கர் செயலியை பதிவிறக்கம் செய்து உங்கள் ஆதார் மூலம் உள்நுழைந்து 10, 12 மற்றும் கல்லூரி சான்றிதழ்களை எப்போது வேண்டுமானாலும் இலவசமாக பதிவிறக்கலாம்.'
                    : 'Download the official DigiLocker app to legally access your 10th/12th marksheets and degree certificates backed by IT Act Section 9A.'}
                </p>
                <a
                  href="https://www.digilocker.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-700 underline flex items-center gap-1"
                >
                  <span>digilocker.gov.in</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <h4 className="text-xs font-bold text-stone-900">Academic Bank of Credits (ABC)</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === 'ta'
                    ? 'abc.gov.in-ல் உங்கள் APAAR / ABC ID கணக்கைத் தொடங்குங்கள். கல்லூரியில் நீங்கள் தேர்ச்சி பெற்ற ஒவ்வொரு பாடத்தின் கிரெடிட் புள்ளிகளும் இதில் வாழ்நாள் முழுவதும் பத்திரமாக இருக்கும்.'
                    : 'Create your 12-digit APAAR / ABC ID on abc.gov.in. Course credits from past universities are preserved for seamless re-entry.'}
                </p>
                <a
                  href="https://www.abc.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-700 underline flex items-center gap-1"
                >
                  <span>abc.gov.in</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <h4 className="text-xs font-bold text-stone-900">OTP & PIN Safety</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === 'ta'
                    ? 'பள்ளி அல்லது கல்லூரி சேர்க்கை என்ற பெயரில் உங்கள் மொபைலுக்கு வரும் வங்கி அல்லது ஆதார் OTP எண்களை யாரிடமும் பகிராதீர்கள். கட்டணம் எப்போதும் அரசு ரசீதுடன் மட்டுமே செலுத்தப்பட வேண்டும்.'
                    : 'Never disclose bank OTP, UPI PIN, or Aadhaar authentication OTP to anyone claiming to be an admission agent. Always pay fees directly via official portal receipts.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
