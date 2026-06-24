export type Membrane = "private" | "public" | "business";

export type AgentDecision = {
  agent: "Private AGI" | "Public AGI" | "Business AGI";
  stance: "pass" | "stop" | "conditional" | "review";
  title: string;
  reason: string;
  shareable: string[];
  withheld: string[];
};

export type RealityGate = {
  id: string;
  title: string;
  recommendation: "pass" | "stop" | "conditional";
  summary: string;
  conditions: string[];
  returnPreview: string;
};

export type AgentTrace = {
  steps: {
    order: number;
    actor: string;
    action: string;
    inputScope: string;
    output: string;
    guardrail?: string;
  }[];
};

export type MembraneAnalysis = {
  scenarioId: string;
  touchpoints: Membrane[];
  decisions: AgentDecision[];
  realityGate: RealityGate;
  trace: AgentTrace;
  whisper: string;
  activeCard: {
    id: string;
    sourceAgent: string;
    targetAgent: string;
    touchedMembranes: Membrane[];
    status: "waiting" | "approved" | "stopped" | "instruction_required" | "regenerating";
  };
};

export type Scenario = {
  id: string;
  label: string;
  rawRequest: string;
  context: {
    userProfile: string;
    privateContext: string;
    publicContext: string;
    businessContext: string;
  };
};
