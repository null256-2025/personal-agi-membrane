import { NextResponse } from "next/server";
import { scenarios } from "@/data/scenarios";
import { getFallbackAnalysis } from "@/data/fixtures";
import { analyzeWithOpenAI } from "@/lib/openai";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { scenarioId?: string };
  const scenario = scenarios.find((item) => item.id === body.scenarioId) ?? scenarios[0];

  try {
    const generated = await analyzeWithOpenAI(scenario);
    return NextResponse.json(generated ?? getFallbackAnalysis(scenario.id));
  } catch (error) {
    console.error("analyze fallback", error);
    return NextResponse.json(getFallbackAnalysis(scenario.id));
  }
}
