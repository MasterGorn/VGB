import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Video Games Battle",
  description: "Duel de stratégie type échecs avec des personnages de jeux vidéo.",
};

/** Layout minimal : les pages HTML dans public/ gardent leur design d’origine. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
