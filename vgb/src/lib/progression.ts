/**
 * Progression type Mario / Duolingo : 99 étapes × 3 missions.
 * Génération déterministe + évaluation d’événements partie / partage.
 * Chaque étape débloque un avatar + un titre (hors defaults).
 */

import { progressionAvatarForStage } from "@/lib/progression-avatars";
import { progressionTitleForStage } from "@/lib/progression-titles";

export const PROGRESSION_STAGE_COUNT = 99;
export const MISSIONS_PER_STAGE = 3;

export type MissionKind =
  | "win_faction"
  | "play_no_items"
  | "share_site"
  | "play_n"
  | "win_n"
  | "capture_n"
  | "beat_higher_elo"
  | "mate_role"
  | "win_streak"
  | "win_mode"
  | "win_under_moves";

export type FactionName = "Nintendo" | "PlayStation" | "Xbox" | "SEGA";
export type ChessRole = "pawn" | "rook" | "knight" | "bishop" | "queen" | "unique";

export type MissionDef = {
  id: string;
  kind: MissionKind;
  label: string;
  /** Cible numérique (parties, captures, coups, série…) */
  target?: number;
  faction?: FactionName;
  role?: ChessRole;
  mode?: "vgb" | "classic";
};

export type StageDef = {
  stage: number;
  level: number;
  title: string;
  theme: string;
  missions: MissionDef[];
  reward: {
    type: "avatar";
    label: string;
    avatarUrl: string;
    titleId: string;
    titleLabel: string;
  };
};

export type GameProgressEvent = {
  type: "game";
  won: boolean;
  faction?: string;
  usedItems?: boolean;
  captures?: number;
  mateRole?: string | null;
  myElo?: number | null;
  opponentElo?: number | null;
  gameMode?: "vgb" | "classic";
  moveCount?: number;
  winStreak?: number;
};

export type ShareProgressEvent = {
  type: "share";
};

export type ProgressEvent = GameProgressEvent | ShareProgressEvent;

const FACTIONS: FactionName[] = ["Nintendo", "PlayStation", "Xbox", "SEGA"];
const ROLES: ChessRole[] = ["pawn", "rook", "knight", "bishop", "queen", "unique"];
const ROLE_LABEL: Record<ChessRole, string> = {
  pawn: "un Pion",
  rook: "une Tour",
  knight: "un Cavalier",
  bishop: "un Fou",
  queen: "une Dame",
  unique: "une pièce Unique",
};

