# opencode.cafe

A marketplace for OpenCode extensions and plugins. Built with Next.js 16 and the OpenCode design system.

## Getting Started

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Design System

This project uses the OpenCode design system - a monospace-first, minimal design system inspired by terminal aesthetics.

**Key features:**
- Monospace typography (IBM Plex Mono)
- Warm neutral color palette
- Yellow-green accent (`hsl(62, 84%, 88%)`) for interactive elements
- System-aware dark mode

Visit `/design-system` to see all components in action.

## Project Structure

```
app/
  page.tsx              # Homepage (extension marketplace)
  design-system/        # Design system demo page
  globals.css           # Design system CSS variables
components/
  ui/                   # shadcn/ui components (customized)
```

## Tech Stack

- [Next.js 16](https://nextjs.org) - React framework
- [Tailwind CSS v4](https://tailwindcss.com) - Styling
- [shadcn/ui](https://ui.shadcn.com) - Component library
- [Bun](https://bun.sh) - Package manager & runtime
