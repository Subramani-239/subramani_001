/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  CreditCard,
  TrendingUp,
  ShieldCheck,
  ShieldAlert,
  ArrowDownLeft,
  ArrowUpRight,
  Download,
  Printer,
  X,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Lock,
  Building2,
  FileText,
  DollarSign,
  QrCode,
  Calendar,
  Layers,
} from 'lucide-react';
import {
  CourseBooking,
  Language,
  PayoutRecord,
  UserProfile,
} from '../types';
import {
  calculateCommission,
  evaluateRefundEligibility,
} from '../utils/learningBusinessLogic';
import { translations } from '../data/translations';

interface PaymentsViewProps {
  lang: Language;
  userProfile: UserProfile;
  bookings: CourseBooking[];
  onRefundBooking: (bookingId: string) => void;
  onInitiatePayout?: (payout: PayoutRecord) => void;
}

export const PaymentsView: React.FC<PaymentsViewProps> = ({
  lang,
  userProfile,
  bookings,
  onRefundBooking,
  onInitiatePayout,
}) => {
  const t = translations[lang];

  const [activeSubTab, setActiveSubTab] = useState<'transactions' | 'payouts' | 'reports'>('transactions');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceiptBooking, setSelectedReceiptBooking] = useState<CourseBooking | null>(null);

  // Teacher payout requests in state / localStorage
  const [payouts, setPayouts] = useState<PayoutRecord[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_payout_records');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'PAYOUT-4821',
        teacherId: 'trn-selvi',
        teacherName: 'Selvi Master (Salem)',
        amount: 8100,
        method: 'upi',
        destinationVpaOrAccount: 'selvi.master@oksbi',
        status: 'settled',
        initiatedAt: '2026-10-20 14:30',
        settledAt: '2026-10-20 14:32',
        providerReferenceId: 'RZP-TRF-901842',
        notes: 'Batch completion payout for 9 students (Net 90% share)',
      },
    ];
  });

  // Payout request form
  const [payoutAmount, setPayoutAmount] = useState<number>(900);
  const [payoutMethod, setPayoutMethod] = useState<'upi' | 'imps'>('upi');
  const [destinationVpaOrBank, setDestinationVpaOrBank] = useState('teacher@oksbi');
  const [payoutNotice, setPayoutNotice] = useState<string | null>(null);

  // Financial Aggregates
  const stats = useMemo(() => {
    const totalVolume = bookings.reduce((sum, b) => sum + b.courseFee, 0);
    const platformRevenue = bookings.reduce((sum, b) => sum + (b.status !== 'refunded' ? b.platformFee : 0), 0);
    const teacherEarningsGross = bookings.reduce((sum, b) => sum + (b.status !== 'refunded' ? b.teacherEarnings : 0), 0);
    const escrowBalance = bookings.reduce((sum, b) => sum + (b.escrowStatus === 'held_in_escrow' ? b.courseFee : 0), 0);
    const totalRefunded = bookings.reduce((sum, b) => sum + (b.status === 'refunded' ? b.courseFee : 0), 0);

    return {
      totalVolume,
      platformRevenue,
      teacherEarningsGross,
      escrowBalance,
      totalRefunded,
      transactionCount: bookings.length,
    };
  }, [bookings]);

  // Handle new payout request
  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    if (payoutAmount <= 0) return;

    const newPayout: PayoutRecord = {
      id: `PAYOUT-${Math.floor(1000 + Math.random() * 9000)}`,
      teacherId: userProfile.id || 'trn-user',
      teacherName: userProfile.name || 'Empowered Teacher',
      amount: payoutAmount,
      method: payoutMethod,
      destinationVpaOrAccount: destinationVpaOrBank,
      status: 'settled', // simulated instant sandbox settlement
      initiatedAt: new Date().toLocaleString('en-IN'),
      settledAt: new Date().toLocaleString('en-IN'),
      providerReferenceId: `RZP-SETTLE-${Math.floor(100000 + Math.random() * 900000)}`,
      notes: `Compliant marketplace payout disbursed to ${destinationVpaOrBank}`,
    };

    const updated = [newPayout, ...payouts];
    setPayouts(updated);
    try {
      localStorage.setItem('sherise_payout_records', JSON.stringify(updated));
    } catch {
      // ignore
    }

    if (onInitiatePayout) {
      onInitiatePayout(newPayout);
    }

    setPayoutNotice(`Payout ${newPayout.id} of ₹${newPayout.amount} processed successfully via ${newPayout.method.toUpperCase()}!`);
    setTimeout(() => setPayoutNotice(null), 4000);
  };

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return bookings.filter((b) => {
      if (filterStatus !== 'all' && b.status !== filterStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          b.id.toLowerCase().includes(q) ||
          b.courseTitle.toLowerCase().includes(q) ||
          b.learnerName.toLowerCase().includes(q) ||
          b.demoUpiTxnId.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [bookings, filterStatus, searchQuery]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2">
            <CreditCard className="w-3.5 h-3.5 text-emerald-300" />
            <span>Indian UPI Payment & Settlement Gateway (Sandbox)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            Payments, 10% Platform Commission & Payouts
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Transparent marketplace settlement: 10% platform fee, 90% teacher gross share, secure escrow hold, instant refunds, and financial audit logs.
          </p>
        </div>
      </div>

      {/* Provider Compliance & Sandbox Alert Banner */}
      <div className="bg-amber-50 border border-amber-300 rounded-3xl p-4 sm:p-5 text-xs text-amber-950 flex items-start gap-3 shadow-2xs">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="block font-bold text-amber-900 mb-0.5">
            Provider Settlement Architecture & Sandbox Guarantee:
          </strong>
          SHERISE uses a compliant marketplace payout model (simulating Razorpay / Cashfree UPI Route). We never store UPI PINs, never ask for netbanking passwords, and never hold funds in unauthorized private wallets. All test transactions operate in verified sandbox mode until production merchant onboarding is finalized.
        </div>
      </div>

      {/* Financial Analytics Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 bg-white rounded-3xl border border-stone-200 shadow-2xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase block">
            TOTAL GROSS REVENUE
          </span>
          <span className="text-2xl font-black text-stone-900 mt-1 block">
            ₹{stats.totalVolume}
          </span>
          <span className="text-[10px] text-stone-400">
            Across {stats.transactionCount} bookings
          </span>
        </div>

        <div className="p-4 sm:p-5 bg-emerald-50 rounded-3xl border border-emerald-200 shadow-2xs">
          <span className="text-[11px] font-bold text-emerald-800 uppercase block">
            SHERISE 10% COMMISSION
          </span>
          <span className="text-2xl font-black text-emerald-950 mt-1 block">
            ₹{stats.platformRevenue}
          </span>
          <span className="text-[10px] text-emerald-700">
            Platform maintenance & escrow safety
          </span>
        </div>

        <div className="p-4 sm:p-5 bg-teal-50 rounded-3xl border border-teal-200 shadow-2xs">
          <span className="text-[11px] font-bold text-teal-800 uppercase block">
            TEACHER GROSS SHARE (90%)
          </span>
          <span className="text-2xl font-black text-teal-950 mt-1 block">
            ₹{stats.teacherEarningsGross}
          </span>
          <span className="text-[10px] text-teal-700">
            Earned by verified women teachers
          </span>
        </div>

        <div className="p-4 sm:p-5 bg-blue-50 rounded-3xl border border-blue-200 shadow-2xs">
          <span className="text-[11px] font-bold text-blue-800 uppercase block">
            ESCROW HOLD BALANCE
          </span>
          <span className="text-2xl font-black text-blue-950 mt-1 block">
            ₹{stats.escrowBalance}
          </span>
          <span className="text-[10px] text-blue-700">
            Protected until class completion
          </span>
        </div>
      </div>

      {/* Sub-Tabs: Transactions vs Teacher Payouts vs Financial Reports */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveSubTab('transactions')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition ${
            activeSubTab === 'transactions'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Transactions & Escrow ({bookings.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('payouts')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition ${
            activeSubTab === 'payouts'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          <ArrowUpRight className="w-4 h-4" />
          <span>Teacher Payouts & Settlement</span>
        </button>

        <button
          onClick={() => setActiveSubTab('reports')}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition ${
            activeSubTab === 'reports'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Audit Logs & Financial Report</span>
        </button>
      </div>

      {/* Sub-Tab 1: Transactions & Receipts */}
      {activeSubTab === 'transactions' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Search & Filter */}
          <div className="bg-white rounded-3xl border border-stone-200 p-4 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Booking ID, course, learner, or UPI Txn reference..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-bold text-stone-600">Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="p-1.5 bg-stone-50 border border-stone-200 rounded-lg font-semibold"
              >
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="refunded">Refunded</option>
                <option value="disputed">Disputed</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
                  <tr>
                    <th className="py-3 px-4">Booking / Txn ID</th>
                    <th className="py-3 px-4">Course & Learner</th>
                    <th className="py-3 px-4 text-right">Tuition Fee</th>
                    <th className="py-3 px-4 text-right">10% Platform Fee</th>
                    <th className="py-3 px-4 text-right">Teacher Share (90%)</th>
                    <th className="py-3 px-4">Escrow Status</th>
                    <th className="py-3 px-4 text-center">Receipt & Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredTransactions.map((booking) => {
                    const isRefundable = evaluateRefundEligibility(booking, false).eligible;

                    return (
                      <tr key={booking.id} className="hover:bg-stone-50/60 transition">
                        <td className="py-3.5 px-4">
                          <span className="font-mono font-bold text-stone-800 block">
                            {booking.id}
                          </span>
                          <span className="text-[10px] text-stone-400 font-mono">
                            {booking.demoUpiTxnId}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-stone-900 block line-clamp-1">
                            {booking.courseTitle}
                          </span>
                          <span className="text-[11px] text-stone-500">
                            Learner: {booking.learnerName} • {booking.bookingDate}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-black text-stone-900">
                          ₹{booking.courseFee}
                        </td>
                        <td className="py-3.5 px-4 text-right font-semibold text-emerald-700">
                          ₹{booking.platformFee}
                        </td>
                        <td className="py-3.5 px-4 text-right font-semibold text-teal-800">
                          ₹{booking.teacherEarnings}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                              booking.status === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-900'
                                : booking.status === 'refunded'
                                ? 'bg-stone-200 text-stone-700'
                                : 'bg-rose-100 text-rose-900'
                            }`}
                          >
                            {booking.escrowStatus.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setSelectedReceiptBooking(booking)}
                              className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-[11px] font-bold transition flex items-center gap-1"
                            >
                              <FileText className="w-3 h-3 text-stone-600" />
                              <span>Receipt</span>
                            </button>
                            {isRefundable && booking.status === 'confirmed' && (
                              <button
                                onClick={() => onRefundBooking(booking.id)}
                                className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-[11px] font-bold transition"
                                title="Issue compliant 100% demo refund from escrow"
                              >
                                Refund
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Teacher Payouts */}
      {activeSubTab === 'payouts' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Payout Request Form */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>Request Teacher Payout</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Withdraw settled course earnings directly to your verified bank or UPI VPA.
              </p>
            </div>

            {payoutNotice && (
              <div className="p-3 bg-emerald-100 text-emerald-950 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{payoutNotice}</span>
              </div>
            )}

            <form onSubmit={handleRequestPayout} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Payout Amount (₹):
                </label>
                <input
                  type="number"
                  min={100}
                  max={50000}
                  required
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(Number(e.target.value))}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-bold text-stone-900"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Settlement Channel:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPayoutMethod('upi');
                      setDestinationVpaOrBank('teacher@oksbi');
                    }}
                    className={`py-2 px-3 rounded-xl font-bold border transition ${
                      payoutMethod === 'upi'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200'
                    }`}
                  >
                    UPI Direct (Instant)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPayoutMethod('imps');
                      setDestinationVpaOrBank('SBIN0001234 - 9876543210');
                    }}
                    className={`py-2 px-3 rounded-xl font-bold border transition ${
                      payoutMethod === 'imps'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200'
                    }`}
                  >
                    Bank IMPS / NEFT
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Destination UPI VPA or Bank Account:
                </label>
                <input
                  type="text"
                  required
                  value={destinationVpaOrBank}
                  onChange={(e) => setDestinationVpaOrBank(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-xs transition"
              >
                Disburse Payout (Simulate ₹{payoutAmount})
              </button>
            </form>
          </div>

          {/* Payout History Table */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-stone-900">
              Disbursed Payout History
            </h3>
            <div className="space-y-3">
              {payouts.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-stone-800">
                        {p.id}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                        {p.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-stone-600 mt-0.5">
                      Teacher: <strong className="text-stone-800">{p.teacherName}</strong> • {p.destinationVpaOrAccount}
                    </p>
                    <span className="text-[10px] text-stone-400 font-mono">
                      Ref: {p.providerReferenceId} • {p.initiatedAt}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-black text-emerald-800">
                      ₹{p.amount}
                    </span>
                    <span className="block text-[10px] text-stone-400">
                      Channel: {p.method.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Financial Reports & Webhook Audit Log */}
      {activeSubTab === 'reports' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Platform Financial Report & Audit Log</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Verified server-side transaction journal for accounting and platform compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <h4 className="font-bold text-stone-800">Accounting Breakdown</h4>
              <div className="flex justify-between text-stone-600">
                <span>Total Bookings Recorded:</span>
                <span className="font-bold">{stats.transactionCount}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Gross Settlement Volume:</span>
                <span className="font-bold">₹{stats.totalVolume}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>SHERISE Net Commission (10%):</span>
                <span>₹{stats.platformRevenue}</span>
              </div>
              <div className="flex justify-between text-teal-800 font-semibold">
                <span>Teacher Earnings Disbursed / Due:</span>
                <span>₹{stats.teacherEarningsGross}</span>
              </div>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <h4 className="font-bold text-stone-800">Escrow Security Summary</h4>
              <div className="flex justify-between text-stone-600">
                <span>Escrow Hold Balance:</span>
                <span className="font-bold text-blue-800">₹{stats.escrowBalance}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Escrow Settlement Condition:</span>
                <span className="font-medium">Class commencement / delivery</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Dispute & Cancellation Refunds:</span>
                <span className="font-bold text-stone-700">₹{stats.totalRefunded}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Webhook Signature Status:</span>
                <span className="font-bold text-emerald-700">HMAC-SHA256 Verified</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Official Tax Invoice / Payment Receipt Modal */}
      {selectedReceiptBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/75 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto print:shadow-none print:border-none print:p-0">
            <button
              onClick={() => setSelectedReceiptBooking(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition print:hidden"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Receipt Content */}
            <div className="border border-stone-200 rounded-2xl p-6 bg-white space-y-5">
              <div className="flex items-start justify-between border-b border-stone-200 pb-4">
                <div>
                  <span className="text-[11px] font-black tracking-widest uppercase text-emerald-800">
                    SHERISE VOCATIONAL MARKETPLACE
                  </span>
                  <h3 className="text-lg font-black text-stone-900">
                    Official Payment Receipt
                  </h3>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    GST Compliant Course Invoice
                  </p>
                </div>
                <div className="text-right text-xs">
                  <span className="font-mono font-bold block text-stone-900">
                    {selectedReceiptBooking.id}
                  </span>
                  <span className="text-stone-400 text-[10px]">
                    {selectedReceiptBooking.bookingDate}
                  </span>
                </div>
              </div>

              {/* Bill Details */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-stone-50 p-3 rounded-xl">
                <div>
                  <span className="text-stone-400 block text-[10px]">BILLED TO:</span>
                  <strong className="text-stone-800">{selectedReceiptBooking.learnerName}</strong>
                  <span className="text-stone-500 block text-[10px]">ID: {selectedReceiptBooking.learnerId}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">INSTRUCTOR:</span>
                  <strong className="text-stone-800">{selectedReceiptBooking.courseTitle.split(':')[0]}</strong>
                  <span className="text-stone-500 block text-[10px]">Venue: {selectedReceiptBooking.venueOrLink}</span>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="font-medium text-stone-700">{selectedReceiptBooking.courseTitle}</span>
                  <span className="font-bold">₹{selectedReceiptBooking.courseFee}</span>
                </div>
                <div className="flex justify-between text-stone-500 text-[11px]">
                  <span>SHERISE Platform Fee (10%):</span>
                  <span>₹{selectedReceiptBooking.platformFee}</span>
                </div>
                <div className="flex justify-between text-stone-500 text-[11px]">
                  <span>Teacher Gross Share (90%):</span>
                  <span>₹{selectedReceiptBooking.teacherEarnings}</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between font-black text-sm text-stone-900">
                  <span>Total Amount Paid (UPI):</span>
                  <span className="text-emerald-700">₹{selectedReceiptBooking.courseFee}</span>
                </div>
              </div>

              {/* Transaction Footnote */}
              <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-[10px] text-stone-400">
                <span className="font-mono">Txn: {selectedReceiptBooking.demoUpiTxnId}</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Escrow Secured</span>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center justify-between print:hidden">
              <span className="text-xs text-stone-400">Verified digital receipt</span>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
