"use client";

import { FormEvent, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMsg("");
  }, [username, password]);

  async function onRegister(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Inscription impossible");
      const login = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (login?.error) throw new Error("Compte créé, mais connexion échouée");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(false);
    }
  }

  async function onLogin(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const login = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (login?.error) throw new Error("Identifiants incorrects");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(false);
    }
  }

  if (status === "loading") {
    return <p className="text-white/70">Chargement…</p>;
  }

  if (session?.user) {
    return (
      <div className="mx-auto max-w-md rounded-xl border border-white/10 bg-white/5 p-6">
        <h1 className="mb-2 text-2xl font-bold text-vgb-gold">Compte</h1>
        <p className="mb-1">Connecté : <strong>{session.user.name}</strong></p>
        <p className="mb-6 text-vgb-gold">
          Elo {session.user.elo} — {session.user.wins}V / {session.user.losses}D / {session.user.draws}N
        </p>
        <div className="flex flex-wrap gap-2">
          <Link href="/jouer" className="rounded-lg bg-gradient-to-r from-orange-500 to-vgb-gold px-4 py-2 font-bold text-black">
            Jouer
          </Link>
          <Link href="/decks" className="rounded-lg bg-purple-600 px-4 py-2 font-bold">
            Mes decks
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
            className="rounded-lg bg-red-700 px-4 py-2 font-bold"
          >
            Déconnexion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md rounded-xl border border-white/10 bg-white/5 p-6">
      <h1 className="mb-4 text-2xl font-bold text-vgb-gold">Compte en ligne</h1>
      <form className="space-y-4" onSubmit={onLogin}>
        <label className="block text-sm text-white/70">
          Pseudo
          <input
            className="mt-1 w-full rounded-lg border border-white/20 bg-black/30 px-3 py-3 text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            maxLength={24}
            required
          />
        </label>
        <label className="block text-sm text-white/70">
          Mot de passe
          <input
            type="password"
            className="mt-1 w-full rounded-lg border border-white/20 bg-black/30 px-3 py-3 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-lg border border-white bg-black px-4 py-3 font-bold"
          >
            Connexion
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onRegister}
            className="flex-1 rounded-lg bg-emerald-600 px-4 py-3 font-bold"
          >
            Créer un compte
          </button>
        </div>
      </form>
      <p className="mt-4 text-xs text-white/55">
        Compte stocké sur MongoDB Atlas — utilisable en local (`npm run dev`) et en prod Vercel.
      </p>
      {msg ? <p className="mt-3 text-sm text-red-300">{msg}</p> : null}
    </div>
  );
}
