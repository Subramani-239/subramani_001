/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type EducationStage =
  | 'completed_10th'
  | 'completed_12th'
  | 'discontinued_11_12'
  | 'college_discontinued'
  | 'college_some_semesters'
  | 'graduate_skill_upgrade'
  | 'unsure_next';

export type LearnerGoal =
  | 'formal_degree'
  | 'vocational_skill'
  | 'employment_wfh'
  | 'flexible_learning';

export interface RoadmapStep {
  id: string;
  stepNumber: number;
  title: string;
  titleTa: string;
  titleHi: string;
  description: string;
  descriptionTa: string;
  descriptionHi: string;
  institutionOrPortal: string;
  portalUrl?: string;
  estimatedDuration: string;
  costEstimate: string;
  costEstimateTa: string;
  costEstimateHi: string;
  scamWarning?: string;
  scamWarningTa?: string;
  scamWarningHi?: string;
}

export interface VerificationChecklistItem {
  id: string;
  title: string;
  titleTa: string;
  titleHi: string;
  check: string;
  checkTa: string;
  checkHi: string;
  officialPortal: string;
}

export const verificationChecklist: VerificationChecklistItem[] = [
  {
    id: 'ugc-deb',
    title: 'UGC-DEB Open & Distance Learning Approval',
    titleTa: 'UGC-DEB திறந்தநிலைக் கல்வி அங்கீகாரம்',
    titleHi: 'UGC-DEB दूरस्थ शिक्षा मान्यता जांच',
    check: 'Verify that the distance degree is listed on deb.ugc.ac.in for the specific academic year and university. Never pay fees without checking.',
    checkTa: 'பல்கலைக்கழகத்தின் குறிப்பிட்ட ஆண்டிற்கான திறந்தநிலைப் படிப்பு deb.ugc.ac.in-ல் அங்கீகரிக்கப்பட்டுள்ளதா என சோதிக்கவும். தரகர்களுக்கு பணம் தர வேண்டாம்.',
    checkHi: 'सत्यापित करें कि विश्वविद्यालय deb.ugc.ac.in पर चालू वर्ष के लिए अनुमोदित है। एजेंटों को अतिरिक्त शुल्क न दें।',
    officialPortal: 'https://deb.ugc.ac.in'
  },
  {
    id: 'nios-accreditation',
    title: 'NIOS / State Open School Official Center Code',
    titleTa: 'NIOS / மாநில திறந்தநிலைப் பள்ளி அங்கீகரிக்கப்பட்ட மையம்',
    titleHi: 'NIOS आधिकारिक अध्ययन केंद्र कोड',
    check: 'Ensure your exam registration is done directly via sdmis.nios.ac.in or authorized AI (Accredited Institution) center. Avoid private middlemen claiming "guaranteed pass".',
    checkTa: 'sdmis.nios.ac.in மூலம் நேரடியாகவோ அல்லது அரசு அங்கீகரித்த பள்ளியிலோ மட்டுமே விண்ணப்பிக்கவும். "பாஸ் உறுதி" என்று கூறும் இடைத்தரகர்களை நம்பாதீர்கள்.',
    checkHi: 'सीधे sdmis.nios.ac.in पर या अधिकृत केंद्र पर ही आवेदन करें। बिना परीक्षा पास कराने का दावा करने वाले एजेंटों से बचें।',
    officialPortal: 'https://sdmis.nios.ac.in'
  },
  {
    id: 'ncvet-pmkvy',
    title: 'NCVET / Skill India Recognized Certificate',
    titleTa: 'NCVET / ஸ்கில் இந்தியா அரசு அங்கீகார சான்றிதழ்',
    titleHi: 'NCVET / स्किल इंडिया मान्यता प्राप्त प्रमाणपत्र',
    check: 'Vocational institutes must award certificates linked with National Skills Qualification Framework (NSQF). Verify center on skillindia.gov.in.',
    checkTa: 'தொழிற்பயிற்சி நிலையங்கள் NSQF அங்கீகாரம் கொண்ட சான்றிதழ் தருகிறதா என skillindia.gov.in-ல் சரிபார்க்கவும்.',
    checkHi: 'व्यावसायिक संस्थान NSQF से संबद्ध प्रमाण पत्र प्रदान करते हैं या नहीं, इसे skillindia.gov.in पर जांचें।',
    officialPortal: 'https://www.skillindia.gov.in'
  },
  {
    id: 'fee-transparency',
    title: 'Fee Transparency & Govt Subsidies',
    titleTa: 'கட்டண வெளிப்படைத்தன்மை மற்றும் அரசு உதவித்தொகை',
    titleHi: 'शुल्क पारदर्शिता एवं सरकारी सहायता',
    check: 'Govt open universities (IGNOU, TNOU) have subsidized fees (₹2,500 - ₹5,000/yr). SC/ST and rural women often get fee concession directly.',
    checkTa: 'அரசு திறந்தநிலைப் பல்கலைக்கழகங்களில் (IGNOU, TNOU) கட்டணம் மிகக் குறைவு (ஆண்டுக்கு ₹2,500-₹5,000). ஆதிதிராவிடர் மாணவிகளுக்கு முழு கட்டண விலக்கு உண்டு.',
    checkHi: 'सरकारी मुक्त विश्वविद्यालयों (IGNOU, TNOU) में वार्षिक शुल्क नाममात्र (₹2,500-₹5,000) होता है। आरक्षित वर्गों के लिए शुल्क छूट उपलब्ध है।',
    officialPortal: 'https://ignou.ac.in'
  }
];

export function generateEducationRoadmap(
  stage: EducationStage,
  goal: LearnerGoal,
  preferredLanguage: string = 'ta'
): {
  headline: string;
  headlineTa: string;
  headlineHi: string;
  empathyNote: string;
  empathyNoteTa: string;
  empathyNoteHi: string;
  steps: RoadmapStep[];
} {
  switch (stage) {
    case 'completed_10th':
      return {
        headline: 'From Class 10 to Higher Secondary, Diploma, or Vocational Career',
        headlineTa: '10-ஆம் வகுப்பிற்குப் பின்: +2, பாலிடெக்னிக் டிப்ளமோ அல்லது தொழிற்கல்வி',
        headlineHi: '10वीं के बाद: 12वीं, पॉलिटेक्निक डिप्लोमा या व्यावसायिक करियर',
        empathyNote: 'Having passed Class 10 is a solid milestone. Regardless of how many years have passed, multiple government-recognized doors are open today.',
        empathyNoteTa: '10-ஆம் வகுப்பு முடித்திருப்பது சிறந்த அடித்தளம். குடும்பச் சூழலால் சில ஆண்டுகள் இடைவெளி ஏற்பட்டிருந்தாலும், இன்று பல நெகிழ்வான வழிகள் உள்ளன.',
        empathyNoteHi: '10वीं उत्तीर्ण होना एक मजबूत नींव है। वर्षों का अंतराल होने पर भी सरकार द्वारा मान्यता प्राप्त कई सुलभ विकल्प मौजूद हैं।',
        steps: [
          {
            id: 'step-10-1',
            stepNumber: 1,
            title: 'Choose Your Next Pathway (+2 vs 3-Year Polytechnic Diploma)',
            titleTa: 'உங்கள் பாதையைத் தேர்ந்தெடுக்கவும் (+2 அல்லது பாலிடெக்னிக் டிப்ளமோ)',
            titleHi: 'अपना अगला मार्ग चुनें (12वीं या 3 वर्षीय पॉलिटेक्निक डिप्लोमा)',
            description: 'If you want higher college degrees (BA, B.Com, BSc), choose Senior Secondary (+2 via NIOS or State Open School). If you prefer technical job-oriented skills, explore 3-year Polytechnic Diplomas.',
            descriptionTa: 'கல்லூரி பட்டம் (BA/B.Com) பெற விரும்பினால் NIOS மூலம் +2 பயிலலாம். உடனடி தொழில்நுட்ப வேலை வாய்ப்பிற்கு பாலிடெக்னிக் டிப்ளமோ தேர்ந்தெடுக்கலாம்.',
            descriptionHi: 'यदि आप कॉलेज डिग्री चाहते हैं तो NIOS से 12वीं करें। यदि तकनीकी रोजगार चाहते हैं तो 3 वर्षीय डिप्लोमा चुनें।',
            institutionOrPortal: 'National Institute of Open Schooling (NIOS) / State Open School',
            portalUrl: 'https://sdmis.nios.ac.in',
            estimatedDuration: '1 to 2 Years',
            costEstimate: 'Approx ₹2,000 - ₹3,500 total exam fee',
            costEstimateTa: 'தேர்வு கட்டணம் சுமார் ₹2,000 - ₹3,500 மட்டுமே',
            costEstimateHi: 'कुल परीक्षा शुल्क लगभग ₹2,000 - ₹3,500'
          },
          {
            id: 'step-10-2',
            stepNumber: 2,
            title: 'Enroll via Direct Online Portal (Stream 1)',
            titleTa: 'நேரடி இணையதளத்தில் பதிவு செய்க (Stream 1)',
            titleHi: 'सीधे ऑनलाइन पोर्टल पर नामांकन करें (Stream 1)',
            description: 'Apply with 10th marksheet, Aadhaar card, and photo. Select 5 subjects of your choice (e.g. Languages, Economics, Business Studies, Home Science, Computer Science).',
            descriptionTa: '10-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ், ஆதார், புகைப்படத்துடன் பதிவு செய்யவும். உங்களுக்குப் பிடித்த எளிய 5 பாடங்களைத் தேர்வு செய்யவும்.',
            descriptionHi: '10वीं अंकतालिका, आधार और फोटो से आवेदन करें। अपनी पसंद के 5 विषय चुनें।',
            institutionOrPortal: 'NIOS Student Portal',
            portalUrl: 'https://sdmis.nios.ac.in',
            estimatedDuration: 'Immediate registration',
            costEstimate: 'Direct govt fee only',
            costEstimateTa: 'அரசு நிர்ணயித்த கட்டணம் மட்டுமே',
            costEstimateHi: 'केवल सरकारी निर्धारित शुल्क'
          },
          {
            id: 'step-10-3',
            stepNumber: 3,
            title: 'Study from Free State Textbooks & Write Exams in Installments',
            titleTa: 'இலவச புத்தகங்கள் மூலம் படித்து தவணை முறையில் தேர்வு எழுதுங்கள்',
            titleHi: 'मुफ्त पाठ्यपुस्तकों से अध्ययन करें और किश्तों में परीक्षा दें',
            description: 'Books are mailed free to your home. You can clear 2-3 subjects in April and remaining subjects in October. Up to 5 years valid.',
            descriptionTa: 'பாடப் புத்தகங்கள் வீட்டிற்கே அஞ்சலில் வரும். ஏப்ரலில் 2 பாடங்கள், அக்டோபரில் மீதி பாடங்கள் என பகுதி பகுதியாக எழுதலாம்.',
            descriptionHi: 'किताबें घर पर डाक से आएंगी। आप अपनी सुविधानुसार किश्तों में परीक्षा दे सकते हैं।',
            institutionOrPortal: 'NIOS Regional Center',
            portalUrl: 'https://www.nios.ac.in',
            estimatedDuration: 'Self-paced (6-18 months)',
            costEstimate: 'Free self-study materials included',
            costEstimateTa: 'இலவச பாடப் புத்தகங்கள் சேர்க்கப்பட்டுள்ளன',
            costEstimateHi: 'मुफ्त अध्ययन सामग्री शामिल है'
          }
        ]
      };

    case 'discontinued_11_12':
      return {
        headline: 'Fast-Track +2 Completion for Discontinued Class 11 or 12',
        headlineTa: '11 அல்லது 12-ஆம் வகுப்பில் நின்றவர்கள் எளிதில் +2 முடிக்கும் வழி',
        headlineHi: '11वीं या 12वीं में छूटी पढ़ाई को पूरा करने का आसान मार्ग',
        empathyNote: 'Stopping near the finish line of schooling is common due to family circumstances, marriage, or health. Credit transfer (TOC) lets you keep previous passed subjects!',
        empathyNoteTa: 'பள்ளிப் படிப்பின் இறுதி கட்டத்தில் குடும்பச் சூழல் காரணமாக நின்றவர்கள் கவலைப்பட தேவையில்லை. நீங்கள் ஏற்கனவே தேர்ச்சி பெற்ற பாடங்களை மாற்றி மீதமுள்ள பாடங்களை மட்டும் எழுதலாம் (TOC).',
        empathyNoteHi: 'पारिवारिक या अन्य कारणों से 11वीं या 12वीं छूटने पर भी ट्रांसफर ऑफ क्रेडिट (TOC) सुविधा से पहले उत्तीर्ण विषयों को मान्य कराया जा सकता है।',
        steps: [
          {
            id: 'step-disc12-1',
            stepNumber: 1,
            title: 'Use Transfer of Credit (TOC) to Retain Passed Subjects',
            titleTa: 'முன்பு தேர்ச்சி பெற்ற பாடங்களை தக்கவைக்க TOC பயன்படுத்தவும்',
            titleHi: 'उत्तीर्ण विषयों के लिए ट्रांसफर ऑफ क्रेडिट (TOC) का उपयोग करें',
            description: 'If you passed 1 or 2 subjects in State Board/CBSE +2, NIOS allows transferring up to 2 subjects directly to your new marksheet so you do not repeat them.',
            descriptionTa: 'நீங்கள் ஏற்கனவே 1 அல்லது 2 பாடங்களில் தேர்ச்சி பெற்றிருந்தால், NIOS-ல் TOC மூலம் அந்த மதிப்பெண்களை சேர்த்து மீதி 3 பாடங்களை மட்டும் எழுதலாம்.',
            descriptionHi: 'यदि आपने पहले किसी बोर्ड से 1-2 विषय पास किए थे, तो NIOS में TOC के तहत केवल शेष विषयों की परीक्षा देनी होगी।',
            institutionOrPortal: 'NIOS Stream 2 / On-Demand Examination',
            portalUrl: 'https://sdmis.nios.ac.in',
            estimatedDuration: '3 to 6 Months',
            costEstimate: 'Approx ₹1,500 - ₹2,500',
            costEstimateTa: 'தோராயமாக ₹1,500 - ₹2,500',
            costEstimateHi: 'लगभग ₹1,500 - ₹2,500'
          },
          {
            id: 'step-disc12-2',
            stepNumber: 2,
            title: 'Choose Scoring Practical Subjects',
            titleTa: 'அதிக மதிப்பெண் தரும் எளிய செய்முறைப் பாடங்களைத் தேர்வு செய்க',
            titleHi: 'सरल व प्रायोगिक विषयों का चयन करें',
            description: 'Select subjects like Home Science, Data Entry Operations, Painting, and Mass Communication which include practical scoring points.',
            descriptionTa: 'மனையியல் (Home Science), கணினி தரவு பதிவு (Data Entry), ஓவியம் போன்ற எளிதில் தேர்ச்சி பெறக்கூடிய செய்முறைப் பாடங்களைத் தேர்வு செய்யவும்.',
            descriptionHi: 'गृह विज्ञान, डेटा एंट्री, पेंटिंग जैसे सरल और उच्च अंकदायी विषय चुनें।',
            institutionOrPortal: 'NIOS Study Guide',
            portalUrl: 'https://www.nios.ac.in',
            estimatedDuration: '3-4 Months Preparation',
            costEstimate: 'Exam fee only',
            costEstimateTa: 'தேர்வுக் கட்டணம் மட்டுமே',
            costEstimateHi: 'केवल परीक्षा शुल्क'
          },
          {
            id: 'step-disc12-3',
            stepNumber: 3,
            title: 'Collect Recognized Certificate for Degree / Employment',
            titleTa: 'அரசு அங்கீகாரம் பெற்ற +2 சான்றிதழ் பெற்று உயர்கல்விக்குச் செல்லவும்',
            titleHi: 'मान्यता प्राप्त 12वीं प्रमाणपत्र प्राप्त कर उच्च शिक्षा में प्रवेश लें',
            description: 'NIOS Senior Secondary certificates are recognized for TN Government Pudhumai Penn scholarship, UPSC/TNPSC exams, and all college admissions.',
            descriptionTa: 'இந்த +2 சான்றிதழ் தமிழ்நாடு அரசின் புதுமைப் பெண் திட்டம், TNPSC தேர்வுகள் மற்றும் அனைத்து கல்லூரி சேர்க்கைகளுக்கும் 100% செல்லுபடியாகும்.',
            descriptionHi: 'यह 12वीं प्रमाणपत्र सभी सरकारी नौकरियों, छात्रवृत्तियों और विश्वविद्यालयों में पूर्ण रूप से मान्य है।',
            institutionOrPortal: 'DigiLocker / NIOS Regional Office',
            portalUrl: 'https://www.digilocker.gov.in',
            estimatedDuration: 'Immediate DigiLocker download',
            costEstimate: 'Free verified digital certificate',
            costEstimateTa: 'இலவச டிஜிட்டல் சான்றிதழ்',
            costEstimateHi: 'निःशुल्क डिजिटल प्रमाणपत्र'
          }
        ]
      };

    case 'completed_12th':
      return {
        headline: 'Open University Degree or Government Skill Training After 12th',
        headlineTa: '+2 முடித்தவர்களுக்கு: திறந்தநிலைப் பல்கலைக்கழக பட்டம் அல்லது அரசு தொழிற்பயிற்சி',
        headlineHi: '12वीं के बाद: मुक्त विश्वविद्यालय डिग्री या सरकारी कौशल प्रशिक्षण',
        empathyNote: 'With Class 12 completed, you qualify for 100% recognized undergraduate degree programs via distance education while managing your household or work.',
        empathyNoteTa: '+2 தேர்ச்சி பெற்றுள்ள உங்களுக்கு வீட்டில் இருந்தபடியே பயிலக்கூடிய அரசு அங்கீகாரம் பெற்ற பட்டப்படிப்புகள் மற்றும் வேலைவாய்ப்பு பயிற்சிகள் தயாராக உள்ளன.',
        empathyNoteHi: '12वीं उत्तीर्ण होने पर आप घर बैठे मान्यता प्राप्त स्नातक डिग्री (BA/B.Com) कर सकती हैं।',
        steps: [
          {
            id: 'step-comp12-1',
            stepNumber: 1,
            title: 'Choose Degree: BA, B.Com, BBA, BCA or Vocational Diploma',
            titleTa: 'பட்டப்படிப்பைத் தேர்வு செய்க: BA, B.Com, BBA அல்லது தொழிற்கல்வி டிப்ளமோ',
            titleHi: 'डिग्री चुनें: BA, B.Com, BBA या व्यावसायिक डिप्लोमा',
            description: 'Apply to IGNOU (Indira Gandhi National Open University) or TNOU (Tamil Nadu Open University). No daily attendance required; weekend doubt classes held at district colleges.',
            descriptionTa: 'IGNOU அல்லது தமிழ்நாடு திறந்தநிலைப் பல்கலைக்கழகத்தில் (TNOU) சேரலாம். தினமும் கல்லூரி செல்லத் தேவையில்லை; வார இறுதி வகுப்புகள் உண்டு.',
            descriptionHi: 'IGNOU या तमिलनाडु ओपन यूनिवर्सिटी (TNOU) में दाखिला लें। दैनिक उपस्थिति की आवश्यकता नहीं।',
            institutionOrPortal: 'IGNOU Samarth Portal / TNOU Official',
            portalUrl: 'https://ignouadmission.samarth.edu.in',
            estimatedDuration: '3 Years (Flexible up to 6 Years)',
            costEstimate: '₹3,000 - ₹5,000 per year',
            costEstimateTa: 'ஆண்டுக்கு ₹3,000 - ₹5,000 மட்டுமே',
            costEstimateHi: 'प्रति वर्ष ₹3,000 - ₹5,000'
          },
          {
            id: 'step-comp12-2',
            stepNumber: 2,
            title: 'Check Scholarship & Fee Concession Eligibility',
            titleTa: 'கல்வி உதவித்தொகை மற்றும் கட்டண சலுகைகளை சரிபார்க்கவும்',
            titleHi: 'छात्रवृत्ति और शुल्क छूट की पात्रता जांचें',
            description: 'Government fee concessions apply for SC/ST and rural women students. Also apply for state welfare education grants.',
            descriptionTa: 'ஆதிதிராவிடர், பழங்குடியினர் மற்றும் பொருளாதாரத்தில் பின்தங்கிய பெண்களுக்கு அரசு கல்வி கட்டண விலக்கு அளிக்கிறது.',
            descriptionHi: 'अनुसूचित जाति/जनजाति और ग्रामीण छात्राओं के लिए सरकारी शुल्क छूट का लाभ लें।',
            institutionOrPortal: 'National Scholarship Portal (NSP)',
            portalUrl: 'https://scholarships.gov.in',
            estimatedDuration: 'During admission cycle',
            costEstimate: 'Up to 100% fee waiver for eligible categories',
            costEstimateTa: 'தகுதியுள்ளோருக்கு 100% கட்டண விலக்கு',
            costEstimateHi: 'पात्र श्रेणियों के लिए पूर्ण शुल्क छूट'
          },
          {
            id: 'step-comp12-3',
            stepNumber: 3,
            title: 'Pair Study with a Free Govt NSQF Skill Course',
            titleTa: 'படிப்போடு சேர்த்து இலவச அரசு தொழிற்பயிற்சி பெறவும்',
            titleHi: 'पढ़ाई के साथ मुफ्त सरकारी कौशल प्रशिक्षण (PMKVY) लें',
            description: 'Enroll in PMKVY / Naan Mudhalvan courses in digital office skills, healthcare assistant, retail management, or garment manufacturing.',
            descriptionTa: 'நான் முதல்வன் / PMKVY திட்டத்தின் கீழ் கணினி அலுவலக பணி, தையல், சுகாதார உதவியாளர் போன்ற இலவச சான்றிதழ் பெறவும்.',
            descriptionHi: 'पीएमकेवीवाई या राज्य कौशल मिशन के तहत कंप्यूटर या स्वास्थ्य सेवा में मुफ्त प्रशिक्षण लें।',
            institutionOrPortal: 'PMKVY / Naan Mudhalvan TN',
            portalUrl: 'https://www.skillindia.gov.in',
            estimatedDuration: '3 to 6 Months',
            costEstimate: '100% Free with Govt Stipend & Certificate',
            costEstimateTa: '100% முற்றிலும் இலவசம் (அரசு சான்றிதழுடன்)',
            costEstimateHi: '100% मुफ्त प्रमाण पत्र एवं छात्रवृत्ति सहित'
          }
        ]
      };

    case 'college_discontinued':
    case 'college_some_semesters':
      return {
        headline: 'Credit Transfer & Degree Completion for Discontinued College Students',
        headlineTa: 'கல்லூரி படிப்பை பாதியில் நிறுத்தியவர்களுக்கு: முந்தைய மதிப்பெண்களுடன் பட்டம் முடிக்கும் வழி',
        headlineHi: 'अधूरी कॉलेज पढ़ाई पूरी करने का मार्ग: क्रेडिट ट्रांसफर व डिग्री पूर्णता',
        empathyNote: 'Leaving college after 1st or 2nd year is not a dead end. National Education Policy (NEP) and Academic Bank of Credits (ABC) allow credit transfers to open universities!',
        empathyNoteTa: '1-ஆம் அல்லது 2-ஆம் ஆண்டு படித்துவிட்டு நின்றவர்கள் தங்கள் முந்தைய மதிப்பெண்களை வீணடிக்க வேண்டாம். Academic Bank of Credits (ABC) மற்றும் திறந்தநிலைப் பல்கலைக்கழகங்கள் மூலம் மீதி செமஸ்டர்களை எழுதி பட்டம் பெறலாம்.',
        empathyNoteHi: 'कॉलेज बीच में छोड़ने पर भी Academic Bank of Credits (ABC) के जरिए पिछले क्रेडिट्स ट्रांसफर कर बचे हुए सेमेस्टर्स पूरे किए जा सकते हैं।',
        steps: [
          {
            id: 'step-coll-1',
            stepNumber: 1,
            title: 'Create Your Academic Bank of Credits (ABC ID / APAAR)',
            titleTa: 'உங்கள் ABC ID (கல்வி கடன் கணக்கு) உருவாக்கவும்',
            titleHi: 'अपनी अकादमिक क्रेडिट बैंक (ABC ID) बनाएं',
            description: 'Visit abc.gov.in via DigiLocker. Register your ABC ID to pull previous semester exam credits verified by your former university.',
            descriptionTa: 'டிஜிலாக்கர் (DigiLocker) மூலம் abc.gov.in-ல் உங்கள் ABC ID கணக்கை தொடங்கி முந்தைய செமஸ்டர் மதிப்பெண்களை இணைக்கவும்.',
            descriptionHi: 'DigiLocker के माध्यम से abc.gov.in पर अपनी ABC ID बनाएं ताकि पिछले क्रेडिट्स सुरक्षित रह सकें।',
            institutionOrPortal: 'Academic Bank of Credits (ABC)',
            portalUrl: 'https://www.abc.gov.in',
            estimatedDuration: '10 Minutes',
            costEstimate: 'Free Government Service',
            costEstimateTa: 'இலவச அரசு சேவை',
            costEstimateHi: 'निःशुल्क सरकारी सेवा'
          },
          {
            id: 'step-coll-2',
            stepNumber: 2,
            title: 'Apply for Lateral Entry / Credit Transfer at IGNOU or TNOU',
            titleTa: 'IGNOU அல்லது TNOU-ல் நேரடி சேர்க்கை (Lateral Entry) விண்ணப்பிக்கவும்',
            titleHi: 'IGNOU या TNOU में लेटरल एंट्री या क्रेडिट ट्रांसफर हेतु आवेदन करें',
            description: 'Submit your mark sheets and TC/Migration certificate. Open universities grant credit exemptions for passed subjects, allowing you to directly enter 2nd or 3rd year.',
            descriptionTa: 'முந்தைய மதிப்பெண் பட்டியலை சமர்ப்பித்து தேர்ச்சி பெற்ற பாடங்களுக்கு விலக்கு பெற்று நேரடியாக 2 அல்லது 3-ஆம் ஆண்டில் தொடரலாம்.',
            descriptionHi: 'पूर्व अंकतालिका प्रस्तुत कर उत्तीर्ण विषयों की छूट प्राप्त करें और सीधे 2रे या 3रे वर्ष में प्रवेश लें।',
            institutionOrPortal: 'IGNOU Student Registration Division',
            portalUrl: 'https://ignou.ac.in',
            estimatedDuration: '1-2 Months evaluation',
            costEstimate: 'Nominal evaluation fee (approx ₹500/course)',
            costEstimateTa: 'மதிப்பீட்டு கட்டணம் சுமார் ₹500 மட்டுமே',
            costEstimateHi: 'लगभग ₹500 प्रति कोर्स मूल्यांकन शुल्क'
          },
          {
            id: 'step-coll-3',
            stepNumber: 3,
            title: 'Complete Pending Papers from Home & Graduate',
            titleTa: 'வீட்டில் இருந்தே மீதமுள்ள பாடங்களை எழுதி அரசு பட்டம் பெறவும்',
            titleHi: 'घर बैठे शेष परीक्षाएं देकर स्नातक डिग्री पूरी करें',
            description: 'Take term-end exams at the nearest district college exam center on Saturdays/Sundays. Receive a full UGC-recognized Bachelor’s degree.',
            descriptionTa: 'உங்கள் மாவட்ட அரசு கல்லூரியில் வார இறுதி நாட்களில் தேர்வு எழுதி, வழக்கமான கல்லூரிக்கு இணையான UGC பட்டத்தைப் பெறுங்கள்.',
            descriptionHi: 'निकटतम सरकारी कॉलेज में सप्ताहांत पर परीक्षा देकर यूजीसी मान्यता प्राप्त डिग्री हासिल करें।',
            institutionOrPortal: 'UGC-DEB Recognized University',
            portalUrl: 'https://deb.ugc.ac.in',
            estimatedDuration: '1 to 2 Years',
            costEstimate: '₹2,500 - ₹4,500 per year',
            costEstimateTa: 'ஆண்டுக்கு ₹2,500 - ₹4,500 மட்டுமே',
            costEstimateHi: 'प्रति वर्ष ₹2,500 - ₹4,500'
          }
        ]
      };

    case 'graduate_skill_upgrade':
    case 'unsure_next':
    default:
      return {
        headline: 'Skill Upgrade, Digital Literacy, and Self-Employment Pathways',
        headlineTa: 'திறன் மேம்பாடு, டிஜிட்டல் அறிவு மற்றும் சுயதொழில் வாய்ப்புகள்',
        headlineHi: 'कौशल संवर्धन, डिजिटल साक्षरता एवं स्वरोजगार मार्ग',
        empathyNote: 'If you already have basic qualifications or are unsure what to pursue next, starting with short, high-demand practical skills builds confidence and immediate earning power.',
        empathyNoteTa: 'நீங்கள் ஏற்கனவே பட்டம் பெற்றிருந்தாலும் அல்லது அடுத்த கட்டம் குறித்து தயக்கம் இருந்தாலும், உடனடி வருமானம் தரும் குறுகிய கால திறன் பயிற்சிகள் சிறந்த தொடக்கமாகும்.',
        empathyNoteHi: 'यदि आप अगली दिशा को लेकर असमंजस में हैं, तो व्यावहारिक और रोजगारोन्मुखी कौशल से शुरुआत करना सबसे सुरक्षित व आत्मविश्वासवर्धक है।',
        steps: [
          {
            id: 'step-skill-1',
            stepNumber: 1,
            title: 'Discover Free Government Vocational Courses (PMKVY / DDU-GKY)',
            titleTa: 'இலவச அரசு தொழிற்பயிற்சி திட்டங்களை கண்டறியவும்',
            titleHi: 'मुफ्त सरकारी व्यावसायिक प्रशिक्षण (PMKVY / DDU-GKY) खोजें',
            description: 'Explore courses in tailoring & fashion design, bakery & food processing, data entry, beauty & wellness, or bookkeeping with 100% govt subsidy.',
            descriptionTa: 'தையல், ஆடை வடிவமைப்பு, பேக்கரி மற்றும் உணவு தயாரிப்பு, அழகுக்கலை, டேட்டா என்ட்ரி போன்ற அரசு கட்டணமில்லா பயிற்சிகளைப் பெறுங்கள்.',
            descriptionHi: 'सिलाई, खाद्य प्रसंस्करण, ब्यूटी व वेलनेस, डेटा एंट्री आदि में 100% मुफ्त सरकारी प्रशिक्षण प्राप्त करें।',
            institutionOrPortal: 'Skill India Digital Hub',
            portalUrl: 'https://www.skillindiadigital.gov.in',
            estimatedDuration: '1 to 3 Months',
            costEstimate: '100% Free with Govt Toolkit',
            costEstimateTa: '100% இலவசம் (அரசு உபகரணங்களுடன்)',
            costEstimateHi: '100% मुफ्त सरकारी टूलकिट सहित'
          },
          {
            id: 'step-skill-2',
            stepNumber: 2,
            title: 'Master Digital Tools & Safe Online Banking',
            titleTa: 'டிஜிட்டல் கருவிகள் மற்றும் பாதுகாப்பான வங்கிப் பரிவர்த்தனைகளை கற்றுக்கொள்ளவும்',
            titleHi: 'डिजिटल उपकरण और सुरक्षित ऑनलाइन बैंकिंग सीखें',
            description: 'Learn smartphone business tools: WhatsApp Business catalogs, Google Pay / UPI QR codes, Canva product posters, and online order management.',
            descriptionTa: 'வாட்ஸ்அப் பிசினஸ், கூகுள் பே UPI, போஸ்டர் தயாரித்தல் போன்ற எளிய ஸ்மார்ட்போன் கருவிகளை கற்று உங்கள் தொழிலை வளர்க்கலாம்.',
            descriptionHi: 'व्हाट्सएप बिजनेस, यूपीआई क्यूआर कोड और पोस्टर बनाना सीखकर अपने व्यवसाय का विस्तार करें।',
            institutionOrPortal: 'SHERISE Digital & Skills Hub',
            portalUrl: '#skills-learning',
            estimatedDuration: '2 Weeks (1 hr/day)',
            costEstimate: 'Free Self-Paced Learning',
            costEstimateTa: 'இலவச சுய கற்றல்',
            costEstimateHi: 'निःशुल्क स्व-अध्ययन'
          },
          {
            id: 'step-skill-3',
            stepNumber: 3,
            title: 'Connect with Local Women Entrepreneurs & Support Networks',
            titleTa: 'உள்ளூர் மகளிர் தொழில்முனைவோர் மற்றும் உதவி அமைப்புகளுடன் இணையவும்',
            titleHi: 'स्थानीय महिला उद्यमियों और सहायता समूहों से जुड़ें',
            description: 'Join local SHGs, district DIC (District Industries Centre) workshops, and community peer groups to get marketing orders and revolving credit support.',
            descriptionTa: 'சுயஉதவிக் குழுக்கள் (SHG) மற்றும் மாவட்ட தொழில் மையம் (DIC) மூலம் சந்தை வாய்ப்புகள் மற்றும் குறைந்த வட்டி சுழல்நிதியைப் பெறுங்கள்.',
            descriptionHi: 'स्वयं सहायता समूहों और जिला उद्योग केंद्र से जुड़कर कम ब्याज पर सहायता व बाजार सहयोग प्राप्त करें।',
            institutionOrPortal: 'District Industries Centre (DIC) / TNCDW',
            portalUrl: 'https://www.msme.gov.in',
            estimatedDuration: 'Ongoing',
            costEstimate: 'Free Community Mentorship',
            costEstimateTa: 'இலவச சமூக வழிகாட்டுதல்',
            costEstimateHi: 'निःशुल्क सामुदायिक मार्गदर्शन'
          }
        ]
      };
  }
}
