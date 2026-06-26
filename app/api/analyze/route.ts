import { NextResponse } from "next/server";
import { scenarios } from "@/data/scenarios";
import { getFallbackAnalysis } from "@/data/fixtures";
import { analyzeWithOpenAI } from "@/lib/openai";

const DEMO_TIMEOUT_MS = 4500;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([
    promise,
    new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), ms);
    })
  ]);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { scenarioId?: string };
  const scenario = scenarios.find((item) => item.id === body.scenarioId) ?? scenarios[0];

  try {
    const generated = await withTimeout(analyzeWithOpenAI(scenario), DEMO_TIMEOUT_MS);
    return NextResponse.json(generated ?? getFallbackAnalysis(scenario.id));
  } catch (error) {
    console.error("analyze fallback", error);
    return NextResponse.json(getFallbackAnalysis(scenario.id));
  }
}
