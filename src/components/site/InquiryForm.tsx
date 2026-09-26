"use client";

import { useState, type FormEvent } from "react";
import { ArrowIcon, CheckIcon } from "@/components/site/Icons";
import { VERTICALS } from "@/lib/scoring";

const INTERESTS = [
  "Starter Reel (15–30 sec)",
  "Premium Reel (30–60 sec)",
  "Promotional Film (60–90 sec)",
  "Monthly content",
  "Website / landing page",
  "AI tools & automation",
  "Not sure yet — advise me",
];

const BUDGETS = [
  "Under $250",
  "$250 – $500",
  "$500 – $1,000",
  "$1,000 – $2,500",
  "$2,500+ / month",
  "To be scoped",
];

type Status = "idle" | "sending" | "sent" | "error";

export function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = {
      businessName: String(form.get("businessName") ?? "").trim(),
      contactName: String(form.get("contactName") ?? "").trim() || null,
      email: String(form.get("email") ?? "").trim(),
      website: String(form.get("website") ?? "").trim() || null,
      instagram: String(form.get("instagram") ?? "").trim() || null,
      vertical: String(form.get("vertical") ?? "luxury-hospitality"),
      interest: String(form.get("interest") ?? "") || null,
      budget: String(form.get("budget") ?? "") || null,
      message: String(form.get("message") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error ?? "Something went wrong.");
      setReference(data.reference ?? "—");
      setStatus("sent");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-gold-400/35 bg-ink-900/70 p-9 sm:p-12">
        <CheckIcon className="h-9 w-9 text-gold-400" />
        <h3 className="font-display mt-7 text-4xl leading-tight text-bone-50">
          Request received.
        </h3>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-mute-500">
          Reference <span className="text-gold-300">{reference}</span>. We review your website and
          Instagram for the content gap, then reply with a plan — and if you are a fit, a private
          sample made for your business.
        </p>
        <p className="mt-6 text-xs tracking-[0.2em] text-mute-500 uppercase">
          Typical response: within 48 hours
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-white/10 bg-ink-900/50 p-7 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Business name" name="businessName" required placeholder="Villa Serenità" />
        <Field label="Your name" name="contactName" placeholder="Elena Rossi" />
        <Field label="Email" name="email" type="email" required placeholder="you@brand.com" />
        <Field label="Website" name="website" placeholder="brand.com" />
        <Field label="Instagram" name="instagram" placeholder="@yourbrand" />

        <label className="block">
          <span className="eyebrow">Market</span>
          <select name="vertical" className="field mt-3" defaultValue="luxury-hospitality">
            {VERTICALS.map((vertical) => (
              <option key={vertical.key} value={vertical.key}>
                {vertical.label}
              </option>
            ))}
            <option value="other">Something else high-ticket</option>
          </select>
        </label>

        <label className="block">
          <span className="eyebrow">What do you need</span>
          <select name="interest" className="field mt-3" defaultValue="">
            <option value="" disabled>
              Select a format
            </option>
            {INTERESTS.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="eyebrow">Indicative budget</span>
          <select name="budget" className="field mt-3" defaultValue="">
            <option value="" disabled>
              Select a range
            </option>
            {BUDGETS.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="eyebrow">The project</span>
          <textarea
            name="message"
            required
            rows={5}
            className="field mt-3 resize-none"
            placeholder="What are you selling, at what price point, and what content do you already have?"
          />
        </label>
      </div>

      {error ? (
        <p className="mt-6 border border-ember-500/40 bg-ember-500/10 px-4 py-3 text-sm text-ember-500">
          {error}
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
        <p className="max-w-xs text-xs leading-relaxed text-mute-500">
          Your details stay inside the studio pipeline. Private samples are never published without
          permission.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-3 bg-gold-400 px-8 py-4 text-[0.68rem] tracking-[0.24em] text-ink-950 uppercase transition-all duration-500 hover:bg-gold-300 disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Send request"}
          <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="eyebrow">
        {label}
        {required ? <span className="text-gold-400"> *</span> : null}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="field mt-3"
      />
    </label>
  );
}
