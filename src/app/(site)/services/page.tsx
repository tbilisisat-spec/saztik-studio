import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { Reveal } from "@/components/site/Reveal";
import { ArrowIcon, CheckIcon, CircuitIcon, FilmIcon, LayersIcon } from "@/components/site/Icons";
import { DELIVERY, PACKAGES, PILLARS, VALUE_PROPS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Creative film and reels, website design and performance, and AI-assisted automation — produced for high-ticket brands with better production economics.",
};

const PILLAR_DETAIL: Record<
  string,
  { icon: typeof FilmIcon; makes: string[]; forWho: string; note: string }
> = {
  creative: {
    icon: FilmIcon,
    makes: [
      "Cinematic reels (15–60 sec)",
      "Promotional films (60–90 sec)",
      "Social content series on a monthly rhythm",
      "Advertising cutdowns for paid channels",
      "Property, product and experience films",
    ],
    forWho:
      "Villas, boutique hotels, resorts, developers, yacht charters, restaurants, jewellery and fashion houses.",
    note: "Creative is where most clients start, and remains the studio's primary volume.",
  },
  digital: {
    icon: LayersIcon,
    makes: [
      "New website builds, designed around the brand",
      "Performance audits and redesigns for existing sites",
      "Direct-booking and enquiry landing pages",
      "Interactive unit and property browsers",
      "Listing pages tuned for high-ticket buyers",
    ],
    forWho:
      "Businesses whose content is strong but whose website is slow, dated or not converting — or who have no site at all.",
    note: "Digital stands on its own and is just as often the first thing a client buys.",
  },
  ai: {
    icon: CircuitIcon,
    makes: [
      "AI concierge and guest messaging",
      "Enquiry-to-booking follow-up automation",
      "Content pipelines and asset intake tooling",
      "Custom bots trained on a brand's tone of voice",
    ],
    forWho: "Retained clients who want the same standard maintained after launch.",
    note: "AI & Automation also powers our own production efficiency — that is where the economics come from.",
  },
};

