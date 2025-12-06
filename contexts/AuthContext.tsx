"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { User, UserRole } from "@/types/user";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>;
  logout: () => void;
  signup: (userData: Partial<User> & { password: string; role: UserRole }) => Promise<{ success: boolean; user?: User; error?: string }>;
  isAuthenticated: boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data - replace with actual API calls
const mockUsers: User[] = [
  {
    id: "user-1",
    role: "customer",
    name: "John Doe",
    email: "customer@example.com",
    phone: "+1234567890",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "user-2",
    role: "mechanic",
    name: "Mike Smith",
    email: "mechanic@example.com",
    phone: "+1234567891",
    created_at: "2024-01-10T10:00:00Z",
  },
  {
    id: "admin-1",
    role: "admin",
    name: "Admin User",
    email: "admin@example.com",
    phone: "+1234567899",
    created_at: "2024-01-05T10:00:00Z",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Protect routes based on authentication
  useEffect(() => {
    if (loading) return;

    const protectedRoutes = ["/customer", "/mechanic", "/workshop", "/admin"];
    const isProtectedRoute = protectedRoutes.some((route) => pathname?.startsWith(route));
    const isAuthRoute = pathname?.startsWith("/auth");

    // Redirect to login if accessing protected route without auth
    if (isProtectedRoute && !user) {
      router.push("/auth/login");
      return;
    }

    // Redirect authenticated users away from auth pages
    if (isAuthRoute && user) {
      // Redirect to appropriate dashboard based on role
      const roleRoutes: Record<UserRole, string> = {
        customer: "/customer",
        mechanic: "/mechanic",
        workshop: "/workshop",
        admin: "/admin",
      };
      router.push(roleRoutes[user.role]);
      return;
    }

    // Check if user is accessing route that doesn't match their role
    if (user && isProtectedRoute) {
      const roleRoutes: Record<UserRole, string> = {
        customer: "/customer",
        mechanic: "/mechanic",
        workshop: "/workshop",
        admin: "/admin",
      };
      const expectedRoute = roleRoutes[user.role];
      
      if (expectedRoute && !pathname?.startsWith(expectedRoute)) {
        // User is trying to access a route that doesn't match their role
        router.push(expectedRoute);
      }
    }
  }, [user, loading, pathname, router]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual authentication
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Find user in mock data (in production, this would be an API call)
      const foundUser = mockUsers.find((u) => u.email === email);
      
      if (!foundUser) {
        setLoading(false);
        return { success: false, error: "Invalid email or password" };
      }

      // In production, verify password here
      // For now, any password works for demo
      
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      setLoading(false);
      
      return { success: true, user: foundUser };
    } catch (error) {
      setLoading(false);
      return { success: false, error: "Login failed. Please try again." };
    }
  };

  const signup = async (userData: Partial<User> & { password: string; role: UserRole }) => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual signup
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: `user-${Date.now()}`,
        role: userData.role,
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        created_at: new Date().toISOString(),
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      setLoading(false);
      
      return { success: true, user: newUser };
    } catch (error) {
      setLoading(false);
      return { success: false, error: "Signup failed. Please try again." };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  const isAuthenticated = !!user;

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        signup,
        isAuthenticated,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

