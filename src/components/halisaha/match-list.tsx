"use client";

import { HalisahaMatch, HalisahaTeam } from "@/src/types/halisaha";
import { removeMatch } from "@/src/lib/halisaha-storage";

interface Props {
  matches: HalisahaMatch[];
  teams: HalisahaTeam[];
  onUpdate: () => void;
}

export default function MatchList({ matches, teams, onUpdate }: Props) {
  function getTeamName(id: string) {
    return teams.find((t) => t.id === id)?.name ?? "?";
  }

  function handleRemove(id: string) {
    removeMatch(id);
    onUpdate();
  }

  const sorted = [...matches].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-2">
      <h3 className="text-white font-semibold text-sm">
        Maçlar ({matches.length})
      </h3>
      {sorted.length === 0 ? (
        <p className="text-slate-500 text-sm">Henüz maç eklenmedi</p>
      ) : (
        <div className="space-y-2">
          {sorted.map((m) => (
            <div
              key={m.id}
              className="flex items-center justify-between bg-slate-800/60 border border-slate-700/50 rounded-lg px-4 py-3"
            >
              <div className="flex items-center gap-2 text-sm min-w-0">
                <span className="text-white font-medium truncate">
                  {getTeamName(m.homeTeamId)}
                </span>
                <span className="text-yellow-400 font-bold shrink-0">
                  {m.homeScore} - {m.awayScore}
                </span>
                <span className="text-white font-medium truncate">
                  {getTeamName(m.awayTeamId)}
                </span>
              </div>
              <button
                onClick={() => handleRemove(m.id)}
                className="text-red-400 hover:text-red-300 text-xs ml-2 shrink-0 cursor-pointer"
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
