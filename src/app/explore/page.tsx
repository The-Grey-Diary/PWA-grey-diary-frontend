"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import AppShell from "@/components/layout/AppShell"
import ShareCard from "@/components/ui/ShareCard"

const MC: Record<string, string> = { Fear: "#FF6B78", Hope: "#52C4A0", Love: "#FF7BAC", Regret: "#9B88C4", Unknown: "#6FB8E0" }

function CardSkeleton() {
  return (
    <div style={{ background: "#141417", border: "1px solid rgba(139,124,255,.08)", borderRadius: 14, padding: 22 }}>
      <div className="skeleton" style={{ height: 12, width: "30%", marginBottom: 14 }} />
      <div className="skeleton" style={{ height: 20, width: "70%", marginBottom: 10 }} />
      <div className="skeleton" style={{ height: 14, width: "100%", marginBottom: 6 }} />
      <div className="skeleton" style={{ height: 14, width: "85%" }} />
    </div>
  )
}

export default function ExplorePage() {
  const [caps, setCaps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [mood, setMood] = useState("")
  const [shareCap, setShareCap] = useState<any>(null)
  const API = process.env.NEXT_PUBLIC_API_URL || ""

  useEffect(() => {
    setLoading(true)
    const p = new URLSearchParams({ page: "1", sort: "recent" })
    if (mood) p.set("mood", mood)
    fetch(API + "/capsules/?" + p).then((r) => (r.ok ? r.json() : null)).then((d) => { setCaps(d?.items || []); setLoading(false) }).catch(() => setLoading(false))
  }, [mood, API])

  return (
    <AppShell>
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "20px 20px 40px" }}>
        <h1 className="serif" style={{ fontSize: 32, fontWeight: 400, letterSpacing: "-.02em", marginBottom: 22 }}>Revealed stories.</h1>
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap", overflowX: "auto", paddingBottom: 4 }}>
          {["", "Fear", "Hope", "Love", "Regret", "Unknown"].map((m) => (
            <button key={m} onClick={() => setMood(m)} className="tap-shrink" style={{ background: mood === m ? "rgba(139,124,255,.2)" : "#141417", border: "1px solid " + (mood === m ? "rgba(139,124,255,.5)" : "rgba(139,124,255,.15)"), borderRadius: 20, padding: "6px 14px", fontSize: 12, color: mood === m ? "#A89BFF" : "#7878A0", cursor: "pointer", fontFamily: "Inter,sans-serif", whiteSpace: "nowrap", flexShrink: 0 }}>
              {m || "All"}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <CardSkeleton /><CardSkeleton /><CardSkeleton />
          </div>
        ) : caps.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p className="serif" style={{ fontSize: 18, fontStyle: "italic", color: "#6B6B80", marginBottom: 16 }}>No revealed stories yet.</p>
            <Link href="/capsule/new/" style={{ color: "#8B7CFF", fontSize: 13, textDecoration: "none" }}>Seal one →</Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {caps.map((c: any, i: number) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{ background: "#141417", border: "1px solid rgba(196,168,74,.22)", borderRadius: 14, padding: 22 }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 10, color: MC[c.mood] || "#8B7CFF", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>{c.mood}</span>
                  <span style={{ fontSize: 9, color: "#C4A84A", background: "rgba(196,168,74,.1)", border: "1px solid rgba(196,168,74,.2)", borderRadius: 20, padding: "2px 9px", fontWeight: 600 }}>Revealed</span>
                </div>
                <div className="serif" style={{ fontSize: 17, fontStyle: "italic", color: "#E8E8F0", lineHeight: 1.45, marginBottom: 8 }}>"{c.title}"</div>
                <p style={{ fontSize: 13, color: "#8888A8", lineHeight: 1.65, marginBottom: 12 }}>{(c.content || "").slice(0, 200)}{(c.content || "").length > 200 ? "..." : ""}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 10, color: "#6B6B80" }}>{c.category}</div>
                  <button
                    onClick={() => setShareCap(c)}
                    className="tap-shrink"
                    style={{ background: "rgba(139,124,255,.1)", border: "1px solid rgba(139,124,255,.25)", borderRadius: 8, padding: "6px 14px", color: "#A89BFF", fontSize: 11, fontWeight: 500, cursor: "pointer", fontFamily: "Inter,sans-serif", display: "flex", alignItems: "center", gap: 5 }}
                  >
                    ✨ Share
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {shareCap && (
          <ShareCard
            title={shareCap.title}
            sealedExcerpt={(shareCap.content || "").slice(0, 160)}
            mood={shareCap.mood}
            category={shareCap.category}
            daysWaited={Math.max(1, Math.round((new Date(shareCap.revealed_at || shareCap.reveal_date).getTime() - new Date(shareCap.sealed_at || shareCap.created_at).getTime()) / 86400000))}
            handle="Grey Writer"
            onClose={() => setShareCap(null)}
          />
        )}
      </AnimatePresence>
    </AppShell>
  )
}
