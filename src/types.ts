/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'ta' | 'en' | 'hi';

export type ActiveTab = 
  | 'dashboard'
  | 'schemes'
  | 'education'
  | 'skills'
  | 'skills-learning'
  | 'business-generator'
  | 'budget-calculator'
  | 'emergency-help'
  | 'chat-call'
  | 'community'
  | 'profile'
  | 'privacy'
  | 'deployment-guide';

export interface UserProfile {
  id: string; // e.g. "SHERISE-DEMO-7842"
  demoId?: string;
  name: string;
  isDemo: boolean;
  preferredLanguage: Language;
  role: 'homemaker' | 'dropout' | 'rural_artisan' | 'entrepreneur' | 'student';
  location: string;
  skills: string[];
  interests: string[];
  availableHoursPerDay: number;
  availableBudget: number; // in INR
  bio: string;
  trustedContactName?: string;
  trustedContactPhone?: string;
  isTrainer?: boolean;
  teachingSkills?: string[];
  joinedDate: string;
}

export interface Scheme {
  id: string;
  title: string;
  titleTa: string;
  titleHi: string;
  department: string;
  departmentTa: string;
  departmentHi: string;
  category: 'financial_aid' | 'shg_loan' | 'education' | 'equipment' | 'livelihood';
  isLoan: boolean; // clearly distinguishes loans from free grants/aid
  benefits: string;
  benefitsTa: string;
  benefitsHi: string;
  eligibility: string[];
  eligibilityTa: string[];
  eligibilityHi: string[];
  minAge?: number;
  maxAge?: number;
  targetGroup: ('homemaker' | 'dropout' | 'rural' | 'entrepreneur' | 'student')[];
  documentsRequired: string[];
  documentsRequiredTa: string[];
  documentsRequiredHi: string[];
  applicationSteps: string[];
  applicationStepsTa: string[];
  applicationStepsHi: string[];
  officialUrl?: string;
  verificationDate: string;
  officialSource: string;
  sourceName?: string;
  helpline?: string;
  freeEquipment?: string;
  freeEquipmentTa?: string;
  freeEquipmentHi?: string;
  badge?: string;
  badgeTa?: string;
  badgeHi?: string;
  governmentLevel?: 'central' | 'tamil_nadu' | 'puducherry' | 'other_states';
  stateOrUt?: string;
  officeOrServiceCenter?: string;
  officeOrServiceCenterTa?: string;
  officeOrServiceCenterHi?: string;
  lastCheckedDate?: string;
}

export interface EducationOpportunity {
  id: string;
  title: string;
  titleTa: string;
  titleHi?: string;
  provider: string;
  providerTa: string;
  providerHi?: string;
  level: 'school_dropout' | 'degree_completion' | 'vocational' | 'digital_literacy';
  duration: string;
  durationTa: string;
  durationHi?: string;
  fees: string;
  feesTa: string;
  feesHi?: string;
  description: string;
  descriptionTa: string;
  descriptionHi?: string;
  eligibility: string;
  eligibilityTa: string;
  eligibilityHi?: string;
  howToEnroll: string[];
  howToEnrollTa: string[];
  howToEnrollHi?: string[];
  contactOrLink: string;
  highlight?: string;
  highlightTa?: string;
  highlightHi?: string;
}

export interface SkillOpportunity {
  id: string;
  title: string;
  titleTa: string;
  titleHi?: string;
  category: 'craft_tailoring' | 'food_agriculture' | 'digital_service' | 'eco_home';
  timeNeeded: '1-2 hrs' | '2-3 hrs' | '3-4 hrs' | 'Full day' | 'Flexible';
  timeNeededTa: string;
  timeNeededHi?: string;
  minInvestment: number; // in INR
  monthlyEarningPotential: string;
  monthlyEarningPotentialTa: string;
  monthlyEarningPotentialHi?: string;
  shortSummary: string;
  shortSummaryTa: string;
  shortSummaryHi?: string;
  equipmentNeeded: string[];
  equipmentNeededTa: string[];
  equipmentNeededHi?: string[];
  stepsToStart: string[];
  stepsToStartTa: string[];
  stepsToStartHi?: string[];
  whereToSell: string[];
  whereToSellTa: string[];
  whereToSellHi?: string[];
  successTip: string;
  successTipTa: string;
  successTipHi?: string;
}

