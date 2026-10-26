import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateShgEmi,
  calculateBusinessProfit,
  calculateBreakEvenUnits,
  calculateDistanceKm,
  calculateItemizedBudget,
  formatCurrency,
} from './calculator.ts';

test('calculateShgEmi handles 0% interest loan correctly', () => {
  const result = calculateShgEmi(12000, 0, 12);
  assert.equal(result.monthlyEmi, 1000);
  assert.equal(result.totalInterest, 0);
  assert.equal(result.totalAmount, 12000);
});

test('calculateShgEmi calculates interest bearing micro-loan EMI correctly', () => {
  const result = calculateShgEmi(50000, 7, 12);
  assert.ok(result.monthlyEmi > 4300 && result.monthlyEmi < 4400);
  assert.ok(result.totalInterest > 1500 && result.totalInterest < 2500);
  assert.equal(result.totalAmount, result.monthlyEmi * 12);
});

test('calculateShgEmi returns zero for non-positive loans', () => {
  const result = calculateShgEmi(0, 10, 12);
  assert.equal(result.monthlyEmi, 0);
  assert.equal(result.totalInterest, 0);
});

test('calculateBusinessProfit calculates net profit, margin and emergency savings', () => {
  const result = calculateBusinessProfit(15000, 5000, 2000, 1000);
  assert.equal(result.totalExpenses, 8000);
  assert.equal(result.netProfit, 7000);
  assert.equal(result.profitMarginPercent, 47);
  assert.equal(result.emergencySavingsRecommendation, 1400);
});

test('calculateBusinessProfit handles zero profit or loss without negative savings', () => {
  const result = calculateBusinessProfit(5000, 4000, 2000, 0);
  assert.equal(result.netProfit, -1000);
  assert.equal(result.emergencySavingsRecommendation, 0);
});

test('calculateBreakEvenUnits calculates units needed to cover fixed costs', () => {
  const units = calculateBreakEvenUnits(2000, 150, 70);
  assert.equal(units, 25);
});

test('calculateDistanceKm calculates distance correctly between coordinates', () => {
  // Distance between Chennai (13.0827, 80.2707) and Madurai (9.9252, 78.1198) is approx ~420 km
  const dist = calculateDistanceKm(13.0827, 80.2707, 9.9252, 78.1198);
  assert.ok(dist > 400 && dist < 450);
});

test('calculateItemizedBudget computes total cost, remaining budget, and utilization', () => {
  const items = [
    { quantity: 2, estimatedUnitCost: 500 }, // 1000
    { quantity: 10, estimatedUnitCost: 150 }, // 1500
    { quantity: 1, estimatedUnitCost: 500 }, // 500 -> total 3000
  ];
  const budget = calculateItemizedBudget(items, 5000);
  assert.equal(budget.totalEstimatedCost, 3000);
  assert.equal(budget.remainingBudget, 2000);
  assert.equal(budget.isBudgetExceeded, false);
  assert.equal(budget.budgetUtilizationPercent, 60);
});

test('formatCurrency formats Indian Rupee correctly across languages', () => {
  const formattedTa = formatCurrency(50000, 'ta');
  const formattedHi = formatCurrency(50000, 'hi');
  const formattedEn = formatCurrency(50000, 'en');
  assert.equal(formattedTa, '₹50,000');
  assert.equal(formattedHi, '₹50,000');
  assert.equal(formattedEn, '₹50,000');
});
