"use client";

import { useMemo, useState } from "react";
import { leadScore, scoreTier } from "@/lib/scoring";

const AXES = [
  {
    key: "priceScore" as const,
    label: "Price",
    question: "How expensive is the product or service?",
    low: "€80 / night",
    high: "€5,000 / day",
  },
  {
    key: "visualScore" as const,
    label: "Visual appeal",
    question: "How good is the place, product and existing photography?",
    low: "Average phone shots",
    high: "Editorial photo library",
  },
  {
    key: "contentGapScore" as const,
    label: "Content gap",
    question: "How weak or missing is the video content?",
    low: "Already well covered",
    high: "No video at all",
  },
];

const TONE_STYLES: Record<string, string> = {
  hot: "border-gold-400/60 bg-gold-400/10 text-gold-300",
  warm: "border-gold-500/40 bg-gold-500/8 text-gold-400",
  watch: "border-white/15 bg-white/4 text-bone-200",
  cold: "border-white/10 bg-white/2 text-mute-500",
};

export function ScoreSimulator() {
  const [values, setValues] = useState({ priceScore: 5, visualScore: 5, contentGapScore: 4 });

  const score = useMemo(() => leadScore(values), [values]);
  const tier = scoreTier(score);

  return (
    <div className="border border-white/10 bg-ink-950/70 p-7 backdrop-blur sm:p-9">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Score simulator</p>
          <p className="mt-3 text-sm text-mute-500">
            Rate a business on the three axes — the studio decides how fast it moves to CREATE.
          </p>
        </div>
        <div className="text-right">
          <p className="font-display text-6xl leading-none text-gold-300">{score}</p>
          <p className="mt-1 text-[0.6rem] tracking-[0.22em] text-mute-500 uppercase">/ 100 fit</p>
        </div>
      </div>

      <div className="mt-9 space-y-7">
        {AXES.map((axis) => (
          <div key={axis.key}>
            <div className="flex items-baseline justify-between gap-4">
              <label
                htmlFor={axis.key}
                className="text-[0.68rem] tracking-[0.2em] text-bone-200 uppercase"
              >
                {axis.label}
              </label>
              <span className="font-display text-xl text-gold-400">{values[axis.key]}</span>
            </div>
            <p className="mt-1 text-xs text-mute-500">{axis.question}</p>
            <input
              id={axis.key}
              type="range"
              min={1}
              max={5}
              step={1}
              value={values[axis.key]}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, [axis.key]: Number(event.target.value) }))
              }
              className="mt-4 h-px w-full cursor-pointer appearance-none bg-white/20 accent-[#d6bb85]"
            />
            <div className="mt-2 flex justify-between text-[0.6rem] tracking-[0.14em] text-mute-500 uppercase">
              <span>{axis.low}</span>
              <span>{axis.high}</span>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`mt-9 flex flex-wrap items-center justify-between gap-4 border px-6 py-5 transition-colors duration-500 ${TONE_STYLES[tier.tone]}`}
      >
        <div>
          <p className="text-[0.6rem] tracking-[0.24em] uppercase opacity-80">Classification</p>
          <p className="font-display mt-1 text-2xl">{tier.label}</p>
        </div>
        <p className="max-w-xs text-xs leading-relaxed opacity-90">{tier.action}</p>
      </div>
    </div>
  );
}
