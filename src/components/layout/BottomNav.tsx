"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

const TABS = [
  { href: "/home/", label: "Home", icon: "🏠" },
  { href: "/explore/", label: "Explore", icon: "📖" },
  { href: "/capsule/new/", label: "Seal", icon: "🔒", primary: true },
  { href: "/wrapped/", label: "Wrapped", icon: "✨" },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="bottom-nav-wrap"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 150,
        background: "rgba(15,15,20,.92)",
        backdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(139,124,255,.12)",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "8px 6px",
        paddingBottom: "calc(8px + env(safe-area-inset-bottom))",
      }}
    >
      {TABS.map((tab) => {
        const active = pathname === tab.href || (tab.href !== "/home/" && pathname?.startsWith(tab.href))
        return (
          <Link key={tab.href} href={tab.href} style={{ textDecoration: "none", flex: 1 }}>
            <motion.div
              whileTap={{ scale: 0.88 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                padding: "6px 4px",
                position: "relative",
              }}
            >
              {tab.primary ? (
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: active
                      ? "linear-gradient(135deg,#A89BFF,#8B7CFF)"
                      : "linear-gradient(135deg,#8B7CFF,#5A4FCC)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 17,
                    marginTop: -18,
                    boxShadow: "0 4px 16px rgba(139,124,255,.4)",
                    border: "3px solid #0F0F14",
                  }}
                >
                  {tab.icon}
                </div>
              ) : (
                <span style={{ fontSize: 18, opacity: active ? 1 : 0.55 }}>{tab.icon}</span>
              )}
              <span
                style={{
                  fontSize: 9.5,
                  fontWeight: active ? 600 : 400,
                  color: active ? "#A89BFF" : "#6B6B80",
                  letterSpacing: ".01em",
                }}
              >
                {tab.label}
              </span>
              {active && !tab.primary && (
                <motion.div
                  layoutId="nav-dot"
                  style={{
                    position: "absolute",
                    top: -2,
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "#8B7CFF",
                  }}
                />
              )}
            </motion.div>
          </Link>
        )
      })}
    </nav>
  )
}
