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

interface NewSubmissionProps {
  authorName: string
  authorEmail: string
  extensionName: string
  productId: string
  extensionType: string
  description: string
}

export function NewSubmission({
  authorName = "Developer",
  authorEmail = "dev@example.com",
  extensionName = "My Extension",
  productId = "my-extension",
  extensionType = "plugin",
  description = "A great extension for OpenCode.",
}: NewSubmissionProps) {
  const adminUrl = "https://opencode.cafe/admin/pending"

  return (
    <Html>
      <Head />
      <Preview>New extension submission: {extensionName}</Preview>
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

          <Heading style={heading}>New Extension Submitted</Heading>

          <Text style={text}>
            A new extension has been submitted and is waiting for review.
          </Text>

          <Section style={detailsSection}>
            <Text style={detailRow}>
              <span style={detailLabel}>Extension:</span>{" "}
              <strong style={detailValue}>{extensionName}</strong>
            </Text>
            <Text style={detailRow}>
              <span style={detailLabel}>Product ID:</span>{" "}
              <code style={codeStyle}>{productId}</code>
            </Text>
            <Text style={detailRow}>
              <span style={detailLabel}>Type:</span>{" "}
              <span style={detailValue}>{extensionType}</span>
            </Text>
            <Text style={detailRow}>
              <span style={detailLabel}>Author:</span>{" "}
              <span style={detailValue}>{authorName}</span>
            </Text>
            <Text style={detailRow}>
              <span style={detailLabel}>Email:</span>{" "}
              <span style={detailValue}>{authorEmail}</span>
            </Text>
          </Section>

          <Section style={descriptionSection}>
            <Text style={descriptionLabel}>Description:</Text>
            <Text style={descriptionText}>{description}</Text>
          </Section>

          <Section style={buttonSection}>
            <Link href={adminUrl} style={button}>
              Review Submission
            </Link>
          </Section>

          <Section style={footer}>
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

export default NewSubmission

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

const detailsSection = {
  backgroundColor: "#1E1B1B",
  borderRadius: "4px",
  margin: "24px 0",
  padding: "16px",
}

const detailRow = {
  color: "#B7B1B1",
  fontSize: "14px",
  lineHeight: "28px",
  margin: "0",
}

const detailLabel = {
  color: "#6B6666",
}

const detailValue = {
  color: "#F1ECEC",
}

const codeStyle = {
  backgroundColor: "#131111",
  borderRadius: "3px",
  color: "#F1ECEC",
  fontSize: "13px",
  padding: "2px 6px",
}

const descriptionSection = {
  margin: "24px 0",
}

const descriptionLabel = {
  color: "#6B6666",
  fontSize: "12px",
  fontWeight: "500",
  margin: "0 0 8px",
  textTransform: "uppercase" as const,
}

const descriptionText = {
  color: "#B7B1B1",
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
  margin: "0",
}

const disclaimerText = {
  color: "#4A4646",
  fontSize: "10px",
  lineHeight: "16px",
  margin: "16px 0 0",
}
