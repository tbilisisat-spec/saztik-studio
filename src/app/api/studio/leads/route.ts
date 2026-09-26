import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { inquiries, leadActivities, leads } from "@/db/schema";
import { createLead, ensureLeadsSeeded, listLeads, studioMetrics } from "@/db/leads";
import { isStudioAuthed } from "@/lib/studio-auth";
import { leadScore, scoreTier } from "@/lib/scoring";
import type { LeadWithScore, StudioPayload } from "@/lib/studio-types";

export const dynamic = "force-dynamic";

const unauthorized = () =>
  NextResponse.json({ ok: false, error: "Studio access required." }, { status: 401 });

function withScore(lead: (typeof leads.$inferSelect)[]): LeadWithScore[] {
  return lead.map((entry) => {
    const score = leadScore(entry);
    return { ...entry, score, tier: scoreTier(score) };
  });
}

export async function GET() {
  if (!(await isStudioAuthed())) return unauthorized();

  try {
    await ensureLeadsSeeded();
    const [allLeads, allActivities, metrics, allInquiries] = await Promise.all([
      listLeads(),
      db.select().from(leadActivities).orderBy(desc(leadActivities.createdAt)),
      studioMetrics(),
      db.select().from(inquiries).orderBy(desc(inquiries.createdAt)),
    ]);

    const payload: StudioPayload = {
      leads: withScore(allLeads),
      activities: allActivities.map((activity) => ({
        ...activity,
        createdAt: activity.createdAt.toISOString(),
      })),
      metrics,
      inquiries: allInquiries.map((inquiry) => ({
        ...inquiry,
        createdAt: inquiry.createdAt.toISOString(),
      })),
    };

    return NextResponse.json({ ok: true, ...payload });
  } catch (error) {
    console.error("[studio/leads] GET failed:", error);
    return NextResponse.json(
      { ok: false, error: "Database unavailable." },
      { status: 503 },
    );
  }
}

export async function POST(request: Request) {
  if (!(await isStudioAuthed())) return unauthorized();

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const businessName = typeof body.businessName === "string" ? body.businessName.trim() : "";
  if (!businessName) {
    return NextResponse.json(
      { ok: false, error: "Business name is required." },
      { status: 400 },
    );
  }

  const num = (value: unknown, fallback: number) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? Math.min(5, Math.max(1, Math.round(parsed))) : fallback;
  };
  const str = (value: unknown) => (typeof value === "string" && value.trim() ? value.trim() : null);

  try {
    const created = await createLead({
      businessName,
      vertical: str(body.vertical) ?? "luxury-hospitality",
      country: str(body.country),
      city: str(body.city),
      website: str(body.website),
      instagram: str(body.instagram),
      contactName: str(body.contactName),
      email: str(body.email),
      ticketValue: str(body.ticketValue),
      source: (str(body.source) as "hunt" | "inbound" | "referral") ?? "hunt",
      stage: (str(body.stage) as never) ?? "hunt",
      priceScore: num(body.priceScore, 3),
      visualScore: num(body.visualScore, 3),
      contentGapScore: num(body.contentGapScore, 3),
      dealValue: body.dealValue === null || body.dealValue === undefined ? null : Number(body.dealValue) || null,
      sampleUrl: str(body.sampleUrl),
      notes: str(body.notes),
    });

    const score = leadScore(created);
    return NextResponse.json({
      ok: true,
      lead: { ...created, score, tier: scoreTier(score) } satisfies LeadWithScore,
    });
  } catch (error) {
    console.error("[studio/leads] POST failed:", error);
    return NextResponse.json({ ok: false, error: "Could not save lead." }, { status: 503 });
  }
}
