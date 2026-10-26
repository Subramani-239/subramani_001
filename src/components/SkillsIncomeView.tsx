/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Sparkle,
  Clock,
  Coins,
  TrendingUp,
  Volume2,
  CheckCircle2,
  HelpCircle,
  ShoppingBag,
  Lightbulb,
  ArrowRight,
  X
} from 'lucide-react';
import { Language, SkillOpportunity } from '../types';
import { skillsData } from '../data/skillsData';
import { translations } from '../data/translations';
import { speakText } from '../utils/speech';
import { formatCurrency } from '../utils/calculator';

interface SkillsIncomeViewProps {
  lang: Language;
  onNavigateToBusinessGenerator: () => void;
}

export const SkillsIncomeView: React.FC<SkillsIncomeViewProps> = ({
  lang,
  onNavigateToBusinessGenerator,
}) => {
  const t = translations[lang];

  const [filterTime, setFilterTime] = useState<string>('all');
  const [filterBudget, setFilterBudget] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<SkillOpportunity | null>(null);

  const filteredSkills = useMemo(() => {
    return skillsData.filter((skill) => {
      if (filterTime !== 'all' && skill.timeNeeded !== filterTime) {
        return false;
      }
      if (filterBudget === 'under2k' && skill.minInvestment > 2000) {
        return false;
      }
      if (filterBudget === 'under5k' && skill.minInvestment > 5000) {
        return false;
      }
      return true;
    });
  }, [filterTime, filterBudget]);

  const handleSpeakSkill = (skill: SkillOpportunity) => {
    const textToSpeak =
      lang === 'ta'
        ? `${skill.titleTa}. மாத வருமானம்: ${skill.monthlyEarningPotentialTa}. தேவைப்படும் ஆரம்ப முதலீடு: ${formatCurrency(skill.minInvestment, 'ta')}. நேரம்: ${skill.timeNeededTa}. ${skill.shortSummaryTa}. வெற்றிக்கான வழி: ${skill.successTipTa}`
        : `${skill.title}. Monthly earning potential: ${skill.monthlyEarningPotential}. Minimum investment: ${formatCurrency(skill.minInvestment, 'en')}. Time needed: ${skill.timeNeeded}. ${skill.shortSummary}. Success tip: ${skill.successTip}`;
    speakText(textToSpeak, lang);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2">
            {lang === 'ta' ? 'வீட்டு வாழ்வாதாரம் & சுயசார்பு' : 'Livelihood & Self-Reliance'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {t.skills.title}
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
            {t.skills.sub}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() =>
                speakText(
                  lang === 'ta'
                    ? 'திறன் சார்ந்த வருமான வாய்ப்புகள். தினமும் 1 முதல் 3 மணி நேரம் வீட்டில் செலவிட்டு தையல், நாட்டு மசாலா, நாட்டுக் கோழி அல்லது காளான் வளர்ப்பு மூலம் மாதம் 5000 முதல் 18000 வரை சம்பாதிக்கலாம்.'
                    : 'Skill-Based Micro-Income Opportunities. Earn 5000 to 18000 Rupees per month from home with low starting investment.',
                  lang
                )
              }
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white text-amber-900 hover:bg-amber-50 rounded-full font-bold text-xs transition shadow-xs"
            >
              <Volume2 className="w-4 h-4 text-amber-600" />
              <span>{t.common.listen}</span>
            </button>

            <button
              onClick={onNavigateToBusinessGenerator}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-900/60 hover:bg-amber-900/80 text-white rounded-full font-semibold text-xs border border-white/20 transition"
            >
              <span>{t.business.generateBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          {/* Time Filter */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-700 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stone-500" />
              <span>{t.skills.filterTime}</span>
            </span>
            <div className="flex items-center gap-1">
              {[
                { id: 'all', label: t.common.all },
                { id: '1-2 hrs', label: '1-2 hrs' },
                { id: '3-4 hrs', label: '3-4 hrs' },
                { id: 'Flexible', label: 'Flexible' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setFilterTime(opt.id)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                    filterTime === opt.id
                      ? 'bg-amber-600 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Investment Filter */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-700 flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-stone-500" />
              <span>{t.skills.filterInvestment}</span>
            </span>
            <div className="flex items-center gap-1">
              {[
                { id: 'all', label: t.common.all },
                { id: 'under2k', label: t.skills.under2k },
                { id: 'under5k', label: t.skills.under5k },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setFilterBudget(opt.id)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                    filterBudget === opt.id
                      ? 'bg-amber-600 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Header row */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  {lang === 'ta' ? skill.timeNeededTa : skill.timeNeeded}
                </span>

                <button
                  onClick={() => handleSpeakSkill(skill)}
                  className="p-1.5 text-stone-400 hover:text-amber-600 rounded-full hover:bg-amber-50 transition"
                  title="Listen"
                  aria-label={`Listen to ${skill.title}`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-stone-900 leading-snug mb-1">
                {lang === 'ta' ? skill.titleTa : skill.title}
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                {lang === 'ta' ? skill.shortSummaryTa : skill.shortSummary}
              </p>

              {/* Financial Box */}
              <div className="grid grid-cols-2 gap-2 bg-gradient-to-r from-amber-50/70 to-orange-50/70 border border-amber-200 rounded-xl p-3 text-xs mb-2">
                <div>
                  <span className="text-stone-500 text-[11px] block font-medium">
                    {t.skills.potentialIncome}
                  </span>
                  <span className="text-emerald-700 font-extrabold text-sm">
                    {lang === 'ta' ? skill.monthlyEarningPotentialTa : skill.monthlyEarningPotential}
                  </span>
                </div>

                <div>
                  <span className="text-stone-500 text-[11px] block font-medium">
                    {t.skills.minCapital}
                  </span>
                  <span className="text-stone-900 font-bold text-sm">
                    {formatCurrency(skill.minInvestment, lang)}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] text-stone-500">
                {lang === 'ta' ? 'கிராமப்புற தேவைக்கு ஏற்றது' : 'Village-tested'}
              </span>

              <button
                onClick={() => setSelectedSkill(skill)}
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs rounded-xl shadow-xs transition"
              >
                {t.skills.startActionPlan}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Skill Action Roadmap Modal */}
      {selectedSkill && (
        <div
          role="dialog"
          aria-label="Skill Action Plan"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 mb-1 inline-block">
                  {lang === 'ta' ? selectedSkill.timeNeededTa : selectedSkill.timeNeeded}
                </span>
                <h2 className="text-xl font-extrabold text-stone-900">
                  {lang === 'ta' ? selectedSkill.titleTa : selectedSkill.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Read aloud in modal */}
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs">
              <span className="font-semibold text-amber-900">
                {lang === 'ta' ? 'இந்த செயல் திட்டத்தை கேட்கலாம்' : 'Listen to this entire plan'}
              </span>
              <button
                onClick={() => handleSpeakSkill(selectedSkill)}
                className="flex items-center gap-1.5 px-3 py-1 bg-amber-600 text-white font-bold rounded-xl"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{t.common.listen}</span>
              </button>
            </div>

            {/* Materials & Tools Needed */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-600" />
                <span>{t.skills.materialsNeeded}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                {(lang === 'ta'
                  ? selectedSkill.equipmentNeededTa
                  : selectedSkill.equipmentNeeded
                ).map((eq, idx) => (
                  <div key={idx} className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{eq}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Steps to start */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-stone-900">
                {t.skills.stepsHeader}
              </h3>
              <div className="space-y-2 text-xs text-stone-700">
                {(lang === 'ta'
                  ? selectedSkill.stepsToStartTa
                  : selectedSkill.stepsToStart
                ).map((step, idx) => (
                  <div key={idx} className="p-3 bg-stone-50 rounded-xl leading-relaxed">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Where to sell */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-emerald-600" />
                <span>{t.skills.whereToSellHeader}</span>
              </h3>
              <ul className="text-xs text-stone-700 space-y-1">
                {(lang === 'ta'
                  ? selectedSkill.whereToSellTa
                  : selectedSkill.whereToSell
                ).map((loc, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{loc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Golden Success Tip */}
            <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-300 rounded-2xl flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-amber-900 block mb-0.5">
                  {t.skills.successTipHeader}
                </span>
                <p className="text-xs text-stone-800 leading-relaxed font-medium">
                  {lang === 'ta' ? selectedSkill.successTipTa : selectedSkill.successTip}
                </p>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedSkill(null)}
                className="px-5 py-2 bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs rounded-xl"
              >
                {t.common.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
