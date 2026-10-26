/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserProfile } from '../types';

export const sampleDemoProfiles: UserProfile[] = [
  {
    id: 'SHERISE-DEMO-1082',
    name: 'Kavitha Ramachandran',
    isDemo: true,
    preferredLanguage: 'ta',
    role: 'homemaker',
    location: 'Dharmapuri, Tamil Nadu',
    skills: ['Cooking', 'Traditional Masala Powders', 'Pickle Making'],
    interests: ['Home Micro-Business', 'Financial Independence', 'Safe UPI Payments'],
    availableHoursPerDay: 2,
    availableBudget: 2500,
    bio: 'Homemaker with 2 school-going children. Looking to earn extra income from traditional kitchen recipes without neglecting household responsibilities.',
    trustedContactName: 'Sundaram (Brother)',
    trustedContactPhone: '9840123456',
    isTrainer: false,
    joinedDate: 'October 2026',
  },
  {
    id: 'SHERISE-DEMO-2491',
    name: 'Meena Sundaram',
    isDemo: true,
    preferredLanguage: 'ta',
    role: 'dropout',
    location: 'Madurai, Tamil Nadu',
    skills: ['Basic Tailoring', 'Saree Kuchu', 'Embroidery'],
    interests: ['10th Standard NIOS Completion', 'Free Sewing Machine Scheme', 'Boutique Business'],
    availableHoursPerDay: 4,
    availableBudget: 1500,
    bio: 'Discontinued education after 8th standard due to financial constraints. Highly motivated to finish 10th standard from home and start a 2-machine blouse stitching unit.',
    trustedContactName: 'Anitha (Sister)',
    trustedContactPhone: '9443219876',
    isTrainer: true,
    teachingSkills: ['Beginner Blouse Stitching', 'Saree Tassel Making'],
    joinedDate: 'September 2026',
  },
  {
    id: 'SHERISE-DEMO-3842',
    name: 'Shanti Devi',
    isDemo: true,
    preferredLanguage: 'hi',
    role: 'rural_artisan',
    location: 'Varanasi, Uttar Pradesh',
    skills: ['Handicrafts', 'Embroidery', 'Digital Mobile Banking'],
    interests: ['Self-Help Group Grants', 'Teaching Local Women', 'Selling Handicrafts'],
    availableHoursPerDay: 3,
    availableBudget: 5000,
    bio: 'Rural artisan and self-help group secretary. Passionate about empowering neighboring village women to become Lakhpati Didis.',
    trustedContactName: 'Geeta Devi (SHG President)',
    trustedContactPhone: '9123456789',
    isTrainer: true,
    teachingSkills: ['Jute & Cloth Bag Stitching', 'Safe Mobile Banking'],
    joinedDate: 'August 2026',
  },
];

export function getInitialUserProfile(): UserProfile {
  try {
    const saved = localStorage.getItem('sherise_user_profile');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // fallback
  }
  return sampleDemoProfiles[0];
}

export function generateDemoId(): string {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `SHERISE-DEMO-${rand}`;
}
