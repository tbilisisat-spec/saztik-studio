import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://saztik.com"),
  title: {
    default: "Saztik | Websites, apps and digital platforms",
    template: "%s | Saztik",
  },
  description:
    "Saztik is a small design studio. We design and build websites, platforms, mobile apps, mini apps and promo videos for your business.",
  keywords: [
    "website design",
    "web design studio",
    "web app development",
    "mobile app development",
    "mini apps",
    "promo video",
    "Saztik",
  ],
  openGraph: {
    title: "Saztik | Websites, apps and digital platforms",
    description:
      "Websites, platforms, mobile apps, mini apps and promo videos, designed and built for your business.",
    url: "https://saztik.com",
    siteName: "Saztik",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saztik | Websites, apps and digital platforms",
    description: "Websites, platforms, mobile apps, mini apps and promo videos.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Saztik",
  url: "https://saztik.com",
  description:
    "Small design studio building websites, platforms, mobile apps, mini apps and promo videos for businesses.",
  email: "info@saztik.com",
  serviceType: [
    "Website design",
    "Platform and web app development",
    "Mobile app development",
    "Mini app development",
    "Promo video production",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}