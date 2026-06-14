"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import Link from "next/link"

export default function HomePage() {
  const router = useRouter()
  const [guardian, setGuardian] = useState<any>(null)
  const [capsules, setCapsules] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("gd_token")
    if (!token) { router.push("/"); return }
    Promise.all([
      api.guardian.weekly().catch(() => null),
      api.capsules.mine().catch(() => ({ items: [] })),
    ]).then(([g, c]) => {
      setGuardian(g)
      setCapsules(c?.items || [])
      setLoading(false)
    })
  }, [router])

  if (loading) return <LoadingScreen />

  return (
    <div style={{ background: "#0B0B0D", minHeight: "100vh", color: "#F5F5F5" }}>
      <Navbar />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px 60px" }}>

        {/* Guardian Chronicle */}
        {guardian && (
          <div style={{ background: "#141417", border: "1px solid rgba(139,124,255,.22)", borderRadius: 14, padding: "24px", marginBottom: 32, animation: "glow-seal 4s ease-in-out infinite" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 16 }}>🔮</span>
              <span style={{ fontSize: 10, color: "#8B7CFF", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" }}>Grey Guardian · This Week</span>
            </div>
            <p style={{ fontFamily: "Instrument Serif, serif", fontSize: 15, fontStyle: "italic", color: "#D0D0E0", lineHeight: 1.72 }}>{guardian.content}</p>
          </div>
        )}

        {/* Quick actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
          <Link href="/capsule/new" style={{ background: "linear-gradient(135deg,#8B7CFF,#5A4FCC)", borderRadius: 12, padding: "18px 20px", textDecoration: "none", display: "block" }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>🔒</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#fff", marginBottom: 4 }}>Seal a Capsule</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)" }}>Write before you know</div>
          </Link>
          <Link href="/explore" style={{ background: "#141417", border: "1px solid rgba(139,124,255,.2)", borderRadius: 12, padding: "18px 20px", textDecoration: "none", display: "block" }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>📖</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#F5F5F5", marginBottom: 4 }}>Explore Stories</div>
            <div style={{ fontSize: 12, color: "#6B6B80" }}>Community capsules</div>
          </Link>
        </div>

        {/* My capsules */}
        <div>
          <div style={{ fontSize: 12, color: "#6B6B80", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 16 }}>Your Capsules</div>
          {capsules.length === 0 ? (
            <div style={{ background: "#141417", border: "1px solid rgba(139,124,255,.1)", borderRadius: 12, padding: "32px", textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📔</div>
              <p style={{ fontFamily: "Instrument Serif, serif", fontSize: 16, fontStyle: "italic", color: "#9090A8" }}>You haven't sealed anything yet.</p>
              <Link href="/capsule/new" style={{ display: "inline-block", marginTop: 16, color: "#8B7CFF", fontSize: 13, textDecoration: "none" }}>Seal your first story →</Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {capsules.slice(0, 5).map((c: any) => (
                <div key={c.id} style={{ background: "#141417", border: "1px solid rgba(139,124,255,.15)", borderRadius: 12, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: "Instrument Serif, serif", fontSize: 15, fontStyle: "italic", color: "#E8E8F0", marginBottom: 4 }}>"{c.title}"</div>
                    <div style={{ fontSize: 11, color: "#6B6B80" }}>{c.mood} · {c.category}</div>
                  </div>
                  <div style={{ fontSize: 9, color: c.status === "revealed" ? "#C4A84A" : "#8B7CFF", background: c.status === "revealed" ? "rgba(196,168,74,.1)" : "rgba(139,124,255,.1)", border: `1px solid ${c.status === "revealed" ? "rgba(196,168,74,.2)" : "rgba(139,124,255,.2)"}`, borderRadius: 20, padding: "3px 10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", flexShrink: 0 }}>
                    {c.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Navbar() {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(11,11,13,.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(139,124,255,.07)", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
      <div style={{ fontFamily: "Instrument Serif, serif", fontSize: 16, fontStyle: "italic" }}>The Grey Diary</div>
      <div style={{ display: "flex", gap: 20 }}>
        <Link href="/home" style={{ color: "#8B7CFF", fontSize: 13, textDecoration: "none" }}>Home</Link>
        <Link href="/explore" style={{ color: "#7B7B8F", fontSize: 13, textDecoration: "none" }}>Explore</Link>
        <Link href="/capsule/new" style={{ color: "#7B7B8F", fontSize: 13, textDecoration: "none" }}>+ Seal</Link>
      </div>
    </nav>
  )
}

function LoadingScreen() {
  return (
    <div style={{ background: "#0B0B0D", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 36, height: 36, border: "2px solid rgba(139,124,255,.2)", borderTop: "2px solid #8B7CFF", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 12px" }} />
        <p style={{ color: "#6B6B80", fontSize: 13 }}>Loading...</p>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
