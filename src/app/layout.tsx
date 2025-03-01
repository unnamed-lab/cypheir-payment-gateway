import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ToastProvider } from "@/components/ui/use-toast"
import { ThemeProvider } from "@/components/theme-provider"
// import { SideNav } from "@/components/side-nav"
import { AuthProvider } from "@/lib/auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CypheirPay | Decentralized Crypto Payment Gateway",
  description:
    "Seamlessly accept and manage crypto payments with automatic USDC conversion powered by Jupiter Protocol",
  keywords: "crypto payments, blockchain, web3, decentralized finance, DeFi, Solana, Jupiter Protocol",
  authors: [{ name: "CypheirPay Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cypheirpay.com",
    siteName: "CypheirPay",
    title: "CypheirPay - Next-Gen Crypto Payment Solutions",
    description: "Revolutionize your business with CypheirPay's decentralized payment infrastructure",
    images: [
      {
        url: "https://cypheirpay.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CypheirPay - Decentralized Crypto Payment Gateway",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CypheirPay - Decentralized Crypto Payment Gateway",
    description: "Seamlessly accept and manage crypto payments with automatic USDC conversion",
    images: ["https://cypheirpay.com/twitter-image.png"],
    creator: "@CypheirPay",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <ToastProvider>
              <div className="flex h-screen overflow-hidden bg-gradient-to-br from-background to-background/90">
                {/* <SideNav /> */}
                <main className="flex-1 overflow-y-auto">{children}</main>
              </div>
            </ToastProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'