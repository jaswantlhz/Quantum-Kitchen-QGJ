'use client';

import React from 'react';
import { Recipe } from '@/lib/game/recipes';
import { Target, Sparkles } from 'lucide-react';
import { DishIcon } from '@/components/game/GameIcons';

interface OrderTicketProps {
  recipe: Recipe;
  flavorProfile: {
    sweetness: number;
    sourness: number;
    spiciness: number;
    umami: number;
    coherence: number;
  };
}

export function OrderTicket({ recipe, flavorProfile }: OrderTicketProps) {
  return (
    <div className="bg-[#523e58]/25 border border-[#7b5d95]/40 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-md backdrop-blur-md">
      {/* Sub-surface corner glow */}
      <div className="absolute -top-12 -left-12 w-36 h-36 bg-[#9547a9]/15 rounded-full blur-2xl pointer-events-none" />

      <div>
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-[#7b5d95]/35 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-label text-[11px] text-[#9d9be5] uppercase tracking-widest font-semibold">Active Order</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#9d9be5] animate-pulse" />
          </div>
          <span className="font-label text-xs px-2.5 py-0.5 rounded bg-[#9547a9]/20 text-[#9d9be5] border border-[#9547a9]/40 font-bold">
            +{recipe.rewardCredits} Q-Credits
          </span>
        </div>

        {/* Dish Core Title */}
        <div className="flex items-center justify-between mt-1 mb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#523e58]/70 border border-[#7b5d95]/50 flex items-center justify-center shrink-0 shadow-inner">
              <DishIcon name={recipe.dishIcon || recipe.name} className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-headline text-lg sm:text-xl font-bold text-[#f5f4ff] tracking-tight">
                {recipe.name}
              </h2>
              <p className="font-label text-xs text-[#9d9be5]/80 mt-0.5 flex items-center gap-1.5">
                <span className="text-[#9d9be5] font-medium">{recipe.mealCategory || 'Entrée'}</span>
                <span>•</span>
                <span>{recipe.strandCount} Strands</span>
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="font-label text-xs font-semibold px-2.5 py-1 rounded bg-[#523e58]/60 border border-[#7b5d95]/50 text-[#9d9be5]">
              Target Goal
            </span>
          </div>
        </div>

        {/* Target Flavor Progress Matrix */}
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          {/* Sweet Track */}
          <div className="bg-[#523e58]/40 border border-[#7b5d95]/35 rounded-lg p-2.5">
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-label text-[11px] text-[#9d9be5]/80">Sweet</span>
              <span className="font-label text-[11px] text-[#9d9be5] font-bold">
                {flavorProfile.sweetness}% <span className="text-[9px] text-[#7b5d95]">/{recipe.targetFlavor.sweetness}%</span>
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#1c142c] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#9d9be5] rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, flavorProfile.sweetness)}%` }}
              />
            </div>
          </div>

          {/* Savory / Spicy Track */}
          <div className="bg-[#523e58]/40 border border-[#7b5d95]/35 rounded-lg p-2.5">
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-label text-[11px] text-[#9d9be5]/80">Savory</span>
              <span className="font-label text-[11px] text-[#9547a9] font-bold">
                {flavorProfile.spiciness}% <span className="text-[9px] text-[#7b5d95]">/{recipe.targetFlavor.spiciness}%</span>
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#1c142c] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#9547a9] rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, flavorProfile.spiciness)}%` }}
              />
            </div>
          </div>

          {/* Umami Track */}
          <div className="bg-[#523e58]/40 border border-[#7b5d95]/35 rounded-lg p-2.5">
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-label text-[11px] text-[#9d9be5]/80">Umami</span>
              <span className="font-label text-[11px] text-[#423ea6] font-bold">
                {flavorProfile.umami}% <span className="text-[9px] text-[#7b5d95]">/{recipe.targetFlavor.umami}%</span>
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#1c142c] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#423ea6] to-[#9d9be5] rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, flavorProfile.umami)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Clean Objective Footer */}
      <div className="flex items-center justify-between pt-2.5 mt-3 border-t border-[#7b5d95]/35 font-label text-[11px] text-[#9d9be5]/75">
        <div className="flex items-center gap-1.5">
          <Target className="h-3.5 w-3.5 text-[#9d9be5]" />
          <span>Match target flavor bars to maximize payout</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-[#9547a9]" />
          <span className="text-[#f5f4ff] font-medium">Earn +{recipe.rewardCredits} Credits</span>
        </div>
      </div>
    </div>
  );
}
