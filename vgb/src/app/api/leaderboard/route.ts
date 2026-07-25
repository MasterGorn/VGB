import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const limit = Math.max(1, Math.min(100, Number(searchParams.get("limit") || 20)));
    const mode = searchParams.get("mode") === "classic" ? "classic" : "vgb";

    if (mode === "classic") {
      const users = await User.find({})
        .sort({ eloClassic: -1, winsClassic: -1, username: 1 })
        .limit(limit)
        .lean();

      const leaderboard = users.map((u, i) => ({
        rank: i + 1,
        id: String(u._id),
        username: u.username,
        elo: u.eloClassic ?? 1000,
        wins: u.winsClassic ?? 0,
        losses: u.lossesClassic ?? 0,
        draws: u.drawsClassic ?? 0,
        winStreak: u.winStreakClassic ?? 0,
        bestWinStreak: u.bestWinStreakClassic ?? 0,
        mode: "classic" as const,
      }));

      return NextResponse.json({ ok: true, mode, leaderboard });
    }

    const users = await User.find({})
      .sort({ elo: -1, wins: -1, username: 1 })
      .limit(limit)
      .lean();

    const leaderboard = users.map((u, i) => ({
      rank: i + 1,
      id: String(u._id),
      username: u.username,
      elo: u.elo,
      wins: u.wins,
      losses: u.losses,
      draws: u.draws,
      winStreak: u.winStreak ?? 0,
      bestWinStreak: u.bestWinStreak ?? 0,
      mode: "vgb" as const,
    }));

    return NextResponse.json({ ok: true, mode, leaderboard });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Erreur" },
      { status: 500 }
    );
  }
}
