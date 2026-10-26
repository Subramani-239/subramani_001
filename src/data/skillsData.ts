/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SkillOpportunity } from '../types';

export const skillsData: SkillOpportunity[] = [
  {
    id: 'tailoring-aari-blouse',
    title: 'Custom Tailoring, Blouse Alterations & Aari Embroidery',
    titleTa: 'தையல் கலை, ஜாக்கெட் ஆல்டரேஷன் & ஆரி வேலைப்பாடு',
    category: 'craft_tailoring',
    timeNeeded: '3-4 hrs',
    timeNeededTa: 'தினமும் 3-4 மணி நேரம்',
    minInvestment: 1500,
    monthlyEarningPotential: '₹6,000 - ₹18,000',
    monthlyEarningPotentialTa: 'மாதம் ₹6,000 முதல் ₹18,000 வரை',
    shortSummary: 'Stitching everyday blouses, nighties, school uniforms, and festival bridal aari work for neighborhood women.',
    shortSummaryTa: 'அக்கம்பக்கத்து பெண்கள் மற்றும் விசேஷங்களுக்கு ஜாக்கெட் தைத்தல், நைட்டி தயாரித்தல் மற்றும் ஆரி எம்ப்ராய்டரி.',
    equipmentNeeded: [
      'Sewing machine (can be obtained via free govt scheme or second-hand ₹2,500)',
      'Measuring tape, tailoring chalk, sharp scissors (₹300)',
      'Thread spools in common colors, bobbin cases (₹200)',
      'Aari embroidery stand, needles, beads and stones for bridal work (₹500)'
    ],
    equipmentNeededTa: [
      'தையல் இயந்திரம் (அரசு இலவச தையல் திட்டம் அல்லது பழையது ₹2,500)',
      'அளவு நாடா (டேப்), கத்தரிக்கோல், சாக்பீஸ் (₹300)',
      'அனைத்து வண்ண நூல் உருளைகள், பாபின் (₹200)',
      'ஆரி ஸ்டாண்ட், ஊசி, பாசி மற்றும் ஜரிகை நூல்கள் (₹500)'
    ],
    stepsToStart: [
      'Step 1: Start with simple alterations (shortening skirts, altering nighties, fixing falls on sarees) for neighbors to build trust.',
      'Step 2: Stitch sample designer blouses for yourself and family to show as live catalog.',
      'Step 3: Put up a simple handwritten sign board outside your home.',
      'Step 4: Take festival orders (Deepavali, Pongal, weddings) 3 weeks in advance with 50% advance payment.'
    ],
    stepsToStartTa: [
      'படி 1: முதலில் சுடிதார்/நைட்டி ஆல்டரேஷன், சேலைக்கு ஃபால்ஸ் தைப்பது போன்ற எளிய வேலைகளுடன் தொடங்குங்கள்.',
      'படி 2: உங்களுக்கோ அல்லது குடும்பத்தினருக்கோ புது மாடல் ஜாக்கெட் தைத்து காட்டி நம்பிக்கை பெறுங்கள்.',
      'படி 3: வீட்டு வாசலில் "இங்கு சுடிதார், ஜாக்கெட் தைத்து தரப்படும்" என சிறிய பலகை வையுங்கள்.',
      'படி 4: பண்டிகைக் காலங்களில் (தீபாவளி, பொங்கல்) 3 வாரங்களுக்கு முன்பே 50% முன்பணத்துடன் ஆர்டர் எடுங்கள்.'
    ],
    whereToSell: [
      'Neighbors and relatives in your street/village',
      'Local school teachers and Anganwadi workers',
      'Display sample photos on WhatsApp status',
      'Tie-up with local garment shops for alterations'
    ],
    whereToSellTa: [
      'உங்கள் தெரு மற்றும் ஊரில் உள்ள அக்கம் பக்கத்து பெண்கள்',
      'அங்கன்வாடி பணியாளர்கள், பள்ளி ஆசிரியைகள்',
      'வாட்ஸ்அப் ஸ்டேட்டஸில் புதிய மாடல் படங்களை பகிருங்கள்',
      'ஊர் ஜவுளிக்கடைகளில் ஆல்டரேஷன் ஆர்டர்கள் பெறுங்கள்'
    ],
    successTip: 'Deliver on time! If you promise a blouse by Wednesday, deliver it on Wednesday. Punctuality brings permanent loyal customers.',
    successTipTa: 'சொன்ன நாளில் குறித்த நேரத்தில் தைத்துக் கொடுங்கள்! நீங்கள் தரும் வாடிக்கையாளர் நம்பிக்கை தான் அடுத்தடுத்த ஆர்டர்களை கொண்டு வரும்.'
  },
  {
    id: 'homemade-masala-pickles',
    title: 'Traditional Masala Powders, Idli Podi & Organic Pickles',
    titleTa: 'நாட்டு மசாலா பொடிகள், இட்லி பொடி & சுவையான ஊறுகாய்',
    category: 'food_agriculture',
    timeNeeded: '1-2 hrs',
    timeNeededTa: 'தினமும் 1-2 மணி நேரம்',
    minInvestment: 1200,
    monthlyEarningPotential: '₹5,000 - ₹15,000',
    monthlyEarningPotentialTa: 'மாதம் ₹5,000 முதல் ₹15,000 வரை',
    shortSummary: 'Chemical-free Sambar powder, Rasam powder, Idli podi, Lemon/Mango pickles prepared in home cleanliness.',
    shortSummaryTa: 'கலப்படமில்லாத சாம்பார் பொடி, ரசப்பொடி, எள்ளு இட்லி பொடி, எலுமிச்சை & மாங்காய் ஊறுகாய் தயாரிப்பு.',
    equipmentNeeded: [
      'Heavy-bottom kadai / pan for roasting spices',
      'Home mixie or grinding at local flour mill (₹50 per batch)',
      'Food-grade air-tight glass jars or zip pouches (₹300)',
      'Raw spices: coriander seeds, red chillies, cumin, pepper, dal (₹800)'
    ],
    equipmentNeededTa: [
      'மசாலா வறுக்க கனமான இரும்பு வாணலி / சட்டி',
      'வீட்டு மிக்சி அல்லது மாவு மில்லில் அரைத்தல் (₹50)',
      'காற்று புகாத பிளாஸ்டிக் ஜிப் பைகள் அல்லது பாட்டில்கள் (₹300)',
      'நாட்டு கொத்தமல்லி, வரமிளகாய், சீரகம், மிளகு, உளுந்து (₹800)'
    ],
    stepsToStart: [
      'Step 1: Make small 100g sample packets of Sambar and Idli podi and distribute free to 5 neighbors.',
      'Step 2: Collect their taste feedback and adjust chili/salt levels.',
      'Step 3: Pack with neat labels stating date of manufacture and ingredients.',
      'Step 4: Take weekly orders on Saturdays so ingredients can be freshly bought and ground.'
    ],
    stepsToStartTa: [
      'படி 1: முதலில் 100 கிராம் மாதிரி பொட்டலங்களை செய்து அக்கம் பக்கத்து 5 வீடுகளுக்கு இலவசமாக சுவைக்க கொடுங்கள்.',
      'படி 2: அவர்களின் சுவை ஆலோசனையை கேட்டு தேவையான மாற்றங்களை செய்யுங்கள்.',
      'படி 3: சுத்தமான பாக்கெட்டுகளில் தயாரித்த தேதி குறிப்பிட்டு பேக் செய்யுங்கள்.',
      'படி 4: வாரம் ஒருமுறை ஆர்டர்களை எடுத்து புதிதாக அரைத்து விநியோகம் செய்யுங்கள்.'
    ],
    whereToSell: [
      'Working women and teachers who do not have time to make powders',
      'Local petty shops and tea stalls',
      'SHG weekly gatherings and village exhibitions (Mathi Sandhai)',
      'Relatives living in towns and cities'
    ],
    whereToSellTa: [
      'வேலைக்குச் செல்லும் பெண்கள் மற்றும் ஆசிரியைகள்',
      'கிராம மளிகைக் கடைகள் மற்றும் டீக்கடைகள்',
      'சுயஉதவிக்குழு வாராந்திர கூட்டங்கள் மற்றும் மதி சந்தை',
      'நகரங்களில் வசிக்கும் உறவினர்கள்'
    ],
    successTip: 'Cleanliness and taste consistency are everything. Never compromise on spice quality.',
    successTipTa: 'சுத்தம் மற்றும் சுவையின் தரம் குறையாமல் பார்த்துக் கொள்ளுங்கள். கலப்படமற்ற பொருள் எப்போதும் வாடிக்கையாளர்களை ஈர்க்கும்.'
  },
  {
    id: 'backyard-poultry-country-chicken',
    title: 'Backyard Country Chicken & Fresh Egg Rearing',
    titleTa: 'கொல்லைப்புற நாட்டுக்கோழி வளர்ப்பு & முட்டை விற்பனை',
    category: 'food_agriculture',
    timeNeeded: '1-2 hrs',
    timeNeededTa: 'காலை & மாலை தலா 30 நிமிடம்',
    minInvestment: 2500,
    monthlyEarningPotential: '₹6,000 - ₹16,000',
    monthlyEarningPotentialTa: 'மாதம் ₹6,000 முதல் ₹16,000 வரை',
    shortSummary: 'Rearing pure native breeds (Aseel, Siruvidai) in your house backyard. High demand for genuine country eggs and birds.',
    shortSummaryTa: 'வீட்டு கொல்லைப்புறத்தில் சிறுவிடை, அசீல் ரக நாட்டுக்கோழிகள் வளர்த்து சத்து நிறைந்த நாட்டு முட்டைகள் விற்றல்.',
    equipmentNeeded: [
      'Simple night shelter coop made from bamboo or wire mesh (₹1,000)',
      '10 to 15 country chick birds (₹60 to ₹80 per 30-day chick = ₹900)',
      'Feeders and water drinkers (₹300)',
      'Kitchen waste, grains, termites, azolla feed'
    ],
    equipmentNeededTa: [
      'இரவில் கோழிகள் தங்க மூங்கில் அல்லது கம்பி வலை கூண்டு (₹1,000)',
      '10 முதல் 15 நாட்டுக்கோழி குஞ்சுகள் (தலா ₹70 = ₹900)',
      'தீவன தட்டு மற்றும் தண்ணீர் கிண்ணம் (₹300)',
      'சமையல் கழிவு, தானியங்கள், அசோலா'
    ],
    stepsToStart: [
      'Step 1: Set up a predator-safe coop protected from dogs, cats, and mongoose.',
      'Step 2: Procure 1-month-old vaccinated country chicks from a recognized breeding farm or Krishi Vigyan Kendra (KVK).',
      'Step 3: Allow free-range foraging during daytime; supplement with broken rice, ragi and greens.',
      'Step 4: Collect eggs daily. Pure country eggs sell for ₹10 - ₹15 each.'
    ],
    stepsToStartTa: [
      'படி 1: பூனை, நாய் மற்றும் கீரிகளிடம் இருந்து பாதுகாப்பான எளிய கூண்டு அமையுங்கள்.',
      'படி 2: கேவிகே (KVK) அல்லது தரமான பண்ணையில் தடுப்பூசி போடப்பட்ட 1 மாத குஞ்சுகளை வாங்குங்கள்.',
      'படி 3: பகலில் கொல்லைப்புறத்தில் மேய விடுங்கள்; தவிடு, கம்பு, கீரைகளை கொடுங்கள்.',
      'படி 4: நாட்டுக்கோழி முட்டை ஒன்று ₹10 முதல் ₹15 வரை எளிதாக ஊரிலேயே விற்பனையாகும்.'
    ],
    whereToSell: [
      'Pregnant women and children in the neighborhood needing natural protein',
      'Local organic food buyers in town',
      'Village weekly market (சந்தை)',
      'Direct farm-gate sales to neighbors'
    ],
    whereToSellTa: [
      'அக்கம்பக்கத்தில் உள்ள குழந்தைகள் மற்றும் கர்ப்பிணி தாய்மார்கள்',
      'நகரங்களில் உள்ள இயற்கை உணவு ஆர்வலர்கள்',
      'வாராந்திர கிராம சந்தை',
      'வீட்டிலேயே வாடிக்கையாளர்களுக்கு விற்றல்'
    ],
    successTip: 'Keep coops dry and give timely herbal water (turmeric + garlic + peppercorn decoction) during rainy season to keep chickens disease-free.',
    successTipTa: 'மழைக்காலத்தில் மஞ்சள், பூண்டு, மிளகு கலந்த குடிநீர் கொடுப்பது கோழிகளை சளி மற்றும் நோய்களில் இருந்து இயற்கை முறையில் பாதுகாக்கும்.'
  },
  {
    id: 'mushroom-cultivation',
    title: 'Oyster Mushroom Cultivation at Home',
    titleTa: 'வீட்டு முறையில் சிப்பி காளான் வளர்ப்பு',
    category: 'food_agriculture',
    timeNeeded: '1-2 hrs',
    timeNeededTa: 'தினமும் 1 மணி நேரம்',
    minInvestment: 1000,
    monthlyEarningPotential: '₹6,000 - ₹14,000',
    monthlyEarningPotentialTa: 'மாதம் ₹6,000 முதல் ₹14,000 வரை',
    shortSummary: 'Cultivating nutritious oyster mushrooms using paddy straw beds in any spare corner or dark room.',
    shortSummaryTa: 'நெல் வைக்கோல் மற்றும் காளான் வித்து கொண்டு வீட்டில் உள்ள சிறிய அறையிலேயே அதிக லாபம் தரும் காளான் வளர்ப்பு.',
    equipmentNeeded: [
      'Clean dry paddy straw (available cheaply in villages)',
      'Plastic bags (polypropylene sheets) (₹150)',
      'Mushroom spawn / seeds (₹40 per bottle, 5 bottles = ₹200)',
      'Water spray bottle and rope (₹150)',
      'Large vessel for boiling/steaming straw'
    ],
    equipmentNeededTa: [
      'சுத்தமான நெல் வைக்கோல்',
      'காளான் வளர்ப்பு பாலித்தீன் பைகள் (₹150)',
      'சிப்பி காளான் வித்துக்கள் (பாட்டில் ₹40, 5 பாட்டில் = ₹200)',
      'தண்ணீர் தெளிப்பான் (ஸ்ப்ரேயர்) & கயிறு (₹150)',
      'வைக்கோலை வேகவைக்க பெரிய பாத்திரம்'
    ],
    stepsToStart: [
      'Step 1: Chop paddy straw into 2-inch pieces and boil in hot water for 30 minutes to sterilize.',
      'Step 2: Shade dry straw until moisture is right (sponge feel, no dripping water).',
      'Step 3: Pack in plastic bag in alternating layers of straw and mushroom spawn.',
      'Step 4: Poke 8-10 pinholes for air. Keep in a dark, humid room for 15-20 days until white mycelium covers it, then spray water daily. Harvest fresh mushrooms!'
    ],
    stepsToStartTa: [
      'படி 1: வைக்கோலை 2 அங்குல துண்டுகளாக வெட்டி, கொதிக்கும் நீரில் 30 நிமிடம் வேகவைத்து கிருமிநீக்கம் செய்யவும்.',
      'படி 2: நிழலில் உலர்த்தி சரியான ஈரப்பதத்தில் வைக்கவும்.',
      'படி 3: பாலித்தீன் பையில் ஒரு அடுக்கு வைக்கோல், ஒரு அடுக்கு காளான் வித்து என அடுக்கவும்.',
      'படி 4: 15 நாட்களுக்கு பின் பூஞ்சை படர்ந்ததும், பையை வெட்டி தண்ணீர் தெளித்து வர 3 நாட்களில் காளான் அறுவடை செய்யலாம்.'
    ],
    whereToSell: [
      'Local village vegetable shops and small hotels',
      'Health-conscious households and vegetarian families',
      'Weekly farmers markets (உழவர் சந்தை)',
      'WhatsApp community group in your area'
    ],
    whereToSellTa: [
      'கிராம காய்கறி கடைகள் மற்றும் சிறிய உணவகங்கள்',
      'சத்துணவு விரும்பும் குடும்பங்கள்',
      'உழவர் சந்தை',
      'பகுதி வாட்ஸ்அப் குழுக்கள்'
    ],
    successTip: 'Maintain hygiene when packing the straw beds. Fresh mushrooms sell at ₹200 - ₹280 per kg!',
    successTipTa: 'வைக்கோலை சரியாக வேகவைத்து கிருமிநீக்கம் செய்வது மிக முக்கியம். கிலோ ₹200 முதல் ₹280 வரை உடனே விற்பனையாகும்!'
  },
  {
    id: 'eco-cloth-bags-areca-plates',
    title: 'Eco-Friendly Cloth Bags & Paper Pouch Making',
    titleTa: 'சுற்றுச்சூழல் துணிப்பைகள் & பேப்பர் பைகள் தயாரிப்பு',
    category: 'eco_home',
    timeNeeded: '2-3 hrs',
    timeNeededTa: 'தினமும் 2-3 மணி நேரம்',
    minInvestment: 1800,
    monthlyEarningPotential: '₹7,000 - ₹18,000',
    monthlyEarningPotentialTa: 'மாதம் ₹7,000 முதல் ₹18,000 வரை',
    shortSummary: 'With plastic bans strictly enforced, cotton thamboolam bags, grocery pouches, and newspaper covers have tremendous continuous demand.',
    shortSummaryTa: 'பிளாஸ்டிக் தடைக்கு பின் துணி தாம்பூலப் பைகள், காய்கறி பைகள் மற்றும் மருந்து கடை பேப்பர் கவர்களுக்கு எப்போதும் மவுசு.',
    equipmentNeeded: [
      'Cotton fabric remnants / waste bits purchased by weight from textile towns (Tiruppur/Erode) (₹1,000)',
      'Basic sewing machine and threads',
      'Rope handles or fabric strips',
      'Screen print stencil (optional, for wedding prints) (₹500)'
    ],
    equipmentNeededTa: [
      'எடைக்கு விற்கப்படும் காட்டன் துணி கழிவுகள் / பிட்கள் (₹1,000)',
      'தையல் இயந்திரம் & தையல் நூல்',
      'பை கைப்பிடிக்கான நாடாக்கள்',
      'திருமண தாம்பூல பை அச்சு ஸ்டென்சில் (தேவைப்பட்டால்) (₹500)'
    ],
    stepsToStart: [
      'Step 1: Cut fabrics into standard grocery bag sizes (10x12 inches, 14x16 inches).',
      'Step 2: Stitch double-reinforced handles so the bag carries 5kg weight safely.',
      'Step 3: Meet local medical shop, sweet shop, and temple pooja store owners and show durable samples.',
      'Step 4: Take bulk orders for temple festivals and family weddings.'
    ],
    stepsToStartTa: [
      'படி 1: துணிகளை நிலையான அளவுகளில் (10x12 அங்குலம், 14x16 அங்குலம்) வெட்டவும்.',
      'படி 2: 5 கிலோ எடை தாங்கும் வகையில் கைப்பிடியை இரட்டைத் தையல் போட்டு தைக்கவும்.',
      'படி 3: மருந்துக் கடைகள், பலகாரக் கடைகள் மற்றும் கோவில் பூக்கடைகளிடம் மாதிரிகளைக் காட்டுங்கள்.',
      'படி 4: விசேஷங்களுக்கு மொத்தமாக தாம்பூலப் பை ஆர்டர்கள் எடுங்கள்.'
    ],
    whereToSell: [
      'Local grocery stores, vegetable vendors, and medical pharmacies',
      'Wedding planners and catering groups for Thamboolam gifts',
      'Temple festival committees',
      'School students for book carry bags'
    ],
    whereToSellTa: [
      'கிராம மளிகைக் கடைகள், காய்கறிக் கடைகள், மருந்தகங்கள்',
      'திருமண மண்டபங்கள் மற்றும் கேட்டரிங் குழுக்கள்',
      'கோவில் திருவிழா அமைப்பாளர்கள்',
      'பள்ளி மாணவ மாணவியர்'
    ],
    successTip: 'Make foldable pocket bags that people can keep inside their handbag or bike box. Everyone loves convenient, washable bags.',
    successTipTa: 'மடித்து பைக்குள் வைத்துக்கொள்ளும் நவீன மாடல் பைகளை தைத்தால் மக்கள் விரும்பி வாங்குவார்கள்.'
  },
  {
    id: 'village-esevai-digital-assistant',
    title: 'Village Digital Assistant & e-Sevai Service Point',
    titleTa: 'கிராமப்புற டிஜிட்டல் உதவியாளர் & இ-சேவை வழிகாட்டுதல்',
    category: 'digital_service',
    timeNeeded: 'Flexible',
    timeNeededTa: 'சுய விருப்ப நேரம்',
    minInvestment: 500,
    monthlyEarningPotential: '₹4,000 - ₹12,000',
    monthlyEarningPotentialTa: 'மாதம் ₹4,000 முதல் ₹12,000 வரை',
    shortSummary: 'Assisting fellow village women and elders in applying for smart cards, certificates, scheme applications, and bill payments using your mobile.',
    shortSummaryTa: 'கிராமத்தில் உள்ள முதியவர்கள் மற்றும் பெண்களுக்கு ஸ்மார்ட் கார்டு, சான்றிதழ் விண்ணப்பங்கள் மற்றும் பில் கட்டணங்களை செல்போன் மூலம் செய்து கொடுத்து சேவை கட்டணம் பெறுதல்.',
    equipmentNeeded: [
      'Any working 4G Android smartphone',
      'Internet recharge connection (₹299/mo)',
      'Basic knowledge of TN e-Sevai, TNEB, and Ration card portals (taught free in our app)',
      'Optional: Small mini Bluetooth thermal printer for receipts (₹1,500)'
    ],
    equipmentNeededTa: [
      '4G இணைய வசதி கொண்ட ஸ்மார்ட்போன்',
      'மாதாந்திர டேட்டா ரீசார்ஜ் (₹299)',
      'TNEB மின் கட்டணம், ரேஷன் கார்டு போர்டல் பயன்பாட்டு அறிவு',
      'ரசீது அச்சிட சிறிய புளூடூத் பிரிண்டர் (தேவைப்பட்டால் ₹1,500)'
    ],
    stepsToStart: [
      'Step 1: Register as a village facilitator or assist through common service citizen logins.',
      'Step 2: Help neighbors pay electricity bills (TNEB) and mobile recharges without waiting in queues.',
      'Step 3: Charge nominal service fee of ₹10 - ₹25 per application/bill.',
      'Step 4: Help women apply for Kalaignar Magalir Urimai and school scholarships.'
    ],
    stepsToStartTa: [
      'படி 1: தமிழ்நாடு இ-சேவை குடிமக்கள் போர்ட்டலில் பயனர் கணக்கு உருவாக்கவும்.',
      'படி 2: அக்கம் பக்கத்தினருக்கு வரிசையில் நிற்காமல் மின் கட்டணம், மொபைல் ரீசார்ஜ் செய்து கொடுங்கள்.',
      'படி 3: ஒரு பரிவர்த்தனைக்கு நியாயமான ₹10 முதல் ₹25 வரை சேவை கட்டணம் பெறுங்கள்.',
      'படி 4: பெண்களுக்கு மகளிர் உரிமைத்தொகை மற்றும் கல்வி உதவித்தொகை நிலவரத்தை சரிபார்த்து கொடுங்கள்.'
    ],
    whereToSell: [
      'Elderly citizens in village who do not know how to operate smartphones',
      'Homemakers who cannot travel 10 km to the taluk office',
      'Agricultural workers needing PM-KISAN KYC updates'
    ],
    whereToSellTa: [
      'ஸ்மார்ட்போன் பயன்படுத்தத் தெரியாத கிராமத்து முதியவர்கள்',
      'தாலுகா அலுவலகத்திற்கு 10 கி.மீ செல்ல முடியாத இல்லத்தரசிகள்',
      'பிஎம்-கிசான் eKYC செய்ய வேண்டிய விவசாயிகள்'
    ],
    successTip: 'Maintain absolute honesty with money and customer OTPs. Village people trust respectful, honest daughters of the soil.',
    successTipTa: 'பண விஷயத்திலும் OTP-யிலும் 100% நேர்மையாக இருங்கள். உங்கள் நேர்மை ஊரையே உங்களை நாடி வரச் செய்யும்.'
  }
];
