"use client";

import { useEffect, useState } from "react";
import { readConsent, setConsent, trackWaitlistClick, type Consent } from "./tracking";

export const OPEN_EVENT = "cairin:cookie-settings";

// Shown on the first visit and from "Cookie settings". Rendered only after mount, so visitors
// without JavaScript see no banner, and no tag can load for them either.
export default function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = readConsent();
    if (saved) setConsent(saved);
    else setOpen(true);

    const reopen = () => setOpen(true);
    // Waitlist links in the server-rendered page carry data-waitlist="nav" or "hero".
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest<HTMLElement>("[data-waitlist]");
      if (link) trackWaitlistClick(link.dataset.waitlist as "nav" | "hero");
    };
    window.addEventListener(OPEN_EVENT, reopen);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener(OPEN_EVENT, reopen);
      document.removeEventListener("click", onClick);
    };
  }, []);

  if (!open) return null;

  const choose = (value: Consent) => {
    setConsent(value);
    setOpen(false);
  };

  return (
    <section
      aria-label="We value your privacy"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-[860px] flex-col gap-3.5 rounded-[18px] border border-line bg-foam px-5 py-[18px] shadow-[0_18px_50px_-24px_rgba(42,26,18,0.5)] sm:inset-x-5 sm:bottom-5 sm:flex-row sm:items-center sm:gap-5"
    >
      <p className="flex-1 text-sm text-ink-2">
        <b className="mb-0.5 block text-[15px] text-espresso">We value your privacy</b>
        We use cookies to analyze site traffic and measure our ads. Click &quot;Accept all&quot; to allow them, or &quot;Reject all&quot; to continue without them.
      </p>
      <div className="flex shrink-0 gap-2.5">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="flex-1 rounded-xl border border-roast px-[18px] py-2.5 text-sm font-semibold text-roast sm:flex-none"
        >
          Reject all
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="flex-1 rounded-xl border border-roast bg-roast px-[18px] py-2.5 text-sm font-semibold text-crema sm:flex-none"
        >
          Accept all
        </button>
      </div>
    </section>
  );
}
