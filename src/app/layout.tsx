import type { Metadata } from "next"
import "./globals.css"
export const metadata: Metadata = {
  title: "The Grey Diary — Write before you know what happens next",
  description: "Seal your story. Let time pass. Return to discover what became of your fears, hopes, and questions.",
  openGraph: { title: "The Grey Diary", description: "Write before you know what happens next.", type: "website", url: "https://thegreydiary.online" },
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
