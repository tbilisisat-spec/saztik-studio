import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { inquiries, leadActivities, leads } from "@/db/schema";
import type { Inquiry, Lead, LeadActivity } from "@/db/schema";
import { leadScore, type StageKey } from "@/lib/scoring";

const DEMO_LEADS: Array<{
  businessName: string;
  vertical: string;
  country: string;
  city: string;
  website: string;
  instagram: string;
  ticketValue: string;
  source: "hunt" | "inbound" | "referral";
  stage: StageKey;
  priceScore: number;
  visualScore: number;
  contentGapScore: number;
  dealValue: number | null;
  outreachChannel: string | null;
  notes: string;
}> = [
  {
    businessName: "Villa Serenità",
    vertical: "luxury-hospitality",
    country: "Italy",
    city: "Tuscany",
    website: "villaserenita.example",
    instagram: "@villaserenita",
    ticketValue: "€950 / night",
    source: "hunt",
    stage: "analyze",
    priceScore: 5,
    visualScore: 5,
    contentGapScore: 4,
    dealValue: 900,
    outreachChannel: null,
    notes:
      "Outstanding still photography, 140k followers, but only three reels in two years and all are phone footage. Owner replies on Instagram.",
  },
  {
    businessName: "Meridian Yacht Charters",
    vertical: "luxury-mobility",
    country: "Greece",
    city: "Athens",
    website: "meridiancharters.example",
    instagram: "@meridian.yachts",
    ticketValue: "€6,200 / day",
    source: "hunt",
    stage: "outreach",
    priceScore: 5,
    visualScore: 4,
    contentGapScore: 5,
    dealValue: 1400,
    outreachChannel: "email",
    notes:
      "Broker deck is photography only. 30-second private sample cut from their own sailing footage, watermarked, sent to the charter manager.",
  },
  {
    businessName: "Fjord & Fjell Lodges",
    vertical: "luxury-hospitality",
    country: "Norway",
    city: "Lofoten",
    website: "fjordfjell.example",
    instagram: "@fjordfjell",
    ticketValue: "€720 / night",
    source: "hunt",
    stage: "create",
    priceScore: 4,
    visualScore: 5,
    contentGapScore: 5,
    dealValue: 650,
    outreachChannel: null,
    notes: "Northern lights material is already shot and sits unused in their archive. Perfect first sample.",
  },
  {
    businessName: "Aurelia Fine Jewellery",
    vertical: "luxury-products",
    country: "Belgium",
    city: "Antwerp",
    website: "aurelia.example",
    instagram: "@aurelia.fine",
    ticketValue: "$3,400 average order",
    source: "hunt",
    stage: "hunt",
    priceScore: 4,
    visualScore: 5,
    contentGapScore: 4,
    dealValue: null,
    outreachChannel: null,
    notes: "Macro product shots are beautiful; social grid has no motion at all. Check whether they run paid ads before scoring.",
  },
  {
    businessName: "Coastline Estates",
    vertical: "luxury-real-estate",
    country: "United States",
    city: "Malibu",
    website: "coastlineestates.example",
    instagram: "@coastline.estates",
    ticketValue: "$4.8M average listing",
    source: "hunt",
    stage: "filter",
    priceScore: 5,
    visualScore: 4,
    contentGapScore: 3,
    dealValue: null,
    outreachChannel: null,
    notes: "Two listings already have decent drone films. Focus on the off-market portfolio instead.",
  },
  {
    businessName: "Maison Verte",
    vertical: "food-lifestyle",
    country: "France",
    city: "Paris",
    website: "maisonverte.example",
    instagram: "@maisonverte.paris",
    ticketValue: "€190 tasting menu",
    source: "inbound",
    stage: "won",
    priceScore: 3,
    visualScore: 5,
    contentGapScore: 4,
    dealValue: 1200,
    outreachChannel: "email",
    notes: "Started with one premium reel, now on a monthly content retainer — 6 outputs per month.",
  },
  {
    businessName: "Alpina Private Tours",
    vertical: "premium-experiences",
    country: "Switzerland",
    city: "Zermatt",
    website: "alpinatours.example",
    instagram: "@alpina.private",
    ticketValue: "€1,250 / person",
    source: "hunt",
    stage: "create",
    priceScore: 4,
    visualScore: 4,
    contentGapScore: 5,
    dealValue: 500,
    outreachChannel: null,
    notes: "Guides already film everything on phones. We only need creative direction and editing.",
  },
  {
    businessName: "The Lark Hotel",
    vertical: "luxury-hospitality",
    country: "United Kingdom",
    city: "Cotswolds",
    website: "thelarkhotel.example",
    instagram: "@thelark.cotswolds",
    ticketValue: "€420 / night",
    source: "hunt",
    stage: "outreach",
    priceScore: 3,
    visualScore: 4,
    contentGapScore: 5,
    dealValue: 480,
    outreachChannel: "instagram",
    notes: "Marketing lead responded, asked for pricing. Sent the package sheet, waiting on the sample review.",
  },
  {
    businessName: "Solmar Developers",
    vertical: "luxury-real-estate",
    country: "Spain",
    city: "Marbella",
    website: "solmar.example",
    instagram: "@solmar.developers",
    ticketValue: "€2.4M per unit",
    source: "referral",
    stage: "hunt",
    priceScore: 5,
    visualScore: 3,
    contentGapScore: 4,
    dealValue: null,
    outreachChannel: null,
    notes: "Pre-sales phase — a development film plus interactive unit browser would fit the Digital pillar.",
  },
  {
    businessName: "Vantage Auto Collection",
    vertical: "luxury-mobility",
    country: "United States",
    city: "Miami",
    website: "vantageauto.example",
    instagram: "@vantage.auto",
    ticketValue: "$890 / day",
    source: "hunt",
    stage: "lost",
    priceScore: 4,
    visualScore: 4,
    contentGapScore: 2,
    dealValue: null,
    outreachChannel: "email",
    notes: "Already working with a local production crew on a monthly contract. Revisit in Q3.",
  },
];

