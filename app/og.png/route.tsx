import { ImageResponse } from "next/og";

// Required by output: export so the file is written at build time.
export const dynamic = "force-static";

// Link preview image, rendered once at build time. A route named og.png instead of the
// opengraph-image convention, because that one is exported without a file extension and
// GitHub Pages then serves it as application/octet-stream.
const size = { width: 1200, height: 630 };

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#f6efe4",
          backgroundColor: "#2a1a12",
          backgroundImage: "radial-gradient(circle at 92% 0%, rgba(197,138,79,0.35), rgba(197,138,79,0) 45%)",
        }}
      >
        <div style={{ fontSize: 40, color: "#e9d6bf" }}>cairin</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, lineHeight: 1.04 }}>
          <span>Pay your sellers once.</span>
          <span style={{ borderBottom: "10px solid #c58a4f", alignSelf: "flex-start" }}>Exactly once.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26, color: "#e9d6bf" }}>
          <span>Double-entry ledger · four-eyes payouts · safe on timeouts</span>
          <span style={{ fontSize: 24, color: "#3f6b42", backgroundColor: "#e7efe2", borderRadius: 999, padding: "6px 18px" }}>
            sum 0.00
          </span>
        </div>
      </div>
    ),
    size,
  );
}
