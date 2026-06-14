"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import Link from "next/link"

const MOODS = ["Fear", "Hope", "Love", "Regret", "Unknown"]
const CATEGORIES = ["Love", "Family", "Career", "Regret", "Dreams", "Life Change"]
const MOOD_COLORS: Record<string, string> = {
  Fear: "#FF6B78", Hope: "#52C4A0", Love: "#FF7BAC", Regret: "#9B88C4", Unknown: "#6FB8E0"
}

export default function NewCapsulePage() {
  const router = useRouter()
  const [form, setForm] = useState({ title: "", content: "", category: "Career", mood: "Fear", reveal_date: "", is_public: true })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const set = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }))

  const handleSeal = async () => {
    if (!form.title || !form.content || !form.reveal_date) { setError("Please fill in all fields."); return }
    setSubmitting(true); setError("")
    try {
      await api.capsules.create({ ...form, status: "sealed", reveal_date: new Date(form.reveal_date).toISOString() })
      router.push("/home")
    } catch (e: any) {
      setError(e.message || "Failed to seal capsule"); setSubmitting(false)
    }
  }

  const input = { background: "#0F0F14", border: "1px solid rgba(139,124,255,.2)", borderRadius: 8, padding: "11px 14px", color: "#F5F5F5", fontSize: 14, width: "100%", fontFamily: "Inter, sans-serif", outline: "none" }

  return (
    <div style={{ background: "#0B0B0D", minHeight: "100vh", color: "#F5F5F5", fontFamily: "Inter, system-ui, sans-serif" }}>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(11,11,13,.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(139,124,255,.07)", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
        <Link href="/home" style={{ fontFamily: "Instrument Serif, serif", fontSize: 16, fontStyle: "italic", textDecoration: "none", color: "#F5F5F5" }}>The Grey Diary</Link>
        <Link href="/home" style={{ color: "#7B7B8F", fontSize: 13, textDecoration: "none" }}>← Home</Link>
      </nav>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "80px 24px 60px" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 10, color: "#8B7CFF", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 12 }}>New Capsule</div>
          <h1 style={{ fontFamily: "Instrument Serif, serif", fontSize: 32, fontWeight: 400, letterSpacing: "-.02em", lineHeight: 1.2 }}>
            Write before you know<br /><em style={{ color: "#8B7CFF" }}>what happens next.</em>
          </h1>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Title */}
          <div>
            <label style={{ fontSize: 11, color: "#6B6B80", letterSpacing: ".08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Title</label>
            <input style={input} placeholder="The thing you can't say out loud" value={form.title} onChange={e => set("title", e.target.value)} />
          </div>

          {/* Content */}
          <div>
            <label style={{ fontSize: 11, color: "#6B6B80", letterSpacing: ".08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Your story</label>
            <textarea style={{ ...input, minHeight: 180, resize: "vertical", lineHeight: 1.7 } as any} placeholder="Write what you feel right now. Be honest. No one sees this until the seal breaks." value={form.content} onChange={e => set("content", e.target.value)} />
          </div>

          {/* Mood */}
          <div>
            <label style={{ fontSize: 11, color: "#6B6B80", letterSpacing: ".08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Mood</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {MOODS.map(m => (
                <button key={m} onClick={() => set("mood", m)} style={{ background: form.mood === m ? `${MOOD_COLORS[m]}22` : "#141417", border: `1px solid ${form.mood === m ? MOOD_COLORS[m] : "rgba(139,124,255,.15)"}`, borderRadius: 20, padding: "6px 14px", fontSize: 12, color: form.mood === m ? MOOD_COLORS[m] : "#7878A0", cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all .2s" }}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label style={{ fontSize: 11, color: "#6B6B80", letterSpacing: ".08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Category</label>
            <select style={{ ...input, cursor: "pointer" } as any} value={form.category} onChange={e => set("category", e.target.value)}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Reveal date */}
          <div>
            <label style={{ fontSize: 11, color: "#6B6B80", letterSpacing: ".08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Reveal date</label>
            <input type="date" style={input} value={form.reveal_date} onChange={e => set("reveal_date", e.target.value)} min={new Date().toISOString().split("T")[0]} />
            <p style={{ fontSize: 11, color: "#6B6B80", marginTop: 6 }}>The capsule unlocks on this date. You can't change it once sealed.</p>
          </div>

          {/* Visibility */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input type="checkbox" id="public" checked={form.is_public} onChange={e => set("is_public", e.target.checked)} style={{ accentColor: "#8B7CFF", width: 15, height: 15 }} />
            <label htmlFor="public" style={{ fontSize: 13, color: "#9090A8", cursor: "pointer" }}>Share publicly when revealed</label>
          </div>

          {error && <p style={{ color: "#FF6B78", fontSize: 13, background: "rgba(255,107,120,.08)", border: "1px solid rgba(255,107,120,.2)", borderRadius: 8, padding: "10px 14px" }}>{error}</p>}

          <button onClick={handleSeal} disabled={submitting} style={{ background: submitting ? "rgba(139,124,255,.3)" : "linear-gradient(135deg,#8B7CFF,#5A4FCC)", border: "none", borderRadius: 10, padding: "14px", color: "#fff", fontSize: 15, fontWeight: 500, cursor: submitting ? "not-allowed" : "pointer", fontFamily: "Inter, sans-serif", transition: "opacity .2s" }}>
            {submitting ? "Sealing..." : "🔒 Seal This Capsule"}
          </button>
        </div>
      </div>
    </div>
  )
}
