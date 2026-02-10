"use client";

import { useState } from "react";
import { players } from "@/src/data/players";
import PlayerSelect from "@/src/components/ui/player-select";
import FootballerCard from "@/src/components/compare/footballer-card";

export default function CompareView() {
  const [leftId, setLeftId] = useState(players[0].id);
  const [rightId, setRightId] = useState(players[1].id);

  const leftPlayer = players.find((p) => p.id === leftId) ?? players[0];
  const rightPlayer = players.find((p) => p.id === rightId) ?? players[1];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-4 sm:py-10 px-3 sm:px-4">
      {/* Header */}
      <div className="text-center mb-4 sm:mb-10">
        <h1 className="text-xl sm:text-4xl font-black text-white uppercase tracking-wider mb-1 sm:mb-2">
          Compare Footballers
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          İki futbolcuyu seçerek istatistiklerini karşılaştırın
        </p>
      </div>

      {/* Dropdowns & Cards */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4 sm:gap-8 items-start">
        {/* Left */}
        <div className="flex-1 w-full">
          <div className="mb-4">
            <PlayerSelect
              players={players}
              selectedId={leftId}
              onChange={setLeftId}
            />
          </div>
          <FootballerCard player={leftPlayer} />
        </div>

        {/* VS Divider */}
        <div className="hidden md:flex items-center justify-center self-center">
          <span className="text-4xl font-black text-yellow-400/60">VS</span>
        </div>
        <div className="md:hidden flex items-center justify-center w-full py-0">
          <span className="text-xl font-black text-yellow-400/60">VS</span>
        </div>

        {/* Right */}
        <div className="flex-1 w-full">
          <div className="mb-4">
            <PlayerSelect
              players={players}
              selectedId={rightId}
              onChange={setRightId}
            />
          </div>
          <FootballerCard player={rightPlayer} />
        </div>
      </div>
    </div>
  );
}
