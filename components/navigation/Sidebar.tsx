"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { getNavItems } from "@/lib/navigation-config";

export function Sidebar({ role = "customer" }: { role?: "customer" | "mechanic" | "workshop" | "admin" }) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const navItems = getNavItems(role);

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
                <item.icon className="h-5 w-5" />
                {t(item.labelKey)}
              </Button>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

