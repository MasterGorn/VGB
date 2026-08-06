import { NextResponse } from "next/server";
import { requireUser } from "@/lib/session";
import { publicUser } from "@/models/User";
import { awardGameCoins, claimDailyLoginBonus } from "@/lib/coins";

export const dynamic = "force-dynamic";

/**
 * POST { action: "game", result: "W"|"L"|"D" } — parties locales / IA
 * POST { action: "daily" } — forcer le claim quotidien (sinon auto via /api/profile)
 */
export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = await req.json().catch(() => ({}));
    const action = String(body.action || "");

    if (action === "daily") {
      const daily = claimDailyLoginBonus(user);
      if (!daily.alreadyClaimed) {
        user.markModified("coins");
        user.markModified("loginStreak");
        user.markModified("lastDailyBonusDay");
        await user.save();
      }
      return NextResponse.json({
        ok: true,
        awarded: daily.awarded,
        alreadyClaimed: daily.alreadyClaimed,
        loginStreak: daily.loginStreak,
        user: publicUser(user),
      });
    }

    if (action === "game") {
      const raw = String(body.result || "").toUpperCase();
      const result = raw === "W" || raw === "L" || raw === "D" ? raw : null;
      if (!result) {
        return NextResponse.json(
          { ok: false, error: "result requis (W|L|D)" },
          { status: 400 }
        );
      }
      const { awarded, coins } = awardGameCoins(user, result);
      user.markModified("coins");
      await user.save();
      return NextResponse.json({
        ok: true,
        awarded,
        coins,
        user: publicUser(user),
      });
    }

    return NextResponse.json(
      { ok: false, error: "Action inconnue (game|daily)" },
      { status: 400 }
    );
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
