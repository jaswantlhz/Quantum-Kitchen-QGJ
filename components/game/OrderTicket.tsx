'use client';

import React, { useState } from 'react';
import { Recipe } from '@/lib/game/recipes';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
    <Card className="border-pink-500/30 bg-slate-950/80 shadow-[0_0_30px_rgba(236,72,153,0.15)]">
      <CardHeader className="p-4 border-b border-slate-800/60 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{recipe.dishIcon}</span>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-base text-pink-300 font-extrabold tracking-wide">
                  {recipe.name}
                </CardTitle>
                {/* 'i' Info icon for Customer Story / Lore */}
                <InfoDialog
                  title={`${recipe.customer} — Order Notes`}
                  description={recipe.dialogue}
                  tooltip="Customer order dialogue"
                >
                  <div className="rounded-lg bg-pink-950/30 border border-pink-500/30 p-2.5 text-xs text-pink-200">
                    <p className="font-semibold text-pink-300 mb-1">Customer Profile:</p>
                    <p>{recipe.description}</p>
                  </div>
                </InfoDialog>
              </div>

              <span className="font-mono text-[10px] text-pink-400/80 uppercase">
                {recipe.orderCode} • {recipe.customer.split('(')[0].trim()}
              </span>
            </div>
          </div>

          <Badge variant="magenta" className="text-[11px] font-mono">
            +{recipe.rewardCredits} CR
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3 pt-3">
        {/* Flavor Profile Bars Header with 'i' Info Button */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <span>Flavor Targets</span>
              <InfoDialog
                title="Non-Abelian Flavor Guide"
                description="Quantum braid properties directly dictate culinary flavor profiles:"
                tooltip="Flavor Profile Guide"
              >
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded bg-pink-950/40 border border-pink-500/20">
                    <b className="text-pink-300">🍬 Sweetness (Phase Rotation):</b> Forward R-matrix phase rotations accumulate sweetness.
                  </div>
                  <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/20">
                    <b className="text-emerald-300">🍋 Sourness (Commutation Shifts):</b> Alternating basis operations (σ₁σ₂ vs σ₂σ₁) spike sourness.
                  </div>
                  <div className="p-2 rounded bg-amber-950/40 border border-amber-500/20">
                    <b className="text-amber-300">🌶️ Spiciness (Twist Frequency):</b> Repeated consecutive twists in the same lane add heat.
                  </div>
                  <div className="p-2 rounded bg-purple-950/40 border border-purple-500/20">
                    <b className="text-purple-300">🍄 Umami (Superposition Balance):</b> Equal superposition (|α| ≈ |β|) unlocks savory umami.
                  </div>
                </div>
              </InfoDialog>
            </div>
            <span className="text-pink-400 font-mono">Fidelity: {flavorProfile.coherence}%</span>
          </div>

          {/* Sweetness */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-pink-300">🍬 Sweet</span>
              <span className="font-mono text-slate-400">
                {flavorProfile.sweetness}% / <span className="text-pink-400 font-bold">{recipe.targetFlavor.sweetness}%</span>
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-pink-500 transition-all duration-300"
                style={{ width: `${flavorProfile.sweetness}%` }}
              />
            </div>
          </div>

          {/* Sourness */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-emerald-300">🍋 Sour</span>
              <span className="font-mono text-slate-400">
                {flavorProfile.sourness}% / <span className="text-emerald-400 font-bold">{recipe.targetFlavor.sourness}%</span>
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${flavorProfile.sourness}%` }}
              />
            </div>
          </div>

          {/* Spiciness */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-amber-300">🌶️ Spicy</span>
              <span className="font-mono text-slate-400">
                {flavorProfile.spiciness}% / <span className="text-amber-400 font-bold">{recipe.targetFlavor.spiciness}%</span>
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${flavorProfile.spiciness}%` }}
              />
            </div>
          </div>

          {/* Umami */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-purple-300">🍄 Umami</span>
              <span className="font-mono text-slate-400">
                {flavorProfile.umami}% / <span className="text-purple-400 font-bold">{recipe.targetFlavor.umami}%</span>
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 transition-all duration-300"
                style={{ width: `${flavorProfile.umami}%` }}
              />
            </div>
          </div>
        </div>

        {/* Collapsible Chef's Hint */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="flex items-center justify-between w-full rounded-lg border border-slate-800 bg-slate-900/60 px-2.5 py-1.5 text-[11px] text-slate-300 hover:text-cyan-300 hover:border-slate-700 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5 font-semibold">
              <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
              Chef&apos;s Knot Hint
            </span>
            {showHint ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>

          {showHint && (
            <div className="mt-1.5 rounded-lg border border-cyan-500/20 bg-cyan-950/20 p-2 font-mono text-[11px] text-cyan-200 animate-in fade-in-50 duration-200">
              {recipe.hintBraid}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
