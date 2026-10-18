import Link from "next/link";
import { SaztikMark } from "@/components/site/Icons";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/contact";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 bg-ink-900">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <SaztikMark className="h-7 w-7 text-gold-400" />
          <div>
            <p className="text-[0.9rem] font-medium tracking-[0.32em] text-bone-50">SAZTIK</p>
            <p className="mt-1 text-xs text-mute-500">Websites, apps and digital platforms.</p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-bone-400">
          <Link href="/#services" className="transition-colors hover:text-bone-50">
            Services
          </Link>
          <Link href="/#work" className="transition-colors hover:text-bone-50">
            Work
          </Link>
          <Link href="/#contact" className="transition-colors hover:text-bone-50">
            Contact
          </Link>
          <a href={CONTACT_MAILTO} className="transition-colors hover:text-gold-300">
            {CONTACT_EMAIL}
          </a>
        </nav>
      </div>
      <div className="border-t border-white/8 py-5 text-center text-xs text-mute-500">
        © {year} Saztik
      </div>
    </footer>
  );
}
