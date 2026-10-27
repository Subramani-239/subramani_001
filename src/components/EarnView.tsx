/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  ArrowRight,
  Phone,
  MessageCircle,
  Sparkles,
  ExternalLink,
  DollarSign,
  ShieldCheck,
} from 'lucide-react';
import { JobListing, Language, UserProfile } from '../types';
import { translations } from '../data/translations';

interface EarnViewProps {
  lang: Language;
  userProfile: UserProfile;
  onNavigateToBusinessGenerator: () => void;
  onNavigateToSchemes: () => void;
  onOpenChat: (contactId: string) => void;
}

const sampleJobListings: JobListing[] = [
  {
    id: 'job-1',
    title: 'Custom Blouse & Chudidar Stitching Contract (Batch of 25)',
    titleTa: 'ஜாக்கெட் & சுடிதார் தைக்கும் மொத்த ஆர்டர் (25 துணிகள்)',
    titleHi: 'ब्लाउज एवं सलवार सूट सिलाई थोक आर्डर (25 पीस)',
    type: 'freelance_order',
    category: 'tailoring',
    pay: '₹250 - ₹350 per blouse (Total: ₹7,500)',
    payTa: 'ஒரு ஜாக்கெட்டுக்கு ₹250 முதல் ₹350 (மொத்தம்: ₹7,500)',
    location: 'Salem & Surrounding Villages (Home Pickup available)',
    timing: 'Flexible (10 Days Delivery)',
    verifiedBySherise: true,
    requirements: [
      'Must have home sewing machine in working condition',
      'Knowledge of 4-dart blouse cutting and neat piping finish',
      'Cloth material provided by boutique contractor',
    ],
    contactMethod: 'contact-trainer-1',
    postedDate: 'Today',
  },
  {
    id: 'job-2',
    title: 'Daily Meal Tiffin Service for Working Women Hostel',
    titleTa: 'பணிபுரியும் பெண்கள் விடுதிக்கு மதிய உணவு தயாரிப்பு',
    titleHi: 'कामकाजी महिलाओं के हॉस्टल के लिए दोपहर भोजन टिफिन',
    type: 'self_employment',
    category: 'cooking_catering',
    pay: '₹8,500 - ₹16,000 monthly net profit',
    payTa: 'மாதம் ₹8,500 முதல் ₹16,000 வரை நிகர வருமானம்',
    location: 'Madurai Town / Anna Nagar',
    timing: 'Morning 7:30 AM - 10:30 AM',
    verifiedBySherise: true,
    requirements: [
      'Basic hygienic home kitchen setup',
      'Traditional South Indian meals (Sambar, Rasam, 1 Poriyal, Rice)',
      'SHG group members preferred',
    ],
    contactMethod: 'contact-trainer-1',
    postedDate: '2 days ago',
  },
  {
    id: 'job-3',
    title: 'e-Sevai Citizen Application Assistant & Digital Kiosk',
    titleTa: 'கிராமப்புற இ-சேவை அரசு நலத்திட்ட விண்ணப்ப உதவியாளர்',
    titleHi: 'ई-सेवा केंद्र नागरिक कल्याण योजना आवेदन सहायक',
    type: 'micro_task',
    category: 'digital_esevai',
    pay: '₹60 - ₹120 per government scheme application',
    payTa: 'ஒரு விண்ணப்பத்திற்கு ₹60 முதல் ₹120 வரை சேவை கட்டணம்',
    location: 'Puducherry & Rural Tamil Nadu',
    timing: 'Self-scheduled (2-3 hrs/day)',
    verifiedBySherise: true,
    requirements: [
      'Android smartphone with active internet connection',
      'Basic reading proficiency in Tamil or English',
      'Trained in SHERISE Digital Literacy module',
    ],
    contactMethod: 'contact-mentor-1',
    postedDate: 'Yesterday',
  },
  {
    id: 'job-4',
    title: 'Eco-Friendly Jute Bag Stitching & Return Gift Orders',
    titleTa: 'சுற்றுச்சூழல் சணல் பைகள் தயாரிப்பு - திருமண தாம்பூல ஆர்டர்',
    titleHi: 'पर्यावरण-अनुकूल जूट बैग निर्माण - शादी रिटर्न गिफ्ट आर्डर',
    type: 'freelance_order',
    category: 'handicrafts',
    pay: '₹75 per bag (Batch of 100 bags = ₹7,500)',
    payTa: 'ஒரு பைக்கு ₹75 (100 பைகளுக்கு ₹7,500 கூலி)',
    location: 'Coimbatore & Puducherry',
    timing: 'Flexible work from home',
    verifiedBySherise: true,
    requirements: [
      'Heavy-duty sewing needle (No. 18 or 21)',
      'Handle attachment cross-box stitch practice',
      'Pre-cut jute panels delivered to your doorstep',
    ],
    contactMethod: 'contact-trainer-1',
    postedDate: '3 days ago',
  },
];

