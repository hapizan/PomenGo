# MechanicOnDemand Project Scaffolding (Mockup with shadcn/ui + PWA + Map Navigation + Flaticon)

## Goal
Create a fully functional mockup/demo of the MechanicOnDemand platform - a "Grab for Mechanics" service where customers can book mechanics with transparent pricing and repair video proof. The platform should demonstrate all core features through mockup views without requiring actual API connections, showcasing the complete user journey for customers, mechanics, workshops, and administrators.

## Output Format
- **Project Structure**: Complete Next.js 15 application with TypeScript
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **Styling**: Primary color #180092, white (#FFFFFF) for text/backgrounds, full dark mode support
- **Icons**: Flaticon icons throughout the application
- **Features**: Landing page, customer app, mechanic app, workshop dashboard, admin console
- **Special Features**: Animated map navigation (GIF-like mechanic travel visualization), PWA support
- **Data**: All views use mock data with simulated API delays for realistic UX
- **Code Quality**: TypeScript with proper typing, responsive design, accessible components

## Audience
- **Primary Audience**: Hackathon judges, potential investors, stakeholders evaluating the platform concept
- **Secondary Audience**: Developers who will extend the platform with real API integrations
- **User Personas**:
  - **Customers**: Need quick, transparent mechanic services with proof of work
  - **Mechanics**: Independent mechanics seeking flexible work opportunities
  - **Workshop Owners**: Managing multiple mechanics and job dispatch
  - **Administrators**: Platform oversight, verification, and dispute resolution
- **Use Case**: Demonstrate platform viability, user experience, and technical architecture for a hackathon submission

## Overview
Scaffold a complete Next.js 15 (App Router) project with TypeScript, Tailwind CSS, shadcn/ui components, PWA support, animated map navigation (GIF-like mechanic travel visualization), Flaticon icons, and mockup views (no API connections) for a mechanic-on-demand platform.

## Implementation Steps

### 1. Project Initialization
- Initialize Next.js 15 project with TypeScript and Tailwind CSS
- Configure `package.json` with dependencies:
  - Next.js 15, React, TypeScript, Tailwind
  - shadcn/ui dependencies (class-variance-authority, clsx, tailwind-merge, etc.)
  - next-pwa for PWA support
  - next-themes for dark mode support
  - @react-google-maps/api or react-leaflet for map integration
  - framer-motion for smooth animations
- Set up `tsconfig.json` and `tailwind.config.ts`
- Create `next.config.js` for Vercel deployment and PWA configuration
- Set up `components.json` for shadcn/ui configuration
- Add PWA configuration files (`public/manifest.json`, `public/icons/` for app icons)
- Set up Flaticon integration (download icons to `public/icons/flaticon/` or configure embedding)
- Create `.gitignore` with Next.js and environment patterns

### 2. shadcn/ui Setup & Theme Configuration
- Initialize shadcn/ui with `npx shadcn-ui@latest init`
- Configure `tailwind.config.ts` with custom color palette:
  - Primary color: #180092 (dark blue/purple)
  - Secondary colors: #FFFFFF (white) for text/backgrounds
  - Dark mode color variants
- Install core UI components: Button, Input, Card, Dialog, Select, Badge, Avatar, Tabs, Progress, Sheet, Form, Label, Textarea, etc.
- Create `components/ui/` directory with all shadcn components
- Configure `lib/utils.ts` with `cn()` utility for className merging
- Set up `app/theme-provider.tsx` using next-themes for dark mode support
- Configure shadcn/ui theme with primary color #180092 in `components.json`
- Create `components/theme-toggle.tsx` - Dark mode toggle button component

### 3. PWA Configuration
- Install `next-pwa` package
- Create `public/manifest.json` with app metadata, icons, theme colors, display mode
- Create app icons in `public/icons/` (192x192, 512x512, apple-touch-icon, favicon)
- Configure `next.config.js` with PWA plugin
- Add service worker registration in root layout
- Create `app/layout.tsx` with PWA meta tags (theme-color, apple-mobile-web-app-capable, etc.)

### 4. Flaticon Integration
- Create `components/icons/FlaticonIcon.tsx` - Wrapper component for Flaticon icons
- Download or configure Flaticon icons for:
  - Navigation icons (home, jobs, wallet, profile, etc.)
  - Feature icons (car, wrench, map, video, etc.)
  - Status icons (pending, completed, in-progress, etc.)
- Store icons in `public/icons/flaticon/` directory
- Create icon mapping in `lib/icon-map.ts` for easy icon usage

### 5. Type Definitions
- Create `types/job.ts` for job-related types (status enums, etc.)
- Create `types/user.ts` for user role types
- Create `types/mock-data.ts` for mock data structures
- Create `types/map.ts` for map-related types (coordinates, routes, etc.)

