import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Mori — Backend systems, AI agents, developer tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const font = await readFile(
    join(
      process.cwd(),
      "node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff",
    ),
  );
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#10110e",
        color: "#f1eedf",
        padding: "36px 60px",
        fontFamily: "Plex Mono",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#aaa99c",
          fontSize: 15,
        }}
      >
        <span>{">_ MORI'S WORKING DIRECTORY"}</span>
        <span>FORGE / KESTRI</span>
      </div>
      <div
        style={{
          display: "flex",
          color: "#ffbe4f",
          fontSize: 270,
          letterSpacing: -20,
          lineHeight: 1.2,
          marginLeft: -14,
        }}
      >
        MORI
      </div>
      <div style={{ display: "flex", fontSize: 30, marginTop: 12 }}>
        I build the systems behind the software.
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #383b2d",
          paddingTop: 24,
          marginTop: 40,
          color: "#ffbe4f",
          fontSize: 18,
        }}
      >
        Backend systems. AI agents. Developer tools.
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Plex Mono", data: font, weight: 400, style: "normal" }],
    },
  );
}
