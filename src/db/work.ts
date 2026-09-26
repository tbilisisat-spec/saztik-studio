import { asc } from "drizzle-orm";
import { db, hasDatabase } from "@/db";
import { workItems } from "@/db/schema";
import { SEED_WORK, type SeedWorkItem } from "@/lib/seed-data";

export type WorkRecord = {
  slug: string;
  title: string;
  client: string;
  vertical: string;
  discipline: string;
  deliverable: string;
  location: string | null;
  year: number | null;
  duration: string | null;
  summary: string | null;
  result: string | null;
  coverUrl: string;
  videoUrl: string | null;
  posterUrl: string | null;
  tags: string | null;
  featured: boolean;
  position: number;
};

function normalise(row: typeof workItems.$inferSelect): WorkRecord {
  return {
    slug: row.slug,
    title: row.title,
    client: row.client,
    vertical: row.vertical,
    discipline: row.discipline,
    deliverable: row.deliverable,
    location: row.location,
    year: row.year,
    duration: row.duration,
    summary: row.summary,
    result: row.result,
    coverUrl: row.coverUrl,
    videoUrl: row.videoUrl,
    posterUrl: row.posterUrl,
    tags: row.tags,
    featured: row.featured,
    position: row.position,
  };
}

function asRecords(items: SeedWorkItem[]): WorkRecord[] {
  return items.map((item) => ({ ...item }));
}

/** Idempotent: fills the work_items table the first time it is read. */
export async function ensureWorkSeeded(): Promise<void> {
  const existing = await db.select({ id: workItems.id }).from(workItems).limit(1);
  if (existing.length > 0) return;
  await db.insert(workItems).values(SEED_WORK);
}

export async function getWorkItems(): Promise<WorkRecord[]> {
  if (!hasDatabase) return asRecords(SEED_WORK);
  try {
    await ensureWorkSeeded();
    const rows = await db.select().from(workItems).orderBy(asc(workItems.position));
    return rows.map(normalise);
  } catch (error) {
    console.error("[work] falling back to seed data:", error);
    return asRecords(SEED_WORK);
  }
}

export async function getWorkItem(slug: string): Promise<WorkRecord | undefined> {
  const all = await getWorkItems();
  return all.find((item) => item.slug === slug);
}

export async function getFeaturedWork(limit = 4): Promise<WorkRecord[]> {
  const all = await getWorkItems();
  const featured = all.filter((item) => item.featured);
  return (featured.length ? featured : all).slice(0, limit);
}


