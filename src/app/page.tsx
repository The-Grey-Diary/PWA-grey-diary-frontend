"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

const MOOD_PILLS = [
  { label: "Fear", color: "#FF6B78" },
  { label: "Hope", color: "#52C4A0" },
  { label: "Love", color: "#FF7BAC" },
  { label: "Regret", color: "#9B88C4" },
  { label: "Unknown", color: "#6FB8E0" },
]

const SAMPLE_CAPSULES = [
  { title: "The letter I couldn't send", mood: "Regret", days: "127d", status: "sealed" },
  { title: "Before the interview", mood: "Fear", days: "Revealed", status: "revealed" },
  { title: "The dream I almost gave up", mood: "Hope", days: "44d", status: "sealed" },
  { title: "If this is the last time", mood: "Love", days: "12d", status: "sealed" },
]

const MOOD_COLORS: Record<string, string> = {
  Fear: "#FF6B78", Hope: "#52C4A0", Love: "#FF7BAC", Regret: "#9B88C4", Unknown: "#6FB8E0"
}

export default function LandingPage() {
  const [guardianText, setGuardianText] = useState("")
  const [guardianLoading, setGuardianLoading] = useState(true)
  const [typingIndex, setTypingIndex] = useState(0)
  const [stats, setStats] = useState({ sealed: 0, revealed: 0, users: 0 })

  const FALLBACK = "This week, 417 stories were entrusted to time.\n\n63 returned with answers.\n\nMost fears never arrived as imagined.\n\nThe Grey Diary holds what you cannot carry alone."

  // Fetch Guardian + stats
  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

    Promise.all([
      fetch(`${API}/guardian/weekly`).then(r => r.ok ? r.json() : null).catch(() => null),
      fetch(`${API}/capsules/stats`).then(r => r.ok ? r.json() : null).catch(() => null),
    ]).then(([guardian, s]) => {
      const text = guardian?.content || FALLBACK
      setGuardianLoading(false)
      // Animate stats
      if (s) {
        const target = { sealed: s.total_sealed || 0, revealed: s.total_revealed || 0, users: s.total_users || 0 }
        let frame = 0
        const interval = setInterval(() => {
          frame++
          const pct = Math.min(frame / 60, 1)
          setStats({
            sealed:   Math.floor(pct * target.sealed),
            revealed: Math.floor(pct * target.revealed),
            users:    Math.floor(pct * target.users),
          })
          if (pct >= 1) clearInterval(interval)
        }, 25)
      }
      // Typewriter for Guardian
      let i = 0
      const iv = setInterval(() => {
        if (i < text.length) { setGuardianText(text.slice(0, ++i)); i++ }
        else clearInterval(iv)
      }, 15)
    })
  }, [])

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  return (
    <div style={{ background: "#0B0B0D", minHeight: "100vh", color: "#F5F5F5", fontFamily: "Inter, system-ui, sans-serif" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(11,11,13,.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(139,124,255,.07)", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px" }}>
        <div style={{ fontFamily: "Instrument Serif, Georgia, serif", fontSize: 16, fontStyle: "italic" }}>The Grey Diary</div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <a href="#explore" style={{ color: "#7B7B8F", fontSize: 13, textDecoration: "none" }}>Explore</a>
          <a href={`${API_URL}/auth/google`} style={{ background: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", color: "#111", fontSize: 13, fontWeight: 500, cursor: "pointer", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <GoogleIcon />
            Continue with Google
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 24px 60px", position: "relative" }}>
        <StarField />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 680, animation: "fadeup .8s ease forwards" }}>
          {/* Eyebrow */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(139,124,255,.08)", border: "1px solid rgba(139,124,255,.2)", borderRadius: 20, padding: "5px 14px", marginBottom: 28 }}>
            <div style={{ width: 6, height: 6, background: "#52C4A0", borderRadius: "50%", animation: "pulse 2s ease-in-out infinite" }} />
            <span style={{ fontSize: 10, color: "#8B7CFF", fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase" }}>Social Reflection Platform</span>
          </div>

          <h1 style={{ fontFamily: "Instrument Serif, serif", fontSize: "clamp(40px, 7vw, 68px)", lineHeight: 1.1, fontWeight: 400, letterSpacing: "-.03em", marginBottom: 20 }}>
            Write before you know<br />
            <em style={{ background: "linear-gradient(135deg,#A89BFF,#D4CCFF,#8B7CFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              what happens next.
            </em>
          </h1>

          <p style={{ fontSize: 16, color: "#7B7B8F", lineHeight: 1.65, maxWidth: 440, margin: "0 auto 44px" }}>
            Seal your story. Let time pass. Return to discover what became of your fears, your hopes, your questions.
          </p>

          {/* Guardian Card */}
          <div style={{ background: "#141417", border: "1px solid rgba(139,124,255,.22)", borderRadius: 14, padding: "22px 26px", maxWidth: 520, margin: "0 auto 44px", textAlign: "left", animation: "glow-seal 4s ease-in-out infinite" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "radial-gradient(circle,#8B7CFF,#5A4FCC)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🔮</div>
              <div>
                <div style={{ fontSize: 10, color: "#8B7CFF", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" }}>Grey Guardian</div>
                <div style={{ fontSize: 10, color: "#6B6B80" }}>Weekly Chronicle</div>
              </div>
              <div style={{ marginLeft: "auto", width: 7, height: 7, background: "#52C4A0", borderRadius: "50%", animation: "pulse 2s ease-in-out infinite" }} />
            </div>
            {guardianLoading ? (
              <div style={{ display: "flex", gap: 5, padding: "8px 0" }}>
                {[0, .2, .4].map(d => <div key={d} style={{ width: 5, height: 5, background: "#8B7CFF", borderRadius: "50%", animation: `pulse .8s ${d}s ease-in-out infinite` }} />)}
              </div>
            ) : (
              <div style={{ fontFamily: "Instrument Serif, serif", fontSize: 15, fontStyle: "italic", color: "#D0D0E0", lineHeight: 1.72 }}>
                {guardianText}
                <span style={{ animation: "cursor-blink 1s infinite", color: "#8B7CFF" }}>|</span>
              </div>
            )}
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 36, justifyContent: "center", marginBottom: 44, flexWrap: "wrap" }}>
            {[["Sealed", stats.sealed], ["Revealed", stats.revealed], ["Writers", stats.users]].map(([l, v]) => (
              <div key={l as string} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "Instrument Serif, serif", fontSize: 28, fontWeight: 400, letterSpacing: "-.03em" }}>{(v as number).toLocaleString()}</div>
                <div style={{ fontSize: 10, color: "#6B6B80", marginTop: 3, letterSpacing: ".06em", textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`${API_URL}/auth/google`} style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", border: "none", borderRadius: 10, padding: "12px 24px", color: "#111", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
              <GoogleIcon />
              Seal Your First Story
            </a>
            <Link href="/explore" style={{ background: "transparent", border: "1px solid rgba(139,124,255,.3)", borderRadius: 10, padding: "12px 20px", color: "#8B7CFF", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
              Explore Stories →
            </Link>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "#6B6B80", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", animation: "float 2.5s ease-in-out infinite" }}>
          <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, transparent, rgba(139,124,255,.4))" }} />
          Scroll
        </div>
      </section>

      {/* CAPSULE PREVIEW */}
      <section id="explore" style={{ padding: "80px 24px", background: "#0D0D10", borderTop: "1px solid rgba(139,124,255,.06)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontFamily: "Instrument Serif, serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 400, letterSpacing: "-.02em", marginBottom: 12 }}>Stories sealed right now.</div>
            <p style={{ fontSize: 14, color: "#7B7B8F" }}>Real uncertainty. Real people. Real time.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {SAMPLE_CAPSULES.map((c, i) => (
              <div key={i} style={{ background: "#141417", border: `1px solid ${c.status === "revealed" ? "rgba(196,168,74,.28)" : "rgba(139,124,255,.2)"}`, borderRadius: 14, padding: "20px", animation: c.status === "revealed" ? "glow-gold 4s ease-in-out infinite" : "glow-seal 4s ease-in-out infinite" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 10, color: MOOD_COLORS[c.mood], fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>{c.mood}</span>
                  <span style={{ fontSize: 9, color: c.status === "revealed" ? "#C4A84A" : "#8B7CFF", background: c.status === "revealed" ? "rgba(196,168,74,.1)" : "rgba(139,124,255,.1)", border: `1px solid ${c.status === "revealed" ? "rgba(196,168,74,.2)" : "rgba(139,124,255,.2)"}`, borderRadius: 20, padding: "2px 8px", fontWeight: 600 }}>{c.days}</span>
                </div>
                <div style={{ fontFamily: "Instrument Serif, serif", fontSize: 15, fontStyle: "italic", color: "#E8E8F0", lineHeight: 1.45 }}>"{c.title}"</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "80px 24px", maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontFamily: "Instrument Serif, serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 400, letterSpacing: "-.02em", marginBottom: 48 }}>Five moments.<br /><em style={{ color: "#8B7CFF" }}>One story.</em></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {[
            ["✍️", "Write", "During uncertainty. Before you know the ending."],
            ["🔒", "Seal", "Choose when it unlocks. The Observer leaves one reflection."],
            ["⏳", "Wait", "The capsule counts down. You live your life."],
            ["🌅", "Return", "The seal breaks. The community bears witness."],
            ["🌊", "Echo", "Add what happened. The story becomes whole."],
          ].map(([icon, title, desc]) => (
            <div key={title as string} style={{ display: "flex", alignItems: "flex-start", gap: 16, textAlign: "left" }}>
              <div style={{ width: 44, height: 44, background: "#141417", border: "1px solid rgba(139,124,255,.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{icon}</div>
              <div>
                <div style={{ fontFamily: "Instrument Serif, serif", fontSize: 19, marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 13, color: "#7B7B8F", lineHeight: 1.6 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FOOTER */}
      <section style={{ padding: "80px 24px 100px", background: "#0D0D10", borderTop: "1px solid rgba(139,124,255,.06)", textAlign: "center" }}>
        <div style={{ fontFamily: "Instrument Serif, serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 400, letterSpacing: "-.03em", marginBottom: 20 }}>
          "I wrote this<br /><em>before</em> I knew<br />what would happen."
        </div>
        <p style={{ fontSize: 14, color: "#7B7B8F", marginBottom: 40 }}>Seal your moment. The community holds it with you.</p>
        <a href={`${API_URL}/auth/google`} style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", borderRadius: 10, padding: "13px 28px", color: "#111", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
          <GoogleIcon />
          Begin Writing
        </a>
      </section>

      <footer style={{ padding: "24px", borderTop: "1px solid rgba(139,124,255,.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ fontFamily: "Instrument Serif, serif", fontSize: 15, fontStyle: "italic" }}>The Grey Diary</div>
        <div style={{ fontSize: 11, color: "#6B6B80" }}>thegreydiary.online · Where stories wait for their endings</div>
        <div style={{ fontSize: 11, color: "#6B6B80" }}>Built by Shiladitya Mallick</div>
      </footer>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function StarField() {
  const stars = Array.from({ length: 70 }, (_, i) => ({
    x: (i * 137.5) % 100,
    y: (i * 97.3) % 100,
    s: (i % 3) * 0.5 + 0.5,
    d: (i % 5) * 0.8 + 1.5,
    del: (i % 7) * 0.4,
  }))
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {stars.map((s, i) => (
        <div key={i} style={{ position: "absolute", left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, background: "#F5F5F5", borderRadius: "50%", animation: `pulse ${s.d}s ${s.del}s ease-in-out infinite`, opacity: 0.3 }} />
      ))}
    </div>
  )
}
