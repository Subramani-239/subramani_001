/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { SchemesView } from './components/SchemesView';
import { EducationView } from './components/EducationView';
import { SkillsIncomeView } from './components/SkillsIncomeView';
import { BusinessIdeaGeneratorView } from './components/BusinessIdeaGeneratorView';
import { BudgetCalculatorView } from './components/BudgetCalculatorView';
import { CommunityView } from './components/CommunityView';
import { PrivacySettingsView } from './components/PrivacySettingsView';
import { EmergencyHelpView } from './components/EmergencyHelpView';
import { ChatCallView } from './components/ChatCallView';
import { SkillsLearningView } from './components/SkillsLearningView';
import { FindTeachersView } from './components/FindTeachersView';
import { EarnView } from './components/EarnView';
import { EntrepreneursView } from './components/EntrepreneursView';
import { PaymentsView } from './components/PaymentsView';
import { ProfileView } from './components/ProfileView';
import { QuickShieldModal } from './components/QuickShieldModal';
import { FreeDeploymentGuideModal } from './components/FreeDeploymentGuideModal';
import { BrandLogo } from './components/BrandLogo';
import { Language, ActiveTab, PrivacyConfig, UserProfile, CourseBooking, LearningCourse, PayoutRecord } from './types';
import { sampleDemoProfiles } from './data/demoProfilesData';
import { translations } from './data/translations';
import { learningCoursesData } from './data/skillsLearningData';
import { calculateCommission } from './utils/learningBusinessLogic';
import {
  registerSpeechListener,
  stopSpeaking,
  speakText,
  startVoiceRecognition
} from './utils/speech';
import {
  Heart,
  Shield,
  PhoneCall,
  Rocket,
  Lock,
  Volume2,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  MessageCircle,
  Sparkle,
  UserCheck
} from 'lucide-react';

