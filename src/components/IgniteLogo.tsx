import React from 'react';

interface IgniteLogoProps {
  className?: string;
  variant?: 'full' | 'horizontal' | 'mark' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function IgniteLogo({
  className = '',
  variant = 'horizontal',
  size = 'md',
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

  // Variant: Full Official Logo Lockup (Flame + Sreenidhi + Bars + IGNITE + Tagline)
  if (variant === 'full') {
    return (
      <div
        className={`flex flex-col items-center justify-center text-center select-none ${className}`}
      >
        {/* Top brand header: Flame + Bars & SREENIDHI */}
        <div className="flex items-center gap-4 sm:gap-5 mb-1.5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
            {renderFlame(56, 56)}
          </div>

          <div className="flex flex-col text-left justify-center">
            {/* Horizontal accent bars */}
            <div className="flex flex-col gap-1 mb-1.5">
              <div className="h-1.5 sm:h-2 w-28 sm:w-32 bg-[#e26f1e] rounded-full shadow-xs" />
              <div className="h-2 sm:h-2.5 w-40 sm:w-48 bg-[#0b302e] rounded-full shadow-xs" />
            </div>
            {/* S R E E N I D H I */}
            <div className="font-display text-xs sm:text-sm font-extrabold tracking-[0.38em] text-[#0b302e] uppercase">
              S R E E N I D H I
            </div>
          </div>
        </div>

        {/* Master Wordmark: IGNITE */}
        <div className="w-full text-center">
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-[#0b302e] leading-none my-1 drop-shadow-xs">
            IGNITE
          </h1>
        </div>

        {/* Tagline: KINDLE THE INNOVATION WITHIN */}
        <div className="mt-1">
          <span className="inline-block font-display text-[10px] sm:text-xs md:text-sm font-black tracking-[0.25em] text-[#e26f1e] uppercase">
            KINDLE THE INNOVATION WITHIN
          </span>
        </div>
      </div>
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

  // Variant: Horizontal (Default for Navigation & Bars)
  const isSmall = size === 'sm';
  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      <div className="shrink-0">
        {renderFlame(isSmall ? 32 : 40, isSmall ? 32 : 40)}
      </div>

      <div className="flex flex-col text-left leading-tight">
        {/* Top double lines + School Name */}
        <div className="flex items-center gap-1.5 mb-0.5">
          <div className="flex flex-col gap-0.5">
            <div className="h-0.5 w-6 bg-[#e26f1e] rounded-full" />
            <div className="h-1 w-10 bg-[#0b302e] rounded-full" />
          </div>
          <span className="font-display text-[9px] sm:text-[10px] font-extrabold tracking-[0.22em] text-[#0b302e] uppercase">
            SREENIDHI
          </span>
        </div>

        {/* IGNITE Text */}
        <div className="flex items-baseline gap-1.5">
          <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-[#0b302e] leading-none group-hover:text-[#e26f1e] transition-colors">
            IGNITE
          </span>
        </div>

        {/* Tagline */}
        <span className="text-[8px] sm:text-[9px] font-black tracking-[0.18em] text-[#e26f1e] uppercase whitespace-nowrap">
          KINDLE THE INNOVATION WITHIN
        </span>
      </div>
    </div>
  );
}
