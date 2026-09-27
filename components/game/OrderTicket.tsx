'use client';

import React from 'react';
import { Recipe } from '@/lib/game/recipes';
import { Target, Sparkles } from 'lucide-react';

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
    <div className="bg-[#1a1c1f] border border-[#3b494b] rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-md">
      {/* Sub-surface corner glow */}
      <div className="absolute -top-12 -left-12 w-36 h-36 bg-[#00f0ff]/10 rounded-full blur-2xl pointer-events-none" />

      <div>
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-[#3b494b]/60 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-label text-[11px] text-[#849495] uppercase tracking-widest">Active Order</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
          </div>
          <span className="font-label text-xs px-2.5 py-0.5 rounded bg-[#ffd556]/15 text-[#f0c119] border border-[#f0c119]/30 font-bold">
            +{recipe.rewardCredits} Q-Credits
          </span>
        </div>

        {/* Dish Core Title */}
        <div className="flex items-center justify-between mt-1 mb-3.5">
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl drop-shadow-sm">{recipe.dishIcon}</span>
            <div>
              <h2 className="font-headline text-lg sm:text-xl font-bold text-[#e2e2e6] tracking-tight">
                {recipe.name}
              </h2>
              <p className="font-label text-xs text-[#849495] mt-0.5 flex items-center gap-1.5">
                <span className="text-[#00f0ff] font-medium">{recipe.mealCategory || 'Entrée'}</span>
                <span>•</span>
                <span>{recipe.strandCount} Strands</span>
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="font-label text-xs font-semibold px-2.5 py-1 rounded bg-[#282a2d] border border-[#3b494b] text-[#dbfcff]">
              Target Goal
            </span>
          </div>
        </div>

        {/* Target Flavor Progress Matrix */}
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          {/* Sweet Track */}
          <div className="bg-[#1e2023] border border-[#3b494b]/50 rounded-lg p-2.5">
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-label text-[11px] text-[#b9cacb]">Sweet</span>
              <span className="font-label text-[11px] text-[#00f0ff] font-bold">
                {flavorProfile.sweetness}% <span className="text-[9px] text-[#849495]">/{recipe.targetFlavor.sweetness}%</span>
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#282a2d] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00f0ff] rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, flavorProfile.sweetness)}%` }}
              />
            </div>
          </div>

          {/* Savory / Spicy Track */}
          <div className="bg-[#1e2023] border border-[#3b494b]/50 rounded-lg p-2.5">
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-label text-[11px] text-[#b9cacb]">Savory</span>
              <span className="font-label text-[11px] text-[#d4bbff] font-bold">
                {flavorProfile.spiciness}% <span className="text-[9px] text-[#849495]">/{recipe.targetFlavor.spiciness}%</span>
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#282a2d] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#d4bbff] rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, flavorProfile.spiciness)}%` }}
              />
            </div>
          </div>

          {/* Umami Track */}
          <div className="bg-[#1e2023] border border-[#3b494b]/50 rounded-lg p-2.5">
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-label text-[11px] text-[#b9cacb]">Umami</span>
              <span className="font-label text-[11px] text-[#f0c119] font-bold">
                {flavorProfile.umami}% <span className="text-[9px] text-[#849495]">/{recipe.targetFlavor.umami}%</span>
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#282a2d] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#f0c119] rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, flavorProfile.umami)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Clean Objective Footer */}
      <div className="flex items-center justify-between pt-2.5 mt-3 border-t border-[#3b494b]/40 font-label text-[11px] text-[#849495]">
        <div className="flex items-center gap-1.5">
          <Target className="h-3.5 w-3.5 text-[#00f0ff]" />
          <span>Match target flavor bars to maximize payout</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-[#f0c119]" />
          <span className="text-[#e2e2e6] font-medium">Earn +{recipe.rewardCredits} Credits</span>
        </div>
      </div>
    </div>
  );
}
