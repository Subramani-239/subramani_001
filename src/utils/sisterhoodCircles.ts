/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ProblemCircle,
  ProblemDiscussionThread,
  CircleProblemCategory,
  Scheme
} from '../types';

/**
 * Filter circles by region (puducherry, tamil_nadu, all), district, category, and text search.
 */
export function filterCirclesByLocationAndProblem(
  circles: ProblemCircle[],
  region: 'all' | 'puducherry' | 'tamil_nadu',
  district: string,
  category: string,
  searchQuery: string
): ProblemCircle[] {
  return circles.filter((circle) => {
    // 1. Region match
    if (region !== 'all' && circle.region !== 'all' && circle.region !== region) {
      return false;
    }

    // 2. District match
    if (district !== 'all' && circle.district.toLowerCase() !== district.toLowerCase()) {
      return false;
    }

    // 3. Category match
    if (category !== 'all' && circle.category !== category) {
      return false;
    }

    // 4. Text query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesName =
        circle.name.toLowerCase().includes(q) ||
        circle.nameTa.toLowerCase().includes(q) ||
        (circle.nameHi && circle.nameHi.toLowerCase().includes(q));
      const matchesDesc =
        circle.description.toLowerCase().includes(q) ||
        circle.descriptionTa.toLowerCase().includes(q);
      const matchesProblem =
        circle.activeProblem.toLowerCase().includes(q) ||
        circle.activeProblemTa.toLowerCase().includes(q);
      const matchesTags = circle.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesName || matchesDesc || matchesProblem || matchesTags;
    }

    return true;
  });
}

/**
 * Filter discussion threads by circle ID and optional search query
 */
export function getThreadsForCircle(
  threads: ProblemDiscussionThread[],
  circleId: string,
  category: string = 'all',
  searchQuery: string = ''
): ProblemDiscussionThread[] {
  return threads.filter((t) => {
    if (circleId !== 'all' && t.circleId !== circleId) return false;
    if (category !== 'all' && t.category !== category) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = t.problemTitle.toLowerCase().includes(q);
      const matchDesc = t.problemDescription.toLowerCase().includes(q);
      const matchSol = t.solutions.some((s) => s.solutionText.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchSol;
    }

    return true;
  });
}

/**
 * Toggle membership in a circle
 */
export function toggleCircleMembership(
  currentJoinedIds: string[],
  circleId: string
): string[] {
  if (currentJoinedIds.includes(circleId)) {
    return currentJoinedIds.filter((id) => id !== circleId);
  }
  return [...currentJoinedIds, circleId];
}

/**
 * Toggle upvote on a discussion thread
 */
export function toggleThreadUpvote(
  thread: ProblemDiscussionThread
): ProblemDiscussionThread {
  const isUpvoted = !thread.isUpvoted;
  const upvotes = isUpvoted ? thread.upvotes + 1 : Math.max(0, thread.upvotes - 1);
  return {
    ...thread,
    isUpvoted,
    upvotes,
  };
}

/**
 * Toggle user pledge on a collective community action
 */
export function toggleActionPledge(
  thread: ProblemDiscussionThread
): ProblemDiscussionThread {
  if (!thread.collectiveAction) return thread;

  const currentPledged = thread.collectiveAction.hasUserPledged;
  const nextPledged = !currentPledged;
  const nextCount = nextPledged
    ? thread.collectiveAction.pledgedCount + 1
    : Math.max(0, thread.collectiveAction.pledgedCount - 1);

  return {
    ...thread,
    collectiveAction: {
      ...thread.collectiveAction,
      hasUserPledged: nextPledged,
      pledgedCount: nextCount,
    },
  };
}

/**
 * Add a peer or mentor solution to an existing discussion thread
 */
