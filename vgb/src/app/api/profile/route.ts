import { NextResponse } from "next/server";
import { requireUser } from "@/lib/session";
import {
  publicUser,
  isAllowedAvatar,
  isValidCountryCode,
  selectableAvatars,
} from "@/models/User";
import { PROGRESSION_AVATARS } from "@/lib/progression-avatars";
import {
  allMissionsDone,
  progressionAvatarUrlsThrough,
} from "@/lib/progression";
import {
  isAllowedTitle,
  progressionTitleIdsThrough,
  selectableTitles,
} from "@/lib/progression-titles";

export const dynamic = "force-dynamic";

function normalizeTrioBool(arr: unknown): boolean[] {
  const a = Array.isArray(arr) ? arr : [];
  return [0, 1, 2].map((i) => !!a[i]);
}

export async function GET() {
  try {
    const user = await requireUser();
    if (!Array.isArray(user.unlockedAvatars)) user.unlockedAvatars = [];
    if (!Array.isArray(user.unlockedTitles)) user.unlockedTitles = [];
    if (typeof user.titleId !== "string") user.titleId = "";

    const stage = Math.max(1, Number(user.progressionStage) || 1);
    const clearedNow =
      !!user.progressionStageClearedAt &&
      allMissionsDone(normalizeTrioBool(user.progressionMissionDone));
    let changed = false;
    for (const url of progressionAvatarUrlsThrough(stage, clearedNow)) {
      if (!user.unlockedAvatars.includes(url)) {
        user.unlockedAvatars.push(url);
        changed = true;
      }
    }
    for (const id of progressionTitleIdsThrough(stage, clearedNow)) {
      if (!user.unlockedTitles.includes(id)) {
        user.unlockedTitles.push(id);
        changed = true;
      }
    }
    if (changed) {
      user.markModified("unlockedAvatars");
      user.markModified("unlockedTitles");
      await user.save();
    }

    const unlocked = user.unlockedAvatars;
    const labelByUrl = Object.fromEntries(
      PROGRESSION_AVATARS.map((a) => [a.url, a.label])
    );
    const avatars = selectableAvatars(unlocked, labelByUrl);
    const titles = selectableTitles(user.unlockedTitles);
    return NextResponse.json({
      ok: true,
      user: publicUser(user),
      avatars,
      titles,
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

export async function PATCH(req: Request) {
  try {
    const user = await requireUser();
    const body = await req.json().catch(() => ({}));
    const unlocked = Array.isArray(user.unlockedAvatars) ? user.unlockedAvatars : [];
    const unlockedTitles = Array.isArray(user.unlockedTitles) ? user.unlockedTitles : [];

    if (typeof body.avatarUrl === "string") {
      const url = body.avatarUrl.trim();
      if (url === "") {
        user.avatarUrl = "";
      } else if (!isAllowedAvatar(url, unlocked)) {
        return NextResponse.json(
          { ok: false, error: "Avatar non autorisé" },
          { status: 400 }
        );
      } else {
        user.avatarUrl = url;
      }
    }

    if (typeof body.titleId === "string") {
      const id = body.titleId.trim();
      if (id === "") {
        user.titleId = "";
      } else if (!isAllowedTitle(id, unlockedTitles)) {
        return NextResponse.json(
          { ok: false, error: "Titre non autorisé" },
          { status: 400 }
        );
      } else {
        user.titleId = id;
      }
    }

    if (typeof body.countryCode === "string") {
      const code = body.countryCode.trim().toUpperCase();
      if (code === "") {
        user.countryCode = "";
      } else if (!isValidCountryCode(code)) {
        return NextResponse.json(
          { ok: false, error: "Code pays invalide (ex. FR, JP, US)" },
          { status: 400 }
        );
      } else {
        user.countryCode = code;
      }
    }

    user.lastPlayedAt = new Date();
    user.markModified("avatarUrl");
    user.markModified("titleId");
    user.markModified("countryCode");
    await user.save();

    return NextResponse.json({ ok: true, user: publicUser(user) });
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
