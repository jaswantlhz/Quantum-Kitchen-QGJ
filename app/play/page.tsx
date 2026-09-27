'use client';

import React, { useState, useCallback, useEffect } from 'react';
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
import { GhostCrossingHint } from '@/lib/quantum/bloubAdvisorEngine';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  Volume2,
  VolumeX,
  Atom,
  ChefHat,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
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
  const [howToPlayOpen, setHowToPlayOpen] = useState(false);

  // Trigger state update
  const [, setTick] = useState(0);
  const refreshState = useCallback(() => setTick((t) => t + 1), []);

  const activeRecipe = COSMIC_RECIPES[recipeIndex];

  // Derived stabilizer level
  const cryoUpgrade = upgrades.find((u) => u.id === 'cryo-stabilizer');
  const stabilizerLevel = cryoUpgrade ? cryoUpgrade.level : 0;

  // Start ambient soundtrack on initial user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      soundFx.startBGM();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  // Quantum calculations
  const { successEnergy, decoherenceGlitch } = engine.measureFinalState(stabilizerLevel * 0.12);
  const currentFlavors = engine.getFlavorProfile();

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFx.setMuted(nextMuted);
    if (!nextMuted) {
      soundFx.startBGM();
    }
  };

  const handleBuyUpgrade = (upgradeId: string) => {
    setUpgrades((prev) =>
      prev.map((u) => {
        if (u.id === upgradeId && credits >= u.cost && u.level < u.maxLevel) {
          setCredits((c) => c - u.cost);
          soundFx.playUpgrade();
          return { ...u, level: u.level + 1 };
        }
        return u;
      })
    );
  };

  const handleCookDish = () => {
    setIsCooking(true);
    setTimeout(() => {
      const result = engine.evaluateFusion(stabilizerLevel, activeRecipe.targetFlavor, activeRecipe);
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
    soundFx.playTicket();
    const nextIndex = (recipeIndex + 1) % COSMIC_RECIPES.length;
    setRecipeIndex(nextIndex);
    engine.reset(COSMIC_RECIPES[nextIndex].strandCount);
    refreshState();
  };

  const handlePrevRecipe = () => {
    soundFx.playTicket();
    const prevIndex = (recipeIndex - 1 + COSMIC_RECIPES.length) % COSMIC_RECIPES.length;
    setRecipeIndex(prevIndex);
    engine.reset(COSMIC_RECIPES[prevIndex].strandCount);
    refreshState();
  };

  const handleRetry = () => {
    engine.reset(activeRecipe.strandCount);
    refreshState();
  };

  return (
    <div className="min-h-screen bg-[#0a0712] text-[#f5f4ff] flex flex-col justify-between selection:bg-[#423ea6] selection:text-white transition-colors duration-200">
      {/* 1. TOP HUD NAVIGATION (Cyber Cockpit Bar) */}
      <header className="flex justify-between items-center w-full px-4 sm:px-8 py-2.5 border-b border-[#7b5d95]/35 sticky top-0 z-50 bg-[#523e58]/35 backdrop-blur-xl">
        {/* Brand Badge */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-[#523e58]/70 border border-[#9d9be5]/40 flex items-center justify-center text-[#9d9be5] shadow-[0_0_12px_rgba(157,155,229,0.3)] group-hover:scale-105 transition-transform">
            <ChefHat className="h-5 w-5 text-[#9d9be5]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-headline text-sm sm:text-base tracking-widest uppercase font-bold text-[#f5f4ff]">
              Quantum Kitchen
            </span>
            <span className="w-2 h-2 rounded-full bg-[#9d9be5] animate-pulse" />
          </div>
        </Link>

        {/* Center: Cyber Order Switcher Capsule (with Prev / Next navigation) */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-[#523e58]/60 border border-[#7b5d95]/50 px-2 sm:px-3 py-1 rounded-lg shadow-inner">
          <button
            onClick={handlePrevRecipe}
            className="w-6 h-6 rounded flex items-center justify-center text-[#9d9be5]/70 hover:text-white hover:bg-[#7b5d95]/40 transition-colors cursor-pointer active:scale-95"
            title="Previous Recipe Order"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2 px-1 sm:px-2">
            <span className="text-sm">{activeRecipe.dishIcon}</span>
            <span className="font-label text-xs sm:text-sm font-bold text-[#9d9be5] tracking-wider uppercase truncate max-w-[150px] sm:max-w-[240px]">
              {`Order ${recipeIndex + 1}/${COSMIC_RECIPES.length}: ${activeRecipe.name}`}
            </span>
            <span className="font-label text-[10px] text-[#9d9be5]/60 hidden md:inline">
              ({activeRecipe.strandCount} Strands)
            </span>
          </div>

          <button
            onClick={handleNextRecipe}
            className="w-6 h-6 rounded flex items-center justify-center text-[#9d9be5]/70 hover:text-white hover:bg-[#7b5d95]/40 transition-colors cursor-pointer active:scale-95"
            title="Next Recipe Order"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Trailing Actions Cluster */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Gold Coin Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#523e58]/70 border border-[#9547a9]/50 rounded-lg text-[#9d9be5] font-label text-xs font-bold shadow-xs">
            <span>🪙</span>
            <span className="tracking-wide text-white">{credits.toLocaleString()}</span>
            <span className="text-[11px] text-[#9d9be5]/90 font-medium">Q-Credits</span>
          </div>

          {/* Icon Actions */}
          <div className="flex items-center gap-1 border-l border-[#7b5d95]/40 pl-2">
            <button
              onClick={toggleSound}
              className="w-7 h-7 rounded flex items-center justify-center text-[#9d9be5]/80 hover:text-white hover:bg-[#7b5d95]/40 transition-all cursor-pointer active:scale-95"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-[#9d9be5]" />}
            </button>
            <button
              onClick={() => setHowToPlayOpen(true)}
              className="w-7 h-7 rounded flex items-center justify-center text-[#9d9be5]/80 hover:text-white hover:bg-[#7b5d95]/40 transition-all cursor-pointer active:scale-95"
              title="Kitchen Guide"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
            <ThemeToggle />
            <Link
              href="/admin"
              className="w-7 h-7 rounded flex items-center justify-center text-[#9d9be5]/80 hover:text-white hover:bg-[#7b5d95]/40 transition-all cursor-pointer active:scale-95"
              title="Synthesis Lab Portal"
            >
              <Atom className="h-4 w-4 text-[#9d9be5]" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. MAIN COCKPIT APP CONTAINER */}
      <main className="flex-1 flex flex-col px-3 sm:px-8 py-3.5 gap-3.5 max-w-[1600px] w-full mx-auto">
        {/* UPPER DECK: ORDER SUMMARY (5 Cols) & FUSION CHAMBER (7 Cols) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
          {/* LEFT: Order Ticket Card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <OrderTicket recipe={activeRecipe} flavorProfile={currentFlavors} />
          </div>

          {/* RIGHT: Fusion Chamber / Energy Crucible */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <MixingBowl
              successEnergy={successEnergy}
              glitchRate={decoherenceGlitch}
              stabilizerLevel={stabilizerLevel}
              onCook={handleCookDish}
              isCooking={isCooking}
              hasCrossings={engine.crossings.length > 0}
            />
          </div>
        </section>

        {/* MAIN STAGE: TACTILE BRAIDING LOOM CANVAS & WEAVE CONTROLS */}
        <section className="flex flex-col">
          <BraidCanvas
            recipe={activeRecipe}
            engine={engine}
            onStateUpdate={refreshState}
            stabilizerLevel={stabilizerLevel}
            isCooking={isCooking}
            ghostCrossing={ghostCrossing}
            onClearGhostCrossing={() => setGhostCrossing(null)}
          />
        </section>

        {/* BOTTOM SHELF: PANTRY STABILIZERS & UPGRADES */}
        <section>
          <StabilizerShop
            upgrades={upgrades}
            credits={credits}
            onBuyUpgrade={handleBuyUpgrade}
          />
        </section>
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

      {/* Embedded How to Play Guide */}
      <HowToPlayModal
        open={howToPlayOpen}
        onOpenChange={setHowToPlayOpen}
        triggerButton={false}
      />

      {/* Interactive Sous-Chef Companion */}
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

      {/* Sleek Minimal Game Footer */}
      <footer className="border-t border-[#333333] bg-[#121212]/95 px-4 py-2.5 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Quantum Kitchen • A Topological Cooking Game</span>
          <div className="flex items-center gap-3 font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-[#00f0ff] transition-colors">
              Scientist Lab
            </Link>
            <span>•</span>
            <Link href="/credits" className="hover:text-[#ee5396] transition-colors">
              Credits
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
