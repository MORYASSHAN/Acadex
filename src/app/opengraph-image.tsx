import { ImageResponse } from "next/og";

export const alt = "Acadex: a smarter way to run academic operations";
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
          padding: 80,
          background: "linear-gradient(180deg,#dcdcdb 0%,#f7f7f6 70%)",
          color: "#111111",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>Acadex</div>
        <div style={{ display: "flex", fontSize: 92, letterSpacing: -4, lineHeight: 1, maxWidth: 980 }}>
          A smarter way to run academic operations
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#6e6e6e" }}>
          Attendance · Communication · Scheduling · Resources · Academic workflows
        </div>
      </div>
    ),
    size,
  );
}
