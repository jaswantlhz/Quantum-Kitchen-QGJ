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
  ghostCrossing?: { lane: number; isOver: boolean } | null;
  onClearGhostCrossing?: () => void;
}

export function BraidCanvas({
  recipe,
  engine,
  onStateUpdate,
  ghostCrossing,
  onClearGhostCrossing,
}: BraidCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [crossings, setCrossings] = useState<BraidCrossing[]>([]);
  const [springWiggle, setSpringWiggle] = useState<number[]>([]);
  const [selectedAppliance, setSelectedAppliance] = useState<ApplianceType>('chop');
  const [mergeNext, setMergeNext] = useState<boolean>(false);

  const [containerWidth, setContainerWidth] = useState<number>(1000);

  // Dynamically observe container width so the braid canvas stretches across the full card width
  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth - 34;
        if (w > 250) {
          setContainerWidth(w);
        }
      }
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Auto-scroll horizontal loom to latest crossing
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollWidth,
        behavior: 'smooth',
      });
    }
  }, [crossings.length]);

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
    onClearGhostCrossing?.();
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
    onClearGhostCrossing?.();
    updateEngineState();
  };

  const handleReset = () => {
    engine.reset(numStrands);
    setStrandOrder(Array.from({ length: numStrands }, (_, i) => i));
    onClearGhostCrossing?.();
    updateEngineState();
  };

  // Draw the braid on canvas (Horizontal Quantum Circuit Orientation: Left -> Right)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Logical display dimensions
    const displayWidth = Math.max(containerWidth, 120 + (crossings.length + (ghostCrossing ? 2 : 1)) * 90);
    const displayHeight = Math.max(220, (numStrands + 1) * 58);
    const dpr = typeof window !== 'undefined' ? Math.max(1, window.devicePixelRatio || 1) : 1;

    // Buffer dimensions scaled by DPR for Retina / High-DPI crystal sharpness
    canvas.width = Math.round(displayWidth * dpr);
    canvas.height = Math.round(displayHeight * dpr);

    // CSS dimensions match logical pixels exactly (preventing blur / stretching)
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    // Scale drawing coordinate system by DPR
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const width = displayWidth;
    const height = displayHeight;
    const isLight = document.documentElement.classList.contains('light');

    ctx.clearRect(0, 0, width, height);

    // Canvas Background fill - Qiskit Matte Surface
    ctx.fillStyle = isLight ? '#ffffff' : '#161616';
    ctx.fillRect(0, 0, width, height);

    // Technical Drafting Grid
    ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';
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

    const laneHeight = height / (numStrands + 1);
    const strandYPositions = Array.from({ length: numStrands }, (_, i) => laneHeight * (i + 1));

    // Faint horizontal wire guides
    ctx.setLineDash([3, 4]);
    ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    strandYPositions.forEach((y) => {
      ctx.beginPath();
      ctx.moveTo(45, y);
      ctx.lineTo(width - 25, y);
      ctx.stroke();
    });
    ctx.setLineDash([]);

    const startX = 135;
    const endX = width - 42;
    const availableSpan = endX - startX - 25;

    // Distribute steps generously across the entire screen!
    const totalSteps = crossings.length + (ghostCrossing ? 1 : 0);
    const stepWidth = totalSteps > 0
      ? Math.max(85, Math.min(260, availableSpan / Math.max(totalSteps + 0.2, 2.5)))
      : 120;

    const posMap = Array.from({ length: numStrands }, (_, i) => i);

    // 1. Draw Sketched Ingredients at left dispenser positions (Enlarged 20px radius)
    posMap.forEach((laneIdx, strandId) => {
      const wiggle = springWiggle[strandId] || 0;
      const y = strandYPositions[laneIdx];
      const x = 30 + wiggle;
      const ingKey = ingredientsList[strandId] || 'carrot';
      const ingInfo = INGREDIENTS[ingKey];
      const ingName = ingInfo?.name || ingKey;

      // Ingredient icon sketch - Enlarged to 18px (36px diameter)
      drawIngredientSketch(ctx, ingKey, x, y, 18, false);

      // Plain-English Strand Register Label with Crisp High-DPI Typography
      ctx.fillStyle = isLight ? '#0f172a' : '#f4f4f4';
      ctx.font = 'bold 12px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillText(`${ingName}`, x + 24, y - 3);

      ctx.fillStyle = isLight ? '#475569' : '#a56eff';
      ctx.font = '600 11px monospace';
      ctx.fillText(`Strand #${strandId + 1}`, x + 24, y + 11);

      // Connect dispenser to startX
      ctx.strokeStyle = strandColors[strandId];
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(x + 20, y);
      ctx.lineTo(startX, y);
      ctx.stroke();
    });

    let currentX = startX;

    // If no crossings yet and no ghost move, draw helpful subtle guidance label in center
    if (crossings.length === 0 && !ghostCrossing) {
      ctx.fillStyle = isLight ? '#475569' : '#8c8c8c';
      ctx.font = '600 12px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('◄ READY TO WEAVE — CHOOSE A KITCHEN STATION & WEAVE STRANDS BELOW ►', width / 2, height / 2);
      ctx.textAlign = 'start';
    }

    // 2. Draw crossings left to right
    crossings.forEach((c, stepIdx) => {
      const nextX = currentX + stepWidth;
      const midX = (currentX + nextX) / 2;

      // Draw subtle step header at top
      ctx.fillStyle = isLight ? '#475569' : '#be95ff';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`t${stepIdx + 1}`, midX, 16);
      ctx.textAlign = 'start';

      const upperLane = c.lane - 1;
      const lowerLane = c.lane;

      const strandUpper = posMap.findIndex((p) => p === upperLane);
      const strandLower = posMap.findIndex((p) => p === lowerLane);

      // Uninvolved strands continue straight
      posMap.forEach((laneIdx, sId) => {
        if (sId !== strandUpper && sId !== strandLower) {
          const y = strandYPositions[laneIdx];
          ctx.strokeStyle = strandColors[sId];
          ctx.lineWidth = 3.5;
          ctx.shadowBlur = 0;
          ctx.beginPath();
          ctx.moveTo(currentX, y);
          ctx.lineTo(nextX, y);
          ctx.stroke();

          // Slicing tick marks if chopped
          if (c.appliance === 'chop') {
            ctx.fillStyle = isLight ? '#161616' : '#ffffff';
            ctx.fillRect(midX - 1, y - 4, 2, 8);
          }
        }
      });

      // Spline curves between upper and lower lanes
      const y1 = strandYPositions[upperLane];
      const y2 = strandYPositions[lowerLane];

      const drawSpline = (startY: number, endY: number, color: string) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.moveTo(currentX, startY);
        ctx.bezierCurveTo(midX, startY, midX, endY, nextX, endY);
        ctx.stroke();

        // Chops / ticks
        if (c.appliance === 'chop') {
          ctx.fillStyle = isLight ? '#161616' : '#ffffff';
          ctx.fillRect(nextX - 3, endY - 4, 2, 8);
        }
      };

      const bridgeColor = isLight ? '#ffffff' : '#161616';

      if (c.isOver) {
        // Lower strand goes under (drawn first)
        drawSpline(y2, y1, strandColors[strandLower]);
        // Bridge cutout
        ctx.strokeStyle = bridgeColor;
        ctx.lineWidth = 8.5;
        ctx.beginPath();
        ctx.moveTo(currentX, y1);
        ctx.bezierCurveTo(midX, y1, midX, y2, nextX, y2);
        ctx.stroke();
        // Upper strand goes over (drawn on top)
        drawSpline(y1, y2, strandColors[strandUpper]);
      } else {
        // Upper strand goes under (drawn first)
        drawSpline(y1, y2, strandColors[strandUpper]);
        // Bridge cutout
        ctx.strokeStyle = bridgeColor;
        ctx.lineWidth = 8.5;
        ctx.beginPath();
        ctx.moveTo(currentX, y2);
        ctx.bezierCurveTo(midX, y2, midX, y1, nextX, y1);
        ctx.stroke();
        // Lower strand goes over (drawn on top)
        drawSpline(y2, y1, strandColors[strandLower]);
      }

      // If line merger occurred at this crossing, draw crisp golden connector
      if (c.isMerged) {
        ctx.fillStyle = '#f1c21b';
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(midX, (y1 + y2) / 2, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      posMap[strandUpper] = lowerLane;
      posMap[strandLower] = upperLane;
      currentX = nextX;
    });

    // 2.5 Ghost Crossing Preview (from Sous-Chef Bloub)
    if (ghostCrossing && ghostCrossing.lane >= 1 && ghostCrossing.lane < numStrands) {
      const gNextX = currentX + stepWidth;
      const gMidX = (currentX + gNextX) / 2;

      const gUpperLane = ghostCrossing.lane - 1;
      const gLowerLane = ghostCrossing.lane;
      const gStrandUpper = posMap.findIndex((p) => p === gUpperLane);
      const gStrandLower = posMap.findIndex((p) => p === gLowerLane);

      // Ghost step header
      ctx.fillStyle = '#f1c21b';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('✨ RECOMMENDED', gMidX, 16);
      ctx.textAlign = 'start';

      // Uninvolved strands continue dashed
      posMap.forEach((laneIdx, sId) => {
        if (sId !== gStrandUpper && sId !== gStrandLower) {
          const y = strandYPositions[laneIdx];
          ctx.setLineDash([4, 4]);
          ctx.strokeStyle = strandColors[sId];
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(currentX, y);
          ctx.lineTo(gNextX, y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      const gy1 = strandYPositions[gUpperLane];
      const gy2 = strandYPositions[gLowerLane];

      const drawGhostSpline = (startY: number, endY: number, color: string) => {
        ctx.setLineDash([6, 4]);
        ctx.strokeStyle = color;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(currentX, startY);
        ctx.bezierCurveTo(gMidX, startY, gMidX, endY, gNextX, endY);
        ctx.stroke();
        ctx.setLineDash([]);
      };

      if (ghostCrossing.isOver) {
        drawGhostSpline(gy2, gy1, strandColors[gStrandLower]);
        drawGhostSpline(gy1, gy2, strandColors[gStrandUpper]);
      } else {
        drawGhostSpline(gy1, gy2, strandColors[gStrandUpper]);
        drawGhostSpline(gy2, gy1, strandColors[gStrandLower]);
      }

      posMap[gStrandUpper] = gLowerLane;
      posMap[gStrandLower] = gUpperLane;
      currentX = gNextX;
    }

    // 3. Draw remaining horizontal tails to right edge (lead into Fusion Reactor)
    posMap.forEach((laneIdx, strandId) => {
      const y = strandYPositions[laneIdx];
      ctx.strokeStyle = strandColors[strandId];
      ctx.lineWidth = 3.5;
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.moveTo(currentX, y);
      ctx.lineTo(endX, y);
      ctx.stroke();

      // Lead-in particle beads at right terminal
      ctx.fillStyle = strandColors[strandId];
      ctx.beginPath();
      ctx.arc(endX, y, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = isLight ? '#161616' : '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Intake arrow chevron into reactor
      ctx.strokeStyle = isLight ? '#007d79' : '#009d9a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(endX + 6, y - 4);
      ctx.lineTo(endX + 11, y);
      ctx.lineTo(endX + 6, y + 4);
      ctx.stroke();
    });

    // Intake Port Bracket on right
    ctx.strokeStyle = isLight ? 'rgba(0, 125, 121, 0.4)' : 'rgba(0, 157, 154, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(endX + 16, strandYPositions[0] - 12);
    ctx.lineTo(endX + 22, strandYPositions[0] - 12);
    ctx.lineTo(endX + 22, strandYPositions[strandYPositions.length - 1] + 12);
    ctx.lineTo(endX + 16, strandYPositions[strandYPositions.length - 1] + 12);
    ctx.stroke();

    // Right Intake Label
    ctx.fillStyle = isLight ? '#007d79' : '#009d9a';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('TO FUSION REACTOR ⇾', width - 14, 16);
    ctx.textAlign = 'start';
  }, [crossings, strandColors, springWiggle, numStrands, ingredientsList, containerWidth, ghostCrossing]);

  const umamiMultiplier = engine.getUmamiMultiplier();

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center rounded-xl border border-[#333333] bg-[#1c1c1c] p-4 shadow-sm backdrop-blur-md"
    >
      {/* Top HUD bar with Umami Multiplier Ladder */}
      <div className="flex w-full items-center justify-between border-b border-[#333333] pb-3 gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="default" className="text-xs">
            <Sparkles className="mr-1 h-3 w-3" />
            {numStrands}-Strand Braid
          </Badge>
          <span className="font-mono text-xs text-[#be95ff] font-bold tracking-wider">
            {engine.getBraidWord()}
          </span>
        </div>

        {/* Live Umami Multiplier Badge */}
        <div className="flex items-center gap-1.5 rounded-lg border border-[#525252] bg-[#262626] px-2.5 py-1 text-xs font-mono font-bold text-[#f4f4f4]">
          <Flame className="h-3.5 w-3.5 text-[#f1c21b]" />
          <span>Umami: {umamiMultiplier}x</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant="outline"
            onClick={handleUndo}
            disabled={crossings.length === 0}
            className="h-7 text-xs px-2.5"
          >
            <Undo2 className="mr-1 h-3 w-3" /> Undo
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleReset}
            disabled={crossings.length === 0}
            className="h-7 text-xs px-2.5 text-rose-400 hover:text-rose-300"
          >
            <RotateCcw className="mr-1 h-3 w-3" /> Reset
          </Button>
        </div>
      </div>

      {/* Appliance Station Toolbar */}
      <div className="flex items-center justify-between w-full mt-2.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-[#333333] bg-[#f8fafc] dark:bg-[#262626] text-xs">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shrink-0">
          <Utensils className="h-3.5 w-3.5 text-[#009d9a]" /> Kitchen Station:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto">
          {(
            [
              { id: 'chop', label: 'Chop Board', emoji: '🔪', tooltip: 'Accelerates phase rotation (Boosts Sweetness)' },
              { id: 'blend', label: 'Blender', emoji: '🌪️', tooltip: 'Mixes quantum states in superposition (Boosts Tartness)' },
              { id: 'pan', label: 'Sear Pan', emoji: '🍳', tooltip: 'Applies thermal excitation (Ramps up Spiciness)' },
              { id: 'wash', label: 'Wash Basin', emoji: '💧', tooltip: 'Purifies decoherence glitches & thermal noise' },
              { id: 'boil', label: 'Boil Pot', emoji: '🍲', tooltip: 'Simmers balanced entanglement (Deep Umami)' },
            ] as const
          ).map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => setSelectedAppliance(app.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                selectedAppliance === app.id
                  ? 'bg-[#8a3ffc] text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#333333]'
              }`}
              title={app.tooltip}
            >
              <span className="text-base">{app.emoji}</span>
              <span>{app.label}</span>
            </button>
          ))}
        </div>

        {/* Line Merge Toggle */}
        <button
          type="button"
          onClick={() => setMergeNext(!mergeNext)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer shrink-0 ${
            mergeNext
              ? 'bg-[#f1c21b] text-black shadow-sm'
              : 'border border-[#f1c21b]/60 text-[#b28600] dark:text-[#f1c21b] hover:bg-[#f1c21b]/10'
          }`}
          title="When enabled, next crossing merges two lines into a composite meal thread!"
        >
          <Zap className="h-3.5 w-3.5" />
          {mergeNext ? 'Merge: ON' : 'Mixer Merge'}
        </button>
      </div>

      {/* Main Pegboard Canvas - Horizontal Quantum Wire Loom (Stretches across screen) */}
      <div
        ref={scrollContainerRef}
        className="relative my-3 flex justify-start w-full overflow-x-auto py-1 scroll-smooth"
      >
        <canvas
          ref={canvasRef}
          className="rounded-lg border border-slate-200 dark:border-[#333333] bg-white dark:bg-[#161616] shrink-0 shadow-sm"
        />
      </div>

      {/* Dynamic Crossing Controls for All N-1 Lanes */}
      <div className="w-full flex items-center justify-center gap-3 flex-wrap py-3 border-t border-slate-200 dark:border-[#333333] mb-1 bg-[#f1f5f9] dark:bg-[#161616]/80 rounded-xl p-3 shadow-xs">
        {Array.from({ length: numStrands - 1 }, (_, i) => {
          const laneNum = i + 1;
          const isPhase = laneNum % 2 === 1;
          const isOverRecommended = ghostCrossing?.lane === laneNum && ghostCrossing?.isOver === true;
          const isUnderRecommended = ghostCrossing?.lane === laneNum && ghostCrossing?.isOver === false;

          return (
            <div
              key={`lane-ctrl-${laneNum}`}
              className={`flex flex-col items-center gap-2 rounded-xl border p-2.5 shadow-sm min-w-[170px] transition-all ${
                ghostCrossing?.lane === laneNum
                  ? 'border-[#f1c21b] ring-1 ring-[#f1c21b]/50 bg-amber-500/5'
                  : isPhase
                  ? 'border-[#009d9a]/50 bg-white dark:bg-[#262626]'
                  : 'border-[#8a3ffc]/50 bg-white dark:bg-[#262626]'
              }`}
            >
              <div className="flex items-center justify-between w-full px-1">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Lane {laneNum}
                </span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                  isPhase
                    ? 'bg-[#009d9a]/10 text-[#007d79] dark:text-[#009d9a]'
                    : 'bg-[#8a3ffc]/10 text-[#6929c4] dark:text-[#be95ff]'
                }`}>
                  Strands {laneNum} & {laneNum + 1} (σ{laneNum === 1 ? '₁' : laneNum === 2 ? '₂' : laneNum === 3 ? '₃' : laneNum})
                </span>
              </div>
              <div className="flex gap-2 w-full">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCrossing(laneNum, true)}
                  className={`h-8 flex-1 px-2 text-xs font-bold transition-all ${
                    isOverRecommended
                      ? 'border-[#f1c21b] bg-[#f1c21b]/20 text-[#b28600] dark:text-[#f1c21b] ring-1 ring-[#f1c21b] animate-pulse'
                      : 'border-slate-300 dark:border-[#525252] hover:bg-slate-100 dark:hover:bg-[#333333]'
                  }`}
                  title={`Lane ${laneNum}: Weave lower strand OVER upper strand (σ${laneNum})`}
                >
                  {isOverRecommended ? '✨ Weave Over' : 'Weave Over'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCrossing(laneNum, false)}
                  className={`h-8 flex-1 px-2 text-xs font-bold transition-all ${
                    isUnderRecommended
                      ? 'border-[#f1c21b] bg-[#f1c21b]/20 text-[#b28600] dark:text-[#f1c21b] ring-1 ring-[#f1c21b] animate-pulse'
                      : 'border-slate-300 dark:border-[#525252] hover:bg-slate-100 dark:hover:bg-[#333333]'
                  }`}
                  title={`Lane ${laneNum}: Weave lower strand UNDER upper strand (σ${laneNum}⁻¹)`}
                >
                  {isUnderRecommended ? '✨ Weave Under' : 'Weave Under'}
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
