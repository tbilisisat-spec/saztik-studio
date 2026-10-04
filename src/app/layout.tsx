import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://saztik.com"),
  title: {
    default: "Saztik — The Art of Connection",
    template: "%s — Saztik",
  },
  description:
    "Saztik is an international digital creative studio producing cinematic reels, promotional films, websites and digital experiences for high-ticket brands across Europe and the United States. Professional visual content and web design without the traditional production or agency cost.",
  keywords: [
    "cinematic reels",
    "website design",
    "website redesign",
    "site performance optimization",
    "luxury villa video",
    "promotional film",
    "creative studio",
    "hotel video production",
    "yacht film",
    "real estate video",
    "Saztik",
  ],
  openGraph: {
    title: "Saztik — The Art of Connection",
    description:
      "Professional visual content and web design, produced more efficiently. Cinematic reels, films and websites for luxury hospitality, real estate, yachts, jewellery and premium experiences.",
    url: "https://saztik.com",
    siteName: "Saztik",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saztik — The Art of Connection",
    description: "Cinematic content and website design for high-ticket brands.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Saztik",
  slogan: "The Art of Connection",
  url: "https://saztik.com",
  description:
    "Digital creative studio producing cinematic video content, websites and digital experiences for high-ticket businesses in Europe and the United States.",
  email: "info@saztik.com",
  areaServed: ["Europe", "United States"],
  serviceType: [
    "Website design and development",
    "Site performance and conversion optimization",
    "Cinematic reels",
    "Promotional films",
    "Social content",
    "AI tools and business automation",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-ink-950">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="grain min-h-screen bg-ink-950 text-bone-50 antialiased">{children}</body>
    </html>
  );
}
