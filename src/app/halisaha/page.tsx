import type { Metadata } from "next";
import HalisahaView from "@/src/components/halisaha/halisaha-view";

export const metadata: Metadata = {
  title: "Halısaha Turnuvası | Futbol Köşesi",
  description: "Halısaha turnuvası düzenle, takımlar kur ve puan tablosunu takip et.",
};

export default function HalisahaPage() {
  return <HalisahaView />;
}
