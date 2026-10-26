/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WholesaleHub } from '../types';

export const verifiedWholesaleHubs: WholesaleHub[] = [
  // =========================================================================
  // PUDUCHERRY MARKETS
  // =========================================================================
  {
    id: 'hub-pondy-goubert-market',
    name: 'Goubert Market (Grand Bazaar) Wholesale Complex',
    nameTa: 'குபேர் அங்காடி (பெரிய மார்க்கெட்) மொத்த விற்பனை வளாகம், புதுச்சேரி',
    nameHi: 'गुबर्ट मार्केट (ग्रैंड बाज़ार) थोक परिसर, पुदुचेरी',
    region: 'puducherry',
    district: 'Puducherry',
    districtTa: 'புதுச்சேரி',
    town: 'Puducherry Town (Boulevard)',
    address: 'Between Nehru Street & Mahatma Gandhi Road, Puducherry - 605001',
    addressTa: 'நேரு வீதி & மகாத்மா காந்தி சாலை சந்திப்பு, புதுச்சேரி - 605001',
    categoriesHandled: ['food_catering', 'agriculture_poultry', 'raw_provisions'],
    benchmarkMaterials: [
      {
        materialName: 'Idli Rice (First Quality Boiled)',
        materialNameTa: 'இட்லி புழுங்கல் அரிசி (முதல் தரம்)',
        benchmarkWholesaleRate: '₹36 - ₹42 / kg (in 25kg bag)',
        minLotSize: '25 kg bag'
      },
      {
        materialName: 'White Urad Dal (Gundu Ulundhu)',
        materialNameTa: 'உடைக்காத வெள்ளை உளுந்து (குண்டு உளுந்து)',
        benchmarkWholesaleRate: '₹120 - ₹135 / kg (in 10kg sack)',
        minLotSize: '10 kg'
      },
      {
        materialName: 'Guntur Dry Red Chillies (Podi grade)',
        materialNameTa: 'குண்டூர் காய்ந்த மிளகாய்',
        benchmarkWholesaleRate: '₹180 - ₹210 / kg',
        minLotSize: '5 kg'
      },
      {
        materialName: 'Cold-pressed Sesame Oil (Gingelly)',
        materialNameTa: 'செக்கு நல்லெண்ணெய்',
        benchmarkWholesaleRate: '₹260 - ₹290 / litre (in 15L tin)',
        minLotSize: '15 Litre Tin'
      }
    ],
    verifiedDate: 'January 2026',
    officialSourceOrNote: 'Puducherry Municipality Regulated Market Benchmark',
    contactOrLocationTip: 'Enter via JN Street eastern wholesale gate before 8:30 AM for wholesale morning auctions.',
    contactOrLocationTipTa: 'காலை 8:30 மணிக்குள் ஜே.என் வீதி மொத்த விற்பனை வாயில் வழியாக சென்றால் மொத்த விலையில் வாங்கலாம்.'
  },
  {
    id: 'hub-pondy-mg-road-tailoring',
    name: 'MG Road & Rangapillai Street Tailoring Haberdashery Hub',
    nameTa: 'எம்.ஜி ரோடு & ரங்கப்பிள்ளை வீதி தையல் மொத்த சந்தை, புதுச்சேரி',
    nameHi: 'एम.जी. रोड सिलाई सामान थोक बाजार, पुदुचेरी',
    region: 'puducherry',
    district: 'Puducherry',
    districtTa: 'புதுச்சேரி',
    town: 'Puducherry Town',
    address: 'Rangapillai Street crossing MG Road, Puducherry - 605001',
    addressTa: 'ரங்கப்பிள்ளை வீதி, எம்.ஜி ரோடு சந்திப்பு, புதுச்சேரி',
    categoriesHandled: ['tailoring_garments', 'handicrafts_eco'],
    benchmarkMaterials: [
      {
        materialName: 'Cotton Blouse Lining Cloth (Rubia 2x2)',
        materialNameTa: 'காட்டன் லைனிங் துணி (ரூபியா 2x2)',
        benchmarkWholesaleRate: '₹28 - ₹34 / metre (in 20m thaan)',
        minLotSize: '20 metres thaan'
      },
      {
        materialName: 'Spun Polyester Sewing Thread (Box of 10 tubes)',
        materialNameTa: 'தையல் நூல் உருளை (10 உருளை கொண்ட பாக்ஸ்)',
        benchmarkWholesaleRate: '₹18 - ₹22 / spool (Wholesale pack ₹200)',
        minLotSize: '1 Box (10 spools)'
      },
      {
        materialName: 'YKK Concealed & Metal Zippers (Pack of 50)',
        materialNameTa: 'ஜிப் மற்றும் ஹூக் பாக்கெட் (50 எண்ணிக்கை)',
        benchmarkWholesaleRate: '₹4.50 - ₹6.50 / piece (bulk pack)',
        minLotSize: '50 pieces'
      },
      {
        materialName: 'Tailoring Carbon & Tailor Chalk Box',
        materialNameTa: 'தையல் சாக்பீஸ் & கார்பன் தாள்',
        benchmarkWholesaleRate: '₹45 / box (50 chalks)',
        minLotSize: '1 Box'
      }
    ],
    verifiedDate: 'January 2026',
    officialSourceOrNote: 'Puducherry Merchants Association Verified Listings',
    contactOrLocationTip: 'Wholesale textile and matching stores offer 15-25% lower rates than retail tailors.',
    contactOrLocationTipTa: 'சில்லறை தையல் கடைகளை விட மொத்தமாக 20 மீட்டர் தான் எடுத்தால் 20% வரை விலை குறையும்.'
  },

  // =========================================================================
  // KARAIKAL MARKETS
  // =========================================================================
  {
    id: 'hub-karaikal-main-market',
    name: 'Karaikal Kamarajar Salai Wholesale Market & Fish Wharf',
    nameTa: 'காரைக்கால் காமராஜர் சாலை மொத்த சந்தை & மீன்பிடி தளம்',
    nameHi: 'काराइकल मुख्य बाजार व मत्स्य केंद्र',
    region: 'puducherry',
    district: 'Karaikal',
    districtTa: 'காரைக்கால்',
    town: 'Karaikal Town',
    address: 'Kamarajar Salai, Near Arasalar Estuary, Karaikal - 609602',
    addressTa: 'காமராஜர் சாலை, அரசலாறு முகத்துவாரம் அருகில், காரைக்கால் - 609602',
    categoriesHandled: ['food_catering', 'agriculture_poultry'],
    benchmarkMaterials: [
      {
        materialName: 'Rock Salt for Dry Fish Curing (50kg bag)',
        materialNameTa: 'கருவாடு பதப்படுத்தும் கல் உப்பு (50 கிலோ மூட்டை)',
        benchmarkWholesaleRate: '₹240 - ₹280 / 50kg bag',
        minLotSize: '1 Bag (50kg)'
      },
      {
        materialName: 'Pure Turmeric Powder & Spices (Bulk)',
        materialNameTa: 'தூய விரலி மஞ்சள் & மசாலா பொருட்கள்',
        benchmarkWholesaleRate: '₹140 - ₹165 / kg',
        minLotSize: '5 kg'
      },
      {
        materialName: 'Food-grade Plastic Sealable Pouches (500g/1kg)',
        materialNameTa: 'உணவு தர பிளாஸ்டிக் சீலிங் கவர்கள் (1000 பைகள்)',
        benchmarkWholesaleRate: '₹120 / bundle of 100 bags',
        minLotSize: '500 bags'
      }
    ],
    verifiedDate: 'January 2026',
    officialSourceOrNote: 'Karaikal Chamber of Commerce Verified Benchmark',
    contactOrLocationTip: 'Direct wholesale fish auctions operate 5:00 AM - 7:30 AM at the harbour jetty.',
    contactOrLocationTipTa: 'காலை 5:00 மணி முதல் 7:30 மணி வரை படகுத்துறையில் நேரடியாக குறைந்த விலையில் மீன்கள் கிடைக்கும்.'
  },
  {
    id: 'hub-karaikal-thirunallar-bazaar',
    name: 'Thirunallar Temple Bazaar & Puja Essentials Cluster',
    nameTa: 'திருநள்ளாறு கோயில் கடைவீதி & பூஜை பொருட்கள் மொத்த சந்தை',
    nameHi: 'तिरुनाल्लार मंदिर बाजार व पूजा सामग्री थोक क्लस्टर',
    region: 'puducherry',
    district: 'Karaikal',
    districtTa: 'காரைக்கால்',
    town: 'Thirunallar',
    address: 'Sannidhi Street & North Street, Thirunallar, Karaikal - 609607',
    addressTa: 'சந்நிதி வீதி, திருநள்ளாறு, காரைக்கால் - 609607',
    categoriesHandled: ['handicrafts_eco', 'beauty_wellness'],
    benchmarkMaterials: [
      {
        materialName: 'Black Sesame Seeds (Thil for deepam)',
        materialNameTa: 'கருப்பு எள் (தீப பரிகாரத்திற்கு)',
        benchmarkWholesaleRate: '₹160 - ₹185 / kg in 10kg lots',
        minLotSize: '10 kg'
      },
      {
        materialName: 'Hand-rolled Cotton Deepam Wicks (Bundle of 1,000)',
        materialNameTa: 'கைத்தறி பருத்தி திரி (1,000 திரிகள் கொண்ட கட்டு)',
        benchmarkWholesaleRate: '₹60 - ₹80 / bundle of 1,000',
        minLotSize: '5 bundles'
      },
      {
        materialName: 'Earthen Clay Small Diyas / Agal Vilakku (Carton of 500)',
        materialNameTa: 'களிமண் அகல் விளக்குகள் (500 விளக்குகள் பெட்டி)',
        benchmarkWholesaleRate: '₹400 - ₹550 / carton (approx ₹0.90 each)',
        minLotSize: '1 carton'
      }
    ],
    verifiedDate: 'January 2026',
    officialSourceOrNote: 'Thirunallar Town Panchayat Wholesale Survey',
    contactOrLocationTip: 'Supplying pre-packed ₹20 & ₹50 pooja kits to pilgrim lodges has steady weekend demand.',
    contactOrLocationTipTa: 'சனிப்பெயர்ச்சி மற்றும் வார இறுதி நாட்களில் பக்தர்கள் தங்கும் விடுதிகளுக்கு ₹20, ₹50 பூஜை கிட்கள் விநியோகிக்கலாம்.'
  },

  // =========================================================================
  // TAMIL NADU MARKETS
  // =========================================================================
  {
    id: 'hub-chennai-sowcarpet-textiles',
    name: 'George Town & Sowcarpet Wholesale Textile Hub, Chennai',
    nameTa: 'ஜார்ஜ் டவுன் & சவுகார்பேட்டை மொத்த ஜவுளி சந்தை, சென்னை',
    nameHi: 'जॉर्ज टाउन एवं सौकारपेट थोक कपड़ा बाजार, चेन्नई',
    region: 'tamil_nadu',
    district: 'Chennai',
    districtTa: 'சென்னை',
    town: 'George Town',
    address: 'Godown Street, Mint Street & Narayana Mudali Street, Chennai - 600001',
    addressTa: 'கோடவுன் வீதி, மின்ட் தெரு, நாராயண முதலி தெரு, சென்னை - 600001',
    categoriesHandled: ['tailoring_garments', 'handicrafts_eco'],
    benchmarkMaterials: [
      {
        materialName: 'Cotton & Rayon Printed Fabric Rolls',
        materialNameTa: 'பிரிண்டட் காட்டன் மற்றும் ரேயான் துணி ரோல்கள்',
        benchmarkWholesaleRate: '₹45 - ₹65 / metre (in 50m rolls)',
        minLotSize: '50 metre roll'
      },
      {
        materialName: 'Aari & Zardosi Embroidery Threads, Stones & Beads',
        materialNameTa: 'ஆரி வேலைப்பாடு ஜரிகை நூல்கள், கற்கள் & மணிகள்',
        benchmarkWholesaleRate: '₹80 - ₹120 / 250g box (Wholesale rate)',
        minLotSize: 'Pack of 5 boxes'
      },
      {
        materialName: 'Saree Fall & Interlock Cotton Tape (100 pieces)',
        materialNameTa: 'சேலை ஃபால்ஸ் (100 எண்ணிக்கை கொண்ட கட்டு)',
        benchmarkWholesaleRate: '₹14 - ₹18 / piece in 100 piece pack',
        minLotSize: '100 pieces'
      }
    ],
    verifiedDate: 'January 2026',
    officialSourceOrNote: 'Tamil Nadu Chamber of Commerce Wholesale Register',
    contactOrLocationTip: 'Take suburban train to Chennai Beach station or metro to High Court station for easy access.',
    contactOrLocationTipTa: 'சென்னை கடற்கரை ரயில் நிலையம் அல்லது உயர்நீதிமன்ற மெட்ரோ அருகில் உள்ளதால் எளிதில் செல்லலாம்.'
  },
  {
    id: 'hub-chennai-parrys-packaging',
    name: 'Parry’s Corner & Bunder Street Packaging Wholesale Hub, Chennai',
    nameTa: 'பாரிமுனை & பந்தர் தெரு பேக்கேஜிங் மற்றும் பைகள் மொத்த சந்தை, சென்னை',
    nameHi: 'पैरिस कॉर्नर पैकेजिंग सामग्री थोक बाजार, चेन्नई',
    region: 'tamil_nadu',
    district: 'Chennai',
    districtTa: 'சென்னை',
    town: 'Parry’s Corner',
    address: 'Bunder Street & Anderson Street, Near Broadway, Chennai - 600001',
    addressTa: 'பந்தர் தெரு & ஆண்டர்சன் தெரு, பிராட்வே அருகில், சென்னை - 600001',
    categoriesHandled: ['food_catering', 'tailoring_garments', 'handicrafts_eco'],
    benchmarkMaterials: [
      {
        materialName: 'Kraft Paper Bags with Twisted Handles (100 pcs)',
        materialNameTa: 'கிராஃப்ட் பேப்பர் பைகள் (100 எண்ணிக்கை)',
        benchmarkWholesaleRate: '₹3.50 - ₹5.50 / bag (in 500 pack)',
        minLotSize: '500 bags'
      },
      {
        materialName: 'Aluminium Foil Food Containers with Lids (450ml, 100 pcs)',
        materialNameTa: 'அலுமினியம் உணவு பேக்கிங் டப்பாக்கள் (100 எண்ணிக்கை)',
        benchmarkWholesaleRate: '₹2.80 - ₹3.40 / piece in carton of 500',
        minLotSize: '1 carton (500 pcs)'
      },
      {
        materialName: 'Custom Self-Adhesive Sticker Labels (1,000 sheets)',
        materialNameTa: 'பிராண்ட் ஸ்டிக்கர் லேபிள்கள் (1,000 ஸ்டிக்கர்கள்)',
        benchmarkWholesaleRate: '₹0.40 - ₹0.75 / sticker for 1,000 pcs',
        minLotSize: '1,000 stickers'
      }
    ],
    verifiedDate: 'January 2026',
    officialSourceOrNote: 'Chennai Packaging Manufacturers Benchmark',
    contactOrLocationTip: 'The ultimate source in Tamil Nadu for eco-friendly boxes, pouches, and sealing tape.',
    contactOrLocationTipTa: 'தமிழ்நாட்டில் அனைத்து விதமான பாக்கெட்டுகள், அட்டை பெட்டிகள் வாங்க மிகச்சிறந்த மொத்த சந்தை.'
  },
  {
    id: 'hub-madurai-masi-street-provisions',
    name: 'East Masi Street & South Masi Street Wholesale Provision Mandi, Madurai',
    nameTa: 'கிழக்கு மாசி வீதி & தெற்கு மாசி வீதி மளிகை மண்டி, மதுரை',
    nameHi: 'ईस्ट मासी स्ट्रीट किराना एवं मसाला थोक मंडी, मदुरै',
    region: 'tamil_nadu',
    district: 'Madurai',
    districtTa: 'மதுரை',
    town: 'Madurai Central',
    address: 'East Masi Street & South Masi Street, Madurai - 625001',
    addressTa: 'கிழக்கு மாசி வீதி & தெற்கு மாசி வீதி, மதுரை - 625001',
    categoriesHandled: ['food_catering', 'agriculture_poultry'],
    benchmarkMaterials: [
      {
        materialName: 'Gram Flour (Besan / Kadalai Maavu - First Quality)',
        materialNameTa: 'முதல் தர கடலை மாவு (முறுக்கு, காராசேவ் தயார் செய்ய)',
        benchmarkWholesaleRate: '₹88 - ₹96 / kg (in 30kg bag)',
        minLotSize: '30 kg bag'
      },
      {
        materialName: 'Roasted Gram (Pottukadalai)',
        materialNameTa: 'பொட்டுக்கடலை (சட்னி & பலகாரத்திற்கு)',
        benchmarkWholesaleRate: '₹95 - ₹105 / kg (in 25kg bag)',
        minLotSize: '25 kg bag'
      },
      {
        materialName: 'Pure Groundnut Oil (Wood Cold Pressed)',
        materialNameTa: 'மரச்செக்கு கடலை எண்ணெய்',
        benchmarkWholesaleRate: '₹190 - ₹210 / litre (in 15kg tin)',
        minLotSize: '15 kg Tin'
      }
    ],
    verifiedDate: 'January 2026',
    officialSourceOrNote: 'Madurai District Grain & Provision Merchants Association',
    contactOrLocationTip: 'Located near Meenakshi Temple; morning wholesale transactions happen between 7 AM and 11 AM.',
    contactOrLocationTipTa: 'மதுரை மீனாட்சி அம்மன் கோவில் அருகில் உள்ளது; காலை 7 மணி முதல் 11 மணிக்குள் மொத்த வியாபாரம் நடைபெறும்.'
  },
  {
    id: 'hub-madurai-mattuthavani-flowers',
    name: 'Mattuthavani Integrated Flower & Agri Market, Madurai',
    nameTa: 'மாட்டுத்தாவணி ஒருங்கிணைந்த மலர் வணிக வளாகம், மதுரை',
    nameHi: 'माट्टुथावणी एकीकृत फूल एवं कृषि बाजार, मदुरै',
    region: 'tamil_nadu',
    district: 'Madurai',
    districtTa: 'மதுரை',
    town: 'Mattuthavani',
    address: 'Opposite Mattuthavani Central Bus Stand, Madurai - 625007',
    addressTa: 'மாட்டுத்தாவணி பேருந்து நிலையம் எதிரில், மதுரை - 625007',
    categoriesHandled: ['agriculture_poultry', 'beauty_wellness'],
    benchmarkMaterials: [
      {
        materialName: 'GI Tagged Madurai Malli (Jasmine buds in bulk)',
        materialNameTa: 'புவிசார் குறியீடு பெற்ற மதுரை மல்லிகை (மொத்த எடை)',
        benchmarkWholesaleRate: '₹250 - ₹600 / kg (season dependent)',
        minLotSize: '1 kg'
      },
      {
        materialName: 'Banana Fibre / Cotton Garland String (Kattu)',
        materialNameTa: 'பூ கட்டும் வாழை நார்ப்பட்டை & பருத்தி நூல்',
        benchmarkWholesaleRate: '₹35 / bundle',
        minLotSize: '5 bundles'
      }
    ],
    verifiedDate: 'January 2026',
    officialSourceOrNote: 'Madurai Flower Commission Agents Association',
    contactOrLocationTip: 'Morning auction starts at 4:30 AM. Women who purchase directly can string garlands for 100%+ value addition.',
    contactOrLocationTipTa: 'காலை 4:30 மணிக்கு ஏலம் தொடங்கும்; மாலையாக கட்டி விற்றால் இரட்டிப்பு வருமானம் கிடைக்கும்.'
  },
  {
    id: 'hub-coimbatore-sukrawarpet',
    name: 'Sukrawarpet & Raja Street Textile Accessories Hub, Coimbatore',
    nameTa: 'சுக்கிரவார்பேட்டை & ராஜா வீதி ஜவுளி உபகரண மொத்த சந்தை, கோவை',
    nameHi: 'सुकरावारपेट एवं राजा स्ट्रीट टेक्सटाइल थोक बाजार, कोयंबटूर',
    region: 'tamil_nadu',
    district: 'Coimbatore',
    districtTa: 'கோயம்புத்தூர்',
    town: 'Coimbatore Central',
    address: 'Sukrawarpet Street, Near Town Hall, Coimbatore - 641001',
    addressTa: 'சுக்கிரவார்பேட்டை, டவுன்ஹால் அருகில், கோயம்புத்தூர் - 641001',
    categoriesHandled: ['tailoring_garments', 'handicrafts_eco'],
    benchmarkMaterials: [
      {
        materialName: 'Export Knitwear Cotton Combed Single Jersey Rolls',
        materialNameTa: 'பனியன் & டீசர்ட் காட்டன் நிட்வேர் துணி ரோல்கள்',
        benchmarkWholesaleRate: '₹220 - ₹280 / kg (in 20kg rolls)',
        minLotSize: '20 kg roll'
      },
      {
        materialName: 'Interlock Cotton Thread Cones (5,000 metres cone)',
        materialNameTa: 'ஓவர்லாக் & தையல் கோன் நூல் (5,000 மீட்டர்)',
        benchmarkWholesaleRate: '₹42 - ₹55 / cone',
        minLotSize: 'Box of 12 cones'
      }
    ],
    verifiedDate: 'January 2026',
    officialSourceOrNote: 'Coimbatore District Small Scale Textile Guild',
    contactOrLocationTip: 'Best wholesale rates for cotton knits, nighty fabrics, and industrial sewing needles in Western Tamil Nadu.',
    contactOrLocationTipTa: 'நைட்டி துணிகள், மெஷின் ஊசிகள் மற்றும் பனியன் துணிகளை மிகக் குறைந்த விலையில் பெறலாம்.'
  },
  {
    id: 'hub-salem-shevapet',
    name: 'Shevapet Wholesale Agro & Grain Mandi, Salem',
    nameTa: 'செவ்வாய்பேட்டை விவசாய பொருட்கள் & மளிகை மொத்த மண்டி, சேலம்',
    nameHi: 'शेवापेट थोक कृषि एवं खाद्यान्न मंडी, सलेम',
    region: 'tamil_nadu',
    district: 'Salem',
    districtTa: 'சேலம்',
    town: 'Shevapet',
    address: 'Main Bazaar, Shevapet, Salem - 636002',
    addressTa: 'முதன்மை கடைவீதி, செவ்வாய்பேட்டை, சேலம் - 636002',
    categoriesHandled: ['food_catering', 'agriculture_poultry'],
    benchmarkMaterials: [
      {
        materialName: 'Salem Curcuma Longa (Virali Turmeric Finger Whole)',
        materialNameTa: 'சேலம் விரலி மஞ்சள் (முழுமையான கிழங்கு)',
        benchmarkWholesaleRate: '₹115 - ₹130 / kg in 50kg gunny bag',
        minLotSize: '50 kg bag'
      },
      {
        materialName: 'Raw Tapioca Starch & Sago (Javvarisi)',
        materialNameTa: 'சேலம் ஜவ்வரிசி (முதல் தரம் பலகார தயாரிப்பு)',
        benchmarkWholesaleRate: '₹55 - ₹65 / kg (in 30kg sack)',
        minLotSize: '30 kg sack'
      }
    ],
    verifiedDate: 'January 2026',
    officialSourceOrNote: 'Salem Regulated Market Committee Data',
    contactOrLocationTip: 'Direct wholesale mandi for pure Salem turmeric and starch for home food processing.',
    contactOrLocationTipTa: 'சேலத்தின் பாரம்பரிய மஞ்சள் மற்றும் ஜவ்வரிசி மொத்தமாக வாங்க சிறந்த மண்டி.'
  }
];
