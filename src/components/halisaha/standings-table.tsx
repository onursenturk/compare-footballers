"use client";

import { HalisahaMatch, HalisahaTeam, Standing } from "@/src/types/halisaha";

interface Props {
  matches: HalisahaMatch[];
  teams: HalisahaTeam[];
}

function calculateStandings(teams: HalisahaTeam[], matches: HalisahaMatch[]): Standing[] {
  const map = new Map<string, Standing>();

  for (const team of teams) {
    map.set(team.id, {
      teamId: team.id,
      teamName: team.name,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    });
  }

  for (const match of matches) {
    const home = map.get(match.homeTeamId);
    const away = map.get(match.awayTeamId);
    if (!home || !away) continue;

    home.played++;
    away.played++;
    home.goalsFor += match.homeScore;
    home.goalsAgainst += match.awayScore;
    away.goalsFor += match.awayScore;
    away.goalsAgainst += match.homeScore;

    if (match.homeScore > match.awayScore) {
      home.won++;
      home.points += 3;
      away.lost++;
    } else if (match.homeScore < match.awayScore) {
      away.won++;
      away.points += 3;
      home.lost++;
    } else {
      home.drawn++;
      away.drawn++;
      home.points += 1;
      away.points += 1;
    }
  }

  const standings = Array.from(map.values());
  for (const s of standings) {
    s.goalDifference = s.goalsFor - s.goalsAgainst;
  }

  standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });

  return standings;
}

export default function StandingsTable({ matches, teams }: Props) {
  const standings = calculateStandings(teams, matches);

  if (teams.length === 0) {
    return <p className="text-slate-500 text-sm">Henüz takım oluşturulmadı</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-slate-400 border-b border-slate-700">
            <th className="text-left py-2 px-2 font-medium">#</th>
            <th className="text-left py-2 px-2 font-medium">Takım</th>
            <th className="text-center py-2 px-1 font-medium">O</th>
            <th className="text-center py-2 px-1 font-medium">G</th>
            <th className="text-center py-2 px-1 font-medium">B</th>
            <th className="text-center py-2 px-1 font-medium">M</th>
            <th className="text-center py-2 px-1 font-medium">AG</th>
            <th className="text-center py-2 px-1 font-medium">YG</th>
            <th className="text-center py-2 px-1 font-medium">Av</th>
            <th className="text-center py-2 px-2 font-medium text-yellow-400">P</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((s, i) => (
            <tr
              key={s.teamId}
              className="border-b border-slate-700/50 hover:bg-slate-800/40"
            >
              <td className="py-2 px-2 text-slate-400">{i + 1}</td>
              <td className="py-2 px-2 text-white font-medium">{s.teamName}</td>
              <td className="text-center py-2 px-1 text-slate-300">{s.played}</td>
              <td className="text-center py-2 px-1 text-slate-300">{s.won}</td>
              <td className="text-center py-2 px-1 text-slate-300">{s.drawn}</td>
              <td className="text-center py-2 px-1 text-slate-300">{s.lost}</td>
              <td className="text-center py-2 px-1 text-slate-300">{s.goalsFor}</td>
              <td className="text-center py-2 px-1 text-slate-300">{s.goalsAgainst}</td>
              <td className="text-center py-2 px-1 text-slate-300">{s.goalDifference}</td>
              <td className="text-center py-2 px-2 text-yellow-400 font-bold">{s.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
