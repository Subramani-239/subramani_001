/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChatContact, ChatMessage } from '../types';

export const initialChatContacts: ChatContact[] = [
  {
    id: 'contact-trainer-1',
    name: 'Selvi Master (Tailoring Trainer)',
    role: 'Certified Tailoring & Aari Embroidery Instructor',
    roleTa: 'சான்றிதழ் பெற்ற தையல் & ஆரி பயிற்சி ஆசிரியை',
    roleHi: 'प्रमाणित सिलाई व आरी कढ़ाई प्रशिक्षिका',
    category: 'trainer',
    avatarSeed: 'S',
    phone: '9840984011',
    statusText: 'Available for student questions',
    lastMessage: 'Welcome! Let me know if you need help with blouse sleeve cutting.',
    lastMessageTime: '10:15 AM',
    unreadCount: 1,
  },
  {
    id: 'contact-mentor-1',
    name: 'Dr. Revathi Raman',
    role: 'Rural Livelihood & SHG Enterprise Mentor',
    roleTa: 'கிராமப்புற வாழ்வாதார & SHG வழிகாட்டி',
    roleHi: 'ग्रामीण आजीविका व एसएचजी मेंटर',
    category: 'mentor',
    avatarSeed: 'R',
    phone: '9443944322',
    statusText: 'Active guide on Govt Grants & Enterprise',
    lastMessage: 'Have you verified your smart ration card details for the scheme?',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
  },
  {
    id: 'contact-peer-1',
    name: 'Anitha from Salem',
    role: 'Fellow Learner (Poultry & Organic Pickles)',
    roleTa: 'சக தோழி (நாட்டுக்கோழி & ஊறுகாய் தயாரிப்பாளர்)',
    roleHi: 'साथी सहेली (मुर्गीपालन व अचार निर्माता)',
    category: 'peer',
    avatarSeed: 'A',
    statusText: 'Learning Backyard Poultry',
    lastMessage: 'Akka, my country chickens started laying eggs today! So happy.',
    lastMessageTime: '2 days ago',
    unreadCount: 0,
  },
  {
    id: 'contact-help-1',
    name: '181 Women Support Coordinator',
    role: 'Government 24/7 Women Helpline Desk',
    roleTa: 'அரசு 24 மணி நேர மகளிர் உதவி மைய ஒருங்கிணைப்பாளர்',
    roleHi: 'सरकारी 24/7 महिला हेल्पलाइन समन्वयक',
    category: 'helpline',
    avatarSeed: 'H',
    phone: '181',
    statusText: '24/7 Toll-Free Support',
    lastMessage: 'We are here to assist with legal, emergency, and welfare guidance.',
    lastMessageTime: 'Support Active',
    unreadCount: 0,
  },
];

export const initialChatMessages: Record<string, ChatMessage[]> = {
  'contact-trainer-1': [
    {
      id: 'msg-1',
      senderId: 'contact-trainer-1',
      receiverId: 'me',
      text: 'வணக்கம் சகோதரி! தையல் பாடங்களில் உங்களுக்கு ஏதேனும் சந்தேகம் இருந்தால் கேளுங்கள். (Welcome! Feel free to ask any tailoring doubts).',
      timestamp: '10:00 AM',
      status: 'read',
    },
    {
      id: 'msg-2',
      senderId: 'me',
      receiverId: 'contact-trainer-1',
      text: 'Akka, how much fabric do I need for a 34-inch blouse?',
      timestamp: '10:12 AM',
      status: 'read',
    },
    {
      id: 'msg-3',
      senderId: 'contact-trainer-1',
      receiverId: 'me',
      text: 'For 34-inch blouse, 80cm fabric is sufficient. For puff sleeves or designer neck, keep 1 meter fabric.',
      timestamp: '10:15 AM',
      status: 'delivered',
    },
  ],
  'contact-mentor-1': [
    {
      id: 'msg-4',
      senderId: 'contact-mentor-1',
      receiverId: 'me',
      text: 'Namaste! Are you planning to apply for the free motorized sewing machine & toolkit grant this month?',
      timestamp: 'Yesterday',
      status: 'read',
    },
  ],
};
