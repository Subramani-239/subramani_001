/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  recommendLocationBusinesses,
  calculateLandedCost,
  compareQuotations,
  filterWholesaleHubs,
  transferItemsToBudgetPlan
} from './businessPlannerLogic';
import { verifiedWholesaleHubs } from '../data/wholesaleMarketsData';
import { MaterialQuotation, BudgetItemPlan, BusinessIdeaInput } from '../types';

describe('Location-Based Business Idea Generator Logic', () => {
  it('recommends Karaikal-specific seafood and temple ideas when Karaikal is selected', () => {
    const input: BusinessIdeaInput = {
      location: {
        stateOrUt: 'puducherry',
        district: 'Karaikal',
        town: 'Karaikal Town',
        locality: 'Harbour area'
      },
      currentProfession: 'Homemaker',
      skills: ['Cooking', 'Cleaning'],
      budgetAmount: 10000,
      workingHours: '2-3',
      preferredCategory: 'food_catering',
      interests: ['Food']
    };

    const results = recommendLocationBusinesses(input);
    assert.ok(results.length >= 2, 'Should return multiple recommended ideas');
    assert.equal(results[0].id, 'idea-karaikal-dry-fish-masala');
    assert.ok(results[0].suitableForDistricts.includes('Karaikal'));
    assert.ok(results[0].starterShoppingList.length > 0, 'Should include starter shopping list');
  });

  it('recommends Puducherry batter and tourism ideas when Puducherry is selected', () => {
    const input: BusinessIdeaInput = {
      location: {
        stateOrUt: 'puducherry',
        district: 'Puducherry',
        town: 'Oulgaret',
        locality: 'Lawspet'
      },
      currentProfession: 'Homemaker',
      skills: ['Cooking'],
      budgetAmount: 5000,
      workingHours: '1-2',
      preferredCategory: 'food_catering',
      interests: ['Daily cooking']
    };

    const results = recommendLocationBusinesses(input);
    assert.ok(results.length >= 1);
    assert.equal(results[0].id, 'idea-pondy-idli-batter');
    assert.ok(results[0].estimatedStartupCost <= 5000, 'Should match budget constraint');
  });

  it('recommends Madurai Malli garlands for Madurai district', () => {
    const input: BusinessIdeaInput = {
      location: {
        stateOrUt: 'tamil_nadu',
        district: 'Madurai',
        town: 'Madurai',
        locality: 'Mattuthavani'
      },
      currentProfession: 'Daily wage earner',
      skills: ['Flower stringing', 'Handicraft'],
      budgetAmount: 3000,
      workingHours: '2-3',
      preferredCategory: 'agriculture_poultry',
      interests: ['Flowers']
    };

    const results = recommendLocationBusinesses(input);
    assert.ok(results.length >= 1);
    assert.equal(results[0].id, 'idea-madurai-malli-garlands');
    assert.ok(results[0].recommendedWholesaleHubs.includes('hub-madurai-mattuthavani-flowers'));
  });
});

describe('Local Raw Material Finder & Landed Cost Calculation', () => {
  it('calculates landed unit cost factoring in transport fee', () => {
    // 50 metres at ₹30/m with ₹150 delivery
    const result = calculateLandedCost(30, 50, 150);
    assert.equal(result.materialCost, 1500);
    assert.equal(result.totalCost, 1650);
    assert.equal(result.unitLandedCost, 33); // (1500 + 150) / 50 = 33
  });

  it('compares quotations and flags when high transport cost flips the cheapest store', () => {
    const quotes: MaterialQuotation[] = [
      {
        id: 'quote-a',
        shopName: 'Shop A (Local Bazaar)',
        shopAddressOrPhone: 'MG Road, Puducherry',
        materialName: 'Idli Rice 25kg',
        quantity: 2,
        unit: 'sack',
        quotedPricePerUnit: 1000, // ₹2000 total
        transportCost: 50, // Auto rickshaw nearby -> ₹2050 total
        isUserEntered: true
      },
      {
        id: 'quote-b',
        shopName: 'Shop B (Outskirts Mandi)',
        shopAddressOrPhone: 'Villianur highway',
        materialName: 'Idli Rice 25kg',
        quantity: 2,
        unit: 'sack',
        quotedPricePerUnit: 950, // ₹1900 total (cheaper raw price)
        transportCost: 350, // Long distance transport -> ₹2250 total (more expensive!)
        isUserEntered: true
      }
    ];

    const comparison = compareQuotations(quotes);
    assert.equal(comparison.bestOverallQuoteId, 'quote-a', 'Shop A should win on total landed cost');
    assert.equal(comparison.quotes[0].id, 'quote-a');
    assert.equal(comparison.quotes[0].totalLandedCost, 2050);
    assert.equal(comparison.quotes[1].totalLandedCost, 2250);
    assert.equal(comparison.quotes[0].savingsVsHighest, 200);
    assert.ok(comparison.summaryAdvice.includes('Shop A (Local Bazaar)'));
    assert.ok(comparison.summaryAdvice.includes('Note: While "Shop B (Outskirts Mandi)" had a lower shelf price'));
  });

  it('filters verified wholesale hubs by district and category', () => {
    const pondyHubs = filterWholesaleHubs(verifiedWholesaleHubs, 'Puducherry', 'all');
    assert.ok(pondyHubs.length >= 2, 'Should find Goubert Market & MG Road');
    assert.ok(pondyHubs.some((h) => h.id === 'hub-pondy-goubert-market'));

    const tailoringHubs = filterWholesaleHubs(verifiedWholesaleHubs, 'all', 'tailoring_garments');
    assert.ok(tailoringHubs.length >= 3, 'Should find tailoring hubs across cities');
  });

  it('transfers shopping list items to budget plan without duplicating identical items', () => {
    const existing: BudgetItemPlan[] = [
      {
        id: 'plan-1',
        itemName: 'Sewing Machine',
        category: 'tool_equipment',
        quantity: 1,
        estimatedUnitCost: 9500
      }
    ];

    const newItems: BudgetItemPlan[] = [
      {
        id: 'temp-1',
        itemName: 'Sewing Machine', // Duplicate name
        category: 'tool_equipment',
        quantity: 1,
        estimatedUnitCost: 9500
      },
      {
        id: 'temp-2',
        itemName: 'Cotton Lining Cloth',
        category: 'raw_material',
        quantity: 10,
        estimatedUnitCost: 350
      }
    ];

    const merged = transferItemsToBudgetPlan(existing, newItems);
    assert.equal(merged.length, 2, 'Should merge without duplicate Sewing Machine');
    assert.ok(merged.some((i) => i.itemName === 'Cotton Lining Cloth'));
  });
});
