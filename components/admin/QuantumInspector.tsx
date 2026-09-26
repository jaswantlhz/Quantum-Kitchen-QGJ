'use client';

import React from 'react';
import { BraidRecord } from '@/lib/quantum/braidTypes';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Atom, Compass, Binary, Layers } from 'lucide-react';

interface QuantumInspectorProps {
  braid: BraidRecord | null;
}

export function QuantumInspector({ braid }: QuantumInspectorProps) {
  if (!braid) {
    return (
      <Card className="border-slate-800 bg-slate-950/60 p-8 text-center text-slate-500">
        <Atom className="mx-auto h-8 w-8 mb-2 opacity-40 animate-spin" />
        <p className="text-xs">Select any braid session from the telemetry logs to inspect its quantum parameters.</p>
      </Card>
    );
  }

  const alpha = braid.stateVector[0];
  const beta = braid.stateVector[1];
  const prob0 = (alpha ** 2 * 100).toFixed(1);
  const prob1 = (beta ** 2 * 100).toFixed(1);

  return (
    <div className="space-y-4">
      {/* Top Overview Banner */}
      <Card className="border-cyan-500/30 bg-slate-950/80 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
        <CardHeader className="p-4 border-b border-slate-800/80">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono text-cyan-400 font-bold tracking-widest block">
                Session: {braid.id}
              </span>
              <CardTitle className="text-base font-black text-white mt-0.5">
                {braid.dishName}
              </CardTitle>
            </div>
            <Badge variant="default" className="font-mono text-xs">
              {braid.crossings.length} Crossings
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          {/* Braid Word */}
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-3">
            <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider block">
              Braid Group B₃ Word:
            </span>
            <div className="font-mono text-base font-bold text-cyan-200 mt-1">
              {braid.braidWord}
            </div>
          </div>

          {/* State Vector Amplitudes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-slate-300">
                <Binary className="h-3.5 w-3.5 text-cyan-400" />
                State Vector |ψ⟩ = α|0⟩ + β|1⟩
              </span>
              <span className="font-mono text-xs text-cyan-400">
                [{alpha.toFixed(3)}, {beta.toFixed(3)}]
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="rounded-lg bg-slate-900/80 border border-slate-800 p-2.5">
                <div className="flex justify-between text-slate-400 text-[11px] mb-1">
                  <span>|0⟩ Super-Particle (τ)</span>
                  <span className="text-cyan-300 font-bold">{prob0}%</span>
                </div>
                <Progress value={Number(prob0)} indicatorClassName="bg-cyan-400" />
              </div>

              <div className="rounded-lg bg-slate-900/80 border border-slate-800 p-2.5">
                <div className="flex justify-between text-slate-400 text-[11px] mb-1">
                  <span>|1⟩ Identity / Glitch (1)</span>
                  <span className="text-rose-400 font-bold">{prob1}%</span>
                </div>
                <Progress value={Number(prob1)} indicatorClassName="bg-rose-500" />
              </div>
            </div>
          </div>

          {/* Unitary Matrix SU(2) Representation */}
          <div className="space-y-1.5">
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              <Layers className="h-3.5 w-3.5 text-purple-400" />
              Unitary Evolution Matrix U ∈ SU(2)
            </span>
            <div className="rounded-xl border border-purple-500/20 bg-slate-900/60 p-3 font-mono text-xs">
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 rounded bg-purple-950/40 border border-purple-500/20 text-purple-200">
                  U₀₀: {alpha.toFixed(4)}
                </div>
                <div className="p-2 rounded bg-purple-950/40 border border-purple-500/20 text-purple-200">
                  U₀₁: {(-beta).toFixed(4)}
                </div>
                <div className="p-2 rounded bg-purple-950/40 border border-purple-500/20 text-purple-200">
                  U₁₀: {beta.toFixed(4)}
                </div>
                <div className="p-2 rounded bg-purple-950/40 border border-purple-500/20 text-purple-200">
                  U₁₁: {alpha.toFixed(4)}
                </div>
              </div>
            </div>
          </div>

          {/* Bloch Sphere Geometry */}
          <div className="space-y-1.5">
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              <Compass className="h-3.5 w-3.5 text-emerald-400" />
              Bloch Sphere Coordinates
            </span>
            <div className="grid grid-cols-3 gap-2 font-mono text-xs text-center">
              <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-2">
                <span className="block text-[10px] text-slate-500">Polar θ</span>
                <span className="text-emerald-400 font-bold">{braid.blochAngles.theta.toFixed(3)} rad</span>
              </div>
              <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-2">
                <span className="block text-[10px] text-slate-500">Azimuth φ</span>
                <span className="text-emerald-400 font-bold">{braid.blochAngles.phi.toFixed(3)} rad</span>
              </div>
              <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-2">
                <span className="block text-[10px] text-slate-500">Z-Projection</span>
                <span className="text-emerald-400 font-bold">{braid.blochAngles.z.toFixed(3)}</span>
              </div>
            </div>
          </div>

          {/* Scientist Notes */}
          {braid.notes && (
            <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-2.5 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Researcher Annotation: </span>
              {braid.notes}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
