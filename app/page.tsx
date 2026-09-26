'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CosmicCatChefHero } from '@/components/landing/CosmicCatChefHero';
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
    <div className="min-h-screen bg-[#070913] text-[#f4f4f4] flex flex-col selection:bg-[#be95ff] selection:text-[#0d0922] font-sans">
      {/* 1. Floating Pill Navigation Header (Matching Chumbi Valley Pill Bar) */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Left: Small Logo Pill */}
        <Link
          href="/"
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#111328]/85 border border-white/20 hover:border-[#be95ff]/60 shadow-[0_8px_25px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all hover:scale-105"
        >
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#8a3ffc] to-[#00f0ff] flex items-center justify-center text-white text-xs">
            🐱
          </div>
          <span className="font-extrabold text-xs tracking-wider text-white uppercase hidden sm:inline">
            QUANTUM KITCHEN
          </span>
        </Link>

        {/* Center: Clean Floating Pill Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#111328]/85 border border-white/20 shadow-[0_8px_25px_rgba(0,0,0,0.5)] backdrop-blur-md text-xs font-bold text-slate-200">
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
            Space Lore
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
            className="h-9 w-9 rounded-full bg-[#111328]/85 border border-white/20 hover:border-white/40 shadow-[0_8px_20px_rgba(0,0,0,0.4)] backdrop-blur-md flex items-center justify-center text-slate-200 hover:text-white cursor-pointer transition-transform hover:scale-105"
            title={isMuted ? 'Unmute Web Audio' : 'Mute Web Audio'}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-slate-400" />
            ) : (
              <Volume2 className="h-4 w-4 text-[#be95ff]" />
            )}
          </button>

          {/* Primary Action Button */}
          <Link href="/play">
            <button className="px-5 py-2 rounded-full bg-gradient-to-r from-[#be95ff] via-[#8a3ffc] to-[#00f0ff] hover:from-[#cdaaff] hover:to-[#26f5ff] text-[#0d0922] font-black text-xs sm:text-sm tracking-wider uppercase border border-white/60 shadow-[0_8px_25px_rgba(0,0,0,0.6),0_0_20px_rgba(190,149,255,0.4)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.7),0_0_30px_rgba(0,240,255,0.6)] cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5">
              <Play className="h-3.5 w-3.5 fill-[#0d0922]" />
              <span>PLAY GAME</span>
            </button>
          </Link>
        </div>
      </header>

      {/* 2. Panoramic Space Hero: Astronaut Cat Chef Cooking in Zero-G */}
      <CosmicCatChefHero
        onOpenManual={() => setHowToPlayOpen(true)}
        isMuted={isMuted}
        onToggleMute={toggleSound}
      />

      {/* 3. Uncluttered Space Kitchen Lore (Below the Fold) */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-8 py-16 sm:py-24 space-y-24">
        {/* Step-by-step Game Loop: 3 Clean Floating Space Cards */}
        <section id="lore" className="space-y-10 text-center">
          <div className="space-y-3 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1 bg-[#1a1638] border border-[#be95ff]/40 text-xs font-mono font-bold text-[#be95ff]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>INTERSTELLAR QUANTUM CHEF</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              Cooking in Zero Gravity
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              In deep space, ingredients don&apos;t sit in bowls—they float as 2D Fibonacci anyons braided into spacetime world-lines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="rounded-3xl bg-gradient-to-b from-[#181335] to-[#0d0a20] border-2 border-[#2b2255] p-8 space-y-4 text-left shadow-xl hover:border-[#be95ff]/60 transition-all group">
              <div className="h-12 w-12 rounded-2xl bg-[#be95ff]/15 border border-[#be95ff]/40 flex items-center justify-center text-xl font-mono font-extrabold text-[#be95ff]">
                01
              </div>
              <h3 className="font-extrabold text-lg text-white">Accept Space Tickets</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Review astronaut and alien customer orders for target Sweetness, Spiciness, Umami, and Tartness vectors.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-3xl bg-gradient-to-b from-[#181335] to-[#0d0a20] border-2 border-[#2b2255] p-8 space-y-4 text-left shadow-xl hover:border-[#00f0ff]/60 transition-all group">
              <div className="h-12 w-12 rounded-2xl bg-[#00f0ff]/15 border border-[#00f0ff]/40 flex items-center justify-center text-xl font-mono font-extrabold text-[#00f0ff]">
                02
              </div>
              <h3 className="font-extrabold text-lg text-white">Weave on the Space Loom</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Execute Over (σᵢ) and Under (σᵢ⁻¹) crossings to build fault-tolerant quantum phase shifts with zero decoherence.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-3xl bg-gradient-to-b from-[#181335] to-[#0d0a20] border-2 border-[#2b2255] p-8 space-y-4 text-left shadow-xl hover:border-[#f1c21b]/60 transition-all group">
              <div className="h-12 w-12 rounded-2xl bg-[#f1c21b]/15 border border-[#f1c21b]/40 flex items-center justify-center text-xl font-mono font-extrabold text-[#f1c21b]">
                03
              </div>
              <h3 className="font-extrabold text-lg text-white">Anyon Fusion Plating</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Send braided strands into the Anyon Reactor. Measure the non-Abelian state to plate legendary 3-star space dishes!
              </p>
            </div>
          </div>
        </section>

        {/* Anyon Quasiparticle Ingredients Showcase */}
        <section id="anyons" className="space-y-10 text-center">
          <div className="space-y-3 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1 bg-[#151c38] border border-[#00f0ff]/40 text-xs font-mono font-bold text-[#00f0ff]">
              <Atom className="h-3.5 w-3.5" />
              <span>FIBONACCI ANYONS (τ)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              Floating Quasiparticle Ingredients
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every ingredient is a 2D topological anyon carrying quantum memory in its spacetime braids.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { key: 'tomato', name: 'Solar Tomato', color: '#da1e28', icon: '🍅', role: 'Tartness Superposition' },
              { key: 'bread', name: 'Quantum Brioche', color: '#f1c21b', icon: '🥖', role: 'Phase Foundation' },
              { key: 'carrot', name: 'Starlight Carrot', color: '#ff832b', icon: '🥕', role: 'Sweetness Rotation' },
              { key: 'lettuce', name: 'Auroral Lettuce', color: '#24a148', icon: '🥬', role: 'Entanglement Simmer' },
            ].map((ing) => (
              <div
                key={ing.key}
                className="rounded-3xl bg-[#120f29] border border-[#2b2255] p-6 text-center space-y-3 shadow-lg hover:scale-105 transition-all"
              >
                <div className="text-4xl sm:text-5xl drop-shadow-lg">{ing.icon}</div>
                <h4 className="font-extrabold text-sm sm:text-base text-white">{ing.name}</h4>
                <p className="text-[11px] text-slate-400 font-mono">{ing.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Big Final Call to Action Box */}
        <section className="rounded-3xl bg-gradient-to-r from-[#1e1542] via-[#2c1b5e] to-[#1e1542] border-2 border-[#be95ff]/50 p-8 sm:p-14 text-center space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              Ready to Cook in Deep Space?
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Free to play. No installation required. Master the art of non-Abelian quantum cooking right in your browser.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link href="/play">
              <button className="px-9 py-4 rounded-full bg-gradient-to-r from-[#be95ff] via-[#8a3ffc] to-[#00f0ff] hover:from-[#cdaaff] hover:to-[#26f5ff] text-[#0d0922] font-black text-sm sm:text-base tracking-wider uppercase border-2 border-white shadow-[0_12px_35px_rgba(0,0,0,0.7),0_0_30px_rgba(190,149,255,0.6)] cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                <Play className="h-4 w-4 fill-[#0d0922]" />
                <span>LAUNCH GAME NOW</span>
              </button>
            </Link>

            <Link href="/credits">
              <button className="px-6 py-3.5 rounded-full bg-[#111328]/80 hover:bg-[#1a1d3e] text-slate-300 hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase border border-white/30 cursor-pointer transition-all">
                Credits & Lineage
              </button>
            </Link>
          </div>
        </section>
      </main>

      {/* Clean Space Footer */}
      <footer className="border-t border-[#1e1a3d] bg-[#05060e] py-8 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white">QUANTUM KITCHEN</span>
            <span>•</span>
            <span>Cosmic Space Threads Simulator</span>
          </div>

          <div className="flex items-center gap-5 font-semibold">
            <Link href="/play" className="hover:text-[#be95ff] transition-colors">
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
