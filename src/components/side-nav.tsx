"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  // signOut,
  useSession,
} from "next-auth/react";
import {
  BarChart3,
  CreditCard,
  FileText,
  Home,
  LayoutDashboard,
  // LogOut,
  Settings,
  Users,
  Wallet,
  DollarSign,
  Milestone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  requiresAuth: boolean;
}

export function SideNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const routes: NavItem[] = [
    {
      title: "Home",
      href: "/",
      icon: <Home className="h-5 w-5" />,
      requiresAuth: false,
    },
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      requiresAuth: true,
    },
    {
      title: "Invoices",
      href: "/invoices",
      icon: <FileText className="h-5 w-5" />,
      requiresAuth: true,
    },
    {
      title: "Milestone Invoices",
      href: "/create-milestone-invoice",
      icon: <Milestone className="h-5 w-5" />,
      requiresAuth: true,
    },
    {
      title: "Transactions",
      href: "/transactions",
      icon: <CreditCard className="h-5 w-5" />,
      requiresAuth: true,
    },
    {
      title: "Recent Sales",
      href: "/recent-sales",
      icon: <DollarSign className="h-5 w-5" />,
      requiresAuth: true,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      requiresAuth: true,
    },
    {
      title: "Customers",
      href: "/customers",
      icon: <Users className="h-5 w-5" />,
      requiresAuth: true,
    },
    {
      title: "Wallets",
      href: "/wallets",
      icon: <Wallet className="h-5 w-5" />,
      requiresAuth: true,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
      requiresAuth: true,
    },
  ];

  return (
    <Sidebar collapsible="icon" side="left">
      <SidebarContent className="pt-16">
        <ScrollArea className="flex-1 py-4">
          <SidebarMenu>
            {routes.map(
              (route) =>
                (!route.requiresAuth || session) && (
                  <SidebarMenuItem key={route.href}>
                    <SidebarMenuButton
                      asChild
                      variant={"default"}
                      className={cn(
                        "w-full justify-start",
                        pathname === route.href &&
                          "bg-primary text-primary-foreground hover:bg-primary/90"
                      )}
                    >
                      <Link href={route.href}>
                        {route.icon}
                        {route.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
            )}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>
      {/* <SidebarFooter className="border-t p-4">
        {session ? (
          <SidebarMenuButton
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={() => signOut()}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </SidebarMenuButton>
        ) : (
          <SidebarMenuButton
            variant="outline"
            className="w-full justify-start gap-2"
            asChild
          >
            <Link href="/login">
              <LogOut className="h-5 w-5" />
              Login
            </Link>
          </SidebarMenuButton>
        )}
      </SidebarFooter> */}
    </Sidebar>
  );
}