export async function ensureLeadsSeeded(): Promise<void> {
  const existing = await db.select({ id: leads.id }).from(leads).limit(1);
  if (existing.length > 0) return;
  for (const lead of DEMO_LEADS) {
    const [created] = await db.insert(leads).values(lead).returning();
    if (!created) continue;
    if (created.stage === "outreach" || created.stage === "won") {
      await db.insert(leadActivities).values({
        leadId: created.id,
        kind: "outreach",
        body:
          created.stage === "won"
            ? "Signed — first project converted into a monthly content retainer."
            : "Private sample delivered to the decision maker.",
      });
    }
  }
}

export async function listLeads(): Promise<Lead[]> {
  await ensureLeadsSeeded();
  return db.select().from(leads).orderBy(desc(leads.updatedAt));
}

export async function getLead(id: string): Promise<Lead | undefined> {
  const rows = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  return rows[0];
}

export async function listActivities(leadId: string): Promise<LeadActivity[]> {
  return db
    .select()
    .from(leadActivities)
    .where(eq(leadActivities.leadId, leadId))
    .orderBy(desc(leadActivities.createdAt));
}

export async function createLead(input: Partial<Lead>) {
  const [created] = await db
    .insert(leads)
    .values({
      businessName: input.businessName ?? "Untitled business",
      vertical: input.vertical ?? "luxury-hospitality",
      country: input.country ?? null,
      city: input.city ?? null,
      website: input.website ?? null,
      instagram: input.instagram ?? null,
      contactName: input.contactName ?? null,
      email: input.email ?? null,
      ticketValue: input.ticketValue ?? null,
      message: input.message ?? null,
      source: input.source ?? "hunt",
      stage: input.stage ?? "hunt",
      priceScore: input.priceScore ?? 3,
      visualScore: input.visualScore ?? 3,
      contentGapScore: input.contentGapScore ?? 3,
      dealValue: input.dealValue ?? null,
      sampleUrl: input.sampleUrl ?? null,
      outreachChannel: input.outreachChannel ?? null,
      notes: input.notes ?? null,
    })
    .returning();
  await db.insert(leadActivities).values({
    leadId: created.id,
    kind: "stage",
    body: `Lead added to the ${created.stage} stage.`,
  });
  return created;
}

export async function updateLead(id: string, input: Partial<Lead>) {
  const current = await getLead(id);
  if (!current) return undefined;
  const [updated] = await db
    .update(leads)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(leads.id, id))
    .returning();
  if (input.stage && input.stage !== current.stage) {
    await db.insert(leadActivities).values({
      leadId: id,
      kind: "stage",
      body: `Moved from ${current.stage} to ${input.stage}. Score ${leadScore(updated)} / 100.`,
    });
  }
  return updated;
}

export async function deleteLead(id: string): Promise<boolean> {
  const removed = await db.delete(leads).where(eq(leads.id, id)).returning({ id: leads.id });
  return removed.length > 0;
}

export async function addActivity(leadId: string, kind: string, body: string) {
  const [created] = await db
    .insert(leadActivities)
    .values({ leadId, kind, body })
    .returning();
  await db.update(leads).set({ updatedAt: new Date() }).where(eq(leads.id, leadId));
  return created;
}

export async function listInquiries(): Promise<Inquiry[]> {
  return db.select().from(inquiries).orderBy(asc(inquiries.createdAt));
}

export async function createInquiry(input: {
  businessName: string;
  contactName?: string | null;
  email: string;
  website?: string | null;
  instagram?: string | null;
  vertical: string;
  budget?: string | null;
  interest?: string | null;
  message: string;
}) {
  // Keep the studio pipeline populated: seed the reference hunt list before the
  // first inbound request lands, so the CRM is never empty for the studio team.
  await ensureLeadsSeeded();

  const lead = await createLead({
    businessName: input.businessName,
    contactName: input.contactName ?? null,
    email: input.email,
    website: input.website ?? null,
    instagram: input.instagram ?? null,
    vertical: input.vertical,
    message: input.message,
    source: "inbound",
    stage: "filter",
    priceScore: 3,
    visualScore: 4,
    contentGapScore: 4,
    notes: `Inbound request — ${input.interest ?? "general"} · budget: ${input.budget ?? "not stated"}`,
  });
  const [created] = await db
    .insert(inquiries)
    .values({ ...input, leadId: lead.id })
    .returning();
  return created;
}

export async function studioMetrics() {
  const all = await listLeads();
  const scored = all.map((lead) => ({ lead, score: leadScore(lead) }));
  const byStage = scored.reduce<Record<string, number>>((acc, { lead }) => {
    acc[lead.stage] = (acc[lead.stage] ?? 0) + 1;
    return acc;
  }, {});
  const pipelineValue = all.reduce((sum, lead) => sum + (lead.dealValue ?? 0), 0);
  const wonValue = all
    .filter((lead) => lead.stage === "won")
    .reduce((sum, lead) => sum + (lead.dealValue ?? 0), 0);
  const priority = scored.filter(({ score }) => score >= 70).length;
  const average = scored.length
    ? Math.round(scored.reduce((sum, item) => sum + item.score, 0) / scored.length)
    : 0;
  return {
    total: all.length,
    byStage,
    pipelineValue,
    wonValue,
    priority,
    average,
  };
}
