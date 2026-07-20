import mongoose, { Schema, type HydratedDocument, type Model } from "mongoose";

export const AUTO_REPLAY_LIMIT = 5;
export const FAVORITE_REPLAY_LIMIT = 10;

export type ReplayType = "auto" | "favorite";
export type ReplayResult = "W" | "L" | "D";

const replaySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    type: { type: String, enum: ["auto", "favorite"], required: true, index: true },
    matchId: { type: String, default: null, index: true },
    name: { type: String, default: "", maxlength: 60 },
    payload: { type: Schema.Types.Mixed, required: true },
    meta: {
      gridSize: { type: Number, default: 9 },
      opponent: { type: String, default: "" },
      result: { type: String, enum: ["W", "L", "D"], default: "D" },
      ranking: { type: [Number], default: [] },
      moveCount: { type: Number, default: 0 },
      savedAt: { type: Date, default: () => new Date() },
    },
  },
  { timestamps: true }
);

replaySchema.index({ userId: 1, type: 1, createdAt: -1 });
replaySchema.index(
  { userId: 1, matchId: 1, type: 1 },
  { unique: true, partialFilterExpression: { type: "auto", matchId: { $type: "string" } } }
);

export type ReplayMeta = {
  gridSize?: number;
  opponent?: string;
  result?: ReplayResult;
  ranking?: number[];
  moveCount?: number;
  savedAt?: Date;
};

export type ReplayDoc = HydratedDocument<{
  userId: mongoose.Types.ObjectId;
  type: ReplayType;
  matchId: string | null;
  name: string;
  payload: Record<string, unknown>;
  meta: ReplayMeta;
  createdAt?: Date;
  updatedAt?: Date;
}>;

const Replay =
  (mongoose.models.Replay as Model<ReplayDoc>) ||
  mongoose.model<ReplayDoc>("Replay", replaySchema);

export default Replay;

export function publicReplay(replay: ReplayDoc, includePayload = false) {
  const base = {
    id: String(replay._id),
    type: replay.type,
    matchId: replay.matchId || null,
    name: replay.name || "",
    meta: {
      gridSize: replay.meta?.gridSize ?? 9,
      opponent: replay.meta?.opponent ?? "",
      result: replay.meta?.result ?? "D",
      ranking: Array.isArray(replay.meta?.ranking) ? replay.meta.ranking : [],
      moveCount: replay.meta?.moveCount ?? 0,
      savedAt: replay.meta?.savedAt ?? replay.createdAt,
    },
    createdAt: replay.createdAt,
    updatedAt: replay.updatedAt,
  };
  if (includePayload) {
    return { ...base, payload: replay.payload };
  }
  return base;
}

export function validateReplayPayload(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    throw Object.assign(new Error("Replay invalide"), { status: 400 });
  }
  const moveLog = (payload as { moveLog?: unknown }).moveLog;
  if (!Array.isArray(moveLog) || !moveLog.length) {
    throw Object.assign(new Error("moveLog requis"), { status: 400 });
  }
  return payload as Record<string, unknown>;
}

export function mergeMoveLogIntoPayload(
  payloadInput: unknown,
  moveLog: unknown[] | null | undefined
) {
  const payload =
    payloadInput && typeof payloadInput === "object"
      ? { ...(payloadInput as Record<string, unknown>) }
      : ({} as Record<string, unknown>);

  const existing = payload.moveLog;
  if ((!Array.isArray(existing) || !existing.length) && Array.isArray(moveLog) && moveLog.length) {
    payload.moveLog = moveLog;
  }

  return validateReplayPayload(payload);
}
