"use client";
import { useState } from "react";
import { Capsule, MOOD_COLORS, ReactionType } from "@/types";
import { capsules as capsuleApi } from "@/lib/api";
import { formatDistanceToNow, format } from "date-fns";

interface CapsuleCardProps {
  capsule: Capsule;
  onReact?: (id: string, type: ReactionType) => void;
  showEcho?: boolean;
  isOwner?: boolean;
}

const REACTION_EMOJIS: Record<ReactionType, string> = {
  heart: "❤️",
  heartbreak: "💔",
  fire: "🔥",
  candle: "🕯️",
};

export function CapsuleCard({ capsule, showEcho = true, isOwner }: CapsuleCardProps) {
  const [localReactions, setLocalReactions] = useState(capsule.reactions);
  const [myReactions, setMyReactions] = useState<Set<ReactionType>>(
    new Set(capsule.my_reactions || [])
  );

  const mood = MOOD_COLORS[capsule.mood];
  const isRevealed = capsule.status === "revealed";
  const daysLeft = capsule.days_until_reveal;

  const handleReact = async (type: ReactionType) => {
    const hasReacted = myReactions.has(type);
    try {
      if (hasReacted) {
        await capsuleApi.unreact(capsule.id, type);
        setMyReactions(prev => { const s = new Set(prev); s.delete(type); return s; });
        setLocalReactions(prev => prev ? { ...prev, [type]: prev[type] - 1 } : prev);
      } else {
        await capsuleApi.react(capsule.id, type);
        setMyReactions(prev => new Set([...prev, type]));
        setLocalReactions(prev => prev ? { ...prev, [type]: prev[type] + 1 } : prev);
      }
    } catch (e) { /* show toast */ }
  };

  return (
    <div
      className={`capsule-card ${capsule.status}`}
      style={{
        background: "#141417",
        border: `1px solid ${isRevealed ? "rgba(196,168,74,0.25)" : `${mood.primary}22`}`,
        borderRadius: 16,
        padding: "24px",
        position: "relative",
        transition: "border-color 0.3s ease",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Avatar placeholder */}
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${mood.primary}, #5A4FCC)` }} />
          <span style={{ fontSize: 12, color: "#9595A8", fontWeight: 500 }}>
            {capsule.user?.display_name || "Anonymous"}
          </span>
        </div>

        {/* Status badge */}
        {isRevealed ? (
          <span style={{ fontSize: 9, color: "#C4A84A", background: "rgba(196,168,74,0.1)", border: "1px solid rgba(196,168,74,0.2)", borderRadius: 20, padding: "2px 10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Revealed
          </span>
        ) : capsule.status === "sealed" ? (
          <span style={{ fontSize: 9, color: "#8B7CFF", background: "rgba(139,124,255,0.1)", border: "1px solid rgba(139,124,255,0.2)", borderRadius: 20, padding: "2px 10px", fontWeight: 600 }}>
            {daysLeft === 0 ? "Today" : daysLeft === 1 ? "Tomorrow" : `${daysLeft}d`}
          </span>
        ) : (
          <span style={{ fontSize: 9, color: "#6B6B80", background: "#1A1A20", borderRadius: 20, padding: "2px 10px" }}>
            Draft
          </span>
        )}
      </div>

      {/* Mood tag */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center" }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: mood.primary, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {capsule.mood}
        </span>
        <span style={{ fontSize: 10, color: "#6B6B80" }}>·</span>
        <span style={{ fontSize: 10, color: "#6B6B80" }}>{capsule.category}</span>
      </div>

      {/* Title */}
      <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18, fontWeight: 400, fontStyle: "italic", color: "#F5F5F5", lineHeight: 1.45, marginBottom: 12 }}>
        "{capsule.title}"
      </h3>

      {/* Content — only show for revealed or owner */}
      {(isRevealed || isOwner) && (
        <p style={{ fontSize: 13.5, color: "#9090A8", lineHeight: 1.72, marginBottom: 16 }}>
          {capsule.content.slice(0, 240)}{capsule.content.length > 240 ? "..." : ""}
        </p>
      )}

      {/* Grey Observer reflection */}
      {capsule.reflection && (
        <div style={{ background: "rgba(139,124,255,0.06)", border: "1px solid rgba(139,124,255,0.12)", borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
          <div style={{ fontSize: 9, color: "#8B7CFF", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
            👁 Grey Observer
          </div>
          <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 13, fontStyle: "italic", color: "#B0B0CC", lineHeight: 1.65 }}>
            {capsule.reflection.reflection}
          </p>
        </div>
      )}

      {/* Echo — shown after reveal */}
      {showEcho && capsule.echo && (
        <div style={{ borderTop: "1px solid rgba(196,168,74,0.1)", paddingTop: 16, marginTop: 4 }}>
          <div style={{ fontSize: 9, color: "#C4A84A", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
            Echo · What happened
          </div>
          <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 13.5, fontStyle: "italic", color: "#D0D0E0", lineHeight: 1.7 }}>
            {capsule.echo.content}
          </p>
        </div>
      )}

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(139,124,255,0.06)" }}>
        {/* Date */}
        <span style={{ fontSize: 10, color: "#6B6B80" }}>
          {isRevealed && capsule.revealed_at
            ? `Revealed ${format(new Date(capsule.revealed_at), "MMM d, yyyy")}`
            : capsule.sealed_at
            ? `Sealed ${formatDistanceToNow(new Date(capsule.sealed_at), { addSuffix: true })}`
            : format(new Date(capsule.created_at), "MMM d")}
        </span>

        {/* Reactions — only for revealed */}
        {isRevealed && (
          <div style={{ display: "flex", gap: 12 }}>
            {(Object.entries(REACTION_EMOJIS) as [ReactionType, string][]).map(([type, emoji]) => (
              <button
                key={type}
                onClick={() => handleReact(type)}
                style={{
                  background: myReactions.has(type) ? `${mood.bg}` : "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  color: "#9595A8",
                  padding: "3px 6px",
                  borderRadius: 6,
                  transition: "background 0.2s",
                }}
              >
                {emoji} {localReactions?.[type] || 0}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
