import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CLIENT_SITES, getClientSite } from "@/lib/client-sites";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;

export function generateStaticParams() {
  return CLIENT_SITES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = getClientSite(slug);
  if (!site) return {};
  return {
    title: `${site.name} — Preview by Saztik`,
    description: "Private website preview by Saztik.",
    robots: { index: false, follow: false },
  };
}

export default async function ClientPreviewPage({ params }: Props) {
  const { slug } = await params;
  const site = getClientSite(slug);
  if (!site) notFound();

  return (
    <div style={{ position: "fixed", inset: 0, display: "flex", flexDirection: "column", background: "#080a10" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "8px 16px",
          background: "#080a10",
          color: "#d6bb85",
          fontSize: 12,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          borderBottom: "1px solid rgba(214,187,133,0.25)",
        }}
      >
        <span>Saztik · Website preview</span>
        <a href={`/demos/${site.slug}/index.html`} target="_blank" rel="noopener" style={{ color: "inherit" }}>
          Open full page ↗
        </a>
      </div>
      <iframe
        src={`/demos/${site.slug}/index.html`}
        title={site.name}
        style={{ flex: 1, width: "100%", border: 0, background: "#fff" }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
}
