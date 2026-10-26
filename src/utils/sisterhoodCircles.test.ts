/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  filterCirclesByLocationAndProblem,
  getThreadsForCircle,
  toggleCircleMembership,
  toggleThreadUpvote,
  toggleActionPledge,
  addSolutionToThread,
  createProblemThread,
  formatSafeAlias,
  filterSchemesByStrictRegions
} from './sisterhoodCircles';
import { initialProblemCircles, initialProblemThreads } from '../data/sisterhoodData';
import { schemesData } from '../data/schemesData';

describe('Sisterhood Problem Circles Logic', () => {
  it('filters circles by region (Puducherry vs Tamil Nadu)', () => {
    const pondyCircles = filterCirclesByLocationAndProblem(
      initialProblemCircles,
      'puducherry',
      'all',
      'all',
      ''
    );
    assert.ok(pondyCircles.length >= 3, 'Should have multiple Puducherry circles');
    assert.ok(pondyCircles.every((c) => c.region === 'puducherry'));

    const tnCircles = filterCirclesByLocationAndProblem(
      initialProblemCircles,
      'tamil_nadu',
      'all',
      'all',
      ''
    );
    assert.ok(tnCircles.length >= 4, 'Should have multiple Tamil Nadu circles');
    assert.ok(tnCircles.every((c) => c.region === 'tamil_nadu'));
  });

  it('filters circles by problem category and search keyword', () => {
    const educationCircles = filterCirclesByLocationAndProblem(
      initialProblemCircles,
      'all',
      'all',
      'education_restart',
      ''
    );
    assert.ok(educationCircles.length >= 2);
    assert.ok(educationCircles.every((c) => c.category === 'education_restart'));

    const searchResults = filterCirclesByLocationAndProblem(
      initialProblemCircles,
      'all',
      'all',
      'all',
      'tailor'
    );
    assert.ok(searchResults.length >= 1, 'Should find tailoring circle');
  });

  it('toggles membership cleanly in and out of circle', () => {
    const initialJoined = ['circle-pondy-education-reentry'];
    const added = toggleCircleMembership(initialJoined, 'circle-karaikal-tailoring-orders');
    assert.deepEqual(added, [
      'circle-pondy-education-reentry',
      'circle-karaikal-tailoring-orders'
    ]);

    const removed = toggleCircleMembership(added, 'circle-pondy-education-reentry');
    assert.deepEqual(removed, ['circle-karaikal-tailoring-orders']);
  });

  it('handles thread upvoting and un-upvoting', () => {
    const thread = initialProblemThreads[0];
    const upvoted = toggleThreadUpvote(thread);
    assert.equal(upvoted.isUpvoted, true);
    assert.equal(upvoted.upvotes, thread.upvotes + 1);

    const downvoted = toggleThreadUpvote(upvoted);
    assert.equal(downvoted.isUpvoted, false);
    assert.equal(downvoted.upvotes, thread.upvotes);
  });

  it('toggles collective community action pledge', () => {
    const thread = initialProblemThreads[0];
    assert.ok(thread.collectiveAction, 'Thread should have collective action');

    const pledged = toggleActionPledge(thread);
    assert.equal(pledged.collectiveAction?.hasUserPledged, true);
    assert.equal(
      pledged.collectiveAction?.pledgedCount,
      (thread.collectiveAction?.pledgedCount ?? 0) + 1
    );

    const unpledged = toggleActionPledge(pledged);
    assert.equal(unpledged.collectiveAction?.hasUserPledged, false);
    assert.equal(
      unpledged.collectiveAction?.pledgedCount,
      thread.collectiveAction?.pledgedCount
    );
  });

  it('adds peer solutions to a thread', () => {
    const thread = initialProblemThreads[0];
    const updated = addSolutionToThread(
      thread,
      'Contact your local taluk office before 3 PM with 2 passport photos.',
      'Meena',
      false
    );
    assert.equal(updated.solutions.length, thread.solutions.length + 1);
    const lastSol = updated.solutions[updated.solutions.length - 1];
    assert.equal(lastSol.solutionText, 'Contact your local taluk office before 3 PM with 2 passport photos.');
    assert.equal(lastSol.authorAlias, 'Meena');
  });

  it('creates new problem thread with collective action support', () => {
    const newThread = createProblemThread(
      'circle-pondy-education-reentry',
      'Need books for Class 12 Economics in Tamil medium',
      'I cannot find the state board syllabus book in local shops',
      'education_restart',
      'Selvi',
      'Oulgaret, Puducherry',
      false,
      'Book exchange drive at Community Centre',
      'Donate or lend used 12th state board books to dropouts',
      'Puducherry Library Dept'
    );

    assert.equal(newThread.problemTitle, 'Need books for Class 12 Economics in Tamil medium');
    assert.equal(newThread.authorAlias, 'Selvi');
    assert.ok(newThread.collectiveAction);
    assert.equal(newThread.collectiveAction?.pledgedCount, 1);
    assert.equal(newThread.collectiveAction?.hasUserPledged, true);
  });

  it('generates privacy-safe aliases without leaking contact info', () => {
    const safe1 = formatSafeAlias('Kavitha Sundaram +91 9876543210', false, 'Madurai');
    assert.equal(safe1, 'Sister Kavitha (Madurai)');

    const safeAnon = formatSafeAlias('Secret User', true, 'Puducherry');
    assert.equal(safeAnon, 'Anonymous Sister (Puducherry)');
  });
});

describe('Government Schemes Compliance: Strictly 3 Categories with 30+ Schemes', () => {
  it('contains at least 15 verified Puducherry schemes', () => {
    const pondySchemes = filterSchemesByStrictRegions(schemesData, 'puducherry');
    assert.ok(
      pondySchemes.length >= 15,
      `Expected at least 15 Puducherry schemes, got ${pondySchemes.length}`
    );
    assert.ok(pondySchemes.every((s) => s.governmentLevel === 'puducherry'));
    assert.ok(pondySchemes.every((s) => Boolean(s.officialUrl)));
  });

  it('contains at least 15 verified Tamil Nadu schemes', () => {
    const tnSchemes = filterSchemesByStrictRegions(schemesData, 'tamil_nadu');
    assert.ok(
      tnSchemes.length >= 15,
      `Expected at least 15 Tamil Nadu schemes, got ${tnSchemes.length}`
    );
    assert.ok(tnSchemes.every((s) => s.governmentLevel === 'tamil_nadu'));
    assert.ok(tnSchemes.every((s) => Boolean(s.officialUrl)));
  });

  it('contains relevant Central Government schemes across India', () => {
    const centralSchemes = filterSchemesByStrictRegions(schemesData, 'central');
    assert.ok(
      centralSchemes.length >= 8,
      `Expected at least 8 Central schemes, got ${centralSchemes.length}`
    );
    assert.ok(centralSchemes.every((s) => s.governmentLevel === 'central'));
  });

  it('aggregates to 30+ total schemes across the 3 categories ONLY', () => {
    const allStrict = filterSchemesByStrictRegions(schemesData, 'all');
    assert.ok(
      allStrict.length >= 30,
      `Expected 30+ total schemes across Puducherry, TN, and Central Govt, got ${allStrict.length}`
    );
    // Ensure no other state is in the filtered list
    assert.ok(
      allStrict.every((s) =>
        ['puducherry', 'tamil_nadu', 'central'].includes(s.governmentLevel as string)
      )
    );
  });
});
