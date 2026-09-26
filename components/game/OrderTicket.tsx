'use client';

import React, { useState } from 'react';
import { Recipe } from '@/lib/game/recipes';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InfoDialog } from '@/components/ui/info-dialog';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [showHint, setShowHint] = useState(false);

  return (
    <Card className="border-[#333333] bg-[#1c1c1c] shadow-sm">
      <CardContent className="p-4 sm:p-5 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-5">
        {/* Left: Recipe Identity & Dialogue Lore */}
        <div className="flex items-center gap-3.5 min-w-[280px]">
          <span className="text-3xl sm:text-4xl drop-shadow-sm shrink-0">{recipe.dishIcon}</span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg text-[#f4f4f4] font-bold tracking-wide">
                {recipe.name}
              </h2>
              {/* 'i' Info icon for Customer Story / Lore */}
              <InfoDialog
                title={`${recipe.customer} — Order Notes`}
                description={recipe.dialogue}
                tooltip="Customer order dialogue"
              >
                <div className="rounded-lg bg-[#262626] border border-[#393939] p-2.5 text-xs text-[#c6c6c6]">
                  <p className="font-semibold text-[#f4f4f4] mb-1">Customer Profile:</p>
                  <p>{recipe.description}</p>
                </div>
              </InfoDialog>
              <Badge variant="magenta" className="text-[11px] font-mono">
                +{recipe.rewardCredits} CR
              </Badge>
            </div>

            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="font-mono text-xs text-slate-400 uppercase">
                {recipe.orderCode} • {recipe.customer.split('(')[0].trim()}
              </span>
              <Badge variant="secondary" className="text-[10px] py-0 px-2 font-mono">
                {recipe.strandCount} Strands ({recipe.mealCategory})
              </Badge>
            </div>
          </div>
        </div>

        {/* Center: 4 Flavor Target Meters */}
        <div className="flex-1 w-full max-w-2xl space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <span>Flavor Targets</span>
              <InfoDialog
                title="Non-Abelian Flavor Guide"
                description="Quantum braid properties directly dictate culinary flavor profiles:"
                tooltip="Flavor Profile Guide"
              >
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded bg-[#262626] border border-[#393939]">
                    <b className="text-[#ee5396]">🍬 Sweetness (Phase Rotation):</b> Forward R-matrix phase rotations accumulate sweetness.
                  </div>
                  <div className="p-2 rounded bg-[#262626] border border-[#393939]">
                    <b className="text-[#009d9a]">🍋 Sourness (Commutation Shifts):</b> Alternating basis operations (σ₁σ₂ vs σ₂σ₁) spike sourness.
                  </div>
                  <div className="p-2 rounded bg-[#262626] border border-[#393939]">
                    <b className="text-[#da1e28]">🌶️ Spiciness (Twist Frequency):</b> Repeated consecutive twists in the same lane add heat.
                  </div>
                  <div className="p-2 rounded bg-[#262626] border border-[#393939]">
                    <b className="text-[#be95ff]">🍄 Umami (Superposition Balance):</b> Equal superposition (|α| ≈ |β|) unlocks savory umami.
                  </div>
                </div>
              </InfoDialog>
            </div>
            <span className="text-[#be95ff] font-mono font-bold">Fidelity: {flavorProfile.coherence}%</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Sweetness */}
            <div className="space-y-1 rounded-lg bg-[#262626] p-2 border border-[#393939]">
              <div className="flex justify-between text-[11px]">
                <span className="text-[#ee5396]">🍬 Sweet</span>
                <span className="font-mono text-slate-400">
                  {flavorProfile.sweetness}% / <span className="text-[#ee5396] font-bold">{recipe.targetFlavor.sweetness}%</span>
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#121212] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#ee5396] transition-all duration-300"
                  style={{ width: `${flavorProfile.sweetness}%` }}
                />
              </div>
            </div>

            {/* Sourness */}
            <div className="space-y-1 rounded-lg bg-[#262626] p-2 border border-[#393939]">
              <div className="flex justify-between text-[11px]">
                <span className="text-[#009d9a]">🍋 Sour</span>
                <span className="font-mono text-slate-400">
                  {flavorProfile.sourness}% / <span className="text-[#009d9a] font-bold">{recipe.targetFlavor.sourness}%</span>
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#121212] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#009d9a] transition-all duration-300"
                  style={{ width: `${flavorProfile.sourness}%` }}
                />
              </div>
            </div>

            {/* Spiciness */}
            <div className="space-y-1 rounded-lg bg-[#262626] p-2 border border-[#393939]">
              <div className="flex justify-between text-[11px]">
                <span className="text-[#da1e28]">🌶️ Spicy</span>
                <span className="font-mono text-slate-400">
                  {flavorProfile.spiciness}% / <span className="text-[#da1e28] font-bold">{recipe.targetFlavor.spiciness}%</span>
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#121212] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#da1e28] transition-all duration-300"
                  style={{ width: `${flavorProfile.spiciness}%` }}
                />
              </div>
            </div>

            {/* Umami */}
            <div className="space-y-1 rounded-lg bg-[#262626] p-2 border border-[#393939]">
              <div className="flex justify-between text-[11px]">
                <span className="text-[#be95ff]">🍄 Umami</span>
                <span className="font-mono text-slate-400">
                  {flavorProfile.umami}% / <span className="text-[#be95ff] font-bold">{recipe.targetFlavor.umami}%</span>
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#121212] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#8a3ffc] transition-all duration-300"
                  style={{ width: `${flavorProfile.umami}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Collapsible Chef's Hint */}
        <div className="w-full xl:w-auto shrink-0 flex flex-col items-end">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="flex items-center justify-between gap-2 w-full xl:w-44 rounded-lg border border-[#393939] bg-[#262626] px-3 py-2 text-xs text-slate-300 hover:text-white hover:border-[#525252] transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5 font-semibold">
              <Lightbulb className="h-3.5 w-3.5 text-[#f1c21b]" />
              Chef&apos;s Hint
            </span>
            {showHint ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>

          {showHint && (
            <div className="mt-2 w-full xl:w-56 rounded-lg border border-[#525252] bg-[#121212] p-2.5 font-mono text-xs text-[#be95ff] shadow-sm animate-in fade-in-50 duration-200">
              {recipe.hintBraid}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
