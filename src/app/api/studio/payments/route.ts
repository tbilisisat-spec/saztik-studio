import { NextResponse } from "next/server";
import { isStudioAuthed } from "@/lib/studio-auth";
import {
  createPayment,
  listAllPayments,
  listPaymentsForLead,
} from "@/db/payments";

export const dynamic = "force-dynamic";

const unauthorized = () =>
  NextResponse.json({ ok: false, error: "Studio access required." }, { status: 401 });

function toDTO(row: {
  id: string;
  code: string;
  leadId: string | null;
  businessName: string;
  amountUsdt: string;
  description: string | null;
  status: string;
  txHash: string | null;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: row.id,
    code: row.code,
    leadId: row.leadId,
    businessName: row.businessName,
    amountUsdt: row.amountUsdt,
    description: row.description,
    status: row.status,
    txHash: row.txHash,
    paidAt: row.paidAt?.toISOString() ?? null,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    payUrl: `/pay/${row.code}`,
  };
}

/** List payments — optional ?leadId= filter. */
export async function GET(request: Request) {
  if (!(await isStudioAuthed())) return unauthorized();

  try {
    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get("leadId");
    const rows = leadId ? await listPaymentsForLead(leadId) : await listAllPayments();
    return NextResponse.json({ ok: true, payments: rows.map(toDTO) });
  } catch (error) {
    console.error("[studio/payments] GET failed:", error);
    return NextResponse.json({ ok: false, error: "Database unavailable." }, { status: 503 });
  }
}

/** Create a new payment link. */
export async function POST(request: Request) {
  if (!(await isStudioAuthed())) return unauthorized();

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const businessName =
    typeof body.businessName === "string" ? body.businessName.trim() : "";
  const amountRaw =
    typeof body.amountUsdt === "string"
      ? body.amountUsdt.trim()
      : typeof body.amountUsdt === "number"
        ? String(body.amountUsdt)
        : "";
  const description =
    typeof body.description === "string" ? body.description.trim() || null : null;
  const leadId =
    typeof body.leadId === "string" && body.leadId.length > 0 ? body.leadId : null;

  if (!businessName) {
    return NextResponse.json(
      { ok: false, error: "Business name is required." },
      { status: 400 },
    );
  }

  const amount = Number(amountRaw);
  if (!amountRaw || !Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json(
      { ok: false, error: "A valid amount in USDT is required." },
      { status: 400 },
    );
  }

  // Normalize to 2 decimal places
  const amountUsdt = amount.toFixed(2);

  try {
    const row = await createPayment({
      leadId,
      businessName,
      amountUsdt,
      description,
    });
    return NextResponse.json({ ok: true, payment: toDTO(row) }, { status: 201 });
  } catch (error) {
    console.error("[studio/payments] POST failed:", error);
    return NextResponse.json({ ok: false, error: "Could not create payment." }, { status: 503 });
  }
}
