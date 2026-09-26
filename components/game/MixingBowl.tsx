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
    <Card className="relative overflow-hidden border-[#333333] bg-[#1c1c1c] shadow-sm flex flex-col justify-between h-full">
      <CardHeader className="p-3.5 border-b border-[#333333] pb-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-[#8a3ffc]" />
            <CardTitle className="text-sm font-bold text-[#f4f4f4]">Anyon Fusion Reactor</CardTitle>
          </div>
          <Badge variant="default" className="font-mono text-xs font-bold">
            {successPct}% P(τ)
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-5 flex-1">
        {/* IBM Quantum Cryostat Dilution Chamber Visual */}
        <div className="relative flex flex-col items-center shrink-0">
          {/* Top Cryostat Flange */}
          <div className="h-2 w-36 rounded-full bg-[#525252] border border-[#6f6f6f]" />

          {/* Cryostat Vacuum Chamber Container */}
          <div className="relative mt-1 flex h-24 w-36 items-center justify-center rounded-b-[3.5rem] border border-[#525252] bg-[#161616] overflow-hidden">
            {/* Quantum Coherence Field Level */}
            <div
              className={`absolute inset-x-0 bottom-0 bg-[#8a3ffc]/25 border-t border-[#8a3ffc] transition-all duration-300 ${
                isCooking ? 'h-full bg-[#8a3ffc]/40' : 'h-3/4'
              }`}
            />

            {/* Geometric Stage Core */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="text-xl">
                {isCooking ? '🌀' : '⚛️'}
              </span>
              <span className="font-mono text-[9px] uppercase font-bold text-[#c6c6c6] tracking-wider mt-1">
                {isCooking ? 'Fusing...' : 'Anyon Core'}
              </span>
            </div>
          </div>
        </div>

        {/* Quantum Probabilities Meter & Action Button */}
        <div className="w-full flex-1 space-y-2.5">
          <div className="space-y-1.5 rounded-lg border border-[#393939] bg-[#262626] p-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-[#009d9a]">
                <Sparkles className="h-3.5 w-3.5" /> Super-Particle P(τ)
              </span>
              <span className="font-mono font-bold text-[#009d9a]">{successPct}%</span>
            </div>
            <Progress value={successPct} indicatorClassName="bg-[#009d9a]" />

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="flex items-center gap-1.5 font-bold text-[#da1e28]">
                <AlertTriangle className="h-3.5 w-3.5" /> Decoherence P(1)
              </span>
              <span className="font-mono font-bold text-[#da1e28]">{glitchPct}%</span>
            </div>
            <Progress value={glitchPct} indicatorClassName="bg-[#da1e28]" />

            {stabilizerLevel > 0 && (
              <div className="flex items-center gap-1.5 text-[10px] text-[#24a148] pt-0.5">
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
            className="w-full font-bold text-sm tracking-wide h-10 shadow-sm"
          >
            <Flame className="mr-2 h-4 w-4" />
            {isCooking ? 'Simulating Anyon Fusion...' : 'Fuse & Cook Dish'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
