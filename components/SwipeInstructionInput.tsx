"use client";

import { SendHorizonal } from "lucide-react";
import { useState } from "react";

export function SwipeInstructionInput({
  disabled,
  onSubmit
}: {
  disabled?: boolean;
  onSubmit: (instruction: string) => void;
}) {
  const [value, setValue] = useState("");

  return (
    <form
      className="flex gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        const next = value.trim();
        if (!next) {
          return;
        }
        onSubmit(next);
        setValue("");
      }}
    >
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        disabled={disabled}
        placeholder="例: 写真投稿は事前確認にして"
        className="min-w-0 flex-1 rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/42 focus:border-cyan-200/70"
      />
      <button
        type="submit"
        disabled={disabled}
        className="grid h-12 w-12 place-items-center rounded-2xl border border-white/12 bg-white text-[#111] disabled:opacity-40"
        aria-label="指示を送る"
      >
        <SendHorizonal size={18} />
      </button>
    </form>
  );
}
