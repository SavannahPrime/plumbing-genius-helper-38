
import React from "react";
import { MobileBottomNav } from "./MobileBottomNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: React.ReactNode;
  hideBottomNav?: boolean;
}

export function PageLayout({ children, hideBottomNav = false }: PageLayoutProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className={cn(
        "flex-1",
        isMobile && !hideBottomNav ? "pb-16" : ""
      )}>
        {children}
      </main>
      
      {!hideBottomNav && <MobileBottomNav />}
    </div>
  );
}
