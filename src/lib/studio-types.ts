import type { Lead } from "@/db/schema";
import type { leadScore, scoreTier } from "@/lib/scoring";

export type LeadWithScore = Lead & {
  score: ReturnType<typeof leadScore>;
  tier: ReturnType<typeof scoreTier>;
};

export type ActivityDTO = {
  id: string;
  leadId: string;
  kind: string;
  body: string;
  createdAt: string;
};

export type MetricsDTO = {
  total: number;
  byStage: Record<string, number>;
  pipelineValue: number;
  wonValue: number;
  priority: number;
  average: number;
};

export type InquiryDTO = {
  id: string;
  businessName: string;
  contactName: string | null;
  email: string;
  website: string | null;
  instagram: string | null;
  vertical: string;
  budget: string | null;
  interest: string | null;
  message: string;
  status: string;
  leadId: string | null;
  createdAt: string;
};

export type StudioPayload = {
  leads: LeadWithScore[];
  activities: ActivityDTO[];
  metrics: MetricsDTO;
  inquiries: InquiryDTO[];
};
