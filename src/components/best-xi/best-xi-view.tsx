"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import {
  FormationSlot,
  FormationSelections,
  SlotSelection,
} from "@/src/types/best-xi";
import { FORMATION_4231, ALL_SLOTS, SLOT_TO_GROUP } from "@/src/lib/formation";
import { exportPitchAsImage } from "@/src/lib/export-image";
import FootballPitch, {
  type DragState,
} from "@/src/components/best-xi/football-pitch";
import PlayerSelectorModal from "@/src/components/best-xi/player-selector-modal";

const initialSelections: FormationSelections = Object.fromEntries(
  ALL_SLOTS.map((slot) => [slot, null])
) as FormationSelections;

const DRAG_THRESHOLD = 8;
const DROP_RADIUS_PCT = 12;

function findClosestSlot(
  pctX: number,
  pctY: number,
  sourceSlot: FormationSlot
): FormationSlot | null {
  let closest: FormationSlot | null = null;
  let minDist = DROP_RADIUS_PCT;

  for (const coord of FORMATION_4231) {
    if (coord.slot === sourceSlot) continue;
    const dx = coord.x - pctX;
    const dy = coord.y - pctY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < minDist) {
      minDist = dist;
      closest = coord.slot;
    }
  }
  return closest;
}

export default function BestXIView() {
  const [selections, setSelections] =
    useState<FormationSelections>(initialSelections);
  const [activeSlot, setActiveSlot] = useState<FormationSlot | null>(null);
  const [exporting, setExporting] = useState(false);
  const [dragState, setDragState] = useState<DragState | null>(null);

  const pitchRef = useRef<HTMLDivElement>(null);

  // Ref to track pointer start (not state – avoids re-renders during threshold check)
  const pointerStartRef = useRef<{
    slot: FormationSlot;
    x: number;
    y: number;
    pointerId: number;
  } | null>(null);

  const pxToPercent = useCallback(
    (clientX: number, clientY: number): { pctX: number; pctY: number } => {
      const el = pitchRef.current;
      if (!el) return { pctX: 0, pctY: 0 };
      const rect = el.getBoundingClientRect();
      return {
        pctX: ((clientX - rect.left) / rect.width) * 100,
        pctY: ((clientY - rect.top) / rect.height) * 100,
      };
    },
    []
  );

  const handleSlotPointerDown = useCallback(
    (slot: FormationSlot, e: React.PointerEvent) => {
      // Only primary button / single touch
      if (e.button !== 0) return;

      // Only allow drag if the slot has a player
      const hasPlayer = selections[slot] !== null;

      pointerStartRef.current = {
        slot,
        x: e.clientX,
        y: e.clientY,
        pointerId: e.pointerId,
      };

      if (hasPlayer) {
        // Capture pointer on the pitch container for reliable tracking
        pitchRef.current?.setPointerCapture(e.pointerId);
      }
    },
    [selections]
  );

  const handlePitchPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const start = pointerStartRef.current;
      if (!start) return;

      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (!dragState && dist < DRAG_THRESHOLD) return;

      // Start or continue drag
      const { pctX, pctY } = pxToPercent(e.clientX, e.clientY);
      const overSlot = findClosestSlot(pctX, pctY, start.slot);

      setDragState({
        sourceSlot: start.slot,
        ghostX: e.clientX,
        ghostY: e.clientY,
        overSlot,
      });
    },
    [dragState, pxToPercent]
  );

  const handlePitchPointerUp = useCallback(
    (e: React.PointerEvent) => {
      const start = pointerStartRef.current;
      if (!start) return;

      // Release pointer capture
      try {
        pitchRef.current?.releasePointerCapture(start.pointerId);
      } catch {
        // ignore
      }

      if (dragState) {
        // Was dragging → perform swap if over a valid target
        if (dragState.overSlot) {
          setSelections((prev) => {
            const a = dragState.sourceSlot;
            const b = dragState.overSlot!;
            return { ...prev, [a]: prev[b], [b]: prev[a] };
          });
        }
        setDragState(null);
      } else {
        // Was a click → open modal
        setActiveSlot(start.slot);
      }

      pointerStartRef.current = null;
    },
    [dragState]
  );

  const handleSelect = useCallback(
    (selection: SlotSelection) => {
      if (!activeSlot) return;
      setSelections((prev) => ({ ...prev, [activeSlot]: selection }));
      setActiveSlot(null);
    },
    [activeSlot]
  );

  const handleCloseModal = useCallback(() => {
    setActiveSlot(null);
  }, []);

  async function handleExport() {
    if (!pitchRef.current || exporting) return;
    setExporting(true);
    try {
      await exportPitchAsImage(pitchRef.current);
    } finally {
      setExporting(false);
    }
  }

  const activeCoord = activeSlot
    ? FORMATION_4231.find((c) => c.slot === activeSlot)
    : null;

  const filledCount = ALL_SLOTS.filter((s) => selections[s] !== null).length;

  return (
    <div className="min-h-[100svh] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-3 py-3 sm:py-6 sm:px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="max-w-2xl mx-auto w-full">
        {/* Nav */}
        <div className="mb-2">
          <Link
            href="/"
            className="text-slate-400 hover:text-yellow-400 text-sm transition-colors"
          >
            ← Ana Sayfa
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-2 sm:mb-6">
          <h1 className="text-lg sm:text-3xl font-bold text-white mb-0.5 sm:mb-2">
            Süper Lig İlk 11
          </h1>
          <p className="text-slate-400 text-xs sm:text-base">
            Tüm zamanların en iyi Süper Lig kadrosunu oluştur
          </p>
          <p className="text-slate-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1">
            {filledCount}/11 oyuncu seçildi · Sürükle-bırak ile yer değiştir
          </p>
        </div>

        {/* Pitch */}
        <div>
          <FootballPitch
            ref={pitchRef}
            selections={selections}
            dragState={dragState}
            onSlotPointerDown={handleSlotPointerDown}
            onPitchPointerMove={handlePitchPointerMove}
            onPitchPointerUp={handlePitchPointerUp}
          />
        </div>

        {/* Export button */}
        <div className="flex justify-center mt-2 sm:mt-6 gap-2 sm:gap-3">
          <button
            onClick={handleExport}
            disabled={exporting}
            className="bg-yellow-400 text-slate-900 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {exporting ? "Kaydediliyor..." : "📷 Resmi Kaydet"}
          </button>
          <button
            onClick={() => setSelections(initialSelections)}
            className="bg-slate-800 text-slate-300 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Sıfırla
          </button>
        </div>
      </div>

      {/* Modal */}
      {activeSlot && activeCoord && (
        <PlayerSelectorModal
          positionGroup={SLOT_TO_GROUP[activeSlot]}
          positionLabel={activeCoord.label}
          currentSelection={selections[activeSlot]}
          onSelect={handleSelect}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
