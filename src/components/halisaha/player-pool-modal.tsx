"use client";

import { useState } from "react";
import { HalisahaPlayer } from "@/src/types/halisaha";
import { addPlayer, removePlayer } from "@/src/lib/halisaha-storage";

interface Props {
  players: HalisahaPlayer[];
  onUpdate: () => void;
  onClose: () => void;
}

export default function PlayerPoolModal({ players, onUpdate, onClose }: Props) {
  const [name, setName] = useState("");

  function handleAdd() {
    const trimmed = name.trim();
    if (!trimmed) return;
    addPlayer(trimmed);
    setName("");
    onUpdate();
  }

  function handleRemove(id: string) {
    removePlayer(id);
    onUpdate();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-lg font-bold text-white">Oyuncu Havuzu</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-4 flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Oyuncu adı..."
            className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-yellow-400"
          />
          <button
            onClick={handleAdd}
            disabled={!name.trim()}
            className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-yellow-300 transition-colors disabled:opacity-40 cursor-pointer"
          >
            Ekle
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {players.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-4">
              Henüz oyuncu eklenmedi
            </p>
          ) : (
            <ul className="space-y-1">
              {players.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between bg-slate-900/50 rounded-lg px-3 py-2"
                >
                  <span className="text-white text-sm">{p.name}</span>
                  <button
                    onClick={() => handleRemove(p.id)}
                    className="text-red-400 hover:text-red-300 text-xs cursor-pointer"
                  >
                    Sil
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
