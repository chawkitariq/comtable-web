import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { CompanyApiService } from "@/services/company-api";
import { useSessionStore } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import {
  Archive,
  BookUser,
  ChevronsUpDown,
  Percent,
  ReceiptText,
  Settings,
  Tag,
} from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router";

export function DefaultLayoutCompanySidebar() {
  const { company: sessionCompany, setCompany } = useSessionStore();

  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: CompanyApiService.findAll,
  });

  return (
    <Sidebar collapsible="none" className="hidden flex-1 md:flex">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {sessionCompany.name}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Entreprises
                </DropdownMenuLabel>
                {companies?.map((company) => (
                  <React.Fragment key={company.id}>
                    <DropdownMenuItem
                      key={company.id}
                      onClick={() => setCompany(company)}
                      className="gap-2 p-2"
                    >
                      {company.name}
                    </DropdownMenuItem>
                  </React.Fragment>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/companies">
                    <Settings className="size-4" />
                    <span>Gérer les entreprises</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <NavLink to="/invoices">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive}>
                      <ReceiptText />
                      <span>Factures</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink to="/articles">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive}>
                      <Archive />
                      <span>Articles</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink to="/contacts">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive}>
                      <BookUser />
                      <span>Contacts</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink to="/categories">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive}>
                      <Tag />
                      <span>Catégories</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <NavLink to="/taxes">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive}>
                      <Percent />
                      <span>Taxes</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
