import Link from "next/link";

const links = [
  { href: "/jouer", label: "Jouer" },
  { href: "/classement", label: "Classement" },
  { href: "/decks", label: "Mes decks" },
  { href: "/pieces.html", label: "Pièces" },
  { href: "/regles.html", label: "Règles" },
  { href: "/auth/login", label: "Compte" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#000428]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="text-lg font-bold text-vgb-gold">
          Video Games Battle
        </Link>
        <nav className="flex flex-wrap gap-2 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-white/90 hover:bg-white/10"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
