import { Player } from "@/src/types/player";

const statLabels: Record<string, string> = {
  pace: "H\u0131z",
  shooting: "\u015eut",
  passing: "Pas",
  dribbling: "Dribling",
  defending: "Defans",
  physical: "Fizik",
};

function getStatColor(value: number) {
  if (value >= 80) return "bg-green-500";
  if (value >= 70) return "bg-yellow-500";
  if (value >= 60) return "bg-orange-500";
  return "bg-red-500";
}

export default function FootballerCard({ player }: { player: Player }) {
  return (
    <div className="max-w-sm mx-auto">
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-700 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        {/* Top Section - Rating & Position */}
        <div className="relative flex items-start justify-between mb-4">
          <div className="text-center">
            <div className="text-3xl sm:text-5xl font-black text-yellow-400 leading-none">
              {player.rating}
            </div>
            <div className="text-[10px] sm:text-xs font-bold text-yellow-400/80 uppercase tracking-wider">
              {player.position}
            </div>
          </div>

          <div className="text-right">
            <div className="text-3xl mb-1">{player.nationality}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wide">
              {player.club}
            </div>
          </div>
        </div>

        {/* Player Image */}
        <div className="relative mb-3 sm:mb-6">
          <div className="aspect-square w-24 sm:w-40 mx-auto rounded-full overflow-hidden border-4 border-yellow-400/30 shadow-lg shadow-yellow-400/20">
            <img
              src={player.image}
              alt={player.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Player Name */}
        <div className="text-center mb-3 sm:mb-6">
          <h2 className="text-lg sm:text-2xl font-black text-white uppercase tracking-wide">
            {player.name}
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {Object.entries(player.stats).map(([stat, value]) => (
            <div
              key={stat}
              className="bg-slate-800/50 rounded-lg p-2 sm:p-3 backdrop-blur-sm border border-slate-700/50"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {statLabels[stat] ?? stat}
                </span>
                <span className="text-lg font-black text-white">{value}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${getStatColor(value)}`}
                  style={{ width: `${value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Shine Effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
