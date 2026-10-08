"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

// Decorative hero card: one payout walks from requested to paid and the ledger sums to zero.
// Sample text only, not data.
const STATUSES = [
  { label: "requested", className: "bg-[#efe2d2] text-roast" },
  { label: "approved", className: "bg-[#efe2d2] text-roast" },
  { label: "sending", className: "bg-warn-bg text-warn" },
  { label: "paid", className: "bg-ok-bg text-ok" },
];

const STEPS = [
  ["Requested", "Dina, seller"],
  ["Approved", "Raka, approver"],
  ["Released", "Sari, releaser"],
  ["Paid", "bank confirmed"],
];

const PAID = STATUSES.length - 1;
const STEP_MS = 1800;

export default function PayoutCard() {
  const reduceMotion = useReducedMotion();
  // Server render and reduced motion both show the finished payout.
  const [step, setStep] = useState(PAID);

  useEffect(() => {
    if (reduceMotion) return;
    setStep(0);
    const id = setInterval(() => setStep((s) => (s + 1) % (STATUSES.length + 1)), STEP_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  // One extra tick holds "paid" before the loop restarts.
  const current = Math.min(step, PAID);
  const status = STATUSES[current];
  const ledgerIn = current >= 2;

  return (
    <motion.div
      aria-hidden="true"
      className="relative rounded-[18px] border border-line bg-foam p-[22px] pb-[18px] shadow-[0_24px_60px_-30px_rgba(42,26,18,0.45)]"
      animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="mb-3.5 flex items-start justify-between">
        <div>
          <small className="block text-xs text-ink-3">Payout #4821</small>
          <div className="font-serif text-[26px] leading-tight sm:text-[30px]">$2,450.00</div>
          <div className="text-[13px] text-ink-2">to Dina&apos;s Batik Store, bank •••• 2207</div>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={status.label}
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${status.className}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
          >
            <i className="size-1.5 rounded-full bg-current" />
            {status.label}
          </motion.span>
        </AnimatePresence>
      </div>

      <ul className="mb-3.5 border-t border-line">
        {STEPS.map(([name, who], i) => (
          <li key={name} className="grid grid-cols-[22px_1fr_auto] items-center gap-2.5 border-b border-line py-2 text-sm">
            <span className="relative size-[18px] rounded-full border-[1.5px] border-line">
              <motion.span
                className="absolute -inset-[1.5px] grid place-items-center rounded-full bg-caramel text-[11px] font-bold text-foam"
                animate={{ scale: i <= current ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 22 }}
              >
                ✓
              </motion.span>
            </span>
            <span>
              {name} <span className="text-xs text-ink-3">· {who}</span>
            </span>
            {i === 2 ? (
              <motion.span
                className="rounded-full bg-ok-bg px-2 py-px text-[11px] font-semibold text-ok"
                animate={{ opacity: i <= current ? 1 : 0 }}
              >
                different person ✓
              </motion.span>
            ) : (
              <span />
            )}
          </li>
        ))}
      </ul>

      <div className="rounded-xl border border-line bg-crema px-3 py-2.5 font-mono text-[13px]">
        {[
          ["seller:dina", "−2,450.00"],
          ["payout:clearing", "+2,450.00"],
        ].map(([account, amount], i) => (
          <motion.div
            key={account}
            className="flex justify-between py-0.5"
            animate={{ opacity: ledgerIn ? 1 : 0, x: ledgerIn ? 0 : -8 }}
            transition={{ delay: ledgerIn ? i * 0.3 : 0 }}
          >
            <span>{account}</span>
            <span>{amount}</span>
          </motion.div>
        ))}
        <div className="mt-1 flex justify-between border-t border-dashed border-line pt-1.5 font-bold">
          <span>sum</span>
          <motion.span className="text-ok" animate={{ opacity: ledgerIn ? 1 : 0 }} transition={{ delay: ledgerIn ? 0.6 : 0 }}>
            0.00
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
