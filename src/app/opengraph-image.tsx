import { ImageResponse } from "next/og";
import { cvContent } from "@/data/cv-content";

/**
 * Open Graph image — generated at build time from the canonical CV data,
 * so link previews (LinkedIn, X, Slack…) always match the site content.
 */

export const runtime = "edge";
export const alt = `${cvContent.profile.name} — ${cvContent.profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { name, headline, location } = cvContent.profile;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#14151f",
          backgroundImage: "radial-gradient(circle at 1px 1px, #262940 2px, transparent 0)",
          backgroundSize: "48px 48px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#8b9cf7",
            fontSize: "24px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          {location}
        </div>
        <div
          style={{
            marginTop: "24px",
            fontSize: "88px",
            fontWeight: 700,
            lineHeight: 1.05,
            backgroundImage: "linear-gradient(90deg, #8b9cf7, #7dd3fc)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {name}
        </div>
        <div style={{ marginTop: "20px", fontSize: "40px", color: "#e8e9f0" }}>
          {headline}
        </div>
        <div
          style={{
            marginTop: "56px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#9ba0b8",
            fontSize: "26px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#4ade80",
            }}
          />
          Open to opportunities
        </div>
      </div>
    ),
    size,
  );
}
