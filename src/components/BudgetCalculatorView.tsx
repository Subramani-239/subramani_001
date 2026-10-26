/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Coins,
  TrendingUp,
  PiggyBank,
  PlusCircle,
  Trash2,
  Volume2,
  CheckCircle2,
  ArrowDownRight,
  ArrowUpRight,
  ShieldCheck,
  AlertTriangle,
  FileSpreadsheet,
  Info,
  ArrowLeft,
  Store,
  ShoppingBag
} from 'lucide-react';
import { Language, ActiveTab, BudgetRecord, BudgetItemPlan } from '../types';
import { translations } from '../data/translations';
import {
  calculateBusinessProfit,
  calculateItemizedBudget,
  formatCurrency,
} from '../utils/calculator';
import { speakText } from '../utils/speech';
import { RawMaterialFinderModal } from './RawMaterialFinderModal';

interface BudgetCalculatorViewProps {
  lang: Language;
  onNavigateBack?: () => void;
  onNavigate?: (tab: ActiveTab) => void;
}

export const BudgetCalculatorView: React.FC<BudgetCalculatorViewProps> = ({
  lang,
  onNavigateBack,
  onNavigate,
}) => {
  const t = translations[lang];

  const [isRawMaterialModalOpen, setIsRawMaterialModalOpen] = useState(false);

  // 1. Business Profit & Operating Margin States
  const [salesRevenue, setSalesRevenue] = useState<number>(15000);
  const [rawMaterials, setRawMaterials] = useState<number>(5000);
  const [operatingCost, setOperatingCost] = useState<number>(2000);
  const [fixedOverhead, setFixedOverhead] = useState<number>(1500);

  const profitResult = calculateBusinessProfit(
    salesRevenue,
    rawMaterials,
    operatingCost,
    fixedOverhead
  );

  // 3. Itemized Business Budget Planner States
  const [totalBudgetLimit, setTotalBudgetLimit] = useState<number>(25000);
  const [planItems, setPlanItems] = useState<BudgetItemPlan[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_budget_plan_items');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'plan-1',
        itemName: lang === 'ta' ? 'தையல் இயந்திரம் (Second-hand motor machine)' : lang === 'hi' ? 'सिलाई मशीन (उपकरण)' : 'Sewing Machine (Equipment)',
        category: 'tool_equipment',
        quantity: 1,
        estimatedUnitCost: 11000,
        notes: lang === 'ta' ? 'அடிப்படை உள்கட்டமைப்பு' : 'Initial fixed asset'
      },
      {
        id: 'plan-2',
        itemName: lang === 'ta' ? 'லைனிங் துணி & கத்தரிக்கோல்' : lang === 'hi' ? 'कपड़ा और कैंची' : 'Lining cloth, scissors & chalk',
        category: 'raw_material',
        quantity: 10,
        estimatedUnitCost: 350,
        notes: lang === 'ta' ? 'ஆரம்ப மூலப்பொருள்' : 'Starting material'
      },
      {
        id: 'plan-3',
        itemName: lang === 'ta' ? 'நூல் உருளைகள் (பல்வேறு வண்ணங்கள்)' : lang === 'hi' ? 'धागे के रोल (विभिन्न रंग)' : 'Thread spools (assorted colors)',
        category: 'raw_material',
        quantity: 25,
        estimatedUnitCost: 40,
        notes: lang === 'ta' ? 'தினசரி பயன்பாடு' : 'Daily stock'
      },
      {
        id: 'plan-4',
        itemName: lang === 'ta' ? 'சுயஒட்டு பாக்கெட் & லேபிள்கள்' : lang === 'hi' ? 'पैकेजिंग कवर व लेबल' : 'Packaging covers & brand stickers',
        category: 'packaging',
        quantity: 100,
        estimatedUnitCost: 4,
        notes: lang === 'ta' ? 'வாடிக்கையாளர் திருப்தி' : 'Professional look'
      },
      {
        id: 'plan-5',
        itemName: lang === 'ta' ? 'அவசர கையிருப்பு & போக்குவரத்து' : lang === 'hi' ? 'आपातकालीन फंड व यात्रा' : 'Emergency buffer & travel',
        category: 'travel_misc',
        quantity: 1,
        estimatedUnitCost: 2000,
        notes: lang === 'ta' ? 'பாதுகாப்பு நிதி' : 'Safety buffer'
      }
    ];
  });

  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<BudgetItemPlan['category']>('raw_material');
  const [newItemQty, setNewItemQty] = useState<number>(1);
  const [newItemUnitCost, setNewItemUnitCost] = useState<string>('');

  useEffect(() => {
    try {
      localStorage.setItem('sherise_budget_plan_items', JSON.stringify(planItems));
    } catch {
      // ignore
    }
  }, [planItems]);

  const itemizedAnalysis = calculateItemizedBudget(
    planItems.map((item) => ({
      quantity: item.quantity,
      estimatedUnitCost: item.estimatedUnitCost,
    })),
    totalBudgetLimit
  );

  const handleAddItemToPlan = (e: React.FormEvent) => {
    e.preventDefault();
    const cost = parseFloat(newItemUnitCost);
    if (!newItemName.trim() || isNaN(cost) || cost <= 0 || newItemQty <= 0) return;

    const newItem: BudgetItemPlan = {
      id: `plan-${Date.now()}`,
      itemName: newItemName.trim(),
      category: newItemCategory,
      quantity: newItemQty,
      estimatedUnitCost: cost,
    };

    setPlanItems([...planItems, newItem]);
    setNewItemName('');
    setNewItemUnitCost('');
    setNewItemQty(1);
  };

  const handleDeletePlanItem = (id: string) => {
    setPlanItems(planItems.filter((i) => i.id !== id));
  };

  // 4. Daily Cashbook Records (Saved in LocalStorage)
  const [records, setRecords] = useState<BudgetRecord[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_budget_records');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'rec-1',
        date: new Date().toISOString().split('T')[0],
        description: lang === 'ta' ? 'ஜாக்கெட் தையல் கூலி (2 blouses)' : lang === 'hi' ? 'सिलाई कमाई (2 ब्लाउज)' : 'Stitching income (2 blouses)',
        type: 'income',
        amount: 800,
        category: 'Tailoring',
      },
      {
        id: 'rec-2',
        date: new Date().toISOString().split('T')[0],
        description: lang === 'ta' ? 'தையல் நூல் மற்றும் லைனிங் துணி' : lang === 'hi' ? 'धागा व अस्तर कपड़ा' : 'Thread & lining cloth purchase',
        type: 'expense',
        amount: 250,
        category: 'Raw Materials',
      },
      {
        id: 'rec-3',
        date: new Date().toISOString().split('T')[0],
        description: lang === 'ta' ? 'அவசர கால உண்டியல் சேமிப்பு' : lang === 'hi' ? 'आपातकालीन गुल्लक बचत' : 'Emergency piggy bank savings',
        type: 'savings',
        amount: 150,
        category: 'Savings',
      },
    ];
  });

  const [newDesc, setNewDesc] = useState('');
  const [newAmount, setNewAmount] = useState<string>('');
  const [newType, setNewType] = useState<'income' | 'expense' | 'savings'>('income');

  useEffect(() => {
    try {
      localStorage.setItem('sherise_budget_records', JSON.stringify(records));
    } catch {
      // ignore
    }
  }, [records]);

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newAmount);
    if (!newDesc.trim() || isNaN(val) || val <= 0) return;

    const newRecord: BudgetRecord = {
      id: `rec-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      description: newDesc.trim(),
      type: newType,
      amount: val,
      category: newType === 'income' ? 'Business' : 'Expense',
    };

    setRecords([newRecord, ...records]);
    setNewDesc('');
    setNewAmount('');

    if (newType === 'income' || newType === 'savings') {
      try {
        confetti({ particleCount: 25, spread: 45 });
      } catch {
        // ignore
      }
    }
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  const totalIncome = records
    .filter((r) => r.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenses = records
    .filter((r) => r.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const handleSpeakProfit = () => {
    const textToSpeak =
      lang === 'ta'
        ? `மாதாந்திர தொழில் லாப கணக்கு. விற்பனை ${formatCurrency(salesRevenue, 'ta')}. மொத்த இயக்க செலவுகள் மற்றும் வாடகை ${formatCurrency(profitResult.totalExpenses, 'ta')}. உங்கள் நிகர லாபம் ${formatCurrency(profitResult.netProfit, 'ta')}. அவசர கால சேமிப்புக்கு பரிந்துரைக்கப்படும் தொகை ${formatCurrency(profitResult.emergencySavingsRecommendation, 'ta')}.`
        : lang === 'hi'
        ? `मासिक व्यावसायिक लाभ गणना। कुल बिक्री ${formatCurrency(salesRevenue, 'hi')}। कुल खर्च व किराया ${formatCurrency(profitResult.totalExpenses, 'hi')}। शुद्ध लाभ ${formatCurrency(profitResult.netProfit, 'hi')}। आपातकालीन बचत अनुशंसा ${formatCurrency(profitResult.emergencySavingsRecommendation, 'hi')} है।`
        : `Business profit calculation. Monthly revenue ${formatCurrency(salesRevenue, 'en')}. Total operating expenses ${formatCurrency(profitResult.totalExpenses, 'en')}. Your net profit is ${formatCurrency(profitResult.netProfit, 'en')}. Recommended emergency savings is ${formatCurrency(profitResult.emergencySavingsRecommendation, 'en')}.`;
    speakText(textToSpeak, lang);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Top Breadcrumb & Back Bar */}
      <div className="flex items-center justify-between text-xs font-semibold text-stone-600 bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5">
        <div className="flex items-center gap-2">
          {onNavigateBack && (
            <button
              onClick={onNavigateBack}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-300 hover:bg-stone-100 rounded-lg text-stone-800 font-bold transition shadow-2xs"
              aria-label="Back"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.common.back}</span>
            </button>
          )}
          <span>{lang === 'ta' ? 'முகப்பு' : lang === 'hi' ? 'होम' : 'Home'}</span>
          <span>/</span>
          <span className="text-blue-700 font-bold">{t.nav.budgetCalculator}</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-stone-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{lang === 'ta' ? 'பாதுகாப்பான உள்ளூர் கணக்கீடு' : 'Secure Local Calculation'}</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2">
            {lang === 'ta' ? 'நிதி மேலாண்மை & கணக்கு' : lang === 'hi' ? 'वित्तीय साक्षरता और बजट' : 'Financial Literacy & Budget'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {t.budget.title}
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
            {t.budget.sub}
          </p>
        </div>
      </div>

      {/* Smart Budgeting & Savings Discipline Banner */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-emerald-600 text-white rounded-xl shrink-0 mt-0.5">
            <PiggyBank className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
              <span>{lang === 'ta' ? 'அடிப்படை வரவுசெலவு & சேமிப்பு ஒழுக்கம்' : lang === 'hi' ? 'स्मार्ट वित्तीय साक्षरता व बचत अनुशासन' : 'Smart Budgeting & Savings Discipline'}</span>
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              {lang === 'ta'
                ? 'உங்கள் வீட்டுத் தொழிலில் வரும் வருமானத்தில் மூலப்பொருள் மற்றும் கடை செலவுகளை கழித்த பின், நிகர லாபத்தில் குறைந்தது 20% தொகையை அவசர கால உண்டியல் சேமிப்பாக ஒதுக்குவது உங்கள் குடும்பத்தின் பொருளாதார பாதுகாப்பை உறுதி செய்யும்.'
                : lang === 'hi'
                ? 'अपने घरेलू व्यवसाय की आय से कच्चा माल और संचालन खर्च घटाने के बाद, शुद्ध मुनाफे का कम से कम 20% आपातकालीन गुल्लक बचत में रखें। यह आपके परिवार को आत्मनिर्भर और सुरक्षित बनाता है।'
                : 'After deducting raw materials and operating costs from your monthly revenue, always set aside at least 20% of net profit into an emergency savings reserve before personal spending.'}
            </p>
          </div>
        </div>
      </div>

      {/* Module 1: Itemized Business Budget Planner */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
              <span>{lang === 'ta' ? 'விவரமான தொழில் வரவுசெலவு திட்டமிடல் (Itemized Budget Planner)' : lang === 'hi' ? 'मदवार व्यावसायिक बजट योजना (Itemized Budget)' : 'Itemized Business Startup Budget Planner'}</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {lang === 'ta'
                ? 'உங்கள் முதலீட்டு தொகைக்கு ஏற்ப உபகரணங்கள், மூலப்பொருட்கள் மற்றும் பேக்கிங் செலவுகளை உருப்படி வாரியாக திட்டமிடுங்கள்'
                : lang === 'hi'
                ? 'अपने पूंजीगत बजट के अनुसार उपकरण, कच्चा माल और पैकेजिंग का मदवार हिसाब रखें'
                : 'Plan every rupee of your initial investment across equipment, raw materials, packaging & safety buffer'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsRawMaterialModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-300 rounded-xl text-xs font-bold transition shadow-2xs"
            >
              <Store className="w-3.5 h-3.5 text-teal-600" />
              <span>{lang === 'ta' ? 'மூலப்பொருள் சந்தை & விலை ஒப்பீடு' : 'Find Raw Materials / Compare Quotes'}</span>
            </button>

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-stone-700 whitespace-nowrap">
                {lang === 'ta' ? 'கிடைக்கக்கூடிய மூலதனம்:' : lang === 'hi' ? 'कुल बजट सीमा:' : 'Total Available Budget:'}
              </label>
              <input
                type="number"
                step="1000"
                value={totalBudgetLimit}
                onChange={(e) => setTotalBudgetLimit(Math.max(1000, Number(e.target.value)))}
                className="w-32 px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-black text-indigo-900 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Budget Limit Status Bar */}
        <div className={`p-4 rounded-2xl border transition ${
          itemizedAnalysis.isBudgetExceeded
            ? 'bg-rose-50 border-rose-300 text-rose-950'
            : 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              {itemizedAnalysis.isBudgetExceeded ? (
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
              )}
              <span className="text-xs font-bold">
                {itemizedAnalysis.isBudgetExceeded
                  ? (lang === 'ta' ? 'எச்சரிக்கை: திட்டமிடப்பட்ட செலவு உங்கள் மூலதனத்தை விட அதிகம்!' : lang === 'hi' ? 'चेतावनी: नियोजित लागत आपके बजट से अधिक है!' : 'Budget Exceeded Warning! Planned expenses exceed capital!')
                  : (lang === 'ta' ? 'பட்ஜெட் கட்டுக்குள் உள்ளது' : lang === 'hi' ? 'बजट नियंत्रण में है' : 'Budget is Well Balanced')}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold">
              <div>
                <span className="text-stone-500 font-normal mr-1">{lang === 'ta' ? 'மொத்த ஒதுக்கீடு:' : lang === 'hi' ? 'आवंटित:' : 'Allocated:'}</span>
                <span className="font-extrabold">{formatCurrency(itemizedAnalysis.totalEstimatedCost, lang)}</span>
              </div>
              <div>
                <span className="text-stone-500 font-normal mr-1">{lang === 'ta' ? 'மீதமுள்ள கையிருப்பு:' : lang === 'hi' ? 'शेष पूंजी:' : 'Remaining:'}</span>
                <span className={itemizedAnalysis.remainingBudget < 0 ? 'text-rose-600 font-black' : 'text-emerald-700 font-black'}>
                  {formatCurrency(itemizedAnalysis.remainingBudget, lang)}
                </span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                itemizedAnalysis.isBudgetExceeded ? 'bg-rose-600' : 'bg-indigo-600'
              }`}
              style={{ width: `${Math.min(100, itemizedAnalysis.budgetUtilizationPercent)}%` }}
            />
          </div>
        </div>

        {/* Add Item Form */}
        <form onSubmit={handleAddItemToPlan} className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
          <input
            type="text"
            required
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder={lang === 'ta' ? 'பொருளின் பெயர் (உதா: மசாலா பாக்கெட்டுகள்)' : lang === 'hi' ? 'मद का नाम (उदा. मसाला पैकेट)' : 'Item name (e.g. Masala jars)'}
            className="sm:col-span-5 p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value as any)}
            className="sm:col-span-3 p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium"
          >
            <option value="raw_material">{lang === 'ta' ? 'மூலப்பொருள்' : lang === 'hi' ? 'कच्चा माल' : 'Raw Material'}</option>
            <option value="tool_equipment">{lang === 'ta' ? 'கருவி / இயந்திரம்' : lang === 'hi' ? 'उपकरण / मशीन' : 'Tool / Equipment'}</option>
            <option value="packaging">{lang === 'ta' ? 'பேக்கிங் & லேபிள்' : lang === 'hi' ? 'पैकेजिंग' : 'Packaging'}</option>
            <option value="marketing">{lang === 'ta' ? 'விளம்பரம்' : lang === 'hi' ? 'विपणन' : 'Marketing'}</option>
            <option value="travel_misc">{lang === 'ta' ? 'பயணம் & பிற' : lang === 'hi' ? 'यात्रा व अन्य' : 'Travel / Misc'}</option>
          </select>

          <input
            type="number"
            min="1"
            value={newItemQty}
            onChange={(e) => setNewItemQty(Math.max(1, parseInt(e.target.value) || 1))}
            placeholder={lang === 'ta' ? 'எண்ணிக்கை' : lang === 'hi' ? 'मात्रा' : 'Qty'}
            className="sm:col-span-1 p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold text-center"
          />

          <input
            type="number"
            required
            min="1"
            value={newItemUnitCost}
            onChange={(e) => setNewItemUnitCost(e.target.value)}
            placeholder={lang === 'ta' ? 'விலை/1 (₹)' : lang === 'hi' ? 'दर (₹)' : 'Unit ₹'}
            className="sm:col-span-2 p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold"
          />

          <button
            type="submit"
            className="sm:col-span-1 p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs transition flex items-center justify-center"
            title="Add item"
            aria-label="Add item to budget plan"
          >
            <PlusCircle className="w-4 h-4" />
          </button>
        </form>

        {/* Itemized Table */}
        <div className="overflow-x-auto border border-stone-200 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
              <tr>
                <th className="py-2.5 px-3">{lang === 'ta' ? 'பொருள் விவரம்' : lang === 'hi' ? 'विवरण' : 'Item Description'}</th>
                <th className="py-2.5 px-3">{lang === 'ta' ? 'வகை' : lang === 'hi' ? 'श्रेणी' : 'Category'}</th>
                <th className="py-2.5 px-3 text-center">{lang === 'ta' ? 'எண்ணிக்கை' : lang === 'hi' ? 'मात्रा' : 'Qty'}</th>
                <th className="py-2.5 px-3 text-right">{lang === 'ta' ? 'ஒரு பொருள் விலை' : lang === 'hi' ? 'इकाई दर' : 'Unit Cost'}</th>
                <th className="py-2.5 px-3 text-right">{lang === 'ta' ? 'மொத்த தொகை' : lang === 'hi' ? 'कुल लागत' : 'Total'}</th>
                <th className="py-2.5 px-3 text-center">{lang === 'ta' ? 'நீக்கு' : lang === 'hi' ? 'हटाएं' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {planItems.map((item) => {
                const total = item.quantity * item.estimatedUnitCost;
                return (
                  <tr key={item.id} className="hover:bg-stone-50/60 transition">
                    <td className="py-2.5 px-3 font-bold text-stone-900">
                      <div>{item.itemName}</div>
                      <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                        {item.notes && <span className="text-[10px] text-stone-400 font-normal">{item.notes}</span>}
                        {item.sourceHubOrShop && (
                          <span className="text-[9px] px-1.5 py-0.5 bg-teal-50 text-teal-800 border border-teal-200 rounded font-semibold flex items-center gap-0.5">
                            <Store className="w-2.5 h-2.5 text-teal-600" />
                            <span>{item.sourceHubOrShop}</span>
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-700">
                        {item.category.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold text-stone-700">{item.quantity}</td>
                    <td className="py-2.5 px-3 text-right text-stone-600">{formatCurrency(item.estimatedUnitCost, lang)}</td>
                    <td className="py-2.5 px-3 text-right font-extrabold text-indigo-900">{formatCurrency(total, lang)}</td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => handleDeletePlanItem(item.id)}
                        className="p-1 text-stone-400 hover:text-rose-600 rounded-md transition"
                        title="Delete item"
                        aria-label={`Delete ${item.itemName}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Module 2: Monthly Business Profit & Safety Margin Calculator */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 shadow-2xs space-y-5">
        <div className="flex items-start justify-between border-b border-stone-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>{t.budget.businessProfitTitle}</span>
            </h2>
            <p className="text-[11px] text-stone-500 mt-0.5">
              {lang === 'ta'
                ? 'அனைத்து செலவுகளையும் கழித்து உங்கள் கையில் நிற்கும் உண்மையான லாபம்'
                : lang === 'hi'
                ? 'सभी परिचालन व दुकान खर्च घटाने के बाद आपका वास्तविक शुद्ध मुनाफा'
                : 'Real take-home profit after deducting all operational costs and overhead'}
            </p>
          </div>
          <button
            onClick={handleSpeakProfit}
            className="p-1.5 text-stone-400 hover:text-emerald-600 rounded-full"
            title="Listen"
            aria-label="Listen to profit calculation"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="font-bold text-stone-700 block mb-1">
              {t.budget.monthlySales}
            </label>
            <input
              type="number"
              value={salesRevenue}
              onChange={(e) => setSalesRevenue(Number(e.target.value))}
              className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">
              {t.budget.rawMaterials}
            </label>
            <input
              type="number"
              value={rawMaterials}
              onChange={(e) => setRawMaterials(Number(e.target.value))}
              className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">
              {t.budget.otherExpenses}
            </label>
            <input
              type="number"
              value={operatingCost}
              onChange={(e) => setOperatingCost(Number(e.target.value))}
              className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">
              {t.budget.fixedOverheadCosts || t.budget.existingLoanEmi}
            </label>
            <input
              type="number"
              value={fixedOverhead}
              onChange={(e) => setFixedOverhead(Number(e.target.value))}
              className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl font-bold"
            />
          </div>
        </div>

        {/* Profit Output */}
        <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-900 block">
                {t.budget.netProfitResult}
              </span>
              <span className="text-xs text-emerald-700 font-semibold">
                {t.budget.profitMarginResult} {profitResult.profitMarginPercent}%
              </span>
            </div>
            <span className="text-2xl font-black text-emerald-950">
              {formatCurrency(profitResult.netProfit, lang)}
            </span>
          </div>

          {/* Emergency fund tip */}
          <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between text-xs">
            <span className="text-emerald-900 font-medium flex items-center gap-1.5">
              <PiggyBank className="w-4 h-4 text-emerald-600" />
              <span>{t.budget.emergencyFundTip}</span>
            </span>
            <span className="font-extrabold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-lg">
              {formatCurrency(profitResult.emergencySavingsRecommendation, lang)}
            </span>
          </div>
        </div>
      </div>

      {/* Module 4: Daily Local Cashbook & Record Keeper */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-base sm:lg font-bold text-stone-900 flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-purple-600" />
              <span>{t.budget.recordKeeperTitle}</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {lang === 'ta'
                ? 'உங்கள் வியாபார வரவு செலவுகளை குறிப்பேட்டில் எழுதி வைப்பது போல் உங்கள் போனிலேயே குறித்து வைக்கலாம்'
                : lang === 'hi'
                ? 'खाता बही की तरह अपने फोन में स्थानीय रूप से आय और व्यय दर्ज करें'
                : 'Digital khata stored securely on your local phone storage'}
            </p>
          </div>

          {/* Summary Balance Pills */}
          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl font-bold">
              {lang === 'ta' ? 'வரவு:' : lang === 'hi' ? 'आय:' : 'Income:'} {formatCurrency(totalIncome, lang)}
            </span>
            <span className="px-3 py-1 bg-rose-50 text-rose-800 border border-rose-200 rounded-xl font-bold">
              {lang === 'ta' ? 'செலவு:' : lang === 'hi' ? 'व्यय:' : 'Expense:'} {formatCurrency(totalExpenses, lang)}
            </span>
          </div>
        </div>

        {/* Add Record Form */}
        <form onSubmit={handleAddRecord} className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
          <input
            type="text"
            required
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder={
              lang === 'ta'
                ? 'விவரம் (உதா: சுடிதார் தைத்தது, நூல் வாங்கியது)'
                : lang === 'hi'
                ? 'विवरण (उदा. सिलाई मजदूरी, सामान खरीदा)'
                : 'Description (e.g. Blouse stitching, thread)'
            }
            className="sm:col-span-2 p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="number"
            required
            min="1"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            placeholder={lang === 'ta' ? 'தொகை (₹)' : lang === 'hi' ? 'राशि (₹)' : 'Amount (₹)'}
            className="p-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-purple-500 font-bold"
          />

          <div className="flex items-center gap-2">
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value as any)}
              className="flex-1 p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-semibold"
            >
              <option value="income">{lang === 'ta' ? 'வரவு (+)' : lang === 'hi' ? 'आय (+)' : 'Income (+)'}</option>
              <option value="expense">{lang === 'ta' ? 'செலவு (-)' : lang === 'hi' ? 'व्यय (-)' : 'Expense (-)'}</option>
              <option value="savings">{lang === 'ta' ? 'சேமிப்பு' : lang === 'hi' ? 'बचत' : 'Savings'}</option>
            </select>

            <button
              type="submit"
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-xs shrink-0 transition"
              title="Add record"
              aria-label="Add transaction"
            >
              <PlusCircle className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Records List Table */}
        <div className="space-y-2">
          {records.map((rec) => (
            <div
              key={rec.id}
              className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between text-xs hover:bg-stone-100/60 transition"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`p-1.5 rounded-lg ${
                    rec.type === 'income'
                      ? 'bg-emerald-100 text-emerald-800'
                      : rec.type === 'savings'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {rec.type === 'income' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : rec.type === 'savings' ? (
                    <PiggyBank className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                </div>

                <div>
                  <div className="font-bold text-stone-900">{rec.description}</div>
                  <div className="text-[10px] text-stone-400">{rec.date}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`font-black text-sm ${
                    rec.type === 'income'
                      ? 'text-emerald-700'
                      : rec.type === 'savings'
                      ? 'text-blue-700'
                      : 'text-rose-700'
                  }`}
                >
                  {rec.type === 'income' ? '+' : rec.type === 'savings' ? '★ ' : '-'}
                  {formatCurrency(rec.amount, lang)}
                </span>

                <button
                  onClick={() => handleDeleteRecord(rec.id)}
                  className="p-1 text-stone-400 hover:text-rose-600 rounded-lg transition"
                  title="Delete record"
                  aria-label="Delete entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {records.length === 0 && (
            <div className="text-center py-6 text-xs text-stone-400">
              {lang === 'ta'
                ? 'இன்னும் கணக்குகள் எதுவும் சேர்க்கப்படவில்லை.'
                : lang === 'hi'
                ? 'अभी तक कोई रिकॉर्ड नहीं जोड़ा गया है।'
                : 'No cashbook records added yet.'}
            </div>
          )}
        </div>
      </div>

      {/* Local Raw Material Finder Modal */}
      <RawMaterialFinderModal
        lang={lang}
        isOpen={isRawMaterialModalOpen}
        onClose={() => setIsRawMaterialModalOpen(false)}
      />
    </div>
  );
};
