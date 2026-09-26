import { NextResponse } from "next/server";
import { deleteLead, getLead, listActivities, updateLead } from "@/db/leads";
import { isStudioAuthed } from "@/lib/studio-auth";
import { leadScore, scoreTier, type StageKey } from "@/lib/scoring";
import { STAGES } from "@/lib/scoring";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

const unauthorized = () =>
  NextResponse.json({ ok: false, error: "Studio access required." }, { status: 401 });

export async function GET(_request: Request, { params }: Params) {
  if (!(await isStudioAuthed())) return unauthorized();
  const { id } = await params;
  const lead = await getLead(id);
  if (!lead) return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
  const score = leadScore(lead);
  const activities = await listActivities(id);
  return NextResponse.json({
    ok: true,
    lead: { ...lead, score, tier: scoreTier(score) },
    activities: activities.map((activity) => ({
      ...activity,
      createdAt: activity.createdAt.toISOString(),
    })),
  });
}

export async function PATCH(request: Request, { params }: Params) {
  if (!(await isStudioAuthed())) return unauthorized();
  const { id } = await params;

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const patch: Record<string, unknown> = {};
  const str = (value: unknown) => (typeof value === "string" ? value.trim() : undefined);

  if (typeof body.stage === "string" && STAGES.some((stage) => stage.key === body.stage)) {
    patch.stage = body.stage as StageKey;
  }
  for (const key of ["businessName", "vertical", "country", "city", "website", "instagram", "contactName", "email", "ticketValue", "sampleUrl", "outreachChannel", "notes", "source"] as const) {
    const value = str(body[key]);
    if (value !== undefined) patch[key] = value.length ? value : null;
  }
  for (const key of ["priceScore", "visualScore", "contentGapScore"] as const) {
    if (body[key] !== undefined) {
      const parsed = Math.min(5, Math.max(1, Math.round(Number(body[key]) || 3)));
      patch[key] = parsed;
    }
  }
  if (body.dealValue !== undefined) {
    patch.dealValue = body.dealValue === null || body.dealValue === "" ? null : Number(body.dealValue) || null;
  }
  if (body.outreachAt !== undefined) {
    patch.outreachAt = body.outreachAt ? new Date(String(body.outreachAt)) : null;
  }

  try {
    const updated = await updateLead(id, patch);
    if (!updated) return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
    const score = leadScore(updated);
    return NextResponse.json({ ok: true, lead: { ...updated, score, tier: scoreTier(score) } });
  } catch (error) {
    console.error("[studio/leads] PATCH failed:", error);
    return NextResponse.json({ ok: false, error: "Could not update lead." }, { status: 503 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isStudioAuthed())) return unauthorized();
  const { id } = await params;
  try {
    const removed = await deleteLead(id);
    if (!removed) return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[studio/leads] DELETE failed:", error);
    return NextResponse.json({ ok: false, error: "Could not delete lead." }, { status: 503 });
  }
}
