"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowIcon } from "@/components/site/Icons";
import type { PortfolioItem } from "@/lib/portfolio";

/** A fixed-size desktop viewport, scaled down to fit the card. */
const FRAME_W = 1280;
const FRAME_H = 800;

export function PortfolioCard({ item, serviceLabel }: { item: PortfolioItem; serviceLabel: string }) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;
    const update = () => setScale(node.clientWidth / FRAME_W);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      href={item.href}
      className="group block overflow-hidden border border-white/10 bg-ink-900 transition-colors duration-300 hover:border-gold-400/40"
    >
      <div
        ref={frameRef}
        className="relative w-full overflow-hidden bg-ink-800"
        style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
      >
        {item.preview ? (
          <iframe
            src={item.preview}
            title={item.title}
            loading="lazy"
            tabIndex={-1}
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 origin-top-left border-0 bg-white"
            style={{
              width: FRAME_W,
              height: FRAME_H,
              transform: `scale(${scale})`,
            }}
          />
        ) : item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
        ) : null}
      </div>
      <div className="flex items-end justify-between gap-4 p-5 sm:p-6">
        <div>
          <p className="label text-gold-500">{serviceLabel}</p>
          <h3 className="font-display mt-2 text-2xl text-bone-50 sm:text-3xl">{item.title}</h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-bone-400">{item.note}</p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-bone-200 transition-all duration-300 group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-ink-950">
          <ArrowIcon className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
