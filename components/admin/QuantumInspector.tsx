'use client';

import React from 'react';
import { BraidRecord } from '@/lib/quantum/braidTypes';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Atom, Compass, Binary, Layers, Sparkles } from 'lucide-react';

interface QuantumInspectorProps {
  braid: BraidRecord | null;
}

export function QuantumInspector({ braid }: QuantumInspectorProps) {
  if (!braid) {
    return (
      <Card className="border border-slate-200 dark:border-[#333333] bg-white dark:bg-[#1c1c1c] p-8 text-center text-slate-500 shadow-sm">
        <Atom className="mx-auto h-8 w-8 mb-2 opacity-40 text-[#8a3ffc] animate-spin" />
        <p className="text-xs font-medium">Select any braid session from the telemetry logs to inspect its quantum parameters.</p>
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
      <Card className="border border-slate-200 dark:border-[#333333] bg-white dark:bg-[#1c1c1c] shadow-sm">
        <CardHeader className="p-4 border-b border-slate-200 dark:border-[#333333]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono text-[#007d79] dark:text-[#009d9a] font-bold tracking-widest block">
                Session: {braid.id}
              </span>
              <CardTitle className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
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
          <div className="rounded-xl border border-slate-200 dark:border-[#393939] bg-[#f8fafc] dark:bg-[#262626] p-3">
            <span className="text-[10px] uppercase font-bold text-[#6929c4] dark:text-[#be95ff] tracking-wider block">
              Braid Group B_{braid.strandCount} Word:
            </span>
            <div className="font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-[#be95ff] mt-1 break-all">
              {braid.braidWord || 'Identity (e)'}
            </div>
          </div>

          {/* State Vector Amplitudes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                <Binary className="h-3.5 w-3.5 text-[#007d79] dark:text-[#009d9a]" />
                State Vector |ψ⟩ = α|0⟩ + β|1⟩
              </span>
              <span className="font-mono text-xs text-[#6929c4] dark:text-[#be95ff] font-bold">
                [{alpha.toFixed(3)}, {beta.toFixed(3)}]
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="rounded-lg bg-[#f1f5f9] dark:bg-[#262626] border border-slate-200 dark:border-[#393939] p-2.5">
                <div className="flex justify-between text-slate-600 dark:text-slate-400 text-[11px] mb-1">
                  <span>|0⟩ Delicacy Super-Particle (τ)</span>
                  <span className="text-[#007d79] dark:text-[#009d9a] font-bold">{prob0}%</span>
                </div>
                <Progress value={Number(prob0)} indicatorClassName="bg-[#009d9a]" />
              </div>

              <div className="rounded-lg bg-[#f1f5f9] dark:bg-[#262626] border border-slate-200 dark:border-[#393939] p-2.5">
                <div className="flex justify-between text-slate-600 dark:text-slate-400 text-[11px] mb-1">
                  <span>|1⟩ Vacuum Identity / Glitch (1)</span>
                  <span className="text-[#da1e28] font-bold">{prob1}%</span>
                </div>
                <Progress value={Number(prob1)} indicatorClassName="bg-[#da1e28]" />
              </div>
            </div>
          </div>

          {/* Unitary Matrix SU(2) Representation */}
          <div className="space-y-1.5">
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wider">
              <Layers className="h-3.5 w-3.5 text-[#8a3ffc]" />
              Unitary Evolution Matrix U ∈ SU(2)
            </span>
            <div className="rounded-xl border border-slate-200 dark:border-[#393939] bg-[#f8fafc] dark:bg-[#262626] p-3 font-mono text-xs">
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 rounded bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#393939] text-[#6929c4] dark:text-[#be95ff] font-bold">
                  U₀₀: {alpha.toFixed(4)}
                </div>
                <div className="p-2 rounded bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#393939] text-[#6929c4] dark:text-[#be95ff] font-bold">
                  U₀₁: {(-beta).toFixed(4)}
                </div>
                <div className="p-2 rounded bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#393939] text-[#6929c4] dark:text-[#be95ff] font-bold">
                  U₁₀: {beta.toFixed(4)}
                </div>
                <div className="p-2 rounded bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#393939] text-[#6929c4] dark:text-[#be95ff] font-bold">
                  U₁₁: {alpha.toFixed(4)}
                </div>
              </div>
            </div>
          </div>

          {/* Theoretical Non-Abelian Generators */}
          <div className="space-y-1.5">
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-[#f1c21b]" />
              Fibonacci Anyon Generators (Braid Basis)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-[#393939] bg-[#f8fafc] dark:bg-[#262626]">
                <b className="text-[#007d79] dark:text-[#009d9a] block mb-1">R-Matrix (Lane 1 σ₁):</b>
                <span>diag(e^(-i3π/5), e^(i4π/5))</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-[#393939] bg-[#f8fafc] dark:bg-[#262626]">
                <b className="text-[#6929c4] dark:text-[#be95ff] block mb-1">F-Matrix (Lane 2 σ₂):</b>
                <span>τ ≈ 0.618034 (Golden Ratio)</span>
              </div>
            </div>
          </div>

          {/* Bloch Sphere Geometry */}
          <div className="space-y-1.5">
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wider">
              <Compass className="h-3.5 w-3.5 text-[#007d79] dark:text-[#009d9a]" />
              Bloch Sphere Coordinates
            </span>
            <div className="grid grid-cols-3 gap-2 font-mono text-xs text-center">
              <div className="rounded-lg bg-[#f8fafc] dark:bg-[#262626] border border-slate-200 dark:border-[#393939] p-2">
                <span className="block text-[10px] text-slate-500">Polar θ</span>
                <span className="text-[#007d79] dark:text-[#009d9a] font-bold">{braid.blochAngles.theta.toFixed(3)} rad</span>
              </div>
              <div className="rounded-lg bg-[#f8fafc] dark:bg-[#262626] border border-slate-200 dark:border-[#393939] p-2">
                <span className="block text-[10px] text-slate-500">Azimuth φ</span>
                <span className="text-[#007d79] dark:text-[#009d9a] font-bold">{braid.blochAngles.phi.toFixed(3)} rad</span>
              </div>
              <div className="rounded-lg bg-[#f8fafc] dark:bg-[#262626] border border-slate-200 dark:border-[#393939] p-2">
                <span className="block text-[10px] text-slate-500">Z-Projection</span>
                <span className="text-[#007d79] dark:text-[#009d9a] font-bold">{braid.blochAngles.z.toFixed(3)}</span>
              </div>
            </div>
          </div>

          {/* Scientist Notes */}
          {braid.notes && (
            <div className="rounded-lg border border-slate-200 dark:border-[#393939] bg-[#f8fafc] dark:bg-[#262626] p-2.5 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-900 dark:text-slate-200">Researcher Annotation: </span>
              {braid.notes}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
