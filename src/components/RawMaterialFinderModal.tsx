/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  MapPin,
  Search,
  Store,
  Truck,
  PlusCircle,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Info,
  X,
  ExternalLink,
  ShieldCheck,
  Scale,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import {
  Language,
  WholesaleHub,
  MaterialQuotation,
  BudgetItemPlan
} from '../types';
import { verifiedWholesaleHubs } from '../data/wholesaleMarketsData';
import {
  compareQuotations,
  filterWholesaleHubs,
  transferItemsToBudgetPlan
} from '../utils/businessPlannerLogic';
import { formatCurrency } from '../utils/calculator';
import { translations } from '../data/translations';

interface RawMaterialFinderModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  defaultDistrict?: string;
  defaultCategory?: string;
  initialShoppingList?: BudgetItemPlan[];
  onNavigateToBudgetPlanner?: () => void;
}

export const RawMaterialFinderModal: React.FC<RawMaterialFinderModalProps> = ({
  lang,
  isOpen,
  onClose,
  defaultDistrict = 'all',
  defaultCategory = 'all',
  initialShoppingList = [],
  onNavigateToBudgetPlanner,
}) => {
  const t = translations[lang];

  const [activeTab, setActiveTab] = useState<'hubs' | 'quotations'>('hubs');
  const [selectedDistrict, setSelectedDistrict] = useState<string>(defaultDistrict);
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Multi-shop quotation comparison state
  const [quotations, setQuotations] = useState<MaterialQuotation[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_saved_quotations');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'quote-sample-1',
        shopName: lang === 'ta' ? 'அன்னை மளிகை மொத்த ஸ்டோர்' : 'Annai Wholesale Provisions',
        shopAddressOrPhone: 'MG Road, Puducherry (Near Goubert Market)',
        materialName: lang === 'ta' ? 'இட்லி புழுங்கல் அரிசி (25 கிலோ மூட்டை)' : 'Idli Boiled Rice (25kg sack)',
        quantity: 2,
        unit: 'sack',
        quotedPricePerUnit: 980,
        transportCost: 60,
        paymentTerms: 'upi_spot',
        notes: lang === 'ta' ? 'அருகில் உள்ள கடை, ஆட்டோ கட்டணம் குறைவு' : 'Nearby shop, low auto fare',
        isUserEntered: true,
      },
      {
        id: 'quote-sample-2',
        shopName: lang === 'ta' ? 'ஸ்ரீ குமரன் தானிய மண்டி' : 'Sri Kumaran Grain Mandi',
        shopAddressOrPhone: 'Villianur Main Road, Puducherry',
        materialName: lang === 'ta' ? 'இட்லி புழுங்கல் அரிசி (25 கிலோ மூட்டை)' : 'Idli Boiled Rice (25kg sack)',
        quantity: 2,
        unit: 'sack',
        quotedPricePerUnit: 920,
        transportCost: 280,
        paymentTerms: 'cash',
        notes: lang === 'ta' ? 'பொருள் விலை குறைவு ஆனால் தூரமான இடம்' : 'Lower bag price but higher auto delivery fee',
        isUserEntered: true,
      },
    ];
  });

  // Form states for new quote
  const [newShopName, setNewShopName] = useState('');
  const [newShopAddress, setNewShopAddress] = useState('');
  const [newMaterialName, setNewMaterialName] = useState('');
  const [newQty, setNewQty] = useState<number>(1);
  const [newUnit, setNewUnit] = useState<string>('kg');
  const [newPrice, setNewPrice] = useState<string>('');
  const [newTransport, setNewTransport] = useState<string>('0');
  const [newNotes, setNewNotes] = useState('');
  const [transferSuccessMsg, setTransferSuccessMsg] = useState<string | null>(null);

  // Save quotes to local storage
  const handleSaveQuotes = (updated: MaterialQuotation[]) => {
    setQuotations(updated);
    try {
      localStorage.setItem('sherise_saved_quotations', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleAddQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(newPrice);
    const transportNum = parseFloat(newTransport) || 0;
    if (!newShopName.trim() || !newMaterialName.trim() || isNaN(priceNum) || priceNum <= 0) {
      return;
    }

    const newQ: MaterialQuotation = {
      id: `quote-${Date.now()}`,
      shopName: newShopName.trim(),
      shopAddressOrPhone: newShopAddress.trim() || 'Local area',
      materialName: newMaterialName.trim(),
      quantity: newQty > 0 ? newQty : 1,
      unit: newUnit,
      quotedPricePerUnit: priceNum,
      transportCost: transportNum,
      notes: newNotes.trim() || undefined,
      isUserEntered: true,
    };

    const updated = [...quotations, newQ];
    handleSaveQuotes(updated);

    // Reset form
    setNewShopName('');
    setNewShopAddress('');
    setNewPrice('');
    setNewTransport('0');
    setNewNotes('');
  };

  const handleDeleteQuotation = (id: string) => {
    const updated = quotations.filter((q) => q.id !== id);
    handleSaveQuotes(updated);
  };

  const comparisonResult = useMemo(() => {
    return compareQuotations(quotations);
  }, [quotations]);

  // Filter wholesale hubs
  const filteredHubs = useMemo(() => {
    let result = filterWholesaleHubs(verifiedWholesaleHubs, selectedDistrict, selectedCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.nameTa.toLowerCase().includes(q) ||
          h.address.toLowerCase().includes(q) ||
          h.benchmarkMaterials.some((m) => m.materialName.toLowerCase().includes(q))
      );
    }
    return result;
  }, [selectedDistrict, selectedCategory, searchQuery]);

  // Transfer quotation or starter materials into Budget Planner
  const handleTransferToBudget = (itemsToTransfer: BudgetItemPlan[]) => {
    try {
      const savedStr = localStorage.getItem('sherise_budget_plan_items');
      const existing: BudgetItemPlan[] = savedStr ? JSON.parse(savedStr) : [];
      const merged = transferItemsToBudgetPlan(existing, itemsToTransfer);
      localStorage.setItem('sherise_budget_plan_items', JSON.stringify(merged));

      setTransferSuccessMsg(
        lang === 'ta'
          ? `${itemsToTransfer.length} பொருட்கள் பட்ஜெட் திட்டத்தில் சேர்க்கப்பட்டன!`
          : `${itemsToTransfer.length} item(s) transferred to Budget & Itemized Planner!`
      );

      try {
        confetti({ particleCount: 35, spread: 55, origin: { y: 0.6 } });
      } catch {
        // ignore
      }

      setTimeout(() => {
        setTransferSuccessMsg(null);
      }, 4000);
    } catch {
      // ignore
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="Local Raw Material Finder"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header Bar */}
        <div className="p-6 bg-gradient-to-r from-teal-700 via-emerald-700 to-teal-800 text-white rounded-t-3xl flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-xs">
                {lang === 'ta' ? 'நேரடி மூலப்பொருள் சந்தை வழிகாட்டி' : 'Sourcing & Quotation Engine'}
              </span>
              <span className="px-2.5 py-0.5 bg-amber-400 text-stone-900 rounded-full text-xs font-bold">
                100% Verified Benchmarks
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {lang === 'ta'
                ? 'உள்ளூர் மூலப்பொருள் & விலைப்புள்ளி ஒப்பீட்டாளர்'
                : 'Local Raw Material Finder & Multi-Shop Quote Comparison'}
            </h2>
            <p className="text-xs sm:text-sm text-teal-100 max-w-2xl">
              {lang === 'ta'
                ? 'புதுச்சேரி மற்றும் தமிழகத்தின் புகழ்பெற்ற மொத்த சந்தைகள், விலை நிலவரங்கள் மற்றும் கடைகளின் விலைகளை ஒப்பிட்டு சிறந்த டீலை தேர்வு செய்யுங்கள்.'
                : 'Explore verified wholesale mandi benchmarks in Puducherry & Tamil Nadu, or enter quotes from local shops to compare total landed costs.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle Navigation */}
        <div className="border-b border-stone-200 bg-stone-50 px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('hubs')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'hubs'
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>{lang === 'ta' ? 'அங்கீகரிக்கப்பட்ட மொத்த சந்தைகள்' : 'Verified Wholesale Hubs'}</span>
            </button>

            <button
              onClick={() => setActiveTab('quotations')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'quotations'
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>{lang === 'ta' ? 'கடைகளின் விலை ஒப்பீடு' : 'Compare Shop Quotations'} ({quotations.length})</span>
            </button>
          </div>

          {onNavigateToBudgetPlanner && (
            <button
              onClick={() => {
                onClose();
                onNavigateToBudgetPlanner();
              }}
              className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
            >
              <span>{lang === 'ta' ? 'பட்ஜெட் பிளானர் செல்ல' : 'Go to Budget Planner'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Toast / Transfer Notification */}
        {transferSuccessMsg && (
          <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs font-bold flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{transferSuccessMsg}</span>
            </div>
            {onNavigateToBudgetPlanner && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToBudgetPlanner();
                }}
                className="px-3 py-1 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 transition"
              >
                {lang === 'ta' ? 'பட்ஜெட்டில் பார்க்க →' : 'View in Budget →'}
              </button>
            )}
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          {/* TAB 1: VERIFIED WHOLESALE HUBS */}
          {activeTab === 'hubs' && (
            <div className="space-y-5">
              {/* Filter controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-stone-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    <span>{lang === 'ta' ? 'மாவட்டம்:' : 'District:'}</span>
                  </span>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="all">{lang === 'ta' ? 'அனைத்து மாவட்டங்கள் (All)' : 'All Districts'}</option>
                    <option value="Puducherry">Puducherry (புதுச்சேரி)</option>
                    <option value="Karaikal">Karaikal (காரைக்கால்)</option>
                    <option value="Chennai">Chennai (சென்னை)</option>
                    <option value="Madurai">Madurai (மதுரை)</option>
                    <option value="Coimbatore">Coimbatore (கோவை)</option>
                    <option value="Salem">Salem (சேலம்)</option>
                  </select>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-stone-700">
                    {lang === 'ta' ? 'வகை:' : 'Category:'}
                  </span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="all">{lang === 'ta' ? 'அனைத்து பொருட்கள்' : 'All Materials'}</option>
                    <option value="food_catering">Food & Provisions (உணவு & மளிகை)</option>
                    <option value="tailoring_garments">Tailoring & Textiles (தையல் & ஜவுளி)</option>
                    <option value="agriculture_poultry">Agri, Flowers & Poultry (விவசாயம், மலர்கள்)</option>
                    <option value="handicrafts_eco">Handicrafts & Packaging (பேக்கேஜிங்)</option>
                  </select>
                </div>

                <div className="relative flex-1 min-w-[180px]">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={lang === 'ta' ? 'சந்தை அல்லது பொருளை தேடுக...' : 'Search hub or material...'}
                    className="w-full pl-8 pr-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Wholesale Hubs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredHubs.map((hub) => (
                  <div
                    key={hub.id}
                    className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs hover:border-teal-300 transition space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-900 border border-teal-200 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-teal-600" />
                          <span>{hub.district} - {hub.town}</span>
                        </span>
                        <span className="text-[10px] text-stone-400 font-semibold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{hub.verifiedDate}</span>
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-stone-900 leading-snug">
                        {lang === 'ta' ? hub.nameTa : hub.name}
                      </h3>
                      <p className="text-[11px] text-stone-500 flex items-start gap-1">
                        <Store className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                        <span>{lang === 'ta' ? hub.addressTa : hub.address}</span>
                      </p>

                      {/* Benchmark Commodities Table */}
                      <div className="pt-2">
                        <span className="text-[11px] font-bold text-stone-700 block mb-1">
                          {lang === 'ta' ? 'மொத்த விலை வழிகாட்டுதல் (Wholesale Rates):' : 'Benchmark Wholesale Price Guide:'}
                        </span>
                        <div className="bg-stone-50 rounded-xl p-2.5 space-y-1.5 border border-stone-200/60 text-xs">
                          {hub.benchmarkMaterials.map((mat, idx) => (
                            <div key={idx} className="flex items-center justify-between text-[11px] border-b border-stone-100 pb-1 last:border-0 last:pb-0">
                              <span className="font-semibold text-stone-800">
                                {lang === 'ta' ? mat.materialNameTa : mat.materialName}
                              </span>
                              <div className="text-right">
                                <span className="font-bold text-teal-800 block">
                                  {mat.benchmarkWholesaleRate}
                                </span>
                                <span className="text-[9px] text-stone-400">
                                  Min lot: {mat.minLotSize}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pro tip */}
                      <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-[11px] text-emerald-950 flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{lang === 'ta' ? hub.contactOrLocationTipTa : hub.contactOrLocationTip}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[10px] text-stone-400 font-medium">
                        {hub.officialSourceOrNote}
                      </span>
                      <button
                        onClick={() => {
                          const budgetItems: BudgetItemPlan[] = hub.benchmarkMaterials.map((m, idx) => ({
                            id: `hub-item-${idx}`,
                            itemName: lang === 'ta' ? m.materialNameTa : m.materialName,
                            category: 'raw_material',
                            quantity: 1,
                            estimatedUnitCost: 500,
                            notes: `${hub.name} benchmark`,
                            sourceHubOrShop: hub.name,
                          }));
                          handleTransferToBudget(budgetItems);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-xl text-xs font-bold transition"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{lang === 'ta' ? 'பட்ஜெட்டில் சேர்' : 'Add to Budget'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredHubs.length === 0 && (
                <div className="text-center py-8 bg-stone-50 rounded-2xl p-4">
                  <p className="text-xs text-stone-500">
                    {lang === 'ta' ? 'இந்த வடிகட்டிக்கு மொத்த சந்தை எதுவும் கிடைக்கவில்லை.' : 'No wholesale hubs found for this filter.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MULTI-SHOP QUOTATION COMPARISON */}
          {activeTab === 'quotations' && (
            <div className="space-y-6">
              {/* Form to enter new quote */}
              <div className="bg-stone-50 rounded-3xl p-5 border border-stone-200 space-y-4">
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                  <PlusCircle className="w-4 h-4 text-teal-600" />
                  <span>
                    {lang === 'ta' ? 'புதிய கடை விலைப்புள்ளி சேர்க்க (Add Shop Quotation)' : 'Add Shop Quotation to Compare'}
                  </span>
                </h3>

                <form onSubmit={handleAddQuotation} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      {lang === 'ta' ? 'கடை பெயர்:' : 'Shop Name:'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={newShopName}
                      onChange={(e) => setNewShopName(e.target.value)}
                      placeholder={lang === 'ta' ? 'எ.கா: ராஜா மளிகை ஸ்டோர்' : 'e.g. Raja Provisions'}
                      className="w-full p-2 bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      {lang === 'ta' ? 'பொருள் பெயர்:' : 'Material Name:'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={newMaterialName}
                      onChange={(e) => setNewMaterialName(e.target.value)}
                      placeholder={lang === 'ta' ? 'எ.கா: இட்லி அரிசி (25 கிலோ)' : 'e.g. Idli Rice 25kg'}
                      className="w-full p-2 bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      {lang === 'ta' ? 'கடை முகவரி / தொலைபேசி:' : 'Shop Address / Phone:'}
                    </label>
                    <input
                      type="text"
                      value={newShopAddress}
                      onChange={(e) => setNewShopAddress(e.target.value)}
                      placeholder={lang === 'ta' ? 'ஊர் / தெரு / போன்' : 'Area / Street / Contact'}
                      className="w-full p-2 bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      {lang === 'ta' ? 'எண்ணிக்கை / அளவு:' : 'Quantity:'}
                    </label>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="1"
                        value={newQty}
                        onChange={(e) => setNewQty(parseInt(e.target.value) || 1)}
                        className="w-20 p-2 bg-white border border-stone-300 rounded-xl"
                      />
                      <select
                        value={newUnit}
                        onChange={(e) => setNewUnit(e.target.value)}
                        className="p-2 bg-white border border-stone-300 rounded-xl"
                      >
                        <option value="kg">kg (கிலோ)</option>
                        <option value="metre">metre (மீட்டர்)</option>
                        <option value="sack">sack / bag (மூட்டை)</option>
                        <option value="litre">litre (லிட்டர்)</option>
                        <option value="pcs">pcs (எண்ணிக்கை)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      {lang === 'ta' ? 'ஒரு யூனிட் விலை (₹):' : 'Quoted Unit Price (₹):'} *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      step="any"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="e.g. 950"
                      className="w-full p-2 bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      {lang === 'ta' ? 'போக்குவரத்து / ஆட்டோ கட்டணம் (₹):' : 'Delivery / Transport Cost (₹):'}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={newTransport}
                      onChange={(e) => setNewTransport(e.target.value)}
                      placeholder="e.g. 50"
                      className="w-full p-2 bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div className="sm:col-span-2 md:col-span-3 flex items-center justify-between pt-1">
                    <span className="text-[11px] text-stone-400">
                      {lang === 'ta' ? '* உள்ளிடப்பட்ட தகவல்கள் உங்கள் சாதனத்தில் மட்டுமே சேமிக்கப்படும்.' : '* User-entered quotes are kept safe locally on your device.'}
                    </span>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold transition shadow-xs flex items-center gap-1"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>{lang === 'ta' ? 'விலைப்புள்ளி சேர்க்க' : 'Add to Comparison'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Comparison Summary Card */}
              {quotations.length > 0 && (
                <div className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-900">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>{lang === 'ta' ? 'ஒப்பீட்டு முடிவு & ஸ்மார்ட் ஆலோசனை:' : 'Comparison Recommendation:'}</span>
                  </div>
                  <p className="text-xs font-semibold text-teal-950 leading-relaxed">
                    {lang === 'ta' ? comparisonResult.summaryAdviceTa : comparisonResult.summaryAdvice}
                  </p>
                </div>
              )}

              {/* Quotes Comparison Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    {lang === 'ta' ? 'ஒப்பிடப்பட்ட கடைகளின் பட்டியல்' : 'Quotation Cost Breakdown'}
                  </h4>
                  <span className="text-[11px] text-stone-500">
                    {quotations.length} {lang === 'ta' ? 'கடைகள்' : 'stores'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {quotations.map((q) => {
                    const analysis = comparisonResult.quotes.find((c) => c.id === q.id);
                    const isBest = analysis?.isBestDeal;

                    return (
                      <div
                        key={q.id}
                        className={`rounded-2xl p-4 border transition ${
                          isBest
                            ? 'bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-200'
                            : 'bg-white border-stone-200'
                        } space-y-3`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            {isBest && (
                              <span className="inline-block px-2.5 py-0.5 bg-emerald-600 text-white rounded-full text-[10px] font-bold mb-1">
                                🏆 {lang === 'ta' ? 'சிறந்த சிக்கன டீல் (Best Deal)' : 'Best Overall Value'}
                              </span>
                            )}
                            <h5 className="font-bold text-sm text-stone-900">{q.shopName}</h5>
                            <span className="text-[11px] text-stone-500 block">{q.shopAddressOrPhone}</span>
                          </div>

                          <button
                            onClick={() => handleDeleteQuotation(q.id)}
                            className="text-stone-300 hover:text-rose-600 transition"
                            title="Delete quote"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Breakdown */}
                        <div className="bg-white/80 rounded-xl p-3 border border-stone-200 text-xs space-y-1.5">
                          <div className="flex justify-between text-stone-600">
                            <span>{q.materialName} ({q.quantity} {q.unit})</span>
                            <span className="font-bold text-stone-900">₹{q.quotedPricePerUnit} / {q.unit}</span>
                          </div>
                          <div className="flex justify-between text-stone-600">
                            <span>{lang === 'ta' ? 'பொருள் மொத்த விலை:' : 'Material Subtotal:'}</span>
                            <span>{formatCurrency(analysis?.materialCost || 0, lang)}</span>
                          </div>
                          <div className="flex justify-between text-stone-600">
                            <span>{lang === 'ta' ? 'போக்குவரத்து / ஆட்டோ:' : 'Transport Cost:'}</span>
                            <span>{formatCurrency(q.transportCost, lang)}</span>
                          </div>
                          <div className="pt-1 border-t border-stone-200 flex justify-between font-bold text-stone-900">
                            <span>{lang === 'ta' ? 'மொத்த இறங்கு செலவு (Landed Cost):' : 'Total Landed Cost:'}</span>
                            <span className="text-teal-800 font-extrabold text-sm">
                              {formatCurrency(analysis?.totalLandedCost || 0, lang)}
                            </span>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center justify-between pt-1">
                          {analysis && analysis.savingsVsHighest > 0 ? (
                            <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                              <TrendingDown className="w-3.5 h-3.5" />
                              <span>{lang === 'ta' ? `₹${analysis.savingsVsHighest} மிச்சம்` : `Saves ₹${analysis.savingsVsHighest}`}</span>
                            </span>
                          ) : (
                            <span className="text-[10px] text-stone-400">
                              {lang === 'ta' ? 'உள்ளூர் விலைப்புள்ளி' : 'User quote'}
                            </span>
                          )}

                          <button
                            onClick={() => {
                              const item: BudgetItemPlan = {
                                id: `budget-from-quote-${Date.now()}`,
                                itemName: `${q.materialName} (${q.shopName})`,
                                category: 'raw_material',
                                quantity: q.quantity,
                                estimatedUnitCost: analysis?.effectiveUnitCost || q.quotedPricePerUnit,
                                notes: `From ${q.shopName} quotation`,
                                sourceHubOrShop: q.shopName,
                              };
                              handleTransferToBudget([item]);
                            }}
                            className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-2xs"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>{lang === 'ta' ? 'பட்ஜெட்டுக்கு மாற்று' : 'Send to Budget'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 rounded-b-3xl flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              {lang === 'ta'
                ? 'நேரடி சந்தை விலை நிலவரங்கள் மட்டுமே காட்டப்படுகின்றன • விற்பனையாளர் போலி விவரங்கள் இல்லை'
                : 'Direct verified benchmarks • Never fabricated • User quotes stored privately'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold rounded-xl transition"
          >
            {t.common.close}
          </button>
        </div>
      </div>
    </div>
  );
};
