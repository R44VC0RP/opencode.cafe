import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"

export default function SubmissionGuidelines() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Header />

      {/* Hero */}
      <section className="border-b border-[var(--color-border-weak)] px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <h1 className="text-2xl font-semibold text-[var(--color-text-strong)]">
            Submission Guidelines
          </h1>
          <p className="mt-1 text-[var(--color-text)]">
            Everything you need to know about submitting extensions to opencode.cafe
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <div className="prose prose-sm max-w-none">
            <div className="flex flex-col gap-8">
              {/* What We Accept */}
              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  What We Accept
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-4">
                    <h3 className="mb-2 font-medium text-[var(--color-text-strong)]">MCP Servers</h3>
                    <p className="text-sm text-[var(--color-text)]">
                      Model Context Protocol servers that extend AI capabilities with external data and tools.
                    </p>
                  </div>
                  <div className="rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-4">
                    <h3 className="mb-2 font-medium text-[var(--color-text-strong)]">Slash Commands</h3>
                    <p className="text-sm text-[var(--color-text)]">
                      Custom commands that can be triggered with / to perform specific actions.
                    </p>
                  </div>
                  <div className="rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-4">
                    <h3 className="mb-2 font-medium text-[var(--color-text-strong)]">Hooks</h3>
                    <p className="text-sm text-[var(--color-text)]">
                      Lifecycle hooks that automate tasks at specific points in the workflow.
                    </p>
                  </div>
                  <div className="rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-4">
                    <h3 className="mb-2 font-medium text-[var(--color-text-strong)]">Themes</h3>
                    <p className="text-sm text-[var(--color-text)]">
                      Visual themes and color schemes to customize the OpenCode interface.
                    </p>
                  </div>
                  <div className="rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-4">
                    <h3 className="mb-2 font-medium text-[var(--color-text-strong)]">Plugins</h3>
                    <p className="text-sm text-[var(--color-text)]">
                      General purpose plugins that add new functionality to OpenCode.
                    </p>
                  </div>
                  <div className="rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-4">
                    <h3 className="mb-2 font-medium text-[var(--color-text-strong)]">Tools</h3>
                    <p className="text-sm text-[var(--color-text)]">
                      Standalone tools and utilities that complement the OpenCode experience.
                    </p>
                  </div>
                </div>
              </section>

              {/* Requirements */}
              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  Requirements
                </h2>
                <div className="flex flex-col gap-4">
                  <div className="rounded border border-[var(--color-success)]/30 bg-[var(--color-success)]/5 p-4">
                    <h3 className="mb-3 font-medium text-[var(--color-text-strong)]">Must Have</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-[var(--color-text)]">
                      <li>A public repository (GitHub, GitLab, etc.) with source code</li>
                      <li>Clear and accurate description of what the extension does</li>
                      <li>Installation instructions that work</li>
                      <li>Be related to OpenCode in some way</li>
                      <li>No malicious code, malware, or harmful functionality</li>
                    </ul>
                  </div>
                  <div className="rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] p-4">
                    <h3 className="mb-3 font-medium text-[var(--color-text-strong)]">Recommended</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-[var(--color-text)]">
                      <li>A README with documentation</li>
                      <li>License file specifying usage terms</li>
                      <li>Examples or screenshots</li>
                      <li>Version information</li>
                      <li>Contact information for support</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Submission Tips */}
              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  Tips for a Great Submission
                </h2>
                <div className="flex flex-col gap-3 text-sm text-[var(--color-text)]">
                  <div className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[var(--color-bg-strong)] text-xs font-medium text-[var(--color-text-inverted)]">1</span>
                    <div>
                      <strong className="text-[var(--color-text-strong)]">Choose a clear name:</strong>{" "}
                      Pick a descriptive product ID and display name that clearly indicates what your extension does.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[var(--color-bg-strong)] text-xs font-medium text-[var(--color-text-inverted)]">2</span>
                    <div>
                      <strong className="text-[var(--color-text-strong)]">Write a compelling description:</strong>{" "}
                      Explain the problem your extension solves and why someone would want to use it.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[var(--color-bg-strong)] text-xs font-medium text-[var(--color-text-inverted)]">3</span>
                    <div>
                      <strong className="text-[var(--color-text-strong)]">Provide clear installation steps:</strong>{" "}
                      Use Markdown formatting to create easy-to-follow installation instructions with code blocks.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[var(--color-bg-strong)] text-xs font-medium text-[var(--color-text-inverted)]">4</span>
                    <div>
                      <strong className="text-[var(--color-text-strong)]">Use relevant tags:</strong>{" "}
                      Add tags that help users find your extension when searching.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[var(--color-bg-strong)] text-xs font-medium text-[var(--color-text-inverted)]">5</span>
                    <div>
                      <strong className="text-[var(--color-text-strong)]">Keep it updated:</strong>{" "}
                      Come back and update your submission if you make improvements or fix bugs.
                    </div>
                  </div>
                </div>
              </section>

              {/* Review Process */}
              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  Review Process
                </h2>
                <div className="flex flex-col gap-3 text-sm text-[var(--color-text)]">
                  <p>
                    All submissions go through a review process before being published. Here&apos;s what to expect:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 pl-4">
                    <li>Submit your extension through the submission form</li>
                    <li>Your submission enters the review queue</li>
                    <li>Our team reviews the submission for quality and compliance</li>
                    <li>You&apos;ll be notified of approval or rejection with feedback</li>
                    <li>If rejected, you can make changes and resubmit</li>
                  </ol>
                  <p className="mt-2">
                    Review times vary but we aim to review submissions within a few days.
                  </p>
                </div>
              </section>

              {/* What Gets Rejected */}
              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  Common Rejection Reasons
                </h2>
                <div className="rounded border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/5 p-4">
                  <ul className="list-disc list-inside space-y-2 text-sm text-[var(--color-text)]">
                    <li>Repository is private or inaccessible</li>
                    <li>Description is misleading or unclear</li>
                    <li>Installation instructions don&apos;t work</li>
                    <li>Extension is unrelated to OpenCode</li>
                    <li>Duplicate of an existing extension</li>
                    <li>Contains inappropriate content</li>
                    <li>Appears to be spam or low-effort</li>
                  </ul>
                </div>
              </section>

              {/* CTA */}
              <section className="flex flex-col items-center gap-4 rounded border border-[var(--color-border-weak)] bg-[var(--color-bg-weak)] py-8">
                <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
                  Ready to Submit?
                </h2>
                <p className="text-center text-sm text-[var(--color-text)]">
                  Share your extension with the OpenCode community.
                </p>
                <Link href="/submit">
                  <Button>Submit an Extension</Button>
                </Link>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
