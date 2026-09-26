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
      <DialogContent className="max-w-md border border-[#333333] bg-[#1c1c1c] shadow-lg">
        <DialogHeader className="text-center">
          {/* Ceramic Serving Plate Presentation */}
          <div className="relative mx-auto my-2 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#525252] bg-[#161616] shadow-sm">
            {/* Fine Concentric Ceramic Rim */}
            <div className="absolute inset-1.5 rounded-full border border-[#393939]" />
            <span className="text-4xl drop-shadow-sm">{recipe.dishIcon}</span>

            {/* Sketched Ingredient Garnish Strip */}
            <div className="absolute -bottom-2 flex items-center justify-center -space-x-1 bg-[#262626] px-2 py-0.5 rounded-full border border-[#393939] shadow-sm">
              {recipe.ingredients.map((ingKey) => {
                const item = INGREDIENTS[ingKey];
                if (!item) return null;
                return (
                  <span
                    key={ingKey}
                    title={item.label}
                    className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#161616] p-0.5"
                    dangerouslySetInnerHTML={{ __html: item.sketchSvg }}
                  />
                );
              })}
            </div>

            {/* Grade Badge Ribbon */}
            <div className="absolute -top-1 -right-2 rounded-full border border-[#f1c21b] bg-[#f1c21b] px-2 py-0.5 text-[10px] font-bold text-black">
              {result.grade}
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-1">
            <Badge variant="default" className="text-[10px] font-mono">
              {result.compositeMeal || recipe.mealCategory}
            </Badge>
            <Badge variant="secondary" className="text-[10px] font-mono flex items-center gap-1">
              <Flame className="h-3 w-3 text-[#ff832b]" />
              <span>{result.umamiMultiplier}x Umami</span>
            </Badge>
          </div>

          <DialogTitle className="text-2xl font-bold tracking-wide text-[#f4f4f4] mt-1">
            {result.dishName}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-300">
            {result.dishDescription}
          </DialogDescription>
        </DialogHeader>

        {/* Plated Score & Specs */}
        <div className="space-y-3 rounded-lg border border-[#393939] bg-[#262626] p-4">
          <div className="flex items-center justify-between border-b border-[#393939] pb-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
              <Award className="h-4 w-4 text-[#f1c21b]" />
              <span>Plated Score</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold text-[#f1c21b]">
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
            <div className="rounded-lg bg-[#161616] p-2 border border-[#333333]">
              <span className="text-slate-400 block text-[10px]">Braid Word</span>
              <span className="font-mono font-bold text-[#be95ff]">{braidWord}</span>
            </div>
            <div className="rounded-lg bg-[#161616] p-2 border border-[#333333]">
              <span className="text-slate-400 block text-[10px]">Credits Rewarded</span>
              <span className="font-mono font-bold text-[#f1c21b]">+🪙 {earnedCredits} CR</span>
            </div>
          </div>

          {/* Flavor breakdown */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Plated Flavor Harmony
            </span>
            <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-[11px]">
              <div className="rounded bg-[#161616] border border-[#333333] p-1.5">
                <span className="block text-[10px] text-[#ee5396]">Sweet</span>
                <span className="font-bold text-[#f4f4f4]">{result.flavorProfile.sweetness}%</span>
              </div>
              <div className="rounded bg-[#161616] border border-[#333333] p-1.5">
                <span className="block text-[10px] text-[#009d9a]">Sour</span>
                <span className="font-bold text-[#f4f4f4]">{result.flavorProfile.sourness}%</span>
              </div>
              <div className="rounded bg-[#161616] border border-[#333333] p-1.5">
                <span className="block text-[10px] text-[#da1e28]">Spicy</span>
                <span className="font-bold text-[#f4f4f4]">{result.flavorProfile.spiciness}%</span>
              </div>
              <div className="rounded bg-[#161616] border border-[#333333] p-1.5">
                <span className="block text-[10px] text-[#be95ff]">Umami</span>
                <span className="font-bold text-[#f4f4f4]">{result.flavorProfile.umami}%</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[#393939] bg-[#161616] p-2 text-[11px] text-[#c6c6c6] flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#8a3ffc] shrink-0" />
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