export const EarnView: React.FC<EarnViewProps> = ({
  lang,
  userProfile,
  onNavigateToBusinessGenerator,
  onNavigateToSchemes,
  onOpenChat,
}) => {
  const t = translations[lang];

  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedListings, setAppliedListings] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_applied_jobs');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });
  const [applyModalListing, setApplyModalListing] = useState<JobListing | null>(null);

  const handleApply = (listing: JobListing) => {
    const updated = [...appliedListings, listing.id];
    setAppliedListings(updated);
    try {
      localStorage.setItem('sherise_applied_jobs', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setApplyModalListing(null);
  };

  const filteredListings = useMemo(() => {
    return sampleJobListings.filter((job) => {
      if (filterType !== 'all' && job.type !== filterType) return false;
      if (filterCategory !== 'all' && job.category !== filterCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          job.title.toLowerCase().includes(q) ||
          job.titleTa.toLowerCase().includes(q) ||
          job.location.toLowerCase().includes(q) ||
          job.pay.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [filterType, filterCategory, searchQuery]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-rose-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2">
            <Briefcase className="w-3.5 h-3.5 text-amber-300" />
            <span>
              {lang === 'ta'
                ? 'நேரடி வருவாய் & வீட்டு வேலைவாய்ப்புகள்'
                : lang === 'hi'
                ? 'प्रत्यक्ष कमाई एवं घर से काम के अवसर'
                : 'Verified Earning & Self-Employment Opportunities'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            {lang === 'ta'
              ? 'உங்கள் திறமையால் வீட்டில் இருந்தபடியே சம்பாதியுங்கள்'
              : lang === 'hi'
              ? 'अपने हुनर से घर बैठे सम्मानजनक आमदनी पाएं'
              : 'Earn Dignified Income from Home with Your Skills'}
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
            {lang === 'ta'
              ? 'தையல் ஒப்பந்த ஆர்டர்கள், மதிய உணவு கேட்டரிங், இ-சேவை வழிகாட்டல் மற்றும் கைவினை தயாரிப்புகளுக்கான சரிபார்க்கப்பட்ட வேலைகள்.'
              : lang === 'hi'
              ? 'सिलाई थोक आर्डर, भोजन टिफिन सेवा, ई-सेवा नागरिक सहायता और हस्तशिल्प के लिए सत्यापित आर्डर एवं काम।'
              : 'Verified contract orders, home catering batches, digital e-Sevai tasks, and craft orders connecting women directly to customers.'}
          </p>
        </div>
      </div>

      {/* Honest Income Policy Notice */}
      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 text-xs text-amber-950 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="block font-bold text-amber-900 mb-0.5">
            Transparent Livelihood Guarantee:
          </strong>
          SHERISE connects women to genuine buyers, boutiques, and organizations. We never charge job-application fees, never ask for deposits, and do not promise unrealistically inflated salaries. Payouts are made directly for completed work.
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl border border-stone-200 p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders, stitching batches, tiffin catering, district..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-bold text-stone-600 shrink-0">Type:</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="p-1.5 bg-stone-50 border border-stone-200 rounded-lg font-semibold"
            >
              <option value="all">All Types</option>
              <option value="freelance_order">Freelance Orders</option>
              <option value="self_employment">Self-Employment</option>
              <option value="micro_task">Micro Tasks (e-Sevai)</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-bold text-stone-600 shrink-0">Category:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-1.5 bg-stone-50 border border-stone-200 rounded-lg font-semibold"
            >
              <option value="all">All Trades</option>
              <option value="tailoring">Tailoring</option>
              <option value="cooking_catering">Cooking / Catering</option>
              <option value="digital_esevai">Digital e-Sevai</option>
              <option value="handicrafts">Handicrafts</option>
            </select>
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredListings.map((listing) => {
          const isApplied = appliedListings.includes(listing.id);

          return (
            <div
              key={listing.id}
              className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 uppercase tracking-wide">
                    {listing.type.replace(/_/g, ' ')}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Opportunity</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-stone-900 leading-snug">
                  {lang === 'ta' ? listing.titleTa : listing.title}
                </h3>

                {/* Pay rate banner */}
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs">
                  <span className="text-[10px] text-emerald-700 font-bold block uppercase">
                    ESTIMATED EARNINGS / PAYOUT:
                  </span>
                  <span className="font-extrabold text-emerald-950 text-sm">
                    {lang === 'ta' ? listing.payTa : listing.pay}
                  </span>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-2 text-xs text-stone-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">{listing.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">{listing.timing}</span>
                  </div>
                </div>

                {/* Requirements */}
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-stone-700 block text-[11px]">
                    Requirements:
                  </span>
                  <ul className="space-y-1">
                    {listing.requirements.map((req, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-1.5 text-stone-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => onOpenChat(listing.contactMethod)}
                  className="text-xs font-bold text-purple-700 hover:underline flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Ask Coordinator</span>
                </button>

                {isApplied ? (
                  <span className="px-4 py-2 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-xl border border-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Interest Registered</span>
                  </span>
                ) : (
                  <button
                    onClick={() => setApplyModalListing(listing)}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5"
                  >
                    <span>Claim Order / Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Application */}
      {applyModalListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full border border-stone-200 shadow-2xl p-6 relative space-y-4">
            <h3 className="text-base font-bold text-stone-900">
              Apply for {applyModalListing.title}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Your registered profile ({userProfile.name}, {userProfile.location}) will be shared with the contractor/coordinator. You will receive material details and pickup schedule inside your in-app chat.
            </p>
            <div className="p-3 bg-stone-50 rounded-xl text-xs space-y-1">
              <span className="font-bold text-stone-700">Estimated Earnings:</span>
              <p className="text-emerald-700 font-bold">{applyModalListing.pay}</p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setApplyModalListing(null)}
                className="px-4 py-2 border border-stone-300 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleApply(applyModalListing)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs"
              >
                Confirm Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
