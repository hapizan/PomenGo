import { Home, Wrench, Wallet, User, Settings, MapPin, LucideIcon } from "lucide-react";

export interface NavItem {
  labelKey: string;
  href: string;
  icon: LucideIcon;
}

export const navigationConfig: Record<string, NavItem[]> = {
  customer: [
    { labelKey: "nav.dashboard", href: "/customer", icon: Home },
    { labelKey: "nav.cars", href: "/customer/cars", icon: Wrench },
    { labelKey: "nav.mechanics", href: "/customer/mechanics", icon: MapPin },
    { labelKey: "customer.dashboard.reportIssue", href: "/customer/issue", icon: Wrench },
    { labelKey: "ai.title", href: "/customer/ai-check", icon: Wrench },
  ],
  mechanic: [
    { labelKey: "nav.dashboard", href: "/mechanic", icon: Home },
    { labelKey: "nav.jobs", href: "/mechanic/jobs", icon: Wrench },
    { labelKey: "nav.wallet", href: "/mechanic/wallet", icon: Wallet },
    { labelKey: "nav.profile", href: "/mechanic/profile", icon: User },
  ],
  workshop: [
    { labelKey: "nav.dashboard", href: "/workshop", icon: Home },
    { labelKey: "nav.mechanics", href: "/workshop/mechanics", icon: User },
    { labelKey: "nav.jobs", href: "/workshop/jobs", icon: Wrench },
    { labelKey: "nav.pricing", href: "/workshop/pricing", icon: Settings },
  ],
  admin: [
    { labelKey: "nav.dashboard", href: "/admin", icon: Home },
    { labelKey: "nav.mechanics", href: "/admin/mechanics", icon: User },
    { labelKey: "nav.workshops", href: "/admin/workshops", icon: Settings },
    { labelKey: "nav.jobs", href: "/admin/jobs", icon: Wrench },
    { labelKey: "nav.disputes", href: "/admin/disputes", icon: Settings },
  ],
};

export function getNavItems(role: string): NavItem[] {
  return navigationConfig[role] || navigationConfig.customer;
}

