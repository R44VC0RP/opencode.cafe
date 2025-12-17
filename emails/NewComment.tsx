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

interface NewCommentProps {
  authorName: string
  extensionName: string
  productId: string
  commenterName: string
  commentPreview: string
}

export function NewComment({
  authorName = "Developer",
  extensionName = "My Extension",
  productId = "my-extension",
  commenterName = "Someone",
  commentPreview = "This is a great extension!",
}: NewCommentProps) {
  const extensionUrl = `https://opencode.cafe/plugin/${productId}`

  return (
    <Html>
      <Head />
      <Preview>New comment on {extensionName}</Preview>
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

          <Heading style={heading}>New Comment on Your Extension</Heading>

          <Text style={text}>Hey {authorName},</Text>

          <Text style={text}>
            <strong style={strongText}>{commenterName}</strong> left a comment on your extension{" "}
            <strong style={strongText}>{extensionName}</strong>.
          </Text>

          <Section style={commentSection}>
            <Text style={commentText}>&quot;{commentPreview}&quot;</Text>
          </Section>

          <Section style={buttonSection}>
            <Link href={extensionUrl} style={button}>
              View Discussion
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

export default NewComment

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

const strongText = {
  color: "#F1ECEC",
}

const commentSection = {
  backgroundColor: "#1E1B1B",
  borderRadius: "4px",
  borderLeft: "3px solid #3A3636",
  margin: "24px 0",
  padding: "16px",
}

const commentText = {
  color: "#B7B1B1",
  fontSize: "14px",
  fontStyle: "italic",
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
