'use client';

import React from 'react';
import { BraidCrossing } from '@/lib/quantum/braidTypes';

interface BraidDiagramSvgProps {
  crossings: BraidCrossing[];
  strandCount?: number;
  width?: number;
  height?: number;
  strandColors?: string[];
  orientation?: 'horizontal' | 'vertical';
}

const DEFAULT_STRAND_COLORS = [
  '#ff832b', // Carbon Orange 40 (Carrot)
  '#8a3ffc', // Qiskit Purple 60 (Potato)
  '#009d9a', // Quantum Gate Teal 50 (Lettuce)
  '#ee5396', // Qiskit Magenta 50 (Tomato)
  '#24a148', // Carbon Green 50 (Pepper)
  '#da1e28', // Carbon Red 60 (Paprika)
  '#f1c21b', // Carbon Gold / Yellow 30 (Bread)
];

export function BraidDiagramSvg({
  crossings,
  strandCount,
  width = 440,
  height = 240,
  strandColors = DEFAULT_STRAND_COLORS,
  orientation = 'horizontal',
}: BraidDiagramSvgProps) {
  const maxLaneInCrossings = crossings.reduce((max, c) => Math.max(max, c.lane + 1), 0);
  const numStrands = Math.max(strandCount || 3, maxLaneInCrossings, 2);

  // ==========================================
  // HORIZONTAL ORIENTATION (Left -> Right Time Flow)
  // ==========================================
  if (orientation === 'horizontal') {
    const laneHeight = height / (numStrands + 1);
    const strandY = Array.from({ length: numStrands }, (_, i) => laneHeight * (i + 1));
    const totalSteps = Math.max(crossings.length, 1);
    const stepWidth = Math.min(65, (width - 70) / (totalSteps + 1));

    const posMap = Array.from({ length: numStrands }, (_, i) => i);
    let currentX = 35;

    const paths: React.ReactNode[] = [];

    crossings.forEach((c, idx) => {
      const nextX = currentX + stepWidth;
      const upperLane = c.lane - 1;
      const lowerLane = c.lane;

      const sUpper = posMap.findIndex((p) => p === upperLane);
      const sLower = posMap.findIndex((p) => p === lowerLane);

      // Uninvolved strands
      posMap.forEach((laneIdx, sId) => {
        if (sId !== sUpper && sId !== sLower) {
          paths.push(
            <line
              key={`h-straight-${idx}-${sId}`}
              x1={currentX}
              y1={strandY[laneIdx]}
              x2={nextX}
              y2={strandY[laneIdx]}
              stroke={strandColors[sId % strandColors.length]}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          );
        }
      });

      if (upperLane < strandY.length && lowerLane < strandY.length && sUpper !== -1 && sLower !== -1) {
        const y1 = strandY[upperLane];
        const y2 = strandY[lowerLane];
        const midX = (currentX + nextX) / 2;

        const pathUpperToLower = `M ${currentX} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${nextX} ${y2}`;
        const pathLowerToUpper = `M ${currentX} ${y2} C ${midX} ${y2}, ${midX} ${y1}, ${nextX} ${y1}`;

        if (c.isOver) {
          // Lower to upper (under)
          paths.push(
            <path
              key={`h-under-${idx}`}
              d={pathLowerToUpper}
              stroke={strandColors[sLower % strandColors.length]}
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
          );
          // Bridge gap cutout
          paths.push(
            <path
              key={`h-bridge-${idx}`}
              d={pathUpperToLower}
              stroke="var(--canvas-bg, #161616)"
              strokeWidth="8"
              fill="none"
            />
          );
          // Upper to lower (over)
          paths.push(
            <path
              key={`h-over-${idx}`}
              d={pathUpperToLower}
              stroke={strandColors[sUpper % strandColors.length]}
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
          );
        } else {
          // Upper to lower (under)
          paths.push(
            <path
              key={`h-under-${idx}`}
              d={pathUpperToLower}
              stroke={strandColors[sUpper % strandColors.length]}
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
          );
          // Bridge gap cutout
          paths.push(
            <path
              key={`h-bridge-${idx}`}
              d={pathLowerToUpper}
              stroke="var(--canvas-bg, #161616)"
              strokeWidth="8"
              fill="none"
            />
          );
          // Lower to upper (over)
          paths.push(
            <path
              key={`h-over-${idx}`}
              d={pathLowerToUpper}
              stroke={strandColors[sLower % strandColors.length]}
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
          );
        }

        // Composite merge pin
        if (c.isMerged) {
          paths.push(
            <circle
              key={`h-merge-${idx}`}
              cx={midX}
              cy={(y1 + y2) / 2}
              r={5}
              fill="#f1c21b"
              stroke="#ffffff"
              strokeWidth={1.5}
            />
          );
        }

        posMap[sUpper] = lowerLane;
        posMap[sLower] = upperLane;
      }
      currentX = nextX;
    });

    // Finish horizontal tails to right edge
    posMap.forEach((laneIdx, sId) => {
      paths.push(
        <line
          key={`h-tail-${sId}`}
          x1={currentX}
          y1={strandY[laneIdx]}
          x2={width - 25}
          y2={strandY[laneIdx]}
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
        className="rounded-lg border border-[#333333] bg-[#161616]"
      >
        {/* Faint rail guides */}
        {strandY.map((y, i) => (
          <line
            key={`guide-${i}`}
            x1={30}
            y1={y}
            x2={width - 25}
            y2={y}
            stroke="rgba(255, 255, 255, 0.07)"
            strokeDasharray="3 4"
            strokeWidth={1}
          />
        ))}

        {/* Left input terminals */}
        {strandY.map((y, i) => (
          <g key={`head-${i}`}>
            <circle cx={20} cy={y} r={6} fill={strandColors[i % strandColors.length]} />
            <circle cx={20} cy={y} r={9} stroke="#fff" strokeWidth={1} fill="none" opacity={0.6} />
          </g>
        ))}

        {/* Generated Braid paths */}
        {paths}

        {/* Right output terminals */}
        {posMap.map((laneIdx, sId) => (
          <circle
            key={`foot-${sId}`}
            cx={width - 20}
            cy={strandY[laneIdx]}
            r={5}
            fill={strandColors[sId % strandColors.length]}
          />
        ))}
      </svg>
    );
  }

  // ==========================================
  // VERTICAL ORIENTATION (Legacy / Top -> Down)
  // ==========================================
  const laneWidth = width / (numStrands + 1);
  const strandX = Array.from({ length: numStrands }, (_, i) => laneWidth * (i + 1));
  const totalSteps = Math.max(crossings.length, 1);
  const stepHeight = Math.min(60, (height - 60) / (totalSteps + 1));

  const posMap = Array.from({ length: numStrands }, (_, i) => i);
  let currentY = 30;

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
        paths.push(
          <path
            key={`bridge-${idx}`}
            d={pathLeftToRight}
            stroke="var(--canvas-bg, #161616)"
            strokeWidth="8"
            fill="none"
          />
        );
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
        paths.push(
          <path
            key={`bridge-${idx}`}
            d={pathRightToLeft}
            stroke="var(--canvas-bg, #161616)"
            strokeWidth="8"
            fill="none"
          />
        );
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
      className="rounded-lg border border-[#333333] bg-[#161616]"
    >
      {strandX.map((x, i) => (
        <g key={`head-${i}`}>
          <circle cx={x} cy={20} r={6} fill={strandColors[i % strandColors.length]} />
          <circle cx={x} cy={20} r={9} stroke="#fff" strokeWidth={1} fill="none" opacity={0.6} />
        </g>
      ))}
      {paths}
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
