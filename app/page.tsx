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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Volume2,
  VolumeX,
  Atom,
  ChefHat,
} from 'lucide-react';

export default function QuantumKitchenPage() {
  const [engine] = useState(() => new QuantumBraidEngine());
  const [recipeIndex, setRecipeIndex] = useState(0);
  const [credits, setCredits] = useState(250);
  const [upgrades, setUpgrades] = useState<KitchenUpgrade[]>(INITIAL_UPGRADES);
  const [isMuted, setIsMuted] = useState(false);
  const [isCooking, setIsCooking] = useState(false);
  const [fusionModalOpen, setFusionModalOpen] = useState(false);
  const [lastFusionResult, setLastFusionResult] = useState<FusionResult | null>(null);

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
      const result = engine.evaluateFusion(stabilizerLevel);
      setLastFusionResult(result);
      setIsCooking(false);
      setFusionModalOpen(true);

      // Award credits on success
      if (result.dishOutcome === 'perfect') {
        setCredits((c) => c + activeRecipe.rewardCredits);
      } else if (result.dishOutcome === 'good') {
        setCredits((c) => c + Math.round(activeRecipe.rewardCredits * 0.6));
      } else {
        setCredits((c) => c + 15);
      }
    }, 1200);
  };

  const handleNextRecipe = () => {
    engine.reset();
    setRecipeIndex((i) => (i + 1) % COSMIC_RECIPES.length);
    refreshState();
  };

  const handleRetry = () => {
    engine.reset();
    refreshState();
  };

  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      {/* Top Cyberpunk Diner Nav */}
      <header className="border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-md px-4 py-3 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-pink-500 to-purple-600 p-0.5 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                <ChefHat className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                  QUANTUM KITCHEN
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400">
                    COSMIC THREADS
                  </span>
                </h1>
                <Badge variant="default" className="text-[9px] font-mono tracking-widest hidden sm:inline-flex">
                  FIBONACCI ANYONS
                </Badge>
              </div>
              <p className="text-[11px] text-slate-400">
                Weave topological braids down the pegboard to synthesize non-Abelian cosmic delicacies.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Credits Counter */}
            <div className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-950/30 px-3 py-1.5 font-mono text-xs text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
              <span>🪙</span>
              <span className="font-extrabold">{credits}</span>
              <span className="text-[10px] text-amber-400/80">CR</span>
            </div>

            {/* Audio Toggle */}
            <Button
              size="sm"
              variant="outline"
              onClick={toggleSound}
              className="h-8 px-2.5 border-slate-800 text-slate-300"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-cyan-400" />}
            </Button>

            {/* Link to Scientist Admin Portal */}
            <Link href="/admin">
              <Button size="sm" variant="default" className="h-8 text-xs font-bold tracking-wide">
                <Atom className="mr-1.5 h-3.5 w-3.5" /> Scientist Portal (/admin)
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
                    engine.reset();
                    refreshState();
                  }
                }}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'border border-cyan-400 bg-cyan-950/80 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'border border-slate-800/80 bg-slate-900/40 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <span>{r.dishIcon}</span>
                <span>{r.name}</span>
                <span className="font-mono text-[10px] text-slate-500">({r.orderCode})</span>
              </button>
            );
          })}
        </div>

        {/* 3-Column Cyberpunk Kitchen Counter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Column 1: Order Ticket & Customer Hologram */}
          <div className="lg:col-span-4 space-y-4">
            <OrderTicket recipe={activeRecipe} flavorProfile={currentFlavors} />

            {/* Stabilizer Shop */}
            <StabilizerShop
              upgrades={upgrades}
              credits={credits}
              onBuyUpgrade={handleBuyUpgrade}
            />
          </div>

          {/* Column 2: The Prep (Tactile Braid Pegboard Canvas) */}
          <div className="lg:col-span-5 space-y-4">
            <BraidCanvas
              recipe={activeRecipe}
              engine={engine}
              onStateUpdate={refreshState}
              stabilizerLevel={stabilizerLevel}
            />
          </div>

          {/* Column 3: The Cook (Anyon Fusion Bowl & Probabilities) */}
          <div className="lg:col-span-3 space-y-4">
            <MixingBowl
              successEnergy={successEnergy}
              glitchRate={decoherenceGlitch}
              stabilizerLevel={stabilizerLevel}
              onCook={handleCookDish}
              isCooking={isCooking}
              hasCrossings={engine.crossings.length > 0}
            />

            {/* Mini Theory Card */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 text-[11px] text-slate-400 space-y-2">
              <span className="font-bold text-cyan-300 block uppercase tracking-wider">
                Topological Physics Note
              </span>
              <p className="leading-relaxed">
                Braids act as quantum gates: Lane 1 applies phase rotation (<b>R-matrix</b>), while Lane 2 performs golden-ratio superposition (<b>F-matrix</b>).
              </p>
              <div className="font-mono text-cyan-400 text-[10px]">
                τ = (√5 - 1) / 2 ≈ 0.618034
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

      {/* Cyberpunk Footer */}
      <footer className="border-t border-slate-800/60 bg-slate-950/40 px-4 py-3 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Quantum Kitchen: Cosmic Threads • Fibonacci Anyon Simulator</span>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-cyan-400 transition-colors">
              Scientist Admin Dashboard
            </Link>
            <span className="text-slate-700">•</span>
            <span>Zero login required</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
