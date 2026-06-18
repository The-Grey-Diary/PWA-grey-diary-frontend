"use client"
import { motion } from "framer-motion"

interface LevelData {
  title: string
  tagline: string
  progress?: {
    current_count: number
    next_threshold: number
    next_title: string
    pct: number
  } | null
}

export default function LevelBadge({ level }: { level: LevelData }) {
  if (!level) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        background: "linear-gradient(135deg,rgba(139,124,255,.12),rgba(196,168,74,.08))",
        border: "1px solid rgba(139,124,255,.25)",
        borderRadius: 14,
        padding: "16px 20px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: level.progress ? 12 : 0 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "radial-gradient(circle,#8B7CFF,#5A4FCC)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          🔮
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="serif" style={{ fontSize: 17, fontStyle: "italic", color: "#F0F0FA" }}>{level.title}</div>
          <div style={{ fontSize: 11, color: "#8888A8", lineHeight: 1.4, marginTop: 1 }}>{level.tagline}</div>
        </div>
      </div>

      {level.progress && (
        <div>
          <div style={{ height: 5, background: "rgba(139,124,255,.12)", borderRadius: 3, overflow: "hidden", marginBottom: 6 }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${level.progress.pct}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              style={{ height: "100%", background: "linear-gradient(90deg,#8B7CFF,#A89BFF)", borderRadius: 3 }}
            />
          </div>
          <div style={{ fontSize: 10, color: "#6B6B80" }}>
            {level.progress.next_threshold - level.progress.current_count} more capsule
            {level.progress.next_threshold - level.progress.current_count === 1 ? "" : "s"} to become a{" "}
            <span style={{ color: "#A89BFF" }}>{level.progress.next_title}</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}
