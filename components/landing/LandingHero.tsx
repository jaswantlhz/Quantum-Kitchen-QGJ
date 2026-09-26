'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  Atom,
  ChefHat,
  Zap,
  ArrowRight,
  Flame,
  ShieldCheck,
  Bot,
  Activity,
  Layers,
} from 'lucide-react';
import { BloubBot } from '@/components/game/BloubBot';
import { CreditsModal } from '@/components/game/CreditsModal';

interface LandingHeroProps {
  onStartGame: () => void;
}

export function LandingHero({ onStartGame }: LandingHeroProps) {
  const [demoStep, setDemoStep] = useState(0);

  // Mini Interactive Loom Simulation
  const DEMO_CROSSINGS = [
    { label: 'σ₁ (Strand 1 Over 2)', phase: '+1.0 rad', sweet: '42%', umami: '1.2x', desc: 'R-Matrix phase shift boosts Sweetness' },
    { label: 'σ₂ (Strand 2 Over 3)', phase: '+2.1 rad', sweet: '65%', umami: '1.5x', desc: 'F-Matrix golden-ratio basis transformation' },
    { label: 'Mixer Merge ⚡', phase: '+3.14 rad', sweet: '88%', umami: '2.0x', desc: 'Non-Abelian fusion locks composite dish state' },
  ];

  const currentDemo = DEMO_CROSSINGS[demoStep % DEMO_CROSSINGS.length];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-[#333333] bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-[#161616] dark:via-[#121212] dark:to-[#0f0f0f] p-6 sm:p-10 shadow-xl mb-6 animate-in fade-in-50 duration-300">
      {/* Background Technical Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Top Banner Row */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-[#2b2b2b] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Badge variant="default" className="bg-[#8a3ffc] text-white text-[11px] font-mono px-2 py-0.5">
            <Atom className="mr-1 h-3 w-3 inline" />
            Topological Quantum Simulator
          </Badge>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono hidden sm:inline">
            Fibonacci Anyon Fusion: τ ⊗ τ = 1 ⊕ τ
          </span>
        </div>

        <div className="flex items-center gap-2">
          <CreditsModal />
          <Link href="/admin">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 border-slate-300 dark:border-[#525252] text-xs font-semibold hover:bg-slate-100 dark:hover:bg-[#262626] cursor-pointer"
            >
              <Activity className="h-3.5 w-3.5 text-[#009d9a]" />
              Scientist Portal
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Hero Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Vision & Actions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#009d9a]/30 bg-[#009d9a]/10 px-3 py-1 text-xs font-bold text-[#007d79] dark:text-[#009d9a]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Fast-Paced Quantum Culinary Simulator</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Braiding the Quantum Realm, <br />
            <span className="bg-gradient-to-r from-[#8a3ffc] via-[#be95ff] to-[#009d9a] bg-clip-text text-transparent">
              One Recipe at a Time.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
            Step inside a cosmic kitchen powered by non-Abelian Fibonacci anyons. Weave topological braid gates on a High-DPI loom, harness golden-ratio superposition, and plate 3-star culinary masterpieces!
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              size="lg"
              onClick={onStartGame}
              className="h-11 px-6 bg-[#8a3ffc] hover:bg-[#6929c4] text-white font-bold text-sm shadow-md transition-all cursor-pointer group"
            >
              <ChefHat className="mr-2 h-4 w-4" />
              <span>Enter Kitchen Loom</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Link href="/admin">
              <Button
                variant="outline"
                size="lg"
                className="h-11 px-5 border-slate-300 dark:border-[#525252] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#262626] font-semibold text-sm cursor-pointer"
              >
                <Layers className="mr-2 h-4 w-4 text-[#009d9a]" />
                Scientist Admin Sandbox
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Mini-Loom Teaser */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full rounded-xl border border-slate-200 dark:border-[#393939] bg-white dark:bg-[#1c1c1c] p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#2b2b2b] pb-2">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-[#009d9a] animate-pulse" />
                <span className="text-xs font-bold text-slate-800 dark:text-white font-mono">
                  LIVE QUANTUM PREVIEW
                </span>
              </div>
              <Badge variant="outline" className="text-[10px] font-mono border-slate-300 dark:border-[#525252]">
                Interactive Loom
              </Badge>
            </div>

            {/* Interactive Preview Display */}
            <div className="rounded-lg bg-slate-50 dark:bg-[#262626] p-3 space-y-2 border border-slate-200/60 dark:border-[#333333]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 dark:text-slate-400">Crossing Gate:</span>
                <span className="font-bold text-[#be95ff]">{currentDemo.label}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 dark:text-slate-400">Quantum Phase:</span>
                <span className="font-bold text-[#009d9a]">{currentDemo.phase}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 dark:text-slate-400">Flavor / Multiplier:</span>
                <span className="font-bold text-[#f1c21b]">{currentDemo.sweet} Sweet • {currentDemo.umami} Umami</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 italic pt-1 border-t border-slate-200/40 dark:border-[#393939]">
                💡 {currentDemo.desc}
              </p>
            </div>

            {/* Mini Loom Step Trigger Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDemoStep((s) => s + 1)}
                className="flex-1 h-8 text-xs font-bold border-slate-300 dark:border-[#525252] hover:bg-slate-100 dark:hover:bg-[#333333] cursor-pointer"
              >
                <Zap className="mr-1 h-3 w-3 text-[#f1c21b]" />
                Test Next Braid Gate
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights Row */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-200 dark:border-[#2b2b2b] text-xs">
        <div className="p-3 rounded-lg border border-slate-200 dark:border-[#333333] bg-white/80 dark:bg-[#1c1c1c]/80 backdrop-blur-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-white mb-1">
            <Atom className="h-4 w-4 text-[#8a3ffc]" />
            <span>Fibonacci Anyon Physics</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-[11px]">
            Real unitary matrices and non-Abelian statistics governed by the golden ratio τ.
          </p>
        </div>

        <div className="p-3 rounded-lg border border-slate-200 dark:border-[#333333] bg-white/80 dark:bg-[#1c1c1c]/80 backdrop-blur-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-white mb-1">
            <Flame className="h-4 w-4 text-[#f1c21b]" />
            <span>Umami Multiplier Ladder</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-[11px]">
            Compound credit rewards from 1.2x up to 3.14x (π) through deep coherent braiding.
          </p>
        </div>

        <div className="p-3 rounded-lg border border-slate-200 dark:border-[#333333] bg-white/80 dark:bg-[#1c1c1c]/80 backdrop-blur-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-white mb-1">
            <Bot className="h-4 w-4 text-[#009d9a]" />
            <span>Bloub AI Sous-Chef</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-[11px]">
            Predictive 1-step lookahead hint engine with animated state-reactive expressions.
          </p>
        </div>

        <div className="p-3 rounded-lg border border-slate-200 dark:border-[#333333] bg-white/80 dark:bg-[#1c1c1c]/80 backdrop-blur-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-white mb-1">
            <ShieldCheck className="h-4 w-4 text-[#24a148]" />
            <span>Cryo-Stabilizer Pantry</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-[11px]">
            Protect complex high-strand braids against thermal noise and wave function collapse.
          </p>
        </div>
      </div>
    </div>
  );
}
