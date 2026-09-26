import Link from "next/link";
import { CinematicVideo } from "@/components/site/CinematicVideo";
import { Reveal } from "@/components/site/Reveal";
import { WorkCard } from "@/components/site/WorkCard";
import {
  ArrowIcon,
  CircuitIcon,
  FilmIcon,
  LayersIcon,
  SparkIcon,
  TargetIcon,
} from "@/components/site/Icons";
import { getFeaturedWork } from "@/db/work";
import { HERO_MEDIA } from "@/lib/seed-data";
import { GROWTH_LADDER, HUNT_CRITERIA, METHOD, PACKAGES, PILLARS, VALUE_PROPS } from "@/lib/content";
import { VERTICALS } from "@/lib/scoring";

export const dynamic = "force-dynamic";

const HERO_STATS = [
  { value: "06", label: "Step hunt method" },
  { value: "5–7", label: "Days to delivery" },
  { value: "3", label: "Creative · Digital · AI" },
  { value: "≈⅓", label: "Of traditional production cost" },
];

const FORMULA_EXAMPLES = [
  { business: "Luxury villa", price: "€800 / night", assets: "Great photos", gap: "Weak reels" },
  { business: "Luxury yacht", price: "€5,000 / day", assets: "Great photography", gap: "Poor video" },
  { business: "Jewellery brand", price: "$2,000 product", assets: "Beautiful stills", gap: "Weak social video" },
];

const PILLAR_ICONS = {
  creative: FilmIcon,
  digital: LayersIcon,
  ai: CircuitIcon,
} as const;

