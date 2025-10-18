# Financial Dashboard - Replit Project

## Overview
This is a Next.js 15 financial dashboard application featuring account management, transaction tracking, and event planning. The app uses React 19, TypeScript, and Tailwind CSS with a comprehensive UI component library.

## Recent Changes
### October 18, 2025
- ✅ Created reusable Wizard component for multi-step forms
- ✅ Refactored CreateLeaseWizard to use new Wizard component
- ✅ Improved code organization and separation of concerns

### October 17, 2025
- ✅ Migrated from Vercel to Replit
- ✅ Configured Next.js to bind to 0.0.0.0:5000 for Replit compatibility
- ✅ Updated next.config.mjs with allowedDevOrigins for Replit environment
- ✅ Configured deployment settings for autoscale deployment
- ✅ Cleaned and reinstalled dependencies using npm

## Project Architecture

### Tech Stack
- **Framework**: Next.js 15.5.6 (App Router)
- **Runtime**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI primitives + custom components
- **Package Manager**: npm (package-lock.json present)

### Directory Structure
```
├── app/                    # Next.js app router pages
│   ├── dashboard/         # Dashboard page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── kokonutui/        # Custom dashboard components
│   ├── ui/               # Reusable UI components
│   └── theme-*.tsx       # Theme management
├── lib/                  # Utility functions
├── public/              # Static assets
└── styles/             # Additional styles
```

### Key Features
- Account management with balance tracking
- Transaction history and categorization
- Event planning and scheduling
- Lease contract creation with multi-step wizard
- Dark/light theme support
- Responsive dashboard layout

### Reusable Components
- **Wizard** (`components/ui/wizard.tsx`): A flexible multi-step form component with:
  - Step progress indicator
  - Navigation controls (Next/Previous/Submit)
  - Customizable button text and behavior
  - Support for validation via `canGoNext`/`canGoPrevious` props
  - Flexible rendering via `WizardStepContent` wrapper

## Development

### Running Locally
The project is configured to run automatically via the "Server" workflow:
```bash
npm run dev
```
This starts the Next.js development server on port 5000.

### Build for Production
```bash
npm run build
npm start
```

## Deployment
Configured for Replit autoscale deployment:
- Build command: `npm run build`
- Start command: `npm start`
- Deployment type: Autoscale (stateless web app)

## Configuration Notes
- Server binds to 0.0.0.0:5000 for Replit environment
- Image optimization is disabled (unoptimized: true)
- ESLint and TypeScript errors ignored during builds
- allowedDevOrigins configured for *.replit.dev domains
