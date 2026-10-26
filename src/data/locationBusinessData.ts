/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LocationBusinessIdea } from '../types';

export const locationBusinessTemplates: LocationBusinessIdea[] = [
  // 1. PUDUCHERRY & RESIDENTIAL AREAS
  {
    id: 'idea-pondy-idli-batter',
    title: 'Stone-Ground Morning Idli/Dosa Batter & Fresh Podi Delivery',
    titleTa: 'ஆரோக்கிய இட்லி-தோசை மாவு & இட்லி பொடி விநியோகம்',
    titleHi: 'पारंपरिक इडली-डोसा बैटर और पोडी होम डिलीवरी',
    category: 'food_catering',
    suitableForDistricts: ['Puducherry', 'Karaikal', 'Chennai', 'all'],
    suitabilityReason: 'In urban and suburban residential areas like Lawspet, Muthialpet, and Saram in Puducherry, working couples and teachers have high daily demand for preservative-free morning batter.',
    suitabilityReasonTa: 'லாஸ்பேட்டை, முத்தியால்பேட்டை போன்ற குடியிருப்பு பகுதிகளில் அரசு ஊழியர்கள் மற்றும் ஆசிரியைகள் மத்தியில் காலை நேர தூய இட்லி மாவுக்கு தினசரி தேவை அதிகம்.',
    suitabilityReasonHi: 'पुदुचेरी के आवासीय क्षेत्रों में कामकाजी परिवारों के बीच बिना केमिकल वाले ताजे इडली घोल की दैनिक मांग है।',
    customerDemandFactors: [
      'Observe how many working mothers live within a 500-metre radius of your home.',
      'Check if local petty tea shops or grocery stores currently sell commercial factory batter.',
      'Survey 10 neighbours on whether they prefer sour-free natural fermentation without soda.',
      'Peak purchasing window is between 6:00 AM and 7:30 AM.'
    ],
    customerDemandFactorsTa: [
      'உங்கள் வீட்டைச் சுற்றியுள்ள 500 மீட்டர் பரப்பளவில் எத்தனை குடும்பங்களில் பெண்கள் வேலைக்குச் செல்கிறார்கள் என்பதை கவனியுங்கள்.',
      'அருகிலுள்ள மளிகைக் கடைகளில் விற்கப்படும் மாவு சோடா கலந்ததா என மக்கள் அதிருப்தி கொண்டுள்ளனரா என தெரிந்து கொள்ளுங்கள்.',
      '10 அண்டை வீடுகளில் இயற்கை புளிப்பு கொண்ட மாவை வாங்க விரும்புவார்களா என பேசுங்கள்.',
      'காலை 6:00 முதல் 7:30 மணிக்குள் வாங்கும் நேரத்தை உறுதி செய்யுங்கள்.'
    ],
    customerDemandFactorsHi: [
      '500 मीटर के दायरे में कामकाजी परिवारों की संख्या का आकलन करें।',
      'स्थानीय दुकानों पर बिकने वाले कमर्शियल घोल की गुणवत्ता पर पड़ोसियों से बात करें।',
      'सुबह 6 से 7:30 बजे के बीच समय पर डिलीवरी की जांच करें।'
    ],
    competitionAnalysis: 'Large commercial brand packets exist in supermarkets, but they contain preservative citric acid. You can win by offering 100% natural, freshly ground batter on the same morning with customized salt/no-salt options.',
    competitionAnalysisTa: 'பெரிய கம்பெனி பாக்கெட்டுகளில் புளிப்பு கெடாமல் இருக்க ரசாயனம் சேர்ப்பார்கள்; நீங்கள் அன்றைய நாளே அரைத்த தூய மாவை தருவதன் மூலம் எளிதில் வாடிக்கையாளர்களை கவரலாம்.',
    competitionAnalysisHi: 'कंपनियों के पैकेट में प्रिजर्वेटिव होते हैं; आपका ताजा और प्राकृतिक घोल आसानी से प्रतिस्पर्धा में आगे रहेगा।',
    estimatedStartupCost: 3850,
    expectedMonthlyProfit: '₹7,500 - ₹16,000 / month (selling 15-30 kg daily)',
    expectedMonthlyProfitTa: 'மாதம் ₹7,500 முதல் ₹16,000 வரை (தினமும் 15-30 கிலோ)',
    dailyTimeRequired: '2 - 3 Hours (night soaking & early morning grinding)',
    dailyTimeRequiredTa: 'தினமும் 2 - 3 மணி நேரம் (இரவு ஊறவைத்தல் & அதிகாலை அரைத்தல்)',
    starterShoppingList: [
      {
        id: 'batter-1',
        itemName: 'First-quality Idli Boiled Rice (25kg sack)',
        category: 'raw_material',
        quantity: 2,
        estimatedUnitCost: 950,
        notes: 'Goubert Market wholesale grain mandi (₹38/kg)'
      },
      {
        id: 'batter-2',
        itemName: 'Whole White Urad Dal / Gundu Ulundhu (10kg)',
        category: 'raw_material',
        quantity: 1,
        estimatedUnitCost: 1250,
        notes: 'High expansion ratio for fluffy batter'
      },
      {
        id: 'batter-3',
        itemName: 'Food-grade 1kg Sealable Plastic Pouches (Pack of 200)',
        category: 'packaging',
        quantity: 2,
        estimatedUnitCost: 180,
        notes: 'Leak-proof virgin plastic or bio-degradable pouches'
      },
      {
        id: 'batter-4',
        itemName: 'Hand Impulse Bag Heat Sealer (8-inch)',
        category: 'tool_equipment',
        quantity: 1,
        estimatedUnitCost: 850,
        notes: 'Airtight packaging for hygiene'
      },
      {
        id: 'batter-5',
        itemName: 'Custom Printed Contact Label Stickers (500 sheets)',
        category: 'marketing',
        quantity: 1,
        estimatedUnitCost: 300,
        notes: 'Contains brand name, phone, ingredients & date'
      },
      {
        id: 'batter-6',
        itemName: 'Table Salt & RO Water Jar allowance',
        category: 'raw_material',
        quantity: 1,
        estimatedUnitCost: 140,
        notes: 'High mineral pure water'
      }
    ],
    risks: [
      'Electricity cuts during early morning grinding hours (keep inverter or grind before 5:00 AM).',
      'Over-fermentation in peak hot summer (April - June) turning batter overly sour if not refrigerated.',
      'Initial customers requesting credit payment (strictly maintain cash or spot UPI payment).'
    ],
    risksTa: [
      'அதிகாலையில் மின்தடை ஏற்பட்டால் அரைப்பது தடைபடலாம் (முன்கூட்டியே திட்டமிடுங்கள்).',
      'கோடை காலத்தில் மாவு சீக்கிரம் புளித்துவிடும் என்பதால் குளிர்ந்த இடத்தில் வையுங்கள்.',
      'கடன் கேட்பவர்களை நாசூக்காக தவிர்த்து ஸ்பாட் கூகிள் பே அல்லது ரொக்கத்தை கடைபிடியுங்கள்.'
    ],
    firstSteps: [
      'Day 1-2: Prepare a 2kg trial batch at home and check softness across 3 different steaming times.',
      'Day 3: Give 500g complimentary sample pouches to 5 neighbouring households and ask for honest feedback.',
      'Day 4: Create a WhatsApp broadcast list of interested morning buyers.',
      'Day 5-7: Launch with initial 10 guaranteed morning deliveries.'
    ],
    firstStepsTa: [
      'நாள் 1-2: வீட்டில் 2 கிலோ மாதிரி அரைத்து இட்லியின் மென்மையை சோதிக்கவும்.',
      'நாள் 3: அக்கம் பக்கத்து 5 வீடுகளுக்கு 500 கிராம் மாதிரி இலவசமாக கொடுத்து கருத்து கேட்கவும்.',
      'நாள் 4: விருப்பமுள்ள வாடிக்கையாளர்களுடன் வாட்ஸ்அப் குழு உருவாக்கவும்.',
      'நாள் 5-7: முதல் 10 வாடிக்கையாளர்களுடன் தினசரி விநியோகத்தை தொடங்கவும்.'
    ],
    recommendedWholesaleHubs: ['hub-pondy-goubert-market', 'hub-madurai-masi-street-provisions'],
    disclaimerNote: 'Estimates are based on prevailing market commodity prices in Jan 2026. Business results depend on punctuality, hygiene, and local customer relationships. SHERISE does not guarantee profit.',
    disclaimerNoteTa: 'இவை ஜனவரி 2026 சந்தை நிலவரப்படி உத்தேச மதிப்பீடுகளே; உங்கள் நேர மேலாண்மை மற்றும் தரத்தைப் பொறுத்தே வருமானம் அமையும். லாபத்திற்கு உத்தரவாதம் இல்லை.'
  },

  // 2. PUDUCHERRY TOURISM & HANDICRAFTS
  {
    id: 'idea-pondy-french-souvenirs',
    title: 'Handmade Eco-Paper Stationery & Promenade Crochet Accessories',
    titleTa: 'கைவினை காகித குறிப்பேடுகள் & குரோஷே கைவினை பொருட்கள்',
    titleHi: 'हस्तनिर्मित इको-पेपर डायरी और क्रोशिया उत्पाद',
    category: 'handicrafts_eco',
    suitableForDistricts: ['Puducherry', 'all'],
    suitabilityReason: 'Puducherry Heritage / White Town zone receives 20,000+ weekend travelers who actively look for eco-friendly souvenirs, handmade notebooks, and beach tote bags.',
    suitabilityReasonTa: 'புதுச்சேரி ஒயிட் டவுன் மற்றும் கடற்கரை பகுதிக்கு வரும் வார இறுதி சுற்றுலாப் பயணிகள் பாரம்பரிய காகித குறிப்பேடுகள் மற்றும் சூழல் நட்பு பைகளை விரும்பி வாங்குவர்.',
    suitabilityReasonHi: 'पुदुचेरी के हेरिटेज क्षेत्र में आने वाले पर्यटकों के बीच हस्तनिर्मित पर्यावरण-अनुकूल स्मृति चिन्हों की भारी मांग है।',
    customerDemandFactors: [
      'Visit Rue Suffren or Romain Rolland Street on Saturday evening to see what souvenir shops sell.',
      'Check which boutique cafes or bookstores allow local artisan display shelves on consignment.',
      'Foreign and metro travelers value plastic-free, aesthetic organic textures.'
    ],
    customerDemandFactorsTa: [
      'சனிக்கிழமை மாலையில் ரோம் ரோலண்ட் வீதி அல்லது கடற்கரை சாலை கடைகளை பார்வையிடுங்கள்.',
      'உள்ளூர் கஃபேக்கள் மற்றும் புத்தகக் கடைகளில் உங்கள் தயாரிப்புகளை வைக்க அனுமதி தருவார்களா என கேளுங்கள்.',
      'சுற்றுலா பயணிகள் பிளாஸ்டிக் இல்லாத சூழல் நட்பு பொருட்களை அதிகம் விரும்புகின்றனர்.'
    ],
    customerDemandFactorsHi: [
      'सप्ताहांत में पर्यटक दुकानों और कैफे में बिकने वाले उत्पादों का मुआयना करें।',
      'स्थानीय बुटीक में बिक्री साझेदारी की संभावना तलाशें।'
    ],
    competitionAnalysis: 'Commercial Chinese plastic souvenirs are common in street carts; differentiate yourself with authentic hand-stitched diaries and handmade paper crafted from cotton rags.',
    competitionAnalysisTa: 'சீன பிளாஸ்டிக் பொம்மைகள் அதிகம் உள்ளதால், இயற்கை காட்டன் பஞ்சு கொண்டு செய்த காகித குறிப்பேடுகள் உங்கள் தயாரிப்பை தனித்து காட்டும்.',
    competitionAnalysisHi: 'प्लास्टिक के सस्ते सामानों के मुकाबले हाथ से बने सूती कागजी उत्पाद अलग पहचान बनाएंगे।',
    estimatedStartupCost: 6500,
    expectedMonthlyProfit: '₹12,000 - ₹28,000 / month (weekend boutique sales)',
    expectedMonthlyProfitTa: 'மாதம் ₹12,000 முதல் ₹28,000 வரை (வார இறுதி சுற்றுலா விற்பனை)',
    dailyTimeRequired: '3 - 4 Hours (flexible crafting at home)',
    dailyTimeRequiredTa: 'தினமும் 3 - 4 மணி நேரம் (வீட்டிலிருந்தே செய்யலாம்)',
    starterShoppingList: [
      {
        id: 'craft-1',
        itemName: 'Handmade Cotton Rag Paper Sheets (A3 size, 200 GSM, 100 sheets)',
        category: 'raw_material',
        quantity: 2,
        estimatedUnitCost: 1100,
        notes: 'Eco-friendly textured paper'
      },
      {
        id: 'craft-2',
        itemName: 'Natural Jute Twine & Bookbinding Linen Thread (5 spools)',
        category: 'raw_material',
        quantity: 1,
        estimatedUnitCost: 450,
        notes: 'Traditional bookbinding'
      },
      {
        id: 'craft-3',
        itemName: 'Heavy-duty Paper Guillotine Cutter (12-inch)',
        category: 'tool_equipment',
        quantity: 1,
        estimatedUnitCost: 1650,
        notes: 'Precise clean edge cutting'
      },
      {
        id: 'craft-4',
        itemName: 'Mercerized Cotton Crochet Yarn Balls (Assorted beach pastel colors)',
        category: 'raw_material',
        quantity: 15,
        estimatedUnitCost: 90,
        notes: 'Beach caps, bottle holders & tote trims'
      },
      {
        id: 'craft-5',
        itemName: 'Ergonomic Crochet Hooks Kit (Sizes 2mm - 6mm)',
        category: 'tool_equipment',
        quantity: 1,
        estimatedUnitCost: 550,
        notes: 'Comfortable grip tools'
      },
      {
        id: 'craft-6',
        itemName: 'Kraft Gift Boxes & Branding Tags',
        category: 'packaging',
        quantity: 1,
        estimatedUnitCost: 550,
        notes: 'Tourist gift presentation'
      }
    ],
    risks: [
      'Tourism dips during monsoon (October - December) or non-holiday weekdays.',
      'Need patience to build display partnerships with boutique homestays and French quarter cafes.'
    ],
    risksTa: [
      'மழைக்காலங்களில் சுற்றுலா பயணிகள் வருகை குறைய வாய்ப்புள்ளது.',
      'கடைகளில் பொருட்களை வைத்து விற்க தொடக்க காலத்தில் ஒப்பந்தம் பேச பொறுமை தேவை.'
    ],
    firstSteps: [
      'Day 1-3: Produce 5 sample hand-bound diaries and 3 crochet water bottle slings.',
      'Day 4-5: Photograph items in natural sunlight with aesthetic French colonial backdrop.',
      'Day 6: Pitch to 3 boutique stores on Rue Suffren offering 25% consignment commission.',
      'Day 7: Register free vendor profile on local weekend flea markets.'
    ],
    firstStepsTa: [
      'நாள் 1-3: 5 குறிப்பேடுகள் மற்றும் 3 வாட்டர் பாட்டில் பைகளை மாதிரியாக தயார் செய்யவும்.',
      'நாள் 4-5: ஒயிட் டவுன் பின்னணியில் அழகாக புகைப்படம் எடுக்கவும்.',
      'நாள் 6: 3 கடைகளில் கமிஷன் அடிப்படையில் காட்சிக்கு வைக்க பேசவும்.',
      'நாள் 7: வார இறுதி கைவினை கண்காட்சியில் பதியவும்.'
    ],
    recommendedWholesaleHubs: ['hub-pondy-mg-road-tailoring', 'hub-chennai-parrys-packaging'],
    disclaimerNote: 'Handicraft revenue varies by tourist seasons and craftsmanship. No guarantee of sales.',
    disclaimerNoteTa: 'சுற்றுலா சீசன் மற்றும் கைவினை நுணுக்கத்தைப் பொறுத்தே விற்பனை அமையும்; லாபத்திற்கு உத்தரவாதம் இல்லை.'
  },

  // 3. KARAIKAL & COASTAL AREAS
  {
    id: 'idea-karaikal-dry-fish-masala',
    title: 'Hygienic Sun-Dried Seafood & Ready-to-Cook Fish Masala Mixes',
    titleTa: 'சுகாதாரமான உலர் மீன் (கருவாடு) & பாரம்பரிய மீன் மசாலா தயாரிப்பு',
    titleHi: 'स्वच्छ सूखा मछली उत्पाद व पारंपरिक फिश मसाला',
    category: 'food_catering',
    suitableForDistricts: ['Karaikal', 'Puducherry', 'all'],
    suitabilityReason: 'Karaikal has an active fishing harbour with abundant fresh seafood catch at low cost. Traditional home drying and hygienic odorless packaging allows shipping to inland towns at 80% higher margins.',
    suitabilityReasonTa: 'காரைக்கால் துறைமுகத்தில் மீன்கள் மிகக் குறைந்த விலையில் கிடைக்கும்; மணமில்லாத சுகாதார பாக்கெட்டுகளில் அடைத்து உள்மாவட்டங்களுக்கு விற்றால் நல்ல லாபம் கிடைக்கும்.',
    suitabilityReasonHi: 'काराइकल बंदरगाह से सस्ती मछली प्राप्त कर स्वच्छ पैकेजिंग द्वारा शहरों में अच्छी कीमत पर बेचा जा सकता है।',
    customerDemandFactors: [
      'Visit the Arasalar fish harbour at 6:00 AM to see wholesale auction prices for Nethili, Vanjaram, and Sankara.',
      'Check if local families complain that open market dry fish has too much sand and flies.',
      'Packaging clean, sand-free, vacuum-sealed fish solves the biggest objection of modern homemakers.'
    ],
    customerDemandFactorsTa: [
      'அரசலாறு துறைமுகத்தில் காலை 6:00 மணிக்கு நெத்திலி, சங்கரா மீன் ஏல விலையை கவனியுங்கள்.',
      'சாதாரண சந்தை கருவாட்டில் மணல் மற்றும் ஈக்கள் மொய்ப்பதாக மக்கள் புகார் செய்கிறார்களா என பாருங்கள்.',
      'மணல் இல்லாத, சுகாதாரமாக பாக்கெட் செய்யப்பட்ட கருவாட்டுக்கு நகரங்களில் பெரும் வரவேற்பு உள்ளது.'
    ],
    customerDemandFactorsHi: [
      'सुबह की मछली नीलामी दरों का अध्ययन करें।',
      'सैंड-फ्री और हाइजीनिक पैकेजिंग पर उपभोक्ताओं की प्रतिक्रिया लें।'
    ],
    competitionAnalysis: 'Open market sellers dry fish on beach sand with open fly exposure. By washing in clean RO brine, drying in mesh net cages, and packaging with moisture absorbers, your product commands premium pricing.',
    competitionAnalysisTa: 'சாதாரண வியாபாரிகள் கடற்கரை மணலில் உலர்த்துவார்கள்; நீங்கள் வலை கூண்டுகளுக்குள் சுத்தமாக உலர்த்தி பேக் செய்தால் இரண்டு மடங்கு விலை கிடைக்கும்.',
    competitionAnalysisHi: 'खुले में सुखाने के मुकाबले जालीदार पिंजरे में सुखाकर हाइजीनिक उत्पाद तैयार करें।',
    estimatedStartupCost: 5200,
    expectedMonthlyProfit: '₹11,000 - ₹24,000 / month',
    expectedMonthlyProfitTa: 'மாதம் ₹11,000 முதல் ₹24,000 வரை',
    dailyTimeRequired: '3 - 4 Hours (morning harbour sourcing & sun drying)',
    dailyTimeRequiredTa: 'தினமும் 3 - 4 மணி நேரம் (காலை கொள்முதல் & உலர்த்துதல்)',
    starterShoppingList: [
      {
        id: 'fish-1',
        itemName: 'Fresh Small Anchovy / Nethili Fish (15kg starting lot)',
        category: 'raw_material',
        quantity: 1,
        estimatedUnitCost: 1350,
        notes: 'Morning wholesale auction price'
      },
      {
        id: 'fish-2',
        itemName: 'Food-grade Coarse Rock Salt (50kg bag)',
        category: 'raw_material',
        quantity: 1,
        estimatedUnitCost: 260,
        notes: 'For hygienic curing and preservation'
      },
      {
        id: 'fish-3',
        itemName: 'Nylon Mesh Multi-Tier Hanging Sun Drying Net Cage',
        category: 'tool_equipment',
        quantity: 2,
        estimatedUnitCost: 650,
        notes: '100% fly and dust protection'
      },
      {
        id: 'fish-4',
        itemName: 'Foil-Lined Stand-Up Zipper Pouches with Window (250g, 200 pcs)',
        category: 'packaging',
        quantity: 1,
        estimatedUnitCost: 750,
        notes: 'Odorless presentation for fridge storage'
      },
      {
        id: 'fish-5',
        itemName: 'Chilli, Coriander, Pepper & Cumin for Ready Fish Fry Masala (5kg)',
        category: 'raw_material',
        quantity: 1,
        estimatedUnitCost: 950,
        notes: 'Signature Karaikal chettinad spice blend'
      },
      {
        id: 'fish-6',
        itemName: 'Digital Kitchen Weighing Scale (Up to 10kg)',
        category: 'tool_equipment',
        quantity: 1,
        estimatedUnitCost: 450,
        notes: 'Accurate net weight packaging'
      }
    ],
    risks: [
      'Cloudy or rainy weather requiring backup electric food dehydrator or postponing batches.',
      'Sourcing fresh catch at reasonable rates during annual 61-day fishing ban (April 15 - June 14).'
    ],
    risksTa: [
      'மழைக்காலங்களில் வெயில் இல்லாத போது உலர்த்துவதில் சிரமம் ஏற்படலாம்.',
      'மீன்பிடி தடைக்காலத்தில் (ஏப்ரல் - ஜூன்) மீன் வரத்து குறைவாக இருக்கும்.'
    ],
    firstSteps: [
      'Day 1: Purchase hanging mesh net and test curing a 2kg batch of anchovy.',
      'Day 2: Pack 100g samples with your homemade fish fry masala packet attached.',
      'Day 3: Offer samples to 5 family cooks in inland towns like Kumbakonam or Mayiladuthurai.',
      'Day 4-7: Take advance orders for weekend courier delivery.'
    ],
    firstStepsTa: [
      'நாள் 1: உலர்த்தும் வலை கூண்டு வாங்கி 2 கிலோ நெத்திலி கருவாடு செய்து பார்க்கவும்.',
      'நாள் 2: கூடவே உங்கள் கைவண்ண மசாலா பொடியையும் இணைத்து பேக் செய்யவும்.',
      'நாள் 3: கும்பகோணம், மயிலாடுதுறை போன்ற ஊர்களில் உள்ள உறவினர்களுக்கு மாதிரி அனுப்பவும்.',
      'நாள் 4-7: வார இறுதி பார்சல் ஆர்டர்களை எடுக்கவும்.'
    ],
    recommendedWholesaleHubs: ['hub-karaikal-main-market', 'hub-pondy-goubert-market'],
    disclaimerNote: 'Seafood prices fluctuate with daily catch and fishing ban periods. Net profit is not guaranteed.',
    disclaimerNoteTa: 'மீன்பிடி சீசன் மற்றும் கடல் அலை நிலவரத்திற்கு ஏற்ப கொள்முதல் விலை மாறும்; லாபத்திற்கு உத்தரவாதம் இல்லை.'
  },

  // 4. KARAIKAL TEMPLE ZONE
  {
    id: 'idea-karaikal-temple-kits',
    title: 'Thirunallar Saneeswara Puja Packs, Sesame Oil & Hand-Rolled Wicks',
    titleTa: 'திருநள்ளாறு பரிகார பூஜை கிட்கள் & தூய எள் நல்லெண்ணெய் தீபப் பொட்டலம்',
    titleHi: 'शनि मंदिर पूजा किट, तिल तेल और हाथ से बनी बत्तियां',
    category: 'handicrafts_eco',
    suitableForDistricts: ['Karaikal', 'all'],
    suitabilityReason: 'Thirunallar temple receives 50,000+ devotees every Saturday. Devotees require black sesame pouches, blue cloth, deepam oil, and earthen agal vilakku for Sani dosha pariharam.',
    suitabilityReasonTa: 'திருநள்ளாறு கோயிலுக்கு சனிக்கிழமைகளில் வரும் பல்லாயிரக்கணக்கான பக்தர்களுக்கு கருப்பு எள், நீல துணி, நல்லெண்ணெய் மற்றும் பரிகார பூஜை பொட்டலங்கள் தேவைப்படுகின்றன.',
    suitabilityReasonHi: 'शनिवार को तिरुनाल्लार आने वाले भक्तों के लिए तिल, बत्ती और दीपक के पूजा सेट की निरंतर आवश्यकता होती है।',
    customerDemandFactors: [
      'Check retail prices charged by temple street stalls for a simple ₹50 puja thali.',
      'Notice that pilgrims coming from buses lack ready change and want pre-packed compact kits.',
      'Tie-up with private lodge reception counters in Thirunallar for selling kits at ₹30 and ₹60.'
    ],
    customerDemandFactorsTa: [
      'சந்நிதி வீதி கடைகளில் ஒரு தட்டு அர்ச்சனை பொருட்கள் என்ன விலைக்கு விற்கப்படுகிறது என்பதை பாருங்கள்.',
      'பேருந்துகளில் வரும் பக்தர்களுக்கு சில்லறை தேடாமல் தயார் நிலையில் உள்ள கிட்கள் தேவை.',
      'திருநள்ளாறு தங்கும் விடுதி கவுண்டர்களில் கமிஷன் அடிப்படையில் விற்க பேசலாம்.'
    ],
    customerDemandFactorsHi: [
      'मंदिर के पास की दुकानों की कीमतों का विश्लेषण करें।',
      'होटलों और धर्मशालाओं के साथ आपूर्ति की साझेदारी बनाएं।'
    ],
    competitionAnalysis: 'Many shops exist right around the temple walls, but lodge owners prefer partnering with trustworthy women who supply clean, non-leaking oil bottles and pure cotton wicks.',
    competitionAnalysisTa: 'கோயில் வாசலில் பல கடைகள் இருந்தாலும், எண்ணெய் சிந்தாத தரமான பாட்டில்களை விடுதிகளுக்கு நேரடியாக சப்ளை செய்யலாம்.',
    competitionAnalysisHi: 'लीक-प्रूफ पैकेजिंग और शुद्ध सामग्री से आप सीधे लॉज ग्राहकों को आकर्षित कर सकते हैं।',
    estimatedStartupCost: 3200,
    expectedMonthlyProfit: '₹9,000 - ₹22,000 / month (heavy weekend volume)',
    expectedMonthlyProfitTa: 'மாதம் ₹9,000 முதல் ₹22,000 வரை (சனிக்கிழமை வியாபாரம்)',
    dailyTimeRequired: '2 - 3 Hours (Friday prep & Saturday distribution)',
    dailyTimeRequiredTa: 'தினமும் 2 - 3 மணி நேரம் (வெள்ளி தயாரிப்பு & சனி விநியோகம்)',
    starterShoppingList: [
      {
        id: 'temple-1',
        itemName: 'Black Sesame Seeds (Karuppu Ellu) - 15kg',
        category: 'raw_material',
        quantity: 1,
        estimatedUnitCost: 2450,
        notes: 'Pariharam grade seeds from grain mandi'
      },
      {
        id: 'temple-2',
        itemName: 'Blue & Black Cotton Cloth Cut Pieces (100 pieces)',
        category: 'raw_material',
        quantity: 1,
        estimatedUnitCost: 350,
        notes: 'Temple tradition cloth squares'
      },
      {
        id: 'temple-3',
        itemName: 'Handmade Cotton Deepam Wicks (Bundle of 2,000 wicks)',
        category: 'raw_material',
        quantity: 2,
        estimatedUnitCost: 120,
        notes: 'Rolled wicks'
      },
      {
        id: 'temple-4',
        itemName: 'Biodegradable Areca Nut Leaf Mini Bowls (Pack of 200)',
        category: 'packaging',
        quantity: 1,
        estimatedUnitCost: 160,
        notes: 'Eco-friendly kit container'
      }
    ],
    risks: [
      'Over-reliance on Saturday crowds; weekdays have moderate pilgrim footfall.',
      'Ensuring leak-proof oil pouches to avoid devotee complaints.'
    ],
    risksTa: [
      'சனிக்கிழமைகளில் மட்டுமே அதிக கூட்டம் இருக்கும், பிற நாட்களில் மிதமான விற்பனை.',
      'எண்ணெய் கசியாமல் சுத்தமாக பேக் செய்ய வேண்டும்.'
    ],
    firstSteps: [
      'Day 1-2: Source sesame and cotton pieces from Thirunallar / Karaikal wholesale market.',
      'Day 3: Assemble 30 neat sample kits costing ₹12 each to sell at ₹25-30.',
      'Day 4-5: Meet 2 lodge receptionists near the temple tank offering ₹5 cut per sold kit.',
      'Day 6: Deliver 50 kits on Friday evening before the early morning Saturday rush.'
    ],
    firstStepsTa: [
      'நாள் 1-2: காரைக்கால் சந்தையில் இருந்து எள் மற்றும் துணிகளை வாங்கவும்.',
      'நாள் 3: 30 மாதிரி கிட்களை சுத்தமாக தயார் செய்யவும்.',
      'நாள் 4-5: 2 தங்கும் விடுதிகளிடம் பேசி கிட்களை காட்சிக்கு வைக்கவும்.',
      'நாள் 6: வெள்ளிக்கிழமை மாலையே 50 கிட்களை விடுதிகளுக்கு வழங்கவும்.'
    ],
    recommendedWholesaleHubs: ['hub-karaikal-thirunallar-bazaar', 'hub-karaikal-main-market'],
    disclaimerNote: 'Sales volumes fluctuate around festival days like Sani Peyarchi and Amavasya. Success is not guaranteed.',
    disclaimerNoteTa: 'பண்டிகை மற்றும் சனிப்பெயர்ச்சி காலங்களில் மட்டுமே அதிக விற்பனை இருக்கும்; லாபத்திற்கு உத்தரவாதம் இல்லை.'
  },

  // 5. TAMIL NADU - CHENNAI & GENERAL URBAN
  {
    id: 'idea-chennai-uniform-tailoring',
    title: 'Home-Based School Uniforms, Blouse Alterations & Aari Trims',
    titleTa: 'பள்ளி சீருடை தையல், பிளவுஸ் ஆல்டரேஷன் & ஆரி வேலைப்பாடு',
    titleHi: 'घर से स्कूल यूनिफॉर्म सिलाई एवं ब्लाउज आरी वर्क',
    category: 'tailoring_garments',
    suitableForDistricts: ['Chennai', 'Coimbatore', 'Salem', 'Madurai', 'Puducherry', 'all'],
    suitabilityReason: 'In urban residential neighbourhoods, every family has school-going children and festive wear requiring quick fittings, zip repairs, and blouse stitching without long delays.',
    suitabilityReasonTa: 'நகர்ப்புற குடியிருப்பு பகுதிகளில் தையல் கடைகளில் நீண்ட காத்திருப்பு உள்ளதால், விரைவாக தைத்து தரும் வீட்டு தையல் கலைஞர்களுக்கு தொடர் தேவை உண்டு.',
    suitabilityReasonHi: 'शहरी इलाकों में सिलाई दुकानों में भारी भीड़ के कारण घर से समय पर सिलाई सेवा देने वालों की निरंतर मांग है।',
    customerDemandFactors: [
      'Ask 10 working mothers how much they pay for blouse stitching and how long local tailors take (often 2-3 weeks).',
      'Promise a 48-hour express delivery for basic blouse alterations to gain loyal customers.',
      'Distribute simple visiting cards at the local school bus pickup point.'
    ],
    customerDemandFactorsTa: [
      'உள்ளூர் தையல்காரர் ஒரு பிளவுஸ் தைக்க 2-3 வாரம் ஆக்குவதை மக்கள் குறை கூறுகிறார்களா என கவனியுங்கள்.',
      'அவசர தேவைக்கு 48 மணி நேரத்தில் தைத்து தரும் உறுதிமொழி கொடுத்தால் வாடிக்கையாளர்கள் உடனடியாக வருவர்.',
      'பள்ளி வேன் வரும் இடங்களில் தாய்மார்களிடம் அறிமுக அட்டை கொடுங்கள்.'
    ],
    customerDemandFactorsHi: [
      '48 घंटे में फिटिंग व अल्टरेशन सेवा का वादा करके नए ग्राहक बनाएं।',
      'स्कूल बस स्टॉप पर माताओं को अपना सेवा कार्ड दें।'
    ],
    competitionAnalysis: 'Commercial tailoring shops charge ₹450-₹800 per designer blouse and take weeks. By charging ₹280-₹350 with accurate measurements and friendly home fittings, you build steady monthly repeat orders.',
    competitionAnalysisTa: 'பெரிய தையல் கடைகள் அதிக கட்டணம் வசூலித்து தாமதப்படுத்துவார்கள்; நீங்கள் நியாயமான விலையில் சரியான நேரத்தில் கொடுத்தால் நிலையான வருமானம் கிடைக்கும்.',
    competitionAnalysisHi: 'बड़ी दुकानों की लंबी प्रतीक्षा के मुकाबले किफायती दर और समय पर डिलीवरी आपकी मजबूती बनेगी।',
    estimatedStartupCost: 14500,
    expectedMonthlyProfit: '₹14,000 - ₹32,000 / month (stitching 2-3 blouses daily)',
    expectedMonthlyProfitTa: 'மாதம் ₹14,000 முதல் ₹32,000 வரை (தினமும் 2-3 ஆடைகள்)',
    dailyTimeRequired: '4 - 5 Hours (flexible home schedule)',
    dailyTimeRequiredTa: 'தினமும் 4 - 5 மணி நேரம் (வீட்டில் ஓய்வு நேரத்தில்)',
    starterShoppingList: [
      {
        id: 'tailor-1',
        itemName: 'Reconditioned Semi-Industrial Sewing Machine with Motor',
        category: 'tool_equipment',
        quantity: 1,
        estimatedUnitCost: 9500,
        notes: 'Smooth motor operated sewing machine'
      },
      {
        id: 'tailor-2',
        itemName: 'Cotton Blouse Lining Fabric (50 metres roll)',
        category: 'raw_material',
        quantity: 1,
        estimatedUnitCost: 1550,
        notes: 'Wholesale from Sowcarpet / MG Road'
      },
      {
        id: 'tailor-3',
        itemName: 'Polyester Thread Tubes in 30 Common Matching Shades',
        category: 'raw_material',
        quantity: 3,
        estimatedUnitCost: 220,
        notes: 'Assorted color box'
      },
      {
        id: 'tailor-4',
        itemName: 'Professional Tailor Fabric Scissors (10-inch Brass Handle)',
        category: 'tool_equipment',
        quantity: 1,
        estimatedUnitCost: 480,
        notes: 'Sharp heavy duty cutting'
      },
      {
        id: 'tailor-5',
        itemName: 'Zippers, Hooks, Canvas Collar Band & Measuring Tapes',
        category: 'raw_material',
        quantity: 1,
        estimatedUnitCost: 650,
        notes: 'Complete haberdashery starter box'
      },
      {
        id: 'tailor-6',
        itemName: 'Steam Iron Box for Crisp Finishing',
        category: 'tool_equipment',
        quantity: 1,
        estimatedUnitCost: 1650,
        notes: 'Professional delivery look'
      }
    ],
    risks: [
      'Customer dissatisfaction if neck or armhole measurement is loose (always offer 1 free adjustment).',
      'Need proper posture and ergonomic chair to prevent back pain during continuous stitching.'
    ],
    risksTa: [
      'அளவு சற்றே மாறினால் வாடிக்கையாளர் அதிருப்தி அடையலாம் (இலவசமாக உடனே சரிசெய்து கொடுங்கள்).',
      'தொடர்ந்து அமர்ந்து தைப்பதால் முதுகு வலி வராமல் இருக்க சரியான நாற்காலி பயன்படுத்துங்கள்.'
    ],
    firstSteps: [
      'Day 1-2: Stitch 2 sample blouses with perfect finishing and neat piping.',
      'Day 3: Show samples to 5 neighbours and offer ₹50 discount on their first order.',
      'Day 4: Approach local school uniform vendor or van driver for overflow batch work.',
      'Day 5-7: Create customer register noting measurements and delivery dates.'
    ],
    firstStepsTa: [
      'நாள் 1-2: 2 மாதிரிகளை மிக நேர்த்தியாக தைத்து வைத்துக் கொள்ளுங்கள்.',
      'நாள் 3: அண்டை வீட்டாரிடம் காட்டி முதல் ஆர்டருக்கு ₹50 தள்ளுபடி அளியுங்கள்.',
      'நாள் 4: பள்ளி சீருடை தைக்கும் ஒப்பந்ததாரர்களிடம் உபரி வேலை கேட்கவும்.',
      'நாள் 5-7: வாடிக்கையாளர் அளவு குறிப்பேடு தயார் செய்து ஆர்டர் எடுக்கவும்.'
    ],
    recommendedWholesaleHubs: ['hub-chennai-sowcarpet-textiles', 'hub-pondy-mg-road-tailoring', 'hub-coimbatore-sukrawarpet'],
    disclaimerNote: 'Earning potential depends on tailoring skill level, speed, and finishing quality. Success is not guaranteed.',
    disclaimerNoteTa: 'தையல் வேகம் மற்றும் நுணுக்கத்தைப் பொறுத்தே வருமானம் அமையும்; லாபத்திற்கு உத்தரவாதம் இல்லை.'
  },

  // 6. TAMIL NADU - MADURAI & SOUTHERN REGION
  {
    id: 'idea-madurai-malli-garlands',
    title: 'GI-Tagged Madurai Malli Stringing & Puja Flower Delivery Service',
    titleTa: 'புவிசார் குறியீடு பெற்ற மதுரை மல்லிகை பூ கட்டுதல் & காலை நேர மாலைகள்',
    titleHi: 'मदुरै मल्लिका चमेली फूल माला एवं मंदिर आपूर्ति',
    category: 'agriculture_poultry',
    suitableForDistricts: ['Madurai', 'all'],
    suitabilityReason: 'Madurai Mattuthavani market is the epicenter of fragrant jasmine. Purchasing raw buds at morning auctions and stringing them into double-petal garlands multiplies value by 120%.',
    suitabilityReasonTa: 'மதுரை மாட்டுத்தாவணியில் மல்லிகை மொட்டுகள் மொத்தமாக வாங்கி, இரட்டை வடம் மாலையாக கட்டினால் வாங்கும் விலையை விட இரண்டு மடங்கு லாபம் கிடைக்கும்.',
    suitabilityReasonHi: 'मदुरै फूल मंडी से कच्ची कली खरीदकर माला बनाकर बेचने से 100% से अधिक मूल्यवर्धन होता है।',
    customerDemandFactors: [
      'Check morning retail prices at neighborhood temples versus wholesale auction rates at Mattuthavani.',
      'Count how many homes in your street perform daily morning puja with fresh flowers.',
      'Offer monthly flower subscription (₹300/month for daily fresh poo string).'
    ],
    customerDemandFactorsTa: [
      'உங்கள் தெருவில் உள்ள வீடுகள் தினமும் பூஜை செய்ய பூ வாங்குவதை கவனியுங்கள்.',
      'மாதாந்திர சந்தா முறையில் (மாதம் ₹300) தினமும் காலையில் வீடு தேடி பூ போடும் திட்டத்தை தொடங்குங்கள்.',
      'கோயில் திருவிழாக்கள் மற்றும் முகூர்த்த நாட்களில் மாலை ஆர்டர்கள் எடுக்கலாம்.'
    ],
    customerDemandFactorsHi: [
      'आवासीय कॉलोनियों में दैनिक पूजा हेतु मासिक फूल सदस्यता की पेशकश करें।',
      'मंदिरों में नियमित आपूर्ति का अनुबंध करें।'
    ],
    competitionAnalysis: 'Street flower vendors sell open bundles that wither quickly. If you pack fresh strings in clean banana leaf wrappers and deliver before 6:30 AM, families prefer your doorstep service.',
    competitionAnalysisTa: 'தெருவில் கூவி விற்பவர்களை விட, நீங்கள் வாழை இலையில் சுற்றி வாடாமல் அதிகாலை 6:30க்குள் வீட்டு வாசலில் கொடுத்தால் மக்கள் உங்களை விரும்புவர்.',
    competitionAnalysisHi: 'केले के पत्ते में सुरक्षित रखकर समय पर घर पहुंचाना आपको अन्य विक्रेताओं से अलग बनाएगा।',
    estimatedStartupCost: 1950,
    expectedMonthlyProfit: '₹8,000 - ₹18,000 / month',
    expectedMonthlyProfitTa: 'மாதம் ₹8,000 முதல் ₹18,000 வரை',
    dailyTimeRequired: '2 - 3 Hours (early morning 4:30 AM - 7:00 AM)',
    dailyTimeRequiredTa: 'தினமும் 2 - 3 மணி நேரம் (அதிகாலை 4:30 முதல் 7:00 வரை)',
    starterShoppingList: [
      {
        id: 'flower-1',
        itemName: 'Fresh Jasmine (Malli) Buds (2kg starting morning lot)',
        category: 'raw_material',
        quantity: 2,
        estimatedUnitCost: 650,
        notes: 'Wholesale auction rate at Mattuthavani'
      },
      {
        id: 'flower-2',
        itemName: 'Banana Fibre / Strong Cotton Garland String (5 bundles)',
        category: 'raw_material',
        quantity: 1,
        estimatedUnitCost: 180,
        notes: 'Natural stringing fibre'
      },
      {
        id: 'flower-3',
        itemName: 'Bamboo Woven Shallow Storage Baskets (Pack of 3)',
        category: 'tool_equipment',
        quantity: 1,
        estimatedUnitCost: 280,
        notes: 'Keeps flowers cool and fresh'
      },
      {
        id: 'flower-4',
        itemName: 'Clean Water Mist Spray Bottle & Wet Cotton Cloths',
        category: 'tool_equipment',
        quantity: 1,
        estimatedUnitCost: 190,
        notes: 'Prevents petal drying'
      }
    ],
    risks: [
      'Jasmine prices can spike 4x during wedding muhurtham dates and dip during severe winters.',
      'Perishable product; unsold buds lose fragrance after 24 hours.'
    ],
    risksTa: [
      'முகூர்த்த நாட்களில் பூ விலை திடீரென உயரும், குளிர் காலத்தில் விலை மாறும்.',
      'அன்றே விற்று முடிக்க வேண்டும்; மறுநாள் வாடிவிடும் என்பதால் சரியான அளவு மட்டுமே வாங்க வேண்டும்.'
    ],
    firstSteps: [
      'Day 1: Accompany an experienced flower buyer to Mattuthavani market at 5:00 AM.',
      'Day 2: Practice speed stringing (aim for 1 muzham in under 3 minutes).',
      'Day 3: Enroll 10 neighbour families for daily morning 6:30 AM delivery.',
      'Day 4-7: Expand to local temple priest for morning garland orders.'
    ],
    firstStepsTa: [
      'நாள் 1: அதிகாலை 5 மணிக்கு மாட்டுத்தாவணி சென்று ஏல முறையை நேரில் பார்க்கவும்.',
      'நாள் 2: வேகமாக பூ கட்ட பயிற்சி செய்யுங்கள் (3 நிமிடத்தில் 1 முழம்).',
      'நாள் 3: 10 குடும்பங்களிடம் பேசி தினசரி காலை டெலிவரி ஆர்டர் எடுக்கவும்.',
      'நாள் 4-7: அருகில் உள்ள கோயில் பூசாரியிடம் மாலை தேவைக்கு பேசவும்.'
    ],
    recommendedWholesaleHubs: ['hub-madurai-mattuthavani-flowers'],
    disclaimerNote: 'Flower prices fluctuate daily with weather and festival dates. Perishable nature requires quick daily turnaround. Success is not guaranteed.',
    disclaimerNoteTa: 'பூக்களின் விலை தினமும் மாறும்; அழுகும் தன்மை கொண்டதால் அன்றே விற்க வேண்டும். லாபத்திற்கு உத்தரவாதம் இல்லை.'
  }
];
