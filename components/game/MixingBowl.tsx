'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
    <Card className="relative overflow-hidden border-cyan-500/30 bg-slate-950/90 shadow-[0_0_40px_rgba(6,182,212,0.15)] flex flex-col justify-between h-full">
      {/* Animated glowing mesh gradient background (FeralUI inspired) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400 via-purple-600 to-transparent animate-pulse" />

      <CardHeader className="p-3.5 border-b border-slate-800/60 pb-2.5 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-pink-400" />
            <CardTitle className="text-sm font-bold text-white">Anyon Fusion Reactor</CardTitle>
          </div>
          <Badge variant="outline" className="font-mono text-xs text-cyan-300 border-cyan-500/40">
            {successPct}% P(τ)
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-5 relative z-10 flex-1">
        {/* Mixing Bowl Visual */}
        <div className="relative flex flex-col items-center shrink-0">
          {/* Top funnel rim */}
          <div className="h-2 w-36 rounded-full bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]" />

          {/* Plasma Bowl Container */}
          <div className="relative mt-1 flex h-24 w-36 items-center justify-center rounded-b-[3.5rem] border-2 border-cyan-500/40 bg-gradient-to-b from-slate-900 to-slate-950 shadow-[0_10px_25px_rgba(6,182,212,0.3)] overflow-hidden">
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
              <span className="text-xl animate-spin duration-1000">
                {isCooking ? '🌀' : '🔮'}
              </span>
              <span className="font-mono text-[9px] uppercase font-bold text-white tracking-widest mt-0.5 drop-shadow-md">
                {isCooking ? 'Fusing...' : 'Anyon Core'}
              </span>
            </div>
          </div>
        </div>

        {/* Quantum Probabilities Meter & Action Button */}
        <div className="w-full flex-1 space-y-2.5">
          <div className="space-y-1.5 rounded-xl border border-slate-800/80 bg-slate-900/60 p-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-cyan-400">
                <Sparkles className="h-3.5 w-3.5" /> Super-Particle P(τ)
              </span>
              <span className="font-mono font-extrabold text-cyan-300">{successPct}%</span>
            </div>
            <Progress value={successPct} indicatorClassName="bg-gradient-to-r from-cyan-500 to-emerald-400" />

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="flex items-center gap-1.5 font-bold text-rose-400">
                <AlertTriangle className="h-3.5 w-3.5" /> Decoherence P(1)
              </span>
              <span className="font-mono font-extrabold text-rose-400">{glitchPct}%</span>
            </div>
            <Progress value={glitchPct} indicatorClassName="bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]" />

            {stabilizerLevel > 0 && (
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 pt-0.5">
                <ShieldCheck className="h-3 w-3" />
                <span>Cryo-Stabilizer: +{stabilizerLevel * 10}% odds locked!</span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <Button
            size="lg"
            variant="cyber"
            onClick={handleFuseClick}
            disabled={!hasCrossings || isCooking}
            className="w-full shadow-[0_0_25px_rgba(236,72,153,0.5)] font-extrabold text-sm tracking-wide h-10"
          >
            <Flame className="mr-2 h-4 w-4" />
            {isCooking ? 'Simulating Anyon Fusion...' : 'Fuse & Cook Dish'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
