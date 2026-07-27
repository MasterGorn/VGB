import { NextResponse } from "next/server";
import { publicUser, type UserDoc } from "@/models/User";
import { requireUser } from "@/lib/session";
import {
  PROGRESSION_STAGE_COUNT,
  allMissionsDone,
  applyEventToMissions,
  canUnlockNextStage,
  getAllStages,
  getStage,
  msUntilNextDay,
  progressionAvatarUrlsThrough,
  type ProgressEvent,
} from "@/lib/progression";
import { progressionTitleIdsThrough } from "@/lib/progression-titles";

export const dynamic = "force-dynamic";

function normalizeTrioBool(arr: unknown): boolean[] {
  const a = Array.isArray(arr) ? arr : [];
  return [0, 1, 2].map((i) => !!a[i]);
}

function normalizeTrioNum(arr: unknown): number[] {
  const a = Array.isArray(arr) ? arr : [];
  return [0, 1, 2].map((i) => Math.max(0, Number(a[i] || 0)));
}

function ensureProgressDefaults(user: UserDoc) {
  if (!user.progressionStage || user.progressionStage < 1) user.progressionStage = 1;
  if (user.progressionStage > PROGRESSION_STAGE_COUNT) {
    user.progressionStage = PROGRESSION_STAGE_COUNT;
  }
  if (!user.progressionLevel || user.progressionLevel < 1) {
    user.progressionLevel = user.progressionStage;
  }
  user.progressionMissionDone = normalizeTrioBool(user.progressionMissionDone);
  user.progressionMissionProgress = normalizeTrioNum(user.progressionMissionProgress);
  if (!Array.isArray(user.unlockedAvatars)) user.unlockedAvatars = [];
  if (!Array.isArray(user.unlockedBadges)) user.unlockedBadges = [];
  if (!Array.isArray(user.unlockedTitles)) user.unlockedTitles = [];
  if (typeof user.titleId !== "string") user.titleId = "";
}

function grantStageReward(user: UserDoc, stageNum: number) {
  const reward = getStage(stageNum).reward;
  if (reward.avatarUrl && !user.unlockedAvatars.includes(reward.avatarUrl)) {
    user.unlockedAvatars.push(reward.avatarUrl);
  }
  if (reward.titleId && !user.unlockedTitles.includes(reward.titleId)) {
    user.unlockedTitles.push(reward.titleId);
  }
}

/** Rattrapage : débloque avatars + titres des étapes déjà terminées. */
function backfillUnlockedRewards(user: UserDoc) {
  ensureProgressDefaults(user);
  const clearedNow =
    !!user.progressionStageClearedAt &&
    allMissionsDone(normalizeTrioBool(user.progressionMissionDone));
  for (const url of progressionAvatarUrlsThrough(user.progressionStage, clearedNow)) {
    if (!user.unlockedAvatars.includes(url)) user.unlockedAvatars.push(url);
  }
  for (const id of progressionTitleIdsThrough(user.progressionStage, clearedNow)) {
    if (!user.unlockedTitles.includes(id)) user.unlockedTitles.push(id);
  }
}

/** Passe à l’étape suivante si l’étape est claire et qu’un nouveau jour a commencé. */
function tryAdvanceStage(user: UserDoc, now = new Date()) {
  ensureProgressDefaults(user);
  const done = normalizeTrioBool(user.progressionMissionDone);
  if (!allMissionsDone(done)) return { advanced: false, waiting: false };

  if (!user.progressionStageClearedAt) {
    user.progressionStageClearedAt = now;
    grantStageReward(user, user.progressionStage);
  }

  if (user.progressionStage >= PROGRESSION_STAGE_COUNT) {
    return { advanced: false, waiting: false, finished: true as const };
  }

  if (!canUnlockNextStage(user.progressionStageClearedAt, now)) {
    return { advanced: false, waiting: true as const };
  }

  const cleared = user.progressionStage;
  user.progressionStage = cleared + 1;
  user.progressionLevel = user.progressionStage;
  user.progressionMissionDone = [false, false, false];
  user.progressionMissionProgress = [0, 0, 0];
  user.progressionStageClearedAt = null;
  return { advanced: true as const, waiting: false, from: cleared, to: user.progressionStage };
}

