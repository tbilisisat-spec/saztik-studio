import type { Metadata } from "next";
import { PayClient } from "@/components/site/PayClient";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ code: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  return {
    title: `Payment ${code}`,
    description: "Secure USDT (TRC20) payment to Saztik Studio.",
    robots: { index: false, follow: false },
  };
}

export default async function PayPage({ params }: Props) {
  const { code } = await params;
  return <PayClient code={code} />;
}
