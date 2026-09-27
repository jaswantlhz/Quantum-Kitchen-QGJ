'use client';

import React from 'react';
import { soundFx } from '@/lib/audio/synthAudio';
import { Zap, Flame, Loader2, ShieldCheck, Activity } from 'lucide-react';

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
    <div className="h-full bg-[#523e58]/25 border border-[#7b5d95]/40 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-md backdrop-blur-md">
      {/* Sub-surface violet emitter */}
      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#9547a9]/15 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-[#7b5d95]/35 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-label text-[11px] text-[#9d9be5] uppercase tracking-widest font-bold">
              Kitchen Reactor
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#9d9be5] animate-pulse" />
          </div>
          <span className="font-label text-xs px-2.5 py-0.5 rounded bg-[#9547a9]/20 text-[#9d9be5] border border-[#9547a9]/40 font-bold flex items-center gap-1.5">
            <ShieldCheck className="h-3 w-3 text-[#9d9be5]" />
            <span>{stabilityPct}% Stable</span>
          </span>
        </div>

        {/* Reactor Core & Controls Layout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-1 mb-2">
          {/* Reactor Radial Graphic & Readouts */}
          <div className="flex items-center gap-3.5 sm:gap-4">
            {/* Circular Holographic Energy Core */}
            <div className="relative w-18 h-18 sm:w-20 sm:h-20 flex items-center justify-center shrink-0">
              {/* Outer segmented spin ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#9d9be5]/40 animate-spin-slow" />
              {/* Glow circle */}
              <div className="absolute inset-1.5 rounded-full border border-[#9547a9]/40" />
              {/* Inner Glowing Plasma Reactor */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#523e58]/60 border border-[#9d9be5] flex flex-col items-center justify-center shadow-[0_0_15px_rgba(157,155,229,0.35)]">
                {isCooking ? (
                  <Loader2 className="h-5 w-5 text-[#9d9be5] animate-spin" />
                ) : (
                  <Flame className="h-5 w-5 text-[#9d9be5] animate-pulse" />
                )}
              </div>
            </div>

            {/* Metrics */}
            <div className="flex flex-col gap-1">
              <div>
                <h3 className="font-headline text-base sm:text-lg text-[#f5f4ff] font-bold tracking-tight">
                  Cooking Chamber
                </h3>
              </div>

              <div className="flex items-center gap-3 pt-0.5">
                <div>
                  <span className="font-label text-[10px] text-[#9d9be5]/70 block">Flavor Match</span>
                  <span className="font-label text-sm sm:text-base font-bold text-[#9d9be5]">
                    {successPct}%
                  </span>
                </div>
                <div className="h-6 w-[1px] bg-[#7b5d95]/40" />
                <div>
                  <span className="font-label text-[10px] text-[#9d9be5]/70 block">Burn Risk</span>
                  <span className="font-label text-sm sm:text-base font-bold text-[#9547a9]">
                    {glitchPct}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* FUSE & SERVE Action Button */}
          <div className="flex flex-col items-center sm:items-end gap-1 z-10 w-full sm:w-auto shrink-0">
            <button
              onClick={handleFuseClick}
              disabled={!hasCrossings || isCooking}
              className={`w-full sm:w-auto font-label text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                hasCrossings && !isCooking
                  ? 'bg-gradient-to-r from-[#423ea6] via-[#9547a9] to-[#9d9be5] hover:from-[#523e58] hover:via-[#9547a9] hover:to-[#9d9be5] text-white shadow-[0_0_20px_rgba(149,71,169,0.5)] active:scale-95'
                  : 'bg-[#523e58]/50 text-[#7b5d95] border border-[#7b5d95]/40 cursor-not-allowed opacity-60'
              }`}
            >
              <Zap className="h-4 w-4 fill-current" />
              <span>{isCooking ? 'COOKING DISH...' : 'FUSE & SERVE'}</span>
            </button>
            <span className="font-label text-[10px] text-[#9d9be5]/70">
              {hasCrossings ? 'Ready to plate dish!' : 'Weave at least 1 crossing'}
            </span>
          </div>
        </div>
      </div>

      {/* Clean Objective Footer Matching OrderTicket */}
      <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[#7b5d95]/35 font-label text-[11px] text-[#9d9be5]/75">
        <div className="flex items-center gap-1.5">
          <Activity className="h-3.5 w-3.5 text-[#9d9be5]" />
          <span>Topological Anyon Cooker Online</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9547a9]" />
          <span className="text-[#f5f4ff] font-medium">Fault-Tolerant Fusion</span>
        </div>
      </div>
    </div>
  );
}
