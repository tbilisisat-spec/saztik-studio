import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";
import { ScoreSimulator } from "@/components/site/ScoreSimulator";
import { ArrowIcon, MailIcon, TargetIcon } from "@/components/site/Icons";
import { CinematicVideo } from "@/components/site/CinematicVideo";
import { HERO_MEDIA } from "@/lib/seed-data";
import { GROWTH_LADDER, METHOD, PRINCIPLES } from "@/lib/content";
import { STAGES } from "@/lib/scoring";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Hunt Method",
  description:
    "How Saztik finds high-ticket businesses with weak video content, builds a private cinematic sample, and converts it into retained monthly work.",
};

const OUTREACH = {
  email: {
    channel: "Email · to owner or marketing lead",
    subject: "Made a short film for {Business} — private preview",
    body: `Hi {Name},

I run Saztik, a creative studio working with luxury hospitality and
high-ticket brands in Europe and the US.

I noticed {Business} has an outstanding photo library — and almost no
video that matches the price point. So I cut a 22-second cinematic
piece from your own public material, specifically for you.

It's attached as a private, watermarked preview. Nothing is published
anywhere and it stays yours to react to.

If it's close to what you'd want, I can deliver the clean full-quality
master plus vertical cutdowns this week — typically around a third of
what a traditional production would cost, because we work from the
assets you already have.

Either way, enjoy the film.

{Sender} — Saztik · The Art of Connection`,
  },
  instagram: {
    channel: "Instagram DM · short version",
    subject: "First message",
    body: `Hi {Name} — I made a 20-second cinematic edit for {Business}
using your own photos. It's private and watermarked, not posted anywhere.
Want me to send the link?`,
  },
};

