/**
 * Titres joueur : quelques titres de base + 1 par étape de progression
 * (du plus léger au plus badass).
 */

export type PlayerTitle = {
  id: string;
  label: string;
};

/** Titres toujours disponibles dès le début. */
export const DEFAULT_TITLES: readonly PlayerTitle[] = [
  { id: "default-nouveau", label: "Nouveau joueur" },
  { id: "default-amateur", label: "Amateur d'échecs" },
  { id: "default-collectionneur", label: "Collectionneur de jeux vidéo" },
  { id: "default-retro", label: "Fan de rétro" },
  { id: "default-curieux", label: "Curieux du plateau" },
] as const;

/** 99 titres progression — index 0 = étape 1. */
export const PROGRESSION_TITLES = [
  { stage: 1, id: "stage-1", label: "Apprenti stratège" },
  { stage: 2, id: "stage-2", label: "Pion courageux" },
  { stage: 3, id: "stage-3", label: "Joueur du dimanche" },
  { stage: 4, id: "stage-4", label: "Éclaireur pixel" },
  { stage: 5, id: "stage-5", label: "Étudiant du plateau" },
  { stage: 6, id: "stage-6", label: "Chasseur de pions" },
  { stage: 7, id: "stage-7", label: "Amateur confirmé" },
  { stage: 8, id: "stage-8", label: "Tactician en herbe" },
  { stage: 9, id: "stage-9", label: "Gardien de case" },
  { stage: 10, id: "stage-10", label: "Vétéran de salon" },
  { stage: 11, id: "stage-11", label: "Stratège novice" },
  { stage: 12, id: "stage-12", label: "Capitaine d'armée" },
  { stage: 13, id: "stage-13", label: "Maître des ouvertures" },
  { stage: 14, id: "stage-14", label: "Chasseur de tours" },
  { stage: 15, id: "stage-15", label: "Virtuose du tempo" },
  { stage: 16, id: "stage-16", label: "Seigneur des cases" },
  { stage: 17, id: "stage-17", label: "As du milieu de jeu" },
  { stage: 18, id: "stage-18", label: "Dominateur de faction" },
  { stage: 19, id: "stage-19", label: "Architecte de mat" },
  { stage: 20, id: "stage-20", label: "Champion de salon" },
  { stage: 21, id: "stage-21", label: "Stratège affûté" },
  { stage: 22, id: "stage-22", label: "Prédateur de rois" },
  { stage: 23, id: "stage-23", label: "Maître des combos" },
  { stage: 24, id: "stage-24", label: "Seigneur de guerre pixel" },
  { stage: 25, id: "stage-25", label: "Virtuose du sacrifice" },
  { stage: 26, id: "stage-26", label: "Empereur de l'ouverture" },
  { stage: 27, id: "stage-27", label: "Chasseur d'élites" },
  { stage: 28, id: "stage-28", label: "Légende locale" },
  { stage: 29, id: "stage-29", label: "Terreur du flop" },
  { stage: 30, id: "stage-30", label: "Grand tacticien" },
  { stage: 31, id: "stage-31", label: "Souverain du plateau" },
  { stage: 32, id: "stage-32", label: "Maître des endgames" },
  { stage: 33, id: "stage-33", label: "Briseur de défenses" },
  { stage: 34, id: "stage-34", label: "Prophète des mats" },
  { stage: 35, id: "stage-35", label: "Seigneur des pixels" },
  { stage: 36, id: "stage-36", label: "Dominateur Elo" },
  { stage: 37, id: "stage-37", label: "As des combats épiques" },
  { stage: 38, id: "stage-38", label: "Virtuose du blitz" },
  { stage: 39, id: "stage-39", label: "Architecte de victoires" },
  { stage: 40, id: "stage-40", label: "Champion confirmé" },
  { stage: 41, id: "stage-41", label: "Maître des arènes" },
  { stage: 42, id: "stage-42", label: "Faucheur de rois" },
  { stage: 43, id: "stage-43", label: "Stratège d'élite" },
  { stage: 44, id: "stage-44", label: "Seigneur des factions" },
  { stage: 45, id: "stage-45", label: "Terreur classée" },
  { stage: 46, id: "stage-46", label: "Virtuose du mat éclair" },
  { stage: 47, id: "stage-47", label: "Empereur des duels" },
  { stage: 48, id: "stage-48", label: "Légende montante" },
  { stage: 49, id: "stage-49", label: "Chasseur de champions" },
  { stage: 50, id: "stage-50", label: "Demi-dieu du plateau" },
  { stage: 51, id: "stage-51", label: "Grand maître en herbe" },
  { stage: 52, id: "stage-52", label: "Souverain des pixels" },
  { stage: 53, id: "stage-53", label: "Prophète de la victoire" },
  { stage: 54, id: "stage-54", label: "Seigneur de l'échiquier" },
  { stage: 55, id: "stage-55", label: "Terreur des lobbies" },
  { stage: 56, id: "stage-56", label: "Virtuose absolu" },
  { stage: 57, id: "stage-57", label: "Architecte de dynasties" },
  { stage: 58, id: "stage-58", label: "As des légendes" },
  { stage: 59, id: "stage-59", label: "Dominateur mythique" },
  { stage: 60, id: "stage-60", label: "Grand maître" },
  { stage: 61, id: "stage-61", label: "Empereur du cyberespace" },
  { stage: 62, id: "stage-62", label: "Faucheur immortel" },
  { stage: 63, id: "stage-63", label: "Stratège transcendant" },
  { stage: 64, id: "stage-64", label: "Seigneur des arènes" },
  { stage: 65, id: "stage-65", label: "Terreur légendaire" },
  { stage: 66, id: "stage-66", label: "Virtuose divin" },
  { stage: 67, id: "stage-67", label: "Prophète des combats" },
  { stage: 68, id: "stage-68", label: "Champion des mondes" },
  { stage: 69, id: "stage-69", label: "Légende vivante" },
  { stage: 70, id: "stage-70", label: "Grand maître d'élite" },
  { stage: 71, id: "stage-71", label: "Souverain absolu" },
  { stage: 72, id: "stage-72", label: "Dieu du tempo" },
  { stage: 73, id: "stage-73", label: "Empereur des mats" },
  { stage: 74, id: "stage-74", label: "Seigneur cosmique" },
  { stage: 75, id: "stage-75", label: "Terreur ultime" },
  { stage: 76, id: "stage-76", label: "Virtuose des dieux" },
  { stage: 77, id: "stage-77", label: "Architecte de l'impossible" },
  { stage: 78, id: "stage-78", label: "As transcendant" },
  { stage: 79, id: "stage-79", label: "Dominateur éternel" },
  { stage: 80, id: "stage-80", label: "Grand maître suprême" },
  { stage: 81, id: "stage-81", label: "Empereur immortel" },
  { stage: 82, id: "stage-82", label: "Faucheur des légendes" },
  { stage: 83, id: "stage-83", label: "Stratège divin" },
  { stage: 84, id: "stage-84", label: "Seigneur des univers" },
  { stage: 85, id: "stage-85", label: "Terreur mythologique" },
  { stage: 86, id: "stage-86", label: "Virtuose apocalyptique" },
  { stage: 87, id: "stage-87", label: "Prophète des empires" },
  { stage: 88, id: "stage-88", label: "Champion des dieux" },
  { stage: 89, id: "stage-89", label: "Légende immortelle" },
  { stage: 90, id: "stage-90", label: "Grand maître cosmique" },
  { stage: 91, id: "stage-91", label: "Souverain des galaxies" },
  { stage: 92, id: "stage-92", label: "Dieu de l'échiquier" },
  { stage: 93, id: "stage-93", label: "Empereur du néant" },
  { stage: 94, id: "stage-94", label: "Seigneur de l'infini" },
  { stage: 95, id: "stage-95", label: "Terreur des dieux" },
  { stage: 96, id: "stage-96", label: "Virtuose absolu ultime" },
  { stage: 97, id: "stage-97", label: "Architecte de l'éternité" },
  { stage: 98, id: "stage-98", label: "Roi des légendes" },
  { stage: 99, id: "stage-99", label: "Légende ultime de VGB" },
] as const;