### 6. Mock Data & Services
- Create `lib/mock-data.ts` - Comprehensive mock data for cars, jobs, mechanics, quotes, workshops, checkpoints, locations (lat/lng coordinates)
- Create `lib/mock-services.ts` - Mock service functions that return mock data with simulated delays (simulate API calls)
- Create `lib/constants.ts` - App constants (job statuses, roles, service types, etc.)
- Create `lib/map-utils.ts` - Map utility functions for calculating routes, distances, animated path coordinates, interpolating positions along route

### 7. Map Navigation Component
- Create `components/job/MechanicMapNavigation.tsx` - Animated map component showing:
  - Mechanic's current position (animated marker)
  - Destination marker
  - Route polyline connecting mechanic to destination
  - GIF-like animation of mechanic traveling along route (using framer-motion or CSS animations)
  - Real-time position updates (mock location updates every 2-3 seconds)
  - Distance and ETA display
  - Map controls (zoom, center on mechanic)
- Use Google Maps or Leaflet for map rendering
- Implement smooth animation along route path

### 8. Landing Page
Create in `app/`:
- `page.tsx` - Landing page with hero section, features, how it works, testimonials, CTA
- Use shadcn/ui components for modern, responsive design
- Include navigation header and footer with Flaticon icons
- Add "Get Started" and "Login" buttons
- Create `components/landing/Hero.tsx` - Hero section component with Flaticon icons
- Create `components/landing/Features.tsx` - Features grid section with Flaticon icons
- Create `components/landing/HowItWorks.tsx` - How it works timeline with Flaticon icons
- Create `components/landing/Testimonials.tsx` - Testimonials carousel

### 9. Frontend Pages - Customer App
Create in `app/customer/`:
- `page.tsx` - Home/dashboard with mock job list, stats cards, quick actions (Flaticon icons)
- `cars/page.tsx` - Car profile management (mock car list, add/edit/delete actions with Flaticon icons)
- `cars/new/page.tsx` - Add new car form (mock submission with success feedback)
- `issue/page.tsx` - Issue report form (mock submission)
- `ai-check/page.tsx` - AI symptom checker (mock AI response with loading state)
- `job/[id]/page.tsx` - Job details with timeline, video viewer, quote display, and animated map navigation showing mechanic traveling to destination (mock data)
- `job/[id]/payment/page.tsx` - Payment page (mock payment flow)
- `layout.tsx` - Customer app layout with navigation sidebar/header using shadcn Sheet and Navigation components (Flaticon icons)

### 10. Frontend Pages - Mechanic App
Create in `app/mechanic/`:
- `dashboard/page.tsx` - Mechanic dashboard with mock stats, recent jobs, earnings summary (Flaticon icons)
- `jobs/page.tsx` - Job list with filters (mock job data, accept/reject actions with Flaticon icons)
- `jobs/[id]/page.tsx` - Job details with SOP checklist, video upload UI, quote submission, and animated map showing route to destination with real-time position updates (mock data)
- `wallet/page.tsx` - Earnings wallet with mock balance, transaction history, withdrawal UI (Flaticon icons)
- `profile/page.tsx` - Profile setup form (mock submission)
- `layout.tsx` - Mechanic app layout with navigation using shadcn components (Flaticon icons)

### 11. Frontend Pages - Workshop Dashboard
Create in `app/workshop/`:
- `dashboard/page.tsx` - Workshop dashboard (mock stats, active jobs, mechanic count with Flaticon icons)
- `mechanics/page.tsx` - Manage mechanics (mock mechanic list, add/remove actions with Flaticon icons)
- `jobs/page.tsx` - Dispatch jobs (mock job list, assign actions with Flaticon icons)
- `pricing/page.tsx` - Pricing rules (mock pricing data, edit form with Flaticon icons)
- `layout.tsx` - Workshop layout with navigation using shadcn components (Flaticon icons)

### 12. Frontend Pages - Admin Console
Create in `app/admin/`:
- `dashboard/page.tsx` - Admin dashboard (mock analytics, charts using shadcn components with Flaticon icons)
- `mechanics/page.tsx` - Approve mechanics (mock pending list, approve/reject actions with Flaticon icons)
- `workshops/page.tsx` - Verify workshops (mock workshop list, verify actions with Flaticon icons)
- `jobs/page.tsx` - Job monitoring (mock job list with filters and Flaticon icons)
- `disputes/page.tsx` - Dispute center (mock disputes list, resolve actions with Flaticon icons)
- `layout.tsx` - Admin layout with navigation using shadcn components (Flaticon icons)

