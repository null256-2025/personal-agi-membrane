"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { GitBranch } from "lucide-react";
import { scenarios } from "@/data/scenarios";
import { getFallbackAnalysis } from "@/data/fixtures";
import { MembraneOrbs } from "@/components/MembraneOrbs";
import { RealityGateCard } from "@/components/RealityGateCard";
import { SwipeInstructionInput } from "@/components/SwipeInstructionInput";
import { TraceOverlay } from "@/components/TraceOverlay";
import type { MembraneAnalysis } from "@/types/membrane";

type GateState = "waiting" | "approved" | "stopped" | "instruction_required" | "regenerating";
type ExchangeStatus = "pending" | "accepted" | "declined" | "instruction" | "revised";

const stateLabel: Record<GateState, string> = {
  waiting: "waiting",
  approved: "yes",
  stopped: "no",
  instruction_required: "voice instruction",
  regenerating: "updating"
};

const exchangeLabel: Record<ExchangeStatus, string> = {
  pending: "返信待ち",
  accepted: "Yes 受信",
  declined: "No 受信",
  instruction: "条件追加中",
  revised: "再判断待ち"
};

export function SwipeRealityGate() {
  const [scenarioId] = useState(scenarios[0].id);
  const [analysis, setAnalysis] = useState<MembraneAnalysis>(getFallbackAnalysis(scenarioId));
  const [state, setState] = useState<GateState>("waiting");
  const [exchangeStatus, setExchangeStatus] = useState<ExchangeStatus>("pending");
  const [latestInstruction, setLatestInstruction] = useState("");
  const [traceOpen, setTraceOpen] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [loading, setLoading] = useState(false);
  const [voiceStartToken, setVoiceStartToken] = useState(0);
  const [demoRunning, setDemoRunning] = useState(false);
  const [demoVoiceText, setDemoVoiceText] = useState("");
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const instructionOpen = state === "instruction_required";
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const longPressRef = useRef<number | null>(null);

  useEffect(() => {
    let isActive = true;
    setLoading(true);
    setState("waiting");
    setExchangeStatus("pending");
    setLatestInstruction("");
    setDemoVoiceText("");
    setVoiceTranscript("");

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

  function clearLongPress() {
    if (longPressRef.current) {
      window.clearTimeout(longPressRef.current);
      longPressRef.current = null;
    }
  }

  function sleep(ms: number) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  function finishGesture() {
    if (dragX > 96) {
      setState("approved");
      setExchangeStatus("accepted");
    } else if (dragX < -96) {
      setState("stopped");
      setExchangeStatus("declined");
    } else if (dragY > 96) {
      setState("instruction_required");
      setExchangeStatus("instruction");
      setVoiceTranscript("");
      setVoiceStartToken((current) => current + 1);
    }

    setDragX(0);
    setDragY(0);
    startRef.current = null;
    clearLongPress();
  }

  async function reviseGate(instruction: string) {
    setState("regenerating");
    setExchangeStatus("revised");
    setLatestInstruction(instruction);

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

  async function runAutoDemo() {
    if (demoRunning) {
      return;
    }

    setDemoRunning(true);
    setTraceOpen(false);
    setState("waiting");
    setExchangeStatus("pending");
    setLatestInstruction("");
    setDemoVoiceText("");
    setVoiceTranscript("");
    setDragX(0);
    setDragY(0);

    try {
      await sleep(700);

      setDragX(156);
      await sleep(650);
      setState("approved");
      setExchangeStatus("accepted");
      setDragX(0);
      await sleep(1200);

      setState("waiting");
      setExchangeStatus("pending");
      setLatestInstruction("");
      await sleep(700);

      setDragX(-156);
      await sleep(650);
      setState("stopped");
      setExchangeStatus("declined");
      setDragX(0);
      await sleep(1200);

      setState("waiting");
      setExchangeStatus("pending");
      setLatestInstruction("");
      setVoiceTranscript("");
      await sleep(700);

      setDragY(132);
      setState("instruction_required");
      setExchangeStatus("instruction");
      setDemoVoiceText("写真投稿は事前確認にして");
      await sleep(2600);
      setDragY(0);

      await reviseGate("写真投稿は事前確認にして");
      setDemoVoiceText("");
      setVoiceTranscript("");
    } finally {
      setDemoRunning(false);
    }
  }

  return (
    <main className="h-screen overflow-hidden bg-[#f6f7f9] px-4 py-3 text-[#111827]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(210,218,230,0.72),transparent_28rem),linear-gradient(180deg,#ffffff_0%,#f3f5f8_58%,#e9edf3_100%)]" />

      <div className="relative mx-auto mb-3 flex max-w-6xl justify-center">
        <button
          type="button"
          onClick={runAutoDemo}
          disabled={demoRunning}
          className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs tracking-[0.2em] text-slate-600 shadow-sm transition hover:border-slate-400 hover:text-slate-950 disabled:opacity-45"
        >
          {demoRunning ? "DEMO RUNNING" : "AUTO DEMO"}
        </button>
      </div>

      <div className="relative mx-auto grid h-[calc(100vh-4.5rem)] w-full max-w-6xl items-center gap-5 lg:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)]">
        <PhoneFrame
          owner="Aさん"
          title=""
          status={loading ? "解析中" : state === "waiting" ? "承認待ち 03" : stateLabel[state]}
          traceControl={
            <button
              type="button"
              onClick={() => setTraceOpen(true)}
              className="grid place-items-center text-white/80 transition hover:text-white"
              aria-label="Trace"
            >
              <GitBranch className="h-6 w-6" strokeWidth={1.6} />
              <span className="mt-2 text-[10px] tracking-[0.22em] text-white/58">TRACE</span>
            </button>
          }
        >
          <div className={instructionOpen ? "w-full space-y-1" : "w-full space-y-4"}>
            <MembraneOrbs active={analysis.touchpoints} compact={instructionOpen} voiceText={instructionOpen ? voiceTranscript : ""} />

            <div
              className="touch-none select-none"
              style={{ marginTop: instructionOpen ? "-0.75rem" : "-1.75rem" }}
              onPointerDown={(event) => {
                if (demoRunning) {
                  return;
                }
                startRef.current = { x: event.clientX, y: event.clientY };
                longPressRef.current = window.setTimeout(() => setTraceOpen(true), 520);
              }}
              onPointerMove={(event) => {
                if (demoRunning) {
                  return;
                }
                if (!startRef.current) {
                  return;
                }
                const nextX = event.clientX - startRef.current.x;
                const nextY = Math.max(0, event.clientY - startRef.current.y);
                setDragX(nextX);
                setDragY(nextY);
                if (Math.abs(nextX) > 16 || nextY > 16) {
                  clearLongPress();
                }
              }}
              onPointerUp={finishGesture}
              onPointerCancel={finishGesture}
            >
              <div
                className="transition-transform duration-150 ease-out"
                style={{ transform: `translate(${dragX}px, ${dragY}px) rotate(${dragX / 46}deg)` }}
              >
                <RealityGateCard analysis={analysis} compact={instructionOpen} />
              </div>
            </div>

            {instructionOpen ? (
              <SwipeInstructionInput
                autoStartToken={voiceStartToken}
                disabled={false}
                scriptedText={demoVoiceText}
                onTranscriptChange={setVoiceTranscript}
                onSubmit={reviseGate}
              />
            ) : null}
          </div>

          <footer className="space-y-3 text-center">
            <div className="flex items-center justify-center gap-10 text-sm tracking-[0.16em] text-cyan-100/64">
              <span>← Stop</span>
              <span className="text-base text-white/90">Swipe</span>
              <span>Pass →</span>
            </div>
            <p className="text-[11px] tracking-[0.16em] text-white/40">長押しで詳細 / 下スワイプで音声指示</p>
          </footer>
        </PhoneFrame>

        <ExchangeLink status={exchangeStatus} />

        <PhoneFrame owner="Bさん" title="" status={exchangeLabel[exchangeStatus]}>
          <BScreen status={exchangeStatus} latestInstruction={latestInstruction} />
        </PhoneFrame>
      </div>

      <TraceOverlay open={traceOpen} trace={analysis.trace} onClose={() => setTraceOpen(false)} />
    </main>
  );
}

function PhoneFrame({
  owner,
  title,
  status,
  traceControl,
  children
}: {
  owner: string;
  title: string;
  status: string;
  traceControl?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="relative mx-auto w-full max-w-[360px]">
      <p className="mb-2 text-center text-sm font-medium tracking-[0.18em] text-slate-500">{owner}</p>
      <div className="relative rounded-[46px] border border-slate-300 bg-gradient-to-br from-[#2b2d31] via-[#0d0f12] to-[#3a3d42] p-[7px] shadow-[0_22px_56px_rgba(15,23,42,0.20),inset_0_0_0_1px_rgba(255,255,255,0.26)]">
        <div className="absolute left-[-3px] top-[96px] h-11 w-[3px] rounded-l bg-slate-400/80" />
        <div className="absolute left-[-3px] top-[154px] h-12 w-[3px] rounded-l bg-slate-400/80" />
        <div className="absolute right-[-3px] top-[142px] h-20 w-[3px] rounded-r bg-slate-400/80" />
        <div className="relative flex h-[calc(100vh-6rem)] min-h-[590px] max-h-[720px] flex-col items-center justify-between overflow-hidden rounded-[39px] border border-white/8 bg-[#030507] px-4 py-5 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
          <div className="absolute left-1/2 top-2.5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(156,255,228,0.13),transparent_18rem),radial-gradient(circle_at_24%_44%,rgba(173,139,255,0.12),transparent_14rem),radial-gradient(circle_at_77%_42%,rgba(96,165,250,0.10),transparent_14rem)]" />

          <header className="relative z-10 w-full pt-8 text-center">
            {title ? (
              <h1 className="text-[clamp(1.45rem,2.6vw,1.85rem)] font-light tracking-[0.16em] text-white/92">
                {title}
              </h1>
            ) : null}
            <p className={title ? "mt-2 text-xs tracking-[0.28em] text-white/62" : "text-xs tracking-[0.28em] text-white/62"}>
              {status}
            </p>
            {traceControl ? <div className="absolute right-4 top-8">{traceControl}</div> : null}
          </header>

          <div className="relative z-10 flex w-full flex-1 flex-col justify-between pt-2">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExchangeLink({ status }: { status: ExchangeStatus }) {
  const lineText =
    status === "pending"
      ? "B -> A"
      : status === "instruction" || status === "revised"
        ? "A -> B -> A"
        : "A -> B";

  return (
    <div className="hidden items-center justify-center lg:flex">
      <div className="relative h-[72vh] w-full">
        <div className="absolute left-1/2 top-[12%] h-[76%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
        <div className="absolute left-1/2 top-1/2 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white px-3 py-2 text-center text-[10px] tracking-[0.18em] text-slate-500 shadow-sm">
          {lineText}
        </div>
      </div>
    </div>
  );
}

function BScreen({
  status,
  latestInstruction
}: {
  status: ExchangeStatus;
  latestInstruction: string;
}) {
  const reply = getBReply(status, latestInstruction);

  return (
    <>
      <div className="w-full space-y-4">
        <div className="mx-auto mt-4 h-40 w-40 rounded-full border border-blue-100/24 bg-blue-200/[0.06] shadow-[0_0_70px_rgba(147,197,253,0.14)] backdrop-blur-md">
          <div className="grid h-full place-items-center rounded-full border border-white/8">
            <div className="text-center">
              <p className="text-xl font-light tracking-[0.18em] text-white/88">Business</p>
              <p className="mt-2 text-[10px] tracking-[0.16em] text-white/45">Aさんへ依頼中</p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[310px] rounded-[28px] border border-white/[0.06] bg-white/[0.035] px-4 py-5 text-center shadow-[0_0_72px_rgba(147,197,253,0.08)] backdrop-blur-xl">
          <h2 className="text-3xl font-light tracking-[0.18em] text-white/94">登壇依頼</h2>
          <div className="mt-5 space-y-3 text-[clamp(0.82rem,2.4vw,0.96rem)] font-light tracking-[0.12em] text-white/84">
            <p>To: Aさん</p>
            <p>送信: 2026/07/01 15:00-16:00</p>
            <p>謝礼: 30万円</p>
            <p>状態: {reply.status}</p>
          </div>
          <div className="mt-5 rounded-[22px] border border-white/8 bg-black/20 px-4 py-3 text-left">
            <p className="text-[10px] tracking-[0.18em] text-white/34">Aさんからの返答</p>
            <p className="mt-2 text-xs leading-6 tracking-[0.08em] text-white/78">{reply.body}</p>
          </div>
        </div>
      </div>

      <footer className="text-center text-[11px] leading-6 tracking-[0.16em] text-white/38">
        <p>B社Business AGIが返信を待機</p>
        <p>Aさんの判断がここに反映されます</p>
      </footer>
    </>
  );
}

function getBReply(status: ExchangeStatus, latestInstruction: string) {
  switch (status) {
    case "accepted":
      return {
        status: "Yes / 条件付き承認",
        body: latestInstruction
          ? `Aさんは条件付きで登壇可能です。追加条件: ${latestInstruction}`
          : "Aさんは条件付きで登壇可能です。公開範囲、写真利用、資料二次利用は事前確認してください。"
      };
    case "declined":
      return {
        status: "No / 停止",
        body: "Aさんは今回は見送りました。外部へ追加情報は送信されていません。"
      };
    case "instruction":
      return {
        status: "Aさんが条件を追加中",
        body: "Aさん側のReality Gateで追加条件を聞き取り中です。"
      };
    case "revised":
      return {
        status: "条件付きで再確認",
        body: latestInstruction
          ? `Aさんから追加条件: ${latestInstruction}`
          : "Aさんから追加条件が届き、B社側のBusiness AGIが再確認しています。"
      };
    case "pending":
    default:
      return {
        status: "返信待ち",
        body: "B社からAさんへ登壇依頼を送信済みです。Aさん側のReality Gateで承認待ちです。"
      };
  }
}
