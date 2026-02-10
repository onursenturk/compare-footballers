
export interface PlayerStats {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
}

export interface Player {
  id: string;
  name: string;
  position: string;
  rating: number;
  image: string;
  stats: PlayerStats;
  nationality: string;
  club: string;
}
