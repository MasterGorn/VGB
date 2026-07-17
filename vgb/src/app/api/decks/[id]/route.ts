import { NextResponse } from "next/server";
import Deck, { publicDeck, validateSlots } from "@/models/Deck";
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
    const deck = await Deck.findOne({ _id: id, userId: user._id });
    if (!deck) {
      return NextResponse.json({ ok: false, error: "Deck introuvable" }, { status: 404 });
    }

    const body = await req.json();
    if (body.name != null) {
      deck.name = String(body.name).trim().slice(0, 40) || deck.name;
    }
    if (body.faction != null) {
      const faction = String(body.faction);
      if (!["Nintendo", "PlayStation", "SEGA", "Xbox"].includes(faction)) {
        return NextResponse.json({ ok: false, error: "Faction invalide" }, { status: 400 });
      }
      deck.faction = faction as typeof deck.faction;
    }
    if (body.slots != null) {
      deck.set("slots", validateSlots(body.slots));
    }
    if (body.isDefault === true) {
      await Deck.updateMany({ userId: user._id }, { $set: { isDefault: false } });
      deck.isDefault = true;
    } else if (body.isDefault === false) {
      deck.isDefault = false;
    }

    await deck.save();
    return NextResponse.json({ ok: true, deck: publicDeck(deck) });
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
    const result = await Deck.deleteOne({ _id: id, userId: user._id });
    if (!result.deletedCount) {
      return NextResponse.json({ ok: false, error: "Deck introuvable" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Erreur" },
      { status: errStatus(e) }
    );
  }
}