export type ProgressionTitle = (typeof PROGRESSION_TITLES)[number];

const ALL_BY_ID: Map<string, PlayerTitle> = new Map();
for (const t of DEFAULT_TITLES) ALL_BY_ID.set(t.id, t);
for (const t of PROGRESSION_TITLES) ALL_BY_ID.set(t.id, { id: t.id, label: t.label });

export function progressionTitleForStage(stage: number) {
  const s = Math.max(1, Math.min(99, Math.floor(stage)));
  return PROGRESSION_TITLES[s - 1];
}

export function allProgressionTitleIds(): string[] {
  return PROGRESSION_TITLES.map((t) => t.id);
}

export function getTitleById(id: string | null | undefined): PlayerTitle | null {
  if (!id) return null;
  return ALL_BY_ID.get(id) || null;
}

export function titleLabel(id: string | null | undefined): string {
  return getTitleById(id)?.label || "";
}

export function isKnownTitleId(id: string): boolean {
  return ALL_BY_ID.has(id);
}

export function isAllowedTitle(id: string, unlockedTitles: string[] = []) {
  if (!id) return false;
  if (DEFAULT_TITLES.some((t) => t.id === id)) return true;
  return Array.isArray(unlockedTitles) && unlockedTitles.includes(id) && isKnownTitleId(id);
}

/** Liste sélectionnable : défauts + débloqués. */
export function selectableTitles(unlockedTitles: string[] = []) {
  const seen = new Set<string>();
  const out: { id: string; label: string; unlocked: boolean }[] = [];
  for (const t of DEFAULT_TITLES) {
    seen.add(t.id);
    out.push({ id: t.id, label: t.label, unlocked: true });
  }
  for (const id of unlockedTitles || []) {
    if (!id || seen.has(id)) continue;
    const t = getTitleById(id);
    if (!t) continue;
    seen.add(id);
    out.push({ id: t.id, label: t.label, unlocked: true });
  }
  return out;
}

/** IDs débloqués pour les étapes déjà terminées. */
export function progressionTitleIdsThrough(
  currentStage: number,
  stageFullyCleared: boolean
): string[] {
  const maxCleared = stageFullyCleared
    ? Math.max(1, Math.min(99, Math.floor(currentStage)))
    : Math.max(0, Math.min(99, Math.floor(currentStage) - 1));
  const ids: string[] = [];
  for (let s = 1; s <= maxCleared; s++) {
    ids.push(progressionTitleForStage(s).id);
  }
  return ids;
}
