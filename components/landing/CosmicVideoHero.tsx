'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Play, BookOpen, Volume2, VolumeX } from 'lucide-react';
import { soundFx } from '@/lib/audio/synthAudio';

const VIDEO_SRC =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4b73c700-3112-4c07-bd48-0af2893dff7c.mp4';

interface CosmicVideoHeroProps {
  onOpenManual?: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export function CosmicVideoHero({
  onOpenManual,
  isMuted = false,
  onToggleMute,
}: CosmicVideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  return (
    <div className="relative w-full h-screen min-h-[720px] flex flex-col justify-between overflow-hidden bg-black select-none text-slate-100 font-sans">
      {/* Background Video Layer - Shifted Down to expand the deep black starry sky at the top */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover translate-y-16 sm:translate-y-20 lg:translate-y-24 transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          src={VIDEO_SRC}
        />
        {/* Subtle fallback while video loads */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      {/* Desktop Navigation Bar */}
      <header className="relative z-30 w-full px-4 sm:px-6 lg:px-12 pt-4 sm:pt-5">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl flex items-center justify-between bg-[#100a1e]/45 border border-[#6ef3cd]/20 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.35),0_0_15px_rgba(62,227,186,0.08)]">
          {/* Brand Pill */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-8 h-8 rounded-full bg-[#100a1e]/60 border border-[#3ee3ba]/40 flex items-center justify-center text-[#3ee3ba] shadow-[0_0_12px_rgba(62,227,186,0.3)] group-hover:scale-105 transition-transform">
              <svg className="w-4 h-4 text-[#3ee3ba]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                <line x1="6" x2="18" y1="17" y2="17" />
              </svg>
            </div>
            <span className="font-bold text-xs tracking-[0.24em] uppercase text-[#f0efff] drop-shadow-[0_0_8px_rgba(158,88,219,0.3)]">
              QUANTUM KITCHEN
            </span>
          </Link>

          {/* Center Nav Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-7 font-mono text-xs tracking-wider uppercase font-medium text-[#cdd0f0]/75">
            {onOpenManual && (
              <button
                onClick={onOpenManual}
                className="hover:text-[#3ee3ba] transition-colors cursor-pointer"
              >
                How to Play
              </button>
            )}
            <a href="#try-weave" className="hover:text-[#3ee3ba] transition-colors">
              Try Weaving
            </a>
            <a href="#dishes" className="hover:text-[#3ee3ba] transition-colors">
              Cosmic Menu
            </a>
            <a href="#how-it-works" className="hover:text-[#3ee3ba] transition-colors">
              Quantum Mechanics
            </a>
            <Link href="/admin" className="flex items-center gap-1.5 hover:text-[#3ee3ba] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3ee3ba] shadow-[0_0_8px_#3ee3ba]" />
              <span>Scientist Lab</span>
            </Link>
            <Link href="/credits" className="hover:text-[#3ee3ba] transition-colors">
              Credits
            </Link>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={onToggleMute}
              aria-label="Toggle Sound"
              className="w-9 h-9 rounded-full bg-[#140c24]/60 hover:bg-[#1f1338]/80 border border-[#9e58db]/30 hover:border-[#3ee3ba]/50 flex items-center justify-center text-[#cdd0f0] hover:text-[#3ee3ba] transition-all duration-200 cursor-pointer"
              type="button"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-[#cdd0f0]/70" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#3ee3ba] drop-shadow-[0_0_8px_#3ee3ba]" />
              )}
            </button>

            {/* Play Game Button */}
            <Link
              href="/play"
              onClick={() => soundFx.playBell()}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-[#3ee3ba]/15 hover:bg-[#3ee3ba]/25 border border-[#3ee3ba]/50 text-[#3ee3ba] text-[11px] font-semibold tracking-widest uppercase transition-all duration-200 shadow-[0_0_14px_rgba(62,227,186,0.2)] hover:shadow-[0_0_20px_rgba(62,227,186,0.4)] cursor-pointer"
            >
              <Play className="w-3 h-3 fill-current shrink-0" />
              <span>PLAY GAME</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Upper Content (Positioned in expanded black space, moved 15px down) */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-6 pt-7 sm:pt-8 pb-4">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Header / Title in ONE SINGLE LINE in the dark space above the planet */}
          <h1 className="whitespace-nowrap text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-[0.22em] uppercase leading-tight mb-2 select-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#67f2cd] via-[#3ee3ba] to-[#9e58db] drop-shadow-[0_0_24px_rgba(62,227,186,0.4)]">
              QUANTUM
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9e58db] via-[#b26bf4] to-[#f0efff] drop-shadow-[0_0_24px_rgba(158,88,219,0.4)] ml-3 sm:ml-4">
              KITCHEN
            </span>
          </h1>

          {/* Subtitle Description */}
          <p className="max-w-xl text-[#cdd0f0]/90 text-xs sm:text-sm font-normal tracking-wide leading-relaxed mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Synthesize molecular delicacies across spacetime. Master quantum thermodynamic recipes and serve the stars.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-row items-center justify-center gap-3 sm:gap-4">
            {/* Primary Action: Mint-Teal to Celestial Purple Gradient */}
            <Link
              href="/play"
              onClick={() => soundFx.playBell()}
              className="inline-flex items-center justify-center gap-2.5 py-2.5 px-6 sm:px-7 rounded-xl font-semibold text-xs tracking-[0.18em] uppercase text-[#060913] bg-gradient-to-r from-[#3ee3ba] via-[#2bc4a8] via-[#8442b9] to-[#9e58db] hover:from-[#67f2cd] hover:to-[#b26bf4] shadow-[0_0_25px_rgba(62,227,186,0.35),inset_0_1px_1px_rgba(255,255,255,0.6)] hover:shadow-[0_0_35px_rgba(62,227,186,0.55),inset_0_1px_2px_rgba(255,255,255,0.8)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-[#060913] shrink-0" />
              <span className="truncate font-black">ENTER QUANTUM KITCHEN</span>
            </Link>

            {/* Secondary Action: Dark Celestial Glass with Violet/Teal Border */}
            {onOpenManual && (
              <button
                onClick={onOpenManual}
                className="inline-flex items-center justify-center gap-2 py-2.5 px-5 sm:px-6 rounded-xl font-medium text-xs tracking-[0.18em] uppercase text-[#f0efff] hover:text-white bg-[#120c22]/55 hover:bg-[#1c1234]/70 border border-[#9e58db]/40 hover:border-[#3ee3ba]/60 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3),0_0_12px_rgba(158,88,219,0.15)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.45),0_0_20px_rgba(62,227,186,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#3ee3ba] shrink-0 drop-shadow-[0_0_6px_#3ee3ba]" />
                <span className="truncate">CHEF FIELD MANUAL</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Spacer: Preserves center screen 100% unobstructed for clear view of planet and rings */}
      <div aria-hidden="true" className="flex-1 pointer-events-none" />
    </div>
  );
}
