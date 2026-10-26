/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FileCheck2,
  GraduationCap,
  Sparkle,
  Sparkles,
  Calculator,
  Users,
  Shield,
  PhoneCall,
  Volume2,
  CheckCircle2,
  ArrowRight,
  Heart,
  TrendingUp,
  HelpCircle,
  Lightbulb,
  ExternalLink,
  AlertTriangle,
  MessageCircle,
  GraduationCap as LearnIcon,
  UserCheck,
  MapPin
} from 'lucide-react';
import { Language, ActiveTab, UserProfile } from '../types';
import { translations } from '../data/translations';
import { speakText } from '../utils/speech';

interface DashboardViewProps {
  lang: Language;
  onNavigate: (tab: ActiveTab) => void;
  savedSchemesCount: number;
  userProfile?: UserProfile;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  lang,
  onNavigate,
  savedSchemesCount,
  userProfile,
}) => {
  const t = translations[lang];
  const [selectedPersona, setSelectedPersona] = useState<string>('all');

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t.dashboard.greetingMorning;
    if (hour < 17) return t.dashboard.greetingAfternoon;
    return t.dashboard.greetingEvening;
  };

  const handleSpeakOverview = () => {
    const textToSpeak =
      lang === 'ta'
        ? `வணக்கம் சகோதரி! SHERISE தளத்திற்கு நல்வரவு. அரசு உதவி திட்டங்கள், தையல் மற்றும் உணவு பொருட்கள் போன்ற வீட்டுத் தொழில்கள், பாதியில் நின்ற படிப்பை மீண்டும் தொடங்கும் வழிகாட்டிகள், அவசர உதவி வரைபடம், தோழிகள் உரையாடல் மற்றும் சகோதரிகள் வட்டம் ஆகியவை இங்கு உள்ளன. நீங்கள் விரும்பும் பகுதியை தேர்வு செய்யுங்கள்.`
        : lang === 'hi'
        ? `नमस्ते बहन! SHERISE मंच पर आपका स्वागत है। यहां सरकारी योजनाएं, सिलाई व खाद्य उत्पाद जैसे घरेलू व्यवसाय, दोबारा शिक्षा के अवसर, आपातकालीन 112 सहायता, और सखी संवाद उपलब्ध हैं। शुरू करने के लिए किसी भी विकल्प पर क्लिक करें।`
        : `Welcome sister! SHERISE is here to support you. Explore verified government schemes, home-based skill income, education second chances, emergency 112 assistance, mentor chat, and our supportive sisterhood circle. Click any section to begin.`;
    speakText(textToSpeak, lang);
  };

  const quickActionCards = [
    {
      tab: 'emergency-help' as ActiveTab,
      title: lang === 'ta' ? 'அவசர உதவி & வரைபடம் (SOS)' : lang === 'hi' ? 'आपातकालीन सहायता व नक्शा (SOS)' : 'Emergency Help & Live Locator (SOS)',
      subtitle:
        lang === 'ta'
          ? 'தேசிய எண் 112, மகளிர் உதவி 181, அருகில் உள்ள காவல் நிலையம் மற்றும் அரசு மருத்துவமனை'
          : lang === 'hi'
          ? 'राष्ट्रीय 112, महिला हेल्पलाइन 181, नजदीकी थाना व अस्पताल'
          : 'National 112, Women Helpline 181, nearby police stations & primary health centres',
      icon: <AlertTriangle className="w-6 h-6 text-rose-600" />,
      color: 'from-rose-100/90 to-red-50 border-rose-300 text-rose-950 ring-1 ring-rose-200',
      badge: lang === 'ta' ? '24/7 அவசரம்' : lang === 'hi' ? '24/7 आपातकाल' : '24/7 Active',
      badgeColor: 'bg-rose-600 text-white font-extrabold',
    },
    {
      tab: 'skills-learning' as ActiveTab,
      title: lang === 'ta' ? 'திறன் கற்றல் & கற்பித்தல்' : lang === 'hi' ? 'कौशल सीखना व सिखाना' : 'Skills Learning & Teaching Hub',
      subtitle:
        lang === 'ta'
          ? 'தையல், உணவு, டிஜிட்டல் அறிவு, ஆங்கிலம் கற்கவும் அல்லது நீங்கள் மற்றவருக்கு கற்பிக்கவும்'
          : lang === 'hi'
          ? 'सिलाई, खाना पकाना, कंप्यूटर साक्षरता सीखें या अपनी कला दूसरों को सिखाएं'
          : 'Structured lesson paths in tailoring, food, computers, English + register as trainer',
      icon: <LearnIcon className="w-6 h-6 text-indigo-600" />,
      color: 'from-indigo-50 to-blue-50 border-indigo-200 text-indigo-950',
      badge: lang === 'ta' ? 'கற்றல் / கற்பித்தல்' : lang === 'hi' ? 'सीखें / सिखाएं' : 'Learn / Teach',
      badgeColor: 'bg-indigo-100 text-indigo-800',
    },
    {
      tab: 'schemes' as ActiveTab,
      title: lang === 'ta' ? 'அரசு நலத்திட்டங்கள்' : lang === 'hi' ? 'सरकारी कल्याणकारी योजनाएं' : 'Government Schemes',
      subtitle:
        lang === 'ta'
          ? 'மகளிர் உரிமைத்தொகை ₹1000, இலவச தையல் இயந்திரம், SHG மானியங்கள்'
          : lang === 'hi'
          ? '₹1000 मासिक सम्मान राशि, मुफ्त सिलाई मशीन, एसएचजी अनुदान'
          : '₹1000 Monthly basic aid, free sewing machines, SHG grants with verification dates',
      icon: <FileCheck2 className="w-6 h-6 text-rose-600" />,
      color: 'from-rose-50 to-pink-50 border-rose-200 text-rose-950',
      badge: lang === 'ta' ? '40 சரிபார்க்கப்பட்ட திட்டங்கள்' : lang === 'hi' ? '40 सत्यापित योजनाएं' : '40 Verified Schemes',
      badgeColor: 'bg-rose-100 text-rose-800',
    },
    {
      tab: 'chat-call' as ActiveTab,
      title: lang === 'ta' ? 'உள்-செயலி அரட்டை & அழைப்பு' : lang === 'hi' ? 'ऐप में चैट और कॉल' : 'In-App Chat & Call',
      subtitle:
        lang === 'ta'
          ? 'தையல் பயிற்சியாளர்கள், வழிகாட்டிகள் மற்றும் சக கிராமத்து தோழிகளுடன் உரையாட'
          : lang === 'hi'
          ? 'सिलाई प्रशिक्षकों, मेंटर्स और सखियों से सीधा संपर्क व कॉल'
          : 'Direct messaging and voice/video preview with trainers and mentors',
      icon: <MessageCircle className="w-6 h-6 text-teal-600" />,
      color: 'from-teal-50 to-emerald-50 border-teal-200 text-teal-950',
      badge: lang === 'ta' ? 'பாதுகாப்பான உரையாடல்' : lang === 'hi' ? 'सुरक्षित संवाद' : 'Safe Connect',
      badgeColor: 'bg-teal-100 text-teal-800',
    },
    {
      tab: 'skills' as ActiveTab,
      title: lang === 'ta' ? 'திறன் & வீட்டு வருமானம்' : lang === 'hi' ? 'कौशल और घरेलू आय' : 'Skills & Micro-Income',
      subtitle:
        lang === 'ta'
          ? 'தையல், மசாலா பொடிகள், நாட்டுக்கோழி, காளான் வளர்ப்பு வழிகாட்டிகள்'
          : lang === 'hi'
          ? 'सिलाई, घरेलू मसाले, देशी मुर्गी, मशरूम उत्पादन'
          : 'Tailoring, traditional masala, poultry, mushroom guides with launch steps',
      icon: <Sparkle className="w-6 h-6 text-amber-600" />,
      color: 'from-amber-50 to-orange-50 border-amber-200 text-amber-950',
      badge: lang === 'ta' ? '₹5000 - ₹18000/மாதம்' : lang === 'hi' ? '₹5000 - ₹18000/माह' : '₹5000 - ₹18000/mo',
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      tab: 'education' as ActiveTab,
      title: lang === 'ta' ? 'கல்வி இரண்டாம் வாய்ப்பு' : lang === 'hi' ? 'शिक्षा द्वितीय अवसर' : 'Education Second Chance',
      subtitle:
        lang === 'ta'
          ? 'பாதியில் நின்ற 10, 12 அல்லது டிகிரி படிப்பை வீட்டில் இருந்தே முடிக்கலாம்'
          : lang === 'hi'
          ? 'घर बैठे 10वीं, 12वीं या डिग्री पूरी करें (एनआईओएस व मुक्त वि.वि.)'
          : 'Complete 10th, 12th or degree from home via NIOS & Open Universities',
      icon: <GraduationCap className="w-6 h-6 text-emerald-600" />,
      color: 'from-emerald-50 to-teal-50 border-emerald-200 text-emerald-950',
      badge: lang === 'ta' ? 'பள்ளி செல்ல தேவையில்லை' : lang === 'hi' ? 'घर बैठे पढ़ाई' : 'Study from Home',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      tab: 'business-generator' as ActiveTab,
      title: lang === 'ta' ? 'தொழில் யோசனை உருவாக்கி' : lang === 'hi' ? 'व्यापार योजना जनरेटर' : 'Business Idea Generator',
      subtitle:
        lang === 'ta'
          ? 'உங்கள் நேரம் மற்றும் சேமிப்புக்கேற்ப செயல் திட்டம் & பட்ஜெட்'
          : lang === 'hi'
          ? 'आपके खाली समय और बजट के अनुसार व्यवसायिक रोडमैप'
          : 'Instant step-by-step roadmap based on your spare hours & capital',
      icon: <Sparkles className="w-6 h-6 text-purple-600" />,
      color: 'from-purple-50 to-indigo-50 border-purple-200 text-purple-950',
      badge: lang === 'ta' ? 'செயல் திட்டம்' : lang === 'hi' ? 'कस्टम योजना' : 'Custom Plan',
      badgeColor: 'bg-purple-100 text-purple-800',
    },
    {
      tab: 'budget-calculator' as ActiveTab,
      title: lang === 'ta' ? 'வரவு-செலவு & பட்ஜெட் பிளானர்' : lang === 'hi' ? 'बजट और वित्तीय योजना' : 'Budget & Financial Planner',
      subtitle:
        lang === 'ta'
          ? 'மூலப்பொருள் திட்டமிடல், வாடகை & நிகர லாபம் மற்றும் சேமிப்பு'
          : lang === 'hi'
          ? 'कच्चा माल लागत, दुकान किराया, शुद्ध लाभ और बचत योजना'
          : 'Calculate startup costs, monthly overhead, take-home profit & savings',
      icon: <Calculator className="w-6 h-6 text-blue-600" />,
      color: 'from-blue-50 to-cyan-50 border-blue-200 text-blue-950',
      badge: lang === 'ta' ? 'எளிய கால்குலேட்டர்' : lang === 'hi' ? 'सरल टूल' : 'Itemized Table',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      tab: 'community' as ActiveTab,
      title: lang === 'ta' ? 'தோழிகள் வட்டம் (சகோதரத்துவ குழு)' : lang === 'hi' ? 'सहेली मंडल (समस्या समाधान)' : 'Sisterhood Circles (Problem-Based)',
      subtitle:
        lang === 'ta'
          ? 'புதுச்சேரி & தமிழ்நாடு பகுதிக்கான பிரச்சனை வட்டங்கள், கூட்டு தீர்வுகள் & உறுதிமொழி'
          : lang === 'hi'
          ? 'पुदुचेरी और तमिलनाडु सहायता समूह, सहकर्मी समाधान एवं सामूहिक पहल'
          : 'Puducherry & Tamil Nadu problem circles, peer guidance & collective action',
      icon: <Users className="w-6 h-6 text-pink-600" />,
      color: 'from-pink-50 to-rose-50 border-pink-200 text-pink-950',
      badge: lang === 'ta' ? 'கூட்டு நடவடிக்கை' : lang === 'hi' ? 'सामूहिक पहल' : 'Collective Action',
      badgeColor: 'bg-pink-100 text-pink-800',
    },
    {
      tab: 'profile' as ActiveTab,
      title: lang === 'ta' ? 'சுயவிவரம் & மாதிரி கணக்கு (Demo)' : lang === 'hi' ? 'प्रोफ़ाइल व डेमो लॉगिन' : 'Profile & Demo Mode',
      subtitle:
        lang === 'ta'
          ? 'மாதிரி பயனர்கள், விருப்பத் திறன்கள் & நேரடி டெமோ அடையாள அட்டை'
          : lang === 'hi'
          ? 'डेमो प्रोफाइल चयन, कौशल व बजट विवरण (सिम्युलेटेड)'
          : 'Demo personas, custom profile ID, skills & sample data settings',
      icon: <UserCheck className="w-6 h-6 text-stone-700" />,
      color: 'from-stone-50 to-amber-50/50 border-stone-200 text-stone-950',
      badge: lang === 'ta' ? 'மாதிரி டெமோ' : lang === 'hi' ? 'डेमो मोड' : 'Demo Mode',
      badgeColor: 'bg-stone-200 text-stone-800',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-600 via-rose-500 to-amber-500 text-white p-6 sm:p-10 shadow-lg shadow-rose-200">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute left-1/3 -top-12 w-48 h-48 bg-amber-300/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-semibold mb-3 tracking-wide text-rose-50">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>{getTimeGreeting()}</span>
            {userProfile && (
              <span className="font-bold border-l border-white/30 pl-2">
                {userProfile.name} ({userProfile.demoId || userProfile.id})
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            {t.dashboard.welcomeTitle}
          </h1>

          <p className="text-sm sm:text-base text-rose-50 leading-relaxed font-normal mb-6">
            {t.dashboard.welcomeSub}
          </p>

          {/* Quick Buttons on Hero */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Direct Emergency SOS */}
            <button
              onClick={() => onNavigate('emergency-help')}
              className="flex items-center gap-2 px-4 py-2.5 bg-rose-950 text-white hover:bg-black font-extrabold text-xs sm:text-sm rounded-full shadow-md transition active:scale-95"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>{lang === 'ta' ? 'அவசர உதவி 112 (SOS)' : lang === 'hi' ? 'आपातकाल 112 (SOS)' : 'Emergency Help 112'}</span>
            </button>

            <button
              onClick={() => onNavigate('schemes')}
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-rose-700 hover:bg-rose-50 font-bold text-xs sm:text-sm rounded-full shadow-md transition active:scale-95"
            >
              <span>{t.dashboard.exploreBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('skills-learning')}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-400 text-stone-900 hover:bg-amber-300 font-bold text-xs sm:text-sm rounded-full shadow-md transition active:scale-95"
            >
              <LearnIcon className="w-4 h-4" />
              <span>{lang === 'ta' ? 'திறன் கற்க / கற்பிக்க' : lang === 'hi' ? 'कौशल सीखें' : 'Skills Learning'}</span>
            </button>

            <button
              onClick={handleSpeakOverview}
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-full transition"
              title="Listen overview"
              aria-label="Listen to dashboard overview"
            >
              <Volume2 className="w-4 h-4" />
              <span>{t.common.listen}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Emergency Quick Bar */}
      <section className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-2xl p-4 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-300 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-black">
              {lang === 'ta' ? 'அவசர கால உதவி எண் 112 & மகளிர் உதவி எண் 181' : lang === 'hi' ? 'राष्ट्रीय आपातकालीन 112 और महिला हेल्पलाइन 181' : 'National Emergency 112 & Women Helpline 181'}
            </h2>
            <p className="text-[11px] text-rose-100">
              {lang === 'ta'
                ? 'நேரடி அழைப்பு, நேரடி வரைபடம் & காவல்துறை/மருத்துவமனை தொலைவு வழிகாட்டி'
                : lang === 'hi'
                ? 'सीधा कॉल, स्थान-आधारित पुलिस और अस्पताल नेविगेशन'
                : 'Direct calls, live GPS map, nearby police & medical assistance'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="tel:112"
            className="px-4 py-2 bg-white text-red-700 hover:bg-red-50 font-black text-xs rounded-xl shadow-xs transition"
          >
            📞 {lang === 'ta' ? 'அழைக்க 112' : lang === 'hi' ? 'कॉल 112' : 'Call 112'}
          </a>
          <button
            onClick={() => onNavigate('emergency-help')}
            className="px-4 py-2 bg-rose-900/60 hover:bg-rose-900 text-white font-bold text-xs rounded-xl border border-white/30 transition"
          >
            {lang === 'ta' ? 'வரைபடம் & SOS' : lang === 'hi' ? 'नक्शा व SOS' : 'Map & SOS'}
          </button>
        </div>
      </section>

      {/* Quick Action Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-rose-600" />
            <span>{t.dashboard.quickActions}</span>
          </h2>
          <span className="text-xs text-stone-500 font-medium">
            {lang === 'ta' ? 'அனைத்தும் 100% இலவசம்' : lang === 'hi' ? '100% निःशुल्क' : '100% Free & Open'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActionCards.map((card) => (
            <div
              key={card.tab}
              onClick={() => onNavigate(card.tab)}
              className={`p-5 rounded-3xl border bg-gradient-to-br ${card.color} shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group active:scale-[0.99]`}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 bg-white rounded-2xl shadow-2xs border border-stone-100 group-hover:scale-105 transition">
                    {card.icon}
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-base font-extrabold tracking-tight mb-1 text-stone-900">
                  {card.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  {card.subtitle}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-stone-200/60 flex items-center justify-between text-xs font-bold text-stone-900 group-hover:text-rose-600 transition">
                <span>{lang === 'ta' ? 'தொடங்குக' : lang === 'hi' ? 'प्रारंभ करें' : 'Open Section'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sisterhood Community Inspiration Banner */}
      <section className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-amber-200 fill-amber-200" />
            <span className="text-xs font-bold tracking-wide uppercase text-pink-100">
              {lang === 'ta' ? 'சகோதரிகள் ஆதரவு நெட்வொர்க்' : lang === 'hi' ? 'सखी सहायता नेटवर्क' : 'Sisterhood Solidarity'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold">
            {lang === 'ta'
              ? 'உங்களால் முடியும் தோழி! தனியாக போராட தேவையில்லை.'
              : lang === 'hi'
              ? 'आप कर सकती हैं सखी! आप अकेली नहीं हैं।'
              : 'You can do it sister! You are never alone.'}
          </h2>
          <p className="text-xs sm:text-sm text-pink-100 leading-relaxed">
            {lang === 'ta'
              ? '8-ம் வகுப்பு படித்துவிட்டு 4 தையல் மிஷின் வைத்துள்ள முத்துமாரி, வீட்டில் இருந்தே நாட்டுக்கோழி வளர்த்து மகனை படிக்க வைத்த கமலா என 100+ சகோதரிகள் உங்களை வரவேற்க காத்திருக்கிறார்கள்.'
              : lang === 'hi'
              ? 'सैकड़ों सफल ग्रामीण महिलाएं अपने अनुभव और समर्थन साझा करने के लिए तैयार हैं।'
              : 'Hundreds of rural women entrepreneurs and mentors are here to encourage you every day.'}
          </p>
        </div>

        <button
          onClick={() => onNavigate('community')}
          className="px-6 py-3 bg-white text-rose-700 hover:bg-rose-50 font-black text-xs sm:text-sm rounded-full shadow-lg shrink-0 transition active:scale-95"
        >
          {lang === 'ta' ? 'தோழிகள் வட்டத்தில் இணைக' : lang === 'hi' ? 'सखी मंडल से जुड़ें' : 'Join Sisterhood Circle'}
        </button>
      </section>
    </div>
  );
};
