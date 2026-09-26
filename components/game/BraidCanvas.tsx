'use client';

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { QuantumBraidEngine } from '@/lib/quantum/anyonEngine';
import { BraidCrossing } from '@/lib/quantum/braidTypes';
import { Recipe } from '@/lib/game/recipes';
import { soundFx } from '@/lib/audio/synthAudio';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Undo2, Sparkles, HelpCircle } from 'lucide-react';

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
  const [springWiggle, setSpringWiggle] = useState<number[]>([0, 0, 0]); // FeralUI spring swing

  // 3 strands on the board (memoized to keep dependency stable)
  const strandColors = useMemo(
    () => recipe.strandColors || ['#00f0ff', '#ff007f', '#ffe600'],
    [recipe.strandColors]
  );
  const numStrands = 3;

  // Track strand permutation: order of strand IDs at the current bottom
  // Initial: [0, 1, 2]
  const currentStrandOrder = useRef<number[]>([0, 1, 2]);

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
      setSpringWiggle([
        Math.sin(t) * 3,
        Math.cos(t * 1.2) * 3,
        Math.sin(t * 0.9 + 1) * 3,
      ]);
      animId = requestAnimationFrame(animateSpring);
    };
    animId = requestAnimationFrame(animateSpring);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Handle a new crossing action
  const handleCrossing = (lane: number, isOver: boolean) => {
    // Current strands occupying lane and lane+1
    const idxA = lane - 1;
    const idxB = lane;
    const strandA = currentStrandOrder.current[idxA];
    const strandB = currentStrandOrder.current[idxB];

    // Swap in order
    currentStrandOrder.current[idxA] = strandB;
    currentStrandOrder.current[idxB] = strandA;

    engine.applyBraidCrossing(lane, isOver, strandA, strandB);
    soundFx.playPluck(lane, isOver);
    updateEngineState();
  };

  const handleUndo = () => {
    if (engine.crossings.length === 0) return;
    const previous = [...engine.crossings];
    previous.pop();

    // Replay engine from scratch
    engine.reset();
    currentStrandOrder.current = [0, 1, 2];

    for (const c of previous) {
      const idxA = c.lane - 1;
      const idxB = c.lane;
      const sA = currentStrandOrder.current[idxA];
      const sB = currentStrandOrder.current[idxB];
      currentStrandOrder.current[idxA] = sB;
      currentStrandOrder.current[idxB] = sA;
      engine.applyBraidCrossing(c.lane, c.isOver, sA, sB);
    }
    updateEngineState();
  };

  const handleReset = () => {
    engine.reset();
    currentStrandOrder.current = [0, 1, 2];
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

    ctx.clearRect(0, 0, width, height);

    // Background Cyberpunk grid
    ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const laneWidth = width / (numStrands + 1);
    const strandXPositions = [laneWidth * 1, laneWidth * 2, laneWidth * 3];

    const totalSteps = Math.max(crossings.length, 1);
    const stepHeight = Math.min(80, (height - 120) / Math.max(totalSteps + 1, 4));

    // Track active positions for each strand id [0, 1, 2]
    // posMap[strandId] = current lane index (0, 1, or 2)
    const posMap = [0, 1, 2];
    let currentY = 50;

    // Draw initial pegs at top with FeralUI spring swing
    posMap.forEach((laneIdx, strandId) => {
      const x = strandXPositions[laneIdx] + springWiggle[strandId];
      // Glowing peg
      ctx.shadowBlur = 15;
      ctx.shadowColor = strandColors[strandId];
      ctx.fillStyle = strandColors[strandId];
      ctx.beginPath();
      ctx.arc(x, currentY, 7, 0, Math.PI * 2);
      ctx.fill();

      // Halo ring
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x, currentY, 11, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
    });

    // Draw lines step by step
    crossings.forEach((c) => {
      const nextY = currentY + stepHeight;

      // Identify which strands are in lane c.lane - 1 and c.lane
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
          ctx.shadowBlur = 10;
          ctx.shadowColor = strandColors[sId];
          ctx.beginPath();
          ctx.moveTo(x, currentY);
          ctx.lineTo(x, nextY);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });

      // Draw the crossing strands
      const x1 = strandXPositions[leftLane];
      const x2 = strandXPositions[rightLane];
      const midY = (currentY + nextY) / 2;

      // Define paths
      const drawSpline = (startX: number, endX: number, color: string, isUnder: boolean) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 5;
        ctx.shadowBlur = isUnder ? 4 : 14;
        ctx.shadowColor = color;
        ctx.beginPath();
        ctx.moveTo(startX, currentY);
        ctx.bezierCurveTo(startX, midY, endX, midY, endX, nextY);
        ctx.stroke();
        ctx.shadowBlur = 0;
      };

      // Draw under strand first, then over strand
      if (c.isOver) {
        // Left strand goes OVER right strand
        drawSpline(x2, x1, strandColors[strandRight], true);
        // Break bridge for visual over-weave
        ctx.strokeStyle = '#05070e';
        ctx.lineWidth = 9;
        ctx.beginPath();
        ctx.moveTo(x1, currentY);
        ctx.bezierCurveTo(x1, midY, x2, midY, x2, nextY);
        ctx.stroke();
        drawSpline(x1, x2, strandColors[strandLeft], false);
      } else {
        // Left strand goes UNDER right strand
        drawSpline(x1, x2, strandColors[strandLeft], true);
        ctx.strokeStyle = '#05070e';
        ctx.lineWidth = 9;
        ctx.beginPath();
        ctx.moveTo(x2, currentY);
        ctx.bezierCurveTo(x2, midY, x1, midY, x1, nextY);
        ctx.stroke();
        drawSpline(x2, x1, strandColors[strandRight], false);
      }

      // Update positions
      posMap[strandLeft] = rightLane;
      posMap[strandRight] = leftLane;
      currentY = nextY;
    });

    // Draw remaining tail down to mixing bowl funnel
    posMap.forEach((laneIdx, strandId) => {
      const startX = strandXPositions[laneIdx];
      const endX = strandXPositions[laneIdx];
      ctx.strokeStyle = strandColors[strandId];
      ctx.lineWidth = 4;
      ctx.shadowBlur = 10;
      ctx.shadowColor = strandColors[strandId];
      ctx.beginPath();
      ctx.moveTo(startX, currentY);
      ctx.lineTo(endX, height - 35);
      ctx.stroke();

      // Lead-in particle beads at bottom
      ctx.fillStyle = strandColors[strandId];
      ctx.beginPath();
      ctx.arc(endX, height - 35, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }, [crossings, strandColors, springWiggle]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center rounded-2xl border border-cyan-500/30 bg-slate-950/80 p-5 shadow-[0_0_35px_rgba(6,182,212,0.15)] backdrop-blur-xl"
    >
      {/* Top HUD bar */}
      <div className="flex w-full items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Badge variant="default" className="text-xs">
            <Sparkles className="mr-1 h-3 w-3" />
            Active Braid
          </Badge>
          <span className="font-mono text-xs text-cyan-300 font-bold tracking-wider">
            {engine.getBraidWord()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleUndo}
            disabled={crossings.length === 0}
            className="h-8 text-xs"
          >
            <Undo2 className="mr-1 h-3 w-3" /> Undo
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleReset}
            disabled={crossings.length === 0}
            className="h-8 text-xs text-rose-400 hover:text-rose-300"
          >
            <RotateCcw className="mr-1 h-3 w-3" /> Reset
          </Button>
        </div>
      </div>

      {/* Main Pegboard Canvas */}
      <div className="relative my-3 flex justify-center w-full">
        <canvas
          ref={canvasRef}
          width={380}
          height={320}
          className="rounded-xl border border-slate-800/80 bg-[#060811] shadow-inner"
        />

        {/* FeralUI tactile lane crossing controls directly over the pegboard */}
        <div className="absolute inset-x-0 bottom-4 flex justify-around px-8 pointer-events-auto">
          {/* Lane 1 controls (between strand 1 & 2) */}
          <div className="flex flex-col items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-slate-900/90 p-2 backdrop-blur-md shadow-lg">
            <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
              Lane 1 (σ₁)
            </span>
            <div className="flex gap-1.5">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCrossing(1, true)}
                className="h-7 px-2.5 text-[11px] font-bold border-cyan-500/50 hover:bg-cyan-500/20"
                title="Cross Over: R-matrix forward rotation"
              >
                Over (σ₁)
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCrossing(1, false)}
                className="h-7 px-2.5 text-[11px] font-bold border-cyan-500/50 hover:bg-cyan-500/20"
                title="Cross Under: R-matrix inverse rotation"
              >
                Under (σ₁⁻¹)
              </Button>
            </div>
          </div>

          {/* Lane 2 controls (between strand 2 & 3) */}
          <div className="flex flex-col items-center gap-1.5 rounded-xl border border-purple-500/30 bg-slate-900/90 p-2 backdrop-blur-md shadow-lg">
            <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">
              Lane 2 (σ₂)
            </span>
            <div className="flex gap-1.5">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCrossing(2, true)}
                className="h-7 px-2.5 text-[11px] font-bold border-purple-500/50 hover:bg-purple-500/20 text-purple-300"
                title="Cross Over: F-matrix superposition"
              >
                Over (σ₂)
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCrossing(2, false)}
                className="h-7 px-2.5 text-[11px] font-bold border-purple-500/50 hover:bg-purple-500/20 text-purple-300"
                title="Cross Under: F-matrix conjugate"
              >
                Under (σ₂⁻¹)
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Instructions / Hint */}
      <div className="flex w-full items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 px-1">
        <div className="flex items-center gap-1.5">
          <HelpCircle className="h-3.5 w-3.5 text-cyan-400" />
          <span>Non-Abelian Rule: σ₁σ₂ ≠ σ₂σ₁. Order alters the quantum phase!</span>
        </div>
        <span className="font-mono text-slate-500">
          Crossings: {crossings.length}
        </span>
      </div>
    </div>
  );
}
