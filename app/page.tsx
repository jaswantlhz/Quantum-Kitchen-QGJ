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
  Trophy,
  Swords,
  Play,
  Compass,
  Radio,
  Gamepad2,
  Crown,
} from 'lucide-react';
import { BloubBot } from '@/components/game/BloubBot';
import { HowToPlayModal } from '@/components/game/HowToPlayModal';
import { COSMIC_RECIPES } from '@/lib/game/recipes';
import { soundFx } from '@/lib/audio/synthAudio';

export default function GameLandingPage() {
  const [demoStep, setDemoStep] = useState(0);

  // Interactive Arcade Loom Simulation
  const DEMO_CROSSINGS = [
    { label: 'σ₁ (Strand 1 Over 2)', phase: '+1.04 rad', sweet: '45%', umami: '1.2x', desc: 'R-Matrix phase shift boosts Sweetness' },
    { label: 'σ₂ (Strand 2 Over 3)', phase: '+2.18 rad', sweet: '68%', umami: '1.5x', desc: 'F-Matrix golden-ratio basis transformation' },
    { label: 'Mixer Merge ⚡', phase: '+3.14 rad', sweet: '92%', umami: '3.14x', desc: 'Non-Abelian fusion locks composite dish state' },
  ];

  const currentDemo = DEMO_CROSSINGS[demoStep % DEMO_CROSSINGS.length];

  const handleSimulateCrossing = () => {
    soundFx.playPluck((demoStep % 2) + 1, true);
    setDemoStep((s) => s + 1);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f4f4f4] flex flex-col selection:bg-[#8a3ffc] selection:text-white relative overflow-hidden font-sans">
      {/* Background Cyberpunk Ambient Glows & Grid */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#8a3ffc]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#00f0ff]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-[#ff007f]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Top Gaming Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#222233] bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Server Status */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#8a3ffc] via-[#be95ff] to-[#00f0ff] p-[1px] shadow-[0_0_20px_rgba(138,63,252,0.4)] group-hover:scale-105 transition-transform">
                <div className="h-full w-full bg-[#0e0e17] rounded-[11px] flex items-center justify-center">
                  <ChefHat className="h-5 w-5 text-[#be95ff]" />
                </div>
              </div>
              <div>
                <span className="font-extrabold tracking-wider text-base sm:text-lg bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  QUANTUM KITCHEN
                </span>
                <span className="text-[10px] font-mono block text-[#00f0ff] tracking-widest uppercase">
                  COSMIC THREADS
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1.5 ml-4 px-2.5 py-1 rounded-full bg-[#161626] border border-[#2e2e48] text-[10px] font-mono text-[#24a148]">
              <span className="h-2 w-2 rounded-full bg-[#24a148] animate-pulse" />
              <span>MAINNET: B_N ONLINE</span>
            </div>
          </div>

          {/* Navigation Links & Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <HowToPlayModal />

            <Link href="/admin" className="hidden sm:inline-block">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 gap-1.5 text-xs text-slate-300 hover:text-white hover:bg-[#1a1a2e] border border-transparent hover:border-[#33334d] cursor-pointer"
              >
                <Activity className="h-3.5 w-3.5 text-[#00f0ff]" />
                <span>Scientist Lab</span>
              </Button>
            </Link>

            <Link href="/credits">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 gap-1.5 text-xs text-slate-300 hover:text-white hover:bg-[#1a1a2e] border border-transparent hover:border-[#33334d] cursor-pointer"
              >
                <Heart className="h-3.5 w-3.5 text-[#ee5396]" />
                <span className="hidden md:inline">Credits</span>
              </Button>
            </Link>

            <ThemeToggle />

            {/* Glowing Big Play Button */}
            <Link href="/play">
              <Button
                size="sm"
                className="h-9 px-4 bg-gradient-to-r from-[#8a3ffc] to-[#00f0ff] hover:from-[#7b2bfb] hover:to-[#00d8e6] text-white font-extrabold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(138,63,252,0.5)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] cursor-pointer transition-all hover:scale-105 active:scale-95"
              >
                <Play className="mr-1.5 h-3.5 w-3.5 fill-white" />
                Play Game
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section: Game Title, Animated Mascot & Interactive Loom Arcade */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-14 space-y-20">
        <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Epic Game Premise & High-Energy CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Game Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#8a3ffc]/50 bg-[#8a3ffc]/15 px-4 py-1.5 text-xs font-bold text-[#be95ff] shadow-[0_0_15px_rgba(138,63,252,0.2)]">
              <Sparkles className="h-4 w-4 text-[#f1c21b] animate-bounce" />
              <span className="tracking-wide">✦ TOPOLOGICAL QUANTUM CULINARY SIMULATOR ✦</span>
            </div>

            {/* Giant Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] uppercase">
              WEAVE THE REALM. <br />
              <span className="bg-gradient-to-r from-[#8a3ffc] via-[#be95ff] to-[#00f0ff] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(138,63,252,0.5)]">
                PLATE THE COSMOS.
              </span>
            </h1>

            {/* Lore Hook */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Step inside an interstellar kitchen where ingredients are <b>Fibonacci Anyons (τ)</b>. Braid spacetime world-lines, execute fault-tolerant unitary gates, and plate legendary 3-star dishes before decoherence collapses your kitchen into cosmic ash!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/play">
                <Button
                  size="lg"
                  className="h-13 px-8 bg-gradient-to-r from-[#8a3ffc] via-[#be95ff] to-[#00f0ff] hover:opacity-95 text-white font-black text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(138,63,252,0.6)] cursor-pointer hover:scale-105 active:scale-95 transition-all group"
                >
                  <Gamepad2 className="mr-2.5 h-5 w-5" />
                  <span>START COOKING (PLAY FREE)</span>
                  <ArrowRight className="ml-2.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link href="/admin">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-13 px-6 border-[#33334d] bg-[#12121e] hover:bg-[#1a1a2e] text-slate-200 text-xs font-bold tracking-wide uppercase hover:border-[#00f0ff]/50 cursor-pointer transition-all"
                >
                  <Activity className="mr-2 h-4 w-4 text-[#00f0ff]" />
                  <span>Scientist Portal</span>
                </Button>
              </Link>
            </div>

            {/* Live Telemetry Spec Stats HUD */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#222233]">
              <div className="p-3 rounded-xl bg-[#12121e]/80 border border-[#222233]">
                <div className="text-[10px] uppercase font-mono text-slate-400">Fault Tolerance</div>
                <div className="text-base font-extrabold text-[#00f0ff] mt-0.5">100% Topological</div>
              </div>
              <div className="p-3 rounded-xl bg-[#12121e]/80 border border-[#222233]">
                <div className="text-[10px] uppercase font-mono text-slate-400">Hilbert Depth</div>
                <div className="text-base font-extrabold text-[#be95ff] mt-0.5">B_N Infinite</div>
              </div>
              <div className="p-3 rounded-xl bg-[#12121e]/80 border border-[#222233]">
                <div className="text-[10px] uppercase font-mono text-slate-400">Max Multiplier</div>
                <div className="text-base font-extrabold text-[#f1c21b] mt-0.5">3.14x (Pi) Umami</div>
              </div>
              <div className="p-3 rounded-xl bg-[#12121e]/80 border border-[#222233]">
                <div className="text-[10px] uppercase font-mono text-slate-400">Fusion Rule</div>
                <div className="text-base font-extrabold text-[#24a148] mt-0.5">τ ⊗ τ = 1 ⊕ τ</div>
              </div>
            </div>
          </div>

          {/* Right Column: Cyberpunk Interactive Mini-Loom & Bloub Mascot */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full max-w-md rounded-2xl border border-[#33334d] bg-gradient-to-b from-[#141422] to-[#0c0c14] p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative space-y-5">
              {/* Neon Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#8a3ffc]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00f0ff]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00f0ff]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#8a3ffc]" />

              {/* Header with Bloub Mascot */}
              <div className="flex items-center justify-between pb-4 border-b border-[#222233]">
                <div className="flex items-center gap-3">
                  <BloubBot expression={demoStep % 2 === 0 ? 'attentif' : 'excite'} size={56} />
                  <div>
                    <div className="text-sm font-extrabold text-white flex items-center gap-1.5">
                      <span>Bloub Sous-Chef</span>
                      <Crown className="h-3.5 w-3.5 text-[#f1c21b]" />
                    </div>
                    <div className="text-[11px] font-mono text-[#00f0ff]">AI Lookahead Simulator</div>
                  </div>
                </div>
                <Badge variant="outline" className="font-mono text-xs text-[#be95ff] border-[#8a3ffc]/50 bg-[#8a3ffc]/10">
                  Crossing #{demoStep + 1}
                </Badge>
              </div>

              {/* Simulated Arcade Braid Rail Display */}
              <div className="rounded-xl bg-[#08080e] border border-[#222233] p-4 text-center space-y-3">
                <div className="text-xs font-mono font-bold text-[#00f0ff] uppercase tracking-wider">
                  {currentDemo.label}
                </div>

                {/* Animated Strand Rails */}
                <div className="h-16 flex items-center justify-around px-4 relative bg-[#0e0e18] rounded-lg border border-[#1e1e30] overflow-hidden">
                  <div className="h-1 w-full bg-[#1e1e32] rounded absolute" />
                  <div className="relative z-10 h-9 w-9 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#009d9a] border-2 border-white flex items-center justify-center text-xs font-bold text-black shadow-[0_0_15px_rgba(0,240,255,0.6)]">
                    τ₁
                  </div>
                  <div className="relative z-10 h-9 w-9 rounded-full bg-gradient-to-br from-[#be95ff] to-[#8a3ffc] border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-[0_0_15px_rgba(138,63,252,0.6)]">
                    τ₂
                  </div>
                  <div className="relative z-10 h-9 w-9 rounded-full bg-gradient-to-br from-[#f1c21b] to-[#d2a106] border-2 border-white flex items-center justify-center text-xs font-bold text-black shadow-[0_0_15px_rgba(241,194,27,0.6)]">
                    τ₃
                  </div>
                </div>

                <p className="text-xs text-slate-400">
                  {currentDemo.desc}
                </p>
              </div>

              {/* Quantum Flavor Meters */}
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-2.5 rounded-lg bg-[#10101c] border border-[#222233]">
                  <div className="text-[10px] text-slate-400 font-mono">Phase Rotation</div>
                  <div className="font-extrabold text-[#00f0ff] text-sm mt-0.5">{currentDemo.phase}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#10101c] border border-[#222233]">
                  <div className="text-[10px] text-slate-400 font-mono">Sweetness</div>
                  <div className="font-extrabold text-[#be95ff] text-sm mt-0.5">{currentDemo.sweet}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#10101c] border border-[#222233]">
                  <div className="text-[10px] text-slate-400 font-mono">Umami Boost</div>
                  <div className="font-extrabold text-[#f1c21b] text-sm mt-0.5">{currentDemo.umami}</div>
                </div>
              </div>

              {/* Interactive Braid Audio Trigger Button */}
              <Button
                size="lg"
                onClick={handleSimulateCrossing}
                className="w-full bg-[#18182a] hover:bg-[#22223a] text-white border border-[#33334d] hover:border-[#8a3ffc] text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md transition-all active:scale-95"
              >
                <Zap className="mr-2 h-4 w-4 text-[#f1c21b] animate-pulse" />
                Test Weave Audio & Gate (Step {demoStep + 1})
              </Button>
            </div>
          </div>
        </section>

        {/* Section 2: Quantum Kitchen Armory (Appliances as Weapons) */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <Badge variant="outline" className="font-mono text-xs text-[#00f0ff] border-[#00f0ff]/40 bg-[#00f0ff]/5">
              QUANTUM APPLIANCE ARSENAL
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              Harness Topological Cooking Weapons
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Equip quantum culinary stations to mutate particle waveforms during braid crossings:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Appliance 1 */}
            <div className="rounded-2xl border border-[#26263d] bg-gradient-to-b from-[#141424] to-[#0c0c16] p-6 space-y-3 relative overflow-hidden group hover:border-[#8a3ffc] transition-all">
              <div className="h-12 w-12 rounded-xl bg-[#8a3ffc]/20 border border-[#8a3ffc]/50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🔪
              </div>
              <h3 className="font-extrabold text-lg text-white">Chop Blade</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Applies high-frequency phase acceleration, driving up <b>Sweetness</b> and rotating quantum amplitude angles.
              </p>
              <div className="text-[11px] font-mono text-[#be95ff] font-bold">
                Phase Multiplier: 1.5x
              </div>
            </div>

            {/* Appliance 2 */}
            <div className="rounded-2xl border border-[#26263d] bg-gradient-to-b from-[#141424] to-[#0c0c16] p-6 space-y-3 relative overflow-hidden group hover:border-[#00f0ff] transition-all">
              <div className="h-12 w-12 rounded-xl bg-[#00f0ff]/20 border border-[#00f0ff]/50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🌪️
              </div>
              <h3 className="font-extrabold text-lg text-white">Superposition Blender</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Forces states through the <b>Fibonacci F-Matrix</b> basis transform using the golden ratio τ ≈ 0.618.
              </p>
              <div className="text-[11px] font-mono text-[#00f0ff] font-bold">
                Golden Ratio Mixing: 1.4x
              </div>
            </div>

            {/* Appliance 3 */}
            <div className="rounded-2xl border border-[#26263d] bg-gradient-to-b from-[#141424] to-[#0c0c16] p-6 space-y-3 relative overflow-hidden group hover:border-[#f1c21b] transition-all">
              <div className="h-12 w-12 rounded-xl bg-[#f1c21b]/20 border border-[#f1c21b]/50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🍳
              </div>
              <h3 className="font-extrabold text-lg text-white">Sear Plasma Pan</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Induces controlled thermal excitation, multiplying <b>Spiciness</b> and creating high-energy flavor peaks.
              </p>
              <div className="text-[11px] font-mono text-[#f1c21b] font-bold">
                Heat Entropy: 1.6x
              </div>
            </div>

            {/* Appliance 4 */}
            <div className="rounded-2xl border border-[#26263d] bg-gradient-to-b from-[#141424] to-[#0c0c16] p-6 space-y-3 relative overflow-hidden group hover:border-[#ee5396] transition-all">
              <div className="h-12 w-12 rounded-xl bg-[#ee5396]/20 border border-[#ee5396]/50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🍲
              </div>
              <h3 className="font-extrabold text-lg text-white">Entanglement Pot</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Simmers balanced state superposition (|α| ≈ |β|), unleashing compounding <b>Umami Multipliers</b>.
              </p>
              <div className="text-[11px] font-mono text-[#ee5396] font-bold">
                Max Multiplier: 3.14x (Pi)
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Recipe Bounty Showcase */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <Badge variant="outline" className="font-mono text-xs text-[#f1c21b] border-[#f1c21b]/40 bg-[#f1c21b]/5">
              COSMIC TICKET QUESTS
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              Featured Cosmic Bounties
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              From beginner 2-strand braids to 5-strand topological masterpieces:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COSMIC_RECIPES.slice(0, 3).map((recipe, idx) => (
              <div
                key={recipe.id}
                className="rounded-2xl border border-[#26263d] bg-gradient-to-b from-[#141424] to-[#0a0a14] p-6 space-y-4 shadow-lg hover:border-[#8a3ffc]/60 transition-all group"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#222233]">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl drop-shadow-md">{recipe.dishIcon}</span>
                    <div>
                      <h3 className="font-extrabold text-base text-white group-hover:text-[#be95ff] transition-colors">
                        {recipe.name}
                      </h3>
                      <span className="text-[10px] font-mono text-[#00f0ff]">{recipe.orderCode}</span>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-[#8a3ffc] text-white text-[10px] font-mono">
                    {recipe.strandCount} Strands
                  </Badge>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {recipe.description}
                </p>

                {/* Target Flavor Badges */}
                <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-mono">
                  <div className="p-1.5 rounded bg-[#161626] border border-[#222233]">
                    <span className="text-slate-400 block">Sweet</span>
                    <span className="font-bold text-[#be95ff]">{recipe.targetFlavor.sweetness}%</span>
                  </div>
                  <div className="p-1.5 rounded bg-[#161626] border border-[#222233]">
                    <span className="text-slate-400 block">Sour</span>
                    <span className="font-bold text-[#00f0ff]">{recipe.targetFlavor.sourness}%</span>
                  </div>
                  <div className="p-1.5 rounded bg-[#161626] border border-[#222233]">
                    <span className="text-slate-400 block">Spicy</span>
                    <span className="font-bold text-[#ff7eb6]">{recipe.targetFlavor.spiciness}%</span>
                  </div>
                  <div className="p-1.5 rounded bg-[#161626] border border-[#222233]">
                    <span className="text-slate-400 block">Umami</span>
                    <span className="font-bold text-[#f1c21b]">{recipe.targetFlavor.umami}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#222233] text-xs">
                  <span className="text-slate-400 font-mono">Reward Bounty:</span>
                  <span className="font-extrabold text-[#f1c21b] font-mono flex items-center gap-1">
                    🪙 {recipe.rewardCredits} CR
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Final High-Octane CTA Banner */}
        <section className="rounded-3xl border border-[#8a3ffc]/50 bg-gradient-to-r from-[#8a3ffc]/20 via-[#00f0ff]/15 to-[#8a3ffc]/20 p-8 sm:p-14 text-center space-y-6 relative overflow-hidden shadow-[0_0_60px_rgba(138,63,252,0.3)]">
          <div className="relative z-10 space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              Ready to Step Up to the Cosmic Loom?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Grab your tickets, spin up the non-Abelian anyons, and plate 3-star culinary perfection today.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link href="/play">
                <Button
                  size="lg"
                  className="h-14 px-10 bg-gradient-to-r from-[#8a3ffc] to-[#00f0ff] hover:opacity-95 text-white font-black text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(138,63,252,0.7)] cursor-pointer hover:scale-105 active:scale-95 transition-all"
                >
                  <Play className="mr-2 h-4 w-4 fill-white" />
                  PLAY QUANTUM KITCHEN NOW
                </Button>
              </Link>
              <Link href="/credits">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 border-[#33334d] bg-[#12121e] text-xs font-bold uppercase tracking-wider hover:bg-[#1a1a2e] cursor-pointer"
                >
                  <Heart className="mr-2 h-4 w-4 text-[#ee5396]" />
                  View Credits & Attributions
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Global Gaming Footer */}
      <footer className="border-t border-[#222233] bg-[#07070c] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">⚛️ Quantum Kitchen: Cosmic Threads</span>
            <span>•</span>
            <span className="text-[#00f0ff]">Non-Abelian Anyon Simulator</span>
          </div>

          <div className="flex items-center gap-5">
            <Link href="/play" className="hover:text-white transition-colors">
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
    </div>
  );
}
