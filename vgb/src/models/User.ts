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
    /** Séries de victoires (VGB / classic) */
    winStreak: { type: Number, default: 0 },
    bestWinStreak: { type: Number, default: 0 },
    winStreakClassic: { type: Number, default: 0 },
    bestWinStreakClassic: { type: Number, default: 0 },
    /** Avatar (chemin image public, ex. /images/nintendo/characters/mario.png) */
    avatarUrl: { type: String, default: "", maxlength: 200 },
    /** ISO 3166-1 alpha-2 (ex. FR, JP, US) */
    countryCode: { type: String, default: "", maxlength: 2, uppercase: true },
    /** Dernière activité (partie / connexion) */
    lastPlayedAt: { type: Date, default: Date.now },
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
  winStreak: number;
  bestWinStreak: number;
  winStreakClassic: number;
  bestWinStreakClassic: number;
  avatarUrl: string;
  countryCode: string;
  lastPlayedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}>;

/**
 * Next.js HMR peut garder un ancien `mongoose.models.User` sans les nouveaux champs.
 * On complète le schéma existant plutôt que de le supprimer (readonly côté types TS).
 */
function getUserModel(): Model<UserDoc> {
  const existing = mongoose.models.User as Model<UserDoc> | undefined;
  if (existing) {
    if (!existing.schema.path("avatarUrl")) {
      existing.schema.add({
        avatarUrl: { type: String, default: "", maxlength: 200 },
      });
    }
    if (!existing.schema.path("countryCode")) {
      existing.schema.add({
        countryCode: { type: String, default: "", maxlength: 2, uppercase: true },
      });
    }
    if (!existing.schema.path("lastPlayedAt")) {
      existing.schema.add({
        lastPlayedAt: { type: Date, default: Date.now },
      });
    }
    if (!existing.schema.path("winStreak")) {
      existing.schema.add({
        winStreak: { type: Number, default: 0 },
        bestWinStreak: { type: Number, default: 0 },
        winStreakClassic: { type: Number, default: 0 },
        bestWinStreakClassic: { type: Number, default: 0 },
      });
    }
    return existing;
  }
  return mongoose.model<UserDoc>("User", userSchema);
}

const User = getUserModel();

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
    winStreak: user.winStreak ?? 0,
    bestWinStreak: user.bestWinStreak ?? 0,
    winStreakClassic: user.winStreakClassic ?? 0,
    bestWinStreakClassic: user.bestWinStreakClassic ?? 0,
    avatarUrl: user.avatarUrl || "",
    countryCode: (user.countryCode || "").toUpperCase(),
    recentResults: Array.isArray(user.recentResults) ? user.recentResults.slice(0, 10) : [],
    recentResultsClassic: Array.isArray(user.recentResultsClassic)
      ? user.recentResultsClassic.slice(0, 10)
      : [],
  };
}

/** Met à jour la série de victoires après un résultat. */
export function applyWinStreak(
  user: UserDoc,
  result: "W" | "L" | "D",
  mode: "vgb" | "classic" = "vgb"
) {
  if (mode === "classic") {
    if (result === "W") {
      user.winStreakClassic = (user.winStreakClassic || 0) + 1;
      user.bestWinStreakClassic = Math.max(
        user.bestWinStreakClassic || 0,
        user.winStreakClassic
      );
    } else {
      user.winStreakClassic = 0;
    }
    return;
  }
  if (result === "W") {
    user.winStreak = (user.winStreak || 0) + 1;
    user.bestWinStreak = Math.max(user.bestWinStreak || 0, user.winStreak);
  } else {
    user.winStreak = 0;
  }
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

/** Avatars autorisés (chemins relatifs au site). */
export const ALLOWED_AVATARS = [
  "/images/nintendo/characters/mario.png",
  "/images/nintendo/characters/luigi.png",
  "/images/nintendo/characters/peach.png",
  "/images/nintendo/characters/bowser.png",
  "/images/nintendo/characters/link.png",
  "/images/nintendo/characters/zelda.png",
  "/images/nintendo/characters/samus.png",
  "/images/nintendo/characters/kirby.png",
  "/images/nintendo/characters/pikachu.png",
  "/images/nintendo/characters/fox-mccloud.png",
  "/images/sega/characters/sonic.png",
  "/images/sega/characters/tails.png",
  "/images/playstation/characters/kratos.png",
  "/images/playstation/characters/astro-bot.png",
  "/images/xbox/characters/masterchief.png",
  "/images/xbox/characters/crash-bandicoot.png",
] as const;

export function isAllowedAvatar(url: string) {
  return (ALLOWED_AVATARS as readonly string[]).includes(url);
}

export function isValidCountryCode(code: string) {
  return /^[A-Z]{2}$/.test(String(code || "").toUpperCase());
}
