'use client';

import React, { useState } from 'react';
import { QuantumBraidEngine } from '@/lib/quantum/anyonEngine';
import { BraidRecord, BraidCrossing } from '@/lib/quantum/braidTypes';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BraidDiagramSvg } from './BraidDiagramSvg';
import { RotateCcw, Save, Sparkles, Undo2, Layers } from 'lucide-react';

interface BraidSandboxProps {
  onBraidSaved: (record: BraidRecord) => void;
}

export function BraidSandbox({ onBraidSaved }: BraidSandboxProps) {
  const [strandCount, setStrandCount] = useState<number>(3);
  const [engine] = useState(() => new QuantumBraidEngine(3));
  const [crossings, setCrossings] = useState<BraidCrossing[]>([]);
  const [stateVector, setStateVector] = useState<[number, number]>([1.0, 0.0]);
  const [braidTitle, setBraidTitle] = useState('Experimental Braid Alpha');
  const [researcherNotes, setResearcherNotes] = useState('Topological phase simulation in B₃.');
  const [isSaving, setIsSaving] = useState(false);

  const handleStrandCountChange = (newCount: number) => {
    setStrandCount(newCount);
    engine.reset(newCount);
    setCrossings([]);
    setStateVector([1.0, 0.0]);
    setResearcherNotes(`Topological phase simulation in B${newCount}.`);
  };

  const applyOperator = (lane: number, isOver: boolean) => {
    engine.applyBraidCrossing(lane, isOver);
    setCrossings([...engine.crossings]);
    setStateVector([...engine.quantumState]);
  };

  const handleReset = () => {
    engine.reset(strandCount);
    setCrossings([]);
    setStateVector([1.0, 0.0]);
  };

  const handleUndo = () => {
    if (engine.crossings.length === 0) return;
    const history = [...engine.crossings];
    history.pop();
    engine.reset(strandCount);
    for (const c of history) {
      engine.applyBraidCrossing(c.lane, c.isOver);
    }
    setCrossings([...engine.crossings]);
    setStateVector([...engine.quantumState]);
  };

  const handleSaveToDatabase = async () => {
    setIsSaving(true);
    const probabilities = engine.measureFinalState();
    const blochAngles = engine.getBlochCoordinates();
    const flavorProfile = engine.getFlavorProfile();

    const record: BraidRecord = {
      id: `sandbox-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      createdAt: new Date().toISOString(),
      recipeId: 'scientist-sandbox',
      dishName: braidTitle || 'Sandbox Experiment',
      braidWord: engine.getBraidWord(),
      strandCount,
      crossings: [...crossings],
      stateVector: [...stateVector],
      probabilities,
      blochAngles,
      flavorProfile,
      notes: researcherNotes,
      tags: ['Scientist Lab', `Braid Group B${strandCount}`],
    };

    try {
      const res = await fetch('/api/braids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      const data = await res.json();
      if (data.success) {
        onBraidSaved(data.data);
      }
    } catch (err) {
      console.warn('Failed to save sandbox braid:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const { successEnergy, decoherenceGlitch } = engine.measureFinalState();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left: Interactive Braid Knot Generator & Operators */}
      <Card className="lg:col-span-7 border-[#333333] bg-[#1c1c1c] shadow-sm">
        <CardHeader className="p-4 border-b border-[#333333]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#8a3ffc]" />
              <CardTitle className="text-base text-[#f4f4f4]">N-Strand Braid Theory Sandbox</CardTitle>
            </div>

            {/* Strand count selector (2 to 7) */}
            <div className="flex items-center gap-1.5 rounded-lg bg-[#262626] border border-[#393939] p-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 px-1.5 flex items-center gap-1">
                <Layers className="h-3 w-3 text-[#009d9a]" /> Strands:
              </span>
              {[2, 3, 4, 5, 6, 7].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleStrandCountChange(num)}
                  className={`h-6 w-6 rounded font-mono text-xs font-bold transition-all cursor-pointer ${
                    strandCount === num
                      ? 'bg-[#8a3ffc] text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleUndo} disabled={crossings.length === 0} className="h-7 text-xs border-[#525252]">
                <Undo2 className="mr-1 h-3 w-3" /> Undo
              </Button>
              <Button size="sm" variant="ghost" onClick={handleReset} disabled={crossings.length === 0} className="h-7 text-xs text-rose-400">
                <RotateCcw className="mr-1 h-3 w-3" /> Clear
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          {/* Dynamic Operator Buttons for N - 1 lanes */}
          <div className="rounded-lg border border-[#393939] bg-[#262626] p-3 space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Anyon Generators (Braid Group B_{strandCount})
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {Array.from({ length: strandCount - 1 }, (_, i) => {
                const lane = i + 1;
                const isOdd = lane % 2 === 1;

                return (
                  <React.Fragment key={`gen-pair-${lane}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => applyOperator(lane, true)}
                      className={`h-8 border font-mono text-xs font-bold ${
                        isOdd
                          ? 'border-[#009d9a]/50 hover:bg-[#333333] text-[#009d9a]'
                          : 'border-[#8a3ffc]/50 hover:bg-[#333333] text-[#be95ff]'
                      }`}
                    >
                      + σ{lane === 1 ? '₁' : lane === 2 ? '₂' : lane === 3 ? '₃' : lane} (Over)
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => applyOperator(lane, false)}
                      className={`h-8 border font-mono text-xs font-bold ${
                        isOdd
                          ? 'border-[#009d9a]/50 hover:bg-[#333333] text-[#009d9a]'
                          : 'border-[#8a3ffc]/50 hover:bg-[#333333] text-[#be95ff]'
                      }`}
                    >
                      - σ{lane === 1 ? '₁' : lane === 2 ? '₂' : lane === 3 ? '₃' : lane}⁻¹ (Under)
                    </Button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* SVG Diagram Canvas (Horizontal Circuit Orientation) */}
          <div className="flex justify-start p-2 rounded-lg bg-[#161616] border border-[#333333] overflow-x-auto">
            <BraidDiagramSvg
              crossings={crossings}
              strandCount={strandCount}
              width={Math.max(460, 120 + (crossings.length + 1) * 55)}
              height={Math.max(190, (strandCount + 1) * 42)}
            />
          </div>

          {/* Braid Word Preview */}
          <div className="flex items-center justify-between rounded-lg bg-[#262626] border border-[#393939] p-2.5">
            <span className="text-xs text-slate-400">Current Braid Word:</span>
            <span className="font-mono text-sm font-bold text-[#be95ff]">
              {engine.getBraidWord()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Right: Quantum State Telemetry & Archival Form */}
      <Card className="lg:col-span-5 border-[#333333] bg-[#1c1c1c] shadow-sm">
        <CardHeader className="p-4 border-b border-[#333333]">
          <CardTitle className="text-base text-[#f4f4f4]">Quantum Metrics & Save</CardTitle>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          {/* State Vector */}
          <div className="rounded-lg border border-[#393939] bg-[#262626] p-3 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">State Vector [α, β]</span>
              <span className="font-mono text-[#009d9a] font-bold">
                [{stateVector[0].toFixed(3)}, {stateVector[1].toFixed(3)}]
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 rounded bg-[#161616] border border-[#333333]">
                <span className="text-slate-400 block text-[10px]">P(τ) Super-Particle</span>
                <span className="text-[#009d9a] font-bold">{(successEnergy * 100).toFixed(1)}%</span>
              </div>
              <div className="p-2 rounded bg-[#161616] border border-[#333333]">
                <span className="text-slate-400 block text-[10px]">P(1) Identity</span>
                <span className="text-[#da1e28] font-bold">{(decoherenceGlitch * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Save / Log Form */}
          <div className="space-y-3 pt-2">
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">
                Experiment Title
              </label>
              <input
                type="text"
                value={braidTitle}
                onChange={(e) => setBraidTitle(e.target.value)}
                className="w-full rounded-lg border border-[#393939] bg-[#161616] px-3 py-2 text-xs text-[#f4f4f4] focus:border-[#8a3ffc] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">
                Researcher Annotation
              </label>
              <textarea
                rows={3}
                value={researcherNotes}
                onChange={(e) => setResearcherNotes(e.target.value)}
                className="w-full rounded-lg border border-[#393939] bg-[#161616] px-3 py-2 text-xs text-[#f4f4f4] focus:border-[#8a3ffc] focus:outline-none"
              />
            </div>

            <Button
              variant="default"
              onClick={handleSaveToDatabase}
              disabled={crossings.length === 0 || isSaving}
              className="w-full font-bold shadow-sm"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? 'Logging to MongoDB...' : 'Save to Scientific Repository'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
