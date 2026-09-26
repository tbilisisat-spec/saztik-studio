import type { Metadata } from "next";
import { StudioApp } from "@/components/studio/StudioApp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Studio — Hunt Pipeline",
  description: "Internal Saztik studio area: hunt pipeline, lead scoring, samples and outreach.",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <StudioApp />;
}