const COMPARISON = [
  { label: "Crew days on location", traditional: "1–3 days", saztik: "Usually none" },
  { label: "Travel & logistics", traditional: "Billed to you", saztik: "Not required" },
  { label: "Raw material", traditional: "Newly shot", saztik: "Your existing assets + direction" },
  { label: "Film turnaround", traditional: "4–8 weeks", saztik: "5–7 days" },
  { label: "New website turnaround", traditional: "4–10 weeks", saztik: "7–10 days" },
  { label: "Typical single reel", traditional: "$500 – $2,000+", saztik: "≈ one third of that" },
  { label: "Revision rounds", traditional: "Limited / billed", saztik: "Two included" },
];

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-white/8 pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-gold-500">Services</p>
            <h1 className="font-display mt-8 max-w-5xl text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.9]">
              Professional visual content and web design
              <span className="text-gold-400 italic"> without the traditional cost</span>
            </h1>
            <p className="mt-8 max-w-2xl text-[0.9375rem] leading-relaxed text-mute-500">
              Three disciplines, one studio. Creative and Digital are both core offers — start
              wherever your business needs it most.
            </p>
          </Reveal>
        </div>
      </section>

      {PILLARS.map((pillar, pillarIndex) => {
        const detail = PILLAR_DETAIL[pillar.id];
        const Icon = detail.icon;
        return (
          <section
            key={pillar.id}
            id={pillar.id}
            className={`border-b border-white/8 py-20 sm:py-24 ${
              pillarIndex % 2 === 1 ? "bg-ink-900/40" : ""
            }`}
          >
            <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
              <Reveal>
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <div className="flex items-center gap-5">
                    <Icon className="h-10 w-10 text-gold-400" />
                    <span className="font-display text-sm tracking-[0.2em] text-mute-500">
                      {pillar.index}
                    </span>
                  </div>
                  <h2 className="font-display mt-8 text-[clamp(2.6rem,6vw,4.6rem)] leading-none">
                    {pillar.title}
                  </h2>
                  <p className="mt-3 text-[0.68rem] tracking-[0.22em] text-gold-500 uppercase">
                    {pillar.tagline}
                  </p>
                  <p className="mt-7 max-w-md text-[0.9375rem] leading-relaxed text-mute-500">
                    {pillar.description}
                  </p>
                  <p className="mt-6 border-l border-gold-400/50 pl-5 text-sm leading-relaxed text-bone-200 italic">
                    {detail.note}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <div>
                  <p className="eyebrow">What we make</p>
                  <ul className="mt-7 space-y-px bg-white/8">
                    {detail.makes.map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-4 bg-ink-950 p-5 text-[0.9375rem] text-bone-200"
                      >
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                        {line}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 border border-white/8 p-6">
                    <p className="eyebrow text-gold-500">Best suited to</p>
                    <p className="mt-4 text-sm leading-relaxed text-bone-200">{detail.forWho}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* message */}
      <section className="border-b border-white/8 bg-ink-900/40 py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">The sales message</p>
            <h2 className="font-display mt-6 max-w-4xl text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.08]">
              Three things have to land at the same time.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px bg-white/8 lg:grid-cols-3">
            {VALUE_PROPS.map((prop, index) => (
              <Reveal key={prop.key} delay={index * 110}>
                <div className="h-full bg-ink-950 p-8">
                  <span className="font-display text-4xl text-gold-400/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-lg leading-snug text-bone-50">{prop.headline}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-mute-500">{prop.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* economics comparison */}
      <section className="border-b border-white/8 py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="eyebrow">Production economics</p>
              <h2 className="font-display mt-6 text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.05]">
                Where the saving actually comes from
              </h2>
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-mute-500">
                Not from cheaper people. From removing the parts of a traditional production or
                agency process that a high-ticket brand with a strong asset library does not need
                to pay for twice.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-12 overflow-x-auto border border-white/10">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-white/4 text-[0.6rem] tracking-[0.24em] text-mute-500 uppercase">
                  <tr>
                    <th className="px-6 py-4 font-normal">Line item</th>
                    <th className="px-6 py-4 font-normal">Traditional route</th>
                    <th className="px-6 py-4 font-normal text-gold-300">Saztik model</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/8">
                  {COMPARISON.map((row) => (
                    <tr key={row.label} className="transition-colors hover:bg-white/3">
                      <td className="px-6 py-5 text-bone-50">{row.label}</td>
                      <td className="px-6 py-5 text-mute-500">{row.traditional}</td>
                      <td className="px-6 py-5 text-gold-300">{row.saztik}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* packages */}
      <section className="border-b border-white/8 bg-ink-900/40 py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Engagement formats</p>
                <h2 className="font-display mt-6 text-[clamp(2rem,4.6vw,3.6rem)] leading-none">
                  Packages &amp; <span className="text-gold-400 italic">ranges</span>
                </h2>
              </div>
              <p className="max-w-sm text-xs leading-relaxed text-mute-500">
                Indicative only. Exact pricing follows an asset review — we quote where we can defend
                the quality.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-px bg-white/8 md:grid-cols-2 xl:grid-cols-3">
            {PACKAGES.map((pack, index) => (
              <Reveal key={pack.id} delay={index * 90}>
                <div className="flex h-full flex-col bg-ink-950 p-8">
                  <span className="eyebrow text-gold-500">{pack.length}</span>
                  <h3 className="font-display mt-5 text-3xl">{pack.name}</h3>
                  <p className="mt-4 text-2xl text-gold-300">{pack.price}</p>
                  <p className="mt-1 text-[0.625rem] tracking-[0.14em] text-mute-500 uppercase">
                    {pack.comparison}
                  </p>
                  <ul className="mt-7 space-y-3 border-t border-white/8 pt-6">
                    {pack.includes.map((line) => (
                      <li key={line} className="flex gap-3 text-[0.8125rem] leading-relaxed text-bone-400">
                        <span className="mt-[0.55rem] h-px w-3 shrink-0 bg-gold-500" />
                        {line}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-7 text-[0.8125rem] text-bone-200 italic">{pack.best}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <ul className="mt-14 grid gap-px bg-white/8 sm:grid-cols-2 lg:grid-cols-3">
              {DELIVERY.map((line) => (
                <li key={line} className="flex items-start gap-4 bg-ink-950 p-6 text-sm text-bone-200">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* faq */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow">Questions</p>
              <h2 className="font-display mt-6 text-[clamp(2rem,4vw,3.2rem)] leading-none">
                Before you <span className="text-gold-400 italic">ask</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <FaqAccordion />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/8 bg-ink-900/50 py-20">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center">
          <h2 className="font-display max-w-2xl text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05]">
            Ready to see your business cut — and your site built — the way it should look?
          </h2>
          <Link
            href="/start-a-project"
            className="group inline-flex shrink-0 items-center gap-3 bg-gold-400 px-8 py-4 text-[0.68rem] tracking-[0.24em] text-ink-950 uppercase transition-all duration-500 hover:bg-gold-300"
          >
            Start a Project
            <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
