'use client';

import React from 'react';
import { Recipe } from '@/lib/game/recipes';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HelpCircle } from 'lucide-react';

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
    <Card className="border-pink-500/30 bg-slate-950/80 shadow-[0_0_30px_rgba(236,72,153,0.15)]">
      <CardHeader className="p-4 border-b border-slate-800/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{recipe.dishIcon}</span>
            <div>
              <CardTitle className="text-base text-pink-300 font-extrabold tracking-wide">
                {recipe.name}
              </CardTitle>
              <span className="font-mono text-[10px] text-pink-400/80 uppercase">
                {recipe.orderCode} • {recipe.customer}
              </span>
            </div>
          </div>
          <Badge variant="magenta" className="text-[11px] font-mono">
            +{recipe.rewardCredits} Credits
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        {/* Customer Dialogue Quote */}
        <div className="rounded-lg border border-pink-500/20 bg-pink-950/20 p-2.5 text-xs italic text-pink-200/90">
          {recipe.dialogue}
        </div>

        {/* Target Flavor Comparison */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Flavor Profile (Live vs Target)</span>
            <span className="text-pink-400">Coherence: {flavorProfile.coherence}%</span>
          </div>

          {/* Sweetness */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-pink-300">🍬 Sweetness (Phase)</span>
              <span className="font-mono text-slate-400">
                {flavorProfile.sweetness}% / <span className="text-pink-400">{recipe.targetFlavor.sweetness}%</span>
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-pink-500 transition-all duration-300 shadow-[0_0_8px_rgba(236,72,153,0.8)]"
                style={{ width: `${flavorProfile.sweetness}%` }}
              />
            </div>
          </div>

          {/* Sourness */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-emerald-300">🍋 Sourness (Commutation)</span>
              <span className="font-mono text-slate-400">
                {flavorProfile.sourness}% / <span className="text-emerald-400">{recipe.targetFlavor.sourness}%</span>
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                style={{ width: `${flavorProfile.sourness}%` }}
              />
            </div>
          </div>

          {/* Spiciness */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-amber-300">🌶️ Spiciness (Twist Frequency)</span>
              <span className="font-mono text-slate-400">
                {flavorProfile.spiciness}% / <span className="text-amber-400">{recipe.targetFlavor.spiciness}%</span>
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-300 shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                style={{ width: `${flavorProfile.spiciness}%` }}
              />
            </div>
          </div>

          {/* Umami */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-purple-300">🍄 Umami (Superposition)</span>
              <span className="font-mono text-slate-400">
                {flavorProfile.umami}% / <span className="text-purple-400">{recipe.targetFlavor.umami}%</span>
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 transition-all duration-300 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                style={{ width: `${flavorProfile.umami}%` }}
              />
            </div>
          </div>
        </div>

        {/* Hint Box */}
        <div className="flex items-start gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 p-2 text-[11px] text-slate-400">
          <HelpCircle className="h-3.5 w-3.5 text-cyan-400 mt-0.5 shrink-0" />
          <div>
            <span className="font-semibold text-cyan-300">Chef&apos;s Hint: </span>
            <span>{recipe.hintBraid}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
