import Link from "next/link";
import { ArrowIcon } from "@/components/site/Icons";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-[1400px] flex-col justify-center px-5 py-32 sm:px-8">
      <p className="eyebrow text-gold-500">404 — Scene not found</p>
      <h1 className="font-display mt-8 text-[clamp(3rem,10vw,8rem)] leading-[0.88]">
        This frame was
        <br />
        <span className="text-gold-400 italic">never cut.</span>
      </h1>
      <p className="mt-8 max-w-lg text-sm leading-relaxed text-mute-500">
        The page you were looking for is not part of the current archive. Start from the work, or
        tell us what you need built.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/work"
          className="group inline-flex items-center gap-3 bg-gold-400 px-7 py-4 text-[0.68rem] tracking-[0.24em] text-ink-950 uppercase transition-colors hover:bg-gold-300"
        >
          Selected work
          <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-3 border border-white/20 px-7 py-4 text-[0.68rem] tracking-[0.24em] text-bone-50 uppercase transition-colors hover:border-gold-400 hover:text-gold-300"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}
