/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scheme } from '../types';

export const schemesData: Scheme[] = [
  // =========================================================================
  // 1. PUDUCHERRY UNION TERRITORY GOVERNMENT SCHEMES (16 Verified Schemes)
  // =========================================================================
  {
    id: 'puducherry-magalir-urimai',
    title: 'Puducherry Women Financial Assistance Scheme (Magalir Urimai Thogai)',
    titleTa: 'புதுச்சேரி மகளிர் உரிமைத் தொகை திட்டம் (மாதம் ₹1,000)',
    titleHi: 'पुदुचेरी महिला वित्तीय सहायता योजना (मासिक ₹1,000)',
    department: 'Department of Women and Child Development, Government of Puducherry',
    departmentTa: 'பெண்கள் மற்றும் குழந்தைகள் மேம்பாட்டுத் துறை, புதுச்சேரி அரசு',
    departmentHi: 'महिला एवं बाल विकास विभाग, पुदुचेरी सरकार',
    governmentLevel: 'puducherry',
    stateOrUt: 'Puducherry',
    category: 'financial_aid',
    isLoan: false,
    benefits: 'Direct financial assistance of ₹1,000 per month credited to female heads of family in UT of Puducherry.',
    benefitsTa: 'புதுச்சேரி யூனியன் பிரதேசத்தில் உள்ள குடும்பத் தலைவிகளுக்கு மாதம் தோறும் ₹1,000 நேரடி வங்கி வரவு.',
    benefitsHi: 'पुदुचेरी केंद्र शासित प्रदेश में बीपीएल परिवार की महिला मुखिया को प्रतिमाह ₹1,000 प्रत्यक्ष वित्तीय सहायता।',
    minAge: 21,
    maxAge: 55,
    targetGroup: ['homemaker', 'rural', 'dropout'],
    eligibility: [
      'Woman aged between 21 and 55 years.',
      'Must be a native or continuous resident of Puducherry for at least 5 years.',
      'Must be acknowledged as woman head of family holding a valid Puducherry Red / Yellow Ration Card.',
      'Not currently receiving any other government pension (Widow, Old Age Pension, or government employment).'
    ],
    eligibilityTa: [
      '21 முதல் 55 வயதுக்குட்பட்ட பெண் குடும்பத் தலைவி.',
      'புதுச்சேரியில் குறைந்தது 5 ஆண்டுகள் வசிப்பவராக இருக்க வேண்டும்.',
      'சிவப்பு அல்லது மஞ்சள் ரேஷன் கார்டு பெற்றிருக்க வேண்டும்.',
      'அரசு ஊதியம் அல்லது வேறு முதியோர்/விதவை ஓய்வூதியம் பெறுபவராக இருக்கக்கூடாது.'
    ],
    eligibilityHi: [
      '21 से 55 वर्ष की महिला परिवार प्रमुख।',
      'पुदुचेरी की मूल या कम से कम 5 वर्ष की निवासी।',
      'लाल या पीला राशन कार्ड धारक।',
      'अन्य कोई सरकारी पेंशन या सरकारी सेवा में न हो।'
    ],
    documentsRequired: [
      'Puducherry Red/Yellow Ration Card',
      'Aadhaar Card',
      'Residence Certificate (5 years proof)',
      'Bank Passbook (single holder bank account)',
      'Self-declaration of not receiving other pensions'
    ],
    documentsRequiredTa: [
      'புதுச்சேரி சிவப்பு/மஞ்சள் ரேஷன் கார்டு',
      'ஆதார் அட்டை',
      'குடியிருப்பு சான்றிதழ் (5 ஆண்டுகள்)',
      'வங்கி கணக்கு புத்தகம்',
      'வேறு ஓய்வூதியம் பெறவில்லை என்பதற்கான சுய உறுதிமொழி'
    ],
    documentsRequiredHi: [
      'पुदुचेरी लाल/पीला राशन कार्ड',
      'आधार कार्ड',
      'निवास प्रमाण पत्र',
      'बैंक पासबुक',
      'अन्य पेंशन न लेने का स्व-घोषणा पत्र'
    ],
    applicationSteps: [
      'Collect the application form from the Directorate of Women & Child Development or local Anganwadi worker.',
      'Attach copy of Ration card and residential certificate attested by Revenue Inspector.',
      'Submit the application to the Anganwadi worker or Child Development Project Officer (CDPO).',
      'Direct monthly DBT transfer initiated after scrutiny.'
    ],
    applicationStepsTa: [
      'மகளிர் மற்றும் குழந்தைகள் மேம்பாட்டு துறை அல்லது உள்ளூர் அங்கன்வாடி பணியாளரிடம் விண்ணப்பம் பெறவும்.',
      'ரேஷன் கார்டு மற்றும் குடியிருப்பு சான்றிதழை இணைத்து சமர்ப்பிக்கவும்.',
      'அங்கன்வாடி பணியாளர் அல்லது CDPO அலுவலகத்தில் கொடுக்கவும்.',
      'சரிபார்ப்புக்குப் பின் வங்கி கணக்கில் மாதம் ₹1,000 வரும்.'
    ],
    applicationStepsHi: [
      'महिला एवं बाल विकास निदेशालय या आंगनवाड़ी कार्यकर्ता से आवेदन पत्र लें।',
      'राशन कार्ड व निवास प्रमाण पत्र संलग्न करें।',
      'सीडीपीओ (CDPO) या आंगनवाड़ी केंद्र में जमा करें।',
      'सत्यापन उपरांत सीधे खाते में मासिक राशि।'
    ],
    officialUrl: 'https://wcd.py.gov.in',
    verificationDate: 'Verified Official Gazette - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Directorate of Women & Child Development, Govt of Puducherry',
    officeOrServiceCenter: 'Directorate of Women & Child Development / Local Anganwadi Center',
    officeOrServiceCenterTa: 'மகளிர் குழந்தைகள் மேம்பாட்டு இயக்குநரகம் / அங்கன்வாடி மையம்',
    officeOrServiceCenterHi: 'महिला एवं बाल विकास निदेशालय / स्थानीय आंगनवाड़ी केंद्र',
    helpline: '0413-2242621 / 181',
    badge: 'UT Financial Grant',
    badgeTa: 'யூனியன் பிரதேச மானியம்',
    badgeHi: 'यूटी वित्तीय सहायता'
  },
  {
    id: 'puducherry-kamarajar-education',
    title: 'Perunthalaivar Kamarajar Financial Assistance Scheme for Higher Education',
    titleTa: 'பெருந்தலைவர் காமராஜர் உயர்கல்வி நிதியுதவி திட்டம் (புதுச்சேரி)',
    titleHi: 'पेरुंथलइवर कामराज उच्च शिक्षा वित्तीय सहायता योजना (पुदुचेरी)',
    department: 'Directorate of Higher & Technical Education (DHTE), Puducherry',
    departmentTa: 'உயர் மற்றும் தொழில்நுட்பக் கல்வி இயக்குநரகம், புதுச்சேரி',
    departmentHi: 'उच्च एवं तकनीकी शिक्षा निदेशालय, पुदुचेरी',
    governmentLevel: 'puducherry',
    stateOrUt: 'Puducherry',
    category: 'education',
    isLoan: false,
    benefits: 'Full tuition fee reimbursement for meritorious Puducherry students admitted through CENTAC to professional degree courses (Engineering, Medical, Nursing, Agriculture).',
    benefitsTa: 'CENTAC மூலம் பொறியியல், மருத்துவம், செவிலியர், வேளாண்மை படிப்புகளில் சேரும் மாணவிகளுக்கு முழுக் கல்விக் கட்டணத்தைத் அரசே செலுத்துகிறது.',
    benefitsHi: 'CENTAC के माध्यम से इंजीनियरिंग, मेडिकल, नर्सिंग में प्रवेश लेने वाली पुदुचेरी की छात्राओं को संपूर्ण शिक्षण शुल्क प्रतिपूर्ति।',
    targetGroup: ['student', 'rural'],
    eligibility: [
      'Resident of Union Territory of Puducherry by birth or continuous residence for 5 years.',
      'Must have passed Higher Secondary (+2) examination.',
      'Must have secured admission through CENTAC government quota counseling.'
    ],
    eligibilityTa: [
      'புதுச்சேரி யூனியன் பிரதேசத்தில் பிறந்த அல்லது 5 ஆண்டுகள் வசிக்கும் மாணவி.',
      '+2 பொதுத்தேர்வில் தேர்ச்சி பெற்றிருக்க வேண்டும்.',
      'CENTAC அரசு ஒதுக்கீட்டு கலந்தாய்வு மூலம் கல்லூரியில் சேர்ந்திருக்க வேண்டும்.'
    ],
    eligibilityHi: [
      'पुदुचेरी की 5 वर्ष से निरंतर निवासी छात्रा।',
      '12वीं परीक्षा उत्तीर्ण।',
      'CENTAC सरकारी कोटा काउंसलिंग से प्रवेश प्राप्त।'
    ],
    documentsRequired: [
      'CENTAC Allotment Order',
      'College Admission & Fee receipt',
      'Puducherry Residence / Nativity Certificate',
      '+2 Marksheet & Transfer Certificate',
      'Aadhaar Card & Bank account details'
    ],
    documentsRequiredTa: [
      'CENTAC இடஒதுக்கீடு ஆணை (Allotment Order)',
      'கல்லூரி சேர்க்கை மற்றும் கட்டண ரசீது',
      'புதுச்சேரி குடியிருப்பு சான்றிதழ்',
      '+2 மதிப்பெண் சான்றிதழ் & TC',
      'ஆதார் அட்டை & வங்கி பாஸ்புக்'
    ],
    documentsRequiredHi: [
      'CENTAC आवंटन आदेश',
      'कॉलेज प्रवेश एवं शुल्क रसीद',
      'निवास प्रमाण पत्र',
      '12वीं अंकतालिका',
      'आधार कार्ड व बैंक खाता'
    ],
    applicationSteps: [
      'Apply online via the DHTE Puducherry official Kamarajar scheme portal after CENTAC admission.',
      'Head of the educational institution verifies and forwards the application.',
      'DHTE sanctions the tuition fees and disburses the amount directly to the college/student account.'
    ],
    applicationStepsTa: [
      'CENTAC சேர்க்கைக்குப் பின் DHTE இணையதளத்தில் ஆன்லைனில் விண்ணப்பிக்கவும்.',
      'கல்லூரி முதல்வர் சான்றிதழ்களை சரிபார்த்து அனுப்புவார்.',
      'கல்வித்துறை கட்டணத்தை நேரடியாக விடுவிக்கும்.'
    ],
    applicationStepsHi: [
      'CENTAC प्रवेश उपरांत DHTE पोर्टल पर ऑनलाइन आवेदन करें।',
      'कॉलेज प्राचार्य द्वारा सत्यापन।',
      'विभाग द्वारा शिक्षण शुल्क की सीधी प्रतिपूर्ति।'
    ],
    officialUrl: 'https://dhte.py.gov.in',
    verificationDate: 'Verified Official Portal - January 2026',
    lastCheckedDate: '2026-01-21',
    officialSource: 'Directorate of Higher & Technical Education, Govt of Puducherry',
    officeOrServiceCenter: 'CENTAC Puducherry / Directorate of Higher Education, Lawspet',
    officeOrServiceCenterTa: 'சென்டாக் (CENTAC) / உயர்கல்வி இயக்குநரகம், லாஸ்பேட்டை',
    officeOrServiceCenterHi: 'CENTAC पुदुचेरी / उच्च शिक्षा निदेशालय, लॉस्पेट',
    helpline: '0413-2252277',
    badge: 'Higher Education Fee Waiver',
    badgeTa: 'முழு கல்விக் கட்டண விலக்கு',
    badgeHi: 'पूर्ण शिक्षण शुल्क प्रतिपूर्ति'
  },
  {
    id: 'puducherry-destitute-widow-pension',
    title: 'Puducherry Destitute Widow Monthly Pension (Mathar Maruvazhvu Thittam)',
    titleTa: 'புதுச்சேரி ஆதரவற்ற விதவை மாதாந்திர ஓய்வூதியம் (மாதர் மறுவாழ்வுத் திட்டம்)',
    titleHi: 'पुदुचेरी निराश्रित विधवा मासिक पेंशन योजना',
    department: 'Directorate of Social Welfare, Government of Puducherry',
    departmentTa: 'சமூக நலத்துறை இயக்குநரகம், புதுச்சேரி அரசு',
    departmentHi: 'समाज कल्याण निदेशालय, पुदुचेरी सरकार',
    governmentLevel: 'puducherry',
    stateOrUt: 'Puducherry',
    category: 'financial_aid',
    isLoan: false,
    benefits: 'Monthly social security pension of ₹2,500 to ₹3,000 directly credited to bank account, along with free festival clothing and rice quota.',
    benefitsTa: 'ஆதரவற்ற விதவை பெண்களுக்கு மாதம் ₹2,500 முதல் ₹3,000 வரை ஓய்வூதியம் மற்றும் இலவச அரிசி வழங்கப்படுகிறது.',
    benefitsHi: 'निराश्रित विधवा महिलाओं को प्रतिमाह ₹2,500 से ₹3,000 तक पेंशन व मुफ्त राशन।',
    minAge: 18,
    targetGroup: ['homemaker', 'rural', 'dropout'],
    eligibility: [
      'Widow resident of UT of Puducherry for at least 3 years.',
      'Annual family income below ₹1,00,000 (BPL status).',
      'Not remarried and not having adult earning son/daughter above 21 who supports her.'
    ],
    eligibilityTa: [
      'புதுச்சேரியில் குறைந்தது 3 ஆண்டுகள் வசிக்கும் விதவை பெண்.',
      'குடும்ப ஆண்டு வருமானம் ₹1 லட்சத்திற்குள் இருக்க வேண்டும்.',
      'மறுமணம் செய்யாதவராக இருக்க வேண்டும்.'
    ],
    eligibilityHi: [
      'पुदुचेरी में कम से कम 3 वर्ष से निवासी विधवा महिला।',
      'वार्षिक आय ₹1,00,000 से कम।',
      'पुनर्विवाह न किया हो।'
    ],
    documentsRequired: [
      'Death Certificate of Husband',
      'Widow Certificate from Tahsildar / Taluk Office',
      'Aadhaar Card and Smart Family Card',
      'Income Certificate and Bank Passbook'
    ],
    documentsRequiredTa: [
      'கணவரின் இறப்பு சான்றிதழ்',
      'வட்டாட்சியர் வழங்கிய விதவை சான்றிதழ்',
      'ஆதார் அட்டை & குடும்ப அட்டை',
      'வருமான சான்றிதழ் & வங்கி புத்தகம்'
    ],
    documentsRequiredHi: [
      'पति का मृत्यु प्रमाण पत्र',
      'तहसीलदार द्वारा जारी विधवा प्रमाण पत्र',
      'आधार कार्ड व राशन कार्ड',
      'आय प्रमाण पत्र व बैंक पासबुक'
    ],
    applicationSteps: [
      'Obtain application form from the Directorate of Social Welfare, Saram, Puducherry or Taluk Office in Karaikal/Mahe/Yanam.',
      'Submit filled application with required attestations by Village Administrative Officer (VAO).',
      'Welfare inspector field scrutiny followed by pension sanction order.'
    ],
    applicationStepsTa: [
      'சாரம் சமூக நலத்துறை அல்லது காரைக்கால்/மாகே/ஏனாம் வட்டாட்சியர் அலுவலகத்தில் படிவம் பெறவும்.',
      'VAO சான்றொப்பமிட்டு சமர்ப்பிக்கவும்.',
      'ஆய்வுக்குப் பின் வங்கி கணக்கில் நேரடி ஓய்வூதியம் வரும்.'
    ],
    applicationStepsHi: [
      'समाज कल्याण निदेशालय सारम या तालुका कार्यालय से फॉर्म लें।',
      'राजस्व अधिकारी सत्यापन कराकर जमा करें।',
      'जांच उपरांत खाते में मासिक पेंशन।'
    ],
    officialUrl: 'https://socwelfare.py.gov.in',
    verificationDate: 'Verified Official Portal - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Directorate of Social Welfare, UT of Puducherry',
    officeOrServiceCenter: 'Directorate of Social Welfare, Saram, Puducherry / Regional Taluk Offices',
    officeOrServiceCenterTa: 'சமூக நலத்துறை இயக்குநரகம், சாரம், புதுச்சேரி',
    officeOrServiceCenterHi: 'समाज कल्याण निदेशालय, सारम, पुदुचेरी',
    helpline: '0413-2205872',
    badge: 'Widow Social Pension',
    badgeTa: 'விதவை சமூக ஓய்வூதியம்',
    badgeHi: 'विधवा सामाजिक पेंशन'
  },
  {
    id: 'puducherry-unmarried-poor-women',
    title: 'Financial Assistance to Poor Unmarried Women (Age 50+)',
    titleTa: 'ஏழை திருமணமாகாத பெண்களுக்கான மாதாந்திர உதவித்தொகை (50 வயதுக்கு மேற்பட்டோர்)',
    titleHi: '50 वर्ष से अधिक आयु की निर्धन अविवाहित महिलाओं हेतु वित्तीय सहायता',
    department: 'Directorate of Social Welfare, Government of Puducherry',
    departmentTa: 'சமூக நலத்துறை, புதுச்சேரி அரசு',
    departmentHi: 'समाज कल्याण विभाग, पुदुचेरी सरकार',
    governmentLevel: 'puducherry',
    stateOrUt: 'Puducherry',
    category: 'financial_aid',
    isLoan: false,
    benefits: 'Monthly financial subsistence pension of ₹2,500 credited directly to bank account to support independent living.',
    benefitsTa: 'திருமணமாகாத 50 வயதுக்கு மேற்பட்ட ஏழை பெண்களுக்கு மாதம் ₹2,500 நேரடி உதவித்தொகை.',
    benefitsHi: '50 वर्ष से अधिक आयु की गरीब अविवाहित महिलाओं को ₹2,500 मासिक पेंशन।',
    minAge: 50,
    targetGroup: ['homemaker', 'rural'],
    eligibility: [
      'Unmarried woman aged 50 years and above.',
      'Continuous resident of UT of Puducherry for at least 5 years.',
      'Family income not exceeding ₹1,00,000 per annum with no earning support.'
    ],
    eligibilityTa: [
      '50 வயது அல்லது அதற்கு மேற்பட்ட திருமணமாகாத பெண்.',
      'புதுச்சேரியில் 5 ஆண்டுகள் வசிப்பவர்.',
      'ஆண்டு வருமானம் ₹1 லட்சத்திற்குள் இருத்தல்.'
    ],
    eligibilityHi: [
      '50 वर्ष या उससे अधिक आयु की अविवाहित महिला।',
      'पुदुचेरी की 5 वर्ष से निवासी।',
      'वार्षिक आय ₹1 लाख से कम।'
    ],
    documentsRequired: [
      'Age proof (Birth Certificate / 10th TC / Voter ID)',
      'Unmarried Status Certificate from Village Revenue Officer / Tahsildar',
      'Aadhaar Card and Puducherry Ration Card',
      'Bank Account Passbook'
    ],
    documentsRequiredTa: [
      'வயது சான்றிதழ் (வாக்காளர் அட்டை / TC)',
      'திருமணமாகாதவர் சான்றிதழ் (வட்டாட்சியர்)',
      'ஆதார் அட்டை & குடும்ப அட்டை',
      'வங்கி கணக்கு புத்தகம்'
    ],
    documentsRequiredHi: [
      'आयु प्रमाण पत्र',
      'अविवाहित प्रमाण पत्र (तहसीलदार द्वारा)',
      'आधार कार्ड व राशन कार्ड',
      'बैंक पासबुक'
    ],
    applicationSteps: [
      'Apply at the Directorate of Social Welfare or Sub-Taluk Office.',
      'Attach revenue officer verification.',
      'Direct monthly disbursement to the applicant’s bank account.'
    ],
    applicationStepsTa: [
      'சமூக நலத்துறை அல்லது வட்டாட்சியர் அலுவலகத்தில் விண்ணப்பிக்கவும்.',
      'வருவாய்த்துறை சான்றிதழை இணைக்கவும்.',
      'மாதந்தோறும் வங்கி கணக்கில் தொகை வரவு வைக்கப்படும்.'
    ],
    applicationStepsHi: [
      'समाज कल्याण विभाग में आवेदन करें।',
      'सत्यापन उपरांत मासिक पेंशन बैंक में।'
    ],
    officialUrl: 'https://socwelfare.py.gov.in',
    verificationDate: 'Verified Official Guidelines - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Directorate of Social Welfare, Puducherry',
    officeOrServiceCenter: 'Directorate of Social Welfare, Puducherry / Anganwadi Centres',
    officeOrServiceCenterTa: 'சமூக நலத்துறை அலுவலகம் / அங்கன்வாடி மையம்',
    officeOrServiceCenterHi: 'समाज कल्याण कार्यालय, पुदुचेरी',
    helpline: '0413-2205872',
    badge: 'Unmarried Women Allowance',
    badgeTa: 'திருமணமாகாதோர் மாதாந்திர உதவி',
    badgeHi: 'अविवाहित महिला भत्ता'
  },
  {
    id: 'puducherry-free-uniforms-books-cycles',
    title: 'Free Uniforms, Textbooks & Bicycles for School Girls (Puducherry)',
    titleTa: 'அரசுப் பள்ளி மாணவிகளுக்கு இலவச சீருடை, புத்தகங்கள் & மிதிவண்டி திட்டம்',
    titleHi: 'सरकारी स्कूल छात्राओं हेतु मुफ्त वर्दी, पाठ्यपुस्तक एवं साइकिल योजना',
    department: 'Directorate of School Education, Puducherry',
    departmentTa: 'பள்ளிக் கல்வி இயக்ககம், புதுச்சேரி அரசு',
    departmentHi: 'स्कूल शिक्षा निदेशालय, पुदुचेरी',
    governmentLevel: 'puducherry',
    stateOrUt: 'Puducherry',
    category: 'education',
    isLoan: false,
    benefits: '2 sets of free school uniforms, all academic textbooks, notebooks, footwear, and a brand-new bicycle for Class 9/11 female students.',
    benefitsTa: 'இலவச பாடப்புத்தகங்கள், 2 ஜோடி சீருடைகள், காலணிகள் மற்றும் 9, 11-ஆம் வகுப்பு மாணவிகளுக்கு இலவச மிதிவண்டி.',
    benefitsHi: '2 सेट मुफ्त स्कूल वर्दी, पाठ्यपुस्तकें एवं 9वीं व 11वीं की छात्राओं को मुफ्त साइकिल।',
    targetGroup: ['student', 'rural'],
    eligibility: [
      'Girl students enrolled in Government or Government-aided schools in UT of Puducherry (Classes 1 to 12).'
    ],
    eligibilityTa: [
      'புதுச்சேரி அரசு அல்லது அரசு உதவிபெறும் பள்ளிகளில் 1 முதல் 12-ஆம் வகுப்பு வரை பயிலும் மாணவிகள்.'
    ],
    eligibilityHi: [
      'पुदुचेरी के सरकारी या सहायता प्राप्त स्कूलों में कक्षा 1 से 12 की छात्राएं।'
    ],
    documentsRequired: [
      'School Admission Enrollment Number',
      'Aadhaar Card of the Student',
      'Family Smart Card (Ration Card)'
    ],
    documentsRequiredTa: [
      'பள்ளி சேர்க்கை எண்',
      'மாணவியின் ஆதார் அட்டை',
      'குடும்ப அட்டை'
    ],
    documentsRequiredHi: [
      'स्कूल नामांकन संख्या',
      'छात्रा का आधार कार्ड',
      'राशन कार्ड'
    ],
    applicationSteps: [
      'Direct distribution through school Headmaster at the start of academic session.',
      'No separate fee or middleman application needed.'
    ],
    applicationStepsTa: [
      'கல்வி ஆண்டு தொடக்கத்தில் பள்ளி தலைமை ஆசிரியர் மூலமாக நேரடியாக வழங்கப்படுகிறது.',
      'தனியாக விண்ணப்பிக்கத் தேவையில்லை.'
    ],
    applicationStepsHi: [
      'शैक्षणिक सत्र के आरंभ में स्कूल द्वारा सीधे वितरण।'
    ],
    officialUrl: 'https://schooledn.py.gov.in',
    verificationDate: 'Verified Official Directorate Portal - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Directorate of School Education, Govt of Puducherry',
    officeOrServiceCenter: 'Government High / Higher Secondary Schools in Puducherry',
    officeOrServiceCenterTa: 'அரசு உயர்நிலை மற்றும் மேல்நிலைப் பள்ளிகள்',
    officeOrServiceCenterHi: 'सरकारी स्कूल, पुदुचेरी',
    helpline: '0413-2207203',
    badge: '100% Free School Support',
    badgeTa: '100% இலவச பள்ளி உதவி',
    badgeHi: 'मुफ्त स्कूल सहायता'
  },
  {
    id: 'puducherry-maternity-financial-aid',
    title: 'Puducherry Maternal Financial & Nutrition Assistance (JSSK & State Aid)',
    titleTa: 'புதுச்சேரி கர்ப்பிணி தாய்மார்களுக்கான மகப்பேறு நிதியுதவி & ஊட்டச்சத்து',
    titleHi: 'पुदुचेरी गर्भवती एवं धात्री माताओं हेतु मातृत्व वित्तीय सहायता',
    department: 'Department of Health and Family Welfare Services, Puducherry',
    departmentTa: 'சுகாதாரம் மற்றும் குடும்ப நலத்துறை, புதுச்சேரி அரசு',
    departmentHi: 'स्वास्थ्य एवं परिवार कल्याण सेवा विभाग, पुदुचेरी',
    governmentLevel: 'puducherry',
    stateOrUt: 'Puducherry',
    category: 'financial_aid',
    isLoan: false,
    benefits: '₹2,000 institutional delivery financial aid, free delivery with zero out-of-pocket expenses, free medicines, blood, ultrasound, and post-natal nutrition kit.',
    benefitsTa: 'இலவச பிரசவம், மருந்துகள், ஸ்கேன் பரிசோதனைகள், ₹2,000 மகப்பேறு உதவித்தொகை மற்றும் ஊட்டச்சத்து பெட்டகம்.',
    benefitsHi: 'संस्थागत प्रसव पर ₹2,000 सहायता, मुफ्त दवाएं, जांच व पोषण किट।',
    minAge: 19,
    targetGroup: ['homemaker', 'rural'],
    eligibility: [
      'Pregnant women delivering at Indira Gandhi Govt General Hospital / Rajiv Gandhi Women & Children Hospital or PHCs in Puducherry.',
      'Antenatal registration within 12 weeks of pregnancy.'
    ],
    eligibilityTa: [
      'புதுச்சேரி அரசு மருத்துவமனை அல்லது ஆரம்ப சுகாதார நிலையத்தில் பிரசவம் பார்க்கும் பெண்கள்.'
    ],
    eligibilityHi: [
      'पुदुचेरी सरकारी अस्पताल या पीएचसी में प्रसव कराने वाली महिलाएं।'
    ],
    documentsRequired: [
      'Mother and Child Protection (MCP) RCH Card',
      'Aadhaar Card',
      'Bank Account details'
    ],
    documentsRequiredTa: [
      'தாய்-சேய் நல அட்டை',
      'ஆதார் அட்டை',
      'வங்கி கணக்கு புத்தகம்'
    ],
    documentsRequiredHi: [
      'मातृ एवं शिशु सुरक्षा कार्ड',
      'आधार कार्ड',
      'बैंक पासबुक'
    ],
    applicationSteps: [
      'Register early with the Anganwadi / Primary Health Centre (PHC).',
      'Deliver in Government Hospital to receive on-the-spot DBT credit.'
    ],
    applicationStepsTa: [
      'ஆரம்ப சுகாதார நிலையத்தில் முன் பதிவு செய்து அரசு மருத்துவமனையில் பிரசவம் பார்க்கவும்.'
    ],
    applicationStepsHi: [
      'प्राथमिक स्वास्थ्य केंद्र पर पंजीकरण व सरकारी अस्पताल में प्रसव।'
    ],
    officialUrl: 'https://health.py.gov.in',
    verificationDate: 'Verified Official Health Portal - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Directorate of Health, Puducherry',
    officeOrServiceCenter: 'Rajiv Gandhi Women & Children Hospital / Primary Health Centres',
    officeOrServiceCenterTa: 'ராஜீவ் காந்தி தாய்-சேய் மருத்துவமனை / ஆரம்ப சுகாதார நிலையங்கள்',
    officeOrServiceCenterHi: 'राजीव गांधी महिला एवं बाल अस्पताल, पुदुचेरी',
    helpline: '104 / 102',
    badge: 'Maternity Health Grant',
    badgeTa: 'மகப்பேறு நல மானியம்',
    badgeHi: 'मातृत्व स्वास्थ्य अनुदान'
  },
  {
    id: 'puducherry-housing-subsidy',
    title: 'Perunthalaivar Kamarajar Centenary Housing Scheme for Poor Women',
    titleTa: 'பெருந்தலைவர் காமராஜர் ஏழை பெண்களுக்கான கான்கிரீட் வீடு கட்டும் மானியம்',
    titleHi: 'पेरुंथलइवर कामराज आवास सब्सिडी योजना',
    department: 'Town and Country Planning Department / Puducherry Slum Clearance Board',
    departmentTa: 'நகர் மற்றும் ஊரமைப்புத்துறை / சேரி ஒழிப்பு வாரியம், புதுச்சேரி',
    departmentHi: 'नगर एवं ग्राम नियोजन विभाग, पुदुचेरी',
    governmentLevel: 'puducherry',
    stateOrUt: 'Puducherry',
    category: 'financial_aid',
    isLoan: false,
    benefits: 'Capital subsidy of ₹2,00,000 in 3 installments to convert huts into permanent pucca concrete houses, registered in woman’s name.',
    benefitsTa: 'பெண்களின் பெயரில் உள்ள குடிசை வீட்டை கான்கிரீட் வீடாக மாற்ற ₹2,00,000 வரை அரசு மானியம்.',
    benefitsHi: 'कच्चे मकान को पक्का कंक्रीट घर बनाने हेतु महिला के नाम पर ₹2,00,000 की वित्तीय सब्सिडी।',
    targetGroup: ['homemaker', 'rural'],
    eligibility: [
      'BPL family owning a plot or kutcha hut with patta registered in woman’s name or joint name.',
      'Annual family income should not exceed ₹1,20,000.'
    ],
    eligibilityTa: [
      'பெண் பெயரில் அல்லது கூட்டாக மனைப்பட்டா வைத்திருக்கும் ஏழை குடும்பங்கள்.'
    ],
    eligibilityHi: [
      'महिला के नाम पट्टा या कच्चा मकान धारक बीपीएल परिवार।'
    ],
    documentsRequired: [
      'Land Patta / Ownership document',
      'Income Certificate from Tahsildar',
      'Puducherry Ration Card & Aadhaar',
      'Site plan and estimate'
    ],
    documentsRequiredTa: [
      'மனை பட்டா ஆவணம்',
      'வருமான சான்றிதழ்',
      'ரேஷன் கார்டு & ஆதார்'
    ],
    documentsRequiredHi: [
      'भूमि पट्टा दस्तावेज',
      'आय प्रमाण पत्र',
      'राशन कार्ड व आधार'
    ],
    applicationSteps: [
      'Submit application to Town and Country Planning Office / Puducherry Housing Board.',
      'Technical engineer inspects site and releases stage-wise payments via DBT.'
    ],
    applicationStepsTa: [
      'வீட்டு வசதி வாரியம் அல்லது நகர் ஊரமைப்பு அலுவலகத்தில் விண்ணப்பிக்கவும்.'
    ],
    applicationStepsHi: [
      'आवास बोर्ड कार्यालय में आवेदन व सत्यापन उपरांत किश्तों में राशि।'
    ],
    officialUrl: 'https://tcpd.py.gov.in',
    verificationDate: 'Verified Official Housing Guidelines - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Govt of Puducherry TCPD',
    officeOrServiceCenter: 'Town & Country Planning Dept / Slum Clearance Board, Puducherry',
    officeOrServiceCenterTa: 'நகர் மற்றும் ஊரமைப்புத்துறை அலுவலகம், புதுச்சேரி',
    officeOrServiceCenterHi: 'नगर एवं ग्राम नियोजन कार्यालय, पुदुचेरी',
    helpline: '0413-2205932',
    badge: 'Housing Construction Grant',
    badgeTa: 'வீடு கட்டும் மானியம்',
    badgeHi: 'आवास निर्माण सब्सिडी'
  },
  {
    id: 'puducherry-pondiveda-shg-credit',
    title: 'PONDIVEDA Women Development Corporation Micro-Credit & Revolving Fund',
    titleTa: 'பாண்டிவேடா (PONDIVEDA) மகளிர் சுயஉதவிக்குழு சுழல்நிதி & குறைந்த வட்டிக் கடன்',
    titleHi: 'पॉन्डीवेडा (PONDIVEDA) महिला एसएचजी सूक्ष्म ऋण व आवर्ती निधि',
    department: 'Puducherry Corporation for Development of Women and Differently Abled Persons',
    departmentTa: 'புதுச்சேரி மகளிர் மற்றும் மாற்றுத்திறனாளிகள் மேம்பாட்டு நிறுவனம்',
    departmentHi: 'पुदुचेरी महिला एवं दिव्यांगजन विकास निगम (PONDIVEDA)',
    governmentLevel: 'puducherry',
    stateOrUt: 'Puducherry',
    category: 'shg_loan',
    isLoan: true,
    benefits: 'Micro-credit loans from ₹50,000 to ₹5,00,000 with low subsidized interest rates (4-6%) for women self-help groups taking up micro-enterprises.',
    benefitsTa: 'சுயஉதவிக் குழுக்களுக்கு குறைந்த வட்டியில் ₹50,000 முதல் ₹5,00,000 வரை சுழல்நிதி மற்றும் தொழிற்கடன்.',
    benefitsHi: 'महिला स्वयं सहायता समूहों को कम ब्याज पर ₹50,000 से ₹5,00,000 तक का सूक्ष्म ऋण।',
    targetGroup: ['entrepreneur', 'rural', 'homemaker'],
    eligibility: [
      'Recognized women SHG in Puducherry active for at least 6 months with regular savings habit.'
    ],
    eligibilityTa: [
      'புதுச்சேரியில் 6 மாதங்கள் செயல்படும் மகளிர் சுயஉதவிக் குழு.'
    ],
    eligibilityHi: [
      'पुदुचेरी में कम से कम 6 माह से सक्रिय महिला एसएचजी।'
    ],
    documentsRequired: [
      'SHG Resolution Copy',
      'PONDIVEDA Registration Certificate',
      'Bank Passbook of SHG and Member Aadhaar cards'
    ],
    documentsRequiredTa: [
      'குழு தீர்மான நகல்',
      'பாண்டிவேடா பதிவு சான்றிதழ்',
      'குழு வங்கி கணக்கு புத்தகம் & ஆதார்'
    ],
    documentsRequiredHi: [
      'समूह प्रस्ताव प्रति',
      'पंजीकरण प्रमाण पत्र',
      'बैंक पासबुक'
    ],
    applicationSteps: [
      'Submit group resolution and project proposal to the PONDIVEDA office at Saram, Puducherry.',
      'Credit linkage approved and disbursed to group bank account.'
    ],
    applicationStepsTa: [
      'சாரம் பாண்டிவேடா அலுவலகத்தில் குழு தீர்மானத்துடன் விண்ணப்பிக்கவும்.'
    ],
    applicationStepsHi: [
      'सारम पॉन्डीवेडा कार्यालय में आवेदन करें।'
    ],
    officialUrl: 'https://wcd.py.gov.in',
    verificationDate: 'Verified Official Guidelines - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'PONDIVEDA, Govt of Puducherry',
    officeOrServiceCenter: 'PONDIVEDA Office, Saram, Puducherry',
    officeOrServiceCenterTa: 'பாண்டிவேடா அலுவலகம், சாரம், புதுச்சேரி',
    officeOrServiceCenterHi: 'पॉन्डीवेडा कार्यालय, सारम, पुदुचेरी',
    helpline: '0413-2248564',
    badge: 'Subsidized SHG Credit',
    badgeTa: 'சுயஉதவிக்குழு தொழிற்கடன்',
    badgeHi: 'एसएचजी रियायती ऋण'
  },
  {
    id: 'puducherry-lpg-subsidy',
    title: 'Puducherry Chief Minister’s LPG Cooking Gas Cylinder Subsidy Scheme',
    titleTa: 'புதுச்சேரி முதலமைச்சரின் இலவச சமையல் எரிவாயு சிலிண்டர் மானியத் திட்டம்',
    titleHi: 'पुदुचेरी मुख्यमंत्री रसोई गैस सिलेंडर सब्सिडी योजना',
    department: 'Department of Civil Supplies and Consumer Affairs, Puducherry',
    departmentTa: 'குடிமைப் பொருள் வழங்கல் மற்றும் நுகர்வோர் விவகாரங்கள் துறை, புதுச்சேரி',
    departmentHi: 'नागरिक आपूर्ति एवं उपभोक्ता मामले विभाग, पुदुचेरी',
    governmentLevel: 'puducherry',
    stateOrUt: 'Puducherry',
    category: 'financial_aid',
    isLoan: false,
    benefits: '₹300 direct cash subsidy per cylinder credited every month directly to the woman family head’s bank account for up to 12 cylinders/year.',
    benefitsTa: 'குடும்பத் தலைவிகளின் வங்கி கணக்கில் மாதம் ஒரு சிலிண்டருக்கு ₹300 நேரடி மானிய வரவு.',
    benefitsHi: 'प्रति माह ₹300 प्रत्यक्ष रसोई गैस सब्सिडी सीधे महिला मुखिया के बैंक खाते में।',
    targetGroup: ['homemaker', 'rural'],
    eligibility: [
      'Puducherry Red or Yellow Smart Family Ration Card holder.',
      'Active domestic LPG connection registered in the name of the woman or family head.'
    ],
    eligibilityTa: [
      'புதுச்சேரி சிவப்பு அல்லது மஞ்சள் ஸ்மார்ட் குடும்ப அட்டை வைத்திருப்பவர்.'
    ],
    eligibilityHi: [
      'पुदुचेरी लाल या पीला राशन कार्ड धारक परिवार।'
    ],
    documentsRequired: [
      'LPG Gas Consumer Passbook (Showing 17-digit LPG ID)',
      'Smart Family Ration Card',
      'Aadhaar Card linked to Bank Account'
    ],
    documentsRequiredTa: [
      'கேஸ் இணைப்பு பாஸ்புக் (17 இலக்க LPG எண்)',
      'ஸ்மார்ட் குடும்ப அட்டை',
      'ஆதாருடன் இணைக்கப்பட்ட வங்கி கணக்கு'
    ],
    documentsRequiredHi: [
      'गैस उपभोक्ता पासबुक (17 अंकों की एलपीजी आईडी)',
      'राशन कार्ड',
      'आधार लिंक बैंक खाता'
    ],
    applicationSteps: [
      'Link your 17-digit LPG ID with your Smart Family Ration Card at the local Civil Supplies Tahsildar office or online.',
      'Subsidy automatically credited to bank account upon each cylinder delivery.'
    ],
    applicationStepsTa: [
      'குடிமைப் பொருள் வழங்கல் அலுவலகத்தில் ரேஷன் அட்டையுடன் LPG எண்ணை இணைக்கவும்.'
    ],
    applicationStepsHi: [
      'नागरिक आपूर्ति कार्यालय में राशन कार्ड से एलपीजी आईडी लिंक कराएं।'
    ],
    officialUrl: 'https://formsofpuducherry.py.gov.in',
    verificationDate: 'Verified Official Govt Order - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Civil Supplies Dept, Puducherry',
    officeOrServiceCenter: 'Civil Supplies Taluk Office / CSC Centers, Puducherry',
    officeOrServiceCenterTa: 'குடிமைப் பொருள் வழங்கல் வட்டாட்சியர் அலுவலகம்',
    officeOrServiceCenterHi: 'नागरिक आपूर्ति तहसील कार्यालय, पुदुचेरी',
    helpline: '0413-2251691 / 1967',
    badge: 'Monthly Fuel Subsidy',
    badgeTa: 'மாதாந்திர எரிவாயு மானியம்',
    badgeHi: 'मासिक गैस सब्सिडी'
  },
  {
    id: 'puducherry-marriage-assistance',
    title: 'Financial Assistance for Marriage of Poor Girls & Daughters of Widows',
    titleTa: 'ஏழைப் பெண்கள் & விதவைகளின் மகள்களுக்கான திருமண நிதியுதவி திட்டம்',
    titleHi: 'गरीब कन्याओं एवं विधवाओं की पुत्रियों हेतु विवाह वित्तीय सहायता',
    department: 'Department of Women and Child Development, Puducherry',
    departmentTa: 'பெண்கள் மற்றும் குழந்தைகள் மேம்பாட்டுத் துறை, புதுச்சேரி',
    departmentHi: 'महिला एवं बाल विकास विभाग, पुदुचेरी',
    governmentLevel: 'puducherry',
    stateOrUt: 'Puducherry',
    category: 'financial_aid',
    isLoan: false,
    benefits: 'One-time marriage grant of ₹25,000 for poor girls and ₹50,000 for daughters of destitute widows directly credited before wedding.',
    benefitsTa: 'ஏழை பெண்களுக்கு ₹25,000 மற்றும் விதவைகளின் மகள்களுக்கு ₹50,000 திருமண நிதியுதவி.',
    benefitsHi: 'विवाह हेतु ₹25,000 से ₹50,000 की एकमुश्त वित्तीय सहायता।',
    minAge: 18,
    targetGroup: ['homemaker', 'rural', 'dropout'],
    eligibility: [
      'Bride must be 18 years or older; bridegroom must be 21 or older.',
      'Resident of Puducherry for at least 5 years.',
      'Family income within BPL limit (under ₹1,00,000/yr).'
    ],
    eligibilityTa: [
      'மணப்பெண்ணிற்கு 18 வயது, மணமகனுக்கு 21 வயது நிரம்பியிருக்க வேண்டும்.'
    ],
    eligibilityHi: [
      'दुल्हन की आयु 18 वर्ष और दूल्हे की 21 वर्ष।'
    ],
    documentsRequired: [
      'Age Proof of Bride and Groom',
      'Wedding Invitation Card & Marriage Certificate',
      'Income and Residence Certificate from Tahsildar',
      'Widow certificate of mother (if applicable)'
    ],
    documentsRequiredTa: [
      'மணமகன், மணமகள் வயது சான்றிதழ்',
      'திருமண அழைப்பிதழ்',
      'வருமான சான்றிதழ் & குடியிருப்பு சான்றிதழ்'
    ],
    documentsRequiredHi: [
      'आयु प्रमाण पत्र',
      'शादी का कार्ड',
      'आय व निवास प्रमाण पत्र'
    ],
    applicationSteps: [
      'Apply at least 30 days before the wedding date or within 90 days after marriage to the DWCD Puducherry.',
      'Amount transferred directly to the bride’s bank account.'
    ],
    applicationStepsTa: [
      'திருமணத்திற்கு 30 நாட்களுக்கு முன் மகளிர் மேம்பாட்டுத் துறையில் விண்ணப்பிக்கவும்.'
    ],
    applicationStepsHi: [
      'विवाह से 30 दिन पूर्व महिला एवं बाल विकास विभाग में आवेदन करें।'
    ],
    officialUrl: 'https://wcd.py.gov.in',
    verificationDate: 'Verified Official Guidelines - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'DWCD Puducherry',
    officeOrServiceCenter: 'Directorate of Women & Child Development, Puducherry / Anganwadi Centers',
    officeOrServiceCenterTa: 'மகளிர் குழந்தைகள் மேம்பாட்டு இயக்குநரகம், புதுச்சேரி',
    officeOrServiceCenterHi: 'महिला एवं बाल विकास निदेशालय, पुदुचेरी',
    helpline: '0413-2242621',
    badge: 'Marriage Grant',
    badgeTa: 'திருமண நிதியுதவி',
    badgeHi: 'विवाह अनुदान'
  },
  {
    id: 'puducherry-differently-abled-women',
    title: 'Puducherry Financial Assistance to Differently Abled Women',
    titleTa: 'மாற்றுத்திறனாளி பெண்களுக்கான மாதாந்திர உதவித்தொகை & இலவச பேருந்து பாஸ்',
    titleHi: 'पुदुचेरी दिव्यांग महिलाओं हेतु मासिक पेंशन एवं मुफ्त यात्रा पास',
    department: 'Directorate of Social Welfare, Government of Puducherry',
    departmentTa: 'சமூக நலத்துறை, புதுச்சேரி அரசு',
    departmentHi: 'समाज कल्याण विभाग, पुदुचेरी',
    governmentLevel: 'puducherry',
    stateOrUt: 'Puducherry',
    category: 'financial_aid',
    isLoan: false,
    benefits: 'Monthly financial assistance of ₹2,500 to ₹3,800 based on disability percentage, plus free transport pass and free prosthetic aid appliances.',
    benefitsTa: 'மாதம் ₹2,500 முதல் ₹3,800 வரை மாதாந்திர உதவித்தொகை மற்றும் அரசு பேருந்துகளில் இலவச பயண பாஸ்.',
    benefitsHi: 'दिव्यांगता के आधार पर ₹2,500 से ₹3,800 प्रतिमाह वित्तीय सहायता व मुफ्त बस पास।',
    targetGroup: ['homemaker', 'rural', 'dropout'],
    eligibility: [
      'Resident of UT of Puducherry with 40% or more disability certified by District Medical Board.'
    ],
    eligibilityTa: [
      'மருத்துவ வாரியம் வழங்கிய 40% அல்லது அதற்கு மேற்பட்ட மாற்றுத்திறனாளி அட்டை வைத்திருப்பவர்.'
    ],
    eligibilityHi: [
      'मेडिकल बोर्ड से 40% या अधिक दिव्यांगता प्रमाण पत्र धारक।'
    ],
    documentsRequired: [
      'Unique Disability ID (UDID) Card / Medical Board Certificate',
      'Puducherry Residence Certificate',
      'Aadhaar Card and Bank Passbook'
    ],
    documentsRequiredTa: [
      'UDID மாற்றுத்திறனாளி அடையாள அட்டை',
      'குடியிருப்பு சான்றிதழ்',
      'ஆதார் & வங்கி கணக்கு புத்தகம்'
    ],
    documentsRequiredHi: [
      'यूडीआईडी (UDID) कार्ड',
      'निवास प्रमाण पत्र',
      'आधार व बैंक खाता'
    ],
    applicationSteps: [
      'Submit application with UDID card to the Directorate of Social Welfare, Saram, Puducherry.',
      'Direct monthly DBT credited to beneficiary bank account.'
    ],
    applicationStepsTa: [
      'சாரம் சமூக நலத்துறை அலுவலகத்தில் UDID அட்டையுடன் விண்ணப்பிக்கவும்.'
    ],
    applicationStepsHi: [
      'सारम समाज कल्याण कार्यालय में यूडीआईडी कार्ड के साथ आवेदन करें।'
    ],
    officialUrl: 'https://socwelfare.py.gov.in',
    verificationDate: 'Verified Official Portal - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Directorate of Social Welfare, Puducherry',
    officeOrServiceCenter: 'Directorate of Social Welfare, Saram / Taluk Social Welfare Desks',
    officeOrServiceCenterTa: 'சமூக நலத்துறை, சாரம், புதுச்சேரி',
    officeOrServiceCenterHi: 'समाज कल्याण निदेशालय, पुदुचेरी',
    helpline: '0413-2205872',
    badge: 'Disability Welfare Pension',
    badgeTa: 'மாற்றுத்திறனாளி உதவித்தொகை',
    badgeHi: 'दिव्यांग कल्याण पेंशन'
  },
  {
    id: 'puducherry-ambedkar-sc-scholarship',
    title: 'Dr. Ambedkar Financial Assistance to SC/ST Girl Students for Professional Courses',
    titleTa: 'டாக்டர் அம்பேத்கர் ஆதிதிராவிடர் மாணவிகளுக்கான தொழில்முறை உயர்கல்வி உதவித்தொகை',
    titleHi: 'डॉ. आंबेडकर एससी/एसटी छात्रा व्यावसायिक उच्च शिक्षा छात्रवृत्ति',
    department: 'Adi Dravidar Welfare Department, Government of Puducherry',
    departmentTa: 'ஆதிதிராவிடர் நலத்துறை, புதுச்சேரி அரசு',
    departmentHi: 'आदि द्रविड़ कल्याण विभाग, पुदुचेरी सरकार',
    governmentLevel: 'puducherry',
    stateOrUt: 'Puducherry',
    category: 'education',
    isLoan: false,
    benefits: 'Full annual tuition and exam fee coverage plus ₹25,000 annual maintenance allowance and free laptop for professional courses (MBBS, B.Tech, Nursing, Law).',
    benefitsTa: 'முழு கல்விக் கட்டண விலக்கு, ஆண்டுக்கு ₹25,000 பராமரிப்பு படி மற்றும் இலவச மடிக்கணினி.',
    benefitsHi: 'पूर्ण शिक्षण शुल्क छूट, ₹25,000 वार्षिक भत्ता एवं मुफ्त लैपटॉप।',
    targetGroup: ['student'],
    eligibility: [
      'SC/ST girl student native to UT of Puducherry pursuing recognized professional degree courses.',
      'Annual family income below ₹2.5 Lakhs.'
    ],
    eligibilityTa: [
      'புதுச்சேரியை பூர்வீகமாகக் கொண்ட ஆதிதிராவிடர்/பழங்குடியின மாணவி.'
    ],
    eligibilityHi: [
      'पुदुचेरी की मूल निवासी एससी/एसटी छात्रा।'
    ],
    documentsRequired: [
      'Community Certificate (SC/ST) issued by Tahsildar',
      'Admission fee receipt and College Bonafide Certificate',
      'Aadhaar Card and Student Bank Passbook'
    ],
    documentsRequiredTa: [
      'வட்டாட்சியர் வழங்கிய சாதிச் சான்றிதழ்',
      'கல்லூரி சேர்க்கை மற்றும் கட்டண ரசீது',
      'ஆதார் அட்டை & வங்கி புத்தகம்'
    ],
    documentsRequiredHi: [
      'जाति प्रमाण पत्र',
      'कॉलेज प्रवेश रसीद',
      'आधार व बैंक खाता'
    ],
    applicationSteps: [
      'Apply through National Scholarship Portal (scholarships.gov.in) or submit through College Nodal Officer to Adi Dravidar Welfare Department, Puducherry.'
    ],
    applicationStepsTa: [
      'தேசிய உதவித்தொகை போர்டல் அல்லது கல்லூரி மூலம் சமர்ப்பிக்கவும்.'
    ],
    applicationStepsHi: [
      'एनएसपी पोर्टल या कॉलेज के माध्यम से आवेदन करें।'
    ],
    officialUrl: 'https://adwelfare.py.gov.in',
    verificationDate: 'Verified Official Gazette - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Adi Dravidar Welfare Dept, Puducherry',
    officeOrServiceCenter: 'Adi Dravidar Welfare Department, Kamaraj Salai, Puducherry',
    officeOrServiceCenterTa: 'ஆதிதிராவிடர் நலத்துறை, காமராஜர் சாலை, புதுச்சேரி',
    officeOrServiceCenterHi: 'आदि द्रविड़ कल्याण विभाग, कामराज सलाई, पुदुचेरी',
    helpline: '0413-2211243',
    badge: 'SC/ST Girl Education Grant',
    badgeTa: 'ஆதிதிராவிடர் கல்வி உதவி',
    badgeHi: 'एससी/एसटी छात्रा शिक्षा अनुदान'
  },
  {
    id: 'puducherry-intercaste-marriage',
    title: 'Financial Incentive for Inter-Caste Marriage Involving Dalit Women',
    titleTa: 'கலப்பு திருமணம் செய்த பெண்களுக்கான அரசு ஊக்கத்தொகை திட்டம் (புதுச்சேரி)',
    titleHi: 'दलित महिलाओं के अंतरजातीय विवाह हेतु प्रोत्साहन राशि योजना',
    department: 'Adi Dravidar Welfare Department, Government of Puducherry',
    departmentTa: 'ஆதிதிராவிடர் நலத்துறை, புதுச்சேரி',
    departmentHi: 'आदि द्रविड़ कल्याण विभाग, पुदुचेरी',
    governmentLevel: 'puducherry',
    stateOrUt: 'Puducherry',
    category: 'financial_aid',
    isLoan: false,
    benefits: '₹50,000 cash grant (₹20,000 direct payment + ₹30,000 National Savings Certificate in joint name) to foster social integration.',
    benefitsTa: 'கலப்பு திருமணம் புரியும் தம்பதியருக்கு ₹50,000 அரசு ஊக்கத்தொகை மற்றும் சான்றிதழ்.',
    benefitsHi: 'अंतरजातीय विवाह करने वाले दंपत्ति को ₹50,000 की प्रोत्साहन राशि।',
    minAge: 18,
    targetGroup: ['homemaker', 'rural'],
    eligibility: [
      'One spouse must belong to Scheduled Caste and the other to a Non-Scheduled Caste.',
      'Both must be residents of UT of Puducherry for at least 3 years.',
      'First marriage for both parties.'
    ],
    eligibilityTa: [
      'தம்பதியரில் ஒருவர் ஆதிதிராவிடராகவும் மற்றவர் மாற்று வகுப்பினராகவும் இருத்தல்.'
    ],
    eligibilityHi: [
      'दंपत्ति में से एक अनुसूचित जाति का होना अनिवार्य।'
    ],
    documentsRequired: [
      'Legally Registered Marriage Certificate',
      'Community Certificates of both husband and wife',
      'Aadhaar and Residence Certificates'
    ],
    documentsRequiredTa: [
      'பதிவு செய்யப்பட்ட திருமண சான்றிதழ்',
      'இருவரின் சாதி சான்றிதழ்கள்',
      'ஆதார் மற்றும் குடியிருப்பு சான்றிதழ்'
    ],
    documentsRequiredHi: [
      'पंजीकृत विवाह प्रमाण पत्र',
      'जाति प्रमाण पत्र',
      'आधार व निवास प्रमाण'
    ],
    applicationSteps: [
      'Submit application within 1 year of marriage registration to Adi Dravidar Welfare Department, Puducherry.'
    ],
    applicationStepsTa: [
      'திருமணம் முடிந்த 1 ஆண்டுக்குள் ஆதிதிராவிடர் நலத்துறையில் விண்ணப்பிக்கவும்.'
    ],
    applicationStepsHi: [
      'विवाह के 1 वर्ष के भीतर विभाग में आवेदन करें।'
    ],
    officialUrl: 'https://adwelfare.py.gov.in',
    verificationDate: 'Verified Official Portal - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Adi Dravidar Welfare Dept, Puducherry',
    officeOrServiceCenter: 'Adi Dravidar Welfare Office, Puducherry & Karaikal',
    officeOrServiceCenterTa: 'ஆதிதிராவிடர் நல அலுவலகம், புதுச்சேரி',
    officeOrServiceCenterHi: 'आदि द्रविड़ कल्याण कार्यालय, पुदुचेरी',
    helpline: '0413-2211243',
    badge: 'Social Reform Incentive',
    badgeTa: 'சமூக சீர்திருத்த ஊக்கத்தொகை',
    badgeHi: 'सामाजिक सुधार प्रोत्साहन'
  },
  {
    id: 'puducherry-working-women-hostel',
    title: 'Puducherry Working Women’s Hostel Scheme (Subsidized Accommodation)',
    titleTa: 'புதுச்சேரி பணிபுரியும் பெண்களுக்கான அரசு மானிய தங்கும் விடுதி',
    titleHi: 'पुदुचेरी कामकाजी महिला छात्रावास योजना',
    department: 'Directorate of Social Welfare, Government of Puducherry',
    departmentTa: 'சமூக நலத்துறை, புதுச்சேரி அரசு',
    departmentHi: 'समाज कल्याण विभाग, पुदुचेरी',
    governmentLevel: 'puducherry',
    stateOrUt: 'Puducherry',
    category: 'livelihood',
    isLoan: false,
    benefits: 'Clean, safe, gated lodging with 24/7 security, subsidized mess food, Wi-Fi, and daycare facility for children up to 5 years.',
    benefitsTa: '24/7 பாதுகாப்புடன் கூடிய குறைந்த கட்டண தங்கும் விடுதி, தரமான உணவு மற்றும் குழந்தைகள் காப்பகம்.',
    benefitsHi: 'कामकाजी महिलाओं हेतु सुरक्षित, रियायती दरों पर छात्रावास व बाल शिशुगृह सुविधा।',
    minAge: 18,
    targetGroup: ['entrepreneur', 'student', 'dropout'],
    eligibility: [
      'Employed women, apprentices, or women pursuing higher vocational training in Puducherry or Karaikal whose family is residing elsewhere.',
      'Monthly income up to ₹35,000.'
    ],
    eligibilityTa: [
      'புதுச்சேரி அல்லது காரைக்காலில் பணிபுரியும் பெண்கள் அல்லது தொழிற்பயிற்சி பெறுவோர்.'
    ],
    eligibilityHi: [
      'पुदुचेरी में कार्यरत या प्रशिक्षण ले रही महिलाएं।'
    ],
    documentsRequired: [
      'Employment Letter / Salary Slip / Training Order',
      'Aadhaar Card and Native Residence Proof',
      'Two passport size photographs'
    ],
    documentsRequiredTa: [
      'பணிபுரியும் நிறுவன கடிதம் / சம்பள ரசீது',
      'ஆதார் அட்டை & புகைப்படங்கள்'
    ],
    documentsRequiredHi: [
      'नियोक्ता का नियुक्ति पत्र',
      'आधार कार्ड व फोटो'
    ],
    applicationSteps: [
      'Apply directly at the Working Women’s Hostel, Lawspet, Puducherry or Karaikal.',
      'Immediate room allotment based on availability.'
    ],
    applicationStepsTa: [
      'லாஸ்பேட்டை மகளிர் தங்கும் விடுதி கண்காணிப்பாளரிடம் நேரடியாக விண்ணப்பிக்கவும்.'
    ],
    applicationStepsHi: [
      'लॉस्पेट छात्रावास अधीक्षिका से सीधे संपर्क कर आवेदन करें।'
    ],
    officialUrl: 'https://socwelfare.py.gov.in',
    verificationDate: 'Verified Official Facilities - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Directorate of Social Welfare, Puducherry',
    officeOrServiceCenter: 'Working Women’s Hostel, Lawspet, Puducherry / Near Bus Stand, Karaikal',
    officeOrServiceCenterTa: 'பணிபுரியும் பெண்கள் விடுதி, லாஸ்பேட்டை, புதுச்சேரி',
    officeOrServiceCenterHi: 'कामकाजी महिला छात्रावास, लॉस्पेट, पुदुचेरी',
    helpline: '0413-2253380',
    badge: 'Safe Subsidized Housing',
    badgeTa: 'பாதுகாப்பான அரசு தங்கும் விடுதி',
    badgeHi: 'सुरक्षित रियायती आवास'
  },
  {
    id: 'puducherry-psdm-skill-training',
    title: 'Puducherry Skill Development Mission (PSDM) Free Vocational Courses',
    titleTa: 'புதுச்சேரி திறன் மேம்பாட்டு இயக்கம் (PSDM) இலவச வேலைவாய்ப்பு தொழிற்பயிற்சி',
    titleHi: 'पुदुचेरी कौशल विकास मिशन (PSDM) मुफ्त व्यावसायिक प्रशिक्षण',
    department: 'Puducherry Skill Development Mission, Labour Department, Puducherry',
    departmentTa: 'தொழிலாளர் துறை / திறன் மேம்பாட்டு இயக்கம், புதுச்சேரி அரசு',
    departmentHi: 'श्रम विभाग / पुदुचेरी कौशल विकास मिशन',
    governmentLevel: 'puducherry',
    stateOrUt: 'Puducherry',
    category: 'livelihood',
    isLoan: false,
    benefits: '100% free NSQF-aligned training in apparel design, beauty & wellness, office automation, food processing + free toolkit and placement support.',
    benefitsTa: 'தையல், அழகுக்கலை, கணினி ஆட்டோமேஷன் ஆகியவற்றில் 100% இலவச அரசு தொழிற்பயிற்சி மற்றும் இலவச உபகரணங்கள்.',
    benefitsHi: 'सिलाई, ब्यूटी, कंप्यूटर में 100% मुफ्त सरकारी प्रशिक्षण व निःशुल्क टूलकिट।',
    minAge: 18,
    maxAge: 45,
    targetGroup: ['dropout', 'homemaker', 'entrepreneur'],
    eligibility: [
      'Women resident of Puducherry who have passed or discontinued 8th, 10th, or 12th standard.'
    ],
    eligibilityTa: [
      '8, 10 அல்லது 12-ஆம் வகுப்பு படித்த அல்லது பாதியில் நிறுத்திய புதுச்சேரி பெண்கள்.'
    ],
    eligibilityHi: [
      '8वीं, 10वीं या 12वीं उत्तीर्ण या अधूरी शिक्षा वाली पुदुचेरी की महिलाएं।'
    ],
    documentsRequired: [
      'School Marksheet or TC (if available) / Age Proof',
      'Aadhaar Card and Puducherry Ration Card'
    ],
    documentsRequiredTa: [
      'பள்ளி மதிப்பெண் சான்றிதழ் அல்லது வயது சான்று',
      'ஆதார் அட்டை & குடும்ப அட்டை'
    ],
    documentsRequiredHi: [
      'शैक्षणिक प्रमाण पत्र',
      'आधार व राशन कार्ड'
    ],
    applicationSteps: [
      'Register online at PSDM portal or visit Govt ITI for Women, Vambakeerapalayam, Puducherry.',
      'Batches run regularly with daily/weekly schedules.'
    ],
    applicationStepsTa: [
      'வம்பாகீரப்பாளையம் மகளிர் அரசு ஐடிஐ அல்லது PSDM தளத்தில் பதிவு செய்யவும்.'
    ],
    applicationStepsHi: [
      'महिला आईटीआई वंबाकीरापालयम में जाकर सीधे नामांकन कराएं।'
    ],
    officialUrl: 'https://labour.py.gov.in',
    verificationDate: 'Verified Official Mission Guidelines - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Labour Department, Govt of Puducherry',
    officeOrServiceCenter: 'Government ITI for Women, Vambakeerapalayam, Puducherry / PSDM Office',
    officeOrServiceCenterTa: 'மகளிர் அரசு ஐடிஐ, வம்பாகீரப்பாளையம், புதுச்சேரி',
    officeOrServiceCenterHi: 'महिला सरकारी आईटीआई, पुदुचेरी',
    helpline: '0413-2272828',
    badge: '100% Free Skill Training',
    badgeTa: '100% இலவச தொழிற்பயிற்சி',
    badgeHi: 'मुफ्त कौशल प्रशिक्षण'
  },
  {
    id: 'puducherry-sakhi-one-stop-centre',
    title: 'One Stop Centre (Sakhi Centre) Puducherry & Karaikal for Women in Distress',
    titleTa: 'சகி (Sakhi) மகளிர் ஒருங்கிணைந்த அவசர உதவி மையம் (புதுச்சேரி & காரைக்கால்)',
    titleHi: 'सखी वन स्टॉप सेंटर पुदुचेरी एवं कराईकल (संकटग्रस्त महिला सहायता)',
    department: 'Department of Women and Child Development, Puducherry',
    departmentTa: 'மகளிர் மற்றும் குழந்தைகள் மேம்பாட்டுத் துறை, புதுச்சேரி',
    departmentHi: 'महिला एवं बाल विकास विभाग, पुदुचेरी',
    governmentLevel: 'puducherry',
    stateOrUt: 'Puducherry',
    category: 'financial_aid',
    isLoan: false,
    benefits: '24/7 integrated single-window support: medical examination, free legal counseling, police assistance, psycho-social counseling, and temporary safe shelter up to 5 days.',
    benefitsTa: '24 மணி நேர இலவச உதவி: உடனடி மருத்துவ சிகிச்சை, சட்ட உதவி, மனநல ஆலோசனை மற்றும் 5 நாட்கள் வரை பாதுகாப்பான தங்குமிடம்.',
    benefitsHi: '24/7 आपातकालीन सुविधा: मुफ्त कानूनी सहायता, चिकित्सा, पुलिस सहायता व सुरक्षित आश्रय।',
    targetGroup: ['homemaker', 'rural', 'dropout', 'student', 'entrepreneur'],
    eligibility: [
      'Any woman or girl facing violence, domestic harassment, abuse, or in distress across UT of Puducherry.'
    ],
    eligibilityTa: [
      'குடும்ப வன்முறை, அச்சுறுத்தல் அல்லது அவசர உதவி தேவைப்படும் அனைத்து பெண்களும் அணுகலாம்.'
    ],
    eligibilityHi: [
      'हिंसा या प्रताड़ना से पीड़ित पुदुचेरी की कोई भी महिला या किशोरी।'
    ],
    documentsRequired: [
      'No documents mandatory for emergency admission or crisis intervention.'
    ],
    documentsRequiredTa: [
      'அவசர உதவிக்கு எந்த ஆவணங்களும் கட்டாயமில்லை.'
    ],
    documentsRequiredHi: [
      'आपातकालीन सहायता हेतु किसी दस्तावेज की बाध्यता नहीं।'
    ],
    applicationSteps: [
      'Call toll-free women helpline 181 or 112 directly.',
      'Walk into One Stop Centre, Indira Gandhi Hospital Complex, Puducherry or General Hospital Campus, Karaikal.'
    ],
    applicationStepsTa: [
      '181 அல்லது 112 எண்ணை அழைக்கவும் அல்லது இந்திரா காந்தி மருத்துவமனை வளாகத்தில் உள்ள மையத்தை அணுகவும்.'
    ],
    applicationStepsHi: [
      'महिला हेल्पलाइन 181 या 112 पर कॉल करें अथवा केंद्र पर सीधे जाएं।'
    ],
    officialUrl: 'https://wcd.py.gov.in',
    verificationDate: 'Verified Official Crisis Centers - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Directorate of Women & Child Development, Puducherry',
    officeOrServiceCenter: 'Sakhi Centre, Indira Gandhi Govt Hospital Complex, Kathirkamam, Puducherry',
    officeOrServiceCenterTa: 'சகி மையம், இந்திரா காந்தி அரசு மருத்துவமனை வளாகம், கதிர்காமம், புதுச்சேரி',
    officeOrServiceCenterHi: 'सखी सेंटर, इंदिरा गांधी अस्पताल परिसर, पुदुचेरी',
    helpline: '181 / 0413-2272181 / 112',
    badge: '24/7 Crisis Support Center',
    badgeTa: '24/7 மகளிர் பாதுகாப்பு மையம்',
    badgeHi: '24/7 संकट समाधान केंद्र'
  },

  // =========================================================================
  // 2. TAMIL NADU GOVERNMENT SCHEMES (16 Verified Schemes)
  // =========================================================================
  {
    id: 'kalaignar-magalir-urimai',
    title: 'Kalaignar Magalir Urimai Thittam (KMUT)',
    titleTa: 'கலைஞர் மகளிர் உரிமைத் திட்டம் (மாதம் ₹1,000)',
    titleHi: 'कलैग्नार महिला अधिकार योजना (मासिक ₹1,000)',
    department: 'Government of Tamil Nadu (Social Welfare & Women Empowerment Dept)',
    departmentTa: 'தமிழ்நாடு அரசு (சமூக நலம் & மகளிர் உரிமைத்துறை)',
    departmentHi: 'तमिलनाडु सरकार (समाज कल्याण एवं महिला सशक्तिकरण विभाग)',
    governmentLevel: 'tamil_nadu',
    stateOrUt: 'Tamil Nadu',
    category: 'financial_aid',
    isLoan: false,
    benefits: '₹1,000 per month deposited directly into the bank account of woman head of household via DBT.',
    benefitsTa: 'குடும்பத் தலைவிகளுக்கு மாதம் தோறும் ₹1,000 வங்கி கணக்கில் நேரடியாக வரவு வைக்கப்படுகிறது.',
    benefitsHi: 'महिला परिवार प्रमुखों के बैंक खाते में प्रतिमाह ₹1,000 प्रत्यक्ष रूप से जमा किए जाते हैं।',
    minAge: 21,
    targetGroup: ['homemaker', 'rural', 'dropout'],
    eligibility: [
      'Woman aged 21 years or older.',
      'Must be acknowledged as the head of the family in the Smart Ration Card.',
      'Annual family income should be under ₹2.5 Lakhs.',
      'Family must own less than 5 acres of wetland or 10 acres of dry land.',
      'Annual domestic electricity consumption must be below 3,600 units.'
    ],
    eligibilityTa: [
      '21 வயது பூர்த்தியடைந்த பெண் குடும்பத் தலைவர்.',
      'ஸ்மார்ட் குடும்ப அட்டையில் (Ration Card) குடும்பத் தலைவியாக இருக்க வேண்டும்.',
      'குடும்ப ஆண்டு வருமானம் ₹2.5 லட்சத்திற்கு குறைவாக இருக்க வேண்டும்.',
      '5 ஏக்கருக்கு குறைவான நன்செய் அல்லது 10 ஏக்கருக்கு குறைவான புன்செய் நிலம்.',
      'ஆண்டுக்கு 3,600 யூனிட்டிற்கு குறைவான மின்சார நுகர்வு.'
    ],
    eligibilityHi: [
      '21 वर्ष या उससे अधिक आयु की महिला परिवार प्रमुख।',
      'राशन कार्ड में महिला मुखिया के रूप में दर्ज होना अनिवार्य।',
      'परिवार की वार्षिक आय ₹2.5 लाख से कम होनी चाहिए।',
      '5 एकड़ से कम सिंचित या 10 एकड़ से कम असिंचित भूमि।',
      'वार्षिक बिजली खपत 3,600 यूनिट से कम होनी चाहिए।'
    ],
    documentsRequired: [
      'Aadhaar Card (linked with active bank account)',
      'Smart Ration Card (Family Card)',
      'Bank Passbook (showing IFSC & Account Number)',
      'Electricity Consumer Number'
    ],
    documentsRequiredTa: [
      'ஆதார் அட்டை (வங்கி கணக்குடன் இணைக்கப்பட்டது)',
      'ஸ்மார்ட் குடும்ப அட்டை (ரேஷன் கார்டு)',
      'வங்கி கணக்கு புத்தகம் (IFSC மற்றும் கணக்கு எண்)',
      'மின் இணைப்பு நுகர்வோர் எண்'
    ],
    documentsRequiredHi: [
      'आधार कार्ड (बैंक खाते से लिंक)',
      'स्मार्ट राशन कार्ड (परिवार कार्ड)',
      'बैंक पासबुक',
      'बिजली उपभोक्ता संख्या'
    ],
    applicationSteps: [
      'Apply at the designated Taluk Special Camp or through the nearest e-Sevai center.',
      'Biometric fingerprint or Aadhaar OTP authentication is performed on-site.',
      'Field verification is carried out by village revenue administration.',
      'Approved amount is credited directly via DBT on the 15th of every month.'
    ],
    applicationStepsTa: [
      'வட்டார சிறப்பு முகாமில் அல்லது அருகில் உள்ள இ-சேவை மையம் மூலம் விண்ணப்பிக்கவும்.',
      'கைரேகை அல்லது ஆதார் OTP மூலம் பயோமெட்ரிக் சரிபார்ப்பு செய்யப்படும்.',
      'வருவாய்த்துறை கிராம நிர்வாக அலுவலரால் கள ஆய்வு செய்யப்படும்.',
      'ஒவ்வொரு மாதமும் 15-ஆம் தேதி வங்கி கணக்கில் தொகை நேரடியாக வரவு வைக்கப்படும்.'
    ],
    applicationStepsHi: [
      'विशेष शिविर या नजदीकी ई-सेवा केंद्र से आवेदन करें।',
      'बायोमेट्रिक फिंगरप्रिंट या आधार ओटीपी से सत्यापन।',
      'राजस्व अधिकारियों द्वारा स्थलीय सत्यापन।',
      'प्रत्येक माह की 15 तारीख को डीबीटी द्वारा खाते में राशि जमा।'
    ],
    officialUrl: 'https://kmut.tn.gov.in',
    verificationDate: 'Verified Official Gazette - January 2026',
    lastCheckedDate: '2026-01-15',
    officialSource: 'Department of Social Welfare & Women Empowerment, Govt of Tamil Nadu',
    officeOrServiceCenter: 'e-Sevai Center / Taluk Revenue Office / Gram Panchayat Office',
    officeOrServiceCenterTa: 'இ-சேவை மையம் / வட்டாட்சியர் அலுவலகம் / கிராம பஞ்சாயத்து',
    officeOrServiceCenterHi: 'ई-सेवा केंद्र / तहसील राजस्व कार्यालय / ग्राम पंचायत',
    helpline: '044-25619208 / 181',
    badge: '100% Free Grant',
    badgeTa: '100% நேரடி மானியம்',
    badgeHi: '100% प्रत्यक्ष अनुदान'
  },
  {
    id: 'pudhumai-penn',
    title: 'Moovalur Ramamirtham Ammaiyar - Pudhumai Penn Thittam',
    titleTa: 'புதுமைப் பெண் திட்டம் (உயர்கல்வி உதவி ₹1,000/மாதம்)',
    titleHi: 'पुदुमई पेन योजना (उच्च शिक्षा वित्तीय सहायता)',
    department: 'Higher Education Department, Tamil Nadu',
    departmentTa: 'உயர்கல்வித்துறை, தமிழ்நாடு அரசு',
    departmentHi: 'उच्च शिक्षा विभाग, तमिलनाडु सरकार',
    governmentLevel: 'tamil_nadu',
    stateOrUt: 'Tamil Nadu',
    category: 'education',
    isLoan: false,
    benefits: '₹1,000 per month throughout Undergraduate Degree, Diploma, or ITI education till completion.',
    benefitsTa: 'அரசுப் பள்ளியில் பயின்ற மாணவிகளுக்கு உயர்கல்வி முடியும் வரை மாதம் ₹1,000 வழங்கப்படுகிறது.',
    benefitsHi: 'सरकारी स्कूल से पढ़ी छात्राओं को उच्च शिक्षा (डिग्री, डिप्लोमा, आईटीआई) पूरी होने तक ₹1,000 प्रति माह।',
    targetGroup: ['student', 'dropout', 'rural'],
    eligibility: [
      'Female student who studied Classes 6 to 12 in Tamil Nadu Government schools.',
      'Currently enrolled in recognized UG Degree, Polytechnic Diploma, or ITI course in Tamil Nadu.'
    ],
    eligibilityTa: [
      'தமிழ்நாடு அரசுப் பள்ளிகளில் 6 முதல் 12-ஆம் வகுப்பு வரை தொடர்ந்து படித்த மாணவிகள்.',
      'அங்கீகரிக்கப்பட்ட பட்டப்படிப்பு, பாலிடெக்னிக் டிப்ளமோ அல்லது ஐடிஐயில் பயில வேண்டும்.'
    ],
    eligibilityHi: [
      'कक्षा 6 से 12 तक तमिलनाडु सरकारी स्कूल से पढ़ी छात्राएं।',
      'मान्यता प्राप्त स्नातक डिग्री, डिप्लोमा या आईटीआई में अध्ययनरत।'
    ],
    documentsRequired: [
      'School Study Certificate (Classes 6-12 Government School Proof)',
      'College Admission Fee Slip & Identity Card',
      'Aadhaar Card',
      'Student Bank Passbook in own single name'
    ],
    documentsRequiredTa: [
      '6 முதல் 12 வரை அரசுப் பள்ளியில் படித்ததற்கான சான்றிதழ்',
      'கல்லூரி சேர்க்கை ரசீது மற்றும் அடையாள அட்டை',
      'மாணவியின் ஆதார் அட்டை',
      'மாணவியின் பெயரிலுள்ள வங்கி கணக்கு புத்தகம்'
    ],
    documentsRequiredHi: [
      'स्कूल अध्ययन प्रमाण पत्र (कक्षा 6-12 सरकारी स्कूल)',
      'कॉलेज प्रवेश रसीद व पहचान पत्र',
      'आधार कार्ड',
      'छात्रा के नाम एकल बैंक खाता विवरण'
    ],
    applicationSteps: [
      'College administrative nodal officer verifies student school EMIS records.',
      'College uploads verified applications on the Pudhumai Penn web portal.',
      'Higher Education Department issues sanction order.',
      'Stipend credited directly to the student bank account every month.'
    ],
    applicationStepsTa: [
      'கல்லூரி நிர்வாகம் மாணவியின் பள்ளி EMIS தகவல்களை சரிபார்க்கும்.',
      'கல்லூரி போர்ட்டலில் விண்ணப்பத்தை சமர்ப்பிக்கும்.',
      'உயர்கல்வித்துறை ஒப்புதல் அளிக்கும்.',
      'மாதந்தோறும் மாணவியின் வங்கி கணக்கில் ₹1,000 நேரடியாக வரவு வைக்கப்படும்.'
    ],
    applicationStepsHi: [
      'कॉलेज प्रशासनिक अधिकारी स्कूल ईएमआईएस रिकॉर्ड का सत्यापन करता है।',
      'कॉलेज द्वारा पुदुमई पेन पोर्टल पर विवरण दर्ज।',
      'उच्च शिक्षा विभाग द्वारा स्वीकृति।',
      'प्रतिमाह सीधे छात्रा के बैंक खाते में छात्रवृत्ति।'
    ],
    officialUrl: 'https://pudhumaipenn.tn.gov.in',
    verificationDate: 'Verified Official Portal - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Higher Education Department, Govt of Tamil Nadu',
    officeOrServiceCenter: 'College Principal / Student Nodal Desk',
    officeOrServiceCenterTa: 'கல்லூரி முதல்வர் / மாணவர் உதவி மையம்',
    officeOrServiceCenterHi: 'कॉलेज प्राचार्य / छात्र सहायता डेस्क',
    helpline: '14417',
    badge: 'Higher Education Grant',
    badgeTa: 'உயர்கல்வி மானியம்',
    badgeHi: 'उच्च शिक्षा अनुदान'
  },
  {
    id: 'sathiyavani-muthu-sewing',
    title: 'Free Sewing Machine Scheme (Sathiyavani Muthu Ammaiyar)',
    titleTa: 'இலவச தையல் இயந்திரம் வழங்கும் திட்டம்',
    titleHi: 'मुफ्त सिलाई मशीन योजना (सत्यवाणी मुथु अम्मैयार)',
    department: 'Department of Social Welfare and Women Empowerment, TN',
    departmentTa: 'சமூக நலம் மற்றும் மகளிர் உரிமைத்துறை',
    departmentHi: 'समाज कल्याण एवं महिला सशक्तिकरण विभाग',
    governmentLevel: 'tamil_nadu',
    stateOrUt: 'Tamil Nadu',
    category: 'equipment',
    isLoan: false,
    benefits: 'Full commercial manual/foot-pedal sewing machine provided 100% free of cost with accessory toolkit.',
    benefitsTa: 'வீட்டில் இருந்தே தையல் தொழில் தொடங்க முழு தையல் இயந்திரம் 100% இலவசமாக வழங்கப்படுகிறது.',
    benefitsHi: 'घर से सिलाई व्यवसाय शुरू करने हेतु पूर्ण व्यावसायिक सिलाई मशीन 100% मुफ्त प्रदान की जाती है।',
    minAge: 20,
    maxAge: 40,
    targetGroup: ['homemaker', 'rural', 'dropout', 'entrepreneur'],
    freeEquipment: 'Manual/Foot-operated Sewing Machine with basic toolkit',
    freeEquipmentTa: 'கால் மிதி தையல் இயந்திரம் மற்றும் தையல் உபகரணங்கள்',
    freeEquipmentHi: 'पैडल सिलाई मशीन एवं बुनियादी टूलकिट',
    eligibility: [
      'Women aged between 20 to 40 years.',
      'Annual family income should not exceed ₹72,000.',
      'Special priority to Widows, Deserted Wives, Differently Abled women, and Destitute women.',
      'Basic tailoring certificate or training proof (minimum 6 months).'
    ],
    eligibilityTa: [
      '20 முதல் 40 வயதுக்குட்பட்ட பெண்கள்.',
      'குடும்ப ஆண்டு வருமானம் ₹72,000-க்கு மிகாமல் இருக்க வேண்டும்.',
      'விதவைகள், கணவனால் கைவிடப்பட்டோர், மாற்றுத்திறனாளிகளுக்கு முன்னுரிமை.',
      'தையல் பயிற்சி பெற்றதற்கான சான்றிதழ் அல்லது தையல் அறிவு பெற்றிருத்தல்.'
    ],
    eligibilityHi: [
      '20 से 40 वर्ष की आयु वाली महिलाएं।',
      'परिवार की वार्षिक आय ₹72,000 से अधिक न हो।',
      'विधवाओं, परित्यक्त व दिव्यांग महिलाओं को विशेष प्राथमिकता।',
      'सिलाई प्रशिक्षण प्रमाण पत्र (न्यूनतम 6 माह)।'
    ],
    documentsRequired: [
      'Age Proof (Birth Certificate or 10th TC)',
      'Income Certificate issued by Tahsildar (under ₹72,000/yr)',
      'Tailoring Course Completion Certificate',
      'Community Certificate',
      'Destitute / Widow Certificate (if applicable)',
      'Aadhaar Card & Passport size photos'
    ],
    documentsRequiredTa: [
      'வயது சான்றிதழ் (பிறப்பு சான்றிதழ் அல்லது TC)',
      'வட்டாட்சியர் (Tahsildar) வழங்கிய வருமானச் சான்றிதழ்',
      'தையல் பயிற்சி முடித்த சான்றிதழ்',
      'சாதிச் சான்றிதழ்',
      'விதவை / கைவிடப்பட்டோர் சான்றிதழ் (பொருந்துமானால்)',
      'ஆதார் அட்டை & புகைப்படங்கள்'
    ],
    documentsRequiredHi: [
      'आयु प्रमाण पत्र',
      'तहसीलदार द्वारा जारी आय प्रमाण पत्र',
      'सिलाई प्रशिक्षण प्रमाण पत्र',
      'जाति प्रमाण पत्र',
      'विधवा/परित्यक्ता प्रमाण पत्र (यदि लागू हो)',
      'आधार कार्ड एवं फोटो'
    ],
    applicationSteps: [
      'Obtain the physical application form from District Social Welfare Office (DSWO) or Block Development Office (BDO).',
      'Attach income and tailoring training certificates verified by local VAO.',
      'Submit the physical application at the Block Social Welfare Extension office.',
      'Upon field verification, machines are distributed during official district distribution programs.'
    ],
    applicationStepsTa: [
      'மாவட்ட சமூக நல அலுவலகம் அல்லது ஊராட்சி ஒன்றிய அலுவலகத்தில் (BDO) விண்ணப்ப படிவம் பெறவும்.',
      'கிராம நிர்வாக அலுவலர் (VAO) சரிபார்த்த சான்றிதழ்களை இணைக்கவும்.',
      'ஊராட்சி ஒன்றிய சமூக நல விரிவாக்க அலுவலரிடம் சமர்ப்பிக்கவும்.',
      'சரிபார்ப்புக்குப் பின் அரசு விழாவில் இலவச தையல் இயந்திரம் வழங்கப்படும்.'
    ],
    applicationStepsHi: [
      'जिला समाज कल्याण कार्यालय या बीडीओ (BDO) कार्यालय से आवेदन पत्र प्राप्त करें।',
      'स्थानीय राजस्व अधिकारी द्वारा सत्यापित दस्तावेज संलग्न करें।',
      'ब्लॉक विस्तार अधिकारी के पास आवेदन जमा करें।',
      'सत्यापन उपरांत आधिकारिक वितरण समारोह में मशीन प्रदान की जाती है।'
    ],
    verificationDate: 'Verified Official Guidelines - January 2026',
    lastCheckedDate: '2026-01-18',
    officialSource: 'Social Welfare Directorate, Tamil Nadu',
    officialUrl: 'https://www.tn.gov.in/scheme/data_view/68953',
    officeOrServiceCenter: 'District Social Welfare Office (DSWO) / Block Development Office (BDO)',
    officeOrServiceCenterTa: 'மாவட்ட சமூக நல அலுவலகம் / ஊராட்சி ஒன்றிய அலுவலகம் (BDO)',
    officeOrServiceCenterHi: 'जिला समाज कल्याण कार्यालय / ब्लॉक विकास कार्यालय (BDO)',
    helpline: '181',
    badge: '100% Free Equipment',
    badgeTa: '100% இலவச உபகரணம்',
    badgeHi: '100% मुफ्त उपकरण'
  },
  {
    id: 'muthulakshmi-reddy-maternity',
    title: 'Dr. Muthulakshmi Reddy Maternity Financial Benefit Scheme (MRMBS)',
    titleTa: 'டாக்டர் முத்துலட்சுமி ரெட்டி மகப்பேறு நிதியுதவி திட்டம் (₹18,000 + ஊட்டச்சத்து பெட்டகம்)',
    titleHi: 'डॉ. मुथुलक्ष्मी रेड्डी मातृत्व सहायता योजना',
    department: 'Health and Family Welfare Department, Government of Tamil Nadu',
    departmentTa: 'மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலத்துறை, தமிழ்நாடு',
    departmentHi: 'स्वास्थ्य एवं परिवार कल्याण विभाग, तमिलनाडु',
    governmentLevel: 'tamil_nadu',
    stateOrUt: 'Tamil Nadu',
    category: 'financial_aid',
    isLoan: false,
    benefits: '₹18,000 financial assistance delivered in 5 installments plus 2 nutrition health kits (Amma Maternity Nutrition Kit).',
    benefitsTa: 'கர்ப்பிணி தாய்மார்களுக்கு 5 தவணைகளில் ₹18,000 நிதியுதவி மற்றும் 2 ஊட்டச்சத்து பெட்டகங்கள் வழங்கப்படுகிறது.',
    benefitsHi: 'गर्भवती माताओं को 5 किश्तों में ₹18,000 की वित्तीय सहायता एवं 2 पोषण किट।',
    minAge: 19,
    targetGroup: ['homemaker', 'rural'],
    eligibility: [
      'Pregnant women aged 19 years and above in Tamil Nadu.',
      'Applicable for first two deliveries.',
      'Must complete early antenatal registration (PICME number) before the 12th week of pregnancy.',
      'Must undergo institutional delivery in a government hospital or primary health center.'
    ],
    eligibilityTa: [
      '19 வயது மற்றும் அதற்கு மேற்பட்ட கர்ப்பிணிப் பெண்கள்.',
      'முதல் இரண்டு பிரசவங்களுக்கு மட்டும் பொருந்தும்.',
      'கர்ப்பமான 12 வாரங்களுக்குள் கிராம சுகாதார செவிலியரிடம் (VHN) PICME பதிவு செய்திருக்க வேண்டும்.',
      'அரசு ஆரம்ப சுகாதார நிலையம் அல்லது அரசு மருத்துவமனையில் பிரசவம் நடைபெற வேண்டும்.'
    ],
    eligibilityHi: [
      '19 वर्ष और उससे अधिक आयु की गर्भवती महिलाएं।',
      'प्रथम दो प्रसवों के लिए मान्य।',
      '12वें सप्ताह से पहले वीएचएन के पास PICME पंजीकरण अनिवार्य।',
      'सरकारी अस्पताल या प्राथमिक स्वास्थ्य केंद्र में संस्थागत प्रसव।'
    ],
    documentsRequired: [
      'PICME RCH ID Number',
      'Aadhaar Card',
      'Mother and Child Health Passbook',
      'Bank Account Passbook (linked with Aadhaar)'
    ],
    documentsRequiredTa: [
      'PICME பதிவு எண்',
      'ஆதார் அட்டை',
      'தாய்-சேய் நலக் கையேடு',
      'ஆதாருடன் இணைக்கப்பட்ட வங்கி கணக்கு புத்தகம்'
    ],
    documentsRequiredHi: [
      'PICME पंजीकरण संख्या',
      'आधार कार्ड',
      'मातृ एवं शिशु स्वास्थ्य पासबुक',
      'बैंक पासबुक'
    ],
    applicationSteps: [
      'Register pregnancy with the local Village Health Nurse (VHN) or at nearest Urban Primary Health Center.',
      'Obtain 12-digit PICME number.',
      'Receive installment 1 (₹4,000) upon early registration.',
      'Subsequent installments transferred directly at institutional delivery, child immunization milestones.'
    ],
    applicationStepsTa: [
      'கிராம சுகாதார செவிலியர் (VHN) அல்லது ஆரம்ப சுகாதார நிலையத்தில் கர்ப்பத்தை பதிவு செய்யவும்.',
      '12 இலக்க PICME எண்ணைப் பெறவும்.',
      'முன் பதிவு செய்தவுடன் முதல் தவணை ₹4,000 மற்றும் ஊட்டச்சத்து கிட் வழங்கப்படும்.',
      'அடுத்தடுத்த தவணைகள் பிரசவம் மற்றும் குழந்தை தடுப்பூசிகளின் போது நேரடியாக வரவு வைக்கப்படும்.'
    ],
    applicationStepsHi: [
      'ग्राम स्वास्थ्य नर्स (VHN) या प्राथमिक स्वास्थ्य केंद्र पर पंजीकरण कराएं।',
      '12 अंकों का PICME नंबर प्राप्त करें।',
      'पंजीकरण पर पहली किश्त (₹4,000) व पोषण किट।',
      'शेष किश्तें प्रसव व टीकाकरण के समय डीबीटी द्वारा।'
    ],
    officialUrl: 'https://picme.tn.gov.in',
    verificationDate: 'Verified Official Portal - January 2026',
    lastCheckedDate: '2026-01-19',
    officialSource: 'Directorate of Public Health & Preventive Medicine, Tamil Nadu',
    officeOrServiceCenter: 'Primary Health Centre (PHC) / Village Health Nurse (VHN)',
    officeOrServiceCenterTa: 'அரசு ஆரம்ப சுகாதார நிலையம் (PHC) / கிராம சுகாதார செவிலியர்',
    officeOrServiceCenterHi: 'प्राथमिक स्वास्थ्य केंद्र (PHC) / ग्राम स्वास्थ्य नर्स',
    helpline: '104 / 181',
    badge: 'Maternity Grant & Nutrition',
    badgeTa: 'மகப்பேறு நிதியுதவி & ஊட்டச்சத்து',
    badgeHi: 'मातृत्व सहायता एवं पोषण'
  },
  {
    id: 'tn-mahalir-thittam-shg',
    title: 'Tamil Nadu Mahalir Thittam (SHG Bank Linkage & Revolving Fund)',
    titleTa: 'தமிழ்நாடு மகளிர் திட்டம் (சுயஉதவிக் குழு கடன் & சுழல்நிதி)',
    titleHi: 'तमिलनाडु महिला योजना (एसएचजी बैंक लिंकेज व आवर्ती निधि)',
    department: 'Tamil Nadu Corporation for Development of Women (TNCDW)',
    departmentTa: 'தமிழ்நாடு மகளிர் மேம்பாட்டு நிறுவனம்',
    departmentHi: 'तमिलनाडु महिला विकास निगम (TNCDW)',
    governmentLevel: 'tamil_nadu',
    stateOrUt: 'Tamil Nadu',
    category: 'shg_loan',
    isLoan: true,
    benefits: 'Subsidized community group loans from ₹50,000 to ₹10 Lakhs with 4%-7% effective interest rate and credit linked capital subsidies.',
    benefitsTa: 'சுயஉதவிக் குழுக்களுக்கு 4% முதல் 7% குறைந்த வட்டியில் ₹50,000 முதல் ₹10 லட்சம் வரை சுழல்நிதி மற்றும் தொழிற்கடன்.',
    benefitsHi: 'स्वयं सहायता समूहों को 4% से 7% ब्याज पर ₹50,000 से ₹10 लाख तक आवर्ती निधि व समूह ऋण।',
    targetGroup: ['rural', 'homemaker', 'dropout', 'entrepreneur'],
    eligibility: [
      'Member of a recognized Self-Help Group (SHG) active for at least 6 months.',
      'Regular weekly savings and group meeting attendance.',
      'Good internal loan repayment track record.'
    ],
    eligibilityTa: [
      'குறைந்தது 6 மாதங்கள் செயல்படும் மகளிர் சுயஉதவிக் குழுவின் உறுப்பினராக இருத்தல்.',
      'வாராந்திர சேமிப்பு மற்றும் கூட்டங்களில் தவறாமல் பங்கேற்றல்.',
      'குழு உள்-கடன் திரும்ப செலுத்தும் ஒழுங்கு.'
    ],
    eligibilityHi: [
      'कम से कम 6 माह से सक्रिय स्वयं सहायता समूह की सदस्य।',
      'नियमित साप्ताहिक बचत व बैठक में उपस्थिति।',
      'आंतरिक ऋण अदायगी का अच्छा रिकॉर्ड।'
    ],
    documentsRequired: [
      'SHG Resolution copy',
      'SHG Grading Certificate by Block Mission Unit',
      'Group bank passbook & individual member Aadhaar cards'
    ],
    documentsRequiredTa: [
      'குழு தீர்மான நகல்',
      'வட்டார மேலாண்மை பிரிவு வழங்கிய கிரேடிங் சான்றிதழ்',
      'குழு வங்கி கணக்கு புத்தகம் & உறுப்பினர் ஆதார்'
    ],
    documentsRequiredHi: [
      'समूह प्रस्ताव की प्रति',
      'ब्लॉक मिशन इकाई द्वारा ग्रेडिंग प्रमाण पत्र',
      'समूह बैंक पासबुक एवं सदस्यों के आधार कार्ड'
    ],
    applicationSteps: [
      'Discuss enterprise need in the weekly SHG meeting and pass a group resolution.',
      'Submit resolution to the Village Poverty Reduction Committee (VPRC) or Panchayat Level Federation (PLF).',
      'Bank credit linkage officer sanctions the loan to the group account for member distribution.'
    ],
    applicationStepsTa: [
      'வாராந்திர குழு கூட்டத்தில் தொழில் தேவை குறித்து பேசி தீர்மானம் நிறைவேற்றவும்.',
      'ஊராட்சி அளவிலான கூட்டமைப்பிடம் (PLF) சமர்ப்பிக்கவும்.',
      'வங்கி மேலாளர் குழுவின் கணக்கிற்கு கடனை விடுவிப்பார்.'
    ],
    applicationStepsHi: [
      'साप्ताहिक समूह बैठक में आवश्यकता पर चर्चा कर प्रस्ताव पारित करें।',
      'पंचायत स्तरीय संघ (PLF) में प्रस्ताव प्रस्तुत करें।',
      'बैंक क्रेडिट लिंकेज अधिकारी द्वारा समूह खाते में ऋण स्वीकृत।'
    ],
    officialUrl: 'https://www.mathi.tn.gov.in',
    verificationDate: 'Verified Official Portal - January 2026',
    lastCheckedDate: '2026-01-22',
    officialSource: 'TNCDW, Rural Development & Panchayat Raj, Govt of Tamil Nadu',
    officeOrServiceCenter: 'Panchayat Level Federation (PLF) / Block Mission Management Unit',
    officeOrServiceCenterTa: 'ஊராட்சி கூட்டமைப்பு (PLF) / வட்டார திட்ட அலுவலகம்',
    officeOrServiceCenterHi: 'पंचायत स्तरीय संघ (PLF) / ब्लॉक मिशन प्रबंधन इकाई',
    helpline: '044-28173412',
    badge: 'Subsidized Group Loan',
    badgeTa: 'சுயஉதவிக்குழு கடன் (திருப்பிச் செலுத்த வேண்டியவை)',
    badgeHi: 'एसएचजी ऋण (लौटाने योग्य)'
  },
  {
    id: 'cm-girl-child-protection',
    title: 'Chief Minister’s Girl Child Protection Scheme (Tamil Nadu)',
    titleTa: 'முதலமைச்சரின் பெண் குழந்தை பாதுகாப்புத் திட்டம்',
    titleHi: 'मुख्यमंत्री बालिका सुरक्षा योजना (तमिलनाडु)',
    department: 'Department of Social Welfare & Women Empowerment, Tamil Nadu',
    departmentTa: 'சமூக நலம் மற்றும் மகளிர் உரிமைத்துறை, தமிழ்நாடு',
    departmentHi: 'समाज कल्याण विभाग, तमिलनाडु',
    governmentLevel: 'tamil_nadu',
    stateOrUt: 'Tamil Nadu',
    category: 'financial_aid',
    isLoan: false,
    benefits: 'Fixed deposit of ₹50,000 for families with only one girl child or ₹25,000 each for families with two girl children, maturing with interest at age 18 to support higher studies.',
    benefitsTa: 'ஒரே பெண் குழந்தை உள்ள குடும்பத்திற்கு ₹50,000 வைப்புத்தொகை; இரண்டு பெண் குழந்தைகள் இருப்பின் தலா ₹25,000 வைப்புத்தொகை 18 வயதில் வட்டியுடன் வழங்கப்படுகிறது.',
    benefitsHi: 'एक बालिका होने पर ₹50,000 तथा दो बालिकाएं होने पर ₹25,000 प्रति बालिका सावधि जमा जो 18 वर्ष की आयु में मिलती है।',
    targetGroup: ['homemaker', 'rural'],
    eligibility: [
      'Family with only one or two girl children and no male child.',
      'Either parent must have undergone family planning sterilization before the age of 35.',
      'Annual family income below ₹72,000.'
    ],
    eligibilityTa: [
      'ஆண் குழந்தை இல்லாத ஒரு அல்லது இரண்டு பெண் குழந்தைகளைக் கொண்ட குடும்பங்கள்.',
      'பெற்றோரில் ஒருவர் 35 வயதுக்குள் குடும்பக் கட்டுப்பாடு செய்திருக்க வேண்டும்.'
    ],
    eligibilityHi: [
      'केवल एक या दो बालिकाएं हों तथा कोई पुत्र न हो। माता-पिता में से एक की नसबंदी अनिवार्य।'
    ],
    documentsRequired: [
      'Birth Certificate of Girl Child',
      'Sterilization Certificate from Govt Hospital',
      'Income Certificate (Under ₹72,000)',
      'Community Certificate & Ration Card'
    ],
    documentsRequiredTa: [
      'பெண் குழந்தையின் பிறப்பு சான்றிதழ்',
      'குடும்ப நல அறுவை சிகிச்சை சான்றிதழ்',
      'வருமான சான்றிதழ் & ரேஷன் கார்டு'
    ],
    documentsRequiredHi: [
      'बालिका का जन्म प्रमाण पत्र',
      'नसबंदी प्रमाण पत्र',
      'आय प्रमाण पत्र व राशन कार्ड'
    ],
    applicationSteps: [
      'Submit application to the Child Development Project Officer (CDPO) or District Social Welfare Office within 3 years of girl child birth.',
      'Bond certificate issued by Power Finance Corporation (TN).'
    ],
    applicationStepsTa: [
      'குழந்தை பிறந்து 3 ஆண்டுகளுக்குள் CDPO அலுவலகத்தில் விண்ணப்பிக்கவும்.'
    ],
    applicationStepsHi: [
      'बालिका के जन्म के 3 वर्ष के भीतर सीडीपीओ कार्यालय में आवेदन करें।'
    ],
    officialUrl: 'https://cms.tn.gov.in',
    verificationDate: 'Verified Official Gazette - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Directorate of Social Welfare, Tamil Nadu',
    officeOrServiceCenter: 'Child Development Project Office (CDPO) / District Social Welfare Office',
    officeOrServiceCenterTa: 'குழந்தைகள் வளர்ச்சி திட்ட அலுவலகம் (CDPO) / மாவட்ட சமூக நல அலுவலகம்',
    officeOrServiceCenterHi: 'सीडीपीओ (CDPO) कार्यालय / जिला समाज कल्याण कार्यालय',
    helpline: '181',
    badge: 'Girl Child Welfare Bond',
    badgeTa: 'பெண் குழந்தை பாதுகாப்பு பத்திரம்',
    badgeHi: 'बालिका सुरक्षा बॉन्ड'
  },
  {
    id: 'evr-maniammaiyar-marriage',
    title: 'EVR Maniammaiyar Ninaivu Poor Widow Daughter Marriage Assistance Scheme',
    titleTa: 'ஈ.வெ.ரா. மணியம்மையார் நினைவு ஏழை விதவையின் மகள் திருமண நிதியுதவி திட்டம்',
    titleHi: 'ईवीआर मणियम्मैयार निर्धन विधवा पुत्री विवाह सहायता योजना',
    department: 'Department of Social Welfare & Women Empowerment, Tamil Nadu',
    departmentTa: 'சமூக நலம் மற்றும் மகளிர் உரிமைத்துறை, தமிழ்நாடு அரசு',
    departmentHi: 'समाज कल्याण विभाग, तमिलनाडु',
    governmentLevel: 'tamil_nadu',
    stateOrUt: 'Tamil Nadu',
    category: 'financial_aid',
    isLoan: false,
    benefits: 'Scheme 1: ₹25,000 cash grant + 8-gram sovereign gold coin for non-graduates. Scheme 2: ₹50,000 cash grant + 8-gram gold coin for degree/diploma holders.',
    benefitsTa: 'பட்டதாரி அல்லாத பெண்களுக்கு ₹25,000 + 8 கிராம் தங்க நாணயம்; பட்டதாரிகளுக்கு ₹50,000 + 8 கிராம் தங்க நாணயம் வழங்கப்படுகிறது.',
    benefitsHi: 'सामान्य कन्याओं को ₹25,000 व 8 ग्राम स्वर्ण सिक्का; स्नातक/डिप्लोमा कन्याओं को ₹50,000 व 8 ग्राम स्वर्ण सिक्का।',
    minAge: 18,
    targetGroup: ['homemaker', 'rural', 'dropout'],
    eligibility: [
      'Daughter of a poor destitute widow resident in Tamil Nadu.',
      'Bride must have completed 18 years of age at time of marriage.',
      'Annual family income should not exceed ₹72,000.'
    ],
    eligibilityTa: [
      'ஏழை விதவை தாயின் மகள்.',
      'திருமணத்தின் போது பெண்ணிற்கு 18 வயது பூர்த்தியடைந்திருக்க வேண்டும்.'
    ],
    eligibilityHi: [
      'गरीब विधवा की पुत्री। आयु 18 वर्ष पूर्ण।'
    ],
    documentsRequired: [
      'Mother’s Widow Certificate & Father’s Death Certificate',
      'Bride’s Educational Marksheets & Degree/Diploma Certificate',
      'Income Certificate & Community Certificate',
      'Wedding Invitation & Age Proof'
    ],
    documentsRequiredTa: [
      'தாயின் விதவை சான்றிதழ்',
      'கல்வி சான்றிதழ் / பட்டப்படிப்பு சான்று',
      'வருமான சான்றிதழ் & திருமண அழைப்பிதழ்'
    ],
    documentsRequiredHi: [
      'मां का विधवा प्रमाण पत्र',
      'शैक्षणिक अंकतालिका',
      'आय व शादी का कार्ड'
    ],
    applicationSteps: [
      'Apply online via e-Sevai or submit directly at the Block Development Office 40 days prior to marriage.'
    ],
    applicationStepsTa: [
      'திருமணத்திற்கு 40 நாட்களுக்கு முன் இ-சேவை மையம் அல்லது BDO அலுவலகத்தில் சமர்ப்பிக்கவும்.'
    ],
    applicationStepsHi: [
      'विवाह से 40 दिन पूर्व ई-सेवा केंद्र से आवेदन करें।'
    ],
    officialUrl: 'https://cms.tn.gov.in',
    verificationDate: 'Verified Official Portal - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Social Welfare Directorate, Tamil Nadu',
    officeOrServiceCenter: 'e-Sevai Center / Block Social Welfare Office / DSWO',
    officeOrServiceCenterTa: 'இ-சேவை மையம் / வட்டார சமூக நல அலுவலகம்',
    officeOrServiceCenterHi: 'ई-सेवा केंद्र / ब्लॉक समाज कल्याण कार्यालय',
    helpline: '181',
    badge: 'Marriage Grant + Gold Coin',
    badgeTa: 'திருமண உதவித்தொகை + தங்க நாணயம்',
    badgeHi: 'विवाह अनुदान एवं स्वर्ण सिक्का'
  },
  {
    id: 'dharmambal-widow-remarriage',
    title: 'Dr. Dharmambal Ammaiyar Ninaivu Widow Remarriage Assistance Scheme',
    titleTa: 'டாக்டர் தர்மாம்பாள் அம்மையார் நினைவு விதவை மறுமண நிதியுதவி திட்டம்',
    titleHi: 'डॉ. धर्माम्बल अम्मैयार विधवा पुनर्विवाह वित्तीय सहायता योजना',
    department: 'Department of Social Welfare & Women Empowerment, Tamil Nadu',
    departmentTa: 'சமூக நலத்துறை, தமிழ்நாடு அரசு',
    departmentHi: 'समाज कल्याण विभाग, तमिलनाडु सरकार',
    governmentLevel: 'tamil_nadu',
    stateOrUt: 'Tamil Nadu',
    category: 'financial_aid',
    isLoan: false,
    benefits: '₹25,000 cash grant + 8g gold coin (non-graduates) or ₹50,000 cash grant + 8g gold coin (graduates) to support social rehabilitation of young widows.',
    benefitsTa: 'விதவை மறுமணம் புரியும் பெண்களுக்கு ₹25,000 - ₹50,000 உதவித்தொகையுடன் 8 கிராம் தங்க நாணயம்.',
    benefitsHi: 'विधवा पुनर्विवाह पर ₹25,000 से ₹50,000 व 8 ग्राम स्वर्ण सिक्का।',
    minAge: 20,
    maxAge: 30,
    targetGroup: ['homemaker', 'rural'],
    eligibility: [
      'Remarrying widow aged between 20 to 30 years.',
      'Groom must not exceed 40 years of age and must not have a living spouse.',
      'No income ceiling applies for this scheme to promote social reform.'
    ],
    eligibilityTa: [
      'மறுமணம் செய்யும் 20 முதல் 30 வயதுக்குட்பட்ட விதவை பெண்.',
      'வருமான வரம்பு எதுவும் இல்லை.'
    ],
    eligibilityHi: [
      '20 से 30 वर्ष की पुनर्विवाह करने वाली विधवा। कोई आय सीमा नहीं।'
    ],
    documentsRequired: [
      'Death Certificate of 1st Husband',
      'Remarriage Registration Certificate',
      'Bride and Groom Age and Community Certificates'
    ],
    documentsRequiredTa: [
      'முதல் கணவரின் இறப்பு சான்றிதழ்',
      'மறுமண பதிவு சான்றிதழ்',
      'வயது சான்றிதழ்'
    ],
    documentsRequiredHi: [
      'पूर्व पति का मृत्यु प्रमाण पत्र',
      'पुनर्विवाह पंजीकरण प्रमाण पत्र'
    ],
    applicationSteps: [
      'Submit application to the District Social Welfare Office within 6 months of remarriage.'
    ],
    applicationStepsTa: [
      'மறுமணம் முடிந்த 6 மாதத்திற்குள் மாவட்ட சமூக நல அலுவலகத்தில் சமர்ப்பிக்கவும்.'
    ],
    applicationStepsHi: [
      'पुनर्विवाह के 6 माह के भीतर जिला समाज कल्याण कार्यालय में जमा करें।'
    ],
    officialUrl: 'https://cms.tn.gov.in',
    verificationDate: 'Verified Official Portal - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Social Welfare Dept, TN',
    officeOrServiceCenter: 'District Social Welfare Office (DSWO), Tamil Nadu',
    officeOrServiceCenterTa: 'மாவட்ட சமூக நல அலுவலகம்',
    officeOrServiceCenterHi: 'जिला समाज कल्याण कार्यालय',
    helpline: '181',
    badge: 'Remarriage Reform Grant',
    badgeTa: 'மறுமண சீர்திருத்த மானியம்',
    badgeHi: 'पुनर्विवाह प्रोत्साहन अनुदान'
  },
  {
    id: 'annai-teresa-orphan-marriage',
    title: 'Annai Teresa Ninaivu Orphan Girls Marriage Assistance Scheme',
    titleTa: 'அன்னை தெரசா நினைவு ஆதரவற்ற பெண் குழந்தைகள் திருமண நிதியுதவி',
    titleHi: 'मदर टेरेसा अनाथ कन्या विवाह वित्तीय सहायता योजना',
    department: 'Department of Social Welfare, Tamil Nadu',
    departmentTa: 'சமூக நலத்துறை, தமிழ்நாடு அரசு',
    departmentHi: 'समाज कल्याण विभाग, तमिलनाडु सरकार',
    governmentLevel: 'tamil_nadu',
    stateOrUt: 'Tamil Nadu',
    category: 'financial_aid',
    isLoan: false,
    benefits: '₹25,000 cash aid + 8g gold coin (or ₹50,000 + 8g gold coin for graduates) directly transferred to orphan girls getting married.',
    benefitsTa: 'பெற்றோர் இல்லாத ஆதரவற்ற பெண்களுக்கு ₹25,000 முதல் ₹50,000 வரை நிதியுதவியுடன் 8 கிராம் தங்கம்.',
    benefitsHi: 'अनाथ कन्याओं को ₹25,000 से ₹50,000 एवं 8 ग्राम स्वर्ण सिक्का।',
    minAge: 18,
    targetGroup: ['homemaker', 'dropout', 'rural'],
    eligibility: [
      'Orphan girl with neither father nor mother living.',
      'Resident of Tamil Nadu; income ceiling not exceeding ₹72,000 per annum.'
    ],
    eligibilityTa: [
      'தாய், தந்தை இருவரையும் இழந்த ஆதரவற்ற பெண்.'
    ],
    eligibilityHi: [
      'माता-पिता विहीन अनाथ कन्या। आयु 18 वर्ष पूर्ण।'
    ],
    documentsRequired: [
      'Death Certificates of both Parents',
      'Orphan Certificate from Tahsildar / MLA / MP',
      'Marriage invitation and Educational Certificate'
    ],
    documentsRequiredTa: [
      'பெற்றோர் இருவரின் இறப்பு சான்றிதழ்',
      'வட்டாட்சியர் வழங்கிய ஆதரவற்றோர் சான்று',
      'திருமண அழைப்பிதழ்'
    ],
    documentsRequiredHi: [
      'माता-पिता का मृत्यु प्रमाण पत्र',
      'अनाथ प्रमाण पत्र',
      'शादी का कार्ड'
    ],
    applicationSteps: [
      'Apply at the District Social Welfare Office 40 days prior to marriage.'
    ],
    applicationStepsTa: [
      'திருமணத்திற்கு 40 நாட்களுக்கு முன் மாவட்ட சமூக நல அலுவலகத்தில் சமர்ப்பிக்கவும்.'
    ],
    applicationStepsHi: [
      'विवाह से 40 दिन पूर्व जिला समाज कल्याण कार्यालय में आवेदन करें।'
    ],
    officialUrl: 'https://cms.tn.gov.in',
    verificationDate: 'Verified Official Guidelines - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Social Welfare Directorate, Tamil Nadu',
    officeOrServiceCenter: 'District Social Welfare Office (DSWO), District Collectorate',
    officeOrServiceCenterTa: 'மாவட்ட ஆட்சியர் அலுவலக சமூக நலத்துறை பிரிவு',
    officeOrServiceCenterHi: 'जिला कलेक्ट्रेट समाज कल्याण शाखा',
    helpline: '181',
    badge: 'Orphan Girl Marriage Aid',
    badgeTa: 'ஆதரவற்ற பெண் திருமண உதவி',
    badgeHi: 'अनाथ कन्या विवाह सहायता'
  },
  {
    id: 'tn-thozhi-hostels',
    title: 'Tamil Nadu Working Women Hostels (Thozhi Hostels Network)',
    titleTa: 'தமிழ்நாடு தோழி பணிபுரியும் மகளிர் தங்கும் விடுதிகள் (TNWWHC)',
    titleHi: 'तमिलनाडु थोझी कामकाजी महिला छात्रावास नेटवर्क',
    department: 'Tamil Nadu Working Women’s Hostel Corporation (TNWWHC)',
    departmentTa: 'தமிழ்நாடு பணிபுரியும் மகளிர் விடுதிகள் கழகம்',
    departmentHi: 'तमिलनाडु कामकाजी महिला छात्रावास निगम',
    governmentLevel: 'tamil_nadu',
    stateOrUt: 'Tamil Nadu',
    category: 'livelihood',
    isLoan: false,
    benefits: 'Safe, affordable tech-enabled accommodation with biometric entry, Wi-Fi, laundry, subsidized dining, and round-the-clock female wardens across major cities.',
    benefitsTa: 'பயோமெட்ரிக் பாதுகாப்பு, வைஃபை மற்றும் மலிவான கட்டணத்தில் சென்னை, கோவை, திருச்சி, மதுரை, சேலம் போன்ற நகரங்களில் அரசு விடுதிகள்.',
    benefitsHi: 'बायोमेट्रिक सुरक्षा, वाईफाई, भोजन सहित रियायती दरों पर सुरक्षित आधुनिक महिला हॉस्टल।',
    minAge: 18,
    targetGroup: ['entrepreneur', 'student', 'dropout'],
    eligibility: [
      'Working women, interns, researchers, or competitive exam aspirants staying away from hometown.'
    ],
    eligibilityTa: [
      'சொந்த ஊரை விட்டு பணிபுரியும் பெண்கள், இன்டர்ன்ஷிப் அல்லது போட்டித் தேர்வு பயில்வோர்.'
    ],
    eligibilityHi: [
      'कामकाजी महिलाएं या प्रतियोगी परीक्षाओं की तैयारी कर रहीं छात्राएं।'
    ],
    documentsRequired: [
      'Identity Proof (Aadhaar / Voter ID)',
      'Employment Letter / Bonafide Certificate',
      'Passport size photograph'
    ],
    documentsRequiredTa: [
      'பணிபுரியும் நிறுவன கடிதம் / அடையாள அட்டை',
      'ஆதார் அட்டை & புகைப்படங்கள்'
    ],
    documentsRequiredHi: [
      'कंपनी का नियुक्ति पत्र',
      'आधार कार्ड'
    ],
    applicationSteps: [
      'Book your bed or room online via the official Thozhi web portal (tnwwhc.in).',
      'Check-in instantly upon online verification.'
    ],
    applicationStepsTa: [
      'tnwwhc.in இணையதளத்தில் ஆன்லைனில் உங்கள் அறையை எளிதாக முன்பதிவு செய்யலாம்.'
    ],
    applicationStepsHi: [
      'tnwwhc.in पोर्टल पर जाकर सीधे ऑनलाइन बुकिंग करें।'
    ],
    officialUrl: 'https://tnwwhc.in',
    verificationDate: 'Verified Official State Network - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'TNWWHC, Govt of Tamil Nadu',
    officeOrServiceCenter: 'Thozhi Hostel Facilities in Chennai, Coimbatore, Madurai, Trichy, Salem, Hosur',
    officeOrServiceCenterTa: 'தோழி விடுதிகள் (சென்னை, கோவை, மதுரை, திருச்சி, சேலம்)',
    officeOrServiceCenterHi: 'थोझी हॉस्टल (चेन्नई, कोयंबटूर, मदुरै, सेलम आदि)',
    helpline: '044-28522255',
    badge: 'Modern Working Women Hostel',
    badgeTa: 'நவீன அரசு மகளிர் விடுதி',
    badgeHi: 'आधुनिक महिला छात्रावास'
  },
  {
    id: 'tn-free-bicycles-school-girls',
    title: 'Free Bicycles & Educational Kits for High School Girls (Tamil Nadu)',
    titleTa: 'அரசுப் பள்ளி மாணவிகளுக்கு விலையில்லா மிதிவண்டி மற்றும் கல்வி உபகரணங்கள்',
    titleHi: 'सरकारी स्कूल छात्राओं हेतु मुफ्त साइकिल एवं शैक्षणिक किट',
    department: 'School Education Department, Government of Tamil Nadu',
    departmentTa: 'பள்ளிக் கல்வித்துறை, தமிழ்நாடு அரசு',
    departmentHi: 'स्कूल शिक्षा विभाग, तमिलनाडु সরকার',
    governmentLevel: 'tamil_nadu',
    stateOrUt: 'Tamil Nadu',
    category: 'education',
    isLoan: false,
    benefits: 'Brand new sturdy bicycle, free textbooks, notebooks, school bag, footwear, and geometry kit to eliminate transportation hurdles for rural girls.',
    benefitsTa: '11-ஆம் வகுப்பு மாணவிகளுக்கு புதிய மிதிவண்டி, இலவச பாடப்புத்தகங்கள், பைகள் மற்றும் காலணிகள்.',
    benefitsHi: '11वीं कक्षा की छात्राओं को नई साइकिल, पाठ्यपुस्तकें व स्कूल बैग।',
    targetGroup: ['student', 'rural'],
    eligibility: [
      'All girl students studying Class 11 in Tamil Nadu Government and Government-aided higher secondary schools.'
    ],
    eligibilityTa: [
      'அரசு மற்றும் அரசு உதவிபெறும் மேல்நிலைப் பள்ளிகளில் 11-ஆம் வகுப்பு பயிலும் மாணவிகள்.'
    ],
    eligibilityHi: [
      'सरकारी एवं सहायता प्राप्त स्कूलों में कक्षा 11 की छात्राएं।'
    ],
    documentsRequired: [
      'School EMIS registration (provided by school automatically).'
    ],
    documentsRequiredTa: [
      'பள்ளி EMIS பதிவு எண்.'
    ],
    documentsRequiredHi: [
      'स्कूल ईएमआईएस विवरण।'
    ],
    applicationSteps: [
      'Handed over on school campus by the Headmaster during term distribution.'
    ],
    applicationStepsTa: [
      'பள்ளியிலேயே தலைமை ஆசிரியர் மூலம் நேரடியாக வழங்கப்படும்.'
    ],
    applicationStepsHi: [
      'स्कूल में सीधे वितरण।'
    ],
    officialUrl: 'https://tnschools.gov.in',
    verificationDate: 'Verified Official State Portal - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'School Education Dept, Tamil Nadu',
    officeOrServiceCenter: 'Government Higher Secondary Schools across all 38 districts of TN',
    officeOrServiceCenterTa: 'அரசு மேல்நிலைப் பள்ளிகள்',
    officeOrServiceCenterHi: 'सरकारी स्कूल, तमिलनाडु',
    helpline: '14417',
    badge: 'Free Mobility Asset',
    badgeTa: 'இலவச போக்குவரத்து மிதிவண்டி',
    badgeHi: 'मुफ्त साइकिल'
  },
  {
    id: 'naan-mudhalvan-women',
    title: 'Naan Mudhalvan Skilling and Career Upskilling for Women',
    titleTa: 'நான் முதல்வன் திட்டம் (மகளிர் உயர் தொழிற்திறன் & வேலைவாய்ப்பு)',
    titleHi: 'नान मुधलवन महिला कौशल एवं करियर संवर्धन योजना',
    department: 'Tamil Nadu Skill Development Corporation (TNSDC)',
    departmentTa: 'தமிழ்நாடு திறன் மேம்பாட்டுக் கழகம்',
    departmentHi: 'तमिलनाडु कौशल विकास निगम (TNSDC)',
    governmentLevel: 'tamil_nadu',
    stateOrUt: 'Tamil Nadu',
    category: 'livelihood',
    isLoan: false,
    benefits: 'Free industry-certified courses in IT coding, AI tools, data analytics, financial accounting, logistics, and medical coding with corporate placement drives.',
    benefitsTa: 'கணினி மென்பொருள், கணக்கியல், மருத்துவம், மற்றும் செயற்கை நுண்ணறிவு துறைகளில் இலவச சான்றிதழ் மற்றும் நேர்முகத் தேர்வுகள்.',
    benefitsHi: 'आईटी, डेटा, फाइनेंस व तकनीकी क्षेत्रों में मुफ्त प्रमाणन व कैंपस प्लेसमेंट।',
    minAge: 18,
    targetGroup: ['student', 'dropout', 'entrepreneur'],
    eligibility: [
      'Women students in final year or graduates/dropouts from polytechnics, arts, science, and engineering colleges in Tamil Nadu.'
    ],
    eligibilityTa: [
      'கல்லூரி மாணவிகள் அல்லது பாலிடெக்னிக்/பட்டப்படிப்பு முடித்த தமிழக பெண்கள்.'
    ],
    eligibilityHi: [
      'तमिलनाडु की कॉलेज छात्राएं या स्नातक/डिप्लोमा उत्तीर्ण महिलाएं।'
    ],
    documentsRequired: [
      'College ID / Educational Marksheet',
      'Aadhaar Card'
    ],
    documentsRequiredTa: [
      'கல்லூரி அடையாள அட்டை அல்லது மதிப்பெண் பட்டியல்',
      'ஆதார் அட்டை'
    ],
    documentsRequiredHi: [
      'कॉलेज आईडी व आधार कार्ड'
    ],
    applicationSteps: [
      'Enroll online at naanmudhalvan.tn.gov.in and select preferred course track.'
    ],
    applicationStepsTa: [
      'naanmudhalvan.tn.gov.in இணையதளத்தில் விருப்பமான பாடத்திட்டத்தை பதிவு செய்யவும்.'
    ],
    applicationStepsHi: [
      'naanmudhalvan.tn.gov.in पोर्टल पर ऑनलाइन पंजीकरण करें।'
    ],
    officialUrl: 'https://naanmudhalvan.tn.gov.in',
    verificationDate: 'Verified Official Skill Portal - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'TNSDC, Govt of Tamil Nadu',
    officeOrServiceCenter: 'College Naan Mudhalvan Cell / District Employment Offices',
    officeOrServiceCenterTa: 'கல்லூரி நான் முதல்வன் மையம் / மாவட்ட வேலைவாய்ப்பு அலுவலகம்',
    officeOrServiceCenterHi: 'जिला रोजगार कार्यालय, तमिलनाडु',
    helpline: '1800 599 7626',
    badge: 'Industry Certified Skilling',
    badgeTa: 'அங்கீகரிக்கப்பட்ட தொழிற்திறன்',
    badgeHi: 'उद्योग प्रमाणित कौशल'
  },
  {
    id: 'tnsrlm-rural-livelihood',
    title: 'Tamil Nadu State Rural Livelihoods Mission (TNSRLM Producer Grants)',
    titleTa: 'தமிழ்நாடு மாநில ஊரக வாழ்வாதார இயக்கம் (உற்பத்தியாளர் குழு மானியம்)',
    titleHi: 'तमिलनाडु ग्रामीण आजीविका मिशन (उत्पादक समूह अनुदान)',
    department: 'Rural Development and Panchayat Raj Department, Tamil Nadu',
    departmentTa: 'ஊரக வளர்ச்சி மற்றும் ஊராட்சித் துறை, தமிழ்நாடு',
    departmentHi: 'ग्रामीण विकास विभाग, तमिलनाडु',
    governmentLevel: 'tamil_nadu',
    stateOrUt: 'Tamil Nadu',
    category: 'livelihood',
    isLoan: false,
    benefits: 'Start-up seed capital grants of ₹1,00,000 to ₹3,00,000 for women enterprise groups, community farm collectives, organic farming, and packaging units.',
    benefitsTa: 'கிராமப்புற பெண்கள் தொழில் குழுக்களுக்கு ₹1 லட்சம் முதல் ₹3 லட்சம் வரை இலவச தொடக்க மூலதன மானியம்.',
    benefitsHi: 'महिला उत्पादक समूहों को व्यवसाय शुरू करने हेतु ₹1 लाख से ₹3 लाख तक का अनुदान।',
    targetGroup: ['rural', 'entrepreneur', 'homemaker'],
    eligibility: [
      'Rural SHG members forming specialized producer groups (e.g. food, dairy, tailoring, honey, handicrafts).'
    ],
    eligibilityTa: [
      'கிராமப்புறங்களில் இயங்கும் மகளிர் உற்பத்தியாளர் குழுக்கள்.'
    ],
    eligibilityHi: [
      'ग्रामीण महिला उत्पादक समूह।'
    ],
    documentsRequired: [
      'Producer Group Resolution and Bank Passbook',
      'Panchayat VPRC / PLF Endorsement',
      'Business Proposal'
    ],
    documentsRequiredTa: [
      'குழு தீர்மானம் & திட்ட அறிக்கை',
      'ஊராட்சி கூட்டமைப்பு பரிந்துரை'
    ],
    documentsRequiredHi: [
      'समूह प्रस्ताव व व्यापार योजना'
    ],
    applicationSteps: [
      'Submit enterprise plan to the Block Mission Management Unit (BMMU) via Panchayat Federation.'
    ],
    applicationStepsTa: [
      'ஊராட்சி கூட்டமைப்பு மூலமாக வட்டார திட்ட அலுவலகத்தில் சமர்ப்பிக்கவும்.'
    ],
    applicationStepsHi: [
      'ब्लॉक मिशन प्रबंधन इकाई में प्रस्ताव जमा करें।'
    ],
    officialUrl: 'https://www.mathi.tn.gov.in',
    verificationDate: 'Verified Official Rural Mission - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Rural Development Dept, Tamil Nadu',
    officeOrServiceCenter: 'Block Mission Management Unit (BMMU) / BDO Office',
    officeOrServiceCenterTa: 'வட்டார இயக்க மேலாண்மை பிரிவு (BMMU) / BDO அலுவலகம்',
    officeOrServiceCenterHi: 'ब्लॉक मिशन प्रबंधन इकाई',
    helpline: '044-28173412',
    badge: 'Producer Enterprise Grant',
    badgeTa: 'உற்பத்தியாளர் தொழில் மானியம்',
    badgeHi: 'उत्पादक समूह अनुदान'
  },
  {
    id: 'aabcs-sc-st-women',
    title: 'Annal Ambedkar Business Champions Scheme (AABCS) for Women',
    titleTa: 'அண்ணல் அம்பேத்கர் தொழில் முன்னோடிகள் திட்டம் (35% மூலதன மானியம்)',
    titleHi: 'अन्नल आंबेडकर बिजनेस चैंपियंस योजना (35% पूंजी सब्सिडी)',
    department: 'Micro, Small and Medium Enterprises (MSME) Department, Tamil Nadu',
    departmentTa: 'சிறு, குறு மற்றும் நடுத்தர தொழில் துறை, தமிழ்நாடு',
    departmentHi: 'एमएसएमई विभाग, तमिलनाडु સરકાર',
    governmentLevel: 'tamil_nadu',
    stateOrUt: 'Tamil Nadu',
    category: 'shg_loan',
    isLoan: true,
    benefits: '35% capital subsidy up to ₹35 Lakhs on project cost with 6% interest subvention for SC/ST women entrepreneurs setting up manufacturing or service enterprises.',
    benefitsTa: 'ஆதிதிராவிடர் & பழங்குடியின பெண் தொழில்முனைவோருக்கு 35% மூலதன மானியம் (அதிகபட்சம் ₹35 லட்சம்) மற்றும் 6% வட்டி மானியம்.',
    benefitsHi: 'एससी/एसटी महिला उद्यमियों को 35% पूंजी सब्सिडी (अधिकतम ₹35 लाख) तथा 6% ब्याज छूट।',
    minAge: 18,
    targetGroup: ['entrepreneur'],
    eligibility: [
      'SC/ST women entrepreneurs aged 18+ venturing into manufacturing, service, or commercial transport enterprises.'
    ],
    eligibilityTa: [
      '18 வயது நிரம்பிய ஆதிதிராவிடர் / பழங்குடியின பெண் தொழில்முனைவோர்.'
    ],
    eligibilityHi: [
      '18 वर्ष से अधिक आयु की एससी/एसटी महिला उद्यमी।'
    ],
    documentsRequired: [
      'Community Certificate (SC/ST)',
      'Detailed Project Report (DPR)',
      'Aadhaar, PAN Card & Quotations',
      'Bank consent letter'
    ],
    documentsRequiredTa: [
      'சாதிச் சான்றிதழ்',
      'தொழில் திட்ட அறிக்கை (DPR)',
      'ஆதார் மற்றும் பான் அட்டை'
    ],
    documentsRequiredHi: [
      'जाति प्रमाण पत्र',
      'विस्तृत प्रोजेक्ट रिपोर्ट (डीपीआर)'
    ],
    applicationSteps: [
      'Apply online on msmeonline.tn.gov.in under the AABCS scheme portal.',
      'General Manager, District Industries Centre (DIC) coordinates loan sanction and subsidy release.'
    ],
    applicationStepsTa: [
      'msmeonline.tn.gov.in போர்ட்டலில் ஆன்லைனில் விண்ணப்பிக்கவும்.'
    ],
    applicationStepsHi: [
      'msmeonline.tn.gov.in पर ऑनलाइन आवेदन करें।'
    ],
    officialUrl: 'https://msmeonline.tn.gov.in',
    verificationDate: 'Verified Official MSME Gazette - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'MSME Department, Govt of Tamil Nadu',
    officeOrServiceCenter: 'District Industries Centre (DIC) in every district headquarters of TN',
    officeOrServiceCenterTa: 'மாவட்ட தொழில் மையம் (DIC)',
    officeOrServiceCenterHi: 'जिला उद्योग केंद्र (DIC), तमिलनाडु',
    helpline: '044-22501550',
    badge: '35% Capital Subsidy + Subsidized Loan',
    badgeTa: '35% மூலதன மானியம் + கடன்',
    badgeHi: '35% पूंजी सब्सिडी व ऋण'
  },
  {
    id: 'tn-free-higher-education-girls',
    title: 'Tamil Nadu Free Higher Education Scheme for Girls (Arts & Science Colleges)',
    titleTa: 'அரசு கலை & அறிவியல் கல்லூரிகளில் மாணவிகளுக்கு முழுக் கட்டண விலக்கு திட்டம்',
    titleHi: 'सरकारी कला एवं विज्ञान कॉलेजों में छात्राओं हेतु पूर्ण शुल्क मुक्ति योजना',
    department: 'Directorate of Collegiate Education, Tamil Nadu',
    departmentTa: 'கல்லூரிக் கல்வி இயக்ககம், தமிழ்நாடு அரசு',
    departmentHi: 'कॉलेज शिक्षा निदेशालय, तमिलनाडु सरकार',
    governmentLevel: 'tamil_nadu',
    stateOrUt: 'Tamil Nadu',
    category: 'education',
    isLoan: false,
    benefits: 'Complete tuition fee exemption for all female undergraduate students admitted in all government arts and science colleges across Tamil Nadu.',
    benefitsTa: 'தமிழக அரசு கலை மற்றும் அறிவியல் கல்லூரிகளில் பயிலும் அனைத்து மாணவிகளுக்கும் 100% இலவசக் கல்வி.',
    benefitsHi: 'सरकारी कला व विज्ञान कॉलेजों में पढ़ने वाली सभी छात्राओं को 100% शिक्षण शुल्क छूट।',
    targetGroup: ['student', 'dropout', 'rural'],
    eligibility: [
      'Girl students who have passed +2 and secured admission to any undergraduate course in government arts and science colleges.'
    ],
    eligibilityTa: [
      '+2 முடித்து அரசு கலை மற்றும் அறிவியல் கல்லூரிகளில் பட்டப்படிப்பில் சேரும் அனைத்து மாணவிகள்.'
    ],
    eligibilityHi: [
      '12वीं उत्तीर्ण छात्राएं जो सरकारी कॉलेजों में स्नातक में प्रवेश लेती हैं।'
    ],
    documentsRequired: [
      'Higher Secondary (+2) Marksheet & Transfer Certificate',
      'College Admission Card & Allotment Memo',
      'Aadhaar Card'
    ],
    documentsRequiredTa: [
      '+2 மதிப்பெண் சான்றிதழ் மற்றும் TC',
      'கல்லூரி சேர்க்கை அட்டை',
      'ஆதார் அட்டை'
    ],
    documentsRequiredHi: [
      '12वीं अंकतालिका व टीसी',
      'कॉलेज प्रवेश पत्र'
    ],
    applicationSteps: [
      'Direct fee waiver applied during online single-window admission at tngasa.in.'
    ],
    applicationStepsTa: [
      'tngasa.in கலந்தாய்வில் கல்லூரியில் சேரும்போதே தானாகவே கட்டண விலக்கு அளிக்கப்படுகிறது.'
    ],
    applicationStepsHi: [
      'tngasa.in काउंसलिंग के समय सीधे शुल्क छूट लागू होती है।'
    ],
    officialUrl: 'https://tngasa.in',
    verificationDate: 'Verified Official Higher Education Portal - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Higher Education Dept, Tamil Nadu',
    officeOrServiceCenter: 'Government Arts & Science Colleges across Tamil Nadu',
    officeOrServiceCenterTa: 'அரசு கலை மற்றும் அறிவியல் கல்லூரிகள்',
    officeOrServiceCenterHi: 'सरकारी कला एवं विज्ञान कॉलेज',
    helpline: '044-28410291',
    badge: '100% Free College Tuition',
    badgeTa: '100% இலவச கல்லூரி படிப்பு',
    badgeHi: 'पूर्ण कॉलेज शुल्क माफी'
  },
  {
    id: 'tn-destitute-widow-pension',
    title: 'Tamil Nadu Destitute Widow Social Security Pension Scheme',
    titleTa: 'தமிழ்நாடு ஆதரவற்ற விதவை மாதாந்திர சமூகப் பாதுகாப்பு ஓய்வூதியம் (OAP)',
    titleHi: 'तमिलनाडु निराश्रित विधवा सामाजिक सुरक्षा पेंशन योजना',
    department: 'Revenue and Disaster Management Department, Government of Tamil Nadu',
    departmentTa: 'வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை, தமிழ்நாடு',
    departmentHi: 'राजस्व एवं आपदा प्रबंधन विभाग, तमिलनाडु सरकार',
    governmentLevel: 'tamil_nadu',
    stateOrUt: 'Tamil Nadu',
    category: 'financial_aid',
    isLoan: false,
    benefits: 'Monthly social pension of ₹1,200 credited directly to bank account, along with free smart ration card rice and free dhotis/sarees twice a year.',
    benefitsTa: 'மாதந்தோறும் ₹1,200 நேரடி வங்கி ஓய்வூதியம், இலவச ரேஷன் அரிசி மற்றும் ஆண்டுக்கு 2 முறை இலவச புடவைகள்.',
    benefitsHi: 'प्रतिमाह ₹1,200 प्रत्यक्ष पेंशन, मुफ्त चावल एवं वर्ष में दो बार मुफ्त साड़ियां।',
    minAge: 18,
    targetGroup: ['homemaker', 'rural', 'dropout'],
    eligibility: [
      'Destitute widow residing in Tamil Nadu.',
      'Annual family income within ₹1,00,000.',
      'Not remarried and holding destitute certificate from Tahsildar.'
    ],
    eligibilityTa: [
      'தமிழகத்தில் வசிக்கும் ஆதரவற்ற விதவை பெண்.',
      'குடும்ப ஆண்டு வருமானம் ₹1 லட்சத்திற்குள் இருத்தல்.'
    ],
    eligibilityHi: [
      'तमिलनाडु निवासी निराश्रित विधवा। वार्षिक आय ₹1 लाख से कम।'
    ],
    documentsRequired: [
      'Husband’s Death Certificate',
      'Destitute Widow Certificate from Tahsildar',
      'Smart Family Card and Aadhaar Card',
      'Bank Account Passbook'
    ],
    documentsRequiredTa: [
      'கணவரின் இறப்பு சான்றிதழ்',
      'வட்டாட்சியர் வழங்கிய ஆதரவற்ற விதவை சான்றிதழ்',
      'குடும்ப அட்டை & வங்கி புத்தகம்'
    ],
    documentsRequiredHi: [
      'पति का मृत्यु प्रमाण पत्र',
      'तहसीलदार द्वारा जारी विधवा प्रमाण पत्र',
      'राशन कार्ड व बैंक खाता'
    ],
    applicationSteps: [
      'Apply at the nearest e-Sevai centre or submit physical application to the Special Tahsildar (Social Security Schemes).',
      'Revenue Inspector conducts field enquiry and issues pension sanction.'
    ],
    applicationStepsTa: [
      'அருகில் உள்ள இ-சேவை மையம் அல்லது வட்டாட்சியர் அலுவலக சமூக பாதுகாப்பு திட்ட பிரிவில் விண்ணப்பிக்கவும்.'
    ],
    applicationStepsHi: [
      'ई-सेवा केंद्र या तहसील सामाजिक सुरक्षा कार्यालय में आवेदन करें।'
    ],
    officialUrl: 'https://edistricts.tn.gov.in',
    verificationDate: 'Verified Official Revenue Gazette - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Revenue Administration, Tamil Nadu',
    officeOrServiceCenter: 'e-Sevai Centers / Taluk Office (Social Security Scheme Wing)',
    officeOrServiceCenterTa: 'இ-சேவை மையம் / வட்டாட்சியர் அலுவலகம்',
    officeOrServiceCenterHi: 'ई-सेवा केंद्र / तहसील कार्यालय, तमिलनाडु',
    helpline: '181',
    badge: 'Monthly Social Security Pension',
    badgeTa: 'மாதாந்திர சமூக பாதுகாப்பு ஓய்வூதியம்',
    badgeHi: 'मासिक सामाजिक सुरक्षा पेंशन'
  },

  // =========================================================================
  // 3. CENTRAL GOVERNMENT OF INDIA SCHEMES (8 Relevant National Schemes)
  // =========================================================================
  {
    id: 'pm-mudra-shishu',
    title: 'Pradhan Mantri MUDRA Yojana (Shishu & Kishore Loans for Women)',
    titleTa: 'பிரதம மந்திரி முத்ரா கடன் திட்டம் (சிசு & கிஷோர் மகளிர் தொழிற்கடன்)',
    titleHi: 'प्रधानमंत्री मुद्रा योजना (शिशु व किशोर महिला व्यवसाय ऋण)',
    department: 'Department of Financial Services, Ministry of Finance, Govt of India',
    departmentTa: 'நிதி அமைச்சகம், இந்திய அரசு',
    departmentHi: 'वित्त मंत्रालय, भारत सरकार',
    governmentLevel: 'central',
    category: 'shg_loan',
    isLoan: true,
    benefits: 'Collateral-free micro loans up to ₹50,000 (Shishu) and up to ₹5 Lakhs (Kishore) at low subsidized interest rates with zero processing fee for micro-women enterprises.',
    benefitsTa: 'எந்தவித அடமானமும் இல்லாமல் ₹50,000 (சிசு) முதல் ₹5 லட்சம் (கிஷோர்) வரை குறைந்த வட்டியில் தொழில் கடன்.',
    benefitsHi: 'बिना किसी गारंटी/बंधक के ₹50,000 (शिशु) से ₹5 लाख (किशोर) तक कम ब्याज पर व्यवसाय ऋण।',
    minAge: 18,
    targetGroup: ['entrepreneur', 'homemaker', 'rural'],
    eligibility: [
      'Any woman citizen aged 18+ wanting to start or expand a small micro-business.',
      'No collateral security or third-party guarantor required.',
      'Clean credit history (no existing bank default).'
    ],
    eligibilityTa: [
      'சிறிய தொழில் தொடங்க அல்லது விரிவாக்க விரும்பும் 18 வயது நிரம்பிய பெண்கள்.',
      'சொத்து அல்லது நிலம் அடமானம் வைக்கத் தேவையில்லை.',
      'வங்கியில் முந்தைய கடன் பாக்கி இல்லாதிருக்க வேண்டும்.'
    ],
    eligibilityHi: [
      '18 वर्ष से अधिक आयु की महिला जो छोटा व्यवसाय शुरू या बढ़ाना चाहती है।',
      'कोई संपत्ति या गारंटी बंधक रखने की जरूरत नहीं।',
      'बैंक में कोई पुराना डिफ़ॉल्ट न हो।'
    ],
    documentsRequired: [
      'Identity Proof (Aadhaar / Voter ID)',
      'Address Proof (Ration card / Electricity bill)',
      'Quotation of machinery/items to be purchased',
      'Bank Account Statement (last 6 months)',
      'Business Plan outline / proposal'
    ],
    documentsRequiredTa: [
      'அடையாள அட்டை (ஆதார் / வாக்காளர் அட்டை)',
      'முகவரி சான்று (ரேஷன் கார்டு / மின் கட்டண ரசீது)',
      'வாங்கவிருக்கும் இயந்திரங்கள் / மூலப்பொருட்களின் விலைப்பட்டியல்',
      'கடந்த 6 மாத வங்கி கணக்கு புத்தகம்',
      'சுருக்கமான தொழில் திட்டம்'
    ],
    documentsRequiredHi: [
      'पहचान पत्र (आधार / वोटर आईडी)',
      'पता प्रमाण (राशन कार्ड / बिजली बिल)',
      'खरीदे जाने वाले सामान/मशीन का कोटेशन',
      'पिछले 6 महीने का बैंक स्टेटमेंट',
      'संक्षिप्त व्यापार प्रस्ताव'
    ],
    applicationSteps: [
      'Visit any nationalized bank, regional rural bank (RRB), or cooperative bank branch.',
      'Request the MUDRA Shishu loan form (priority is given to women entrepreneurs under Mudra Mahila).',
      'Submit the simple 1-page application with machinery/stock quotation.',
      'Loan is sanctioned without any processing fees for Shishu category.'
    ],
    applicationStepsTa: [
      'அருகில் உள்ள தேசியமயமாக்கப்பட்ட வங்கி அல்லது கிராம வங்கியை அணுகவும்.',
      'முத்ரா சிசு கடன் படிவத்தை பூர்த்தி செய்து கொடுக்கவும்.',
      'வாங்கவிருக்கும் பொருட்கள் விலைப்பட்டியலுடன் இணைக்கவும்.',
      'சிசு கடனுக்கு எந்தவித செயலாக்க கட்டணமும் (Processing fee) இன்றி கடன் அனுமதிக்கப்படும்.'
    ],
    applicationStepsHi: [
      'किसी भी राष्ट्रीयकृत बैंक, ग्रामीण बैंक या सहकारी बैंक जाएं।',
      'मुद्रा शिशु ऋण फॉर्म भरें।',
      'खरीदी जाने वाली सामग्री का बिल कोटेशन संलग्न करें।',
      'शिशु श्रेणी में बिना किसी प्रोसेसिंग शुल्क के ऋण स्वीकृत होता है।'
    ],
    officialUrl: 'https://www.mudra.org.in',
    verificationDate: 'Verified Official Portal - January 2026',
    lastCheckedDate: '2026-01-22',
    officialSource: 'MUDRA / Department of Financial Services, Govt of India',
    officeOrServiceCenter: 'Any Public Sector / Commercial Bank Branch / Lead District Bank Office',
    officeOrServiceCenterTa: 'அனைத்து அரசு வங்கிக் கிளைகள் / மாவட்ட முன்னணி வங்கி',
    officeOrServiceCenterHi: 'सार्वजनिक क्षेत्र का कोई भी बैंक / अग्रणी जिला बैंक',
    helpline: '1800 180 1111',
    badge: 'Subsidized Micro Loan',
    badgeTa: 'குறைந்த வட்டி கடன் (திருப்பிச் செலுத்த வேண்டியவை)',
    badgeHi: 'रियायती ऋण (लौटाने योग्य)'
  },
  {
    id: 'lakhpati-didi',
    title: 'Lakhpati Didi Mission (Rural Women Micro-Enterprise Scale-Up)',
    titleTa: 'இலட்சாதிபதி சகோதரி திட்டம் (Lakhpati Didi - ஆண்டுக்கு ₹1 லட்சம் வருமானம்)',
    titleHi: 'लखपति दीदी मिशन (वार्षिक ₹1 लाख आय संवर्धन)',
    department: 'Ministry of Rural Development & Deendayal Antyodaya Yojana - NRLM',
    departmentTa: 'ஊரக வளர்ச்சி அமைச்சகம் (NRLM)',
    departmentHi: 'ग्रामीण विकास मंत्रालय एवं राष्ट्रीय ग्रामीण आजीविका मिशन',
    governmentLevel: 'central',
    category: 'livelihood',
    isLoan: false,
    benefits: 'Specialized enterprise training, market linkages, toolkit funding, and mentorship to enable rural SHG women to earn a sustainable minimum income of ₹1,00,000 per year.',
    benefitsTa: 'கிராமப்புற பெண்கள் ஆண்டுக்கு குறைந்தது ₹1,00,000 வருமானம் ஈட்ட சிறப்பு தொழிற்பயிற்சி மற்றும் சந்தை வாய்ப்புகள்.',
    benefitsHi: 'ग्रामीण महिलाओं को प्रति वर्ष कम से कम ₹1,00,000 कमाने योग्य बनाने के लिए विशेष प्रशिक्षण, टूलकिट व बाजार संपर्क।',
    targetGroup: ['rural', 'homemaker', 'entrepreneur'],
    eligibility: [
      'Rural SHG woman member motivated to start or scale sustainable micro-enterprises (agriculture, poultry, dairy, tailoring, food processing, eco-products).'
    ],
    eligibilityTa: [
      'விவசாயம், கோழிப்பண்ணை, பால்பண்ணை, தையல், உணவுப் பொருட்கள் போன்ற சிறுதொழில் செய்ய விரும்பும் கிராமப்புற SHG பெண்.'
    ],
    eligibilityHi: [
      'कृषि, मुर्गीपालन, डेयरी, सिलाई, खाद्य प्रसंस्करण जैसे सूक्ष्म उद्यम शुरू करने की इच्छुक ग्रामीण एसएचजी महिला।'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'SHG Member ID / Passbook',
      'Local Village Poverty Reduction Committee (VPRC) Recommendation'
    ],
    documentsRequiredTa: [
      'ஆதார் அட்டை',
      'சுயஉதவிக் குழு உறுப்பினர் எண் / பாஸ்புக்',
      'ஊராட்சி அளவிலான கூட்டமைப்பு பரிந்துரை'
    ],
    documentsRequiredHi: [
      'आधार कार्ड',
      'एसएचजी सदस्य पासबुक',
      'ग्राम गरीबी उन्मूलन समिति (VPRC) अनुशंसा'
    ],
    applicationSteps: [
      'Contact your Village Livelihood Animator (VLA) or Community Resource Person (CRP).',
      'Enroll in the Lakhpati Didi baseline business aspiration survey.',
      'Undergo residential/community training and receive business enterprise startup grants through the Gram Panchayat.'
    ],
    applicationStepsTa: [
      'உங்கள் கிராம வாழ்வாதார உதவியாளர் (VLA) அல்லது CRP-ஐ தொடர்பு கொள்ளவும்.',
      'இலட்சாதிபதி சகோதரி கணக்கெடுப்பில் உங்கள் பெயரை பதிவு செய்யவும்.',
      'தொழிற்பயிற்சி மற்றும் உபகரண மானியங்களை பெற்றுக் கொள்ளவும்.'
    ],
    applicationStepsHi: [
      'अपने ग्राम आजीविका मित्र या सीआरपी से संपर्क करें।',
      'लखपति दीदी सर्वेक्षण में अपना नाम दर्ज कराएं।',
      'कौशल प्रशिक्षण एवं टूलकिट सहायता प्राप्त करें।'
    ],
    officialUrl: 'https://nrlm.gov.in',
    verificationDate: 'Verified Official Mission Guidelines - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Ministry of Rural Development, Govt of India',
    officeOrServiceCenter: 'Gram Panchayat Office / Block NRLM Office',
    officeOrServiceCenterTa: 'கிராம ஊராட்சி அலுவலகம் / வட்டார NRLM அலுவலகம்',
    officeOrServiceCenterHi: 'ग्राम पंचायत कार्यालय / ब्लॉक एनआरएलएम कार्यालय',
    helpline: '1800 110 001',
    badge: 'Livelihood Scale-Up Mission',
    badgeTa: 'வருமான பெருக்க இயக்கம்',
    badgeHi: 'आजीविका संवर्धन मिशन'
  },
  {
    id: 'pm-vishwakarma',
    title: 'PM Vishwakarma Scheme (Tailors, Artisans & Craftswomen)',
    titleTa: 'பிரதம மந்திரி விஸ்வகர்மா திட்டம் (தையல் & கைவினைஞர்கள்)',
    titleHi: 'पीएम विश्वकर्मा योजना (दर्जी, हस्तशिल्प व कारीगर)',
    department: 'Ministry of Micro, Small and Medium Enterprises (MSME), Govt of India',
    departmentTa: 'சிறு, குறு மற்றும் நடுத்தர தொழில் அமைச்சகம் (MSME)',
    departmentHi: 'सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय (MSME), भारत सरकार',
    governmentLevel: 'central',
    category: 'equipment',
    isLoan: false,
    benefits: '₹15,000 modern toolkit e-voucher grant + 5-7 days free skill training with ₹500/day daily stipend and government certificate.',
    benefitsTa: '₹15,000 இலவச உபகரண மானியம் + நாள் ஒன்றுக்கு ₹500 ஊக்கத்தொகையுடன் தொழிற்பயிற்சி மற்றும் அரசு சான்றிதழ்.',
    benefitsHi: '₹15,000 का मुफ्त टूलकिट ई-वाउचर + प्रतिदिन ₹500 भत्ते के साथ कौशल प्रशिक्षण व सरकारी प्रमाण पत्र।',
    minAge: 18,
    targetGroup: ['entrepreneur', 'rural', 'homemaker', 'dropout'],
    freeEquipment: 'Modern sewing/tailoring toolkit or handicraft equipment voucher worth ₹15,000',
    freeEquipmentTa: '₹15,000 மதிப்பிலான நவீன தையல் அல்லது கைவினை உபகரண வவுச்சர்',
    freeEquipmentHi: '₹15,000 मूल्य का आधुनिक सिलाई या शिल्प टूलकिट ई-वाउचर',
    eligibility: [
      'Artisan or craftsperson working with hands and tools in one of 18 traditional trades (Tailor / Darzi, Basket Maker, Broom Maker, Potter, etc.).',
      'Minimum age of 18 years on date of registration.',
      'Only one member from a family can avail the benefits.'
    ],
    eligibilityTa: [
      'தையல் (Darzi), கூடை முடைதல், கைவினைப்பொருட்கள் போன்ற 18 பாரம்பரிய கைத்தொழில்களில் ஈடுபட்டுள்ள பெண்கள்.',
      'குறைந்தபட்ச வயது 18.',
      'ஒரு குடும்பத்தில் ஒருவருக்கு மட்டுமே பொருந்தும்.'
    ],
    eligibilityHi: [
      'दर्जी (Tailor), टोकरी बुनकर, मिट्टी के बर्तन आदि 18 पारंपरिक शिल्पों में कार्यरत महिला।',
      'न्यूनतम आयु 18 वर्ष।',
      'एक परिवार से एक ही सदस्य पात्र।'
    ],
    documentsRequired: [
      'Aadhaar Card (Aadhaar linked mobile number required)',
      'Bank Account Passbook',
      'Ration Card / Family Proof',
      'Skill trade declaration'
    ],
    documentsRequiredTa: [
      'ஆதார் அட்டை (மொபைல் எண் இணைக்கப்பட்டது)',
      'வங்கி கணக்கு புத்தகம்',
      'ரேஷன் கார்டு',
      'தொழில் சார்ந்த சுயவிவரம்'
    ],
    documentsRequiredHi: [
      'आधार कार्ड (मोबाइल लिंक)',
      'बैंक पासबुक',
      'राशन कार्ड',
      'पारंपरिक शिल्प घोषणा'
    ],
    applicationSteps: [
      'Visit nearest Common Services Centre (CSC) or e-Sevai center for biometric registration.',
      'Gram Panchayat / Urban Local Body conducts stage-1 verification.',
      'District Implementation Committee completes stage-2 verification.',
      'Receive Vishwakarma Certificate, ID Card, ₹15,000 toolkit voucher and training schedule.'
    ],
    applicationStepsTa: [
      'அருகில் உள்ள CSC அல்லது இ-சேவை மையத்திற்குச் சென்று பயோமெட்ரிக் பதிவு செய்யவும்.',
      'கிராம பஞ்சாயத்து தலைவர் / நகராட்சி சரிபார்க்கும்.',
      'மாவட்ட குழுவின் ஒப்புதலுக்குப் பின் விஸ்வகர்மா அடையாள அட்டை மற்றும் ₹15,000 உபகரண வவுச்சர் வழங்கப்படும்.'
    ],
    applicationStepsHi: [
      'नजदीकी सीएससी (CSC) या ई-सेवा केंद्र पर जाकर बायोमेट्रिक पंजीकरण करें।',
      'ग्राम पंचायत या नगर निकाय द्वारा प्रथम चरण सत्यापन।',
      'जिला समिति द्वारा अनुमोदन के बाद प्रमाणपत्र, आईडी कार्ड और ₹15,000 टूलकिट वाउचर जारी।'
    ],
    officialUrl: 'https://pmvishwakarma.gov.in',
    verificationDate: 'Verified Official Portal - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Ministry of MSME, Government of India',
    officeOrServiceCenter: 'Common Service Centre (CSC) / District Industries Centre (DIC)',
    officeOrServiceCenterTa: 'CSC பொது சேவை மையம் / மாவட்ட தொழில் மையம் (DIC)',
    officeOrServiceCenterHi: 'कॉमन सर्विस सेंटर (CSC) / जिला उद्योग केंद्र (DIC)',
    helpline: '1800 267 7777',
    badge: '100% Free Toolkit Grant + Stipend',
    badgeTa: '100% இலவச உபகரண மானியம்',
    badgeHi: '100% मुफ्त टूलकिट अनुदान'
  },
  {
    id: 'stand-up-india',
    title: 'Stand-Up India Scheme for Women Entrepreneurs (₹10 Lakh to ₹1 Crore)',
    titleTa: 'ஸ்டாண்ட்-அப் இந்தியா திட்டம் (பெண்கள் பெருந்தொழில் கடன் ₹10 லட்சம் - ₹1 கோடி)',
    titleHi: 'स्टैंड-अप इंडिया योजना (महिला उद्यमी ऋण ₹10 लाख से ₹1 करोड़)',
    department: 'Department of Financial Services / SIDBI, Govt of India',
    departmentTa: 'நிதிச் சேவைகள் துறை / SIDBI',
    departmentHi: 'वित्तीय सेवाएं विभाग / सिडबी, भारत सरकार',
    governmentLevel: 'central',
    category: 'shg_loan',
    isLoan: true,
    benefits: 'Bank loans between ₹10 Lakhs and ₹1 Crore to at least one woman borrower per bank branch for setting up greenfield enterprises in manufacturing, services, or trading.',
    benefitsTa: 'உற்பத்தி, வர்த்தகம் அல்லது சேவைத் துறையில் புதிய தொழில் தொடங்க ₹10 லட்சம் முதல் ₹1 கோடி வரை வங்கிக் கடன்.',
    benefitsHi: 'विनिर्माण, व्यापार या सेवा क्षेत्र में नया व्यवसाय शुरू करने हेतु ₹10 लाख से ₹1 करोड़ तक बैंक ऋण।',
    minAge: 18,
    targetGroup: ['entrepreneur'],
    eligibility: [
      'Women entrepreneurs aged 18 years and above.',
      'Loans under the scheme are available only for greenfield (new) enterprise projects.',
      'In case of non-individual enterprises, 51% shareholding must be held by the woman entrepreneur.'
    ],
    eligibilityTa: [
      '18 வயதுக்கு மேற்பட்ட பெண் தொழில்முனைவோர்.',
      'புதிய தொழில் தொடங்க மட்டுமே (Greenfield) பொருந்தும்.',
      'கூட்டு நிறுவனமாக இருந்தால் 51% பங்கு பெண்ணின் பெயரில் இருக்க வேண்டும்.'
    ],
    eligibilityHi: [
      '18 वर्ष या उससे अधिक आयु की महिला उद्यमी।',
      'केवल नए (ग्रीनफील्ड) प्रोजेक्ट के लिए मान्य।',
      'संयुक्त उपक्रम में 51% हिस्सेदारी महिला के पास अनिवार्य।'
    ],
    documentsRequired: [
      'Aadhaar / Passport / Voter ID',
      'Proof of Residence & Business Address',
      'Project Report with projected cash flows & CMA data',
      'Pollution Clearance / Trade License (if applicable)',
      'Bank Account Statements & IT Returns'
    ],
    documentsRequiredTa: [
      'ஆதார் / பாஸ்போர்ட் / வாக்காளர் அட்டை',
      'முகவரி சான்று & தொழில் நடக்கும் இடத்தின் ஆவணம்',
      'தொழில் திட்ட அறிக்கை (Detailed Project Report)',
      'கடந்த 3 ஆண்டு வருமான வரி கணக்கு (பொருந்துமானால்)'
    ],
    documentsRequiredHi: [
      'आधार / वोटर आईडी / पैन कार्ड',
      'निवास व व्यावसायिक पते का प्रमाण',
      'विस्तृत प्रोजेक्ट रिपोर्ट',
      'बैंक स्टेटमेंट एवं आईटीआर'
    ],
    applicationSteps: [
      'Register on the official Stand-Up Mitra portal (standupmitra.in).',
      'Choose handholding support from lead agencies if needed.',
      'Submit online application with project report to your selected commercial bank branch.',
      'Bank conducts appraisal and sanctions term loan with working capital facility.'
    ],
    applicationStepsTa: [
      'standupmitra.in இணையதளத்தில் பதிவு செய்யவும்.',
      'தொழில் திட்ட அறிக்கையுடன் வங்கி கிளையைத் தேர்வு செய்து விண்ணப்பிக்கவும்.',
      'வங்கி மேலாளர் ஆய்வுக்குப் பின் கடன் அனுமதியளிப்பார்.'
    ],
    applicationStepsHi: [
      'standupmitra.in पोर्टल पर पंजीकरण करें।',
      'प्रोजेक्ट रिपोर्ट के साथ पसंदीदा बैंक शाखा चुनें।',
      'बैंक मूल्यांकन उपरांत सावधि ऋण व कार्यशील पूंजी स्वीकृत करता है।'
    ],
    officialUrl: 'https://www.standupmitra.in',
    verificationDate: 'Verified Official Portal - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'SIDBI & Department of Financial Services, Govt of India',
    officeOrServiceCenter: 'Scheduled Commercial Bank Branches / SIDBI Branch Offices',
    officeOrServiceCenterTa: 'வணிக வங்கிக் கிளைகள் / சிட்பி (SIDBI) கிளை அலுவலகம்',
    officeOrServiceCenterHi: 'अनुसूचित वाणिज्यिक बैंक शाखाएं / सिडबी शाखा',
    helpline: '1800 180 1111',
    badge: 'Large Scale Business Loan',
    badgeTa: 'பெரிய தொழில் கடன் (திருப்பிச் செலுத்த வேண்டியவை)',
    badgeHi: 'बड़ा व्यवसाय ऋण (लौटाने योग्य)'
  },
  {
    id: 'sukanya-samriddhi',
    title: 'Sukanya Samriddhi Yojana (High-Interest Savings for Girl Child)',
    titleTa: 'சுகன்யா சம்ரிதி யோஜனா (செல்வமகள் சேமிப்புத் திட்டம் - 8.2% வட்டி)',
    titleHi: 'सुकन्या समृद्धि योजना (बालिका समृद्धि खाता - 8.2% ब्याज)',
    department: 'Department of Posts / Ministry of Finance, Govt of India',
    departmentTa: 'அஞ்சல் துறை / நிதி அமைச்சகம், இந்திய அரசு',
    departmentHi: 'डाक विभाग / वित्त मंत्रालय, भारत सरकार',
    governmentLevel: 'central',
    category: 'financial_aid',
    isLoan: false,
    benefits: 'High government guaranteed interest rate (8.2% p.a.), EEE tax-exempt status, and financial corpus for higher education and marriage of daughters.',
    benefitsTa: 'ஆண்டுக்கு 8.2% உயர்ந்த அரசு உத்தரவாத வட்டி, வருமான வரி விலக்கு மற்றும் மகளின் எதிர்கால கல்விக்கான சேமிப்பு.',
    benefitsHi: '8.2% वार्षिक ब्याज दर, आयकर धारा 80C के तहत छूट व बालिका के भविष्य हेतु सुरक्षित बचत।',
    targetGroup: ['homemaker', 'rural'],
    eligibility: [
      'Girl child below the age of 10 years.',
      'Account opened by biological parents or legal guardian.',
      'Maximum two girl children per family.'
    ],
    eligibilityTa: [
      '10 வயதுக்கு உட்பட்ட பெண் குழந்தை.',
      'ஒரு குடும்பத்தில் அதிகபட்சம் இரண்டு பெண் குழந்தைகளுக்கு தொடங்கலாம்.'
    ],
    eligibilityHi: [
      '10 वर्ष से कम आयु की बालिका।'
    ],
    documentsRequired: [
      'Birth Certificate of Girl Child',
      'Aadhaar and PAN Card of Parent/Guardian',
      'Address proof and initial deposit (minimum ₹250)'
    ],
    documentsRequiredTa: [
      'குழந்தையின் பிறப்பு சான்றிதழ்',
      'பெற்றோரின் ஆதார் மற்றும் பான் அட்டை',
      'தொடக்க வைப்புத்தொகை குறைந்தபட்சம் ₹250'
    ],
    documentsRequiredHi: [
      'बालिका का जन्म प्रमाण पत्र',
      'माता-पिता का आधार व पैन कार्ड'
    ],
    applicationSteps: [
      'Visit any Post Office branch or authorized nationalized bank.',
      'Submit Form-1 with birth certificate and deposit minimum ₹250.',
      'Passbook provided on the spot.'
    ],
    applicationStepsTa: [
      'அருகில் உள்ள அஞ்சல் அலுவலகம் அல்லது வங்கியில் ₹250 செலுத்தி தொடங்கலாம்.'
    ],
    applicationStepsHi: [
      'नजदीकी डाकघर या बैंक शाखा में न्यूनतम ₹250 से खाता खोलें।'
    ],
    officialUrl: 'https://www.indiapost.gov.in',
    verificationDate: 'Verified Official Post Portal - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'India Post / Ministry of Finance',
    officeOrServiceCenter: 'All Post Offices / Commercial Banks across India',
    officeOrServiceCenterTa: 'அனைத்து அஞ்சல் நிலையங்கள் மற்றும் வங்கிகள்',
    officeOrServiceCenterHi: 'सभी डाकघर एवं वाणिज्यिक बैंक शाखाएं',
    helpline: '1800 266 6868',
    badge: '8.2% Interest Savings',
    badgeTa: '8.2% சேமிப்பு வட்டி',
    badgeHi: '8.2% ब्याज बचत'
  },
  {
    id: 'pm-matru-vandana',
    title: 'Pradhan Mantri Matru Vandana Yojana (PMMVY 2.0)',
    titleTa: 'பிரதம மந்திரி மாத்ரு வந்தனா திட்டம் (PMMVY - கர்ப்பிணி உதவித்தொகை)',
    titleHi: 'प्रधानमंत्री मातृ वंदना योजना (PMMVY - मातृत्व प्रोत्साहन राशि)',
    department: 'Ministry of Women and Child Development, Govt of India',
    departmentTa: 'மகளிர் மற்றும் குழந்தைகள் மேம்பாட்டு அமைச்சகம், இந்திய அரசு',
    departmentHi: 'महिला एवं बाल विकास मंत्रालय, भारत सरकार',
    governmentLevel: 'central',
    category: 'financial_aid',
    isLoan: false,
    benefits: '₹5,000 for first child in two installments + additional ₹6,000 incentive if the second child is a girl to encourage girl child birth and maternal nutrition.',
    benefitsTa: 'முதல் பிரசவத்திற்கு ₹5,000 மற்றும் இரண்டாவது குழந்தை பெண் குழந்தையாக இருப்பின் ₹6,000 நேரடி வங்கி வரவு.',
    benefitsHi: 'प्रथम संतान पर ₹5,000 तथा दूसरी संतान कन्या होने पर ₹6,000 डीबीटी सहायता।',
    minAge: 19,
    targetGroup: ['homemaker', 'rural'],
    eligibility: [
      'Pregnant women and lactating mothers who are not in regular Central/State government employment.',
      'Family holding BPL card, e-Shram card, or Kisan Samman Nidhi registration.'
    ],
    eligibilityTa: [
      'அரசு பணியில் இல்லாத கர்ப்பிணி தாய்மார்கள் மற்றும் பாலூட்டும் தாய்மார்கள்.'
    ],
    eligibilityHi: [
      'गर्भवती एवं धात्री महिलाएं जो नियमित सरकारी सेवा में न हों।'
    ],
    documentsRequired: [
      'Mother and Child Protection (MCP) RCH Card',
      'Aadhaar Card of Husband and Wife',
      'Bank Account Passbook (Aadhaar seeded)'
    ],
    documentsRequiredTa: [
      'MCP தாய்-சேய் நல அட்டை',
      'கணவன் மற்றும் மனைவியின் ஆதார் அட்டை',
      'வங்கி கணக்கு புத்தகம்'
    ],
    documentsRequiredHi: [
      'एमसीपी कार्ड',
      'पति-पत्नी का आधार कार्ड',
      'बैंक पासबुक'
    ],
    applicationSteps: [
      'Enroll at the local Anganwadi Centre or register online on pmmvy.wcd.gov.in.',
      'Direct DBT transfer to the mother’s account.'
    ],
    applicationStepsTa: [
      'அங்கன்வாடி மையம் மூலமாக அல்லது pmmvy.wcd.gov.in போர்ட்டலில் விண்ணப்பிக்கவும்.'
    ],
    applicationStepsHi: [
      'आंगनवाड़ी केंद्र या pmmvy.wcd.gov.in पर पंजीकरण करें।'
    ],
    officialUrl: 'https://pmmvy.wcd.gov.in',
    verificationDate: 'Verified Official WCD Portal - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Ministry of WCD, Govt of India',
    officeOrServiceCenter: 'Local Anganwadi Centre / Primary Health Centre (PHC)',
    officeOrServiceCenterTa: 'அங்கன்வாடி மையம் / அரசு ஆரம்ப சுகாதார நிலையம்',
    officeOrServiceCenterHi: 'स्थानीय आंगनवाड़ी केंद्र / प्राथमिक स्वास्थ्य केंद्र',
    helpline: '181 / 011-23382393',
    badge: 'National Maternity Benefit',
    badgeTa: 'தேசிய மகப்பேறு உதவி',
    badgeHi: 'राष्ट्रीय मातृत्व लाभ'
  },
  {
    id: 'pm-ujjwala',
    title: 'Pradhan Mantri Ujjwala Yojana 2.0 (Free LPG Cooking Connection)',
    titleTa: 'பிரதம மந்திரி உஜ்வாலா திட்டம் 2.0 (இலவச சமையல் எரிவாயு இணைப்பு)',
    titleHi: 'प्रधानमंत्री उज्ज्वला योजना 2.0 (मुफ्त गैस कनेक्शन)',
    department: 'Ministry of Petroleum and Natural Gas, Govt of India',
    departmentTa: 'பெட்ரோலியம் மற்றும் இயற்கை எரிவாயு அமைச்சகம், இந்திய அரசு',
    departmentHi: 'पेट्रोलियम एवं प्राकृतिक गैस मंत्रालय, भारत सरकार',
    governmentLevel: 'central',
    category: 'equipment',
    isLoan: false,
    benefits: 'Deposit-free LPG connection, free first cylinder refill, free hotplate stove, and ongoing ₹300/cylinder subsidy directly deposited via DBT.',
    benefitsTa: 'வைப்புத்தொகை இல்லாத இலவச எரிவாயு இணைப்பு, இலவச முதல் சிலிண்டர், இலவச அடுப்பு மற்றும் தொடர் மானியம்.',
    benefitsHi: 'बिना सिक्योरिटी डिपॉजिट नया गैस कनेक्शन, मुफ्त पहला सिलेंडर व चूल्हा तथा ₹300 सब्सिडी।',
    minAge: 18,
    targetGroup: ['homemaker', 'rural', 'dropout'],
    freeEquipment: 'LPG Regulator, Safety Hose & Single/Double Burner Gas Stove',
    freeEquipmentTa: 'எரிவாயு ஒழுங்குபடுத்தி (Regulator) மற்றும் இலவச கேஸ் அடுப்பு',
    freeEquipmentHi: 'एलपीजी रेगुलेटर एवं गैस चूल्हा',
    eligibility: [
      'Adult woman from poor rural BPL household having no existing LPG connection in the family.'
    ],
    eligibilityTa: [
      'குடும்பத்தில் வேறு எரிவாயு இணைப்பு இல்லாத 18 வயது நிரம்பிய பெண்.'
    ],
    eligibilityHi: [
      '18 वर्ष से अधिक आयु की बीपीएल परिवार की महिला।'
    ],
    documentsRequired: [
      'Ration Card / Family Composition Certificate',
      'Aadhaar Card of all adult family members',
      'Bank Account Passbook'
    ],
    documentsRequiredTa: [
      'ரேஷன் கார்டு',
      'குடும்ப உறுப்பினர்களின் ஆதார் அட்டை',
      'வங்கி கணக்கு புத்தகம்'
    ],
    documentsRequiredHi: [
      'राशन कार्ड',
      'आधार कार्ड',
      'बैंक पासबुक'
    ],
    applicationSteps: [
      'Apply at nearest Indane, Bharat Gas, or HP Gas distributor or online on pmuy.gov.in.',
      'Free connection and stove installed within 7 days.'
    ],
    applicationStepsTa: [
      'அருகில் உள்ள கேஸ் ஏஜென்சியில் அல்லது pmuy.gov.in இணையதளத்தில் விண்ணப்பிக்கவும்.'
    ],
    applicationStepsHi: [
      'नजदीकी गैस एजेंसी या pmuy.gov.in पर आवेदन करें।'
    ],
    officialUrl: 'https://www.pmuy.gov.in',
    verificationDate: 'Verified Official Portal - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Ministry of Petroleum & Natural Gas',
    officeOrServiceCenter: 'Any authorized Indane / HP / Bharatgas Distributor',
    officeOrServiceCenterTa: 'அங்கீகரிக்கப்பட்ட இண்டேன் / பாரத் / HP கேஸ் ஏஜென்சி',
    officeOrServiceCenterHi: 'अधिकृत एलपीजी गैस वितरक एजेंसी',
    helpline: '1800 266 6696 / 1906',
    badge: '100% Free LPG Connection',
    badgeTa: '100% இலவச எரிவாயு இணைப்பு',
    badgeHi: '100% मुफ्त गैस कनेक्शन'
  },
  {
    id: 'mahila-samman-savings',
    title: 'Mahila Samman Savings Certificate (MSSC - 7.5% Interest)',
    titleTa: 'மகிளா சம்மான் சேமிப்பு பத்திரம் (7.5% உத்தரவாத வட்டி)',
    titleHi: 'महिला सम्मान बचत प्रमाणपत्र (7.5% निश्चित ब्याज)',
    department: 'Department of Economic Affairs / Ministry of Finance, Govt of India',
    departmentTa: 'பொருளாதார விவகாரங்கள் துறை, நிதி அமைச்சகம்',
    departmentHi: 'आर्थिक कार्य विभाग, वित्त मंत्रालय, भारत सरकार',
    governmentLevel: 'central',
    category: 'financial_aid',
    isLoan: false,
    benefits: '2-year sovereign guaranteed fixed deposit scheme offering attractive 7.5% compounded interest with 40% partial withdrawal facility after 1 year.',
    benefitsTa: 'பெண்களுக்கான 2 ஆண்டு சேமிப்பு திட்டம். ஆண்டுக்கு 7.5% கூட்டு வட்டி மற்றும் 1 ஆண்டுக்கு பின் 40% பணத்தை எடுக்கும் வசதி.',
    benefitsHi: 'महिलाओं हेतु 2 वर्षीय सावधि जमा योजना। 7.5% चक्रवृद्धि ब्याज एवं 1 वर्ष बाद 40% निकासी सुविधा।',
    targetGroup: ['homemaker', 'entrepreneur', 'rural', 'student'],
    eligibility: [
      'Any woman or girl citizen (or guardian on behalf of minor girl).',
      'Investment amount between ₹1,000 and ₹2,00,000.'
    ],
    eligibilityTa: [
      'அனைத்து பெண்கள் மற்றும் பெண் குழந்தைகள் பெயரில் தொடங்கலாம். முதலீடு ₹1,000 முதல் ₹2 லட்சம் வரை.'
    ],
    eligibilityHi: [
      'कोई भी महिला या बालिका। निवेश राशि ₹1,000 से ₹2,00,000 तक।'
    ],
    documentsRequired: [
      'Aadhaar Card and PAN Card',
      'Deposit Amount (Cash/Cheque)',
      'Passport size photograph'
    ],
    documentsRequiredTa: [
      'ஆதார் அட்டை மற்றும் பான் அட்டை',
      'புகைப்படம்'
    ],
    documentsRequiredHi: [
      'आधार कार्ड व पैन कार्ड',
      'पासपोर्ट फोटो'
    ],
    applicationSteps: [
      'Open account at any Post Office or nationalized bank branch by submitting Application Form-1.',
      'Certificate issued on the spot.'
    ],
    applicationStepsTa: [
      'அருகில் உள்ள அஞ்சல் அலுவலகம் அல்லது பொதுத்துறை வங்கிகளில் நேரடியாக தொடங்கலாம்.'
    ],
    applicationStepsHi: [
      'किसी भी डाकघर या राष्ट्रीयकृत बैंक में आवेदन करें।'
    ],
    officialUrl: 'https://www.indiapost.gov.in',
    verificationDate: 'Verified Official Govt Notification - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Ministry of Finance, Govt of India',
    officeOrServiceCenter: 'All Head Post Offices & Sub-Post Offices / Nationalized Banks',
    officeOrServiceCenterTa: 'அனைத்து அஞ்சல் நிலையங்கள் மற்றும் அரசு வங்கிகள்',
    officeOrServiceCenterHi: 'सभी डाकघर एवं राष्ट्रीयकृत बैंक',
    helpline: '1800 266 6868',
    badge: '7.5% Sovereign Guarantee Deposit',
    badgeTa: '7.5% அரசு உத்தரவாத சேமிப்பு',
    badgeHi: '7.5% सुरक्षित जमा योजना'
  }
];
