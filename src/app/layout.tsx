import type { Metadata, Viewport } from "next"
import Script from "next/script"
import "./globals.css"
import ServiceWorkerRegister from "@/components/layout/ServiceWorkerRegister"

export const metadata: Metadata = {
  title: "The Grey Diary — Write before you know what happens next",
  description: "Seal your story. Let time pass. Return to discover what became of your fears, hopes, and questions.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Grey Diary",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "The Grey Diary",
    description: "Write before you know what happens next.",
    type: "website",
    url: "https://thegreydiary.online",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0B0B0D",
}

// ── Analytics
// Plausible: privacy-first, no cookie banner, GDPR compliant, no data sold.
// Replace YOUR_PLAUSIBLE_DOMAIN with "thegreydiary.online" once you create
// a free account at plausible.io (or self-host).
// GA4: also included — replace G-XXXXXXXXXX with your real Measurement ID
// from Google Analytics → Admin → Data Streams → Measurement ID.
const PLAUSIBLE_DOMAIN = "thegreydiary.online"
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || ""

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Plausible — lightweight, privacy-first, no cookie banner */}
        <Script
          defer
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        {/* GA4 — only loads if you add NEXT_PUBLIC_GA4_ID to Cloudflare env vars */}
        {GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA4_ID}',{page_path:window.location.pathname});`}
            </Script>
          </>
        )}
      </head>
      <body>
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  )
}
