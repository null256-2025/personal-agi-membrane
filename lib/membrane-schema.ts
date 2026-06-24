export const membraneAnalysisJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["scenarioId", "touchpoints", "decisions", "realityGate", "trace", "whisper", "activeCard"],
  properties: {
    scenarioId: { type: "string" },
    touchpoints: {
      type: "array",
      items: { type: "string", enum: ["private", "public", "business"] }
    },
    decisions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["agent", "stance", "title", "reason", "shareable", "withheld"],
        properties: {
          agent: { type: "string", enum: ["Private AGI", "Public AGI", "Business AGI"] },
          stance: { type: "string", enum: ["pass", "stop", "conditional", "review"] },
          title: { type: "string" },
          reason: { type: "string" },
          shareable: { type: "array", items: { type: "string" } },
          withheld: { type: "array", items: { type: "string" } }
        }
      }
    },
    realityGate: {
      type: "object",
      additionalProperties: false,
      required: ["id", "title", "recommendation", "summary", "conditions", "returnPreview"],
      properties: {
        id: { type: "string" },
        title: { type: "string" },
        recommendation: { type: "string", enum: ["pass", "stop", "conditional"] },
        summary: { type: "string" },
        conditions: { type: "array", items: { type: "string" } },
        returnPreview: { type: "string" }
      }
    },
    trace: {
      type: "object",
      additionalProperties: false,
      required: ["steps"],
      properties: {
        steps: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["order", "actor", "action", "inputScope", "output"],
            properties: {
              order: { type: "number" },
              actor: { type: "string" },
              action: { type: "string" },
              inputScope: { type: "string" },
              output: { type: "string" },
              guardrail: { type: "string" }
            }
          }
        }
      }
    },
    whisper: { type: "string" },
    activeCard: {
      type: "object",
      additionalProperties: false,
      required: ["id", "sourceAgent", "targetAgent", "touchedMembranes", "status"],
      properties: {
        id: { type: "string" },
        sourceAgent: { type: "string" },
        targetAgent: { type: "string" },
        touchedMembranes: {
          type: "array",
          items: { type: "string", enum: ["private", "public", "business"] }
        },
        status: {
          type: "string",
          enum: ["waiting", "approved", "stopped", "instruction_required", "regenerating"]
        }
      }
    }
  }
} as const;
