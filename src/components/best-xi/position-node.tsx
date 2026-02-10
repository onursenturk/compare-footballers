"use client";

import { PositionCoord, SlotSelection } from "@/src/types/best-xi";
import { SUPER_LIG_PLAYERS } from "@/src/data/super-lig-players";

interface PositionNodeProps {
  coord: PositionCoord;
  selection: SlotSelection;
  isDragSource: boolean;
  isDragOver: boolean;
  onPointerDown: (e: React.PointerEvent) => void;
}

export function getDisplayName(selection: SlotSelection): string | null {
  if (!selection) return null;
  if (selection.type === "custom") return selection.customName;
  const player = SUPER_LIG_PLAYERS.find((p) => p.id === selection.playerId);
  return player?.name ?? null;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function PositionNode({
  coord,
  selection,
  isDragSource,
  isDragOver,
  onPointerDown,
}: PositionNodeProps) {
  const displayName = getDisplayName(selection);

  const dragOverRing = isDragOver
    ? "ring-2 ring-yellow-400 ring-offset-2 ring-offset-green-800 scale-115"
    : "";

  return (
    <div
      data-slot={coord.slot}
      onPointerDown={onPointerDown}
      className={`absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2 select-none ${
        isDragSource ? "opacity-30" : ""
      }`}
      style={{
        left: `${coord.x}%`,
        top: `${coord.y}%`,
        touchAction: "none",
        cursor: displayName ? "grab" : "pointer",
      }}
    >
      {displayName ? (
        <>
          <span
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-yellow-400 text-slate-900 flex items-center justify-center text-sm sm:text-base font-bold shadow-lg shadow-yellow-400/30 transition-transform ${dragOverRing}`}
          >
            {getInitials(displayName)}
          </span>
          <span className="bg-slate-900/90 text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-full whitespace-nowrap max-w-[90px] sm:max-w-[110px] truncate shadow-md pointer-events-none">
            {displayName}
          </span>
        </>
      ) : (
        <>
          <span
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-dashed flex items-center justify-center text-xl sm:text-2xl transition-all ${
              isDragOver
                ? "border-yellow-400 bg-yellow-400/20 text-yellow-400 scale-115"
                : "border-white/60 bg-white/10 text-white/80"
            }`}
          >
            +
          </span>
          <span className="text-white/70 text-[10px] sm:text-xs font-medium whitespace-nowrap pointer-events-none">
            {coord.label}
          </span>
        </>
      )}
    </div>
  );
}
