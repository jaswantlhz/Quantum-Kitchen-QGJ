'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { soundFx } from '@/lib/audio/synthAudio';
import { Flame, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';

interface MixingBowlProps {
  successEnergy: number; // 0 to 1
  glitchRate: number;    // 0 to 1
  stabilizerLevel: number;
  onCook: () => void;
  isCooking: boolean;
  hasCrossings: boolean;
}

export function MixingBowl({
  successEnergy,
  glitchRate,
  stabilizerLevel,
  onCook,
  isCooking,
  hasCrossings,
}: MixingBowlProps) {
  const successPct = Math.round(successEnergy * 100);
  const glitchPct = Math.round(glitchRate * 100);

  const handleFuseClick = () => {
    soundFx.playFusionShimmer();
    onCook();
  };

  return (
    <Card className="relative overflow-hidden border-cyan-500/30 bg-slate-950/90 shadow-[0_0_40px_rgba(6,182,212,0.15)]">
      {/* Animated glowing mesh gradient background (FeralUI inspired) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400 via-purple-600 to-transparent animate-pulse" />

      <CardContent className="p-5 flex flex-col items-center gap-4 relative z-10">
        {/* Mixing Bowl Visual */}
        <div className="relative flex flex-col items-center">
          {/* Top funnel rim */}
          <div className="h-2 w-48 rounded-full bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]" />

          {/* Plasma Bowl Container */}
          <div className="relative mt-1 flex h-28 w-44 items-center justify-center rounded-b-[4rem] border-2 border-cyan-500/40 bg-gradient-to-b from-slate-900 to-slate-950 shadow-[0_10px_30px_rgba(6,182,212,0.3)] overflow-hidden">
            {/* Plasma Liquid Layer */}
            <div
              className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-cyan-600 via-pink-600 to-purple-500 transition-all duration-500 ${
                isCooking ? 'h-full animate-bounce opacity-90' : 'h-3/4 opacity-75'
              }`}
            >
              {/* Swirling bubbles / sparks */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.4)_0%,_transparent_60%)] animate-ping" />
            </div>

            {/* Glowing Center Core */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="text-2xl animate-spin duration-1000">
                {isCooking ? '🌀' : '🔮'}
              </span>
              <span className="font-mono text-[10px] uppercase font-bold text-white tracking-widest mt-1 drop-shadow-md">
                {isCooking ? 'Fusing Anyons...' : 'Anyon Fusion Core'}
              </span>
            </div>
          </div>
        </div>

        {/* Quantum Probabilities Meter */}
        <div className="w-full space-y-2 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-bold text-cyan-400">
              <Sparkles className="h-3.5 w-3.5" /> Super-Particle Fusion P(τ)
            </span>
            <span className="font-mono font-extrabold text-cyan-300">{successPct}%</span>
          </div>
          <Progress value={successPct} indicatorClassName="bg-gradient-to-r from-cyan-500 to-emerald-400" />

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="flex items-center gap-1.5 font-bold text-rose-400">
              <AlertTriangle className="h-3.5 w-3.5" /> Decoherence / Identity P(1)
            </span>
            <span className="font-mono font-extrabold text-rose-400">{glitchPct}%</span>
          </div>
          <Progress value={glitchPct} indicatorClassName="bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]" />

          {stabilizerLevel > 0 && (
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 pt-1">
              <ShieldCheck className="h-3 w-3" />
              <span>Cryo-Stabilizer Active: +{stabilizerLevel * 10}% odds locked!</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Button
          size="lg"
          variant="cyber"
          onClick={handleFuseClick}
          disabled={!hasCrossings || isCooking}
          className="w-full shadow-[0_0_25px_rgba(236,72,153,0.5)] font-extrabold text-sm tracking-wide"
        >
          <Flame className="mr-2 h-4 w-4" />
          {isCooking ? 'Simulating Anyon Fusion...' : 'Fuse & Cook Dish'}
        </Button>
      </CardContent>
    </Card>
  );
}
