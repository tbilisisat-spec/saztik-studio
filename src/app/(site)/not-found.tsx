import Link from "next/link";
import { ArrowIcon } from "@/components/site/Icons";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-[1200px] flex-col justify-center px-5 py-32 sm:px-8">
      <p className="label text-gold-500">404</p>
      <h1 className="font-display mt-6 text-[clamp(2.8rem,9vw,6rem)] leading-[0.95]">
        This page <span className="text-gold-400 italic">does not exist.</span>
      </h1>
      <p className="mt-6 max-w-md text-bone-400">
        The link may be old or mistyped. Head back to the homepage.
      </p>
      <div className="mt-10">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 bg-gold-400 px-7 py-4 text-sm font-medium text-ink-950 transition-colors hover:bg-gold-300"
        >
          Back home
          <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
