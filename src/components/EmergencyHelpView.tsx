/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  PhoneCall,
  MapPin,
  ShieldAlert,
  AlertTriangle,
  Send,
  Navigation,
  ExternalLink,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Search,
  Building,
  HeartPulse,
  Shield,
  Volume2
} from 'lucide-react';
import { Language, EmergencyServiceLocation, UserProfile } from '../types';
import { initialEmergencyServices } from '../data/emergencyData';
import { translations } from '../data/translations';
import { calculateDistanceKm } from '../utils/calculator';
import { speakText } from '../utils/speech';

interface EmergencyHelpViewProps {
  lang: Language;
  userProfile: UserProfile;
}

export const EmergencyHelpView: React.FC<EmergencyHelpViewProps> = ({
  lang,
  userProfile,
}) => {
  const t = translations[lang];

  // Geolocation States
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<
    'idle' | 'locating' | 'granted' | 'denied' | 'manual'
  >('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [manualLocationText, setManualLocationText] = useState(userProfile.location || '');

  // Filter Categories: all | police | hospital | medical_center
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // SOS Confirmation Modal
  const [showSosConfirm, setShowSosConfirm] = useState(false);
  const [sosStatusNotice, setSosStatusNotice] = useState<string | null>(null);

  // Calculate distances to emergency centers based on current coords or default coords
  const userLat = coords?.lat ?? 12.1211; // Default reference: Dharmapuri / Salem district region
  const userLng = coords?.lng ?? 78.1582;

  const servicesWithDistances = initialEmergencyServices.map((service) => {
    const dist = calculateDistanceKm(userLat, userLng, service.lat, service.lng);
    return {
      ...service,
      distanceKm: dist,
    };
  }).sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));

  const filteredServices = servicesWithDistances.filter((s) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'police' && s.type === 'police') return true;
    if (selectedCategory === 'hospital' && (s.type === 'hospital' || s.type === 'medical_center')) return true;
    return false;
  });

  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('denied');
      setErrorMessage(
        lang === 'ta'
          ? 'உங்கள் உலாவியில் GPS ஆதரிக்கப்படவில்லை. கீழே உங்கள் ஊரை உள்ளிடவும்.'
          : lang === 'hi'
          ? 'आपके ब्राउज़र में जीपीएस सुविधा नहीं है। नीचे अपना स्थान दर्ज करें।'
          : 'Geolocation is not supported by your browser. Please enter location manually.'
      );
      return;
    }

    setIsLocating(true);
    setLocationStatus('locating');
    setErrorMessage(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationStatus('granted');
      },
      (error) => {
        setIsLocating(false);
        setLocationStatus('denied');
        let msg = t.emergency.locationDenied;
        if (error.code === error.PERMISSION_DENIED) {
          msg =
            lang === 'ta'
              ? 'இருப்பிட அனுமதி மறுக்கப்பட்டது. கீழே உங்கள் ஊரை கைமுறையாக அமைக்கலாம்.'
              : lang === 'hi'
              ? 'लोकेशन अनुमति अस्वीकृत। आप नीचे अपना गांव/शहर मैन्युअल लिख सकते हैं।'
              : 'Location permission was denied. You can enter your village or town manually below.';
        }
        setErrorMessage(msg);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const handleSetManualLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualLocationText.trim()) return;
    setLocationStatus('manual');
    setErrorMessage(null);
  };

  const handleSendSos = () => {
    const phone = userProfile.trustedContactPhone || '112';
    const latStr = coords ? coords.lat.toFixed(5) : userLat.toFixed(5);
    const lngStr = coords ? coords.lng.toFixed(5) : userLng.toFixed(5);
    const mapUrl = `https://maps.google.com/?q=${latStr},${lngStr}`;

    const emergencyMsg =
      lang === 'ta'
        ? `அவசர உதவி தேவை! நான் SHERISE செயலியில் இருந்து அனுப்புகிறேன். எனது தற்போதைய GPS இருப்பிடம்: ${mapUrl}`
        : lang === 'hi'
        ? `आपातकालीन सहायता की आवश्यकता है! मैं SHERISE ऐप से भेज रही हूं। मेरी वर्तमान लोकेशन: ${mapUrl}`
        : `EMERGENCY SOS: I need help. My current GPS location from SHERISE app is: ${mapUrl}`;

    const smsUrl = `sms:${phone}?body=${encodeURIComponent(emergencyMsg)}`;

    setShowSosConfirm(false);
    setSosStatusNotice(t.emergency.sosSentNotice);

    // Open native SMS client
    try {
      window.location.href = smsUrl;
    } catch {
      // fallback
    }

    setTimeout(() => setSosStatusNotice(null), 8000);
  };

  const handleSpeakEmergencyOverview = () => {
    const textToSpeak =
      lang === 'ta'
        ? 'அவசர உதவி பிரிவு. அவசர உதவிக்கு 112-ஐ உடனே அழைக்கலாம். பெண்கள் உதவி எண் 181. ஆம்புலன்ஸ் 108. கீழே உங்கள் இருப்பிடத்தை பகிர்ந்தால் அருகில் உள்ள காவல் நிலையம் மற்றும் மருத்துவமனை விவரங்களை பார்க்கலாம்.'
        : lang === 'hi'
        ? 'आपातकालीन सहायता। आपातकाल के लिए 112 डायल करें। महिला हेल्पलाइन 181 और एम्बुलेंस 108। जीपीएस लोकेशन साझा कर नजदीकी पुलिस और अस्पताल देखें।'
        : 'Emergency Help Section. Dial 112 for national emergency, 181 for women helpline, or 108 for ambulance. Share location to view nearest police stations and hospitals.';
    speakText(textToSpeak, lang);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Top Emergency Red Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-700 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2">
              <ShieldAlert className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>{lang === 'ta' ? 'அவசர உதவி மையம்' : 'Emergency Response 24/7'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {t.emergency.title}
            </h1>
            <p className="text-xs sm:text-sm text-rose-100 max-w-2xl mt-1 leading-relaxed">
              {t.emergency.sub}
            </p>
          </div>

          <button
            onClick={handleSpeakEmergencyOverview}
            className="flex items-center gap-1.5 px-4 py-2 bg-white text-red-700 hover:bg-rose-50 rounded-full font-bold text-xs self-start sm:self-auto transition shadow-xs"
          >
            <Volume2 className="w-4 h-4 text-red-600" />
            <span>{t.common.listen}</span>
          </button>
        </div>

        {/* 3 Prominent 1-Touch Call Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* 112 National Emergency */}
          <a
            href="tel:112"
            className="flex items-center justify-between p-4 bg-white text-red-900 rounded-2xl shadow-md hover:bg-rose-50 transition active:scale-95"
            aria-label="Call 112 national emergency"
          >
            <div>
              <div className="text-2xl font-black text-red-600">112</div>
              <div className="text-xs font-bold">{t.emergency.call112Btn}</div>
              <div className="text-[10px] text-stone-500">
                {lang === 'ta' ? 'காவல்துறை, தீயணைப்பு, அவசரம்' : 'Police, Fire, Ambulance'}
              </div>
            </div>
            <div className="p-3 bg-red-600 text-white rounded-xl shadow-xs">
              <PhoneCall className="w-5 h-5" />
            </div>
          </a>

          {/* 181 Women Helpline */}
          <a
            href="tel:181"
            className="flex items-center justify-between p-4 bg-white text-rose-900 rounded-2xl shadow-md hover:bg-rose-50 transition active:scale-95"
            aria-label="Call 181 women helpline"
          >
            <div>
              <div className="text-2xl font-black text-rose-600">181</div>
              <div className="text-xs font-bold">{t.emergency.call181Btn}</div>
              <div className="text-[10px] text-stone-500">
                {lang === 'ta' ? 'பெண்கள் நலன் & குடும்ப பாதுகாப்பு' : 'Domestic & Women Helpline'}
              </div>
            </div>
            <div className="p-3 bg-rose-600 text-white rounded-xl shadow-xs">
              <PhoneCall className="w-5 h-5" />
            </div>
          </a>

          {/* 108 Emergency Ambulance */}
          <a
            href="tel:108"
            className="flex items-center justify-between p-4 bg-white text-emerald-900 rounded-2xl shadow-md hover:bg-emerald-50 transition active:scale-95"
            aria-label="Call 108 medical ambulance"
          >
            <div>
              <div className="text-2xl font-black text-emerald-600">108</div>
              <div className="text-xs font-bold">{t.emergency.call108Btn}</div>
              <div className="text-[10px] text-stone-500">
                {lang === 'ta' ? 'இலவச மருத்துவ அவசர ஊர்தி' : 'Emergency Ambulance'}
              </div>
            </div>
            <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-xs">
              <HeartPulse className="w-5 h-5" />
            </div>
          </a>
        </div>
      </div>

      {/* SOS Status Notification */}
      {sosStatusNotice && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-2xl text-xs font-bold text-emerald-950 flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>{sosStatusNotice}</span>
        </div>
      )}

      {/* Location Assistance Section */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-rose-600" />
              <span>{t.emergency.locationHeading}</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {locationStatus === 'granted' && coords
                ? `GPS Coordinates: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`
                : locationStatus === 'manual'
                ? `Manual Location: ${manualLocationText}`
                : lang === 'ta'
                ? 'உங்கள் இருப்பிடத்தை கண்டறிந்து அருகில் உள்ள காவல் நிலையங்கள் & மருத்துவமனைகளை வரிசைப்படுத்துகிறது.'
                : 'Detect your location to calculate real distances to nearest emergency units.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleRequestLocation}
              disabled={isLocating}
              className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white font-bold text-xs rounded-xl shadow-xs transition"
            >
              <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? t.emergency.locating : t.emergency.requestLocationBtn}</span>
            </button>

            <button
              onClick={() => setShowSosConfirm(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-xl shadow-xs transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t.emergency.sosShareTitle}</span>
            </button>
          </div>
        </div>

        {/* Error / Manual Input Fallback */}
        {errorMessage && (
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Manual Location Input Form */}
        <form
          onSubmit={handleSetManualLocation}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 text-xs"
        >
          <span className="font-bold text-stone-700 shrink-0">
            {t.emergency.manualLocationPrompt}
          </span>
          <input
            type="text"
            value={manualLocationText}
            onChange={(e) => setManualLocationText(e.target.value)}
            placeholder="e.g. Dharmapuri Town / Salem / Madurai"
            className="flex-1 p-2 bg-stone-50 border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-rose-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white font-bold rounded-xl"
          >
            {t.emergency.manualLocationBtn}
          </button>
        </form>

        {/* Interactive OpenStreetMap Embed View (Zero cost, no API key needed) */}
        <div className="rounded-2xl overflow-hidden border border-stone-200 h-64 sm:h-72 w-full relative bg-stone-100 shadow-inner">
          <iframe
            title="Emergency Live Location Map"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${userLng - 0.04}%2C${userLat - 0.03}%2C${userLng + 0.04}%2C${userLat + 0.03}&layer=mapnik&marker=${userLat}%2C${userLng}`}
            className="w-full h-full"
          />
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-stone-200 text-[10px] font-bold text-stone-700 shadow-xs">
            OpenStreetMap Free Live View
          </div>
        </div>
      </div>

      {/* Emergency Units Category Filter Tabs */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Building className="w-5 h-5 text-rose-600" />
            <span>{t.emergency.nearbyTitle}</span>
          </h3>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {[
              { id: 'all', label: t.emergency.categories.all },
              { id: 'police', label: t.emergency.categories.police },
              { id: 'hospital', label: t.emergency.categories.hospital },
            ].map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full font-bold transition whitespace-nowrap ${
                    isSelected
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Units Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      service.type === 'police'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {service.type === 'police'
                      ? lang === 'ta'
                        ? 'காவல்துறை'
                        : lang === 'hi'
                        ? 'पुलिस'
                        : 'Police'
                      : lang === 'ta'
                      ? 'மருத்துவமனை'
                      : lang === 'hi'
                      ? 'अस्पताल'
                      : 'Hospital'}
                  </span>

                  {service.distanceKm !== undefined && (
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                      {t.emergency.distanceKm} ~{service.distanceKm} km
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-stone-900 leading-snug">
                  {lang === 'ta' ? service.nameTa : lang === 'hi' ? service.nameHi : service.name}
                </h4>

                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {lang === 'ta' ? service.addressTa : lang === 'hi' ? service.addressHi : service.address}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                <a
                  href={`tel:${service.phone}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold text-xs rounded-xl transition"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
                  <span>{service.phone}</span>
                </a>

                <a
                  href={`https://maps.google.com/?q=${service.lat},${service.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  <span>{t.emergency.openDirections}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal for Sending SOS (Never sends without confirmation) */}
      {showSosConfirm && (
        <div
          role="dialog"
          aria-label="Confirm SOS Transmission"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2.5 text-red-600">
              <ShieldAlert className="w-6 h-6 animate-bounce" />
              <h3 className="text-base font-bold text-stone-900">
                {t.emergency.sosShareTitle}
              </h3>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              {t.emergency.sosConfirmText}
            </p>

            <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs space-y-1">
              <div>
                <span className="font-bold text-stone-700">Recipient: </span>
                <span className="text-stone-900">
                  {userProfile.trustedContactName || 'Trusted Contact'} ({userProfile.trustedContactPhone || '112'})
                </span>
              </div>
              <div>
                <span className="font-bold text-stone-700">Coordinates: </span>
                <span className="font-mono text-rose-700">
                  {userLat.toFixed(4)}, {userLng.toFixed(4)}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-stone-500">
              {lang === 'ta'
                ? 'குறிப்பு: இது உங்கள் தொலைபேசியின் SMS/வாட்ஸ்அப் செயலியில் உங்கள் இருப்பிடத்தை தயாராக வைக்கும். உறுதிசெய்த பின் அனுப்பவும்.'
                : 'Note: This prepares the SOS distress message in your phone messaging client. You will review and tap Send.'}
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowSosConfirm(false)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl"
              >
                {t.common.close}
              </button>
              <button
                onClick={handleSendSos}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                {lang === 'ta' ? 'ஆம், SOS அனுப்புக' : 'Yes, Open SOS Message'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
