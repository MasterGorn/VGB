import { NextResponse } from "next/server";
import { requireUser } from "@/lib/session";
import User, { publicUser } from "@/models/User";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await requireUser();
    // Activité légère sans resauvegarder tout le document (évite d’effacer avatar/pays)
    await User.updateOne(
      { _id: user._id },
      { $set: { lastPlayedAt: new Date() } }
    );

    const results = (Array.isArray(user.recentResults) ? user.recentResults : []).slice(
      0,
      5
    ) as Array<"W" | "L" | "D">;
    const slots: Array<"W" | "L" | "D" | null> = [...results];
    while (slots.length < 5) slots.push(null);

    // Recharger pour publicUser à jour
    const fresh = (await User.findById(user._id)) || user;

    return NextResponse.json({
      ok: true,
      user: publicUser(fresh),
      results,
      slots,
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
