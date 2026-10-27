/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  calculateCommission,
  generateDemoUpiTxnId,
  isDuplicateTransaction,
  requiresAdminApproval,
  validateCourseSubmission,
  verifyCertificateEligibility,
  issueCertificate,
  evaluateRefundEligibility,
  verifyPaymentWebhookSignature,
} from './learningBusinessLogic';
import { CourseBooking, LearningCourse } from '../types';

describe('Learning & Earning Business Logic', () => {
  describe('calculateCommission (Transparent 10% Platform Fee)', () => {
    it('calculates 10% fee and 90% net teacher payout for ₹1000 (Exact prompt specification)', () => {
      const result = calculateCommission(1000);
      assert.strictEqual(result.fee, 1000);
      assert.strictEqual(result.platformFee, 100);
      assert.strictEqual(result.teacherEarnings, 900);
      assert.strictEqual(result.commissionRatePercent, 10);
    });

    it('calculates 10% fee for ₹500 course accurately', () => {
      const result = calculateCommission(500);
      assert.strictEqual(result.fee, 500);
      assert.strictEqual(result.platformFee, 50);
      assert.strictEqual(result.teacherEarnings, 450);
    });

    it('supports custom commission rate when provided', () => {
      const result = calculateCommission(1000, 5);
      assert.strictEqual(result.platformFee, 50);
      assert.strictEqual(result.teacherEarnings, 950);
    });

    it('handles free course (₹0) with zero fees and earnings', () => {
      const result = calculateCommission(0);
      assert.strictEqual(result.fee, 0);
      assert.strictEqual(result.platformFee, 0);
      assert.strictEqual(result.teacherEarnings, 0);
    });
  });

  describe('Payment Webhook Verification & Security', () => {
    it('verifies valid simulated HMAC webhook signatures', () => {
      assert.strictEqual(verifyPaymentWebhookSignature('order_1', 'pay_1', 'sig_abcdef1234567890'), true);
      assert.strictEqual(verifyPaymentWebhookSignature('order_1', 'pay_1', '3f4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d'), true);
    });

    it('rejects missing or empty webhook signatures', () => {
      assert.strictEqual(verifyPaymentWebhookSignature('', 'pay_1', 'sig_123'), false);
      assert.strictEqual(verifyPaymentWebhookSignature('order_1', '', 'sig_123'), false);
      assert.strictEqual(verifyPaymentWebhookSignature('order_1', 'pay_1', ''), false);
    });
  });

  describe('Demo UPI Transactions & Anti-Duplicate Protection', () => {
    it('generates distinct demo transaction ID format starting with UPI-DEMO', () => {
      const id1 = generateDemoUpiTxnId();
      const id2 = generateDemoUpiTxnId();
      assert.ok(id1.startsWith('UPI-DEMO-'));
      assert.ok(id2.startsWith('UPI-DEMO-'));
      assert.notStrictEqual(id1, id2);
    });

    it('flags duplicate transaction IDs accurately', () => {
      const existing = ['UPI-DEMO-TEST-1', 'UPI-DEMO-TEST-2'];
      assert.strictEqual(isDuplicateTransaction(existing, 'UPI-DEMO-TEST-1'), true);
      assert.strictEqual(isDuplicateTransaction(existing, 'UPI-DEMO-NEW-3'), false);
    });
  });

  describe('Course Submission & Admin Approval Safeguards', () => {
    it('requires admin approval for all paid courses (fee > 0)', () => {
      assert.strictEqual(requiresAdminApproval(500), true);
      assert.strictEqual(requiresAdminApproval(1), true);
      assert.strictEqual(requiresAdminApproval(0), false);
    });

    it('validates incomplete course submissions and catches errors', () => {
      const invalidCourse: Partial<LearningCourse> = {
        title: '',
        fee: -100,
      };
      const validation = validateCourseSubmission(invalidCourse);
      assert.strictEqual(validation.valid, false);
      assert.ok(validation.errors.length >= 3);
    });

    it('passes validation when all required fields and cancellation policy are present', () => {
      const validCourse: Partial<LearningCourse> = {
        title: 'Mastering Traditional Aari Embroidery',
        category: 'tailoring',
        fee: 450,
        format: 'in_person',
        cancellationPolicy: '100% refund available up to 24 hours prior to batch start date.',
        lessons: [
          {
            id: 'les-1',
            title: 'Needle Holding',
            titleTa: '',
            titleHi: '',
            durationMins: 30,
            summary: '',
            summaryTa: '',
            summaryHi: '',
            steps: [],
          },
        ],
      };
      const validation = validateCourseSubmission(validCourse);
      assert.strictEqual(validation.valid, true);
      assert.strictEqual(validation.errors.length, 0);
    });
  });

  describe('Genuine Certificate Verification & Tamper Check', () => {
    const mockCourse: LearningCourse = {
      id: 'test-course',
      title: 'Practical Blouse Stitching',
      titleTa: '',
      titleHi: '',
      category: 'tailoring',
      level: 'beginner',
      format: 'both',
      languages: ['ta', 'en'],
      duration: '2 Weeks',
      durationTa: '',
      durationHi: '',
      description: 'Hands-on tailoring',
      descriptionTa: '',
      descriptionHi: '',
      trainerName: 'Master Lakshmi',
      trainerContactId: 'trn-1',
      earningConnection: 'Earn from home',
      earningConnectionTa: '',
      earningConnectionHi: '',
      fee: 400,
      approvalStatus: 'approved',
      availableSeats: 5,
      maxSeats: 15,
      cancellationPolicy: 'Full refund 24h before',
      practicalProjectPrompt: 'Upload picture of your finished 4-dart blouse',
      lessons: [
        {
          id: 'l1',
          title: 'Lesson 1',
          titleTa: '',
          titleHi: '',
          durationMins: 15,
          summary: '',
          summaryTa: '',
          summaryHi: '',
          steps: [],
        },
        {
          id: 'l2',
          title: 'Lesson 2',
          titleTa: '',
          titleHi: '',
          durationMins: 15,
          summary: '',
          summaryTa: '',
          summaryHi: '',
          steps: [],
        },
      ],
    };

    it('denies certificate if lessons are incomplete', () => {
      const check = verifyCertificateEligibility(mockCourse, ['l1'], true, true);
      assert.strictEqual(check.eligible, false);
      assert.ok(check.pendingRequirements.some((r) => r.includes('all lessons')));
    });

    it('denies certificate if quiz is not passed', () => {
      const check = verifyCertificateEligibility(mockCourse, ['l1', 'l2'], false, true);
      assert.strictEqual(check.eligible, false);
      assert.ok(check.pendingRequirements.some((r) => r.includes('quiz')));
    });

    it('denies certificate if practical assignment is not submitted', () => {
      const check = verifyCertificateEligibility(mockCourse, ['l1', 'l2'], true, false);
      assert.strictEqual(check.eligible, false);
      assert.ok(check.pendingRequirements.some((r) => r.includes('practical work')));
    });

    it('grants certificate when all genuine criteria are met and issues valid certificate record', () => {
      const check = verifyCertificateEligibility(mockCourse, ['l1', 'l2'], true, true);
      assert.strictEqual(check.eligible, true);
      assert.strictEqual(check.pendingRequirements.length, 0);

      const cert = issueCertificate(mockCourse, 'USR-101', 'Ananya Devi', 'Stitched a custom blouse with clean piping.');
      assert.ok(cert.certificateId.startsWith('SHERISE-CERT-'));
      assert.strictEqual(cert.learnerName, 'Ananya Devi');
      assert.ok(cert.verificationHash.startsWith('VERIFIED-'));
    });
  });

  describe('Anti-Scam Escrow & Refund Evaluation', () => {
    const mockBooking: CourseBooking = {
      id: 'BK-100',
      courseId: 'c-1',
      courseTitle: 'Cooking Course',
      learnerId: 'u-1',
      learnerName: 'Kamala',
      bookingDate: '2026-10-25',
      batchSchedule: 'Starting next Monday',
      classFormat: 'online',
      venueOrLink: 'https://meet.google.com/demo',
      status: 'confirmed',
      courseFee: 600,
      platformFee: 30,
      teacherEarnings: 570,
      paymentMethod: 'demo_upi',
      demoUpiTxnId: 'UPI-DEMO-1234',
      escrowStatus: 'held_in_escrow',
    };

    it('approves refund for active booking under escrow hold protection', () => {
      const refund = evaluateRefundEligibility(mockBooking, false);
      assert.strictEqual(refund.eligible, true);
      assert.strictEqual(refund.refundAmount, 600);
    });

    it('rejects duplicate refund if already refunded', () => {
      const refundedBooking: CourseBooking = {
        ...mockBooking,
        status: 'refunded',
      };
      const refund = evaluateRefundEligibility(refundedBooking, false);
      assert.strictEqual(refund.eligible, false);
    });

    it('allows refund on completed booking if genuine dispute is active', () => {
      const completedBooking: CourseBooking = {
        ...mockBooking,
        status: 'completed',
      };
      const refundWithoutDispute = evaluateRefundEligibility(completedBooking, false);
      assert.strictEqual(refundWithoutDispute.eligible, false);

      const refundWithDispute = evaluateRefundEligibility(completedBooking, true);
      assert.strictEqual(refundWithDispute.eligible, true);
      assert.strictEqual(refundWithDispute.refundAmount, 600);
    });
  });
});
