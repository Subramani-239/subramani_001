/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { generateEducationRoadmap, verificationChecklist } from './educationRoadmap';

test('generateEducationRoadmap returns tailored steps for completed_10th', () => {
  const result = generateEducationRoadmap('completed_10th', 'formal_degree', 'en');
  assert.ok(result.headline.includes('10'));
  assert.ok(result.steps.length >= 3);
  assert.ok(result.steps.some(s => s.institutionOrPortal.includes('NIOS')));
  assert.ok(result.empathyNote.length > 10);
});

test('generateEducationRoadmap returns credit transfer for discontinued_11_12', () => {
  const result = generateEducationRoadmap('discontinued_11_12', 'formal_degree', 'ta');
  assert.ok(result.headlineTa.includes('+2') || result.headlineTa.includes('12'));
  assert.ok(result.steps.some(s => s.title.includes('TOC') || s.description.includes('TOC') || s.titleTa.includes('TOC')));
});

test('generateEducationRoadmap returns ABC ID and lateral entry for college discontinuers', () => {
  const result = generateEducationRoadmap('college_discontinued', 'formal_degree', 'hi');
  assert.ok(result.steps.some(s => s.title.includes('ABC') || s.institutionOrPortal.includes('ABC')));
});

test('verification checklist contains UGC-DEB and NIOS anti-scam checks', () => {
  assert.ok(verificationChecklist.length >= 4);
  assert.ok(verificationChecklist.some(c => c.id === 'ugc-deb'));
  assert.ok(verificationChecklist.some(c => c.officialPortal.includes('deb.ugc.ac.in')));
  assert.ok(verificationChecklist.some(c => c.check.includes('Never pay fees without checking')));
});
