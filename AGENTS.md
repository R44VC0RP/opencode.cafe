# AGENTS.md

## Build & Development Commands
- `bun install` - Install dependencies
- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run lint` - Run ESLint
- No test framework configured

## Code Style Guidelines
- **Imports**: Use `import type { }` for type-only imports; use `@/*` path alias for local imports
- **Formatting**: 2-space indentation, double quotes, semicolons, trailing commas
- **TypeScript**: Strict mode enabled; use `Readonly<>` for props; explicit type annotations for exports
- **Naming**: PascalCase for components, camelCase for variables, kebab-case for CSS variables
- **Components**: Function declarations (`export default function Name()`), React Server Components by default
- **Styling**: Tailwind CSS v4 utility classes, dark mode via `dark:` prefix or `@media (prefers-color-scheme: dark)`

## Error Handling
- Let errors bubble up in Server Components for error boundaries
- Use try/catch in Server Actions and API routes

---

## OpenCode Design System

This project uses the OpenCode design system - a monospace-first, minimal design system inspired by terminal aesthetics.

### Design Principles

1. **Monospace Typography** - The entire UI uses monospace fonts (JetBrains Mono) for a developer/terminal aesthetic
2. **Warm Neutral Palette** - Warm grays with low saturation (HSL hue 0-30)
3. **Yellow-Green Accent** - `hsl(62, 84%, 88%)` for interactive highlights, focus states, and text selection
4. **Minimal Border Radius** - Sharp, precise edges (3-8px radius)
5. **System-Aware Dark Mode** - Uses `@media (prefers-color-scheme: dark)`

### Color Variables

Always use CSS custom properties for colors. Never hardcode color values.

```css
/* Backgrounds */
--color-bg              /* Main background */
--color-bg-weak         /* Secondary/muted background */
--color-bg-weak-hover   /* Hover state for weak backgrounds */
--color-bg-strong       /* Strong/primary background (buttons, badges) */
--color-bg-strong-hover /* Hover state for strong backgrounds */
--color-bg-interactive  /* Yellow-green accent for focus/selection */

/* Text */
--color-text            /* Default body text */
--color-text-weak       /* Secondary/muted text */
--color-text-weaker     /* Tertiary/placeholder text */
--color-text-strong     /* Headings, emphasized text */
--color-text-inverted   /* Text on dark backgrounds */

/* Borders */
--color-border          /* Default borders */
--color-border-weak     /* Subtle borders */

/* Semantic */
--color-danger          /* Error states */
--color-success         /* Success states */
--color-warning         /* Warning states */
```

### Using Colors in Tailwind Classes

Use CSS variable syntax in Tailwind classes:

```tsx
// Correct
<div className="bg-[var(--color-bg-weak)] text-[var(--color-text-strong)]">

// Incorrect - don't hardcode colors
<div className="bg-gray-100 text-gray-900">
```

### Component Patterns

#### Buttons
- Default: Dark background (`bg-strong`), inverted text
- Secondary: Weak background, strong text
- Outline: Border only, transparent background
- Ghost: No background, muted text
- All buttons use `active:scale-[0.98]` for tactile feedback

#### Cards
- Border: `border-[var(--color-border-weak)]`
- Background: `bg-[var(--color-bg)]`
- Padding: `p-6`
- Border radius: `rounded-md`

#### Form Inputs
- Border: `border-[var(--color-border)]`
- Background: `bg-[var(--color-bg)]`
- Focus ring: Yellow-green accent (`ring-[var(--color-bg-interactive)]`)
- Placeholder: `text-[var(--color-text-weak)]`

#### Focus States
- Use the yellow-green interactive color for focus rings
- Light mode: `focus-visible:ring-[3px] focus-visible:ring-[var(--color-bg-interactive)]`
- Dark mode: `dark:focus-visible:border-[var(--color-bg-interactive)]`

### Spacing

Use the spacing scale for consistent spacing:
- `0.5rem` (8px) - Tight spacing
- `0.75rem` (12px) - Default padding
- `1rem` (16px) - Standard spacing
- `1.5rem` (24px) - Section spacing
- `2rem+` (32px+) - Large gaps

### Layout Constants

```css
--padding: 5rem;              /* Desktop horizontal padding */
--vertical-padding: 4rem;     /* Desktop vertical padding */
--container-max-width: 67.5rem; /* 1080px max container width */

/* Mobile (< 60rem) */
--padding: 1.5rem;
--vertical-padding: 3rem;
```

### Page Structure

All pages should follow this consistent structure:

```tsx
export default function ExamplePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Header />

      {/* Hero/Title Section */}
      <section className="border-b border-[var(--color-border-weak)] px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          <h1 className="text-2xl font-semibold text-[var(--color-text-strong)]">
            Page Title
          </h1>
          <p className="mt-1 text-[var(--color-text)]">Optional description</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-[var(--padding)] py-[var(--vertical-padding)]">
        <div className="mx-auto max-w-[67.5rem]">
          {/* Page content here */}
        </div>
      </main>
    </div>
  )
}
```

Key points:
- **Hero section**: Use `<section>` with `border-b border-[var(--color-border-weak)]` and padding via CSS variables
- **Main content**: Use `<main>` with same horizontal padding, content inside `mx-auto max-w-[67.5rem]`
- **Consistent widths**: Always use `max-w-[67.5rem]` (1080px) for content containers
- **Error/empty states**: Should follow the same structure with hero + main sections

### Transitions

Use consistent transition timing:
- Duration: `150ms` or `200ms`
- Easing: `ease` or `ease-in-out`
- Example: `transition-all duration-150 ease-in-out`

### shadcn/ui Components

This project uses shadcn/ui components customized for the OpenCode design system. Components are in `@/components/ui/`:

- `button` - Buttons with variants (default, secondary, outline, ghost, destructive, link)
- `card` - Content containers with header, content, and footer
- `input` - Text inputs with focus states
- `textarea` - Multi-line text inputs
- `label` - Form labels
- `select` - Dropdown selects
- `dialog` - Modal dialogs
- `dropdown-menu` - Contextual menus
- `tabs` - Tabbed interfaces
- `accordion` - Collapsible content sections (FAQ)
- `badge` - Status indicators
- `alert` - Notification messages
- `separator` - Horizontal/vertical dividers

### Example Usage

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Extension</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="my-extension" />
        </div>
        <Button>Create</Button>
      </CardContent>
    </Card>
  )
}
```

### Design System Demo

Visit `/design-system` to see all components in action.