### 13. Shared Components
Create in `components/`:
- `ui/` - shadcn/ui components (installed via shadcn CLI)
- `icons/FlaticonIcon.tsx` - Wrapper component for Flaticon icons
- `job/JobTimeline.tsx` - Job timeline visualization using shadcn Timeline/Progress components (Flaticon icons)
- `job/VideoViewer.tsx` - Video playback component (mock video URLs, placeholder player)
- `job/QuoteDisplay.tsx` - Quote display component using shadcn Card
- `job/MechanicMapNavigation.tsx` - Animated map with mechanic traveling animation (GIF-like)
- `chat/ChatWindow.tsx` - Chat interface (mock messages, message input with Flaticon icons)
- `forms/CarForm.tsx` - Car registration form using shadcn Form components (Flaticon icons)
- `forms/IssueForm.tsx` - Issue reporting form using shadcn Form components (Flaticon icons)
- `navigation/Sidebar.tsx` - Reusable sidebar navigation component with Flaticon icons
- `navigation/Header.tsx` - Reusable header component with user menu and Flaticon icons
- `components/theme-toggle.tsx` - Dark mode toggle button component

### 14. Layouts & Navigation
- Create `app/layout.tsx` - Root layout with PWA meta tags, fonts, global styles, ThemeProvider wrapper
- Create `app/theme-provider.tsx` - Theme provider component using next-themes for dark mode toggle
- Create role-specific layouts with navigation sidebars/headers
- Use shadcn Sheet component for mobile navigation
- Add responsive navigation using shadcn components (Desktop sidebar, mobile drawer)
- All navigation items use Flaticon icons
- Ensure dark mode styles are applied throughout (shadcn/ui components support dark mode by default with custom primary color #180092)

### 15. Configuration Files
- `vercel.json` - Vercel deployment configuration
- `public/manifest.json` - PWA manifest with app name, icons, theme colors
- `public/icons/*.png` - PWA app icons (192x192, 512x512, apple-touch-icon, favicon)
- `public/icons/flaticon/` - Flaticon icon files (SVG/PNG)
- `components.json` - shadcn/ui configuration
- `README.md` - Project documentation with setup instructions

## Key Files to Create

**Configuration:**
- `package.json` - Dependencies (Next.js 15, shadcn/ui, next-pwa, next-themes, @react-google-maps/api or react-leaflet, framer-motion, class-variance-authority, clsx, tailwind-merge, etc.)
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind setup with shadcn/ui theme configuration and custom colors (primary: #180092, white: #FFFFFF)
- `next.config.js` - Next.js and PWA configuration
- `components.json` - shadcn/ui config with primary color #180092
- `app/theme-provider.tsx` - Theme provider for dark mode
- `public/manifest.json` - PWA manifest
- `public/icons/*.png` - PWA icons (192x192, 512x512, apple-touch-icon, favicon.ico)
- `public/icons/flaticon/` - Flaticon icon directory

**Core Libraries:**
- `lib/utils.ts` - Utility functions (cn helper for shadcn)
- `lib/constants.ts` - App constants (job statuses, roles, service types, etc.)
- `lib/mock-data.ts` - Comprehensive mock data arrays and objects (including location coordinates)
- `lib/mock-services.ts` - Mock service functions with simulated API delays
- `lib/map-utils.ts` - Map utilities (route calculation, position interpolation, distance calculation)
- `lib/icon-map.ts` - Flaticon icon mapping for easy usage

**Frontend Pages:**
- `app/page.tsx` - Landing page
- All customer, mechanic, workshop, and admin pages in `app/` directory
- All pages use mock data (no API calls, all client-side)

**Components:**
- shadcn/ui components in `components/ui/` (installed via shadcn CLI)
- Feature components in `components/job/`, `components/chat/`, `components/forms/`, `components/landing/`, `components/navigation/`, `components/icons/`
- `components/job/MechanicMapNavigation.tsx` - Animated map component with GIF-like mechanic travel animation

## Notes
- All views are mockups - no actual API connections
- shadcn/ui components provide modern, accessible UI with dark mode support
- PWA enabled for installable app experience with offline capability
- Mock services simulate API delays (500ms-1s) for realistic UX
- All components are TypeScript with proper typing
- Landing page included as entry point with modern design
- Responsive design using Tailwind CSS and shadcn components
- All forms use shadcn Form components with validation UI
- Navigation uses shadcn Sheet for mobile responsiveness
- **Map Navigation**: Animated map component showing mechanic's real-time position traveling to destination (GIF-like animation using framer-motion or CSS animations, mock location updates every 2-3 seconds, smooth interpolation along route path)
- **Flaticon Integration**: All icons throughout the project use Flaticon (download icons to `public/icons/flaticon/` or use Flaticon embedding, create icon component wrapper for consistent usage)
- Map component shows: mechanic marker (animated with pulsing effect), destination marker, route polyline, animated movement along route path, distance and ETA display
- **Color Scheme**: Primary color #180092 (dark blue/purple) used for buttons, links, accents. White (#FFFFFF) for text and backgrounds. Custom color palette configured in Tailwind and shadcn/ui
- **Dark Mode**: Full dark mode support using next-themes. Theme toggle button in navigation. All shadcn/ui components support dark mode. Custom dark mode styles for primary color variations

