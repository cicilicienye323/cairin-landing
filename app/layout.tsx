import type { Metadata } from "next";
import { DESCRIPTION, SITE_URL, TITLE } from "./site";
import "./globals.css";

// Built by app/og.png/route.tsx.
const OG_IMAGE = { url: `${SITE_URL}og.png`, width: 1200, height: 630, alt: "cairin: Pay your sellers once. Exactly once." };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: { type: "website", url: SITE_URL, title: TITLE, description: DESCRIPTION, siteName: "cairin", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-crema font-sans text-[15px] leading-relaxed text-espresso">{children}</body>
    </html>
  );
}
