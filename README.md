# opencode.cafe

A community marketplace for [OpenCode](https://opencode.ai) extensions and plugins. Browse, discover, and share MCP servers, slash commands, hooks, themes, and more.

**Live at [opencode.cafe](https://opencode.cafe)**

## Features

- Browse and search OpenCode extensions
- Submit your own extensions for review
- Discussion threads with comments and likes
- User accounts with Clerk authentication
- Admin moderation dashboard
- Email notifications for submissions and comments

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Database**: [Convex](https://convex.dev) (real-time backend)
- **Auth**: [Clerk](https://clerk.com)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Components**: [shadcn/ui](https://ui.shadcn.com) (customized)
- **Email**: [React Email](https://react.email) + Inbound
- **Runtime**: [Bun](https://bun.sh)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed
- [Convex](https://convex.dev) account
- [Clerk](https://clerk.com) account

### Installation

```bash
# Clone the repository
git clone https://github.com/R44VC0RP/opencode.cafe.git
cd opencode.cafe

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Fill in your Convex and Clerk credentials

# Start the development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Variables

```env
# Convex
CONVEX_DEPLOYMENT=your-deployment
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
CLERK_JWT_ISSUER_DOMAIN=https://your-clerk-domain

# Email (optional)
INBOUND_API_KEY=your-api-key
```

## Project Structure

```
app/
  page.tsx              # Homepage (extension marketplace)
  search/               # Extension search page
  plugin/[productId]/   # Extension detail page with discussions
  submit/               # Extension submission form
  account/              # User account & submissions
  admin/                # Admin moderation dashboard
  design-system/        # Design system demo page

components/
  ui/                   # shadcn/ui components (customized)
  comments/             # Comment/discussion components
  header.tsx            # Site header

convex/
  schema.ts             # Database schema
  extensions.ts         # Extension CRUD operations
  comments.ts           # Comment/discussion operations
  admin.ts              # Admin operations
  email.ts              # Email sending actions

emails/                 # React Email templates
lib/                    # Utilities and constants
```

## Design System

This project uses the OpenCode design system - a monospace-first, minimal design system inspired by terminal aesthetics.

**Key features:**
- Monospace typography (JetBrains Mono)
- Warm neutral color palette
- Yellow-green accent (`hsl(62, 84%, 88%)`) for interactive elements
- System-aware dark mode

## Disclaimer

This is a community project and is not affiliated with, endorsed by, or sponsored by [OpenCode](https://opencode.ai) or [SST](https://sst.dev).

Visit `/design-system` to see all components in action. See `AGENTS.md` for detailed design system documentation.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT
