import Image from "next/image";
import { getIconPath } from "@/lib/icon-map";
import { cn } from "@/lib/utils";

interface FlaticonIconProps {
  name: string;
  className?: string;
  size?: number;
  alt?: string;
}

export function FlaticonIcon({
  name,
  className,
  size = 24,
  alt,
}: FlaticonIconProps) {
  const iconPath = getIconPath(name);

  // Fallback to lucide-react icons if Flaticon not available
  // For now, we'll use a placeholder div that can be replaced with actual icons
  return (
    <div
      className={cn("inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      aria-label={alt || name}
    >
      {/* Placeholder - replace with actual Flaticon SVG or Image component */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <rect width="24" height="24" fill="currentColor" opacity="0.1" />
      </svg>
    </div>
  );
}

