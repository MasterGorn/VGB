import { NextResponse } from "next/server";
import { getAllStages, PROGRESSION_STAGE_COUNT, MISSIONS_PER_STAGE } from "@/lib/progression";

export const dynamic = "force-dynamic";

/** Catalogue public des 99 étapes (missions + récompenses) pour relecture / tests. */
export async function GET() {
  const stages = getAllStages().map((s) => ({
    stage: s.stage,
    level: s.level,
    title: s.title,
    theme: s.theme,
    reward: s.reward,
    missions: s.missions.map((m) => ({
      id: m.id,
      kind: m.kind,
      label: m.label,
      target: m.target ?? null,
      faction: m.faction ?? null,
      role: m.role ?? null,
      mode: m.mode ?? null,
    })),
  }));

  return NextResponse.json({
    ok: true,
    stageCount: PROGRESSION_STAGE_COUNT,
    missionsPerStage: MISSIONS_PER_STAGE,
    missionCount: PROGRESSION_STAGE_COUNT * MISSIONS_PER_STAGE,
    stages,
  });
}
