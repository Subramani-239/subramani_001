/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LearningCourse } from '../types';

export const learningCoursesData: LearningCourse[] = [
  {
    id: 'course-tailoring-basics',
    title: 'Beginner Tailoring: Measurements, Cutting & Blouse Stitching',
    titleTa: 'அடிப்படை தையல் கலை: அளவு எடுத்தல், வெட்டுதல் & ஜாக்கெட் தைத்தல்',
    titleHi: 'शुरुआती सिलाई: नाप लेना, कटिंग एवं ब्लाउज सिलाई',
    category: 'tailoring',
    level: 'beginner',
    format: 'both',
    languages: ['ta', 'en', 'hi'],
    duration: '2 Weeks (1 hr/day)',
    durationTa: '2 வாரங்கள் (தினமும் 1 மணி நேரம்)',
    durationHi: '2 सप्ताह (प्रतिदिन 1 घंटा)',
    description: 'Master body measurement, tracing paper patterns, straight stitch practice, neckline piping, and stitching a custom 4-dart blouse.',
    descriptionTa: 'அளவு நாடாவால் உடலளவு எடுத்தல், பேப்பர் பேட்டர்ன் வெட்டுதல், நேர்கோட்டு தையல் பயிற்சி மற்றும் ஜாக்கெட் தைக்கும் முழு முறை.',
    descriptionHi: 'नाप लेने का सही तरीका, पेपर कटिंग, सीधी सिलाई अभ्यास, गले की पाइपिंग और संपूर्ण ब्लाउज सिलाई।',
    trainerName: 'Selvi Master (Salem)',
    trainerContactId: 'contact-trainer-1',
    earningConnection: 'Stitching 1 blouse earns ₹150 - ₹350. Stitching 2 blouses daily from home earns ₹9,000 - ₹18,000 per month.',
    earningConnectionTa: 'ஒரு ஜாக்கெட் தைத்தால் ₹150 முதல் ₹350 கூலி. தினமும் 2 ஜாக்கெட் தைத்தால் மாதம் ₹9,000 முதல் ₹18,000 வரை வருமானம்.',
    earningConnectionHi: 'एक ब्लाउज सिलाई पर ₹150 से ₹350 मिलते हैं। प्रतिदिन 2 ब्लाउज सिलकर प्रतिमाह ₹9,000 से ₹18,000 कमाए जा सकते हैं।',
    lessons: [
      {
        id: 't-les-1',
        title: 'Lesson 1: Machine Parts, Threading & Tension Adjustment',
        titleTa: 'பாடம் 1: தையல் இயந்திர பாகங்கள், நூல் கோர்த்தல் & டென்ஷன் சரிசெய்தல்',
        titleHi: 'पाठ 1: सिलाई मशीन के पुर्जे, धागा पिरोना और टेंशन सेट करना',
        durationMins: 20,
        summary: 'Learn how to wind the bobbin evenly, thread the needle, oil the machine, and adjust thread tension so threads do not snap.',
        summaryTa: 'பாபினில் சீராக நூல் சுற்றுதல், ஊசியில் நூல் கோர்த்தல், இயந்திரத்திற்கு எண்ணெய் விடுதல் மற்றும் நூல் அறுபடாமல் இருக்க டென்ஷன் சரிசெய்தல்.',
        summaryHi: 'बॉबिन में धागा भरना, सुई में धागा डालना, मशीन में तेल देना और धागे का तनाव सही करना।',
        steps: [
          {
            stepNumber: 1,
            text: 'Fill the bobbin evenly without loose loops.',
            textTa: 'பாபினில் தளர்வு இல்லாமல் சீராக நூல் சுற்றுங்கள்.',
            textHi: 'बॉबिन में धागे को बिना ढीला छोड़े एक समान लपेटें।'
          },
          {
            stepNumber: 2,
            text: 'Insert bobbin into the bobbin case with clockwise rotation and hear the click lock.',
            textTa: 'பாபின் கேஸில் பொருத்தி கடிகார திசையில் நூல் வரும்படி லாக் செய்யவும்.',
            textHi: 'बॉबिन केस में लगाएं और सुनिश्चित करें कि वह सही दिशा में लॉक हो।'
          },
          {
            stepNumber: 3,
            text: 'Practice running stitches on a piece of discarded cloth until stitches look balanced on both sides.',
            textTa: 'பழைய துணியில் நேர் தையல் போட்டு இருபுறமும் தையல் சீராக உள்ளதா என சோதிக்கவும்.',
            textHi: 'रद्दी कपड़े पर सीधी सिलाई चलाकर देखें कि दोनों तरफ टांके साफ आ रहे हैं।'
          }
        ],
        quizQuestion: {
          question: 'What causes loops to appear on the underside of your fabric?',
          questionTa: 'துணியின் அடிப்பகுதியில் தையல் சுருக்கங்கள் அல்லது லூப் வர காரணம் என்ன?',
          questionHi: 'कपड़े के नीचे धागे के लूप आने का क्या कारण होता है?',
          options: [
            'Upper thread tension is too loose or needle threaded incorrectly',
            'Sewing machine speed is too high',
            'Fabric color is too bright'
          ],
          optionsTa: [
            'மேல் நூல் டென்ஷன் தளர்வாக இருப்பது அல்லது நூல் சரியாக கோர்க்கப்படாதது',
            'இயந்திரத்தை வேகமாக மிதிப்பது',
            'துணியின் நிறம்'
          ],
          optionsHi: [
            'ऊपरी धागे का तनाव बहुत ढीला होना या धागा गलत पिरोया जाना',
            'मशीन की गति बहुत तेज होना',
            'कपड़े का रंग'
          ],
          correctIndex: 0,
          explanation: 'When upper thread tension is too loose, the bottom bobbin pulls extra thread, causing loops underneath.',
          explanationTa: 'மேல் நூல் டென்ஷன் தளர்வாக இருந்தால் கீழே லூப் விழும். டென்ஷன் நட்டை லேசாக இறுக்க வேண்டும்.',
          explanationHi: 'जब ऊपर का धागा ढीला होता है तो नीचे धागे के गुच्छे बनते हैं। ऊपरी टेंशन को कसना चाहिए।'
        }
      },
      {
        id: 't-les-2',
        title: 'Lesson 2: Taking Accurate Body Measurements for Women',
        titleTa: 'பாடம் 2: சரியான உடலளவு எடுக்கும் முறை',
        titleHi: 'पाठ 2: महिलाओं के सही शारीरिक नाप लेने का तरीका',
        durationMins: 25,
        summary: 'How to measure bust size, blouse length, shoulder width, armhole curve, and sleeve length with 1-inch ease allowance.',
        summaryTa: 'மார்பளவு, ஜாக்கெட் நீளம், தோள்பட்டை அகலம், ஆர்ம்ஹோல் வளைவு மற்றும் கை நீளத்தை துல்லியமாக அளக்கும் முறை.',
        summaryHi: 'चेस्ट साइज, ब्लाउज लंबाई, शोल्डर, आर्महोल और आस्तीन की सटीक माप लेना।',
        steps: [
          {
            stepNumber: 1,
            text: 'Keep 1 finger inside the measuring tape while taking bust measurement to ensure breathing comfort.',
            textTa: 'மார்பளவு எடுக்கும் போது டேப்பிற்குள் ஒரு விரல் வைத்து அளந்தால் உடுத்துவதற்கு வசதியாக இருக்கும்.',
            textHi: 'नाप लेते समय टेप के अंदर एक उंगली रखें ताकि कपड़ा आरामदायक बने।'
          },
          {
            stepNumber: 2,
            text: 'Note down front neck depth (usually 5.5 to 6.5 inches) and back neck depth.',
            textTa: 'முன் கழுத்து இறக்கம் (5.5 - 6.5 அங்குலம்) மற்றும் பின் கழுத்து இறக்கத்தை குறித்துக் கொள்ளவும்.',
            textHi: 'आगे के गले की गहराई (5.5 से 6.5 इंच) और पीछे के गले की गहराई नोट करें।'
          }
        ]
      }
    ]
  },
  {
    id: 'course-homemade-spices',
    title: 'Commercial Masala Powders, Sambar Podi & Hygienic Food Packing',
    titleTa: 'நாட்டு மசாலா பொடிகள் தயாரிப்பு, சாம்பார் பொடி & சுகாதார பேக்கிங்',
    titleHi: 'पारंपरिक मसाला पाउडर निर्माण, सांबर मसाला एवं पैकेजिंग',
    category: 'cooking',
    level: 'beginner',
    format: 'both',
    languages: ['ta', 'en', 'hi'],
    duration: '1 Week (1 hr/day)',
    durationTa: '1 வாரம் (தினமும் 1 மணி நேரம்)',
    durationHi: '1 सप्ताह (प्रतिदिन 1 घंटा)',
    description: 'Learn standard spice roasting ratios, sun-drying spices, aromatic coriander-chili balance, and food safety standards.',
    descriptionTa: 'மசாலா வறுக்கும் பக்குவம், வெயிலில் உலர்த்துதல், வாசனை மாறாமல் அரைக்கும் முறை மற்றும் நீண்ட நாள் கெடாமல் பேக் செய்யும் வழிகள்.',
    descriptionHi: 'मसालों को सही आंच पर भूनने का अनुपात, सुखाने की विधि और खाद्य सुरक्षा नियमों के साथ पैकिंग।',
    trainerName: 'Lakshmi Amma (Madurai)',
    trainerContactId: 'contact-trainer-1',
    earningConnection: 'Selling 100 packets of 250g pure sambar podi monthly creates ₹7,000 net profit from home.',
    earningConnectionTa: 'மாதம் 100 பாக்கெட் தூய சாம்பார் பொடி விற்றால் ₹7,000 நிகர லாபம் கிடைக்கும்.',
    earningConnectionHi: 'प्रतिमाह 250 ग्राम के 100 पैकेट बेचकर घर से ₹7,000 का शुद्ध लाभ कमाया जा सकता है।',
    lessons: [
      {
        id: 's-les-1',
        title: 'Lesson 1: Moisture Control & Low-Flame Dry Roasting',
        titleTa: 'பாடம் 1: ஈரப்பதம் நீக்குதல் & மிதமான தீயில் வறுக்கும் பக்குவம்',
        titleHi: 'पाठ 1: नमी हटाना और धीमी आंच पर मसालों को भूनना',
        durationMins: 20,
        summary: 'Moisture is the enemy of ground spices. Learn how clean sun-drying and dry-roasting prevents fungus without chemical preservatives.',
        summaryTa: 'ஈரப்பதம் இல்லாமல் வெயிலில் காயவைத்து, மிதமான சூட்டில் வறுத்தால் ரசாயனம் இன்றி 6 மாதம் மசாலா கெடாமல் இருக்கும்.',
        summaryHi: 'धूप में सुखाकर धीमी आंच पर भूनने से बिना किसी केमिकल के मसाले 6 महीने तक ताजा रहते हैं।',
        steps: [
          {
            stepNumber: 1,
            text: 'Sun-dry coriander seeds and dry red chillies on a clean cotton sheet for 1 full sunny day.',
            textTa: 'கொத்தமல்லி மற்றும் வரமிளகாயை சுத்தமான காட்டன் துணியில் ஒரு நாள் வெயிலில் காயவைக்கவும்.',
            textHi: 'धनिया और सूखी लाल मिर्च को साफ सूती कपड़े पर पूरे दिन धूप में सुखाएं।'
          },
          {
            stepNumber: 2,
            text: 'Roast cumin, pepper, and fenugreek seeds separately on low flame until pleasant aroma arises.',
            textTa: 'சீரகம், மிளகு, வெந்தயத்தை தனித்தனியாக வாசனை வரும் வரை மிதமான தீயில் வறுக்கவும்.',
            textHi: 'जीरा, काली मिर्च और मेथी को अलग-अलग धीमी आंच पर खुशबू आने तक भूनें।'
          }
        ]
      }
    ]
  },
  {
    id: 'course-digital-literacy',
    title: 'Smartphone & Digital Safety for Women (UPI, WhatsApp Business, e-Sevai)',
    titleTa: 'பெண்களுக்கான ஸ்மார்ட்போன் பயிற்சி & டிஜிட்டல் பாதுகாப்பு (UPI, வாட்ஸ்அப், இ-சேவை)',
    titleHi: 'महिलाओं के लिए स्मार्टफोन एवं डिजिटल साक्षरता (UPI, व्हाट्सएप बिजनेस)',
    category: 'digital',
    level: 'beginner',
    format: 'online',
    languages: ['ta', 'en', 'hi'],
    duration: '3 Days (30 mins/day)',
    durationTa: '3 நாட்கள் (தினமும் 30 நிமிடம்)',
    durationHi: '3 दिन (प्रतिदिन 30 मिनट)',
    description: 'Practical smartphone training: Send voice notes, make safe payments, create product catalogs on WhatsApp, and spot telephone scams.',
    descriptionTa: 'ஸ்மார்ட்போனை தைரியமாக பயன்படுத்துங்கள்: வாய்ஸ் மெசேஜ் அனுப்புதல், கூகுள் பே பாதுகாப்பாக பயன்படுத்துதல் மற்றும் மோசடிகளை தவிர்த்தல்.',
    descriptionHi: 'स्मार्टफोन का सुरक्षित उपयोग: आवाज संदेश भेजना, सुरक्षित यूपीआई भुगतान और ऑनलाइन धोखाधड़ी से बचना।',
    trainerName: 'Dr. Revathi Raman',
    trainerContactId: 'contact-mentor-1',
    earningConnection: 'Helps women market products directly on WhatsApp, avoid bank travel costs, and earn facilitation fees.',
    earningConnectionTa: 'பொருட்களை வாட்ஸ்அப்பில் விற்று இடைத்தரகர் இன்றி முழு லாபத்தையும் பெற உதவுகிறது.',
    earningConnectionHi: 'व्हाट्सएप पर उत्पाद बेचकर सीधे ग्राहकों से जुड़ने और यात्रा खर्च बचाने में मदद करता है।',
    lessons: [
      {
        id: 'd-les-1',
        title: 'Lesson 1: The Golden Rule of UPI (PIN is only to SEND money)',
        titleTa: 'பாடம் 1: UPI பொன் விதி (பணம் பெற PIN தேவையில்லை)',
        titleHi: 'पाठ 1: यूपीआई का स्वर्णिम नियम (पिन केवल पैसे भेजने के लिए है)',
        durationMins: 15,
        summary: 'Never type your secret 4 or 6 digit PIN when someone says they are paying you money. PIN is solely required when money leaves your bank.',
        summaryTa: 'யாராவது உங்களுக்கு பணம் அனுப்புகிறேன் என்று சொல்லி PIN போடச் சொன்னால் செய்யாதீர்கள். PIN பணம் அனுப்ப மட்டுமே தேவை.',
        summaryHi: 'पैसे प्राप्त करने के लिए कभी भी पिन न डालें। पिन केवल आपके खाते से पैसे कटने पर ही मांगा जाता है।',
        steps: [
          {
            stepNumber: 1,
            text: 'To receive money, you only need to show your QR code or share your mobile number.',
            textTa: 'பணம் பெற உங்கள் QR கோடை காட்டினால் அல்லது மொபைல் எண்ணை கொடுத்தால் போதும்.',
            textHi: 'पैसे लेने के लिए केवल अपना क्यूआर कोड दिखाएं या मोबाइल नंबर दें।'
          },
          {
            stepNumber: 2,
            text: 'If a payment fails, do not google helpline numbers; use the official dispute button inside your app.',
            textTa: 'பணம் சிக்கினால் கூகுளில் போன் நம்பர் தேடாதீர்கள்; செயலிக்குள் உள்ள Dispute பொத்தானை அழுத்தவும்.',
            textHi: 'गूगल से अनजान कस्टमर केयर नंबर न निकालें; ऐप के अंदर ही सहायता विकल्प चुनें।'
          }
        ]
      }
    ]
  }
];
