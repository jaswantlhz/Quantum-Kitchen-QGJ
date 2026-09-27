'use client';

import React from 'react';

interface ChunkyGameTitleProps {
  className?: string;
}

export function ChunkyGameTitle({ className = '' }: ChunkyGameTitleProps) {
  return (
    <div className={`relative flex flex-col items-center justify-center select-none text-center ${className}`}>
      {/* 3D Cozy Cyberpunk Top Word: QUANTUM */}
      <div className="relative inline-block">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none uppercase drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)]"
          style={{
            fontFamily: "'Pollygram', var(--font-geist-sans), system-ui, -apple-system, sans-serif",
            color: '#00f0ff',
            WebkitTextStroke: '2px #063945',
            textShadow: `
              0 1px 0 #00d2e0,
              0 2px 0 #00b4c0,
              0 3px 0 #0096a0,
              0 4px 0 #007880,
              0 5px 0 #005a60,
              0 6px 0 #003c40,
              0 8px 18px rgba(0, 0, 0, 0.95),
              0 0 35px rgba(0, 240, 255, 0.65),
              0 0 70px rgba(0, 240, 255, 0.3)
            `,
          }}
        >
          QUANTUM
        </h1>
      </div>

      {/* 3D Cozy Cyberpunk Bottom Word: KITCHEN */}
      <div className="relative inline-block -mt-1 sm:-mt-2">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wider leading-none uppercase drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)]"
          style={{
            fontFamily: "'Pollygram', var(--font-geist-sans), system-ui, -apple-system, sans-serif",
            color: '#ff2a85',
            WebkitTextStroke: '2px #4a0d27',
            textShadow: `
              0 1px 0 #e61972,
              0 2px 0 #cc0f62,
              0 3px 0 #b30652,
              0 4px 0 #990042,
              0 5px 0 #800037,
              0 6px 0 #66002c,
              0 8px 18px rgba(0, 0, 0, 0.95),
              0 0 40px rgba(255, 42, 133, 0.7),
              0 0 75px rgba(255, 42, 133, 0.35)
            `,
          }}
        >
          KITCHEN
        </h2>
      </div>
    </div>
  );
}
