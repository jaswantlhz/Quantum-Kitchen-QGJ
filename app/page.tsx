'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CosmicVideoHero } from '@/components/landing/CosmicVideoHero';
import { InteractiveBraidTeaser } from '@/components/landing/InteractiveBraidTeaser';
import { HowToPlayModal } from '@/components/game/HowToPlayModal';
import { soundFx } from '@/lib/audio/synthAudio';
import { COSMIC_RECIPES } from '@/lib/game/recipes';
import {
  Volume2,
  VolumeX,
  ChefHat,
  Atom,
  Heart,
  Activity,
  Play,
  Sparkles,
  Flame,
  ShieldCheck,
  ChevronDown,
  Layers,
  Zap,
  Award,
  BookOpen,
} from 'lucide-react';

export default function GameLandingPage() {
  const [howToPlayOpen, setHowToPlayOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleFirstInteraction = () => {
      soundFx.startBGM();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    // Try starting BGM immediately
    soundFx.startBGM();

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFx.setMuted(nextMuted);
    if (!nextMuted) {
      soundFx.startBGM();
      soundFx.playPluck(1, true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c0e1e] via-[#141733] via-[#1a1438] to-[#0a0c18] text-[#f4f4f4] flex flex-col selection:bg-[#be95ff] selection:text-[#0d0922] font-sans">
      {/* 1. Panoramic Space Video Hero & Glass Navigation */}
      <CosmicVideoHero
        onOpenManual={() => setHowToPlayOpen(true)}
        isMuted={isMuted}
        onToggleMute={toggleSound}
      />

      {/* Main Landing Sections */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-8 py-12 sm:py-20 space-y-24">
        {/* Section: Live Interactive Weaving Sandbox */}
        <section id="try-weave" className="space-y-6 text-center">
          <InteractiveBraidTeaser />
        </section>

        {/* Section: 3-Step Quantum Cooking Loop */}
        <section id="how-it-works" className="space-y-12 text-center">
          <div className="space-y-3 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1 bg-[#231b4a] border border-[#be95ff]/40 text-xs font-mono font-bold text-[#be95ff]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>NON-ABELIAN TOPOLOGICAL RECIPES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              How Space Cooking Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              In deep space, ingredients don&apos;t boil in pots. They exist as 2D Fibonacci anyons braided through spacetime world-lines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="rounded-3xl bg-gradient-to-b from-[#211b47]/90 to-[#14112c]/90 border-2 border-[#3d336e]/60 p-8 space-y-4 text-left shadow-xl hover:border-[#be95ff]/60 transition-all group">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-[#be95ff]/15 border border-[#be95ff]/40 flex items-center justify-center text-xl font-mono font-extrabold text-[#be95ff]">
                  01
                </div>
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="font-extrabold text-lg text-white">Accept Galactic Tickets</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Analyze client flavor targets: Sweetness, Sourness, Spiciness, and Umami coherence matrices.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-3xl bg-gradient-to-b from-[#211b47]/90 to-[#14112c]/90 border-2 border-[#3d336e]/60 p-8 space-y-4 text-left shadow-xl hover:border-[#00f0ff]/60 transition-all group">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-[#00f0ff]/15 border border-[#00f0ff]/40 flex items-center justify-center text-xl font-mono font-extrabold text-[#00f0ff]">
                  02
                </div>
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-extrabold text-lg text-white">Weave Braid Operators</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Execute Over (σᵢ) and Under (σᵢ⁻¹) crossings to build fault-tolerant unitary matrices with zero decoherence.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-3xl bg-gradient-to-b from-[#211b47]/90 to-[#14112c]/90 border-2 border-[#3d336e]/60 p-8 space-y-4 text-left shadow-xl hover:border-[#f1c21b]/60 transition-all group">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-[#f1c21b]/15 border border-[#f1c21b]/40 flex items-center justify-center text-xl font-mono font-extrabold text-[#f1c21b]">
                  03
                </div>
                <span className="text-2xl">🍽️</span>
              </div>
              <h3 className="font-extrabold text-lg text-white">Anyon Fusion & Plating</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Twist braided world-lines into the Fusion Cooker. Measure the state to plate legendary 3-star quantum dishes!
              </p>
            </div>
          </div>
        </section>

        {/* Section: Cosmic Dishes Showcase */}
        <section id="dishes" className="space-y-12 text-center">
          <div className="space-y-3 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1 bg-[#1a2347] border border-[#00f0ff]/40 text-xs font-mono font-bold text-[#00f0ff]">
              <Award className="h-3.5 w-3.5" />
              <span>COSMIC KITCHEN MENU</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              Featured Quantum Recipes
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              From topological appetizers to 4-strand singularities, master real non-Abelian Fibonacci fusions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COSMIC_RECIPES.map((recipe) => (
              <div
                key={recipe.id}
                className="rounded-3xl bg-[#171436] border border-[#3b2e75] p-6 text-left space-y-4 shadow-lg hover:border-[#00f0ff]/60 hover:scale-[1.02] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{recipe.dishIcon}</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#ffd556]/15 text-[#f0c119] border border-[#f0c119]/30">
                      +{recipe.rewardCredits} Credits
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-base text-white">{recipe.name}</h4>
                    <p className="text-xs text-[#00f0ff] font-mono mt-0.5">
                      {recipe.strandCount} Strands • {recipe.mealCategory || 'Entrée'}
                    </p>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {recipe.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Target: Sweet {recipe.targetFlavor.sweetness}%</span>
                  <span className="text-[#be95ff]">Umami {recipe.targetFlavor.umami}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Quantum vs Classical Cooking Comparison */}
        <section className="rounded-3xl bg-gradient-to-b from-[#181d3d]/90 to-[#0e1022]/90 border-2 border-[#3d336e]/60 p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Topological vs. Classical Cooking
            </h3>
            <p className="text-xs text-slate-300">
              Why quantum anyon cooking is inherently fault-tolerant compared to traditional thermodynamics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-[#121428] border border-red-500/30 p-6 space-y-3">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                <Flame className="h-4 w-4" />
                <span>Classical Kitchen (Decoherence-Prone)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✕</span>
                  <span>Heat transfer creates thermal entropy and random particle collisions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✕</span>
                  <span>Flavor states degrade over time due to environmental noise.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✕</span>
                  <span>Limited by classical 3D geometric constraints.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-[#151c38] border border-[#00f0ff]/50 p-6 space-y-3 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
              <div className="flex items-center gap-2 text-[#00f0ff] font-bold text-sm">
                <ShieldCheck className="h-4 w-4 text-[#00f0ff]" />
                <span>Quantum Space Loom (Topological Invariance)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="text-[#00f0ff]">✓</span>
                  <span>Information is stored globally in 2D braid topology—immune to local noise!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00f0ff]">✓</span>
                  <span>Fibonacci anyon fusion rules ($τ \otimes τ = \mathbf{1} \oplus τ$) generate exact unitary gates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00f0ff]">✓</span>
                  <span>Fault-tolerant dish plating with mathematical coherence guarantees.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Big Final Call to Action Box */}
        <section className="rounded-3xl bg-gradient-to-r from-[#291b58] via-[#3a2278] to-[#291b58] border-2 border-[#be95ff]/60 p-8 sm:p-14 text-center space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              Ready to Master the Space Loom?
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              No installation required. Play immediately in your browser with full audio soundscapes, live quantum telemetry, and dynamic recipes.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link href="/play" onClick={() => soundFx.playBell()}>
              <button className="px-9 py-4 rounded-full bg-gradient-to-r from-[#be95ff] via-[#8a3ffc] to-[#00f0ff] hover:from-[#cdaaff] hover:to-[#26f5ff] text-[#0d0922] font-black text-sm sm:text-base tracking-wider uppercase border-2 border-white shadow-[0_12px_35px_rgba(0,0,0,0.7),0_0_30px_rgba(190,149,255,0.6)] cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                <Play className="h-4 w-4 fill-[#0d0922]" />
                <span>ENTER QUANTUM KITCHEN NOW</span>
              </button>
            </Link>

            <button
              onClick={() => setHowToPlayOpen(true)}
              className="px-6 py-3.5 rounded-full bg-[#181d3d]/80 hover:bg-[#202752] text-slate-300 hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase border border-white/30 cursor-pointer transition-all flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4 text-[#00f0ff]" />
              <span>Chef Field Manual</span>
            </button>
          </div>
        </section>
      </main>

      {/* Clean Space Footer */}
      <footer className="border-t border-[#292254] bg-[#0c0e1e] py-8 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ChefHat className="h-4 w-4 text-[#00f0ff]" />
            <span className="font-extrabold text-white">QUANTUM KITCHEN</span>
            <span>•</span>
            <span>Non-Abelian Anyon Weaving Simulator</span>
          </div>

          <div className="flex items-center gap-5 font-semibold">
            <Link href="/play" className="hover:text-[#be95ff] transition-colors">
              Play Game
            </Link>
            <Link href="/admin" className="hover:text-[#00f0ff] transition-colors">
              Scientist Lab
            </Link>
            <Link href="/credits" className="hover:text-[#ee5396] transition-colors">
              Credits & Lineage
            </Link>
            <span className="text-slate-600">|</span>
            <span className="text-slate-500 font-mono">MIT Open Source</span>
          </div>
        </div>
      </footer>

      {/* Embedded How to Play Dialog */}
      <HowToPlayModal
        open={howToPlayOpen}
        onOpenChange={setHowToPlayOpen}
        triggerButton={false}
      />
    </div>
  );
}