export default function App() {
  // 1. Language State ('ta' | 'en' | 'hi')
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('sherise_lang');
      if (saved === 'en' || saved === 'ta' || saved === 'hi') return saved as Language;
    } catch {
      // ignore
    }
    return 'ta';
  });

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem('sherise_lang', newLang);
    } catch {
      // ignore
    }
  };

  // 2. User Profile State (Demo Mode Hackathon Ready)
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('sherise_user_profile');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return sampleDemoProfiles[0];
  });

  const handleUpdateUserProfile = (updated: UserProfile) => {
    setUserProfile(updated);
    try {
      localStorage.setItem('sherise_user_profile', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Courses State
  const [courses, setCourses] = useState<LearningCourse[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_learning_courses');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return learningCoursesData;
  });

  // Bookings & Transactions State (10% platform commission compliant)
  const [bookings, setBookings] = useState<CourseBooking[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_course_bookings');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    const sampleComm = calculateCommission(1000);
    return [
      {
        id: 'BK-1001',
        courseId: 'course-tailoring-basics',
        courseTitle: 'Beginner Tailoring: Measurements, Cutting & Blouse Stitching',
        learnerId: 'usr-demo-01',
        learnerName: 'Kamala Devi',
        bookingDate: new Date(Date.now() - 3600000).toISOString(),
        batchSchedule: 'Batch starts: Next Monday (10:30 AM - 11:30 AM)',
        classFormat: 'online',
        venueOrLink: 'Salem Women Community Center & Live Google Meet',
        status: 'confirmed',
        courseFee: 1000,
        platformFee: sampleComm.platformFee,
        teacherEarnings: sampleComm.teacherEarnings,
        paymentMethod: 'demo_upi',
        demoUpiTxnId: 'UPI-TXN-902847291084',
        escrowStatus: 'held_in_escrow',
      },
      {
        id: 'BK-1002',
        courseId: 'course-millet-snacks',
        courseTitle: 'Millet & Traditional Sweets Catering Business',
        learnerId: 'usr-demo-02',
        learnerName: 'Meenakshi Sundaram',
        bookingDate: new Date(Date.now() - 86400000 * 2).toISOString(),
        batchSchedule: 'Batch starts: Wednesday (3:00 PM - 4:30 PM)',
        classFormat: 'in_person',
        venueOrLink: 'Madurai Self Help Group Kitchen',
        status: 'completed',
        courseFee: 800,
        platformFee: 80,
        teacherEarnings: 720,
        paymentMethod: 'demo_upi',
        demoUpiTxnId: 'UPI-TXN-817263549102',
        escrowStatus: 'released_to_teacher',
      },
    ];
  });

  const handleBookCourse = (newBooking: CourseBooking) => {
    setBookings((prev) => {
      const updated = [newBooking, ...prev];
      try {
        localStorage.setItem('sherise_course_bookings', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleRefundBooking = (bookingId: string) => {
    setBookings((prev) => {
      const updated = prev.map((b) =>
        b.id === bookingId ? { ...b, status: 'refunded' as const } : b
      );
      try {
        localStorage.setItem('sherise_course_bookings', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // 3. Active View Tab & Navigation Stack
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    try {
      const hash = window.location.hash.replace('#', '') as ActiveTab;
      if (hash) return hash;
    } catch {
      // ignore
    }
    return 'dashboard';
  });
  const [navHistory, setNavHistory] = useState<ActiveTab[]>(['dashboard']);
  const [chatInitialContactId, setChatInitialContactId] = useState<string | undefined>(undefined);

  // Sync scroll to top on every view switch
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab]);

  // Handle browser back and forward buttons
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.tab) {
        setActiveTab(e.state.tab as ActiveTab);
      } else {
        const hash = window.location.hash.replace('#', '') as ActiveTab;
        if (hash) {
          setActiveTab(hash);
        } else {
          setActiveTab('dashboard');
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (targetTab: ActiveTab) => {
    if (targetTab !== activeTab) {
      setNavHistory((prev) => [...prev, activeTab]);
      try {
        window.history.pushState({ tab: targetTab }, '', `#${targetTab}`);
      } catch {
        // ignore
      }
      setActiveTab(targetTab);
    }
  };

  const handleNavigateBack = () => {
    if (navHistory.length > 0) {
      const previous = navHistory[navHistory.length - 1];
      setNavHistory((prev) => prev.slice(0, prev.length - 1));
      try {
        window.history.pushState({ tab: previous }, '', `#${previous}`);
      } catch {
        // ignore
      }
      setActiveTab(previous);
    } else {
      handleNavigate('dashboard');
    }
  };

  const handleOpenChatWithTrainer = (trainerContactId: string) => {
    setChatInitialContactId(trainerContactId);
    handleNavigate('chat-call');
  };

  // 4. Accessibility Font Size
  const [fontSize, setFontSize] = useState<'normal' | 'large'>(() => {
    try {
      const saved = localStorage.getItem('sherise_font_size');
      if (saved === 'large' || saved === 'normal') return saved;
    } catch {
      // ignore
    }
    return 'normal';
  });

  const handleToggleFontSize = () => {
    const next = fontSize === 'normal' ? 'large' : 'normal';
    setFontSize(next);
    try {
      localStorage.setItem('sherise_font_size', next);
    } catch {
      // ignore
    }
  };

  // 5. Saved Bookmarked Schemes
  const [savedSchemeIds, setSavedSchemeIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_saved_schemes');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['kalaignar-magalir-urimai', 'sathiyavani-muthu-sewing'];
  });

  const handleToggleSaveScheme = (schemeId: string) => {
    setSavedSchemeIds((prev) => {
      const exists = prev.includes(schemeId);
      const updated = exists ? prev.filter((id) => id !== schemeId) : [...prev, schemeId];
      try {
        localStorage.setItem('sherise_saved_schemes', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // 6. Privacy Configuration & Quick Shield
  const [privacyConfig, setPrivacyConfig] = useState<PrivacyConfig>(() => {
    try {
      const saved = localStorage.getItem('sherise_privacy_config');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      discreetMode: false,
      pinLockEnabled: false,
      pinCode: '',
      anonymousCommunity: false,
      largeText: false,
      soundEnabled: true,
    };
  });

  const handleUpdatePrivacyConfig = (updates: Partial<PrivacyConfig>) => {
    setPrivacyConfig((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem('sherise_privacy_config', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const [isShieldActive, setIsShieldActive] = useState(false);
  const [showDeploymentGuide, setShowDeploymentGuide] = useState(false);

  // 7. Audio TTS & Voice Navigation State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListeningVoice, setIsListeningVoice] = useState(false);
  const [voiceToast, setVoiceToast] = useState<string | null>(null);

  useEffect(() => {
    registerSpeechListener((speaking) => {
      setIsSpeaking(speaking);
    });
  }, []);

  const handleToggleSpeakPage = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const t = translations[lang];
      let msg = '';
      if (activeTab === 'dashboard') {
        msg = `${t.dashboard.welcomeTitle}. ${t.dashboard.welcomeSub}. ${t.dashboard.todayFocus}`;
      } else if (activeTab === 'find-teachers') {
        msg = lang === 'ta' ? 'சரிபார்க்கப்பட்ட ஆசிரியைகள் மற்றும் வழிகாட்டிகளை கண்டறியும் பகுதி' : 'Find verified teachers and instructors directory';
      } else if (activeTab === 'earn') {
        msg = lang === 'ta' ? 'தையல் ஒப்பந்தங்கள், வீட்டு உணவு மற்றும் வேலைவாய்ப்பு பகுதி' : 'Earn and employment opportunities';
      } else if (activeTab === 'entrepreneurs') {
        msg = lang === 'ta' ? 'பெண் தொழில் முனைவோர் அரங்கம் மற்றும் மொத்த விற்பனையாளர்கள்' : 'Women entrepreneurs showcase and raw materials';
      } else if (activeTab === 'payments') {
        msg = lang === 'ta' ? 'கட்டணம், 10 சதவீத SHERISE கமிஷன் மற்றும் ஆசிரியையின் 90 சதவீத வருவாய்' : 'UPI Payments, 10 percent commission, and teacher payouts';
      } else if (activeTab === 'emergency-help') {
        msg = `${t.emergency.title}. ${t.emergency.sub}`;
      } else if (activeTab === 'chat-call') {
        msg = `${t.chatCall.title}. ${t.chatCall.sub}`;
      } else if (activeTab === 'skills-learning') {
        msg = `${t.skillsLearning.title}. ${t.skillsLearning.sub}`;
      } else if (activeTab === 'schemes') {
        msg = `${t.schemes.title}. ${t.schemes.sub}`;
      } else if (activeTab === 'education') {
        msg = `${t.education.title}. ${t.education.sub}`;
      } else if (activeTab === 'skills') {
        msg = `${t.skills.title}. ${t.skills.sub}`;
      } else if (activeTab === 'business-generator') {
        msg = `${t.business.title}. ${t.business.sub}`;
      } else if (activeTab === 'budget-calculator') {
        msg = `${t.budget.title}. ${t.budget.sub}`;
      } else if (activeTab === 'community') {
        msg = `${t.community.title}. ${t.community.sub}`;
      } else if (activeTab === 'profile') {
        msg = `${t.profile.title}. ${t.profile.sub}`;
      } else if (activeTab === 'privacy') {
        msg = `${t.privacy.title}. ${t.privacy.sub}`;
      }
      speakText(msg, lang);
    }
  };

  const getTabLabel = (tab: string, currentLang: Language) => {
    const t = translations[currentLang];
    switch (tab) {
      case 'dashboard':
        return currentLang === 'hi' ? 'मुख्य पृष्ठ (होम)' : currentLang === 'ta' ? 'முகப்பு' : 'Home Dashboard';
      case 'find-teachers':
        return t.nav.findTeachers || 'Find Teachers';
      case 'earn':
        return t.nav.earn || 'Earn';
      case 'entrepreneurs':
        return t.nav.entrepreneurs || 'Entrepreneurs';
      case 'payments':
        return t.nav.payments || 'Payments';
      case 'emergency-help':
        return currentLang === 'hi' ? 'आपातकालीन सहायता (112)' : currentLang === 'ta' ? 'அவசர உதவி 112' : 'Emergency Help 112';
      case 'schemes':
        return t.nav.schemes;
      case 'skills-learning':
        return t.nav.skillsLearning;
      case 'chat-call':
        return t.nav.chatCall;
      case 'education':
        return t.nav.education;
      case 'skills':
        return t.nav.skills;
      case 'business-generator':
        return t.nav.businessGenerator;
      case 'budget-calculator':
        return t.nav.budgetCalculator;
      case 'community':
        return t.nav.community;
      case 'profile':
        return t.nav.profile;
      case 'privacy':
        return t.nav.privacy;
      default:
        return tab;
    }
  };

  const handleToggleVoiceRecognition = () => {
    if (isListeningVoice) {
      setIsListeningVoice(false);
      return;
    }

    setIsListeningVoice(true);
    startVoiceRecognition(
      lang,
      (text, matchedTab) => {
        setIsListeningVoice(false);
        if (matchedTab) {
          setActiveTab(matchedTab as ActiveTab);
          const tabLabel = getTabLabel(matchedTab, lang);
          const toastMsg =
            lang === 'ta'
              ? `குரல்: "${text}" ➔ ${tabLabel}`
              : lang === 'hi'
              ? `पहचाना गया: "${text}" ➔ ${tabLabel}`
              : `Recognized: "${text}" ➔ ${tabLabel}`;
          setVoiceToast(toastMsg);

          // Assistant voice response in Hindi or active language
          const spokenReply =
            lang === 'hi'
              ? `${tabLabel} खोला जा रहा है।`
              : lang === 'ta'
              ? `${tabLabel} திறக்கப்படுகிறது.`
              : `Opening ${tabLabel}.`;
          speakText(spokenReply, lang);
        } else {
          const notFoundMsg =
            lang === 'ta'
              ? `கேட்ட சொல்: "${text}". கட்டளை பொருந்தவில்லை. 'திட்டம்', 'அவசரம்', 'பட்ஜெட்' என்று கூறிப்பாருங்கள்.`
              : lang === 'hi'
              ? `सुना गया: "${text}"। आदेश समझ नहीं आया। आप 'योजना', 'आपातकाल', 'कौशल' या 'बजट' बोल सकते हैं।`
              : `Heard: "${text}". Command not recognized. Try "Schemes", "Emergency", or "Budget".`;
          setVoiceToast(notFoundMsg);

          const spokenGuidance =
            lang === 'hi'
              ? `सुना गया: "${text}"। क्षमा करें, यह आदेश समझ नहीं आया। आप योजनाएं, आपातकाल, कौशल या बजट बोल सकती हैं।`
              : lang === 'ta'
              ? `கேட்ட சொல்: "${text}". கட்டளை பொருந்தவில்லை.`
              : `Heard "${text}". Command not recognized.`;
          speakText(spokenGuidance, lang);
        }
        setTimeout(() => setVoiceToast(null), 5000);
      },
      (err) => {
        setIsListeningVoice(false);
        setVoiceToast(err);
        if (lang === 'hi') {
          speakText(err, 'hi');
        }
        setTimeout(() => setVoiceToast(null), 6000);
      },
      () => {
        setIsListeningVoice(false);
      }
    );
  };

  const handleClearAllLocalData = () => {
    try {
      localStorage.removeItem('sherise_budget_records');
      localStorage.removeItem('sherise_budget_plan_items');
      localStorage.removeItem('sherise_community_posts');
      localStorage.removeItem('sherise_saved_schemes');
      localStorage.removeItem('sherise_chat_messages');
      localStorage.removeItem('sherise_user_profile');
      setSavedSchemeIds([]);
    } catch {
      // ignore
    }
  };

  const t = translations[lang];

  return (
    <div
      className={`min-h-screen flex flex-col transition-all duration-200 ${
        fontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm'
      }`}
    >
      {/* Quick Shield Emergency Disguise Modal */}
      <QuickShieldModal
        isOpen={isShieldActive}
        onExit={() => setIsShieldActive(false)}
        lang={lang}
      />

      {/* Free Deployment Guide Modal */}
      <FreeDeploymentGuideModal
        isOpen={showDeploymentGuide}
        onClose={() => setShowDeploymentGuide(false)}
        lang={lang}
      />

      {/* Navbar Header */}
      <Navbar
        lang={lang}
        onLanguageChange={handleLanguageChange}
        activeTab={activeTab}
        onTabChange={handleNavigate}
        isSpeaking={isSpeaking}
        onToggleSpeakPage={handleToggleSpeakPage}
        isListeningVoice={isListeningVoice}
        onToggleVoiceRecognition={handleToggleVoiceRecognition}
        onTriggerQuickShield={() => setIsShieldActive(true)}
        onOpenDeploymentGuide={() => setShowDeploymentGuide(true)}
        fontSize={fontSize}
        onToggleFontSize={handleToggleFontSize}
      />

      {/* Voice Toast Message */}
      {voiceToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <span>{voiceToast}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            lang={lang}
            onNavigate={handleNavigate}
            savedSchemesCount={savedSchemeIds.length}
            userProfile={userProfile}
          />
        )}

        {activeTab === 'emergency-help' && (
          <EmergencyHelpView lang={lang} userProfile={userProfile} />
        )}

        {activeTab === 'chat-call' && (
          <ChatCallView lang={lang} initialContactId={chatInitialContactId} />
        )}

        {activeTab === 'skills-learning' && (
          <SkillsLearningView
            lang={lang}
            userProfile={userProfile}
            onOpenChatWithTrainer={handleOpenChatWithTrainer}
          />
        )}

        {activeTab === 'find-teachers' && (
          <FindTeachersView
            lang={lang}
            userProfile={userProfile}
            courses={courses}
            bookings={bookings}
            onOpenChatWithTeacher={handleOpenChatWithTrainer}
            onBookCourse={handleBookCourse}
            onNavigateToCourse={() => handleNavigate('skills-learning')}
          />
        )}

        {activeTab === 'earn' && (
          <EarnView
            lang={lang}
            userProfile={userProfile}
            onNavigateToBusinessGenerator={() => handleNavigate('business-generator')}
            onNavigateToSchemes={() => handleNavigate('schemes')}
            onOpenChat={handleOpenChatWithTrainer}
          />
        )}

        {activeTab === 'entrepreneurs' && (
          <EntrepreneursView
            lang={lang}
            userProfile={userProfile}
            onOpenRawMaterialFinder={() => handleNavigate('skills')}
            onOpenBusinessGenerator={() => handleNavigate('business-generator')}
            onNavigateToSchemes={() => handleNavigate('schemes')}
            onOpenChat={handleOpenChatWithTrainer}
          />
        )}

        {activeTab === 'payments' && (
          <PaymentsView
            lang={lang}
            userProfile={userProfile}
            bookings={bookings}
            onRefundBooking={handleRefundBooking}
            onInitiatePayout={() => {
              // Simulated payout processing in Sandbox
            }}
          />
        )}

        {activeTab === 'schemes' && (
          <SchemesView
            lang={lang}
            savedSchemeIds={savedSchemeIds}
            onToggleSaveScheme={handleToggleSaveScheme}
            onNavigateBack={handleNavigateBack}
          />
        )}

        {activeTab === 'education' && (
          <EducationView
            lang={lang}
            onNavigateBack={handleNavigateBack}
          />
        )}

        {activeTab === 'skills' && (
          <SkillsIncomeView
            lang={lang}
            onNavigateToBusinessGenerator={() => handleNavigate('business-generator')}
          />
        )}

        {activeTab === 'business-generator' && (
          <BusinessIdeaGeneratorView
            lang={lang}
            onNavigate={handleNavigate}
            onNavigateBack={handleNavigateBack}
          />
        )}

        {activeTab === 'budget-calculator' && (
          <BudgetCalculatorView
            lang={lang}
            onNavigate={handleNavigate}
            onNavigateBack={handleNavigateBack}
          />
        )}

        {activeTab === 'community' && (
          <CommunityView
            lang={lang}
            userProfile={userProfile}
            onNavigateBack={handleNavigateBack}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            lang={lang}
            userProfile={userProfile}
            onUpdateProfile={handleUpdateUserProfile}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'privacy' && (
          <PrivacySettingsView
            lang={lang}
            privacyConfig={privacyConfig}
            onUpdatePrivacyConfig={handleUpdatePrivacyConfig}
            onTriggerQuickShield={() => setIsShieldActive(true)}
            onClearAllLocalData={handleClearAllLocalData}
          />
        )}
      </main>

      {/* Mobile Sticky Bottom Action Bar for Quick Rural Access */}
      <nav
        aria-label="Mobile Bottom Bar"
        className="lg:hidden sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-rose-200 px-1.5 py-1.5 flex items-center justify-around text-[10px] font-bold text-stone-600 shadow-lg overflow-x-auto no-scrollbar"
      >
        <button
          onClick={() => handleNavigate('dashboard')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg ${
            activeTab === 'dashboard' ? 'text-rose-600 font-extrabold' : 'hover:text-rose-600'
          }`}
        >
          <span className="text-sm">🏠</span>
          <span className="truncate">{t.nav.home || 'Home'}</span>
        </button>

        <button
          onClick={() => handleNavigate('skills-learning')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg ${
            activeTab === 'skills-learning' ? 'text-rose-600 font-extrabold' : 'hover:text-rose-600'
          }`}
        >
          <span className="text-sm">🎓</span>
          <span className="truncate">{t.nav.learn || 'Learn'}</span>
        </button>

        <button
          onClick={() => handleNavigate('find-teachers')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg ${
            activeTab === 'find-teachers' ? 'text-rose-600 font-extrabold' : 'hover:text-rose-600'
          }`}
        >
          <span className="text-sm">👩‍🏫</span>
          <span className="truncate">{lang === 'ta' ? 'ஆசிரியைகள்' : 'Teachers'}</span>
        </button>

        <button
          onClick={() => handleNavigate('earn')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg ${
            activeTab === 'earn' ? 'text-rose-600 font-extrabold' : 'hover:text-rose-600'
          }`}
        >
          <span className="text-sm">💼</span>
          <span className="truncate">{t.nav.earn || 'Earn'}</span>
        </button>

        <button
          onClick={() => handleNavigate('payments')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg ${
            activeTab === 'payments' ? 'text-rose-600 font-extrabold' : 'hover:text-rose-600'
          }`}
        >
          <span className="text-sm">💳</span>
          <span className="truncate">{t.nav.payments || 'Pay'}</span>
        </button>

        <button
          onClick={() => handleNavigate('schemes')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg ${
            activeTab === 'schemes' ? 'text-rose-600 font-extrabold' : 'hover:text-rose-600'
          }`}
        >
          <span className="text-sm">📜</span>
          <span className="truncate">{lang === 'ta' ? 'திட்டங்கள்' : 'Schemes'}</span>
        </button>

        <button
          onClick={() => handleNavigate('profile')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg ${
            activeTab === 'profile' ? 'text-rose-600 font-extrabold' : 'hover:text-rose-600'
          }`}
        >
          <span className="text-sm">👤</span>
          <span className="truncate">{t.nav.profile || 'Profile'}</span>
        </button>
      </nav>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-10 pb-8 mt-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Col 1: About */}
            <div className="space-y-3">
              <BrandLogo
                size="sm"
                variant="light"
                showTagline={true}
                onClick={() => handleNavigate('dashboard')}
              />
              <p className="text-stone-400 leading-relaxed text-[11px]">
                {t.appSubtitle}
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Free & Open Community Platform</span>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="space-y-2">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">
                {lang === 'ta' ? 'விரைவு இணைப்புகள்' : lang === 'hi' ? 'मुख्य लिंक' : 'Key Sections'}
              </h3>
              <ul className="space-y-1.5 text-stone-400 text-[11px]">
                <li>
                  <button
                    onClick={() => handleNavigate('emergency-help')}
                    className="hover:text-rose-400 transition font-bold text-rose-300"
                  >
                    🚨 {t.nav.emergencyHelp}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('schemes')}
                    className="hover:text-rose-400 transition"
                  >
                    {t.nav.schemes}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('skills-learning')}
                    className="hover:text-rose-400 transition"
                  >
                    {t.nav.skillsLearning}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('education')}
                    className="hover:text-rose-400 transition"
                  >
                    {t.nav.education}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('community')}
                    className="hover:text-rose-400 transition"
                  >
                    {t.nav.community}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('chat-call')}
                    className="hover:text-rose-400 transition"
                  >
                    {t.nav.chatCall}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('profile')}
                    className="hover:text-rose-400 transition"
                  >
                    {t.nav.profile}
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Women Safety Helplines */}
            <div className="space-y-2">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5 text-rose-400">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{t.dashboard.emergencyHelplines}</span>
              </h3>
              <ul className="space-y-1 text-stone-400 text-[11px]">
                <li>
                  <a href="tel:112" className="hover:text-white font-extrabold text-amber-300">
                    112
                  </a>{' '}
                  - {lang === 'ta' ? 'தேசிய அவசர உதவி எண்' : lang === 'hi' ? 'राष्ट्रीय आपातकालीन नंबर' : 'National All-in-One Helpline'}
                </li>
                <li>
                  <a href="tel:181" className="hover:text-white font-bold text-amber-300">
                    181
                  </a>{' '}
                  - {lang === 'ta' ? 'பெண்கள் உதவி மையம் (24/7)' : lang === 'hi' ? 'महिला हेल्पलाइन (24/7)' : 'Women Helpline'}
                </li>
                <li>
                  <a href="tel:1098" className="hover:text-white font-bold text-amber-300">
                    1098
                  </a>{' '}
                  - {lang === 'ta' ? 'குழந்தைகள் உதவி எண்' : lang === 'hi' ? 'चाइल्डलाइन' : 'Childline'}
                </li>
                <li>
                  <a href="tel:1930" className="hover:text-white font-bold text-amber-300">
                    1930
                  </a>{' '}
                  - {lang === 'ta' ? 'சைபர் கிரைம் உதவி' : lang === 'hi' ? 'साइबर धोखाधड़ी हेल्पलाइन' : 'Cyber Fraud Reporting'}
                </li>
              </ul>
            </div>

            {/* Col 4: Free Deployment */}
            <div className="space-y-2">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1 text-amber-400">
                <Rocket className="w-3.5 h-3.5" />
                <span>{t.nav.deploymentGuide}</span>
              </h3>
              <p className="text-stone-400 text-[11px] leading-relaxed">
                {lang === 'ta'
                  ? 'இந்த திட்டத்தை எந்த கட்டணமும் இன்றி Vercel, Netlify அல்லது GitHub Pages-ல் $0 செலவில் இயக்கலாம்.'
                  : lang === 'hi'
                  ? 'इस प्रोजेक्ट को $0 खर्च पर Vercel, Netlify या GitHub Pages पर हमेशा के लिए निःशुल्क होस्ट करें।'
                  : 'Host this project 100% free forever on Vercel, Netlify, or GitHub Pages.'}
              </p>
              <button
                onClick={() => setShowDeploymentGuide(true)}
                className="mt-1 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-lg text-[11px] transition"
              >
                {lang === 'ta' ? 'வழிகாட்டியை காண்க' : lang === 'hi' ? 'निःशुल्क गाइड देखें' : 'View Free Guide'}
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
            <div>
              © {new Date().getFullYear()} SHERISE. {lang === 'ta' ? 'அனைத்து உரிமைகளும் பெண்களின் முன்னேற்றத்திற்கே.' : lang === 'hi' ? 'सभी अधिकार महिला सशक्तिकरण को समर्पित।' : 'Empowering Women Everywhere.'}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => handleLanguageChange(lang === 'ta' ? 'en' : lang === 'en' ? 'hi' : 'ta')}
                className="hover:text-stone-300 underline"
              >
                {t.common.changeLang}
              </button>
              <button
                onClick={() => setIsShieldActive(true)}
                className="hover:text-amber-400 flex items-center gap-1"
              >
                <Shield className="w-3 h-3" />
                <span>{t.common.discreetShield}</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
