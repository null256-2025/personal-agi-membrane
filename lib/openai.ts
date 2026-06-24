import OpenAI from "openai";
import { membraneAnalysisJsonSchema } from "@/lib/membrane-schema";
import type { MembraneAnalysis, Scenario } from "@/types/membrane";

const systemPrompt = `You are the reasoning engine for Personal AGI Membrane.

This product is not a chat assistant. It evaluates whether an incoming real-world request should pass through a user's Private, Public, and Business boundaries.

Simulate three role-specific agents:
1. Private AGI protects personal life, calendar details, family, friends, private preferences, and sensitive context.
2. Public AGI handles public identity, events, community, introductions, and social posting.
3. Business AGI handles work, speaking requests, sales, estimates, contracts, and professional commitments.

Rules:
- Do not maximize automation.
- Always preserve human approval before any real-world action.
- Separate shareable information from withheld information.
- If a decision affects relationships, money, contracts, public posting, or private information, mark it as requiring human review or conditional approval.
- Output must be concise and suitable for a mobile UI.
- Return only valid JSON matching the provided schema.`;

function getClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  return new OpenAI({ apiKey });
}

function extractJson(text: string) {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  return fenced?.[1]?.trim() ?? trimmed;
}

export async function analyzeWithOpenAI(scenario: Scenario): Promise<MembraneAnalysis | null> {
  const client = getClient();
  if (!client) {
    return null;
  }

  const prompt = `Analyze the following incoming request for Personal AGI Membrane.

Incoming request:
${scenario.rawRequest}

User profile:
${scenario.context.userProfile}

Private context:
${scenario.context.privateContext}

Public context:
${scenario.context.publicContext}

Business context:
${scenario.context.businessContext}

JSON schema:
${JSON.stringify(membraneAnalysisJsonSchema)}`;

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL ?? "gpt-5-mini",
    input: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt }
    ]
  });

  const output = extractJson(response.output_text);
  return JSON.parse(output) as MembraneAnalysis;
}

export async function reviseGateWithOpenAI(args: {
  currentAnalysis: MembraneAnalysis;
  userInstruction: string;
}): Promise<MembraneAnalysis["realityGate"] | null> {
  const client = getClient();
  if (!client) {
    return null;
  }

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL ?? "gpt-5-mini",
    input: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Revise only the realityGate object using the user's additional instruction.

Current analysis:
${JSON.stringify(args.currentAnalysis)}

User instruction:
${args.userInstruction}

Return only the updated realityGate JSON object.`
      }
    ]
  });

  return JSON.parse(extractJson(response.output_text)) as MembraneAnalysis["realityGate"];
}