export interface BusinessPlan {
  title: string;
  titleTa: string;
  titleHi?: string;
  summary: string;
  summaryTa: string;
  summaryHi?: string;
  estimatedBudget: number;
  expectedMonthlyIncome: string;
  expectedMonthlyIncomeTa: string;
  expectedMonthlyIncomeHi?: string;
  dailyTimeRequired: string;
  dailyTimeRequiredTa: string;
  dailyTimeRequiredHi?: string;
  budgetBreakdown: { item: string; itemTa: string; itemHi?: string; amount: number }[];
  stepsToLaunch: { step: number; title: string; titleTa: string; titleHi?: string; desc: string; descTa: string; descHi?: string }[];
  firstCustomersStrategy: string[];
  firstCustomersStrategyTa: string[];
  firstCustomersStrategyHi?: string[];
  cautionAdvice: string;
  cautionAdviceTa: string;
  cautionAdviceHi?: string;
}

export interface BudgetRecord {
  id: string;
  date: string;
  description: string;
  type: 'income' | 'expense' | 'savings' | 'loan_payment';
  amount: number;
  category: string;
}

export interface BudgetItemPlan {
  id: string;
  itemName: string;
  category: 'raw_material' | 'tool_equipment' | 'packaging' | 'marketing' | 'travel_misc';
  quantity: number;
  estimatedUnitCost: number;
  notes?: string;
  sourceHubOrShop?: string;
}

export interface LocationQuery {
  stateOrUt: 'puducherry' | 'tamil_nadu' | 'other';
  district: string;
  town: string;
  locality: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  isGpsDetected?: boolean;
}

export interface BusinessIdeaInput {
  location: LocationQuery;
  currentProfession: string;
  skills: string[];
  budgetAmount: number;
  workingHours: '1-2' | '2-3' | '3-4' | 'full_day' | 'flexible';
  preferredCategory: string;
  interests: string[];
}

export interface LocationBusinessIdea {
  id: string;
  title: string;
  titleTa: string;
  titleHi: string;
  category: 'food_catering' | 'tailoring_garments' | 'agriculture_poultry' | 'handicrafts_eco' | 'beauty_wellness' | 'digital_retail';
  suitableForDistricts: string[]; // e.g. ['Puducherry', 'Karaikal', 'Madurai', 'all']
  suitabilityReason: string;
  suitabilityReasonTa: string;
  suitabilityReasonHi: string;
  customerDemandFactors: string[];
  customerDemandFactorsTa: string[];
  customerDemandFactorsHi: string[];
  competitionAnalysis: string;
  competitionAnalysisTa: string;
  competitionAnalysisHi: string;
  estimatedStartupCost: number;
  expectedMonthlyProfit: string;
  expectedMonthlyProfitTa: string;
  dailyTimeRequired: string;
  dailyTimeRequiredTa: string;
  starterShoppingList: BudgetItemPlan[];
  risks: string[];
  risksTa: string[];
  firstSteps: string[];
  firstStepsTa: string[];
  recommendedWholesaleHubs: string[];
  disclaimerNote: string;
  disclaimerNoteTa: string;
}

export interface WholesaleHub {
  id: string;
  name: string;
  nameTa: string;
  nameHi: string;
  region: 'puducherry' | 'tamil_nadu' | 'all';
  district: string;
  districtTa: string;
  town: string;
  address: string;
  addressTa: string;
  categoriesHandled: string[];
  benchmarkMaterials: {
    materialName: string;
    materialNameTa: string;
    benchmarkWholesaleRate: string;
    minLotSize: string;
  }[];
  verifiedDate: string;
  officialSourceOrNote: string;
  contactOrLocationTip: string;
  contactOrLocationTipTa: string;
}

export interface MaterialQuotation {
  id: string;
  shopName: string;
  shopAddressOrPhone: string;
  materialName: string;
  quantity: number;
  unit: string;
  quotedPricePerUnit: number;
  transportCost: number;
  notes?: string;
  paymentTerms?: 'cash' | 'credit' | 'upi_spot';
  isUserEntered: boolean;
}

export interface QuotationComparisonResult {
  bestOverallQuoteId: string;
  quotes: {
    id: string;
    shopName: string;
    materialCost: number;
    transportCost: number;
    totalLandedCost: number;
    effectiveUnitCost: number;
    isBestDeal: boolean;
    savingsVsHighest: number;
  }[];
  summaryAdvice: string;
  summaryAdviceTa: string;
}

export interface CommunityPost {
  id: string;
  authorId?: string;
  authorName: string;
  authorLocation: string;
  role: string;
  roleTa: string;
  roleHi: string;
  category: 'story' | 'question' | 'marketplace' | 'encouragement';
  circleGroupId?: string;
  title: string;
  content: string;
  likes: number;
  isLiked?: boolean;
  timestamp: string;
  replies: {
    id: string;
    authorName: string;
    content: string;
    timestamp: string;
  }[];
  isAnonymous?: boolean;
  isSampleStory?: boolean;
}

export interface CommunityCircleGroup {
  id: string;
  name: string;
  nameTa: string;
  nameHi: string;
  description: string;
  descriptionTa: string;
  descriptionHi: string;
  icon: string;
  memberCount: number;
}

