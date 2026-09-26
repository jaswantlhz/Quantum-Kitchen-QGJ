'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { FusionResult, BraidCrossing, BlochCoordinates } from '@/lib/quantum/braidTypes';
import { Recipe } from '@/lib/game/recipes';
import { soundFx } from '@/lib/audio/synthAudio';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

interface DishModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: FusionResult | null;
  recipe: Recipe;
  braidWord: string;
  crossings: BraidCrossing[];
  stateVector: [number, number];
  blochAngles: BlochCoordinates;
  onNextRecipe: () => void;
  onRetry: () => void;
}

export function DishModal({
  open,
  onOpenChange,
  result,
  recipe,
  braidWord,
  crossings,
  stateVector,
  blochAngles,
  onNextRecipe,
  onRetry,
}: DishModalProps) {
  useEffect(() => {
    if (!open || !result) return;

    if (result.dishOutcome === 'perfect' || result.dishOutcome === 'good') {
      soundFx.playSuccessChime();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#ff007f', '#ffe600', '#06d6a0'],
      });
    } else {
      soundFx.playGlitchSound();
    }

    // Automatically log braid telemetry to MongoDB / API
    const logBraid = async () => {
      try {
        await fetch('/api/braids', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            recipeId: recipe.id,
            dishName: result.dishName,
            braidWord,
            crossings,
            stateVector,
            probabilities: {
              successEnergy: result.successEnergy,
              decoherenceGlitch: result.decoherenceGlitch,
            },
            blochAngles,
            flavorProfile: result.flavorProfile,
            notes: `Served in kitchen for recipe ${recipe.name}. Outcome: ${result.dishOutcome}.`,
            tags: [result.dishOutcome, recipe.name],
          }),
        });
      } catch (err) {
        console.warn('Auto-save to braid telemetry failed:', err);
      }
    };

    logBraid();
  }, [open, result, recipe, braidWord, crossings, stateVector, blochAngles]);

  if (!result) return null;

  const isSuccess = result.dishOutcome === 'perfect' || result.dishOutcome === 'good';
  const earnedCredits = isSuccess
    ? result.dishOutcome === 'perfect'
      ? recipe.rewardCredits
      : Math.round(recipe.rewardCredits * 0.6)
    : 10; // Consolation credits

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-cyan-500/50 bg-slate-950/95 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
        <DialogHeader className="text-center">
          <div className="mx-auto my-2 flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-500/40 bg-gradient-to-tr from-cyan-950 to-purple-950 shadow-[0_0_25px_rgba(6,182,212,0.5)]">
            <span className="text-4xl">
              {result.dishOutcome === 'perfect' ? '🧁' : result.dishOutcome === 'good' ? '🥤' : '💀'}
            </span>
          </div>

          <DialogTitle className="text-2xl font-black tracking-wide text-white">
            {result.dishName}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-300">
            {result.dishDescription}
          </DialogDescription>
        </DialogHeader>

        {/* Dish Specs & Quantum Results */}
        <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <span className="text-xs text-slate-400 font-semibold">Anyon Fusion Fidelity</span>
            <Badge
              variant={result.dishOutcome === 'perfect' ? 'default' : result.dishOutcome === 'good' ? 'magenta' : 'destructive'}
              className="font-mono text-xs"
            >
              {Math.round(result.successEnergy * 100)}% Coherence
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg bg-slate-950/60 p-2">
              <span className="text-slate-400 block text-[10px]">Braid Word</span>
              <span className="font-mono font-bold text-cyan-300">{braidWord}</span>
            </div>
            <div className="rounded-lg bg-slate-950/60 p-2">
              <span className="text-slate-400 block text-[10px]">Credits Earned</span>
              <span className="font-mono font-bold text-amber-400">+🪙 {earnedCredits}</span>
            </div>
          </div>

          {/* Flavor breakdown */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Synthesized Flavor Notes
            </span>
            <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-[11px]">
              <div className="rounded bg-pink-950/40 border border-pink-500/20 p-1.5">
                <span className="block text-[10px] text-pink-400">Sweet</span>
                <span className="font-bold text-pink-200">{result.flavorProfile.sweetness}%</span>
              </div>
              <div className="rounded bg-emerald-950/40 border border-emerald-500/20 p-1.5">
                <span className="block text-[10px] text-emerald-400">Sour</span>
                <span className="font-bold text-emerald-200">{result.flavorProfile.sourness}%</span>
              </div>
              <div className="rounded bg-amber-950/40 border border-amber-500/20 p-1.5">
                <span className="block text-[10px] text-amber-400">Spicy</span>
                <span className="font-bold text-amber-200">{result.flavorProfile.spiciness}%</span>
              </div>
              <div className="rounded bg-purple-950/40 border border-purple-500/20 p-1.5">
                <span className="block text-[10px] text-purple-400">Umami</span>
                <span className="font-bold text-purple-200">{result.flavorProfile.umami}%</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-cyan-500/20 bg-cyan-950/20 p-2 text-[11px] text-cyan-200 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            <span>Automatically archived to the <b>Scientist Admin Portal (/admin)</b> for research!</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              onRetry();
            }}
            className="flex-1"
          >
            <RotateCcw className="mr-1.5 h-4 w-4" /> Retry
          </Button>

          <Button
            variant="default"
            onClick={() => {
              onOpenChange(false);
              onNextRecipe();
            }}
            className="flex-1 font-bold"
          >
            Next Recipe <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
