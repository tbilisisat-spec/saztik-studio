import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { payments, type Payment } from "@/db/schema";
import { randomBytes } from "node:crypto";

/** Generate a short URL-safe payment code (8 chars). */
export function generatePaymentCode(): string {
  return randomBytes(6).toString("base64url").slice(0, 8);
}

export async function createPayment(input: {
  leadId?: string | null;
  businessName: string;
  amountUsdt: string;
  description?: string | null;
}): Promise<Payment> {
  const code = generatePaymentCode();
  const [row] = await db
    .insert(payments)
    .values({
      code,
      leadId: input.leadId ?? null,
      businessName: input.businessName,
      amountUsdt: input.amountUsdt,
      description: input.description ?? null,
      status: "pending",
    })
    .returning();
  return row;
}

export async function getPaymentByCode(code: string): Promise<Payment | null> {
  const [row] = await db.select().from(payments).where(eq(payments.code, code)).limit(1);
  return row ?? null;
}

export async function getPaymentById(id: string): Promise<Payment | null> {
  const [row] = await db.select().from(payments).where(eq(payments.id, id)).limit(1);
  return row ?? null;
}

export async function listPaymentsForLead(leadId: string): Promise<Payment[]> {
  return db
    .select()
    .from(payments)
    .where(eq(payments.leadId, leadId))
    .orderBy(desc(payments.createdAt));
}

export async function listAllPayments(): Promise<Payment[]> {
  return db.select().from(payments).orderBy(desc(payments.createdAt));
}

export async function markPaymentPaid(
  code: string,
  txHash: string,
): Promise<Payment | null> {
  const [row] = await db
    .update(payments)
    .set({
      status: "paid",
      txHash,
      paidAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(payments.code, code))
    .returning();
  return row ?? null;
}

export async function updatePaymentStatus(
  id: string,
  status: string,
): Promise<Payment | null> {
  const [row] = await db
    .update(payments)
    .set({ status, updatedAt: new Date() })
    .where(eq(payments.id, id))
    .returning();
  return row ?? null;
}
