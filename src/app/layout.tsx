import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "The Grey Diary — Where Stories Wait for Their Endings",
  description: "Write before you know what happens next. Seal your story. Let time pass. Return.",
  openGraph: {
    title: "The Grey Diary",
    description: "Write before you know what happens next.",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
