import { createInquiry } from "@/db/leads";
import { VERTICALS } from "@/lib/scoring";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Body = {
  businessName?: unknown;
  contactName?: unknown;
  email?: unknown;
  website?: unknown;
  instagram?: unknown;
  vertical?: unknown;
  interest?: unknown;
  budget?: unknown;
  message?: unknown;
};

function text(value: unknown, max = 1200): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().slice(0, max);
  return trimmed.length ? trimmed : null;
}

export async function POST(request: Request) {
  let payload: Body;
  try {
    payload = (await request.json()) as Body;
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const businessName = text(payload.businessName, 160);
  const email = text(payload.email, 200);
  const message = text(payload.message, 4000);

  if (!businessName) {
    return Response.json(
      { ok: false, error: "Business name is required." },
      { status: 400 },
    );
  }
  if (!email || !EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: "A valid email is required." }, { status: 400 });
  }
  if (!message || message.length < 12) {
    return Response.json(
      { ok: false, error: "Tell us a little about the project." },
      { status: 400 },
    );
  }

  const verticalKey = text(payload.vertical, 60) ?? "other";
  const vertical = VERTICALS.some((entry) => entry.key === verticalKey) ? verticalKey : "other";

  try {
    const inquiry = await createInquiry({
      businessName,
      email,
      message,
      contactName: text(payload.contactName, 160),
      website: text(payload.website, 240),
      instagram: text(payload.instagram, 120),
      vertical,
      interest: text(payload.interest, 160),
      budget: text(payload.budget, 80),
    });

    return Response.json({
      ok: true,
      reference: `SZ-${inquiry.id.replace(/-/g, "").slice(0, 6).toUpperCase()}`,
    });
  } catch (error) {
    console.error("[inquiries] failed to store request:", error);
    return Response.json(
      {
        ok: false,
        error: "We could not store your request right now. Please email info@saztik.com.",
      },
      { status: 503 },
    );
  }
}

export async function GET() {
  return Response.json({
    ok: true,
    endpoint: "/api/inquiries",
    method: "POST",
    hint: "Public project requests land directly in the Saztik hunt pipeline.",
  });
}
