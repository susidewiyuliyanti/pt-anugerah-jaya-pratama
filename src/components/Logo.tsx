import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'white' | 'horizontal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'full', size = 'md', className = '' }) => {
  // Dimension scales
  const iconDimensions = {
    sm: { w: 36, h: 42 },
    md: { w: 48, h: 56 },
    lg: { w: 72, h: 84 },
    xl: { w: 100, h: 116 },
  }[size];

  const textColorPrimary = variant === 'white' ? '#FFFFFF' : '#0A2342';
  const textColorSecondary = variant === 'white' ? '#E5C77A' : '#C9A961';
  const strokeOuter = variant === 'white' ? '#DFBA73' : '#0A2342';

  // SVG Icon representing the uploaded logo: Hexagonal crest + Skyscrapers + Pillars + Cranes
  const renderEmblem = () => (
    <svg
      width={iconDimensions.w}
      height={iconDimensions.h}
      viewBox="0 0 200 230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 hover:scale-105"
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DFBA73" />
          <stop offset="50%" stopColor="#C9A961" />
          <stop offset="100%" stopColor="#9C782E" />
        </linearGradient>
        <linearGradient id="navyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#173B66" />
          <stop offset="100%" stopColor="#0A2342" />
        </linearGradient>
      </defs>

      {/* Hexagonal Shield Outer Contour */}
      <path
        d="M100 8 L184 56 V158 L100 206 L16 158 V56 Z"
        stroke={strokeOuter}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Hexagonal Gold Accent Trim */}
      <path
        d="M100 16 L176 60 V152 L100 196 L24 152 V60 Z"
        stroke="url(#goldGradient)"
        strokeWidth="2.5"
        strokeDasharray="14 6"
        fill="none"
        opacity="0.85"
      />

      {/* Left Tower Crane */}
      <path d="M48 62 H102 M58 62 V152 M48 76 L70 76 M58 84 L70 94 M70 84 L58 94 M58 106 L70 116 M70 106 L58 116" stroke="url(#goldGradient)" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="38" y1="62" x2="38" y2="92" stroke="#0A2342" strokeWidth="2.5" />
      <line x1="38" y1="92" x2="48" y2="92" stroke="#0A2342" strokeWidth="2.5" />

      {/* Right Tower Crane */}
      <path d="M152 74 H98 M142 74 V152 M142 88 L130 98 M130 88 L142 98 M142 110 L130 120 M130 110 L142 120" stroke="url(#goldGradient)" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="162" y1="74" x2="162" y2="100" stroke="#0A2342" strokeWidth="2.5" />

      {/* Central Modern Skyscrapers in Navy with Gold Edges */}
      <g>
        {/* Left building wing */}
        <path d="M74 150 V94 L88 84 V150 Z" fill="url(#navyGradient)" stroke="url(#goldGradient)" strokeWidth="1.5" />
        {/* Left high tower */}
        <path d="M88 150 V66 L100 54 V150 Z" fill="url(#navyGradient)" stroke="url(#goldGradient)" strokeWidth="2" />
        {/* Center spire tower */}
        <path d="M100 150 V34 L114 44 V150 Z" fill="#0A2342" stroke="url(#goldGradient)" strokeWidth="2" />
        {/* Center golden facade line */}
        <line x1="104" y1="44" x2="104" y2="150" stroke="#DFBA73" strokeWidth="2" />
        {/* Right building wing */}
        <path d="M114 150 V84 L126 94 V150 Z" fill="url(#navyGradient)" stroke="url(#goldGradient)" strokeWidth="1.5" />
      </g>

      {/* Classical Greek/Roman Pediment (Triangular Temple Roof) */}
      <polygon points="68,154 100,136 132,154" fill="#0A2342" stroke="url(#goldGradient)" strokeWidth="2.5" />
      <rect x="64" y="154" width="72" height="6" fill="url(#goldGradient)" rx="1.5" />

      {/* Classical Pillars / Columns (3 Roman Columns) */}
      {/* Pillar 1 (Left) */}
      <rect x="74" y="162" width="10" height="24" fill="#0A2342" stroke="url(#goldGradient)" strokeWidth="2" rx="1" />
      <rect x="72" y="160" width="14" height="3" fill="url(#goldGradient)" />
      <rect x="72" y="185" width="14" height="3" fill="url(#goldGradient)" />

      {/* Pillar 2 (Center) */}
      <rect x="95" y="162" width="10" height="24" fill="#0A2342" stroke="url(#goldGradient)" strokeWidth="2" rx="1" />
      <rect x="93" y="160" width="14" height="3" fill="url(#goldGradient)" />
      <rect x="93" y="185" width="14" height="3" fill="url(#goldGradient)" />

      {/* Pillar 3 (Right) */}
      <rect x="116" y="162" width="10" height="24" fill="#0A2342" stroke="url(#goldGradient)" strokeWidth="2" rx="1" />
      <rect x="114" y="160" width="14" height="3" fill="url(#goldGradient)" />
      <rect x="114" y="185" width="14" height="3" fill="url(#goldGradient)" />

      {/* Pillar Base Pedestal */}
      <rect x="62" y="188" width="76" height="5" fill="#0A2342" stroke="url(#goldGradient)" strokeWidth="1.5" rx="1" />
      {/* Gold bottom Keystone / Chevron */}
      <polygon points="100,202 88,193 112,193" fill="url(#goldGradient)" />
    </svg>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{renderEmblem()}</div>;
  }

  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-3.5 ${className}`}>
        {renderEmblem()}
        <div className="flex flex-col">
          <span
            className="font-heading font-extrabold tracking-wider leading-none text-base sm:text-lg"
            style={{ color: textColorPrimary }}
          >
            ANUGERAH
          </span>
          <span
            className="font-heading font-bold tracking-[0.25em] text-[10px] sm:text-xs uppercase mt-0.5"
            style={{ color: textColorSecondary }}
          >
            JAYA PRATAMA
          </span>
          <span className="text-[9px] text-slate-500 font-medium tracking-normal mt-0.5 hidden sm:block">
            Konstruksi & Pengadaan Pemerintah
          </span>
        </div>
      </div>
    );
  }

  // Full stacked variant (ideal for Hero, Print, Brand Card)
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {renderEmblem()}
      <div className="mt-2.5 flex flex-col items-center">
        <span
          className="font-heading font-black tracking-widest leading-none text-xl sm:text-2xl"
          style={{ color: textColorPrimary }}
        >
          ANUGERAH
        </span>
        <span
          className="font-heading font-bold tracking-[0.32em] text-xs sm:text-sm uppercase mt-1"
          style={{ color: textColorSecondary }}
        >
          JAYA PRATAMA
        </span>
      </div>
    </div>
  );
};
