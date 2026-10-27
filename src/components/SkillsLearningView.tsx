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
  Volume2,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Lock,
  RotateCcw,
  Award,
  Video,
  MapPin,
  Calendar,
  Briefcase,
  Layers,
  FileCheck,
  Flag,
} from 'lucide-react';
import {
  CourseBooking,
  DisputeReport,
  Language,
  LearningCourse,
  SkillCertificate,
  UserProfile,
} from '../types';
import { learningCoursesData } from '../data/skillsLearningData';
import { translations } from '../data/translations';
import { speakText } from '../utils/speech';
import {
  calculateCommission,
  evaluateRefundEligibility,
  issueCertificate,
  verifyCertificateEligibility,
} from '../utils/learningBusinessLogic';
import { DemoUpiCheckoutModal } from './learning/DemoUpiCheckoutModal';
import { DisputeReportModal } from './learning/DisputeReportModal';
import { CertificateViewModal } from './learning/CertificateViewModal';
import { CareerPathwaysModal } from './learning/CareerPathwaysModal';
import { AdminModerationDrawer } from './learning/AdminModerationDrawer';
import { TeacherCourseCreateModal } from './learning/TeacherCourseCreateModal';

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
  const tL = t.skillsLearning;

  // Active perspective / mode
  const [activeTab, setActiveTab] = useState<
    'learn' | 'my-bookings' | 'teach' | 'certificates' | 'admin'
  >('learn');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');

  // Courses State (persistent in localStorage)
  const [courses, setCourses] = useState<LearningCourse[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_learning_courses');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return learningCoursesData;
  });

  useEffect(() => {
    try {
      localStorage.setItem('sherise_learning_courses', JSON.stringify(courses));
    } catch {
      // ignore
    }
  }, [courses]);

  // Bookings State (persistent)
  const [bookings, setBookings] = useState<CourseBooking[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_course_bookings');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'BK-78921',
        courseId: 'course-tailoring-basics',
        courseTitle: 'Beginner Tailoring: Measurements, Cutting & Blouse Stitching',
        learnerId: userProfile.id || 'DEMO-LEARNER',
        learnerName: userProfile.name || 'Empowered Sister',
        bookingDate: '2026-10-24',
        batchSchedule: 'Batch starts: Next Monday (10:30 AM - 11:30 AM)',
        classFormat: 'both',
        venueOrLink: 'Salem Women Community Center & Live Google Meet',
        status: 'confirmed',
        courseFee: 450,
        platformFee: 23,
        teacherEarnings: 427,
        paymentMethod: 'demo_upi',
        demoUpiTxnId: 'UPI-DEMO-SLM-928174',
        escrowStatus: 'held_in_escrow',
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('sherise_course_bookings', JSON.stringify(bookings));
    } catch {
      // ignore
    }
  }, [bookings]);

  // Disputes & Anti-Scam Reports (persistent)
  const [disputes, setDisputes] = useState<DisputeReport[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_course_disputes');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('sherise_course_disputes', JSON.stringify(disputes));
    } catch {
      // ignore
    }
  }, [disputes]);

  // Completed Lessons State
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_completed_lessons');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['t-les-1'];
  });

  useEffect(() => {
    try {
      localStorage.setItem('sherise_completed_lessons', JSON.stringify(completedLessonIds));
    } catch {
      // ignore
    }
  }, [completedLessonIds]);

  // Certificates State
  const [certificates, setCertificates] = useState<SkillCertificate[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_skill_certificates');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('sherise_skill_certificates', JSON.stringify(certificates));
    } catch {
      // ignore
    }
  }, [certificates]);

  // Practical Assignment Submissions State
  const [practicalSubmissions, setPracticalSubmissions] = useState<{ [courseId: string]: string }>(() => {
    try {
      const saved = localStorage.getItem('sherise_practical_submissions');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {};
  });

  useEffect(() => {
    try {
      localStorage.setItem('sherise_practical_submissions', JSON.stringify(practicalSubmissions));
    } catch {
      // ignore
    }
  }, [practicalSubmissions]);

  // Modals & Active Drawers
  const [checkoutCourse, setCheckoutCourse] = useState<LearningCourse | null>(null);
  const [disputeTarget, setDisputeTarget] = useState<{
    booking?: CourseBooking;
    course: LearningCourse;
  } | null>(null);
  const [viewingCertificate, setViewingCertificate] = useState<SkillCertificate | null>(null);
  const [careerCourse, setCareerCourse] = useState<LearningCourse | null>(null);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);

  // Active Course for Lesson Drawer
  const [activeCourse, setActiveCourse] = useState<LearningCourse | null>(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [practicalInput, setPracticalInput] = useState('');
  const [practicalSubmittedNotice, setPracticalSubmittedNotice] = useState(false);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 4000);
  };

  // Toggle Lesson Completion
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

  // Practical Assignment Submission
  const handleSubmitPractical = (courseId: string) => {
    if (!practicalInput.trim()) return;
    const updated = { ...practicalSubmissions, [courseId]: practicalInput.trim() };
    setPracticalSubmissions(updated);
    setPracticalSubmittedNotice(true);
    try {
      confetti({ particleCount: 40, spread: 60 });
    } catch {
      // ignore
    }
    setTimeout(() => setPracticalSubmittedNotice(false), 3500);
  };

  // Booking Confirmation handler
  const handleConfirmBooking = (newBooking: CourseBooking) => {
    setBookings([newBooking, ...bookings]);
    setCheckoutCourse(null);
    showToast(
      `Class booked successfully! Ref: ${newBooking.id} (Demo UPI ₹${newBooking.courseFee} held in Escrow).`
    );
    setActiveTab('my-bookings');
  };

  // Dispute Submission handler
  const handleSubmitDispute = (report: DisputeReport) => {
    setDisputes([report, ...disputes]);
    // update target booking if present
    if (report.bookingId) {
      setBookings(
        bookings.map((b) =>
          b.id === report.bookingId
            ? { ...b, status: 'disputed', disputeId: report.id }
            : b
        )
      );
    }
    showToast(`Anti-scam dispute ${report.id} lodged. Escrow funds frozen pending admin review.`);
  };

  // Teacher Course Creation handler
  const handleCreateCourse = (newCourse: LearningCourse) => {
    setCourses([newCourse, ...courses]);
    showToast(
      `Course "${newCourse.title}" created! Status: ${
        newCourse.approvalStatus === 'pending_approval'
          ? 'Pending Admin Approval (Anti-Scam Check)'
          : 'Published'
      }.`
    );
  };

  // Admin Actions
  const handleApproveCourse = (courseId: string) => {
    setCourses(
      courses.map((c) =>
        c.id === courseId ? { ...c, approvalStatus: 'approved' } : c
      )
    );
    showToast('Course approved & published to learner marketplace!');
  };

  const handleRejectCourse = (courseId: string, feedback: string) => {
    setCourses(
      courses.map((c) =>
        c.id === courseId
          ? { ...c, approvalStatus: 'rejected', approvalFeedback: feedback }
          : c
      )
    );
    showToast('Course rejected with revision notes.');
  };

  const handleResolveDispute = (
    disputeId: string,
    action: 'refund' | 'dismiss',
    notes: string
  ) => {
    const targetDisp = disputes.find((d) => d.id === disputeId);
    if (!targetDisp) return;

    if (action === 'refund') {
      // Release escrow refund to learner
      setBookings(
        bookings.map((b) =>
          b.id === targetDisp.bookingId
            ? {
                ...b,
                status: 'refunded',
                escrowStatus: 'refunded_to_learner',
                refundAmount: b.courseFee,
              }
            : b
        )
      );
      setDisputes(
        disputes.map((d) =>
          d.id === disputeId
            ? {
                ...d,
                status: 'refund_approved',
                adminResolutionNote: notes,
                resolvedAt: new Date().toLocaleDateString('en-IN'),
                refundIssued: true,
              }
            : d
        )
      );
      showToast('100% demo escrow refund approved and returned to learner.');
    } else {
      setDisputes(
        disputes.map((d) =>
          d.id === disputeId
            ? {
                ...d,
                status: 'dismissed',
                adminResolutionNote: notes,
                resolvedAt: new Date().toLocaleDateString('en-IN'),
              }
            : d
        )
      );
      if (targetDisp.bookingId) {
        setBookings(
          bookings.map((b) =>
            b.id === targetDisp.bookingId
              ? { ...b, status: 'confirmed', escrowStatus: 'held_in_escrow' }
              : b
          )
        );
      }
      showToast('Dispute resolved: complaint dismissed after verification.');
    }
  };

  // Request Compliant Cancellation & 100% Demo Refund by Learner
  const handleLearnerCancelBooking = (booking: CourseBooking) => {
    const evalRes = evaluateRefundEligibility(booking, false);
    if (!evalRes.eligible) {
      alert(evalRes.reason);
      return;
    }
    const confirmed = window.confirm(
      `Cancel your booking for "${booking.courseTitle}"? 100% Demo UPI payment of ₹${booking.courseFee} will be immediately refunded from Escrow.`
    );
    if (!confirmed) return;

    setBookings(
      bookings.map((b) =>
        b.id === booking.id
          ? {
              ...b,
              status: 'refunded',
              escrowStatus: 'refunded_to_learner',
              refundAmount: b.courseFee,
              cancellationReason: 'Learner cancelled prior to batch start under escrow policy.',
            }
          : b
      )
    );
    showToast(`Booking ${booking.id} cancelled. 100% Demo UPI refund issued.`);
  };

  // Issue Genuine Skill Certificate
  const handleClaimCertificate = (course: LearningCourse) => {
    const isQuizDone = true;
    const isPracticalDone = Boolean(practicalSubmissions[course.id]);
    const check = verifyCertificateEligibility(
      course,
      completedLessonIds,
      isQuizDone,
      isPracticalDone
    );

    if (!check.eligible) {
      alert(`Certificate requirements not yet satisfied:\n• ${check.pendingRequirements.join('\n• ')}`);
      return;
    }

    const newCert = issueCertificate(
      course,
      userProfile.id || 'DEMO-LEARNER',
      userProfile.name || 'Empowered Sister',
      practicalSubmissions[course.id]
    );

    setCertificates([newCert, ...certificates]);
    setViewingCertificate(newCert);
    try {
      confetti({ particleCount: 70, spread: 80 });
    } catch {
      // ignore
    }
    showToast(`Genuine Skill Certificate ${newCert.certificateId} awarded!`);
  };

  // Filtered Approved Courses for Learner Marketplace
  const marketplaceCourses = useMemo(() => {
    return courses.filter((c) => {
      // Public marketplace only shows approved courses
      if (c.approvalStatus !== 'approved') return false;
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
  }, [courses, selectedCategory, selectedLanguage, selectedFormat, searchQuery]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Toast Notification */}
      {notificationToast && (
        <div className="fixed top-20 right-4 z-50 max-w-sm p-4 bg-stone-900 text-white rounded-2xl shadow-2xl border border-stone-700 text-xs flex items-center gap-3 animate-fadeIn">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-semibold leading-relaxed">{notificationToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-800 to-cyan-800 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
            <span>SHERISE Learning & Earning Platform</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            {tL.title}
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
            {tL.sub}
          </p>

          {/* Quick Stats Badges */}
          <div className="flex flex-wrap items-center gap-2 mt-4 text-[11px] font-bold">
            <span className="px-3 py-1 rounded-full bg-emerald-700/80 border border-emerald-500/50 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Transparent 5% Platform Fee</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-teal-700/80 border border-teal-500/50 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-cyan-300" />
              <span>Anti-Scam Escrow Guarantee</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-700/80 border border-amber-500/50 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>Genuine Skill Certificates</span>
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs (Learner, My Classes, Teacher Studio, Certificates, Admin Moderation) */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('learn')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'learn'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{tL.learnTab}</span>
        </button>

        <button
          onClick={() => setActiveTab('my-bookings')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'my-bookings'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{tL.myBookingsTab}</span>
          <span className="ml-1 px-1.5 py-0.5 rounded-full bg-stone-100 text-stone-800 text-[10px]">
            {bookings.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('teach')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'teach'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>{tL.teachTab}</span>
        </button>

        <button
          onClick={() => setActiveTab('certificates')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'certificates'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>{tL.myCertificatesTab}</span>
          {certificates.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px]">
              {certificates.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('admin')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'admin'
              ? 'bg-purple-700 text-white shadow-xs'
              : 'bg-white border border-purple-200 text-purple-800 hover:bg-purple-50'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>{tL.adminModerationTab}</span>
          {disputes.filter((d) => d.status === 'under_investigation').length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px]">
              !
            </span>
          )}
        </button>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: LEARNER MARKETPLACE                                      */}
      {/* ============================================================== */}
      {activeTab === 'learn' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Search & Filter Bar */}
          <div className="bg-white rounded-3xl border border-stone-200 p-4 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={tL.searchPlaceholder}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Format Filter */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="font-bold text-stone-600 shrink-0">
                  {tL.filterFormat}
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
                  {tL.filterLanguage}
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
                { id: 'handicrafts', label: lang === 'ta' ? 'கைவினைப் பொருட்கள்' : lang === 'hi' ? 'हस्तशिल्प' : 'Handicrafts' },
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {marketplaceCourses.map((course) => {
              const commission = calculateCommission(course.fee);
              const completedCount = course.lessons.filter((l) =>
                completedLessonIds.includes(l.id)
              ).length;
              const isFullyCompleted = completedCount === course.lessons.length;
              const isEnrolled = bookings.some((b) => b.courseId === course.id && b.status !== 'refunded');

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Header Row: Duration, Verification Badge, Fee */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {lang === 'ta' ? course.durationTa : lang === 'hi' ? course.durationHi : course.duration}
                        </span>

                        {course.teacher?.verificationStatus === 'verified' && (
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>{tL.verifiedTeacherBadge}</span>
                          </span>
                        )}
                      </div>

                      {/* Fee Badge with 5% transparent indicator */}
                      <div className="text-right">
                        <span className="text-lg font-black text-stone-900">
                          ₹{course.fee}
                        </span>
                        <span className="block text-[10px] text-stone-400 font-semibold">
                          5% platform fee incl.
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-stone-900 leading-snug">
                      {lang === 'ta' ? course.titleTa : lang === 'hi' ? course.titleHi : course.title}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {lang === 'ta' ? course.descriptionTa : lang === 'hi' ? course.descriptionHi : course.description}
                    </p>

                    {/* Teacher Details & Batch Schedule */}
                    <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-stone-500">Teacher:</span>
                        <strong className="text-stone-800">{course.trainerName}</strong>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-stone-500 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-stone-400" />
                          <span>Batch:</span>
                        </span>
                        <span className="font-semibold text-stone-700">{course.batchSchedule}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-stone-500 flex items-center gap-1">
                          {course.format === 'online' ? (
                            <Video className="w-3.5 h-3.5 text-stone-400" />
                          ) : (
                            <MapPin className="w-3.5 h-3.5 text-stone-400" />
                          )}
                          <span>Format:</span>
                        </span>
                        <span className="font-semibold text-stone-700 capitalize">
                          {course.format === 'both' ? 'Online + In-Person' : course.format}
                        </span>
                      </div>
                    </div>

                    {/* Cancellation Policy Preview */}
                    <div className="p-2.5 bg-blue-50/50 rounded-xl border border-blue-200/70 text-[11px] text-blue-900 flex items-start gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Cancellation Policy: </strong>
                        <span>{course.cancellationPolicy}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenChatWithTrainer(course.trainerContactId)}
                        className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat</span>
                      </button>

                      <button
                        onClick={() => setCareerCourse(course)}
                        className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 ml-2"
                      >
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Careers</span>
                      </button>

                      <button
                        onClick={() => setDisputeTarget({ course })}
                        title="Report teacher or misleading course"
                        className="text-xs font-bold text-stone-400 hover:text-rose-600 flex items-center gap-1 ml-auto sm:ml-2"
                      >
                        <Flag className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveCourse(course);
                          setActiveLessonIndex(0);
                          setSelectedQuizOption(null);
                          setQuizSubmitted(false);
                          setPracticalInput(practicalSubmissions[course.id] || '');
                        }}
                        className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl transition"
                      >
                        {tL.startLessonBtn}
                      </button>

                      {isEnrolled ? (
                        <span className="px-3.5 py-2 bg-emerald-100 text-emerald-900 font-bold text-xs rounded-xl border border-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Enrolled</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => setCheckoutCourse(course)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
                        >
                          {tL.bookClassBtn}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Income disclaimer */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl text-[11px] text-stone-500 leading-relaxed">
            {tL.noGuaranteeNotice}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: MY BOOKINGS & SCHEDULE (ESCROW SAFEGUARD)               */}
      {/* ============================================================== */}
      {activeTab === 'my-bookings' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 sm:p-6 text-xs text-emerald-950 flex items-start gap-3">
            <Lock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-sm mb-0.5">
                SHERISE Escrow Protection Active:
              </strong>
              All course payments are held safely in escrow. If a teacher cancels, does not show up, or conducts an unsatisfactory session, you are protected by 100% demo refund rights.
            </div>
          </div>

          {bookings.length === 0 ? (
            <div className="p-10 text-center bg-white border border-stone-200 rounded-3xl">
              <Calendar className="w-12 h-12 text-stone-400 mx-auto mb-2" />
              <h3 className="text-base font-bold text-stone-800">
                No Booked Classes Yet
              </h3>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Discover courses in the marketplace and book with Demo UPI to test class reservation and escrow protection.
              </p>
              <button
                onClick={() => setActiveTab('learn')}
                className="mt-4 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Browse Marketplace Courses
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const targetCourse = courses.find((c) => c.id === booking.courseId) || courses[0];

                return (
                  <div
                    key={booking.id}
                    className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-2xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                            Booking: {booking.id}
                          </span>
                          <span
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                              booking.status === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : booking.status === 'refunded'
                                ? 'bg-stone-200 text-stone-700'
                                : booking.status === 'disputed'
                                ? 'bg-rose-100 text-rose-900 border border-rose-300'
                                : 'bg-blue-100 text-blue-900'
                            }`}
                          >
                            Status: {booking.status.toUpperCase()}
                          </span>
                          <span className="text-[10px] font-semibold text-stone-500">
                            Txn: {booking.demoUpiTxnId}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-stone-900">
                          {booking.courseTitle}
                        </h3>
                      </div>

                      <div className="text-right text-xs">
                        <span className="text-base font-black text-emerald-800">
                          ₹{booking.courseFee}
                        </span>
                        <span className="block text-[11px] text-stone-500 font-medium">
                          Escrow: {booking.escrowStatus.replace(/_/g, ' ')}
                        </span>
                      </div>
                    </div>

                    {/* Schedule & Venue Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
                      <div>
                        <span className="text-stone-500 text-[11px] block">SCHEDULE:</span>
                        <strong className="text-stone-800">{booking.batchSchedule}</strong>
                      </div>
                      <div>
                        <span className="text-stone-500 text-[11px] block">VENUE / ROOM:</span>
                        <strong className="text-stone-800">{booking.venueOrLink}</strong>
                      </div>
                    </div>

                    {/* Fee & Escrow Transparency Breakdown */}
                    <div className="text-[11px] text-stone-500 flex flex-wrap items-center gap-4 pt-1">
                      <span>Course Fee: ₹{booking.courseFee}</span>
                      <span>5% Platform Maintenance: ₹{booking.platformFee}</span>
                      <span>Teacher Take-Home Payout: ₹{booking.teacherEarnings}</span>
                    </div>

                    {/* Action Controls */}
                    <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => handleLearnerCancelBooking(booking)}
                            className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition"
                          >
                            Cancel Booking (Refund)
                          </button>
                        )}
                        <button
                          onClick={() => setDisputeTarget({ booking, course: targetCourse })}
                          className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl transition flex items-center gap-1"
                        >
                          <Flag className="w-3.5 h-3.5" />
                          <span>Report Scam / Issue</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setActiveCourse(targetCourse);
                            setActiveLessonIndex(0);
                            setSelectedQuizOption(null);
                            setQuizSubmitted(false);
                            setPracticalInput(practicalSubmissions[targetCourse.id] || '');
                          }}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
                        >
                          Open Lessons & Practical Work
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: TEACHER STUDIO (CREATE COURSES & EARNINGS)              */}
      {/* ============================================================== */}
      {activeTab === 'teach' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Teacher Profile Card */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold mb-2">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Verified Teacher Studio</span>
                </div>
                <h2 className="text-xl font-black text-stone-900">
                  {userProfile.name || 'Master Instructor'}
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Location: {userProfile.location || 'Tamil Nadu'} • Verified Skills: {userProfile.skills?.join(', ') || 'Tailoring, Cooking, Crafts'}
                </p>
              </div>

              <button
                onClick={() => setIsTeacherModalOpen(true)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create New Skill Course</span>
              </button>
            </div>

            {/* Teacher Earnings Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <span className="text-[11px] font-bold text-emerald-800 uppercase block">
                  ESTIMATED NET EARNINGS (95%)
                </span>
                <span className="text-2xl font-black text-emerald-950 mt-1 block">
                  ₹{bookings.reduce((sum, b) => sum + (b.status === 'confirmed' ? b.teacherEarnings : 0), 0)}
                </span>
                <span className="text-[10px] text-emerald-700">
                  After 5% platform escrow fee
                </span>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-[11px] font-bold text-stone-600 uppercase block">
                  ACTIVE ENROLLED LEARNERS
                </span>
                <span className="text-2xl font-black text-stone-900 mt-1 block">
                  {bookings.filter((b) => b.status === 'confirmed').length}
                </span>
                <span className="text-[10px] text-stone-500">
                  Students in upcoming batches
                </span>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-[11px] font-bold text-stone-600 uppercase block">
                  COURSES CREATED
                </span>
                <span className="text-2xl font-black text-stone-900 mt-1 block">
                  {courses.length}
                </span>
                <span className="text-[10px] text-stone-500">
                  {courses.filter((c) => c.approvalStatus === 'pending_approval').length} pending admin vetting
                </span>
              </div>
            </div>
          </div>

          {/* Teacher's Created Courses List */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-stone-900">
              Your Course Offerings & Status
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        course.approvalStatus === 'approved'
                          ? 'bg-emerald-100 text-emerald-900'
                          : course.approvalStatus === 'pending_approval'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-rose-100 text-rose-900'
                      }`}
                    >
                      {course.approvalStatus === 'approved'
                        ? 'Published in Marketplace'
                        : course.approvalStatus === 'pending_approval'
                        ? 'Pending Admin Vetting'
                        : 'Needs Revision'}
                    </span>
                    <span className="text-sm font-bold text-stone-900">₹{course.fee}</span>
                  </div>

                  <h4 className="text-sm font-bold text-stone-800">{course.title}</h4>
                  <p className="text-xs text-stone-500 line-clamp-2">{course.description}</p>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500">
                      Take-Home: <strong className="text-emerald-700">₹{course.fee - Math.round(course.fee * 0.05)}</strong>
                    </span>
                    <span className="text-stone-400 text-[11px]">
                      {course.lessons.length} Modules
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: GENUINE CERTIFICATES & CAREER READINESS                 */}
      {/* ============================================================== */}
      {activeTab === 'certificates' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Info Banner */}
          <div className="bg-amber-50 border border-amber-300 rounded-3xl p-5 sm:p-6 text-xs text-amber-950 flex items-start gap-3">
            <Award className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-sm mb-0.5">
                Authentic Skill Certification Standards:
              </strong>
              Certificates are NEVER awarded without verified completion. You must complete every lesson module, pass the practical quiz assessment, and submit your hands-on exercise before a tamper-resistant certificate is issued.
            </div>
          </div>

          {/* Certificates Earned */}
          {certificates.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-stone-900">
                Your Verifiable Certificates ({certificates.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                  <div
                    key={cert.certificateId}
                    className="bg-white rounded-3xl border border-amber-300 p-5 sm:p-6 shadow-sm space-y-4 relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-600" />
                        <span className="text-xs font-mono font-bold text-amber-900">
                          {cert.certificateId}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {cert.gradeScore}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-stone-900">{cert.courseTitle}</h4>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Issued to: <strong>{cert.learnerName}</strong> by <strong>{cert.teacherName}</strong>
                      </p>
                    </div>

                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                      <span className="text-[10px] text-stone-400 font-bold block">
                        VERIFICATION HASH
                      </span>
                      <span className="font-mono text-emerald-800 text-[11px] font-bold">
                        {cert.verificationHash}
                      </span>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] text-stone-400">{cert.issuedDate}</span>
                      <button
                        onClick={() => setViewingCertificate(cert)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
                      >
                        {tL.viewCertificateBtn}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-10 text-center bg-white border border-stone-200 rounded-3xl">
              <Award className="w-12 h-12 text-stone-300 mx-auto mb-2" />
              <h3 className="text-base font-bold text-stone-800">
                No Certificates Earned Yet
              </h3>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Complete all lesson modules and submit your practical work in an enrolled course to unlock your genuine skill certificate.
              </p>
            </div>
          )}

          {/* Quick Assessment & Certificate Claimer for Active Courses */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Assessment & Certification Progress</span>
            </h3>

            <div className="space-y-3">
              {courses.slice(0, 3).map((c) => {
                const completedCount = c.lessons.filter((l) =>
                  completedLessonIds.includes(l.id)
                ).length;
                const isAllLessonsDone = completedCount === c.lessons.length;
                const isPracticalDone = Boolean(practicalSubmissions[c.id]);
                const alreadyEarned = certificates.some((crt) => crt.courseId === c.id);

                return (
                  <div
                    key={c.id}
                    className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-stone-900">{c.title}</h4>
                      <p className="text-stone-500 text-[11px] mt-0.5">
                        Lessons: {completedCount}/{c.lessons.length} • Practical Task: {isPracticalDone ? 'Submitted ✓' : 'Pending'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {alreadyEarned ? (
                        <span className="px-3 py-1.5 bg-emerald-100 text-emerald-900 font-bold rounded-xl border border-emerald-300">
                          Certificate Issued ✓
                        </span>
                      ) : (
                        <button
                          onClick={() => handleClaimCertificate(c)}
                          disabled={!isAllLessonsDone || !isPracticalDone}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-300 text-white font-bold rounded-xl shadow-xs transition disabled:cursor-not-allowed"
                        >
                          Verify & Claim Certificate
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 5: ADMIN MODERATION & DISPUTES                             */}
      {/* ============================================================== */}
      {activeTab === 'admin' && (
        <AdminModerationDrawer
          courses={courses}
          bookings={bookings}
          disputes={disputes}
          lang={lang}
          onApproveCourse={handleApproveCourse}
          onRejectCourse={handleRejectCourse}
          onResolveDispute={handleResolveDispute}
        />
      )}

      {/* ============================================================== */}
      {/* LESSON DRAWER & PRACTICAL EXERCISE VIEWER                      */}
      {/* ============================================================== */}
      {activeCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-stone-200 shadow-2xl p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto space-y-5">
            <button
              onClick={() => setActiveCourse(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Course Title */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {lang === 'ta' ? activeCourse.durationTa : lang === 'hi' ? activeCourse.durationHi : activeCourse.duration}
                </span>
                <span className="text-[11px] font-bold text-stone-500">
                  Teacher: {activeCourse.trainerName}
                </span>
              </div>
              <h3 className="text-xl font-bold text-stone-900">
                {lang === 'ta' ? activeCourse.titleTa : lang === 'hi' ? activeCourse.titleHi : activeCourse.title}
              </h3>
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
                      ⏱ {currentLesson.durationMins} {tL.lessonDuration}
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
                        {isLessonDone ? tL.completedBadge : tL.completeLessonBtn}
                      </span>
                    </button>

                    <button
                      onClick={() => onOpenChatWithTrainer(activeCourse.trainerContactId)}
                      className="text-xs font-bold text-purple-700 hover:underline flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{tL.connectTrainerBtn}</span>
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Practical Assignment Submission Box for Certificate */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <h5 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Hands-on Practical Task for Certification:
                </h5>
              </div>

              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-700">
                <p className="font-medium">
                  {activeCourse.practicalProjectPrompt || 'Upload sample of your completed work or describe your practical trial.'}
                </p>
              </div>

              {practicalSubmittedNotice && (
                <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Practical assignment verified & saved!</span>
                </div>
              )}

              <div className="space-y-2">
                <textarea
                  rows={2}
                  value={practicalInput}
                  onChange={(e) => setPracticalInput(e.target.value)}
                  placeholder="Describe your practical exercise results, measurements, or paste photo summary..."
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                />
                <button
                  onClick={() => handleSubmitPractical(activeCourse.id)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold transition"
                >
                  Save Practical Exercise Submission
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODALS                                                         */}
      {/* ============================================================== */}
      {checkoutCourse && (
        <DemoUpiCheckoutModal
          isOpen={Boolean(checkoutCourse)}
          onClose={() => setCheckoutCourse(null)}
          course={checkoutCourse}
          lang={lang}
          userProfile={userProfile}
          existingTxnIds={bookings.map((b) => b.demoUpiTxnId)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {disputeTarget && (
        <DisputeReportModal
          isOpen={Boolean(disputeTarget)}
          onClose={() => setDisputeTarget(null)}
          booking={disputeTarget.booking}
          course={disputeTarget.course}
          lang={lang}
          onSubmitDispute={handleSubmitDispute}
        />
      )}

      {viewingCertificate && (
        <CertificateViewModal
          isOpen={Boolean(viewingCertificate)}
          onClose={() => setViewingCertificate(null)}
          certificate={viewingCertificate}
          lang={lang}
        />
      )}

      {careerCourse && (
        <CareerPathwaysModal
          isOpen={Boolean(careerCourse)}
          onClose={() => setCareerCourse(null)}
          course={careerCourse}
          lang={lang}
        />
      )}

      {isTeacherModalOpen && (
        <TeacherCourseCreateModal
          isOpen={isTeacherModalOpen}
          onClose={() => setIsTeacherModalOpen(false)}
          lang={lang}
          userProfile={userProfile}
          onCreateCourse={handleCreateCourse}
        />
      )}
    </div>
  );
};
