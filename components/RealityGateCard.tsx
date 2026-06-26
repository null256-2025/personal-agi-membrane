import { CalendarDays, CircleCheck, CircleDollarSign, CircleX, MapPin, Star, UserRound } from "lucide-react";
import type { MembraneAnalysis } from "@/types/membrane";

const recommendationText = {
  pass: "通す",
  stop: "止める",
  conditional: "条件付きで通す"
};

export function RealityGateCard({
  analysis,
  compact = false
}: {
  analysis: MembraneAnalysis;
  compact?: boolean;
}) {
  const gate = analysis.realityGate;
  const rows = [
    { icon: UserRound, text: "From: B社" },
    { icon: Star, text: `推奨: ${recommendationText[gate.recommendation]}` },
    { icon: CalendarDays, text: "日時: 2026/07/01 15:00-16:00" },
    { icon: MapPin, text: "場所: 京都市内" },
    { icon: CircleDollarSign, text: "謝礼: 30万円" },
    { icon: CircleCheck, text: "共有OK: 空き時間 / 公開可能肩書き / 登壇可否" },
    { icon: CircleX, text: "共有NG: 予定名 / 前後の私的予定 / 同行者情報" }
  ];

  return (
    <article className={`relative mx-auto w-full max-w-[330px] px-2 text-center ${compact ? "scale-[0.82]" : ""}`}>
      <div className="pointer-events-none absolute inset-x-5 top-8 h-48 rounded-full bg-cyan-100/12 blur-3xl" />

      <div className="relative mx-auto overflow-hidden rounded-[30px] border border-cyan-100/12 bg-cyan-100/[0.035] px-5 py-5 shadow-[0_0_72px_rgba(165,255,236,0.10)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-x-12 top-24 h-px bg-cyan-100/40 shadow-[0_0_18px_rgba(165,255,236,0.8)]" />

        <h2 className="text-[2rem] font-light tracking-[0.18em] text-white/95">登壇依頼</h2>

        <div className="mt-5 divide-y divide-cyan-100/10 text-left">
          {rows.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-4 py-2.5">
              <Icon className="h-4 w-4 shrink-0 text-cyan-200/78" strokeWidth={1.7} />
              <p className="text-[0.78rem] leading-5 tracking-[0.08em] text-white/86">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