function boardPayload(user: UserDoc, advance: ReturnType<typeof tryAdvanceStage> | null = null) {
  ensureProgressDefaults(user);
  const now = new Date();
  const stage = getStage(user.progressionStage);
  const done = normalizeTrioBool(user.progressionMissionDone);
  const progress = normalizeTrioNum(user.progressionMissionProgress);
  const cleared = allMissionsDone(done);
  const waitingNextDay =
    cleared &&
    user.progressionStage < PROGRESSION_STAGE_COUNT &&
    !!user.progressionStageClearedAt &&
    !canUnlockNextStage(user.progressionStageClearedAt, now);

  return {
    user: publicUser(user),
    level: user.progressionLevel,
    currentStage: user.progressionStage,
    stage,
    missions: stage.missions.map((m, i) => ({
      ...m,
      done: !!done[i],
      progress: progress[i] || 0,
      target: m.target || 1,
    })),
    stageCleared: cleared,
    waitingNextDay,
    msUntilUnlock: waitingNextDay ? msUntilNextDay(now) : 0,
    stageClearedAt: user.progressionStageClearedAt,
    stages: getAllStages().map((s) => ({
      stage: s.stage,
      level: s.level,
      title: s.title,
      theme: s.theme,
      reward: s.reward,
      status:
        s.stage < user.progressionStage
          ? "done"
          : s.stage === user.progressionStage
            ? cleared
              ? waitingNextDay
                ? "cleared"
                : "current"
              : "current"
            : "locked",
    })),
    advance,
  };
}

export async function GET() {
  try {
    const user = await requireUser();
    ensureProgressDefaults(user);
    backfillUnlockedRewards(user);
    const advance = tryAdvanceStage(user);
    user.markModified("progressionMissionDone");
    user.markModified("progressionMissionProgress");
    user.markModified("unlockedAvatars");
    user.markModified("unlockedBadges");
    user.markModified("unlockedTitles");
    await user.save();
    return NextResponse.json({ ok: true, ...boardPayload(user, advance) });
  } catch (e) {
    const status =
      typeof e === "object" && e && "status" in e
        ? Number((e as { status: number }).status)
        : 500;
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Erreur" },
      { status }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    ensureProgressDefaults(user);
    tryAdvanceStage(user);

    const body = await req.json().catch(() => ({}));
    const action = String(body.action || "event");

    if (action === "share" || body.type === "share") {
      const stage = getStage(user.progressionStage);
      const done = normalizeTrioBool(user.progressionMissionDone);
      if (allMissionsDone(done)) {
        const advance = tryAdvanceStage(user);
        await user.save();
        return NextResponse.json({
          ok: true,
          ...boardPayload(user, advance),
          message: "Étape déjà terminée — reviens demain",
        });
      }
      const applied = applyEventToMissions(
        stage,
        done,
        normalizeTrioNum(user.progressionMissionProgress),
        { type: "share" }
      );
      user.progressionMissionDone = applied.done;
      user.progressionMissionProgress = applied.progress;
      if (allMissionsDone(applied.done) && !user.progressionStageClearedAt) {
        user.progressionStageClearedAt = new Date();
        grantStageReward(user, user.progressionStage);
      }
      user.markModified("progressionMissionDone");
      user.markModified("progressionMissionProgress");
      user.markModified("unlockedAvatars");
      user.markModified("unlockedBadges");
      user.markModified("unlockedTitles");
      await user.save();
      return NextResponse.json({
        ok: true,
        newlyCompleted: applied.newlyCompleted,
        ...boardPayload(user, null),
      });
    }

    // Événement de partie
    const event: ProgressEvent = {
      type: "game",
      won: !!body.won,
      faction: body.faction,
      usedItems: !!body.usedItems,
      captures: Number(body.captures || 0),
      mateRole: body.mateRole ?? null,
      myElo: body.myElo != null ? Number(body.myElo) : null,
      opponentElo: body.opponentElo != null ? Number(body.opponentElo) : null,
      gameMode: body.gameMode === "classic" ? "classic" : "vgb",
      moveCount: Number(body.moveCount || 0),
      winStreak: Number(body.winStreak || 0),
    };

    const done = normalizeTrioBool(user.progressionMissionDone);
    if (allMissionsDone(done)) {
      const advance = tryAdvanceStage(user);
      await user.save();
      return NextResponse.json({
        ok: true,
        ...boardPayload(user, advance),
        message: "Étape déjà terminée — reviens demain pour la suivante",
      });
    }

    const stage = getStage(user.progressionStage);
    const applied = applyEventToMissions(
      stage,
      done,
      normalizeTrioNum(user.progressionMissionProgress),
      event
    );
    user.progressionMissionDone = applied.done;
    user.progressionMissionProgress = applied.progress;
    if (allMissionsDone(applied.done) && !user.progressionStageClearedAt) {
      user.progressionStageClearedAt = new Date();
      grantStageReward(user, user.progressionStage);
    }
    user.markModified("progressionMissionDone");
    user.markModified("progressionMissionProgress");
    user.markModified("unlockedAvatars");
    user.markModified("unlockedBadges");
    user.markModified("unlockedTitles");
    await user.save();

    return NextResponse.json({
      ok: true,
      newlyCompleted: applied.newlyCompleted,
      ...boardPayload(user, null),
    });
  } catch (e) {
    const status =
      typeof e === "object" && e && "status" in e
        ? Number((e as { status: number }).status)
        : 500;
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Erreur" },
      { status }
    );
  }
}
