"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowIcon, CloseIcon, SaztikMark } from "@/components/site/Icons";

const NAV = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#contact", label: "Contact" },
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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/8 bg-ink-950/85 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Saztik home">
            <SaztikMark className="h-7 w-7 text-gold-400" />
            <span className="text-[0.95rem] font-medium tracking-[0.32em] text-bone-50">
              SAZTIK
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-bone-200 transition-colors duration-300 hover:text-gold-300"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 border border-gold-400/50 px-5 py-2.5 text-sm text-gold-300 transition-colors duration-300 hover:bg-gold-400 hover:text-ink-950"
            >
              Get in touch
              <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center border border-white/15 text-bone-200 transition-colors hover:border-gold-400/50 hover:text-gold-300 md:hidden"
          >
            <span className="flex flex-col gap-[5px]">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </span>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[70] bg-ink-950/97 backdrop-blur-2xl transition-opacity duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-[68px] items-center justify-between px-5">
          <span className="label text-gold-400">Menu</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center border border-white/15 text-bone-200"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex flex-col px-5 pt-6">
          {[...NAV, { href: "/#contact", label: "Start a project" }].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-display border-b border-white/8 py-5 text-4xl text-bone-50 transition-colors hover:text-gold-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
