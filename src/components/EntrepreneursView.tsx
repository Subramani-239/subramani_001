/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Store,
  Sparkles,
  Layers,
  MapPin,
  Tag,
  Phone,
  MessageCircle,
  PlusCircle,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  FileText,
  Boxes,
} from 'lucide-react';
import { EntrepreneurListing, Language, UserProfile } from '../types';
import { translations } from '../data/translations';

interface EntrepreneursViewProps {
  lang: Language;
  userProfile: UserProfile;
  onOpenRawMaterialFinder: () => void;
  onOpenBusinessGenerator: () => void;
  onNavigateToSchemes: () => void;
  onOpenChat: (contactId: string) => void;
}

export const EntrepreneursView: React.FC<EntrepreneursViewProps> = ({
  lang,
  userProfile,
  onOpenRawMaterialFinder,
  onOpenBusinessGenerator,
  onNavigateToSchemes,
  onOpenChat,
}) => {
  const t = translations[lang];

  const [activeSubTab, setActiveSubTab] = useState<'directory' | 'promote'>('directory');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Registered Women Entrepreneurs list in localStorage
  const [listings, setListings] = useState<EntrepreneurListing[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_entrepreneur_listings');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'ent-1',
        businessName: 'Shri Meenakshi Tailoring & Aari Studio',
        ownerName: 'Muthulakshmi R.',
        category: 'tailoring',
        description: 'Bridal blouse designing, Aari embroidery, custom fitting and alterations. Fast 48-hour delivery available.',
        location: 'Madurai (Simmakkal)',
        servicesOrProducts: ['Aari Bridal Blouses', 'Saree Kuchu / Tassels', 'Chudidar Stitching'],
        priceRange: '₹350 - ₹1,800',
        verifiedStatus: 'verified',
        contactPreference: 'in_app',
        rating: 4.9,
        reviewCount: 38,
      },
      {
        id: 'ent-2',
        businessName: 'Gomathi Home Spices & Pure Sambar Podi',
        ownerName: 'Gomathi Amma',
        category: 'food',
        description: 'Traditional wood-roasted coriander sambar podi, idli milagai podi, and garam masala without chemicals or preservatives.',
        location: 'Salem & Erode Delivery',
        servicesOrProducts: ['Pure Sambar Podi (250g)', 'Idli Chutney Podi', 'Curry Masala'],
        priceRange: '₹80 - ₹240',
        verifiedStatus: 'verified',
        contactPreference: 'in_app',
        rating: 4.95,
        reviewCount: 52,
      },
      {
        id: 'ent-3',
        businessName: 'Puducherry Eco Jute Crafts & Gift Bags',
        ownerName: 'Anandhi Selvam',
        category: 'crafts',
        description: 'Biodegradable laminated jute tote bags, conference document folders, and customized wedding return-gift pouches.',
        location: 'Puducherry (Heritage Town)',
        servicesOrProducts: ['Lunch Tote Bags', 'Wedding Return Gift Bags', 'File Folders'],
        priceRange: '₹60 - ₹180',
        verifiedStatus: 'verified',
        contactPreference: 'in_app',
        rating: 4.85,
        reviewCount: 29,
      },
    ];
  });

  // Promote form state
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState(userProfile.name || '');
  const [category, setCategory] = useState('tailoring');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(userProfile.location || 'Tamil Nadu');
  const [servicesInput, setServicesInput] = useState('');
  const [priceRange, setPriceRange] = useState('₹150 - ₹800');
  const [formSuccessNotice, setFormSuccessNotice] = useState(false);

  const handlePromoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !description.trim()) return;

    const newListing: EntrepreneurListing = {
      id: `ent-${Date.now()}`,
      businessName: businessName.trim(),
      ownerName: ownerName.trim(),
      category,
      description: description.trim(),
      location: location.trim(),
      servicesOrProducts: servicesInput
        ? servicesInput.split(',').map((s) => s.trim())
        : ['Custom Services'],
      priceRange: priceRange.trim(),
      verifiedStatus: 'verified',
      contactPreference: 'in_app',
      rating: 5.0,
      reviewCount: 1,
    };

    const updated = [newListing, ...listings];
    setListings(updated);
    try {
      localStorage.setItem('sherise_entrepreneur_listings', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setFormSuccessNotice(true);
    setTimeout(() => {
      setFormSuccessNotice(false);
      setActiveSubTab('directory');
    }, 2000);
  };

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.businessName.toLowerCase().includes(q) ||
          item.ownerName.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [listings, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-pink-700 to-rose-700 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2">
            <Store className="w-3.5 h-3.5 text-amber-300" />
            <span>
              {lang === 'ta'
                ? 'மகளிர் தொழில் முனைவோர் மையம்'
                : lang === 'hi'
                ? 'महिला उद्यमी केंद्र'
                : 'Women Entrepreneurs Hub'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            {lang === 'ta'
              ? 'உங்கள் தயாரிப்புகளை விளம்பரப்படுத்தி தொழிலை வளருங்கள்'
              : lang === 'hi'
              ? 'अपने व्यवसाय को बढ़ावा दें और नए अवसर खोजें'
              : 'Promote Your Products, Find Wholesalers & Grow Your Enterprise'}
          </h1>
          <p className="text-xs sm:text-sm text-pink-100 leading-relaxed">
            {lang === 'ta'
              ? 'உங்கள் தையல் கலை, உணவு தயாரிப்புகள், கைவினைப் பொருட்களை பிற தோழிகளிடம் காட்சிப்படுத்துங்கள்; குறைந்த விலையில் மூலப்பொருட்களைக் கண்டறியுங்கள்.'
              : lang === 'hi'
              ? 'अपने उत्पादों का प्रचार करें, थोक कच्चा माल खोजें और सरकारी एमएसएमई योजनाओं का लाभ उठाएं।'
              : 'Showcase your boutique, home food, or handicraft enterprise. Calculate raw material landed costs and access verified SHG enterprise schemes.'}
          </p>
        </div>
      </div>

      {/* Quick Tool Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={onOpenBusinessGenerator}
          className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs hover:shadow-md transition text-left flex items-start gap-3 group"
        >
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 text-xs">
              {lang === 'ta' ? 'தொழில் யோசனை கண்டுபிடி' : 'Business Idea Generator'}
            </h3>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Locality-based micro-business plans with fixed & variable cost estimates.
            </p>
          </div>
        </button>

        <button
          onClick={onOpenRawMaterialFinder}
          className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs hover:shadow-md transition text-left flex items-start gap-3 group"
        >
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition">
            <Boxes className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 text-xs">
              {lang === 'ta' ? 'மொத்த மூலப்பொருள் மையம்' : 'Wholesale Raw Material Finder'}
            </h3>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Find verified wholesale hubs and calculate landed unit cost with transport fees.
            </p>
          </div>
        </button>

        <button
          onClick={onNavigateToSchemes}
          className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs hover:shadow-md transition text-left flex items-start gap-3 group"
        >
          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-700 group-hover:bg-rose-600 group-hover:text-white transition">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 text-xs">
              {lang === 'ta' ? 'அரசு மானியங்கள் & கடன்கள்' : 'SHG Grants & Subsidies'}
            </h3>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Access UYEGP, NEEDS, PM-FME, and Puducherry SHG cluster financial aid.
            </p>
          </div>
        </button>
      </div>

      {/* Sub-Tabs: Directory vs Promote My Business */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveSubTab('directory')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold transition ${
            activeSubTab === 'directory'
              ? 'bg-purple-700 text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Women Businesses Directory ({listings.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('promote')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold transition ${
            activeSubTab === 'promote'
              ? 'bg-purple-700 text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Promote My Business / Service</span>
        </button>
      </div>

      {/* Sub-Tab 1: Directory */}
      {activeSubTab === 'directory' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Search bar */}
          <div className="bg-white rounded-3xl border border-stone-200 p-4 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search business name, spices, tailoring, jute bags, location..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-bold text-stone-600">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-1.5 bg-stone-50 border border-stone-200 rounded-lg font-semibold"
              >
                <option value="all">All Categories</option>
                <option value="tailoring">Tailoring & Boutiques</option>
                <option value="food">Homemade Food & Spices</option>
                <option value="crafts">Jute & Handicrafts</option>
              </select>
            </div>
          </div>

          {/* Business Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredListings.map((business) => (
              <div
                key={business.id}
                className="bg-white rounded-3xl border border-stone-200 p-5 shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200 uppercase">
                      {business.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified Business</span>
                    </span>
                  </div>

                  <h3 className="font-bold text-stone-900 text-base leading-snug">
                    {business.businessName}
                  </h3>

                  <p className="text-xs text-stone-500">
                    Proprietor: <strong className="text-stone-700">{business.ownerName}</strong> • {business.location}
                  </p>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {business.description}
                  </p>

                  {/* Services/Products */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {business.servicesOrProducts.map((p, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] font-semibold"
                      >
                        {p}
                      </span>
                    ))}
                  </div>

                  <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-xs flex items-center justify-between">
                    <span className="text-stone-500">Price Range:</span>
                    <strong className="text-emerald-700">{business.priceRange}</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => onOpenChat('contact-trainer-1')}
                    className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>In-App Inquiry</span>
                  </button>

                  <span className="text-[11px] text-stone-400">
                    ⭐ {business.rating || 4.9} ({business.reviewCount || 10})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Promote My Business */}
      {activeSubTab === 'promote' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-2xs max-w-2xl mx-auto space-y-5 animate-fadeIn">
          <div>
            <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <Store className="w-5 h-5 text-purple-600" />
              <span>Promote Your Venture on SHERISE</span>
            </h2>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Listing your skills or small business helps other women and local customers discover your products. Keep contact details private or communicate via safe in-app chat.
            </p>
          </div>

          {formSuccessNotice && (
            <div className="p-3 bg-emerald-100 text-emerald-950 rounded-2xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Business listing successfully saved to marketplace!</span>
            </div>
          )}

          <form onSubmit={handlePromoteSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Business / Brand Name:
              </label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Kamala Traditional Idli Podi & Masala"
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Owner / Entrepreneur Name:
                </label>
                <input
                  type="text"
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

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
                  <option value="food">Homemade Food & Snacks</option>
                  <option value="crafts">Jute & Handicrafts</option>
                  <option value="digital">Digital & e-Sevai Service</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Location & Service Area:
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Madurai, Tamil Nadu (Home delivery within 5 km)"
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Products or Services Offered (Comma separated):
              </label>
              <input
                type="text"
                value={servicesInput}
                onChange={(e) => setServicesInput(e.target.value)}
                placeholder="e.g. 250g Sambar Podi, Idli Podi, Garam Masala"
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Typical Price Range (₹):
                </label>
                <input
                  type="text"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  placeholder="e.g. ₹150 - ₹500"
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Safe Contact Preference:
                </label>
                <select
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-medium"
                  defaultValue="in_app"
                >
                  <option value="in_app">Safe In-App Chat (Keep Phone Private)</option>
                  <option value="phone">Share WhatsApp / Phone on Request</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Short Description of Quality & Specialty:
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your ingredients, hygiene, experience, or custom designs..."
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
              />
            </div>

            <div className="pt-2 text-right">
              <button
                type="submit"
                className="px-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl shadow-xs transition"
              >
                Publish Business Listing
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
