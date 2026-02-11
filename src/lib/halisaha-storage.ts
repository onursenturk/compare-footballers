import { HalisahaPlayer, HalisahaTeam, HalisahaMatch } from "@/src/types/halisaha";

const KEYS = {
  players: "halisaha-players",
  teams: "halisaha-teams",
  matches: "halisaha-matches",
} as const;

function get<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function set<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// Players
export function getPlayers(): HalisahaPlayer[] {
  return get<HalisahaPlayer>(KEYS.players);
}

export function addPlayer(name: string): HalisahaPlayer {
  const players = getPlayers();
  const player: HalisahaPlayer = { id: crypto.randomUUID(), name: name.trim() };
  players.push(player);
  set(KEYS.players, players);
  return player;
}

export function removePlayer(id: string): void {
  const players = getPlayers().filter((p) => p.id !== id);
  set(KEYS.players, players);
}

// Teams
export function getTeams(): HalisahaTeam[] {
  return get<HalisahaTeam>(KEYS.teams);
}

export function addTeam(name: string, playerIds: [string, string]): HalisahaTeam {
  const teams = getTeams();
  const team: HalisahaTeam = { id: crypto.randomUUID(), name: name.trim(), players: playerIds };
  teams.push(team);
  set(KEYS.teams, teams);
  return team;
}

export function removeTeam(id: string): void {
  const teams = getTeams().filter((t) => t.id !== id);
  set(KEYS.teams, teams);
}

export function setTeams(teams: HalisahaTeam[]): void {
  set(KEYS.teams, teams);
}

// Matches
export function getMatches(): HalisahaMatch[] {
  return get<HalisahaMatch>(KEYS.matches);
}

export function addMatch(
  homeTeamId: string,
  awayTeamId: string,
  homeScore: number,
  awayScore: number
): HalisahaMatch {
  const matches = getMatches();
  const match: HalisahaMatch = {
    id: crypto.randomUUID(),
    homeTeamId,
    awayTeamId,
    homeScore,
    awayScore,
    date: new Date().toISOString(),
  };
  matches.push(match);
  set(KEYS.matches, matches);
  return match;
}

export function removeMatch(id: string): void {
  const matches = getMatches().filter((m) => m.id !== id);
  set(KEYS.matches, matches);
}
