import mongoose, { Schema, type HydratedDocument, type Model } from "mongoose";

export const ROLE_LIMITS_VGB = {
  pawn: 9,
  knight: 2,
  bishop: 2,
  rook: 2,
  queen: 1,
  unique: 1,
} as const;

export const ROLE_LIMITS_CLASSIC = {
  pawn: 8,
  knight: 2,
  bishop: 2,
  rook: 2,
  queen: 1,
} as const;

/** @deprecated use ROLE_LIMITS_VGB */
export const ROLE_LIMITS = ROLE_LIMITS_VGB;

export type ChessRole = keyof typeof ROLE_LIMITS_VGB;
export type GameMode = "vgb" | "classic";

const slotSchema = new Schema(
  {
    role: { type: String, required: true },
    pieceKey: { type: String, required: true },
  },
  { _id: false }
);

const deckSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, default: "Mon deck", maxlength: 40 },
    faction: {
      type: String,
      required: true,
      enum: ["Nintendo", "PlayStation", "SEGA", "Xbox"],
    },
    gameMode: {
      type: String,
      enum: ["vgb", "classic"],
      default: "vgb",
      index: true,
    },
    slots: { type: [slotSchema], required: true },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export type DeckSlot = { role: string; pieceKey: string };

export type DeckDoc = HydratedDocument<{
  userId: mongoose.Types.ObjectId;
  name: string;
  faction: "Nintendo" | "PlayStation" | "SEGA" | "Xbox";
  gameMode: GameMode;
  slots: DeckSlot[];
  isDefault: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}>;

const Deck =
  (mongoose.models.Deck as Model<DeckDoc>) ||
  mongoose.model<DeckDoc>("Deck", deckSchema);

export default Deck;

export function roleLimitsForMode(mode: GameMode = "vgb") {
  return mode === "classic" ? ROLE_LIMITS_CLASSIC : ROLE_LIMITS_VGB;
}

export function validateSlots(slots: unknown, mode: GameMode = "vgb"): DeckSlot[] {
  if (!Array.isArray(slots)) {
    throw Object.assign(new Error("slots invalides"), { status: 400 });
  }
  const limits = roleLimitsForMode(mode);
  const counts: Record<string, number> = Object.fromEntries(
    Object.keys(limits).map((r) => [r, 0])
  );
  const clean: DeckSlot[] = [];
  for (const slot of slots) {
    const role = String((slot as { role?: string }).role || "");
    const pieceKey = String(
      (slot as { pieceKey?: string; nameKey?: string }).pieceKey ||
        (slot as { nameKey?: string }).nameKey ||
        ""
    ).trim();
    if (!(role in limits)) {
      throw Object.assign(new Error("Rôle inconnu pour ce mode: " + role), { status: 400 });
    }
    if (!pieceKey || pieceKey.length > 64 || !/^[a-zA-Z0-9_\-]+$/.test(pieceKey)) {
      throw Object.assign(new Error("pieceKey invalide"), { status: 400 });
    }
    counts[role] += 1;
    clean.push({ role, pieceKey });
  }
  for (const [role, limit] of Object.entries(limits)) {
    if (counts[role] !== limit) {
      throw Object.assign(
        new Error(`Quota ${role} incorrect (${counts[role]}/${limit})`),
        { status: 400 }
      );
    }
  }
  return clean;
}

export function publicDeck(deck: DeckDoc) {
  return {
    id: String(deck._id),
    name: deck.name,
    faction: deck.faction,
    gameMode: (deck.gameMode === "classic" ? "classic" : "vgb") as GameMode,
    slots: deck.slots,
    isDefault: !!deck.isDefault,
    updatedAt: deck.updatedAt,
    createdAt: deck.createdAt,
  };
}
