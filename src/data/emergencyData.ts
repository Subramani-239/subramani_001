/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EmergencyServiceLocation } from '../types';

export const initialEmergencyServices: EmergencyServiceLocation[] = [
  {
    id: 'em-pol-1',
    name: 'All Women Police Station (AWPS) - Central',
    nameTa: 'அனைத்து மகளிர் காவல் நிலையம் (மத்திய பிரிவு)',
    nameHi: 'महिला पुलिस थाना (केंद्रीय)',
    type: 'police',
    address: 'Near District Collectorate Complex & Taluk Office',
    addressTa: 'மாவட்ட ஆட்சியர் அலுவலக வளாகம் & தாலுகா அலுவலகம் அருகில்',
    addressHi: 'जिला कलेक्ट्रेट परिसर एवं तहसील कार्यालय के पास',
    phone: '044-23452345',
    lat: 13.0827,
    lng: 80.2707,
  },
  {
    id: 'em-pol-2',
    name: 'Town Police Station & Women Help Desk',
    nameTa: 'நகர காவல் நிலையம் & மகளிர் உதவி மையம்',
    nameHi: 'नगर पुलिस स्टेशन व महिला हेल्प डेस्क',
    type: 'police',
    address: 'Main Bazaar Road, Near Bus Stand',
    addressTa: 'பிரதான பஜார் சாலை, பேருந்து நிலையம் அருகில்',
    addressHi: 'मुख्य बाजार रोड, बस स्टैंड के पास',
    phone: '04342-260100',
    lat: 12.1211,
    lng: 78.1582,
  },
  {
    id: 'em-hosp-1',
    name: 'Government District Headquarters Hospital (24x7 Emergency)',
    nameTa: 'அரசு தலைமை மாவட்ட மருத்துவமனை (24 மணி நேர அவசர பிரிவு)',
    nameHi: 'सरकारी जिला मुख्यालय अस्पताल (24x7 आपातकालीन)',
    type: 'hospital',
    address: 'Hospital Road, Maternity & Trauma Wing',
    addressTa: 'மருத்துவமனை சாலை, தாய் சேய் நலம் மற்றும் அவசர சிகிச்சை பிரிவு',
    addressHi: 'हॉस्पिटल रोड, मातृ एवं आघात विंग',
    phone: '04342-260222',
    lat: 12.1325,
    lng: 78.1625,
  },
  {
    id: 'em-hosp-2',
    name: 'Primary Health Centre (PHC) & Maternity Welfare Unit',
    nameTa: 'அரசு ஆரம்ப சுகாதார நிலையம் (PHC) & மகப்பேறு நலம்',
    nameHi: 'प्राथमिक स्वास्थ्य केंद्र (PHC) व प्रसूति कल्याण केंद्र',
    type: 'medical_center',
    address: 'Village Panchayat Union Road',
    addressTa: 'ஊராட்சி ஒன்றிய சாலை, கிராம மையம்',
    addressHi: 'ग्राम पंचायत यूनियन रोड',
    phone: '04342-261333',
    lat: 12.115,
    lng: 78.152,
  },
  {
    id: 'em-cntr-1',
    name: 'One Stop Centre (Sakhi - Women Support & Shelter)',
    nameTa: 'சகி மகளிர் ஒன் ஸ்டாப் ஆதரவு மையம்',
    nameHi: 'सखी वन स्टॉप सेंटर (महिला सहायता व आश्रय)',
    type: 'emergency_center' as any,
    address: 'Old Collectorate Campus, Women Welfare Wing',
    addressTa: 'பழைய ஆட்சியர் அலுவலக வளாகம், மகளிர் நல பிரிவு',
    addressHi: 'पुराना कलेक्ट्रेट परिसर, महिला कल्याण विंग',
    phone: '044-25619208',
    lat: 13.085,
    lng: 80.275,
  },
];
