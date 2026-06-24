import type { MembraneAnalysis } from "@/types/membrane";

export const fallbackAnalyses: Record<string, MembraneAnalysis> = {
  speaking_request: {
    scenarioId: "speaking_request",
    touchpoints: ["business", "public", "private"],
    decisions: [
      {
        agent: "Business AGI",
        stance: "conditional",
        title: "条件付きで前向き",
        reason: "謝礼は基準を満たすが、公開肩書き、写真利用、資料二次利用、交通費を確認する必要がある。",
        shareable: ["登壇可否の前向き回答", "公開肩書きの候補", "謝礼条件への関心"],
        withheld: ["クライアント名", "未公開案件", "詳細な契約条件"]
      },
      {
        agent: "Public AGI",
        stance: "review",
        title: "公開範囲は人間確認",
        reason: "テーマとイベント情報は公開可能だが、写真付きSNS投稿は事前確認が必要。",
        shareable: ["AIエージェントと働き方のテーマ", "公開イベントへの登壇予定"],
        withheld: ["顔写真の無条件利用", "未公開プロジェクト名", "同行者情報"]
      },
      {
        agent: "Private AGI",
        stance: "conditional",
        title: "予定名は渡さない",
        reason: "時間枠は空いているが、前後の私的予定名や相手は外部に共有しない。",
        shareable: ["当日の空き時間の有無", "移動時間確認が必要なこと"],
        withheld: ["予定名", "家族情報", "私的な移動理由"]
      }
    ],
    realityGate: {
      id: "gate-speaking-request",
      title: "登壇依頼への返信",
      recommendation: "conditional",
      summary: "条件確認付きで通す。公開情報、写真利用、資料二次利用、交通費、拘束時間を確認する。",
      conditions: [
        "イベントページ掲載の肩書きと会社名を事前確認",
        "写真付きSNS投稿は投稿前確認",
        "資料二次利用と録画公開の範囲を確認",
        "会場までの移動条件と拘束時間を確認"
      ],
      returnPreview:
        "登壇候補として前向きに検討可能です。ただし、公開肩書き、写真付きSNS投稿、資料二次利用、交通費と拘束時間について事前確認をお願いします。"
    },
    trace: {
      steps: [
        {
          order: 1,
          actor: "Business AGI",
          action: "登壇条件を評価",
          inputScope: "謝礼、公開肩書き、資料利用、交通費",
          output: "条件付きで通過候補",
          guardrail: "契約や費用に関わるためHuman Review"
        },
        {
          order: 2,
          actor: "Private AGI",
          action: "予定情報をフィルタ",
          inputScope: "当日の空き時間と前後予定",
          output: "空き時間のみ共有。予定名は非共有",
          guardrail: "私的予定と家族情報は遮断"
        },
        {
          order: 3,
          actor: "Public AGI",
          action: "公開範囲を確認",
          inputScope: "イベントページ、SNS、写真利用",
          output: "公開は可能だが写真は事前確認",
          guardrail: "顔写真と未公開情報は無条件公開しない"
        },
        {
          order: 4,
          actor: "Membrane",
          action: "Reality Gateを生成",
          inputScope: "3つの判断結果",
          output: "条件付き承認カード"
        }
      ]
    },
    whisper: "条件付きで通せます。写真と公開肩書きだけ、人間が最後に確認してください。",
    activeCard: {
      id: "speaking-request-card",
      sourceAgent: "Business AGI",
      targetAgent: "Human",
      touchedMembranes: ["business", "public", "private"],
      status: "waiting"
    }
  }
};

export function getFallbackAnalysis(scenarioId: string): MembraneAnalysis {
  return fallbackAnalyses[scenarioId] ?? fallbackAnalyses.speaking_request;
}
