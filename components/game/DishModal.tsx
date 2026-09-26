'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { FusionResult, BraidCrossing, BlochCoordinates } from '@/lib/quantum/braidTypes';
import { Recipe } from '@/lib/game/recipes';
import { soundFx } from '@/lib/audio/synthAudio';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, RotateCcw, Flame, Award } from 'lucide-react';
import { INGREDIENTS } from '@/lib/game/ingredientSketches';

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
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#ff6b35', '#2ec4b6', '#ffd166', '#ff0054', '#70e000'],
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
            strandCount: recipe.strandCount || 3,
            crossings,
            stateVector,
            probabilities: {
              successEnergy: result.successEnergy,
              decoherenceGlitch: result.decoherenceGlitch,
            },
            blochAngles,
            flavorProfile: result.flavorProfile,
            umamiMultiplier: result.umamiMultiplier,
            platedScore: result.platedScore,
            grade: result.grade,
            notes: `Served in kitchen for recipe ${recipe.name}. Grade: ${result.grade}. Score: ${result.platedScore}.`,
            tags: [result.dishOutcome, recipe.name, result.grade],
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
      ? Math.round(recipe.rewardCredits * (result.umamiMultiplier || 1))
      : Math.round(recipe.rewardCredits * 0.6)
    : 15;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-cyan-500/50 bg-slate-950/95 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
        <DialogHeader className="text-center">
          {/* Ceramic Serving Plate Presentation */}
          <div className="relative mx-auto my-2 flex h-24 w-24 items-center justify-center rounded-full border-4 border-slate-700/60 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-950 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
            {/* Glowing Plated Ring */}
            <div className="absolute inset-1 rounded-full border border-cyan-400/40 animate-pulse" />
            <span className="text-4xl drop-shadow-lg">{recipe.dishIcon}</span>

            {/* Sketched Ingredient Garnish Strip */}
            <div className="absolute -bottom-2 flex items-center justify-center -space-x-1 bg-slate-900/90 px-1.5 py-0.5 rounded-full border border-cyan-500/40 shadow-md">
              {recipe.ingredients.map((ingKey) => {
                const item = INGREDIENTS[ingKey];
                if (!item) return null;
                return (
                  <span
                    key={ingKey}
                    title={item.label}
                    className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-950/90 p-0.5"
                    dangerouslySetInnerHTML={{ __html: item.sketchSvg }}
                  />
                );
              })}
            </div>

            {/* Grade Badge Ribbon */}
            <div className="absolute -top-1 -right-2 rounded-full border border-amber-400 bg-amber-500 px-2 py-0.5 text-[10px] font-black text-black shadow-lg">
              {result.grade}
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-1">
            <Badge variant="outline" className="text-[10px] font-mono border-cyan-500/40 text-cyan-300">
              {result.compositeMeal || recipe.mealCategory}
            </Badge>
            <Badge variant="secondary" className="text-[10px] font-mono flex items-center gap-1">
              <Flame className="h-3 w-3 text-orange-400" />
              <span>{result.umamiMultiplier}x Umami</span>
            </Badge>
          </div>

          <DialogTitle className="text-2xl font-black tracking-wide text-white mt-1">
            {result.dishName}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-300">
            {result.dishDescription}
          </DialogDescription>
        </DialogHeader>

        {/* Plated Score & Specs */}
        <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
              <Award className="h-4 w-4 text-amber-400" />
              <span>Plated Score</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-extrabold text-amber-400">
                {result.platedScore} <span className="text-xs text-slate-400">PTS</span>
              </span>
              <Badge
                variant={result.grade === 'S+' ? 'default' : result.grade === 'A' ? 'emerald' : 'outline'}
                className="font-mono text-xs font-bold"
              >
                Grade {result.grade}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg bg-slate-950/60 p-2">
              <span className="text-slate-400 block text-[10px]">Braid Word</span>
              <span className="font-mono font-bold text-cyan-300">{braidWord}</span>
            </div>
            <div className="rounded-lg bg-slate-950/60 p-2">
              <span className="text-slate-400 block text-[10px]">Credits Rewarded</span>
              <span className="font-mono font-bold text-amber-400">+🪙 {earnedCredits} CR</span>
            </div>
          </div>

          {/* Flavor breakdown */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Plated Flavor Harmony
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
            <span>Telemetry logged to <b>Scientist Portal (/admin)</b> for research!</span>
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
