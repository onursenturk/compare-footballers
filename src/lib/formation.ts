import { FormationSlot, PositionCoord, PositionGroup } from "@/src/types/best-xi";

export const SLOT_TO_GROUP: Record<FormationSlot, PositionGroup> = {
  GK: "GK",
  LB: "DEF",
  CB_L: "DEF",
  CB_R: "DEF",
  RB: "DEF",
  CDM_L: "MID",
  CDM_R: "MID",
  LAM: "MID",
  CAM: "MID",
  RAM: "MID",
  ST: "FWD",
};

// 4-2-3-1 formation coordinates (percentage-based x,y positions)
// y: 0% = top (opponent goal), 100% = bottom (own goal)
// x: 0% = left, 100% = right
export const FORMATION_4231: PositionCoord[] = [
  // Goalkeeper
  { slot: "GK", label: "Kaleci", x: 50, y: 90, positionGroup: "GK" },
  // Defenders
  { slot: "LB", label: "Sol Bek", x: 15, y: 74, positionGroup: "DEF" },
  { slot: "CB_L", label: "Stoper", x: 37, y: 78, positionGroup: "DEF" },
  { slot: "CB_R", label: "Stoper", x: 63, y: 78, positionGroup: "DEF" },
  { slot: "RB", label: "Sağ Bek", x: 85, y: 74, positionGroup: "DEF" },
  // Defensive midfielders (2)
  { slot: "CDM_L", label: "Defansif OS", x: 35, y: 60, positionGroup: "MID" },
  { slot: "CDM_R", label: "Defansif OS", x: 65, y: 60, positionGroup: "MID" },
  // Attacking midfielders (3)
  { slot: "LAM", label: "Sol Kanat", x: 18, y: 42, positionGroup: "MID" },
  { slot: "CAM", label: "10 Numara", x: 50, y: 44, positionGroup: "MID" },
  { slot: "RAM", label: "Sağ Kanat", x: 82, y: 42, positionGroup: "MID" },
  // Striker
  { slot: "ST", label: "Santrafor", x: 50, y: 26, positionGroup: "FWD" },
];

export const ALL_SLOTS: FormationSlot[] = FORMATION_4231.map((p) => p.slot);
