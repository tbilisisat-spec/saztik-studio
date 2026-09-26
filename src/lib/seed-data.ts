export type SeedWorkItem = {
  slug: string;
  title: string;
  client: string;
  vertical: string;
  discipline: "creative" | "digital" | "ai";
  deliverable: string;
  location: string;
  year: number;
  duration: string;
  summary: string;
  result: string;
  coverUrl: string;
  videoUrl: string;
  posterUrl: string;
  tags: string;
  featured: boolean;
  position: number;
};

const img = (id: number, w = 1400) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=${Math.round(
    (w * 2) / 3,
  )}&w=${w}`;

/**
 * Public portfolio. Served from PostgreSQL when available, and used as the
 * canonical seed + offline fallback so the site never renders empty.
 */
export const SEED_WORK: SeedWorkItem[] = [
  {
    slug: "casa-lumiere",
    title: "Casa Lumière",
    client: "Private villa estate",
    vertical: "luxury-hospitality",
    discipline: "creative",
    deliverable: "Property film + 3 social cuts",
    location: "Côte d'Azur, France",
    year: 2025,
    duration: "90 sec",
    summary:
      "An €1,400-per-night villa with a beautiful photo library and no video that matched the price point. We rebuilt the arrival as a single continuous movement — light, water, stone — and cut three vertical versions for the booking season.",
    result: "Direct-booking enquiries up in the first month of use.",
    coverUrl: img(28054849),
    videoUrl: "https://videos.pexels.com/video-files/29743154/12785063_3840_2160_30fps.mp4",
    posterUrl: img(28054849, 1000),
    tags: "Cinematic, Drone-free, Vertical cuts",
    featured: true,
    position: 1,
  },
  {
    slug: "aegean-blue-charters",
    title: "Aegean Blue Charters",
    client: "Yacht charter company",
    vertical: "luxury-mobility",
    discipline: "creative",
    deliverable: "Promotional film",
    location: "Cyclades, Greece",
    year: 2025,
    duration: "60 sec",
    summary:
      "A €5,000-per-day yacht sold entirely on still photography. We edited their own sailing footage and licensed material into a charter film that opens on water, not on specs.",
    result: "Used as the header film across the charter site and broker deck.",
    coverUrl: img(8556567),
    videoUrl: "https://videos.pexels.com/video-files/6815704/6815704-uhd_4096_1974_30fps.mp4",
    posterUrl: img(8556567, 1000),
    tags: "Motion, Colour, Sound design",
    featured: true,
    position: 2,
  },
  {
    slug: "maison-serein",
    title: "Maison Serein",
    client: "Michelin-track restaurant",
    vertical: "food-lifestyle",
    discipline: "creative",
    deliverable: "Social content series",
    location: "Copenhagen, Denmark",
    year: 2025,
    duration: "8 × 20 sec",
    summary:
      "A tasting menu deserves pacing. Eight short films built from the kitchen's own material — hands, fire, plating — released weekly so the account never ran dry.",
    result: "A repeatable monthly content rhythm instead of one-off shoots.",
    coverUrl: img(36430088),
    videoUrl: "https://videos.pexels.com/video-files/19905870/19905870-uhd_3840_2160_24fps.mp4",
    posterUrl: img(36430088, 1000),
    tags: "Series, Editorial, Rhythm",
    featured: true,
    position: 3,
  },
  {
    slug: "aurum-atelier",
    title: "Aurum Atelier",
    client: "Fine jewellery house",
    vertical: "luxury-products",
    discipline: "creative",
    deliverable: "Product film",
    location: "Geneva, Switzerland",
    year: 2024,
    duration: "45 sec",
    summary:
      "Macro photography, slow rotation, no narration. A $2,000+ product presented with the restraint its price allows — reflection, weight, and a single uninterrupted move.",
    result: "Adopted for product pages and private client previews.",
    coverUrl: img(36450789),
    videoUrl: "https://videos.pexels.com/video-files/13736230/13736230-uhd_3840_2160_30fps.mp4",
    posterUrl: img(36450789, 1000),
    tags: "Macro, Product, Minimal",
    featured: true,
    position: 4,
  },
  {
    slug: "the-rowan-house",
    title: "The Rowan House",
    client: "Boutique hotel",
    vertical: "luxury-hospitality",
    discipline: "digital",
    deliverable: "Brand film + landing page",
    location: "Lisbon, Portugal",
    year: 2025,
    duration: "Film + web",
    summary:
      "A 14-room hotel with a strong identity and a booking page that fought it. We produced the brand film and rebuilt the direct-booking page around it — one story, one button.",
    result: "Direct booking path shortened to two steps.",
    coverUrl: img(34607320),
    videoUrl: "https://videos.pexels.com/video-files/36188237/15347927_3840_2160_25fps.mp4",
    posterUrl: img(34607320, 1000),
    tags: "Web, Conversion, Brand film",
    featured: false,
    position: 5,
  },
  {
    slug: "veloce-collection",
    title: "Veloce Collection",
    client: "Luxury car rental",
    vertical: "luxury-mobility",
    discipline: "creative",
    deliverable: "Reel series",
    location: "Milan, Italy",
    year: 2024,
    duration: "6 × 15 sec",
    summary:
      "Night, wet asphalt, headlights. A monochrome reel series that sells the hour after delivery rather than the car itself.",
    result: "Six reels produced from one afternoon of client footage.",
    coverUrl: img(15315618),
    videoUrl: "https://videos.pexels.com/video-files/16768844/16768844-uhd_3840_2160_60fps.mp4",
    posterUrl: img(15315618, 1000),
    tags: "Night, Monochrome, Reels",
    featured: false,
    position: 6,
  },
  {
    slug: "alpine-reserve",
    title: "Alpine Reserve",
    client: "Property developer",
    vertical: "luxury-real-estate",
    discipline: "digital",
    deliverable: "Development film + interactive tour",
    location: "Zermatt, Switzerland",
    year: 2025,
    duration: "Film + interactive",
    summary:
      "Pre-sales needed more than renders. A development film cut to the sales narrative, paired with an interactive unit browser the sales team could send to buyers abroad.",
    result: "One asset serving both the website and the sales conversation.",
    coverUrl: img(7031407),
    videoUrl: "https://videos.pexels.com/video-files/39024353/16605654_3840_2160_30fps.mp4",
    posterUrl: img(7031407, 1000),
    tags: "Real estate, Interactive, Pre-sales",
    featured: false,
    position: 7,
  },
  {
    slug: "solstice-retreats",
    title: "Solstice Retreats",
    client: "Private travel experiences",
    vertical: "premium-experiences",
    discipline: "creative",
    deliverable: "Experience film",
    location: "Kaş, Türkiye",
    year: 2024,
    duration: "75 sec",
    summary:
      "A €900-per-person day that was being described in bullet points. We cut it as a single day from first light to last — so the price reads as obvious.",
    result: "Film used across the enquiry funnel and partner listings.",
    coverUrl: img(20975727),
    videoUrl: "https://videos.pexels.com/video-files/36867544/15619026_3840_2160_30fps.mp4",
    posterUrl: img(20975727, 1000),
    tags: "Travel, Daylight, Story",
    featured: false,
    position: 8,
  },
  {
    slug: "northline-concierge",
    title: "Northline Concierge",
    client: "Resort group",
    vertical: "luxury-hospitality",
    discipline: "ai",
    deliverable: "AI concierge + booking automation",
    location: "Remote / EU",
    year: 2026,
    duration: "Always-on",
    summary:
      "Guest questions answered in four languages before they reach the front desk, and enquiry-to-booking follow-up automated with the same tone as the brand film.",
    result: "Front-desk inbox load reduced; response time under a minute.",
    coverUrl: img(33824477),
    videoUrl: "https://videos.pexels.com/video-files/36219791/15359794_3840_2160_50fps.mp4",
    posterUrl: img(33824477, 1000),
    tags: "AI, Automation, Multilingual",
    featured: false,
    position: 9,
  },
];

export const HERO_MEDIA = {
  video: "https://videos.pexels.com/video-files/29743154/12785063_3840_2160_30fps.mp4",
  poster: img(28054849, 1800),
  secondary: "https://videos.pexels.com/video-files/26892153/12028357_3840_2160_25fps.mp4",
  secondaryPoster: img(32218616, 1400),
};
