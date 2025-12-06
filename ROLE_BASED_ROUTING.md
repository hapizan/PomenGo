# Role-Based Routing Guide

This document explains how role-based access control (RBAC) is implemented in the PomenGo application.

## Overview

The application supports four user roles:
- **Customer** - Regular users who need car repair services
- **Mechanic** - Independent mechanics providing services
- **Workshop** - Workshop owners managing multiple mechanics
- **Admin** - Super admin with full system access

## Architecture

### 1. Authentication Context (`contexts/AuthContext.tsx`)

The `AuthContext` manages user authentication state and provides:
- User session management
- Login/Signup functions
- Role-based access checks
- Automatic route protection

**Key Features:**
- Persists user session in localStorage
- Automatically redirects users based on their role
- Prevents unauthorized access to protected routes
- Provides `hasRole()` function for role checking

**Usage:**
```tsx
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { user, isAuthenticated, hasRole, logout } = useAuth();
  
  if (hasRole("admin")) {
    // Admin-only content
  }
}
```

### 2. Protected Route Component (`components/auth/ProtectedRoute.tsx`)

Wraps routes to ensure only authorized users can access them.

**Usage:**
```tsx
<ProtectedRoute allowedRoles={["admin", "mechanic"]}>
  <YourComponent />
</ProtectedRoute>
```

**Features:**
- Shows loading state while checking authentication
- Redirects unauthenticated users to login
- Redirects users with wrong role to their dashboard
- Supports single role or array of roles

### 3. Route Structure

Routes are organized by role in separate folders:

```
app/
├── customer/          # Customer-only routes
│   ├── layout.tsx     # Protected with "customer" role
│   ├── page.tsx       # Dashboard
│   ├── cars/          # Car management
│   └── issue/         # Report issues
├── mechanic/          # Mechanic-only routes
│   ├── layout.tsx     # Protected with "mechanic" role
│   ├── page.tsx       # Dashboard
│   ├── jobs/          # Job management
│   └── wallet/        # Earnings
├── workshop/          # Workshop-only routes
│   ├── layout.tsx     # Protected with "workshop" role
│   └── ...
└── admin/             # Admin-only routes
    ├── layout.tsx     # Protected with "admin" role
    └── ...
```

### 4. Layout Protection

Each role's layout automatically protects all child routes:

```tsx
// app/customer/layout.tsx
export default function CustomerLayout({ children }) {
  const { user } = useAuth();
  
  return (
    <ProtectedRoute allowedRoles="customer">
      <div>
        <Sidebar role={user?.role} />
        {children}
      </div>
    </ProtectedRoute>
  );
}
```

## How It Works

### Login Flow

1. User enters credentials on `/auth/login`
2. `AuthContext.login()` authenticates the user
3. User data is stored in localStorage
4. User is redirected to their role-specific dashboard:
   - Customer → `/customer`
   - Mechanic → `/mechanic`
   - Workshop → `/workshop`
   - Admin → `/admin`

### Route Protection Flow

1. User navigates to a protected route (e.g., `/customer`)
2. `ProtectedRoute` component checks:
   - Is user authenticated? → Redirect to `/auth/login` if not
   - Does user have required role? → Redirect to their dashboard if not
3. If authorized, route is rendered

### Automatic Redirects

The `AuthContext` automatically handles redirects:
- **Unauthenticated users** accessing protected routes → `/auth/login`
- **Authenticated users** accessing auth pages → Their dashboard
- **Wrong role** accessing a route → Their correct dashboard

## Testing Different Roles

### Demo Accounts

The application includes mock users for testing:

1. **Customer Account:**
   - Email: `customer@example.com`
   - Password: Any password (for demo)
   - Role: `customer`
   - Redirects to: `/customer`

2. **Mechanic Account:**
   - Email: `mechanic@example.com`
   - Password: Any password (for demo)
   - Role: `mechanic`
   - Redirects to: `/mechanic`

3. **Admin Account:**
   - Email: `admin@example.com`
   - Password: Any password (for demo)
   - Role: `admin`
   - Redirects to: `/admin`

### Social Login Demo

Social login buttons use demo accounts:
- **Facebook** → Customer account
- **Twitter** → Mechanic account
- **Gmail** → Admin account

## Implementation Details

### Adding a New Protected Route

1. Create route in appropriate folder:
   ```
   app/customer/new-feature/page.tsx
   ```

2. The route is automatically protected by the parent layout

3. For custom protection, wrap with `ProtectedRoute`:
   ```tsx
   import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
   
   export default function NewFeaturePage() {
     return (
       <ProtectedRoute allowedRoles="customer">
         <div>Protected content</div>
       </ProtectedRoute>
     );
   }
   ```

### Checking User Role in Components

```tsx
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { user, hasRole } = useAuth();
  
  // Single role check
  if (hasRole("admin")) {
    return <AdminPanel />;
  }
  
  // Multiple roles check
  if (hasRole(["admin", "workshop"])) {
    return <ManagementPanel />;
  }
  
  // Direct role access
  if (user?.role === "customer") {
    return <CustomerView />;
  }
}
```

### Logout

The Header component includes a logout button that:
1. Clears user session from localStorage
2. Redirects to `/auth/login`

```tsx
const { logout } = useAuth();
logout(); // Clears session and redirects
```

## Security Considerations

⚠️ **Current Implementation Notes:**

1. **Mock Authentication**: The current implementation uses mock data. In production:
   - Replace mock users with actual API calls
   - Implement proper password hashing
   - Use secure session management (JWT tokens, httpOnly cookies)
   - Add CSRF protection

2. **Client-Side Protection**: Route protection is client-side only. For production:
   - Add server-side middleware for route protection
   - Implement API route protection
   - Add rate limiting
   - Validate user roles on the server

3. **localStorage**: Currently uses localStorage for session. Consider:
   - Using httpOnly cookies for sensitive data
   - Implementing token refresh mechanism
   - Adding session expiration

## Future Enhancements

- [ ] Server-side route protection with Next.js middleware
- [ ] JWT token-based authentication
- [ ] Role-based API route protection
- [ ] Permission-based access control (finer-grained than roles)
- [ ] Session management with refresh tokens
- [ ] Multi-factor authentication support

