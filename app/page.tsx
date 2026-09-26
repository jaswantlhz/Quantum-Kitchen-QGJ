'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CosmicValleyHero } from '@/components/landing/CosmicValleyHero';
import { HowToPlayModal } from '@/components/game/HowToPlayModal';
import { soundFx } from '@/lib/audio/synthAudio';
import {
  Volume2,
  VolumeX,
  ChefHat,
  Atom,
  Heart,
  Activity,
  Play,
  Sparkles,
  GitCommit,
  Flame,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { INGREDIENTS } from '@/lib/game/ingredientSketches';

export default function GameLandingPage() {
  const [howToPlayOpen, setHowToPlayOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFx.setMuted(nextMuted);
    if (!nextMuted) {
      soundFx.playPluck(1, true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1b22] text-[#f4f4f4] flex flex-col selection:bg-[#72f1b8] selection:text-[#0c2419] font-sans">
      {/* 1. Floating Pill Navigation Header (Matching Chumbi Valley) */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Left: Small Logo Pill */}
        <Link
          href="/"
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0a161d]/85 border border-white/20 hover:border-[#72f1b8]/60 shadow-[0_8px_20px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all hover:scale-105"
        >
          <div className="h-6 w-6 rounded-full bg-[#24a148] flex items-center justify-center text-white">
            <ChefHat className="h-3.5 w-3.5" />
          </div>
          <span className="font-extrabold text-xs tracking-wider text-white uppercase hidden sm:inline">
            QUANTUM KITCHEN
          </span>
        </Link>

        {/* Center: Clean Floating Pill Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0a161d]/85 border border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.4)] backdrop-blur-md text-xs font-bold text-slate-200">
          <button
            onClick={() => setHowToPlayOpen(true)}
            className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Game Info</span>
            <ChevronDown className="h-3 w-3 opacity-60" />
          </button>

          <a
            href="#anyons"
            className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
          >
            Anyons (τ)
          </a>

          <a
            href="#lore"
            className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
          >
            Lore
          </a>

          <Link
            href="/admin"
            className="px-3 py-1.5 rounded-full hover:text-[#00f0ff] hover:bg-white/10 transition-colors flex items-center gap-1.5"
          >
            <Activity className="h-3 w-3 text-[#00f0ff]" />
            <span>Scientist Lab</span>
          </Link>

          <Link
            href="/credits"
            className="px-3 py-1.5 rounded-full hover:text-[#ee5396] hover:bg-white/10 transition-colors flex items-center gap-1"
          >
            <Heart className="h-3 w-3 text-[#ee5396]" />
            <span>Credits</span>
          </Link>
        </nav>

        {/* Right: Sound Pill + Primary Play Pill */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ambient Sound Toggle Pill */}
          <button
            onClick={toggleSound}
            className="h-9 w-9 rounded-full bg-[#0a161d]/85 border border-white/20 hover:border-white/40 shadow-[0_8px_20px_rgba(0,0,0,0.4)] backdrop-blur-md flex items-center justify-center text-slate-200 hover:text-white cursor-pointer transition-transform hover:scale-105"
            title={isMuted ? 'Unmute Web Audio' : 'Mute Web Audio'}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-slate-400" />
            ) : (
              <Volume2 className="h-4 w-4 text-[#72f1b8]" />
            )}
          </button>

          {/* Primary Action Button */}
          <Link href="/play">
            <button className="px-5 py-2 rounded-full bg-gradient-to-r from-[#3eb47a] to-[#24a148] hover:from-[#46c989] hover:to-[#2bc056] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase border border-white/60 shadow-[0_8px_25px_rgba(0,0,0,0.5),0_0_15px_rgba(114,241,184,0.4)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_25px_rgba(114,241,184,0.6)] cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5">
              <Play className="h-3.5 w-3.5 fill-white" />
              <span>PLAY GAME</span>
            </button>
          </Link>
        </div>
      </header>

      {/* 2. Full-Bleed Panoramic Illustrated Game Hero (Chumbi Valley Scene) */}
      <CosmicValleyHero
        onOpenManual={() => setHowToPlayOpen(true)}
        isMuted={isMuted}
        onToggleMute={toggleSound}
      />

      {/* 3. Uncluttered Game World Showcase (Below the Fold) */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-8 py-16 sm:py-24 space-y-24">
        {/* Step-by-step Game Loop: 3 Clean Floating Cards */}
        <section id="lore" className="space-y-10 text-center">
          <div className="space-y-3 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1 bg-[#16333a] border border-[#72f1b8]/40 text-xs font-mono font-bold text-[#72f1b8]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>THE QUANTUM VALLEY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              How to Cook on the Loom
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Step into an interstellar culinary sanctuary where Fibonacci anyons replace ordinary matter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="rounded-3xl bg-gradient-to-b from-[#142933] to-[#0c1a20] border-2 border-[#204a57] p-8 space-y-4 text-left shadow-xl hover:border-[#72f1b8]/60 transition-all group">
              <div className="h-12 w-12 rounded-2xl bg-[#72f1b8]/15 border border-[#72f1b8]/40 flex items-center justify-center text-xl font-mono font-extrabold text-[#72f1b8]">
                01
              </div>
              <h3 className="font-extrabold text-lg text-white">Accept Order Tickets</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Check cosmic customer requests for Sweetness, Spiciness, Umami, and Tartness vectors.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-3xl bg-gradient-to-b from-[#142933] to-[#0c1a20] border-2 border-[#204a57] p-8 space-y-4 text-left shadow-xl hover:border-[#be95ff]/60 transition-all group">
              <div className="h-12 w-12 rounded-2xl bg-[#be95ff]/15 border border-[#be95ff]/40 flex items-center justify-center text-xl font-mono font-extrabold text-[#be95ff]">
                02
              </div>
              <h3 className="font-extrabold text-lg text-white">Weave Braid Crossings</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Swap strands using Over (σᵢ) and Under (σᵢ⁻¹) crossings to build fault-tolerant quantum phase rotations.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-3xl bg-gradient-to-b from-[#142933] to-[#0c1a20] border-2 border-[#204a57] p-8 space-y-4 text-left shadow-xl hover:border-[#f1c21b]/60 transition-all group">
              <div className="h-12 w-12 rounded-2xl bg-[#f1c21b]/15 border border-[#f1c21b]/40 flex items-center justify-center text-xl font-mono font-extrabold text-[#f1c21b]">
                03
              </div>
              <h3 className="font-extrabold text-lg text-white">Anyon Fusion Plating</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Send braided strands into the Anyon Reactor. Measure the non-Abelian state to plate 3-star dishes!
              </p>
            </div>
          </div>
        </section>

        {/* Anyon Quasiparticle Ingredients Showcase */}
        <section id="anyons" className="space-y-10 text-center">
          <div className="space-y-3 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1 bg-[#1a2c38] border border-[#00f0ff]/40 text-xs font-mono font-bold text-[#00f0ff]">
              <Atom className="h-3.5 w-3.5" />
              <span>FIBONACCI ANYONS (τ)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              Meet the Quasiparticle Ingredients
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every ingredient is a 2D topological anyon carrying quantum memory in its spacetime braids.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { key: 'tomato', name: 'Solar Tomato', color: '#da1e28', icon: '🍅', role: 'Tartness Superposition' },
              { key: 'bread', name: 'Quantum Bread', color: '#f1c21b', icon: '🥖', role: 'Phase Foundation' },
              { key: 'carrot', name: 'Starlight Carrot', color: '#ff832b', icon: '🥕', role: 'Sweetness Rotation' },
              { key: 'lettuce', name: 'Auroral Lettuce', color: '#24a148', icon: '🥬', role: 'Entanglement Simmer' },
            ].map((ing) => (
              <div
                key={ing.key}
                className="rounded-3xl bg-[#0f212a] border border-[#204a57] p-6 text-center space-y-3 shadow-lg hover:scale-105 transition-all"
              >
                <div className="text-4xl sm:text-5xl drop-shadow-lg">{ing.icon}</div>
                <h4 className="font-extrabold text-sm sm:text-base text-white">{ing.name}</h4>
                <p className="text-[11px] text-slate-400 font-mono">{ing.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Big Final Call to Action Box */}
        <section className="rounded-3xl bg-gradient-to-r from-[#173844] via-[#1f4e5a] to-[#173844] border-2 border-[#72f1b8]/50 p-8 sm:p-14 text-center space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              Ready to Enter the Valley?
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Free to play. No installation required. Master the art of non-Abelian quantum cooking right in your browser.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link href="/play">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[#3eb47a] to-[#24a148] hover:from-[#46c989] hover:to-[#2bc056] text-white font-extrabold text-sm sm:text-base tracking-wider uppercase border-2 border-white shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(114,241,184,0.5)] cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                <Play className="h-4 w-4 fill-white" />
                <span>LAUNCH GAME NOW</span>
              </button>
            </Link>

            <Link href="/credits">
              <button className="px-6 py-3.5 rounded-full bg-[#0a161d]/80 hover:bg-[#12242e] text-slate-300 hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase border border-white/30 cursor-pointer transition-all">
                Credits & Lineage
              </button>
            </Link>
          </div>
        </section>
      </main>

      {/* Clean Illustrated Game Footer */}
      <footer className="border-t border-[#1a3844] bg-[#081217] py-8 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white">QUANTUM KITCHEN</span>
            <span>•</span>
            <span>Cosmic Threads Simulator</span>
          </div>

          <div className="flex items-center gap-5 font-semibold">
            <Link href="/play" className="hover:text-[#72f1b8] transition-colors">
              Play Game
            </Link>
            <Link href="/admin" className="hover:text-[#00f0ff] transition-colors">
              Scientist Lab
            </Link>
            <Link href="/credits" className="hover:text-[#ee5396] transition-colors">
              Credits
            </Link>
            <span className="text-slate-600">|</span>
            <span className="text-slate-500 font-mono">MIT License</span>
          </div>
        </div>
      </footer>

      {/* Embedded Clean How to Play Dialog */}
      <HowToPlayModal
        open={howToPlayOpen}
        onOpenChange={setHowToPlayOpen}
        triggerButton={false}
      />
    </div>
  );
}
