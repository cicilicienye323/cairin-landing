import PayoutCard from "./PayoutCard";
import ConsentBanner from "./ConsentBanner";
import CookieSettingsButton from "./CookieSettingsButton";
import WaitlistForm from "./WaitlistForm";
import { DESCRIPTION, SITE_URL } from "./site";

// No aggregateRating or review: cairin has no real users yet, and ratings are never invented.
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "cairin",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: DESCRIPTION,
  url: SITE_URL,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const PROBLEMS = [
  ["Wrong balances", "A forgotten refund, a wrong fee, a rounding error. The balance a seller sees slowly drifts from the money that actually exists."],
  ["Double payouts", "The payment provider times out mid-payout. Nobody knows if the money left, someone retries, and the seller gets paid twice."],
  ["Insider fraud", "One admin alone can release money to the wrong bank account, including their own."],
];

const FEATURES = [
  ["Double-entry ledger", "Every movement is entries that sum to zero. Append-only: the database rejects edits and deletes."],
  ["Balances from orders", "Orders credit sellers minus your fee, refunds debit it back. Any balance can be rebuilt from the ledger."],
  ["Four-eyes approval", "One person approves, a different person releases. The system refuses when it is the same user."],
  ["Safe on timeouts", "An unknown payout is never retried blindly. cairin asks the provider first, and a constraint blocks paying twice."],
  ["Audit and balance check", "Who did what, and when, in an append-only log. One check proves the whole ledger balances to zero."],
];

const STEPS = [
  ["Seller", "Requests", "Asks to withdraw part of their balance to a bank account."],
  ["Approver", "Approves", "Checks the request against the ledger and signs off."],
  ["Releaser", "Releases", "A second person sends the payout. Never the approver."],
  ["Bank", "Money arrives", "The payout is marked paid, and the ledger still sums to zero."],
];

const btn = "inline-block rounded-xl border border-roast bg-roast px-[22px] py-[13px] text-center font-semibold text-crema";
const card = "rounded-[18px] border border-line bg-foam p-6";
const h2 = "mb-2 font-serif text-[26px] leading-tight font-medium sm:text-[32px]";
const sub = "mb-8 max-w-[640px] text-ink-2";
const wrap = "mx-auto max-w-[1040px] px-5 py-10 sm:px-16 sm:py-14";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <nav className="mx-auto flex max-w-[1040px] items-center justify-between border-b border-line px-5 py-4 sm:px-16 sm:py-5">
        <span className="font-serif text-[22px] font-medium">cairin</span>
        <span className="flex items-center gap-6 text-sm text-ink-2">
          <a href="#problem" className="hidden md:inline">Problem</a>
          <a href="#features" className="hidden md:inline">Features</a>
          <a href="#how-it-works" className="hidden md:inline">How it works</a>
          <a href="#waitlist" data-waitlist="nav" className={`${btn} px-3.5 py-2`}>Join the waitlist</a>
        </span>
      </nav>

      <main>
        <section id="hero" className="relative overflow-hidden">
          <div className="glow" />
          <div className="relative mx-auto grid max-w-[1040px] items-center gap-7 px-5 pt-9 pb-10 md:grid-cols-[1.05fr_0.95fr] md:gap-12 md:px-16 md:pt-16 md:pb-[72px]">
            <div>
              <p className="mb-3 text-[13px] font-semibold text-caramel">Seller payouts for marketplaces</p>
              <h1 className="mb-5 font-serif text-[38px] leading-[1.05] font-medium md:text-[56px]">
                Pay your sellers once. <span className="underline-once">Exactly once.</span>
              </h1>
              <p className="mb-[30px] max-w-[480px] text-base text-ink-2 md:text-lg">
                cairin keeps every seller balance in a double-entry ledger and releases payouts only after two people sign off, so money never drifts, doubles, or walks out the door.
              </p>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <a href="#waitlist" data-waitlist="hero" className={btn}>Join the waitlist</a>
                <a href="#how-it-works" className={`${btn} bg-transparent text-roast`}>See how it works</a>
              </div>
              <p className="mt-3.5 text-[13px] text-ink-3">Early access for small marketplaces. No card needed.</p>
            </div>
            <PayoutCard />
          </div>
        </section>

        <section id="problem" className={wrap}>
          <h2 className={`${h2} fade-in`}>Holding seller money is harder than it looks</h2>
          <p className={`${sub} fade-in`}>A marketplace holds money that belongs to thousands of sellers. Three things go wrong.</p>
          <div className="grid gap-[18px] md:grid-cols-3">
            {PROBLEMS.map(([title, text], i) => (
              <div key={title} className={`${card} fade-in`}>
                <div className="mb-3 font-serif text-[28px] leading-none text-caramel">0{i + 1}</div>
                <h3 className="mb-1.5 text-[17px] font-semibold">{title}</h3>
                <p className="text-sm text-ink-2">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="bg-espresso text-latte">
          <div className={wrap}>
            <h2 className={`${h2} text-crema fade-in`}>Five guarantees, built into the ledger</h2>
            <p className={`${sub} text-latte fade-in`}>Enforced by the database, not by good intentions.</p>
            <div className="grid gap-[18px] md:grid-cols-5">
              {FEATURES.map(([title, text]) => (
                <div key={title} className="rounded-[18px] border border-bark-line bg-bark p-6 fade-in">
                  <h3 className="mb-1.5 text-[17px] font-semibold text-crema">{title}</h3>
                  <p className="text-sm">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className={wrap}>
          <h2 className={`${h2} fade-in`}>How a payout moves</h2>
          <p className={`${sub} fade-in`}>Four steps, three different people, one payout.</p>
          <div className="grid gap-[18px] md:grid-cols-4">
            {STEPS.map(([who, title, text], i) => (
              <div key={title} className={`${card} fade-in`}>
                <div className="mb-3 font-serif text-[28px] leading-none text-caramel">{i + 1}</div>
                <div className="mb-1 text-xs font-semibold text-caramel">{who}</div>
                <h3 className="mb-1.5 text-[17px] font-semibold">{title}</h3>
                <p className="text-sm text-ink-2">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="waitlist" className="border-t border-line bg-foam">
          <div className={wrap}>
            <h2 className={h2}>Join the waitlist</h2>
            <p className={sub}>cairin is in private preview. Leave your email and we will reach out when a spot opens.</p>
            <WaitlistForm />
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-[1040px] flex-col gap-1.5 border-t border-line px-5 py-5 text-[13px] text-ink-3 sm:flex-row sm:justify-between sm:px-16 sm:py-6">
        <span>cairin, a portfolio lab</span>
        <span className="flex gap-3">
          <CookieSettingsButton />
          <a href="https://github.com/cicilicienye323/cairin-landing">View the code on GitHub</a>
        </span>
      </footer>
      <ConsentBanner />
    </>
  );
}
