"use client";

import { useState, type FormEvent } from "react";
import { CloseIcon } from "@/components/site/Icons";
import { STAGES, VERTICALS, leadScore, scoreTier } from "@/lib/scoring";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (payload: Record<string, unknown>) => Promise<void>;
};

const EMPTY = {
  businessName: "",
  vertical: "luxury-hospitality",
  city: "",
  country: "",
  website: "",
  instagram: "",
  ticketValue: "",
  email: "",
  stage: "hunt",
  priceScore: 4,
  visualScore: 4,
  contentGapScore: 4,
  notes: "",
};

export function NewLeadDialog({ open, onClose, onCreate }: Props) {
  const [form, setForm] = useState<Record<string, string | number>>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const set = (key: string, value: string | number) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const score = leadScore({
    priceScore: Number(form.priceScore),
    visualScore: Number(form.visualScore),
    contentGapScore: Number(form.contentGapScore),
  });
  const tier = scoreTier(score);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!String(form.businessName).trim()) {
      setError("Business name is required.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await onCreate(form);
      setForm(EMPTY);
      onClose();
    } catch {
      setError("Could not save the lead.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[85] flex items-start justify-center overflow-y-auto p-4 sm:p-8">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="fixed inset-0 bg-ink-950/85 backdrop-blur-sm"
      />
      <form
        onSubmit={submit}
        className="relative w-full max-w-3xl border border-white/12 bg-ink-900 shadow-lift"
      >
        <header className="flex items-center justify-between border-b border-white/8 px-7 py-5">
          <div>
            <p className="eyebrow text-gold-500">01 · Hunt</p>
            <h2 className="font-display mt-2 text-3xl">Add a hunted business</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center border border-white/12 text-bone-300 transition-colors hover:border-gold-400 hover:text-gold-300"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </header>

        <div className="grid gap-4 px-7 py-7 sm:grid-cols-2">
          <Input label="Business name *" value={form.businessName} onChange={(v) => set("businessName", v)} />
          <Input label="Ticket value" value={form.ticketValue} onChange={(v) => set("ticketValue", v)} placeholder="€950 / night" />
          <Input label="City" value={form.city} onChange={(v) => set("city", v)} />
          <Input label="Country" value={form.country} onChange={(v) => set("country", v)} />
          <Input label="Website" value={form.website} onChange={(v) => set("website", v)} />
          <Input label="Instagram" value={form.instagram} onChange={(v) => set("instagram", v)} />
          <Input label="Contact email" value={form.email} onChange={(v) => set("email", v)} />

          <label className="block">
            <span className="eyebrow">Market</span>
            <select
              value={String(form.vertical)}
              onChange={(event) => set("vertical", event.target.value)}
              className="field mt-3"
            >
              {VERTICALS.map((vertical) => (
                <option key={vertical.key} value={vertical.key}>
                  {vertical.label}
                </option>
              ))}
              <option value="other">Other</option>
            </select>
          </label>

          <label className="block sm:col-span-2">
            <span className="eyebrow">Stage</span>
            <select
              value={String(form.stage)}
              onChange={(event) => set("stage", event.target.value)}
              className="field mt-3"
            >
              {STAGES.map((stage) => (
                <option key={stage.key} value={stage.key}>
                  {stage.label} — {stage.hint}
                </option>
              ))}
            </select>
          </label>

          {[
            { key: "priceScore", label: "Price" },
            { key: "visualScore", label: "Visual appeal" },
            { key: "contentGapScore", label: "Content gap" },
          ].map((axis) => (
            <label key={axis.key} className="block sm:col-span-2 sm:flex sm:items-center sm:gap-6">
              <span className="eyebrow sm:w-40">
                {axis.label} · {Number(form[axis.key])}
              </span>
              <input
                type="range"
                min={1}
                max={5}
                step={1}
                value={Number(form[axis.key])}
                onChange={(event) => set(axis.key, Number(event.target.value))}
                className="mt-3 h-px w-full cursor-pointer appearance-none bg-white/20 accent-[#d6bb85] sm:mt-0"
              />
            </label>
          ))}

          <label className="block sm:col-span-2">
            <span className="eyebrow">Notes</span>
            <textarea
              rows={3}
              value={String(form.notes)}
              onChange={(event) => set("notes", event.target.value)}
              className="field mt-3 resize-none"
              placeholder="Why is this a fit? What did you see on their Instagram?"
            />
          </label>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-5 border-t border-white/8 px-7 py-5">
          <div>
            <p className="font-display text-3xl text-gold-300">
              {score} <span className="text-base text-mute-500">/ 100</span>
            </p>
            <p className="text-[0.62rem] tracking-[0.2em] text-mute-500 uppercase">{tier.label}</p>
          </div>
          <div className="flex items-center gap-4">
            {error ? <span className="text-xs text-ember-500">{error}</span> : null}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 text-[0.65rem] tracking-[0.2em] text-mute-500 uppercase transition-colors hover:text-bone-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy}
              className="bg-gold-400 px-7 py-3 text-[0.65rem] tracking-[0.22em] text-ink-950 uppercase transition-colors hover:bg-gold-300 disabled:opacity-50"
            >
              {busy ? "Saving…" : "Add to pipeline"}
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        value={String(value)}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="field mt-3"
      />
    </label>
  );
}
