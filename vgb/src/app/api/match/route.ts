import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { requireUser } from "@/lib/session";
import Match from "@/models/Match";
import MatchQueue from "@/models/MatchQueue";
import PrivateRoom from "@/models/PrivateRoom";
import User from "@/models/User";
import {
  findActiveMatchForUser,
  initialDraftState,
  jsonError,
  matchPayload,
  newMatchKey,
} from "@/lib/match";

export const dynamic = "force-dynamic";

function shortRoomCode() {
  return newMatchKey().slice(0, 6).toUpperCase();
}

async function createMatchFromPair(player1Id: string, player2Id: string, gridSize: number) {
  await MatchQueue.deleteOne({ userId: player1Id });
  await MatchQueue.deleteOne({ userId: player2Id });
  await PrivateRoom.deleteOne({ hostId: player1Id });
  await PrivateRoom.deleteOne({ hostId: player2Id });
  return Match.create({
    matchKey: newMatchKey(),
    player1Id,
    player2Id,
    gridSize,
    status: "draft",
    currentSeat: 0,
    state: initialDraftState(),
  });
}

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
      const privateRoom = await PrivateRoom.findOne({ hostId: user._id });
      return NextResponse.json({
        ok: true,
        matched: false,
        queued,
        privateRoom: privateRoom
          ? { roomCode: privateRoom.roomCode, targetUserId: privateRoom.targetUserId ? String(privateRoom.targetUserId) : null }
          : null,
      });
    }

    if (action === "createPrivate") {
      const gridSize = 9;
      const targetUserId = body.targetUserId ? String(body.targetUserId).trim() : null;

      const existing = await findActiveMatchForUser(user._id);
      if (existing) {
        return NextResponse.json({
          ok: true,
          matched: true,
          match: await matchPayload(existing, String(user._id)),
        });
      }

      await MatchQueue.deleteOne({ userId: user._id });

      if (targetUserId) {
        const target = await User.findById(targetUserId);
        if (!target) {
          return NextResponse.json({ ok: false, error: "Joueur introuvable" }, { status: 404 });
        }
        if (String(target._id) === String(user._id)) {
          return NextResponse.json({ ok: false, error: "Impossible de se défier soi-même" }, { status: 400 });
        }
      }

      let roomCode = shortRoomCode();
      for (let i = 0; i < 5; i++) {
        const clash = await PrivateRoom.findOne({ roomCode });
        if (!clash) break;
        roomCode = shortRoomCode();
      }

      const room = await PrivateRoom.findOneAndUpdate(
        { hostId: user._id },
        {
          $set: {
            roomCode,
            gridSize,
            targetUserId: targetUserId || null,
            createdAt: new Date(),
          },
        },
        { upsert: true, new: true }
      );

      return NextResponse.json({
        ok: true,
        privateRoom: {
          roomCode: room.roomCode,
          hostId: String(user._id),
          targetUserId: room.targetUserId ? String(room.targetUserId) : null,
        },
      });
    }

    if (action === "joinPrivate") {
      const gridSize = 9;
      const roomCode = body.roomCode ? String(body.roomCode).trim().toUpperCase() : "";
      const hostId = body.hostId ? String(body.hostId).trim() : "";

      const existing = await findActiveMatchForUser(user._id);
      if (existing) {
        return NextResponse.json({
          ok: true,
          matched: true,
          match: await matchPayload(existing, String(user._id)),
        });
      }

      let room = null;
      if (roomCode) {
        room = await PrivateRoom.findOne({ roomCode });
      } else if (hostId) {
        room = await PrivateRoom.findOne({ hostId });
      }

      if (!room) {
        return NextResponse.json({ ok: false, error: "Partie privée introuvable" }, { status: 404 });
      }
      if (String(room.hostId) === String(user._id)) {
        return NextResponse.json({ ok: false, error: "Vous avez créé cette partie — partagez le code à votre adversaire" }, { status: 400 });
      }
      if (room.targetUserId && String(room.targetUserId) !== String(user._id)) {
        return NextResponse.json({ ok: false, error: "Cette partie est réservée à un autre joueur" }, { status: 403 });
      }

      const match = await createMatchFromPair(String(room.hostId), String(user._id), room.gridSize || gridSize);
      return NextResponse.json({
        ok: true,
        matched: true,
        match: await matchPayload(match, String(user._id)),
      });
    }

    if (action === "cancelPrivate") {
      await PrivateRoom.deleteOne({ hostId: user._id });
      return NextResponse.json({ ok: true, cancelled: true });
    }

    return NextResponse.json(
      { ok: false, error: "Action inconnue. Utilisez enqueue, cancel, status, createPrivate, joinPrivate ou cancelPrivate." },
      { status: 400 }
    );
  } catch (e) {
    const { status, body } = jsonError(e);
    return NextResponse.json(body, { status });
  }
}
