'use client';

import gsap from 'gsap';

/**
 * Animate a modal dialog in with a snappy spring, 3D tilt perspective, and backdrop blur
 */
export function animateModalIn(
  dialogElement: HTMLElement | null,
  backdropElement?: HTMLElement | null,
  onComplete?: () => void
) {
  if (!dialogElement) return;

  const tl = gsap.timeline({ onComplete });

  if (backdropElement) {
    tl.fromTo(
      backdropElement,
      { opacity: 0, backdropFilter: 'blur(0px)' },
      { opacity: 1, backdropFilter: 'blur(8px)', duration: 0.35, ease: 'power2.out' },
      0
    );
  }

  tl.fromTo(
    dialogElement,
    {
      opacity: 0,
      scale: 0.82,
      y: 40,
      rotateX: -12,
      transformPerspective: 800,
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      duration: 0.45,
      ease: 'back.out(1.4)',
    },
    0.05
  );

  return tl;
}

/**
 * Animate a modal dialog out smoothly
 */
export function animateModalOut(
  dialogElement: HTMLElement | null,
  backdropElement?: HTMLElement | null,
  onComplete?: () => void
) {
  if (!dialogElement) {
    onComplete?.();
    return;
  }

  const tl = gsap.timeline({ onComplete });

  tl.to(
    dialogElement,
    {
      opacity: 0,
      scale: 0.88,
      y: 20,
      rotateX: 8,
      duration: 0.25,
      ease: 'power2.in',
    },
    0
  );

  if (backdropElement) {
    tl.to(
      backdropElement,
      {
        opacity: 0,
        backdropFilter: 'blur(0px)',
        duration: 0.25,
        ease: 'power2.in',
      },
      0
    );
  }

  return tl;
}

/**
 * Stagger reveal a list of card items with vertical slide & 3D rotation
 */
export function animateCardsStagger(
  cardElements: (HTMLElement | null)[],
  staggerDelay = 0.08
) {
  const validElements = cardElements.filter(Boolean);
  if (validElements.length === 0) return;

  return gsap.fromTo(
    validElements,
    {
      opacity: 0,
      y: 35,
      scale: 0.95,
      rotateY: -6,
      transformPerspective: 600,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      duration: 0.5,
      stagger: staggerDelay,
      ease: 'power3.out',
    }
  );
}

/**
 * Animate number counting up (for scores, credits, fidelity)
 */
export function animateNumberCounter(
  target: { val: number },
  endVal: number,
  onUpdate: (currentVal: number) => void,
  duration = 1.0
) {
  return gsap.to(target, {
    val: endVal,
    duration,
    ease: 'power2.out',
    onUpdate: () => onUpdate(Math.round(target.val)),
  });
}
