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
    elo: { type: Number, default: 1000 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    /** Derniers résultats : 'W' | 'L' | 'D' (plus récent en premier), max 10 */
    recentResults: {
      type: [{ type: String, enum: ["W", "L", "D"] }],
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.index({ username: 1 }, { unique: true, collation: { locale: "en", strength: 2 } });
userSchema.index({ elo: -1, wins: -1 });

export type UserDoc = HydratedDocument<{
  username: string;
  passwordHash: string;
  elo: number;
  wins: number;
  losses: number;
  draws: number;
  recentResults: Array<"W" | "L" | "D">;
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
    recentResults: Array.isArray(user.recentResults) ? user.recentResults.slice(0, 10) : [],
  };
}

/** Ajoute un résultat en tête (max 10). */
export function pushRecentResult(
  user: UserDoc,
  result: "W" | "L" | "D"
) {
  const next = [result, ...(user.recentResults || [])].slice(0, 10);
  user.recentResults = next as UserDoc["recentResults"];
}
