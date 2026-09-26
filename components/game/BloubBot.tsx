'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { BloubExpressionId } from '@/lib/quantum/bloubAdvisorEngine';

export const BLOUB_EXPRESSION_FILES: Record<BloubExpressionId, string> = {
  attentif: '/bloub_svg/bloub-cercle-attentif-violet-anime.svg',
  confus: '/bloub_svg/bloub-cercle-confus-violet-anime.svg',
  curieux: '/bloub_svg/bloub-cercle-curieux-violet-anime.svg',
  excite: '/bloub_svg/bloub-cercle-excite-violet-anime.svg',
  mefiant: '/bloub_svg/bloub-cercle-mefiant-violet-anime.svg',
  neutre: '/bloub_svg/bloub-cercle-neutre-violet-anime.svg',
  surpris: '/bloub_svg/bloub-cercle-surpris-violet-anime.svg',
  timide: '/bloub_svg/bloub-cercle-timide-violet-anime.svg',
};

interface BloubBotProps {
  size?: number;
  followCursor?: boolean;
  className?: string;
  expression?: BloubExpressionId;
  src?: string;
}

export function BloubBot({
  size = 140,
  followCursor = true,
  className = '',
  expression = 'neutre',
  src,
}: BloubBotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Mouse cursor 3D perspective tracking
  useEffect(() => {
    if (!followCursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)));

      setTilt({
        x: -ny * 10,
        y: nx * 12,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [followCursor]);

  // Composite 3D transform with subtle hover tilt
  const transformStyle = useMemo(() => {
    return `perspective(600px) rotateX(${tilt.x.toFixed(1)}deg) rotateY(${tilt.y.toFixed(1)}deg)`;
  }, [tilt]);

  const activeSrc = src || BLOUB_EXPRESSION_FILES[expression] || BLOUB_EXPRESSION_FILES.neutre;

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none transition-transform duration-150 ease-out ${className}`}
      style={{
        width: size,
        height: size,
        transform: transformStyle,
        transformOrigin: 'center center',
      }}
    >
      {/* The Authentic Expressive Bloub Mascot (SVG with Transparent Background) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={activeSrc}
        src={activeSrc}
        alt={`Bloub Mascot (${expression})`}
        width={size}
        height={size}
        draggable={false}
        className="w-full h-full object-contain pointer-events-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] transition-opacity duration-300"
      />
    </div>
  );
}
