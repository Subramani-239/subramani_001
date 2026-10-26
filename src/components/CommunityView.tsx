/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Users,
  Heart,
  MessageCircle,
  PlusCircle,
  Volume2,
  Shield,
  Send,
  X,
  Share2,
  CheckCircle2,
  Lock,
  Flag,
  UserX,
  AlertTriangle,
  BookOpen,
  Filter,
  Sparkles,
  Search,
  ArrowLeft,
  ShieldCheck,
  Info,
  MapPin,
  TrendingUp,
  Scale,
  Scissors,
  GraduationCap,
  Package,
  HeartHandshake,
  Check,
  ChevronRight,
  HandCoins,
  Megaphone,
  AlertCircle,
  FileText,
  PhoneCall,
  ExternalLink,
  Award,
  HelpCircle,
  FolderOpen
} from 'lucide-react';
import {
  Language,
  UserProfile,
  ProblemCircle,
  ProblemDiscussionThread,
  CircleProblemCategory,
  ProblemCircleResource,
  ProblemCircleExperience
} from '../types';
import { translations } from '../data/translations';
import { initialProblemCircles, initialProblemThreads } from '../data/sisterhoodData';
import {
  filterCirclesByLocationAndProblem,
  getThreadsForCircle,
  toggleCircleMembership,
  toggleThreadUpvote,
  toggleActionPledge,
  addSolutionToThread,
  createProblemThread,
  formatSafeAlias,
  createNewSupportCircle
} from '../utils/sisterhoodCircles';
import { speakText } from '../utils/speech';

interface CommunityViewProps {
  lang: Language;
  userProfile?: UserProfile;
  onNavigateBack?: () => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({
  lang,
  userProfile,
  onNavigateBack,
}) => {
  const t = translations[lang];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // 1. Circles State (Persistent in LocalStorage)
  const [circles, setCircles] = useState<ProblemCircle[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_problem_circles');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialProblemCircles;
  });

