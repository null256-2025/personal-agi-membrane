import type { Membrane } from "@/types/membrane";

const membraneMeta: Record<
  Membrane,
  {
    label: string;
    status: string;
    className: string;
    activeClassName: string;
  }
> = {
  private: {
    label: "Private",
    status: "空き時間のみ参照",
    className: "left-1/2 top-0 h-28 w-28 -translate-x-1/2 border-sky-200/20 bg-sky-300/[0.05]",
    activeClassName: "border-sky-100/42 bg-sky-300/[0.10] shadow-[0_0_54px_rgba(147,197,253,0.16)]"
  },
  public: {
    label: "Public",
    status: "公開確認",
    className: "left-[17%] top-[42%] h-32 w-32 border-violet-200/25 bg-violet-300/[0.07]",
    activeClassName: "border-violet-100/55 bg-violet-300/[0.13] shadow-[0_0_64px_rgba(196,181,253,0.22)]"
  },
  business: {
    label: "Business",
    status: "条件確認",
    className: "right-[8%] top-[34%] h-40 w-40 border-emerald-100/45 bg-emerald-200/[0.09]",
    activeClassName: "border-emerald-50/80 bg-emerald-200/[0.17] shadow-[0_0_86px_rgba(167,243,208,0.34)]"
  }
};

export function MembraneOrbs({
  active,
  compact = false,
  voiceText = ""
}: {
  active: Membrane[];
  compact?: boolean;
  voiceText?: string;
}) {
  const membranes: Membrane[] = ["private", "public", "business"];

  return (
    <div
      className={`relative mx-auto w-full max-w-[330px] origin-top ${
        compact ? "h-[128px] scale-[0.66]" : "h-[186px] scale-[0.84]"
      }`}
    >
      {membranes.map((membrane) => {
        const meta = membraneMeta[membrane];
        const isActive = active.includes(membrane);
        return (
          <div
            key={membrane}
            className={`absolute grid place-items-center rounded-full border backdrop-blur-md transition duration-500 ${
              meta.className
            } ${isActive ? meta.activeClassName : "opacity-55"}`}
          >
            <div className="absolute inset-2 rounded-full border border-white/10" />
            <div className="absolute inset-5 rounded-full border border-white/8" />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.20),transparent_22%),radial-gradient(circle_at_65%_72%,rgba(255,255,255,0.10),transparent_26%)]" />
            <div className="relative text-center">
              <p className="text-lg font-light tracking-[0.12em] text-white/86">{meta.label}</p>
              <p className="mt-2 text-[10px] tracking-[0.14em] text-white/52">{meta.status}</p>
            </div>
          </div>
        );
      })}
      {voiceText ? (
        <div className="pointer-events-none absolute inset-x-4 top-1/2 z-20 -translate-y-1/2 rounded-[24px] border border-cyan-100/22 bg-black/55 px-4 py-3 text-center shadow-[0_0_42px_rgba(125,211,252,0.20)] backdrop-blur-xl">
          <p className="text-[10px] tracking-[0.22em] text-cyan-100/58">VOICE TRANSCRIPT</p>
          <p className="mt-2 text-sm leading-6 tracking-[0.08em] text-white/92">
            {voiceText}
            <span className="ml-1 animate-pulse text-cyan-100">|</span>
          </p>
        </div>
      ) : null}
      <p className="absolute bottom-0 left-0 right-0 text-center text-[10px] tracking-[0.14em] text-white/38">
        依頼が触れる領域
      </p>
    </div>
  );
}
