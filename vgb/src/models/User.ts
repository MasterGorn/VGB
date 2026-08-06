import mongoose, { Schema, type HydratedDocument, type Model } from "mongoose";
import { titleLabel } from "@/lib/progression-titles";

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
    /** Email (mdp oublié, notifications). Unique si renseigné. */
    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
      maxlength: 120,
    },
    passwordResetToken: { type: String, default: "" },
    passwordResetExpires: { type: Date, default: null },
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
    /** Progression plateau (99 étapes) */
    progressionStage: { type: Number, default: 1, min: 1, max: 99 },
    progressionLevel: { type: Number, default: 1, min: 1, max: 99 },
    progressionMissionDone: { type: [Boolean], default: [false, false, false] },
    progressionMissionProgress: { type: [Number], default: [0, 0, 0] },
    progressionStageClearedAt: { type: Date, default: null },
    unlockedAvatars: { type: [String], default: [] },
    unlockedBadges: { type: [String], default: [] },
    /** Titre affiché sous le pseudo (id DEFAULT_TITLES / PROGRESSION_TITLES) */
    titleId: { type: String, default: "", maxlength: 40 },
    unlockedTitles: { type: [String], default: [] },
    /** Monnaie in-game (boutique future) */
    coins: { type: Number, default: 0, min: 0 },
    /** Jour de la série de connexion (1..7) */
    loginStreak: { type: Number, default: 0, min: 0, max: 7 },
    /** Dernier jour (YYYY-MM-DD) où le bonus quotidien a été réclamé */
    lastDailyBonusDay: { type: String, default: "", maxlength: 10 },
  },
  { timestamps: true }
);

userSchema.index({ username: 1 }, { unique: true, collation: { locale: "en", strength: 2 } });
userSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { email: { $type: "string", $gt: "" } },
    collation: { locale: "en", strength: 2 },
  }
);
userSchema.index({ elo: -1, wins: -1 });
userSchema.index({ eloClassic: -1, winsClassic: -1 });

export type UserDoc = HydratedDocument<{
  username: string;
  passwordHash: string;
  email: string;
  passwordResetToken: string;
  passwordResetExpires: Date | null;
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
  progressionStage: number;
  progressionLevel: number;
  progressionMissionDone: boolean[];
  progressionMissionProgress: number[];
  progressionStageClearedAt: Date | null;
  unlockedAvatars: string[];
  unlockedBadges: string[];
  titleId: string;
  unlockedTitles: string[];
  coins: number;
  loginStreak: number;
  lastDailyBonusDay: string;
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
    if (!existing.schema.path("progressionStage")) {
      existing.schema.add({
        progressionStage: { type: Number, default: 1, min: 1, max: 99 },
        progressionLevel: { type: Number, default: 1, min: 1, max: 99 },
        progressionMissionDone: { type: [Boolean], default: [false, false, false] },
        progressionMissionProgress: { type: [Number], default: [0, 0, 0] },
        progressionStageClearedAt: { type: Date, default: null },
        unlockedAvatars: { type: [String], default: [] },
        unlockedBadges: { type: [String], default: [] },
      });
    }
    if (!existing.schema.path("titleId")) {
      existing.schema.add({
        titleId: { type: String, default: "", maxlength: 40 },
        unlockedTitles: { type: [String], default: [] },
      });
    }
    if (!existing.schema.path("email")) {
      existing.schema.add({
        email: { type: String, default: "", trim: true, lowercase: true, maxlength: 120 },
        passwordResetToken: { type: String, default: "" },
        passwordResetExpires: { type: Date, default: null },
      });
    }
    if (!existing.schema.path("coins")) {
      existing.schema.add({
        coins: { type: Number, default: 0, min: 0 },
        loginStreak: { type: Number, default: 0, min: 0, max: 7 },
        lastDailyBonusDay: { type: String, default: "", maxlength: 10 },
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
    email: user.email || "",
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
    progressionStage: user.progressionStage || 1,
    progressionLevel: user.progressionLevel || 1,
    unlockedAvatars: Array.isArray(user.unlockedAvatars) ? user.unlockedAvatars : [],
    unlockedBadges: Array.isArray(user.unlockedBadges) ? user.unlockedBadges : [],
    titleId: user.titleId || "",
    title: titleLabel(user.titleId) || "",
    unlockedTitles: Array.isArray(user.unlockedTitles) ? user.unlockedTitles : [],
    coins: Math.max(0, Number(user.coins) || 0),
    loginStreak: Math.max(0, Number(user.loginStreak) || 0),
    lastDailyBonusDay: user.lastDailyBonusDay || "",
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

/** Avatars de base toujours disponibles (hors progression). */
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

export const DEFAULT_AVATAR_OPTIONS = [
  { url: "/images/nintendo/characters/mario.png", label: "Mario" },
  { url: "/images/nintendo/characters/luigi.png", label: "Luigi" },
  { url: "/images/nintendo/characters/peach.png", label: "Peach" },
  { url: "/images/nintendo/characters/bowser.png", label: "Bowser" },
  { url: "/images/nintendo/characters/link.png", label: "Link" },
  { url: "/images/nintendo/characters/zelda.png", label: "Zelda" },
  { url: "/images/nintendo/characters/samus.png", label: "Samus" },
  { url: "/images/nintendo/characters/kirby.png", label: "Kirby" },
  { url: "/images/nintendo/characters/pikachu.png", label: "Pikachu" },
  { url: "/images/nintendo/characters/fox-mccloud.png", label: "Fox" },
  { url: "/images/sega/characters/sonic.png", label: "Sonic" },
  { url: "/images/sega/characters/tails.png", label: "Tails" },
  { url: "/images/playstation/characters/kratos.png", label: "Kratos" },
  { url: "/images/playstation/characters/astro-bot.png", label: "Astro" },
  { url: "/images/xbox/characters/masterchief.png", label: "Chief" },
  { url: "/images/xbox/characters/crash-bandicoot.png", label: "Crash" },
] as const;

/** Avatar autorisé = défaut OU débloqué via progression. */
export function isAllowedAvatar(url: string, unlockedAvatars: string[] = []) {
  if ((ALLOWED_AVATARS as readonly string[]).includes(url)) return true;
  return Array.isArray(unlockedAvatars) && unlockedAvatars.includes(url);
}

/** Liste sélectionnable pour le profil (défauts + débloqués). */
export function selectableAvatars(
  unlockedAvatars: string[] = [],
  labelByUrl: Record<string, string> = {}
) {
  const seen = new Set<string>();
  const out: { url: string; label: string; unlocked: boolean }[] = [];
  for (const a of DEFAULT_AVATAR_OPTIONS) {
    seen.add(a.url);
    out.push({ url: a.url, label: labelByUrl[a.url] || a.label, unlocked: true });
  }
  for (const url of unlockedAvatars || []) {
    if (!url || seen.has(url)) continue;
    seen.add(url);
    if (labelByUrl[url]) {
      out.push({ url, label: labelByUrl[url], unlocked: true });
      continue;
    }
    const name =
      url.split("/").pop()?.replace(/\.png$/i, "").replace(/[-_]/g, " ") || "Avatar";
    const label = name.replace(/\b\w/g, (c) => c.toUpperCase());
    out.push({ url, label, unlocked: true });
  }
  return out;
}

export function isValidCountryCode(code: string) {
  return /^[A-Z]{2}$/.test(String(code || "").toUpperCase());
}
