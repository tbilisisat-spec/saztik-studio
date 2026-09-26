"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  overlayClassName?: string;
  ariaLabel?: string;
};

/**
 * Ambient background video: muted, looped, never blocking interaction.
 * Fades in only once frames are actually available.
 */
export function CinematicVideo({ src, poster, className = "", overlayClassName = "", ariaLabel }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      video.removeAttribute("autoplay");
      video.pause();
      return;
    }
    const play = () => video.play().catch(() => undefined);
    play();
    const onCanPlay = () => setReady(true);
    video.addEventListener("canplay", onCanPlay);
    if (video.readyState >= 3) setReady(true);
    return () => video.removeEventListener("canplay", onCanPlay);
  }, [src]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden={!ariaLabel}>
      {poster ? (
        <img
          src={poster}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            ready ? "opacity-0" : "opacity-100"
          }`}
        />
      ) : null}
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className={`h-full w-full object-cover transition-opacity duration-[1600ms] ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  );
}
