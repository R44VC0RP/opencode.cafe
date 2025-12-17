import { Header } from "@/components/header"

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Header />

      {/* Hero */}
      <section className="border-b border-[var(--color-border-weak)] px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <h1 className="text-2xl font-semibold text-[var(--color-text-strong)]">
            Terms of Service
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
                  1. Acceptance of Terms
                </h2>
                <p className="text-sm leading-relaxed text-[var(--color-text)]">
                  By accessing and using opencode.cafe (&quot;the Service&quot;), you agree to be bound by these 
                  Terms of Service. If you do not agree to these terms, please do not use the Service.
                </p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  2. Description of Service
                </h2>
                <p className="text-sm leading-relaxed text-[var(--color-text)]">
                  opencode.cafe is a community marketplace for discovering and sharing extensions, plugins, 
                  and tools for OpenCode. Users can browse, submit, and manage extensions.
                </p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  3. User Accounts
                </h2>
                <div className="flex flex-col gap-2 text-sm leading-relaxed text-[var(--color-text)]">
                  <p>To submit extensions, you must create an account. You agree to:</p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Accept responsibility for all activities under your account</li>
                    <li>Notify us immediately of any unauthorized use</li>
                  </ul>
                </div>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  4. User Content
                </h2>
                <div className="flex flex-col gap-2 text-sm leading-relaxed text-[var(--color-text)]">
                  <p>When submitting extensions, you represent and warrant that:</p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>You own or have the necessary rights to the content</li>
                    <li>The content does not infringe on any third-party rights</li>
                    <li>The content does not contain malicious code or harmful material</li>
                    <li>The content complies with our Submission Guidelines</li>
                  </ul>
                  <p className="mt-2">
                    You retain ownership of your content but grant us a license to display, distribute, 
                    and promote your submissions on the Service.
                  </p>
                </div>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  5. Prohibited Conduct
                </h2>
                <div className="flex flex-col gap-2 text-sm leading-relaxed text-[var(--color-text)]">
                  <p>You agree not to:</p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Submit malware, spyware, or malicious code</li>
                    <li>Impersonate others or misrepresent your affiliation</li>
                    <li>Violate intellectual property rights</li>
                    <li>Spam or abuse the submission system</li>
                    <li>Attempt to circumvent security measures</li>
                    <li>Use the Service for illegal purposes</li>
                  </ul>
                </div>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  6. Moderation and Removal
                </h2>
                <p className="text-sm leading-relaxed text-[var(--color-text)]">
                  We reserve the right to review, approve, reject, or remove any content at our discretion. 
                  We may suspend or terminate accounts that violate these terms or our guidelines.
                </p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  7. Disclaimer of Warranties
                </h2>
                <p className="text-sm leading-relaxed text-[var(--color-text)]">
                  The Service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee 
                  the quality, safety, or functionality of any extensions listed on the Service. Users 
                  download and use extensions at their own risk.
                </p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  8. Limitation of Liability
                </h2>
                <p className="text-sm leading-relaxed text-[var(--color-text)]">
                  To the maximum extent permitted by law, we shall not be liable for any indirect, 
                  incidental, special, consequential, or punitive damages arising from your use of 
                  the Service or any extensions obtained through it.
                </p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  9. Changes to Terms
                </h2>
                <p className="text-sm leading-relaxed text-[var(--color-text)]">
                  We may update these terms from time to time. Continued use of the Service after 
                  changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  10. Contact
                </h2>
                <p className="text-sm leading-relaxed text-[var(--color-text)]">
                  For questions about these Terms of Service, please visit our{" "}
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
