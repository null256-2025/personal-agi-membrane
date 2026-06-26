"use client";

import { Mic } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type SpeechRecognitionResultLike = {
  0: { transcript: string };
  isFinal?: boolean;
};

type SpeechRecognitionEventLike = {
  results: {
    length: number;
    [index: number]: SpeechRecognitionResultLike;
  };
};

type BrowserSpeechRecognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

type SpeechWindow = Window &
  typeof globalThis & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };

export function SwipeInstructionInput({
  autoStartToken,
  disabled,
  scriptedText,
  onTranscriptChange,
  onSubmit
}: {
  autoStartToken?: number;
  disabled?: boolean;
  scriptedText?: string;
  onTranscriptChange?: (transcript: string) => void;
  onSubmit: (instruction: string) => void;
}) {
  const [value, setValue] = useState("");
  const [listening, setListening] = useState(false);
  const [voiceAvailable, setVoiceAvailable] = useState(true);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);

  function startListening() {
    if (disabled || typeof window === "undefined") {
      return;
    }

    const speechWindow = window as SpeechWindow;
    const Recognition = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
    if (!Recognition) {
      setVoiceAvailable(false);
      return;
    }

    recognitionRef.current?.stop();

    const recognition = new Recognition();
    recognition.lang = "ja-JP";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const transcript = Array.from({ length: event.results.length }, (_, index) => {
        return event.results[index]?.[0]?.transcript ?? "";
      })
        .join("")
        .trim();

      if (transcript) {
        setValue(transcript);
        onTranscriptChange?.(transcript);
      }
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  }

  useEffect(() => {
    if (autoStartToken) {
      startListening();
    }

    return () => {
      recognitionRef.current?.stop();
    };
    // startListening intentionally reads current disabled state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStartToken]);

  useEffect(() => {
    if (!scriptedText) {
      return;
    }

    setListening(true);
    setValue("");
    onTranscriptChange?.("");

    const timers = scriptedText.split("").map((_, index) => {
      return window.setTimeout(() => {
        const next = scriptedText.slice(0, index + 1);
        setValue(next);
        onTranscriptChange?.(next);
      }, 72 * (index + 1));
    });

    const doneTimer = window.setTimeout(() => {
      setListening(false);
    }, 72 * scriptedText.length + 520);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(doneTimer);
    };
  }, [onTranscriptChange, scriptedText]);

  return (
    <form
      className="mx-auto max-w-[330px] rounded-[24px] border border-cyan-100/14 bg-white/[0.06] p-3 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
      onSubmit={(event) => {
        event.preventDefault();
        const next = value.trim();
        if (!next) {
          startListening();
          return;
        }
        recognitionRef.current?.stop();
        onSubmit(next);
        setValue("");
        onTranscriptChange?.("");
      }}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={disabled}
          onClick={startListening}
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition ${
            listening
              ? "border-cyan-100/80 bg-cyan-100/20 text-cyan-50 shadow-[0_0_28px_rgba(165,255,236,0.35)]"
              : "border-white/12 bg-white/8 text-white/70"
          } disabled:opacity-40`}
          aria-label="音声で追加指示"
        >
          <Mic size={17} />
        </button>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] tracking-[0.18em] text-white/34">
            {listening ? "LISTENING" : "VOICE INSTRUCTION"}
          </p>
          <p className="mt-1 text-xs tracking-[0.08em] text-white/58">
            {listening ? "膜の上に文字起こし中" : "音声で条件を追加"}
          </p>
          <input
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              onTranscriptChange?.(event.target.value);
            }}
            disabled={disabled}
            aria-label={voiceAvailable ? "音声の文字起こし" : "追加指示"}
            className="sr-only"
          />
        </div>

        <button
          type="submit"
          disabled={disabled}
          className="rounded-full border border-white/12 px-3 py-2 text-xs tracking-[0.14em] text-white/72 transition hover:border-white/28 hover:text-white disabled:opacity-40"
        >
          OK
        </button>
      </div>
    </form>
  );
}
