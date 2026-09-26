"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { WorkRecord } from "@/db/work";
import { verticalLabel } from "@/lib/scoring";
import { ArrowIcon, PlayIcon } from "@/components/site/Icons";

type Props = {
  item: WorkRecord;
  index?: number;
  priority?: boolean;
  size?: "tall" | "wide";
};

export function WorkCard({ item, index, priority = false, size = "wide" }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hovering, setHovering] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (hovering) {
      video.currentTime = 0;
      const promise = video.play();
      if (promise) promise.catch(() => undefined);
    } else {
      video.pause();
    }
  }, [hovering]);

  return (
    <Link
      href={`/work/${item.slug}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      className={`group relative block overflow-hidden border border-white/8 bg-ink-900 transition-colors duration-500 hover:border-gold-400/35 ${
        size === "tall" ? "aspect-[3/4]" : "aspect-[16/10]"
      }`}
    >
      <img
        src={item.coverUrl}
        alt={`${item.title} — ${item.client}`}
        loading={priority ? "eager" : "lazy"}
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ease-out ${
          hovering && videoReady ? "scale-105 opacity-0" : "scale-100 opacity-90 group-hover:scale-105"
        }`}
      />

      {item.videoUrl ? (
        <video
          ref={videoRef}
          src={item.videoUrl}
          poster={item.posterUrl ?? item.coverUrl}
          muted
          loop
          playsInline
          preload="none"
          onLoadedData={() => setVideoReady(true)}
          onMouseEnter={() => {
            if (videoRef.current) videoRef.current.preload = "auto";
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            hovering && videoReady ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : null}

      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent opacity-90" />
      <div className="scanline absolute inset-0 opacity-30 mix-blend-overlay" />

      {typeof index === "number" ? (
        <span className="absolute top-5 left-5 font-display text-sm text-gold-400/80">
          {String(index + 1).padStart(2, "0")}
        </span>
      ) : null}

      <span className="absolute top-5 right-5 flex items-center gap-2 text-[0.6rem] tracking-[0.24em] text-bone-400 uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <PlayIcon className="h-3.5 w-3.5" />
        {item.duration ?? "View case"}
      </span>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6">
        <div>
          <p className="eyebrow text-gold-500">{verticalLabel(item.vertical)}</p>
          <h3 className="font-display mt-3 text-[1.9rem] leading-none text-bone-50 sm:text-[2.2rem]">
            {item.title}
          </h3>
          <p className="mt-3 max-w-md text-sm text-bone-400 opacity-0 transition-all duration-500 group-hover:opacity-100">
            {item.deliverable}
            {item.location ? ` · ${item.location}` : ""}
          </p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-bone-200 transition-all duration-500 group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-ink-950">
          <ArrowIcon className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