export function addSolutionToThread(
  thread: ProblemDiscussionThread,
  solutionText: string,
  authorAlias: string,
  isAnonymous: boolean
): ProblemDiscussionThread {
  const newSolution = {
    id: `sol-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    authorAlias: isAnonymous ? 'Anonymous Sister (தோழி)' : authorAlias || 'Community Sister',
    isAnonymous,
    solutionText,
    isVerifiedByMentor: false,
    timestamp: 'Just now',
    helpfulVotes: 0,
    isHelpful: false,
  };

  return {
    ...thread,
    solutions: [...thread.solutions, newSolution],
  };
}

/**
 * Create a new problem discussion thread with optional collective action
 */
export function createProblemThread(
  circleId: string,
  problemTitle: string,
  problemDescription: string,
  category: CircleProblemCategory,
  authorAlias: string,
  authorLocation: string,
  isAnonymous: boolean,
  collectiveActionTitle?: string,
  collectiveActionDesc?: string,
  targetAuthority?: string
): ProblemDiscussionThread {
  const safeAlias = isAnonymous ? 'Anonymous Sister (தோழி)' : authorAlias || 'Sister';
  const thread: ProblemDiscussionThread = {
    id: `thread-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    circleId,
    authorAlias: safeAlias,
    isAnonymous,
    authorLocation: authorLocation || 'Puducherry / Tamil Nadu',
    problemTitle,
    problemDescription,
    category,
    timestamp: 'Just now',
    upvotes: 1,
    isUpvoted: true,
    solutions: [],
  };

  if (collectiveActionTitle && collectiveActionTitle.trim()) {
    thread.collectiveAction = {
      actionTitle: collectiveActionTitle.trim(),
      actionDescription: collectiveActionDesc?.trim() || '',
      targetAuthority: targetAuthority?.trim() || 'Local District Authority',
      pledgedCount: 1,
      hasUserPledged: true,
    };
  }

  return thread;
}

/**
 * Generates privacy-respecting alias without revealing private phone, email, or exact address
 */
export function formatSafeAlias(
  name: string,
  isAnonymous: boolean,
  district?: string
): string {
  if (isAnonymous) {
    return district ? `Anonymous Sister (${district})` : 'Anonymous Sister (தோழி)';
  }
  const cleanName = name.replace(/[^a-zA-Z0-9\s]/g, '').trim();
  const firstName = cleanName.split(' ')[0] || 'Sister';
  return district ? `Sister ${firstName} (${district})` : `Sister ${firstName}`;
}

/**
 * Creates a new problem-solving Support Circle
 */
export function createNewSupportCircle(
  name: string,
  category: CircleProblemCategory,
  region: 'puducherry' | 'tamil_nadu' | 'all',
  district: string,
  description: string,
  activeProblem: string,
  isPrivate: boolean = false,
  tags: string[] = []
): ProblemCircle {
  const circleId = `circle-user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  return {
    id: circleId,
    name: name.trim(),
    nameTa: name.trim(),
    nameHi: name.trim(),
    category,
    region,
    district: district.trim() || 'General',
    districtTa: district.trim() || 'General',
    districtHi: district.trim() || 'General',
    isPrivate,
    description: description.trim(),
    descriptionTa: description.trim(),
    descriptionHi: description.trim(),
    icon: category === 'education_restart' ? 'GraduationCap'
      : category === 'safety_rights' ? 'Scale'
      : category === 'livelihood_wages' ? 'Scissors'
      : category === 'raw_material_sourcing' ? 'Package'
      : category === 'health_childcare' ? 'HeartHandshake'
      : 'Users',
    activeProblem: activeProblem.trim(),
    activeProblemTa: activeProblem.trim(),
    activeProblemHi: activeProblem.trim(),
    memberCount: 1,
    solvedCount: 0,
    tags: tags.length > 0 ? tags : ['Peer Support', district.trim()],
    resources: [],
    sharedExperiences: []
  };
}

/**
 * Filter schemes strictly across ONLY the three supported categories:
 * - Puducherry
 * - Tamil Nadu
 * - Central Government
 */
export function filterSchemesByStrictRegions(
  schemes: Scheme[],
  region: 'all' | 'puducherry' | 'tamil_nadu' | 'central'
): Scheme[] {
  return schemes.filter((s) => {
    if (region === 'all') {
      return (
        s.governmentLevel === 'puducherry' ||
        s.governmentLevel === 'tamil_nadu' ||
        s.governmentLevel === 'central'
      );
    }
    return s.governmentLevel === region;
  });
}

