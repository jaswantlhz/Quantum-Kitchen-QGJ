'use client';

import React from 'react';
import { KitchenUpgrade } from '@/lib/game/upgrades';

interface StabilizerShopProps {
  upgrades: KitchenUpgrade[];
  credits: number;
  onBuyUpgrade: (upgradeId: string) => void;
}

export function StabilizerShop({ upgrades, credits, onBuyUpgrade }: StabilizerShopProps) {
  return (
    <div className="bg-[#523e58]/25 border border-[#7b5d95]/40 rounded-xl p-3.5 sm:p-4 shadow-md backdrop-blur-md">
      {/* Title Bar */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#7b5d95]/35">
        <div className="flex items-center gap-2">
          <span className="font-label text-xs uppercase tracking-wider text-[#9d9be5] font-bold">
            Kitchen Upgrades
          </span>
          <span className="text-[#7b5d95] text-xs">•</span>
          <span className="font-label text-xs text-[#9d9be5]/80">
            Permanent Cooking Boosts
          </span>
        </div>
        <span className="font-label text-[11px] text-[#9d9be5]/70 hidden sm:inline">
          Invest Q-Credits to improve yields
        </span>
      </div>

      {/* Upgrade Cards Horizontal Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {upgrades.map((u, i) => {
          const isMaxed = u.level >= u.maxLevel;
          const canAfford = credits >= u.cost && !isMaxed;
          const pipColors = ['#9d9be5', '#9547a9', '#423ea6', '#7b5d95'];
          const activePipColor = pipColors[i % pipColors.length];

          return (
            <div
              key={u.id}
              className="bg-[#523e58]/40 border border-[#7b5d95]/40 hover:border-[#9d9be5]/60 transition-all rounded-lg p-2.5 flex items-center justify-between group shadow-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-1">
                <div className="w-9 h-9 rounded-lg bg-[#523e58]/70 border border-[#7b5d95]/50 flex items-center justify-center text-lg shrink-0">
                  {u.icon}
                </div>
                <div className="min-w-0">
                  <div className="font-label text-xs font-semibold text-[#f5f4ff] truncate">
                    {u.name}
                  </div>
                  {/* Level pip indicators */}
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: u.maxLevel }, (_, lvl) => (
                      <span
                        key={lvl}
                        className="w-2.5 h-1 rounded-xs"
                        style={{
                          backgroundColor: lvl < u.level ? activePipColor : 'rgba(123, 93, 149, 0.4)',
                        }}
                      />
                    ))}
                    <span className="font-label text-[10px] text-[#9d9be5]/70 ml-1">
                      {isMaxed ? 'MAX' : `Lv. ${u.level}/${u.maxLevel}`}
                    </span>
                  </div>
                </div>
              </div>

              <button
                disabled={!canAfford || isMaxed}
                onClick={() => onBuyUpgrade(u.id)}
                className={`px-3 py-1.5 rounded-lg font-label text-xs font-semibold transition-all shrink-0 whitespace-nowrap cursor-pointer ${
                  isMaxed
                    ? 'bg-[#523e58]/30 border border-[#7b5d95]/30 text-[#7b5d95] cursor-not-allowed'
                    : canAfford
                    ? 'bg-gradient-to-r from-[#423ea6] to-[#9547a9] hover:from-[#523e58] hover:to-[#9547a9] text-white border border-[#9d9be5]/50 active:scale-95 shadow-[0_0_12px_rgba(149,71,169,0.35)]'
                    : 'bg-[#523e58]/50 border border-[#7b5d95]/40 text-[#7b5d95] opacity-50 cursor-not-allowed'
                }`}
              >
                {isMaxed ? 'MAXED' : `+${u.cost} 🪙`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
