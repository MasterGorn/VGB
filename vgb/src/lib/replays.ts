import Replay, {
  AUTO_REPLAY_LIMIT,
  FAVORITE_REPLAY_LIMIT,
  type ReplayMeta,
  type ReplayResult,
  validateReplayPayload,
} from "@/models/Replay";
import type { ReplayDoc } from "@/models/Replay";
import type mongoose from "mongoose";

function normalizeMeta(meta: Partial<ReplayMeta> | undefined, payload: Record<string, unknown>) {
  const moveLog = Array.isArray(payload.moveLog) ? payload.moveLog : [];
  const players = Array.isArray(payload.players) ? payload.players : [];
  const ranking = Array.isArray(meta?.ranking)
    ? meta.ranking
    : Array.isArray(payload.ranking)
      ? (payload.ranking as number[])
      : [];

  return {
    gridSize: Number(meta?.gridSize ?? payload.gridSize ?? 9),
    opponent: String(meta?.opponent ?? "").slice(0, 60),
    result: (meta?.result ?? "D") as ReplayResult,
    ranking,
    moveCount: Number(meta?.moveCount ?? moveLog.length),
    savedAt: meta?.savedAt ? new Date(meta.savedAt) : new Date(),
  };
}

function kingsInLastSnapshot(payload: Record<string, unknown>): number {
  const log = Array.isArray(payload.moveLog) ? payload.moveLog : [];
  const last = log[log.length - 1] as { pieces?: { type?: string }[] } | undefined;
  if (!last || !Array.isArray(last.pieces)) return 99;
  return last.pieces.filter((p) => p.type === "king").length;
}

function isBetterReplayPayload(
  next: Record<string, unknown>,
  current: Record<string, unknown> | undefined
): boolean {
  if (!current) return true;
  const nextLog = Array.isArray(next.moveLog) ? next.moveLog : [];
  const currentLog = Array.isArray(current.moveLog) ? current.moveLog : [];
  if (nextLog.length > currentLog.length) return true;
  if (nextLog.length < currentLog.length) return false;
  return kingsInLastSnapshot(next) < kingsInLastSnapshot(current);
}

async function trimAutoReplays(userId: mongoose.Types.ObjectId) {
  const autos = await Replay.find({ userId, type: "auto" })
    .sort({ createdAt: 1 })
    .select("_id");
  const excess = autos.length - AUTO_REPLAY_LIMIT;
  if (excess <= 0) return;
  const toDelete = autos.slice(0, excess).map((r) => r._id);
  await Replay.deleteMany({ _id: { $in: toDelete } });
}

export async function saveAutoReplay(
  userId: mongoose.Types.ObjectId,
  payloadInput: unknown,
  options?: { matchId?: string | null; meta?: Partial<ReplayMeta> }
) {
  const payload = validateReplayPayload(payloadInput);
  const matchId = options?.matchId ? String(options.matchId) : null;
  const meta = normalizeMeta(options?.meta, payload);

  if (matchId) {
    const existing = await Replay.findOne({ userId, type: "auto", matchId });
    if (existing) {
      const existingPayload =
        existing.payload && typeof existing.payload === "object"
          ? (existing.payload as Record<string, unknown>)
          : undefined;
      if (isBetterReplayPayload(payload, existingPayload)) {
        existing.payload = payload;
        existing.meta = meta;
        existing.name = "";
        await existing.save();
      }
      return existing;
    }
  }

  const replay = await Replay.create({
    userId,
    type: "auto",
    matchId,
    name: "",
    payload,
    meta,
  });

  await trimAutoReplays(userId);
  return replay;
}

export async function saveFavoriteReplay(
  userId: mongoose.Types.ObjectId,
  payloadInput: unknown,
  options?: { name?: string; meta?: Partial<ReplayMeta>; fromReplayId?: string }
) {
  const count = await Replay.countDocuments({ userId, type: "favorite" });
  if (count >= FAVORITE_REPLAY_LIMIT) {
    throw Object.assign(new Error(`Maximum ${FAVORITE_REPLAY_LIMIT} replays favoris`), {
      status: 400,
    });
  }

  let payload: Record<string, unknown>;
  let meta: ReplayMeta;
  let matchId: string | null = null;

  if (options?.fromReplayId) {
    const source = await Replay.findOne({ _id: options.fromReplayId, userId });
    if (!source) {
      throw Object.assign(new Error("Replay source introuvable"), { status: 404 });
    }
    payload = source.payload as Record<string, unknown>;
    meta = { ...source.meta };
    matchId = source.matchId;
  } else {
    payload = validateReplayPayload(payloadInput);
    meta = normalizeMeta(options?.meta, payload);
  }

  const defaultName =
    options?.name?.trim() ||
    (meta.opponent ? `vs ${meta.opponent}` : "Replay favori");

  return Replay.create({
    userId,
    type: "favorite",
    matchId,
    name: defaultName.slice(0, 60),
    payload,
    meta,
  });
}

export function resultForSeat(
  winnerSeat: unknown,
  seat: number,
  ranking?: number[]
): ReplayResult {
  if (Array.isArray(ranking) && ranking.length) {
    return ranking[0] === seat ? "W" : "L";
  }
  if (winnerSeat === 0 || winnerSeat === "0") return seat === 0 ? "W" : "L";
  if (winnerSeat === 1 || winnerSeat === "1") return seat === 1 ? "W" : "L";
  return "D";
}

export function opponentNameFromPayload(
  payload: Record<string, unknown>,
  seat: number
): string {
  const players = Array.isArray(payload.players) ? payload.players : [];
  const oppSeat = seat === 0 ? 1 : 0;
  const opp = players[oppSeat] as { name?: string } | undefined;
  return String(opp?.name || `Joueur ${oppSeat + 1}`).slice(0, 60);
}

export async function saveAutoReplayForMatchPlayers(
  match: { matchKey: string; gridSize: number; player1Id: mongoose.Types.ObjectId; player2Id: mongoose.Types.ObjectId },
  payloadInput: unknown,
  winnerSeat: unknown
) {
  const payload = validateReplayPayload(payloadInput);
  const ranking = Array.isArray(payload.ranking) ? (payload.ranking as number[]) : [];
  const moveCount = Array.isArray(payload.moveLog) ? payload.moveLog.length : 0;
  const saved: string[] = [];

  for (const entry of [
    { userId: match.player1Id, seat: 0 },
    { userId: match.player2Id, seat: 1 },
  ]) {
    try {
      const replay = await saveAutoReplay(entry.userId, payload, {
        matchId: match.matchKey,
        meta: {
          opponent: opponentNameFromPayload(payload, entry.seat),
          result: resultForSeat(winnerSeat, entry.seat, ranking),
          ranking,
          gridSize: match.gridSize,
          moveCount,
        },
      });
      saved.push(String(replay._id));
    } catch (e) {
      console.warn("Auto replay save failed", e);
    }
  }

  return saved;
}
