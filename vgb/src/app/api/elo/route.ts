import { NextResponse } from "next/server";
import User, { publicUser } from "@/models/User";
import { eloUpdate, requireUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = await req.json();
    const opponentId = String(body.opponentId || "");
    const result = String(body.result || "");
    if (!opponentId || !["win", "loss", "draw"].includes(result)) {
      return NextResponse.json(
        { ok: false, error: "opponentId et result (win|loss|draw) requis" },
        { status: 400 }
      );
    }
    const opponent = await User.findById(opponentId);
    if (!opponent) {
      return NextResponse.json(
        { ok: false, error: "Adversaire introuvable" },
        { status: 404 }
      );
    }

    const scoreA = result === "win" ? 1 : result === "draw" ? 0.5 : 0;
    const [newA, newB] = eloUpdate(user.elo, opponent.elo, scoreA);
    user.elo = newA;
    opponent.elo = newB;
    if (result === "win") {
      user.wins += 1;
      opponent.losses += 1;
    } else if (result === "loss") {
      user.losses += 1;
      opponent.wins += 1;
    } else {
      user.draws += 1;
      opponent.draws += 1;
    }
    await user.save();
    await opponent.save();

    return NextResponse.json({
      ok: true,
      user: publicUser(user),
      opponent: publicUser(opponent),
    });
  } catch (e) {
    const status =
      typeof e === "object" && e && "status" in e
        ? Number((e as { status: number }).status)
        : 500;
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Erreur" },
      { status }
    );
  }
}
