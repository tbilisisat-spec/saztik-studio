/**
 * Saztik — strategic copy.
 * Everything here follows one rule: we never sell "cheap".
 * We sell better production economics and a defensible quality.
 */

export const PILLARS = [
  {
    id: "creative",
    index: "01",
    title: "Creative",
    tagline: "The revenue engine",
    status: "Live · primary offer",
    description:
      "Cinematic reels, promotional films, social content and advertising for brands whose price point demands a certain level of image.",
    items: ["Reels", "Promotional videos", "Social content", "Advertising"],
  },
  {
    id: "digital",
    index: "02",
    title: "Digital",
    tagline: "Where the film converts",
    status: "Live · paired with creative",
    description:
      "Websites, landing pages and interactive experiences built around the content, so the story and the enquiry path are one object.",
    items: ["Websites", "Interactive experiences", "Landing pages"],
  },
  {
    id: "ai",
    index: "03",
    title: "AI & Automation",
    tagline: "The multiplier",
    status: "Expanding · architecture ready",
    description:
      "AI tools, bots and business automation that keep a brand's tone consistent after the launch — and make production itself more efficient.",
    items: ["AI tools", "Bots", "Business automation"],
  },
] as const;

export const VALUE_PROPS = [
  {
    key: "quality",
    label: "Quality",
    headline: "This looks professional.",
    body: "Cinematic pacing, colour, sound design and motion. The output has to sit comfortably next to a €900 nightly rate or a five-figure product.",
  },
  {
    key: "economics",
    label: "Economics",
    headline: "You don't need a traditional production budget for every piece of content.",
    body: "A single reel in the US or EU market routinely costs several hundred to well over a thousand dollars. We reach comparable output through creative direction, editing, motion and an AI-assisted workflow — typically around a third of that cost, only where the quality is genuinely defensible.",
  },
  {
    key: "ease",
    label: "Ease",
    headline: "You already have the assets. We turn them into content.",
    body: "No crew, no shoot day, no closed business. Your existing photography and footage become the raw material; we supply the direction and the finish.",
  },
] as const;

export const METHOD = [
  {
    step: "01",
    key: "hunt",
    title: "Hunt",
    body: "We search Europe and the United States for businesses with a high-ticket product or service and a strong visual identity.",
    detail: "Luxury hospitality, real estate, premium experiences, food & lifestyle, mobility, luxury products.",
  },
  {
    step: "02",
    key: "filter",
    title: "Filter",
    body: "Every candidate is scored on three axes: Price × Visual Appeal × Content Gap.",
    detail: "Is the product expensive? Does it look compelling? Is the video content missing or weak?",
  },
  {
    step: "03",
    key: "analyze",
    title: "Analyze",
    body: "We review the website, Instagram and existing content: photo quality, reel quality, video volume, brand style, weak points.",
    detail: "This is where the content gap becomes specific and provable.",
  },
  {
    step: "04",
    key: "create",
    title: "Create",
    body: "From the business's own public material we build one private, branded, watermarked sample — 15 to 30 seconds.",
    detail: "Never published. Never used without permission. Made for one recipient.",
  },
  {
    step: "05",
    key: "outreach",
    title: "Outreach",
    body: "The sample goes directly to the owner or the marketing lead. Not a pitch deck — a finished piece with their name on it.",
    detail: "“We made something for you” replaces “we make videos”.",
  },
  {
    step: "06",
    key: "convert",
    title: "Convert",
    body: "If the sample lands, it becomes a paid project, then a package, then monthly content.",
    detail: "The goal is a retained client, not a one-off deliverable.",
  },
] as const;

