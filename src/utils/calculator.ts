/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../types';

/**
 * Calculates monthly EMI for Self Help Group (SHG) / Mudra / Micro-finance loans.
 * @param principal Loan amount in ₹
 * @param annualInterestRate Annual interest rate in percent (e.g. 7 for 7%)
 * @param tenureMonths Number of repayment months
 */
export function calculateShgEmi(
  principal: number,
  annualInterestRate: number,
  tenureMonths: number
): { monthlyEmi: number; totalInterest: number; totalAmount: number } {
  if (principal <= 0 || tenureMonths <= 0) {
    return { monthlyEmi: 0, totalInterest: 0, totalAmount: 0 };
  }

  if (annualInterestRate <= 0) {
    const monthlyEmi = Math.round(principal / tenureMonths);
    return {
      monthlyEmi,
      totalInterest: 0,
      totalAmount: principal,
    };
  }

  const monthlyRate = annualInterestRate / (12 * 100);
  const emiFactor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principal * monthlyRate * emiFactor) / (emiFactor - 1);
  const monthlyEmi = Math.round(emi);
  const totalAmount = Math.round(monthlyEmi * tenureMonths);
  const totalInterest = Math.max(0, totalAmount - principal);

  return {
    monthlyEmi,
    totalInterest,
    totalAmount,
  };
}

/**
 * Calculates monthly net business profit, margin percentage, and recommended safety savings.
 */
export function calculateBusinessProfit(
  monthlyRevenue: number,
  rawMaterialCost: number,
  operatingCost: number,
  loanEmi: number = 0
): {
  totalExpenses: number;
  netProfit: number;
  profitMarginPercent: number;
  emergencySavingsRecommendation: number;
} {
  const totalExpenses = Math.max(0, rawMaterialCost + operatingCost + loanEmi);
  const netProfit = monthlyRevenue - totalExpenses;
  const profitMarginPercent =
    monthlyRevenue > 0 ? Math.round((netProfit / monthlyRevenue) * 100) : 0;
  // Recommend 20% of net profit (if positive) to be put into safe emergency fund/chit fund/savings
  const emergencySavingsRecommendation =
    netProfit > 0 ? Math.round(netProfit * 0.2) : 0;

  return {
    totalExpenses,
    netProfit,
    profitMarginPercent,
    emergencySavingsRecommendation,
  };
}

/**
 * Calculates how many items need to be sold to cover all fixed costs.
 */
export function calculateBreakEvenUnits(
  fixedCost: number,
  sellingPricePerUnit: number,
  variableCostPerUnit: number
): number {
  const marginPerUnit = sellingPricePerUnit - variableCostPerUnit;
  if (marginPerUnit <= 0 || fixedCost <= 0) {
    return 0;
  }
  return Math.ceil(fixedCost / marginPerUnit);
}

/**
 * Calculates distance in kilometers between two GPS coordinates using the Haversine formula.
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10; // Round to 1 decimal place
}

/**
 * Calculates itemized budget totals and remaining capital.
 */
export function calculateItemizedBudget(
  items: { quantity: number; estimatedUnitCost: number }[],
  totalBudgetLimit: number
): {
  totalEstimatedCost: number;
  remainingBudget: number;
  isBudgetExceeded: boolean;
  budgetUtilizationPercent: number;
} {
  const totalEstimatedCost = items.reduce(
    (sum, item) => sum + Math.max(0, item.quantity) * Math.max(0, item.estimatedUnitCost),
    0
  );
  const remainingBudget = totalBudgetLimit - totalEstimatedCost;
  const isBudgetExceeded = totalEstimatedCost > totalBudgetLimit;
  const budgetUtilizationPercent =
    totalBudgetLimit > 0 ? Math.min(100, Math.round((totalEstimatedCost / totalBudgetLimit) * 100)) : 0;

  return {
    totalEstimatedCost,
    remainingBudget,
    isBudgetExceeded,
    budgetUtilizationPercent,
  };
}

/**
 * Formats a number to Indian Rupee (INR) representation with ₹ symbol.
 */
export function formatCurrency(amount: number, lang: Language = 'ta'): string {
  if (isNaN(amount)) return '₹0';
  const locale = lang === 'hi' ? 'hi-IN' : lang === 'ta' ? 'ta-IN' : 'en-IN';
  const formatted = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(amount);
  return `₹${formatted}`;
}
