import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { requireUser } from "@/lib/session";
import Match from "@/models/Match";
import MatchQueue from "@/models/MatchQueue";
import {
  findActiveMatchForUser,
  initialDraftState,
  jsonError,
  matchPayload,
  newMatchKey,
} from "@/lib/match";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    await connectDB();
    const body = await req.json().catch(() => ({}));
    const action = String(body.action || "");

    if (action === "enqueue") {
      const gridSize = 9;
      const existing = await findActiveMatchForUser(user._id);
      if (existing) {
        return NextResponse.json({
          ok: true,
          matched: true,
          match: await matchPayload(existing, String(user._id)),
        });
      }

      const waiting = await MatchQueue.findOneAndDelete({
        userId: { $ne: user._id },
        gridSize,
      }).sort({ joinedAt: 1 });

      if (waiting) {
        await MatchQueue.deleteOne({ userId: user._id });
        const match = await Match.create({
          matchKey: newMatchKey(),
          player1Id: waiting.userId,
          player2Id: user._id,
          gridSize,
          status: "draft",
          currentSeat: 0,
          state: initialDraftState(),
        });
        return NextResponse.json({
          ok: true,
          matched: true,
          match: await matchPayload(match, String(user._id)),
        });
      }

      await MatchQueue.findOneAndUpdate(
        { userId: user._id },
        { $set: { gridSize, joinedAt: new Date() } },
        { upsert: true, new: true }
      );
      return NextResponse.json({
        ok: true,
        matched: false,
        queued: true,
        gridSize,
      });
    }

    if (action === "cancel") {
      await MatchQueue.deleteOne({ userId: user._id });
      return NextResponse.json({ ok: true, cancelled: true });
    }

    if (action === "status") {
      const active = await findActiveMatchForUser(user._id);
      if (active) {
        return NextResponse.json({
          ok: true,
          matched: true,
          match: await matchPayload(active, String(user._id)),
        });
      }
      const queued = !!(await MatchQueue.findOne({ userId: user._id }));
      return NextResponse.json({ ok: true, matched: false, queued });
    }

    return NextResponse.json(
      { ok: false, error: "Action inconnue. Utilisez enqueue, cancel ou status." },
      { status: 400 }
    );
  } catch (e) {
    const { status, body } = jsonError(e);
    return NextResponse.json(body, { status });
  }
}
