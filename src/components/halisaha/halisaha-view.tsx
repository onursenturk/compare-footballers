"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { HalisahaPlayer, HalisahaTeam, HalisahaMatch } from "@/src/types/halisaha";
import { getPlayers, getTeams, getMatches } from "@/src/lib/halisaha-storage";
import PlayerPoolModal from "./player-pool-modal";
import TeamBuilder from "./team-builder";
import MatchEntry from "./match-entry";
import MatchList from "./match-list";
import StandingsTable from "./standings-table";

type Tab = "teams" | "matches" | "standings";

const TABS: { key: Tab; label: string }[] = [
  { key: "teams", label: "Takımlar" },
  { key: "matches", label: "Maçlar" },
  { key: "standings", label: "Puan Durumu" },
];

export default function HalisahaView() {
  const [tab, setTab] = useState<Tab>("teams");
  const [showPlayerPool, setShowPlayerPool] = useState(false);

  const [players, setPlayers] = useState<HalisahaPlayer[]>([]);
  const [teams, setTeams] = useState<HalisahaTeam[]>([]);
  const [matches, setMatches] = useState<HalisahaMatch[]>([]);

  const reload = useCallback(() => {
    setPlayers(getPlayers());
    setTeams(getTeams());
    setMatches(getMatches());
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-4 sm:py-10 px-3 sm:px-4">
      <div className="max-w-2xl mx-auto">
        {/* Nav */}
        <div className="mb-4">
          <Link
            href="/"
            className="text-slate-400 hover:text-yellow-400 text-sm transition-colors"
          >
            ← Ana Sayfa
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-3xl font-black text-white uppercase tracking-wider mb-1">
            Halısaha Turnuvası
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Takımlar kur, maçlar oyna, puan tablosunu takip et
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-slate-800/60 rounded-xl p-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                tab === t.key
                  ? "bg-yellow-400 text-slate-900"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "teams" && (
          <TeamBuilder
            players={players}
            teams={teams}
            onUpdate={reload}
            onOpenPlayerPool={() => setShowPlayerPool(true)}
          />
        )}

        {tab === "matches" && (
          <div className="space-y-6">
            <MatchEntry teams={teams} onUpdate={reload} />
            <MatchList matches={matches} teams={teams} onUpdate={reload} />
          </div>
        )}

        {tab === "standings" && (
          <StandingsTable matches={matches} teams={teams} />
        )}

        {/* Player Pool Modal */}
        {showPlayerPool && (
          <PlayerPoolModal
            players={players}
            onUpdate={reload}
            onClose={() => setShowPlayerPool(false)}
          />
        )}
      </div>
    </div>
  );
}
