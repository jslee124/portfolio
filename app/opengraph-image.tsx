import { ImageResponse } from "next/og";

export const alt = "Mori — Backend systems, AI agents, developer tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#101210",
        color: "#f0f2ed",
        padding: "85px",
      }}
    >
      <div
        style={{
          display: "flex",
          color: "#a8c5ac",
          fontSize: 20,
          letterSpacing: 4,
          marginBottom: 36,
        }}
      >
        MORI / SOFTWARE ENGINEER
      </div>
      <div style={{ display: "flex", fontSize: 76, letterSpacing: -3 }}>
        Building the systems
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 76,
          letterSpacing: -3,
          color: "#959c92",
        }}
      >
        behind the interface.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 25,
          color: "#a3aaa0",
          marginTop: 42,
        }}
      >
        Backend engineering · AI agents · Developer tools
      </div>
    </div>,
    size,
  );
}
