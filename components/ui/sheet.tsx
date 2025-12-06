"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
}

export function Sheet({ open, onOpenChange, children, side = "left" }: SheetProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      // Prevent body scroll when sheet is open
      document.body.style.overflow = "hidden";
      // Small delay to trigger animation
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      // Restore body scroll when sheet is closed
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const sideClasses = {
    left: "left-0 top-0 h-full",
    right: "right-0 top-0 h-full",
    top: "top-0 left-0 w-full",
    bottom: "bottom-0 left-0 w-full",
  };

  const transformClasses = {
    left: isVisible ? "translate-x-0" : "-translate-x-full",
    right: isVisible ? "translate-x-0" : "translate-x-full",
    top: isVisible ? "translate-y-0" : "-translate-y-full",
    bottom: isVisible ? "translate-y-0" : "translate-y-full",
  };

  if (!isMounted || !open) return null;

  const sheetContent = (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{ 
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999
      }}
    >
      <div
        className={cn(
          "fixed inset-0 bg-black/50 transition-opacity duration-300 pointer-events-auto",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999
        }}
        onClick={() => {
          onOpenChange?.(false);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          onOpenChange?.(false);
        }}
        role="button"
        tabIndex={-1}
        aria-label="Close menu"
      />
      <div
        className={cn(
          "fixed w-80 max-w-[85vw] bg-background border-r shadow-2xl transition-transform duration-300 ease-in-out pointer-events-auto",
          sideClasses[side],
          transformClasses[side]
        )}
        style={{
          zIndex: 10000,
          position: "fixed"
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );

  // Use portal to render at body level for PWA compatibility
  if (typeof window !== "undefined") {
    return createPortal(sheetContent, document.body);
  }

  return null;
}

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

export function SheetContent({
  className,
  children,
  onClose,
  ...props
}: SheetContentProps) {
  return (
    <div 
      className={cn("flex flex-col h-full overflow-hidden", className)} 
      {...props}
    >
      {onClose && (
        <div className="flex justify-end p-4 flex-shrink-0">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div 
        className="flex-1 overflow-y-auto"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {children}
      </div>
    </div>
  );
}

export function SheetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-2 text-center sm:text-left px-4", className)}
      {...props}
    />
  );
}

export function SheetTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-lg font-semibold text-foreground", className)}
      {...props}
    />
  );
}

