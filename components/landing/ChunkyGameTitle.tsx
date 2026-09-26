'use client';

import React from 'react';

interface ChunkyGameTitleProps {
  className?: string;
}

export function ChunkyGameTitle({ className = '' }: ChunkyGameTitleProps) {
  return (
    <div className={`relative flex flex-col items-center justify-center select-none text-center ${className}`}>
      {/* 3D Puffy Top Word: QUANTUM */}
      <div className="relative inline-block">
        <h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none uppercase drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
          style={{
            fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
            color: '#72f1b8',
            WebkitTextStroke: '3px #18422d',
            textShadow: `
              0 1px 0 #3eb47a,
              0 2px 0 #369c6a,
              0 3px 0 #2e845a,
              0 4px 0 #266d4a,
              0 5px 0 #1e563a,
              0 6px 0 #16402b,
              0 8px 16px rgba(0, 0, 0, 0.8),
              0 0 35px rgba(114, 241, 184, 0.4)
            `,
          }}
        >
          QUANTUM
        </h1>
      </div>

      {/* 3D Puffy Bottom Word: KITCHEN */}
      <div className="relative inline-block -mt-2 sm:-mt-4">
        <h2
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider leading-none uppercase drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
          style={{
            fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
            color: '#be95ff',
            WebkitTextStroke: '3px #3b1c6e',
            textShadow: `
              0 1px 0 #9f66ff,
              0 2px 0 #8a3ffc,
              0 3px 0 #7327d6,
              0 4px 0 #5c18b0,
              0 5px 0 #460f8a,
              0 6px 0 #300863,
              0 8px 16px rgba(0, 0, 0, 0.8),
              0 0 35px rgba(190, 149, 255, 0.4)
            `,
          }}
        >
          KITCHEN
        </h2>
      </div>

      {/* Sub-pill tagline */}
      <div className="mt-3 px-4 py-1 rounded-full bg-[#12121e]/80 border border-[#be95ff]/40 shadow-[0_0_15px_rgba(190,149,255,0.2)] backdrop-blur-md">
        <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-[#00f0ff] uppercase">
          ✦ COSMIC ANYON WEAVING SIMULATOR ✦
        </span>
      </div>
    </div>
  );
}
