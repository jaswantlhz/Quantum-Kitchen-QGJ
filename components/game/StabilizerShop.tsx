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
    <div className="bg-[#1a1c1f] border border-[#3b494b] rounded-xl p-3.5 sm:p-4 shadow-md">
      {/* Title Bar */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#3b494b]/40">
        <div className="flex items-center gap-2">
          <span className="font-label text-xs uppercase tracking-wider text-[#00f0ff] font-bold">
            Kitchen Upgrades
          </span>
          <span className="text-[#3b494b] text-xs">•</span>
          <span className="font-label text-xs text-[#b9cacb]">
            Permanent Cooking Boosts
          </span>
        </div>
        <span className="font-label text-[11px] text-[#849495] hidden sm:inline">
          Invest Q-Credits to improve yields
        </span>
      </div>

      {/* Upgrade Cards Horizontal Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {upgrades.map((u, i) => {
          const isMaxed = u.level >= u.maxLevel;
          const canAfford = credits >= u.cost && !isMaxed;
          const colorTheme = i % 3 === 0 ? '#00f0ff' : i % 3 === 1 ? '#d4bbff' : '#f0c119';

          return (
            <div
              key={u.id}
              className="bg-[#1e2023] border border-[#3b494b]/60 hover:border-[#00f0ff]/50 transition-all rounded-lg p-2.5 flex items-center justify-between group shadow-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-1">
                <div className="w-9 h-9 rounded bg-[#282a2d] border border-[#3b494b] flex items-center justify-center text-lg shrink-0">
                  {u.icon}
                </div>
                <div className="min-w-0">
                  <div className="font-label text-xs font-semibold text-[#e2e2e6] truncate">
                    {u.name}
                  </div>
                  {/* Level pip indicators */}
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: u.maxLevel }, (_, lvl) => (
                      <span
                        key={lvl}
                        className="w-2.5 h-1 rounded-xs"
                        style={{
                          backgroundColor: lvl < u.level ? colorTheme : '#3b494b',
                        }}
                      />
                    ))}
                    <span className="font-label text-[10px] text-[#849495] ml-1">
                      {isMaxed ? 'MAX' : `Lv. ${u.level}/${u.maxLevel}`}
                    </span>
                  </div>
                </div>
              </div>

              <button
                disabled={!canAfford || isMaxed}
                onClick={() => onBuyUpgrade(u.id)}
                className={`px-2.5 py-1.5 rounded font-label text-xs font-semibold transition-all shrink-0 whitespace-nowrap ${
                  isMaxed
                    ? 'bg-[#1a1c1f] border border-[#3b494b]/30 text-[#849495] cursor-not-allowed'
                    : canAfford
                    ? 'bg-[#282a2d] hover:bg-[#333538] border border-[#00f0ff]/40 text-[#00f0ff] active:scale-95 cursor-pointer glow-cyan-btn'
                    : 'bg-[#282a2d] border border-[#3b494b] text-[#849495] opacity-50 cursor-not-allowed'
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