export const PACKAGES = [
  {
    id: "starter",
    name: "Starter Reel",
    length: "15–30 sec",
    price: "from $180",
    comparison: "Comparable market rate: $500–$900",
    best: "Testing the water, single campaign, one hero asset.",
    includes: [
      "Creative direction from your existing assets",
      "Cinematic edit, colour and sound design",
      "Vertical + square delivery",
      "Two revision rounds",
      "5–7 day turnaround",
    ],
  },
  {
    id: "premium",
    name: "Premium Reel",
    length: "30–60 sec",
    price: "from $420",
    comparison: "Comparable market rate: $900–$2,000",
    best: "The main asset on your site, listing or profile.",
    includes: [
      "Everything in Starter",
      "Narrative structure and pacing pass",
      "Motion design and titles",
      "Horizontal + vertical masters",
      "Licensed music clearance",
    ],
  },
  {
    id: "film",
    name: "Promotional Film",
    length: "60–90 sec",
    price: "from $850",
    comparison: "Comparable market rate: $2,000–$5,000",
    best: "Brochures, brokers, pre-sales, paid advertising.",
    includes: [
      "Everything in Premium",
      "Full storyboard and script",
      "4K master + broadcast-ready exports",
      "Cutdowns for social",
      "Usage guidance for ads",
    ],
  },
  {
    id: "monthly",
    name: "Monthly Content",
    length: "4–8 outputs / month",
    price: "from $1,200 / month",
    comparison: "Comparable retainer: $3,000–$8,000 / month",
    best: "Brands that need a rhythm, not a one-off.",
    includes: [
      "Monthly content plan and asset intake",
      "Rolling delivery calendar",
      "Priority turnaround",
      "Performance-informed iteration",
      "Optional automation & AI tooling",
    ],
  },
] as const;

export const GROWTH_LADDER = [
  { stage: "Stage 01", label: "First project", range: "$50 – $150" },
  { stage: "Stage 02", label: "Multiple reels", range: "$200 – $500" },
  { stage: "Stage 03", label: "Package", range: "$500 – $1,000+" },
  { stage: "Stage 04", label: "Monthly client", range: "$500 – $2,000+ / month" },
  { stage: "Stage 05", label: "High-ticket retainers", range: "Scoped per project" },
] as const;

export const PRINCIPLES = {
  weSay: [
    "Professional visual content without the traditional production cost.",
    "Better production economics.",
    "High-quality visual content, produced more efficiently.",
    "You already have the assets. We turn them into content.",
    "We made something for you.",
  ],
  weNeverSay: [
    "Cheapest video",
    "Low cost editing",
    "Super cheap reels",
    "$20 reel",
    "Budget agency",
  ],
} as const;

export const HUNT_CRITERIA = [
  {
    key: "price",
    title: "High ticket",
    body: "The product or service carries a real price. Content that lifts conversion is worth paying for.",
    examples: ["€800 / night villa", "$2,000 product", "€5,000 / day yacht"],
  },
  {
    key: "visual",
    title: "Visual potential",
    body: "The place, product or experience is genuinely attractive and already well photographed.",
    examples: ["Strong photo library", "Real brand presence", "Distinct setting"],
  },
  {
    key: "gap",
    title: "Content gap",
    body: "Video is missing, scarce or far below the standard the price implies.",
    examples: ["No reels", "Phone-cut footage", "Two videos in three years"],
  },
] as const;

export const DELIVERY = [
  "4K masters with vertical, square and horizontal cutdowns",
  "Cinematic colour grade and sound design",
  "Licensed music, cleared for paid use",
  "Watermarked private preview before anything is published",
  "Two revision rounds included as standard",
  "Typical turnaround: 5–7 days from asset handover",
];

export const FAQ = [
  {
    q: "You don't film on location?",
    a: "Our core model works from the assets you already own — photography, existing footage, brand material. That is exactly why the production economics are different. When a project genuinely requires new capture, we arrange it with a local crew and quote it separately.",
  },
  {
    q: "Why is the price lower than a traditional production company?",
    a: "Because the expensive parts of a traditional shoot — crew days, travel, equipment, logistics — are replaced by creative direction, editing, motion and an AI-assisted workflow. Lower cost is the result of a more efficient process, never the identity of the studio.",
  },
  {
    q: "What is the private sample?",
    a: "Before you commit to anything, we build one short cinematic piece specifically for your business, using your own public material. It is watermarked and sent privately. It is never published on our channels without your permission. If you like it, we deliver the clean, full-quality version as a paid project.",
  },
  {
    q: "Which businesses are the right fit?",
    a: "High-ticket products or services with strong visual potential and weak video content: luxury hospitality, real estate and developers, premium travel experiences, restaurants and lifestyle brands, yachts and luxury mobility, jewellery, watches and fashion.",
  },
  {
    q: "How fast is delivery?",
    a: "Five to seven days from the moment assets are handed over for a single reel or film. Monthly clients work on a rolling delivery calendar agreed at the start of the month.",
  },
  {
    q: "Who owns the final files?",
    a: "You do. On payment, the finished masters and cutdowns are yours to use across your website, listings, social channels and paid advertising.",
  },
];
