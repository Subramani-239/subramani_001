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
    fee: 450,
    approvalStatus: 'approved',
    availableSeats: 6,
    maxSeats: 15,
    venueOrLink: 'Salem Women Community Center & Live Google Meet',
    batchSchedule: 'Batch starts: Next Monday (10:30 AM - 11:30 AM)',
    cancellationPolicy: '100% full refund if cancelled 24 hours before first class. Protected by SHERISE 5-day Escrow Guarantee.',
    cancellationPolicyTa: 'முதல் வகுப்பிற்கு 24 மணி நேரத்திற்கு முன் ரத்து செய்தால் 100% முழு பணம் திரும்ப வழங்கப்படும்.',
    cancellationPolicyHi: 'पहली कक्षा से 24 घंटे पहले रद्द करने पर 100% पूरा रिफंड।',
    teacher: {
      id: 'trn-selvi',
      name: 'Selvi Master (Salem)',
      bio: 'Government-certified Master Tailor with 14 years of teaching experience. Trained over 450 self-employed women.',
      bioTa: '14 வருட அனுபவமுள்ள அரசு சான்றிதழ் பெற்ற முதன்மை தையல் ஆசிரியை. 450+ பெண்களுக்கு சுயதொழில் பயிற்சி அளித்துள்ளார்.',
      bioHi: '14 वर्षों के अनुभव वाली सरकार से प्रमाणित मास्टर टेलर।',
      experienceYears: 14,
      skills: ['Blouse Cutting', 'Aari Work', 'Chudidar Stitching'],
      location: 'Salem, Tamil Nadu',
      verificationStatus: 'verified',
      verificationBadge: 'government_certified',
      verificationNotes: 'Aadhaar, Skill Certificate & Physical Center Verified',
      phoneShared: true,
      phoneNumber: '+91 94432 00000',
      rating: 4.9,
      reviewCount: 88,
      totalEarningsEst: 39600,
    },
    practicalProjectPrompt: 'Stitch one sample neckline piping and 4-dart front piece on practice cloth and present for review.',
    practicalProjectPromptTa: 'பயிற்சித் துணியில் ஒரு கழுத்துப் பைப்பிங் மற்றும் 4-டாட் முன் பகுதியைத் தைத்து ஆய்வுக்காக சமர்ப்பிக்கவும்.',
    practicalProjectPromptHi: 'अभ्यास कपड़े पर गले की पाइपिंग और 4-डार्ट का अगला हिस्सा सिलकर समीक्षा के लिए प्रस्तुत करें।',
    careerOutcomes: [
      'Start home blouse & chudidar stitching orders (earning ₹150 - ₹350 per piece)',
      'Partner with local bridal boutiques for finishing & alterations',
      'Take bulk orders for school uniforms and festive garments',
    ],
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
    fee: 350,
    approvalStatus: 'approved',
    availableSeats: 8,
    maxSeats: 20,
    venueOrLink: 'Madurai SHG Kitchen Hub & Video Demonstration',
    batchSchedule: 'Batch starts: This Saturday (3:00 PM - 4:00 PM)',
    cancellationPolicy: 'Full refund available up to 24 hours before workshop. FSSAI & Quality certified guidelines included.',
    cancellationPolicyTa: 'வகுப்பிற்கு 24 மணி நேரம் முன்பு வரை முழு பணம் திரும்பப் பெறலாம்.',
    cancellationPolicyHi: 'कक्षा से 24 घंटे पहले तक पूरा रिफंड।',
    teacher: {
      id: 'trn-lakshmi',
      name: 'Lakshmi Amma (Madurai)',
      bio: 'Award-winning traditional cook and SHG leader. Runs a verified homemade spice micro-enterprise supplying 300+ households.',
      bioTa: 'விருது பெற்ற பாரம்பரிய சமையல் கலைஞர் மற்றும் மகளிர் குழு தலைவர். 300+ வீடுகளுக்கு மசாலா பொடி வழங்கி வருகிறார்.',
      bioHi: 'पारंपरिक भोजन विशेषज्ञ और स्वयं सहायता समूह की प्रमुख।',
      experienceYears: 18,
      skills: ['Sambar Podi', 'Idli Podi', 'Garam Masala'],
      location: 'Madurai, Tamil Nadu',
      verificationStatus: 'verified',
      verificationBadge: 'skill_master',
      verificationNotes: 'FSSAI Registration & Peer SHG Verification Complete',
      phoneShared: true,
      phoneNumber: '+91 98421 00000',
      rating: 4.95,
      reviewCount: 112,
      totalEarningsEst: 42000,
    },
    practicalProjectPrompt: 'Prepare a 100g test batch of roasted coriander-cumin sambar powder, sieve finely, and seal in an airtight pouch.',
    careerOutcomes: [
      'Sell 250g masala pouches to apartment communities and neighbourhood stores',
      'Supply fresh sambar and rasam powder to local caterers and messes',
    ],
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
        ],
        quizQuestion: {
          question: 'Why should fenugreek (methi) seeds be roasted lightly and not charred black?',
          questionTa: 'வெந்தயத்தை கருப்பாக கருக விடாமல் மிதமாக வறுக்க வேண்டும் ஏன்?',
          questionHi: 'मेथी के दानों को जलने से बचाकर हल्का ही क्यों भूनना चाहिए?',
          options: [
            'Charred fenugreek makes the entire spice powder bitter and unpalatable',
            'It changes the color to blue',
            'It creates too much smoke'
          ],
          optionsTa: [
            'கருகினால் மசாலா முழுவதும் கசப்பு ஏறிவிடும்',
            'நீல நிறமாக மாறும்',
            'அதிக புகை வரும்'
          ],
          optionsHi: [
            'जलने से पूरे मसाले में कड़वापन आ जाता है',
            'रंग नीला हो जाता है',
            'धुआं अधिक होता है'
          ],
          correctIndex: 0,
          explanation: 'Over-roasting fenugreek releases bitter oils that spoil the aromatic flavor of sambar powder.',
          explanationTa: 'வெந்தயம் அதிகம் கருகினால் கசப்பு எண்ணெய் வெளியாகி சாம்பார் பொடியின் சுவையை கெடுத்துவிடும்.',
          explanationHi: 'मेथी ज्यादा भुनने पर कड़वी हो जाती है जिससे मसाले का स्वाद खराब हो जाता है।'
        }
      }
    ]
  },
  {
    id: 'course-digital-literacy',
    title: 'Computer & Smartphone Skills for Women Micro-Businesses',
    titleTa: 'மகளிர் சிறுதொழில்களுக்கான கணினி & ஸ்மார்ட்போன் பயிற்சி (UPI, டிஜிட்டல் பில்லிங்)',
    titleHi: 'महिला सूक्ष्म व्यवसायों के लिए कंप्यूटर और स्मार्टफोन कौशल',
    category: 'digital',
    level: 'beginner',
    format: 'online',
    languages: ['ta', 'en', 'hi'],
    duration: '1 Week (45 mins/day)',
    durationTa: '1 வாரம் (தினமும் 45 நிமிடம்)',
    durationHi: '1 सप्ताह (प्रतिदिन 45 मिनट)',
    fee: 300,
    approvalStatus: 'approved',
    availableSeats: 12,
    maxSeats: 25,
    venueOrLink: 'Online Interactive Google Meet with Screen Sharing',
    batchSchedule: 'Daily 7:00 PM - 7:45 PM (Recordings available)',
    cancellationPolicy: '100% full refund before batch begins. 24/7 student chat support included.',
    cancellationPolicyTa: 'வகுப்பு தொடங்கும் முன் ரத்து செய்தால் 100% முழு பணம் திரும்பக் கிடைக்கும்.',
    cancellationPolicyHi: 'कक्षा शुरू होने से पहले रद्द करने पर 100% रिफंड।',
    teacher: {
      id: 'trn-revathi',
      name: 'Dr. Revathi Raman',
      bio: 'Digital empowerment educator and community mentor. Has guided 1,200+ rural women in online banking, safety, and digital marketing.',
      bioTa: 'டிஜிட்டல் அதிகாரமளிப்பு கல்வியாளர். 1,200+ பெண்களுக்கு இணைய பரிவர்த்தனை மற்றும் டிஜிட்டல் விழிப்புணர்வு வழங்கியுள்ளார்.',
      bioHi: 'डिजिटल सशक्तिकरण ट्रेनर।',
      experienceYears: 10,
      skills: ['UPI Safety', 'WhatsApp Business Catalogs', 'Canva Posters'],
      location: 'Chennai & Puducherry',
      verificationStatus: 'verified',
      verificationBadge: 'government_certified',
      verificationNotes: 'Certified Digital Literacy Instructor & Aadhaar Verified',
      phoneShared: true,
      phoneNumber: '+91 94444 11111',
      rating: 4.9,
      reviewCount: 160,
      totalEarningsEst: 54000,
    },
    practicalProjectPrompt: 'Create a WhatsApp Business catalog item or digital bill receipt with itemized pricing and payment QR.',
    careerOutcomes: [
      'Operate an e-Sevai / digital service kiosk helping neighbours apply for certificates',
      'Set up WhatsApp Business product catalogs for local sellers for a service fee',
    ],
    description: 'Practical smartphone training: Send voice notes, make safe payments, create product catalogs on WhatsApp, and spot telephone scams.',
    descriptionTa: 'ஸ்மார்ட்போனை தைரியமாக பயன்படுத்துங்கள்: வாய்ஸ் மெசேஜ் அனுப்புதல், கூகுள் பே பாதுகாப்பாக பயன்படுத்துதல் மற்றும் மோசடிகளை தவிர்த்தல்.',
    descriptionHi: 'सुरक्षित डिजिटल भुगतान, व्हाट्सएप बिजनेस कैटलॉग, पोस्टर डिजाइन और ऑनलाइन धोखाधड़ी से बचाव की संपूर्ण जानकारी।',
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
        ],
        quizQuestion: {
          question: 'A stranger calls claiming they are sending you ₹1,000 and asks you to enter your UPI PIN. What should you do?',
          questionTa: 'அந்நியர் ஒருவர் உங்களுக்கு ₹1,000 அனுப்புவதாகக் கூறி உங்கள் UPI PIN-ஐ உள்ளிடச் சொல்கிறார். நீங்கள் என்ன செய்ய வேண்டும்?',
          questionHi: 'एक अनजान व्यक्ति आपको ₹1,000 भेजने का दावा करता है और आपसे यूपीआई पिन डालने को कहता है। आपको क्या करना चाहिए?',
          options: [
            'Immediately decline and hang up — PIN is NEVER required to receive money!',
            'Enter the PIN quickly to get the money',
            'Share the PIN with a friend first'
          ],
          optionsTa: [
            'உடனே இணைப்பைத் துண்டிக்கவும் — பணம் பெற ஒருபோதும் PIN தேவையில்லை!',
            'பணம் வர உடனே PIN-ஐ போடவும்',
            'நண்பரிடம் PIN-ஐ கேட்கவும்'
          ],
          optionsHi: [
            'तुरंत मना करें और कॉल काट दें — पैसे प्राप्त करने के लिए कभी पिन की आवश्यकता नहीं होती!',
            'पैसे पाने के लिए पिन डाल दें',
            'मित्र से सलाह लें'
          ],
          correctIndex: 0,
          explanation: 'Entering your UPI PIN authorizes money to leave your bank account, never into it.',
          explanationTa: 'UPI PIN போட்டால் உங்கள் கணக்கிலிருந்து பணம் எடுக்கப்படும், பணம் வராது.',
          explanationHi: 'यूपीआई पिन डालने से बैंक से पैसा कटता है, कभी आता नहीं।'
        }
      }
    ]
  }
];
