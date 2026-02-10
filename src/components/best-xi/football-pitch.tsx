"use client";

import { forwardRef, useCallback, useRef } from "react";
import {
  FormationSelections,
  PositionCoord,
  FormationSlot,
} from "@/src/types/best-xi";
import { FORMATION_4231 } from "@/src/lib/formation";
import PositionNode, {
  getDisplayName,
  getInitials,
} from "@/src/components/best-xi/position-node";

export interface DragState {
  sourceSlot: FormationSlot;
  ghostX: number;
  ghostY: number;
  overSlot: FormationSlot | null;
}

interface FootballPitchProps {
  selections: FormationSelections;
  dragState: DragState | null;
  onSlotPointerDown: (slot: FormationSlot, e: React.PointerEvent) => void;
  onPitchPointerMove: (e: React.PointerEvent) => void;
  onPitchPointerUp: (e: React.PointerEvent) => void;
}

const FootballPitch = forwardRef<HTMLDivElement, FootballPitchProps>(
  function FootballPitch(
    {
      selections,
      dragState,
      onSlotPointerDown,
      onPitchPointerMove,
      onPitchPointerUp,
    },
    ref
  ) {
    const innerRef = useRef<HTMLDivElement | null>(null);

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        innerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    // Ghost overlay for the dragged player
    const ghostNode = (() => {
      if (!dragState) return null;
      const sel = selections[dragState.sourceSlot];
      const name = getDisplayName(sel);
      if (!name) return null;

      return (
        <div
          className="fixed z-50 pointer-events-none flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: dragState.ghostX,
            top: dragState.ghostY,
          }}
        >
          <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-yellow-400 text-slate-900 flex items-center justify-center text-base sm:text-lg font-bold shadow-xl shadow-yellow-400/40 scale-110">
            {getInitials(name)}
          </span>
          <span className="bg-slate-900 text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-full whitespace-nowrap shadow-lg">
            {name}
          </span>
        </div>
      );
    })();

    return (
      <>
        <div
          ref={setRefs}
          className="relative h-full sm:h-auto sm:w-full max-w-full sm:max-w-[560px] mx-auto rounded-xl overflow-hidden shadow-2xl"
          style={{ aspectRatio: "68 / 105", touchAction: "none" }}
          onPointerMove={onPitchPointerMove}
          onPointerUp={onPitchPointerUp}
        >
          {/* Green pitch background with stripes */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                repeating-linear-gradient(
                  180deg,
                  #2d8a4e 0px,
                  #2d8a4e 40px,
                  #34964f 40px,
                  #34964f 80px
                )
              `,
            }}
          />

          {/* Field lines SVG */}
          <svg
            viewBox="0 0 680 1050"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <rect x="40" y="40" width="600" height="970" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="3" />
            <line x1="40" y1="525" x2="640" y2="525" stroke="rgba(255,255,255,0.7)" strokeWidth="3" />
            <circle cx="340" cy="525" r="91.5" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="3" />
            <circle cx="340" cy="525" r="5" fill="rgba(255,255,255,0.7)" />
            <rect x="178" y="40" width="324" height="165" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="3" />
            <rect x="248" y="40" width="184" height="55" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="3" />
            <circle cx="340" cy="150" r="4" fill="rgba(255,255,255,0.7)" />
            <path d="M 280 205 A 91.5 91.5 0 0 0 400 205" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="3" />
            <rect x="178" y="845" width="324" height="165" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="3" />
            <rect x="248" y="955" width="184" height="55" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="3" />
            <circle cx="340" cy="900" r="4" fill="rgba(255,255,255,0.7)" />
            <path d="M 280 845 A 91.5 91.5 0 0 1 400 845" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="3" />
            <path d="M 40 52 A 12 12 0 0 0 52 40" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="3" />
            <path d="M 628 40 A 12 12 0 0 0 640 52" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="3" />
            <path d="M 40 998 A 12 12 0 0 1 52 1010" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="3" />
            <path d="M 628 1010 A 12 12 0 0 1 640 998" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="3" />
            <rect x="278" y="15" width="124" height="25" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
            <rect x="278" y="1010" width="124" height="25" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
          </svg>

          {/* Position nodes */}
          {FORMATION_4231.map((coord: PositionCoord) => (
            <PositionNode
              key={coord.slot}
              coord={coord}
              selection={selections[coord.slot]}
              isDragSource={dragState?.sourceSlot === coord.slot}
              isDragOver={dragState?.overSlot === coord.slot}
              onPointerDown={(e) => onSlotPointerDown(coord.slot, e)}
            />
          ))}

          {/* Title overlay */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-900/80 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
            4-2-3-1 Dizilim
          </div>
        </div>

        {/* Drag ghost rendered outside pitch to avoid overflow:hidden clipping */}
        {ghostNode}
      </>
    );
  }
);

export default FootballPitch;
