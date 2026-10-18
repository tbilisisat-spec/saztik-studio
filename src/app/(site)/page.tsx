import Link from "next/link";
import { ContactForm } from "@/components/site/ContactForm";
import { PortfolioCard } from "@/components/site/PortfolioCard";
import { Reveal } from "@/components/site/Reveal";
import { ArrowIcon, FilmIcon, GlobeIcon, GridIcon, LayersIcon, MailIcon, PhoneIcon } from "@/components/site/Icons";
import { PORTFOLIO } from "@/lib/portfolio";
import { CONTACT_EMAIL, SERVICES, STEPS } from "@/lib/site-content";

const ICONS = {
  globe: GlobeIcon,
  layers: LayersIcon,
  phone: PhoneIcon,
  grid: GridIcon,
  film: FilmIcon,
} as const;

export default function HomePage() {
  const labelFor = (id: string) => SERVICES.find((service) => service.id === id)?.title ?? "";

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-gold-400/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-[1200px] px-5 pt-36 pb-20 sm:px-8 sm:pt-48 sm:pb-28">
          <Reveal>
            <p className="label text-gold-400">Web &amp; app design studio</p>
            <h1 className="font-display mt-6 max-w-4xl text-[clamp(2.8rem,8vw,6rem)] leading-[0.98] text-bone-50">
              Websites, apps and digital platforms for{" "}
              <span className="text-gold-400 italic">your business.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-bone-200">
              Saztik is a small design studio. We design and build the digital side of your
              business, with a simple process, clear pricing and direct contact with the person
              doing the work.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-3 bg-gold-400 px-7 py-4 text-sm font-medium text-ink-950 transition-colors duration-300 hover:bg-gold-300"
              >
                Get in touch
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/#services"
                className="inline-flex items-center gap-3 border border-white/20 px-7 py-4 text-sm text-bone-50 transition-colors duration-300 hover:border-gold-400 hover:text-gold-300"
              >
                What we do
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-20 border-t border-white/8 py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <Reveal>
            <p className="label">What we do</p>
            <h2 className="font-display mt-4 max-w-2xl text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05]">
              Everything you need to be <span className="text-gold-400 italic">online.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, index) => {
              const Icon = ICONS[service.icon];
              return (
                <Reveal key={service.id} delay={index * 60}>
                  <div className="h-full bg-ink-950 p-7 transition-colors duration-300 hover:bg-ink-900 sm:p-8">
                    <Icon className="h-8 w-8 text-gold-400" />
                    <h3 className="mt-6 text-xl text-bone-50">{service.title}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-bone-400">
                      {service.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
            <Reveal delay={SERVICES.length * 60}>
              <Link
                href="/#contact"
                className="group flex h-full flex-col justify-between bg-ink-900 p-7 transition-colors duration-300 hover:bg-ink-800 sm:p-8"
              >
                <p className="text-xl text-bone-50">Something else in mind?</p>
                <span className="mt-8 inline-flex items-center gap-3 text-sm text-gold-300">
                  Tell us about it
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="scroll-mt-20 border-t border-white/8 bg-ink-900/50 py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <Reveal>
            <p className="label">Our work</p>
            <h2 className="font-display mt-4 max-w-2xl text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05]">
              Things we have <span className="text-gold-400 italic">built.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {PORTFOLIO.map((item, index) => (
              <Reveal key={item.href} delay={index * 80}>
                <PortfolioCard item={item} serviceLabel={labelFor(item.service)} />
              </Reveal>
            ))}
            <Reveal delay={PORTFOLIO.length * 80}>
              <Link
                href="/#contact"
                className="group flex h-full min-h-[220px] flex-col items-start justify-between border border-dashed border-white/20 p-7 transition-colors duration-300 hover:border-gold-400/50 sm:p-8"
              >
                <p className="label text-gold-500">Next project</p>
                <div>
                  <p className="font-display text-3xl text-bone-50">Yours could be here.</p>
                  <span className="mt-5 inline-flex items-center gap-3 text-sm text-gold-300">
                    Start a project
                    <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-white/8 py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <Reveal>
            <p className="label">How it works</p>
            <h2 className="font-display mt-4 max-w-2xl text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05]">
              Three simple <span className="text-gold-400 italic">steps.</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <Reveal key={step.title} delay={index * 80}>
                <div>
                  <span className="font-display text-5xl text-gold-400/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-lg text-bone-50">{step.title}</h3>
                  <p className="mt-2 max-w-xs text-[0.9375rem] leading-relaxed text-bone-400">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-20 border-t border-white/8 bg-ink-900/50 py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div>
              <p className="label">Contact</p>
              <h2 className="font-display mt-4 text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05]">
                Let&apos;s talk about <span className="text-gold-400 italic">your project.</span>
              </h2>
              <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-bone-400">
                Send a message and ask for advice. There is no obligation.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-8 inline-flex items-center gap-3 text-base text-bone-50 transition-colors hover:text-gold-300"
              >
                <MailIcon className="h-5 w-5 text-gold-400" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
