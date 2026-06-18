"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import AppShell from "@/components/layout/AppShell"
import LevelBadge from "@/components/ui/LevelBadge"
import AchievementBadges from "@/components/ui/AchievementBadges"

function CapsuleSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ background: "#141417", border: "1px solid rgba(139,124,255,.08)", borderRadius: 10, padding: "14px 18px" }}>
          <div className="skeleton" style={{ height: 14, width: "60%", marginBottom: 8 }} />
          <div className="skeleton" style={{ height: 10, width: "35%" }} />
        </div>
      ))}
    </div>
  )
}

export default function HomePage() {
  const router = useRouter()
  const [caps, setCaps] = useState<any[]>([])
  const [guardian, setGuardian] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const API = process.env.NEXT_PUBLIC_API_URL || ""

  useEffect(() => {
    const token = localStorage.getItem("gd_token")
    if (!token) { router.push("/"); return }
    try { const u = localStorage.getItem("gd_user"); if (u) setUser(JSON.parse(u)) } catch {}
    const h = { Authorization: "Bearer " + token }
    Promise.all([
      fetch(API + "/guardian/weekly", { headers: h }).then((r) => (r.ok ? r.json() : null)).catch(() => null),
      fetch(API + "/capsules/mine", { headers: h }).then((r) => (r.ok ? r.json() : null)).catch(() => null),
      fetch(API + "/users/me", { headers: h }).then((r) => (r.ok ? r.json() : null)).catch(() => null),
    ]).then(([g, c, u]) => {
      setGuardian(g)
      setCaps(c?.items || [])
      if (u) { setUser(u); localStorage.setItem("gd_user", JSON.stringify(u)) }
      setLoading(false)
    })
  }, [API, router])

  return (
    <AppShell>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "20px 20px 40px" }}>
        {user && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: 20 }}>
            <div className="serif" style={{ fontSize: 22, fontStyle: "italic", color: "#E0E0F0" }}>
              Welcome, {user.display_name || "Grey Writer"}
            </div>
          </motion.div>
        )}

        {loading ? (
          <div className="skeleton" style={{ height: 90, borderRadius: 14, marginBottom: 20 }} />
        ) : user?.level ? (
          <div style={{ marginBottom: 20 }}>
            <LevelBadge level={user.level} />
          </div>
        ) : null}

        {loading ? (
          <div className="skeleton" style={{ height: 140, borderRadius: 14, marginBottom: 24 }} />
        ) : guardian ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ background: "#141417", border: "1px solid rgba(139,124,255,.22)", borderRadius: 14, padding: 22, marginBottom: 24, animation: "gs 4s ease-in-out infinite" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 16 }}>🔮</span>
              <span style={{ fontSize: 10, color: "#8B7CFF", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" }}>Grey Guardian · This Week</span>
            </div>
            <p className="serif" style={{ fontSize: 15, fontStyle: "italic", color: "#D0D0E0", lineHeight: 1.72 }}>{guardian.content}</p>
          </motion.div>
        ) : null}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          <Link href="/capsule/new/" className="tap-shrink" style={{ background: "linear-gradient(135deg,#8B7CFF,#5A4FCC)", borderRadius: 12, padding: "18px 20px", textDecoration: "none", display: "block" }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>🔒</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#fff", marginBottom: 4 }}>Seal a Capsule</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)" }}>Write before you know</div>
          </Link>
          <Link href="/explore/" className="tap-shrink" style={{ background: "#141417", border: "1px solid rgba(139,124,255,.2)", borderRadius: 12, padding: "18px 20px", textDecoration: "none", display: "block" }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>📖</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#F5F5F5", marginBottom: 4 }}>Explore Stories</div>
            <div style={{ fontSize: 12, color: "#6B6B80" }}>Community capsules</div>
          </Link>
        </div>

        {!loading && user?.badges && (
          <div style={{ marginBottom: 28 }}>
            <AchievementBadges earned={user.badges} />
          </div>
        )}

        <div style={{ fontSize: 11, color: "#6B6B80", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 14 }}>
          Your Capsules {!loading && `(${caps.length})`}
        </div>

        {loading ? (
          <CapsuleSkeleton />
        ) : caps.length === 0 ? (
          <div style={{ background: "#141417", border: "1px solid rgba(139,124,255,.1)", borderRadius: 12, padding: "36px", textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>📔</div>
            <p className="serif" style={{ fontSize: 16, fontStyle: "italic", color: "#9090A8", marginBottom: 16 }}>You haven't sealed anything yet.</p>
            <Link href="/capsule/new/" style={{ color: "#8B7CFF", fontSize: 13, textDecoration: "none" }}>Seal your first story →</Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {caps.slice(0, 8).map((c: any, i: number) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                style={{ background: "#141417", border: "1px solid " + (c.status === "revealed" ? "rgba(196,168,74,.18)" : "rgba(139,124,255,.14)"), borderRadius: 10, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div className="serif" style={{ fontSize: 14, fontStyle: "italic", color: "#E0E0F0", marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>"{c.title}"</div>
                  <div style={{ fontSize: 10, color: "#6B6B80" }}>{c.mood} · {c.category}</div>
                </div>
                <span style={{ fontSize: 9, color: c.status === "revealed" ? "#C4A84A" : "#8B7CFF", background: c.status === "revealed" ? "rgba(196,168,74,.1)" : "rgba(139,124,255,.1)", border: "1px solid " + (c.status === "revealed" ? "rgba(196,168,74,.2)" : "rgba(139,124,255,.2)"), borderRadius: 20, padding: "3px 10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", flexShrink: 0, marginLeft: 10 }}>
                  {c.status}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}
