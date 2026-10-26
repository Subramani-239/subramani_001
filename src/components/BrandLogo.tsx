import React, { useState } from 'react';

// Use the newly generated brand mark image
import brandLogoImg from '../assets/images/sherise_brand_logo_1792781499787.jpg';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark'; // 'dark' = dark text on light navbar, 'light' = white text on dark footer
  showTagline?: boolean;
  regionBadge?: string;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'dark',
  showTagline = true,
  regionBadge,
  className = '',
  onClick,
}) => {
  const [imgLoaded, setImgLoaded] = useState(true);

  // Sizing definitions
  const symbolSizes = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-14 h-14 rounded-2xl',
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-3xl sm:text-4xl',
  };

  const taglineSizes = {
    sm: 'text-[8.5px]',
    md: 'text-[9.5px] sm:text-[10px]',
    lg: 'text-xs',
  };

  const isLight = variant === 'light';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label="SHERISE - Empower • Learn • Rise"
    >
      {/* Brand Symbol Container */}
      <div
        className={`relative shrink-0 overflow-hidden shadow-sm shadow-rose-500/20 ring-1 ${
          isLight ? 'ring-white/20 bg-stone-900' : 'ring-rose-200/80 bg-white'
        } ${symbolSizes[size]} transition-transform duration-200 hover:scale-105`}
      >
        {imgLoaded ? (
          <img
            src={brandLogoImg}
            alt="SHERISE - Women's Growth and Independence Symbol"
            className="w-full h-full object-cover object-top transform scale-[1.65] -translate-y-1.5"
            referrerPolicy="no-referrer"
            onError={() => setImgLoaded(false)}
          />
        ) : (
          /* High-fidelity Vector Fallback Icon */
          <div className="w-full h-full bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-500 flex items-center justify-center text-white">
            <svg
              className="w-3/5 h-3/5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {/* Stylized woman rising / lotus wings */}
              <circle cx="12" cy="5" r="2.5" />
              <path d="M12 9c-3 0-5.5 2-6 5.5.5 1 2 2 3.5 1.5 1-.4 2-1.5 2.5-3 .5 1.5 1.5 2.6 2.5 3 1.5.5 3-.5 3.5-1.5-.5-3.5-3-5.5-6-5.5z" />
              <path d="M5 16.5c2 2 4.5 2.5 7 2.5s5-.5 7-2.5c-.8 2.5-3.5 4.5-7 4.5s-6.2-2-7-4.5z" />
            </svg>
          </div>
        )}
      </div>

      {/* Brand Typography & Tagline */}
      <div className="flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-black tracking-tight font-sans transition-colors ${titleSizes[size]} ${
              isLight ? 'text-white' : 'text-stone-900'
            }`}
          >
            <span className="text-rose-600">SHE</span>
            <span className={isLight ? 'text-amber-300' : 'text-amber-600'}>RISE</span>
          </span>

          {regionBadge && (
            <span
              className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider transition ${
                isLight
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'bg-rose-100 text-rose-700'
              }`}
            >
              {regionBadge}
            </span>
          )}
        </div>

        {showTagline && (
          <div
            className={`flex items-center gap-1 font-semibold uppercase tracking-widest mt-1 leading-tight ${taglineSizes[size]} ${
              isLight ? 'text-rose-300/90' : 'text-rose-700'
            }`}
          >
            <span>Empower</span>
            <span className="text-amber-500 font-bold">•</span>
            <span>Learn</span>
            <span className="text-amber-500 font-bold">•</span>
            <span>Rise</span>
          </div>
        )}
      </div>
    </div>
  );
};
