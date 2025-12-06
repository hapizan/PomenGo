"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import {
  Menu,
  LogOut,
  User,
  Bell,
  Settings,
  Plus,
  Wrench,
  Shield,
  AlertCircle,
  Home,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
  navItems?: { label: string; href: string; icon?: React.ReactNode }[];
}

// Role-specific configurations
const roleConfig = {
  customer: {
    color: "bg-blue-500",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    icon: User,
    quickActions: [
      { label: "Report Issue", href: "/customer/issue", icon: AlertCircle },
      { label: "Add Car", href: "/customer/cars/new", icon: Plus },
    ],
  },
  mechanic: {
    color: "bg-orange-500",
    badgeColor: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
    icon: Wrench,
    quickActions: [
      { label: "View Jobs", href: "/mechanic/jobs", icon: Wrench },
      { label: "Wallet", href: "/mechanic/wallet", icon: Wallet },
    ],
  },
  workshop: {
    color: "bg-purple-500",
    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    icon: Settings,
    quickActions: [
      { label: "Manage Mechanics", href: "/workshop/mechanics", icon: User },
      { label: "Jobs", href: "/workshop/jobs", icon: Wrench },
    ],
  },
  admin: {
    color: "bg-red-500",
    badgeColor: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    icon: Shield,
    quickActions: [
      { label: "Users", href: "/admin/mechanics", icon: User },
      { label: "Disputes", href: "/admin/disputes", icon: AlertCircle },
    ],
  },
};

export function Header({ title = "PomenGO", navItems = [] }: HeaderProps) {
  const { t } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const role = user?.role || "customer";
  const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.customer;
  const RoleIcon = config.icon;
  
  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="border-b sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link href={isAuthenticated ? `/${role}` : "/"} className="flex items-center gap-3 group">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-105",
                config.color,
                "shadow-md"
              )}>
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">{title}</span>
                {isAuthenticated && user && (
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge className={cn("text-xs px-1.5 py-0 h-4", config.badgeColor)}>
                      <RoleIcon className="h-2.5 w-2.5 mr-1" />
                      <span className="capitalize">{role}</span>
                    </Badge>
                  </div>
                )}
              </div>
            </Link>
          </div>

          {/* Center Section - Quick Actions (Desktop) */}
          {isAuthenticated && user && (
            <div className="hidden lg:flex items-center gap-2">
              {config.quickActions.map((action) => {
                const ActionIcon = action.icon;
                return (
                  <Link key={action.href} href={action.href}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "gap-2",
                        pathname?.startsWith(action.href) && "bg-accent"
                      )}
                    >
                      <ActionIcon className="h-4 w-4" />
                      <span className="hidden xl:inline">{action.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Right Section - Actions & User Menu */}
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            
            {isAuthenticated && user && (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 border-background" />
                </Button>

                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 h-10 px-2 hover:bg-accent">
                      <div className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-semibold",
                        config.color,
                        "shadow-sm"
                      )}>
                        {getInitials(user.name)}
                      </div>
                      <div className="hidden sm:flex flex-col items-start">
                        <span className="text-sm font-medium leading-tight">{user.name}</span>
                        <span className="text-xs text-muted-foreground leading-tight capitalize">
                          {user.role}
                        </span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-semibold",
                            config.color
                          )}>
                            {getInitials(user.name)}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <div className="pt-2">
                          <Badge className={cn("text-xs", config.badgeColor)}>
                            <RoleIcon className="h-3 w-3 mr-1" />
                            <span className="capitalize">{user.role}</span>
                          </Badge>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href={`/${role}`}>
                      <DropdownMenuItem>
                        <Home className="mr-2 h-4 w-4" />
                        Dashboard
                      </DropdownMenuItem>
                    </Link>
                    <Link href={`/${role}/profile`}>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </div>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} side="left">
        <SheetContent onClose={() => setMobileMenuOpen(false)}>
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", config.color)}>
                <span className="text-white font-bold text-sm">P</span>
              </div>
              {title}
            </SheetTitle>
            {isAuthenticated && user && (
              <div className="flex items-center gap-2 pt-2">
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-semibold",
                  config.color
                )}>
                  {getInitials(user.name)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <Badge className={cn("text-xs mt-1", config.badgeColor)}>
                    <RoleIcon className="h-3 w-3 mr-1" />
                    <span className="capitalize">{role}</span>
                  </Badge>
                </div>
              </div>
            )}
          </SheetHeader>
          
          {isAuthenticated && user && (
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2 text-muted-foreground">Quick Actions</h3>
                <div className="space-y-1">
                  {config.quickActions.map((action) => {
                    const ActionIcon = action.icon;
                    return (
                      <Link
                        key={action.href}
                        href={action.href}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start gap-2",
                            pathname?.startsWith(action.href) && "bg-accent"
                          )}
                        >
                          <ActionIcon className="h-4 w-4" />
                          {action.label}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          
          <nav className={cn("flex flex-col gap-2", isAuthenticated && "mt-6")}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2",
                    pathname === item.href && "bg-accent"
                  )}
                >
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
          
          {isAuthenticated && user && (
            <div className="mt-auto pt-6 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-destructive"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </header>
  );
}

