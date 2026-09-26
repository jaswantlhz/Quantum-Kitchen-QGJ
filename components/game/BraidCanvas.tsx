'use client';

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { QuantumBraidEngine } from '@/lib/quantum/anyonEngine';
import { BraidCrossing, ApplianceType } from '@/lib/quantum/braidTypes';
import { Recipe } from '@/lib/game/recipes';
import { drawIngredientSketch, INGREDIENTS } from '@/lib/game/ingredientSketches';
import { soundFx } from '@/lib/audio/synthAudio';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InfoDialog } from '@/components/ui/info-dialog';
import { RotateCcw, Undo2, Sparkles, Zap, Flame, Utensils } from 'lucide-react';

interface BraidCanvasProps {
  recipe: Recipe;
  engine: QuantumBraidEngine;
  onStateUpdate: () => void;
  stabilizerLevel?: number;
}

export function BraidCanvas({
  recipe,
  engine,
  onStateUpdate,
}: BraidCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [crossings, setCrossings] = useState<BraidCrossing[]>([]);
  const [springWiggle, setSpringWiggle] = useState<number[]>([]);
  const [selectedAppliance, setSelectedAppliance] = useState<ApplianceType>('chop');
  const [mergeNext, setMergeNext] = useState<boolean>(false);

  const numStrands = recipe.strandCount || 3;
  const ingredientsList = useMemo(
    () => recipe.ingredients || ['carrot', 'potato', 'lettuce'],
    [recipe.ingredients]
  );

  // Track strand permutation: order of strand IDs at the current bottom [0, 1, ..., N-1]
  const [strandOrder, setStrandOrder] = useState<number[]>(() =>
    Array.from({ length: numStrands }, (_, i) => i)
  );

  // Reset engine and local state when recipe changes (React idiomatic prop change pattern)
  const [prevRecipeId, setPrevRecipeId] = useState(recipe.id);
  if (prevRecipeId !== recipe.id) {
    setPrevRecipeId(recipe.id);
    setStrandOrder(Array.from({ length: numStrands }, (_, i) => i));
    engine.reset(numStrands);
    setCrossings([]);
  }

  useEffect(() => {
    onStateUpdate();
  }, [recipe.id, onStateUpdate]);

  const strandColors = useMemo(() => {
    return ingredientsList.map((key) => INGREDIENTS[key]?.naturalColor || '#00f0ff');
  }, [ingredientsList]);

  const updateEngineState = useCallback(() => {
    setCrossings([...engine.crossings]);
    onStateUpdate();
  }, [engine, onStateUpdate]);

  // FeralUI Physics: Spring dangling strand oscillation at top
  useEffect(() => {
    let animId: number;
    let t = 0;
    const animateSpring = () => {
      t += 0.05;
      const wiggles = Array.from({ length: numStrands }, (_, i) =>
        Math.sin(t * (1 + i * 0.2) + i) * 3
      );
      setSpringWiggle(wiggles);
      animId = requestAnimationFrame(animateSpring);
    };
    animId = requestAnimationFrame(animateSpring);
    return () => cancelAnimationFrame(animId);
  }, [numStrands]);

  // Handle a new crossing action
  const handleCrossing = (lane: number, isOver: boolean) => {
    const idxA = lane - 1;
    const idxB = lane;
    const strandA = strandOrder[idxA];
    const strandB = strandOrder[idxB];

    // Swap in order
    setStrandOrder((prev) => {
      const next = [...prev];
      next[idxA] = strandB;
      next[idxB] = strandA;
      return next;
    });

    engine.applyBraidCrossing(lane, isOver, strandA, strandB, selectedAppliance, mergeNext);
    soundFx.playPluck(lane, isOver);

    if (mergeNext) {
      setMergeNext(false); // Reset one-shot merge trigger
    }
    updateEngineState();
  };

  const handleUndo = () => {
    if (engine.crossings.length === 0) return;
    const previous = [...engine.crossings];
    previous.pop();

    engine.reset(numStrands);
    const restored = Array.from({ length: numStrands }, (_, i) => i);

    for (const c of previous) {
      const idxA = c.lane - 1;
      const idxB = c.lane;
      const sA = restored[idxA];
      const sB = restored[idxB];
      restored[idxA] = sB;
      restored[idxB] = sA;
      engine.applyBraidCrossing(c.lane, c.isOver, sA, sB, c.appliance, c.isMerged);
    }
    setStrandOrder(restored);
    updateEngineState();
  };

  const handleReset = () => {
    engine.reset(numStrands);
    setStrandOrder(Array.from({ length: numStrands }, (_, i) => i));
    updateEngineState();
  };

  // Draw the braid on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const isLight = document.documentElement.classList.contains('light');

    ctx.clearRect(0, 0, width, height);

    // Canvas Background fill
    ctx.fillStyle = isLight ? '#f8fafc' : '#060811';
    ctx.fillRect(0, 0, width, height);

    // Grid lines adapting to theme
    ctx.strokeStyle = isLight ? 'rgba(203, 213, 225, 0.7)' : 'rgba(30, 41, 59, 0.4)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 35) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 35) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const laneWidth = width / (numStrands + 1);
    const strandXPositions = Array.from({ length: numStrands }, (_, i) => laneWidth * (i + 1));

    const totalSteps = Math.max(crossings.length, 1);
    const stepHeight = Math.min(65, (height - 130) / Math.max(totalSteps + 1, 4));

    const posMap = Array.from({ length: numStrands }, (_, i) => i);
    let currentY = 55;

    // 1. Draw Sketched Ingredients at top pegs
    posMap.forEach((laneIdx, strandId) => {
      const wiggle = springWiggle[strandId] || 0;
      const x = strandXPositions[laneIdx] + wiggle;
      const ingKey = ingredientsList[strandId] || 'carrot';

      drawIngredientSketch(ctx, ingKey, x, currentY - 12, 13, false);
    });

    // 2. Draw lines step by step
    crossings.forEach((c) => {
      const nextY = currentY + stepHeight;

      const leftLane = c.lane - 1;
      const rightLane = c.lane;

      const strandLeft = posMap.findIndex((p) => p === leftLane);
      const strandRight = posMap.findIndex((p) => p === rightLane);

      // Other unaffected strands continue straight down
      posMap.forEach((laneIdx, sId) => {
        if (sId !== strandLeft && sId !== strandRight) {
          const x = strandXPositions[laneIdx];
          ctx.strokeStyle = strandColors[sId];
          ctx.lineWidth = 4;
          ctx.shadowBlur = 8;
          ctx.shadowColor = strandColors[sId];
          ctx.beginPath();
          ctx.moveTo(x, currentY);
          ctx.lineTo(x, nextY);
          ctx.stroke();

          // Slicing tick marks if chopped
          if (c.appliance === 'chop') {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x - 3, (currentY + nextY) / 2, 6, 2);
          }
          ctx.shadowBlur = 0;
        }
      });

      // Draw the crossing strands
      const x1 = strandXPositions[leftLane];
      const x2 = strandXPositions[rightLane];
      const midY = (currentY + nextY) / 2;

      const drawSpline = (startX: number, endX: number, color: string, isUnder: boolean) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 4.5;
        ctx.shadowBlur = isUnder ? 3 : 12;
        ctx.shadowColor = color;
        ctx.beginPath();
        ctx.moveTo(startX, currentY);
        ctx.bezierCurveTo(startX, midY, endX, midY, endX, nextY);
        ctx.stroke();

        // Chops / ticks along the path
        if (c.appliance === 'chop') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(endX - 3, nextY - 5, 6, 2);
        }
        ctx.shadowBlur = 0;
      };

      const bridgeColor = isLight ? '#f8fafc' : '#05070e';

      if (c.isOver) {
        drawSpline(x2, x1, strandColors[strandRight], true);
        ctx.strokeStyle = bridgeColor;
        ctx.lineWidth = 9;
        ctx.beginPath();
        ctx.moveTo(x1, currentY);
        ctx.bezierCurveTo(x1, midY, x2, midY, x2, nextY);
        ctx.stroke();
        drawSpline(x1, x2, strandColors[strandLeft], false);
      } else {
        drawSpline(x1, x2, strandColors[strandLeft], true);
        ctx.strokeStyle = bridgeColor;
        ctx.lineWidth = 9;
        ctx.beginPath();
        ctx.moveTo(x2, currentY);
        ctx.bezierCurveTo(x2, midY, x1, midY, x1, nextY);
        ctx.stroke();
        drawSpline(x2, x1, strandColors[strandRight], false);
      }

      // If line merger occurred at this crossing, draw lightning spark
      if (c.isMerged) {
        ctx.fillStyle = '#facc15';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#facc15';
        ctx.beginPath();
        ctx.arc((x1 + x2) / 2, midY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      posMap[strandLeft] = rightLane;
      posMap[strandRight] = leftLane;
      currentY = nextY;
    });

    // 3. Draw remaining tail down to mixing bowl funnel
    posMap.forEach((laneIdx, strandId) => {
      const startX = strandXPositions[laneIdx];
      const endX = strandXPositions[laneIdx];
      ctx.strokeStyle = strandColors[strandId];
      ctx.lineWidth = 4;
      ctx.shadowBlur = 8;
      ctx.shadowColor = strandColors[strandId];
      ctx.beginPath();
      ctx.moveTo(startX, currentY);
      ctx.lineTo(endX, height - 32);
      ctx.stroke();

      // Lead-in particle beads
      ctx.fillStyle = strandColors[strandId];
      ctx.beginPath();
      ctx.arc(endX, height - 32, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }, [crossings, strandColors, springWiggle, numStrands, ingredientsList]);

  const umamiMultiplier = engine.getUmamiMultiplier();

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center rounded-2xl border border-cyan-500/30 bg-slate-950/80 p-4 shadow-[0_0_35px_rgba(6,182,212,0.15)] backdrop-blur-xl"
    >
      {/* Top HUD bar with Umami Multiplier Ladder */}
      <div className="flex w-full items-center justify-between border-b border-slate-800/80 pb-3 gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="default" className="text-xs">
            <Sparkles className="mr-1 h-3 w-3" />
            {numStrands}-Strand Braid
          </Badge>
          <span className="font-mono text-xs text-cyan-300 font-bold tracking-wider">
            {engine.getBraidWord()}
          </span>
        </div>

        {/* Live Umami Multiplier Badge */}
        <div className="flex items-center gap-1.5 rounded-lg border border-purple-500/40 bg-purple-950/40 px-2.5 py-1 text-xs font-mono font-bold text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
          <Flame className="h-3.5 w-3.5 text-purple-400" />
          <span>Umami: {umamiMultiplier}x</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant="outline"
            onClick={handleUndo}
            disabled={crossings.length === 0}
            className="h-7 text-xs px-2"
          >
            <Undo2 className="mr-1 h-3 w-3" /> Undo
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleReset}
            disabled={crossings.length === 0}
            className="h-7 text-xs px-2 text-rose-400 hover:text-rose-300"
          >
            <RotateCcw className="mr-1 h-3 w-3" /> Reset
          </Button>
        </div>
      </div>

      {/* Appliance Station Toolbar */}
      <div className="flex items-center justify-between w-full mt-2.5 px-2 py-1.5 rounded-xl border border-slate-800 bg-slate-900/60 text-xs">
        <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
          <Utensils className="h-3 w-3 text-cyan-400" /> Station:
        </span>
        <div className="flex items-center gap-1 overflow-x-auto">
          {(
            [
              { id: 'chop', label: '🔪 Chop', tooltip: 'Accelerates phase rotation (Sweetness)' },
              { id: 'blend', label: '🌪️ Blend', tooltip: 'Maximizes superposition (F-matrix)' },
              { id: 'pan', label: '🍳 Sear Pan', tooltip: 'Ramps Spiciness and crispness' },
              { id: 'wash', label: '💧 Wash', tooltip: 'Purifies decoherence glitches' },
              { id: 'boil', label: '🍲 Boil Pot', tooltip: 'Simmers rich broths (Umami)' },
            ] as const
          ).map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => setSelectedAppliance(app.id)}
              className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                selectedAppliance === app.id
                  ? 'bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title={app.tooltip}
            >
              {app.label}
            </button>
          ))}
        </div>

        {/* Line Merge Toggle */}
        <button
          type="button"
          onClick={() => setMergeNext(!mergeNext)}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
            mergeNext
              ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(251,191,36,0.6)] animate-pulse'
              : 'border border-amber-500/40 text-amber-300 hover:bg-amber-950/40'
          }`}
          title="When enabled, next crossing merges two lines into a composite meal thread!"
        >
          <Zap className="h-3 w-3" />
          {mergeNext ? 'Merge: ON' : 'Mixer Merge'}
        </button>
      </div>

      {/* Main Pegboard Canvas */}
      <div className="relative my-3 flex justify-center w-full overflow-x-auto py-1">
        <canvas
          ref={canvasRef}
          width={Math.max(500, numStrands * 115)}
          height={330}
          className="rounded-xl border border-slate-300 dark:border-slate-800/80 bg-slate-50 dark:bg-[#060811] shadow-inner max-w-full"
        />
      </div>

      {/* Dynamic Crossing Controls for All N-1 Lanes */}
      <div className="w-full flex items-center justify-center gap-3 flex-wrap py-2.5 border-t border-slate-800/60 mb-1">
        {Array.from({ length: numStrands - 1 }, (_, i) => {
          const laneNum = i + 1;
          const isPhase = laneNum % 2 === 1;

          return (
            <div
              key={`lane-ctrl-${laneNum}`}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-2 backdrop-blur-md shadow-md min-w-[130px] ${
                isPhase
                  ? 'border-cyan-500/40 bg-white/95 dark:bg-slate-900/90'
                  : 'border-purple-500/40 bg-white/95 dark:bg-slate-900/90'
              }`}
            >
              <span
                className={`text-[10px] uppercase font-bold tracking-wider ${
                  isPhase ? 'text-cyan-600 dark:text-cyan-400' : 'text-purple-600 dark:text-purple-400'
                }`}
              >
                Lane {laneNum} (σ{laneNum === 1 ? '₁' : laneNum === 2 ? '₂' : laneNum === 3 ? '₃' : laneNum})
              </span>
              <div className="flex gap-1.5 w-full">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCrossing(laneNum, true)}
                  className="h-7 flex-1 px-2 text-[11px] font-bold border-cyan-500/40 hover:bg-cyan-500/20"
                  title={`Lane ${laneNum} Over crossing`}
                >
                  Over (σ{laneNum})
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCrossing(laneNum, false)}
                  className="h-7 flex-1 px-2 text-[11px] font-bold border-cyan-500/40 hover:bg-cyan-500/20"
                  title={`Lane ${laneNum} Under crossing`}
                >
                  Under (σ{laneNum}⁻¹)
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Controls / Hint */}
      <div className="flex w-full items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 px-1">
        <div className="flex items-center gap-2">
          <InfoDialog
            title="N-Anyon Braiding & Merging Rules"
            description="In topological anyon computing, braiding operators form the Braid Group B_N. Slicing through appliances and merging lines coalesces strands into complete composite dishes."
            tooltip="Braid Rules"
          >
            <div className="space-y-1.5 text-xs">
              <p><b>Appliance Effects:</b> Chopping increases phase speed; Blenders maximize superposition; Pans sear in spiciness; Boiling pots distill deep Umami.</p>
              <p><b>Mixer Merging:</b> Toggle &quot;Mixer Merge&quot; before crossing to fuse two strands into a single meal layer!</p>
              <p className="font-mono text-cyan-300">Umami Ladder: 3 moves (1.2x) → 5 moves (1.5x) → 7 moves (2.0x) → 9+ moves (3.14x Pi)!</p>
            </div>
          </InfoDialog>
          <span className="text-[11px] text-slate-400 font-mono">Braid Physics & Mixer Info</span>
        </div>
        <span className="font-mono text-cyan-400 font-bold">
          Crossings: {crossings.length}
        </span>
      </div>
    </div>
  );
}
