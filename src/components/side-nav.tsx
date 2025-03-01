"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, CreditCard, FileText, Home, LayoutDashboard, LogOut, Settings, Users, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Logo } from "@/components/logo"
import { useAuth } from "@/lib/auth" // We'll create this hook later

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  requiresAuth: boolean
}

export function SideNav() {
  const pathname = usePathname()
  const { user, logout } = useAuth() // We'll implement this hook later

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
      title: "Transactions",
      href: "/transactions",
      icon: <CreditCard className="h-5 w-5" />,
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
  ]

  return (
    <div className="hidden border-r bg-card/40 backdrop-blur-sm md:block w-64 flex-shrink-0">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Logo size="default" />
            <span className="text-lg font-bold">CypheirPay</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-2 px-2">
            {routes.map(
              (route) =>
                (!route.requiresAuth || user) && (
                  <Button
                    key={route.href}
                    variant={pathname === route.href ? "default" : "ghost"}
                    className={cn(
                      "justify-start gap-2",
                      pathname === route.href && "bg-primary text-primary-foreground hover:bg-primary/90",
                    )}
                    asChild
                  >
                    <Link href={route.href}>
                      {route.icon}
                      {route.title}
                    </Link>
                  </Button>
                ),
            )}
          </nav>
        </ScrollArea>
        <div className="mt-auto border-t p-4">
          {user ? (
            <Button variant="outline" className="w-full justify-start gap-2" onClick={logout}>
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          ) : (
            <Button variant="outline" className="w-full justify-start gap-2" asChild>
              <Link href="/login">
                <LogOut className="h-5 w-5" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

