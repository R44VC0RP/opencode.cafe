import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const alt = "opencode.cafe - Community extensions for OpenCode"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  const fontData = await readFile(
    join(process.cwd(), "assets/Inter-SemiBold.ttf")
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
          background: "#1a1412",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "Inter",
        }}
      >
        {/* Logo - opencode.cafe */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
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
          <div
            style={{
              fontSize: "14px",
              color: "#6b5d55",
              marginTop: "8px",
            }}
          >
            not affiliated with OpenCode
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 600,
            color: "#f5f0eb",
            lineHeight: 1.2,
            marginBottom: "24px",
          }}
        >
          Community Extensions
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "28px",
            color: "#a89080",
            lineHeight: 1.5,
          }}
        >
          A cozy corner for OpenCode extensions, plugins, and tools built by the community.
        </div>

        {/* Accent bar - warm coffee color */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "#c4a67a",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
          weight: 600,
        },
      ],
    }
  )
}
