"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Deck = {
  id: string;
  name: string;
  faction: string;
  slots: { role: string; pieceKey: string }[];
  isDefault: boolean;
};

export default function DecksPage() {
  const { data: session, status } = useSession();
  const [decks, setDecks] = useState<Deck[]>([]);
  const [msg, setMsg] = useState("");

  async function load() {
    setMsg("");
    const res = await fetch("/api/decks", { credentials: "include" });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      setMsg(data.error || "Erreur");
      return;
    }
    setDecks(data.decks || []);
  }

  useEffect(() => {
    if (session?.user) load();
  }, [session?.user]);

  if (status === "loading") return <p>Chargement…</p>;
  if (!session?.user) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <p className="mb-4">Connectez-vous pour gérer vos decks.</p>
        <Link href="/auth/login" className="rounded-lg bg-vgb-gold px-4 py-2 font-bold text-black">
          Se connecter
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-vgb-gold">Mes decks</h1>
          <p className="text-sm text-white/65">
            Jusqu’à 5 armées. Composez-les au draft sur la page Jouer, puis Sauver deck.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/jouer" className="rounded-lg bg-gradient-to-r from-orange-500 to-vgb-gold px-4 py-2 font-bold text-black">
            Composer / jouer
          </Link>
          <button type="button" onClick={load} className="rounded-lg bg-sky-600 px-4 py-2 font-bold">
            Actualiser
          </button>
        </div>
      </div>

      {!decks.length ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-white/75">
          Aucun deck pour l’instant.
        </div>
      ) : (
        decks.map((deck) => (
          <div key={deck.id} className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">
                  {deck.name}
                  {deck.isDefault ? (
                    <span className="ml-2 rounded-full border border-vgb-gold px-2 py-0.5 text-xs text-vgb-gold">
                      Défaut
                    </span>
                  ) : null}
                </h2>
                <p className="text-sm text-white/60">
                  {deck.faction} · {deck.slots.length} pièces
                </p>
              </div>
              <div className="flex gap-2">
                {!deck.isDefault ? (
                  <button
                    type="button"
                    className="rounded-lg border border-white/20 px-3 py-2 text-sm"
                    onClick={async () => {
                      await fetch(`/api/decks/${deck.id}`, {
                        method: "PATCH",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ isDefault: true }),
                      });
                      load();
                    }}
                  >
                    Par défaut
                  </button>
                ) : null}
                <button
                  type="button"
                  className="rounded-lg bg-red-700 px-3 py-2 text-sm font-bold"
                  onClick={async () => {
                    if (!confirm("Supprimer ce deck ?")) return;
                    await fetch(`/api/decks/${deck.id}`, {
                      method: "DELETE",
                      credentials: "include",
                    });
                    load();
                  }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))
      )}
      {msg ? <p className="text-sm text-red-300">{msg}</p> : null}
    </div>
  );
}
