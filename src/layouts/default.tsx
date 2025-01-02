import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuthenticationStore } from "@/stores";
import { Building2, House, ReceiptText, Users } from "lucide-react";
import { Link, Outlet } from "react-router";

export function DefaultLayout() {
  const { me } = useAuthenticationStore();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>Comtable</SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/">
                      <House />
                      <span>Acceuil</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton asChild>
                    <Link to="/companies">
                      <Building2 />
                      <span>Entreprises</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton asChild>
                    <Link to="/users">
                      <Users />
                      <span>Utilisateurs</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton asChild>
                    <Link to="/roles">
                      <ReceiptText />
                      <span>Roles</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <SidebarTrigger />
        <main className="p-2">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
