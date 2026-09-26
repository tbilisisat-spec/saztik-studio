"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowIcon, CloseIcon, SaztikMark } from "@/components/site/Icons";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/studio", label: "Studio" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/8 bg-ink-950/85 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 sm:px-8">
          <Link href="/" className="group flex items-center gap-3" aria-label="Saztik — home">
            <SaztikMark className="h-7 w-7 text-gold-400 transition-transform duration-700 group-hover:rotate-180" />
            <span className="flex flex-col leading-none">
              <span className="text-[0.82rem] font-medium tracking-[0.42em] text-bone-50">
                SAZTIK
              </span>
              <span className="mt-1 hidden text-[0.5625rem] tracking-[0.28em] text-mute-500 uppercase sm:block">
                The Art of Connection
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-[0.72rem] tracking-[0.22em] uppercase transition-colors duration-300 ${
                    active ? "text-gold-300" : "text-bone-400 hover:text-bone-50"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-gold-400 transition-all duration-500 ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/start-a-project"
              className="group hidden items-center gap-2 border border-gold-400/40 px-5 py-2.5 text-[0.68rem] tracking-[0.22em] text-gold-300 uppercase transition-all duration-500 hover:border-gold-400 hover:bg-gold-400 hover:text-ink-950 sm:inline-flex"
            >
              Start a Project
              <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center border border-white/10 text-bone-200 transition-colors hover:border-gold-400/50 hover:text-gold-300 md:hidden"
            >
              <span className="flex flex-col gap-[5px]">
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[70] bg-ink-950/97 backdrop-blur-2xl transition-all duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-[72px] items-center justify-between px-5">
          <span className="eyebrow text-gold-400">Menu</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center border border-white/10 text-bone-200"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-5 pt-8">
          {[...NAV, { href: "/start-a-project", label: "Start a Project" }].map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-display border-b border-white/6 py-5 text-[2.1rem] text-bone-50 transition-colors hover:text-gold-300"
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              {item.label}
            </Link>
          ))}
          <p className="mt-10 max-w-xs text-sm leading-relaxed text-mute-500">
            Cinematic content for high-ticket brands across Europe and the United States.
          </p>
        </nav>
      </div>
    </>
  );
}
