/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  AlertOctagon,
  ShieldAlert,
  X,
  FileText,
  Send,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import {
  CourseBooking,
  DisputeReason,
  DisputeReport,
  Language,
  LearningCourse,
} from '../../types';
import { translations } from '../../data/translations';

interface DisputeReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking?: CourseBooking | null;
  course: LearningCourse;
  lang: Language;
  onSubmitDispute: (report: DisputeReport) => void;
}

export const DisputeReportModal: React.FC<DisputeReportModalProps> = ({
  isOpen,
  onClose,
  booking,
  course,
  lang,
  onSubmitDispute,
}) => {
  if (!isOpen) return null;

  const t = translations[lang].skillsLearning;

  const [reason, setReason] = useState<DisputeReason>('class_cancelled_no_notice');
  const [description, setDescription] = useState('');
  const [evidenceNote, setEvidenceNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const disputeId = `DISP-${Math.floor(1000 + Math.random() * 9000)}`;

      const report: DisputeReport = {
        id: disputeId,
        bookingId: booking?.id,
        courseId: course.id,
        courseTitle: course.title,
        learnerId: booking?.learnerId || 'DEMO-LEARNER',
        learnerName: booking?.learnerName || 'Sister Learner',
        teacherId: course.teacher?.id || 'trn-demo',
        teacherName: course.trainerName,
        reason,
        description: description.trim(),
        evidenceNote: evidenceNote.trim() || 'Claim submitted with session attendance notes.',
        submittedAt: new Date().toLocaleString('en-IN'),
        status: 'under_investigation',
        refundAmount: booking?.courseFee || course.fee,
      };

      setIsSubmitting(false);
      onSubmitDispute(report);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl p-6 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-rose-100 text-rose-700 rounded-2xl">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              {t.disputeTitle}
            </h2>
            <p className="text-xs text-stone-500">
              SHERISE Anti-Scam Protection & Consumer Safety
            </p>
          </div>
        </div>

        {/* Escrow Freeze Notice */}
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 mb-4 text-xs text-rose-900 flex items-start gap-2.5">
          <Lock className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-rose-950 font-bold mb-0.5">
              Escrow Protection Triggered:
            </strong>
            Filing this complaint immediately freezes teacher settlement payout. The SHERISE Moderation Council investigates claims before any funds are released.
          </div>
        </div>

        {/* Target Details */}
        <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-xs mb-4 space-y-1">
          <div>
            <span className="text-stone-500">Course: </span>
            <strong className="text-stone-800">{course.title}</strong>
          </div>
          <div>
            <span className="text-stone-500">Reported Teacher: </span>
            <strong className="text-stone-800">{course.trainerName}</strong>
          </div>
          {booking && (
            <div>
              <span className="text-stone-500">Booking Ref: </span>
              <strong className="text-emerald-700">{booking.id} ({booking.demoUpiTxnId})</strong>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Select Primary Concern / Violation Reason:
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value as DisputeReason)}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-semibold"
            >
              <option value="class_cancelled_no_notice">
                Class Cancelled by Teacher without Prior Notice
              </option>
              <option value="fake_teacher">
                Fake Teacher / Unverified Credentials or Impersonation
              </option>
              <option value="misleading_curriculum">
                Misleading Syllabus / Incomplete Training Material
              </option>
              <option value="payment_issue">
                Payment Verification or Demo Settlement Dispute
              </option>
              <option value="poor_quality">
                Unsatisfactory Training Quality Not Matching Standards
              </option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Detailed Description of Issue:
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain what occurred, dates, and how the service conditions were violated..."
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Evidence / Supporting Notes:
            </label>
            <input
              type="text"
              value={evidenceNote}
              onChange={(e) => setEvidenceNote(e.target.value)}
              placeholder="e.g. Teacher did not provide video room link, message screenshots available"
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
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-xs flex items-center gap-1.5 disabled:opacity-60"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit to Admin Council'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
