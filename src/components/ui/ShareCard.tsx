"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface ShareCardProps {
  title: string
  sealedExcerpt: string
  echoExcerpt?: string
  mood: string
  category: string
  daysWaited: number
  handle?: string
  reactions?: { heart?: number; fire?: number; candle?: number }
  onClose?: () => void
}

const MOOD_COLORS: Record<string, string> = {
  Fear: "#FF6B78", Hope: "#52C4A0", Love: "#FF7BAC", Regret: "#9B88C4", Unknown: "#6FB8E0",
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ")
  const lines: string[] = []
  let line = ""
  for (const word of words) {
    const test = line ? line + " " + word : word
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line)
      line = word
    } else {
      line = test
    }
  }
  if (line) lines.push(line)
  return lines
}

export default function ShareCard({ title, sealedExcerpt, echoExcerpt, mood, category, daysWaited, handle = "Grey Writer", reactions, onClose }: ShareCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dataUrl, setDataUrl] = useState<string>("")
  const [generating, setGenerating] = useState(true)
  const moodColor = MOOD_COLORS[mood] || "#8B7CFF"

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const W = 1080, H = 1920
    canvas.width = W
    canvas.height = H

    // Background
    const bg = ctx.createLinearGradient(0, 0, 0, H)
    bg.addColorStop(0, "#14141A")
    bg.addColorStop(1, "#0B0B0D")
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, W, H)

    // Subtle grid
    ctx.strokeStyle = "rgba(139,124,255,0.04)"
    ctx.lineWidth = 1
    for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
    for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }

    // Ambient glow
    const glow = ctx.createRadialGradient(W / 2, 480, 0, W / 2, 480, 500)
    glow.addColorStop(0, "rgba(139,124,255,0.12)")
    glow.addColorStop(1, "rgba(139,124,255,0)")
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, W, H)

    let y = 130

    // Logo mark
    ctx.fillStyle = "#8B7CFF"
    ctx.beginPath()
    ctx.roundRect(W / 2 - 28, y - 28, 56, 56, 14)
    ctx.fill()
    ctx.font = "32px system-ui"
    ctx.textAlign = "center"
    ctx.fillText("📔", W / 2, y + 12)
    y += 70

    ctx.fillStyle = "#F5F5F5"
    ctx.font = "italic 38px Georgia, serif"
    ctx.fillText("The Grey Diary", W / 2, y)
    y += 90

    // SEALED label
    ctx.fillStyle = "#8B7CFF"
    ctx.font = "600 24px system-ui"
    ctx.textAlign = "left"
    const labelX = 90
    ctx.fillText("SEALED · " + daysWaited + " DAYS AGO", labelX, y)
    y += 50

    // Sealed quote box
    ctx.fillStyle = "rgba(20,20,23,0.8)"
    ctx.strokeStyle = "rgba(139,124,255,0.3)"
    ctx.lineWidth = 2
    const boxH1 = 280
    ctx.beginPath()
    ctx.roundRect(labelX, y, W - labelX * 2, boxH1, 24)
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = "#D8D8EE"
    ctx.font = "italic 34px Georgia, serif"
    const sealedLines = wrapText(ctx, '"' + sealedExcerpt + '"', W - labelX * 2 - 80)
    let ly = y + 65
    for (const line of sealedLines.slice(0, 5)) {
      ctx.fillText(line, labelX + 40, ly)
      ly += 48
    }
    y += boxH1 + 60

    // Arrow + days
    ctx.strokeStyle = "rgba(196,168,74,0.5)"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(W / 2, y)
    ctx.lineTo(W / 2, y + 50)
    ctx.stroke()
    ctx.fillStyle = "#C4A84A"
    ctx.beginPath()
    ctx.moveTo(W / 2, y + 50)
    ctx.lineTo(W / 2 - 10, y + 38)
    ctx.lineTo(W / 2 + 10, y + 38)
    ctx.fill()
    y += 90

    // ECHO / REVEALED label
    ctx.fillStyle = "#C4A84A"
    ctx.font = "600 24px system-ui"
    ctx.fillText(echoExcerpt ? "ECHO · REVEALED" : "REVEALED", labelX, y)
    y += 50

    // Echo quote box
    const boxH2 = echoExcerpt ? 280 : 140
    ctx.fillStyle = "rgba(20,20,23,0.8)"
    ctx.strokeStyle = "rgba(196,168,74,0.35)"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.roundRect(labelX, y, W - labelX * 2, boxH2, 24)
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = "#D8D8EE"
    ctx.font = "italic 34px Georgia, serif"
    const echoText = echoExcerpt ? '"' + echoExcerpt + '"' : "What happened next is now part of the record."
    const echoLines = wrapText(ctx, echoText, W - labelX * 2 - 80)
    ly = y + 65
    for (const line of echoLines.slice(0, 5)) {
      ctx.fillText(line, labelX + 40, ly)
      ly += 48
    }
    y += boxH2 + 60

    // Mood + category tags
    ctx.font = "600 22px system-ui"
    ctx.fillStyle = moodColor
    ctx.fillText(mood.toUpperCase(), labelX, y)
    ctx.fillStyle = "#6B6B80"
    const moodWidth = ctx.measureText(mood.toUpperCase()).width
    ctx.fillText(" · " + category, labelX + moodWidth, y)
    y += 60

    // Reactions row
    if (reactions) {
      ctx.font = "26px system-ui"
      ctx.fillStyle = "#9090A8"
      const r = `❤️ ${reactions.heart || 0}    🔥 ${reactions.fire || 0}    🕯️ ${reactions.candle || 0}`
      ctx.fillText(r, labelX, y)
      y += 60
    }

    // Footer
    ctx.textAlign = "center"
    ctx.fillStyle = "rgba(139,124,255,0.15)"
    ctx.fillRect(labelX, H - 130, W - labelX * 2, 1)
    ctx.font = "22px system-ui"
    ctx.fillStyle = "#6B6B80"
    ctx.fillText("thegreydiary.online", W / 2, H - 90)
    ctx.font = "italic 24px Georgia, serif"
    ctx.fillStyle = "#8888A8"
    ctx.fillText("— " + handle, W / 2, H - 50)

    setDataUrl(canvas.toDataURL("image/png"))
    setGenerating(false)
  }, [title, sealedExcerpt, echoExcerpt, mood, category, daysWaited, handle, reactions, moodColor])

  const download = () => {
    const link = document.createElement("a")
    link.download = "grey-diary-" + title.slice(0, 20).replace(/\s+/g, "-") + ".png"
    link.href = dataUrl
    link.click()
  }

  const share = async () => {
    if (!canvasRef.current) return
    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return
      const file = new File([blob], "grey-diary-story.png", { type: "image/png" })
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: "The Grey Diary", text: "I wrote this before I knew what would happen." })
        } catch {}
      } else {
        download()
      }
    }, "image/png")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,.85)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: 20, backdropFilter: "blur(8px)",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, maxHeight: "90vh" }}
      >
        <div style={{ position: "relative", maxHeight: "70vh", borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(139,124,255,.25)" }}>
          {generating && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#0B0B0D" }}>
              <div style={{ width: 32, height: 32, border: "2px solid rgba(139,124,255,.2)", borderTop: "2px solid #8B7CFF", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            </div>
          )}
          <canvas ref={canvasRef} style={{ maxHeight: "70vh", width: "auto", display: "block" }} />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={share} className="tap-shrink" style={{ background: "#fff", border: "none", borderRadius: 10, padding: "12px 22px", color: "#111", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "Inter,sans-serif" }}>
            Share
          </button>
          <button onClick={download} className="tap-shrink" style={{ background: "transparent", border: "1px solid rgba(255,255,255,.3)", borderRadius: 10, padding: "12px 22px", color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "Inter,sans-serif" }}>
            Download
          </button>
          <button onClick={onClose} className="tap-shrink" style={{ background: "transparent", border: "none", borderRadius: 10, padding: "12px 18px", color: "#9090A8", fontSize: 14, cursor: "pointer", fontFamily: "Inter,sans-serif" }}>
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
