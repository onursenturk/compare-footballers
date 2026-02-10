"use client";

import { Player } from "@/src/types/player";

interface PlayerSelectProps {
  players: Player[];
  selectedId: string;
  onChange: (id: string) => void;
}

export default function PlayerSelect({
  players,
  selectedId,
  onChange,
}: PlayerSelectProps) {
  return (
    <select
      value={selectedId}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent cursor-pointer appearance-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23fbbf24' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
      }}
    >
      {players.map((player) => (
        <option key={player.id} value={player.id}>
          {player.name} - {player.position} ({player.rating})
        </option>
      ))}
    </select>
  );
}
