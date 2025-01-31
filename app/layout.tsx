// app/layout.tsx
import '@/styles/globals.css';
import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '@/components/layout/ErrorFallback'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vaultify',
  description: 'Secure your passwords and data with Vaultify.',
  robots: 'index, follow',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  )
}