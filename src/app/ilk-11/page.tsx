import type { Metadata } from "next";
import BestXIView from "@/src/components/best-xi/best-xi-view";

export const metadata: Metadata = {
  title: "Süper Lig İlk 11 | Tüm Zamanların En İyi Kadrosu",
  description:
    "4-3-3 diziliminde tüm zamanların en iyi Türkiye Süper Lig ilk 11'ini oluştur ve paylaş.",
};

export default function BestXIPage() {
  return <BestXIView />;
}
