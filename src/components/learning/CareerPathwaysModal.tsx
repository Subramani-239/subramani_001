/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Briefcase,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  Store,
  Layers,
} from 'lucide-react';
import { Language, LearningCourse } from '../../types';

interface CareerPathwaysModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: LearningCourse;
  lang: Language;
}

export const CareerPathwaysModal: React.FC<CareerPathwaysModalProps> = ({
  isOpen,
  onClose,
  course,
  lang,
}) => {
  if (!isOpen) return null;

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
          <div className="p-3 bg-purple-100 text-purple-700 rounded-2xl">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              Employment & Self-Employment Opportunities
            </h2>
            <p className="text-xs text-stone-500">
              Practical pathways for {course.title}
            </p>
          </div>
        </div>

        {/* Realistic Honest Disclaimer */}
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3.5 mb-5 flex items-start gap-2.5 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold text-amber-950 mb-0.5">
              Honest Platform Standard:
            </strong>
            SHERISE does not guarantee instant job placement or fixed income. Earnings depend directly on your hands-on practice, product finish quality, and local neighborhood demand.
          </div>
        </div>

        {/* Real Concrete Avenues */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xs font-black uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
            <Store className="w-4 h-4 text-emerald-600" />
            <span>Viable Micro-Enterprise & Job Pathways:</span>
          </h3>

          <div className="space-y-2.5">
            {(course.careerOutcomes && course.careerOutcomes.length > 0
              ? course.careerOutcomes
              : [
                  'Start home-based custom orders for your immediate neighborhood',
                  'Supply finished products to local stores, schools, or community functions',
                  'Register on WhatsApp Business to showcase your product catalog and take orders',
                ]
            ).map((outcome, idx) => (
              <div
                key={idx}
                className="p-3 bg-stone-50 border border-stone-200 rounded-2xl flex items-start gap-2.5 text-xs text-stone-800"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Earning Potential & Investment Matrix */}
        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs space-y-2 mb-5">
          <h4 className="font-bold text-emerald-950 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <span>Economic Scope & Unit Economics</span>
          </h4>
          <p className="text-emerald-900 leading-relaxed font-medium text-[11px]">
            {course.earningConnection}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
          >
            Understood & Close
          </button>
        </div>
      </div>
    </div>
  );
};
