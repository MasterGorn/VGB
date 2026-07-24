import mongoose, { Schema, type HydratedDocument, type Model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 24,
    },
    passwordHash: { type: String, required: true },
    /** Elo Video Games Battle (9×9) */
    elo: { type: Number, default: 1000 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    /** Elo échecs traditionnels (8×8) */
    eloClassic: { type: Number, default: 1000 },
    winsClassic: { type: Number, default: 0 },
    lossesClassic: { type: Number, default: 0 },
    drawsClassic: { type: Number, default: 0 },
    /** Derniers résultats VGB : 'W' | 'L' | 'D' (plus récent en premier), max 10 */
    recentResults: {
      type: [{ type: String, enum: ["W", "L", "D"] }],
      default: [],
    },
    recentResultsClassic: {
      type: [{ type: String, enum: ["W", "L", "D"] }],
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.index({ username: 1 }, { unique: true, collation: { locale: "en", strength: 2 } });
userSchema.index({ elo: -1, wins: -1 });
userSchema.index({ eloClassic: -1, winsClassic: -1 });

export type UserDoc = HydratedDocument<{
  username: string;
  passwordHash: string;
  elo: number;
  wins: number;
  losses: number;
  draws: number;
  eloClassic: number;
  winsClassic: number;
  lossesClassic: number;
  drawsClassic: number;
  recentResults: Array<"W" | "L" | "D">;
  recentResultsClassic: Array<"W" | "L" | "D">;
  createdAt?: Date;
  updatedAt?: Date;
}>;

const User =
  (mongoose.models.User as Model<UserDoc>) ||
  mongoose.model<UserDoc>("User", userSchema);

export default User;

export function publicUser(user: UserDoc) {
  return {
    id: String(user._id),
    username: user.username,
    elo: user.elo,
    wins: user.wins,
    losses: user.losses,
    draws: user.draws,
    eloClassic: user.eloClassic ?? 1000,
    winsClassic: user.winsClassic ?? 0,
    lossesClassic: user.lossesClassic ?? 0,
    drawsClassic: user.drawsClassic ?? 0,
    recentResults: Array.isArray(user.recentResults) ? user.recentResults.slice(0, 10) : [],
    recentResultsClassic: Array.isArray(user.recentResultsClassic)
      ? user.recentResultsClassic.slice(0, 10)
      : [],
  };
}

/** Ajoute un résultat en tête (max 10). */
export function pushRecentResult(
  user: UserDoc,
  result: "W" | "L" | "D",
  mode: "vgb" | "classic" = "vgb"
) {
  if (mode === "classic") {
    const next = [result, ...(user.recentResultsClassic || [])].slice(0, 10);
    user.recentResultsClassic = next as UserDoc["recentResultsClassic"];
    return;
  }
  const next = [result, ...(user.recentResults || [])].slice(0, 10);
  user.recentResults = next as UserDoc["recentResults"];
}

export function isClassicGrid(gridSize: number | undefined | null) {
  return Number(gridSize) === 8;
}
