'use client';

import React from 'react';
import {
  Scissors,
  Disc3,
  Flame,
  Droplets,
  CookingPot,
  Wheat,
  Cake,
  Layers,
  Soup,
  Salad,
  Snowflake,
  Magnet,
  Sparkles,
  Scan,
  Coins,
  LucideProps,
} from 'lucide-react';

export type DishIconType =
  | 'bruschetta'
  | 'wheat'
  | 'souffle'
  | 'cake'
  | 'sandwich'
  | 'layers'
  | 'soup'
  | 'ramen'
  | 'salad'
  | string;

export function DishIcon({
  name,
  className = 'w-6 h-6',
  ...props
}: { name: DishIconType; className?: string } & LucideProps) {
  const iconKey = name.toLowerCase();

  if (iconKey.includes('bruschetta') || iconKey.includes('wheat') || iconKey.includes('🥖')) {
    return <Wheat className={`${className} text-[#9d9be5] drop-shadow-[0_0_8px_rgba(157,155,229,0.4)]`} {...props} />;
  }
  if (iconKey.includes('souffle') || iconKey.includes('cake') || iconKey.includes('🧁')) {
    return <Cake className={`${className} text-[#9547a9] drop-shadow-[0_0_8px_rgba(149,71,169,0.4)]`} {...props} />;
  }
  if (iconKey.includes('sandwich') || iconKey.includes('layers') || iconKey.includes('🥪')) {
    return <Layers className={`${className} text-[#9d9be5] drop-shadow-[0_0_8px_rgba(157,155,229,0.4)]`} {...props} />;
  }
  if (iconKey.includes('soup') || iconKey.includes('ramen') || iconKey.includes('🥣') || iconKey.includes('🍲')) {
    return <Soup className={`${className} text-[#9547a9] drop-shadow-[0_0_8px_rgba(149,71,169,0.4)]`} {...props} />;
  }
  if (iconKey.includes('salad') || iconKey.includes('🥗')) {
    return <Salad className={`${className} text-[#9d9be5] drop-shadow-[0_0_8px_rgba(157,155,229,0.4)]`} {...props} />;
  }

  return <CookingPot className={`${className} text-[#9d9be5]`} {...props} />;
}

export type ApplianceToolType = 'chop' | 'blend' | 'pan' | 'wash' | 'boil' | string;

export function ApplianceIcon({
  tool,
  className = 'w-3.5 h-3.5',
  ...props
}: { tool: ApplianceToolType; className?: string } & LucideProps) {
  switch (tool) {
    case 'chop':
      return <Scissors className={`${className} text-[#9d9be5]`} {...props} />;
    case 'blend':
      return <Disc3 className={`${className} text-[#9547a9]`} {...props} />;
    case 'pan':
      return <Flame className={`${className} text-[#9547a9]`} {...props} />;
    case 'wash':
      return <Droplets className={`${className} text-[#9d9be5]`} {...props} />;
    case 'boil':
      return <CookingPot className={`${className} text-[#7b5d95]`} {...props} />;
    default:
      return <Sparkles className={`${className} text-[#9d9be5]`} {...props} />;
  }
}

export type UpgradeIconType =
  | 'cryo-stabilizer'
  | 'flux-pin'
  | 'harmonic-whisk'
  | 'holo-guide'
  | 'snowflake'
  | 'magnet'
  | 'sparkles'
  | 'scan'
  | string;

export function UpgradeIcon({
  name,
  className = 'w-5 h-5',
  ...props
}: { name: UpgradeIconType; className?: string } & LucideProps) {
  const key = name.toLowerCase();

  if (key.includes('cryo') || key.includes('snowflake') || key.includes('❄️')) {
    return <Snowflake className={`${className} text-[#9d9be5] drop-shadow-[0_0_6px_rgba(157,155,229,0.4)]`} {...props} />;
  }
  if (key.includes('flux') || key.includes('magnet') || key.includes('🧲')) {
    return <Magnet className={`${className} text-[#9547a9] drop-shadow-[0_0_6px_rgba(149,71,169,0.4)]`} {...props} />;
  }
  if (key.includes('whisk') || key.includes('sparkles') || key.includes('✨')) {
    return <Sparkles className={`${className} text-[#9d9be5] drop-shadow-[0_0_6px_rgba(157,155,229,0.4)]`} {...props} />;
  }
  if (key.includes('guide') || key.includes('scan') || key.includes('holo') || key.includes('👁️')) {
    return <Scan className={`${className} text-[#9547a9] drop-shadow-[0_0_6px_rgba(149,71,169,0.4)]`} {...props} />;
  }

  return <Sparkles className={`${className} text-[#9d9be5]`} {...props} />;
}

export function QCreditIcon({ className = 'w-3.5 h-3.5', ...props }: { className?: string } & LucideProps) {
  return <Coins className={`${className} text-[#9d9be5] drop-shadow-[0_0_6px_rgba(157,155,229,0.3)]`} {...props} />;
}
