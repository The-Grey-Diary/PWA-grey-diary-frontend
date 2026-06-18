"use client"
import { motion } from "framer-motion"
import DesktopNav from "./DesktopNav"
import BottomNav from "./BottomNav"

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <DesktopNav />
      <motion.div
        className="app-content app-content-desktop-pad"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
      <BottomNav />
    </div>
  )
}
