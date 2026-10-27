/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Award,
  CheckCircle2,
  Download,
  Printer,
  ShieldCheck,
  X,
  QrCode,
  Sparkles,
} from 'lucide-react';
import { Language, SkillCertificate } from '../../types';

interface CertificateViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: SkillCertificate | null;
  lang: Language;
}

export const CertificateViewModal: React.FC<CertificateViewModalProps> = ({
  isOpen,
  onClose,
  certificate,
  lang,
}) => {
  if (!isOpen || !certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/75 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-stone-200 shadow-2xl p-6 sm:p-8 relative max-h-[94vh] overflow-y-auto print:shadow-none print:border-none print:p-0">
        {/* Close Button (Hidden on Print) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition print:hidden"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Frame */}
        <div className="border-4 border-double border-amber-500/70 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-amber-50/40 via-white to-emerald-50/30 text-stone-900 relative shadow-inner">
          {/* Watermark / Seal Icon */}
          <div className="flex items-center justify-between border-b border-amber-300/80 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
                <Award className="w-7 h-7 text-amber-200" />
              </div>
              <div>
                <span className="text-[11px] font-black tracking-widest uppercase text-emerald-800">
                  SHERISE VOCATIONAL COUNCIL
                </span>
                <h1 className="text-xl sm:text-2xl font-serif font-black tracking-tight text-stone-900">
                  Certificate of Skill Competency
                </h1>
              </div>
            </div>

            <div className="text-right text-[10px] text-stone-500">
              <span className="font-mono font-bold block text-emerald-800">
                {certificate.certificateId}
              </span>
              <span>{certificate.issuedDate}</span>
            </div>
          </div>

          {/* Body Content */}
          <div className="text-center space-y-4 my-6">
            <p className="text-xs sm:text-sm text-stone-600 italic">
              This is to officially certify that
            </p>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-wide border-b-2 border-stone-300 inline-block px-8 pb-1">
              {certificate.learnerName}
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
              has successfully completed all required curriculum modules, rigorous skill assessments, and practical hands-on exercises for:
            </p>

            <div className="py-2 px-4 bg-emerald-100/70 border border-emerald-300/80 rounded-2xl inline-block">
              <h3 className="text-base sm:text-lg font-bold text-emerald-950">
                {certificate.courseTitle}
              </h3>
            </div>

            {/* Performance Grade & Practical Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto text-left text-xs mt-3">
              <div className="p-3 bg-white/90 border border-stone-200 rounded-xl shadow-2xs">
                <span className="text-[10px] text-stone-500 font-bold block">ASSESSMENT SCORE</span>
                <span className="font-bold text-emerald-700">{certificate.gradeScore}</span>
              </div>
              <div className="p-3 bg-white/90 border border-stone-200 rounded-xl shadow-2xs">
                <span className="text-[10px] text-stone-500 font-bold block">VERIFIED TEACHER</span>
                <span className="font-bold text-stone-800">{certificate.teacherName}</span>
              </div>
            </div>

            {certificate.practicalProjectSummary && (
              <p className="text-[11px] text-stone-500 italic max-w-md mx-auto">
                Practical Work Verified: "{certificate.practicalProjectSummary}"
              </p>
            )}
          </div>

          {/* Footer Seals & Verification Hash */}
          <div className="pt-6 border-t border-amber-300/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl border border-stone-300 p-1 flex items-center justify-center">
                <QrCode className="w-10 h-10 text-stone-800" />
              </div>
              <div className="text-[10px] text-stone-500">
                <span className="font-mono block text-emerald-800 font-bold">
                  {certificate.verificationHash}
                </span>
                <span>Scan or verify online at sherise.org/verify</span>
              </div>
            </div>

            <div className="text-right flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <div className="text-left text-[10px]">
                <strong className="block text-stone-800 font-bold">SHERISE Certified Master</strong>
                <span className="text-stone-500">Authorized Skill Mentor Signature</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls (Hidden on Print) */}
        <div className="mt-5 flex items-center justify-between print:hidden">
          <span className="text-xs text-stone-500">
            Official verifiable vocational completion credential
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
