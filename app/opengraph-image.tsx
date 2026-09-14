import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "RAYA — Taste the Fruit. Pomegranate sparkling fruit drink.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [font, can] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Unbounded-ExtraBold-OG.ttf")),
    // Lossless PNG copy of public/images/cans/pomegranate.webp for Satori.
    readFile(join(process.cwd(), "assets/og/pomegranate.png")),
  ]);

  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#B72C29", color: "#FFF7F1", fontFamily: "Unbounded", padding: "58px 64px", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", width: 700 }}>
        <div style={{ fontSize: 126, fontWeight: 800, letterSpacing: "-10px", lineHeight: 1 }}>RAYA</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 65, fontWeight: 800, letterSpacing: "-4px", lineHeight: 1.08, marginTop: 50 }}>
          <span>TASTE</span><span>THE FRUIT.</span>
        </div>
      </div>
      {/* ImageResponse needs a native image with embedded bytes, not next/image. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`data:image/png;base64,${can.toString("base64")}`} alt="RAYA Pomegranate can" width={390} height={520} style={{ objectFit: "contain", flexShrink: 0 }} />
    </div>,
    { ...size, fonts: [{ name: "Unbounded", data: font, weight: 800, style: "normal" }] },
  );
}
