"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import AppShell from "@/components/layout/AppShell"

const MOODS = ["Fear", "Hope", "Love", "Regret", "Unknown"]
const CATS = ["Love", "Family", "Career", "Regret", "Dreams", "Life Change"]
const MC: Record<string, string> = { Fear: "#FF6B78", Hope: "#52C4A0", Love: "#FF7BAC", Regret: "#9B88C4", Unknown: "#6FB8E0" }

export default function NewCapsulePage() {
  const router = useRouter()
  const [form, setForm] = useState({ title: "", content: "", category: "Career", mood: "Fear", reveal_date: "", is_public: true })
  const [busy, setBusy] = useState(false)
  const [sealed, setSealed] = useState(false)
  const [err, setErr] = useState("")
  const API = process.env.NEXT_PUBLIC_API_URL || ""

  const set = (k: string, v: any) => setForm((p) => ({ ...p, [k]: v }))

  const seal = async () => {
    if (!form.title || !form.content || !form.reveal_date) { setErr("Please fill all fields."); return }
    const token = localStorage.getItem("gd_token")
    if (!token) { router.push("/"); return }
    setBusy(true); setErr("")
    try {
      const r = await fetch(API + "/capsules/", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
        body: JSON.stringify({ ...form, status: "sealed", reveal_date: new Date(form.reveal_date).toISOString() }),
      })
      if (!r.ok) { const d = await r.json().catch(() => ({})); throw new Error(d.detail || "Failed") }
      setSealed(true)
      setTimeout(() => router.push("/home/"), 1600)
    } catch (e: any) {
      setErr(e.message || "Failed"); setBusy(false)
    }
  }

  const inp = { background: "#0F0F14", border: "1px solid rgba(139,124,255,.2)", borderRadius: 8, padding: "11px 14px", color: "#F5F5F5", fontSize: 14, width: "100%", fontFamily: "Inter,sans-serif", outline: "none" } as any

  return (
    <AppShell>
      <AnimatePresence>
        {sealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 600, background: "rgba(11,11,13,.96)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}
          >
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              style={{ width: 76, height: 76, borderRadius: "50%", background: "radial-gradient(circle,#8B7CFF,#5A4FCC)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, boxShadow: "0 0 50px rgba(139,124,255,.5)" }}
            >
              🔒
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="serif" style={{ fontSize: 22, fontStyle: "italic", color: "#F0F0FA" }}>
              Sealed.
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ fontSize: 13, color: "#8888A8" }}>
              Time will hold this for you now.
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ maxWidth: 580, margin: "0 auto", padding: "20px 20px 40px" }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 10, color: "#8B7CFF", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 10 }}>New Capsule</div>
          <h1 className="serif" style={{ fontSize: 28, fontWeight: 400, letterSpacing: "-.02em", lineHeight: 1.2 }}>
            Write before you know<br /><em style={{ color: "#8B7CFF" }}>what happens next.</em>
          </h1>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <label style={{ fontSize: 11, color: "#6B6B80", letterSpacing: ".08em", textTransform: "uppercase", display: "block", marginBottom: 7 }}>Title</label>
            <input style={inp} placeholder="The thing you can't say out loud" value={form.title} onChange={(e) => set("title", e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: 11, color: "#6B6B80", letterSpacing: ".08em", textTransform: "uppercase", display: "block", marginBottom: 7 }}>Your story</label>
            <textarea style={{ ...inp, minHeight: 170, resize: "vertical", lineHeight: 1.7 }} placeholder="Write what you feel right now. No one sees this until the seal breaks." value={form.content} onChange={(e) => set("content", e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: 11, color: "#6B6B80", letterSpacing: ".08em", textTransform: "uppercase", display: "block", marginBottom: 7 }}>Mood</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {MOODS.map((m) => (
                <motion.button key={m} whileTap={{ scale: 0.92 }} onClick={() => set("mood", m)} style={{ background: form.mood === m ? MC[m] + "22" : "#141417", border: "1px solid " + (form.mood === m ? MC[m] : "rgba(139,124,255,.15)"), borderRadius: 20, padding: "6px 14px", fontSize: 12, color: form.mood === m ? MC[m] : "#7878A0", cursor: "pointer", fontFamily: "Inter,sans-serif" }}>
                  {m}
                </motion.button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: 11, color: "#6B6B80", letterSpacing: ".08em", textTransform: "uppercase", display: "block", marginBottom: 7 }}>Category</label>
            <select style={{ ...inp, cursor: "pointer" }} value={form.category} onChange={(e) => set("category", e.target.value)}>
              {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, color: "#6B6B80", letterSpacing: ".08em", textTransform: "uppercase", display: "block", marginBottom: 7 }}>Reveal date</label>
            <input type="date" style={inp} value={form.reveal_date} onChange={(e) => set("reveal_date", e.target.value)} min={new Date().toISOString().split("T")[0]} />
            <p style={{ fontSize: 11, color: "#6B6B80", marginTop: 6 }}>Cannot be changed once sealed.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input type="checkbox" id="pub" checked={form.is_public} onChange={(e) => set("is_public", e.target.checked)} style={{ accentColor: "#8B7CFF", width: 15, height: 15 }} />
            <label htmlFor="pub" style={{ fontSize: 13, color: "#9090A8", cursor: "pointer" }}>Share publicly when revealed</label>
          </div>
          {err && <p style={{ color: "#FF6B78", fontSize: 13, background: "rgba(255,107,120,.08)", border: "1px solid rgba(255,107,120,.2)", borderRadius: 8, padding: "10px 14px" }}>{err}</p>}
          <motion.button whileTap={{ scale: 0.97 }} onClick={seal} disabled={busy} style={{ background: busy ? "rgba(139,124,255,.3)" : "linear-gradient(135deg,#8B7CFF,#5A4FCC)", border: "none", borderRadius: 10, padding: 14, color: "#fff", fontSize: 15, fontWeight: 500, cursor: busy ? "not-allowed" : "pointer", fontFamily: "Inter,sans-serif" }}>
            {busy ? "Sealing..." : "🔒 Seal This Capsule"}
          </motion.button>
        </div>
      </div>
    </AppShell>
  )
}
