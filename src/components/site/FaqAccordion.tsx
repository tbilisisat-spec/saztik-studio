"use client";

import { useState } from "react";
import { FAQ } from "@/lib/content";

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/8 border-y border-white/8">
      {FAQ.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-300 hover:text-gold-300"
            >
              <span className="flex items-baseline gap-5">
                <span className="font-display text-xs text-gold-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-lg text-bone-50 sm:text-xl">{item.q}</span>
              </span>
              <span
                className={`relative flex h-7 w-7 shrink-0 items-center justify-center border transition-all duration-500 ${
                  isOpen
                    ? "rotate-45 border-gold-400 text-gold-300"
                    : "border-white/15 text-bone-400"
                }`}
              >
                <span className="absolute h-px w-3 bg-current" />
                <span className="absolute h-3 w-px bg-current" />
              </span>
            </button>
            <div
              className={`grid transition-all duration-500 ease-out ${
                isOpen ? "grid-rows-[1fr] pb-7 opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pl-10 text-[0.9375rem] leading-relaxed text-mute-500">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
