'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ChunkyGameTitle } from './ChunkyGameTitle';
import { Play, Sparkles, Volume2, VolumeX, Atom, BookOpen, Stars } from 'lucide-react';

interface CosmicCatChefHeroProps {
  onOpenManual?: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export function CosmicCatChefHero({
  onOpenManual,
  isMuted = false,
  onToggleMute,
}: CosmicCatChefHeroProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const pillBadgeRef = useRef<HTMLAnchorElement>(null);
  const catChefRef = useRef<HTMLDivElement>(null);
  const wokParticlesRef = useRef<SVGGElement>(null);
  const floatingTomatoRef = useRef<HTMLDivElement>(null);
  const floatingCarrotRef = useRef<HTMLDivElement>(null);
  const floatingBreadRef = useRef<HTMLDivElement>(null);
  const floatingAnyonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Title levitation
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        y: -12,
        duration: 2.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }

    // 2. Top-right badge bobbing
    if (pillBadgeRef.current) {
      gsap.to(pillBadgeRef.current, {
        y: -6,
        duration: 2.0,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.3,
      });
    }

    // 3. Cat Chef Zero-G floating & gentle breathing
    if (catChefRef.current) {
      gsap.to(catChefRef.current, {
        y: -16,
        rotation: 2,
        duration: 3.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }

    // 4. Floating ingredients in zero gravity
    if (floatingTomatoRef.current) {
      gsap.to(floatingTomatoRef.current, {
        y: -24,
        x: 10,
        rotation: 35,
        duration: 3.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.2,
      });
    }

    if (floatingCarrotRef.current) {
      gsap.to(floatingCarrotRef.current, {
        y: -30,
        x: -12,
        rotation: -45,
        duration: 4.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.6,
      });
    }

    if (floatingBreadRef.current) {
      gsap.to(floatingBreadRef.current, {
        y: -18,
        x: 14,
        rotation: 20,
        duration: 3.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1.0,
      });
    }

    if (floatingAnyonRef.current) {
      gsap.to(floatingAnyonRef.current, {
        y: -28,
        x: -8,
        rotation: 360,
        duration: 6.0,
        ease: 'linear',
        repeat: -1,
      });
    }
  }, []);

