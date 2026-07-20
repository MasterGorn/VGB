import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { eloUpdate, requireUser } from "@/lib/session";
import User, { publicUser, pushRecentResult } from "@/models/User";
import Match from "@/models/Match";
import Replay from "@/models/Replay";
import { jsonError, seatOf } from "@/lib/match";
import {
  opponentNameFromPayload,
  resultForSeat,
  saveAutoReplay,
  saveAutoReplayForMatchPlayers,
} from "@/lib/replays";
import { mergeMoveLogIntoPayload } from "@/models/Replay";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    await connectDB();
    const body = await req.json().catch(() => ({}));
    const action = String(body.action || "");
    const matchId = String(body.matchId || "");
    if (!matchId) {
      return NextResponse.json({ ok: false, error: "matchId requis" }, { status: 400 });
    }

    const match = await Match.findOne({ matchKey: matchId });
    if (!match) {
      return NextResponse.json({ ok: false, error: "Partie introuvable" }, { status: 404 });
    }

    const userId = String(user._id);
    if (userId !== String(match.player1Id) && userId !== String(match.player2Id)) {
      return NextResponse.json({ ok: false, error: "Accès refusé" }, { status: 403 });
    }

    const seat = seatOf(match, userId);
    const state =
      match.state && typeof match.state === "object"
        ? { ...(match.state as Record<string, unknown>) }
        : {};

    if (action === "get") {
      const oppId = seat === 0 ? match.player2Id : match.player1Id;
      const opp = await User.findById(oppId);
      return NextResponse.json({
        ok: true,
        matchId: match.matchKey,
        seat,
        status: match.status,
        gridSize: match.gridSize,
        currentSeat: match.currentSeat,
        state,
        winnerId: match.winnerId ? String(match.winnerId) : null,
        opponent: opp ? publicUser(opp) : null,
        updatedAt: match.updatedAt,
      });
    }

    if (action === "setDraft") {
      if (match.status !== "draft") {
        return NextResponse.json({ ok: false, error: "Draft terminé" }, { status: 400 });
      }
      const faction = String(body.faction || "Nintendo");
      const army = Array.isArray(body.army) ? body.army : null;
      const name = String(body.name || user.username).trim() || user.username;
      if (!army) {
        return NextResponse.json({ ok: false, error: "Armée invalide" }, { status: 400 });
      }

      const armies = Array.isArray(state.armies) ? [...(state.armies as unknown[])] : [null, null];
      const factions = Array.isArray(state.factions)
        ? [...(state.factions as unknown[])]
        : [null, null];
      const names = Array.isArray(state.names) ? [...(state.names as unknown[])] : [null, null];
      armies[seat] = army;
      factions[seat] = faction;
      names[seat] = name;

      const nextState = {
        ...state,
        armies,
        factions,
        names,
        version: Number(state.version || 0) + 1,
      };
      const bothReady = armies[0] != null && armies[1] != null;
      if (bothReady) {
        (nextState as { started?: boolean }).started = true;
      }

      match.state = nextState;
      match.status = bothReady ? "playing" : "draft";
      await match.save();

      return NextResponse.json({
        ok: true,
        status: match.status,
        state: nextState,
        bothReady,
      });
    }

    if (action === "pushState") {
      if (match.status !== "playing") {
        return NextResponse.json({ ok: false, error: "Partie non active" }, { status: 400 });
      }
      const newState = body.state;
      const currentSeat =
        typeof body.currentSeat === "number" ? body.currentSeat : match.currentSeat;
      if (!newState || typeof newState !== "object") {
        return NextResponse.json({ ok: false, error: "state invalide" }, { status: 400 });
      }

      const incomingVersion = Number((newState as { version?: number }).version || 0);
      const localVersion = Number(state.version || 0);
      if (incomingVersion <= localVersion) {
        return NextResponse.json({
          ok: true,
          ignored: true,
          state,
          currentSeat: match.currentSeat,
        });
      }

      match.state = newState;
      match.currentSeat = currentSeat;
      await match.save();
      return NextResponse.json({ ok: true, state: newState, currentSeat });
    }

    if (action === "finish") {
      const replayPayload = body.replayPayload;
      const moveLog = Array.isArray(body.moveLog) ? body.moveLog : null;

      if (match.status === "finished") {
        const existingReplay = await Replay.findOne({
          userId: user._id,
          type: "auto",
          matchId: match.matchKey,
        });
        return NextResponse.json({
          ok: true,
          alreadyFinished: true,
          savedReplay: existingReplay ? String(existingReplay._id) : null,
        });
      }

      const winnerSeat = body.winnerSeat;
      const p1 = await User.findById(match.player1Id);
      const p2 = await User.findById(match.player2Id);
      if (!p1 || !p2) {
        return NextResponse.json({ ok: false, error: "Joueurs introuvables" }, { status: 404 });
      }

      let score1 = 0.5;
      let winnerId: typeof match.winnerId = null;
      if (winnerSeat === 0 || winnerSeat === "0") {
        score1 = 1;
        winnerId = match.player1Id;
      } else if (winnerSeat === 1 || winnerSeat === "1") {
        score1 = 0;
        winnerId = match.player2Id;
      } else {
        return NextResponse.json(
          { ok: false, error: "Résultat de partie invalide (pas de nul possible)" },
          { status: 400 }
        );
      }

      const [elo1, elo2] = eloUpdate(p1.elo, p2.elo, score1);
      p1.elo = elo1;
      p2.elo = elo2;
      if (score1 === 1) {
        p1.wins += 1;
        p2.losses += 1;
        pushRecentResult(p1, "W");
        pushRecentResult(p2, "L");
      } else {
        p1.losses += 1;
        p2.wins += 1;
        pushRecentResult(p1, "L");
        pushRecentResult(p2, "W");
      }
      await p1.save();
      await p2.save();

      const nextState = {
        ...state,
        finished: true,
        winnerSeat,
        elo: { player1: elo1, player2: elo2 },
        version: Number(state.version || 0) + 1,
      };
      match.status = "finished";
      match.winnerId = winnerId;
      match.state = nextState;
      await match.save();

      let savedReplay: string | null = null;
      if (replayPayload && Array.isArray(moveLog) && moveLog.length) {
        try {
          const payload = mergeMoveLogIntoPayload(replayPayload, moveLog);
          await saveAutoReplayForMatchPlayers(match, payload, winnerSeat);
          const mine = await Replay.findOne({
            userId: user._id,
            type: "auto",
            matchId: match.matchKey,
          });
          savedReplay = mine ? String(mine._id) : null;
        } catch (e) {
          console.warn("Auto replay save failed", e);
        }
      }

      return NextResponse.json({
        ok: true,
        elo: {
          player1: { id: String(p1._id), elo: elo1, recentResults: p1.recentResults },
          player2: { id: String(p2._id), elo: elo2, recentResults: p2.recentResults },
        },
        winnerId: winnerId ? String(winnerId) : null,
        you: publicUser(
          String(user._id) === String(p1._id) ? p1 : p2
        ),
        savedReplay,
      });
    }

    return NextResponse.json(
      { ok: false, error: "Action inconnue. Utilisez get, setDraft, pushState ou finish." },
      { status: 400 }
    );
  } catch (e) {
    const { status, body } = jsonError(e);
    return NextResponse.json(body, { status });
  }
}
