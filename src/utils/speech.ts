/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../types';

let currentUtterance: SpeechSynthesisUtterance | null = null;
let speechCallback: ((isSpeaking: boolean) => void) | null = null;

// Ensure voices are loaded asynchronously when browser initializes
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    try {
      window.speechSynthesis.getVoices();
    } catch {
      // ignore
    }
  };
}

export function registerSpeechListener(cb: (isSpeaking: boolean) => void) {
  speechCallback = cb;
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    if (speechCallback) speechCallback(false);
  }
}

/**
 * Speaks text using the browser's native Web Speech Synthesis API.
 * Accurately selects Hindi (hi-IN), Tamil (ta-IN), or Indian English (en-IN) voices.
 */
export function speakText(text: string, lang: Language = 'ta', onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech first
  window.speechSynthesis.cancel();

  // Strip excessive markdown or symbols for cleaner speech
  const cleanText = text
    .replace(/[*#_`~>]/g, '')
    .replace(/₹\s?/g, lang === 'ta' ? 'ரூபாய் ' : lang === 'hi' ? 'रुपये ' : 'Rupees ')
    .trim();

  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  currentUtterance = utterance;

  utterance.rate = lang === 'ta' ? 0.9 : lang === 'hi' ? 0.92 : 0.95;
  utterance.pitch = 1.0;

  const targetLang = lang === 'ta' ? 'ta-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
  utterance.lang = targetLang;

  // Try to find a matching voice
  const voices = window.speechSynthesis.getVoices();
  let matchedVoice = voices.find(
    (v) => v.lang.toLowerCase() === targetLang.toLowerCase()
  );

  if (!matchedVoice && lang === 'hi') {
    matchedVoice =
      voices.find((v) => v.lang.toLowerCase().replace('_', '-').startsWith('hi')) ||
      voices.find((v) => v.name.toLowerCase().includes('hindi') || v.name.includes('हिन्दी'));
  }

  if (!matchedVoice && lang === 'ta') {
    matchedVoice =
      voices.find((v) => v.lang.toLowerCase().replace('_', '-').startsWith('ta')) ||
      voices.find((v) => v.name.toLowerCase().includes('tamil') || v.name.includes('தமிழ்'));
  }

  if (!matchedVoice && lang === 'en') {
    matchedVoice =
      voices.find((v) => v.lang.toLowerCase().includes('en-in')) ||
      voices.find((v) => v.lang.toLowerCase().startsWith('en'));
  }

  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onstart = () => {
    if (speechCallback) speechCallback(true);
  };

  utterance.onend = () => {
    if (speechCallback) speechCallback(false);
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    if (speechCallback) speechCallback(false);
  };

  window.speechSynthesis.speak(utterance);
}

/**
 * Voice Command Recognition for accessible voice-friendly navigation.
 * Properly configures Hindi (hi-IN), Tamil (ta-IN), and English (en-IN).
 * Supports both Devanagari script and phonetic transliteration.
 */
export function startVoiceRecognition(
  lang: Language,
  onResult: (text: string, matchedTab?: string) => void,
  onError: (err: string) => void,
  onEnd: () => void
): { stop: () => void } | null {
  const SpeechRecognition =
    (window as unknown as { SpeechRecognition?: any }).SpeechRecognition ||
    (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    const notSupportedMsg =
      lang === 'ta'
        ? 'உங்கள் உலாவியில் குரல் அறிதல் ஆதரிக்கப்படவில்லை. Chrome அல்லது Edge உலாவியைப் பயன்படுத்தவும்.'
        : lang === 'hi'
        ? 'आपके ब्राउज़र में आवाज़ पहचान (Speech Recognition) समर्थित नहीं है। कृपया Google Chrome या Microsoft Edge का उपयोग करें।'
        : 'Voice recognition is not supported in this browser. Please use Chrome or Edge.';
    onError(notSupportedMsg);
    return null;
  }

  try {
    const recognition = new SpeechRecognition();
    const targetLang = lang === 'ta' ? 'ta-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.lang = targetLang;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;

    recognition.onresult = (event: any) => {
      if (!event.results || !event.results[0] || !event.results[0][0]) {
        onError(
          lang === 'ta'
            ? 'குரல் எதுவும் கேட்கவில்லை. மீண்டும் பேசவும்.'
            : lang === 'hi'
            ? 'कोई आवाज़ नहीं पहचानी गई। कृपया माइक के पास आकर स्पष्ट बोलें।'
            : 'No speech recognized. Please try speaking again.'
        );
        return;
      }

      // Collect transcripts across all alternative candidates
      const alternatives: string[] = [];
      for (let i = 0; i < event.results[0].length; i++) {
        const item = event.results[0][i];
        if (item && item.transcript) {
          alternatives.push(item.transcript.trim());
        }
      }

      const primaryTranscript = alternatives[0] || '';
      const combined = alternatives.join(' ').toLowerCase();

      const matchedTab = matchVoiceCommand(combined);
      onResult(primaryTranscript, matchedTab);
    };

    recognition.onerror = (event: any) => {
      const code = event.error;
      console.warn('Speech recognition error:', code);

      let msg = '';
      if (code === 'not-allowed' || code === 'service-not-allowed') {
        msg =
          lang === 'ta'
            ? 'மைக்ரோஃபோன் அனுமதி மறுக்கப்பட்டது. உலாவி முகவரிப் பட்டியில் உள்ள பூட்டு (Lock) ஐகானை கிளிக் செய்து மைக்கை அனுமதிக்கவும்.'
            : lang === 'hi'
            ? 'माइक्रोफ़ोन की अनुमति अस्वीकृत। कृपया ब्राउज़र एड्रेस बार में लॉक (Lock) आइकन पर क्लिक करके माइक्रोफ़ोन की अनुमति दें।'
            : 'Microphone permission was denied. Please allow microphone access in your browser settings.';
      } else if (code === 'no-speech') {
        msg =
          lang === 'ta'
            ? 'குரல் எதுவும் கேட்கவில்லை. மைக் அருகே வந்து மீண்டும் பேசவும்.'
            : lang === 'hi'
            ? 'कोई आवाज़ सुनाई नहीं दी। कृपया माइक के पास आकर स्पष्ट आवाज़ में पुनः बोलें।'
            : 'No speech was detected. Please try speaking again closer to the microphone.';
      } else if (code === 'language-not-supported') {
        msg =
          lang === 'hi'
            ? 'इस ब्राउज़र में हिंदी भाषा पहचान (hi-IN) उपलब्ध नहीं है। कृपया Google Chrome में आज़माएं।'
            : lang === 'ta'
            ? 'இந்த உலாவியில் தமிழ் மொழி அறிதல் (ta-IN) ஆதரிக்கப்படவில்லை.'
            : 'Language is not supported for speech recognition in this browser.';
      } else if (code === 'network') {
        msg =
          lang === 'hi'
            ? 'इंटरनेट कनेक्शन में समस्या है। आवाज़ पहचान के लिए सक्रिय नेटवर्क कनेक्शन आवश्यक है।'
            : lang === 'ta'
            ? 'இணைய தொடர்பு பிழை. குரல் அறிதலுக்கு நெட்வொர்க் தேவை.'
            : 'Network error occurred during speech recognition. Please check your internet connection.';
      } else if (code === 'audio-capture') {
        msg =
          lang === 'hi'
            ? 'माइक्रोफ़ोन नहीं मिला। कृपया जांचें कि आपका माइक ठीक से जुड़ा हुआ है।'
            : lang === 'ta'
            ? 'மைக்ரோஃபோன் கண்டறியப்படவில்லை.'
            : 'No microphone was found on this device.';
      } else {
        msg =
          lang === 'hi'
            ? `आवाज़ पहचान त्रुटि (${code})। कृपया पुनः प्रयास करें।`
            : lang === 'ta'
            ? `குரல் அறிதல் பிழை (${code}). மீண்டும் முயற்சிக்கவும்.`
            : `Voice recognition error (${code}). Please try again.`;
      }

      onError(msg);
    };

    recognition.onend = () => {
      onEnd();
    };

    recognition.start();

    return {
      stop: () => {
        try {
          recognition.stop();
        } catch {
          // ignore
        }
      },
    };
  } catch (err: any) {
    const fallbackMsg =
      lang === 'hi'
        ? `आवाज़ पहचान शुरू करने में त्रुटि: ${err.message || 'अज्ञात कारण'}`
        : lang === 'ta'
        ? `குரல் அறிதல் தொடங்குவதில் பிழை: ${err.message || 'தெரியாத பிழை'}`
        : `Speech recognition initialization error: ${err.message || 'Unknown'}`;
    onError(fallbackMsg);
    return null;
  }
}

/**
 * Pure voice command matcher supporting Hindi, Tamil, and English (Devanagari, Tamil script, and transliteration).
 */
export function matchVoiceCommand(input: string): string | undefined {
  const combined = input.toLowerCase();

  // 1. Schemes Match
  if (
    combined.includes('scheme') ||
    combined.includes('திட்டம்') ||
    combined.includes('திட்டங்கள்') ||
    combined.includes('அரசு') ||
    combined.includes('योजना') ||
    combined.includes('योजनाएं') ||
    combined.includes('योजनायें') ||
    combined.includes('सरकारी') ||
    combined.includes('स्कीम') ||
    combined.includes('yojna') ||
    combined.includes('yojana') ||
    combined.includes('sarkari')
  ) {
    return 'schemes';
  }

  // 2. Emergency Help Match
  if (
    combined.includes('emergency') ||
    combined.includes('help') ||
    combined.includes('police') ||
    combined.includes('hospital') ||
    combined.includes('sos') ||
    combined.includes('112') ||
    combined.includes('அவசரம்') ||
    combined.includes('ஆபத்து') ||
    combined.includes('மருத்துவமனை') ||
    combined.includes('ஆம்புலன்ஸ்') ||
    combined.includes('காவல்துறை') ||
    combined.includes('ஆபத்து உதவி') ||
    combined.includes('आपातकाल') ||
    combined.includes('मदद') ||
    combined.includes('सहायता') ||
    combined.includes('पुलिस') ||
    combined.includes('अस्पताल') ||
    combined.includes('डॉक्टर') ||
    combined.includes('एम्बुलेंस') ||
    combined.includes('एंबुलेंस') ||
    combined.includes('खतरा') ||
    combined.includes('इमरजेंसी') ||
    combined.includes('aapatkal') ||
    combined.includes('madad') ||
    combined.includes('sahayata')
  ) {
    return 'emergency-help';
  }

  // 3. Skills Learning & Teaching Match
  if (
    combined.includes('learn') ||
    combined.includes('teach') ||
    combined.includes('lesson') ||
    combined.includes('training') ||
    combined.includes('கற்றல்') ||
    combined.includes('கற்பித்தல்') ||
    combined.includes('பாடம்') ||
    combined.includes('பயிற்சி') ||
    combined.includes('सीखना') ||
    combined.includes('सिखाना') ||
    combined.includes('पाठ') ||
    combined.includes('कौशल') ||
    combined.includes('हुनर') ||
    combined.includes('ट्रेनिंग') ||
    combined.includes('सिलाई') ||
    combined.includes('seekhna') ||
    combined.includes('sikhana') ||
    combined.includes('hunar') ||
    combined.includes('kaushal')
  ) {
    return 'skills-learning';
  }

  // 4. Chat & Call Match
  if (
    /\bchat\b/.test(combined) ||
    /\bcall\b/.test(combined) ||
    combined.includes('message') ||
    combined.includes('audio call') ||
    combined.includes('video call') ||
    combined.includes('உரையாடல்') ||
    combined.includes('அழைப்பு') ||
    combined.includes('செய்தி') ||
    combined.includes('பேசுங்கள்') ||
    combined.includes('चैट') ||
    combined.includes('कॉल') ||
    combined.includes('बातचीत') ||
    combined.includes('संदेश') ||
    combined.includes('मैसेज') ||
    combined.includes('बात') ||
    combined.includes('baatcheet')
  ) {
    return 'chat-call';
  }

  // 5. Education Second Chance Match
  if (
    combined.includes('education') ||
    combined.includes('school') ||
    combined.includes('college') ||
    combined.includes('degree') ||
    combined.includes('nios') ||
    combined.includes('படிப்பு') ||
    combined.includes('கல்வி') ||
    combined.includes('பள்ளி') ||
    combined.includes('கல்லூரி') ||
    combined.includes('இரண்டாம் வாய்ப்பு') ||
    combined.includes('शिक्षा') ||
    combined.includes('स्कूल') ||
    combined.includes('पढ़ाई') ||
    combined.includes('कॉलेज') ||
    combined.includes('डिग्री') ||
    combined.includes('दूसरा अवसर') ||
    combined.includes('shiksha') ||
    combined.includes('padhai')
  ) {
    return 'education';
  }

  // 6. Micro Income & Livelihood Skills Match
  if (
    combined.includes('income') ||
    combined.includes('livelihood') ||
    combined.includes('earning') ||
    combined.includes('வேலை') ||
    combined.includes('திறன்') ||
    combined.includes('வருமானம்') ||
    combined.includes('कमाई') ||
    combined.includes('रोजगार') ||
    combined.includes('काम') ||
    combined.includes('सूक्ष्म आय') ||
    combined.includes('kamai') ||
    combined.includes('rozgar')
  ) {
    return 'skills';
  }

  // 7. Business Idea Generator Match
  if (
    combined.includes('business') ||
    combined.includes('idea') ||
    combined.includes('startup') ||
    combined.includes('தொழில்') ||
    combined.includes('யோசனை') ||
    combined.includes('வணிகம்') ||
    combined.includes('சுயதொழில்') ||
    combined.includes('व्यापार') ||
    combined.includes('उद्योग') ||
    combined.includes('बिजनेस') ||
    combined.includes('धंधा') ||
    combined.includes('आइडिया') ||
    combined.includes('काम धंधा') ||
    combined.includes('vyapar') ||
    combined.includes('udyog')
  ) {
    return 'business-generator';
  }

  // 8. Budget Calculator Match
  if (
    combined.includes('budget') ||
    combined.includes('calculator') ||
    combined.includes('expense') ||
    combined.includes('cashbook') ||
    combined.includes('khata') ||
    combined.includes('கணக்கு') ||
    combined.includes('வரவு') ||
    combined.includes('செலவு') ||
    combined.includes('பட்ஜெட்') ||
    combined.includes('லாபம்') ||
    combined.includes('குறிப்பேடு') ||
    combined.includes('बजट') ||
    combined.includes('हिसाब') ||
    combined.includes('खर्च') ||
    combined.includes('कैलकुलेटर') ||
    combined.includes('खाता बही') ||
    combined.includes('बचत') ||
    combined.includes('मुनाफा') ||
    combined.includes('hisab') ||
    combined.includes('kharcha') ||
    combined.includes('bachat')
  ) {
    return 'budget-calculator';
  }

  // 9. Community Sisterhood Circle Match
  if (
    combined.includes('community') ||
    combined.includes('sister') ||
    combined.includes('circle') ||
    combined.includes('forum') ||
    combined.includes('group') ||
    combined.includes('சமூகம்') ||
    combined.includes('தோழிகள்') ||
    combined.includes('தோழி') ||
    combined.includes('வட்டம்') ||
    combined.includes('மகளிர் வட்டம்') ||
    combined.includes('समुदाय') ||
    combined.includes('बहनें') ||
    combined.includes('बहनों') ||
    combined.includes('सखी') ||
    combined.includes('सहेली') ||
    combined.includes('ग्रुप') ||
    combined.includes('सहेलियां') ||
    combined.includes('samuday') ||
    combined.includes('saheli')
  ) {
    return 'community';
  }

  // 10. Profile Match
  if (
    combined.includes('profile') ||
    combined.includes('account') ||
    combined.includes('id') ||
    combined.includes('சுயவிவரம்') ||
    combined.includes('பயனர்') ||
    combined.includes('அடையாளம்') ||
    combined.includes('ரோபைல்') ||
    combined.includes('प्रोफाइल') ||
    combined.includes('प्रोफ़ाइल') ||
    combined.includes('खाता') ||
    combined.includes('आईडी') ||
    combined.includes('मेरी जानकारी')
  ) {
    return 'profile';
  }

  // 11. Dashboard / Home Match
  if (
    combined.includes('home') ||
    combined.includes('dashboard') ||
    combined.includes('main') ||
    combined.includes('முகப்பு') ||
    combined.includes('முதல் பக்கம்') ||
    combined.includes('होम') ||
    combined.includes('मुख्य पृष्ठ') ||
    combined.includes('डैशबोर्ड') ||
    combined.includes('शुरुआत')
  ) {
    return 'dashboard';
  }

  // 12. Privacy & Security Match
  if (
    combined.includes('privacy') ||
    combined.includes('security') ||
    combined.includes('shield') ||
    combined.includes('lock') ||
    combined.includes('பாதுகாப்பு') ||
    combined.includes('ரகசியம்') ||
    combined.includes('सुरक्षा') ||
    combined.includes('गोपनीयता') ||
    combined.includes('प्राइवेसी') ||
    combined.includes('ताला')
  ) {
    return 'privacy';
  }

  return undefined;
}
