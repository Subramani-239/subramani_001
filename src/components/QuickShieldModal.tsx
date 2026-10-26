/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Eye, ShieldAlert, Sparkles, ChefHat, Calendar } from 'lucide-react';
import { Language } from '../types';

interface QuickShieldModalProps {
  isOpen: boolean;
  onExit: () => void;
  lang: Language;
}

export const QuickShieldModal: React.FC<QuickShieldModalProps> = ({
  isOpen,
  onExit,
  lang,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="Discreet Screen View"
      className="fixed inset-0 z-50 bg-amber-50 text-stone-800 overflow-y-auto p-4 sm:p-8"
    >
      {/* Top disguised bar */}
      <div className="max-w-2xl mx-auto flex items-center justify-between border-b border-amber-200 pb-3 mb-6">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-lg">
          <ChefHat className="w-6 h-6 text-amber-700" />
          <span>
            {lang === 'ta'
              ? 'பாரம்பரிய சமையல் குறிப்பேடு & வீட்டு பராமரிப்பு'
              : 'Traditional Home Kitchen Recipes & Daily Tips'}
          </span>
        </div>

        {/* Discreet secret return button */}
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 px-3 py-1 text-xs text-stone-600 bg-amber-100 hover:bg-amber-200 rounded-full border border-amber-300 transition"
          title="Return to App"
          aria-label="Exit shield mode"
        >
          <Eye className="w-3.5 h-3.5 text-stone-600" />
          <span>{lang === 'ta' ? 'தொடர்க' : 'Continue'}</span>
        </button>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Disguised Recipe Content */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-md">
              {lang === 'ta' ? 'இன்றைய சமையல் குறிப்பு' : 'Today’s Healthy Recipe'}
            </span>
            <span className="text-xs text-stone-600 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date().toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>

          <h1 className="text-xl font-bold text-stone-900">
            {lang === 'ta'
              ? 'மணமணக்கும் நாட்டு தக்காளி பூண்டு ரசம் செய்முறை'
              : 'Fragrant Village Tomato Garlic Rasam Recipe'}
          </h1>

          <p className="text-sm text-stone-600 leading-relaxed">
            {lang === 'ta'
              ? 'நோய் எதிர்ப்பு சக்தியை அதிகரிக்கும் எளிய கிராமத்து ரசம். மழைக்காலத்திலும் செரிமானத்திற்கும் மிகவும் உகந்தது.'
              : 'A traditional wholesome village rasam packed with immunity-boosting crushed garlic, black pepper, and fresh country tomatoes.'}
          </p>

          <div className="border-t border-stone-100 pt-3">
            <h2 className="text-sm font-semibold text-stone-800 mb-2">
              {lang === 'ta' ? 'தேவையான பொருட்கள்:' : 'Ingredients:'}
            </h2>
            <ul className="text-xs text-stone-600 space-y-1 list-disc list-inside">
              <li>{lang === 'ta' ? 'நாட்டு தக்காளி - 2 (நன்றாக பிசைந்தது)' : 'Ripe Country Tomatoes - 2 (mashed)'}</li>
              <li>{lang === 'ta' ? 'பூண்டு - 8 பல் (தோலுடன் தட்டியது)' : 'Garlic cloves - 8 (crushed with skin)'}</li>
              <li>{lang === 'ta' ? 'மிளகு, சீரகம் - தலா 1 தேக்கரண்டி (ஒன்றிரண்டாக இடித்தது)' : 'Black pepper & Cumin - 1 tsp each (coarsely ground)'}</li>
              <li>{lang === 'ta' ? 'கொத்தமல்லி, கருவேப்பிலை, பெருங்காயம் - சிறிதளவு' : 'Fresh coriander, curry leaves, pinch of asafoetida'}</li>
              <li>{lang === 'ta' ? 'தாளிக்க நல்லெண்ணெய் மற்றும் கடுகு' : 'Gingelly oil & mustard seeds for tempering'}</li>
            </ul>
          </div>

          <div className="border-t border-stone-100 pt-3">
            <h2 className="text-sm font-semibold text-stone-800 mb-2">
              {lang === 'ta' ? 'செய்முறை:' : 'Preparation Steps:'}
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              {lang === 'ta'
                ? 'புளித் தண்ணீரில் தக்காளியை பிசைந்து, மஞ்சள் தூள், உப்பு சேர்க்கவும். வாணலியில் நல்லெண்ணெய் ஊற்றி கடுகு, கருவேப்பிலை, பெருங்காயம், தட்டிய பூண்டு, மிளகு சீரகம் சேர்த்து வதக்கி, ரசக் கலவையை ஊற்றி நுரை கூட்டி இறக்கவும். கொதிக்க விடக்கூடாது.'
                : 'Mix mashed tomatoes in light tamarind water with salt and turmeric. In a pan, temper mustard seeds, curry leaves, crushed garlic, and coarsely ground pepper-cumin in gingelly oil. Pour in the mixture, bring to gentle froth, and turn off flame immediately before boiling.'}
            </p>
          </div>
        </div>

        {/* Small subtle help reminder */}
        <div className="text-center pt-4">
          <p className="text-xs text-stone-600 mb-2">
            {lang === 'ta'
              ? 'பாதுகாப்பான சூழல் திரும்பியதும் கீழே உள்ள பொத்தானை அழுத்தி மீண்டும் உங்கள் கணக்குகளைத் தொடரலாம்.'
              : 'When it is safe, click the button below to resume your app session.'}
          </p>
          <button
            onClick={onExit}
            className="px-5 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-full shadow-xs hover:bg-stone-50 transition"
          >
            {lang === 'ta' ? 'மீண்டும் SHERISE-க்கு செல்' : 'Back to SHERISE'}
          </button>
        </div>
      </div>
    </div>
  );
};
