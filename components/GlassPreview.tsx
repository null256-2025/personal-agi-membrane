import type { MembraneAnalysis } from "@/types/membrane";

export function GlassPreview({ analysis }: { analysis: MembraneAnalysis }) {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-white/12 bg-white/8 p-5">
      <div className="absolute inset-x-5 top-9 h-[1px] bg-cyan-200/40" />
      <div className="relative mx-auto aspect-[16/7] max-w-xl rounded-[32px] border border-white/18 bg-[#d8fbff]/10 shadow-inner">
        <div className="absolute left-[12%] top-[24%] h-16 w-16 rounded-full border border-white/35 bg-white/12" />
        <div className="absolute left-[28%] top-[20%] h-24 w-32 rounded-[45%] border border-white/20 bg-white/8" />
        <div className="absolute left-[43%] top-[29%] h-12 w-28 rounded-2xl border border-orange-200/45 bg-orange-300/18 px-3 py-2 text-[10px] text-orange-50">
          Business: 条件確認
        </div>
        <div className="absolute left-[58%] top-[47%] h-12 w-28 rounded-2xl border border-cyan-200/45 bg-cyan-300/18 px-3 py-2 text-[10px] text-cyan-50">
          Public: 投稿確認
        </div>
        <div className="absolute left-[32%] top-[53%] h-12 w-28 rounded-2xl border border-violet-200/45 bg-violet-300/18 px-3 py-2 text-[10px] text-violet-50">
          Private: 予定名非共有
        </div>
      </div>
      <p className="mt-4 text-center text-sm leading-6 text-white/72">{analysis.whisper}</p>
    </section>
  );
}
