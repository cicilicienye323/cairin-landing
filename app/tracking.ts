// Consent-gated tags. Nothing here touches the network until loadTags() runs after "Accept all".
// IDs come from GitHub repository variables at build time; an empty ID skips that tag.
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "";
const ADS_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL ?? "";
const META_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

export const CONSENT_KEY = "cairin-consent";
export type Consent = "granted" | "denied";

type Fbq = ((...args: unknown[]) => void) & { queue: unknown[]; callMethod?: (...args: unknown[]) => void; loaded: boolean; version: string; push: unknown };
type TagWindow = Window & { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void; fbq?: Fbq; _fbq?: Fbq } & Record<string, unknown>;

const w = () => window as unknown as TagWindow;
const CONSENT_TYPES = ["ad_storage", "ad_user_data", "ad_personalization", "analytics_storage"] as const;
const consentAll = (value: Consent) => Object.fromEntries(CONSENT_TYPES.map((t) => [t, value]));

let loaded = false;
let granted = false;

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function saveConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Private mode: the choice lasts for this page only.
  }
}

function addScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadTags() {
  if (loaded) return;
  loaded = true;
  const win = w();

  if (GA4_ID || ADS_ID) {
    win.dataLayer = win.dataLayer || [];
    // gtag.js reads the arguments object itself, not an array.
    win.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      win.dataLayer.push(arguments);
    };
    win.gtag("consent", "default", consentAll("denied"));
    win.gtag("consent", "update", consentAll("granted"));
    win.gtag("js", new Date());
    if (GA4_ID) {
      if (new URLSearchParams(location.search).get("debug") === "1") win.gtag("config", GA4_ID, { debug_mode: true });
      else win.gtag("config", GA4_ID);
    }
    if (ADS_ID) win.gtag("config", ADS_ID);
    addScript(`https://www.googletagmanager.com/gtag/js?id=${GA4_ID || ADS_ID}`);
  }

  if (META_ID && !win.fbq) {
    // Meta's standard loader: queue calls until fbevents.js arrives.
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    } as Fbq;
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.push = fbq;
    win.fbq = fbq;
    win._fbq = fbq;
    addScript("https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", META_ID);
    fbq("track", "PageView");
  }
}

export function setConsent(value: Consent) {
  saveConsent(value);
  granted = value === "granted";
  const win = w();
  // ga-disable-<id> stops gtag from sending anything at all, including cookieless pings.
  for (const id of [GA4_ID, ADS_ID]) if (id) win[`ga-disable-${id}`] = !granted;

  if (granted) {
    if (loaded) {
      win.gtag?.("consent", "update", consentAll("granted"));
      win.fbq?.("consent", "grant");
    }
    loadTags();
  } else if (loaded) {
    win.gtag?.("consent", "update", consentAll("denied"));
    win.fbq?.("consent", "revoke");
    // Loaded tags cannot be removed, and GA4 enhanced measurement keeps sending scroll
    // with the old consent state. A reload starts again with no tag on the page.
    location.reload();
  }
}

export function trackWaitlistClick(where: "nav" | "hero" | "form") {
  if (granted) w().gtag?.("event", "waitlist_click", { location: where });
}

export function trackSignup() {
  if (!granted) return;
  trackWaitlistClick("form");
  if (ADS_ID && ADS_LABEL) w().gtag?.("event", "conversion", { send_to: `${ADS_ID}/${ADS_LABEL}` });
  w().fbq?.("track", "Lead");
}
