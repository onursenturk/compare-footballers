export interface HalisahaPlayer {
  id: string;
  name: string;
}

export interface HalisahaTeam {
  id: string;
  name: string;
  players: [string, string]; // 2 player IDs
}

export interface HalisahaMatch {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  date: string;
}

export interface Standing {
  teamId: string;
  teamName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}
