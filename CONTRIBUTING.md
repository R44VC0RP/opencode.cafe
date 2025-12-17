# Contributing to opencode.cafe

Thank you for your interest in contributing to opencode.cafe! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/opencode.cafe.git
   cd opencode.cafe
   ```
3. **Install dependencies**:
   ```bash
   bun install
   ```
4. **Set up environment variables** - copy `.env.example` to `.env.local` and fill in your credentials
5. **Start the development server**:
   ```bash
   bun run dev
   ```

## Development Workflow

1. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Run the linter:
   ```bash
   bun run lint
   ```
4. Test your changes locally
5. Commit your changes with a clear message
6. Push to your fork and create a Pull Request

## Code Style Guidelines

### General

- Use TypeScript for all new code
- 2-space indentation
- Double quotes for strings
- Semicolons required
- Trailing commas in multi-line structures

### Imports

- Use `import type { }` for type-only imports
- Use the `@/*` path alias for local imports:
  ```tsx
  import { Button } from "@/components/ui/button"
  import type { ExtensionType } from "@/lib/constants"
  ```

### Components

- Use function declarations for components:
  ```tsx
  export default function MyComponent() {
    // ...
  }
  ```
- React Server Components by default; add `"use client"` only when needed
- Use `Readonly<>` for component props

### Naming Conventions

- **Components**: PascalCase (`CommentCard.tsx`)
- **Files**: kebab-case (`comment-card.tsx`)
- **Variables/functions**: camelCase
- **CSS variables**: kebab-case with `--color-` prefix

## Design System

This project uses the OpenCode design system. Key principles:

1. **Monospace Typography** - IBM Plex Mono throughout
2. **Warm Neutral Palette** - Use CSS variables, never hardcode colors
3. **Yellow-Green Accent** - For interactive elements and focus states
4. **Minimal Border Radius** - 3-8px radius

### Using Colors

Always use CSS custom properties:

```tsx
// Correct
<div className="bg-[var(--color-bg-weak)] text-[var(--color-text-strong)]">

// Incorrect - never hardcode colors
<div className="bg-gray-100 text-gray-900">
```

### Available Color Variables

- **Backgrounds**: `--color-bg`, `--color-bg-weak`, `--color-bg-strong`, `--color-bg-interactive`
- **Text**: `--color-text`, `--color-text-weak`, `--color-text-strong`, `--color-text-inverted`
- **Borders**: `--color-border`, `--color-border-weak`
- **Semantic**: `--color-danger`, `--color-success`, `--color-warning`

See `AGENTS.md` for complete design system documentation.

## Project Structure

```
app/                    # Next.js App Router pages
components/
  ui/                   # shadcn/ui components (customized)
  comments/             # Discussion/comment components
  header.tsx            # Site header
convex/                 # Convex backend
  schema.ts             # Database schema
  extensions.ts         # Extension operations
  comments.ts           # Comment operations
  admin.ts              # Admin operations
  email.ts              # Email actions
emails/                 # React Email templates
lib/                    # Utilities and constants
```

## Backend (Convex)

### Schema

The database schema is defined in `convex/schema.ts`. Main tables:

- `extensions` - Extension submissions
- `comments` - Discussion comments
- `commentLikes` - Comment likes
- `rateLimits` - Rate limiting records

### Adding New Functionality

1. Update the schema in `convex/schema.ts` if needed
2. Create queries/mutations in the appropriate file under `convex/`
3. Use the Convex hooks in your components:
   ```tsx
   import { useQuery, useMutation } from "convex/react"
   import { api } from "@/convex/_generated/api"

   const data = useQuery(api.extensions.listApproved)
   const submit = useMutation(api.extensions.submit)
   ```

## Email Templates

Email templates are in the `emails/` directory using React Email. To preview:

```bash
bun run email:dev
```

## Testing

Currently there's no test framework configured. Please manually test your changes:

1. Test the happy path
2. Test error states
3. Test on mobile viewport
4. Test in both light and dark mode

## Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Write a clear description of what your PR does
- Include screenshots for UI changes
- Make sure the linter passes
- Update documentation if needed

## Questions?

Feel free to open an issue for questions or discussions about contributing.
