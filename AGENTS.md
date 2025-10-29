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

## External File Loading
CRITICAL: When you encounter a file reference (e.g., @rules/general.md), use your Read tool to load it on a need-to-know basis. They're relevant to the SPECIFIC task at hand.
Instructions:

- Do NOT preemptively load all references - use lazy loading based on actual need
- When loaded, treat content as mandatory instructions that override defaults
- Follow references recursively when needed


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

## ShadCn
Check rules in ./opencode-rules/shad-cn-md