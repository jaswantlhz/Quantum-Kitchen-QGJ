'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { FusionResult, BraidCrossing, BlochCoordinates } from '@/lib/quantum/braidTypes';
import { Recipe } from '@/lib/game/recipes';
import { soundFx } from '@/lib/audio/synthAudio';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Sparkles, ArrowRight, RotateCcw, Flame, Award } from 'lucide-react';
import { INGREDIENTS } from '@/lib/game/ingredientSketches';
import { DishIcon, QCreditIcon } from '@/components/game/GameIcons';

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

import gsap from 'gsap';
import { animateNumberCounter } from '@/lib/animation/gsapUtils';

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
  const [displayScore, setDisplayScore] = React.useState(0);
  const plateRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !result) return;

    // GSAP score counter & plate spring pop
    const scoreObj = { val: 0 };
    animateNumberCounter(scoreObj, result.platedScore, setDisplayScore, 0.9);

    if (plateRef.current) {
      gsap.fromTo(
        plateRef.current,
        { scale: 0.6, rotation: -15, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.8)', delay: 0.1 }
      );
    }

    if (result.dishOutcome === 'perfect' || result.dishOutcome === 'good') {
      soundFx.playBell();
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#9d9be5', '#9547a9', '#423ea6', '#7b5d95', '#ffffff'],
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
      <DialogContent className="max-w-md border border-[#7b5d95]/50 bg-[#523e58]/95 text-[#f5f4ff] shadow-2xl rounded-2xl p-6 backdrop-blur-2xl">
        <DialogHeader className="text-center">
          {/* Ceramic Serving Plate Presentation */}
          <div ref={plateRef} className="relative mx-auto my-2 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#7b5d95]/60 bg-[#1c142c] shadow-md">
            {/* Fine Concentric Ceramic Rim */}
            <div className="absolute inset-1.5 rounded-full border border-[#9d9be5]/30" />
            <DishIcon name={recipe.dishIcon || recipe.name} className="w-11 h-11" />

            {/* Sketched Ingredient Garnish Strip */}
            <div className="absolute -bottom-2 flex items-center justify-center -space-x-1 bg-[#1c142c] px-2.5 py-0.5 rounded-full border border-[#7b5d95]/60 shadow-sm">
              {recipe.ingredients.map((ingKey) => {
                const item = INGREDIENTS[ingKey];
                if (!item) return null;
                return (
                  <span
                    key={ingKey}
                    title={item.label}
                    className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#0a0712] p-0.5"
                    dangerouslySetInnerHTML={{ __html: item.sketchSvg }}
                  />
                );
              })}
            </div>

            {/* Grade Badge Ribbon */}
            <div className="absolute -top-1 -right-2 rounded-full border border-[#9547a9] bg-[#9547a9] px-2.5 py-0.5 text-[11px] font-black text-white shadow-xs font-label">
              {result.grade}
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-2">
            <span className="font-label text-xs px-2.5 py-0.5 rounded bg-[#423ea6]/30 text-[#9d9be5] border border-[#7b5d95]/40 font-semibold">
              {result.compositeMeal || recipe.mealCategory || 'Entrée'}
            </span>
            <span className="font-label text-xs px-2.5 py-0.5 rounded bg-[#9547a9]/30 text-[#9d9be5] border border-[#9547a9]/40 font-semibold flex items-center gap-1">
              <Flame className="h-3 w-3 text-[#9547a9]" />
              <span>{result.umamiMultiplier}x Umami</span>
            </span>
          </div>

          <DialogTitle className="text-2xl font-bold tracking-tight text-[#f5f4ff] font-headline mt-1.5">
            {result.dishName || recipe.name}
          </DialogTitle>
          <DialogDescription className="text-xs text-[#9d9be5]/80 font-body">
            {result.dishDescription || recipe.description}
          </DialogDescription>
        </DialogHeader>

        {/* Plated Score & Specs */}
        <div className="space-y-3 rounded-xl border border-[#7b5d95]/40 bg-[#1c142c]/80 p-4 mt-2 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#7b5d95]/35 pb-2">
            <div className="flex items-center gap-1.5 text-xs text-[#9d9be5]/80 font-semibold font-label">
              <Award className="h-4 w-4 text-[#9d9be5]" />
              <span>Plated Score</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-label text-lg font-bold text-[#f5f4ff]">
                {displayScore} <span className="text-xs text-[#9d9be5]/70">PTS</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-[#523e58] border border-[#7b5d95]/50 font-label text-xs font-bold text-[#9d9be5]">
                Grade {result.grade}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg bg-[#0a0712] p-2.5 border border-[#7b5d95]/35">
              <span className="text-[#9d9be5]/70 block text-[10px] font-label uppercase">Braid Sequence</span>
              <span className="font-label font-bold text-[#9d9be5] text-xs truncate block">{braidWord || 'Identity (e)'}</span>
            </div>
            <div className="rounded-lg bg-[#0a0712] p-2.5 border border-[#7b5d95]/35">
              <span className="text-[#9d9be5]/70 block text-[10px] font-label uppercase">Credits Rewarded</span>
              <span className="font-label font-bold text-[#9d9be5] text-xs flex items-center gap-1">
                <span>+{earnedCredits}</span>
                <QCreditIcon className="w-3.5 h-3.5 text-[#9d9be5]" />
              </span>
            </div>
          </div>

          {/* Flavor breakdown */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-[#849495] uppercase tracking-wider block font-label">
              Plated Flavor Profile
            </span>
            <div className="grid grid-cols-4 gap-1.5 text-center font-label text-xs">
              <div className="rounded bg-[#16181b] border border-[#3b494b]/40 p-1.5">
                <span className="block text-[10px] text-[#00f0ff] font-semibold">Sweet</span>
                <span className="font-bold text-white">{result.flavorProfile.sweetness}%</span>
              </div>
              <div className="rounded bg-[#16181b] border border-[#3b494b]/40 p-1.5">
                <span className="block text-[10px] text-[#7df4ff] font-semibold">Sour</span>
                <span className="font-bold text-white">{result.flavorProfile.sourness}%</span>
              </div>
              <div className="rounded bg-[#16181b] border border-[#3b494b]/40 p-1.5">
                <span className="block text-[10px] text-[#d4bbff] font-semibold">Spicy</span>
                <span className="font-bold text-white">{result.flavorProfile.spiciness}%</span>
              </div>
              <div className="rounded bg-[#16181b] border border-[#3b494b]/40 p-1.5">
                <span className="block text-[10px] text-[#f0c119] font-semibold">Umami</span>
                <span className="font-bold text-white">{result.flavorProfile.umami}%</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[#3b494b]/40 bg-[#16181b] p-2 text-[11px] text-[#b9cacb] flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#00f0ff] shrink-0" />
            <span>Telemetry logged to <b>Scientist Portal (/admin)</b> for analysis.</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5 pt-3">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onRetry();
            }}
            className="flex-1 py-2.5 px-4 rounded-lg border border-[#3b494b] bg-[#282a2d] text-[#e2e2e6] hover:bg-[#333538] hover:text-white font-label text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Retry</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onNextRecipe();
            }}
            className="flex-1 py-2.5 px-4 rounded-lg bg-[#00f0ff] text-[#0c0e11] hover:bg-[#7df4ff] glow-cyan-btn font-label text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 shadow-md"
          >
            <span>Next Recipe</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
