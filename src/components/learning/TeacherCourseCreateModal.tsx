/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BookOpen,
  PlusCircle,
  X,
  ShieldCheck,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  CourseClassFormat,
  Language,
  LearningCourse,
  UserProfile,
} from '../../types';
import {
  calculateCommission,
  requiresAdminApproval,
  validateCourseSubmission,
} from '../../utils/learningBusinessLogic';

interface TeacherCourseCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  userProfile: UserProfile;
  onCreateCourse: (course: LearningCourse) => void;
}

export const TeacherCourseCreateModal: React.FC<TeacherCourseCreateModalProps> = ({
  isOpen,
  onClose,
  lang,
  userProfile,
  onCreateCourse,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<any>('tailoring');
  const [format, setFormat] = useState<CourseClassFormat>('both');
  const [fee, setFee] = useState<number>(400);
  const [duration, setDuration] = useState('2 Weeks (1 hr/day)');
  const [batchSchedule, setBatchSchedule] = useState('Batch starts: Next Monday (10:00 AM)');
  const [venueOrLink, setVenueOrLink] = useState(
    'Community Skill Center & Google Meet Demo Link'
  );
  const [cancellationPolicy, setCancellationPolicy] = useState(
    '100% full refund if cancelled up to 24 hours prior to batch start date.'
  );
  const [practicalProjectPrompt, setPracticalProjectPrompt] = useState(
    'Submit sample completed work or garment photo for skill verification.'
  );
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const commission = calculateCommission(fee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCourse: LearningCourse = {
      id: `course-${Date.now()}`,
      title: title.trim(),
      titleTa: title.trim(),
      titleHi: title.trim(),
      category,
      level: 'beginner',
      format,
      languages: ['ta', 'en', 'hi'],
      duration,
      durationTa: duration,
      durationHi: duration,
      description: description.trim() || 'Practical vocational training conducted by a verified community mentor.',
      descriptionTa: description.trim() || 'அனுபவம் வாய்ந்த தோழியால் நடத்தப்படும் செயல்முறை பயிற்சி.',
      descriptionHi: description.trim() || 'अनुभवी शिक्षिका द्वारा संचालित व्यावहारिक हुनर प्रशिक्षण।',
      trainerName: userProfile.name || 'Community Master Trainer',
      trainerContactId: 'contact-trainer-1',
      earningConnection: 'Gain hands-on skills to start small home-based client orders or supplies.',
      earningConnectionTa: 'வீட்டிலிருந்தே ஆர்டர்கள் எடுத்து சுயதொழில் தொடங்கும் வாய்ப்பு.',
      earningConnectionHi: 'घर से आर्डर लेकर स्वरोजगार शुरू करने का सीधा अवसर।',
      fee,
      approvalStatus: requiresAdminApproval(fee) ? 'pending_approval' : 'approved',
      availableSeats: 10,
      maxSeats: 15,
      batchSchedule,
      venueOrLink,
      cancellationPolicy,
      practicalProjectPrompt,
      teacher: {
        id: `trn-${Date.now()}`,
        name: userProfile.name || 'Community Master Trainer',
        bio: `Specialist trainer in ${category}. Dedicated to rural women empowerment.`,
        experienceYears: 6,
        skills: [category.toUpperCase(), 'Practical Guidance'],
        location: userProfile.location || 'Tamil Nadu',
        verificationStatus: 'verified',
        verificationBadge: 'skill_master',
        rating: 5.0,
        reviewCount: 1,
        totalEarningsEst: 0,
        phoneShared: true,
      },
      lessons: [
        {
          id: `les-${Date.now()}-1`,
          title: 'Module 1: Foundation & Material Setup',
          titleTa: 'பாடம் 1: அடிப்படை தயாரிப்புகள்',
          titleHi: 'पाठ 1: बुनियादी सामग्री एवं तैयारी',
          durationMins: 30,
          summary: 'Introduction to standard raw materials, tools, and safety practices.',
          summaryTa: 'பொருட்கள் தேர்வு மற்றும் பாதுகாப்பு முறைகள்.',
          summaryHi: 'सामग्री चयन और सुरक्षा मानक।',
          steps: [
            {
              stepNumber: 1,
              text: 'Inspect raw materials for hygiene and durability.',
              textTa: 'பொருட்களின் தரத்தை சரிபார்க்கவும்.',
              textHi: 'सामग्री की गुणवत्ता जांचें।'
            },
          ],
        },
      ],
    };

    const validation = validateCourseSubmission(newCourse);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    onCreateCourse(newCourse);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-stone-200 shadow-2xl p-6 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-emerald-100 text-emerald-800 rounded-2xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              Create a Skill Course (Teacher Studio)
            </h2>
            <p className="text-xs text-stone-500">
              Conduct online or in-person batches for women learners
            </p>
          </div>
        </div>

        {/* Mandatory Admin Approval Notice */}
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3 mb-4 text-xs text-amber-900 flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold mb-0.5">Vetting Protocol:</strong>
            Paid courses (fee &gt; ₹0) are sent to the SHERISE Admin Approval Queue before being published to protect learners from scams.
          </div>
        </div>

        {errors.length > 0 && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl mb-4 text-xs text-rose-800 space-y-1">
            <strong className="block font-bold">Please correct the following:</strong>
            <ul className="list-disc pl-4 space-y-0.5">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Course Title:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Traditional Aari Embroidery & Zari Work"
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Category:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium"
              >
                <option value="tailoring">Tailoring & Embroidery</option>
                <option value="cooking">Cooking & Food Business</option>
                <option value="handicrafts">Handicrafts & Jute</option>
                <option value="digital">Computer & Digital Literacy</option>
                <option value="beauty">Beauty & Wellness</option>
                <option value="bookkeeping">Bookkeeping & Finance</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Class Format:
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as CourseClassFormat)}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium"
              >
                <option value="both">Both (Online + In-Person)</option>
                <option value="online">Online (Video Meet)</option>
                <option value="in_person">In-Person (Center)</option>
              </select>
            </div>
          </div>

          {/* Pricing & 5% Platform Commission Calculation */}
          <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-stone-800">
                Course Tuition Fee (₹):
              </label>
              <input
                type="number"
                min={0}
                max={10000}
                value={fee}
                onChange={(e) => setFee(Number(e.target.value))}
                className="w-28 p-1.5 bg-white border border-stone-300 rounded-lg text-right font-bold text-stone-900"
              />
            </div>

            <div className="pt-2 border-t border-stone-200 text-[11px] space-y-1">
              <div className="flex justify-between text-stone-600">
                <span>SHERISE Platform Fee (5%):</span>
                <span className="font-semibold text-emerald-700">₹{commission.platformFee}</span>
              </div>
              <div className="flex justify-between font-bold text-stone-900 text-xs">
                <span>Your Estimated Take-Home (95%):</span>
                <span className="text-emerald-700">₹{commission.teacherEarnings}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Duration & Frequency:
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 2 Weeks (1 hr/day)"
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Batch Schedule:
              </label>
              <input
                type="text"
                value={batchSchedule}
                onChange={(e) => setBatchSchedule(e.target.value)}
                placeholder="e.g. Starting next Monday 10 AM"
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Venue Location / Online Link Details:
            </label>
            <input
              type="text"
              value={venueOrLink}
              onChange={(e) => setVenueOrLink(e.target.value)}
              placeholder="e.g. Madurai SHG Hall or Google Meet"
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Course Description & Syllabus Highlights:
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain practical skills students will master..."
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Cancellation & Refund Policy:
            </label>
            <input
              type="text"
              value={cancellationPolicy}
              onChange={(e) => setCancellationPolicy(e.target.value)}
              placeholder="e.g. 100% refund up to 24h before batch"
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Practical Assignment Required for Certificate:
            </label>
            <input
              type="text"
              value={practicalProjectPrompt}
              onChange={(e) => setPracticalProjectPrompt(e.target.value)}
              placeholder="e.g. Stitch a neckline piping sample on test cloth"
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-stone-300 text-stone-700 rounded-xl font-bold hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-xs flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Course for Verification</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
