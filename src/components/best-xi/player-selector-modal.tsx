"use client";

import { useState, useEffect, useRef } from "react";
import { PositionGroup, SlotSelection, SuperLigPlayer } from "@/src/types/best-xi";
import { SUPER_LIG_PLAYERS } from "@/src/data/super-lig-players";

interface PlayerSelectorModalProps {
  positionGroup: PositionGroup;
  positionLabel: string;
  currentSelection: SlotSelection;
  onSelect: (selection: SlotSelection) => void;
  onClose: () => void;
}

const GROUP_LABELS: Record<PositionGroup, string> = {
  GK: "Kaleci",
  DEF: "Defans",
  MID: "Orta Saha",
  FWD: "Forvet",
};

export default function PlayerSelectorModal({
  positionGroup,
  positionLabel,
  currentSelection,
  onSelect,
  onClose,
}: PlayerSelectorModalProps) {
  const [search, setSearch] = useState("");
  const [customName, setCustomName] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const filteredPlayers = SUPER_LIG_PLAYERS.filter((p) => {
    if (p.positionGroup !== positionGroup) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) || p.club.toLowerCase().includes(q)
    );
  });

  function handlePlayerSelect(player: SuperLigPlayer) {
    onSelect({ type: "player", playerId: player.id });
  }

  function handleCustomSubmit() {
    const trimmed = customName.trim();
    if (trimmed) {
      onSelect({ type: "custom", customName: trimmed });
    }
  }

  function handleRemove() {
    onSelect(null);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full sm:w-[420px] max-h-[85vh] sm:max-h-[70vh] bg-slate-900 sm:rounded-xl rounded-t-xl border border-slate-700/50 flex flex-col shadow-2xl animate-in">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50">
          <h3 className="text-white font-semibold text-base">
            {positionLabel} — {GROUP_LABELS[positionGroup]}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors text-xl leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-slate-700/50">
          <input
            ref={searchRef}
            type="text"
            placeholder="Oyuncu ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-yellow-400/50 placeholder-slate-400"
          />
        </div>

        {/* Player list */}
        <div className="flex-1 overflow-y-auto px-2 py-2 min-h-0">
          {filteredPlayers.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-4">
              Oyuncu bulunamadı
            </p>
          ) : (
            filteredPlayers.map((player) => {
              const isSelected =
                currentSelection?.type === "player" &&
                currentSelection.playerId === player.id;
              return (
                <button
                  key={player.id}
                  onClick={() => handlePlayerSelect(player)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg mb-1 flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-yellow-400/20 border border-yellow-400/40"
                      : "hover:bg-slate-800"
                  }`}
                >
                  <div>
                    <span className="text-white text-sm font-medium">
                      {player.name}
                    </span>
                    <span className="text-slate-400 text-xs ml-2">
                      {player.club}
                    </span>
                  </div>
                  <span className="text-slate-500 text-xs">
                    {player.yearsActive}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Bottom actions */}
        <div className="px-4 py-3 border-t border-slate-700/50 space-y-2">
          {showCustomInput ? (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Oyuncu adı girin..."
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCustomSubmit();
                }}
                className="flex-1 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-yellow-400/50 placeholder-slate-400"
                autoFocus
              />
              <button
                onClick={handleCustomSubmit}
                disabled={!customName.trim()}
                className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Ekle
              </button>
              <button
                onClick={() => {
                  setShowCustomInput(false);
                  setCustomName("");
                }}
                className="text-slate-400 hover:text-white px-2 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setShowCustomInput(true)}
                className="flex-1 bg-slate-800 text-slate-300 px-3 py-2 rounded-lg text-sm hover:bg-slate-700 transition-colors cursor-pointer"
              >
                ✏️ Manuel Giriş
              </button>
              {currentSelection && (
                <button
                  onClick={handleRemove}
                  className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm hover:bg-red-500/30 transition-colors cursor-pointer"
                >
                  Kaldır
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
