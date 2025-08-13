"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [defaultOpen, setDefaultOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only run on client side
    const sidebarState = document.cookie
      .split('; ')
      .find(row => row.startsWith('sidebar_state='))
      ?.split('=')[1];
    
    setDefaultOpen(sidebarState === "true");
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <SidebarProvider defaultOpen={false}>{children}</SidebarProvider>;
  }

  return <SidebarProvider defaultOpen={defaultOpen}>{children}</SidebarProvider>;
}