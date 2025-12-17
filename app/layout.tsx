import type { Metadata } from "next";
import Script from "next/script";
import { IBM_Plex_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://opencode.cafe"),
  title: "opencode.cafe - Extensions & Plugins for OpenCode",
  description:
    "Discover community-built extensions and plugins to enhance your OpenCode experience. Share your own creations and collaborate with developers worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexMono.variable} antialiased`}>
        <ClerkProvider appearance={{ baseTheme: dark }}>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>
        <Script
          strategy="afterInteractive"
          data-website-id="dfid_vUdAIIWNAoRCj3VHYIZ7g"
          data-domain="opencode.cafe"
          src="/js/script.js"
        />
      </body>
    </html>
  );
}
