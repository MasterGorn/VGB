"use client";

import { useEffect, useState } from "react";

type Row = {
  rank: number;
  username: string;
  elo: number;
  wins: number;
  losses: number;
  draws: number;
};

export default function ClassementPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/leaderboard?limit=50");
        const data = await res.json();
        if (!res.ok || !data.ok) throw new Error(data.error || "Erreur");
        setRows(data.leaderboard || []);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erreur");
      }
    })();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-vgb-gold">Classement Elo</h1>
      {error ? <p className="text-red-300">{error}</p> : null}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-white/10 text-white/60">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Joueur</th>
              <th className="px-4 py-3">Elo</th>
              <th className="px-4 py-3">V / D / N</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.rank + r.username} className="border-b border-white/5">
                <td className="px-4 py-3">{r.rank}</td>
                <td className="px-4 py-3 font-semibold">{r.username}</td>
                <td className="px-4 py-3 text-vgb-gold">{r.elo}</td>
                <td className="px-4 py-3 text-white/70">
                  {r.wins} / {r.losses} / {r.draws}
                </td>
              </tr>
            ))}
            {!rows.length && !error ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-white/60">
                  Aucun joueur encore. Créez un compte pour apparaître ici.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
