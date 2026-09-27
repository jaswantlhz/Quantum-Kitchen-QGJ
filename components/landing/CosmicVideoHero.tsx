'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Play, BookOpen, Volume2, VolumeX, Menu, X } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  return (
    <div className="relative w-full h-[100dvh] min-h-[580px] sm:min-h-[720px] flex flex-col justify-between overflow-hidden bg-black select-none text-slate-100 font-sans">
      {/* Background Video Layer - Scaled and Positioned Responsively */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-[calc(100%+30px)] object-cover top-[90px] sm:top-[120px] md:top-[150px] transition-opacity duration-1000 ${
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

      {/* Navigation Bar */}
      <header className="relative z-30 w-full px-3 sm:px-6 lg:px-12 pt-3 sm:pt-5">
        <nav className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-3 rounded-2xl flex items-center justify-between bg-[#523e58]/40 border border-[#7b5d95]/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.4),0_0_20px_rgba(157,155,229,0.15)]">
          {/* Brand Pill */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#523e58]/70 border border-[#9d9be5]/40 flex items-center justify-center text-[#9d9be5] shadow-[0_0_12px_rgba(157,155,229,0.3)] group-hover:scale-105 transition-transform">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#9d9be5]"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                <line x1="6" x2="18" y1="17" y2="17" />
              </svg>
            </div>
            <span className="font-bold text-[11px] sm:text-xs tracking-wider uppercase text-[#f5f4ff] drop-shadow-[0_0_8px_rgba(157,155,229,0.4)] truncate max-w-[140px] xs:max-w-none">
              QUANTUM KITCHEN
            </span>
          </Link>

          {/* Desktop Center Nav Links */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-7 font-mono text-xs tracking-wider uppercase font-medium text-[#9d9be5]/80">
            {onOpenManual && (
              <button
                onClick={onOpenManual}
                className="hover:text-[#f5f4ff] transition-colors cursor-pointer uppercase"
              >
                HOW TO PLAY
              </button>
            )}
            <a href="#try-weave" className="hover:text-[#f5f4ff] transition-colors uppercase">
              TRY WEAVING
            </a>
            <a href="#dishes" className="hover:text-[#f5f4ff] transition-colors uppercase">
              COSMIC MENU
            </a>
            <a href="#how-it-works" className="hover:text-[#f5f4ff] transition-colors uppercase">
              QUANTUM MECHANICS
            </a>
            <Link
              href="/admin"
              className="flex items-center gap-1.5 hover:text-[#f5f4ff] transition-colors uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#9d9be5] shadow-[0_0_8px_#9d9be5]" />
              <span>SCIENTIST LAB</span>
            </Link>
            <Link href="/credits" className="hover:text-[#f5f4ff] transition-colors uppercase">
              CREDITS
            </Link>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Audio Toggle */}
            <button
              onClick={onToggleMute}
              aria-label="Toggle Sound"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#523e58]/50 hover:bg-[#7b5d95]/60 border border-[#7b5d95]/40 hover:border-[#9d9be5]/60 flex items-center justify-center text-[#9d9be5] hover:text-white transition-all duration-200 cursor-pointer"
              type="button"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#9d9be5]/60" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#9d9be5] drop-shadow-[0_0_8px_#9d9be5]" />
              )}
            </button>

            {/* Play Game Button */}
            <Link
              href="/play"
              onClick={() => soundFx.playBell()}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#423ea6]/30 hover:bg-[#423ea6]/50 border border-[#9d9be5]/60 text-[#f5f4ff] text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase transition-all duration-200 shadow-[0_0_16px_rgba(157,155,229,0.3)] hover:shadow-[0_0_22px_rgba(157,155,229,0.5)] cursor-pointer"
            >
              <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current shrink-0 text-[#9d9be5]" />
              <span>PLAY GAME</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 rounded-xl bg-[#523e58]/60 border border-[#7b5d95]/50 flex items-center justify-center text-[#9d9be5] hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-2xl bg-[#523e58]/95 border border-[#7b5d95]/60 backdrop-blur-2xl shadow-2xl flex flex-col space-y-3 font-mono text-xs tracking-wider uppercase font-medium text-[#9d9be5] animate-in fade-in slide-in-from-top-2">
            {onOpenManual && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenManual();
                }}
                className="text-left py-1.5 px-2.5 rounded-lg hover:bg-[#7b5d95]/40 hover:text-white transition-colors"
              >
                HOW TO PLAY
              </button>
            )}
            <a
              href="#try-weave"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2.5 rounded-lg hover:bg-[#7b5d95]/40 hover:text-white transition-colors"
            >
              TRY WEAVING
            </a>
            <a
              href="#dishes"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2.5 rounded-lg hover:bg-[#7b5d95]/40 hover:text-white transition-colors"
            >
              COSMIC MENU
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2.5 rounded-lg hover:bg-[#7b5d95]/40 hover:text-white transition-colors"
            >
              QUANTUM MECHANICS
            </a>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-1.5 px-2.5 rounded-lg hover:bg-[#7b5d95]/40 hover:text-white transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#9d9be5] shadow-[0_0_8px_#9d9be5]" />
              <span>SCIENTIST LAB</span>
            </Link>
            <Link
              href="/credits"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2.5 rounded-lg hover:bg-[#7b5d95]/40 hover:text-white transition-colors"
            >
              CREDITS
            </Link>
          </div>
        )}
      </header>

      {/* Hero Upper Content (Fluid typography and responsive stacking) */}
      <div className="relative z-20 flex flex-col items-center text-center px-3 sm:px-6 pt-4 sm:pt-6 pb-3 translate-y-[20px] sm:translate-y-[35px] md:translate-y-[50px]">
        <div className="max-w-4xl mx-auto flex flex-col items-center w-full">
          {/* Header / Title */}
          <h1 className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-tight mb-2 select-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9d9be5] via-[#9547a9] to-[#423ea6] drop-shadow-[0_0_24px_rgba(157,155,229,0.45)]">
              QUANTUM
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9547a9] via-[#7b5d95] to-[#9d9be5] drop-shadow-[0_0_24px_rgba(149,71,169,0.45)]">
              KITCHEN
            </span>
          </h1>

          {/* Subtitle Description */}
          <p className="max-w-md sm:max-w-xl text-[#9d9be5]/90 text-[11px] sm:text-xs md:text-sm font-normal tracking-wide leading-relaxed mb-3.5 sm:mb-4 px-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Synthesize molecular delicacies across spacetime. Master quantum thermodynamic recipes and serve the stars.
          </p>

          {/* Action Buttons (Stacked on small screens, row on desktop) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full max-w-xs sm:max-w-none px-2 sm:px-0">
            {/* Primary Action */}
            <Link
              href="/play"
              onClick={() => soundFx.playBell()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 py-2.5 px-5 sm:px-7 rounded-xl font-semibold text-xs tracking-[0.15em] sm:tracking-[0.18em] uppercase text-white bg-gradient-to-r from-[#423ea6] via-[#9547a9] to-[#9d9be5] hover:from-[#523e58] hover:via-[#9547a9] hover:to-[#9d9be5] shadow-[0_0_25px_rgba(66,62,166,0.45),inset_0_1px_1px_rgba(255,255,255,0.6)] hover:shadow-[0_0_35px_rgba(149,71,169,0.6),inset_0_1px_2px_rgba(255,255,255,0.8)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-center"
            >
              <Play className="w-3.5 h-3.5 fill-white shrink-0" />
              <span className="font-black">ENTER QUANTUM KITCHEN</span>
            </Link>

            {/* Secondary Action */}
            {onOpenManual && (
              <button
                onClick={onOpenManual}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-4 sm:px-6 rounded-xl font-medium text-xs tracking-[0.15em] sm:tracking-[0.18em] uppercase text-[#9d9be5] hover:text-white bg-[#523e58]/55 hover:bg-[#7b5d95]/70 border border-[#7b5d95]/50 hover:border-[#9d9be5]/70 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3),0_0_12px_rgba(149,71,169,0.2)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.45),0_0_20px_rgba(157,155,229,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-center"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#9d9be5] shrink-0 drop-shadow-[0_0_6px_#9d9be5]" />
                <span>CHEF FIELD MANUAL</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Spacer: Preserves center screen unobstructed for planet view */}
      <div aria-hidden="true" className="flex-1 pointer-events-none" />
    </div>
  );
}
