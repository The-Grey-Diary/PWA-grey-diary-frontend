"use client"
import { useEffect, useState } from "react"

export default function AdminPage() {
  const [secret, setSecret] = useState("")
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const API = process.env.NEXT_PUBLIC_API_URL || ""

  const load = async () => {
    if (!secret) return
    setLoading(true); setError(""); setData(null)
    try {
      const r = await fetch(API + "/admin/stats", {
        headers: { "x-admin-secret": secret },
      })
      if (!r.ok) throw new Error("Wrong secret or server error")
      setData(await r.json())
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const inp = {
    background: "#0F0F14",
    border: "1px solid rgba(139,124,255,.2)",
    borderRadius: 8,
    padding: "10px 14px",
    color: "#F5F5F5",
    fontSize: 14,
    fontFamily: "Inter,sans-serif",
    outline: "none",
    width: "100%",
  } as any

  return (
    <div style={{ background: "#0B0B0D", minHeight: "100vh", color: "#F5F5F5", fontFamily: "Inter,system-ui,sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <div style={{ fontSize: 10, color: "#8B7CFF", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 10 }}>Admin</div>
        <h1 style={{ fontFamily: "Instrument Serif,serif", fontSize: 26, fontStyle: "italic", marginBottom: 24 }}>The Grey Diary — Metrics</h1>

        <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
          <input
            style={inp}
            type="password"
            placeholder="Enter your SCHEDULER_SECRET"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && load()}
          />
          <button
            onClick={load}
            style={{ background: "linear-gradient(135deg,#8B7CFF,#5A4FCC)", border: "none", borderRadius: 8, padding: "10px 20px", color: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "Inter,sans-serif", whiteSpace: "nowrap" }}
          >
            {loading ? "Loading..." : "View Stats"}
          </button>
        </div>

        {error && (
          <div style={{ background: "rgba(255,107,120,.08)", border: "1px solid rgba(255,107,120,.2)", borderRadius: 8, padding: "12px 16px", color: "#FF9BA3", fontSize: 13, marginBottom: 20 }}>
            {error}
          </div>
        )}

        {data && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Users */}
            <div style={{ background: "#141417", border: "1px solid rgba(139,124,255,.22)", borderRadius: 14, padding: 24 }}>
              <div style={{ fontSize: 10, color: "#8B7CFF", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 14 }}>Users</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
                {[
                  ["Total", data.users.total],
                  ["Free", data.users.free],
                  ["Paid", data.users.paid],
                ].map(([l, v]) => (
                  <div key={String(l)}>
                    <div style={{ fontFamily: "Instrument Serif,serif", fontSize: 28, fontStyle: "italic" }}>{v}</div>
                    <div style={{ fontSize: 10, color: "#6B6B80", textTransform: "uppercase", letterSpacing: ".06em" }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, height: 1, background: "rgba(139,124,255,.08)" }} />
              <div style={{ marginTop: 12, fontSize: 13, color: "#9090A8" }}>
                Conversion rate: <span style={{ color: data.users.conversion_pct > 0 ? "#52C4A0" : "#FF6B78", fontWeight: 600 }}>{data.users.conversion_pct}%</span>
                <span style={{ fontSize: 11, marginLeft: 8, color: "#6B6B80" }}>
                  {data.users.by_plan && Object.entries(data.users.by_plan).map(([k, v]) => `${k}: ${v}`).join(" · ")}
                </span>
              </div>
            </div>

            {/* Capsules */}
            <div style={{ background: "#141417", border: "1px solid rgba(196,168,74,.22)", borderRadius: 14, padding: 24 }}>
              <div style={{ fontSize: 10, color: "#C4A84A", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 14 }}>Capsules</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
                {[
                  ["Total", data.capsules.total],
                  ["Sealed", data.capsules.by_status?.sealed || 0],
                  ["Revealed", data.capsules.by_status?.revealed || 0],
                ].map(([l, v]) => (
                  <div key={String(l)}>
                    <div style={{ fontFamily: "Instrument Serif,serif", fontSize: 28, fontStyle: "italic" }}>{v}</div>
                    <div style={{ fontSize: 10, color: "#6B6B80", textTransform: "uppercase", letterSpacing: ".06em" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement */}
            <div style={{ background: "#141417", border: "1px solid rgba(139,124,255,.1)", borderRadius: 14, padding: 24 }}>
              <div style={{ fontSize: 10, color: "#8B7CFF", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 14 }}>Engagement</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  ["Total Echoes", data.engagement.total_echoes],
                  ["Total Reactions", data.engagement.total_reactions],
                ].map(([l, v]) => (
                  <div key={String(l)}>
                    <div style={{ fontFamily: "Instrument Serif,serif", fontSize: 28, fontStyle: "italic" }}>{v}</div>
                    <div style={{ fontSize: 10, color: "#6B6B80", textTransform: "uppercase", letterSpacing: ".06em" }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, fontSize: 11, color: "#555570" }}>
                Echo rate: {data.capsules.by_status?.revealed > 0
                  ? Math.round((data.engagement.total_echoes / data.capsules.by_status.revealed) * 100) + "% of revealed capsules have an echo"
                  : "No revealed capsules yet"}
              </div>
            </div>

            <div style={{ fontSize: 11, color: "#555570", textAlign: "center" }}>
              This page is unlocked by your SCHEDULER_SECRET. Don't share the URL with secret pre-filled.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
