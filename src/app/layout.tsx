import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ToastProvider } from "@/components/ui/use-toast";
import { ThemeProvider } from "@/components/theme-provider";
// import { SideNav } from "@/components/side-nav"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pay.cypheir.xyz"),
  title: "CypheirPay | Decentralized Crypto Payment Gateway",
  description:
    "Seamlessly accept and manage crypto payments with automatic USDC conversion powered by Jupiter Protocol",
  keywords:
    "crypto payments, blockchain, web3, decentralized finance, DeFi, Solana, Jupiter Protocol",
  authors: [{ name: "CypheirPay Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pay.cypheir.xyz",
    siteName: "CypheirPay",
    title: "CypheirPay - Next-Gen Crypto Payment Solutions",
    description:
      "Revolutionize your business with CypheirPay's decentralized payment infrastructure",
    images: [
      {
        url: "https://pay.cypheir.xyz/og-image.png",
        width: 1200,
        height: 630,
        alt: "CypheirPay - Decentralized Crypto Payment Gateway",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CypheirPay - Decentralized Crypto Payment Gateway",
    description:
      "Seamlessly accept and manage crypto payments with automatic USDC conversion",
    images: ["https://pay.cypheir.xyz/twitter-image.png"],
    creator: "@CypheirPay",
  },
  generator: "v0.dev",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" className="dark">
      <body className={poppins.className}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider>
              <div className="flex h-screen overflow-hidden bg-gradient-to-br from-background to-background/90">
                <Navbar session={session} />
                {/* <SideNav /> */}
                <main className="flex-1 overflow-y-auto pt-8">{children}</main>
              </div>
            </ToastProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import { Navbar } from "@/components/navbar";
import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
