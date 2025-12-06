# PomenGO 🚗🔧

**Your Trusted Auto Repair Partner** - A comprehensive platform connecting customers with skilled mechanics for transparent, reliable car repair services.

PomenGO is a full-stack web application that revolutionizes the automotive repair industry by providing a seamless platform where customers can book mechanics, track repair progress in real-time, and receive transparent pricing with video proof of work.

---

## ✨ Key Features

### 👥 For Customers
- **🔍 Find Mechanics**: Browse available mechanics on an interactive map with ratings and reviews
- **📱 Request Service**: Select a mechanic and create service requests with detailed descriptions
- **📸 Media Upload**: Attach images and videos to document car issues
- **📍 Location Tracking**: Automatic GPS location capture for service requests
- **🚗 Car Management**: Register and manage multiple vehicles
- **📊 Job Tracking**: Monitor active jobs with real-time status updates and progress bars
- **⭐ Ratings & Reviews**: View mechanic ratings from PomenGO, Facebook, YouTube, and TikTok
- **🤖 AI Symptom Checker**: Get instant diagnosis and price estimates for car issues
- **💳 Payment Integration**: Secure payment processing for completed services

### 🔧 For Mechanics
- **🗺️ Live Job Map**: View available jobs on an interactive map with real-time updates
- **📋 Job Management**: Accept, diagnose, and complete service requests
- **💰 Wallet System**: Track earnings and manage withdrawals
- **⭐ Multi-Platform Ratings**: Display ratings from various platforms (PomenGO, Facebook, YouTube, TikTok)
- **📱 Profile Management**: Update specialties, availability, and personal information
- **📊 Dashboard Analytics**: View job statistics and earnings overview

### 🏭 For Workshops
- **👥 Mechanic Management**: Add, remove, and manage workshop mechanics
- **📋 Job Dispatch**: Assign jobs to mechanics and track progress
- **💰 Pricing Management**: Set service pricing and manage quotes
- **📊 Analytics Dashboard**: Monitor workshop performance and statistics

