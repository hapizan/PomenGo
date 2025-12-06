// Flaticon icon mapping
// This maps icon names to their file paths in public/icons/flaticon/
// For now, we'll use placeholder paths - actual icons should be downloaded from Flaticon

export const iconMap: Record<string, string> = {
  // Navigation icons
  home: "/icons/flaticon/home.svg",
  jobs: "/icons/flaticon/jobs.svg",
  wallet: "/icons/flaticon/wallet.svg",
  profile: "/icons/flaticon/profile.svg",
  dashboard: "/icons/flaticon/dashboard.svg",
  mechanics: "/icons/flaticon/mechanics.svg",
  workshops: "/icons/flaticon/workshops.svg",
  disputes: "/icons/flaticon/disputes.svg",
  pricing: "/icons/flaticon/pricing.svg",

  // Feature icons
  car: "/icons/flaticon/car.svg",
  wrench: "/icons/flaticon/wrench.svg",
  map: "/icons/flaticon/map.svg",
  video: "/icons/flaticon/video.svg",
  check: "/icons/flaticon/check.svg",
  clock: "/icons/flaticon/clock.svg",
  dollar: "/icons/flaticon/dollar.svg",

  // Status icons
  pending: "/icons/flaticon/pending.svg",
  completed: "/icons/flaticon/completed.svg",
  in_progress: "/icons/flaticon/in-progress.svg",
  accepted: "/icons/flaticon/accepted.svg",

  // UI icons
  menu: "/icons/flaticon/menu.svg",
  close: "/icons/flaticon/close.svg",
  arrow_right: "/icons/flaticon/arrow-right.svg",
  arrow_left: "/icons/flaticon/arrow-left.svg",
  search: "/icons/flaticon/search.svg",
  filter: "/icons/flaticon/filter.svg",
  sun: "/icons/flaticon/sun.svg",
  moon: "/icons/flaticon/moon.svg",
};

export function getIconPath(iconName: string): string {
  return iconMap[iconName] || "/icons/flaticon/default.svg";
}

