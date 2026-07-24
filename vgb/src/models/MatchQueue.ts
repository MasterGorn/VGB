import mongoose, { Schema, type HydratedDocument, type Model, Types } from "mongoose";

const matchQueueSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
    gridSize: { type: Number, default: 9 },
    gameMode: { type: String, enum: ["vgb", "classic"], default: "vgb", index: true },
    joinedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: false }
);

export type MatchQueueDoc = HydratedDocument<{
  userId: Types.ObjectId;
  gridSize: number;
  gameMode: "vgb" | "classic";
  joinedAt: Date;
}>;

const MatchQueue =
  (mongoose.models.MatchQueue as Model<MatchQueueDoc>) ||
  mongoose.model<MatchQueueDoc>("MatchQueue", matchQueueSchema);

export default MatchQueue;
