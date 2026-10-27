/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileCheck,
  RotateCcw,
  UserCheck,
  Search,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  CourseApprovalStatus,
  CourseBooking,
  DisputeReport,
  Language,
  LearningCourse,
} from '../../types';

interface AdminModerationDrawerProps {
  courses: LearningCourse[];
  bookings: CourseBooking[];
  disputes: DisputeReport[];
  lang: Language;
  onApproveCourse: (courseId: string) => void;
  onRejectCourse: (courseId: string, feedback: string) => void;
  onResolveDispute: (disputeId: string, action: 'refund' | 'dismiss', notes: string) => void;
}

export const AdminModerationDrawer: React.FC<AdminModerationDrawerProps> = ({
  courses,
  bookings,
  disputes,
  lang,
  onApproveCourse,
  onRejectCourse,
  onResolveDispute,
}) => {
  const [activeTab, setActiveTab] = useState<'approvals' | 'disputes'>('approvals');
  const [rejectFeedback, setRejectFeedback] = useState<{ [key: string]: string }>({});
  const [resolutionNotes, setResolutionNotes] = useState<{ [key: string]: string }>({});

  const pendingCourses = courses.filter((c) => c.approvalStatus === 'pending_approval');
  const activeDisputes = disputes.filter((d) => d.status === 'under_investigation');

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-900 rounded-full text-xs font-bold mb-1">
            <ShieldAlert className="w-3.5 h-3.5 text-purple-700" />
            <span>SHERISE Trust & Safety Council</span>
          </div>
          <h2 className="text-xl font-black text-stone-900">
            Admin Moderation & Anti-Scam Resolution
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Require admin vetting before paid courses publish; arbitrate learner disputes & release escrow refunds.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('approvals')}
            className={`px-4 py-2 rounded-xl transition ${
              activeTab === 'approvals'
                ? 'bg-white text-purple-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Pending Courses ({pendingCourses.length})
          </button>
          <button
            onClick={() => setActiveTab('disputes')}
            className={`px-4 py-2 rounded-xl transition ${
              activeTab === 'disputes'
                ? 'bg-white text-rose-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Disputes & Complaints ({activeDisputes.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Course Approvals Queue */}
      {activeTab === 'approvals' && (
        <div className="space-y-4">
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900 flex items-start gap-2">
            <FileCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold mb-0.5">Anti-Scam Quality Standard:</strong>
              All paid courses must have clear lesson modules, a reasonable fee, and a transparent cancellation policy before they can appear in the public learner marketplace.
            </div>
          </div>

          {pendingCourses.length === 0 ? (
            <div className="p-8 text-center bg-stone-50 border border-dashed border-stone-300 rounded-3xl">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-stone-800">
                All Course Submissions Reviewed
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                There are currently no teacher courses pending admin approval. Create one in Teacher Studio to test the approval queue.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingCourses.map((c) => (
                <div
                  key={c.id}
                  className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 uppercase">
                        Pending Admin Review
                      </span>
                      <h3 className="text-base font-bold text-stone-900 mt-1">
                        {c.title}
                      </h3>
                      <p className="text-xs text-stone-500">
                        Teacher: <strong className="text-stone-800">{c.trainerName}</strong> • Fee: <strong className="text-emerald-700">₹{c.fee}</strong> • Lessons: {c.lessons.length}
                      </p>
                    </div>

                    <div className="text-right text-xs">
                      <span className="font-bold text-stone-700">Platform 5% Fee: ₹{Math.round(c.fee * 0.05)}</span>
                      <span className="block text-emerald-700 font-bold">Teacher Take-Home: ₹{c.fee - Math.round(c.fee * 0.05)}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 bg-white p-3 rounded-xl border border-stone-200">
                    {c.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 bg-white rounded-xl border border-stone-200">
                      <span className="text-[10px] text-stone-400 font-bold block">CANCELLATION POLICY</span>
                      <span className="text-stone-800 font-medium">{c.cancellationPolicy}</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-stone-200">
                      <span className="text-[10px] text-stone-400 font-bold block">PRACTICAL ASSIGNMENT</span>
                      <span className="text-stone-800 font-medium">{c.practicalProjectPrompt || 'Standard hands-on review'}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 border-t border-stone-200">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Optional rejection or revision notes..."
                        value={rejectFeedback[c.id] || ''}
                        onChange={(e) =>
                          setRejectFeedback({ ...rejectFeedback, [c.id]: e.target.value })
                        }
                        className="w-full text-xs p-2 bg-white border border-stone-300 rounded-xl"
                      />
                    </div>
                    <button
                      onClick={() =>
                        onRejectCourse(
                          c.id,
                          rejectFeedback[c.id] || 'Please provide more details on lesson materials.'
                        )
                      }
                      className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5 text-stone-600" />
                      <span>Reject with Notes</span>
                    </button>
                    <button
                      onClick={() => onApproveCourse(c.id)}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Publish to Marketplace</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Disputes & Complaints */}
      {activeTab === 'disputes' && (
        <div className="space-y-4">
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-900 flex items-start gap-2">
            <Lock className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold mb-0.5">Escrow Dispute Protection:</strong>
              Neither the platform nor the teacher receives payout until active learner claims are resolved fairly. If a teacher failed to deliver classes, approve the 100% refund immediately.
            </div>
          </div>

          {activeDisputes.length === 0 ? (
            <div className="p-8 text-center bg-stone-50 border border-dashed border-stone-300 rounded-3xl">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-stone-800">
                Zero Active Disputes
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                No learners have open disputes or complaint flags.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeDisputes.map((disp) => (
                <div
                  key={disp.id}
                  className="bg-stone-50 border border-rose-200 rounded-2xl p-5 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-900 uppercase">
                        Case: {disp.id}
                      </span>
                      <h3 className="text-base font-bold text-stone-900 mt-1">
                        {disp.courseTitle}
                      </h3>
                      <p className="text-xs text-stone-500">
                        Complainant: <strong className="text-stone-800">{disp.learnerName}</strong> • Teacher: <strong className="text-stone-800">{disp.teacherName}</strong>
                      </p>
                    </div>

                    <div className="text-right text-xs">
                      <span className="font-bold text-rose-700 block">
                        Held in Escrow: ₹{disp.refundAmount || 0}
                      </span>
                      <span className="text-stone-400 text-[11px]">{disp.submittedAt}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-stone-200 text-xs space-y-1">
                    <span className="text-[10px] font-bold text-rose-700 uppercase">
                      REASON: {disp.reason.replace(/_/g, ' ')}
                    </span>
                    <p className="text-stone-800 font-medium">
                      "{disp.description}"
                    </p>
                    <p className="text-stone-500 text-[11px] italic">
                      Supporting Evidence: {disp.evidenceNote}
                    </p>
                  </div>

                  {/* Resolution Input */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 border-t border-stone-200">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Admin arbitration investigation notes..."
                        value={resolutionNotes[disp.id] || ''}
                        onChange={(e) =>
                          setResolutionNotes({ ...resolutionNotes, [disp.id]: e.target.value })
                        }
                        className="w-full text-xs p-2 bg-white border border-stone-300 rounded-xl"
                      />
                    </div>

                    <button
                      onClick={() =>
                        onResolveDispute(
                          disp.id,
                          'dismiss',
                          resolutionNotes[disp.id] || 'Investigated: Class was conducted as scheduled.'
                        )
                      }
                      className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold rounded-xl transition"
                    >
                      Dismiss Complaint
                    </button>

                    <button
                      onClick={() =>
                        onResolveDispute(
                          disp.id,
                          'refund',
                          resolutionNotes[disp.id] || 'Confirmed non-delivery. 100% demo escrow refunded to learner.'
                        )
                      }
                      className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Issue 100% Escrow Refund</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
