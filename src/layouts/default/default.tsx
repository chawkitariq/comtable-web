import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
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
        <main className="p-2">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