export default function ProcessPage() {
  return (
    <>
      <section className="relative flex min-h-[70svh] items-end overflow-hidden border-b border-white/8">
        <CinematicVideo
          src={HERO_MEDIA.secondary}
          poster={HERO_MEDIA.secondaryPoster}
          overlayClassName="bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/70"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pt-40 pb-16 sm:px-8">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-gold-400">
              <TargetIcon className="h-4 w-4" />
              The hunt method
            </p>
            <h1 className="font-display mt-8 max-w-5xl text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.9]">
              We don&apos;t wait to be <span className="text-gold-400 italic">found</span>
            </h1>
            <p className="mt-8 max-w-2xl text-[0.9375rem] leading-relaxed text-bone-200">
              Six steps from an unknown business in Europe or the United States to a retained monthly
              client. The private sample is the pivot — it replaces the pitch entirely.
            </p>
          </Reveal>
        </div>
      </section>

      {/* method */}
      <section className="border-b border-white/8 py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <ol className="grid gap-px bg-white/8 md:grid-cols-2 xl:grid-cols-3">
            {METHOD.map((step, index) => (
              <Reveal key={step.key} delay={index * 80}>
                <li className="group flex h-full flex-col bg-ink-950 p-8 transition-colors duration-500 hover:bg-ink-900 sm:p-10">
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-5xl text-gold-400/80">{step.step}</span>
                    <span className="text-[0.6rem] tracking-[0.24em] text-mute-500 uppercase">
                      {step.key}
                    </span>
                  </div>
                  <h2 className="font-display mt-8 text-4xl text-bone-50">{step.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-mute-500">{step.body}</p>
                  <p className="mt-auto border-t border-white/8 pt-6 text-[0.8125rem] leading-relaxed text-bone-400/80 italic">
                    {step.detail}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* formula + simulator */}
      <section className="border-b border-white/8 bg-ink-900/40 py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1400px] items-start gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="eyebrow">Filter</p>
              <h2 className="font-display mt-6 text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.05]">
                Price <span className="text-gold-500">×</span> Visual Appeal{" "}
                <span className="text-gold-500">×</span>{" "}
                <span className="text-gold-400 italic">Content Gap</span>
              </h2>
              <p className="mt-6 max-w-lg text-[0.9375rem] leading-relaxed text-mute-500">
                Every candidate is rated 1–5 on three axes and weighted into a single fit score.
                Above 80 the sample gets built that week. Below 45 it goes on the watchlist — we are
                not chasing every business.
              </p>
              <ul className="mt-10 space-y-px bg-white/8">
                {STAGES.map((stage) => (
                  <li key={stage.key} className="flex items-start gap-5 bg-ink-950 p-5">
                    <span className="font-display w-16 shrink-0 text-sm text-gold-500">
                      {stage.label.split("·")[0].trim()}
                    </span>
                    <span className="text-sm tracking-[0.14em] text-bone-50 uppercase">
                      {stage.label.split("·")[1]?.trim()}
                    </span>
                    <span className="ml-auto max-w-[16rem] text-right text-xs text-mute-500">
                      {stage.hint}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <ScoreSimulator />
          </Reveal>
        </div>
      </section>

      {/* outreach */}
      <section className="border-b border-white/8 py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <MailIcon className="h-4 w-4 text-gold-400" />
              Outreach
            </p>
            <h2 className="font-display mt-6 max-w-3xl text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.05]">
              The message is the sample, not the promise
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {[OUTREACH.email, OUTREACH.instagram].map((template, index) => (
              <Reveal key={template.channel} delay={index * 120}>
                <div className="flex h-full flex-col border border-white/10 bg-ink-900/60">
                  <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
                    <span className="text-[0.6rem] tracking-[0.22em] text-gold-400 uppercase">
                      {template.channel}
                    </span>
                    <span className="text-[0.6rem] tracking-[0.18em] text-mute-500 uppercase">
                      {template.subject}
                    </span>
                  </div>
                  <pre className="overflow-x-auto px-6 py-7 text-[0.8125rem] leading-relaxed whitespace-pre-wrap text-bone-200">
                    {template.body}
                  </pre>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* brand voice */}
      <section className="border-b border-white/8 bg-ink-900/40 py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <div className="h-full border border-gold-400/25 bg-ink-950 p-8 sm:p-10">
              <p className="eyebrow text-gold-400">What we say</p>
              <ul className="mt-8 space-y-5">
                {PRINCIPLES.weSay.map((line) => (
                  <li key={line} className="flex gap-4 text-[0.9375rem] leading-relaxed text-bone-50">
                    <span className="mt-2.5 h-px w-6 shrink-0 bg-gold-400" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="h-full border border-white/10 bg-ink-950 p-8 sm:p-10">
              <p className="eyebrow text-ember-500">What we never say</p>
              <ul className="mt-8 space-y-5">
                {PRINCIPLES.weNeverSay.map((line) => (
                  <li key={line} className="flex gap-4 text-[0.9375rem] text-mute-500 line-through decoration-ember-500/60">
                    <span className="mt-2.5 h-px w-6 shrink-0 bg-ember-500/60" />
                    {line}
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-white/8 pt-6 text-sm leading-relaxed text-bone-200">
                Saztik must never become a “cheap editor”. Lower price is presented as the result of
                an efficient process — never as the identity of the brand.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ladder */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">Retention</p>
            <h2 className="font-display mt-6 max-w-3xl text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.05]">
              The goal is not one reel. It&apos;s a{" "}
              <span className="text-gold-400 italic">monthly client</span>.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px bg-white/8 sm:grid-cols-3 lg:grid-cols-5">
            {GROWTH_LADDER.map((rung, index) => (
              <Reveal key={rung.stage} delay={index * 80}>
                <div className="h-full bg-ink-950 p-7">
                  <span className="font-display text-xs tracking-[0.22em] text-gold-500 uppercase">
                    {rung.stage}
                  </span>
                  <p className="mt-4 text-base text-bone-50">{rung.label}</p>
                  <p className="mt-2 text-sm text-mute-500">{rung.range}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={160}>
            <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-white/8 pt-10 sm:flex-row sm:items-center">
              <p className="max-w-2xl text-sm leading-relaxed text-mute-500">
                The advantage of Saztik is the combination: professional quality + fast production +
                efficient cost + creativity + technology. Any one of them alone is commodity.
              </p>
              <Link
                href="/start-a-project"
                className="group inline-flex shrink-0 items-center gap-3 border border-gold-400/40 px-7 py-4 text-[0.68rem] tracking-[0.24em] text-gold-300 uppercase transition-all duration-500 hover:bg-gold-400 hover:text-ink-950"
              >
                Start a Project
                <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