  const saveCircles = (updated: ProblemCircle[]) => {
    setCircles(updated);
    try {
      localStorage.setItem('sherise_problem_circles', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // 2. Discussion Threads State
  const [threads, setThreads] = useState<ProblemDiscussionThread[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_problem_threads');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialProblemThreads;
  });

  const saveThreads = (updated: ProblemDiscussionThread[]) => {
    setThreads(updated);
    try {
      localStorage.setItem('sherise_problem_threads', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // 3. Joined Circle IDs State
  const [joinedCircleIds, setJoinedCircleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_joined_circles');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['circle-pondy-education-reentry', 'circle-karaikal-tailoring-orders'];
  });

  const saveJoinedCircleIds = (updated: string[]) => {
    setJoinedCircleIds(updated);
    try {
      localStorage.setItem('sherise_joined_circles', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // 4. Navigation & Active Circle State
  const [selectedCircleForDetail, setSelectedCircleForDetail] = useState<ProblemCircle | null>(null);

  // Tabs inside a selected Circle: "discussions", "experiences", "resources", "actions"
  const [circleSubTab, setCircleSubTab] = useState<'discussions' | 'experiences' | 'resources' | 'actions'>('discussions');

  // 5. Filter States
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'puducherry' | 'tamil_nadu'>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showJoinedOnly, setShowJoinedOnly] = useState<boolean>(false);

  // 6. Action & Form Modals
  // A. Create New Circle Modal (Requirement 3)
  const [showCreateCircleModal, setShowCreateCircleModal] = useState<boolean>(false);
  const [newCircleName, setNewCircleName] = useState('');
  const [newCircleCategory, setNewCircleCategory] = useState<CircleProblemCategory>('livelihood_wages');
  const [newCircleRegion, setNewCircleRegion] = useState<'all' | 'puducherry' | 'tamil_nadu'>('puducherry');
  const [newCircleDistrict, setNewCircleDistrict] = useState('Puducherry');
  const [newCircleDesc, setNewCircleDesc] = useState('');
  const [newCircleActiveProblem, setNewCircleActiveProblem] = useState('');
  const [newCircleIsPrivate, setNewCircleIsPrivate] = useState(false);
  const [newCircleTags, setNewCircleTags] = useState('Peer Support');

  // B. Ask Question / Post Problem Modal inside Circle
  const [showNewProblemModal, setShowNewProblemModal] = useState<boolean>(false);
  const [newProblemTitle, setNewProblemTitle] = useState<string>('');
  const [newProblemDesc, setNewProblemDesc] = useState<string>('');
  const [isAnonymousPost, setIsAnonymousPost] = useState<boolean>(false);
  const [customAuthorAlias, setCustomAuthorAlias] = useState<string>(userProfile?.name ? `Sister ${userProfile.name.split(' ')[0]}` : 'Sister');
  const [collectiveActionTitle, setCollectiveActionTitle] = useState<string>('');
  const [collectiveActionDesc, setCollectiveActionDesc] = useState<string>('');
  const [collectiveAuthority, setCollectiveAuthority] = useState<string>('');

  // C. Share Experience Modal
  const [showShareExperienceModal, setShowShareExperienceModal] = useState<boolean>(false);
  const [expTitle, setExpTitle] = useState('');
  const [expStory, setExpStory] = useState('');
  const [expOutcome, setExpOutcome] = useState('');

  // D. Replying / Adding Solution State
  const [activeReplyingThreadId, setActiveReplyingThreadId] = useState<string | null>(null);
  const [newSolutionText, setNewSolutionText] = useState<string>('');
  const [isAnonymousSolution, setIsAnonymousSolution] = useState<boolean>(false);

  // E. Reporting & Blocking State (Requirement 3)
  const [reportingItemId, setReportingItemId] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState<string>('spam');
  const [reportFeedback, setReportFeedback] = useState<string | null>(null);
  const [blockedAuthors, setBlockedAuthors] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_blocked_authors');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const saveBlockedAuthors = (updated: string[]) => {
    setBlockedAuthors(updated);
    try {
      localStorage.setItem('sherise_blocked_authors', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Handle Browser Back (popstate)
  useEffect(() => {
    const handlePopState = () => {
      if (selectedCircleForDetail) {
        setSelectedCircleForDetail(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedCircleForDetail]);

  const handleOpenCircleDetail = (circle: ProblemCircle) => {
    setSelectedCircleForDetail(circle);
    setCircleSubTab('discussions');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    try {
      window.history.pushState({ circleId: circle.id }, '');
    } catch {
      // ignore
    }
  };

  const handleCloseCircleDetail = () => {
    setSelectedCircleForDetail(null);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  // District options
  const districtOptions = useMemo(() => {
    if (selectedRegion === 'puducherry') {
      return [
        { id: 'all', label: lang === 'ta' ? 'அனைத்து புதுச்சேரி பகுதிகள்' : 'All Puducherry UT Districts' },
        { id: 'Puducherry', label: 'Puducherry (புதுச்சேரி)' },
        { id: 'Karaikal', label: 'Karaikal (காரைக்கால்)' },
        { id: 'Mahe', label: 'Mahe (மாகே)' },
        { id: 'Yanam', label: 'Yanam (ஏனாம்)' },
      ];
    }
    if (selectedRegion === 'tamil_nadu') {
      return [
        { id: 'all', label: lang === 'ta' ? 'அனைத்து தமிழ்நாடு மாவட்டங்கள்' : 'All Tamil Nadu Districts' },
        { id: 'Chennai', label: 'Chennai (சென்னை)' },
        { id: 'Madurai', label: 'Madurai (மதுரை)' },
        { id: 'Coimbatore', label: 'Coimbatore (கோவை)' },
        { id: 'Salem', label: 'Salem (சேலம்)' },
        { id: 'Tiruchirappalli', label: 'Tiruchirappalli (திருச்சி)' },
        { id: 'Vellore', label: 'Vellore (வேலூர்)' },
      ];
    }
    return [
      { id: 'all', label: lang === 'ta' ? 'அனைத்து மாவட்டங்களும் (All)' : 'All Districts' },
      { id: 'Puducherry', label: 'Puducherry (புதுச்சேரி)' },
      { id: 'Karaikal', label: 'Karaikal (காரைக்கால்)' },
      { id: 'Chennai', label: 'Chennai (சென்னை)' },
      { id: 'Madurai', label: 'Madurai (மதுரை)' },
      { id: 'Coimbatore', label: 'Coimbatore (கோவை)' },
      { id: 'Salem', label: 'Salem (சேலம்)' },
      { id: 'Tiruchirappalli', label: 'Tiruchirappalli (திருச்சி)' },
      { id: 'Vellore', label: 'Vellore (வேலூர்)' },
    ];
  }, [selectedRegion, lang]);

  // Categories list (6 Core Categories)
  const problemCategories = [
    {
      id: 'all',
      label: lang === 'ta' ? 'அனைத்து பிரச்சனைகளும்' : lang === 'hi' ? 'सभी श्रेणियां' : 'All Problem Categories',
      icon: '✨'
    },
    {
      id: 'livelihood_wages',
      label: lang === 'ta' ? '✂️ வாழ்வாதாரம் & நியாய கூலி' : lang === 'hi' ? '✂️ आजीविका व उचित मजदूरी' : '✂️ Livelihood & Fair Wages',
      icon: '✂️'
    },
    {
      id: 'education_restart',
      label: lang === 'ta' ? '🎓 படிப்பு தொடங்குதல் (இரண்டாம் வாய்ப்பு)' : lang === 'hi' ? '🎓 अधूरी पढ़ाई पुनः शुरू करें' : '🎓 Education Restart',
      icon: '🎓'
    },
    {
      id: 'safety_rights',
      label: lang === 'ta' ? '⚖️ சட்ட பாதுகாப்பு & ஜீவனாம்சம்' : lang === 'hi' ? '⚖️ कानूनी अधिकार व सुरक्षा' : '⚖️ Safety & Legal Rights',
      icon: '⚖️'
    },
    {
      id: 'shg_collective',
      label: lang === 'ta' ? '🤝 மகளிர் குழு நேரடி கூட்டுறவு' : lang === 'hi' ? '🤝 स्वयं सहायता समूह सहकारिता' : '🤝 SHG Direct Collective',
      icon: '🤝'
    },
    {
      id: 'raw_material_sourcing',
      label: lang === 'ta' ? '📦 மொத்த மூலப்பொருள் கொள்முதல்' : lang === 'hi' ? '📦 थोक कच्चा माल खरीद' : '📦 Raw Material Sourcing',
      icon: '📦'
    },
    {
      id: 'health_childcare',
      label: lang === 'ta' ? '🩺 தாய்மை நலம் & குழந்தை பராமரிப்பு' : lang === 'hi' ? '🩺 मातृ स्वास्थ्य व शिशु देखभाल' : '🩺 Health & Childcare',
      icon: '🩺'
    },
  ];

  // Filtered circles
  const filteredCircles = useMemo(() => {
    let result = filterCirclesByLocationAndProblem(
      circles,
      selectedRegion,
      selectedDistrict,
      selectedCategory,
      searchQuery
    );
    if (showJoinedOnly) {
      result = result.filter((c) => joinedCircleIds.includes(c.id));
    }
    return result;
  }, [circles, selectedRegion, selectedDistrict, selectedCategory, searchQuery, showJoinedOnly, joinedCircleIds]);

  // Filtered threads for current circle detail
  const currentCircleThreads = useMemo(() => {
    if (!selectedCircleForDetail) return [];
    const raw = getThreadsForCircle(threads, selectedCircleForDetail.id, 'all', searchQuery);
    return raw.filter((t) => !blockedAuthors.includes(t.authorAlias));
  }, [threads, selectedCircleForDetail, searchQuery, blockedAuthors]);

  // Handlers
  const handleToggleJoin = (circleId: string) => {
    const next = toggleCircleMembership(joinedCircleIds, circleId);
    saveJoinedCircleIds(next);
    const isNowJoined = next.includes(circleId);

    // Update circle member count
    const updatedCircles = circles.map((c) => {
      if (c.id === circleId) {
        return {
          ...c,
          memberCount: isNowJoined ? c.memberCount + 1 : Math.max(1, c.memberCount - 1)
        };
      }
      return c;
    });
    saveCircles(updatedCircles);

    if (selectedCircleForDetail && selectedCircleForDetail.id === circleId) {
      setSelectedCircleForDetail({
        ...selectedCircleForDetail,
        memberCount: isNowJoined ? selectedCircleForDetail.memberCount + 1 : Math.max(1, selectedCircleForDetail.memberCount - 1)
      });
    }

    try {
      if (isNowJoined) {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
        showToast(lang === 'ta' ? 'தோழிகள் வட்டத்தில் இணைந்தீர்கள்!' : 'Joined Sisterhood Circle!');
      } else {
        showToast(lang === 'ta' ? 'வட்டத்திலிருந்து வெளியேறினீர்கள்' : 'Left Circle');
      }
    } catch {
      // ignore
    }
  };

  const handleUpvoteThread = (threadId: string) => {
    const updated = threads.map((t) => (t.id === threadId ? toggleThreadUpvote(t) : t));
    saveThreads(updated);
  };

  const handlePledgeAction = (threadId: string) => {
    const updated = threads.map((t) => {
      if (t.id === threadId) {
        const up = toggleActionPledge(t);
        if (up.collectiveAction?.hasUserPledged) {
          try {
            confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
          } catch {
            // ignore
          }
          showToast(lang === 'ta' ? 'கூட்டு நடவடிக்கைக்கு ஆதரவு தெரிவித்தீர்கள்!' : 'Pledged collective action support!');
        }
        return up;
      }
      return t;
    });
    saveThreads(updated);
  };

  const handleAddSolution = (threadId: string) => {
    if (!newSolutionText.trim()) return;
    const thread = threads.find((t) => t.id === threadId);
    if (!thread) return;

    const authorAlias = formatSafeAlias(
      customAuthorAlias || userProfile?.name || 'Sister',
      isAnonymousSolution,
      selectedCircleForDetail?.district
    );

    const updatedThread = addSolutionToThread(
      thread,
      newSolutionText.trim(),
      authorAlias,
      isAnonymousSolution
    );

    const updatedThreads = threads.map((t) => (t.id === threadId ? updatedThread : t));
    saveThreads(updatedThreads);
    setNewSolutionText('');
    setActiveReplyingThreadId(null);
    showToast(lang === 'ta' ? 'உங்கள் நடைமுறை தீர்வு சேர்க்கப்பட்டது!' : 'Your solution was added!');
  };

  const handleCreateNewThreadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCircleForDetail || !newProblemTitle.trim() || !newProblemDesc.trim()) return;

    const safeAlias = formatSafeAlias(
      customAuthorAlias || userProfile?.name || 'Sister',
      isAnonymousPost,
      selectedCircleForDetail.district
    );

    const newThread = createProblemThread(
      selectedCircleForDetail.id,
      newProblemTitle.trim(),
      newProblemDesc.trim(),
      selectedCircleForDetail.category,
      safeAlias,
      selectedCircleForDetail.district,
      isAnonymousPost,
      collectiveActionTitle.trim() || undefined,
      collectiveActionDesc.trim() || undefined,
      collectiveAuthority.trim() || undefined
    );

    const updated = [newThread, ...threads];
    saveThreads(updated);
    setShowNewProblemModal(false);
    setNewProblemTitle('');
    setNewProblemDesc('');
    setCollectiveActionTitle('');
    setCollectiveActionDesc('');
    setCollectiveAuthority('');

    try {
      confetti({ particleCount: 40, spread: 60 });
    } catch {
      // ignore
    }
    showToast(lang === 'ta' ? 'கேள்வி / பிரச்சனை பகிரப்பட்டது!' : 'Discussion question posted!');
  };

  const handleCreateCircleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCircleName.trim() || !newCircleDesc.trim() || !newCircleActiveProblem.trim()) return;

    const tagsArray = newCircleTags.split(',').map((t) => t.trim()).filter(Boolean);
    const newCircle = createNewSupportCircle(
      newCircleName,
      newCircleCategory,
      newCircleRegion,
      newCircleDistrict,
      newCircleDesc,
      newCircleActiveProblem,
      newCircleIsPrivate,
      tagsArray
    );

    const updatedCircles = [newCircle, ...circles];
    saveCircles(updatedCircles);

    // Auto join the creator
    const nextJoined = [...joinedCircleIds, newCircle.id];
    saveJoinedCircleIds(nextJoined);

    setShowCreateCircleModal(false);
    setSelectedCircleForDetail(newCircle);
    setCircleSubTab('discussions');

    try {
      confetti({ particleCount: 50, spread: 70 });
    } catch {
      // ignore
    }
    showToast(lang === 'ta' ? 'புதிய தோழிகள் வட்டம் வெற்றிகரமாக உருவாக்கப்பட்டது!' : 'New Support Circle Created!');
  };

  const handleShareExperienceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCircleForDetail || !expTitle.trim() || !expStory.trim()) return;

    const newExp: ProblemCircleExperience = {
      id: `exp-${Date.now()}`,
      authorAlias: customAuthorAlias || 'Sister',
      location: selectedCircleForDetail.district,
      title: expTitle.trim(),
      titleTa: expTitle.trim(),
      titleHi: expTitle.trim(),
      story: expStory.trim(),
      storyTa: expStory.trim(),
      storyHi: expStory.trim(),
      outcome: expOutcome.trim() || 'Successfully resolved through peer guidance',
      outcomeTa: expOutcome.trim() || 'தோழிகள் வழிகாட்டுதல் மூலம் வெற்றி பெற்றோம்',
      outcomeHi: expOutcome.trim() || 'सफलतापूर्वक समाधान हुआ',
      date: 'Just now'
    };

    const currentExps = selectedCircleForDetail.sharedExperiences || [];
    const updatedCircle: ProblemCircle = {
      ...selectedCircleForDetail,
      sharedExperiences: [newExp, ...currentExps],
      solvedCount: selectedCircleForDetail.solvedCount + 1
    };

    const updatedCircles = circles.map((c) => (c.id === selectedCircleForDetail.id ? updatedCircle : c));
    saveCircles(updatedCircles);
    setSelectedCircleForDetail(updatedCircle);
    setShowShareExperienceModal(false);
    setExpTitle('');
    setExpStory('');
    setExpOutcome('');

    try {
      confetti({ particleCount: 40, spread: 60 });
    } catch {
      // ignore
    }
    showToast(lang === 'ta' ? 'உங்கள் அனுபவம் பகிரப்பட்டது!' : 'Experience shared with sisters!');
  };

  const handleReportContent = (itemId: string) => {
    setReportingItemId(itemId);
  };

  const handleConfirmReport = () => {
    setReportFeedback(
      lang === 'ta'
        ? 'நன்றி தோழி! உங்கள் புகார் பதிவு செய்யப்பட்டது. மதிப்பாய்வு குழு 24 மணி நேரத்திற்குள் நடவடிக்கை எடுக்கும்.'
        : 'Thank you sister. Your report was recorded. Community moderators will review within 24 hours.'
    );
    setTimeout(() => {
      setReportingItemId(null);
      setReportFeedback(null);
    }, 2500);
  };

  const handleBlockAuthor = (alias: string) => {
    if (!blockedAuthors.includes(alias)) {
      const next = [...blockedAuthors, alias];
      saveBlockedAuthors(next);
      showToast(lang === 'ta' ? `பயனர் "${alias}" முடக்கப்பட்டுள்ளார்` : `Blocked user ${alias}`);
    }
  };

  const handleSpeakCircle = (circle: ProblemCircle) => {
    const text = `${circle.name}. ${circle.description}. ${lang === 'ta' ? 'தீர்வு காணும் பிரச்சனை:' : 'Current issue:'} ${circle.activeProblem}. ${circle.memberCount} ${lang === 'ta' ? 'தோழிகள் இணைந்துள்ளனர்' : 'sisters connected'}.`;
    speakText(text, lang);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-stone-700 animate-slideDown">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* VIEW A: CIRCLES DIRECTORY / DISCOVERY VIEW */}
      {!selectedCircleForDetail ? (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-purple-800 via-pink-700 to-rose-700 rounded-3xl p-6 sm:p-8 text-white shadow-md space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-semibold text-rose-50 mb-1">
              <Users className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'ta' ? 'தோழிகள் வட்டம் - கூட்டு பிரச்சனை தீர்வு தளம்' : lang === 'hi' ? 'सहेली समूह - समस्या निवारण एवं सहकारिता' : 'Sisterhood Circle - Community Problem Solving'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {lang === 'ta' ? 'தோழிகள் வட்டம் & ஆதரவு குழுக்கள்' : lang === 'hi' ? 'सहेली समूह एवं परस्पर सहयोग मंच' : 'Problem-Solving Support Circles'}
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 max-w-3xl leading-relaxed">
              {lang === 'ta'
                ? 'ஒரே மாதிரியான சவால்களை எதிர்கொண்ட தோழிகளுடன் இணையுங்கள். நியாயமான தையல் கூலி, படிப்பு மறுதொடக்கம், சட்ட உதவி, மற்றும் கூட்டு நடவடிக்கைகளில் ஒன்றிணையுங்கள்.'
                : lang === 'hi'
                ? 'समान समस्याओं का सामना कर चुकी अन्य महिलाओं से जुड़ें। अधूरी पढ़ाई, उचित सिलाई मजदूरी, कानूनी सहायता व सामूहिक योजना बनाएं।'
                : 'Connect with women who have faced the exact same challenges. Join topic-based support circles for fair piece-rates, second-chance education, legal maintenance, and collective action planning.'}
            </p>
          </div>

          {/* Privacy Notice (Requirement 3 Constraint) */}
          <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl flex items-start gap-3 text-xs text-amber-950">
            <Shield className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block">
                {lang === 'ta' ? 'தோழிகள் வட்ட தனியுரிமை & பாதுகாப்பு நெறிமுறை:' : 'Sisterhood Circles Privacy Notice:'}
              </span>
              <p className="text-[11px] text-amber-900 leading-relaxed">
                {lang === 'ta'
                  ? 'பரஸ்பர நம்பிக்கையை வளர்க்க உங்கள் புனைப்பெயர் (எ.கா. "Sister Kani") மற்றும் மாவட்டம் மட்டுமே தோழிகளுக்கு தெரியும். இணையத்தில் 100% பூரண பெயர் மறைப்பு என்பது சாத்தியமற்றது என்பதால், உங்கள் தனிப்பட்ட கடவுச்சொற்கள், OTP அல்லது வங்கி எண்களை எப்போதுமே பொது தளத்தில் பதிவிடாதீர்கள்.'
                  : 'To cultivate peer accountability and trust, your chosen alias and district are visible to members. Complete anonymity cannot be promised over standard web networks. Never post passwords, bank OTPs, or private phone numbers in public rooms.'}
              </p>
            </div>
          </div>

          {/* Filters, Search & "+ Create Circle" Action */}
          <div className="bg-white rounded-3xl border border-stone-200 p-4 sm:p-6 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              {/* Search Box */}
              <div className="flex-1 relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    lang === 'ta'
                      ? 'பிரச்சனைகள், தையல் கூலி, 12-ஆம் தேர்வு, சட்ட உதவி தேடுக...'
                      : 'Search problem topics, NIOS, fair piece-rate, legal aid...'
                  }
                  className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-2xl text-xs font-medium focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Location Selectors */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedRegion}
                  onChange={(e) => {
                    setSelectedRegion(e.target.value as any);
                    setSelectedDistrict('all');
                  }}
                  className="p-2.5 bg-stone-50 border border-stone-300 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">{lang === 'ta' ? 'அனைத்து பகுதிகள்' : 'All Regions'}</option>
                  <option value="puducherry">🌴 Puducherry UT</option>
                  <option value="tamil_nadu">🏛️ Tamil Nadu</option>
                </select>

                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="p-2.5 bg-stone-50 border border-stone-300 rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-purple-500"
                >
                  {districtOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                {/* Create Circle Button */}
                <button
                  type="button"
                  onClick={() => setShowCreateCircleModal(true)}
                  className="px-4 py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-2xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs shrink-0"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{lang === 'ta' ? '+ புதிய வட்டம் தொடங்கு' : '+ Create Support Circle'}</span>
                </button>
              </div>
            </div>

            {/* Problem Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
              {problemCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-purple-700 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Toggle Joined Only */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-100">
              <span className="text-stone-500 font-medium">
                {lang === 'ta' ? 'காண்பிக்கப்படும் ஆதரவு வட்டங்கள்:' : 'Displaying Circles:'} {filteredCircles.length}
              </span>
              <button
                type="button"
                onClick={() => setShowJoinedOnly(!showJoinedOnly)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition border ${
                  showJoinedOnly
                    ? 'bg-purple-50 border-purple-300 text-purple-900'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                {showJoinedOnly
                  ? lang === 'ta' ? '✓ நான் இணைந்தவை மட்டும்' : '✓ Showing Joined Circles Only'
                  : lang === 'ta' ? 'நான் இணைந்தவற்றை மட்டும் காட்டு' : 'Show My Joined Circles Only'}
              </button>
            </div>
          </div>

          {/* Circles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCircles.map((circle) => {
              const isJoined = joinedCircleIds.includes(circle.id);
              return (
                <div
                  key={circle.id}
                  className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-2xs hover:border-purple-300 hover:shadow-md transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Header: Title, Category, Region */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0 text-xl font-bold">
                          {circle.icon === 'GraduationCap' ? '🎓'
                            : circle.icon === 'Scissors' ? '✂️'
                            : circle.icon === 'Scale' ? '⚖️'
                            : circle.icon === 'Store' ? '🏪'
                            : circle.icon === 'Package' ? '📦'
                            : circle.icon === 'Shirt' ? '🧵'
                            : circle.icon === 'HeartHandshake' ? '🩺'
                            : circle.icon === 'Shield' ? '🛡️'
                            : '🤝'}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-200">
                              {circle.district}
                            </span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-stone-100 text-stone-600 rounded">
                              {circle.category.replace('_', ' ')}
                            </span>
                            {circle.isPrivate && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded flex items-center gap-0.5">
                                <Lock className="w-2.5 h-2.5" />
                                {lang === 'ta' ? 'ரகசிய குழு' : 'Confidential'}
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-sm sm:text-base text-stone-900 mt-1">
                            {lang === 'ta' ? circle.nameTa : lang === 'hi' ? circle.nameHi : circle.name}
                          </h3>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSpeakCircle(circle)}
                        className="p-1.5 text-stone-400 hover:text-purple-600 rounded-full shrink-0"
                        title="Listen"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                      {lang === 'ta' ? circle.descriptionTa : lang === 'hi' ? circle.descriptionHi : circle.description}
                    </p>

                    {/* Active Problem Highlight Callout Box */}
                    <div className="p-3 bg-purple-50/70 border border-purple-150 rounded-2xl text-xs space-y-1">
                      <div className="text-[10px] font-bold text-purple-900 uppercase tracking-wide flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 text-purple-700" />
                        <span>{lang === 'ta' ? 'தற்போது தீர்க்கப்படும் பிரச்சனை:' : 'Active Problem Being Tackled:'}</span>
                      </div>
                      <p className="text-purple-950 font-medium text-[11px] leading-relaxed">
                        {lang === 'ta' ? circle.activeProblemTa : lang === 'hi' ? circle.activeProblemHi : circle.activeProblem}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex items-center gap-1 flex-wrap">
                      {circle.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-medium px-2 py-0.5 bg-stone-100 text-stone-600 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Meta & Actions */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 text-xs text-stone-500">
                      <span className="flex items-center gap-1 font-semibold text-stone-700">
                        <Users className="w-3.5 h-3.5 text-purple-600" />
                        <span>{circle.memberCount} {lang === 'ta' ? 'தோழிகள்' : 'sisters'}</span>
                      </span>
                      <span className="flex items-center gap-1 text-emerald-700 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{circle.solvedCount} {lang === 'ta' ? 'தீர்வு' : 'solved'}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleJoin(circle.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                          isJoined
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                            : 'bg-stone-50 border-stone-300 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        {isJoined ? '✓ ' + (lang === 'ta' ? 'இணைந்துள்ளீர்கள்' : 'Joined') : '+ ' + (lang === 'ta' ? 'இணைய' : 'Join')}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenCircleDetail(circle)}
                        className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-xs"
                      >
                        <span>{lang === 'ta' ? 'உள்ளே செல்' : 'Enter Circle'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCircles.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-xl">
                🤝
              </div>
              <h3 className="font-bold text-stone-900 text-sm">
                {lang === 'ta' ? 'தேடலுக்கு பொருந்தும் வட்டங்கள் எதுவும் இல்லை' : 'No matching support circles found'}
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                {lang === 'ta'
                  ? 'உங்கள் பகுதியில் அல்லது பிரச்சனையில் புதிய ஆதரவு வட்டத்தை நீங்களே தொடங்கலாம்.'
                  : 'You can create a new support circle for your specific issue or neighborhood!'}
              </p>
              <button
                type="button"
                onClick={() => setShowCreateCircleModal(true)}
                className="px-4 py-2 bg-purple-700 text-white rounded-xl text-xs font-bold"
              >
                + {lang === 'ta' ? 'புதிய ஆதரவு வட்டம் தொடங்கு' : 'Create New Support Circle'}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* =========================================================================
            VIEW B: INSIDE A SELECTED SUPPORT CIRCLE (ROOM DETAIL VIEW)
           ========================================================================= */
        <div className="space-y-6">
          {/* Top Bar Navigation */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleCloseCircleDetail}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200 hover:bg-stone-50 rounded-xl text-xs font-bold text-stone-700 transition shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4 text-stone-500" />
              <span>{lang === 'ta' ? 'அனைத்து வட்டங்களுக்கு திரும்பு' : 'Back to Circles'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleToggleJoin(selectedCircleForDetail.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition border ${
                  joinedCircleIds.includes(selectedCircleForDetail.id)
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-purple-700 text-white hover:bg-purple-800'
                }`}
              >
                {joinedCircleIds.includes(selectedCircleForDetail.id)
                  ? '✓ ' + (lang === 'ta' ? 'உறுப்பினர்' : 'Joined Member')
                  : '+ ' + (lang === 'ta' ? 'வட்டத்தில் இணைய' : 'Join Circle')}
              </button>
            </div>
          </div>

          {/* Circle Banner */}
          <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-3xl p-6 text-white shadow-md space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-white/20 text-white border border-white/20">
                    {selectedCircleForDetail.district}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-800/80 text-purple-200">
                    {selectedCircleForDetail.category.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-purple-200 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-purple-300" />
                    <span>{selectedCircleForDetail.memberCount} sisters active</span>
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {lang === 'ta' ? selectedCircleForDetail.nameTa : lang === 'hi' ? selectedCircleForDetail.nameHi : selectedCircleForDetail.name}
                </h2>
                <p className="text-xs text-purple-200 max-w-2xl leading-relaxed">
                  {lang === 'ta' ? selectedCircleForDetail.descriptionTa : lang === 'hi' ? selectedCircleForDetail.descriptionHi : selectedCircleForDetail.description}
                </p>
              </div>
            </div>

            {/* Honest Privacy Notice inside Room */}
            <div className="p-3 bg-white/10 backdrop-blur-xs rounded-2xl border border-white/15 text-[11px] text-purple-100 flex items-start gap-2">
              <Lock className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {lang === 'ta'
                  ? 'பாதுகாப்பு குறிப்பு: உங்கள் புனைப்பெயர் மட்டுமே மற்ற தோழிகளுக்கு தெரியும். இணையத்தில் முழுமையான ரகசியத்தன்மை தொழில்நுட்ப ரீதியாக உறுதிப்படுத்தப்பட முடியாது என்பதால், தனிப்பட்ட ஆவணங்கள் அல்லது தொலைபேசி எண்களை பகிர்வதை தவிர்க்கவும்.'
                  : 'Circle Privacy Notice: In-app aliases are visible to members to foster peer trust. Never share passwords, bank OTPs, or private phone numbers in public rooms.'}
              </p>
            </div>
          </div>

          {/* 4 INTERACTIVE TABS (Requirement 3) */}
          <div className="bg-white rounded-3xl border border-stone-200 p-2 shadow-2xs flex items-center gap-1 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setCircleSubTab('discussions')}
              className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                circleSubTab === 'discussions'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>{lang === 'ta' ? 'கலந்துரையாடல் கூடம்' : 'Discussion Rooms'}</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full font-black">
                {currentCircleThreads.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setCircleSubTab('experiences')}
              className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                circleSubTab === 'experiences'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{lang === 'ta' ? 'பகிர்ந்த வெற்றிக் கதைகள்' : 'Shared Experiences'}</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full font-black">
                {(selectedCircleForDetail.sharedExperiences || []).length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setCircleSubTab('resources')}
              className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                circleSubTab === 'resources'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{lang === 'ta' ? 'உதவி மையங்கள் & ஆவணங்கள்' : 'Useful Resources'}</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full font-black">
                {(selectedCircleForDetail.resources || []).length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setCircleSubTab('actions')}
              className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                circleSubTab === 'actions'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Megaphone className="w-4 h-4" />
              <span>{lang === 'ta' ? 'கூட்டு நடவடிக்கைகள்' : 'Action Planning'}</span>
            </button>
          </div>

          {/* TAB 1: DISCUSSION ROOMS */}
          {circleSubTab === 'discussions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    {lang === 'ta' ? 'சகோதரிகளின் நேரடி சந்தேகங்கள் & பதில்கள்' : 'Peer Discussion Threads & Q&A'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {lang === 'ta' ? 'உங்கள் பிரச்சனையை கேட்கலாம் அல்லது தெரிந்த நடைமுறை தீர்வை பகிரலாம்.' : 'Ask specific questions or suggest verified step-by-step advice.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowNewProblemModal(true)}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs shrink-0"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>{lang === 'ta' ? 'கேள்வி / பிரச்சனை பகிர்' : 'Ask Question'}</span>
                </button>
              </div>

              {/* Threads List */}
              <div className="space-y-4">
                {currentCircleThreads.map((thread) => (
                  <div
                    key={thread.id}
                    className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-2xs space-y-4 hover:border-purple-200 transition"
                  >
                    {/* Thread Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs shrink-0">
                          {thread.authorAlias.charAt(0) || 'S'}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-stone-900">{thread.authorAlias}</span>
                            <span className="text-[10px] text-stone-400">• {thread.authorLocation}</span>
                          </div>
                          <span className="text-[10px] text-stone-400">{thread.timestamp}</span>
                        </div>
                      </div>

                      {/* Moderation Controls: Flag & Block (Requirement 3) */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleReportContent(thread.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg transition"
                          title="Report Inappropriate Content"
                        >
                          <Flag className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleBlockAuthor(thread.authorAlias)}
                          className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg transition"
                          title="Block User"
                        >
                          <UserX className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Question Content */}
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-stone-900 leading-snug">
                        {thread.problemTitle}
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-1 whitespace-pre-line">
                        {thread.problemDescription}
                      </p>
                    </div>

                    {/* Solutions List */}
                    <div className="space-y-3 pt-2 border-t border-stone-100">
                      <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>{lang === 'ta' ? 'பகிர்ந்த தீர்வுகள்' : 'Practical Solutions & Advice'} ({thread.solutions.length})</span>
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            setActiveReplyingThreadId(
                              activeReplyingThreadId === thread.id ? null : thread.id
                            )
                          }
                          className="text-xs font-bold text-rose-700 hover:text-rose-800 flex items-center gap-1"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          <span>{lang === 'ta' ? 'நடைமுறை தீர்வை எழுது' : 'Add Solution'}</span>
                        </button>
                      </div>

                      {thread.solutions.map((sol) => (
                        <div
                          key={sol.id}
                          className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-stone-900">{sol.authorAlias}</span>
                              {sol.isVerifiedByMentor && (
                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-full flex items-center gap-0.5">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                  <span>{lang === 'ta' ? 'சரிபார்க்கப்பட்ட தீர்வு' : 'Mentor Verified'}</span>
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-stone-400">{sol.timestamp}</span>
                          </div>
                          <p className="text-stone-700 leading-relaxed">{sol.solutionText}</p>
                        </div>
                      ))}

                      {/* Replying input form */}
                      {activeReplyingThreadId === thread.id && (
                        <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-2xl space-y-2 animate-fadeIn text-xs">
                          <span className="font-bold text-purple-950 block">
                            {lang === 'ta' ? 'உங்கள் நடைமுறை அனுபவ / வழிகாட்டுதல் தீர்வை பகிருங்கள்:' : 'Share your practical experience or advice:'}
                          </span>
                          <textarea
                            rows={3}
                            value={newSolutionText}
                            onChange={(e) => setNewSolutionText(e.target.value)}
                            placeholder="e.g. In our area, we submitted this form to the taluk office..."
                            className="w-full p-2.5 bg-white border border-purple-200 rounded-xl resize-none focus:ring-2 focus:ring-purple-500"
                          />
                          <div className="flex items-center justify-between">
                            <label className="flex items-center gap-1.5 text-[11px] text-stone-600 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={isAnonymousSolution}
                                onChange={(e) => setIsAnonymousSolution(e.target.checked)}
                                className="rounded text-purple-600"
                              />
                              <span>{lang === 'ta' ? 'பெயரை மறைத்து பதிவிடு' : 'Post anonymously'}</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => handleAddSolution(thread.id)}
                              className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl shadow-xs"
                            >
                              {lang === 'ta' ? 'தீர்வை சமர்ப்பி' : 'Submit Solution'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Upvote & Pledge Actions */}
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                      <button
                        type="button"
                        onClick={() => handleUpvoteThread(thread.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition ${
                          thread.isUpvoted
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        <Heart className="w-3.5 h-3.5" />
                        <span>{thread.upvotes} {lang === 'ta' ? 'ஆதரவு' : 'Upvotes'}</span>
                      </button>

                      <div className="text-[11px] text-stone-400">
                        {thread.solutions.length} {lang === 'ta' ? 'பதில்கள்' : 'responses'}
                      </div>
                    </div>
                  </div>
                ))}

                {currentCircleThreads.length === 0 && (
                  <div className="text-center py-10 bg-white rounded-3xl border border-stone-200 p-6 space-y-2">
                    <p className="text-xs text-stone-500">
                      {lang === 'ta' ? 'இந்த வட்டத்தில் இன்னும் விவாதங்கள் தொடங்கப்படவில்லை. உங்கள் கேள்வியை முதல் ஆளாக கேளுங்கள்!' : 'No questions posted yet in this circle. Be the first sister to ask for guidance!'}
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowNewProblemModal(true)}
                      className="px-4 py-2 bg-purple-700 text-white rounded-xl text-xs font-bold"
                    >
                      + {lang === 'ta' ? 'முதல் கேள்வியை பதிவிடு' : 'Ask First Question'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SHARED EXPERIENCES */}
          {circleSubTab === 'experiences' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    {lang === 'ta' ? 'சகோதரிகளின் உண்மையான வெற்றிக் கதைகள்' : 'Lived Stories & Overcoming Challenges'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {lang === 'ta' ? 'இதே பிரச்சனையை எதிர்கொண்டு வெற்றி பெற்ற உள்ளூர் பெண்களின் அனுபவங்கள்.' : 'Inspiring stories of sisters who solved this exact hurdle in your region.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowShareExperienceModal(true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs shrink-0"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>{lang === 'ta' ? 'உங்கள் கதையை பகிருங்கள்' : 'Share Experience'}</span>
                </button>
              </div>

              <div className="space-y-3">
                {(selectedCircleForDetail.sharedExperiences || []).map((exp) => (
                  <div
                    key={exp.id}
                    className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-2xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                          {exp.authorAlias.charAt(0) || 'S'}
                        </div>
                        <div>
                          <span className="font-bold text-xs text-stone-900">{exp.authorAlias}</span>
                          <span className="text-[10px] text-stone-400 ml-1.5">({exp.location})</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-stone-400">{exp.date}</span>
                    </div>

                    <h4 className="font-bold text-sm text-stone-900">
                      {lang === 'ta' ? exp.titleTa : lang === 'hi' ? exp.titleHi : exp.title}
                    </h4>

                    <p className="text-xs text-stone-600 leading-relaxed whitespace-pre-line">
                      {lang === 'ta' ? exp.storyTa : lang === 'hi' ? exp.storyHi : exp.story}
                    </p>

                    <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs space-y-1">
                      <span className="font-bold text-emerald-950 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{lang === 'ta' ? 'அடைந்த தீர்வு & பலன்:' : 'Outcome Achieved:'}</span>
                      </span>
                      <p className="text-emerald-900 font-medium">
                        {lang === 'ta' ? exp.outcomeTa : lang === 'hi' ? exp.outcomeHi : exp.outcome}
                      </p>
                    </div>
                  </div>
                ))}

                {(selectedCircleForDetail.sharedExperiences || []).length === 0 && (
                  <div className="text-center py-10 bg-white rounded-3xl border border-stone-200 p-6 space-y-2">
                    <p className="text-xs text-stone-500">
                      {lang === 'ta' ? 'இந்த வட்டத்தில் இன்னும் அனுபவ கதைகள் பகிரப்படவில்லை.' : 'No stories shared yet in this circle.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowShareExperienceModal(true)}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                    >
                      + {lang === 'ta' ? 'முதல் கதையை பகிருங்கள்' : 'Share First Story'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: USEFUL RESOURCES & APPLICATION GUIDANCE */}
          {circleSubTab === 'resources' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  {lang === 'ta' ? 'அதிகாரப்பூர்வ உதவி மையங்கள் & ஆவணங்கள்' : 'Actionable Official Resources & Centers'}
                </h3>
                <p className="text-xs text-stone-500">
                  {lang === 'ta'
                    ? 'இலவச சட்ட உதவி ஆணையம், அரசு உதவி எண்கள், மற்றும் விண்ணப்ப படிவ விபரங்கள்.'
                    : 'Direct government welfare desks, free legal aid helpline, and application guide contacts.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(selectedCircleForDetail.resources || []).map((res) => (
                  <div
                    key={res.id}
                    className="bg-white rounded-3xl border border-stone-200 p-5 shadow-2xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="p-2 bg-purple-50 text-purple-700 rounded-xl border border-purple-200">
                          {res.type === 'helpline' ? <PhoneCall className="w-4 h-4" />
                            : res.type === 'portal' ? <ExternalLink className="w-4 h-4" />
                            : res.type === 'office' ? <MapPin className="w-4 h-4" />
                            : <FileText className="w-4 h-4" />}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                          {res.type}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-stone-900">
                        {lang === 'ta' ? res.titleTa : lang === 'hi' ? res.titleHi : res.title}
                      </h4>

                      <div className="p-2.5 bg-stone-50 rounded-xl font-mono text-xs text-purple-900 font-bold border border-stone-150">
                        {res.contactOrLink}
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed">
                        {lang === 'ta' ? res.noteTa : lang === 'hi' ? res.noteHi : res.note}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="text-stone-400 text-[11px]">Verified Government Resource</span>
                      {res.type === 'helpline' ? (
                        <a
                          href={`tel:${res.contactOrLink.replace(/[^0-9]/g, '')}`}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-1"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Call</span>
                        </a>
                      ) : res.type === 'portal' ? (
                        <a
                          href={res.contactOrLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl flex items-center gap-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Visit</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}

                {(selectedCircleForDetail.resources || []).length === 0 && (
                  <div className="col-span-2 text-center py-8 text-xs text-stone-400">
                    {lang === 'ta' ? 'இந்த வட்டத்திற்கான அதிகாரப்பூர்வ ஆவணங்கள் சேர்க்கப்பட்டு வருகின்றன.' : 'Resources are currently being updated by coordinators.'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: COLLABORATIVE ACTION PLANNING (Requirement 3) */}
          {circleSubTab === 'actions' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  {lang === 'ta' ? 'கூட்டு நடவடிக்கைகள் & கோரிக்கைகள்' : 'Collaborative Action Planning & Campaigns'}
                </h3>
                <p className="text-xs text-stone-500">
                  {lang === 'ta'
                    ? 'பொதுவான பிரச்சனைகளுக்கு அதிகாரிகள் அல்லது ஒப்பந்தக்காரர்களிடம் ஒன்றுபட்டு குரல் கொடுக்க ஆதரவு தெரிவிக்கவும்.'
                    : 'Unite on common petitions, minimum wage charters, and group appeals to local authorities.'}
                </p>
              </div>

              {/* Action Campaigns from threads */}
              <div className="space-y-3">
                {currentCircleThreads
                  .filter((t) => t.collectiveAction)
                  .map((t) => {
                    const action = t.collectiveAction!;
                    return (
                      <div
                        key={t.id}
                        className="bg-white rounded-3xl border border-teal-200 p-5 sm:p-6 shadow-2xs space-y-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900 uppercase">
                              <Megaphone className="w-4 h-4 text-teal-700" />
                              <span>{lang === 'ta' ? 'தோழிகள் கூட்டு நடவடிக்கை இயக்கம்:' : 'Active Solidarity Campaign:'}</span>
                            </div>
                            <h4 className="text-base font-bold text-stone-900">{action.actionTitle}</h4>
                            <p className="text-xs text-stone-600 leading-relaxed">{action.actionDescription}</p>
                            <div className="text-xs text-teal-900 font-semibold pt-1">
                              <span>{lang === 'ta' ? 'மனு அளிக்கப்படும் அதிகாரி / துறை:' : 'Target Authority:'} </span>
                              <span className="underline font-bold">{action.targetAuthority}</span>
                            </div>
                          </div>

                          {/* Pledge Button */}
                          <div className="text-right shrink-0">
                            <div className="text-xs font-black text-teal-950 mb-1">
                              {action.pledgedCount} {lang === 'ta' ? 'தோழிகள் ஆதரவு' : 'Pledged'}
                            </div>
                            <button
                              type="button"
                              onClick={() => handlePledgeAction(t.id)}
                              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
                                action.hasUserPledged
                                  ? 'bg-teal-700 text-white'
                                  : 'bg-white text-teal-800 border border-teal-400 hover:bg-teal-50'
                              }`}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>{action.hasUserPledged ? 'Pledged!' : 'Pledge Support'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {currentCircleThreads.filter((t) => t.collectiveAction).length === 0 && (
                  <div className="text-center py-10 bg-white rounded-3xl border border-stone-200 p-6 space-y-2">
                    <p className="text-xs text-stone-500">
                      {lang === 'ta' ? 'இந்த வட்டத்தில் இன்னும் கூட்டு நடவடிக்கைகள் தொடங்கப்படவில்லை.' : 'No collective action plans proposed yet in this circle.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowNewProblemModal(true)}
                      className="px-4 py-2 bg-teal-700 text-white rounded-xl text-xs font-bold"
                    >
                      + {lang === 'ta' ? 'புதிய கூட்டு கோரிக்கையை தொடங்கு' : 'Propose Collective Action'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          MODAL A: CREATE NEW SUPPORT CIRCLE (Requirement 3)
         ========================================================================= */}
      {showCreateCircleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl p-6 sm:p-7 space-y-5 my-8 animate-scaleUp">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-purple-700 block">
                  {lang === 'ta' ? 'புதிய தோழிகள் வட்டம்' : 'New Sisterhood Support Circle'}
                </span>
                <h3 className="font-bold text-stone-900 text-base">
                  {lang === 'ta' ? 'ஆதரவு வட்டத்தை உருவாக்குங்கள்' : 'Create a Problem-Solving Circle'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateCircleModal(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCircleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {lang === 'ta' ? 'வட்டத்தின் பெயர் (Circle Name):' : 'Circle Name:'}
                </label>
                <input
                  type="text"
                  required
                  value={newCircleName}
                  onChange={(e) => setNewCircleName(e.target.value)}
                  placeholder="e.g. Madurai Tailoring Fair Piece-Rate Collective"
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-purple-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    {lang === 'ta' ? 'பிரச்சனை வகை:' : 'Problem Category:'}
                  </label>
                  <select
                    value={newCircleCategory}
                    onChange={(e) => setNewCircleCategory(e.target.value as CircleProblemCategory)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold"
                  >
                    <option value="livelihood_wages">{lang === 'ta' ? 'வாழ்வாதாரம் & நியாய கூலி' : 'Livelihood & Fair Wages'}</option>
                    <option value="education_restart">{lang === 'ta' ? 'படிப்பு தொடங்குதல்' : 'Education Restart'}</option>
                    <option value="safety_rights">{lang === 'ta' ? 'சட்ட பாதுகாப்பு & ஜீவனாம்சம்' : 'Safety & Legal Rights'}</option>
                    <option value="shg_collective">{lang === 'ta' ? 'மகளிர் குழு நேரடி கூட்டுறவு' : 'SHG Direct Collective'}</option>
                    <option value="raw_material_sourcing">{lang === 'ta' ? 'மொத்த மூலப்பொருள் கொள்முதல்' : 'Raw Material Sourcing'}</option>
                    <option value="health_childcare">{lang === 'ta' ? 'தாய்மை நலம் & குழந்தை பராமரிப்பு' : 'Health & Childcare'}</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    {lang === 'ta' ? 'மாவட்டம் / பகுதி:' : 'District / General Location:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newCircleDistrict}
                    onChange={(e) => setNewCircleDistrict(e.target.value)}
                    placeholder="e.g. Madurai, Puducherry, Karaikal"
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {lang === 'ta' ? 'வட்டத்தின் நோக்கம் & விளக்கம்:' : 'Circle Description & Purpose:'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={newCircleDesc}
                  onChange={(e) => setNewCircleDesc(e.target.value)}
                  placeholder="Explain why this support circle is being started and how sisters will help one another..."
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl resize-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {lang === 'ta' ? 'முதலில் தீர்க்கப்பட வேண்டிய முக்கிய பிரச்சனை:' : 'Active Problem Being Tackled First:'}
                </label>
                <input
                  type="text"
                  required
                  value={newCircleActiveProblem}
                  onChange={(e) => setNewCircleActiveProblem(e.target.value)}
                  placeholder="e.g. Middleman offering only ₹40 for uniform stitching; demanding standard ₹95"
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-stone-50 border border-stone-200 rounded-2xl">
                <div>
                  <span className="font-bold text-stone-900 block">{lang === 'ta' ? 'ரகசிய ஆதரவு குழுவா?' : 'Confidential / Private Circle?'}</span>
                  <span className="text-[11px] text-stone-500">
                    {newCircleIsPrivate
                      ? lang === 'ta' ? 'இணைவதற்கு அனுமதி கோர வேண்டும்' : 'Requires approval to join (for legal/sensitive domestic cases)'
                      : lang === 'ta' ? 'எல்லா சகோதரிகளும் சுதந்திரமாக இணையலாம்' : 'Open for any local sister to join'}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={newCircleIsPrivate}
                  onChange={(e) => setNewCircleIsPrivate(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateCircleModal(false)}
                  className="px-4 py-2 text-stone-600 font-semibold"
                >
                  {t.common.close}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl shadow-xs transition"
                >
                  {lang === 'ta' ? 'வட்டத்தை உருவாக்கு' : 'Create Circle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL B: ASK QUESTION / POST PROBLEM (WITH ACTION PLAN)
         ========================================================================= */}
      {showNewProblemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl p-6 sm:p-7 space-y-4 my-8 animate-scaleUp">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-rose-600 block">
                  {selectedCircleForDetail?.name}
                </span>
                <h3 className="font-bold text-stone-900 text-base">
                  {lang === 'ta' ? 'உங்கள் கேள்வி / பிரச்சனையை பதிவிடுங்கள்' : 'Post Question in Circle'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowNewProblemModal(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewThreadSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {lang === 'ta' ? 'கேள்வி / தலைப்பு:' : 'Question Title:'}
                </label>
                <input
                  type="text"
                  required
                  value={newProblemTitle}
                  onChange={(e) => setNewProblemTitle(e.target.value)}
                  placeholder="e.g. How to get admission in NIOS Puducherry while working?"
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {lang === 'ta' ? 'விளக்கம் (உங்கள் சூழ்நிலை):' : 'Detailed Situation & What Help You Need:'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={newProblemDesc}
                  onChange={(e) => setNewProblemDesc(e.target.value)}
                  placeholder="Describe your situation in detail so sisters who solved this can guide you..."
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl resize-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              {/* Author Alias & Privacy Setting */}
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <span className="font-bold text-stone-900 block">
                  {lang === 'ta' ? 'பதிவிடுபவர் பெயர் & தனியுரிமை:' : 'Author Name & Privacy:'}
                </span>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={customAuthorAlias}
                    onChange={(e) => setCustomAuthorAlias(e.target.value)}
                    placeholder="Display name or alias"
                    className="flex-1 p-2 bg-white border border-stone-300 rounded-xl text-xs"
                  />
                  <label className="flex items-center gap-1.5 text-[11px] text-stone-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymousPost}
                      onChange={(e) => setIsAnonymousPost(e.target.checked)}
                      className="rounded text-rose-600"
                    />
                    <span>{lang === 'ta' ? 'தோழி என காட்டு' : 'Anonymous'}</span>
                  </label>
                </div>
              </div>

              {/* Propose Optional Collective Action */}
              <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-teal-900 text-xs">
                  <Megaphone className="w-4 h-4 text-teal-700" />
                  <span>{lang === 'ta' ? 'கூட்டு நடவடிக்கை பிரச்சாரம் சேர்க்க (விருப்பமிருந்தால்):' : 'Propose Collective Action (Optional):'}</span>
                </div>
                <input
                  type="text"
                  value={collectiveActionTitle}
                  onChange={(e) => setCollectiveActionTitle(e.target.value)}
                  placeholder="Campaign Title (e.g. Petition to Collector for fair piece-rates)"
                  className="w-full p-2 bg-white border border-teal-200 rounded-xl text-xs"
                />
                <input
                  type="text"
                  value={collectiveAuthority}
                  onChange={(e) => setCollectiveAuthority(e.target.value)}
                  placeholder="Target Authority (e.g. District Collector / Education Directorate)"
                  className="w-full p-2 bg-white border border-teal-200 rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewProblemModal(false)}
                  className="px-4 py-2 text-stone-600 font-semibold"
                >
                  {t.common.close}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-xs transition"
                >
                  {lang === 'ta' ? 'பதிவிடு' : 'Post Discussion'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL C: SHARE EXPERIENCE MODAL
         ========================================================================= */}
      {showShareExperienceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl p-6 sm:p-7 space-y-4 my-8 animate-scaleUp">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-600 block">
                  {lang === 'ta' ? 'வெற்றிக் கதை' : 'Share Experience'}
                </span>
                <h3 className="font-bold text-stone-900 text-base">
                  {lang === 'ta' ? 'நீங்கள் வென்ற வழியை தோழிகளுடன் பகிருங்கள்' : 'Share How You Overcame This Hurdle'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowShareExperienceModal(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleShareExperienceSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {lang === 'ta' ? 'கதையின் தலைப்பு:' : 'Experience Title:'}
                </label>
                <input
                  type="text"
                  required
                  value={expTitle}
                  onChange={(e) => setExpTitle(e.target.value)}
                  placeholder="e.g. How I passed 12th standard at age 26 after 8-year gap"
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {lang === 'ta' ? 'உங்கள் பயணம் & என்ன செய்தீர்கள்:' : 'Your Story & What Action You Took:'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={expStory}
                  onChange={(e) => setExpStory(e.target.value)}
                  placeholder="Describe what challenge you faced and what practical steps helped you resolve it..."
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl resize-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {lang === 'ta' ? 'கிடைத்த முடிவு / வெற்றி:' : 'Outcome Achieved:'}
                </label>
                <input
                  type="text"
                  value={expOutcome}
                  onChange={(e) => setExpOutcome(e.target.value)}
                  placeholder="e.g. Scored 68% in NIOS; now studying B.Com distance degree"
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setShowShareExperienceModal(false)}
                  className="px-4 py-2 text-stone-600 font-semibold"
                >
                  {t.common.close}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition"
                >
                  {lang === 'ta' ? 'அனுபவத்தை சமர்ப்பி' : 'Publish Story'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL D: REPORTING MODAL (Requirement 3)
         ========================================================================= */}
      {reportingItemId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full border border-stone-200 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center gap-2 text-rose-700 font-bold">
              <Flag className="w-4 h-4" />
              <span>{lang === 'ta' ? 'பதிவு மீது புகாரளி' : 'Report Inappropriate Post'}</span>
            </div>

            {reportFeedback ? (
              <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl font-semibold">
                {reportFeedback}
              </div>
            ) : (
              <>
                <p className="text-stone-600">
                  {lang === 'ta'
                    ? 'தோழிகள் வட்டத்தின் கண்ணியத்தை காக்க தவறான அல்லது பாதுகாப்பற்ற பதிவுகளை உடனடியாக புகாரளிக்கலாம்.'
                    : 'Help protect the safety and dignity of the circle by reporting harmful content.'}
                </p>

                <div className="space-y-1.5">
                  {[
                    { id: 'spam', label: 'Spam or Commercial Sales / விளம்பரம்' },
                    { id: 'harassment', label: 'Harassment / அவதூறு' },
                    { id: 'private_leak', label: 'Sharing Private Phone or OTP / ரகசிய எண் கசிவு' },
                    { id: 'misleading', label: 'False or Dangerous Advice / தவறான தகவல்' },
                  ].map((opt) => (
                    <label key={opt.id} className="flex items-center gap-2 p-2 rounded-xl hover:bg-stone-50 cursor-pointer">
                      <input
                        type="radio"
                        name="report_reason"
                        value={opt.id}
                        checked={reportReason === opt.id}
                        onChange={(e) => setReportReason(e.target.value)}
                        className="text-rose-600"
                      />
                      <span className="text-stone-800 font-medium">{opt.label}</span>
                    </label>
                  ))}
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportingItemId(null)}
                    className="px-3 py-1.5 text-stone-600 font-bold"
                  >
                    {t.common.close}
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmReport}
                    className="px-4 py-2 bg-rose-600 text-white font-bold rounded-xl shadow-xs"
                  >
                    {lang === 'ta' ? 'புகாரை அனுப்பு' : 'Submit Report'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
