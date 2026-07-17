import type { Metadata } from "next";
import Providers from "@/components/Providers";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Video Games Battle",
  description: "Duel d'échecs avec des skins de jeux vidéo — comptes, decks et Elo sur MongoDB Atlas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <SiteHeader />
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
