import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { getEssay } from "@/lib/essays";
import { formatDate } from "@/lib/format";

export const alt = "Essay";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function EssayOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = await getEssay(slug);
  const title = essay?.title ?? "Essay";
  const date = essay ? formatDate(essay.date) : "";

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
          {`ESSAY · ${date.toUpperCase()}`}
        </div>
        <div style={{ display: "flex", fontSize: title.length > 40 ? 72 : 96, lineHeight: 1.05 }}>
          {title}
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
          <span>{site.name.toUpperCase()}</span>
          <span style={{ color: "#f2a33a" }}>●</span>
        </div>
      </div>
    ),
    size,
  );
}
