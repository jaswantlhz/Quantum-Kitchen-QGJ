'use client';

import React from 'react';
import Link from 'next/link';
import { ChunkyGameTitle } from './ChunkyGameTitle';
import { BloubBot } from '@/components/game/BloubBot';
import { Play, Sparkles, Volume2, VolumeX, Atom, BookOpen } from 'lucide-react';

interface CosmicValleyHeroProps {
  onOpenManual?: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export function CosmicValleyHero({
  onOpenManual,
  isMuted = false,
  onToggleMute,
}: CosmicValleyHeroProps) {
  return (
    <div className="relative w-full min-h-[90vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#134b70] via-[#206a88] via-[#528994] to-[#f89b4f] select-none">
      {/* 1. Sky & Sun Glow Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft Radial Sun at the Horizon */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-t from-[#ffdf78]/70 via-[#ffa442]/40 to-transparent rounded-full blur-[80px]" />

        {/* Shimmering Cosmic Braids in the Sky */}
        <svg
          className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M-100,200 C300,100 600,350 1000,150 C1200,50 1400,250 1600,180"
            stroke="url(#skyBraidGrad1)"
            strokeWidth="4"
            strokeDasharray="8 6"
            className="animate-pulse"
          />
          <path
            d="M-100,240 C350,320 700,100 1100,280 C1300,350 1500,200 1600,240"
            stroke="url(#skyBraidGrad2)"
            strokeWidth="3.5"
            strokeDasharray="6 4"
          />
          <defs>
            <linearGradient id="skyBraidGrad1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#be95ff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f1c21b" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="skyBraidGrad2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#72f1b8" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#00f0ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#be95ff" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        {/* Ambient Floating Stars */}
        <div className="absolute top-12 left-1/5 h-2 w-2 rounded-full bg-white animate-ping opacity-60" />
        <div className="absolute top-24 right-1/4 h-1.5 w-1.5 rounded-full bg-[#00f0ff] animate-pulse opacity-80" />
        <div className="absolute top-1/3 left-12 h-2 w-2 rounded-full bg-[#be95ff] opacity-70" />
        <div className="absolute top-16 right-16 h-2 w-2 rounded-full bg-[#f1c21b] opacity-80" />
      </div>

      {/* 2. Top-Right Floating Pill Badge (Matching Reference) */}
      <div className="relative z-30 pt-20 px-4 sm:px-8 max-w-7xl mx-auto w-full flex justify-end">
        <Link
          href="/play"
          className="group flex items-center gap-3 bg-[#11221b]/85 hover:bg-[#162d24] border-2 border-[#3eb47a]/60 hover:border-[#72f1b8] rounded-2xl p-2.5 sm:px-4 sm:py-2.5 shadow-[0_10px_25px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <div className="text-left">
            <div className="text-[11px] font-bold text-white tracking-wide flex items-center gap-1.5">
              <span>Our Quantum Loom is Live!</span>
              <Sparkles className="h-3 w-3 text-[#f1c21b]" />
            </div>
            <div className="mt-1 inline-flex items-center gap-1 text-[10px] font-extrabold text-[#0c2419] bg-white group-hover:bg-[#72f1b8] px-2 py-0.5 rounded-full transition-colors">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0c2419]" />
              PLAY NOW
            </div>
          </div>
          <div className="relative h-11 w-11 rounded-xl bg-[#1e4835] border border-[#72f1b8]/40 flex items-center justify-center overflow-hidden shadow-inner shrink-0">
            <BloubBot expression="excite" size={44} />
          </div>
        </Link>
      </div>

      {/* 3. Center Game Logo & Primary Pill Action */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 py-8 space-y-6">
        <ChunkyGameTitle />

        {/* Center Pill Button (Matching Reference "WATCH TRAILER" / "PLAY GAME") */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Link href="/play">
            <button className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#3eb47a] to-[#24a148] hover:from-[#46c989] hover:to-[#2bc056] text-white font-extrabold text-sm sm:text-base tracking-wider uppercase border-2 border-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_25px_rgba(114,241,184,0.5)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.6),0_0_35px_rgba(114,241,184,0.7)] cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center gap-2.5">
              <Play className="h-4 w-4 fill-white" />
              <span>ENTER KITCHEN</span>
            </button>
          </Link>

          {onOpenManual && (
            <button
              onClick={onOpenManual}
              className="px-6 py-3 rounded-full bg-[#0e1f2b]/80 hover:bg-[#142d3e] text-white font-bold text-xs tracking-wider uppercase border border-white/40 shadow-md backdrop-blur-md cursor-pointer transition-all hover:scale-105 flex items-center gap-2"
            >
              <BookOpen className="h-3.5 w-3.5 text-[#00f0ff]" />
              <span>Game Guide</span>
            </button>
          )}
        </div>
      </div>

      {/* 4. Layered Landscape Artwork & Cliff Mascot Foreground */}
      <div className="relative z-10 w-full mt-auto pointer-events-none">
        {/* Layer A: Distant Mountain Ranges */}
        <svg
          className="w-full h-36 sm:h-48 md:h-64 object-cover"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Distant Mountains */}
          <path
            d="M0,220 L180,110 L360,190 L540,90 L760,200 L980,80 L1200,180 L1440,110 L1440,320 L0,320 Z"
            fill="#2c4d4f"
            opacity="0.85"
          />
          {/* Midground Foothills */}
          <path
            d="M0,240 L220,160 L460,230 L720,150 L940,240 L1180,160 L1440,220 L1440,320 L0,320 Z"
            fill="#1e3738"
            opacity="0.95"
          />
          {/* Dense Valley Pine Forest Line */}
          <path
            d="M0,270 Q360,230 720,280 Q1080,240 1440,270 L1440,320 L0,320 Z"
            fill="#122524"
          />
        </svg>

        {/* Layer B: Foreground Cliff & Mascot Vista on Bottom-Right */}
        <div className="absolute bottom-0 right-0 w-64 sm:w-80 md:w-96 h-48 sm:h-60 md:h-72 pointer-events-auto">
          {/* Cliff Silhouette SVG */}
          <svg
            className="w-full h-full"
            viewBox="0 0 400 300"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Rocky Cliff Base */}
            <path
              d="M120,300 L160,180 L220,140 Q300,120 400,130 L400,300 Z"
              fill="#2e2118"
            />
            {/* Grassy Cliff Top */}
            <path
              d="M150,185 Q220,130 400,130 L400,155 Q240,150 160,195 Z"
              fill="#427038"
            />
            <path
              d="M170,180 Q250,135 390,135 L390,145 Q260,145 180,185 Z"
              fill="#5d964f"
            />
          </svg>

          {/* Characters Sitting on Cliff Edge Gazing at Horizon */}
          <div className="absolute top-12 sm:top-14 right-16 sm:right-24 flex items-end gap-2">
            {/* Small Side Mascot Companion */}
            <div className="h-7 w-7 rounded-full bg-[#f1c21b] border-2 border-[#7a5300] shadow-md flex items-center justify-center text-[11px] font-bold text-black transform rotate-12">
              τ
            </div>

            {/* Bloub Hero Sitting with Chef Hat looking into valley */}
            <div className="relative transform scale-x-[-1] hover:scale-x-[-1.1] hover:scale-y-110 transition-transform cursor-pointer" title="Bloub Sous-Chef">
              <BloubBot expression="curieux" size={68} followCursor={false} />
            </div>
          </div>
        </div>

        {/* Layer C: Left Tree Canopy Foreground */}
        <div className="absolute bottom-0 left-0 w-36 sm:w-52 md:w-64 h-40 sm:h-52 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
            <circle cx="40" cy="160" r="80" fill="#152b1b" />
            <circle cx="80" cy="140" r="60" fill="#1c3b25" />
            <circle cx="20" cy="120" r="50" fill="#244d31" />
          </svg>
        </div>
      </div>
    </div>
  );
}
