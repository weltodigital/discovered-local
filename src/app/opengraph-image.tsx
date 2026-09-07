import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt =
  "Discovered Local — Portsmouth creators and great local businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const mark = await readFile(join(process.cwd(), "public", "logo-mark.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbf8f3",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={56} height={56} alt="" />
          <div
            style={{
              display: "flex",
              gap: 10,
              fontSize: 32,
              fontWeight: 600,
              color: "#0a1122",
            }}
          >
            <span>Discovered</span>
            <span style={{ color: "#95b8d1" }}>Local</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
              color: "#0a1122",
              maxWidth: 940,
            }}
          >
            Discover local. Create content. Get invited back.
          </div>
          <div style={{ fontSize: 30, color: "#62677a", maxWidth: 820 }}>
            Portsmouth creators wanted.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 24,
            color: "#0a1122",
          }}
        >
          <div
            style={{
              background: "#95b8d1",
              color: "#0a1122",
              padding: "14px 26px",
              borderRadius: 999,
              fontWeight: 600,
            }}
          >
            Apply to become a creator
          </div>
          <div style={{ color: "#62677a" }}>discoveredlocal.com</div>
        </div>
      </div>
    ),
    size,
  );
}
