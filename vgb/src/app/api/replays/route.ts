import { NextResponse } from "next/server";
import Replay, {
  AUTO_REPLAY_LIMIT,
  FAVORITE_REPLAY_LIMIT,
  mergeMoveLogIntoPayload,
  publicReplay,
  validateReplayPayload,
} from "@/models/Replay";
import { requireUser } from "@/lib/session";
import { saveAutoReplay, saveFavoriteReplay } from "@/lib/replays";

export const dynamic = "force-dynamic";

function errStatus(e: unknown) {
  return typeof e === "object" && e && "status" in e
    ? Number((e as { status: number }).status)
    : 500;
}

export async function GET(req: Request) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const replay = await Replay.findOne({ _id: id, userId: user._id });
      if (!replay) {
        return NextResponse.json({ ok: false, error: "Replay introuvable" }, { status: 404 });
      }
      const entry = publicReplay(replay, true) as ReturnType<typeof publicReplay> & {
        payload?: Record<string, unknown>;
      };
      const payload = entry.payload;
      if (!payload || !Array.isArray(payload.moveLog) || !payload.moveLog.length) {
        return NextResponse.json(
          { ok: false, error: "Replay corrompu — données de coups manquantes" },
          { status: 422 }
        );
      }
      return NextResponse.json({ ok: true, replay: entry });
    }

    const type = searchParams.get("type");
    const filter: Record<string, unknown> = { userId: user._id };
    if (type === "auto" || type === "favorite") filter.type = type;

    const replays = await Replay.find(filter).sort({ createdAt: -1 });
    const auto = replays.filter((r) => r.type === "auto").map((r) => publicReplay(r));
    const favorites = replays.filter((r) => r.type === "favorite").map((r) => publicReplay(r));

    return NextResponse.json({
      ok: true,
      auto,
      favorites,
      limits: { auto: AUTO_REPLAY_LIMIT, favorite: FAVORITE_REPLAY_LIMIT },
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Erreur" },
      { status: errStatus(e) }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = await req.json().catch(() => ({}));
    const type = String(body.type || "favorite");

    if (type === "auto") {
      const moveLog = Array.isArray(body.moveLog) ? body.moveLog : null;
      const payload = mergeMoveLogIntoPayload(body.payload, moveLog);
      const replay = await saveAutoReplay(user._id, payload, {
        matchId: body.matchId ? String(body.matchId) : null,
        meta: body.meta,
      });
      return NextResponse.json({ ok: true, replay: publicReplay(replay) });
    }

    if (type === "favorite") {
      const replay = await saveFavoriteReplay(user._id, body.payload, {
        name: body.name ? String(body.name) : undefined,
        meta: body.meta,
        fromReplayId: body.fromReplayId ? String(body.fromReplayId) : undefined,
      });
      return NextResponse.json({ ok: true, replay: publicReplay(replay) });
    }

    return NextResponse.json({ ok: false, error: "Type invalide" }, { status: 400 });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Erreur" },
      { status: errStatus(e) }
    );
  }
}
