"use client";

import { ArrowDown, ArrowLeft, ArrowRight, RotateCcw, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { scenarios } from "@/data/scenarios";
import { getFallbackAnalysis } from "@/data/fixtures";
import { GlassPreview } from "@/components/GlassPreview";
import { MembraneOrbs } from "@/components/MembraneOrbs";
import { RealityGateCard } from "@/components/RealityGateCard";
import { SwipeInstructionInput } from "@/components/SwipeInstructionInput";
import { TraceOverlay } from "@/components/TraceOverlay";
import type { MembraneAnalysis } from "@/types/membrane";

type GateState = "waiting" | "approved" | "stopped" | "instruction_required" | "regenerating";

const stateLabel: Record<GateState, string> = {
  waiting: "承認待ち",
  approved: "承認済み",
  stopped: "停止済み",
  instruction_required: "指示待ち",
  regenerating: "再生成中"
};

export function SwipeRealityGate() {
  const [scenarioId, setScenarioId] = useState(scenarios[0].id);
  const [analysis, setAnalysis] = useState<MembraneAnalysis>(getFallbackAnalysis(scenarioId));
  const [state, setState] = useState<GateState>("waiting");
  const [traceOpen, setTraceOpen] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [loading, setLoading] = useState(false);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const longPressRef = useRef<number | null>(null);

  const scenario = useMemo(
    () => scenarios.find((item) => item.id === scenarioId) ?? scenarios[0],
    [scenarioId]
  );

  useEffect(() => {
    let isActive = true;
    setLoading(true);
    setState("waiting");

    fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scenarioId })
    })
      .then((response) => response.json())
      .then((next: MembraneAnalysis) => {
        if (isActive) {
          setAnalysis(next);
        }
      })
      .catch(() => {
        if (isActive) {
          setAnalysis(getFallbackAnalysis(scenarioId));
        }
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [scenarioId]);

  function finishGesture() {
    if (dragX > 96) {
      setState("approved");
    } else if (dragX < -96) {
      setState("stopped");
    } else if (dragY > 96) {
      setState("instruction_required");
    }

    setDragX(0);
    setDragY(0);
    startRef.current = null;
    if (longPressRef.current) {
      window.clearTimeout(longPressRef.current);
      longPressRef.current = null;
    }
  }

  async function reviseGate(instruction: string) {
    setState("regenerating");
    const response = await fetch("/api/revise-gate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentAnalysis: analysis, userInstruction: instruction })
    });
    const realityGate = await response.json();
    setAnalysis((current) => ({
      ...current,
      realityGate,
      activeCard: { ...current.activeCard, status: "waiting" }
    }));
    setState("waiting");
  }

  return (
    <main className="min-h-screen px-4 py-5 md:px-8 md:py-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[320px_minmax(0,1fr)_360px]">
        <aside className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-orange-200">Personal AGI Membrane</p>
            <h1 className="mt-2 text-4xl font-semibold leading-tight md:text-5xl">
              Swipe Reality Gate
            </h1>
          </div>

          <div className="rounded-[28px] border border-white/12 bg-white/7 p-4">
            <label className="text-sm font-medium text-white/68" htmlFor="scenario">
              Scenario
            </label>
            <select
              id="scenario"
              value={scenarioId}
              onChange={(event) => setScenarioId(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/12 bg-[#15181d] px-3 py-3 text-sm outline-none"
            >
              {scenarios.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
            <p className="mt-4 text-sm leading-6 text-white/68">{scenario.rawRequest}</p>
          </div>

          <div className="rounded-[28px] border border-white/12 bg-white/7 p-4">
            <p className="text-sm font-semibold text-white/80">Status</p>
            <div className="mt-3 flex items-center justify-between rounded-2xl bg-black/24 px-4 py-3">
              <span className="text-sm text-white/58">Gate</span>
              <span className="text-sm font-semibold text-white">{loading ? "処理中" : stateLabel[state]}</span>
            </div>
          </div>
        </aside>

        <section className="space-y-5">
          <MembraneOrbs active={analysis.touchpoints} />

          <div
            className="touch-none select-none"
            onPointerDown={(event) => {
              startRef.current = { x: event.clientX, y: event.clientY };
              longPressRef.current = window.setTimeout(() => setTraceOpen(true), 520);
            }}
            onPointerMove={(event) => {
              if (!startRef.current) {
                return;
              }
              setDragX(event.clientX - startRef.current.x);
              setDragY(Math.max(0, event.clientY - startRef.current.y));
            }}
            onPointerUp={finishGesture}
            onPointerCancel={finishGesture}
          >
            <div
              className="transition-transform duration-150"
              style={{ transform: `translate(${dragX}px, ${dragY}px) rotate(${dragX / 28}deg)` }}
            >
              <RealityGateCard analysis={analysis} />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => setState("stopped")}
              className="flex h-12 items-center justify-center rounded-2xl border border-white/12 bg-white/8 text-white/86"
              aria-label="止める"
              title="止める"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => setState("approved")}
              className="flex h-12 items-center justify-center rounded-2xl border border-white/12 bg-white text-[#111]"
              aria-label="通す"
              title="通す"
            >
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => setState("instruction_required")}
              className="flex h-12 items-center justify-center rounded-2xl border border-white/12 bg-white/8 text-white/86"
              aria-label="指示を追加"
              title="指示を追加"
            >
              <ArrowDown size={18} />
            </button>
            <button
              onClick={() => setTraceOpen(true)}
              className="flex h-12 items-center justify-center rounded-2xl border border-white/12 bg-white/8 text-white/86"
              aria-label="詳細"
              title="詳細"
            >
              <Search size={18} />
            </button>
          </div>

          {state === "instruction_required" ? (
            <SwipeInstructionInput disabled={false} onSubmit={reviseGate} />
          ) : null}
        </section>

        <aside className="space-y-4">
          <section className="rounded-[28px] border border-white/12 bg-white/7 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white/80">Role Lens</p>
              <button
                onClick={() => {
                  setAnalysis(getFallbackAnalysis(scenarioId));
                  setState("waiting");
                }}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-white/8"
                aria-label="リセット"
                title="リセット"
              >
                <RotateCcw size={15} />
              </button>
            </div>

            <div className="mt-4 grid gap-3">
              {analysis.decisions.map((decision) => (
                <article key={decision.agent} className="rounded-2xl border border-white/10 bg-black/18 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{decision.agent}</p>
                    <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/68">
                      {decision.stance}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-white/84">{decision.title}</p>
                  <p className="mt-2 text-xs leading-5 text-white/58">{decision.reason}</p>
                </article>
              ))}
            </div>
          </section>

          <GlassPreview analysis={analysis} />
        </aside>
      </div>

      <TraceOverlay open={traceOpen} trace={analysis.trace} onClose={() => setTraceOpen(false)} />
    </main>
  );
}
