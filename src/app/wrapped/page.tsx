"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import AppShell from "@/components/layout/AppShell"

const MOOD_COLORS: Record<string, string> = {
  Fear: "#FF6B78", Hope: "#52C4A0", Love: "#FF7BAC", Regret: "#9B88C4", Unknown: "#6FB8E0",
}

export default function WrappedPage() {
  const router = useRouter()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [slide, setSlide] = useState(0)
  const API = process.env.NEXT_PUBLIC_API_URL || ""
  const year = new Date().getFullYear()

  useEffect(() => {
    const token = localStorage.getItem("gd_token")
    if (!token) { router.push("/"); return }
    fetch(API + "/wrapped/" + year, { headers: { Authorization: "Bearer " + token } })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [API, router, year])

  if (loading) {
    return (
      <AppShell>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "70vh" }}>
          <div style={{ width: 36, height: 36, border: "2px solid rgba(139,124,255,.2)", borderTop: "2px solid #8B7CFF", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        </div>
      </AppShell>
    )
  }

  if (!data || data.empty) {
    return (
      <AppShell>
        <div style={{ maxWidth: 480, margin: "0 auto", padding: "60px 24px", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>✨</div>
          <h1 className="serif" style={{ fontSize: 26, fontStyle: "italic", marginBottom: 12 }}>Your {year} Wrapped isn't ready yet.</h1>
          <p style={{ fontSize: 14, color: "#8888A8", lineHeight: 1.7, marginBottom: 24 }}>
            Seal a few stories this year and your personalized recap will appear here — your dominant mood, your longest wait, your whole year in Grey.
          </p>
          <button onClick={() => router.push("/capsule/new/")} className="tap-shrink" style={{ background: "linear-gradient(135deg,#8B7CFF,#5A4FCC)", border: "none", borderRadius: 10, padding: "12px 24px", color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
            Seal Your First Story
          </button>
        </div>
      </AppShell>
    )
  }

  const slides = buildSlides(data, year)

  return (
    <AppShell>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "20px 20px 40px", minHeight: "75vh", display: "flex", flexDirection: "column" }}>
        {/* Progress dots */}
        <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
          {slides.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= slide ? "#8B7CFF" : "rgba(139,124,255,.15)", transition: "background .3s" }} />
          ))}
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              style={{ width: "100%" }}
            >
              {slides[slide]}
            </motion.div>
          </AnimatePresence>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          {slide > 0 && (
            <button onClick={() => setSlide((s) => s - 1)} className="tap-shrink" style={{ flex: 1, background: "transparent", border: "1px solid rgba(139,124,255,.25)", borderRadius: 10, padding: 13, color: "#8B7CFF", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
              Back
            </button>
          )}
          {slide < slides.length - 1 ? (
            <button onClick={() => setSlide((s) => s + 1)} className="tap-shrink" style={{ flex: 2, background: "linear-gradient(135deg,#8B7CFF,#5A4FCC)", border: "none", borderRadius: 10, padding: 13, color: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
              Continue
            </button>
          ) : (
            <button onClick={() => router.push("/home/")} className="tap-shrink" style={{ flex: 2, background: "linear-gradient(135deg,#C4A84A,#A8893A)", border: "none", borderRadius: 10, padding: 13, color: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
              Done
            </button>
          )}
        </div>
      </div>
    </AppShell>
  )
}

function SlideCard({ children, glow = "purple" }: { children: React.ReactNode; glow?: "purple" | "gold" }) {
  return (
    <div
      style={{
        background: "#141417",
        border: glow === "gold" ? "1px solid rgba(196,168,74,.25)" : "1px solid rgba(139,124,255,.22)",
        borderRadius: 22,
        padding: "44px 28px",
        textAlign: "center",
        animation: (glow === "gold" ? "gg" : "gs") + " 4s ease-in-out infinite",
      }}
    >
      {children}
    </div>
  )
}

function buildSlides(data: any, year: number) {
  const moodColor = MOOD_COLORS[data.dominant_mood] || "#8B7CFF"

  return [
    <SlideCard key="intro">
      <div style={{ fontSize: 11, color: "#8B7CFF", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 18 }}>Your {year} in Grey</div>
      <div className="serif" style={{ fontSize: 38, fontStyle: "italic", lineHeight: 1.2, marginBottom: 16 }}>A year of writing<br />before you knew.</div>
      <div style={{ fontSize: 13, color: "#8888A8" }}>Let's look back.</div>
    </SlideCard>,

    <SlideCard key="sealed">
      <div style={{ fontSize: 64, marginBottom: 8 }}>🔒</div>
      <div className="serif" style={{ fontSize: 64, fontWeight: 400 }}>{data.total_sealed}</div>
      <div style={{ fontSize: 14, color: "#8888A8", marginTop: 8 }}>
        {data.total_sealed === 1 ? "story" : "stories"} sealed against the unknown
      </div>
    </SlideCard>,

    <SlideCard key="mood" glow="gold">
      <div style={{ fontSize: 11, color: "#C4A84A", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 18 }}>Your Dominant Mood</div>
      <div style={{ fontSize: 56, marginBottom: 10 }}>
        {data.dominant_mood === "Fear" && "😨"}
        {data.dominant_mood === "Hope" && "🌅"}
        {data.dominant_mood === "Love" && "💗"}
        {data.dominant_mood === "Regret" && "🌧️"}
        {data.dominant_mood === "Unknown" && "🌫️"}
      </div>
      <div className="serif" style={{ fontSize: 32, fontStyle: "italic", color: moodColor }}>{data.dominant_mood}</div>
      <div style={{ fontSize: 13, color: "#8888A8", marginTop: 10 }}>showed up more than any other feeling this year</div>
    </SlideCard>,

    <SlideCard key="wait">
      <div style={{ fontSize: 11, color: "#8B7CFF", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 18 }}>The Longest Wait</div>
      <div className="serif" style={{ fontSize: 56, fontWeight: 400 }}>{data.longest_wait_days ?? "—"}</div>
      <div style={{ fontSize: 14, color: "#8888A8", marginTop: 8 }}>days between sealing and revealing</div>
      <div style={{ fontSize: 12, color: "#6B6B80", marginTop: 18, fontStyle: "italic" }} className="serif">
        That's longer than most people wait for anything.
      </div>
    </SlideCard>,

    <SlideCard key="echoes" glow="gold">
      <div style={{ display: "flex", justifyContent: "center", gap: 28 }}>
        <div>
          <div className="serif" style={{ fontSize: 36 }}>{data.total_echoes}</div>
          <div style={{ fontSize: 10, color: "#8888A8", textTransform: "uppercase", letterSpacing: ".05em" }}>Echoes</div>
        </div>
        <div>
          <div className="serif" style={{ fontSize: 36 }}>{data.total_reactions}</div>
          <div style={{ fontSize: 10, color: "#8888A8", textTransform: "uppercase", letterSpacing: ".05em" }}>Reactions</div>
        </div>
      </div>
      <div style={{ fontSize: 13, color: "#8888A8", marginTop: 18 }}>The community was listening.</div>
    </SlideCard>,

    <SlideCard key="badges">
      <div style={{ fontSize: 11, color: "#8B7CFF", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 18 }}>Badges Earned</div>
      {data.badges_earned?.length > 0 ? (
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
          {data.badges_earned.map((b: any) => (
            <div key={b.id} style={{ width: 60, height: 60, borderRadius: 14, background: "rgba(139,124,255,.1)", border: "1px solid rgba(139,124,255,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>
              {b.icon}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ fontSize: 13, color: "#6B6B80" }}>Your first badges are still ahead of you.</div>
      )}
    </SlideCard>,

    <SlideCard key="final" glow="gold">
      <div className="serif" style={{ fontSize: 26, fontStyle: "italic", lineHeight: 1.4, marginBottom: 16 }}>
        "{data.total_sealed} moments you didn't yet understand.<br />Now you do."
      </div>
      <div style={{ fontSize: 12, color: "#8888A8" }}>Thank you for trusting the unknown with us.</div>
    </SlideCard>,
  ]
}
