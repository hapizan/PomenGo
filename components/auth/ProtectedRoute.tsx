"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/user";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole | UserRole[];
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ children, allowedRoles, fallback }: ProtectedRouteProps) {
  const { user, loading, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    } else if (!loading && user && !hasRole(allowedRoles)) {
      // Redirect to appropriate dashboard based on user's role
      const roleRoutes: Record<UserRole, string> = {
        customer: "/customer",
        mechanic: "/mechanic",
        workshop: "/workshop",
        admin: "/admin",
      };
      router.push(roleRoutes[user.role]);
    }
  }, [user, loading, allowedRoles, hasRole, router]);

  if (loading) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      )
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  if (!hasRole(allowedRoles)) {
    return null; // Will redirect
  }

  return <>{children}</>;
}

