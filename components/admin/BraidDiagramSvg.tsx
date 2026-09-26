'use client';

import React from 'react';
import { BraidCrossing } from '@/lib/quantum/braidTypes';

interface BraidDiagramSvgProps {
  crossings: BraidCrossing[];
  strandCount?: number;
  width?: number;
  height?: number;
  strandColors?: string[];
}

const DEFAULT_STRAND_COLORS = [
  '#ff6b35', // Carrot (Orange)
  '#2ec4b6', // Lettuce (Cyan/Emerald)
  '#e63946', // Tomato (Red)
  '#f3c053', // Bread (Gold)
  '#70e000', // Pepper (Lime)
  '#a855f7', // Purple
  '#d00000', // Paprika (Crimson)
];

export function BraidDiagramSvg({
  crossings,
  strandCount,
  width = 360,
  height = 260,
  strandColors = DEFAULT_STRAND_COLORS,
}: BraidDiagramSvgProps) {
  const maxLaneInCrossings = crossings.reduce((max, c) => Math.max(max, c.lane + 1), 0);
  const numStrands = Math.max(strandCount || 3, maxLaneInCrossings, 2);
  const laneWidth = width / (numStrands + 1);
  const strandX = Array.from({ length: numStrands }, (_, i) => laneWidth * (i + 1));

  const totalSteps = Math.max(crossings.length, 1);
  const stepHeight = Math.min(60, (height - 60) / (totalSteps + 1));

  const posMap = Array.from({ length: numStrands }, (_, i) => i);
  let currentY = 30;

  // Generate paths
  const paths: React.ReactNode[] = [];

  crossings.forEach((c, idx) => {
    const nextY = currentY + stepHeight;
    const leftLane = c.lane - 1;
    const rightLane = c.lane;

    const sLeft = posMap.findIndex((p) => p === leftLane);
    const sRight = posMap.findIndex((p) => p === rightLane);

    // Uninvolved strands
    posMap.forEach((laneIdx, sId) => {
      if (sId !== sLeft && sId !== sRight) {
        paths.push(
          <line
            key={`straight-${idx}-${sId}`}
            x1={strandX[laneIdx]}
            y1={currentY}
            x2={strandX[laneIdx]}
            y2={nextY}
            stroke={strandColors[sId % strandColors.length]}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        );
      }
    });

    if (leftLane < strandX.length && rightLane < strandX.length && sLeft !== -1 && sRight !== -1) {
      const x1 = strandX[leftLane];
      const x2 = strandX[rightLane];
      const midY = (currentY + nextY) / 2;

      const pathLeftToRight = `M ${x1} ${currentY} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${nextY}`;
      const pathRightToLeft = `M ${x2} ${currentY} C ${x2} ${midY}, ${x1} ${midY}, ${x1} ${nextY}`;

      if (c.isOver) {
        // Right to left (under)
        paths.push(
          <path
            key={`under-${idx}`}
            d={pathRightToLeft}
            stroke={strandColors[sRight % strandColors.length]}
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
        );
        // Gap bridge
        paths.push(
          <path
            key={`bridge-${idx}`}
            d={pathLeftToRight}
            stroke="var(--canvas-bg, #090d16)"
            strokeWidth="8"
            fill="none"
          />
        );
        // Left to right (over)
        paths.push(
          <path
            key={`over-${idx}`}
            d={pathLeftToRight}
            stroke={strandColors[sLeft % strandColors.length]}
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
        );
      } else {
        // Left to right (under)
        paths.push(
          <path
            key={`under-${idx}`}
            d={pathLeftToRight}
            stroke={strandColors[sLeft % strandColors.length]}
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
        );
        // Gap bridge
        paths.push(
          <path
            key={`bridge-${idx}`}
            d={pathRightToLeft}
            stroke="var(--canvas-bg, #090d16)"
            strokeWidth="8"
            fill="none"
          />
        );
        // Right to left (over)
        paths.push(
          <path
            key={`over-${idx}`}
            d={pathRightToLeft}
            stroke={strandColors[sRight % strandColors.length]}
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
        );
      }

      posMap[sLeft] = rightLane;
      posMap[sRight] = leftLane;
    }
    currentY = nextY;
  });

  // Finish tails
  posMap.forEach((laneIdx, sId) => {
    paths.push(
      <line
        key={`tail-${sId}`}
        x1={strandX[laneIdx]}
        y1={currentY}
        x2={strandX[laneIdx]}
        y2={height - 25}
        stroke={strandColors[sId % strandColors.length]}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    );
  });

  return (
    <svg
      id="scientist-braid-svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#070a12] shadow-inner"
    >
      {/* Top particle terminals */}
      {strandX.map((x, i) => (
        <g key={`head-${i}`}>
          <circle cx={x} cy={20} r={6} fill={strandColors[i % strandColors.length]} />
          <circle cx={x} cy={20} r={9} stroke="#fff" strokeWidth={1} fill="none" opacity={0.6} />
        </g>
      ))}

      {/* Generated Braid paths */}
      {paths}

      {/* Bottom particle terminals */}
      {posMap.map((laneIdx, sId) => (
        <circle
          key={`foot-${sId}`}
          cx={strandX[laneIdx]}
          cy={height - 20}
          r={5}
          fill={strandColors[sId % strandColors.length]}
        />
      ))}
    </svg>
  );
}
