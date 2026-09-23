import React from 'react';
import logoImage from '../assets/images/ignite-logo.png';

interface IgniteLogoProps {
  className?: string;
  variant?: 'full' | 'horizontal' | 'mark' | 'badge';
}

export default function IgniteLogo({
  className = '',
  variant = 'horizontal',
}: IgniteLogoProps) {
  // Pure Flame SVG Mark
  const renderFlame = (flameWidth = 44, flameHeight = 44) => (
    <svg
      width={flameWidth}
      height={flameHeight}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
    >
      <defs>
        <linearGradient id="flameGradOrange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f28c28" />
          <stop offset="100%" stopColor="#e25810" />
        </linearGradient>
      </defs>
      {/* Outer flame shape */}
      <path
        d="M50 94 C26 94 8 74 8 46 C8 24 26 4 52 2 C40 22 44 46 58 62 C68 76 66 86 50 94 Z"
        fill="url(#flameGradOrange)"
      />
      {/* Inner negative space / flame glow */}
      <path
        d="M52 2 C66 20 84 44 84 64 C84 86 66 96 50 94 C64 84 66 68 56 50 C46 34 46 20 52 2 Z"
        fill="#ffffff"
      />
      {/* Inner fiery curve */}
      <path
        d="M44 94 C28 92 18 78 18 62 C18 42 32 26 44 14 C36 30 38 46 48 60 C56 74 52 84 44 94 Z"
        fill="url(#flameGradOrange)"
      />
    </svg>
  );

  // Variant: Mark only
  if (variant === 'mark') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{renderFlame(40, 40)}</div>;
  }

  // Variant: Full Official Logo Lockup (uploaded logo image)
  if (variant === 'full') {
    return (
      <img
        src={logoImage}
        alt="Sreenidhi IGNITE — Kindle the Innovation Within"
        className={`w-64 sm:w-96 md:w-[28rem] h-auto select-none ${className}`}
        draggable={false}
      />
    );
  }

  // Variant: Badge (For Cards, Passes, Highlights)
  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-3 p-2.5 rounded-2xl bg-[#faf8f3] border-2 border-[#0b302e] shadow-[3px_3px_0px_#0b302e] select-none ${className}`}>
        {renderFlame(34, 34)}
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-display text-[9px] font-extrabold tracking-[0.2em] text-[#0b302e] uppercase">
              Sreenidhi
            </span>
            <span className="h-1 w-6 bg-[#e26f1e] rounded-full" />
          </div>
          <span className="font-display text-lg font-black tracking-tight text-[#0b302e] leading-none">
            IGNITE
          </span>
          <span className="text-[7.5px] font-black tracking-[0.14em] text-[#e26f1e] uppercase">
            Kindle the innovation within
          </span>
        </div>
      </div>
    );
  }

  // Variant: Horizontal (Default for Navigation & Bars) — uploaded logo image
  return (
    <img
      src={logoImage}
      alt="Sreenidhi IGNITE"
      className={`w-auto select-none ${className}`}
      draggable={false}
    />
  );
}
