import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/site/Reveal";
import { CinematicVideo } from "@/components/site/CinematicVideo";
import { ArrowIcon } from "@/components/site/Icons";
import { getWorkItem, getWorkItems } from "@/db/work";
import { verticalLabel } from "@/lib/scoring";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getWorkItem(slug);
  if (!item) return { title: "Project not found" };
  return {
    title: `${item.title} — ${item.client}`,
    description: item.summary ?? `${item.title} by Saztik`,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const item = await getWorkItem(slug);
  if (!item) notFound();

  const all = await getWorkItems();
  const index = all.findIndex((entry) => entry.slug === slug);
  const next = all[(index + 1) % all.length];

  const meta = [
    { label: "Client", value: item.client },
    { label: "Market", value: verticalLabel(item.vertical) },
    { label: "Discipline", value: item.discipline === "ai" ? "AI & Automation" : item.discipline },
    { label: "Deliverable", value: item.deliverable },
    { label: "Location", value: item.location ?? "—" },
    { label: "Year", value: item.year ? String(item.year) : "—" },
    { label: "Runtime", value: item.duration ?? "—" },
  ];

  return (
    <>
      <section className="relative flex min-h-[86svh] items-end overflow-hidden border-b border-white/8">
        {item.videoUrl ? (
          <CinematicVideo
            src={item.videoUrl}
            poster={item.posterUrl ?? item.coverUrl}
            overlayClassName="bg-gradient-to-t from-ink-950 via-ink-950/35 to-ink-950/60"
          />
        ) : (
          <img src={item.coverUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
        )}
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pt-40 pb-14 sm:px-8">
          <Reveal>
            <p className="eyebrow text-gold-400">{verticalLabel(item.vertical)}</p>
            <h1 className="font-display mt-6 text-[clamp(3rem,9vw,7.5rem)] leading-[0.88]">
              {item.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-bone-200">
              {item.deliverable}
              {item.location ? ` · ${item.location}` : ""}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr]">
          <Reveal>
            <div>
              <p className="eyebrow">The brief</p>
              <p className="font-display mt-7 text-[clamp(1.5rem,2.6vw,2.2rem)] leading-[1.25] text-bone-50">
                {item.summary}
              </p>
              {item.result ? (
                <div className="mt-10 border-l border-gold-400/60 pl-6">
                  <p className="eyebrow text-gold-500">Outcome</p>
                  <p className="mt-4 text-base leading-relaxed text-bone-200">{item.result}</p>
                </div>
              ) : null}
              {item.tags ? (
                <div className="mt-10 flex flex-wrap gap-2">
                  {item.tags.split(",").map((tag) => (
                    <span
                      key={tag}
                      className="border border-white/12 px-4 py-2 text-[0.625rem] tracking-[0.2em] text-bone-400 uppercase"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <dl className="divide-y divide-white/8 border-y border-white/8">
              {meta.map((entry) => (
                <div key={entry.label} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="text-[0.625rem] tracking-[0.22em] text-mute-500 uppercase">
                    {entry.label}
                  </dt>
                  <dd className="text-right text-sm text-bone-200 capitalize">{entry.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {next ? (
        <section className="border-t border-white/8 bg-ink-900/50">
          <Link href={`/work/${next.slug}`} className="group block px-5 py-20 sm:px-8">
            <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
              <div>
                <p className="eyebrow text-gold-500">Next project</p>
                <p className="font-display mt-5 text-[clamp(2.4rem,6vw,5rem)] leading-none text-bone-50 transition-colors duration-500 group-hover:text-gold-300">
                  {next.title}
                </p>
              </div>
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 transition-all duration-500 group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-ink-950">
                <ArrowIcon className="h-6 w-6" />
              </span>
            </div>
          </Link>
        </section>
      ) : null}
    </>
  );
}
