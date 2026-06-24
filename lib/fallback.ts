import { getFallbackAnalysis } from "@/data/fixtures";
import type { MembraneAnalysis } from "@/types/membrane";

export function reviseFallbackGate(
  currentAnalysis: MembraneAnalysis,
  userInstruction: string
): MembraneAnalysis["realityGate"] {
  const base = currentAnalysis.realityGate ?? getFallbackAnalysis(currentAnalysis.scenarioId).realityGate;
  const instruction = userInstruction.trim();

  if (!instruction) {
    return base;
  }

  return {
    ...base,
    id: `${base.id}-revised`,
    summary: `${base.summary} 追加指示: ${instruction}`,
    conditions: [...base.conditions, instruction],
    returnPreview: `${base.returnPreview}\n\n追加条件: ${instruction}`
  };
}
