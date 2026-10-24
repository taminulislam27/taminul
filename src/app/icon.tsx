import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Favicon: a "T" monogram in the site's dark and sky-blue colors.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b1020",
          color: "#38bdf8",
          fontSize: 22,
          fontWeight: 700,
          borderRadius: 6,
        }}
      >
        T
      </div>
    ),
    { ...size },
  );
}
