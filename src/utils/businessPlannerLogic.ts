/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  LocationBusinessIdea,
  BusinessIdeaInput,
  WholesaleHub,
  MaterialQuotation,
  QuotationComparisonResult,
  BudgetItemPlan
} from '../types';
import { locationBusinessTemplates } from '../data/locationBusinessData';
import { verifiedWholesaleHubs } from '../data/wholesaleMarketsData';

/**
 * Recommends suitable business ideas based on location, budget, skills, and working hours.
 */
export function recommendLocationBusinesses(
  input: BusinessIdeaInput
): LocationBusinessIdea[] {
  const userDistrict = (input.location.district || '').toLowerCase();
  const userState = input.location.stateOrUt;
  const userBudget = input.budgetAmount > 0 ? input.budgetAmount : 25000;
  const userCategory = input.preferredCategory || 'all';

  const scored = locationBusinessTemplates.map((template) => {
    let score = 0;

    // 1. Location match
    const districtMatches = template.suitableForDistricts.some((d) => {
      if (d === 'all') return true;
      return d.toLowerCase() === userDistrict || userDistrict.includes(d.toLowerCase());
    });

    if (districtMatches) {
      score += 40;
    }

    if (userState === 'puducherry' && template.suitableForDistricts.includes('Puducherry')) {
      score += 20;
    }
    if (userState === 'puducherry' && userDistrict.includes('karaikal') && template.id.includes('karaikal')) {
      score += 35;
    }

    // 2. Budget compatibility
    if (template.estimatedStartupCost <= userBudget) {
      score += 25;
    } else if (template.estimatedStartupCost <= userBudget * 1.4) {
      score += 15;
    } else {
      score -= 10;
    }

    // 3. Category match
    if (userCategory !== 'all' && template.category === userCategory) {
      score += 30;
    }

    // 4. Skills match
    const skillTokens = (input.skills || []).map((s) => s.toLowerCase());
    if (
      (template.category === 'tailoring_garments' && skillTokens.some((s) => s.includes('tailor') || s.includes('stitch'))) ||
      (template.category === 'food_catering' && skillTokens.some((s) => s.includes('cook') || s.includes('food'))) ||
      (template.category === 'handicrafts_eco' && skillTokens.some((s) => s.includes('craft') || s.includes('paper'))) ||
      (template.category === 'agriculture_poultry' && skillTokens.some((s) => s.includes('flower') || s.includes('farm')))
    ) {
      score += 20;
    }

    return { template, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.template);
}

/**
 * Calculates landed unit cost factoring in raw material price, quantity, and local delivery/transport cost.
 */
export function calculateLandedCost(
  unitPrice: number,
  quantity: number,
  transportCost: number
): { materialCost: number; totalCost: number; unitLandedCost: number } {
  const safeQty = Math.max(1, quantity);
  const safePrice = Math.max(0, unitPrice);
  const safeTransport = Math.max(0, transportCost);

  const materialCost = safePrice * safeQty;
  const totalCost = materialCost + safeTransport;
  const unitLandedCost = Math.round((totalCost / safeQty) * 100) / 100;

  return {
    materialCost,
    totalCost,
    unitLandedCost,
  };
}

/**
 * Compares multi-shop quotations, identifies the best overall landed cost, and highlights hidden transport fees.
 */
export function compareQuotations(
  quotations: MaterialQuotation[]
): QuotationComparisonResult {
  if (quotations.length === 0) {
    return {
      bestOverallQuoteId: '',
      quotes: [],
      summaryAdvice: 'No quotations entered yet. Add quotations from local shops to compare.',
      summaryAdviceTa: 'இன்னும் விலைப்புள்ளிகள் சேர்க்கப்படவில்லை. ஒப்பிடுவதற்கு கடைகளின் விலையை சேர்க்கவும்.',
    };
  }

  const calculatedQuotes = quotations.map((q) => {
    const { materialCost, totalCost, unitLandedCost } = calculateLandedCost(
      q.quotedPricePerUnit,
      q.quantity,
      q.transportCost
    );

    return {
      id: q.id,
      shopName: q.shopName,
      materialCost,
      transportCost: q.transportCost,
      totalLandedCost: totalCost,
      effectiveUnitCost: unitLandedCost,
      isBestDeal: false,
      savingsVsHighest: 0,
    };
  });

  // Sort by lowest total landed cost
  calculatedQuotes.sort((a, b) => a.totalLandedCost - b.totalLandedCost);

  const bestQuote = calculatedQuotes[0];
  const worstQuote = calculatedQuotes[calculatedQuotes.length - 1];
  const maxCost = worstQuote ? worstQuote.totalLandedCost : bestQuote.totalLandedCost;

  calculatedQuotes.forEach((cq) => {
    if (cq.id === bestQuote.id) {
      cq.isBestDeal = true;
    }
    cq.savingsVsHighest = Math.max(0, maxCost - cq.totalLandedCost);
  });

  // Analyze if transport cost altered the cheapest unit price
  const quotesSortedByUnitPrice = [...quotations].sort(
    (a, b) => a.quotedPricePerUnit - b.quotedPricePerUnit
  );
  const lowestRawUnitPriceQuote = quotesSortedByUnitPrice[0];

  let summaryAdvice = `Shop "${bestQuote.shopName}" offers the best overall deal with a total landed cost of ₹${bestQuote.totalLandedCost} (effective ₹${bestQuote.effectiveUnitCost}/unit).`;
  let summaryAdviceTa = `"${bestQuote.shopName}" கடை போக்குவரத்து செலவையும் சேர்த்து மொத்தம் ₹${bestQuote.totalLandedCost} என்ற மிகக் குறைந்த விலையை வழங்குகிறது.`;

  if (lowestRawUnitPriceQuote && lowestRawUnitPriceQuote.id !== bestQuote.id) {
    summaryAdvice += ` Note: While "${lowestRawUnitPriceQuote.shopName}" had a lower shelf price, their transport cost of ₹${lowestRawUnitPriceQuote.transportCost} made it more expensive overall.`;
    summaryAdviceTa += ` கவனம்: "${lowestRawUnitPriceQuote.shopName}" கடையில் பொருள் விலை குறைவாக இருந்தாலும், அங்கு ₹${lowestRawUnitPriceQuote.transportCost} போக்குவரத்து செலவு கூடுதல் சுமையாகிறது.`;
  }

  return {
    bestOverallQuoteId: bestQuote.id,
    quotes: calculatedQuotes,
    summaryAdvice,
    summaryAdviceTa,
  };
}

/**
 * Filter verified wholesale market hubs by district and optional category
 */
export function filterWholesaleHubs(
  hubs: WholesaleHub[],
  district: string,
  category: string = 'all'
): WholesaleHub[] {
  return hubs.filter((hub) => {
    // District matching
    if (district !== 'all') {
      const matchDistrict = hub.district.toLowerCase() === district.toLowerCase();
      if (!matchDistrict) return false;
    }

    // Category matching
    if (category !== 'all') {
      if (!hub.categoriesHandled.includes(category)) return false;
    }

    return true;
  });
}

/**
 * Seamlessly converts starter items from a business idea and merges them into the itemized budget list.
 */
export function transferItemsToBudgetPlan(
  existingItems: BudgetItemPlan[],
  newItems: BudgetItemPlan[]
): BudgetItemPlan[] {
  const merged: BudgetItemPlan[] = [...existingItems];

  newItems.forEach((newItem) => {
    const alreadyExists = merged.some(
      (m) => m.itemName.toLowerCase() === newItem.itemName.toLowerCase()
    );
    if (!alreadyExists) {
      merged.push({
        ...newItem,
        id: `plan-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      });
    }
  });

  return merged;
}
