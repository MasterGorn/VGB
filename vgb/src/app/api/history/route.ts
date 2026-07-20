import { NextResponse } from "next/server";
import { requireUser } from "@/lib/session";
import { publicUser } from "@/models/User";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await requireUser();
    const results = (Array.isArray(user.recentResults) ? user.recentResults : []).slice(
      0,
      5
    ) as Array<"W" | "L" | "D">;
    const slots: Array<"W" | "L" | "D" | null> = [...results];
    while (slots.length < 5) slots.push(null);

    return NextResponse.json({
      ok: true,
      user: publicUser(user),
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
