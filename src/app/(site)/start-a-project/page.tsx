import type { Metadata } from "next";
import { InquiryForm } from "@/components/site/InquiryForm";
import { Reveal } from "@/components/site/Reveal";
import { CinematicVideo } from "@/components/site/CinematicVideo";
import { CheckIcon, GlobeIcon, MailIcon } from "@/components/site/Icons";
import { HERO_MEDIA } from "@/lib/seed-data";
import { DELIVERY } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell Saztik what you sell. We review your video and your website for the content gap and reply with a plan — and, if you're a fit, a private sample made for your business.",
};

const NEXT_STEPS = [
  {
    step: "01",
    title: "We review your assets",
    body: "Website, Instagram, photo library and existing video. We look for the gap between your price point and your content — on film, on the site, or both.",
  },
  {
    step: "02",
    title: "You get a plan, not a pitch",
    body: "A short written response: what we would make — a film, a site, or both — from which assets, in what timeframe, and at what range.",
  },
  {
    step: "03",
    title: "The private sample",
    body: "If you are a fit, we build a short cinematic piece or a redesigned page — whichever matches your gap — watermarked or clearly marked, delivered privately.",
  },
  {
    step: "04",
    title: "Delivery & retention",
    body: "Approve the sample and it becomes a paid project, then a package, then a monthly content or site-support rhythm.",
  },
];

export default function StartProjectPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/8 pt-36 pb-16 sm:pt-44">
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <CinematicVideo
            src={HERO_MEDIA.video}
            poster={HERO_MEDIA.poster}
            overlayClassName="bg-ink-950/50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/70 to-ink-950" />
        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-gold-400">Start a project</p>
            <h1 className="font-display mt-8 max-w-5xl text-[clamp(2.6rem,7.5vw,6rem)] leading-[0.92]">
              You already have the assets.
              <br />
              <span className="text-gold-400 italic">We turn them into content — and a site that works.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-[0.9375rem] leading-relaxed text-bone-200">
              Send your website and Instagram. We assess the content and digital gap and reply with a
              concrete plan — no discovery calls, no decks.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.25fr_0.75fr]">
        <Reveal>
          <InquiryForm />
        </Reveal>

        <Reveal delay={140}>
          <div className="space-y-6">
            <div className="border border-white/10 bg-ink-900/50 p-7">
              <p className="eyebrow text-gold-500">Direct</p>
              <a
                href="mailto:info@saztik.com"
                className="mt-5 flex items-center gap-3 text-base text-bone-50 transition-colors hover:text-gold-300"
              >
                <MailIcon className="h-5 w-5 text-gold-400" />
                info@saztik.com
              </a>
              <p className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-mute-500">
                <GlobeIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
                Working with clients across Europe and the United States. Remote-first, delivery in
                English.
              </p>
            </div>

            <div className="border border-white/10 bg-ink-900/50 p-7">
              <p className="eyebrow text-gold-500">Best fit</p>
              <ul className="mt-5 space-y-3 text-sm text-bone-200">
                {[
                  "High-ticket product or service",
                  "Strong photography already in place",
                  "Weak, old or missing video — or a slow, dated or missing website",
                  "A real brand and online presence",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-white/10 bg-ink-900/50 p-7">
              <p className="eyebrow text-gold-500">Every delivery</p>
              <ul className="mt-5 space-y-3 text-xs leading-relaxed text-mute-500">
                {DELIVERY.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-white/8 bg-ink-900/40 py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">What happens next</p>
            <h2 className="font-display mt-6 max-w-3xl text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05]">
              Four steps from request to <span className="text-gold-400 italic">retained client</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px bg-white/8 sm:grid-cols-2 xl:grid-cols-4">
            {NEXT_STEPS.map((item, index) => (
              <Reveal key={item.step} delay={index * 90}>
                <div className="h-full bg-ink-950 p-8">
                  <span className="font-display text-4xl text-gold-400/70">{item.step}</span>
                  <h3 className="mt-6 text-lg text-bone-50">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mute-500">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
