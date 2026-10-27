/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  UserCheck,
  Search,
  Filter,
  Star,
  MapPin,
  Calendar,
  MessageCircle,
  CheckCircle2,
  BookOpen,
  CreditCard,
  ShieldCheck,
  Award,
  Sparkles,
} from 'lucide-react';
import {
  CourseBooking,
  Language,
  LearningCourse,
  TeacherProfile,
  UserProfile,
} from '../types';
import { translations } from '../data/translations';
import { DemoUpiCheckoutModal } from './learning/DemoUpiCheckoutModal';

interface FindTeachersViewProps {
  lang: Language;
  userProfile: UserProfile;
  courses: LearningCourse[];
  bookings: CourseBooking[];
  onOpenChatWithTeacher: (contactId: string) => void;
  onBookCourse: (booking: CourseBooking) => void;
  onNavigateToCourse: (courseId: string) => void;
}

export const FindTeachersView: React.FC<FindTeachersViewProps> = ({
  lang,
  userProfile,
  courses,
  bookings,
  onOpenChatWithTeacher,
  onBookCourse,
  onNavigateToCourse,
}) => {
  const t = translations[lang];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [selectedTeacherForBooking, setSelectedTeacherForBooking] = useState<LearningCourse | null>(null);

  // Extract all distinct teachers from courses
  const teachersList = useMemo(() => {
    const list: { teacher: TeacherProfile; course: LearningCourse }[] = [];
    courses.forEach((c) => {
      if (c.teacher) {
        list.push({ teacher: c.teacher, course: c });
      } else {
        // Fallback profile if teacher profile was not embedded
        list.push({
          teacher: {
            id: c.trainerContactId,
            name: c.trainerName,
            bio: c.description,
            experienceYears: 8,
            skills: [c.category.toUpperCase()],
            location: 'Tamil Nadu & Puducherry',
            verificationStatus: 'verified',
            verificationBadge: 'skill_master',
            rating: 4.9,
            reviewCount: 42,
            totalEarningsEst: 28000,
            phoneShared: true,
          },
          course: c,
        });
      }
    });
    return list;
  }, [courses]);

  // Filtered teachers
  const filteredTeachers = useMemo(() => {
    return teachersList.filter(({ teacher, course }) => {
      if (onlyVerified && teacher.verificationStatus !== 'verified') return false;
      if (selectedSkill !== 'all' && course.category !== selectedSkill) return false;
      if (selectedLocation !== 'all' && !teacher.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          teacher.name.toLowerCase().includes(q) ||
          teacher.skills.some((s) => s.toLowerCase().includes(q)) ||
          teacher.location.toLowerCase().includes(q) ||
          course.title.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [teachersList, selectedSkill, selectedLocation, onlyVerified, searchQuery]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-800 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2">
            <UserCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>
              {lang === 'ta'
                ? 'சரிபார்க்கப்பட்ட சகோதரி ஆசிரியைகள்'
                : lang === 'hi'
                ? 'सत्यापित महिला शिक्षिकाएं'
                : 'Verified Women Teachers Directory'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            {lang === 'ta'
              ? 'திறமையான ஆசிரியைகளிடம் நேரடி பயிற்சி'
              : lang === 'hi'
              ? 'कुशल शिक्षिकाओं से सीधा प्रशिक्षण प्राप्त करें'
              : 'Learn Practical Trades from Verified Women Teachers'}
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
            {lang === 'ta'
              ? 'அரசு சான்றிதழ் பெற்ற முதன்மை தையல் ஆசிரியைகள், பாரம்பரிய உணவு கலைஞர்கள் மற்றும் கணினி ஆலோசகர்களிடம் ஆன்லைன் அல்லது நேரடி வகுப்புகள் பதிவு செய்யுங்கள்.'
              : lang === 'hi'
              ? 'सरकारी प्रमाणित मास्टर टेलर, पारंपरिक भोजन विशेषज्ञ और डिजिटल मार्गदर्शकों से जुड़ें। 100% एस्क्रो सुरक्षा के साथ सुरक्षित डेमो यूपीआई बुकिंग।'
              : 'Browse verified local mentors in tailoring, traditional spices, computer skills, and handicrafts. Direct booking with 10% platform fee and escrow protection.'}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-stone-200 p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ta' ? 'ஆசிரியை பெயர், தையல், சமையல், ஊர்...' : 'Search teacher by name, skill, or district...'}
              className="w-full pl-9 pr-3 py-2 text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Skill Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-bold text-stone-600 shrink-0">Skill:</span>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="p-1.5 bg-stone-50 border border-stone-200 rounded-lg font-semibold"
            >
              <option value="all">All Skills</option>
              <option value="tailoring">Tailoring & Blouses</option>
              <option value="cooking">Cooking & Food Business</option>
              <option value="digital">Computer & Smartphone</option>
              <option value="handicrafts">Handicrafts & Jute</option>
            </select>
          </div>

          {/* Location Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-bold text-stone-600 shrink-0">District:</span>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="p-1.5 bg-stone-50 border border-stone-200 rounded-lg font-semibold"
            >
              <option value="all">All Districts</option>
              <option value="Salem">Salem</option>
              <option value="Madurai">Madurai</option>
              <option value="Chennai">Chennai</option>
              <option value="Puducherry">Puducherry</option>
            </select>
          </div>

          {/* Only Verified Badge Toggle */}
          <button
            onClick={() => setOnlyVerified(!onlyVerified)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              onlyVerified
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Only</span>
          </button>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTeachers.map(({ teacher, course }) => {
          const isEnrolled = bookings.some((b) => b.courseId === course.id && b.status !== 'refunded');

          return (
            <div
              key={teacher.id}
              className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header: Teacher Avatar, Rating, and Verification Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold flex items-center justify-center text-lg shadow-xs">
                      {teacher.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900 leading-snug">
                        {teacher.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>{teacher.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>{teacher.rating || 4.9}</span>
                    </div>
                    <span className="block text-[10px] text-stone-400 mt-0.5">
                      ({teacher.reviewCount || 40} reviews)
                    </span>
                  </div>
                </div>

                {/* Verification Badge */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>
                      {teacher.verificationBadge === 'government_certified'
                        ? 'Govt Certified Master'
                        : 'Verified Skill Master'}
                    </span>
                  </span>
                  <span className="text-[11px] text-stone-500">
                    {teacher.experienceYears}+ yrs exp
                  </span>
                </div>

                {/* Teacher Bio */}
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {lang === 'ta' && teacher.bioTa ? teacher.bioTa : teacher.bio}
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {teacher.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Offering Course Card */}
                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-1">
                  <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">
                    CURRENT BATCH OFFERING:
                  </span>
                  <h4 className="font-bold text-stone-800 line-clamp-1">{course.title}</h4>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-emerald-800 font-extrabold text-sm">
                      ₹{course.fee} <span className="text-[10px] text-stone-400 font-normal">(10% platform fee incl.)</span>
                    </span>
                    <span className="text-[11px] text-stone-500 font-semibold">
                      {course.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenChatWithTeacher(course.trainerContactId)}
                  className="px-3.5 py-2 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs font-bold transition flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat</span>
                </button>

                {isEnrolled ? (
                  <button
                    onClick={() => onNavigateToCourse(course.id)}
                    className="px-4 py-2 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>View Class</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedTeacherForBooking(course)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Book Class (₹{course.fee})</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Checkout Modal */}
      {selectedTeacherForBooking && (
        <DemoUpiCheckoutModal
          isOpen={Boolean(selectedTeacherForBooking)}
          onClose={() => setSelectedTeacherForBooking(null)}
          course={selectedTeacherForBooking}
          lang={lang}
          userProfile={userProfile}
          existingTxnIds={bookings.map((b) => b.demoUpiTxnId)}
          onConfirmBooking={(b) => {
            onBookCourse(b);
            setSelectedTeacherForBooking(null);
          }}
        />
      )}
    </div>
  );
};