export type CircleProblemCategory = 
  | 'livelihood_wages'
  | 'education_restart'
  | 'safety_rights'
  | 'shg_collective'
  | 'raw_material_sourcing'
  | 'health_childcare'
  | 'business_capital' // legacy compat
  | 'job_orders'       // legacy compat
  | 'legal_family'     // legacy compat
  | 'health_nutrition' // legacy compat
  | 'unorganized_labor';

export interface ProblemCircleResource {
  id: string;
  title: string;
  titleTa: string;
  titleHi: string;
  type: 'helpline' | 'portal' | 'office' | 'guide';
  contactOrLink: string;
  note: string;
  noteTa: string;
  noteHi: string;
}

export interface ProblemCircleExperience {
  id: string;
  authorAlias: string;
  location: string;
  title: string;
  titleTa: string;
  titleHi: string;
  story: string;
  storyTa: string;
  storyHi: string;
  outcome: string;
  outcomeTa: string;
  outcomeHi: string;
  date: string;
}

export interface ProblemCircle {
  id: string;
  name: string;
  nameTa: string;
  nameHi: string;
  category: CircleProblemCategory;
  region: 'puducherry' | 'tamil_nadu' | 'all';
  district: string;
  districtTa: string;
  districtHi: string;
  isPrivate: boolean; // private support circle requires request to join
  description: string;
  descriptionTa: string;
  descriptionHi: string;
  icon: string;
  activeProblem: string;
  activeProblemTa: string;
  activeProblemHi: string;
  memberCount: number;
  solvedCount: number;
  tags: string[];
  resources?: ProblemCircleResource[];
  sharedExperiences?: ProblemCircleExperience[];
}

export interface ProblemDiscussionThread {
  id: string;
  circleId: string;
  authorId?: string;
  authorAlias: string;
  isAnonymous: boolean;
  authorLocation: string;
  problemTitle: string;
  problemDescription: string;
  category: CircleProblemCategory;
  timestamp: string;
  upvotes: number;
  isUpvoted?: boolean;
  solutions: {
    id: string;
    authorAlias: string;
    isAnonymous: boolean;
    solutionText: string;
    isVerifiedByMentor?: boolean;
    timestamp: string;
    helpfulVotes: number;
    isHelpful?: boolean;
  }[];
  collectiveAction?: {
    actionTitle: string;
    actionDescription: string;
    targetAuthority: string;
    pledgedCount: number;
    hasUserPledged?: boolean;
  };
}

export interface PrivacyConfig {
  discreetMode: boolean; // Quick panic shield
  pinLockEnabled: boolean;
  pinCode: string;
  anonymousCommunity: boolean;
  largeText: boolean;
  soundEnabled: boolean;
}

export interface EmergencyServiceLocation {
  id: string;
  name: string;
  nameTa: string;
  nameHi: string;
  type: 'police' | 'hospital' | 'medical_center';
  address: string;
  addressTa: string;
  addressHi: string;
  phone: string;
  lat: number;
  lng: number;
  distanceKm?: number;
}

export interface ChatContact {
  id: string;
  name: string;
  role: string;
  roleTa: string;
  roleHi: string;
  category: 'trainer' | 'mentor' | 'peer' | 'helpline';
  avatarSeed: string;
  phone?: string;
  statusText: string;
  isBlocked?: boolean;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

export interface ChatMessage {
  id: string;
  senderId: string; // 'me' or contactId
  receiverId: string;
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface LearningLesson {
  id: string;
  title: string;
  titleTa: string;
  titleHi: string;
  durationMins: number;
  summary: string;
  summaryTa: string;
  summaryHi: string;
  steps: { stepNumber: number; text: string; textTa: string; textHi: string }[];
  quizQuestion?: {
    question: string;
    questionTa: string;
    questionHi: string;
    options: string[];
    optionsTa: string[];
    optionsHi: string[];
    correctIndex: number;
    explanation: string;
    explanationTa: string;
    explanationHi: string;
  };
}

export interface LearningCourse {
  id: string;
  title: string;
  titleTa: string;
  titleHi: string;
  category: 'tailoring' | 'cooking' | 'handicrafts' | 'digital' | 'english' | 'beauty' | 'bookkeeping' | 'business';
  level: 'beginner' | 'intermediate';
  format: 'online' | 'in_person' | 'both';
  languages: ('ta' | 'en' | 'hi')[];
  duration: string;
  durationTa: string;
  durationHi: string;
  description: string;
  descriptionTa: string;
  descriptionHi: string;
  trainerName: string;
  trainerContactId: string;
  earningConnection: string;
  earningConnectionTa: string;
  earningConnectionHi: string;
  lessons: LearningLesson[];
}

export interface UserCourseProgress {
  courseId: string;
  completedLessonIds: string[];
  completedAt?: string;
}

