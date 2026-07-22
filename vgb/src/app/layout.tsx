import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Video Games Battle",
  description: "Duel de stratégie type échecs avec des personnages de jeux vidéo.",
  applicationName: "Video Games Battle",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "VGB",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** Layout minimal : les pages HTML dans public/ gardent leur design d’origine. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
