import { ShieldAlert } from "lucide-react";
import type { MembraneAnalysis } from "@/types/membrane";

const recommendationText = {
  pass: "通す",
  stop: "止める",
  conditional: "条件付き"
};

export function RealityGateCard({ analysis }: { analysis: MembraneAnalysis }) {
  const gate = analysis.realityGate;

  return (
    <article className="relative mx-auto flex min-h-[380px] w-full max-w-[390px] flex-col justify-between overflow-hidden rounded-[28px] border border-white/16 bg-[#f7f0e6] p-5 text-[#171717] shadow-2xl shadow-black/35">
      <div className="absolute right-5 top-5 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold">
        {recommendationText[gate.recommendation]}
      </div>

      <div className="space-y-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#171717] text-white">
          <ShieldAlert size={23} />
        </div>

        <div className="space-y-2 pr-16">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8c4b27]">
            Reality Gate
          </p>
          <h2 className="text-3xl font-semibold leading-tight">{gate.title}</h2>
        </div>

        <p className="text-base leading-7 text-[#3c3a36]">{gate.summary}</p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-2">
          {gate.conditions.slice(0, 4).map((condition) => (
            <div key={condition} className="rounded-2xl border border-black/8 bg-white/62 px-3 py-2 text-sm">
              {condition}
            </div>
          ))}
        </div>

        <p className="rounded-2xl bg-[#171717] p-3 text-sm leading-6 text-white">{gate.returnPreview}</p>
      </div>
    </article>
  );
}
