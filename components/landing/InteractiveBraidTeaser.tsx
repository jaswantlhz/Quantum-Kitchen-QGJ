'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { soundFx } from '@/lib/audio/synthAudio';
import { Sparkles, ArrowRight, RotateCcw, Play, Zap } from 'lucide-react';

interface MiniCrossing {
  lane: number;
  isOver: boolean;
}

export function InteractiveBraidTeaser() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [crossings, setCrossings] = useState<MiniCrossing[]>([
    { lane: 1, isOver: true },
    { lane: 2, isOver: false },
    { lane: 1, isOver: false },
  ]);

  const strandColors = ['#ff832b', '#00f0ff', '#be95ff'];
  const strandLabels = ['Solar Carrot (τ₁)', 'Quantum Brioche (τ₂)', 'Plasma Tomato (τ₃)'];

  const addCrossing = (lane: number, isOver: boolean) => {
    if (crossings.length >= 7) return;
    soundFx.playPluck(lane, isOver);
    setCrossings((prev) => [...prev, { lane, isOver }]);
  };

  const handleReset = () => {
    soundFx.playPluck(1, true);
    setCrossings([]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const now = performance.now();

      ctx.clearRect(0, 0, width, height);

      // Background
      ctx.fillStyle = '#101326';
      ctx.fillRect(0, 0, width, height);

      // Grid guides
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      const numStrands = 3;
      const laneHeight = height / (numStrands + 1);
      const strandYPositions = [laneHeight * 1, laneHeight * 2, laneHeight * 3];

      // Faint horizontal wire tracks
      ctx.setLineDash([3, 4]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      strandYPositions.forEach((y) => {
        ctx.beginPath();
        ctx.moveTo(20, y);
        ctx.lineTo(width - 20, y);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      const startX = 45;
      const endX = width - 40;
      const availableSpan = endX - startX;
      const stepWidth = crossings.length > 0
        ? Math.max(55, Math.min(100, availableSpan / Math.max(crossings.length + 0.5, 3)))
        : 80;

      const posMap = [0, 1, 2];

      // 1. Draw left start leads
      posMap.forEach((laneIdx, strandId) => {
        const y = strandYPositions[laneIdx];
        ctx.strokeStyle = strandColors[strandId];
        ctx.lineWidth = 3.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(15, y);
        ctx.lineTo(startX, y);
        ctx.stroke();

        // Left bead
        ctx.fillStyle = strandColors[strandId];
        ctx.beginPath();
        ctx.arc(15, y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      let currentX = startX;

      // 2. Draw crossings
      crossings.forEach((c) => {
        const nextX = currentX + stepWidth;
        const midX = (currentX + nextX) / 2;
        const upperLane = c.lane - 1;
        const lowerLane = c.lane;
        const strandUpper = posMap.findIndex((p) => p === upperLane);
        const strandLower = posMap.findIndex((p) => p === lowerLane);

        // Straight strand
        posMap.forEach((laneIdx, sId) => {
          if (sId !== strandUpper && sId !== strandLower) {
            const y = strandYPositions[laneIdx];
            ctx.strokeStyle = strandColors[sId];
            ctx.lineWidth = 3.5;
            ctx.beginPath();
            ctx.moveTo(currentX, y);
            ctx.lineTo(nextX, y);
            ctx.stroke();
          }
        });

        const y1 = strandYPositions[upperLane];
        const y2 = strandYPositions[lowerLane];

        const drawSpline = (startY: number, endY: number, color: string) => {
          ctx.strokeStyle = color;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(currentX, startY);
          ctx.bezierCurveTo(midX, startY, midX, endY, nextX, endY);
          ctx.stroke();
        };

        if (c.isOver) {
          drawSpline(y2, y1, strandColors[strandLower]);
          ctx.strokeStyle = '#101326';
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.moveTo(currentX, y1);
          ctx.bezierCurveTo(midX, y1, midX, y2, nextX, y2);
          ctx.stroke();
          drawSpline(y1, y2, strandColors[strandUpper]);
        } else {
          drawSpline(y1, y2, strandColors[strandUpper]);
          ctx.strokeStyle = '#101326';
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.moveTo(currentX, y2);
          ctx.bezierCurveTo(midX, y2, midX, y1, nextX, y1);
          ctx.stroke();
          drawSpline(y2, y1, strandColors[strandLower]);
        }

        posMap[strandUpper] = lowerLane;
        posMap[strandLower] = upperLane;
        currentX = nextX;
      });

      // 3. Draw tails to right edge
      posMap.forEach((laneIdx, strandId) => {
        const y = strandYPositions[laneIdx];
        if (currentX < endX) {
          ctx.strokeStyle = strandColors[strandId];
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.moveTo(currentX, y);
          ctx.lineTo(endX, y);
          ctx.stroke();
        }

        // Live photon particle along wire
        const photonT = (now * 0.0008 + strandId * 0.33) % 1;
        const photonX = startX + (endX - startX) * photonT;
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = strandColors[strandId];
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(photonX, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Terminal bead
        ctx.fillStyle = strandColors[strandId];
        ctx.beginPath();
        ctx.arc(endX, y, 4.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [crossings]);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#181d3d]/90 to-[#0e1022]/90 border-2 border-[#8a3ffc]/50 p-5 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#8a3ffc]/20 border border-[#be95ff]/40 text-[11px] font-mono font-bold text-[#be95ff]">
            <Sparkles className="h-3 w-3" />
            <span>LIVE INTERACTIVE PREVIEW</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Try Weaving Quantum Anyons
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            title="Reset Preview"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
          <Link href="/play" onClick={() => soundFx.playBell()}>
            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#be95ff] to-[#00f0ff] hover:from-[#cdaaff] hover:to-[#26f5ff] text-[#0d0922] font-extrabold text-xs tracking-wider uppercase transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-md">
              <Play className="h-3 w-3 fill-[#0d0922]" />
              <span>Full Kitchen</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Canvas Teaser Container */}
      <div className="relative rounded-2xl overflow-hidden border border-[#3b2e75] bg-[#101326] shadow-inner">
        <canvas
          ref={canvasRef}
          width={700}
          height={180}
          className="w-full h-[140px] sm:h-[180px] block"
        />

        {/* Floating Strand Tags */}
        <div className="absolute top-2 left-3 flex gap-2 sm:gap-3 pointer-events-none">
          {strandLabels.map((lbl, idx) => (
            <span
              key={idx}
              className="text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#181d3d]/80 border border-white/10 shadow-xs"
              style={{ color: strandColors[idx] }}
            >
              {lbl}
            </span>
          ))}
        </div>
      </div>

      {/* Interactive Crossing Buttons */}
      <div className="space-y-2">
        <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest text-center">
          Click operators to weave braids:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => addCrossing(1, true)}
            className="px-3 py-2.5 rounded-xl bg-[#241b4e] hover:bg-[#34246e] border border-[#be95ff]/40 text-white font-mono text-xs font-bold transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Zap className="h-3.5 w-3.5 text-[#ff832b]" />
            <span>σ₁ Over (1⇌2)</span>
          </button>
          <button
            onClick={() => addCrossing(1, false)}
            className="px-3 py-2.5 rounded-xl bg-[#241b4e] hover:bg-[#34246e] border border-[#be95ff]/40 text-white font-mono text-xs font-bold transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Zap className="h-3.5 w-3.5 text-[#00f0ff]" />
            <span>σ₁ Under (1⇌2)</span>
          </button>
          <button
            onClick={() => addCrossing(2, true)}
            className="px-3 py-2.5 rounded-xl bg-[#241b4e] hover:bg-[#34246e] border border-[#be95ff]/40 text-white font-mono text-xs font-bold transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Zap className="h-3.5 w-3.5 text-[#be95ff]" />
            <span>σ₂ Over (2⇌3)</span>
          </button>
          <button
            onClick={() => addCrossing(2, false)}
            className="px-3 py-2.5 rounded-xl bg-[#241b4e] hover:bg-[#34246e] border border-[#be95ff]/40 text-white font-mono text-xs font-bold transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Zap className="h-3.5 w-3.5 text-[#f1c21b]" />
            <span>σ₂ Under (2⇌3)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