const THEMES = [
  "Plaine champignon",
  "Désert de sable",
  "Forêt mystique",
  "Montagne glacée",
  "Château hanté",
  "Ciel nuageux",
  "Volcan",
  "Royaume aquatique",
  "Usine",
  "Citadelle finale",
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function stageTheme(stage: number) {
  return THEMES[Math.floor((stage - 1) / 10) % THEMES.length];
}

function buildStage1(): StageDef {
  return {
    stage: 1,
    level: 1,
    title: "Départ de l’aventure",
    theme: stageTheme(1),
    missions: [
      {
        id: "s1-m0",
        kind: "win_faction",
        faction: "Xbox",
        label: "Gagner une partie avec Xbox",
      },
      {
        id: "s1-m1",
        kind: "play_no_items",
        label: "Jouer une partie sans utiliser d’objets",
      },
      {
        id: "s1-m2",
        kind: "share_site",
        label: "Partager le site à un autre joueur",
      },
    ],
    reward: rewardForStage(1),
  };
}

function missionForSlot(stage: number, slot: number): MissionDef {
  const id = `s${stage}-m${slot}`;
  const tier = Math.ceil(stage / 10); // 1..10
  const faction = FACTIONS[(stage + slot) % FACTIONS.length];
  const role = ROLES[(stage + slot * 2) % ROLES.length];

  // Rotation des types selon l’étape et le slot (hors étape 1)
  const catalog: MissionKind[] = [
    "win_faction",
    "play_n",
    "win_n",
    "capture_n",
    "beat_higher_elo",
    "mate_role",
    "win_streak",
    "win_mode",
    "play_no_items",
    "win_under_moves",
  ];
  const kind = catalog[(stage + slot * 3) % catalog.length];

  switch (kind) {
    case "win_faction":
      return {
        id,
        kind,
        faction,
        label: `Gagner une partie avec ${faction}`,
      };
    case "play_no_items":
      return {
        id,
        kind,
        label:
          stage < 20
            ? "Jouer une partie sans objets"
            : "Gagner une partie sans utiliser d’objets",
      };
    case "play_n": {
      const target = clamp(1 + Math.floor(stage / 8), 1, 8);
      return {
        id,
        kind,
        target,
        label: target === 1 ? "Jouer 1 partie" : `Jouer ${target} parties`,
      };
    }
    case "win_n": {
      const target = clamp(1 + Math.floor(stage / 12), 1, 5);
      return {
        id,
        kind,
        target,
        label: target === 1 ? "Gagner 1 partie" : `Gagner ${target} parties`,
      };
    }
    case "capture_n": {
      const target = clamp(5 + stage, 5, 40);
      return {
        id,
        kind,
        target,
        label: `Capturer ${target} pièces en une partie`,
      };
    }
    case "beat_higher_elo":
      return {
        id,
        kind,
        label:
          stage < 30
            ? "Battre un joueur mieux classé"
            : `Battre un joueur avec +${10 + tier * 5} Elo`,
        target: stage < 30 ? 1 : 10 + tier * 5,
      };
    case "mate_role":
      return {
        id,
        kind,
        role,
        label: `Faire mat avec ${ROLE_LABEL[role]}`,
      };
    case "win_streak": {
      const target = clamp(2 + Math.floor(stage / 20), 2, 6);
      return {
        id,
        kind,
        target,
        label: `Enchaîner ${target} victoires`,
      };
    }
    case "win_mode": {
      const mode = stage % 2 === 0 ? "classic" : "vgb";
      return {
        id,
        kind,
        mode,
        label:
          mode === "classic"
            ? "Gagner une partie en échecs traditionnels"
            : "Gagner une partie en mode Video Games Battle",
      };
    }
    case "win_under_moves": {
      const target = clamp(80 - stage, 25, 70);
      return {
        id,
        kind,
        target,
        label: `Gagner en moins de ${target} coups`,
      };
    }
    default:
      return { id, kind: "play_n", target: 1, label: "Jouer 1 partie" };
  }
}

function rewardForStage(stage: number): StageDef["reward"] {
  const avatar = progressionAvatarForStage(stage);
  const title = progressionTitleForStage(stage);
  return {
    type: "avatar",
    label: `Avatar ${avatar.label} · Titre « ${title.label} »`,
    avatarUrl: avatar.url,
    titleId: title.id,
    titleLabel: title.label,
  };
}

export function getStage(stage: number): StageDef {
  const s = clamp(Math.floor(stage), 1, PROGRESSION_STAGE_COUNT);
  if (s === 1) return buildStage1();
  return {
    stage: s,
    level: s,
    title: `Étape ${s}`,
    theme: stageTheme(s),
    missions: [0, 1, 2].map((slot) => missionForSlot(s, slot)),
    reward: rewardForStage(s),
  };
}

export function getAllStages(): StageDef[] {
  return Array.from({ length: PROGRESSION_STAGE_COUNT }, (_, i) => getStage(i + 1));
}

/** URLs d’avatars débloquées pour les étapes déjà terminées. */
export function progressionAvatarUrlsThrough(
  currentStage: number,
  stageFullyCleared: boolean
): string[] {
  const maxCleared = stageFullyCleared
    ? clamp(Math.floor(currentStage), 1, PROGRESSION_STAGE_COUNT)
    : clamp(Math.floor(currentStage) - 1, 0, PROGRESSION_STAGE_COUNT);
  const urls: string[] = [];
  for (let s = 1; s <= maxCleared; s++) {
    urls.push(progressionAvatarForStage(s).url);
  }
  return urls;
}

/** Jour calendaire UTC YYYY-MM-DD */
export function dayKey(d: Date = new Date()) {
  return d.toISOString().slice(0, 10);
}

export function canUnlockNextStage(stageClearedAt: Date | string | null | undefined, now = new Date()) {
  if (!stageClearedAt) return true;
  const cleared = new Date(stageClearedAt);
  if (Number.isNaN(cleared.getTime())) return true;
  return dayKey(now) > dayKey(cleared);
}

export function msUntilNextDay(now = new Date()) {
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  return Math.max(0, next.getTime() - now.getTime());
}

function normFaction(f?: string): FactionName | "" {
  const x = String(f || "").trim();
  if (FACTIONS.includes(x as FactionName)) return x as FactionName;
  const low = x.toLowerCase();
  if (low.includes("nintendo")) return "Nintendo";
  if (low.includes("play")) return "PlayStation";
  if (low.includes("xbox")) return "Xbox";
  if (low.includes("sega")) return "SEGA";
  return "";
}

function normRole(r?: string | null): ChessRole | "" {
  const x = String(r || "").toLowerCase();
  if ((ROLES as string[]).includes(x)) return x as ChessRole;
  if (x.includes("tour") || x === "t") return "rook";
  if (x.includes("knight") || x === "cavalier" || x === "c") return "knight";
  if (x.includes("bishop") || x === "fou" || x === "f") return "bishop";
  if (x.includes("queen") || x === "dame" || x === "d") return "queen";
  if (x.includes("pawn") || x === "pion" || x === "p") return "pawn";
  if (x.includes("unique")) return "unique";
  return "";
}

/**
 * Applique un événement aux missions de l’étape courante.
 * `progress` = compteurs [0..target] par mission ; `done` = booléens.
 */
export function applyEventToMissions(
  stage: StageDef,
  done: boolean[],
  progress: number[],
  event: ProgressEvent
): { done: boolean[]; progress: number[]; newlyCompleted: number[] } {
  const nextDone = [!!done[0], !!done[1], !!done[2]];
  const nextProgress = [
    Number(progress[0] || 0),
    Number(progress[1] || 0),
    Number(progress[2] || 0),
  ];
  const newlyCompleted: number[] = [];

  stage.missions.forEach((m, i) => {
    if (nextDone[i]) return;

    let hit = false;
    let add = 0;

    if (event.type === "share") {
      if (m.kind === "share_site") hit = true;
    } else {
      const faction = normFaction(event.faction);
      const role = normRole(event.mateRole);
      const captures = Number(event.captures || 0);
      const moves = Number(event.moveCount || 0);
      const streak = Number(event.winStreak || 0);
      const usedItems = !!event.usedItems;
      const mode = event.gameMode === "classic" ? "classic" : "vgb";

      switch (m.kind) {
        case "share_site":
          break;
        case "win_faction":
          hit = !!event.won && faction === m.faction;
          break;
        case "play_no_items":
          if (stage.stage < 20) hit = !usedItems;
          else hit = !!event.won && !usedItems;
          break;
        case "play_n":
          add = 1;
          break;
        case "win_n":
          if (event.won) add = 1;
          break;
        case "capture_n":
          if (captures >= (m.target || 1)) hit = true;
          break;
        case "beat_higher_elo": {
          const my = Number(event.myElo || 0);
          const opp = Number(event.opponentElo || 0);
          if (!event.won || !(opp > 0)) break;
          const margin = Number(m.target || 1);
          if (margin <= 1) hit = opp > my;
          else hit = opp >= my + margin;
          break;
        }
        case "mate_role":
          hit = !!event.won && !!role && role === m.role;
          break;
        case "win_streak":
          if (event.won && streak >= (m.target || 2)) hit = true;
          break;
        case "win_mode":
          hit = !!event.won && mode === (m.mode || "vgb");
          break;
        case "win_under_moves":
          hit = !!event.won && moves > 0 && moves <= (m.target || 50);
          break;
        default:
          break;
      }
    }

    if (add > 0) {
      nextProgress[i] = Math.min(m.target || 1, nextProgress[i] + add);
      if (nextProgress[i] >= (m.target || 1)) hit = true;
    }

    if (hit) {
      nextDone[i] = true;
      nextProgress[i] = m.target || 1;
      newlyCompleted.push(i);
    }
  });

  return { done: nextDone, progress: nextProgress, newlyCompleted };
}

export function allMissionsDone(done: boolean[]) {
  return done.length >= 3 && done[0] && done[1] && done[2];
}
