/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { matchVoiceCommand } from './speech';

test('Hindi voice recognition matches Devanagari commands accurately', () => {
  // Hindi Government Schemes
  assert.strictEqual(matchVoiceCommand('सरकारी योजना'), 'schemes');
  assert.strictEqual(matchVoiceCommand('योजनाएं दिखाओ'), 'schemes');
  assert.strictEqual(matchVoiceCommand('स्कीम क्या है'), 'schemes');

  // Hindi Emergency Help
  assert.strictEqual(matchVoiceCommand('आपातकाल मदद 112'), 'emergency-help');
  assert.strictEqual(matchVoiceCommand('पुलिस सहायता चाहिए'), 'emergency-help');
  assert.strictEqual(matchVoiceCommand('अस्पताल कहां है'), 'emergency-help');
  assert.strictEqual(matchVoiceCommand('एंबुलेंस बुलाओ'), 'emergency-help');

  // Hindi Skills Learning
  assert.strictEqual(matchVoiceCommand('सिलाई सीखना है'), 'skills-learning');
  assert.strictEqual(matchVoiceCommand('नया हुनर सीखें'), 'skills-learning');
  assert.strictEqual(matchVoiceCommand('कौशल पाठ'), 'skills-learning');

  // Hindi Budget Calculator
  assert.strictEqual(matchVoiceCommand('बजट हिसाब'), 'budget-calculator');
  assert.strictEqual(matchVoiceCommand('दुकान का खर्च और बचत'), 'budget-calculator');
  assert.strictEqual(matchVoiceCommand('कैलकुलेटर खोलो'), 'budget-calculator');

  // Hindi Business Ideas
  assert.strictEqual(matchVoiceCommand('नया व्यापार विचार'), 'business-generator');
  assert.strictEqual(matchVoiceCommand('बिजनेस आइडिया'), 'business-generator');

  // Hindi Chat & Call
  assert.strictEqual(matchVoiceCommand('सहेली से बातचीत या चैट'), 'chat-call');
  assert.strictEqual(matchVoiceCommand('कॉल करें'), 'chat-call');

  // Hindi Community
  assert.strictEqual(matchVoiceCommand('सखी समुदाय ग्रुप'), 'community');

  // Hindi Profile & Home
  assert.strictEqual(matchVoiceCommand('मेरी प्रोफाइल खाता'), 'profile');
  assert.strictEqual(matchVoiceCommand('मुख्य पृष्ठ होम'), 'dashboard');

  // Hindi Privacy
  assert.strictEqual(matchVoiceCommand('सुरक्षा और गोपनीयता'), 'privacy');
});

test('Hindi voice recognition matches Romanized transliteration (Hinglish)', () => {
  assert.strictEqual(matchVoiceCommand('sarkari yojana'), 'schemes');
  assert.strictEqual(matchVoiceCommand('aapatkal madad'), 'emergency-help');
  assert.strictEqual(matchVoiceCommand('seekhna hai hunar'), 'skills-learning');
  assert.strictEqual(matchVoiceCommand('kharcha aur bachat hisab'), 'budget-calculator');
  assert.strictEqual(matchVoiceCommand('vyapar business'), 'business-generator');
});

test('Tamil and English voice commands continue to work without regression', () => {
  // Tamil
  assert.strictEqual(matchVoiceCommand('அரசு திட்டங்கள்'), 'schemes');
  assert.strictEqual(matchVoiceCommand('அவசர உதவி 112'), 'emergency-help');
  assert.strictEqual(matchVoiceCommand('தையல் பயிற்சி கற்றல்'), 'skills-learning');
  assert.strictEqual(matchVoiceCommand('வரவு செலவு கணக்கு பட்ஜெட்'), 'budget-calculator');

  // English
  assert.strictEqual(matchVoiceCommand('government schemes'), 'schemes');
  assert.strictEqual(matchVoiceCommand('emergency police assistance'), 'emergency-help');
  assert.strictEqual(matchVoiceCommand('budget calculator planner'), 'budget-calculator');
});
