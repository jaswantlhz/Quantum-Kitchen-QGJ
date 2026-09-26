'use client';

import React, { useState } from 'react';
import { QuantumBraidEngine } from '@/lib/quantum/anyonEngine';
import { BraidRecord, BraidCrossing } from '@/lib/quantum/braidTypes';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BraidDiagramSvg } from './BraidDiagramSvg';
import { RotateCcw, Save, Sparkles, Undo2 } from 'lucide-react';

interface BraidSandboxProps {
  onBraidSaved: (record: BraidRecord) => void;
}

export function BraidSandbox({ onBraidSaved }: BraidSandboxProps) {
  const [engine] = useState(() => new QuantumBraidEngine());
  const [crossings, setCrossings] = useState<BraidCrossing[]>([]);
  const [stateVector, setStateVector] = useState<[number, number]>([1.0, 0.0]);
  const [braidTitle, setBraidTitle] = useState('Experimental Braid Alpha');
  const [researcherNotes, setResearcherNotes] = useState('Topological phase simulation in B₃.');
  const [isSaving, setIsSaving] = useState(false);

  const applyOperator = (lane: number, isOver: boolean) => {
    engine.applyBraidCrossing(lane, isOver);
    setCrossings([...engine.crossings]);
    setStateVector([...engine.quantumState]);
  };

  const handleReset = () => {
    engine.reset();
    setCrossings([]);
    setStateVector([1.0, 0.0]);
  };

  const handleUndo = () => {
    if (engine.crossings.length === 0) return;
    const history = [...engine.crossings];
    history.pop();
    engine.reset();
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
      crossings: [...crossings],
      stateVector: [...stateVector],
      probabilities,
      blochAngles,
      flavorProfile,
      notes: researcherNotes,
      tags: ['Scientist Lab', 'Braid Group B3'],
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
      <Card className="lg:col-span-7 border-purple-500/30 bg-slate-950/80">
        <CardHeader className="p-4 border-b border-slate-800/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <CardTitle className="text-base text-white">Interactive Braid Theory Sandbox</CardTitle>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleUndo} disabled={crossings.length === 0} className="h-7 text-xs">
                <Undo2 className="mr-1 h-3 w-3" /> Undo
              </Button>
              <Button size="sm" variant="ghost" onClick={handleReset} disabled={crossings.length === 0} className="h-7 text-xs text-rose-400">
                <RotateCcw className="mr-1 h-3 w-3" /> Clear
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          {/* Operator Buttons */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Anyon Generators (Braid Group B₃)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => applyOperator(1, true)}
                className="border-cyan-500/50 hover:bg-cyan-950/50 text-cyan-300 font-mono text-xs font-bold"
              >
                + σ₁ (R-Matrix)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => applyOperator(1, false)}
                className="border-cyan-500/50 hover:bg-cyan-950/50 text-cyan-300 font-mono text-xs font-bold"
              >
                - σ₁⁻¹ (Inv R)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => applyOperator(2, true)}
                className="border-purple-500/50 hover:bg-purple-950/50 text-purple-300 font-mono text-xs font-bold"
              >
                + σ₂ (F-Matrix)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => applyOperator(2, false)}
                className="border-purple-500/50 hover:bg-purple-950/50 text-purple-300 font-mono text-xs font-bold"
              >
                - σ₂⁻¹ (Inv F)
              </Button>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="flex justify-center p-2 rounded-xl bg-slate-950 border border-slate-800">
            <BraidDiagramSvg crossings={crossings} width={380} height={240} />
          </div>

          {/* Braid Word Preview */}
          <div className="flex items-center justify-between rounded-lg bg-slate-900/80 border border-slate-800 p-2.5">
            <span className="text-xs text-slate-400">Current Word:</span>
            <span className="font-mono text-sm font-bold text-cyan-300">
              {engine.getBraidWord()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Right: Quantum State Telemetry & Archival Form */}
      <Card className="lg:col-span-5 border-cyan-500/30 bg-slate-950/80">
        <CardHeader className="p-4 border-b border-slate-800/80">
          <CardTitle className="text-base text-white">Quantum Metrics & Save</CardTitle>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          {/* State Vector */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">State Vector [α, β]</span>
              <span className="font-mono text-cyan-400 font-bold">
                [{stateVector[0].toFixed(3)}, {stateVector[1].toFixed(3)}]
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">P(τ) Super-Particle</span>
                <span className="text-cyan-300 font-bold">{(successEnergy * 100).toFixed(1)}%</span>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">P(1) Identity</span>
                <span className="text-rose-400 font-bold">{(decoherenceGlitch * 100).toFixed(1)}%</span>
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
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
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
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <Button
              variant="default"
              onClick={handleSaveToDatabase}
              disabled={crossings.length === 0 || isSaving}
              className="w-full font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)]"
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
