"use client";

import { X } from "lucide-react";
import type { AgentTrace } from "@/types/membrane";

export function TraceOverlay({
  open,
  trace,
  onClose
}: {
  open: boolean;
  trace: AgentTrace;
  onClose: () => void;
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/72 p-4 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-2xl flex-col overflow-hidden rounded-[28px] border border-white/14 bg-[#111419] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">Agent Trace</p>
            <h2 className="text-xl font-semibold">判断の要約</h2>
          </div>
          <button
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/8"
            aria-label="閉じる"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-3 overflow-auto p-4">
          {trace.steps.map((step) => (
            <section key={step.order} className="rounded-2xl border border-white/10 bg-white/6 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">{step.actor}</p>
                <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-white/70">
                  {step.order}
                </span>
              </div>
              <p className="mt-2 text-sm text-white/84">{step.action}</p>
              <p className="mt-2 text-xs leading-5 text-white/56">{step.inputScope}</p>
              <p className="mt-3 rounded-xl bg-black/20 p-3 text-sm text-white/82">{step.output}</p>
              {step.guardrail ? (
                <p className="mt-2 text-xs font-medium text-orange-200">{step.guardrail}</p>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
