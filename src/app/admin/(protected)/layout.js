"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/shared";

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="mx-6 w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
