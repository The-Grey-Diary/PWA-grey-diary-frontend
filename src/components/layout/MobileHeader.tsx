"use client"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function MobileHeader() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const u = localStorage.getItem("gd_user")
      if (u) setUser(JSON.parse(u))
    } catch {}
  }, [])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  const logout = () => {
    localStorage.removeItem("gd_token")
    localStorage.removeItem("gd_user")
    router.push("/")
  }

  const initial = (user?.display_name || "G").trim().charAt(0).toUpperCase()

  return (
    <header
      className="mobile-header-wrap"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 140,
        background: "rgba(11,11,13,.92)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(139,124,255,.08)",
        height: 56,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      <Link href="/home/" style={{ fontFamily: "Instrument Serif,serif", fontSize: 16, fontStyle: "italic", textDecoration: "none", color: "#F5F5F5" }}>
        The Grey Diary
      </Link>

      <div ref={wrapRef} style={{ position: "relative" }}>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setOpen((o) => !o)}
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#8B7CFF,#5A4FCC)",
            border: "none",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "Inter,sans-serif",
          }}
        >
          {initial}
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              style={{
                position: "absolute",
                top: 44,
                right: 0,
                background: "#16161B",
                border: "1px solid rgba(139,124,255,.18)",
                borderRadius: 12,
                padding: 6,
                minWidth: 170,
                boxShadow: "0 14px 36px rgba(0,0,0,.45)",
              }}
            >
              <Link
                href="/upgrade/"
                onClick={() => setOpen(false)}
                style={{ display: "flex", alignItems: "center", gap: 9, padding: "11px 12px", borderRadius: 8, textDecoration: "none", color: "#C4A84A", fontSize: 13.5, fontWeight: 500 }}
              >
                ✨ Upgrade
              </Link>
              <div style={{ height: 1, background: "rgba(139,124,255,.08)", margin: "2px 4px" }} />
              <button
                onClick={logout}
                style={{ display: "flex", alignItems: "center", gap: 9, padding: "11px 12px", borderRadius: 8, background: "transparent", border: "none", color: "#9090A8", fontSize: 13.5, width: "100%", textAlign: "left", cursor: "pointer", fontFamily: "Inter,sans-serif" }}
              >
                ↪ Sign out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
