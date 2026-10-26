/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EducationOpportunity } from '../types';

export const educationData: EducationOpportunity[] = [
  {
    id: 'nios-secondary',
    title: 'National Institute of Open Schooling (NIOS) - 10th & 12th',
    titleTa: 'தேசிய திறந்தநிலை பள்ளி (NIOS) - 10 & 12-ஆம் வகுப்பு நேரடி தேர்வு',
    provider: 'Ministry of Education, Government of India',
    providerTa: 'மத்திய கல்வி அமைச்சகம், இந்திய அரசு',
    level: 'school_dropout',
    duration: 'Flexible (Up to 5 years / 9 exam attempts)',
    durationTa: 'சுய விருப்பக் காலம் (5 ஆண்டுகள் வரை அவகாசம்)',
    fees: 'Concessional / Free for female students and rural dropouts',
    feesTa: 'பெண்களுக்கு கட்டண சலுகை / குறைந்த கட்டணம்',
    description: 'If you discontinued school after 6th, 7th, 8th or 9th standard, you can directly appear for the 10th standard board exam from home in Tamil or English medium. Equal to regular state board certificate.',
    descriptionTa: 'குடும்ப சூழ்நிலையால் 6, 7, 8 அல்லது 9-ஆம் வகுப்போடு பள்ளி படிப்பை நிறுத்திய பெண்கள், நேரடியாக வீட்டில் இருந்தே 10-ஆம் வகுப்பு பொதுத்தேர்வு எழுதி அரசு அங்கீகாரம் பெற்ற சான்றிதழ் பெறலாம்.',
    eligibility: 'Minimum 14 years of age for 10th (Secondary). Can read & write in Tamil/English. No upper age limit.',
    eligibilityTa: '10-ஆம் வகுப்பிற்கு குறைந்தபட்சம் 14 வயது பூர்த்தியாகியிருக்க வேண்டும். உச்ச வயது வரம்பு இல்லை.',
    howToEnroll: [
      'Register online at sdmis.nios.ac.in or visit the nearest AI (Accredited Institution) government school.',
      'Select your preferred language (Tamil medium study material is provided free).',
      'Choose 5 subjects (e.g. Tamil, English, Social Science, Home Science, Data Entry Operations).',
      'Attend weekend contact classes at local schools or study from home with printed books.'
    ],
    howToEnrollTa: [
      'sdmis.nios.ac.in இணையதளத்தில் பதிவு செய்யவும் அல்லது அருகில் உள்ள அரசு மாதிரி பள்ளியை அணுகவும்.',
      'தமிழ் வழியை தேர்வு செய்யலாம் (இலவச புத்தகங்கள் வீட்டிற்கு அஞ்சலில் வரும்).',
      'எளிய 5 பாடங்களை தேர்வு செய்யவும் (தமிழ், ஆங்கிலம், சமூக அறிவியல், மனையியல், கம்ப்யூட்டர் தரவு பதிவு).',
      'ஞாயிறு வகுப்புகளில் பங்கேற்கலாம் அல்லது வீட்டிலேயே படித்து தேர்வு எழுதலாம்.'
    ],
    contactOrLink: 'https://nios.ac.in | Toll Free: 1800 180 9393',
    highlight: 'No Regular School Attendance Needed',
    highlightTa: 'தினமும் பள்ளி செல்ல வேண்டிய அவசியமில்லை'
  },
  {
    id: 'tnou-distance-degree',
    title: 'Tamil Nadu Open University (TNOU) Distance Degrees & Diplomas',
    titleTa: 'தமிழ்நாடு திறந்தநிலைப் பல்கலைக்கழகம் (TNOU) தொலைதூர பட்டப்படிப்பு',
    provider: 'TNOU (State University, Tamil Nadu)',
    providerTa: 'தமிழ்நாடு திறந்தநிலைப் பல்கலைக்கழகம்',
    level: 'degree_completion',
    duration: '1 to 3 Years',
    durationTa: '1 முதல் 3 ஆண்டுகள்',
    fees: '₹2,500 - ₹5,000 per year (Fee concessions for women)',
    feesTa: 'ஆண்டுக்கு ₹2,500 - ₹5,000 (பெண்களுக்கு கட்டண சலுகை)',
    description: 'Earn a recognized Bachelor’s Degree (BA Tamil, BA English, B.Com, BBA, B.Sc) or Vocational Diploma without attending daily classes. Exams held across all district centers.',
    descriptionTa: 'தினமும் கல்லூரி செல்லாமல் BA, B.Com, BBA போன்ற அரசு அங்கீகரிக்கப்பட்ட பட்டப்படிப்புகளை வீட்டில் இருந்தே படிக்கலாம். அனைத்து மாவட்டங்களிலும் தேர்வு மையங்கள் உண்டு.',
    eligibility: '12th standard pass or 10th pass + 2 years diploma or TNOU preparatory program.',
    eligibilityTa: '12-ஆம் வகுப்பு தேர்ச்சி அல்லது 10-ஆம் வகுப்பு முடித்து திறந்தநிலைப் பள்ளி படித்தவர்கள்.',
    howToEnroll: [
      'Apply online via tnou.ac.in or visit the District Regional Centre.',
      'Self-instructional course materials delivered directly to home.',
      'Weekend online/offline doubt clearance sessions conducted at government colleges.'
    ],
    howToEnrollTa: [
      'tnou.ac.in மூலம் அல்லது மாவட்ட மண்டல மையத்தில் விண்ணப்பிக்கவும்.',
      'பாடப் புத்தகங்கள் உங்கள் வீட்டிற்கே தபாலில் வந்து சேரும்.',
      'வார இறுதி நாட்களில் சந்தேகங்களை தீர்க்க அரசு கல்லூரிகளில் வழிகாட்டல் வகுப்புகள் நடக்கும்.'
    ],
    contactOrLink: 'https://tnou.ac.in | 044-24306600',
    highlight: 'UGC & Govt Recognized Degree',
    highlightTa: 'அரசு வேலைகளுக்கு தகுதியான பட்டம்'
  },
  {
    id: 'pmkvy-tailoring-craft',
    title: 'PMKVY & TNSRLM Free Skill Certification & Stipend',
    titleTa: 'மத்திய & மாநில அரசுகளின் இலவச தொழிற்பயிற்சி & உதவித்தொகை',
    provider: 'National Skill Development Corporation (NSDC) & TNSRLM',
    providerTa: 'தேசிய திறன் மேம்பாட்டுக் கழகம் & தமிழ்நாடு ஊரக வாழ்வாதார இயக்கம்',
    level: 'vocational',
    duration: '2 to 3 Months (Part-time)',
    durationTa: '2 முதல் 3 மாதங்கள் (பகுதி நேரம்)',
    fees: '100% Free with Government Stipend',
    feesTa: '100% முற்றிலும் இலவசம் + பயண உதவித்தொகை',
    description: 'Free hands-on training in Apparel & Fashion (Sewing Machine Operator, Quality Checker), Food Processing (Pickles, Millets, Bakery), and Handicrafts with NSDC national certificate.',
    descriptionTa: 'தையல் கலை, ஆரி வேலைப்பாடு, உணவு பதப்படுத்துதல், தினை உணவு தயாரிப்பு, பேக்கரி பொருட்கள் தயாரிப்பில் பயிற்சி மற்றும் தேசிய அளவிலான சான்றிதழ்.',
    eligibility: 'Women aged 18 to 45. School dropouts (8th/10th) are warmly welcomed.',
    eligibilityTa: '18 முதல் 45 வயதுடைய பெண்கள். 8-ஆம் வகுப்பு அல்லது 10-ஆம் வகுப்பு முடித்தவர்கள்.',
    howToEnroll: [
      'Visit your local Block Development Office (BDO) or Block Mission Management Unit (BMMU).',
      'Ask for upcoming TNSRLM / PMKVY women batch schedules.',
      'Submit Aadhaar and bank passbook copies to enroll.'
    ],
    howToEnrollTa: [
      'ஊராட்சி ஒன்றிய அலுவலகம் (BDO) அல்லது வட்டார மகளிர் திட்ட மேலாளரை அணுகவும்.',
      'மகளிர் இலவச பயிற்சி முகாம்கள் குறித்து தகவல் பெறவும்.',
      'ஆதார் அட்டை மற்றும் வங்கி கணக்கு நகல் சமர்ப்பித்து பதிவு செய்யவும்.'
    ],
    contactOrLink: 'https://www.pmkvyofficial.org | 1800 123 9626',
    highlight: 'Job Placement & Enterprise Toolkit Support',
    highlightTa: 'பயிற்சிக்கு பின் வேலைவாய்ப்பு & உபகரண உதவி'
  },
  {
    id: 'digital-safety-upi',
    title: 'Digital Literacy & Smartphone Safety for Women',
    titleTa: 'பெண்களுக்கான ஸ்மார்ட்போன் பயிற்சி & டிஜிட்டல் பாதுகாப்பு',
    provider: 'SHERISE Digital Empowerment Initiative',
    providerTa: 'SHERISE டிஜிட்டல் அதிகாரமளிப்பு வழிகாட்டி',
    level: 'digital_literacy',
    duration: 'Self-paced (1-2 Hours)',
    durationTa: 'சுய கற்றல் (1-2 மணி நேரம்)',
    fees: '100% Free on this App',
    feesTa: '100% இலவசம்',
    description: 'Master mobile banking, Google Pay / PhonePe, sending WhatsApp voice messages, ordering via online, and identifying telephone fraud and OTP scams.',
    descriptionTa: 'கூகுள் பே / போன்பே மூலம் பாதுகாப்பாக பணம் அனுப்புதல், வாட்ஸ்அப் குரல் செய்தி அனுப்புதல், ஆன்லைன் மோசடிகளில் இருந்து பணத்தை பாதுகாப்பது போன்ற அத்தியாவசிய திறன்கள்.',
    eligibility: 'Anyone with a basic smartphone. No formal education needed.',
    eligibilityTa: 'ஸ்மார்ட்போன் பயன்படுத்தும் எந்தவொரு சகோதரியும் கற்றுக்கொள்ளலாம்.',
    howToEnroll: [
      'Read and listen to the safety guidelines in this module.',
      'Practice simulated safe payments without risking real money.',
      'Share tips with fellow women in your village self-help group.'
    ],
    howToEnrollTa: [
      'இந்த பக்கத்தில் உள்ள பாதுகாப்பு குறிப்புகளை படித்து/கேட்டு தெரிந்து கொள்ளுங்கள்.',
      'நண்பர்கள் அல்லது மகளின் வழிகாட்டலில் பாதுகாப்பாக பயன்படுத்தி பாருங்கள்.',
      'சுயஉதவிக்குழு கூட்டத்தில் மற்ற தோழிகளுக்கும் கற்றுக் கொடுங்கள்.'
    ],
    contactOrLink: 'Cyber Crime Helpline: 1930 (National)',
    highlight: 'Learn to Protect Your Money',
    highlightTa: 'மோசடிகளில் இருந்து பணத்தை பாதுகாக்கவும்'
  }
];
