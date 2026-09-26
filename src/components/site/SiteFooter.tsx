import Link from "next/link";
import { ArrowIcon, SaztikMark } from "@/components/site/Icons";

const COLUMNS = [
  {
    title: "Studio",
    links: [
      { href: "/work", label: "Selected work" },
      { href: "/services", label: "Services" },
      { href: "/process", label: "The hunt method" },
      { href: "/start-a-project", label: "Start a project" },
    ],
  },
  {
    title: "Disciplines",
    links: [
      { href: "/services#creative", label: "Creative — film & reels" },
      { href: "/services#digital", label: "Digital — sites & experiences" },
      { href: "/services#ai", label: "AI — tools & automation" },
      { href: "/process#packages", label: "Content packages" },
    ],
  },
  {
    title: "Markets",
    links: [
      { href: "/work?vertical=luxury-hospitality", label: "Luxury hospitality" },
      { href: "/work?vertical=luxury-real-estate", label: "Luxury real estate" },
      { href: "/work?vertical=luxury-mobility", label: "Yachts & mobility" },
      { href: "/work?vertical=luxury-products", label: "Jewellery & products" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/8 bg-ink-900">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <SaztikMark className="h-8 w-8 text-gold-400" />
              <span className="text-[0.9rem] font-medium tracking-[0.42em]">SAZTIK</span>
            </div>
            <p className="font-display mt-6 text-3xl leading-tight text-bone-50 sm:text-4xl">
              The Art of <span className="text-gold-400 italic">Connection</span>
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mute-500">
              A digital creative studio for businesses whose product deserves better footage than
              it currently has. Europe &amp; United States.
            </p>
            <Link
              href="/start-a-project"
              className="group mt-8 inline-flex items-center gap-2 border border-gold-400/40 px-6 py-3 text-[0.68rem] tracking-[0.24em] text-gold-300 uppercase transition-all duration-500 hover:bg-gold-400 hover:text-ink-950"
            >
              Start a Project
              <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <p className="eyebrow text-gold-500">{column.title}</p>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-bone-400 transition-colors duration-300 hover:text-bone-50"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/8 pt-8 text-xs text-mute-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Saztik. All rights reserved.</p>
          <p className="tracking-[0.18em] uppercase">
            Creative · Digital · AI &amp; Automation
          </p>
          <a
            href="mailto:info@saztik.com"
            className="transition-colors duration-300 hover:text-gold-300"
          >
            info@saztik.com
          </a>
        </div>
      </div>
    </footer>
  );
}
