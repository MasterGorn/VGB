import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Deck, { publicDeck, validateSlots } from "@/models/Deck";
import { requireUser } from "@/lib/session";

export const dynamic = "force-dynamic";

function errStatus(e: unknown) {
  return typeof e === "object" && e && "status" in e
    ? Number((e as { status: number }).status)
    : 500;
}

export async function GET(req: Request) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const deck = await Deck.findOne({ _id: id, userId: user._id });
      if (!deck) {
        return NextResponse.json({ ok: false, error: "Aucun deck" }, { status: 404 });
      }
      return NextResponse.json({ ok: true, deck: publicDeck(deck) });
    }

    const defaultOnly = searchParams.get("default") === "1";
    if (defaultOnly) {
      const deck = await Deck.findOne({ userId: user._id }).sort({
        isDefault: -1,
        updatedAt: -1,
      });
      if (!deck) {
        return NextResponse.json({ ok: false, error: "Aucun deck" }, { status: 404 });
      }
      return NextResponse.json({ ok: true, deck: publicDeck(deck) });
    }

    const decks = await Deck.find({ userId: user._id }).sort({
      isDefault: -1,
      updatedAt: -1,
    });
    return NextResponse.json({ ok: true, decks: decks.map(publicDeck) });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Erreur" },
      { status: errStatus(e) }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = await req.json();
    const name = String(body.name || "Mon deck").trim().slice(0, 40) || "Mon deck";
    const faction = String(body.faction || "");
    if (!["Nintendo", "PlayStation", "SEGA", "Xbox"].includes(faction)) {
      return NextResponse.json({ ok: false, error: "Faction invalide" }, { status: 400 });
    }
    const slots = validateSlots(body.slots);
    let isDefault = !!body.isDefault;

    const count = await Deck.countDocuments({ userId: user._id });
    if (count >= 5) {
      return NextResponse.json(
        { ok: false, error: "Maximum 5 decks par compte" },
        { status: 400 }
      );
    }
    if (count === 0) isDefault = true;
    if (isDefault) {
      await Deck.updateMany({ userId: user._id }, { $set: { isDefault: false } });
    }

    const deck = await Deck.create({
      userId: user._id,
      name,
      faction,
      slots,
      isDefault,
    });
    return NextResponse.json({ ok: true, deck: publicDeck(deck) });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Erreur" },
      { status: errStatus(e) }
    );
  }
}
