import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { DefaultLayoutCompanySidebar } from "./company-sidebar";
import { DefaultLayoutUserSidebar } from "./user-sidebar";

export function DefaultLayout() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "300px",
        } as React.CSSProperties
      }
    >
      <Sidebar
        collapsible="icon"
        className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      >
        <DefaultLayoutUserSidebar />
        <DefaultLayoutCompanySidebar />
      </Sidebar>
      <SidebarInset>
        <header className="p-4 flex items-center border-b">
          <SidebarTrigger className="-ml-1" />
        </header>

        <main className="p-4 grid gap-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
