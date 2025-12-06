# PomenGo

Platform for customers to book mechanics with transparent pricing and repair video proof - Your Trusted Auto Repair Partner

## Features

- 🚗 **Customer App**: Book mechanics, track jobs, view repair videos
- 🔧 **Mechanic App**: Accept jobs, submit quotes, manage earnings
- 🏭 **Workshop Dashboard**: Manage mechanics and dispatch jobs
- 👨‍💼 **Admin Console**: Platform oversight and dispute resolution
- 🗺️ **Real-time Map Navigation**: Animated mechanic tracking (GIF-like)
- 🎨 **Modern UI**: shadcn/ui components with dark mode support
- 📱 **PWA Support**: Installable app experience
- 🎯 **AI Symptom Checker**: Instant diagnosis and price estimates

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Theme**: Primary color #180092, full dark mode support
- **Icons**: Flaticon
- **Animations**: Framer Motion
- **PWA**: next-pwa

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── customer/          # Customer app pages
│   ├── mechanic/          # Mechanic app pages
│   ├── workshop/         # Workshop dashboard
│   ├── admin/            # Admin console
│   └── page.tsx          # Landing page
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── job/              # Job-related components
│   ├── navigation/       # Navigation components
│   └── icons/            # Icon components
├── lib/
│   ├── mock-data.ts      # Mock data
│   ├── mock-services.ts  # Mock API services
│   └── map-utils.ts      # Map utilities
└── types/                # TypeScript types
```

## Mock Data

All views use mock data with simulated API delays for realistic UX. No actual API connections are required.

## Color Scheme

- **Primary**: #180092 (dark blue/purple)
- **Secondary**: #FFFFFF (white)
- **Dark Mode**: Fully supported with custom color variants

## PWA

The app is configured as a Progressive Web App. Install it on your device for an app-like experience.

## License

MIT

