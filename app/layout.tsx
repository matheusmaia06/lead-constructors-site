import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title:
    "Lead Constructors | Professional Websites for Freelancers & Small Businesses",
  description:
    "End-to-end website development for freelancers and small businesses. We handle everything: domain, hosting, design, and complete setup. Affordable pricing, modern design, and results that drive sales.",
  generator: "v0.app",
  keywords: [
    "website development",
    "freelancer websites",
    "small business websites",
    "web design",
    "affordable websites",
  ],

  // ÍCONES DO SITE (favicon, aba do navegador, ícones em mobile, etc.)
  icons: {
    // favicons em múltiplos tamanhos
    icon: [
      {
        url: "/favicon.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/logo-128.png",
        type: "image/png",
        sizes: "128x128",
      },
      {
        url: "/logo-256.png",
        type: "image/png",
        sizes: "256x256",
      },
      {
        url: "/logo-512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    // ícones para Apple / atalho em tela inicial
    apple: [
      {
        url: "/logo-128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        url: "/logo-256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        url: "/logo-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    // atalho genérico
    shortcut: ["/favicon.png"],
  },

  // Imagem usada em prévia de link (Open Graph: WhatsApp, LinkedIn, etc.)
  openGraph: {
    title:
      "Lead Constructors | Professional Websites for Freelancers & Small Businesses",
    description:
      "End-to-end website development for freelancers and small businesses. We handle everything: domain, hosting, design, and complete setup.",
    url: "/",
    siteName: "Lead Constructors",
    type: "website",
    images: [
      {
        url: "/logo-512.png",
        width: 512,
        height: 512,
        alt: "Lead Constructors logo",
      },
    ],
  },

  // Prévia específica para Twitter/X
  twitter: {
    card: "summary_large_image",
    title:
      "Lead Constructors | Professional Websites for Freelancers & Small Businesses",
    description:
      "End-to-end website development for freelancers and small businesses. We handle everything: domain, hosting, design, and complete setup.",
    images: ["/logo-512.png"],
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
