'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  Heart,
  Atom,
  Palette,
  Volume2,
  Code2,
  ExternalLink,
  BookOpen,
  ChefHat,
  ArrowLeft,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';
import { BloubBot } from '@/components/game/BloubBot';

export default function CreditsPage() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] dark:bg-[#121212] text-slate-900 dark:text-[#f4f4f4] flex flex-col selection:bg-[#8a3ffc] selection:text-white">
      {/* Top Global Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-[#333333] bg-white/80 dark:bg-[#161616]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-[#8a3ffc]/15 border border-[#8a3ffc]/40 flex items-center justify-center">
                <Atom className="h-5 w-5 text-[#8a3ffc]" />
              </div>
              <span className="font-bold tracking-tight text-sm sm:text-base text-slate-900 dark:text-white">
                QUANTUM KITCHEN
              </span>
            </Link>
            <Badge variant="outline" className="text-[10px] font-mono border-[#ee5396]/40 text-[#ee5396] hidden sm:inline-flex">
              <Heart className="h-3 w-3 mr-1 inline" /> Credits & Attributions
            </Badge>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/landing">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white cursor-pointer"
              >
                Landing
              </Button>
            </Link>

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

            <ThemeToggle />

            <Link href="/">
              <Button
                size="sm"
                className="h-8 px-3 bg-[#8a3ffc] hover:bg-[#6929c4] text-white font-bold text-xs shadow-sm cursor-pointer"
              >
                <ChefHat className="mr-1.5 h-3.5 w-3.5" />
                Return to Game
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        {/* Header Hero Banner */}
        <div className="rounded-2xl border border-slate-200 dark:border-[#333333] bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-[#161616] dark:via-[#121212] dark:to-[#0f0f0f] p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none hidden md:block">
            <Atom className="h-64 w-64 text-[#8a3ffc]" />
          </div>

          <div className="relative z-10 space-y-4 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="bg-[#ee5396] text-white text-[11px] font-mono">
                Project Attributions & Lineage
              </Badge>
              <span className="text-xs text-slate-500 font-mono">v2.4 Open Simulator</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Credits & Research Foundations
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <b>Quantum Kitchen: Cosmic Threads</b> bridges the rigorous mathematics of non-Abelian topological quantum computation with tactile culinary game mechanics. We gratefully acknowledge the scientists, designers, artists, and open-source engineers whose foundational work made this project possible.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/">
                <Button size="sm" className="h-9 px-4 bg-[#8a3ffc] hover:bg-[#6929c4] text-white font-bold text-xs cursor-pointer">
                  <ChefHat className="mr-1.5 h-4 w-4" />
                  Launch Kitchen Game
                </Button>
              </Link>
              <Link href="/landing">
                <Button variant="outline" size="sm" className="h-9 px-4 text-xs font-semibold border-slate-300 dark:border-[#525252] cursor-pointer">
                  <Layers className="mr-1.5 h-4 w-4 text-[#009d9a]" />
                  View Landing Overview
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Quantum Physics */}
          <div className="rounded-xl border border-slate-200 dark:border-[#333333] bg-white dark:bg-[#161616] p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 text-[#009d9a]">
              <div className="h-9 w-9 rounded-lg bg-[#009d9a]/15 border border-[#009d9a]/40 flex items-center justify-center">
                <Atom className="h-5 w-5 text-[#009d9a]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  1. Topological Quantum Physics
                </h2>
                <span className="text-[11px] font-mono text-[#009d9a]">Mathematical & Theoretical Foundations</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Based on the revolutionary discovery of topological fault tolerance and non-Abelian statistics in 2D space-time:
            </p>

            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <li className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#222222] border border-slate-200 dark:border-[#333333]">
                <b>Alexei Kitaev (1997)</b> — Fault-tolerant quantum computation by anyons.
              </li>
              <li className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#222222] border border-slate-200 dark:border-[#333333]">
                <b>Michael Freedman, Chetan Nayak, Frank Wilczek</b> — Non-Abelian Anyons and Topological Quantum Computation (Rev. Mod. Phys. 80, 1083).
              </li>
              <li className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#222222] border border-slate-200 dark:border-[#333333]">
                <b>Emil Artin (1925)</b> — Theory of Braids and the Braid Group (B_N).
              </li>
            </ul>
          </div>

          {/* 2. Design System */}
          <div className="rounded-xl border border-slate-200 dark:border-[#333333] bg-white dark:bg-[#161616] p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 text-[#8a3ffc]">
              <div className="h-9 w-9 rounded-lg bg-[#8a3ffc]/15 border border-[#8a3ffc]/40 flex items-center justify-center">
                <Palette className="h-5 w-5 text-[#8a3ffc]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  2. Design System & Aesthetics
                </h2>
                <span className="text-[11px] font-mono text-[#8a3ffc]">IBM Qiskit & IBM Carbon Design</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The user interface and visual language follow the strict aesthetic standards of IBM Quantum:
            </p>

            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <li className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#222222] border border-slate-200 dark:border-[#333333]">
                <b>IBM Qiskit Palette</b> — Scientific Purple (#8a3ffc / #be95ff), Teal (#009d9a), Gold (#f1c21b), and Magenta (#ee5396).
              </li>
              <li className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#222222] border border-slate-200 dark:border-[#333333]">
                <b>Carbon Design System</b> — Neutral dark lab backgrounds (#121212, #161616), crisp 1px structural borders, and high-contrast accessibility.
              </li>
              <li className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#222222] border border-slate-200 dark:border-[#333333]">
                <b>IBM Plex Sans & Mono</b> — Precision technical typography for mathematical clarity.
              </li>
            </ul>
          </div>

          {/* 3. Mascot & Art */}
          <div className="rounded-xl border border-slate-200 dark:border-[#333333] bg-white dark:bg-[#161616] p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 text-[#f1c21b]">
              <div className="h-9 w-9 rounded-lg bg-[#f1c21b]/15 border border-[#f1c21b]/40 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-[#f1c21b]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  3. Mascot & Interactive Art
                </h2>
                <span className="text-[11px] font-mono text-[#f1c21b]">Bloub Sous-Chef Vector Series</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-[#222222] border border-slate-200 dark:border-[#333333]">
              <BloubBot expression="excite" size={90} />
              <div className="text-xs space-y-1">
                <div className="font-bold text-slate-900 dark:text-white">Bloub Companion Engine</div>
                <p className="text-slate-500 dark:text-slate-400">
                  8-expression animated vector mascot with real-time 3D cursor perspective tracking and 1-step lookahead quantum optimization advice.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ingredient dispensers feature pure procedural Canvas vector sketches, rendering carrots, potatoes, radishes, peppers, bread, and tomatoes with zero external image dependencies.
            </p>
          </div>

          {/* 4. Audio & Open Source */}
          <div className="rounded-xl border border-slate-200 dark:border-[#333333] bg-white dark:bg-[#161616] p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 text-[#ee5396]">
              <div className="h-9 w-9 rounded-lg bg-[#ee5396]/15 border border-[#ee5396]/40 flex items-center justify-center">
                <Volume2 className="h-5 w-5 text-[#ee5396]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  4. Audio & Procedural Synthesis
                </h2>
                <span className="text-[11px] font-mono text-[#ee5396]">Web Audio API Procedural Engine</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              100% synthesized in real time in the browser with zero audio file assets:
            </p>

            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <li className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#222222] border border-slate-200 dark:border-[#333333]">
                <b>Braid Weave Tones</b> — Sine & triangle oscillator ramps dynamically pitched by lane index.
              </li>
              <li className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#222222] border border-slate-200 dark:border-[#333333]">
                <b>Fusion Resonance</b> — Harmonic chord sweeps (C-major / E / G / C) upon successful recipe completion.
              </li>
              <li className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#222222] border border-slate-200 dark:border-[#333333]">
                <b>Open Source Stack</b> — Next.js 15, React 19, TypeScript 5, Tailwind CSS, Lucide Icons, MongoDB / Mongoose.
              </li>
            </ul>
          </div>
        </div>

        {/* MIT License & Open Declaration */}
        <div className="rounded-xl border border-slate-200 dark:border-[#333333] bg-white dark:bg-[#161616] p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#333333] pb-3">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
              <Code2 className="h-4 w-4 text-[#8a3ffc]" />
              <span>Open Source MIT License</span>
            </div>
            <Badge variant="outline" className="font-mono text-[10px] text-[#24a148] border-[#24a148]/40">
              Open & Free for Education
            </Badge>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Quantum Kitchen is published as open-source software under the permissive MIT License. You are free to adapt, extend, teach, and build upon this code for non-commercial and commercial research or interactive educational software.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <Link href="/">
              <Button size="sm" className="h-9 px-4 bg-[#8a3ffc] hover:bg-[#6929c4] text-white font-bold text-xs cursor-pointer">
                <ChefHat className="mr-1.5 h-4 w-4" />
                Back to Kitchen
              </Button>
            </Link>
            <Link href="/landing">
              <Button variant="ghost" size="sm" className="h-9 text-xs text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white cursor-pointer">
                ← Back to Landing Page
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-200 dark:border-[#333333] bg-white dark:bg-[#161616] py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>⚛️ <b>Quantum Kitchen</b></span>
            <span>•</span>
            <span>Attributions & Lineage</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/landing" className="hover:text-black dark:hover:text-white transition-colors">
              Landing
            </Link>
            <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
              Play Game
            </Link>
            <Link href="/admin" className="hover:text-black dark:hover:text-white transition-colors">
              Scientist Lab
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
