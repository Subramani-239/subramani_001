/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProblemCircle, ProblemDiscussionThread } from '../types';

export const initialProblemCircles: ProblemCircle[] = [
  // =========================================================================
  // PUDUCHERRY CIRCLES
  // =========================================================================
  {
    id: 'circle-pondy-education-reentry',
    name: 'Puducherry Discontinued Studies & Open Schooling Circle',
    nameTa: 'புதுச்சேரி இடைநின்ற படிப்பு & தொலைதூர கல்வி வழிகாட்டுதல் வட்டம்',
    nameHi: 'पुदुचेरी अधूरी पढ़ाई और मुक्त विद्यालय सहायता समूह',
    category: 'education_restart',
    region: 'puducherry',
    district: 'Puducherry',
    districtTa: 'புதுச்சேரி',
    districtHi: 'पुदुचेरी',
    isPrivate: false,
    description: 'A dedicated sisterhood for women in Puducherry who discontinued Class 10, 12, or college and need peer guidance on NIOS, Kamarajar Scholarship grants, and affordable degree re-enrollment.',
    descriptionTa: '10, 12-ஆம் வகுப்பு அல்லது கல்லூரியில் பாதியில் நின்ற புதுச்சேரி பெண்கள் மீண்டும் படிக்கவும், காமராஜர் கல்வி உதவித்தொகை பெறவும் உதவும் தோழிகள் குழு.',
    descriptionHi: 'पुदुचेरी की महिलाओं के लिए एनआईओएस और उच्च शिक्षा पुन: प्रवेश हेतु सहकर्मी सहायता समूह।',
    icon: 'GraduationCap',
    activeProblem: 'How to re-appear for 12th state board private exam vs NIOS while managing household duties in Muthialpet & Lawspet.',
    activeProblemTa: 'முத்தியால்பேட்டை, லாஸ்பேட்டை பகுதியில் குடும்ப வேலைகளுடன் 12ஆம் வகுப்பு தனித்தேர்வு எழுதுவது எப்படி?',
    activeProblemHi: 'मुथियालपेट में घरेलू जिम्मेदारियों के साथ 12वीं की परीक्षा कैसे दें?',
    memberCount: 84,
    solvedCount: 29,
    tags: ['NIOS', '10th/12th Restart', 'Kamarajar Grant', 'Puducherry'],
    resources: [
      {
        id: 'res-nios-pondy',
        title: 'NIOS Puducherry Regional Study Center & Registration Desk',
        titleTa: 'புதுச்சேரி என்.ஐ.ஓ.எஸ் மண்டல மையம் & சேர்க்கை மையம்',
        titleHi: 'एनआईओएस पुदुचेरी अध्ययन केंद्र व पंजीकरण डेस्क',
        type: 'office',
        contactOrLink: 'Saradha Gangadharan College / Kendriya Vidyalaya Center (Tel: 0413-2200140)',
        note: 'Open Mon-Fri 10 AM to 4 PM for admission document verification (Class 10 mark sheet, Transfer Certificate).',
        noteTa: 'திங்கள்-வெள்ளி காலை 10 முதல் 4 மணி வரை சேர்க்கை மற்றும் சான்றிதழ் சரிபார்ப்பு.',
        noteHi: 'सोम-शुक्र सुबह 10 से शाम 4 बजे तक प्रवेश व दस्तावेज़ सत्यापन हेतु संपर्क करें।'
      },
      {
        id: 'res-scholarship-pondy',
        title: 'Perunthalaivar Kamarajar Higher Education Financial Assistance Portal',
        titleTa: 'பெருந்தலைவர் காமராஜர் உயர்கல்வி நிதி உதவி திட்ட இணையதளம்',
        titleHi: 'पेरुंथलैवर कामराजार उच्च शिक्षा वित्तीय सहायता पोर्टल',
        type: 'portal',
        contactOrLink: 'https://dhte.py.gov.in',
        note: 'Covers up to ₹25,000 yearly college tuition fees for sponsored students of Puducherry UT.',
        noteTa: 'புதுச்சேரி மாணவிகளுக்கு ஆண்டுக்கு ₹25,000 வரை கல்லூரி கட்டண உதவித்தொகை வழங்கப்படுகிறது.',
        noteHi: 'पुदुचेरी की छात्राओं के लिए प्रतिवर्ष ₹25,000 तक की कॉलेज फीस सहायता।'
      }
    ],
    sharedExperiences: [
      {
        id: 'exp-pondy-1',
        authorAlias: 'Sister Vani (Lawspet)',
        location: 'Lawspet, Puducherry',
        title: 'Passed 12th at Age 27 While Raising My 4-Year-Old Son',
        titleTa: '4 வயது குழந்தையை கவனித்துக் கொண்டே 27 வயதில் 12-ஆம் வகுப்பை வென்ற கதை',
        titleHi: '4 साल के बेटे की देखभाल के साथ 27 साल की उम्र में 12वीं पास की',
        story: 'I stopped schooling after 10th standard in 2017 due to early marriage. When my husband faced wage cuts, I realized education was my only permanent shield. Through this circle, Sister Vasanthi helped me select 5 NIOS subjects with home tutor materials. I studied 1.5 hours every night after my son slept. In October exams, I scored 68%!',
        storyTa: '2017-ல் திருமணம் காரணமாக 10-ஆம் வகுப்புடன் என் படிப்பு நின்றது. என் கணவருக்கு வேலை குறைந்தபோது கல்வி மட்டுமே நிரந்தர பாதுகாப்பு என்பதை உணர்ந்தேன். இந்த தோழிகள் வட்டம் மூலம் என்.ஐ.ஓ.எஸ்-ல் 5 பாடங்கள் எடுத்து இரவில் படித்தேன். 68% மதிப்பெண் பெற்று தேர்ச்சி அடைந்தேன்!',
        storyHi: 'शादी के बाद पढ़ाई छूट गई थी। इस सर्कल की मदद से मैंने रात में 1.5 घंटे पढ़कर एनआईओएस से 12वीं में 68% अंक हासिल किए।',
        outcome: 'Enrolled in B.Com distance education; now working as an accounts assistant in Gorimedu.',
        outcomeTa: 'தற்போது தொலைதூரக் கல்வியில் பி.காம் படித்துக்கொண்டு அக்கவுண்ட்ஸ் உதவியாளராக பணிபுரிகிறேன்.',
        outcomeHi: 'अब बी.कॉम कर रही हूं और ऑफिस में अकाउंट्स असिस्टेंट के रूप में काम कर रही हूं।',
        date: '3 weeks ago'
      }
    ]
  },
  {
    id: 'circle-pondy-shg-capital',
    name: 'Puducherry Women Direct Producer & Marketing Collective',
    nameTa: 'புதுச்சேரி மகளிர் நேரடி உற்பத்தியாளர்கள் & சந்தை கூட்டுறவு வட்டம்',
    nameHi: 'पुदुचेरी महिला उत्पादक एवं प्रत्यक्ष बाज़ार संघ',
    category: 'shg_collective',
    region: 'puducherry',
    district: 'Puducherry',
    districtTa: 'புதுச்சேரி',
    districtHi: 'पुदुचेरी',
    isPrivate: false,
    description: 'Mutual support group for women self-help groups and homemaker artisans across Puducherry to access government exhibition stalls, PONDIVEDA revolving support grants, and direct consumer sales.',
    descriptionTa: 'புதுச்சேரி மகளிர் சுய உதவி குழுக்கள் மற்றும் கலைஞர்கள் அரசு கண்காட்சி அரங்குகள் மற்றும் PONDIVEDA சுழல் நிதி உதவி பெற வழிகாட்டும் வட்டம்.',
    descriptionHi: 'पुदुचेरी स्वयं सहायता समूहों के लिए सरकारी प्रदर्शनियों में स्टॉल और सीधे बिक्री का मंच।',
    icon: 'Store',
    activeProblem: 'Getting allotted free sales stalls at Gandhi Thidal Sunday Artisan Bazaar without paying unauthorized broker fees.',
    activeProblemTa: 'காந்தி திடல் ஞாயிறு கைவினை சந்தையில் இடைத்தரகர்கள் இன்றி இலவச விற்பனை அரங்கு பெறுவது எப்படி?',
    activeProblemHi: 'गांधी थिडल संडे बाज़ार में बिना बिचौलियों के निःशुल्क स्टॉल कैसे प्राप्त करें?',
    memberCount: 112,
    solvedCount: 46,
    tags: ['SHG Collective', 'PONDIVEDA', 'Gandhi Thidal', 'Fair Market'],
    resources: [
      {
        id: 'res-pondiveda-office',
        title: 'Puducherry State Rural Livelihood Mission (PONDIVEDA) Directorate',
        titleTa: 'புதுச்சேரி மாநில ஊரக வாழ்வாதார இயக்கம் (PONDIVEDA) அலுவலகம்',
        titleHi: 'पुदुचेरी ग्रामीण आजीविका मिशन निदेशालय',
        type: 'office',
        contactOrLink: 'DRDA Complex, Thattanchavady, Puducherry (Tel: 0413-2248551)',
        note: 'Assists with group registration, revolving fund grants, and free government exhibition stall passes.',
        noteTa: 'குழு பதிவு, சுழல் நிதி மானியம் மற்றும் இலவச கண்காட்சி அரங்கு அனுமதிகளுக்கு அணுகவும்.',
        noteHi: 'समूह पंजीकरण, अनुदान व निःशुल्क स्टॉल पास हेतु संपर्क करें।'
      }
    ],
    sharedExperiences: [
      {
        id: 'exp-pondiveda-1',
        authorAlias: 'Sister Bhavani (Oulgaret)',
        location: 'Oulgaret, Puducherry',
        title: 'Booked Free Stall at Beach Promenade Bazaar Without Brokers',
        titleTa: 'இடைத்தரகரின்றி கடற்கரை சாலையில் இலவச கைவினை அரங்கு அமைத்தோம்',
        titleHi: 'बिचौलियों के बिना बीच रोड पर निःशुल्क स्टॉल लगाया',
        story: 'Brokers in our area wanted ₹1,500 per day for a festival stall. We 6 sisters combined our handmade clay diyas and fabric pouches, drafted a joint letter using the format from this circle, and met the Project Director directly at DRDA. Within 3 days, we received a verified stall pass for 0 rupees!',
        storyTa: 'திருவிழா அரங்குக்கு ₹1,500 கேட்டார்கள். நாங்கள் 6 பெண்கள் ஒன்றுசேர்ந்து இந்த வட்டத்தில் உள்ள கடித மாதிரியை பயன்படுத்தி DRDA திட்ட இயக்குநரை நேரடியாக சந்தித்தோம். கட்டணமின்றி இலவச அரங்கு கிடைத்தது!',
        storyHi: 'हमने मिलकर सीधे सरकारी अधिकारी को आवेदन दिया और ₹0 में निःशुल्क स्टॉल पास प्राप्त किया।',
        outcome: 'Sold ₹26,000 worth of craft items in 2 days and divided profits equally.',
        outcomeTa: '2 நாட்களில் ₹26,000 மதிப்புள்ள கைவினைப் பொருட்களை விற்று லாபத்தை சமமாகப் பிரித்துக் கொண்டோம்.',
        outcomeHi: '2 दिनों में ₹26,000 की बिक्री हुई और सारा मुनाफा बहनों ने आपस में साझा किया।',
        date: '1 month ago'
      }
    ]
  },
  {
    id: 'circle-karaikal-tailoring-orders',
    name: 'Karaikal Home Tailors & Fair Stitching Syndicate',
    nameTa: 'காரைக்கால் தையல் கலைஞர் & நியாயமான கூலி தோழிகள் வட்டம்',
    nameHi: 'काराइकल महिला दर्जी एवं उचित मजदूरी समूह',
    category: 'livelihood_wages',
    region: 'puducherry',
    district: 'Karaikal',
    districtTa: 'காரைக்கால்',
    districtHi: 'काराइकल',
    isPrivate: false,
    description: 'Collective of home-based tailors in Karaikal uniting to negotiate fair piece-rates from uniform contractors and share bulk school uniform orders directly without middlemen cuts.',
    descriptionTa: 'காரைக்காலில் இடைத்தரகர்கள் இல்லாமல் பள்ளி சீருடை மற்றும் பிளவுஸ் ஆர்டர்களை நேரடியாக நியாயமான கூலிக்கு எடுக்கும் தையல் கலைஞர்கள் வட்டம்.',
    descriptionHi: 'बिचौलियों के बिना सीधे स्कूल यूनिफॉर्म और ब्लाउज ऑर्डर लेने वाले गृह दर्जी।',
    icon: 'Scissors',
    activeProblem: 'Contractors offering only ₹45 per school uniform shirt while fabric stitching requires ₹110 for decent livelihood.',
    activeProblemTa: 'பள்ளி சீருடை சட்டை தைக்க ₹45 மட்டுமே கூலி தருகிறார்கள்; நியாயமான ₹110 கூலி பெற ஒன்றுபடுவோம்.',
    activeProblemHi: 'स्कूल शर्ट सिलाई का ₹45 मिल रहा है, जबकि उचित मजदूरी ₹110 होनी चाहिए।',
    memberCount: 67,
    solvedCount: 22,
    tags: ['Tailoring', 'Fair Wage', 'School Uniforms', 'Karaikal'],
    resources: [
      {
        id: 'res-karaikal-dic',
        title: 'Karaikal District Industries Centre (DIC) Stitching Cluster Desk',
        titleTa: 'காரைக்கால் மாவட்ட தொழில் மையம் (DIC) தையல் பிரிவு',
        titleHi: 'काराइकल जिला उद्योग केंद्र',
        type: 'office',
        contactOrLink: 'Kamarajar Salai, Karaikal (Tel: 04368-222416)',
        note: 'Provides modern motor attachments and free government toolkit upgrade vouchers.',
        noteTa: 'இலவச நவீன மோட்டார் உபகரணங்கள் மற்றும் தையல் கருவித்தொகுப்பு உதவி.',
        noteHi: 'निःशुल्क मोटर और सिलाई उपकरण अपग्रेड वाउचर।'
      }
    ],
    sharedExperiences: [
      {
        id: 'exp-karaikal-1',
        authorAlias: 'Master Tailor Fatima',
        location: 'Kamarajar Salai, Karaikal',
        title: 'Bypassed Contractor to Secure 150 School Pinafores Directly',
        titleTa: 'இடைத்தரகரை தவிர்த்து 150 பள்ளி சீருடைகளை நேரடியாக ஒப்பந்தம் செய்தோம்',
        titleHi: 'स्कूल से सीधे 150 यूनिफॉर्म का ऑर्डर प्राप्त किया',
        story: 'A middleman was taking ₹70 cut per uniform. Three of us from this circle approached the school headmistress with finished sample shirts and neat overlock stitching. She approved on the spot at full ₹115 per piece.',
        storyTa: 'இடைத்தரகர் சீருடைக்கு ₹70 கமிஷன் பிடித்தார். நாங்கள் 3 தையல் சகோதரிகள் தலைமை ஆசிரியரிடம் மாதிரி ஆடைகளை காண்பித்து ஆடைக்கு ₹115 வீதம் முழு கூலியை பெற்றுக்கொண்டோம்.',
        storyHi: 'हमने स्कूल प्रबंधन को सीधे सैंपल दिखाए और प्रति ड्रेस ₹115 का पूरा मेहनताना मिला।',
        outcome: 'Earned ₹17,250 net income in 10 days of cooperative work.',
        outcomeTa: '10 நாட்களில் ₹17,250 நிகர வருமானத்தை ஈட்டினோம்.',
        outcomeHi: '10 दिनों में ₹17,250 की बचत और आय हुई।',
        date: '2 weeks ago'
      }
    ]
  },
  {
    id: 'circle-pondy-legal-maintenance',
    name: 'Puducherry Single Women & Legal Rights Protection',
    nameTa: 'புதுச்சேரி தனித்து வாழும் பெண்கள் & ஜீவனாம்ச சட்ட உதவி வட்டம்',
    nameHi: 'पुदुचेरी एकल महिला एवं कानूनी भरण-पोषण सहायता समूह',
    category: 'safety_rights',
    region: 'puducherry',
    district: 'Puducherry',
    districtTa: 'புதுச்சேரி',
    districtHi: 'पुदुचेरी',
    isPrivate: true,
    description: 'A safe, confidential space for deserted, widowed, and single mothers in Puducherry to connect with Free Legal Aid Services (Puducherry SLSA) and destitute widow pension guidance.',
    descriptionTa: 'கணவரால் கைவிடப்பட்டோர், விதவை பெண்கள் இலவச சட்ட உதவி (Puducherry SLSA) மற்றும் அரசு உதவித்தொகை பெற வழிகாட்டும் பாதுகாப்பான வட்டம்.',
    descriptionHi: 'पुदुचेरी राज्य कानूनी सेवा प्राधिकरण के माध्यम से निःशुल्क कानूनी सहायता और विधवा पेंशन।',
    icon: 'Scale',
    activeProblem: 'Filing Section 125 CrPC maintenance petition without funds for private advocates in Puducherry Integrated Court Complex.',
    activeProblemTa: 'புதுச்சேரி நீதிமன்றத்தில் வழக்கறிஞர் கட்டணமின்றி இலவச சட்ட உதவி ஆணையம் மூலம் ஜீவனாம்சம் பெறுவது எப்படி?',
    activeProblemHi: 'पुदुचेरी कोर्ट में निःशुल्क कानूनी सहायता वकील कैसे नियुक्त करें?',
    memberCount: 53,
    solvedCount: 18,
    tags: ['Legal Aid', 'Maintenance', 'Widow Pension', 'Confidential'],
    resources: [
      {
        id: 'res-slsa-pondy',
        title: 'Puducherry State Legal Services Authority (Free Advocate Assignment)',
        titleTa: 'புதுச்சேரி மாநில சட்டப் பணிகள் ஆணைக்குழு (இலவச வழக்கறிஞர்)',
        titleHi: 'पुदुचेरी राज्य विधिक सेवा प्राधिकरण',
        type: 'office',
        contactOrLink: 'Integrated Court Buildings, Lal Bahadur Shastri St, Puducherry (Helpline: 15100 / 0413-2338833)',
        note: 'Women are statutorily entitled to 100% free advocate representation for maintenance and domestic safety cases regardless of income.',
        noteTa: 'வருமான வரம்பின்றி பெண்களுக்கு முற்றிலும் இலவச வழக்கறிஞர் உதவி வழங்க சட்டம் வழிவகை செய்கிறது.',
        noteHi: 'महिलाओं के लिए बिना किसी फीस के 100% निःशुल्क सरकारी वकील उपलब्ध कराया जाता है।'
      }
    ]
  },

  // =========================================================================
  // TAMIL NADU CIRCLES
  // =========================================================================
  {
    id: 'circle-chennai-slum-education',
    name: 'North Chennai & Tambaram Discontinued Degree Re-Entry',
    nameTa: 'வடசென்னை & தாம்பரம் கல்லூரி இடைநின்ற மாணவிகள் மீட்பு வட்டம்',
    nameHi: 'उत्तरी चेन्नई कॉलेज ड्रॉपआउट री-एंट्री सहायता समूह',
    category: 'education_restart',
    region: 'tamil_nadu',
    district: 'Chennai',
    districtTa: 'சென்னை',
    districtHi: 'चेन्नई',
    isPrivate: false,
    description: 'Helping young women across Chennai who dropped out of engineering or arts colleges due to early marriage or family hardship to register for University of Madras IDE or Tamil Nadu Open University (TNOU).',
    descriptionTa: 'குடும்ப சூழல் காரணமாக கல்லூரியில் பாதியில் நின்ற வடசென்னை பெண்கள் மெட்ராஸ் பல்கலைக்கழக தொலைதூர கல்வி (IDE) அல்லது TNOU மூலம் பட்டப்படிப்பை முடிக்க உதவும் வட்டம்.',
    descriptionHi: 'चेन्नई की उन युवतियों के लिए समूह जो मद्रास विश्वविद्यालय दूरस्थ शिक्षा के माध्यम से डिग्री पूरी करना चाहती हैं।',
    icon: 'BookOpen',
    activeProblem: 'Getting original marksheets back from private self-financing colleges holding certificates over pending semester fees.',
    activeProblemTa: 'கல்லூரியில் நிலுவை கட்டணம் கேட்டு சான்றிதழ்களை தடுத்து வைப்பதை எதிர்த்து பாரதிதாசன்/மெட்ராஸ் பல்கலையில் முறையிடுவது எப்படி?',
    activeProblemHi: 'कॉलेज द्वारा रोकी गई मूल मार्कशीट वापस प्राप्त करने के कानूनी रास्ते।',
    memberCount: 139,
    solvedCount: 54,
    tags: ['Madras University IDE', 'TNOU', 'Degree Completion', 'Chennai'],
    resources: [
      {
        id: 'res-tnou-chennai',
        title: 'Tamil Nadu Open University (TNOU) Student Support Cell',
        titleTa: 'தமிழ்நாடு திறந்தநிலைப் பல்கலைக்கழகம் (TNOU) மாணவர் உதவி மையம்',
        titleHi: 'तमिलनाडु मुक्त विश्वविद्यालय छात्र सहायता प्रकोष्ठ',
        type: 'portal',
        contactOrLink: 'https://tnou.ac.in (Saidapet, Chennai, Tel: 044-24306600)',
        note: 'Offers credit transfer and flexible weekend classes for degree dropouts.',
        noteTa: 'பாதியில் நின்ற படிப்பை தொடர கிரெடிட் டிரான்ஸ்பர் மற்றும் வார இறுதி வகுப்புகள்.',
        noteHi: 'क्रेडिट ट्रांसफर और सप्ताहांत कक्षाओं की सुविधा।'
      }
    ]
  },
  {
    id: 'circle-madurai-shg-business',
    name: 'Madurai & Dindigul Flower & Street Vendors Collective',
    nameTa: 'மதுரை & திண்டுக்கல் மல்லிகை & சிறுவியாபாரிகள் நேரடி கூட்டு வட்டம்',
    nameHi: 'मदुरै एवं डिंडीगुल फूल व फल-सब्जी विक्रेता प्रत्यक्ष संघ',
    category: 'livelihood_wages',
    region: 'tamil_nadu',
    district: 'Madurai',
    districtTa: 'மதுரை',
    districtHi: 'मदुरै',
    isPrivate: false,
    description: 'Madurai daily street vendors and flower sellers joining forces for bulk direct wholesale sourcing and collective peer savings to maintain stable independent livelihoods.',
    descriptionTa: 'மதுரை மாட்டுத்தாவணி மற்றும் பூச்சந்தை சிறு வியாபாரிகள் நேரடியாக மொத்த விலையில் கொள்முதல் செய்து சுயமரியாதையுடன் வாழ உதவும் தோழிகள் சங்கம்.',
    descriptionHi: 'मदुरै की फूल और सब्जी विक्रेताओं को थोक दर पर सीधी खरीद और आपसी सहयोग मंच।',
    icon: 'TrendingUp',
    activeProblem: 'Direct collective morning procurement from farmers to bypass multi-tier commission agents at Mattuthavani market.',
    activeProblemTa: 'மாட்டுத்தாவணி பூச்சந்தையில் இடைத்தரகர் கமிஷனை தவிர்க்க விவசாயிகளிடம் நேரடியாக மொத்தமாக கொள்முதல் செய்வது எப்படி?',
    activeProblemHi: 'माट्टुथावनी बाज़ार में बिचौलियों का कमीशन हटाकर सीधे किसानों से खरीद।',
    memberCount: 98,
    solvedCount: 41,
    tags: ['Direct Sourcing', 'Flower Vendors', 'Madurai', 'Fair Trade'],
    resources: [
      {
        id: 'res-madurai-tnsrlm',
        title: 'Tamil Nadu Urban Livelihoods Mission (TNULM) Madurai Corporation Desk',
        titleTa: 'தமிழ்நாடு நகர்ப்புற வாழ்வாதார இயக்கம் (TNULM) மதுரை மாநகராட்சி',
        titleHi: 'तमिलनाडु शहरी आजीविका मिशन मदुरै',
        type: 'office',
        contactOrLink: 'Aringnar Anna Maligai, Madurai Corporation (Tel: 0452-2531601)',
        note: 'Issues official street vendor ID cards preventing eviction and granting access to municipal vending zones.',
        noteTa: 'வியாபாரிகளுக்கான அதிகாரப்பூர்வ அடையாள அட்டை மற்றும் விற்பனை மண்டல அனுமதி.',
        noteHi: 'स्ट्रीट वेंडर पहचान पत्र और सुरक्षित वेंडिंग ज़ोन आवंटन।'
      }
    ]
  },
  {
    id: 'circle-tiruppur-coimbatore-tailors',
    name: 'Tiruppur & Coimbatore Raw Fabric & Yarn Collective Sourcing',
    nameTa: 'திருப்பூர் & கோவை துணி & நூல் மொத்த கொள்முதல் தோழிகள் சங்கம்',
    nameHi: 'तिरुपुर एवं कोयंबटूर थोक कपड़ा खरीद व दर्जी मंच',
    category: 'raw_material_sourcing',
    region: 'tamil_nadu',
    district: 'Coimbatore',
    districtTa: 'கோயம்புத்தூர்',
    districtHi: 'कोयंबटूर',
    isPrivate: false,
    description: 'A collective of 180+ home contract stitchers and export garment workers in Tiruppur and Coimbatore pooling purchasing power to buy wholesale fabric rolls directly from mills.',
    descriptionTa: 'திருப்பூர் பனியன் & ஆயத்த ஆடை தையல் பெண்கள் ஆலைகளிடம் இருந்து நேரடியாக மொத்தமாக துணி ரோல்களை குறைந்த விலையில் வாங்கும் கூட்டு தளம்.',
    descriptionHi: 'तिरुपुर में घर से सिलाई करने वाली महिलाओं के लिए मिलों से सीधे थोक कपड़ा खरीद।',
    icon: 'Package',
    activeProblem: 'Purchasing 100% cotton knit fabric rolls together in wholesale bulk to save ₹70/kg compared to local retail cut-pieces.',
    activeProblemTa: 'தனித்தனியாக வாங்காமல் 10 பெண்கள் இணைந்து மொத்தமாக துணி ரோல்களை வாங்கி கிலோவுக்கு ₹70 மிச்சப்படுத்துவோம்.',
    activeProblemHi: 'थोक दर पर कपड़ा खरीदकर लागत में प्रति किलो ₹70 बचाने की संयुक्त पहल।',
    memberCount: 182,
    solvedCount: 68,
    tags: ['Garment Export', 'Bulk Sourcing', 'Tiruppur', 'Raw Material'],
    resources: [
      {
        id: 'res-tiruppur-hub',
        title: 'Tiruppur Rayapuram Wholesale Knitwear Fabric Hub',
        titleTa: 'திருப்பூர் ராயபுரம் மொத்த பனியன் துணி சந்தை',
        titleHi: 'तिरुपुर रायपुरम थोक कपड़ा बाज़ार',
        type: 'guide',
        contactOrLink: 'Rayapuram Main Road, Tiruppur (Benchmark: ₹180-₹240/kg for combed cotton rolls)',
        note: 'Group purchasing in minimum 50 kg rolls gets factory ex-mill prices.',
        noteTa: '50 கிலோ ரோல்களாக கூட்டாக வாங்கும்போது ஆலை நேரடி மொத்த விலை கிடைக்கும்.',
        noteHi: 'न्यूनतम 50 किलो के रोल में समूह खरीद पर फैक्टरी दर मिलती है।'
      }
    ]
  },
  {
    id: 'circle-salem-handloom-weavers',
    name: 'Salem & Erode Handloom Sisters & Cooperative Welfare',
    nameTa: 'சேலம் & ஈரோடு கைத்தறி நெசவு பெண்கள் நலவாரிய உரிமை வட்டம்',
    nameHi: 'सलेम एवं इरोड हथकरघा बुनकर महिला कल्याण मंच',
    category: 'shg_collective',
    region: 'tamil_nadu',
    district: 'Salem',
    districtTa: 'சேலம்',
    districtHi: 'सलेम',
    isPrivate: false,
    description: 'Women weavers in Salem, Jalakandapuram, and Erode advocating for fair piece-rate passbook entries and enrollment in the Tamil Nadu Handloom Weavers Welfare Board.',
    descriptionTa: 'சேலம் கைத்தறி சேலை நெசவு செய்யும் பெண்கள் நலவாரிய அட்டை பெற்று ஓய்வூதியம், கல்வி உதவித்தொகை பெற வழிகாட்டும் வட்டம்.',
    descriptionHi: 'सलेम हथकरघा बुनकर कल्याण बोर्ड में पंजीकरण और सामाजिक सुरक्षा लाभ।',
    icon: 'Shirt',
    activeProblem: 'Master weavers keeping passbooks in their custody, preventing women weavers from registering directly with Tamil Nadu Weavers Welfare Board.',
    activeProblemTa: 'மாஸ்டர் வீவர்கள் பாஸ்புக்கை தராமல் தடுப்பதை சமாளித்து நலவாரியத்தில் நேரடியாக உறுப்பினராவது எப்படி?',
    activeProblemHi: 'हथकरघा कल्याण बोर्ड में सीधे पंजीकरण कैसे कराएं?',
    memberCount: 76,
    solvedCount: 31,
    tags: ['Handloom', 'Welfare Board', 'Salem', 'Unorganized Labor'],
    resources: [
      {
        id: 'res-salem-handloom-office',
        title: 'Tamil Nadu Handlooms & Textiles Assistant Director Office',
        titleTa: 'கைத்தறி & துணிநூல் துறை உதவி இயக்குநர் அலுவலகம், சேலம்',
        titleHi: 'सहायक निदेशक हथकरघा कार्यालय सलेम',
        type: 'office',
        contactOrLink: 'Collectorate Complex, Salem (Tel: 0427-2415124)',
        note: 'Direct registration desk for Weavers Welfare Board identity smartcards.',
        noteTa: 'நெசவாளர் நலவாரிய ஸ்மார்ட் கார்டு நேரடியாக பெற அணுகவும்.',
        noteHi: 'बुनकर कल्याण बोर्ड स्मार्ट कार्ड सीधे प्राप्त करने का काउंटर।'
      }
    ]
  },
  {
    id: 'circle-trichy-maternal-nutrition',
    name: 'Tiruchirappalli Maternal Health & Anemia Care Circle',
    nameTa: 'திருச்சி இளம் தாய்மார்கள் ஊட்டச்சத்து & ரத்தசோகை மீட்பு வட்டம்',
    nameHi: 'तिरुचिरापल्ली मातृ स्वास्थ्य एवं एनीमिया मुक्ति समूह',
    category: 'health_childcare',
    region: 'tamil_nadu',
    district: 'Tiruchirappalli',
    districtTa: 'திருச்சிராப்பள்ளி',
    districtHi: 'तिरुचिरापल्ली',
    isPrivate: true,
    description: 'Empowering young mothers and pregnant women across Trichy to track hemoglobin levels, access Dr. Muthulakshmi Reddy Amma Maternity Kits, and access free nutritious millets.',
    descriptionTa: 'திருச்சி வட்டார கர்ப்பிணி பெண்கள் மற்றும் தாய்மார்கள் ரத்தசோகை நீங்கவும், முத்துலட்சுமி ரெட்டி மகப்பேறு கிட் பெறவும் உதவும் ரகசிய மருத்துவ ஆலோசனை வட்டம்.',
    descriptionHi: 'एनीमिया से बचाव और डॉ. मुथुलक्ष्मी रेड्डी मातृत्व पोषण किट प्राप्त करने की मार्गदर्शिका।',
    icon: 'HeartHandshake',
    activeProblem: 'Delay in receiving 2nd installment of ₹4,000 cash grant and Amma Baby Care kit from Primary Health Centre (PHC).',
    activeProblemTa: 'ஆரம்ப சுகாதார நிலையத்தில் 2வது தவணை ₹4,000 மற்றும் அம்மா மகப்பேறு சஞ்சீவி பெட்டகம் பெறுவதில் உள்ள தாமதத்தை சரிசெய்வது எப்படி?',
    activeProblemHi: 'प्राथमिक स्वास्थ्य केंद्र से मातृत्व सहायता की दूसरी किस्त में देरी का समाधान।',
    memberCount: 91,
    solvedCount: 37,
    tags: ['Maternal Health', 'Anemia', 'Amma Kit', 'Trichy'],
    resources: [
      {
        id: 'res-trichy-rch',
        title: 'Picme / RCH ID Tracking Helpline (Tamil Nadu Health System)',
        titleTa: 'பிக்மி (PICME) தாய்மை பதிவெண் கண்காணிப்பு உதவி எண்',
        titleHi: 'पिकमी (PICME) मातृत्व हेल्पलाइन',
        type: 'helpline',
        contactOrLink: 'Toll-Free Helpline: 102 / 104 (Office: District Health Officer, Trichy)',
        note: 'Resolve RCH ID linkage delays for immediate release of Dr. Muthulakshmi Reddy financial assistance.',
        noteTa: 'பிக்மி எண் மூலம் வங்கி கணக்கில் நேரடியாக ₹18,000 மகப்பேறு நிதி உதவி பெற உதவும் எண்.',
        noteHi: 'मातृत्व सहायता राशि सीधे बैंक खाते में प्राप्त करने हेतु टोल-फ्री नंबर।'
      }
    ]
  },
  {
    id: 'circle-vellore-domestic-violence',
    name: 'Vellore & Ranipet Sakhi Emergency Support & Legal Safety',
    nameTa: 'வேலூர் & ராணிப்பேட்டை சகி அவசர பாதுகாப்பு & சட்ட தோழிகள் வட்டம்',
    nameHi: 'वेल्लोर सखी संकटकालीन महिला सुरक्षा एवं कानूनी सहायता',
    category: 'safety_rights',
    region: 'tamil_nadu',
    district: 'Vellore',
    districtTa: 'வேலூர்',
    districtHi: 'वेल्लोर',
    isPrivate: true,
    description: 'Confidential emergency peer network helping domestic abuse survivors access the Sakhi One-Stop Centre at Vellore Government Medical College and Thozhi working women shelters.',
    descriptionTa: 'குடும்ப வன்முறையால் பாதிக்கப்பட்ட பெண்களுக்கு வேலூர் அரசு மருத்துவமனை "சகி" மையம் மற்றும் தோழி விடுதி மூலம் உடனடியாக தங்குமிடம் மற்றும் சட்ட பாதுகாப்பு அளிக்கும் வட்டம்.',
    descriptionHi: 'घरेलू हिंसा से पीड़ित महिलाओं के लिए सखी वन स्टॉप सेंटर और कानूनी संरक्षण।',
    icon: 'Shield',
    activeProblem: 'Need emergency shelter and police protection orders without notifying the perpetrator.',
    activeProblemTa: 'எதிர்தரப்புக்கு தெரியாமல் உடனடியாக தோழி தங்குமிடம் மற்றும் காவல்துறை பாதுகாப்பு ஆணை பெறுவது எப்படி?',
    activeProblemHi: 'आपातकालीन सुरक्षित आश्रय और पुलिस सुरक्षा आदेश कैसे प्राप्त करें?',
    memberCount: 42,
    solvedCount: 19,
    tags: ['Sakhi Centre', 'Safety Rights', 'Emergency Shelter', 'Vellore'],
    resources: [
      {
        id: 'res-vellore-sakhi',
        title: 'Sakhi One-Stop Crisis Centre (Vellore Medical College Complex)',
        titleTa: 'சகி ஒன்-ஸ்டாப் மகளிர் உதவி மையம் (வேலூர் அரசு மருத்துவமனை வளாகம்)',
        titleHi: 'सखी वन-स्टॉप सेंटर वेल्लोर',
        type: 'helpline',
        contactOrLink: 'Women Helpline: 181 (Direct Desk: 0416-2220181)',
        note: 'Provides confidential medical care, legal counseling, psychological support, and 5-day temporary shelter under one roof 24/7.',
        noteTa: '24 மணி நேரமும் மருத்துவ உதவி, சட்ட ஆலோசனை மற்றும் தற்காலிக தங்குமிடம் ஒரே கூரையின் கீழ்.',
        noteHi: '24 घंटे निःशुल्क चिकित्सा, कानूनी सलाह और सुरक्षित अल्पकालिक आश्रय।'
      }
    ]
  }
];

