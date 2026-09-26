'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ui/theme-toggle';
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
  Heart,
  BookOpen,
  GitCommit,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { BloubBot } from '@/components/game/BloubBot';
import { HowToPlayModal } from '@/components/game/HowToPlayModal';

export default function LandingPage() {
  const [demoStep, setDemoStep] = useState(0);

  // Interactive Mini Loom Simulation
  const DEMO_CROSSINGS = [
    { label: 'σ₁ (Strand 1 Over 2)', phase: '+1.0 rad', sweet: '42%', umami: '1.2x', desc: 'R-Matrix phase shift boosts Sweetness' },
    { label: 'σ₂ (Strand 2 Over 3)', phase: '+2.1 rad', sweet: '65%', umami: '1.5x', desc: 'F-Matrix golden-ratio basis transformation' },
    { label: 'Mixer Merge ⚡', phase: '+3.14 rad', sweet: '88%', umami: '2.0x', desc: 'Non-Abelian fusion locks composite dish state' },
  ];

  const currentDemo = DEMO_CROSSINGS[demoStep % DEMO_CROSSINGS.length];

  return (
    <div className="min-h-screen bg-[#f4f4f4] dark:bg-[#121212] text-slate-900 dark:text-[#f4f4f4] flex flex-col selection:bg-[#8a3ffc] selection:text-white">
      {/* Top Global Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-[#333333] bg-white/80 dark:bg-[#161616]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#8a3ffc]/15 border border-[#8a3ffc]/40 flex items-center justify-center">
              <Atom className="h-5 w-5 text-[#8a3ffc] animate-spin-slow" />
            </div>
            <span className="font-bold tracking-tight text-sm sm:text-base text-slate-900 dark:text-white">
              QUANTUM KITCHEN
            </span>
            <Badge variant="outline" className="text-[10px] font-mono border-[#8a3ffc]/40 text-[#8a3ffc] hidden sm:inline-flex">
              Fibonacci Anyons (τ)
            </Badge>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <HowToPlayModal />

            <Link href="/admin">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white cursor-pointer"
              >
                <Activity className="h-3.5 w-3.5 text-[#009d9a]" />
                <span className="hidden sm:inline">Scientist Portal</span>
              </Button>
            </Link>

            <Link href="/credits">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white cursor-pointer"
              >
                <Heart className="h-3.5 w-3.5 text-[#ee5396]" />
                <span className="hidden sm:inline">Credits</span>
              </Button>
            </Link>

            <ThemeToggle />

            <Link href="/">
              <Button
                size="sm"
                className="h-8 px-3 bg-[#8a3ffc] hover:bg-[#6929c4] text-white font-bold text-xs shadow-sm cursor-pointer"
              >
                <ChefHat className="mr-1.5 h-3.5 w-3.5" />
                Play Game
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Landing Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 space-y-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-[#333333] bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-[#161616] dark:via-[#121212] dark:to-[#0f0f0f] p-6 sm:p-12 shadow-2xl">
          {/* Background Technical Grid Accent */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Top Banner Tag */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-[#2b2b2b] pb-4 mb-8">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="bg-[#8a3ffc] text-white text-[11px] font-mono px-2 py-0.5">
                <Atom className="mr-1 h-3 w-3 inline" />
                Topological Quantum Simulator
              </Badge>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono hidden sm:inline">
                Universal Fusion Rule: τ ⊗ τ = 1 ⊕ τ
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/credits">
                <Badge variant="outline" className="text-xs font-mono text-[#ee5396] border-[#ee5396]/30 cursor-pointer hover:bg-[#ee5396]/10">
                  <Heart className="h-3 w-3 mr-1 inline" /> Credits & Attributions
                </Badge>
              </Link>
            </div>
          </div>

          {/* Hero Content Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Story & CTAs */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#009d9a]/30 bg-[#009d9a]/10 px-3.5 py-1 text-xs font-bold text-[#007d79] dark:text-[#009d9a]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Fast-Paced Quantum Culinary Simulator</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Braiding the Quantum Realm, <br />
                <span className="bg-gradient-to-r from-[#8a3ffc] via-[#be95ff] to-[#009d9a] bg-clip-text text-transparent">
                  One Recipe at a Time.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Step inside a cosmic kitchen where ingredients behave as non-Abelian Fibonacci anyons. Weave topological braid gates on a High-DPI loom, harness golden-ratio superposition, and plate 3-star culinary dishes before wave function collapse!
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/">
                  <Button
                    size="lg"
                    className="h-12 px-6 bg-[#8a3ffc] hover:bg-[#6929c4] text-white font-bold text-sm shadow-lg transition-all cursor-pointer group"
                  >
                    <ChefHat className="mr-2 h-5 w-5" />
                    <span>Launch Cosmic Kitchen</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <Link href="/admin">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 px-5 border-slate-300 dark:border-[#525252] text-xs font-semibold hover:bg-slate-100 dark:hover:bg-[#262626] cursor-pointer"
                  >
                    <Activity className="mr-2 h-4 w-4 text-[#009d9a]" />
                    <span>Scientist Lab</span>
                  </Button>
                </Link>
              </div>

              {/* Quick Spec Tags */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-[#2b2b2b] text-xs">
                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-400">Braid Group</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">B_N Artin Groups</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-400">Sound Synthesis</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">Web Audio API</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-400">Design System</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">IBM Qiskit Carbon</div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Mini Loom & Mascot */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full max-w-sm rounded-xl border border-slate-200 dark:border-[#393939] bg-white dark:bg-[#161616] p-5 shadow-xl space-y-4">
                {/* Header with Bloub Mascot */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#2b2b2b]">
                  <div className="flex items-center gap-2.5">
                    <BloubBot expression={demoStep % 2 === 0 ? 'attentif' : 'excite'} size={60} />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Bloub Sous-Chef</div>
                      <div className="text-[10px] font-mono text-[#009d9a]">Live Loom Simulator</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px] text-[#8a3ffc] border-[#8a3ffc]/30">
                    Step {demoStep + 1}
                  </Badge>
                </div>

                {/* Simulated Braid Rail Diagram */}
                <div className="rounded-lg bg-slate-100 dark:bg-[#0f0f0f] border border-slate-200 dark:border-[#2b2b2b] p-3 text-center space-y-2">
                  <div className="text-[11px] font-mono font-bold text-[#8a3ffc]">
                    {currentDemo.label}
                  </div>
                  <div className="h-12 flex items-center justify-around px-2 relative">
                    <div className="h-1.5 w-full bg-slate-300 dark:bg-slate-700 rounded absolute" />
                    <div className="relative z-10 h-7 w-7 rounded-full bg-[#009d9a] border-2 border-white dark:border-[#161616] flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                      τ₁
                    </div>
                    <div className="relative z-10 h-7 w-7 rounded-full bg-[#8a3ffc] border-2 border-white dark:border-[#161616] flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                      τ₂
                    </div>
                    <div className="relative z-10 h-7 w-7 rounded-full bg-[#f1c21b] border-2 border-white dark:border-[#161616] flex items-center justify-center text-[10px] font-bold text-slate-950 shadow-md">
                      τ₃
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {currentDemo.desc}
                  </p>
                </div>

                {/* Metrics Preview */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#2b2b2b]">
                    <div className="text-[10px] text-slate-400 font-mono">Phase φ</div>
                    <div className="font-bold text-[#009d9a] mt-0.5">{currentDemo.phase}</div>
                  </div>
                  <div className="p-2 rounded bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#2b2b2b]">
                    <div className="text-[10px] text-slate-400 font-mono">Sweetness</div>
                    <div className="font-bold text-[#8a3ffc] mt-0.5">{currentDemo.sweet}</div>
                  </div>
                  <div className="p-2 rounded bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#2b2b2b]">
                    <div className="text-[10px] text-slate-400 font-mono">Umami</div>
                    <div className="font-bold text-[#f1c21b] mt-0.5">{currentDemo.umami}</div>
                  </div>
                </div>

                {/* Interactive Braid Test Button */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setDemoStep((s) => s + 1)}
                  className="w-full text-xs font-bold border-slate-300 dark:border-[#525252] hover:bg-[#8a3ffc]/15 hover:text-[#8a3ffc] hover:border-[#8a3ffc] cursor-pointer"
                >
                  <Zap className="mr-1.5 h-3.5 w-3.5 text-[#f1c21b]" />
                  Simulate Next Crossing ({demoStep + 1})
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 3-Step Gameplay Loop Section */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              How the Quantum Kitchen Works
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Master the universal non-Abelian pipeline in 3 intuitive steps:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-slate-200 dark:border-[#333333] bg-white dark:bg-[#161616] p-6 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-lg bg-[#8a3ffc]/15 border border-[#8a3ffc]/40 flex items-center justify-center text-[#8a3ffc] font-bold text-sm font-mono">
                01
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[#8a3ffc]" /> Check the Ticket
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Review your cosmic customer&apos;s target flavor profile (Sweetness, Spiciness, Umami, Tartness). Each profile requires a distinct sequence of topological braid transformations.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-[#333333] bg-white dark:bg-[#161616] p-6 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-lg bg-[#009d9a]/15 border border-[#009d9a]/40 flex items-center justify-center text-[#009d9a] font-bold text-sm font-mono">
                02
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <GitCommit className="h-4 w-4 text-[#009d9a]" /> Weave on the Loom
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Execute Over (σᵢ) and Under (σᵢ⁻¹) crossings on the horizontal timeline. Select kitchen appliances (Chop Board, Blender, Sear Pan, Boil Pot) to shape the quantum wave function.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-[#333333] bg-white dark:bg-[#161616] p-6 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-lg bg-[#f1c21b]/15 border border-[#f1c21b]/40 flex items-center justify-center text-[#f1c21b] font-bold text-sm font-mono">
                03
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Flame className="h-4 w-4 text-[#f1c21b]" /> Anyon Fusion Plating
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Send your braided strands into the Anyon Fusion Reactor. Measure the non-Abelian outcome: plate a 3-star dish to earn cosmic credits, or collapse into vacuum ash!
              </p>
            </div>
          </div>
        </section>

        {/* Feature Grid Highlights */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Under the Hood: Quantum Rigor & Art
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-[#333333] bg-white dark:bg-[#161616] p-4 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-[#8a3ffc] font-bold text-xs">
                <Bot className="h-4 w-4" /> Bloub AI Sous-Chef
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                1-Step lookahead optimizer engine with animated SVG face and dynamic eye-tracking cursor physics.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-[#333333] bg-white dark:bg-[#161616] p-4 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-[#009d9a] font-bold text-xs">
                <Layers className="h-4 w-4" /> High-DPI Canvas
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Buffer scaling via window.devicePixelRatio ensures smooth, retina-sharp strand rendering.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-[#333333] bg-white dark:bg-[#161616] p-4 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-[#f1c21b] font-bold text-xs">
                <ShieldCheck className="h-4 w-4" /> Cryo-Pantry Upgrades
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Purchase Cryo-Stabilizers and noise filters to protect deep multi-strand braids from thermal jitter.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-[#333333] bg-white dark:bg-[#161616] p-4 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-[#ee5396] font-bold text-xs">
                <Flame className="h-4 w-4" /> Multiplier Ladder
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Scale credit rewards from 1.2x to 3.14x (Pi) through coherent non-Abelian braid length.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Call to Action Banner */}
        <section className="rounded-2xl border border-[#8a3ffc]/30 bg-gradient-to-r from-[#8a3ffc]/15 via-[#009d9a]/10 to-[#8a3ffc]/15 p-8 sm:p-12 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Ready to Cook in the Non-Abelian Kitchen?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            Choose your recipe ticket, spin up the quantum loom, and start weaving Fibonacci anyons.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link href="/">
              <Button
                size="lg"
                className="h-12 px-8 bg-[#8a3ffc] hover:bg-[#6929c4] text-white font-bold text-sm shadow-xl cursor-pointer"
              >
                <ChefHat className="mr-2 h-5 w-5" />
                Start Cooking Now
              </Button>
            </Link>
            <Link href="/credits">
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-6 border-slate-300 dark:border-[#525252] text-xs font-semibold hover:bg-white dark:hover:bg-[#262626] cursor-pointer"
              >
                <Heart className="mr-2 h-4 w-4 text-[#ee5396]" />
                View Full Credits
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-200 dark:border-[#333333] bg-white dark:bg-[#161616] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>⚛️ <b>Quantum Kitchen</b></span>
            <span>•</span>
            <span>Topological Fibonacci Anyon Simulator</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
              Play Game
            </Link>
            <Link href="/admin" className="hover:text-black dark:hover:text-white transition-colors">
              Scientist Lab
            </Link>
            <Link href="/credits" className="hover:text-black dark:hover:text-white transition-colors">
              Credits & Attributions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
