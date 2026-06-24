import { NextResponse } from "next/server";
import { reviseFallbackGate } from "@/lib/fallback";
import { reviseGateWithOpenAI } from "@/lib/openai";
import type { MembraneAnalysis } from "@/types/membrane";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    currentAnalysis?: MembraneAnalysis;
    userInstruction?: string;
  };

  if (!body.currentAnalysis) {
    return NextResponse.json({ error: "currentAnalysis is required" }, { status: 400 });
  }

  try {
    const generated = await reviseGateWithOpenAI({
      currentAnalysis: body.currentAnalysis,
      userInstruction: body.userInstruction ?? ""
    });

    return NextResponse.json(
      generated ?? reviseFallbackGate(body.currentAnalysis, body.userInstruction ?? "")
    );
  } catch (error) {
    console.error("revise gate fallback", error);
    return NextResponse.json(reviseFallbackGate(body.currentAnalysis, body.userInstruction ?? ""));
  }
}