### 👨‍💼 For Administrators
- **👥 User Management**: Oversee all users, mechanics, and workshops
- **⚖️ Dispute Resolution**: Handle customer-mechanic disputes
- **📊 Platform Analytics**: Monitor platform-wide statistics and health
- **🔒 System Administration**: Manage platform settings and configurations

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & Flaticon
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Maps**: [Leaflet.js](https://leafletjs.com/) with OpenStreetMap

### Backend & Services
- **API**: Next.js API Routes (mock services for demo)
- **State Management**: React Context API
- **Authentication**: Custom Auth Context with role-based access control

### PWA & Performance
- **PWA**: [next-pwa](https://github.com/shadowwalker/next-pwa)
- **Image Optimization**: Next.js Image component
- **Theme**: Dark mode support with [next-themes](https://github.com/pacocoursey/next-themes)

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript strict mode

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PomenGo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## 🔐 Demo Login Accounts

For testing and demonstration purposes, use these accounts:

### Customer Account
- **Email**: `customer@example.com`
- **Password**: Any password (demo mode)
- **Access**: 
  - Customer dashboard
  - Car management
  - Service request creation
  - Mechanic browsing and selection
  - Job tracking

### Mechanic Account
- **Email**: `mechanic@example.com`
- **Password**: Any password (demo mode)
- **Access**:
  - Mechanic dashboard
  - Job management (accept, view, complete)
  - Live job map
  - Wallet and earnings
  - Profile management

### Workshop Account
- **Email**: `workshop@example.com`
- **Password**: Any password (demo mode)
- **Access**:
  - Workshop dashboard
  - Mechanic management
  - Job dispatch
  - Pricing management

### Admin Account
- **Email**: `admin@example.com`
- **Password**: Any password (demo mode)
- **Access**:
  - Admin console
  - User management
  - Dispute resolution
  - Platform analytics

### Social Login (Demo)
- **Facebook** → Logs in as Customer
- **Twitter** → Logs in as Mechanic
- **Gmail** → Logs in as Admin

> ⚠️ **Note**: These are demo accounts for development/testing. In production, proper authentication with password validation and security measures will be implemented.

---

## 📁 Project Structure

```
PomenGo/
├── app/                          # Next.js App Router pages
│   ├── auth/                    # Authentication pages
│   │   ├── login/               # Login page
│   │   └── signup/              # Signup page
│   ├── customer/                # Customer app
│   │   ├── cars/                # Car management
│   │   ├── issue/               # Service request
│   │   ├── mechanics/           # Browse mechanics
│   │   ├── ai-check/           # AI symptom checker
│   │   └── job/                # Job details & payment
│   ├── mechanic/                # Mechanic app
│   │   ├── jobs/               # Job management
│   │   ├── wallet/             # Earnings & withdrawals
│   │   └── profile/             # Profile management
│   ├── workshop/                # Workshop dashboard
│   ├── admin/                  # Admin console
│   └── page.tsx                # Landing page
│
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   ├── customer/               # Customer-specific components
│   │   ├── LocationMap.tsx     # Location picker map
│   │   └── MechanicsMapView.tsx # Mechanics map view
│   ├── mechanic/               # Mechanic-specific components
│   │   ├── JobsMapView.tsx     # Jobs map view
│   │   └── RatingsDisplay.tsx # Ratings component
│   ├── navigation/             # Navigation components
│   ├── auth/                   # Auth components
│   └── animated/               # Animation components
│
├── contexts/                    # React Context providers
│   ├── AuthContext.tsx         # Authentication state
│   └── LanguageContext.tsx     # i18n support
│
├── lib/                        # Utility libraries
│   ├── mock-data.ts            # Mock data
│   ├── mock-services.ts        # Mock API services
│   ├── i18n.ts                # Internationalization
│   └── utils.ts               # Helper functions
│
├── types/                       # TypeScript type definitions
│   ├── user.ts                 # User & mechanic types
│   ├── job.ts                  # Job types
│   └── mock-data.ts            # Mock data types
│
├── public/                     # Static assets
│   ├── image/                  # Car images
│   └── icons/                  # App icons
│
└── docs/                       # Documentation
    ├── RHB_BANK_INTEGRATION.md
    ├── RYT_BANK_INTEGRATION.md
    └── INTEGRATION_USE_CASES.md
```

---

## 🎨 Design System

### Color Scheme
- **Primary**: `#180092` (Dark Blue/Purple)
- **Secondary**: `#FFFFFF` (White)
- **Success**: Green variants
- **Warning**: Yellow/Orange variants
- **Error**: Red variants
- **Dark Mode**: Fully supported with custom color variants

### Typography
- **Font Family**: System fonts (optimized for performance)
- **Headings**: Bold, various sizes
- **Body**: Regular weight, readable sizes

### Components
- Built with shadcn/ui for consistency
- Fully accessible (ARIA compliant)
- Responsive design (mobile-first)
- Dark mode support

---

## 🗺️ Key Features in Detail

### Interactive Maps
- **Leaflet.js Integration**: Interactive maps for jobs and mechanics
- **Real-time Location**: GPS-based location tracking
- **Custom Markers**: Color-coded markers for different statuses
- **Popup Information**: Quick access to details from map markers

### Role-Based Access Control
- **Protected Routes**: Automatic redirection based on user role
- **Role-Specific Dashboards**: Customized views for each user type
- **Secure Navigation**: Sidebar and header adapt to user role

### Media Management
- **Image Upload**: Support for multiple image formats (JPG, PNG, WebP)
- **Video Upload**: Video attachment for service requests
- **Preview System**: Real-time preview of uploaded media
- **File Validation**: Size and type validation

### AI Features
- **Symptom Checker**: AI-powered diagnosis based on symptoms
- **Price Estimation**: Automatic price range estimation
- **Confidence Scoring**: AI confidence levels for diagnoses

---

## 🌐 Internationalization

The application supports multiple languages:
- English (default)
- Bahasa Malaysia

Language switching is available via the header component.

---

## 📱 Progressive Web App (PWA)

PomenGO is configured as a PWA:
- **Installable**: Can be installed on devices
- **Offline Support**: Service worker for offline functionality
- **App-like Experience**: Native app feel on mobile devices
- **Manifest**: Configured with app metadata

---

## 🔒 Security Features

- **Role-Based Authentication**: Secure access control
- **Protected Routes**: Automatic route protection
- **Session Management**: LocalStorage-based session handling
- **Input Validation**: Form validation on client side

---

## 🧪 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

### Code Style
- TypeScript strict mode enabled
- ESLint configuration for code quality
- Consistent component structure
- Type-safe development

---

## 🚢 Deployment

### Vercel (Recommended)
The project is configured for Vercel deployment:
- Automatic builds on push
- Environment variables support
- Edge functions ready

### Manual Deployment
1. Build the project: `npm run build`
2. Start the server: `npm start`
3. Configure environment variables as needed

---

## 📝 Mock Data

All views use mock data with simulated API delays for realistic UX:
- **Delay Simulation**: 500-1500ms delays for API calls
- **Realistic Data**: Comprehensive mock datasets
- **No Backend Required**: Fully functional frontend demo

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Leaflet](https://leafletjs.com/) - Maps
- [Framer Motion](https://www.framer.com/motion/) - Animations

---

## 📞 Support

For issues, questions, or contributions, please open an issue on the repository.

---

**Built with ❤️ for the automotive repair industry**
