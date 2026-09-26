'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { QuantumBraidEngine } from '@/lib/quantum/anyonEngine';
import { COSMIC_RECIPES } from '@/lib/game/recipes';
import { INITIAL_UPGRADES, KitchenUpgrade } from '@/lib/game/upgrades';
import { FusionResult } from '@/lib/quantum/braidTypes';
import { soundFx } from '@/lib/audio/synthAudio';
import { BraidCanvas } from '@/components/game/BraidCanvas';
import { OrderTicket } from '@/components/game/OrderTicket';
import { MixingBowl } from '@/components/game/MixingBowl';
import { StabilizerShop } from '@/components/game/StabilizerShop';
import { DishModal } from '@/components/game/DishModal';
import { HowToPlayModal } from '@/components/game/HowToPlayModal';
import { ChefCompanion } from '@/components/game/ChefCompanion';
import { CreditsModal } from '@/components/game/CreditsModal';
import { GhostCrossingHint } from '@/lib/quantum/bloubAdvisorEngine';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { InfoDialog } from '@/components/ui/info-dialog';
import {
  Volume2,
  VolumeX,
  Atom,
  ChefHat,
  Sparkles,
  Home,
} from 'lucide-react';

export default function QuantumKitchenPlayPage() {
  const [engine] = useState(() => new QuantumBraidEngine());
  const [recipeIndex, setRecipeIndex] = useState(0);
  const [credits, setCredits] = useState(250);
  const [upgrades, setUpgrades] = useState<KitchenUpgrade[]>(INITIAL_UPGRADES);
  const [isMuted, setIsMuted] = useState(false);
  const [isCooking, setIsCooking] = useState(false);
  const [fusionModalOpen, setFusionModalOpen] = useState(false);
  const [lastFusionResult, setLastFusionResult] = useState<FusionResult | null>(null);
  const [ghostCrossing, setGhostCrossing] = useState<GhostCrossingHint | null>(null);

  // Trigger state update
  const [, setTick] = useState(0);
  const refreshState = useCallback(() => setTick((t) => t + 1), []);

  const activeRecipe = COSMIC_RECIPES[recipeIndex];

  // Derived stabilizer level
  const cryoUpgrade = upgrades.find((u) => u.id === 'cryo-stabilizer');
  const stabilizerLevel = cryoUpgrade ? cryoUpgrade.level : 0;

  // Quantum calculations
  const { successEnergy, decoherenceGlitch } = engine.measureFinalState(stabilizerLevel * 0.12);
  const currentFlavors = engine.getFlavorProfile();

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFx.setMuted(nextMuted);
  };

  const handleBuyUpgrade = (upgradeId: string) => {
    setUpgrades((prev) =>
      prev.map((u) => {
        if (u.id === upgradeId && credits >= u.cost && u.level < u.maxLevel) {
          setCredits((c) => c - u.cost);
          return { ...u, level: u.level + 1 };
        }
        return u;
      })
    );
  };

  const handleCookDish = () => {
    setIsCooking(true);
    setTimeout(() => {
      const result = engine.evaluateFusion(stabilizerLevel, activeRecipe.targetFlavor);
      setLastFusionResult(result);
      setIsCooking(false);
      setFusionModalOpen(true);

      // Award credits on success with Umami multiplier
      if (result.dishOutcome === 'perfect') {
        setCredits((c) => c + Math.round(activeRecipe.rewardCredits * (result.umamiMultiplier || 1)));
      } else if (result.dishOutcome === 'good') {
        setCredits((c) => c + Math.round(activeRecipe.rewardCredits * 0.6));
      } else {
        setCredits((c) => c + 15);
      }
    }, 1200);
  };

  const handleNextRecipe = () => {
    const nextIndex = (recipeIndex + 1) % COSMIC_RECIPES.length;
    setRecipeIndex(nextIndex);
    engine.reset(COSMIC_RECIPES[nextIndex].strandCount);
    refreshState();
  };

  const handleRetry = () => {
    engine.reset(activeRecipe.strandCount);
    refreshState();
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-[#8a3ffc] selection:text-white transition-colors duration-200">
      {/* Top Qiskit Kitchen Nav */}
      <header className="border-b border-[#333333] bg-[#121212]/95 backdrop-blur-md px-4 py-3 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#393939] bg-[#1c1c1c] shadow-sm group-hover:border-[#8a3ffc] transition-colors">
                <ChefHat className="h-5 w-5 text-[#8a3ffc]" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-[#f4f4f4] flex items-center gap-1.5">
                  QUANTUM KITCHEN
                  <span className="text-[#8a3ffc]">
                    COSMIC THREADS
                  </span>
                </h1>
              </div>
            </Link>
            <Badge variant="default" className="text-[10px] font-mono tracking-wider hidden sm:inline-flex">
              COSMIC FLAVOR THREADS (ANYONS)
            </Badge>
            {/* Dedicated How to Play Modal */}
            <HowToPlayModal />
            {/* Project Credits Modal */}
            <CreditsModal />
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Direct Home / Landing Link */}
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs font-semibold gap-1 text-slate-300 hover:text-white cursor-pointer"
                title="Home Landing"
              >
                <Home className="h-3.5 w-3.5 text-[#009d9a]" />
                <span className="hidden md:inline">Intro</span>
              </Button>
            </Link>

            {/* Direct Credits Link */}
            <Link href="/credits">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs font-semibold gap-1 text-slate-300 hover:text-white cursor-pointer"
                title="View Attributions & Credits"
              >
                <span className="text-[#ee5396]">♥</span>
                <span className="hidden md:inline">Credits</span>
              </Button>
            </Link>

            {/* Credits Counter */}
            <div className="flex items-center gap-1.5 rounded-lg border border-[#393939] bg-[#262626] px-3 py-1.5 font-mono text-xs text-[#f1c21b] shadow-sm">
              <span>🪙</span>
              <span className="font-bold">{credits}</span>
              <span className="text-[10px] text-[#f1c21b]/80">CR</span>
            </div>

            {/* Theme Toggle (Light / Dark) */}
            <ThemeToggle />

            {/* Audio Toggle */}
            <Button
              size="sm"
              variant="outline"
              onClick={toggleSound}
              className="h-8 px-2.5 border-[#393939] text-slate-300 hover:text-white cursor-pointer"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-[#8a3ffc]" />}
            </Button>

            {/* Link to Scientist Admin Portal */}
            <Link href="/admin">
              <Button size="sm" variant="default" className="h-8 text-xs font-bold tracking-wide cursor-pointer">
                <Atom className="mr-1.5 h-3.5 w-3.5" /> Scientist Portal
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Game Stage */}
      <main className="mx-auto max-w-7xl w-full p-4 sm:p-6 lg:p-8 flex-1">
        {/* Recipe Selection Carousel Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none">
          <span className="text-xs uppercase font-mono font-bold text-slate-400 mr-2 shrink-0">
            Tickets on Rail:
          </span>
          {COSMIC_RECIPES.map((r, idx) => {
            const isActive = idx === recipeIndex;
            return (
              <button
                key={r.id}
                onClick={() => {
                  if (idx !== recipeIndex) {
                    setRecipeIndex(idx);
                    engine.reset(r.strandCount);
                    refreshState();
                  }
                }}
                className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'border border-[#8a3ffc] bg-[#8a3ffc]/20 text-[#be95ff]'
                    : 'border border-slate-200 dark:border-[#333333] bg-white dark:bg-[#1c1c1c] text-slate-700 dark:text-slate-400 hover:text-black dark:hover:text-[#f4f4f4] hover:bg-slate-100 dark:hover:bg-[#262626]'
                }`}
              >
                <span className="text-xl sm:text-2xl drop-shadow-xs">{r.dishIcon}</span>
                <span className="font-bold">{r.name}</span>
                <span className="font-mono text-[10px] text-slate-400">({r.orderCode})</span>
              </button>
            );
          })}
        </div>

        {/* Vertical Pipeline Layout */}
        <div className="space-y-6">
          {/* Stage 1: Active Order Rail (Horizontal) */}
          <OrderTicket recipe={activeRecipe} flavorProfile={currentFlavors} />

          {/* Stage 2: The Prep (Tactile Braid Loom - Centerpiece) */}
          <BraidCanvas
            recipe={activeRecipe}
            engine={engine}
            onStateUpdate={refreshState}
            stabilizerLevel={stabilizerLevel}
            ghostCrossing={ghostCrossing}
            onClearGhostCrossing={() => setGhostCrossing(null)}
          />

          {/* Stage 3: The Cook & The Pantry (Side-by-Side Bottom Deck) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Anyon Fusion Reactor Chamber */}
            <div className="lg:col-span-6 flex flex-col space-y-3">
              <MixingBowl
                successEnergy={successEnergy}
                glitchRate={decoherenceGlitch}
                stabilizerLevel={stabilizerLevel}
                onCook={handleCookDish}
                isCooking={isCooking}
                hasCrossings={engine.crossings.length > 0}
              />
            </div>

            {/* Quantum Pantry Upgrades */}
            <div className="lg:col-span-6 flex flex-col space-y-3">
              <StabilizerShop
                upgrades={upgrades}
                credits={credits}
                onBuyUpgrade={handleBuyUpgrade}
              />

              {/* Compact Physics Guide Trigger */}
              <div className="flex items-center justify-between rounded-lg border border-[#393939] bg-[#1c1c1c] p-3 shadow-sm">
                <span className="text-xs font-semibold text-[#f4f4f4] flex items-center gap-1.5">
                  ⚛️ Anyon Physics Note
                </span>
                <InfoDialog
                  title="Topological Anyon Physics"
                  description="Braids act as universal quantum gates on Fibonacci anyons (τ):"
                  tooltip="Anyon Physics Guide"
                >
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-[#262626] border border-[#393939]">
                      <b className="text-[#009d9a]">Lane 1 (R-Matrix):</b> Phase shift rotating quantum amplitude vector [α, β].
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#262626] border border-[#393939]">
                      <b className="text-[#be95ff]">Lane 2 (F-Matrix):</b> Basis transformation mixing states via golden ratio:
                      <div className="font-mono text-[#009d9a] text-[10px] mt-1">
                        τ = (√5 - 1) / 2 ≈ 0.618034
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#262626] border border-[#393939] text-[#24a148] font-mono text-[11px]">
                      Anyon Fusion: τ ⊗ τ = 1 ⊕ τ
                    </div>
                  </div>
                </InfoDialog>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Dish Serve Victory Modal */}
      <DishModal
        open={fusionModalOpen}
        onOpenChange={setFusionModalOpen}
        result={lastFusionResult}
        recipe={activeRecipe}
        braidWord={engine.getBraidWord()}
        crossings={engine.crossings}
        stateVector={engine.quantumState}
        blochAngles={engine.getBlochCoordinates()}
        onNextRecipe={handleNextRecipe}
        onRetry={handleRetry}
      />

      {/* Interactive Sous-Chef Companion with Smart Lookahead Suggestions */}
      <ChefCompanion
        recipe={activeRecipe}
        currentFlavors={currentFlavors}
        successEnergy={successEnergy}
        crossings={engine.crossings}
        decoherenceGlitch={decoherenceGlitch}
        isCooking={isCooking}
        lastFusionResult={lastFusionResult}
        stabilizerLevel={stabilizerLevel}
        credits={credits}
        onShowGhostMove={setGhostCrossing}
        activeGhostMove={ghostCrossing}
      />

      {/* Cyberpunk Footer */}
      <footer className="border-t border-slate-200 dark:border-[#333333] bg-white/80 dark:bg-[#121212]/95 backdrop-blur-md px-4 py-3 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Quantum Kitchen: Cosmic Threads • Fibonacci Anyon Simulator</span>
          <div className="flex items-center gap-3">
            <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
              Intro
            </Link>
            <span className="text-slate-400 dark:text-slate-700">•</span>
            <Link href="/admin" className="hover:text-[#009d9a] transition-colors">
              Scientist Portal
            </Link>
            <span className="text-slate-400 dark:text-slate-700">•</span>
            <Link href="/credits" className="hover:text-[#ee5396] transition-colors">
              Credits
            </Link>
            <span className="text-slate-400 dark:text-slate-700">•</span>
            <span>MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
