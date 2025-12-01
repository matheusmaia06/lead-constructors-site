import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Lead Constructors | Professional Websites for Freelancers & Small Businesses',
  description: 'End-to-end website development for freelancers and small businesses. We handle everything: domain, hosting, design, and complete setup. Affordable pricing, modern design, and results that drive sales.',
  generator: 'v0.app',
  keywords: ['website development', 'freelancer websites', 'small business websites', 'web design', 'affordable websites'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-US">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
