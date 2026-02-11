"use client";

import { useState } from "react";
import { HalisahaPlayer, HalisahaTeam } from "@/src/types/halisaha";
import { addTeam, removeTeam, setTeams } from "@/src/lib/halisaha-storage";

interface Props {
  players: HalisahaPlayer[];
  teams: HalisahaTeam[];
  onUpdate: () => void;
  onOpenPlayerPool: () => void;
}

export default function TeamBuilder({ players, teams, onUpdate, onOpenPlayerPool }: Props) {
  const [teamName, setTeamName] = useState("");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  function handleCreateTeam() {
    if (!teamName.trim() || !player1 || !player2 || player1 === player2) return;
    addTeam(teamName, [player1, player2]);
    setTeamName("");
    setPlayer1("");
    setPlayer2("");
    onUpdate();
  }

  function handleRandomTeams() {
    if (players.length < 2) return;
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    const newTeams: HalisahaTeam[] = [];

    for (let i = 0; i + 1 < shuffled.length; i += 2) {
      newTeams.push({
        id: crypto.randomUUID(),
        name: `${shuffled[i].name} & ${shuffled[i + 1].name}`,
        players: [shuffled[i].id, shuffled[i + 1].id],
      });
    }

    setTeams([...teams, ...newTeams]);
    onUpdate();
  }

  function handleRemoveTeam(id: string) {
    removeTeam(id);
    onUpdate();
  }

  function getPlayerName(id: string) {
    return players.find((p) => p.id === id)?.name ?? "?";
  }

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={onOpenPlayerPool}
          className="bg-slate-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-600 transition-colors cursor-pointer"
        >
          Oyuncu Havuzu ({players.length})
        </button>
        <button
          onClick={handleRandomTeams}
          disabled={players.length < 2}
          className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-300 transition-colors disabled:opacity-40 cursor-pointer"
        >
          Random Takım Kur
        </button>
      </div>

      {/* Manual team creation */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 space-y-3">
        <h3 className="text-white font-semibold text-sm">Manuel Takım Oluştur</h3>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Takım adı..."
          className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-yellow-400"
        />
        <div className="grid grid-cols-2 gap-2">
          <select
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400"
          >
            <option value="">Oyuncu 1</option>
            {players.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <select
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400"
          >
            <option value="">Oyuncu 2</option>
            {players.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleCreateTeam}
          disabled={!teamName.trim() || !player1 || !player2 || player1 === player2}
          className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-300 transition-colors disabled:opacity-40 cursor-pointer"
        >
          Takım Oluştur
        </button>
      </div>

      {/* Team list */}
      <div className="space-y-2">
        <h3 className="text-white font-semibold text-sm">
          Takımlar ({teams.length})
        </h3>
        {teams.length === 0 ? (
          <p className="text-slate-500 text-sm">Henüz takım oluşturulmadı</p>
        ) : (
          <div className="space-y-2">
            {teams.map((team) => (
              <div
                key={team.id}
                className="flex items-center justify-between bg-slate-800/60 border border-slate-700/50 rounded-lg px-4 py-3"
              >
                <div>
                  <span className="text-white text-sm font-medium">
                    {team.name}
                  </span>
                  <span className="text-slate-400 text-xs ml-2">
                    {getPlayerName(team.players[0])} & {getPlayerName(team.players[1])}
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveTeam(team.id)}
                  className="text-red-400 hover:text-red-300 text-xs cursor-pointer"
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
