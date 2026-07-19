import { randomBytes } from "crypto";
import type { Types } from "mongoose";
import User, { publicUser, type UserDoc } from "@/models/User";
import Match, { type MatchDoc } from "@/models/Match";

export function newMatchKey() {
  return randomBytes(8).toString("hex");
}

export function seatOf(match: MatchDoc, userId: string | Types.ObjectId): 0 | 1 {
  const id = String(userId);
  if (String(match.player1Id) === id) return 0;
  return 1;
}

export async function matchPayload(match: MatchDoc, userId: string) {
  const seat = seatOf(match, userId);
  const oppId = seat === 0 ? match.player2Id : match.player1Id;
  const [me, opp] = await Promise.all([
    User.findById(userId),
    User.findById(oppId),
  ]);
  return {
    matchId: match.matchKey,
    seat,
    gridSize: match.gridSize,
    status: match.status,
    currentSeat: match.currentSeat,
    state: match.state || null,
    winnerId: match.winnerId ? String(match.winnerId) : null,
    you: me ? publicUser(me) : null,
    opponent: opp ? publicUser(opp) : null,
    updatedAt: match.updatedAt,
  };
}

export async function findActiveMatchForUser(userId: string | Types.ObjectId) {
  return Match.findOne({
    status: { $in: ["draft", "playing"] },
    $or: [{ player1Id: userId }, { player2Id: userId }],
  }).sort({ createdAt: -1 });
}

export function initialDraftState() {
  return {
    version: 0,
    armies: [null, null],
    factions: [null, null],
    names: [null, null],
  };
}

export function jsonError(e: unknown) {
  const status =
    typeof e === "object" && e && "status" in e
      ? Number((e as { status: number }).status)
      : 500;
  return {
    status,
    body: { ok: false as const, error: e instanceof Error ? e.message : "Erreur" },
  };
}

export type { UserDoc };
