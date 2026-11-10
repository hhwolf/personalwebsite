import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0a0b",
          color: "#f2efe9",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#8a867f" }}>
          {site.url.replace(/^https?:\/\//, "").toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 120, lineHeight: 1 }}>{site.name}</div>
          <div style={{ display: "flex", fontSize: 40, color: "#f2a33a", fontStyle: "italic" }}>
            {site.tagline}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 4,
            color: "#8a867f",
          }}
        >
          <span>{site.location.toUpperCase()}</span>
          <span style={{ color: "#f2a33a" }}>●</span>
        </div>
      </div>
    ),
    size,
  );
}
