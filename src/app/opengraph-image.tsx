import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Taminul Islam: CSE student who solves problems, builds web apps and teaches others to code";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social preview card (LinkedIn, X, Facebook, WhatsApp). English only: the built-in font has no Bengali glyphs.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b1020",
          color: "#e6edf7",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#38bdf8" }}>CSE · University of Barishal</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 700 }}>{site.name}</div>
          <div style={{ display: "flex", fontSize: 40, color: "#9aa8c2", marginTop: 24, lineHeight: 1.3 }}>
            {site.tagline}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#9aa8c2" }}>
          Open to internships · mentoring · collaboration
        </div>
      </div>
    ),
    { ...size },
  );
}
