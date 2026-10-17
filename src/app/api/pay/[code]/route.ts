import { NextResponse } from "next/server";
import { getPaymentByCode, markPaymentPaid } from "@/db/payments";
import { receivingWallet, TRON_NETWORK, USDT_TRC20_CONTRACT } from "@/lib/payment-config";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ code: string }> };

/** Public: fetch payment details by code (no auth). */
export async function GET(_request: Request, { params }: Params) {
  const { code } = await params;
  if (!code || code.length < 4) {
    return NextResponse.json({ ok: false, error: "Invalid payment link." }, { status: 400 });
  }

  try {
    const row = await getPaymentByCode(code);
    if (!row) {
      return NextResponse.json({ ok: false, error: "Payment not found." }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      payment: {
        code: row.code,
        businessName: row.businessName,
        amountUsdt: row.amountUsdt,
        description: row.description,
        status: row.status,
        txHash: row.txHash,
        paidAt: row.paidAt?.toISOString() ?? null,
        createdAt: row.createdAt.toISOString(),
      },
      wallet: {
        address: receivingWallet(),
        network: TRON_NETWORK,
        token: "USDT",
        contract: USDT_TRC20_CONTRACT,
      },
    });
  } catch (error) {
    console.error("[pay] GET failed:", error);
    return NextResponse.json({ ok: false, error: "Service unavailable." }, { status: 503 });
  }
}

/** Public: client submits transaction hash after sending USDT. */
export async function POST(request: Request, { params }: Params) {
  const { code } = await params;
  if (!code || code.length < 4) {
    return NextResponse.json({ ok: false, error: "Invalid payment link." }, { status: 400 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const txHash = typeof body.txHash === "string" ? body.txHash.trim() : "";
  // Tron tx hashes are 64 hex chars
  if (!/^[a-fA-F0-9]{64}$/.test(txHash)) {
    return NextResponse.json(
      { ok: false, error: "Please paste a valid Tron transaction hash (64 hex characters)." },
      { status: 400 },
    );
  }

  try {
    const existing = await getPaymentByCode(code);
    if (!existing) {
      return NextResponse.json({ ok: false, error: "Payment not found." }, { status: 404 });
    }
    if (existing.status === "paid") {
      return NextResponse.json({
        ok: true,
        message: "Already marked as paid.",
        payment: {
          code: existing.code,
          status: existing.status,
          txHash: existing.txHash,
        },
      });
    }
    if (existing.status === "cancelled" || existing.status === "expired") {
      return NextResponse.json(
        { ok: false, error: "This payment link is no longer active." },
        { status: 410 },
      );
    }

    const updated = await markPaymentPaid(code, txHash);
    return NextResponse.json({
      ok: true,
      message: "Payment recorded. We will confirm on-chain shortly.",
      payment: {
        code: updated?.code,
        status: updated?.status,
        txHash: updated?.txHash,
        paidAt: updated?.paidAt?.toISOString() ?? null,
      },
    });
  } catch (error) {
    console.error("[pay] POST failed:", error);
    return NextResponse.json({ ok: false, error: "Could not record payment." }, { status: 503 });
  }
}