  return (
    <div className="relative w-full min-h-[92vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#060814] via-[#0d102b] via-[#161338] to-[#251347] select-none text-white">
      {/* 1. Deep Space Cosmos Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glowing Space Nebulae */}
        <div className="absolute top-10 left-1/4 w-[600px] h-[500px] bg-[#8a3ffc]/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-20 right-10 w-[650px] h-[550px] bg-[#00f0ff]/15 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-10 w-[500px] h-[450px] bg-[#ee5396]/15 rounded-full blur-[140px]" />

        {/* Ringed Celestial Gas Planet (Top Left) */}
        <div className="absolute top-16 left-6 sm:left-16 opacity-75">
          <div className="relative h-20 w-20 sm:h-28 sm:w-28 rounded-full bg-gradient-to-br from-[#8a3ffc] via-[#be95ff] to-[#00f0ff] shadow-[0_0_40px_rgba(138,63,252,0.6)]">
            {/* Planet Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 sm:w-44 h-8 sm:h-12 border-2 border-[#be95ff]/60 rounded-full rotate-[-28deg] shadow-[0_0_15px_rgba(190,149,255,0.4)]" />
          </div>
        </div>

        {/* Small Crescent Moon / Star Cluster (Top Right) */}
        <div className="absolute top-24 right-1/3 opacity-60">
          <div className="h-10 w-10 rounded-full bg-[#f1c21b] shadow-[0_0_25px_rgba(241,194,27,0.7)]" />
        </div>

        {/* Glowing Braid Constellations in Deep Space */}
        <svg
          className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M-100,220 C300,80 600,380 1000,120 C1200,40 1400,280 1600,160"
            stroke="url(#spaceBraid1)"
            strokeWidth="3.5"
            strokeDasharray="6 8"
            className="animate-pulse"
          />
          <path
            d="M-100,320 C400,380 750,140 1150,300 C1350,380 1500,220 1600,280"
            stroke="url(#spaceBraid2)"
            strokeWidth="3"
            strokeDasharray="5 5"
          />
          <defs>
            <linearGradient id="spaceBraid1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#be95ff" stopOpacity="1" />
              <stop offset="100%" stopColor="#f1c21b" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="spaceBraid2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff7eb6" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#00f0ff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#72f1b8" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Twinkling Space Stars */}
        <div className="absolute top-1/4 left-1/6 h-2 w-2 rounded-full bg-white animate-ping opacity-70" />
        <div className="absolute top-1/3 right-1/5 h-2.5 w-2.5 rounded-full bg-[#00f0ff] animate-pulse opacity-90 shadow-[0_0_10px_#00f0ff]" />
        <div className="absolute bottom-1/3 left-1/4 h-1.5 w-1.5 rounded-full bg-[#be95ff] opacity-80" />
        <div className="absolute top-20 right-16 h-2 w-2 rounded-full bg-[#f1c21b] opacity-90 shadow-[0_0_8px_#f1c21b]" />
      </div>

      {/* 2. Top-Right Floating Pill Badge */}
      <div className="relative z-30 pt-20 px-4 sm:px-8 max-w-7xl mx-auto w-full flex justify-end">
        <Link
          href="/play"
          ref={pillBadgeRef}
          className="group flex items-center gap-3 bg-[#131530]/85 hover:bg-[#1a1e42] border-2 border-[#8a3ffc]/60 hover:border-[#be95ff] rounded-2xl p-2.5 sm:px-4 sm:py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(138,63,252,0.3)] backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <div className="text-left">
            <div className="text-[11px] font-bold text-white tracking-wide flex items-center gap-1.5">
              <span>Cat Chef Loom is Online!</span>
              <Sparkles className="h-3 w-3 text-[#f1c21b] animate-bounce" />
            </div>
            <div className="mt-1 inline-flex items-center gap-1 text-[10px] font-black text-[#100826] bg-gradient-to-r from-[#be95ff] to-[#00f0ff] px-2.5 py-0.5 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-[#100826]" />
              COOK NOW
            </div>
          </div>
          <div className="relative h-11 w-11 rounded-xl bg-[#22174d] border border-[#be95ff]/50 flex items-center justify-center text-xl shadow-inner shrink-0">
            🐱‍🍳
          </div>
        </Link>
      </div>

      {/* 3. Center Game Logo & Primary Pill Action */}
      <div ref={titleRef} className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 py-6 space-y-6">
        <ChunkyGameTitle />

        {/* Center Pill Button (Matching Chumbi Valley "ENTER KITCHEN") */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Link href="/play">
            <button className="px-9 py-4 rounded-full bg-gradient-to-r from-[#be95ff] via-[#8a3ffc] to-[#00f0ff] hover:from-[#cdaaff] hover:to-[#26f5ff] text-[#0d0922] font-black text-sm sm:text-base tracking-wider uppercase border-2 border-white shadow-[0_12px_35px_rgba(0,0,0,0.7),0_0_30px_rgba(190,149,255,0.6)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.8),0_0_40px_rgba(0,240,255,0.8)] cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center gap-2.5">
              <Play className="h-4 w-4 fill-[#0d0922]" />
              <span>ENTER COSMIC KITCHEN</span>
            </button>
          </Link>

          {onOpenManual && (
            <button
              onClick={onOpenManual}
              className="px-6 py-3.5 rounded-full bg-[#121430]/85 hover:bg-[#1a1d42] text-slate-200 hover:text-white font-bold text-xs tracking-wider uppercase border border-white/30 shadow-md backdrop-blur-md cursor-pointer transition-all hover:scale-105 flex items-center gap-2"
            >
              <BookOpen className="h-3.5 w-3.5 text-[#00f0ff]" />
              <span>Chef Field Manual</span>
            </button>
          )}
        </div>
      </div>

      {/* 4. Cosmic Cat Chef in Space Hero Visual Centerpiece (Bottom Landscape) */}
      <div className="relative z-10 w-full mt-auto pointer-events-none flex items-end justify-between px-4 sm:px-12 pb-4">
        {/* Left Side: Floating Zero-G Ingredients */}
        <div className="hidden sm:flex flex-col items-start gap-4 pb-12 pointer-events-auto">
          {/* Floating Tomato */}
          <div
            ref={floatingTomatoRef}
            className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#16122e]/80 border border-[#ff3b5c]/40 backdrop-blur-md shadow-[0_0_20px_rgba(255,59,92,0.3)]"
          >
            <span className="text-2xl drop-shadow-md">🍅</span>
            <span className="text-[11px] font-mono font-bold text-[#ff7b92]">Solar Tomato</span>
          </div>

          {/* Floating Starlight Carrot */}
          <div
            ref={floatingCarrotRef}
            className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#16122e]/80 border border-[#ff9933]/40 backdrop-blur-md shadow-[0_0_20px_rgba(255,153,51,0.3)] ml-6"
          >
            <span className="text-2xl drop-shadow-md">🥕</span>
            <span className="text-[11px] font-mono font-bold text-[#ffb86c]">Starlight Carrot</span>
          </div>

          {/* Floating Quantum Anyon */}
          <div
            ref={floatingAnyonRef}
            className="h-10 w-10 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#8a3ffc] border-2 border-white flex items-center justify-center text-xs font-black text-black shadow-[0_0_25px_rgba(0,240,255,0.7)] ml-2"
          >
            τ
          </div>
        </div>

        {/* Center-Right Main Hero: The Astronaut Cat Chef with Toque Cooking in a Quantum Wok! */}
        <div
          ref={catChefRef}
          className="relative mx-auto sm:mx-0 pointer-events-auto flex flex-col items-center cursor-pointer group"
          title="Cosmic Cat Chef stirring Non-Abelian Stardust!"
        >
          {/* Floating Zero-G Quantum Bread above Chef */}
          <div
            ref={floatingBreadRef}
            className="absolute -top-12 -left-8 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#16122e]/80 border border-[#f1c21b]/40 backdrop-blur-md shadow-[0_0_15px_rgba(241,194,27,0.3)]"
          >
            <span className="text-xl">🥖</span>
            <span className="text-[10px] font-mono font-bold text-[#f1c21b]">Quantum Brioche</span>
          </div>

          {/* Detailed SVG Cat Chef Artwork */}
          <svg
            className="w-64 sm:w-80 md:w-96 h-60 sm:h-72 md:h-84 drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
            viewBox="0 0 340 300"
            fill="none"
          >
            {/* Quantum Wok / Stirring Cauldron with Plasma Glow */}
            <defs>
              <radialGradient id="plasmaGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="1" />
                <stop offset="45%" stopColor="#be95ff" stopOpacity="0.8" />
                <stop offset="85%" stopColor="#8a3ffc" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#120c2b" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="catFurGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f7ecd0" />
                <stop offset="50%" stopColor="#e8c89b" />
                <stop offset="100%" stopColor="#c79c65" />
              </linearGradient>
              <linearGradient id="toqueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="#eef2f7" />
                <stop offset="100%" stopColor="#c8d6e5" />
              </linearGradient>
              <linearGradient id="suitGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2e2b4f" />
                <stop offset="50%" stopColor="#1e1a38" />
                <stop offset="100%" stopColor="#131024" />
              </linearGradient>
            </defs>

            {/* Glowing Space Stirring Wok Base */}
            <ellipse cx="170" cy="245" rx="90" ry="32" fill="#18152c" stroke="#3b3566" strokeWidth="4" />
            <ellipse cx="170" cy="240" rx="80" ry="24" fill="url(#plasmaGlow)" />

            {/* Bubbling Magic Cooking Sparks inside Wok */}
            <circle cx="150" cy="235" r="4" fill="#ffffff" className="animate-ping" />
            <circle cx="185" cy="242" r="5" fill="#f1c21b" className="animate-pulse" />
            <circle cx="165" cy="248" r="3.5" fill="#00f0ff" />
            <circle cx="195" cy="236" r="3" fill="#ff7eb6" />

            {/* Cat Space Suit Body */}
            <ellipse cx="170" cy="180" rx="55" ry="50" fill="url(#suitGrad)" stroke="#4a437a" strokeWidth="3" />
            {/* Cyan Collar / Space Ring */}
            <ellipse cx="170" cy="138" rx="38" ry="12" fill="#00f0ff" opacity="0.9" />

            {/* Golden Chef Scarf / Neck Ribbon */}
            <path d="M155,142 L185,142 L195,165 L170,158 L145,165 Z" fill="#f1c21b" stroke="#9e7506" strokeWidth="2" />

            {/* Cat Head */}
            <circle cx="170" cy="105" r="42" fill="url(#catFurGrad)" stroke="#7d582b" strokeWidth="3" />

            {/* Cat Ears */}
            <polygon points="135,80 120,40 152,68" fill="url(#catFurGrad)" stroke="#7d582b" strokeWidth="3" />
            <polygon points="137,74 127,48 149,66" fill="#f8b6c8" />

            <polygon points="205,80 220,40 188,68" fill="url(#catFurGrad)" stroke="#7d582b" strokeWidth="3" />
            <polygon points="203,74 213,48 191,66" fill="#f8b6c8" />

            {/* Cute Cat Face */}
            {/* Big Expressive Anime Eyes */}
            <ellipse cx="154" cy="102" rx="7" ry="10" fill="#1b1233" />
            <circle cx="152" cy="99" r="3" fill="#ffffff" />
            <ellipse cx="186" cy="102" rx="7" ry="10" fill="#1b1233" />
            <circle cx="184" cy="99" r="3" fill="#ffffff" />

            {/* Pink Nose & Happy Mouth */}
            <polygon points="170,112 166,108 174,108" fill="#e85d88" />
            <path d="M165,114 Q170,120 170,114 Q170,120 175,114" stroke="#7d582b" strokeWidth="2" fill="none" />

            {/* Rosy Cheeks */}
            <ellipse cx="143" cy="112" rx="6" ry="4" fill="#ff7eb6" opacity="0.6" />
            <ellipse cx="197" cy="112" rx="6" ry="4" fill="#ff7eb6" opacity="0.6" />

            {/* Whiskers */}
            <line x1="135" y1="108" x2="115" y2="105" stroke="#7d582b" strokeWidth="1.5" />
            <line x1="135" y1="114" x2="112" y2="116" stroke="#7d582b" strokeWidth="1.5" />
            <line x1="205" y1="108" x2="225" y2="105" stroke="#7d582b" strokeWidth="1.5" />
            <line x1="205" y1="114" x2="228" y2="116" stroke="#7d582b" strokeWidth="1.5" />

            {/* Big Puffy White Chef Hat (Toque Blanche) */}
            {/* Hat Band */}
            <rect x="145" y="65" width="50" height="14" rx="4" fill="#dce5ef" stroke="#8fa3b8" strokeWidth="2" />
            {/* Puffy Toque Crown */}
            <path
              d="M142,66 C125,50 135,15 155,20 C162,5 178,5 185,20 C205,15 215,50 198,66 Z"
              fill="url(#toqueGrad)"
              stroke="#8fa3b8"
              strokeWidth="2.5"
            />
            {/* Pleat lines on hat */}
            <path d="M158,25 Q160,50 158,65" stroke="#b4c5d8" strokeWidth="1.5" fill="none" />
            <path d="M170,18 Q170,48 170,65" stroke="#b4c5d8" strokeWidth="1.5" fill="none" />
            <path d="M182,25 Q180,50 182,65" stroke="#b4c5d8" strokeWidth="1.5" fill="none" />

            {/* Cat Paws holding Golden Stirring Whisk / Spoon */}
            {/* Left Paw */}
            <ellipse cx="132" cy="190" rx="12" ry="10" fill="url(#catFurGrad)" stroke="#7d582b" strokeWidth="2" />
            {/* Right Paw holding Spoon */}
            <ellipse cx="208" cy="180" rx="12" ry="10" fill="url(#catFurGrad)" stroke="#7d582b" strokeWidth="2" />

            {/* Golden Cosmic Spoon stirring the wok */}
            <line x1="215" y1="170" x2="175" y2="235" stroke="#f1c21b" strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="172" cy="238" rx="10" ry="6" fill="#f1c21b" stroke="#b8860b" strokeWidth="2" />
          </svg>
        </div>

        {/* Right Side: Small Mascot Stardust Cheerleader */}
        <div className="hidden lg:flex flex-col items-center gap-2 pb-14 pointer-events-auto">
          <div className="h-12 w-12 rounded-2xl bg-[#1c1440]/90 border border-[#be95ff]/50 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(190,149,255,0.4)] animate-bounce">
            ✨
          </div>
          <span className="text-[10px] font-mono text-[#be95ff] font-bold">Non-Abelian Soup</span>
        </div>
      </div>
    </div>
  );
}
