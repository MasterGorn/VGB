import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { eloUpdate, requireUser } from "@/lib/session";
import User, { publicUser, pushRecentResult, applyWinStreak, isClassicGrid } from "@/models/User";
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
import { awardGameCoins } from "@/lib/coins";

export const dynamic = "force-dynamic";

/** Mets à jour les stats sans toucher avatarUrl / countryCode. */
async function saveUserMatchStats(u: {
  _id: unknown;
  elo: number;
  wins: number;
  losses: number;
  draws: number;
  eloClassic?: number;
  winsClassic?: number;
  lossesClassic?: number;
  drawsClassic?: number;
  recentResults?: unknown;
  recentResultsClassic?: unknown;
  winStreak?: number;
  bestWinStreak?: number;
  winStreakClassic?: number;
  bestWinStreakClassic?: number;
  lastPlayedAt?: Date;
  coins?: number;
}) {
  await User.updateOne(
    { _id: u._id },
    {
      $set: {
        elo: u.elo,
        wins: u.wins,
        losses: u.losses,
        draws: u.draws,
        eloClassic: u.eloClassic,
        winsClassic: u.winsClassic,
        lossesClassic: u.lossesClassic,
        drawsClassic: u.drawsClassic,
        recentResults: u.recentResults,
        recentResultsClassic: u.recentResultsClassic,
        winStreak: u.winStreak,
        bestWinStreak: u.bestWinStreak,
        winStreakClassic: u.winStreakClassic,
        bestWinStreakClassic: u.bestWinStreakClassic,
        lastPlayedAt: u.lastPlayedAt,
        ...(typeof u.coins === "number" ? { coins: u.coins } : {}),
      },
    }
  );
}

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
      let isDraw = false;
      if (winnerSeat === 0 || winnerSeat === "0") {
        score1 = 1;
        winnerId = match.player1Id;
      } else if (winnerSeat === 1 || winnerSeat === "1") {
        score1 = 0;
        winnerId = match.player2Id;
      } else if (
        winnerSeat == null ||
        winnerSeat === "draw" ||
        body.result === "stalemate"
      ) {
        score1 = 0.5;
        isDraw = true;
      } else {
        return NextResponse.json(
          { ok: false, error: "Résultat de partie invalide" },
          { status: 400 }
        );
      }

      const classic = isClassicGrid(match.gridSize) || (match as { gameMode?: string }).gameMode === "classic";
      const eloA = classic ? (p1.eloClassic ?? 1000) : p1.elo;
      const eloB = classic ? (p2.eloClassic ?? 1000) : p2.elo;
      const [elo1, elo2] = eloUpdate(eloA, eloB, score1);
      if (classic) {
        p1.eloClassic = elo1;
        p2.eloClassic = elo2;
      } else {
        p1.elo = elo1;
        p2.elo = elo2;
      }
      if (isDraw) {
        if (classic) {
          p1.drawsClassic = (p1.drawsClassic || 0) + 1;
          p2.drawsClassic = (p2.drawsClassic || 0) + 1;
        } else {
          p1.draws += 1;
          p2.draws += 1;
        }
        pushRecentResult(p1, "D", classic ? "classic" : "vgb");
        pushRecentResult(p2, "D", classic ? "classic" : "vgb");
        applyWinStreak(p1, "D", classic ? "classic" : "vgb");
        applyWinStreak(p2, "D", classic ? "classic" : "vgb");
        awardGameCoins(p1, "D");
        awardGameCoins(p2, "D");
      } else if (score1 === 1) {
        if (classic) {
          p1.winsClassic = (p1.winsClassic || 0) + 1;
          p2.lossesClassic = (p2.lossesClassic || 0) + 1;
        } else {
          p1.wins += 1;
          p2.losses += 1;
        }
        pushRecentResult(p1, "W", classic ? "classic" : "vgb");
        pushRecentResult(p2, "L", classic ? "classic" : "vgb");
        applyWinStreak(p1, "W", classic ? "classic" : "vgb");
        applyWinStreak(p2, "L", classic ? "classic" : "vgb");
        awardGameCoins(p1, "W");
        awardGameCoins(p2, "L");
      } else {
        if (classic) {
          p1.lossesClassic = (p1.lossesClassic || 0) + 1;
          p2.winsClassic = (p2.winsClassic || 0) + 1;
        } else {
          p1.losses += 1;
          p2.wins += 1;
        }
        pushRecentResult(p1, "L", classic ? "classic" : "vgb");
        pushRecentResult(p2, "W", classic ? "classic" : "vgb");
        applyWinStreak(p1, "L", classic ? "classic" : "vgb");
        applyWinStreak(p2, "W", classic ? "classic" : "vgb");
        awardGameCoins(p1, "L");
        awardGameCoins(p2, "W");
      }
      p1.lastPlayedAt = new Date();
      p2.lastPlayedAt = new Date();
      await saveUserMatchStats(p1);
      await saveUserMatchStats(p2);

      const nextState = {
        ...state,
        finished: true,
        winnerSeat,
        gameMode: classic ? "classic" : "vgb",
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
