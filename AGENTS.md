# Property Manager Dashboard - Agent Guidelines

## Build Commands
- `npm run build` - Build production bundle
- `npm run dev` - Start development server on port 5000
- `npm run start` - Start production server on port 5000
- `npm run lint` - Run ESLint (no custom config, uses Next.js defaults)

## Testing
No test framework configured. Add Jest/Playwright if needed.

## Code Style Guidelines

### Language & Naming
- **UI Text**: Spanish (components display Spanish text)
- **Code**: English (variables, functions, comments)
- **Components**: PascalCase (e.g., `CreatePropertyWizard`)
- **Functions/Variables**: camelCase (e.g., `handleAddUnit`)
- **Types**: PascalCase (e.g., `PropertyType`)

### Imports & Structure
- React imports first, then third-party libraries, then local imports
- Use path aliases: `@/components`, `@/lib`, `@/hooks`, `@/ui`
- Group related imports with blank lines

### TypeScript
- Strict mode enabled in tsconfig.json
- Use explicit types for component props and state
- Prefer interfaces over types for object shapes

### Styling
- Tailwind CSS with shadcn/ui components
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Follow design system tokens (primary, secondary, etc.)
- Dark mode support with `next-themes`

### Components
- Use shadcn/ui components from `@/components/ui`
- Implement variants with `class-variance-authority`
- Client components: Add `"use client"` directive
- Export default for page components

### Error Handling
- Use try/catch for async operations
- Display user-friendly error messages in Spanish
- Log errors to console for debugging

### File Organization
- Pages in `app/` directory (Next.js App Router)
- Components in `components/` (ui/, custom components)
- Hooks in `hooks/`
- Utilities in `lib/`