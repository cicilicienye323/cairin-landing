import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "cairin",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-crema font-sans text-espresso">{children}</body>
    </html>
  );
}
