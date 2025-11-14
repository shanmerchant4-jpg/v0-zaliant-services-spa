import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/context/cart-context"
import { AuthProvider } from "@/context/auth-context"
import { NotificationProvider } from "@/context/notification-context"
import { ScrollProgress } from "@/components/scroll-progress"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zaliant Services | Premium Digital Products",
  description: "Premium gaming tools and services - Valorant Pro, HWID Spoofer, and more",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/zaliant-logo.png",
        type: "image/png",
      },
    ],
    apple: "/zaliant-logo.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#7D5FFF",
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased bg-background text-foreground`}>
        <ScrollProgress />
        <NotificationProvider>
          <AuthProvider>
            <CartProvider>{children}</CartProvider>
          </AuthProvider>
        </NotificationProvider>
        <Analytics />
      </body>
    </html>
  )
}
