"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CloseIcon, ArrowIcon } from "@/components/site/Icons";
import { STAGES, VERTICALS, leadScore, scoreTier } from "@/lib/scoring";
import type { ActivityDTO, LeadWithScore } from "@/lib/studio-types";

type Props = {
  lead: LeadWithScore;
  activities: ActivityDTO[];
  onClose: () => void;
  onSave: (patch: Record<string, unknown>) => Promise<void>;
  onDelete: () => Promise<void>;
  onNote: (kind: string, body: string) => Promise<void>;
};

const CHANNELS = ["", "email", "instagram", "linkedin", "phone"];

export function LeadDetail({ lead, activities, onClose, onSave, onDelete, onNote }: Props) {
  const [draft, setDraft] = useState<Record<string, unknown>>({ ...lead });
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setDraft({ ...lead });
  }, [lead]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const set = (key: string, value: unknown) => setDraft((prev) => ({ ...prev, [key]: value }));

  const liveScore = leadScore({
    priceScore: Number(draft.priceScore ?? 3),
    visualScore: Number(draft.visualScore ?? 3),
    contentGapScore: Number(draft.contentGapScore ?? 3),
  });
  const liveTier = scoreTier(liveScore);
  const dirty = JSON.stringify(draft) !== JSON.stringify(lead);

  async function save() {
    setBusy(true);
    setMessage(null);
    try {
      await onSave(draft);
      setMessage("Saved.");
    } catch {
      setMessage("Could not save — check the connection.");
    } finally {
      setBusy(false);
      setTimeout(() => setMessage(null), 2400);
    }
  }

  async function submitNote(event: FormEvent) {
    event.preventDefault();
    if (!note.trim()) return;
    const text = note.trim();
    setNote("");
    await onNote("note", text);
  }

  const leadActivities = activities.filter((activity) => activity.leadId === lead.id);

  return (
    <div className="fixed inset-0 z-[80] flex justify-end">
      <button
        type="button"
        aria-label="Close panel"
        onClick={onClose}
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
      />
      <aside className="relative flex h-full w-full max-w-2xl flex-col overflow-hidden border-l border-white/10 bg-ink-900">
        <header className="flex items-start justify-between gap-6 border-b border-white/8 px-7 py-6">
          <div>
            <p className="eyebrow text-gold-500">
              {lead.source === "inbound" ? "Inbound request" : lead.source === "referral" ? "Referral" : "Hunted lead"}
            </p>
            <h2 className="font-display mt-3 text-4xl leading-none text-bone-50">
              {String(draft.businessName ?? lead.businessName)}
            </h2>
            <p className="mt-3 text-xs tracking-[0.16em] text-mute-500 uppercase">
              {[draft.city, draft.country].filter(Boolean).join(" · ") || "Location unknown"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/12 text-bone-300 transition-colors hover:border-gold-400 hover:text-gold-300"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-7 py-7">
          {/* score */}
          <section className="border border-white/10 bg-ink-950/60 p-6">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Fit score</p>
                <p className="font-display mt-3 text-5xl leading-none text-gold-300">{liveScore}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-bone-50">{liveTier.label}</p>
                <p className="mt-1 max-w-[16rem] text-xs leading-relaxed text-mute-500">
                  {liveTier.action}
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-5">
              {[
                { key: "priceScore", label: "Price", hint: "How high-ticket is the offer?" },
                { key: "visualScore", label: "Visual appeal", hint: "How strong is the imagery?" },
                { key: "contentGapScore", label: "Content gap", hint: "How weak is the video?" },
              ].map((axis) => (
                <div key={axis.key}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[0.62rem] tracking-[0.2em] text-bone-200 uppercase">
                      {axis.label}
                    </span>
                    <span className="font-display text-lg text-gold-400">
                      {Number(draft[axis.key] ?? 3)}
                    </span>
                  </div>
                  <p className="text-[0.6875rem] text-mute-500">{axis.hint}</p>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={Number(draft[axis.key] ?? 3)}
                    onChange={(event) => set(axis.key, Number(event.target.value))}
                    className="mt-3 h-px w-full cursor-pointer appearance-none bg-white/20 accent-[#d6bb85]"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* stage */}
          <section className="mt-7">
            <p className="eyebrow">Pipeline stage</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {STAGES.map((stage) => (
                <button
                  key={stage.key}
                  type="button"
                  onClick={() => set("stage", stage.key)}
                  title={stage.hint}
                  className={`border px-4 py-2 text-[0.6rem] tracking-[0.18em] uppercase transition-all duration-300 ${
                    draft.stage === stage.key
                      ? "border-gold-400 bg-gold-400/12 text-gold-300"
                      : "border-white/10 text-mute-500 hover:border-white/30 hover:text-bone-200"
                  }`}
                >
                  {stage.label}
                </button>
              ))}
            </div>
          </section>

          {/* details */}
          <section className="mt-8 grid gap-4 sm:grid-cols-2">
            <Text label="Website" value={draft.website} onChange={(v) => set("website", v)} />
            <Text label="Instagram" value={draft.instagram} onChange={(v) => set("instagram", v)} />
            <Text label="Contact" value={draft.contactName} onChange={(v) => set("contactName", v)} />
            <Text label="Email" value={draft.email} onChange={(v) => set("email", v)} />
            <Text label="Ticket value" value={draft.ticketValue} onChange={(v) => set("ticketValue", v)} placeholder="€950 / night" />
            <Text
              label="Deal value (USD)"
              value={draft.dealValue == null ? "" : String(draft.dealValue)}
              onChange={(v) => set("dealValue", v)}
              placeholder="900"
            />
            <Text label="Sample URL" value={draft.sampleUrl} onChange={(v) => set("sampleUrl", v)} placeholder="Private preview link" />
            <label className="block">
              <span className="eyebrow">Outreach channel</span>
              <select
                value={String(draft.outreachChannel ?? "")}
                onChange={(event) => set("outreachChannel", event.target.value)}
                className="field mt-3"
              >
                {CHANNELS.map((channel) => (
                  <option key={channel || "none"} value={channel}>
                    {channel ? channel : "Not contacted"}
                  </option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="eyebrow">Market</span>
              <select
                value={String(draft.vertical ?? "")}
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
              <span className="eyebrow">Analysis notes</span>
              <textarea
                rows={4}
                value={String(draft.notes ?? "")}
                onChange={(event) => set("notes", event.target.value)}
                className="field mt-3 resize-none"
                placeholder="Content gap, decision maker, what the sample should show…"
              />
            </label>
          </section>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={save}
              disabled={busy || !dirty}
              className="group inline-flex items-center gap-3 bg-gold-400 px-6 py-3 text-[0.65rem] tracking-[0.22em] text-ink-950 uppercase transition-all duration-400 hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-35"
            >
              {busy ? "Saving…" : "Save changes"}
              <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-400 group-hover:translate-x-1" />
            </button>
            {dirty ? <span className="text-xs text-gold-400">Unsaved changes</span> : null}
            {message ? <span className="text-xs text-bone-400">{message}</span> : null}
            <button
              type="button"
              onClick={onDelete}
              className="ml-auto text-[0.65rem] tracking-[0.2em] text-mute-500 uppercase transition-colors hover:text-ember-500"
            >
              Delete lead
            </button>
          </div>

          {/* timeline */}
          <section className="mt-12 border-t border-white/8 pt-8">
            <p className="eyebrow">Timeline</p>
            <form onSubmit={submitNote} className="mt-5 flex gap-3">
              <input
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Log an outreach, a decision, an asset link…"
                className="field"
              />
              <button
                type="submit"
                className="shrink-0 border border-gold-400/40 px-5 text-[0.62rem] tracking-[0.2em] text-gold-300 uppercase transition-colors hover:bg-gold-400 hover:text-ink-950"
              >
                Log
              </button>
            </form>

            <ol className="mt-7 space-y-4">
              {leadActivities.length === 0 ? (
                <li className="text-sm text-mute-500">Nothing logged yet.</li>
              ) : (
                leadActivities.map((activity) => (
                  <li key={activity.id} className="flex gap-4 border-b border-white/6 pb-4">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                    <div>
                      <p className="text-sm leading-relaxed text-bone-200">{activity.body}</p>
                      <p className="mt-1 text-[0.6rem] tracking-[0.18em] text-mute-500 uppercase">
                        {activity.kind} · {new Date(activity.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))
              )}
            </ol>
          </section>

          {lead.message ? (
            <section className="mt-10 border border-white/10 bg-ink-950/50 p-6">
              <p className="eyebrow">Original message</p>
              <p className="mt-4 text-sm leading-relaxed whitespace-pre-wrap text-bone-200">
                {lead.message}
              </p>
            </section>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

function Text({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: unknown;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        value={value == null ? "" : String(value)}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="field mt-3"
      />
    </label>
  );
}
