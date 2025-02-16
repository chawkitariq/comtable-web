import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Bell,
  BellDot,
  Building2,
  House,
  MailPlus,
  ReceiptText,
  Users,
} from "lucide-react";
import { NavLink } from "react-router";
import { UserNav } from "./user-nav";
import { NotificationApiService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function DefaultLayoutUserSidebar() {
  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: NotificationApiService.findAll,
  });

  const hasUnreadedNotifications = useMemo(
    () => notifications?.some(({ isReaded }) => !isReaded),
    [notifications]
  );

  return (
    <Sidebar
      collapsible="none"
      className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
    >
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <NavLink to="/">
                  {({ isActive }) => (
                    <SidebarMenuButton title="Acceuil" isActive={isActive}>
                      <House />
                      <span>Acceuil</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink to="/invitations">
                  {({ isActive }) => (
                    <SidebarMenuButton title="Invitations" isActive={isActive}>
                      <MailPlus />
                      <span>Invitations</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink to="/notifications">
                  {({ isActive }) => (
                    <SidebarMenuButton
                      title="Notifications"
                      isActive={isActive}
                    >
                      {!hasUnreadedNotifications ? <Bell /> : <BellDot />}
                      <span>Notifications</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink to="/companies">
                  {({ isActive }) => (
                    <SidebarMenuButton title="Entreprises" isActive={isActive}>
                      <Building2 />
                      <span>Entreprises</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink to="/users">
                  {({ isActive }) => (
                    <SidebarMenuButton title="Utilisateurs" isActive={isActive}>
                      <Users />
                      <span>Utilisateurs</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink to="/roles">
                  {({ isActive }) => (
                    <SidebarMenuButton title="Roles" isActive={isActive}>
                      <ReceiptText />
                      <span>Roles</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserNav />
      </SidebarFooter>
    </Sidebar>
  );
}
