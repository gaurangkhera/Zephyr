import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import './globals.css'
import { Toaster } from "@/components/ui/sonner";
import Nav from '@/components/Nav'
import { GeistSans } from 'geist/font/sans'

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "Zephyr - Blending freelance and full-time work.",
    template: "%s | Zephyr"
  },
  description: 'Zephyr is a blend of a freelancing like Fiverr and Upwork, and a business-focused social media platform such as Linkedin.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={GeistSans.className}>
          <ThemeProvider attribute='class' defaultTheme='dark'>
          <Toaster />
          <Nav />
          {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  )
}
