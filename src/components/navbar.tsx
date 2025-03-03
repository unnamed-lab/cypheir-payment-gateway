"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Session } from "next-auth";
import { SidebarTrigger } from "./ui/sidebar";

interface NavbarProps {
  session: Session | null;
}
export function Navbar({ session }: NavbarProps) {
  const isAuth = !!session;

  const resendAction = (formData: FormData) => {
    console.log("resendAction", formData);
    const email = formData.get("email");
    if (email) {
      signIn("resend", { email });
    } else {
      console.error("Email is missing from the request body");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-[60px] bg-black/60 backdrop-blur-xs border-b border-grey-200 z-40">
      <Dialog>
        <div className="h-full flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger>
              <Button variant="ghost" size="icon" className="flex">
                <Menu className="h-5 w-5" />
              </Button>
            </SidebarTrigger>
            <Link href="/" className="flex items-center gap-1">
              <span className="text-lg font-extrabold text-grey-900 inline">
                <span className="text-primary">Cypheir</span>
                Pay
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#"
              className="text-xs text-grey-600 hover:text-grey-900"
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-xs text-grey-600 hover:text-grey-900"
            >
              About
            </Link>
            {isAuth ? (
              <Button
                variant="ghost"
                className="text-white bg-primary text-xs"
                type="submit"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                variant="ghost"
                asChild
                className="text-white bg-primary text-xs"
              >
                <DialogTrigger>Sign In</DialogTrigger>
              </Button>
            )}
          </nav>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Get started</DialogTitle>
            <DialogDescription>
              You are a few steps away from using our service.
            </DialogDescription>
          </DialogHeader>
          <form action={resendAction} className="flex flex-col gap-5">
            <Input type="email" name="email" placeholder="Email" />

            <Button
              variant="ghost"
              className="text-white bg-primary"
              type="submit"
            >
              Signin with Resend
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
}
