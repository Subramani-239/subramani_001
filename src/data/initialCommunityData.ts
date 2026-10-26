/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommunityPost, CommunityCircleGroup } from '../types';

export const communityCircleGroups: CommunityCircleGroup[] = [
  {
    id: 'circle-tailoring',
    name: 'Rural Tailoring & Embroidery Guild',
    nameTa: 'கிராம தையல் & ஆடை வடிவமைப்பு வட்டம்',
    nameHi: 'ग्रामीण सिलाई व कढ़ाई समूह',
    description: 'Blouse cutting, stitching tips, machine repair, and bulk school uniform orders.',
    descriptionTa: 'ஜாக்கெட் கட்டிங், தையல் நுணுக்கங்கள், மெஷின் பழுதுநீக்கம் மற்றும் மொத்த பள்ளி சீருடை ஆர்டர்கள்.',
    descriptionHi: 'ब्लाउज कटिंग, सिलाई तकनीक, मशीन मरम्मत और स्कूल ड्रेस ऑर्डर।',
    icon: '✂️',
    memberCount: 1420,
  },
  {
    id: 'circle-farming',
    name: 'Organic Farming & Country Poultry',
    nameTa: 'இயற்கை விவசாயம் & நாட்டுக்கோழி வளர்ப்பு',
    nameHi: 'जैविक खेती व देशी मुर्गी पालन',
    description: 'Backyard country chicken, vermicompost, millet cultivation, and local egg sales.',
    descriptionTa: 'நாட்டுக்கோழி வளர்ப்பு, மண்புழு உரம், சிறுதானிய சாகுபடி மற்றும் உள்ளூர் முட்டை விற்பனை.',
    descriptionHi: 'देशी मुर्गी पालन, केंचुआ खाद, बाजरा खेती और स्थानीय अंडे की बिक्री।',
    icon: '🌾',
    memberCount: 980,
  },
  {
    id: 'circle-education',
    name: 'Education Second Chance Seekers',
    nameTa: 'மீண்டும் கல்வி: 10th / 12th / கல்லூரி படிப்போர்',
    nameHi: 'शिक्षा द्वितीय अवसर (10वीं / 12वीं / डिग्री)',
    description: 'NIOS distance exams, Open University courses, and study help for discontinued women.',
    descriptionTa: 'NIOS தொலைதூர தேர்வு, திறந்தநிலை பல்கலைக்கழக படிப்புகள் மற்றும் பெண்களுக்கான பாட உதவி.',
    descriptionHi: 'एनआईओएस ओपन स्कूल, पत्राचार परीक्षा और अध्ययन सहायता।',
    icon: '📚',
    memberCount: 750,
  },
  {
    id: 'circle-food',
    name: 'Home Masala, Snacks & Pickles Hub',
    nameTa: 'உணவு தயாரிப்பு, மசாலா பொடி & ஊறுகாய் வட்டம்',
    nameHi: 'घरेलू मसाले, नाश्ता और अचार संघ',
    description: 'Preservative-free traditional spices, shelf-life secrets, and FSSAI basic registration.',
    descriptionTa: 'பாரம்பரிய இட்லி பொடி, சாம்பார் தூள், கெடாமல் பாதுகாக்கும் முறைகள் & FSSAI பதிவு.',
    descriptionHi: 'पारंपरिक मसाले, शेल्फ-लाइफ टिप्स और एफएसएसएआई पंजीकरण।',
    icon: '🍲',
    memberCount: 1120,
  },
  {
    id: 'circle-digital',
    name: 'CSC, Digital E-Sevai & Online Services',
    nameTa: 'டிஜிட்டல் இ-சேவை & கணினி தொழில் நெட்வொர்க்',
    nameHi: 'डिजिटल ई-सेवा व ऑनलाइन सेवा समूह',
    description: 'Aadhaar updates, Patta-Chitta downloads, certificate printing, and phone recharging.',
    descriptionTa: 'பட்டா-சிட்டா பதிவிறக்கம், அரசு சான்றிதழ் விண்ணப்பம் மற்றும் ஆன்லைன் சேவைகள்.',
    descriptionHi: 'सरकारी प्रमाण पत्र आवेदन, ऑनलाइन प्रिंटिंग व बिल भुगतान।',
    icon: '💻',
    memberCount: 640,
  },
];

