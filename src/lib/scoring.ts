/**
 * Saztik lead scoring.
 *
 * The whole outbound strategy lives in one formula:
 *   High Price + High Visual Potential + Weak Video Content
 *
 * Each axis is rated 1-5 by the studio. The weighted result (0-100) decides
 * how fast a lead moves from HUNT to CREATE.
 */

export const SCORE_WEIGHTS = {
  price: 0.36,
  visual: 0.3,
  contentGap: 0.34,
} as const;

export type ScoreInput = {
  priceScore: number;
  visualScore: number;
  contentGapScore: number;
};

export function leadScore(input: ScoreInput): number {
  const clamp = (n: number) => Math.min(5, Math.max(1, Number.isFinite(n) ? n : 3));
  const raw =
    clamp(input.priceScore) * SCORE_WEIGHTS.price +
    clamp(input.visualScore) * SCORE_WEIGHTS.visual +
    clamp(input.contentGapScore) * SCORE_WEIGHTS.contentGap;
  return Math.round(((raw - 1) / 4) * 100);
}

export function scoreTier(score: number): {
  label: string;
  tone: "hot" | "warm" | "watch" | "cold";
  action: string;
} {
  if (score >= 80)
    return { label: "Priority Hunt", tone: "hot", action: "Build the private sample this week." };
  if (score >= 62)
    return { label: "Strong Lead", tone: "warm", action: "Analyze content gap, then create." };
  if (score >= 45)
    return { label: "Watchlist", tone: "watch", action: "Keep monitoring assets and pricing." };
  return { label: "Low Fit", tone: "cold", action: "Deprioritize — not the Saztik target." };
}

export const STAGES = [
  { key: "hunt", label: "01 · Hunt", hint: "Business identified in EU / US" },
  { key: "filter", label: "02 · Filter", hint: "Price × Visual × Content Gap checked" },
  { key: "analyze", label: "03 · Analyze", hint: "Website, Instagram, existing reels reviewed" },
  { key: "create", label: "04 · Create", hint: "Private watermarked sample in production" },
  { key: "outreach", label: "05 · Outreach", hint: "Sample sent to owner / marketing lead" },
  { key: "won", label: "06 · Convert", hint: "Paid project → package → monthly" },
  { key: "lost", label: "Paused", hint: "No fit, no reply, or out of scope" },
] as const;

export type StageKey = (typeof STAGES)[number]["key"];

export const VERTICALS = [
  { key: "luxury-hospitality", label: "Luxury Hospitality", note: "Villas · Boutique hotels · Resorts" },
  { key: "luxury-real-estate", label: "Luxury Real Estate", note: "Listings · Developers · Estates" },
  { key: "premium-experiences", label: "Premium Experiences", note: "Private tours · Travel · Adventure" },
  { key: "food-lifestyle", label: "Food & Lifestyle", note: "Restaurants · Cafés · Lifestyle brands" },
  { key: "luxury-mobility", label: "Luxury Mobility", note: "Yachts · Boats · Cars · Rentals" },
  { key: "luxury-products", label: "Luxury Products", note: "Jewelry · Watches · Fashion · Beauty" },
] as const;

export function verticalLabel(key: string): string {
  return VERTICALS.find((v) => v.key === key)?.label ?? key;
}
