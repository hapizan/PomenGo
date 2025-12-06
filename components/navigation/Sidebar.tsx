"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, Wrench, Wallet, User, Settings, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavItem {
  labelKey: string;
  href: string;
  icon: React.ReactNode;
}

export function Sidebar({ role = "customer" }: { role?: "customer" | "mechanic" | "workshop" | "admin" }) {
  const { t } = useLanguage();
  const pathname = usePathname();
  
  const customerNavItems: NavItem[] = [
    { labelKey: "nav.dashboard", href: "/customer", icon: <Home className="h-5 w-5" /> },
    { labelKey: "nav.cars", href: "/customer/cars", icon: <Wrench className="h-5 w-5" /> },
    { labelKey: "nav.mechanics", href: "/customer/mechanics", icon: <MapPin className="h-5 w-5" /> },
    { labelKey: "customer.dashboard.reportIssue", href: "/customer/issue", icon: <Wrench className="h-5 w-5" /> },
    { labelKey: "ai.title", href: "/customer/ai-check", icon: <Wrench className="h-5 w-5" /> },
  ];

  const mechanicNavItems: NavItem[] = [
    { labelKey: "nav.dashboard", href: "/mechanic", icon: <Home className="h-5 w-5" /> },
    { labelKey: "nav.jobs", href: "/mechanic/jobs", icon: <Wrench className="h-5 w-5" /> },
    { labelKey: "nav.wallet", href: "/mechanic/wallet", icon: <Wallet className="h-5 w-5" /> },
    { labelKey: "nav.profile", href: "/mechanic/profile", icon: <User className="h-5 w-5" /> },
  ];

  const workshopNavItems: NavItem[] = [
    { labelKey: "nav.dashboard", href: "/workshop", icon: <Home className="h-5 w-5" /> },
    { labelKey: "nav.mechanics", href: "/workshop/mechanics", icon: <User className="h-5 w-5" /> },
    { labelKey: "nav.jobs", href: "/workshop/jobs", icon: <Wrench className="h-5 w-5" /> },
    { labelKey: "nav.pricing", href: "/workshop/pricing", icon: <Settings className="h-5 w-5" /> },
  ];

  const adminNavItems: NavItem[] = [
    { labelKey: "nav.dashboard", href: "/admin", icon: <Home className="h-5 w-5" /> },
    { labelKey: "nav.mechanics", href: "/admin/mechanics", icon: <User className="h-5 w-5" /> },
    { labelKey: "nav.workshops", href: "/admin/workshops", icon: <Settings className="h-5 w-5" /> },
    { labelKey: "nav.jobs", href: "/admin/jobs", icon: <Wrench className="h-5 w-5" /> },
    { labelKey: "nav.disputes", href: "/admin/disputes", icon: <Settings className="h-5 w-5" /> },
  ];

  const navItems =
    role === "customer"
      ? customerNavItems
      : role === "mechanic"
      ? mechanicNavItems
      : role === "workshop"
      ? workshopNavItems
      : adminNavItems;

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-background">
      <nav className="flex flex-col gap-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-primary text-primary-foreground"
                )}
              >
                {item.icon}
                {t(item.labelKey)}
              </Button>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

