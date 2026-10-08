"use client";

import { useState } from "react";

// Demo form: the browser validates the email, nothing is sent or stored.
export default function WaitlistForm() {
  const [joined, setJoined] = useState(false);

  return (
    <form
      className="max-w-[560px]"
      onSubmit={(e) => {
        e.preventDefault();
        setJoined(true);
      }}
    >
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          type="email"
          required
          aria-label="Email"
          placeholder="you@yourmarketplace.com"
          className="min-w-0 flex-1 rounded-xl border border-line bg-white px-3.5 py-3 placeholder:text-ink-3 focus:border-caramel focus:ring-4 focus:ring-caramel/25 focus:outline-none"
        />
        <button type="submit" className="rounded-xl border border-roast bg-roast px-[22px] py-[13px] font-semibold text-crema">
          Join the waitlist
        </button>
      </div>
      {joined ? (
        <p role="status" className="mt-3.5 rounded-[10px] bg-ok-bg px-4 py-3 text-[13px] text-ok">
          Thanks, you are on the list. (Demo only: nothing was sent or stored.)
        </p>
      ) : (
        <p className="mt-3.5 text-[13px] text-ink-3">This is a demo. Nothing is sent or stored.</p>
      )}
    </form>
  );
}
