'use client';

import React from 'react';
import { soundFx } from '@/lib/audio/synthAudio';
import { Zap, Flame, Loader2 } from 'lucide-react';

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
  const stabilityPct = (98 + stabilizerLevel * 0.4).toFixed(1);

  const handleFuseClick = () => {
    soundFx.playFusionShimmer();
    onCook();
  };

  return (
    <div className="bg-[#1a1c1f] border border-[#3b494b] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden shadow-md">
      {/* Sub-surface violet emitter */}
      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#6c04de]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Reactor Radial Graphic & Readouts */}
      <div className="flex items-center gap-4 sm:gap-5 z-10">
        {/* Circular Holographic Energy Core */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center shrink-0">
          {/* Outer segmented spin ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[#00f0ff]/40 animate-spin-slow" />
          {/* Glow circle */}
          <div className="absolute inset-2 rounded-full border border-[#d4bbff]/40" />
          {/* Inner Glowing Plasma Reactor */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#282a2d] border border-[#00f0ff] flex flex-col items-center justify-center glow-cyan">
            {isCooking ? (
              <Loader2 className="h-6 w-6 text-[#00f0ff] animate-spin" />
            ) : (
              <Flame className="h-6 w-6 text-[#00f0ff] animate-pulse" />
            )}
          </div>
        </div>

        {/* Reactor Metric Readouts */}
        <div className="flex flex-col gap-1.5">
          <div>
            <div className="font-label text-[10px] sm:text-[11px] uppercase tracking-wider text-[#00f0ff]">
              Kitchen Reactor
            </div>
            <div className="font-headline text-base sm:text-lg text-[#dbfcff] font-bold tracking-tight">
              Cooking Chamber
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 pt-1">
            <div>
              <span className="font-label text-[10px] text-[#849495] block">Flavor Match</span>
              <span className="font-label text-sm sm:text-base font-bold text-[#00f0ff]">
                {successPct}%
              </span>
            </div>
            <div className="h-6 w-[1px] bg-[#3b494b]" />
            <div>
              <span className="font-label text-[10px] text-[#849495] block">Burn Risk</span>
              <span className="font-label text-sm sm:text-base font-bold text-[#d4bbff]">
                {glitchPct}%
              </span>
            </div>
            <div className="h-6 w-[1px] bg-[#3b494b]" />
            <div>
              <span className="font-label text-[10px] text-[#849495] block">Stability</span>
              <span className="font-label text-xs sm:text-sm text-[#f0c119] flex items-center gap-1 font-semibold mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f0c119] animate-pulse" /> {stabilityPct}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FUSE & SERVE Action Button */}
      <div className="flex flex-col items-center sm:items-end gap-1.5 z-10 w-full sm:w-auto shrink-0">
        <button
          onClick={handleFuseClick}
          disabled={!hasCrossings || isCooking}
          className={`w-full sm:w-auto font-label text-xs sm:text-sm font-bold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
            hasCrossings && !isCooking
              ? 'bg-[#00f0ff] text-[#0c0e11] glow-cyan-btn active:scale-95 shadow-md hover:bg-[#7df4ff]'
              : 'bg-[#282a2d] text-[#849495] border border-[#3b494b] cursor-not-allowed opacity-70'
          }`}
        >
          <Zap className="h-4 w-4 fill-current" />
          <span>{isCooking ? 'COOKING DISH...' : 'FUSE & SERVE'}</span>
        </button>
        <span className="font-label text-[10px] text-[#849495]">
          {hasCrossings ? 'Ready to serve dish!' : 'Weave at least 1 crossing to cook'}
        </span>
      </div>
    </div>
  );
}
