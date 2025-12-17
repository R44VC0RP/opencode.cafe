import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface ExtensionApprovedProps {
  authorName: string
  extensionName: string
  productId: string
}

export function ExtensionApproved({
  authorName = "Developer",
  extensionName = "My Extension",
  productId = "my-extension",
}: ExtensionApprovedProps) {
  const extensionUrl = `https://opencode.cafe/plugin/${productId}`

  return (
    <Html>
      <Head />
      <Preview>Your extension &quot;{extensionName}&quot; has been approved</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Img
              src="https://opencode.cafe/opencode_cafe_email.png"
              width="150"
              height="17"
              alt="opencode.cafe"
            />
          </Section>

          <Heading style={heading}>Extension Approved</Heading>

          <Text style={text}>Hi {authorName},</Text>

          <Text style={text}>
            Great news! Your extension <strong>{extensionName}</strong> has been
            reviewed and approved. It&apos;s now live on opencode.cafe.
          </Text>

          <Section style={buttonSection}>
            <Link href={extensionUrl} style={button}>
              View Your Extension
            </Link>
          </Section>

          <Text style={textMuted}>
            Direct link:{" "}
            <Link href={extensionUrl} style={link}>
              {extensionUrl}
            </Link>
          </Text>

          <Section style={footer}>
            <Text style={footerText}>
              Thanks for contributing to the OpenCode community.
            </Text>
            <Text style={footerText}>
              <Link href="https://opencode.cafe" style={link}>
                opencode.cafe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default ExtensionApproved

// Styles - minimal, monospace-inspired
const main = {
  backgroundColor: "#131111",
  fontFamily:
    "'IBM Plex Mono', 'Menlo', 'Monaco', 'Courier New', monospace",
}

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "560px",
}

const logoSection = {
  marginBottom: "32px",
}

const heading = {
  color: "#F1ECEC",
  fontSize: "24px",
  fontWeight: "600",
  margin: "0 0 24px",
}

const text = {
  color: "#B7B1B1",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "0 0 16px",
}

const textMuted = {
  color: "#6B6666",
  fontSize: "12px",
  lineHeight: "20px",
  margin: "16px 0 0",
}

const buttonSection = {
  margin: "32px 0",
}

const button = {
  backgroundColor: "#F1ECEC",
  borderRadius: "4px",
  color: "#131111",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "500",
  padding: "12px 24px",
  textDecoration: "none",
}

const link = {
  color: "#F1ECEC",
  textDecoration: "underline",
}

const footer = {
  borderTop: "1px solid #2A2626",
  marginTop: "32px",
  paddingTop: "24px",
}

const footerText = {
  color: "#6B6666",
  fontSize: "12px",
  lineHeight: "20px",
  margin: "0 0 8px",
}
