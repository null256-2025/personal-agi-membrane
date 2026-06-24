import type { Membrane } from "@/types/membrane";

const membraneLabels: Record<Membrane, string> = {
  private: "Private",
  public: "Public",
  business: "Business"
};

const membraneClass: Record<Membrane, string> = {
  private: "border-violet-300/70 bg-violet-400/18 text-violet-100",
  public: "border-cyan-300/70 bg-cyan-400/16 text-cyan-100",
  business: "border-orange-300/70 bg-orange-400/16 text-orange-100"
};

export function MembraneOrbs({ active }: { active: Membrane[] }) {
  const membranes: Membrane[] = ["private", "public", "business"];

  return (
    <div className="flex items-center justify-center gap-3">
      {membranes.map((membrane) => {
        const isActive = active.includes(membrane);
        return (
          <div
            key={membrane}
            className={`grid h-20 w-20 place-items-center rounded-full border text-xs font-semibold transition ${
              isActive ? membraneClass[membrane] : "border-white/10 bg-white/5 text-white/40"
            }`}
          >
            {membraneLabels[membrane]}
          </div>
        );
      })}
    </div>
  );
}
