/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BusinessPlan } from '../types';

export interface IdeaInputParams {
  skill: string;
  hours: string;
  budget: string;
  location: string;
}

export function generateCustomBusinessPlan(params: IdeaInputParams): BusinessPlan {
  const { skill, hours, budget, location } = params;

  // Rule-based customized intelligent plan generation tailored for rural women & homemakers
  if (skill === 'cooking') {
    if (budget === 'low') {
      return {
        title: 'Morning Idli Batter & Ready-to-Cook Chutney Podi',
        titleTa: 'வீட்டு முறையில் இட்லி மாவு & உடனடி சட்னி பொடிகள்',
        summary: 'Preparing fresh, stone-ground idli-dosa batter and delivering it in 1kg packets to working families every morning.',
        summaryTa: 'கலப்படமில்லாத தூய இட்லி தோசை மாவை அரைத்து பாக்கெட்டுகளில் காலை நேரத்தில் அக்கம் பக்கத்து வீடுகளுக்கு விநியோகித்தல்.',
        estimatedBudget: 850,
        expectedMonthlyIncome: '₹6,000 - ₹12,000',
        expectedMonthlyIncomeTa: 'மாதம் ₹6,000 முதல் ₹12,000 வரை',
        dailyTimeRequired: hours === '1-2' ? '1.5 Hours (Early morning & night soak)' : '2-3 Hours',
        dailyTimeRequiredTa: 'தினமும் 1.5 - 2 மணி நேரம் (காலை நேரம்)',
        budgetBreakdown: [
          { item: 'Raw Idli Rice & Urad Dal (10kg starting stock)', itemTa: 'இட்லி புழுங்கல் அரிசி & உளுந்து (10 கிலோ)', amount: 450 },
          { item: 'Food-grade 1kg Sealable Pouches (100 bags)', itemTa: 'உணவு தர பாக்கெட்டுகள் (100 பைகள்)', amount: 150 },
          { item: 'Salt & Grinder Electricity/Wear allowance', itemTa: 'உப்பு மற்றும் மின்சார செலவு', amount: 100 },
          { item: 'Simple printed contact stickers', itemTa: 'தொடர்பு எண் ஸ்டிக்கர்கள்', amount: 150 }
        ],
        stepsToLaunch: [
          {
            step: 1,
            title: 'Soak & Recipe Balance',
            titleTa: 'அரிசி உளுந்து விகிதம்',
            desc: '4:1 ratio of idli rice to black/white urad dal for soft, fluffy idlis.',
            descTa: '4 பங்கு இட்லி அரிசிக்கு 1 பங்கு உளுந்து சேர்த்து பஞ்சு போன்ற இட்லிக்கு சரியான பக்குவத்தை உறுதி செய்யவும்.'
          },
          {
            step: 2,
            title: 'Sample Testing with 5 Neighbours',
            titleTa: '5 வீடுகளுக்கு மாதிரி வழங்குதல்',
            desc: 'Give free 500g batter to 5 trusted families and receive their honest texture feedback.',
            descTa: '5 தெரிந்த குடும்பங்களுக்கு அரை கிலோ இலவசமாக கொடுத்து இட்லியின் மென்மையை சோதிக்க சொல்லுங்கள்.'
          },
          {
            step: 3,
            title: 'Morning Timely Delivery',
            titleTa: 'காலை 6 மணிக்கு டெலிவரி',
            desc: 'Deliver or keep packets ready by 6:00 AM before school and office routines begin.',
            descTa: 'பள்ளி மற்றும் வேலைக்கு கிளம்பும் முன் காலை 6:00 மணிக்கே பாக்கெட்டுகளை தயார் நிலையில் வையுங்கள்.'
          },
          {
            step: 4,
            title: 'Offer Sunday Special Dosa Batters',
            titleTa: 'ஞாயிறு சிறப்பு மாவு ரகங்கள்',
            desc: 'Introduce Ragi batter or Kambu (millet) batter on weekends for higher margins.',
            descTa: 'வார இறுதியில் கேழ்வரகு மாவு, தினை மாவு போன்ற ஆரோக்கிய மாவு ரகங்களை அறிமுகப்படுத்துங்கள்.'
          }
        ],
        firstCustomersStrategy: [
          'Talk to women working in the local primary school, bank, or government office.',
          'Post a short message or photo on your family WhatsApp group.',
          'Leave a simple notice at the local tea shop where people gather in the morning.'
        ],
        firstCustomersStrategyTa: [
          'அருகில் உள்ள பள்ளி ஆசிரியைகள், வங்கி பணியாளர்களிடம் பேசுங்கள்.',
          'குடும்ப மற்றும் தெரு வாட்ஸ்அப் குழுவில் தகவல் பகிருங்கள்.',
          'மக்கள் காலை கூடும் கிராம டீக்கடை அருகில் சிறிய தகவல் பலகை வையுங்கள்.'
        ],
        cautionAdvice: 'Always wash grinder thoroughly and keep batter naturally fermented without artificial soda or chemicals. Honest quality creates lifelong buyers.',
        cautionAdviceTa: 'சோடா மாவு அல்லது செயற்கை பொருட்கள் எதையும் சேர்க்காதீர்கள். இயற்கை புளிப்பும் தூய்மையும் தான் வாழ்நாள் வாடிக்கையாளர்களை உருவாக்கும்.'
      };
    } else {
      return {
        title: 'Home-Catering, Healthy Snacks & Evening Tiffin Service',
        titleTa: 'வீட்டு சமையல், சுண்டல் & மாலை நேர ஆரோக்கிய தின்பண்டங்கள்',
        summary: 'Preparing healthy evening snacks like sprouted sundal, kuzhi paniyaram, and wholesome packed lunches for local workers and shopkeepers.',
        summaryTa: 'வேலைக்கு செல்வோர் மற்றும் கடைக்காரர்களுக்கு ஆரோக்கியமான மாலை தின்பண்டங்கள் மற்றும் மதிய உணவு தயாரிப்பு.',
        estimatedBudget: 2200,
        expectedMonthlyIncome: '₹9,000 - ₹20,000',
        expectedMonthlyIncomeTa: 'மாதம் ₹9,000 முதல் ₹20,000 வரை',
        dailyTimeRequired: '3-4 Hours',
        dailyTimeRequiredTa: 'தினமும் 3-4 மணி நேரம்',
        budgetBreakdown: [
          { item: 'Pulses, Millets, Oil and Spices', itemTa: 'பயறு வகைகள், சிறுதானியங்கள், நல்லெண்ணெய்', amount: 1200 },
          { item: 'Eco-friendly areca leaf bowls & paper wraps', itemTa: 'பாக்குமட்டை கிண்ணங்கள், பேப்பர் பைகள்', amount: 400 },
          { item: 'Gas cylinder refill portion', itemTa: 'எரிவாயு சிலிண்டர் பங்கு', amount: 400 },
          { item: 'Sample distribution and hygiene caps', itemTa: 'மாதிரி விநியோகம் & தலை உறை', amount: 200 }
        ],
        stepsToLaunch: [
          { step: 1, title: 'Menu Selection', titleTa: 'மெனு தேர்வு', desc: 'Focus on 2 core items daily (e.g., Kondakadalai sundal + Ragi vadai).', descTa: 'தினமும் 2 முக்கிய உணவுகளை மட்டும் சுவையாக செய்யுங்கள் (சுண்டல், கேழ்வரகு வடை).' },
          { step: 2, title: 'Tie-up with Local Shops', titleTa: 'கடைகளுடன் ஒப்பந்தம்', desc: 'Offer to supply 15 packets daily to 2 nearby grocery or tea shops on sale basis.', descTa: 'அருகில் உள்ள 2 கடைகளில் தினமும் 15 பாக்கெட்டுகளை விற்றுத் தர பேசுங்கள்.' },
          { step: 3, title: 'Fixed Evening Time', titleTa: 'சரியான மாலை நேரம்', desc: 'Have snacks ready sharply at 4:30 PM when people return from fields and work.', descTa: 'வேலை முடிந்து மக்கள் திரும்பும் மாலை 4:30 மணிக்கு தயாராக வையுங்கள்.' },
          { step: 4, title: 'Collect Cash or UPI', titleTa: 'பணம் & UPI வசதி', desc: 'Keep a Google Pay QR code printed for seamless payments.', descTa: 'எளிய பணப் பரிவர்த்தனைக்கு கூகுள் பே QR கோடு ஒட்டி வையுங்கள்.' }
        ],
        firstCustomersStrategy: [
          'Shopkeepers in the village junction who cannot leave their shops to buy snacks.',
          'SHG members during weekly federation meetings.',
          'Parents waiting outside tuition centers or schools.'
        ],
        firstCustomersStrategyTa: [
          'கடையை விட்டு வெளியே வர முடியாத கிராம பஜார் கடைக்காரர்கள்.',
          'வாராந்திர சுயஉதவிக்குழு கூட்டத்தில் பங்கேற்கும் பெண்கள்.',
          'பள்ளி/டியூஷன் வாசலில் குழந்தைகளுக்காக காத்திருக்கும் பெற்றோர்கள்.'
        ],
        cautionAdvice: 'Always wear clean hair cap and keep utensils covered. Food safety is your biggest marketing asset.',
        cautionAdviceTa: 'உணவு சமைக்கும் போது தலையை மூடி சுத்தமாக சமையுங்கள். சுகாதாரமே உங்கள் மிகப்பெரிய பலம்.'
      };
    }
  }

  if (skill === 'tailoring') {
    return {
      title: 'Home Boutique: Blouse Designing, Falls & Children’s Dresses',
      titleTa: 'வீட்டு தையலகம்: டிசைனர் ஜாக்கெட் & குழந்தைகளின் உடைகள்',
      summary: 'High-margin home tailoring focusing on custom-fit blouses, wedding tassels (kuchu), and school uniform alterations.',
      summaryTa: 'பொருத்தமான அளவு ஜாக்கெட்டுகள், சேலை குச்சு கட்டுதல் மற்றும் பள்ளி சீருடை தைத்து தருதல்.',
      estimatedBudget: budget === 'low' ? 600 : 2500,
      expectedMonthlyIncome: '₹7,000 - ₹22,000',
      expectedMonthlyIncomeTa: 'மாதம் ₹7,000 முதல் ₹22,000 வரை',
      dailyTimeRequired: hours === '1-2' ? '1-2 Hours (1 blouse / 2 alterations daily)' : '3-4 Hours',
      dailyTimeRequiredTa: 'தினமும் 2-3 மணி நேரம்',
      budgetBreakdown: [
        { item: 'Matching thread spools & hand sewing needles', itemTa: 'வண்ண நூல்கள் & கை ஊசிகள்', amount: 250 },
        { item: 'Tracing wheel, tailor’s chalk and fabric scissors', itemTa: 'சாக்பீஸ், அளவு நாடா & கத்தரிக்கோல்', amount: 250 },
        { item: 'Canvas, lining cloth & piping cord', itemTa: 'லைன் துணி & பைப்பிங் நாடா', amount: 350 },
        { item: 'Embroidery beads and silk thread samples', itemTa: 'ஆரி பாசி மற்றும் பட்டு நூல்கள்', amount: 350 }
      ],
      stepsToLaunch: [
        { step: 1, title: 'Perfect 1 Master Pattern', titleTa: 'சரியான அளவு பேட்டர்ன்', desc: 'Create 3 standard blouse cut patterns (32, 34, 36) for quick stitching.', descTa: 'விரைவாக வெட்டி தைக்க நிலையான அளவு பேட்டர்ன்களை அட்டையில் வெட்டி வையுங்கள்.' },
        { step: 2, title: 'Free Alteration Offer', titleTa: 'ஆரம்ப சலுகை', desc: 'Offer first alteration free or 50% off to let neighbors test your stitching quality.', descTa: 'உங்கள் தையல் நேர்த்தியை அறிய முதல் சிறிய ஆல்டரேஷனை இலவசமாக செய்து கொடுங்கள்.' },
        { step: 3, title: 'Show Before & After', titleTa: 'படங்களை காட்டுங்கள்', desc: 'Take photos of beautiful necklines and saree tassel finishes on your phone.', descTa: 'நீங்கள் தைத்த அழகான கழுத்து டிசைன்களை செல்போனில் புகைப்படம் எடுத்து காட்டுங்கள்.' },
        { step: 4, title: 'Promise Exact Date', titleTa: 'சொன்ன தேதி டெலிவரி', desc: 'Always deliver 1 day before the client’s event. Word of mouth will skyrocket.', descTa: 'விசேஷத்திற்கு முந்தைய நாளே துணியை கொடுத்து ஆச்சரியப்படுத்துங்கள்.' }
      ],
      firstCustomersStrategy: [
        'Teachers in your local village school.',
        'Relatives and brides preparing for upcoming wedding season.',
        'College students who need trendy neck patterns.'
      ],
      firstCustomersStrategyTa: [
        'கிராம பள்ளி ஆசிரியைகள்.',
        'திருமண விசேஷங்களுக்கு தயாராகும் மணமகள் மற்றும் உறவினர்கள்.',
        'புதிய ஃபேஷன் விரும்பும் கல்லூரி மாணவிகள்.'
      ],
      cautionAdvice: 'Always test stitch on a waste fabric first before cutting customer expensive sarees or silk blouses.',
      cautionAdviceTa: 'வாடிக்கையாளரின் பட்டுத் துணியை வெட்டுவதற்கு முன் அளவை இருமுறை சரிபார்க்கவும்.'
    };
  }

  if (skill === 'agriculture' || skill === 'animals') {
    return {
      title: 'Backyard Native Poultry & Free-Range Egg Farm',
      titleTa: 'கொல்லைப்புற நாட்டுக்கோழி & இயற்கை முட்டை உற்பத்தி',
      summary: 'Rearing disease-resistant native breed chicks fed on household waste and free foraging to harvest premium priced organic eggs and meat.',
      summaryTa: 'சமையல் கழிவு மற்றும் கொல்லைப்புற தானியங்களை கொண்டு சிறுவிடை ரக நாட்டுக்கோழிகள் வளர்த்து முட்டை விற்றல்.',
      estimatedBudget: 2400,
      expectedMonthlyIncome: '₹6,000 - ₹15,000',
      expectedMonthlyIncomeTa: 'மாதம் ₹6,000 முதல் ₹15,000 வரை',
      dailyTimeRequired: '1 Hour (Morning and evening check)',
      dailyTimeRequiredTa: 'தினமும் 1 மணி நேரம் (காலை & மாலை தலா 30 நிமிடம்)',
      budgetBreakdown: [
        { item: '10 Native Chicks (30 days old with initial vaccine)', itemTa: '10 நாட்டுக்கோழி குஞ்சுகள் (தடுப்பூசி போடப்பட்டவை)', amount: 800 },
        { item: 'Coop mesh, bamboo poles & latch', itemTa: 'மூங்கில் மற்றும் பாதுகாப்பு கம்பி வலை', amount: 1000 },
        { item: 'Starter feed, ragi, and water troughs', itemTa: 'கம்பு, கேழ்வரகு மற்றும் தண்ணீர் கிண்ணம்', amount: 400 },
        { item: 'Natural herbal medicines (turmeric, aloe vera, pepper)', itemTa: 'இயற்கை மூலிகைகள் (மஞ்சள், சோற்றுக்கற்றாழை)', amount: 200 }
      ],
      stepsToLaunch: [
        { step: 1, title: 'Secure Night Shelter', titleTa: 'பாதுகாப்பான இரவு கூண்டு', desc: 'Ensure coop is raised 1 foot from ground to protect from rain and snakes.', descTa: 'மழை நீர் மற்றும் பாம்புகளிடம் இருந்து பாதுகாக்க கூண்டை தரையிலிருந்து 1 அடி உயரத்தில் அமையுங்கள்.' },
        { step: 2, title: 'Source Vaccinated Chicks', titleTa: 'தரமான குஞ்சுகள் தேர்வு', desc: 'Buy only from known government hatcheries or progressive local farmers.', descTa: 'அரசு கால்நடை பண்ணை அல்லது நம்பகமான பண்ணையில் இருந்து குஞ்சுகளை வாங்குங்கள்.' },
        { step: 3, title: 'Herbal Immunity', titleTa: 'மூலிகை நோய் எதிர்ப்பு', desc: 'Give turmeric water weekly to build natural immunity without costly chemicals.', descTa: 'வாரமொருமுறை குடிநீரில் மஞ்சள் தூள் கலந்து கொடுத்து இயற்கையாக நோய் எதிர்ப்பு சக்தியை கூட்டுங்கள்.' },
        { step: 4, title: 'Collect Daily Eggs', titleTa: 'தினசரி முட்டை சேகரிப்பு', desc: 'Label each fresh egg with date. Sell directly to mothers with small children.', descTa: 'முட்டைகளை சுத்தமாக சேகரித்து குழந்தைகளுக்கு ஊட்டம் தரும் தாய்மார்களிடம் உடனே விற்கலாம்.' }
      ],
      firstCustomersStrategy: [
        'Pregnant and lactating mothers who seek unadulterated native country eggs.',
        'Gym-goers and fitness youth in the town.',
        'Direct buyers who visit your house on Sunday mornings.'
      ],
      firstCustomersStrategyTa: [
        'குழந்தைகளுக்கு சத்தான உணவு தேடும் கிராமத்து தாய்மார்கள்.',
        'உடற்பயிற்சி செய்யும் இளைஞர்கள்.',
        'ஞாயிற்றுக்கிழமைகளில் நேரில் வந்து வாங்கும் வாடிக்கையாளர்கள்.'
      ],
      cautionAdvice: 'Always lock the coop before sunset to protect birds from cats and wild animals.',
      cautionAdviceTa: 'சூரியன் மறைவதற்கு முன்பே கோழிகளை கூண்டில் அடைத்து பூட்டுங்கள்.'
    };
  }

  // Default versatile micro-livelihood for crafts, teaching, or digital
  return {
    title: 'Village Skill Learning & Micro-Services Hub',
    titleTa: 'கிராமப்புற திறன் கற்றல் & அத்தியாவசிய சேவை மையம்',
    summary: 'Using your education, mobile literacy, or crafting knowledge to provide tutoring, handicrafts, or document assistance to village families.',
    summaryTa: 'உங்கள் கல்வி மற்றும் செல்போன் அறிவைப் பயன்படுத்தி பள்ளி குழந்தைகளுக்கு டியூஷன் அல்லது அரசு சான்றிதழ் வழிகாட்டுதல் வழங்குதல்.',
    estimatedBudget: 500,
    expectedMonthlyIncome: '₹5,000 - ₹12,000',
    expectedMonthlyIncomeTa: 'மாதம் ₹5,000 முதல் ₹12,000 வரை',
    dailyTimeRequired: '2 Hours (Evening 5:00 - 7:00 PM)',
    dailyTimeRequiredTa: 'மாலை 5:00 முதல் 7:00 மணி வரை (2 மணி நேரம்)',
    budgetBreakdown: [
      { item: 'Whiteboard, markers and duster', itemTa: 'வெள்ளை பலகை, மார்க்கர் பேனா', amount: 350 },
      { item: 'Pencil, notebooks for demonstration', itemTa: 'நோட்டுப் புத்தகம் & எழுதுபொருட்கள்', amount: 150 }
    ],
    stepsToLaunch: [
      { step: 1, title: 'Set Up Safe Home Space', titleTa: 'வீட்டின் முன் இடம்', desc: 'Clean a well-lit veranda or room with mats for children to sit comfortably.', descTa: 'குழந்தைகள் வசதியாக அமர வீட்டின் தாழ்வாரம் அல்லது அறையை சுத்தமாக தயார் செய்யுங்கள்.' },
      { step: 2, title: 'Focus on 1st to 5th Std', titleTa: '1 முதல் 5-ஆம் வகுப்பு வரை', desc: 'Help primary school children complete their homework and read Tamil and English clearly.', descTa: 'ஆரம்பப் பள்ளி மாணவர்களின் வீட்டுப் பாடம் மற்றும் வாசிப்புத் திறனை மேம்படுத்துங்கள்.' },
      { step: 3, title: 'Affordable Monthly Fee', titleTa: 'நியாயமான கட்டணம்', desc: 'Charge ₹300 - ₹500 per child per month. With 10 children, that is ₹4,000 pure income.', descTa: 'ஒரு குழந்தைக்கு மாதம் ₹300 முதல் ₹400 வரை நியாயமான கட்டணம் நிர்ணயித்தால் 10 குழந்தைகளுக்கு ₹3,500 நிகர லாபம்.' },
      { step: 4, title: 'Conduct Fun Reading Contests', titleTa: 'சுவாரஸ்ய போட்டிகள்', desc: 'Give small star stickers for children who improve. Parents will happily recommend you.', descTa: 'நன்றாக படிக்கும் குழந்தைகளுக்கு ஸ்டார் ஸ்டிக்கர் கொடுத்து ஊக்கப்படுத்துங்கள்.' }
    ],
    firstCustomersStrategy: [
      'Parents in your street who are busy with agricultural or factory work.',
      'Grandparents looking after school children.',
      'Word of mouth from delighted children.'
    ],
    firstCustomersStrategyTa: [
      'விவசாய அல்லது மில் வேலைக்கு செல்லும் பெற்றோர்.',
      'குழந்தைகளை கவனிக்கும் தாத்தா பாட்டிகள்.',
      'மகிழ்ச்சியுடன் படிக்கும் குழந்தைகளின் வாயிலாக மற்ற பெற்றோர்கள்.'
    ],
    cautionAdvice: 'Be patient, kind, and loving with children. Praise effort rather than scolding mistakes.',
    cautionAdviceTa: 'குழந்தைகளிடம் எப்போதும் அன்பாகவும் பொறுமையாகவும் இருங்கள். ஊக்கமே சிறந்த கல்வி.'
  };
}
