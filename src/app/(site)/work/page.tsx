import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";
import { WorkExplorer } from "@/components/site/WorkExplorer";
import { ArrowIcon } from "@/components/site/Icons";
import { getWorkItems } from "@/db/work";
import { DELIVERY } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Cinematic reels, promotional films and digital experiences produced by Saztik for luxury hospitality, real estate, yachts, jewellery and premium experiences.",
};

export default async function WorkPage() {
  const items = await getWorkItems();

  return (
    <>
      <section className="relative border-b border-white/8 pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-gold-500">Archive · {items.length} projects</p>
            <h1 className="font-display mt-8 max-w-5xl text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.9]">
              Selected <span className="text-gold-400 italic">work</span>
            </h1>
            <p className="mt-8 max-w-2xl text-[0.9375rem] leading-relaxed text-mute-500">
              Every project below started the same way: an expensive, beautiful business with a video
              library that did not match its price. Hover a frame to watch it move.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
        <WorkExplorer items={items} />
      </section>

      <section className="border-t border-white/8 bg-ink-900/50 py-20">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <div>
              <p className="eyebrow">Every delivery includes</p>
              <h2 className="font-display mt-6 text-4xl leading-tight">
                The <span className="text-gold-400 italic">standard</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ul className="grid gap-px bg-white/8 sm:grid-cols-2">
              {DELIVERY.map((line) => (
                <li key={line} className="flex items-start gap-4 bg-ink-950 p-6 text-sm text-bone-200">
                  <span className="mt-2 h-px w-6 shrink-0 bg-gold-400" />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="mx-auto mt-16 max-w-[1400px] px-5 sm:px-8">
          <Link
            href="/start-a-project"
            className="group inline-flex items-center gap-3 border border-gold-400/40 px-7 py-4 text-[0.68rem] tracking-[0.24em] text-gold-300 uppercase transition-all duration-500 hover:bg-gold-400 hover:text-ink-950"
          >
            Start a Project
            <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
