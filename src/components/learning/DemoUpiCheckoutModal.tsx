/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  AlertTriangle,
  X,
  CreditCard,
  QrCode,
  CheckCircle2,
  Lock,
  ArrowRight,
  Info,
  Calendar,
  MapPin,
  Video,
} from 'lucide-react';
import {
  CourseBooking,
  Language,
  LearningCourse,
  UserProfile,
} from '../../types';
import {
  calculateCommission,
  generateDemoUpiTxnId,
  isDuplicateTransaction,
} from '../../utils/learningBusinessLogic';
import { translations } from '../../data/translations';

interface DemoUpiCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: LearningCourse;
  lang: Language;
  userProfile: UserProfile;
  existingTxnIds: string[];
  onConfirmBooking: (booking: CourseBooking) => void;
}

export const DemoUpiCheckoutModal: React.FC<DemoUpiCheckoutModalProps> = ({
  isOpen,
  onClose,
  course,
  lang,
  userProfile,
  existingTxnIds,
  onConfirmBooking,
}) => {
  if (!isOpen) return null;

  const t = translations[lang].skillsLearning;
  const breakdown = calculateCommission(course.fee);

  const [selectedFormat, setSelectedFormat] = useState<'online' | 'in_person'>(
    course.format === 'in_person' ? 'in_person' : 'online'
  );
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'custom'>('gpay');
  const [customVpa, setCustomVpa] = useState<string>(
    `${userProfile.name.toLowerCase().replace(/\s+/g, '') || 'learner'}@upi`
  );
  const [showQr, setShowQr] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsProcessing(true);

    setTimeout(() => {
      const demoTxnId = generateDemoUpiTxnId();

      if (isDuplicateTransaction(existingTxnIds, demoTxnId)) {
        setIsProcessing(false);
        setErrorMsg('Duplicate transaction detected. Please refresh and try again.');
        return;
      }

      const booking: CourseBooking = {
        id: `BK-${Math.floor(10000 + Math.random() * 90000)}`,
        courseId: course.id,
        courseTitle: course.title,
        learnerId: userProfile.id || 'DEMO-LEARNER',
        learnerName: userProfile.name || 'Empowered Sister',
        bookingDate: new Date().toISOString().split('T')[0],
        batchSchedule: course.batchSchedule || 'Upcoming batch',
        classFormat: selectedFormat,
        venueOrLink:
          selectedFormat === 'online'
            ? 'https://meet.google.com/demo-sherise-class'
            : course.venueOrLink || 'Local Community Center',
        status: 'confirmed',
        courseFee: breakdown.fee,
        platformFee: breakdown.platformFee,
        teacherEarnings: breakdown.teacherEarnings,
        paymentMethod: 'demo_upi',
        demoUpiTxnId: demoTxnId,
        escrowStatus: 'held_in_escrow',
      };

      try {
        confetti({ particleCount: 50, spread: 70 });
      } catch {
        // ignore
      }

      setIsProcessing(false);
      onConfirmBooking(booking);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl p-6 relative max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Prominent Demo Sandbox Banner */}
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3.5 mb-5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-black text-amber-900 tracking-wide uppercase block">
              {t.demoUpiNotice}
            </span>
            <p className="text-amber-800 mt-0.5">
              Strictly demo testing mode. No real money or bank charges occur.
            </p>
          </div>
        </div>

        {/* Modal Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
              {t.demoUpiTitle}
            </span>
          </div>
          <h2 className="text-lg font-bold text-stone-900 leading-snug">
            {lang === 'ta' ? course.titleTa : lang === 'hi' ? course.titleHi : course.title}
          </h2>
          <p className="text-xs text-stone-500 mt-1 flex items-center gap-2">
            <span>Teacher: <strong className="text-stone-800">{course.trainerName}</strong></span>
            {course.teacher?.verificationStatus === 'verified' && (
              <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {t.verifiedTeacherBadge}
              </span>
            )}
          </p>
        </div>

        {/* Class Format Choice */}
        {course.format === 'both' && (
          <div className="mb-4 p-3 bg-stone-50 border border-stone-200 rounded-2xl">
            <label className="block text-xs font-bold text-stone-700 mb-2">
              Select Attendance Format:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedFormat('online')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition border ${
                  selectedFormat === 'online'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Online Live Class</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedFormat('in_person')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition border ${
                  selectedFormat === 'in_person'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>In-Person Center</span>
              </button>
            </div>
          </div>
        )}

        {/* Schedule & Venue Note */}
        <div className="mb-4 p-3 bg-emerald-50/60 border border-emerald-200 rounded-2xl text-xs space-y-1">
          <div className="flex items-center gap-2 text-emerald-950 font-bold">
            <Calendar className="w-4 h-4 text-emerald-700" />
            <span>{course.batchSchedule || 'Batch begins next Monday'}</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-900 text-[11px]">
            {selectedFormat === 'online' ? (
              <>
                <Video className="w-3.5 h-3.5 text-emerald-600" />
                <span>Interactive Video Room (Google Meet demo link provided on confirmation)</span>
              </>
            ) : (
              <>
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{course.venueOrLink || 'Local Community Skill Center'}</span>
              </>
            )}
          </div>
        </div>

        {/* 5% Transparent Fee Breakdown Table */}
        <div className="mb-4 bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2 text-xs">
          <div className="flex justify-between items-center text-stone-600">
            <span>{t.courseFeeLabel}</span>
            <span className="font-semibold">₹{breakdown.fee}</span>
          </div>

          <div className="flex justify-between items-center text-emerald-700 bg-emerald-50/80 px-2.5 py-1.5 rounded-xl border border-emerald-200">
            <span className="flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.platformCommissionLabel}</span>
            </span>
            <span className="font-bold">₹{breakdown.platformFee} (5%)</span>
          </div>

          <div className="flex justify-between items-center text-stone-600">
            <span>{t.teacherEarningsLabel}</span>
            <span className="font-semibold text-stone-800">₹{breakdown.teacherEarnings} (95%)</span>
          </div>

          <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-sm font-black text-stone-900">
            <span>{t.totalPayableLabel}</span>
            <span className="text-emerald-700 text-base">₹{breakdown.fee}</span>
          </div>
        </div>

        {/* Escrow Anti-Scam Protection Guarantee Notice */}
        <div className="mb-5 p-3.5 bg-blue-50/70 border border-blue-200 rounded-2xl flex items-start gap-2.5 text-xs text-blue-950">
          <Lock className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed text-[11px]">
            <strong className="block text-blue-900 font-bold mb-0.5">SHERISE Escrow Protection Active:</strong>
            {t.escrowGuaranteeNotice}
          </div>
        </div>

        {/* Simulated Payment Method Selection */}
        <form onSubmit={handleSimulatePayment} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-2">
              Select Demo Payment Mode:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'gpay', label: 'GPay Demo' },
                { id: 'phonepe', label: 'PhonePe Demo' },
                { id: 'paytm', label: 'Paytm Demo' },
              ].map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => {
                    setUpiApp(app.id as any);
                    setShowQr(false);
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    upiApp === app.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                      : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {app.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle QR code simulation */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-500">Or simulate scan:</span>
            <button
              type="button"
              onClick={() => setShowQr(!showQr)}
              className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>{showQr ? 'Hide Demo QR' : 'Show Demo QR Simulator'}</span>
            </button>
          </div>

          {showQr && (
            <div className="p-4 bg-stone-100 rounded-2xl flex flex-col items-center justify-center border border-dashed border-stone-300">
              <div className="w-32 h-32 bg-white rounded-xl p-2 shadow-xs flex items-center justify-center border border-stone-200">
                <QrCode className="w-28 h-28 text-stone-800" />
              </div>
              <span className="text-[11px] font-bold text-stone-600 mt-2">
                Scan with any Demo Banking App
              </span>
              <span className="text-[10px] text-stone-400">
                UPI ID: sherise.escrow@demobank
              </span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-semibold">
              {errorMsg}
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-md transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isProcessing ? (
              <span>Verifying Demo UPI Escrow...</span>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                <span>Confirm & Book Class (Simulate ₹{breakdown.fee})</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
