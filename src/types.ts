/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'ta' | 'en' | 'hi';

export type PlatformRole = 'learner' | 'teacher' | 'entrepreneur' | 'admin';

export type ActiveTab = 
  | 'dashboard'          // Home
  | 'learn'              // Learn (Courses, Classes, Certificates)
  | 'find-teachers'      // Find Teachers
  | 'earn'               // Earn (Jobs, Self-Employment, Vocational Income)
  | 'entrepreneurs'      // Entrepreneurs Hub
  | 'schemes'            // Government Schemes
  | 'payments'           // UPI Payments & Financial Reports
  | 'profile'            // Profile & Roles
  // Secondary / Preserved feature views:
  | 'skills-learning'
  | 'skills'
  | 'education'
  | 'business-generator'
  | 'budget-calculator'
  | 'emergency-help'
  | 'chat-call'
  | 'community'
  | 'admin'
  | 'privacy'
  | 'deployment-guide';

export interface UserProfile {
  id: string; // e.g. "SHERISE-DEMO-7842"
  demoId?: string;
  name: string;
  isDemo: boolean;
  preferredLanguage: Language;
  platformRole?: PlatformRole; // learner, teacher, entrepreneur, admin
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

export type TeacherVerificationStatus = 'verified' | 'pending' | 'unverified';
export type TeacherBadgeType = 'government_certified' | 'skill_master' | 'peer_verified';

export interface TeacherProfile {
  id: string;
  name: string;
  bio: string;
  bioTa?: string;
  bioHi?: string;
  experienceYears: number;
  skills: string[];
  location: string;
  verificationStatus: TeacherVerificationStatus;
  verificationBadge?: TeacherBadgeType;
  verificationNotes?: string;
  phoneShared?: boolean;
  phoneNumber?: string;
  rating: number;
  reviewCount: number;
  totalEarningsEst: number;
}

export type CourseApprovalStatus = 'approved' | 'pending_approval' | 'rejected';
export type CourseClassFormat = 'online' | 'in_person' | 'both';

export interface LearningCourse {
  id: string;
  title: string;
  titleTa: string;
  titleHi: string;
  category: 'tailoring' | 'cooking' | 'handicrafts' | 'digital' | 'english' | 'beauty' | 'bookkeeping' | 'business';
  level: 'beginner' | 'intermediate';
  format: CourseClassFormat;
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
  // Learning & Earning Platform Enhancements
  fee: number; // in INR (0 for free)
  approvalStatus: CourseApprovalStatus;
  approvalFeedback?: string;
  venueOrLink?: string;
  batchSchedule?: string;
  availableSeats: number;
  maxSeats: number;
  cancellationPolicy: string;
  cancellationPolicyTa?: string;
  cancellationPolicyHi?: string;
  teacher?: TeacherProfile;
  practicalProjectPrompt?: string;
  practicalProjectPromptTa?: string;
  practicalProjectPromptHi?: string;
  careerOutcomes?: string[];
  careerOutcomesTa?: string[];
  careerOutcomesHi?: string[];
}

export interface UserCourseProgress {
  courseId: string;
  completedLessonIds: string[];
  completedAt?: string;
  quizPassed?: boolean;
  practicalSubmitted?: boolean;
  practicalSubmissionNotes?: string;
  certificateId?: string;
}

export type BookingStatus = 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'refunded' | 'disputed';
export type EscrowStatus = 'held_in_escrow' | 'released_to_teacher' | 'refunded_to_learner';

export interface CourseBooking {
  id: string; // e.g. "BK-90218"
  courseId: string;
  courseTitle: string;
  learnerId: string;
  learnerName: string;
  bookingDate: string;
  batchSchedule: string;
  classFormat: 'online' | 'in_person';
  venueOrLink: string;
  status: BookingStatus;
  courseFee: number;
  platformFee: number; // 5%
  teacherEarnings: number; // 95%
  paymentMethod: 'demo_upi';
  demoUpiTxnId: string;
  escrowStatus: EscrowStatus;
  cancellationReason?: string;
  refundAmount?: number;
  disputeId?: string;
}

export type DisputeReason =
  | 'fake_teacher'
  | 'misleading_curriculum'
  | 'class_cancelled_no_notice'
  | 'payment_issue'
  | 'poor_quality';

export interface DisputeReport {
  id: string; // e.g. "DISP-7812"
  bookingId?: string;
  courseId: string;
  courseTitle: string;
  learnerId: string;
  learnerName: string;
  teacherId?: string;
  teacherName: string;
  reason: DisputeReason;
  description: string;
  evidenceNote: string;
  submittedAt: string;
  status: 'under_investigation' | 'refund_approved' | 'dismissed';
  adminResolutionNote?: string;
  resolvedAt?: string;
  refundIssued?: boolean;
  refundAmount?: number;
}

export interface SkillCertificate {
  certificateId: string; // e.g. "SHERISE-CERT-2026-9812"
  courseId: string;
  courseTitle: string;
  learnerName: string;
  learnerId: string;
  teacherName: string;
  teacherVerificationBadge?: TeacherBadgeType;
  issuedDate: string;
  gradeScore: string;
  practicalProjectSummary?: string;
  verificationHash: string;
  skillsCertified: string[];
}

export interface PayoutRecord {
  id: string; // e.g. "PAYOUT-7821"
  teacherId: string;
  teacherName: string;
  amount: number;
  method: 'upi' | 'imps' | 'neft';
  destinationVpaOrAccount: string;
  status: 'processing' | 'settled' | 'failed';
  initiatedAt: string;
  settledAt?: string;
  providerReferenceId: string;
  notes: string;
}

export interface JobListing {
  id: string;
  title: string;
  titleTa: string;
  titleHi?: string;
  type: 'job' | 'self_employment' | 'freelance_order' | 'micro_task';
  category: 'tailoring' | 'cooking_catering' | 'handicrafts' | 'digital_esevai' | 'beauty' | 'retail';
  pay: string;
  payTa: string;
  payHi?: string;
  location: string;
  locationTa?: string;
  locationHi?: string;
  timing: string;
  timingTa?: string;
  timingHi?: string;
  verifiedBySherise: boolean;
  requirements: string[];
  requirementsTa?: string[];
  requirementsHi?: string[];
  contactMethod: string;
  postedDate: string;
}

export interface EntrepreneurListing {
  id: string;
  businessName: string;
  ownerName: string;
  category: string;
  description: string;
  location: string;
  servicesOrProducts: string[];
  priceRange: string;
  verifiedStatus: 'verified' | 'pending';
  contactPreference: 'in_app' | 'phone';
  phone?: string;
  rating?: number;
  reviewCount?: number;
}



