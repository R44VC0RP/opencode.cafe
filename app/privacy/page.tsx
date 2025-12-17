import { Header } from "@/components/header"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Header />

      {/* Hero */}
      <section className="border-b border-[var(--color-border-weak)] px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <h1 className="text-2xl font-semibold text-[var(--color-text-strong)]">
            Privacy Policy
          </h1>
          <p className="mt-1 text-[var(--color-text)]">
            Last updated: December 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <div className="prose prose-sm max-w-none">
            <div className="flex flex-col gap-8">
              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  1. Information We Collect
                </h2>
                <div className="flex flex-col gap-4 text-sm leading-relaxed text-[var(--color-text)]">
                  <div>
                    <h3 className="mb-2 font-medium text-[var(--color-text-strong)]">Account Information</h3>
                    <p>
                      When you create an account, we collect your name, email address, and profile 
                      information provided through our authentication provider (Clerk).
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-medium text-[var(--color-text-strong)]">Extension Submissions</h3>
                    <p>
                      When you submit an extension, we collect the information you provide including 
                      extension name, description, repository URL, and installation instructions.
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-medium text-[var(--color-text-strong)]">Usage Data</h3>
                    <p>
                      We collect anonymous usage data to improve the Service, including pages visited 
                      and general interaction patterns.
                    </p>
                  </div>
                </div>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  2. How We Use Your Information
                </h2>
                <div className="flex flex-col gap-2 text-sm leading-relaxed text-[var(--color-text)]">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Provide and maintain the Service</li>
                    <li>Process and display your extension submissions</li>
                    <li>Communicate with you about your submissions</li>
                    <li>Improve and optimize the Service</li>
                    <li>Detect and prevent abuse or fraudulent activity</li>
                  </ul>
                </div>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  3. Information Sharing
                </h2>
                <div className="flex flex-col gap-2 text-sm leading-relaxed text-[var(--color-text)]">
                  <p>We do not sell your personal information. We may share information:</p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>
                      <strong>Publicly:</strong> Your name and extension information are displayed 
                      publicly on approved submissions
                    </li>
                    <li>
                      <strong>Service Providers:</strong> With third-party services that help us 
                      operate the platform (Clerk for authentication, Convex for database)
                    </li>
                    <li>
                      <strong>Legal Requirements:</strong> When required by law or to protect rights 
                      and safety
                    </li>
                  </ul>
                </div>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  4. Data Security
                </h2>
                <p className="text-sm leading-relaxed text-[var(--color-text)]">
                  We implement appropriate security measures to protect your information. However, 
                  no method of transmission over the Internet is 100% secure. We use industry-standard 
                  encryption and secure hosting providers.
                </p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  5. Your Rights
                </h2>
                <div className="flex flex-col gap-2 text-sm leading-relaxed text-[var(--color-text)]">
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Delete your account and associated data</li>
                    <li>Export your data</li>
                  </ul>
                  <p className="mt-2">
                    To exercise these rights, please contact us through our GitHub repository.
                  </p>
                </div>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  6. Cookies and Tracking
                </h2>
                <p className="text-sm leading-relaxed text-[var(--color-text)]">
                  We use essential cookies for authentication and session management. We may use 
                  anonymous analytics to understand how the Service is used. You can control cookie 
                  settings through your browser.
                </p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  7. Third-Party Services
                </h2>
                <div className="flex flex-col gap-2 text-sm leading-relaxed text-[var(--color-text)]">
                  <p>We use the following third-party services:</p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>
                      <strong>Clerk:</strong> For authentication and user management
                    </li>
                    <li>
                      <strong>Convex:</strong> For database and backend services
                    </li>
                    <li>
                      <strong>Vercel:</strong> For hosting
                    </li>
                  </ul>
                  <p className="mt-2">
                    Each of these services has their own privacy policies that govern their handling 
                    of your data.
                  </p>
                </div>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  8. Children&apos;s Privacy
                </h2>
                <p className="text-sm leading-relaxed text-[var(--color-text)]">
                  The Service is not intended for users under 13 years of age. We do not knowingly 
                  collect personal information from children under 13.
                </p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  9. Changes to This Policy
                </h2>
                <p className="text-sm leading-relaxed text-[var(--color-text)]">
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  significant changes by posting the new policy on this page.
                </p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  10. Contact Us
                </h2>
                <p className="text-sm leading-relaxed text-[var(--color-text)]">
                  For questions about this Privacy Policy, please visit our{" "}
                  <a 
                    href="https://github.com/sst/opencode" 
                    className="text-[var(--color-text-strong)] underline underline-offset-2"
                  >
                    GitHub repository
                  </a>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
