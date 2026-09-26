"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { LeadDetail } from "@/components/studio/LeadDetail";
import { NewLeadDialog } from "@/components/studio/NewLeadDialog";
import { ArrowIcon, SaztikMark, TargetIcon } from "@/components/site/Icons";
import { STAGES, verticalLabel } from "@/lib/scoring";
import type { LeadWithScore, StudioPayload } from "@/lib/studio-types";

type View = "pipeline" | "table" | "inbox";

const money = (value: number) =>
  value >= 1000 ? `$${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k` : `$${value}`;

export function StudioApp() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authBusy, setAuthBusy] = useState(false);

  const [data, setData] = useState<StudioPayload | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [view, setView] = useState<View>("pipeline");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const response = await fetch("/api/studio/leads", { cache: "no-store" });
      const json = await response.json();
      if (!response.ok) throw new Error(json?.error ?? "Could not load the pipeline.");
      setData(json as StudioPayload);
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Could not load the pipeline.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const response = await fetch("/api/studio/auth", { cache: "no-store" });
        const json = (await response.json()) as { authed?: boolean };
        if (!active) return;
        setAuthed(Boolean(json.authed));
        if (json.authed) await load();
      } catch {
        if (active) setAuthed(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [load]);

  async function login(event: FormEvent) {
    event.preventDefault();
    setAuthBusy(true);
    setAuthError(null);
    try {
      const response = await fetch("/api/studio/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json?.error ?? "Login failed.");
      setAuthed(true);
      setPasscode("");
      await load();
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setAuthBusy(false);
    }
  }

  async function logout() {
    await fetch("/api/studio/auth", { method: "DELETE" });
    setAuthed(false);
    setData(null);
    setSelectedId(null);
  }

  async function createLead(payload: Record<string, unknown>) {
    const response = await fetch("/api/studio/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        dealValue: payload.dealValue ? Number(payload.dealValue) : null,
        source: "hunt",
      }),
    });
    if (!response.ok) throw new Error("create failed");
    await load();
  }

  async function patchLead(id: string, patch: Record<string, unknown>) {
    const response = await fetch(`/api/studio/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (!response.ok) throw new Error("patch failed");
    await load();
  }

  async function removeLead(id: string) {
    if (!window.confirm("Remove this lead from the pipeline?")) return;
    await fetch(`/api/studio/leads/${id}`, { method: "DELETE" });
    setSelectedId(null);
    await load();
  }

  async function addNote(id: string, kind: string, body: string) {
    const response = await fetch(`/api/studio/leads/${id}/activities`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, body }),
    });
    if (!response.ok) throw new Error("note failed");
    await load();
  }

  async function moveStage(lead: LeadWithScore, stage: string) {
    await patchLead(lead.id, { stage });
  }

  const leads = data?.leads ?? [];
  const activities = data?.activities ?? [];
  const inquiries = data?.inquiries ?? [];
  const metrics = data?.metrics;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((lead) =>
      [lead.businessName, lead.country, lead.city, lead.vertical, lead.notes, lead.email]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(q)),
    );
  }, [leads, query]);

  const selected = selectedId ? leads.find((lead) => lead.id === selectedId) : undefined;

  if (authed === null) {
    return <FullPage label="Checking studio access…" />;
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5">
        <form
          onSubmit={login}
          className="w-full max-w-md border border-white/10 bg-ink-900/70 p-9 backdrop-blur"
        >
          <div className="flex items-center gap-3">
            <SaztikMark className="h-8 w-8 text-gold-400" />
            <span className="text-[0.78rem] font-medium tracking-[0.42em]">SAZTIK</span>
          </div>
          <h1 className="font-display mt-8 text-4xl leading-none">
            Studio <span className="text-gold-400 italic">access</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-mute-500">
            Internal hunt pipeline. Leads, scoring, samples and outreach live here — never on the
            public site.
          </p>
          <label className="mt-8 block">
            <span className="eyebrow">Passcode</span>
            <input
              type="password"
              value={passcode}
              onChange={(event) => setPasscode(event.target.value)}
              className="field mt-3"
              placeholder="••••••"
              autoFocus
            />
          </label>
          {authError ? (
            <p className="mt-4 border border-ember-500/40 bg-ember-500/10 px-4 py-3 text-sm text-ember-500">
              {authError}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={authBusy}
            className="group mt-7 inline-flex w-full items-center justify-center gap-3 bg-gold-400 px-6 py-4 text-[0.68rem] tracking-[0.24em] text-ink-950 uppercase transition-colors hover:bg-gold-300 disabled:opacity-50"
          >
            {authBusy ? "Unlocking…" : "Enter studio"}
            <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </button>
          <p className="mt-6 text-[0.6875rem] leading-relaxed text-mute-500">
            Default passcode <span className="text-gold-400">saztik</span> — override with the{" "}
            <code className="text-bone-300">STUDIO_PASSCODE</code> environment variable.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block text-[0.62rem] tracking-[0.22em] text-mute-500 uppercase transition-colors hover:text-gold-300"
          >
            ← Back to saztik.com
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-950">
      {/* top bar */}
      <header className="sticky top-0 z-40 border-b border-white/8 bg-ink-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <SaztikMark className="h-6 w-6 text-gold-400" />
            <span className="text-[0.7rem] font-medium tracking-[0.36em]">STUDIO</span>
          </Link>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            {(["pipeline", "table", "inbox"] as View[]).map((entry) => (
              <button
                key={entry}
                type="button"
                onClick={() => setView(entry)}
                className={`border px-4 py-2 text-[0.6rem] tracking-[0.2em] uppercase transition-all duration-300 ${
                  view === entry
                    ? "border-gold-400 bg-gold-400/10 text-gold-300"
                    : "border-white/10 text-mute-500 hover:border-white/30 hover:text-bone-200"
                }`}
              >
                {entry}
                {entry === "inbox" && inquiries.length ? ` (${inquiries.length})` : ""}
              </button>
            ))}
          </div>

          <div className="flex w-full items-center gap-3 sm:w-auto">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search leads…"
              className="field py-2 text-sm sm:w-56"
            />
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="shrink-0 bg-gold-400 px-5 py-2.5 text-[0.6rem] tracking-[0.2em] text-ink-950 uppercase transition-colors hover:bg-gold-300"
            >
              + New hunt
            </button>
            <button
              type="button"
              onClick={logout}
              className="shrink-0 border border-white/10 px-4 py-2.5 text-[0.6rem] tracking-[0.2em] text-mute-500 uppercase transition-colors hover:border-ember-500/50 hover:text-ember-500"
            >
              Exit
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8">
        {loadError ? (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border border-ember-500/40 bg-ember-500/8 px-6 py-4">
            <p className="text-sm text-ember-500">{loadError}</p>
            <button
              type="button"
              onClick={load}
              className="border border-ember-500/40 px-4 py-2 text-[0.6rem] tracking-[0.2em] text-ember-500 uppercase"
            >
              Retry
            </button>
          </div>
        ) : null}

        {/* metrics */}
        {metrics ? (
          <section className="grid gap-px bg-white/8 sm:grid-cols-2 lg:grid-cols-5">
            <Metric label="Leads tracked" value={String(metrics.total)} />
            <Metric label="Priority hunts" value={String(metrics.priority)} hint="fit ≥ 70" accent />
            <Metric label="Pipeline value" value={money(metrics.pipelineValue)} />
            <Metric label="Won value" value={money(metrics.wonValue)} />
            <Metric label="Average fit" value={`${metrics.average}`} hint="/ 100" />
          </section>
        ) : null}

        {loading && !data ? <FullPage label="Loading pipeline…" inline /> : null}

        {data && view === "pipeline" ? (
          <section className="mt-10">
            <BoardHeader
              title="Hunt pipeline"
              hint="Drag-free board — open a card to move it through HUNT → CONVERT."
            />
            <div className="mt-6 flex gap-4 overflow-x-auto pb-6">
              {STAGES.map((stage) => {
                const columnLeads = filtered.filter((lead) => lead.stage === stage.key);
                return (
                  <div
                    key={stage.key}
                    className="flex w-[290px] shrink-0 flex-col border border-white/8 bg-ink-900/40"
                  >
                    <div className="border-b border-white/8 px-5 py-4">
                      <div className="flex items-center justify-between">
                        <p className="text-[0.62rem] tracking-[0.2em] text-bone-200 uppercase">
                          {stage.label}
                        </p>
                        <span className="font-display text-lg text-gold-400">
                          {String(columnLeads.length).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="mt-2 text-[0.6875rem] leading-relaxed text-mute-500">
                        {stage.hint}
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 p-3">
                      {columnLeads.length === 0 ? (
                        <p className="px-2 py-6 text-center text-xs text-mute-500/70">Empty</p>
                      ) : (
                        columnLeads.map((lead) => (
                          <LeadCard
                            key={lead.id}
                            lead={lead}
                            onOpen={() => setSelectedId(lead.id)}
                            onAdvance={() => {
                              const index = STAGES.findIndex((entry) => entry.key === lead.stage);
                              const next = STAGES[index + 1];
                              if (next) void moveStage(lead, next.key);
                            }}
                          />
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        {data && view === "table" ? (
          <section className="mt-10">
            <BoardHeader title="All leads" hint="Every hunted and inbound business, newest first." />
            <div className="mt-6 overflow-x-auto border border-white/8">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-white/4 text-[0.58rem] tracking-[0.22em] text-mute-500 uppercase">
                  <tr>
                    <th className="px-5 py-4 font-normal">Business</th>
                    <th className="px-5 py-4 font-normal">Market</th>
                    <th className="px-5 py-4 font-normal">Stage</th>
                    <th className="px-5 py-4 font-normal">P / V / G</th>
                    <th className="px-5 py-4 font-normal">Fit</th>
                    <th className="px-5 py-4 font-normal">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/6">
                  {filtered.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedId(lead.id)}
                      className="cursor-pointer transition-colors hover:bg-white/4"
                    >
                      <td className="px-5 py-4">
                        <p className="text-bone-50">{lead.businessName}</p>
                        <p className="mt-1 text-xs text-mute-500">
                          {[lead.city, lead.country].filter(Boolean).join(", ") || "—"}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-bone-400">{verticalLabel(lead.vertical)}</td>
                      <td className="px-5 py-4 text-[0.62rem] tracking-[0.16em] text-gold-300 uppercase">
                        {STAGES.find((stage) => stage.key === lead.stage)?.label ?? lead.stage}
                      </td>
                      <td className="px-5 py-4 font-display text-bone-300">
                        {lead.priceScore} / {lead.visualScore} / {lead.contentGapScore}
                      </td>
                      <td className="px-5 py-4">
                        <span className="border border-gold-400/30 bg-gold-400/8 px-2.5 py-1 text-xs text-gold-300">
                          {lead.score}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-bone-300">
                        {lead.dealValue ? money(lead.dealValue) : "—"}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-10 text-center text-sm text-mute-500">
                        No leads match “{query}”.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {data && view === "inbox" ? (
          <section className="mt-10">
            <BoardHeader
              title="Inbound requests"
              hint="Submissions from saztik.com — each one already created a lead in FILTER."
            />
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {inquiries.length === 0 ? (
                <p className="border border-white/8 px-6 py-14 text-center text-sm text-mute-500 lg:col-span-2">
                  No inbound requests yet. Share the Start a Project page — the form writes straight
                  into this inbox.
                </p>
              ) : (
                inquiries.map((inquiry) => (
                  <article key={inquiry.id} className="border border-white/8 bg-ink-900/50 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-2xl text-bone-50">{inquiry.businessName}</h3>
                        <p className="mt-1 text-xs tracking-[0.16em] text-mute-500 uppercase">
                          {verticalLabel(inquiry.vertical)} · {new Date(inquiry.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="border border-gold-400/30 px-3 py-1 text-[0.58rem] tracking-[0.18em] text-gold-300 uppercase">
                        {inquiry.status}
                      </span>
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-bone-200">{inquiry.message}</p>
                    <dl className="mt-5 grid gap-2 border-t border-white/8 pt-4 text-xs text-mute-500 sm:grid-cols-2">
                      <div>
                        <dt className="tracking-[0.18em] uppercase">Contact</dt>
                        <dd className="mt-1 text-bone-300">
                          {inquiry.contactName ?? "—"} · {inquiry.email}
                        </dd>
                      </div>
                      <div>
                        <dt className="tracking-[0.18em] uppercase">Need / budget</dt>
                        <dd className="mt-1 text-bone-300">
                          {inquiry.interest ?? "—"} · {inquiry.budget ?? "not stated"}
                        </dd>
                      </div>
                      <div>
                        <dt className="tracking-[0.18em] uppercase">Website</dt>
                        <dd className="mt-1 text-bone-300">{inquiry.website ?? "—"}</dd>
                      </div>
                      <div>
                        <dt className="tracking-[0.18em] uppercase">Instagram</dt>
                        <dd className="mt-1 text-bone-300">{inquiry.instagram ?? "—"}</dd>
                      </div>
                    </dl>
                    {inquiry.leadId ? (
                      <button
                        type="button"
                        onClick={() => setSelectedId(inquiry.leadId ?? null)}
                        className="group mt-5 inline-flex items-center gap-2 text-[0.62rem] tracking-[0.2em] text-gold-300 uppercase"
                      >
                        Open pipeline lead
                        <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    ) : null}
                  </article>
                ))
              )}
            </div>
          </section>
        ) : null}
      </main>

      {selected ? (
        <LeadDetail
          lead={selected}
          activities={activities}
          onClose={() => setSelectedId(null)}
          onSave={(patch) => patchLead(selected.id, patch)}
          onDelete={() => removeLead(selected.id)}
          onNote={(kind, body) => addNote(selected.id, kind, body)}
        />
      ) : null}

      <NewLeadDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onCreate={createLead} />
    </div>
  );
}

function Metric({
  label,
  value,
  hint,
  accent = false,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-ink-950 px-6 py-6">
      <p className="eyebrow">{label}</p>
      <p
        className={`font-display mt-4 text-4xl leading-none ${accent ? "text-gold-300" : "text-bone-50"}`}
      >
        {value}
      </p>
      {hint ? <p className="mt-2 text-[0.62rem] tracking-[0.18em] text-mute-500 uppercase">{hint}</p> : null}
    </div>
  );
}

function BoardHeader({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/8 pb-5">
      <div>
        <h2 className="font-display flex items-center gap-3 text-3xl text-bone-50">
          <TargetIcon className="h-5 w-5 text-gold-400" />
          {title}
        </h2>
        <p className="mt-2 text-sm text-mute-500">{hint}</p>
      </div>
    </div>
  );
}

function LeadCard({
  lead,
  onOpen,
  onAdvance,
}: {
  lead: LeadWithScore;
  onOpen: () => void;
  onAdvance: () => void;
}) {
  return (
    <article className="group border border-white/8 bg-ink-950 p-4 transition-colors duration-300 hover:border-gold-400/40">
      <div className="flex items-start justify-between gap-3">
        <button type="button" onClick={onOpen} className="text-left">
          <h3 className="text-[0.9375rem] leading-snug text-bone-50 transition-colors group-hover:text-gold-300">
            {lead.businessName}
          </h3>
        </button>
        <span
          className={`shrink-0 border px-2 py-0.5 font-display text-sm ${
            lead.score >= 70
              ? "border-gold-400/50 bg-gold-400/10 text-gold-300"
              : lead.score >= 50
                ? "border-white/15 text-bone-300"
                : "border-white/10 text-mute-500"
          }`}
        >
          {lead.score}
        </span>
      </div>
      <p className="mt-2 text-[0.62rem] tracking-[0.16em] text-mute-500 uppercase">
        {verticalLabel(lead.vertical)}
      </p>
      <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/6 pt-3">
        <span className="text-xs text-bone-300">{lead.ticketValue ?? "—"}</span>
        <button
          type="button"
          onClick={onOpen}
          className="text-[0.58rem] tracking-[0.18em] text-mute-500 uppercase transition-colors hover:text-gold-300"
        >
          Open
        </button>
        <button
          type="button"
          onClick={onAdvance}
          className="text-[0.58rem] tracking-[0.18em] text-gold-400/80 uppercase transition-colors hover:text-gold-300"
        >
          Advance →
        </button>
      </div>
    </article>
  );
}

function FullPage({ label, inline = false }: { label: string; inline?: boolean }) {
  return (
    <div className={inline ? "py-16 text-center" : "flex min-h-screen items-center justify-center"}>
      <p className="flex items-center gap-3 text-sm tracking-[0.2em] text-mute-500 uppercase">
        <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-gold-400" />
        {label}
      </p>
    </div>
  );
}
