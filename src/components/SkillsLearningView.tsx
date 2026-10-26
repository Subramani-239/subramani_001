/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  UserCheck,
  MessageCircle,
  HelpCircle,
  ChevronRight,
  TrendingUp,
  X,
  PlusCircle,
  Volume2
} from 'lucide-react';
import { Language, LearningCourse, UserProfile } from '../types';
import { learningCoursesData } from '../data/skillsLearningData';
import { translations } from '../data/translations';
import { speakText } from '../utils/speech';

interface SkillsLearningViewProps {
  lang: Language;
  userProfile: UserProfile;
  onOpenChatWithTrainer: (trainerContactId: string) => void;
}

export const SkillsLearningView: React.FC<SkillsLearningViewProps> = ({
  lang,
  userProfile,
  onOpenChatWithTrainer,
}) => {
  const t = translations[lang];

  const [activeMode, setActiveMode] = useState<'learn' | 'teach'>('learn');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');

  // Completed Lessons State in localStorage
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_completed_lessons');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['t-les-1'];
  });

  // Selected Course for Lesson Drawer
  const [activeCourse, setActiveCourse] = useState<LearningCourse | null>(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Teach a skill registration form
  const [teachName, setTeachName] = useState(userProfile.name || '');
  const [teachSkills, setTeachSkills] = useState(userProfile.teachingSkills?.join(', ') || 'Blouse Tailoring, Saree Kuchu');
  const [teachLocation, setTeachLocation] = useState(userProfile.location || 'Dharmapuri');
  const [teachMode, setTeachMode] = useState<'in_person' | 'online' | 'both'>('in_person');
  const [registeredTrainers, setRegisteredTrainers] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_registered_trainers');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'trn-1',
        name: 'Muthulakshmi R.',
        skills: 'Aari Embroidery & Saree Tassel Work',
        location: 'Madurai (In-Person & WhatsApp)',
        studentsTrained: 14,
      },
    ];
  });
  const [trainerSavedNotice, setTrainerSavedNotice] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('sherise_completed_lessons', JSON.stringify(completedLessonIds));
    } catch {
      // ignore
    }
  }, [completedLessonIds]);

  const handleToggleLessonComplete = (lessonId: string) => {
    const isCompleted = completedLessonIds.includes(lessonId);
    let updated: string[];
    if (isCompleted) {
      updated = completedLessonIds.filter((id) => id !== lessonId);
    } else {
      updated = [...completedLessonIds, lessonId];
      try {
        confetti({ particleCount: 30, spread: 50 });
      } catch {
        // ignore
      }
    }
    setCompletedLessonIds(updated);
  };

  const handleRegisterTrainer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teachName.trim() || !teachSkills.trim()) return;

    const newTrainer = {
      id: `trn-${Date.now()}`,
      name: teachName.trim(),
      skills: teachSkills.trim(),
      location: teachLocation.trim(),
      mode: teachMode,
      studentsTrained: 0,
    };

    const updated = [newTrainer, ...registeredTrainers];
    setRegisteredTrainers(updated);
    try {
      localStorage.setItem('sherise_registered_trainers', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setTrainerSavedNotice(true);
    setTimeout(() => setTrainerSavedNotice(false), 3500);

    try {
      confetti({ particleCount: 40, spread: 60 });
    } catch {
      // ignore
    }
  };

  const filteredCourses = useMemo(() => {
    return learningCoursesData.filter((c) => {
      if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
      if (selectedLanguage !== 'all' && !c.languages.includes(selectedLanguage as any)) return false;
      if (selectedFormat !== 'all' && c.format !== selectedFormat && c.format !== 'both') return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          c.title.toLowerCase().includes(q) ||
          c.titleTa.toLowerCase().includes(q) ||
          c.titleHi.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, selectedLanguage, selectedFormat, searchQuery]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-cyan-700 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
            <span>{lang === 'ta' ? 'அதிகாரமளிக்கும் பயிற்சிகள்' : 'Skill Empowerment Courses'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            {t.skillsLearning.title}
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
            {t.skillsLearning.sub}
          </p>
        </div>
      </div>

      {/* Mode Switcher: Learn a Skill vs Teach a Skill */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveMode('learn')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition ${
            activeMode === 'learn'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{t.skillsLearning.learnTab}</span>
        </button>

        <button
          onClick={() => setActiveMode('teach')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition ${
            activeMode === 'teach'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>{t.skillsLearning.teachTab}</span>
        </button>
      </div>

      {/* Tab 1: Learn a Skill */}
      {activeMode === 'learn' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Search & Filter Bar */}
          <div className="bg-white rounded-3xl border border-stone-200 p-4 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.skillsLearning.searchPlaceholder}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Format Filter */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="font-bold text-stone-600 shrink-0">
                  {t.skillsLearning.filterFormat}
                </span>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="p-1.5 bg-stone-50 border border-stone-200 rounded-lg font-semibold"
                >
                  <option value="all">All Formats</option>
                  <option value="in_person">In-Person</option>
                  <option value="online">Online</option>
                </select>
              </div>

              {/* Language Filter */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="font-bold text-stone-600 shrink-0">
                  {t.skillsLearning.filterLanguage}
                </span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="p-1.5 bg-stone-50 border border-stone-200 rounded-lg font-semibold"
                >
                  <option value="all">All Languages</option>
                  <option value="ta">தமிழ் (Tamil)</option>
                  <option value="en">English</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                </select>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
              {[
                { id: 'all', label: t.common.all },
                { id: 'tailoring', label: lang === 'ta' ? 'தையல் கலை' : lang === 'hi' ? 'सिलाई' : 'Tailoring' },
                { id: 'cooking', label: lang === 'ta' ? 'பாரம்பரிய சமையல்' : lang === 'hi' ? 'खाना बनाना' : 'Cooking' },
                { id: 'digital', label: lang === 'ta' ? 'ஸ்மார்ட்போன் அறிவு' : lang === 'hi' ? 'डिजिटल ज्ञान' : 'Digital' },
              ].map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded-full font-bold transition whitespace-nowrap ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Courses List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCourses.map((course) => {
              const completedCount = course.lessons.filter((l) =>
                completedLessonIds.includes(l.id)
              ).length;
              const isFullyCompleted = completedCount === course.lessons.length;

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {lang === 'ta' ? course.durationTa : lang === 'hi' ? course.durationHi : course.duration}
                      </span>

                      {isFullyCompleted ? (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{t.skillsLearning.completedBadge}</span>
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-stone-500">
                          {completedCount}/{course.lessons.length} {t.skillsLearning.lessonsTitle.split(' ')[0]}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-stone-900 leading-snug mb-1">
                      {lang === 'ta' ? course.titleTa : lang === 'hi' ? course.titleHi : course.title}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed mb-3">
                      {lang === 'ta' ? course.descriptionTa : lang === 'hi' ? course.descriptionHi : course.description}
                    </p>

                    {/* Earning Opportunity Connection */}
                    <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
                      <span className="text-[11px] font-bold text-emerald-950 flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{t.skillsLearning.earningLinkTitle}</span>
                      </span>
                      <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                        {lang === 'ta' ? course.earningConnectionTa : lang === 'hi' ? course.earningConnectionHi : course.earningConnection}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <button
                      onClick={() => onOpenChatWithTrainer(course.trainerContactId)}
                      className="flex items-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-900"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{t.skillsLearning.connectTrainerBtn}</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveCourse(course);
                        setActiveLessonIndex(0);
                        setSelectedQuizOption(null);
                        setQuizSubmitted(false);
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
                    >
                      {t.skillsLearning.startLessonBtn}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Income disclaimer */}
          <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-[11px] text-stone-500">
            {t.skillsLearning.noGuaranteeNotice}
          </div>
        </div>
      )}

      {/* Tab 2: Teach a Skill (Trainer Registration & Community Trainers) */}
      {activeMode === 'teach' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Trainer Registration Card */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-2xs space-y-5">
            <div>
              <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-600" />
                <span>{t.skillsLearning.teachTitle}</span>
              </h2>
              <p className="text-xs text-stone-500 mt-1 max-w-2xl leading-relaxed">
                {t.skillsLearning.teachDesc}
              </p>
            </div>

            {trainerSavedNotice && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-2xl text-xs font-bold text-emerald-950 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>{t.skillsLearning.teachRegisteredSuccess}</span>
              </div>
            )}

            <form onSubmit={handleRegisterTrainer} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    {t.skillsLearning.teachFormName}
                  </label>
                  <input
                    type="text"
                    required
                    value={teachName}
                    onChange={(e) => setTeachName(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    {t.skillsLearning.teachFormLocation}
                  </label>
                  <input
                    type="text"
                    required
                    value={teachLocation}
                    onChange={(e) => setTeachLocation(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {t.skillsLearning.teachFormSkills} (e.g. Tailoring, Traditional Masala, Jute bags)
                </label>
                <input
                  type="text"
                  required
                  value={teachSkills}
                  onChange={(e) => setTeachSkills(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div className="pt-2 text-right">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs"
                >
                  {t.skillsLearning.teachFormSubmit}
                </button>
              </div>
            </form>
          </div>

          {/* Registered Community Trainers Directory */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-stone-900">
              {lang === 'ta' ? 'கிராமப்புற சகோதரி ஆசிரியர்கள்' : 'Community Women Trainers'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {registeredTrainers.map((tr) => (
                <div
                  key={tr.id}
                  className="bg-white rounded-2xl border border-stone-200 p-4 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-xs text-stone-900">{tr.name}</h4>
                    <p className="text-xs text-emerald-700 font-semibold">{tr.skills}</p>
                    <p className="text-[11px] text-stone-500">{tr.location}</p>
                  </div>

                  <button
                    onClick={() => onOpenChatWithTrainer('contact-trainer-1')}
                    className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-800 rounded-xl text-xs font-bold"
                  >
                    {lang === 'ta' ? 'தொடர்பு கொள்க' : 'Request Lesson'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Lesson Drawer Modal */}
      {activeCourse && (
        <div
          role="dialog"
          aria-label="Course Lessons"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 mb-1 inline-block">
                  {lang === 'ta' ? activeCourse.durationTa : lang === 'hi' ? activeCourse.durationHi : activeCourse.duration}
                </span>
                <h3 className="text-lg font-bold text-stone-900 leading-snug">
                  {lang === 'ta' ? activeCourse.titleTa : lang === 'hi' ? activeCourse.titleHi : activeCourse.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveCourse(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lesson Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
              {activeCourse.lessons.map((lesson, idx) => {
                const isLessonDone = completedLessonIds.includes(lesson.id);
                const isCurrent = activeLessonIndex === idx;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setActiveLessonIndex(idx);
                      setSelectedQuizOption(null);
                      setQuizSubmitted(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                      isCurrent
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : isLessonDone
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    <span>Lesson {idx + 1}</span>
                    {isLessonDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                );
              })}
            </div>

            {/* Current Lesson Content */}
            {(() => {
              const currentLesson = activeCourse.lessons[activeLessonIndex];
              const isLessonDone = completedLessonIds.includes(currentLesson.id);

              return (
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-base font-bold text-stone-900">
                      {lang === 'ta'
                        ? currentLesson.titleTa
                        : lang === 'hi'
                        ? currentLesson.titleHi
                        : currentLesson.title}
                    </h4>

                    <span className="text-xs font-bold text-stone-500 shrink-0">
                      ⏱ {currentLesson.durationMins} {t.skillsLearning.lessonDuration}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3 rounded-2xl">
                    {lang === 'ta'
                      ? currentLesson.summaryTa
                      : lang === 'hi'
                      ? currentLesson.summaryHi
                      : currentLesson.summary}
                  </p>

                  {/* Step by Step Checklist */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-stone-800">
                      {lang === 'ta' ? 'செயல்முறை படிகள்:' : 'Practical Steps:'}
                    </h5>
                    <div className="space-y-2">
                      {currentLesson.steps.map((st) => (
                        <div
                          key={st.stepNumber}
                          className="p-3 bg-stone-50/70 border border-stone-200 rounded-xl text-xs flex items-start gap-2.5"
                        >
                          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            {st.stepNumber}
                          </span>
                          <span className="text-stone-800 leading-relaxed">
                            {lang === 'ta' ? st.textTa : lang === 'hi' ? st.textHi : st.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quiz question if present */}
                  {currentLesson.quizQuestion && (
                    <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl space-y-3">
                      <span className="text-xs font-bold text-purple-950 block">
                        📝 {lang === 'ta' ? 'அறிவு பரிசோதனை (Quiz):' : 'Knowledge Check:'}
                      </span>
                      <p className="text-xs font-semibold text-purple-900">
                        {lang === 'ta'
                          ? currentLesson.quizQuestion.questionTa
                          : lang === 'hi'
                          ? currentLesson.quizQuestion.questionHi
                          : currentLesson.quizQuestion.question}
                      </p>

                      <div className="space-y-1.5 text-xs">
                        {(lang === 'ta'
                          ? currentLesson.quizQuestion.optionsTa
                          : lang === 'hi'
                          ? currentLesson.quizQuestion.optionsHi
                          : currentLesson.quizQuestion.options
                        ).map((opt, optIdx) => {
                          const isPicked = selectedQuizOption === optIdx;
                          const isCorrect = optIdx === currentLesson.quizQuestion?.correctIndex;
                          return (
                            <button
                              key={optIdx}
                              onClick={() => {
                                setSelectedQuizOption(optIdx);
                                setQuizSubmitted(true);
                              }}
                              className={`w-full p-2.5 rounded-xl border text-left transition ${
                                isPicked
                                  ? isCorrect
                                    ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold'
                                    : 'bg-red-100 border-red-400 text-red-950'
                                  : 'bg-white border-purple-200 hover:bg-purple-100/50'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <p className="text-[11px] font-medium text-purple-900 bg-white p-2.5 rounded-xl border border-purple-200">
                          {lang === 'ta'
                            ? currentLesson.quizQuestion.explanationTa
                            : lang === 'hi'
                            ? currentLesson.quizQuestion.explanationHi
                            : currentLesson.quizQuestion.explanation}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Mark as complete toggle */}
                  <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                    <button
                      onClick={() => handleToggleLessonComplete(currentLesson.id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition ${
                        isLessonDone
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>
                        {isLessonDone ? t.skillsLearning.completedBadge : t.skillsLearning.completeLessonBtn}
                      </span>
                    </button>

                    <button
                      onClick={() => onOpenChatWithTrainer(activeCourse.trainerContactId)}
                      className="text-xs font-bold text-purple-700 hover:underline flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{t.skillsLearning.connectTrainerBtn}</span>
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