export default async function HomePage() {
  const featured = await getFeaturedWork(4);

  return (
    <>
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
        <CinematicVideo
          src={HERO_MEDIA.video}
          poster={HERO_MEDIA.poster}
          overlayClassName="bg-gradient-to-t from-ink-950 via-ink-950/45 to-ink-950/70"
        />
        <div className="vignette pointer-events-none absolute inset-0" />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pt-32 pb-10 sm:px-8 sm:pb-14">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-gold-400">
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-gold-400" />
              Digital Creative Studio · Europe &amp; United States
            </p>
          </Reveal>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end">
            <Reveal delay={120}>
              <h1 className="font-display text-[clamp(3.2rem,10.5vw,9.5rem)] leading-[0.85] tracking-[-0.02em] text-bone-50">
                The Art of
                <br />
                <span className="text-gold-400 italic">Connection</span>
              </h1>
            </Reveal>

            <Reveal delay={260}>
              <div className="lg:pb-6">
                <p className="max-w-md text-base leading-relaxed text-bone-200 sm:text-lg">
                  We build cinematic reels, promotional films and digital experiences for
                  high-ticket businesses whose product deserves better footage than it currently has.
                </p>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-mute-500">
                  Professional visual content — without the traditional production cost.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/start-a-project"
                    className="group inline-flex items-center gap-3 bg-gold-400 px-7 py-4 text-[0.68rem] tracking-[0.24em] text-ink-950 uppercase transition-all duration-500 hover:bg-gold-300"
                  >
                    Start a Project
                    <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/work"
                    className="group inline-flex items-center gap-3 border border-white/20 px-7 py-4 text-[0.68rem] tracking-[0.24em] text-bone-50 uppercase transition-all duration-500 hover:border-gold-400 hover:text-gold-300"
                  >
                    See the Work
                    <SparkIcon className="h-4 w-4 transition-transform duration-700 group-hover:rotate-90" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={380}>
            <dl className="mt-14 grid grid-cols-2 gap-px border-t border-white/10 bg-white/10 sm:grid-cols-4">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="bg-ink-950/70 px-4 py-6 backdrop-blur-sm sm:px-6">
                  <dt className="font-display text-3xl text-gold-300 sm:text-4xl">{stat.value}</dt>
                  <dd className="mt-2 text-[0.625rem] tracking-[0.2em] text-mute-500 uppercase">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────── MARQUEE ───────────────────────── */}
      <section className="overflow-hidden border-y border-white/8 bg-ink-900 py-5">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[0, 1].map((duplicate) => (
            <div key={duplicate} className="flex gap-10">
              {VERTICALS.map((vertical) => (
                <span
                  key={`${duplicate}-${vertical.key}`}
                  className="flex items-center gap-10 text-[0.68rem] tracking-[0.3em] text-bone-400 uppercase"
                >
                  {vertical.label}
                  <span className="h-1 w-1 rounded-full bg-gold-500" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────────── POSITION ───────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div>
              <p className="eyebrow">Position</p>
              <p className="font-display mt-8 text-[clamp(1.9rem,3.6vw,3.1rem)] leading-[1.15] text-bone-50">
                We don&apos;t wait for clients to find Saztik.{" "}
                <span className="text-gold-400 italic">Saztik finds the client</span> — and arrives
                with something already made.
              </p>
              <p className="mt-8 max-w-lg text-[0.9375rem] leading-relaxed text-mute-500">
                Across Europe and the United States there are expensive, beautiful businesses with
                weak video. Villas at €800 a night, yachts at €5,000 a day, jewellery houses with
                stunning stills and no motion at all. That gap is the entire business model.
              </p>
            </div>
          </Reveal>

          <div className="space-y-px bg-white/8">
            {VALUE_PROPS.map((prop, index) => (
              <Reveal key={prop.key} delay={index * 120}>
                <div className="group h-full bg-ink-950 p-8 transition-colors duration-500 hover:bg-ink-900 sm:p-10">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-gold-500">{prop.label}</span>
                    <span className="font-display text-sm text-mute-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl leading-snug text-bone-50 sm:text-2xl">
                    {prop.headline}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-mute-500">{prop.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── WORK ───────────────────────── */}
      <section className="border-t border-white/8 bg-ink-900/60 py-24 sm:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2 className="font-display mt-6 text-[clamp(2.4rem,5.5vw,4.5rem)] leading-none">
                  Cinematic, not <span className="text-gold-400 italic">corporate</span>
                </h2>
              </div>
              <Link
                href="/work"
                className="group inline-flex items-center gap-3 text-[0.68rem] tracking-[0.24em] text-bone-200 uppercase transition-colors hover:text-gold-300"
              >
                All projects
                <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {featured.map((item, index) => (
              <Reveal key={item.slug} delay={index * 90}>
                <WorkCard item={item} index={index} priority={index < 2} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── THE FORMULA ───────────────────────── */}
      <section className="relative overflow-hidden border-t border-white/8 py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
          <CinematicVideo
            src={HERO_MEDIA.secondary}
            poster={HERO_MEDIA.secondaryPoster}
            overlayClassName="bg-ink-950/40"
          />
        </div>
        <div className="absolute inset-0 bg-ink-950/85" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <TargetIcon className="h-4 w-4 text-gold-400" />
              The strategic principle
            </p>
            <h2 className="font-display mt-8 max-w-4xl text-[clamp(2rem,4.6vw,3.8rem)] leading-[1.08]">
              High price <span className="text-gold-500">+</span> high visual potential{" "}
              <span className="text-gold-500">+</span>{" "}
              <span className="text-gold-400 italic">weak video content</span>
            </h2>
            <p className="mt-6 max-w-2xl text-[0.9375rem] leading-relaxed text-mute-500">
              The stronger all three are, the more attractive the lead. We are not looking for every
              business — only this specific combination.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-px bg-white/8 lg:grid-cols-3">
            {HUNT_CRITERIA.map((criterion, index) => (
              <Reveal key={criterion.key} delay={index * 120}>
                <div className="h-full bg-ink-950/90 p-8 backdrop-blur-sm sm:p-10">
                  <span className="font-display text-5xl text-gold-400/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-xl text-bone-50">{criterion.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mute-500">{criterion.body}</p>
                  <ul className="mt-6 space-y-2 border-t border-white/8 pt-5">
                    {criterion.examples.map((example) => (
                      <li
                        key={example}
                        className="text-[0.75rem] tracking-[0.12em] text-bone-400 uppercase"
                      >
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-12 overflow-hidden border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/4 text-[0.6rem] tracking-[0.24em] text-mute-500 uppercase">
                  <tr>
                    <th className="px-6 py-4 font-normal">Business</th>
                    <th className="px-6 py-4 font-normal">Price</th>
                    <th className="hidden px-6 py-4 font-normal sm:table-cell">Assets</th>
                    <th className="px-6 py-4 font-normal">Content gap</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/8">
                  {FORMULA_EXAMPLES.map((row) => (
                    <tr key={row.business} className="transition-colors hover:bg-white/3">
                      <td className="px-6 py-5 text-bone-50">{row.business}</td>
                      <td className="px-6 py-5 text-gold-300">{row.price}</td>
                      <td className="hidden px-6 py-5 text-bone-400 sm:table-cell">{row.assets}</td>
                      <td className="px-6 py-5 text-ember-500">{row.gap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────── PILLARS ───────────────────────── */}
      <section className="border-t border-white/8 bg-ink-900/40 py-24 sm:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="eyebrow">Brand architecture</p>
              <h2 className="font-display mt-6 text-[clamp(2.2rem,5vw,4rem)] leading-none">
                One studio, <span className="text-gold-400 italic">three disciplines</span>
              </h2>
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-mute-500">
                Creative is the revenue engine today. The architecture was built from day one to grow
                into Digital and AI &amp; Automation.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-px bg-white/8 lg:grid-cols-3">
            {PILLARS.map((pillar, index) => {
              const Icon = PILLAR_ICONS[pillar.id];
              return (
                <Reveal key={pillar.id} delay={index * 120}>
                  <div className="group flex h-full flex-col bg-ink-950 p-8 transition-colors duration-500 hover:bg-ink-900 sm:p-10">
                    <div className="flex items-start justify-between">
                      <Icon className="h-9 w-9 text-gold-400 transition-transform duration-700 group-hover:scale-110" />
                      <span className="font-display text-3xl text-white/12">{pillar.index}</span>
                    </div>
                    <h3 className="font-display mt-10 text-4xl text-bone-50">{pillar.title}</h3>
                    <p className="mt-2 text-[0.68rem] tracking-[0.22em] text-gold-500 uppercase">
                      {pillar.tagline}
                    </p>
                    <p className="mt-6 text-sm leading-relaxed text-mute-500">
                      {pillar.description}
                    </p>
                    <ul className="mt-8 space-y-2.5 border-t border-white/8 pt-6">
                      {pillar.items.map((entry) => (
                        <li key={entry} className="flex items-center gap-3 text-sm text-bone-200">
                          <span className="h-px w-5 bg-gold-500" />
                          {entry}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-auto pt-8 text-[0.6rem] tracking-[0.2em] text-mute-500 uppercase">
                      {pillar.status}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────── METHOD ───────────────────────── */}
      <section className="border-t border-white/8 py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow">The hunt system</p>
              <h2 className="font-display mt-6 text-[clamp(2.2rem,5vw,4rem)] leading-[0.98]">
                Hunt. Analyze.
                <br />
                <span className="text-gold-400 italic">Create.</span> Show.
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-mute-500">
                Six steps between finding a business and becoming its monthly content partner. The
                private sample sits in the middle — it is the strongest sales tool we have.
              </p>
              <Link
                href="/process"
                className="group mt-8 inline-flex items-center gap-3 text-[0.68rem] tracking-[0.24em] text-gold-300 uppercase"
              >
                Full process
                <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <ol className="space-y-px bg-white/8">
            {METHOD.map((step, index) => (
              <Reveal key={step.key} delay={index * 80}>
                <li className="group bg-ink-950 p-7 transition-colors duration-500 hover:bg-ink-900 sm:p-9">
                  <div className="flex items-baseline gap-6">
                    <span className="font-display text-2xl text-gold-500 transition-colors duration-500 group-hover:text-gold-300">
                      {step.step}
                    </span>
                    <div>
                      <h3 className="text-lg tracking-[0.12em] text-bone-50 uppercase">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-mute-500">
                        {step.body}
                      </p>
                      <p className="mt-3 max-w-xl text-[0.8125rem] leading-relaxed text-bone-400/70 italic">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────────────────── PRIVATE SAMPLE ───────────────────────── */}
      <section className="relative overflow-hidden border-t border-white/8 bg-ink-900/60 py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="eyebrow text-gold-500">The private sample</p>
              <h2 className="font-display mt-6 text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[0.95]">
                Not “we make videos”.
                <br />
                <span className="text-gold-400 italic">“We made something for you.”</span>
              </h2>
              <p className="mt-8 max-w-lg text-[0.9375rem] leading-relaxed text-mute-500">
                Before any commitment, we build one short cinematic piece specifically for your
                business — from the material you already publish. It arrives privately, watermarked,
                with your name on it.
              </p>
              <ul className="mt-10 space-y-4 border-t border-white/8 pt-8">
                {[
                  "15–30 seconds, cinematic and branded",
                  "Delivered privately — never published without permission",
                  "Watermarked preview, full-quality master on project approval",
                  "Built from your own photography and footage",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-4 text-sm text-bone-200">
                    <span className="mt-2 h-px w-6 shrink-0 bg-gold-400" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="relative aspect-[4/5] overflow-hidden border border-white/10 sm:aspect-[16/11] lg:aspect-[4/5]">
              <CinematicVideo
                src={HERO_MEDIA.secondary}
                poster={HERO_MEDIA.secondaryPoster}
                overlayClassName="bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/30"
              />
              <div className="absolute inset-0 flex flex-col justify-between p-7">
                <div className="flex items-center justify-between">
                  <span className="border border-white/20 bg-ink-950/60 px-3 py-1.5 text-[0.55rem] tracking-[0.24em] text-bone-200 uppercase backdrop-blur">
                    Private preview
                  </span>
                  <span className="border border-gold-400/40 bg-ink-950/60 px-3 py-1.5 text-[0.55rem] tracking-[0.24em] text-gold-300 uppercase backdrop-blur">
                    Watermarked
                  </span>
                </div>
                <div>
                  <p className="font-display text-6xl text-white/12 select-none">SAZTIK</p>
                  <p className="mt-3 text-[0.68rem] tracking-[0.2em] text-bone-200 uppercase">
                    Sample · 00:22 · for one recipient only
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────── PACKAGES ───────────────────────── */}
      <section id="packages" className="border-t border-white/8 py-24 sm:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="eyebrow">Products &amp; engagement</p>
              <h2 className="font-display mt-6 text-[clamp(2.2rem,5vw,4rem)] leading-none">
                Better production <span className="text-gold-400 italic">economics</span>
              </h2>
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-mute-500">
                Indicative ranges. Final scope and pricing are quoted per project after we review
                your assets — and only where the quality is genuinely defensible.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-px bg-white/8 md:grid-cols-2 xl:grid-cols-4">
            {PACKAGES.map((pack, index) => (
              <Reveal key={pack.id} delay={index * 90}>
                <div className="group flex h-full flex-col bg-ink-950 p-8 transition-colors duration-500 hover:bg-ink-900">
                  <span className="eyebrow text-gold-500">{pack.length}</span>
                  <h3 className="font-display mt-6 text-3xl text-bone-50">{pack.name}</h3>
                  <p className="mt-4 text-2xl text-gold-300">{pack.price}</p>
                  <p className="mt-1 text-[0.6875rem] tracking-[0.1em] text-mute-500 uppercase">
                    {pack.comparison}
                  </p>
                  <ul className="mt-8 space-y-3 border-t border-white/8 pt-6">
                    {pack.includes.map((line) => (
                      <li key={line} className="flex gap-3 text-[0.8125rem] leading-relaxed text-bone-400">
                        <span className="mt-[0.55rem] h-px w-3 shrink-0 bg-gold-500" />
                        {line}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-8 text-[0.8125rem] leading-relaxed text-bone-200 italic">
                    {pack.best}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <div className="mt-16 border border-white/8 bg-ink-900/50 p-8 sm:p-10">
              <p className="eyebrow">How engagements grow</p>
              <div className="mt-8 grid gap-6 sm:grid-cols-5">
                {GROWTH_LADDER.map((rung, index) => (
                  <div key={rung.stage} className="relative">
                    <span className="font-display text-xs tracking-[0.2em] text-gold-500 uppercase">
                      {rung.stage}
                    </span>
                    <p className="mt-3 text-sm text-bone-50">{rung.label}</p>
                    <p className="mt-1 text-[0.8125rem] text-mute-500">{rung.range}</p>
                    {index < GROWTH_LADDER.length - 1 ? (
                      <span className="absolute top-1 -right-3 hidden h-px w-6 bg-white/15 sm:block" />
                    ) : null}
                  </div>
                ))}
              </div>
              <p className="mt-8 border-t border-white/8 pt-6 text-xs leading-relaxed text-mute-500">
                These are initial commercial targets, not income guarantees. Real pricing is tuned to
                quality, market and client response. The rule stays the same: Saztik does not win on
                being cheap — it wins on more value per dollar spent.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────── CTA ───────────────────────── */}
      <section className="relative overflow-hidden border-t border-white/8">
        <CinematicVideo
          src={HERO_MEDIA.video}
          poster={HERO_MEDIA.poster}
          overlayClassName="bg-ink-950/82"
        />
        <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-28 text-center sm:px-8 sm:py-36">
          <Reveal>
            <p className="eyebrow text-gold-400">Start here</p>
            <h2 className="font-display mx-auto mt-8 max-w-4xl text-[clamp(2.6rem,7vw,6rem)] leading-[0.92]">
              Tell us what you sell.
              <br />
              <span className="text-gold-400 italic">We&apos;ll show you how it should look.</span>
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-bone-200">
              Send your website and Instagram. We review the content gap and reply with a plan — and,
              if you are a fit, a private sample made for your business.
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/start-a-project"
                className="group inline-flex items-center gap-3 bg-gold-400 px-8 py-4 text-[0.68rem] tracking-[0.24em] text-ink-950 uppercase transition-all duration-500 hover:bg-gold-300"
              >
                Start a Project
                <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
              <a
                href="mailto:info@saztik.com"
                className="inline-flex items-center gap-3 border border-white/20 px-8 py-4 text-[0.68rem] tracking-[0.24em] text-bone-50 uppercase transition-all duration-500 hover:border-gold-400 hover:text-gold-300"
              >
                info@saztik.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
