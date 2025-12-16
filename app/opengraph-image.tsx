import { ImageResponse } from "next/og"

export const alt = "opencode.cafe - Extensions & plugins for OpenCode"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
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
          fontFamily: "monospace",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <svg
            width="234"
            height="42"
            viewBox="0 0 234 42"
            fill="none"
          >
            <path d="M18 30H6V18H18V30Z" fill="#4B4646" />
            <path d="M18 12H6V30H18V12ZM24 36H0V6H24V36Z" fill="#B7B1B1" />
            <path d="M48 30H36V18H48V30Z" fill="#4B4646" />
            <path d="M36 30H48V12H36V30ZM54 36H36V42H30V6H54V36Z" fill="#B7B1B1" />
            <path d="M84 24V30H66V24H84Z" fill="#4B4646" />
            <path d="M84 24H66V30H84V36H60V6H84V24ZM66 18H78V12H66V18Z" fill="#B7B1B1" />
            <path d="M108 36H96V18H108V36Z" fill="#4B4646" />
            <path d="M108 12H96V36H90V6H108V12ZM114 36H108V12H114V36Z" fill="#B7B1B1" />
            <path d="M144 30H126V18H144V30Z" fill="#4B4646" />
            <path d="M144 12H126V30H144V36H120V6H144V12Z" fill="#F1ECEC" />
            <path d="M168 30H156V18H168V30Z" fill="#4B4646" />
            <path d="M168 12H156V30H168V12ZM174 36H150V6H174V36Z" fill="#F1ECEC" />
            <path d="M198 30H186V18H198V30Z" fill="#4B4646" />
            <path d="M198 12H186V30H198V12ZM204 36H180V6H198V0H204V36Z" fill="#F1ECEC" />
            <path d="M234 24V30H216V24H234Z" fill="#4B4646" />
            <path d="M216 12V18H228V12H216ZM234 24H216V30H234V36H210V6H234V24Z" fill="#F1ECEC" />
          </svg>
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
    }
  )
}
