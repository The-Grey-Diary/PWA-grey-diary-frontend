"use client"
import Link from "next/link"

export default function NotFound() {
  return (
    <div style={{ background: "#0B0B0D", minHeight: "100vh", color: "#F5F5F5", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24, fontFamily: "Inter,system-ui,sans-serif" }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>🌫️</div>
      <h1 className="serif" style={{ fontSize: 28, fontStyle: "italic", marginBottom: 10 }}>This page hasn't been written yet.</h1>
      <p style={{ fontSize: 13, color: "#8888A8", marginBottom: 28, maxWidth: 360, lineHeight: 1.7 }}>
        Maybe it's sealed somewhere, waiting for its own reveal date. Either way, it isn't here.
      </p>
      <Link href="/" style={{ background: "linear-gradient(135deg,#8B7CFF,#5A4FCC)", borderRadius: 10, padding: "12px 24px", color: "#fff", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
        Back to The Grey Diary
      </Link>
    </div>
  )
}
