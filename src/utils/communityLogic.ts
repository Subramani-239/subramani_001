/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommunityPost, CommunityCircleGroup } from '../types';

export const communitySupportGroups: CommunityCircleGroup[] = [
  {
    id: 'circle-education',
    name: 'Education & Exam Restart',
    nameTa: 'படிப்பை தொடங்குதல் & தேர்வுகள்',
    nameHi: 'शिक्षा व परीक्षा पुनः शुरुआत',
    description: 'Guidance, study materials, and peer encouragement for women resuming 10th, 12th, or college degrees.',
    descriptionTa: '10-ஆம் வகுப்பு, +2 மற்றும் கல்லூரி படிப்பை மீண்டும் தொடங்கும் பெண்களுக்கான வழிகாட்டுதல் மற்றும் உதவிகள்.',
    descriptionHi: '10वीं, 12वीं या कॉलेज की पढ़ाई दोबारा शुरू करने वाली महिलाओं के लिए मार्गदर्शन और अध्ययन सामग्री।',
    icon: '🎓',
    memberCount: 342
  },
  {
    id: 'circle-business',
    name: 'Micro-Enterprises & SHG Livelihoods',
    nameTa: 'சிறு தொழில்கள் & சுயஉதவிக்குழுக்கள்',
    nameHi: 'सूक्ष्म उद्यम एवं स्वयं सहायता समूह',
    description: 'Practical business discussions, pricing products, overcoming cash crunches, and finding first customers.',
    descriptionTa: 'சிறிய வீட்டுத் தொழில்கள், நியாயமான விலை நிர்ணயம் மற்றும் வாடிக்கையாளர்களை கவரும் நடைமுறை ஆலோசனைகள்.',
    descriptionHi: 'गृह उद्योग, सही मूल्य निर्धारण, वित्तीय प्रबंधन और ग्राहक खोजने के व्यावहारिक सुझाव।',
    icon: '💼',
    memberCount: 512
  },
  {
    id: 'circle-tailoring',
    name: 'Tailoring, Crafts & Handloom',
    nameTa: 'தையல், கைவினை & எம்பிராய்டரி',
    nameHi: 'सिलाई, कढ़ाई व हस्तशिल्प',
    description: 'Blouse cutting patterns, stitching tips, finding wholesale fabrics, and sewing machine maintenance.',
    descriptionTa: 'பிளவுஸ் கட்டிங், தையல் கலை நுணுக்கங்கள், துணி மொத்த வியாபாரம் மற்றும் தையல் இயந்திர பராமரிப்பு.',
    descriptionHi: 'सिलाई कटिंग, सिलाई तकनीक, थोक कपड़ा बाजार और सिलाई मशीन रखरखाव पर चर्चा।',
    icon: '🧵',
    memberCount: 428
  },
  {
    id: 'circle-schemes',
    name: 'Govt Schemes & Legal Rights',
    nameTa: 'அரசு நலத்திட்டங்கள் & சட்ட உரிமைகள்',
    nameHi: 'सरकारी योजनाएं व कानूनी अधिकार',
    description: 'Real experiences with Taluk offices, e-Sevai centers, ration cards, land ownership rights, and grievance remedies.',
    descriptionTa: 'வட்டாட்சியர் அலுவலகம், இ-சேவை மையம், ரேஷன் கார்டு, மகளிர் உரிமைத்தொகை மற்றும் பெண்கள் சட்ட உரிமைகள்.',
    descriptionHi: 'ई-सेवा केंद्र, राशन कार्ड, महिला अधिकार योजनाएं और कानूनी सहायता पर सत्यापित जानकारी।',
    icon: '📜',
    memberCount: 389
  },
  {
    id: 'circle-digital',
    name: 'Smartphone, UPI & Digital Literacy',
    nameTa: 'ஸ்மார்ட்போன், UPI & இணையப் பாதுகாப்பு',
    nameHi: 'स्मार्टफोन, यूपीआई व डिजिटल सुरक्षा',
    description: 'How to use WhatsApp Business, receive UPI payments without scams, download certificates, and stay safe online.',
    descriptionTa: 'வாட்ஸ்அப் பிசினஸ், போன் பே / கூகுள் பே பாதுகாப்பு மற்றும் போலியான ஆன்லைன் மோசடிகளில் இருந்து தப்புவது எப்படி.',
    descriptionHi: 'व्हाट्सएप बिजनेस, सुरक्षित यूपीआई भुगतान और ऑनलाइन धोखाधड़ी से बचाव की सरल जानकारी।',
    icon: '📱',
    memberCount: 295
  },
  {
    id: 'circle-health',
    name: 'Family Health, Nutrition & Well-being',
    nameTa: 'குடும்ப நலம், ஊட்டச்சத்து & நல்வாழ்வு',
    nameHi: 'परिवार स्वास्थ्य, पोषण एवं कल्याण',
    description: 'Women nutrition, hemoglobin care, maternal schemes, traditional remedies, and emotional support.',
    descriptionTa: 'பெண்கள் உடல்நலம், ரத்த சோகை தவிர்த்தல், தாய்-சேய் நலத்திட்டங்கள் மற்றும் மன அமைதிக்கான பகிர்வுகள்.',
    descriptionHi: 'महिला स्वास्थ्य, पोषण, एनीमिया रोकथाम, मातृत्व सहायता और मानसिक सुकून पर संवाद।',
    icon: '🌱',
    memberCount: 260
  }
];

export function canEditPost(post: CommunityPost, currentUserId: string, currentUserName?: string): boolean {
  // If post belongs to this user session (matches authorName or is marked as own in localStorage or demoId)
  if (!post) return false;
  if ((post as any).authorId && (post as any).authorId === currentUserId) return true;
  if (currentUserName && post.authorName.toLowerCase() === currentUserName.toLowerCase()) return true;
  if (post.id.startsWith('post-user-') || post.id.startsWith(`post-${currentUserId}`)) return true;
  return false;
}

export function canDeletePost(post: CommunityPost, currentUserId: string, currentUserName?: string): boolean {
  return canEditPost(post, currentUserId, currentUserName);
}

export function filterCommunityPosts(
  posts: CommunityPost[],
  options: {
    selectedCircleId: string;
    selectedCategory: string;
    searchQuery: string;
    blockedAuthors: string[];
  }
): CommunityPost[] {
  const { selectedCircleId, selectedCategory, searchQuery, blockedAuthors } = options;
  const q = searchQuery.trim().toLowerCase();

  return posts.filter((post) => {
    // Blocked author check
    if (blockedAuthors.includes(post.authorName)) return false;

    // Circle group filter
    if (selectedCircleId !== 'all') {
      if (post.circleGroupId !== selectedCircleId) return false;
    }

    // Category filter
    if (selectedCategory !== 'all') {
      if (post.category !== selectedCategory) return false;
    }

    // Text query search
    if (q) {
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchContent = post.content.toLowerCase().includes(q);
      const matchAuthor = post.authorName.toLowerCase().includes(q);
      const matchLocation = post.authorLocation.toLowerCase().includes(q);
      return matchTitle || matchContent || matchAuthor || matchLocation;
    }

    return true;
  });
}
