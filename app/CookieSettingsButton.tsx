"use client";

import { OPEN_EVENT } from "./ConsentBanner";

export default function CookieSettingsButton() {
  return (
    <button type="button" className="underline" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Cookie settings
    </button>
  );
}
