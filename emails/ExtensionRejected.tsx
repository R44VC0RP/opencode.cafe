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

interface ExtensionRejectedProps {
  authorName: string
  extensionName: string
  productId: string
  rejectionReason: string
}

export function ExtensionRejected({
  authorName = "Developer",
  extensionName = "My Extension",
  productId = "my-extension",
  rejectionReason = "Please provide more details about your extension.",
}: ExtensionRejectedProps) {
  const editUrl = `https://opencode.cafe/submit/${productId}/edit`
  const guidelinesUrl = "https://opencode.cafe/guidelines"

  return (
    <Html>
      <Head />
      <Preview>Your extension &quot;{extensionName}&quot; needs changes</Preview>
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

          <Heading style={heading}>Extension Not Approved</Heading>

          <Text style={text}>Hi {authorName},</Text>

          <Text style={text}>
            Your extension <strong>{extensionName}</strong> was reviewed but
            wasn&apos;t approved at this time.
          </Text>

          <Section style={reasonSection}>
            <Text style={reasonLabel}>Reason:</Text>
            <Text style={reasonText}>{rejectionReason}</Text>
          </Section>

          <Text style={text}>
            You can update your extension and resubmit for review. Check out our{" "}
            <Link href={guidelinesUrl} style={link}>
              submission guidelines
            </Link>{" "}
            for tips on what we look for.
          </Text>

          <Section style={buttonSection}>
            <Link href={editUrl} style={button}>
              Edit & Resubmit
            </Link>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Questions? Visit our{" "}
              <Link href="https://github.com/R44VC0RP/opencode.cafe" style={link}>
                GitHub
              </Link>{" "}
              for support.
            </Text>
            <Text style={footerText}>
              <Link href="https://opencode.cafe" style={link}>
                opencode.cafe
              </Link>
            </Text>
            <Text style={disclaimerText}>
              This is a community project and is not affiliated with OpenCode or SST.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default ExtensionRejected

// Styles
const main = {
  backgroundColor: "#131111",
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
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

const reasonSection = {
  backgroundColor: "#1E1B1B",
  borderLeft: "3px solid #E5484D",
  borderRadius: "0 4px 4px 0",
  margin: "24px 0",
  padding: "16px",
}

const reasonLabel = {
  color: "#6B6666",
  fontSize: "12px",
  fontWeight: "500",
  margin: "0 0 8px",
  textTransform: "uppercase" as const,
}

const reasonText = {
  color: "#F1ECEC",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0",
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

const disclaimerText = {
  color: "#4A4646",
  fontSize: "10px",
  lineHeight: "16px",
  margin: "16px 0 0",
}
