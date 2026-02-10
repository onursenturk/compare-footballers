export type FormationSlot =
  | "GK"
  | "LB"
  | "CB_L"
  | "CB_R"
  | "RB"
  | "CDM_L"
  | "CDM_R"
  | "LAM"
  | "CAM"
  | "RAM"
  | "ST";

export type PositionGroup = "GK" | "DEF" | "MID" | "FWD";

export interface SuperLigPlayer {
  id: string;
  name: string;
  positionGroup: PositionGroup;
  club: string;
  yearsActive: string;
}

export type SlotSelection =
  | { type: "player"; playerId: string }
  | { type: "custom"; customName: string }
  | null;

export type FormationSelections = Record<FormationSlot, SlotSelection>;

export interface PositionCoord {
  slot: FormationSlot;
  label: string;
  x: number;
  y: number;
  positionGroup: PositionGroup;
}
