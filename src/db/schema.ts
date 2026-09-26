import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * Saztik — Hunt Pipeline
 * Every lead is scored on the three strategic axes:
 *   Price (high ticket) × Visual Appeal × Content Gap
 */
export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  businessName: text("business_name").notNull(),
  vertical: text("vertical").notNull().default("luxury-hospitality"),
  country: text("country"),
  city: text("city"),
  website: text("website"),
  instagram: text("instagram"),
  contactName: text("contact_name"),
  email: text("email"),
  ticketValue: text("ticket_value"),
  message: text("message"),
  source: text("source").notNull().default("hunt"), // hunt | inbound | referral
  stage: text("stage").notNull().default("hunt"), // hunt | filter | analyze | create | outreach | won | lost
  priceScore: integer("price_score").notNull().default(3), // 1-5
  visualScore: integer("visual_score").notNull().default(3), // 1-5
  contentGapScore: integer("content_gap_score").notNull().default(3), // 1-5
  dealValue: integer("deal_value"), // estimated USD
  sampleUrl: text("sample_url"),
  outreachChannel: text("outreach_channel"), // email | instagram | linkedin
  outreachAt: timestamp("outreach_at", { withTimezone: true }),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Activity timeline for a single lead (notes, stage moves, outreach). */
export const leadActivities = pgTable("lead_activities", {
  id: uuid("id").primaryKey().defaultRandom(),
  leadId: uuid("lead_id")
    .notNull()
    .references(() => leads.id, { onDelete: "cascade" }),
  kind: text("kind").notNull().default("note"), // note | stage | outreach | sample
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Public portfolio — cinematic work shown on saztik.com */
export const workItems = pgTable("work_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  client: text("client").notNull(),
  vertical: text("vertical").notNull(),
  discipline: text("discipline").notNull().default("creative"), // creative | digital | ai
  deliverable: text("deliverable").notNull(),
  location: text("location"),
  year: integer("year"),
  duration: text("duration"),
  summary: text("summary"),
  result: text("result"),
  coverUrl: text("cover_url").notNull(),
  videoUrl: text("video_url"),
  posterUrl: text("poster_url"),
  tags: text("tags"),
  featured: boolean("featured").notNull().default(false),
  position: integer("position").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Inbound project requests submitted from the public site. */
export const inquiries = pgTable("inquiries", {
  id: uuid("id").primaryKey().defaultRandom(),
  businessName: text("business_name").notNull(),
  contactName: text("contact_name"),
  email: text("email").notNull(),
  website: text("website"),
  instagram: text("instagram"),
  vertical: text("vertical").notNull(),
  budget: text("budget"),
  interest: text("interest"),
  message: text("message").notNull(),
  leadId: uuid("lead_id"),
  status: text("status").notNull().default("new"), // new | reviewed | replied | archived
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Lead = typeof leads.$inferSelect;
export type LeadActivity = typeof leadActivities.$inferSelect;
export type WorkItem = typeof workItems.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
