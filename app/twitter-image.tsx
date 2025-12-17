import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const alt = "opencode.cafe - Extensions & plugins for OpenCode"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  const fontData = await readFile(
    join(process.cwd(), "assets/IBMPlexMono-SemiBold.ttf")
  )

  const logoData = await readFile(
    join(process.cwd(), "public/opencode_cafe_email.png")
  )
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 32,
          background: "#131111",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "IBM Plex Mono",
        }}
      >
        {/* Logo - opencode.cafe */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoBase64}
            width="300"
            height="35"
            alt="opencode.cafe"
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 600,
            color: "#F1ECEC",
            lineHeight: 1.2,
            marginBottom: "24px",
          }}
        >
          Extensions & plugins
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "32px",
            color: "#B7B1B1",
            lineHeight: 1.5,
          }}
        >
          Discover community-built extensions and plugins to enhance your OpenCode experience.
        </div>

        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "#E8F5A2",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "IBM Plex Mono",
          data: fontData,
          style: "normal",
          weight: 600,
        },
      ],
    }
  )
}
