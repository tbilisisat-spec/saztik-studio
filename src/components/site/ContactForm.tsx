"use client";

import { useState, type FormEvent } from "react";
import { ArrowIcon, CheckIcon } from "@/components/site/Icons";
import { FORM_SERVICES } from "@/lib/site-content";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const business = String(form.get("business") ?? "").trim();

    const payload = {
      businessName: business || name,
      contactName: name || null,
      email: String(form.get("email") ?? "").trim(),
      website: String(form.get("website") ?? "").trim() || null,
      vertical: "other",
      interest: String(form.get("interest") ?? "") || null,
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
      setStatus("sent");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-gold-400/35 bg-ink-900/70 p-8 sm:p-10">
        <CheckIcon className="h-8 w-8 text-gold-400" />
        <h3 className="font-display mt-6 text-3xl text-bone-50">Message received.</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-bone-400">
          Thank you. We usually reply within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-white/10 bg-ink-900/50 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Business (optional)" name="business" autoComplete="organization" />
        <Field label="Current website (optional)" name="website" placeholder="example.com" />

        <label className="block sm:col-span-2">
          <span className="label">What do you need?</span>
          <select name="interest" className="field mt-2" defaultValue="">
            <option value="">Choose one</option>
            {FORM_SERVICES.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="label">
            Tell us about it <span className="text-gold-400">*</span>
          </span>
          <textarea
            name="message"
            required
            minLength={12}
            rows={5}
            className="field mt-2 resize-none"
            placeholder="A few lines about your business and what you would like built."
          />
        </label>
      </div>

      {error ? (
        <p className="mt-5 border border-ember-500/40 bg-ember-500/10 px-4 py-3 text-sm text-ember-500">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-6 inline-flex w-full items-center justify-center gap-3 bg-gold-400 px-8 py-4 text-sm font-medium text-ink-950 transition-colors duration-300 hover:bg-gold-300 disabled:opacity-50 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send message"}
        <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="label">
        {label}
        {required ? <span className="text-gold-400"> *</span> : null}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="field mt-2"
      />
    </label>
  );
}