export const initialCommunityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    authorName: 'Muthumari S.',
    authorLocation: 'Madurai District',
    role: 'Tailoring Entrepreneur',
    roleTa: 'தையல் தொழில் முனைவர்',
    roleHi: 'सिलाई उद्यमी',
    category: 'story',
    circleGroupId: 'circle-tailoring',
    title: 'From 8th Std Dropout to Running a 4-Machine Stitching Unit!',
    content: '10 years ago, I discontinued school in 8th standard due to my family situation. Through Tamil Nadu Mahalir Thittam, I took 2 months free tailoring training. With grant support and self-help savings of ₹45,000, I bought 2 second-hand machines. Today, 3 other women work with me, and we stitch uniforms for 2 private schools. Never lose heart, sisters! Your hands have gold!',
    likes: 48,
    isLiked: false,
    timestamp: '2 hours ago',
    isSampleStory: true,
    replies: [
      {
        id: 'rep-1',
        authorName: 'Anitha R.',
        content: 'Romba perumaiya irukku akka! Very inspiring story for all of us.',
        timestamp: '1 hour ago'
      },
      {
        id: 'rep-2',
        authorName: 'Sister (தோழி)',
        content: 'Akka, which school uniform contractor did you talk to first?',
        timestamp: '35 mins ago'
      }
    ]
  },
  {
    id: 'post-2',
    authorName: 'Sister (தோழி)',
    authorLocation: 'Dharmapuri',
    role: 'Homemaker & Learner',
    roleTa: 'இல்லத்தரசி & மாணவி',
    roleHi: 'गृहणी व शिक्षार्थी',
    category: 'question',
    circleGroupId: 'circle-education',
    title: 'Can I complete 10th standard through NIOS if I am 32 years old?',
    content: 'வணக்கம் தோழிகளே. I stopped studying after 7th standard when I got married. Now my children are going to high school and I want to complete my 10th standard. Will people laugh at me? Is NIOS exam difficult to write in Tamil? Please advise me.',
    likes: 35,
    isLiked: false,
    timestamp: '5 hours ago',
    isSampleStory: true,
    replies: [
      {
        id: 'rep-3',
        authorName: 'Kavitha Teacher',
        content: 'No one will laugh at you! Age is just a number. NIOS books are in simple Tamil. You can write 2 subjects this year and 3 subjects next year. We are all supporting you!',
        timestamp: '3 hours ago'
      }
    ]
  },
  {
    id: 'post-3',
    authorName: 'Selvi Murugesan',
    authorLocation: 'Thanjavur',
    role: 'Organic Food Maker',
    roleTa: 'பாரம்பரிய உணவு தயாரிப்பாளர்',
    roleHi: 'पारंपरिक खाद्य उत्पादक',
    category: 'marketplace',
    circleGroupId: 'circle-food',
    title: 'Home-ground Ragi Flour & Pure Sesame Idli Podi',
    content: 'We make pure stone-ground Idli Podi and Ragi flour using traditional organic methods in our village. Free from colors and preservatives. Packets available from ₹80. We can send via courier or village bus to nearby towns!',
    likes: 62,
    isLiked: false,
    timestamp: 'Yesterday',
    isSampleStory: true,
    replies: [
      {
        id: 'rep-4',
        authorName: 'Banu Priya',
        content: 'Can you deliver to Trichy? I want 2kg Idli Podi for my family.',
        timestamp: 'Yesterday'
      }
    ]
  },
  {
    id: 'post-4',
    authorName: 'Kamala Devi',
    authorLocation: 'Tiruvannamalai',
    role: 'Backyard Poultry Farmer',
    roleTa: 'நாட்டுக்கோழி வளர்ப்பாளர்',
    roleHi: 'देशी मुर्गी पालनकर्ता',
    category: 'story',
    circleGroupId: 'circle-farming',
    title: 'My 15 Country Chickens Paid My Son’s College Exam Fees!',
    content: 'My husband is a daily wage laborer. During off-season, money was very tight. I started rearing 15 native country chickens in our backyard. Selling 8 eggs daily at ₹12 each gave me ₹2,800 every month without leaving my house. Last month, I paid my son’s diploma semester exam fee using only my poultry savings!',
    likes: 89,
    isLiked: false,
    timestamp: '2 days ago',
    isSampleStory: true,
    replies: []
  }
];
