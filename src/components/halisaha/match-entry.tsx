"use client";

import { useState } from "react";
import { HalisahaTeam } from "@/src/types/halisaha";
import { addMatch } from "@/src/lib/halisaha-storage";

interface Props {
  teams: HalisahaTeam[];
  onUpdate: () => void;
}

export default function MatchEntry({ teams, onUpdate }: Props) {
  const [homeTeamId, setHomeTeamId] = useState("");
  const [awayTeamId, setAwayTeamId] = useState("");
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");

  function handleAdd() {
    const hs = parseInt(homeScore);
    const as = parseInt(awayScore);
    if (!homeTeamId || !awayTeamId || homeTeamId === awayTeamId || isNaN(hs) || isNaN(as) || hs < 0 || as < 0) return;
    addMatch(homeTeamId, awayTeamId, hs, as);
    setHomeTeamId("");
    setAwayTeamId("");
    setHomeScore("");
    setAwayScore("");
    onUpdate();
  }

  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 space-y-3">
      <h3 className="text-white font-semibold text-sm">Yeni Maç Ekle</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <select
          value={homeTeamId}
          onChange={(e) => setHomeTeamId(e.target.value)}
          className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400"
        >
          <option value="">Ev sahibi takım</option>
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        <select
          value={awayTeamId}
          onChange={(e) => setAwayTeamId(e.target.value)}
          className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400"
        >
          <option value="">Deplasman takımı</option>
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          min="0"
          value={homeScore}
          onChange={(e) => setHomeScore(e.target.value)}
          placeholder="Ev sahibi skor"
          className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-yellow-400"
        />
        <input
          type="number"
          min="0"
          value={awayScore}
          onChange={(e) => setAwayScore(e.target.value)}
          placeholder="Deplasman skor"
          className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-yellow-400"
        />
      </div>

      <button
        onClick={handleAdd}
        disabled={!homeTeamId || !awayTeamId || homeTeamId === awayTeamId || homeScore === "" || awayScore === ""}
        className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-300 transition-colors disabled:opacity-40 cursor-pointer"
      >
        Maç Ekle
      </button>
    </div>
  );
}
