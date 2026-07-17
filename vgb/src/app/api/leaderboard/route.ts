import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const limit = Math.max(1, Math.min(100, Number(searchParams.get("limit") || 20)));
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
    }));

    return NextResponse.json({ ok: true, leaderboard });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Erreur" },
      { status: 500 }
    );
  }
}
