"use client";

import { useCallback, useEffect, useState } from "react";
import { CheckIcon, ArrowIcon } from "@/components/site/Icons";

type PaymentData = {
  code: string;
  businessName: string;
  amountUsdt: string;
  description: string | null;
  status: string;
  txHash: string | null;
  paidAt: string | null;
};

type WalletData = {
  address: string;
  network: string;
  token: string;
  contract: string;
};

type Status = "loading" | "ready" | "notfound" | "error" | "submitted";

export function PayClient({ code }: { code: string }) {
  const [status, setStatus] = useState<Status>("loading");
  const [payment, setPayment] = useState<PaymentData | null>(null);
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [error, setError] = useState("");
  const [txHash, setTxHash] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState<"address" | "amount" | null>(null);

  const load = useCallback(async () => {
    setStatus("loading");
    setError("");
    try {
      const res = await fetch(`/api/pay/${code}`, { cache: "no-store" });
      const json = await res.json();
      if (res.status === 404) {
        setStatus("notfound");
        return;
      }
      if (!res.ok) throw new Error(json?.error ?? "Could not load payment.");
      setPayment(json.payment);
      setWallet(json.wallet);
      if (json.payment.status === "paid") {
        setStatus("submitted");
        setTxHash(json.payment.txHash ?? "");
      } else {
        setStatus("ready");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }, [code]);

  useEffect(() => {
    void load();
  }, [load]);

  async function copy(text: string, kind: "address" | "amount") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // fallback
    }
  }

  async function submitTx(event: React.FormEvent) {
    event.preventDefault();
    if (!txHash.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`/api/pay/${code}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txHash: txHash.trim() }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Could not submit.");
      setStatus("submitted");
      if (json.payment) setPayment((p) => (p ? { ...p, ...json.payment } : p));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit transaction hash.");
    } finally {
      setSubmitting(false);
    }
  }

  if (status === "loading") {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-lg items-center justify-center px-5 py-24">
        <p className="text-sm tracking-[0.2em] text-mute-500 uppercase">Loading payment…</p>
      </div>
    );
  }

  if (status === "notfound") {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <p className="eyebrow text-gold-400">Payment</p>
        <h1 className="font-display mt-6 text-4xl text-bone-50">Link not found</h1>
        <p className="mt-4 text-sm text-mute-500">
          This payment link does not exist or has been removed. Contact Saztik if you believe this
          is an error.
        </p>
      </div>
    );
  }

  if (status === "error" || !payment || !wallet) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <p className="eyebrow text-ember-500">Error</p>
        <h1 className="font-display mt-6 text-4xl text-bone-50">Could not load</h1>
        <p className="mt-4 text-sm text-mute-500">{error || "Please try again later."}</p>
        <button
          type="button"
          onClick={() => void load()}
          className="mt-8 border border-gold-400/40 px-6 py-3 text-[0.65rem] tracking-[0.2em] text-gold-300 uppercase hover:bg-gold-400 hover:text-ink-950"
        >
          Retry
        </button>
      </div>
    );
  }

  if (status === "submitted" || payment.status === "paid") {
    return (
      <div className="mx-auto max-w-lg px-5 py-24">
        <div className="border border-gold-400/35 bg-ink-900/70 p-9 sm:p-12">
          <CheckIcon className="h-9 w-9 text-gold-400" />
          <h1 className="font-display mt-7 text-4xl leading-tight text-bone-50">
            Payment received
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-mute-500">
            Thank you. We have recorded your transaction and will confirm it on the Tron network
            shortly.
          </p>
          <dl className="mt-8 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-white/8 pb-3">
              <dt className="text-mute-500">Amount</dt>
              <dd className="text-gold-300">{payment.amountUsdt} USDT</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-white/8 pb-3">
              <dt className="text-mute-500">For</dt>
              <dd className="text-bone-200">{payment.businessName}</dd>
            </div>
            {(payment.txHash || txHash) && (
              <div className="flex flex-col gap-1 border-b border-white/8 pb-3">
                <dt className="text-mute-500">Transaction</dt>
                <dd className="break-all font-mono text-xs text-bone-400">
                  {payment.txHash || txHash}
                </dd>
              </div>
            )}
          </dl>
          <p className="mt-8 text-xs tracking-[0.2em] text-mute-500 uppercase">
            Saztik Studio · saztik.com
          </p>
        </div>
      </div>
    );
  }

  // Ready to pay
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(wallet.address)}&bgcolor=080a10&color=d6bb85`;

  return (
    <div className="mx-auto max-w-lg px-5 py-16 sm:py-24">
      <p className="eyebrow text-gold-400">Secure payment</p>
      <h1 className="font-display mt-5 text-4xl leading-tight text-bone-50 sm:text-5xl">
        {payment.amountUsdt}{" "}
        <span className="text-gold-400">USDT</span>
      </h1>
      <p className="mt-3 text-sm text-mute-500">
        For <span className="text-bone-200">{payment.businessName}</span>
        {payment.description ? ` · ${payment.description}` : null}
      </p>

      <div className="mt-10 border border-white/10 bg-ink-900/50 p-6 sm:p-8">
        <p className="eyebrow">Network</p>
        <p className="mt-2 text-sm text-bone-200">{wallet.network} · {wallet.token}</p>

        <p className="eyebrow mt-7">Send exactly</p>
        <div className="mt-2 flex items-center gap-3">
          <span className="font-display text-3xl text-gold-300">{payment.amountUsdt}</span>
          <span className="text-sm text-mute-500">USDT</span>
          <button
            type="button"
            onClick={() => void copy(payment.amountUsdt, "amount")}
            className="ml-auto border border-white/12 px-3 py-1.5 text-[0.6rem] tracking-[0.16em] text-mute-500 uppercase transition-colors hover:border-gold-400 hover:text-gold-300"
          >
            {copied === "amount" ? "Copied" : "Copy"}
          </button>
        </div>

        <p className="eyebrow mt-7">To this address</p>
        <div className="mt-3 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
          {/* QR */}
          <div className="shrink-0 border border-white/10 bg-ink-950 p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrUrl} alt="Wallet QR code" width={160} height={160} className="block" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="break-all font-mono text-sm leading-relaxed text-bone-200">
              {wallet.address}
            </p>
            <button
              type="button"
              onClick={() => void copy(wallet.address, "address")}
              className="mt-4 border border-gold-400/40 px-5 py-2.5 text-[0.62rem] tracking-[0.2em] text-gold-300 uppercase transition-colors hover:bg-gold-400 hover:text-ink-950"
            >
              {copied === "address" ? "Address copied" : "Copy address"}
            </button>
          </div>
        </div>

        <div className="mt-8 border-t border-white/8 pt-6">
          <p className="text-xs leading-relaxed text-mute-500">
            Open <strong className="text-bone-400">Trust Wallet</strong> → Send → choose{" "}
            <strong className="text-bone-400">USDT</strong> on the{" "}
            <strong className="text-bone-400">Tron (TRC20)</strong> network → paste the address
            above → enter exactly <strong className="text-bone-400">{payment.amountUsdt}</strong>{" "}
            → confirm. Do not send any other token or network.
          </p>
        </div>
      </div>

      {/* TX hash form */}
      <form onSubmit={submitTx} className="mt-8 border border-white/10 bg-ink-900/40 p-6 sm:p-8">
        <p className="eyebrow">After you send</p>
        <p className="mt-3 text-sm text-mute-500">
          Paste the transaction hash (TxID) from Trust Wallet so we can confirm faster.
        </p>
        <input
          value={txHash}
          onChange={(e) => setTxHash(e.target.value)}
          placeholder="64-character transaction hash"
          className="field mt-5 font-mono text-sm"
          spellCheck={false}
          autoComplete="off"
        />
        {error ? <p className="mt-3 text-sm text-ember-500">{error}</p> : null}
        <button
          type="submit"
          disabled={submitting || !txHash.trim()}
          className="group mt-5 inline-flex items-center gap-3 bg-gold-400 px-6 py-3 text-[0.65rem] tracking-[0.22em] text-ink-950 uppercase transition-all duration-400 hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-35"
        >
          {submitting ? "Submitting…" : "I have paid"}
          <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-400 group-hover:translate-x-1" />
        </button>
      </form>

      <p className="mt-10 text-center text-xs tracking-[0.18em] text-mute-500 uppercase">
        Saztik Studio · Questions: info@saztik.com
      </p>
    </div>
  );
}