export const initialProblemThreads: ProblemDiscussionThread[] = [
  {
    id: 'thread-pondy-1',
    circleId: 'circle-pondy-education-reentry',
    authorAlias: 'Sister Ananya (Lawspet)',
    isAnonymous: true,
    authorLocation: 'Lawspet, Puducherry',
    problemTitle: 'I left school after 10th in 2018. Can I directly write 12th exam in Puducherry through NIOS without attending daily school?',
    problemDescription: 'I am 24 years old with a 3-year-old child. I work as an assistant in a pharmacy in Puducherry. I want to clear 12th standard so I can qualify for the Perunthalaivar Kamarajar Higher Education grant and do a B.Com or D.Pharm course. Can someone explain if NIOS Puducherry exam center is accessible and how to prepare at home?',
    category: 'education_restart',
    timestamp: '2 days ago',
    upvotes: 38,
    isUpvoted: false,
    solutions: [
      {
        id: 'sol-1',
        authorAlias: 'Teacher Vasanthi (Puducherry)',
        isAnonymous: false,
        solutionText: 'Yes sister! You are 100% eligible for NIOS Senior Secondary (12th). Puducherry has an official NIOS study center at Saradha Gangadharan College and Kendriya Vidyalaya. You only need to choose 5 subjects. You can study in Tamil or English medium at your own pace, submit assignments (TMA) online for 20% marks, and exams happen twice a year in April and October. Your 10th pass certificate from 2018 is valid proof. I will share free video study materials in our group!',
        isVerifiedByMentor: true,
        timestamp: '1 day ago',
        helpfulVotes: 29,
        isHelpful: true
      },
      {
        id: 'sol-2',
        authorAlias: 'Sister Rajeshwari (Muthialpet)',
        isAnonymous: false,
        solutionText: 'I did the same last year sister! I took Data Entry, Home Science, Business Studies, Tamil, and English. Practical marks and assignments gave me 45 marks before even sitting for the theory exam. You can easily do it with 1 hour of night study!',
        isVerifiedByMentor: false,
        timestamp: '18 hours ago',
        helpfulVotes: 14,
        isHelpful: false
      }
    ],
    collectiveAction: {
      actionTitle: 'Petition Education Directorate to Open Weekend NIOS Coaching Desks at Muthialpet Library',
      actionDescription: 'Requesting Puducherry Directorate of School Education to provide free 2-hour Saturday tutoring for enrolled open school mothers.',
      targetAuthority: 'Director of School Education, Puducherry',
      pledgedCount: 47,
      hasUserPledged: false
    }
  },
  {
    id: 'thread-karaikal-1',
    circleId: 'circle-karaikal-tailoring-orders',
    authorAlias: 'Sister Selvi (Neravy)',
    isAnonymous: false,
    authorLocation: 'Neravy, Karaikal',
    problemTitle: 'School uniform contractor in Karaikal is demanding ₹45/shirt, threatening to give orders to Tiruppur if we decline. What can we do together?',
    problemDescription: 'Three of us were offered 180 boys school shirts. The fabric is thick poplin. Stitching collar, placket, pockets, and buttons takes 40 minutes per shirt. ₹45 does not even cover electricity and thread! Can we negotiate collectively or approach schools directly?',
    category: 'livelihood_wages',
    timestamp: '3 days ago',
    upvotes: 52,
    isUpvoted: false,
    solutions: [
      {
        id: 'sol-k1',
        authorAlias: 'Master Tailor Fatima (Karaikal)',
        isAnonymous: false,
        solutionText: 'Sister, do NOT accept ₹45. Tiruppur factories have a 1,000-piece minimum and high transport charges; the contractor cannot send a small 180-piece order to Tiruppur. We in Karaikal town met and fixed our minimum piece rate at ₹95 for plain shirts and ₹110 for uniforms with monogram pocket. Let us 6 sisters offer to finish the 180 pieces in 4 days at ₹95. He will agree because school reopening is close!',
        isVerifiedByMentor: true,
        timestamp: '2 days ago',
        helpfulVotes: 36,
        isHelpful: true
      }
    ],
    collectiveAction: {
      actionTitle: 'Karaikal Home Tailors Standard Minimum Piece-Rate Charter Notice',
      actionDescription: 'Publishing and circulating our collective minimum wage rate card (₹95 shirt / ₹140 salwar / ₹120 blouse) to all local schools and tailoring contractors.',
      targetAuthority: 'Karaikal Chamber of Commerce & School Managements Association',
      pledgedCount: 61,
      hasUserPledged: false
    }
  },
  {
    id: 'thread-pondy-legal-1',
    circleId: 'circle-pondy-legal-maintenance',
    authorAlias: 'Sister Priya (Villianur)',
    isAnonymous: true,
    authorLocation: 'Villianur, Puducherry',
    problemTitle: 'Husband deserted 8 months ago without contributing child support. Private lawyer asked ₹15,000 advance. How to approach Free Legal Aid?',
    problemDescription: 'I work at a local grocery store earning ₹6,500/month. My in-laws refuse to provide any child expense for my 6-year-old daughter. I do not have money for court fees or private advocate fees. Will Puducherry legal aid really help without bribes?',
    category: 'safety_rights',
    timestamp: '4 days ago',
    upvotes: 44,
    isUpvoted: true,
    solutions: [
      {
        id: 'sol-l1',
        authorAlias: 'Advocate Lakshmi (Pro Bono Volunteer)',
        isAnonymous: false,
        solutionText: 'Sister Priya, do not spend a single rupee on private fees. Under Section 12 of the Legal Services Authorities Act, every woman in India is entitled to free legal aid irrespective of income. Walk into the District Legal Services Authority (DLSA) office on the ground floor of Puducherry Court Complex (near Beach). Ask for the Front Office paralegal. They will draft the Section 125 petition for maintenance on the same day and assign an empanelled advocate for ₹0.',
        isVerifiedByMentor: true,
        timestamp: '3 days ago',
        helpfulVotes: 41,
        isHelpful: true
      }
    ],
    collectiveAction: {
      actionTitle: 'Free DLSA Maintenance Application Drive in Villianur Community Hall',
      actionDescription: 'Inviting DLSA paralegals to conduct a special Sunday clinic in Villianur for deserted single mothers.',
      targetAuthority: 'Member Secretary, Puducherry Legal Services Authority',
      pledgedCount: 39,
      hasUserPledged: true
    }
  }
];
