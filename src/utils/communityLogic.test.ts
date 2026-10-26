/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { canEditPost, canDeletePost, filterCommunityPosts, communitySupportGroups } from './communityLogic';
import { CommunityPost } from '../types';

test('communitySupportGroups has 6 essential categories with localized titles', () => {
  assert.equal(communitySupportGroups.length, 6);
  assert.ok(communitySupportGroups.some(g => g.id === 'circle-education'));
  assert.ok(communitySupportGroups.some(g => g.id === 'circle-business'));
  assert.ok(communitySupportGroups.some(g => g.nameTa.length > 0));
  assert.ok(communitySupportGroups.some(g => g.nameHi.length > 0));
});

test('canEditPost and canDeletePost verify user authorship correctly', () => {
  const ownPost: CommunityPost = {
    id: 'post-user-1234',
    authorName: 'Selvi Devi',
    authorLocation: 'Madurai',
    role: 'Artisan',
    roleTa: 'கைவினைஞர்',
    roleHi: 'कारीगर',
    category: 'story',
    title: 'My Journey',
    content: 'Started with sewing',
    likes: 3,
    timestamp: 'Today',
    replies: []
  };

  const otherPost: CommunityPost = {
    id: 'post-9999',
    authorName: 'Kavitha R',
    authorLocation: 'Salem',
    role: 'Homemaker',
    roleTa: 'இல்லத்தரசி',
    roleHi: 'गृहणी',
    category: 'question',
    title: 'Need advice',
    content: 'How to register?',
    likes: 1,
    timestamp: 'Yesterday',
    replies: []
  };

  assert.equal(canEditPost(ownPost, 'user-1234', 'Selvi Devi'), true);
  assert.equal(canDeletePost(ownPost, 'user-1234', 'Selvi Devi'), true);

  assert.equal(canEditPost(otherPost, 'user-1234', 'Selvi Devi'), false);
  assert.equal(canDeletePost(otherPost, 'user-1234', 'Selvi Devi'), false);
});

test('filterCommunityPosts respects search queries, groups, and blocked authors', () => {
  const posts: CommunityPost[] = [
    {
      id: 'p1',
      authorName: 'Spammer User',
      authorLocation: 'Online',
      role: 'Member',
      roleTa: 'உறுப்பினர்',
      roleHi: 'सदस्य',
      category: 'story',
      circleGroupId: 'circle-business',
      title: 'Get rich quick',
      content: 'Click here',
      likes: 0,
      timestamp: 'Now',
      replies: []
    },
    {
      id: 'p2',
      authorName: 'Anitha',
      authorLocation: 'Coimbatore',
      role: 'Tailor',
      roleTa: 'தையல் கலைஞர்',
      roleHi: 'दर्जी',
      category: 'question',
      circleGroupId: 'circle-tailoring',
      title: 'Blouse cutting doubts',
      content: 'How to cut lining cloth?',
      likes: 5,
      timestamp: 'Today',
      replies: []
    }
  ];

  // Block Spammer
  const filtered = filterCommunityPosts(posts, {
    selectedCircleId: 'all',
    selectedCategory: 'all',
    searchQuery: '',
    blockedAuthors: ['Spammer User']
  });
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].id, 'p2');

  // Search by keyword
  const searchResult = filterCommunityPosts(posts, {
    selectedCircleId: 'all',
    selectedCategory: 'all',
    searchQuery: 'lining',
    blockedAuthors: []
  });
  assert.equal(searchResult.length, 1);
  assert.equal(searchResult[0].id, 'p2');
});
