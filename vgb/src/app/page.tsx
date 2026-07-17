import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-12">
        <p className="mb-2 text-sm uppercase tracking-widest text-white/60">Video Games Battle</p>
        <h1 className="mb-4 text-3xl font-bold text-vgb-gold md:text-5xl">
          Échecs 9×9, skins de jeux vidéo
        </h1>
        <p className="mb-8 max-w-2xl text-white/80">
          Compose ton armée par rôles, sauve tes decks favoris, et affronte d’autres joueurs
          avec un classement Elo synchronisé via MongoDB Atlas (local et prod).
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/jouer"
            className="rounded-lg bg-gradient-to-r from-orange-500 to-vgb-gold px-5 py-3 font-bold text-black"
          >
            Jouer
          </Link>
          <Link
            href="/auth/login"
            className="rounded-lg border border-white/20 bg-black/30 px-5 py-3 font-bold"
          >
            Créer un compte
          </Link>
          <Link
            href="/classement"
            className="rounded-lg border border-white/20 px-5 py-3 font-semibold text-white/90"
          >
            Classement
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Comptes Atlas",
            body: "Inscription / connexion NextAuth. Même base MongoDB en local et sur Vercel.",
          },
          {
            title: "Decks",
            body: "Enregistre jusqu’à 5 armées (17 pièces par rôles) et recharge-les au draft.",
          },
          {
            title: "Elo",
            body: "Classement public mis à jour après les parties en ligne.",
          },
        ].map((card) => (
          <div key={card.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h2 className="mb-2 font-bold text-vgb-gold">{card.title}</h2>
            <p className="text-sm text-white/75">{card.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
