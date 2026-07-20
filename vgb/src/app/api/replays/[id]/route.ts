import { NextResponse } from "next/server";
import Replay, { publicReplay } from "@/models/Replay";
import { requireUser } from "@/lib/session";

export const dynamic = "force-dynamic";

function errStatus(e: unknown) {
  return typeof e === "object" && e && "status" in e
    ? Number((e as { status: number }).status)
    : 500;
}

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, ctx: Ctx) {
  try {
    const user = await requireUser();
    const { id } = await ctx.params;
    const replay = await Replay.findOne({ _id: id, userId: user._id });
    if (!replay) {
      return NextResponse.json({ ok: false, error: "Replay introuvable" }, { status: 404 });
    }
    if (replay.type !== "favorite") {
      return NextResponse.json(
        { ok: false, error: "Seuls les favoris peuvent être renommés" },
        { status: 400 }
      );
    }

    const body = await req.json().catch(() => ({}));
    if (body.name != null) {
      replay.name = String(body.name).trim().slice(0, 60) || replay.name;
    }
    await replay.save();
    return NextResponse.json({ ok: true, replay: publicReplay(replay) });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Erreur" },
      { status: errStatus(e) }
    );
  }
}

export async function DELETE(_req: Request, ctx: Ctx) {
  try {
    const user = await requireUser();
    const { id } = await ctx.params;
    const result = await Replay.deleteOne({ _id: id, userId: user._id });
    if (!result.deletedCount) {
      return NextResponse.json({ ok: false, error: "Replay introuvable" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Erreur" },
      { status: errStatus(e) }
    );
  }
}
