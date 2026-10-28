import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Preview picture shown when a link to the site is shared (WhatsApp, Facebook, X) and in Google results.
export const alt = "Mubuga SACCO Ltd – Savings & Loans in Kisoro, Uganda";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public", "musacco-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 56, padding: "0 80px",
        background: "linear-gradient(135deg, #ffffff 0%, #eef4fb 100%)", fontFamily: "sans-serif" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={390} height={260} alt="" style={{ borderRadius: 24, background: "white" }} />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#C8424F", letterSpacing: 2, textTransform: "uppercase" }}>Est. 2005 · Kisoro, Uganda</div>
          <div style={{ fontSize: 72, fontWeight: 800, color: "#1E3A6E", lineHeight: 1.05, marginTop: 14 }}>Mubuga SACCO Ltd</div>
          <div style={{ fontSize: 34, color: "#374151", marginTop: 20, lineHeight: 1.3 }}>Savings, loans and MSACCO mobile banking for our community</div>
        </div>
      </div>
    ),
    size,
  );
}
