import mongoose, { Schema, type HydratedDocument, type Model, Types } from "mongoose";

export type MatchStatus = "draft" | "playing" | "finished";

const matchSchema = new Schema(
  {
    matchKey: { type: String, required: true, unique: true, index: true },
    player1Id: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    player2Id: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    gridSize: { type: Number, default: 9 },
    status: {
      type: String,
      enum: ["draft", "playing", "finished"],
      default: "draft",
      index: true,
    },
    currentSeat: { type: Number, default: 0 },
    winnerId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    state: { type: Schema.Types.Mixed, default: () => ({ version: 0 }) },
  },
  { timestamps: true }
);

matchSchema.index({ status: 1, updatedAt: -1 });
matchSchema.index({ player1Id: 1, status: 1 });
matchSchema.index({ player2Id: 1, status: 1 });

export type MatchDoc = HydratedDocument<{
  matchKey: string;
  player1Id: Types.ObjectId;
  player2Id: Types.ObjectId;
  gridSize: number;
  status: MatchStatus;
  currentSeat: number;
  winnerId: Types.ObjectId | null;
  state: Record<string, unknown>;
  createdAt?: Date;
  updatedAt?: Date;
}>;

const Match =
  (mongoose.models.Match as Model<MatchDoc>) ||
  mongoose.model<MatchDoc>("Match", matchSchema);

export default Match;
