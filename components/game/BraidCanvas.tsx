'use client';

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { QuantumBraidEngine } from '@/lib/quantum/anyonEngine';
import { BraidCrossing, ApplianceType } from '@/lib/quantum/braidTypes';
import { Recipe } from '@/lib/game/recipes';
import { drawIngredientSketch, INGREDIENTS } from '@/lib/game/ingredientSketches';
import { soundFx } from '@/lib/audio/synthAudio';
import { RotateCcw, Undo2, Zap, Flame } from 'lucide-react';
import { ApplianceIcon } from '@/components/game/GameIcons';

interface BraidCanvasProps {
  recipe: Recipe;
  engine: QuantumBraidEngine;
  onStateUpdate: () => void;
  stabilizerLevel?: number;
  isCooking?: boolean;
  ghostCrossing?: { lane: number; isOver: boolean } | null;
  onClearGhostCrossing?: () => void;
}

export function BraidCanvas({
  recipe,
  engine,
  onStateUpdate,
  isCooking = false,
  ghostCrossing,
  onClearGhostCrossing,
}: BraidCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [crossings, setCrossings] = useState<BraidCrossing[]>([]);
  const [selectedAppliance, setSelectedAppliance] = useState<ApplianceType>('chop');
  const [mergeNext, setMergeNext] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(1000);

  // Animation timestamp tracking refs
  const lastCrossingTimeRef = useRef<number>(0);
  const cookStartTimeRef = useRef<number | null>(null);

  // Track isCooking state changes
  useEffect(() => {
    if (isCooking) {
      cookStartTimeRef.current = performance.now();
    } else {
      cookStartTimeRef.current = null;
    }
  }, [isCooking]);

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

  // Reset engine and local state when recipe changes
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

  // Ref to always access latest strand order in callbacks
  const strandOrderRef = useRef(strandOrder);
  useEffect(() => {
    strandOrderRef.current = strandOrder;
  }, [strandOrder]);

  const updateEngineState = useCallback(() => {
    setCrossings([...engine.crossings]);
    onStateUpdate();
  }, [engine, onStateUpdate]);

  // Handle a new crossing action
  const handleCrossing = useCallback((lane: number, isOver: boolean) => {
    const idxA = lane - 1;
    const idxB = lane;
    const currentOrder = strandOrderRef.current;
    const strandA = currentOrder[idxA] ?? idxA;
    const strandB = currentOrder[idxB] ?? idxB;

    // Swap in order
    setStrandOrder((prev) => {
      const next = [...prev];
      next[idxA] = strandB;
      next[idxB] = strandA;
      return next;
    });

    engine.applyBraidCrossing(lane, isOver, strandA, strandB, selectedAppliance, mergeNext);
    soundFx.playPluck(lane, isOver);
    lastCrossingTimeRef.current = performance.now();

    if (mergeNext) {
      setMergeNext(false);
    }
    onClearGhostCrossing?.();
    updateEngineState();
  }, [engine, selectedAppliance, mergeNext, onClearGhostCrossing, updateEngineState]);

  const handleUndo = useCallback(() => {
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
  }, [engine, numStrands, onClearGhostCrossing, updateEngineState]);

  const handleReset = useCallback(() => {
    engine.reset(numStrands);
    setStrandOrder(Array.from({ length: numStrands }, (_, i) => i));
    onClearGhostCrossing?.();
    updateEngineState();
  }, [engine, numStrands, onClearGhostCrossing, updateEngineState]);

  // Keyboard shortcut listener for instantaneous weaving
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;

      const key = e.key;

      // Undo: Ctrl+Z or standalone Z
      if ((e.ctrlKey || e.metaKey) && (key === 'z' || key === 'Z')) {
        e.preventDefault();
        handleUndo();
        return;
      }

      // Hotkeys for Tools
      if (key === 'q' || key === 'Q') { setSelectedAppliance('chop'); return; }
      if (key === 'w' || key === 'W') { setSelectedAppliance('blend'); return; }
      if (key === 'e' || key === 'E') { setSelectedAppliance('pan'); return; }
      if (key === 'r' || key === 'R') { setSelectedAppliance('wash'); return; }
      if (key === 't' || key === 'T') { setSelectedAppliance('boil'); return; }
      if (key === 'm' || key === 'M') { setMergeNext((prev) => !prev); return; }

      // Weaving Lane Numbers (Supports normal numbers and Shift symbols !, @, #, $)
      let targetLane: number | null = null;
      let isUnder = e.shiftKey;

      if (e.code === 'Digit1' || e.code === 'Numpad1' || key === '1' || key === '!') {
        targetLane = 1;
        if (key === '!') isUnder = true;
      } else if (e.code === 'Digit2' || e.code === 'Numpad2' || key === '2' || key === '@') {
        targetLane = 2;
        if (key === '@') isUnder = true;
      } else if (e.code === 'Digit3' || e.code === 'Numpad3' || key === '3' || key === '#') {
        targetLane = 3;
        if (key === '#') isUnder = true;
      } else if (e.code === 'Digit4' || e.code === 'Numpad4' || key === '4' || key === '$') {
        targetLane = 4;
        if (key === '$') isUnder = true;
      }

      if (targetLane !== null && targetLane >= 1 && targetLane < numStrands) {
        e.preventDefault();
        handleCrossing(targetLane, !isUnder);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [numStrands, handleCrossing, handleUndo]);

  // Continuous Dynamic Animation Loop (Smooth Weaving, Flowing Photons, & Fusion Untangle-and-Run)
  useEffect(() => {
    let animId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const now = performance.now();

      // Fusion Sequence Interpolation (1.2s total duration)
      let isCollapsing = false;
      let streamOffset = 0;   // X-shift speed toward right cooker
      let intakeFlash = 0;    // 0 -> 1 flash intensity at right terminal
      let spinIntensity = 0;  // 3D helical spin oscillation amplitude

      if (cookStartTimeRef.current !== null) {
        isCollapsing = true;
        const elapsed = now - cookStartTimeRef.current;
        const totalCookDuration = 1200;
        const cookProgress = Math.min(1, elapsed / totalCookDuration);

        // Exponential rightward stream rush (Braid moves and spins intact!)
        streamOffset = Math.pow(cookProgress, 1.7) * 1350;
        spinIntensity = Math.sin(cookProgress * Math.PI) * 14;
        intakeFlash = Math.sin(cookProgress * Math.PI) * 0.9;
      }

      // Logical display dimensions
      const displayWidth = Math.max(containerWidth, 120 + (crossings.length + (ghostCrossing ? 2 : 1)) * 90);
      const displayHeight = Math.max(220, (numStrands + 1) * 58);
      const dpr = typeof window !== 'undefined' ? Math.max(1, window.devicePixelRatio || 1) : 1;

      // Scale canvas buffer
      if (canvas.width !== Math.round(displayWidth * dpr) || canvas.height !== Math.round(displayHeight * dpr)) {
        canvas.width = Math.round(displayWidth * dpr);
        canvas.height = Math.round(displayHeight * dpr);
        canvas.style.width = `${displayWidth}px`;
        canvas.style.height = `${displayHeight}px`;
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const width = displayWidth;
      const height = displayHeight;
      const isLight = document.documentElement.classList.contains('light');

      ctx.clearRect(0, 0, width, height);

      // Matte dark background
      ctx.fillStyle = isLight ? '#ffffff' : '#161616';
      ctx.fillRect(0, 0, width, height);

      // Technical Drafting Grid
      ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.04)';
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
      ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.06)';
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

      const totalSteps = crossings.length + (ghostCrossing ? 1 : 0);
      const stepWidth = totalSteps > 0
        ? Math.max(85, Math.min(260, availableSpan / Math.max(totalSteps + 0.2, 2.5)))
        : 120;

      const posMap = Array.from({ length: numStrands }, (_, i) => i);

      // Helper function to calculate helical spin wave offset
      const getSpinY = (baseY: number, currentPixelX: number, strandId: number) => {
        if (spinIntensity <= 0) return baseY;
        const wave = Math.sin(now * 0.016 + currentPixelX * 0.035 + strandId * 2.1);
        return baseY + wave * spinIntensity;
      };

      // 1. Draw Sketched Ingredients at left dispenser positions
      posMap.forEach((laneIdx, strandId) => {
        const baseY = strandYPositions[laneIdx];
        const x = Math.min(endX, 30 + streamOffset * 0.85);
        const y = getSpinY(baseY, x, strandId);
        const ingKey = ingredientsList[strandId] || 'carrot';
        const ingInfo = INGREDIENTS[ingKey];
        const ingName = ingInfo?.name || ingKey;

        // Ingredient icon sketch
        if (x < endX) {
          drawIngredientSketch(ctx, ingKey, x, y, 18, false);

          // Ingredient Title & Lane Tag with clear vertical spacing
          ctx.fillStyle = isLight ? '#0f172a' : '#f4f4f4';
          ctx.font = 'bold 12px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
          ctx.fillText(`${ingName}`, x + 24, y - 4);

          ctx.fillStyle = isLight ? '#475569' : '#00f0ff';
          ctx.font = '600 10px monospace';
          ctx.fillText(`Lane #${laneIdx + 1}`, x + 24, y + 11);
        }

        // Connect dispenser to startX
        if (!isCollapsing || streamOffset < 10) {
          ctx.strokeStyle = strandColors[strandId];
          ctx.lineWidth = 4;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.beginPath();
          ctx.moveTo(x + 20, y);
          ctx.lineTo(startX, y);
          ctx.stroke();
        }
      });

      let currentX = startX;

      // Empty State Guidance Label
      if (crossings.length === 0 && !ghostCrossing && !isCollapsing) {
        ctx.fillStyle = isLight ? '#475569' : '#849495';
        ctx.font = '600 12px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('◄ SELECT A TOOL & WEAVE STRANDS TO BEGIN ►', width / 2, height / 2);
        ctx.textAlign = 'start';
      }

      // 2. Draw crossings left to right
      crossings.forEach((c, stepIdx) => {
        const isLatest = stepIdx === crossings.length - 1;
        // Smooth weave draw progress (0.0 -> 1.0 over 240ms)
        const weaveElapsed = now - lastCrossingTimeRef.current;
        const rawProgress = isLatest && weaveElapsed < 240 ? Math.min(1, weaveElapsed / 240) : 1;
        const weaveProgress = Math.sin((rawProgress * Math.PI) / 2); // smooth ease-out

        const baseNextX = currentX + stepWidth;
        const drawStartX = currentX + streamOffset;
        const drawNextX = currentX + stepWidth + streamOffset;
        const drawMidX = (drawStartX + drawNextX) / 2;

        const upperLane = c.lane - 1;
        const lowerLane = c.lane;
        const strandUpper = posMap.findIndex((p) => p === upperLane);
        const strandLower = posMap.findIndex((p) => p === lowerLane);

        // Step time index at top (hidden during stream)
        if (!isCollapsing && drawMidX < endX) {
          ctx.fillStyle = isLight ? '#475569' : '#be95ff';
          ctx.font = 'bold 11px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(`t${stepIdx + 1}`, drawMidX, 16);
          ctx.textAlign = 'start';
        }

        // Uninvolved strands continue straight with 100% unbroken continuity
        posMap.forEach((laneIdx, sId) => {
          if (sId !== strandUpper && sId !== strandLower) {
            const baseY = strandYPositions[laneIdx];
            const startY = getSpinY(baseY, drawStartX, sId);
            const endY = getSpinY(baseY, drawNextX, sId);

            if (drawStartX < endX + 30) {
              ctx.strokeStyle = strandColors[sId];
              ctx.lineWidth = isCollapsing ? 4.5 : 3.5;
              ctx.beginPath();
              ctx.moveTo(Math.max(30, drawStartX), startY);
              ctx.lineTo(Math.min(endX, drawNextX), endY);
              ctx.stroke();

              // Slicing tick marks if chopped
              if (c.appliance === 'chop' && !isCollapsing) {
                ctx.fillStyle = isLight ? '#161616' : '#ffffff';
                ctx.fillRect(drawMidX - 1, (startY + endY) / 2 - 4, 2, 8);
              }
            }
          }
        });

        // Dynamic lane Y transition (smoothly transitions from 0 to 1 over 260ms)
        const transitionFactor = isLatest ? weaveProgress : 1.0;

        // Spline coordinates with helical spin and smooth vertical transition
        const yUpperStart = strandYPositions[upperLane];
        const yLowerStart = strandYPositions[lowerLane];
        const yUpperTarget = strandYPositions[lowerLane];
        const yLowerTarget = strandYPositions[upperLane];

        const curEndUpperY = yUpperStart + (yUpperTarget - yUpperStart) * transitionFactor;
        const curEndLowerY = yLowerStart + (yLowerTarget - yLowerStart) * transitionFactor;

        const y1 = getSpinY(yUpperStart, drawStartX, strandUpper);
        const y2 = getSpinY(yLowerStart, drawStartX, strandLower);
        const nextY1 = getSpinY(curEndLowerY, drawNextX, strandLower);
        const nextY2 = getSpinY(curEndUpperY, drawNextX, strandUpper);

        const drawSpline = (startY: number, endY: number, color: string) => {
          if (drawStartX >= endX + 30) return;
          ctx.strokeStyle = color;
          ctx.lineWidth = isCollapsing ? 4.5 : 4;
          ctx.beginPath();
          ctx.moveTo(Math.max(30, drawStartX), startY);
          ctx.bezierCurveTo(drawMidX, startY, drawMidX, endY, Math.min(endX, drawNextX), endY);
          ctx.stroke();
        };

        const bridgeColor = isLight ? '#ffffff' : '#161616';

        if (c.isOver) {
          // Lower strand goes under (drawn first)
          drawSpline(y2, nextY1, strandColors[strandLower]);
          // Subtle bridge border for over strand (crisp Qiskit layering without gaping cuts)
          if (transitionFactor > 0.3) {
            ctx.strokeStyle = bridgeColor;
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.moveTo(drawStartX, y1);
            ctx.bezierCurveTo(drawMidX, y1, drawMidX, nextY2, drawNextX, nextY2);
            ctx.stroke();
          }
          // Upper strand goes over (drawn on top)
          drawSpline(y1, nextY2, strandColors[strandUpper]);
        } else {
          // Upper strand goes under (drawn first)
          drawSpline(y1, nextY2, strandColors[strandUpper]);
          // Subtle bridge border for over strand
          if (transitionFactor > 0.3) {
            ctx.strokeStyle = bridgeColor;
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.moveTo(drawStartX, y2);
            ctx.bezierCurveTo(drawMidX, y2, drawMidX, nextY1, drawNextX, nextY1);
            ctx.stroke();
          }
          // Lower strand goes over (drawn on top)
          drawSpline(y2, nextY1, strandColors[strandLower]);
        }

        posMap[strandUpper] = lowerLane;
        posMap[strandLower] = upperLane;
        currentX = baseNextX;
      });

      // 3. Draw remaining horizontal tails to right edge (lead into Fusion Reactor)
      // If the latest crossing is animating, the tail smoothly tracks the active transition
      const latestCrossing = crossings.length > 0 ? crossings[crossings.length - 1] : null;
      const latestElapsed = now - lastCrossingTimeRef.current;
      const latestRawP = latestElapsed < 260 ? Math.min(1, latestElapsed / 260) : 1;
      const latestProgress = Math.sin((latestRawP * Math.PI) / 2);

      posMap.forEach((laneIdx, strandId) => {
        let baseY = strandYPositions[laneIdx];

        // If this strand just swapped in the latest crossing and is still transitioning:
        if (latestCrossing && latestProgress < 1.0) {
          const upperLane = latestCrossing.lane - 1;
          const lowerLane = latestCrossing.lane;
          if (laneIdx === upperLane) {
            // Reached upper lane from lower lane
            const prevY = strandYPositions[lowerLane];
            baseY = prevY + (strandYPositions[upperLane] - prevY) * latestProgress;
          } else if (laneIdx === lowerLane) {
            // Reached lower lane from upper lane
            const prevY = strandYPositions[upperLane];
            baseY = prevY + (strandYPositions[lowerLane] - prevY) * latestProgress;
          }
        }

        const tailStartX = Math.min(endX, currentX + streamOffset);
        const tailStartY = getSpinY(baseY, tailStartX, strandId);
        const tailEndY = getSpinY(baseY, endX, strandId);

        if (tailStartX < endX) {
          ctx.strokeStyle = strandColors[strandId];
          ctx.lineWidth = isCollapsing ? 4.5 : 3.5;
          ctx.beginPath();
          ctx.moveTo(tailStartX, tailStartY);
          ctx.lineTo(endX, tailEndY);
          ctx.stroke();
        }

        // Live flowing quantum photon particles along each wire
        const photonSpeed = isCollapsing ? 0.0035 : 0.0006;
        const photonT = (now * photonSpeed + strandId * 0.33) % 1;
        const photonX = startX + (endX - startX) * photonT;
        const photonY = getSpinY(baseY, photonX, strandId);

        if (!isCollapsing && photonX >= startX && photonX <= endX) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = strandColors[strandId];
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(photonX, photonY, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Lead-in particle beads at right terminal
        ctx.fillStyle = strandColors[strandId];
        ctx.beginPath();
        ctx.arc(endX, tailEndY, isCollapsing ? 5.5 : 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = isLight ? '#161616' : '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Intake arrow chevron into reactor
        ctx.strokeStyle = isCollapsing ? '#00f0ff' : isLight ? '#007d79' : '#009d9a';
        ctx.lineWidth = isCollapsing ? 2.5 : 1.5;
        ctx.beginPath();
        ctx.moveTo(endX + 6, tailEndY - 4);
        ctx.lineTo(endX + 11, tailEndY);
        ctx.lineTo(endX + 6, tailEndY + 4);
        ctx.stroke();
      });

      // Intake Port Bracket on right
      ctx.strokeStyle = isCollapsing ? '#00f0ff' : isLight ? 'rgba(0, 125, 121, 0.4)' : 'rgba(0, 157, 154, 0.4)';
      ctx.lineWidth = isCollapsing ? 2.5 : 1.5;
      ctx.beginPath();
      ctx.moveTo(endX + 16, strandYPositions[0] - 12);
      ctx.lineTo(endX + 22, strandYPositions[0] - 12);
      ctx.lineTo(endX + 22, strandYPositions[strandYPositions.length - 1] + 12);
      ctx.lineTo(endX + 16, strandYPositions[strandYPositions.length - 1] + 12);
      ctx.stroke();

      // Right Intake Label
      ctx.fillStyle = isCollapsing ? '#00f0ff' : isLight ? '#007d79' : '#009d9a';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(isCollapsing ? '⚡ FUSING DISH ⇾' : 'TO COOKER ⇾', width - 14, 16);
      ctx.textAlign = 'start';

      // Reactor Flash Glow
      if (intakeFlash > 0) {
        ctx.fillStyle = `rgba(0, 240, 255, ${intakeFlash * 0.4})`;
        ctx.fillRect(endX - 20, 0, width - endX + 20, height);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [crossings, strandColors, numStrands, ingredientsList, containerWidth, ghostCrossing]);

  const umamiMultiplier = engine.getUmamiMultiplier();

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center rounded-xl border border-[#7b5d95]/40 bg-[#523e58]/25 p-3 sm:p-4 shadow-md backdrop-blur-md"
    >
      {/* Top HUD bar with Braid Formula & Minimal Toolbar */}
      <div className="flex w-full items-center justify-between border-b border-[#7b5d95]/35 pb-2.5 gap-2">
        <div className="flex items-center gap-2">
          <span className="font-label text-[11px] uppercase tracking-wider text-[#9d9be5]/70 hidden sm:inline">
            Braid Sequence:
          </span>
          <span className="font-label text-xs px-2.5 py-1 bg-[#523e58]/60 border border-[#7b5d95]/50 rounded text-[#9d9be5] tracking-wider font-bold">
            {engine.getBraidWord() || 'Start (Empty)'}
          </span>
          <span className="font-label text-[10px] text-[#9d9be5]/60 hidden md:inline">
            ({numStrands} Strands)
          </span>
        </div>

        {/* Live Umami Multiplier & Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded bg-[#523e58]/60 border border-[#9547a9]/40 px-2.5 py-1 text-xs font-label font-bold text-[#9d9be5]">
            <Flame className="h-3.5 w-3.5 text-[#9547a9]" />
            <span>{umamiMultiplier}x Umami</span>
          </div>

          <div className="flex items-center gap-1 bg-[#523e58]/60 border border-[#7b5d95]/50 p-0.5 rounded-lg">
            <button
              onClick={handleUndo}
              disabled={crossings.length === 0}
              className="px-2.5 py-1 rounded text-[#9d9be5] hover:text-white hover:bg-[#7b5d95]/50 transition-all flex items-center gap-1 font-label text-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-95"
              title="Undo Last Braid (Ctrl+Z)"
            >
              <Undo2 className="h-3.5 w-3.5" />
              <span>Undo</span>
            </button>
            <div className="h-3.5 w-[1px] bg-[#7b5d95]/40" />
            <button
              onClick={handleReset}
              disabled={crossings.length === 0}
              className="px-2.5 py-1 rounded text-[#9d9be5] hover:text-[#ffb4ab] hover:bg-[#7b5d95]/50 transition-all flex items-center gap-1 font-label text-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-95"
              title="Reset Canvas"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Pegboard Canvas - Horizontal Quantum Wire Loom */}
      <div
        ref={scrollContainerRef}
        className="relative my-2.5 flex justify-start w-full overflow-x-auto py-1 scroll-smooth quantum-grid-bg rounded-lg border border-[#7b5d95]/40"
      >
        <canvas
          ref={canvasRef}
          className="rounded-lg shrink-0 shadow-xs"
        />
      </div>

      {/* Floating Canvas Hint */}
      <div className="flex items-center justify-between w-full px-1 pt-1 pb-2 font-label text-[10px] text-[#9d9be5]/70 border-b border-[#7b5d95]/30">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9d9be5]" />
          <span>Click Over/Under buttons or press number keys (1, 2, 3) to weave strands</span>
        </div>
        <span className="text-[#9d9be5] font-bold">Total Crossings: {crossings.length}</span>
      </div>

      {/* Unified Action Deck: Station Tools + Mixer Merge + Lane Weave Controls in ONE grouped row */}
      <div className="flex flex-wrap items-center justify-between w-full px-3 py-2 rounded-lg border border-[#7b5d95]/40 bg-[#523e58]/35 text-xs gap-3 mt-2 shadow-xs">
        {/* Left Combined Cluster: Tools + Mixer Merge + Weave Operators */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="font-label text-[10px] text-[#9d9be5]/70 uppercase tracking-wider mr-0.5 hidden xl:inline">
              Tool:
            </span>
            {(
              [
                { id: 'chop', label: 'Chop', tooltip: 'Chop (Increases Sweetness)' },
                { id: 'blend', label: 'Blend', tooltip: 'Blend (Balances Flavors)' },
                { id: 'pan', label: 'Sear', tooltip: 'Sear (Adds Spice & Heat)' },
                { id: 'wash', label: 'Wash', tooltip: 'Wash (Purifies Mistakes)' },
                { id: 'boil', label: 'Boil', tooltip: 'Boil (Boosts Umami)' },
              ] as const
            ).map((app) => (
              <button
                key={app.id}
                type="button"
                onClick={() => setSelectedAppliance(app.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-label text-xs transition-all cursor-pointer ${
                  selectedAppliance === app.id
                    ? 'bg-[#423ea6] text-white shadow-xs font-bold ring-1 ring-[#9d9be5]/50'
                    : 'text-[#9d9be5]/80 hover:text-white hover:bg-[#7b5d95]/40'
                }`}
                title={app.tooltip}
              >
                <ApplianceIcon tool={app.id} className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">{app.label}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMergeNext(!mergeNext)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-label text-xs font-bold transition-all cursor-pointer shrink-0 ${
              mergeNext
                ? 'bg-[#9547a9] text-white shadow-xs ring-1 ring-[#9d9be5]'
                : 'border border-[#9547a9]/50 text-[#9d9be5] hover:bg-[#9547a9]/20'
            }`}
            title="Toggle line merger"
          >
            <Zap className="h-3 w-3" />
            <span>{mergeNext ? 'Merge ON' : 'Mixer Merge'}</span>
          </button>

          {/* Sleek Vertical Divider */}
          <div className="h-5 w-[1px] bg-[#7b5d95]/40" />

          {/* Weave Lane Operators right next to Mixer Merge */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-label text-[10px] text-[#9d9be5]/70 uppercase tracking-wider hidden sm:inline">
              Weave:
            </span>
            {Array.from({ length: numStrands - 1 }, (_, i) => {
              const laneNum = i + 1;
              const isOverRecommended = ghostCrossing?.lane === laneNum && ghostCrossing?.isOver === true;
              const isUnderRecommended = ghostCrossing?.lane === laneNum && ghostCrossing?.isOver === false;

              return (
                <div
                  key={`lane-ctrl-${laneNum}`}
                  className={`flex items-center gap-1.5 rounded-lg border p-1 px-2 shadow-xs transition-all ${
                    ghostCrossing?.lane === laneNum
                      ? 'border-[#9d9be5] ring-1 ring-[#9d9be5] bg-[#9d9be5]/15'
                      : 'border-[#7b5d95]/50 bg-[#523e58]/50'
                  }`}
                >
                  <span className="font-label text-xs font-bold text-[#f5f4ff] pr-0.5">
                    L{laneNum}
                  </span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => handleCrossing(laneNum, true)}
                      className={`h-6 px-2 rounded-md text-[11px] font-label font-bold cursor-pointer transition-all active:scale-95 flex items-center gap-0.5 ${
                        isOverRecommended
                          ? 'border border-[#9d9be5] bg-[#9d9be5] text-black shadow-xs font-black animate-pulse'
                          : 'border border-[#9d9be5]/40 bg-[#9d9be5]/10 text-[#9d9be5] hover:bg-[#9d9be5] hover:text-black'
                      }`}
                      title={`Weave lane ${laneNum} Over (σ${laneNum}) - Press key ${laneNum}`}
                    >
                      <span>▲</span>
                      <span>Over</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCrossing(laneNum, false)}
                      className={`h-6 px-2 rounded-md text-[11px] font-label font-bold cursor-pointer transition-all active:scale-95 flex items-center gap-0.5 ${
                        isUnderRecommended
                          ? 'border border-[#9547a9] bg-[#9547a9] text-white shadow-xs font-black animate-pulse'
                          : 'border border-[#9547a9]/40 bg-[#9547a9]/10 text-[#9547a9] hover:bg-[#9547a9] hover:text-white'
                      }`}
                      title={`Weave lane ${laneNum} Under (σ${laneNum}⁻¹) - Press Shift+${laneNum}`}
                    >
                      <span>▼</span>
                      <span>Under</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Status Tag */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#9d9be5]/70 hidden md:flex">
          <span>Keyboard: <kbd className="px-1.5 py-0.5 rounded bg-[#523e58]/60 border border-[#7b5d95]/50 text-[#9d9be5]">1</kbd> <kbd className="px-1.5 py-0.5 rounded bg-[#523e58]/60 border border-[#7b5d95]/50 text-[#9d9be5]">2</kbd> (Over) • <kbd className="px-1.5 py-0.5 rounded bg-[#523e58]/60 border border-[#7b5d95]/50 text-[#9d9be5]">Shift+1</kbd> (Under)</span>
        </div>
      </div>
    </div>
  );
}
