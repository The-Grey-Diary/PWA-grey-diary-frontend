export type Plan = "free" | "plus" | "premium"
export type CapsuleStatus = "draft" | "sealed" | "revealed"
export type Mood = "Fear" | "Hope" | "Love" | "Regret" | "Unknown"
export type Category = "Love" | "Family" | "Career" | "Regret" | "Dreams" | "Life Change"
export type ReactionType = "heart" | "heartbreak" | "fire" | "candle"

export interface User {
  id: string
  email: string
  display_name: string
  avatar_style: string
  plan: Plan
  created_at?: string
}

export interface Capsule {
  id: string
  user_id: string
  title: string
  content: string
  category: Category
  mood: Mood
  reveal_date: string
  status: CapsuleStatus
  is_public: boolean
  view_count: number
  sealed_at?: string
  revealed_at?: string
  created_at?: string
}

export interface GuardianReport {
  id: string
  week_start: string
  content: string
  stats?: { sealed_count: number; revealed_count: number }
  generated_at: string
}

export const MOOD_COLORS: Record<Mood, { primary: string; bg: string }> = {
  Fear:    { primary: "#FF6B78", bg: "rgba(255,107,120,0.1)" },
  Hope:    { primary: "#52C4A0", bg: "rgba(82,196,160,0.1)" },
  Love:    { primary: "#FF7BAC", bg: "rgba(255,123,172,0.1)" },
  Regret:  { primary: "#9B88C4", bg: "rgba(155,136,196,0.1)" },
  Unknown: { primary: "#6FB8E0", bg: "rgba(111,184,224,0.1)" },
}
