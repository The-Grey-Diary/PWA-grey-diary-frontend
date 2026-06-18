"use client"
import { motion } from "framer-motion"

interface Badge {
  id: string
  name: string
  icon: string
  desc: string
}

const ALL_BADGE_IDS = [
  "first_echo", "night_sealer", "long_wait", "founding_writer",
  "five_moods", "court_appearance", "resonant", "century",
]
const BADGE_META: Record<string, { name: string; icon: string; desc: string }> = {
  first_echo:      { name: "First Echo",      icon: "🌊", desc: "Returned to add what happened." },
  night_sealer:     { name: "Night Sealer",    icon: "🌙", desc: "Sealed a story between midnight and 4am." },
  long_wait:        { name: "The Long Wait",   icon: "⏳", desc: "Held a capsule sealed for 180+ days." },
  founding_writer:  { name: "Founding Writer", icon: "🕯️", desc: "Among the first 1,000 writers." },
  five_moods:       { name: "Full Spectrum",   icon: "🎭", desc: "Sealed a story in every mood." },
  court_appearance: { name: "Heard in Court",  icon: "⚖️", desc: "A story selected for The Court." },
  resonant:         { name: "Resonant",        icon: "🔥", desc: "50+ reactions on your stories." },
  century:          { name: "The Century",     icon: "💯", desc: "100 capsules sealed." },
}

export default function AchievementBadges({ earned }: { earned: Badge[] }) {
  const earnedIds = new Set(earned.map((b) => b.id))

  return (
    <div>
      <div style={{ fontSize: 11, color: "#6B6B80", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 12 }}>
        Achievements · {earned.length}/{ALL_BADGE_IDS.length}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
        {ALL_BADGE_IDS.map((id, i) => {
          const meta = BADGE_META[id]
          const has = earnedIds.has(id)
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileTap={{ scale: 0.92 }}
              title={meta.desc}
              style={{
                aspectRatio: "1",
                background: has ? "rgba(139,124,255,.1)" : "#141417",
                border: has ? "1px solid rgba(139,124,255,.35)" : "1px solid rgba(139,124,255,.08)",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                padding: 6,
                opacity: has ? 1 : 0.35,
                cursor: "default",
              }}
            >
              <div style={{ fontSize: 20, filter: has ? "none" : "grayscale(1)" }}>{meta.icon}</div>
              <div style={{ fontSize: 8, color: has ? "#A89BFF" : "#555570", textAlign: "center", lineHeight: 1.2 }}>
                {meta.name}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
