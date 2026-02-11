import Link from "next/link";

const cards = [
  {
    title: "Karşılaştır",
    description: "İki futbolcuyu istatistikleriyle karşılaştır",
    href: "/compare",
    icon: "⚔️",
  },
  {
    title: "İlk 11",
    description: "Süper Lig'in tüm zamanlar en iyi kadrosunu oluştur",
    href: "/ilk-11",
    icon: "⭐",
  },
  {
    title: "Halısaha",
    description: "Turnuva oluştur, takımlar kur ve puan tablosunu takip et",
    href: "/halisaha",
    icon: "🏟️",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-wider mb-3">
            Futbol Köşesi
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Karşılaştır, kadro kur veya halısaha turnuvası düzenle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group block bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-yellow-400/50 hover:bg-slate-800/80 transition-all duration-200"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                {card.title}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
