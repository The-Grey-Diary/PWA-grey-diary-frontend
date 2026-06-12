// THE GREY DIARY — TypeScript Types

export type Plan = "free" | "plus" | "premium";
export type CapsuleStatus = "draft" | "sealed" | "revealed";
export type Mood = "Fear" | "Hope" | "Love" | "Regret" | "Unknown";
export type Category = "Love" | "Family" | "Career" | "Regret" | "Dreams" | "Life Change";
export type ReactionType = "heart" | "heartbreak" | "fire" | "candle";
export type CourtStatus = "pending" | "active" | "archived";

export interface User {
  id: string;
  email: string;
  display_name: string;
  avatar_style: string;
  plan: Plan;
  plan_expires_at?: string;
  created_at: string;
}

export interface Capsule {
  id: string;
  user_id: string;
  user?: Pick<User, "id" | "display_name" | "avatar_style">;
  title: string;
  content: string;
  category: Category;
  mood: Mood;
  reveal_date: string;
  status: CapsuleStatus;
  is_public: boolean;
  view_count: number;
  sealed_at?: string;
  revealed_at?: string;
  created_at: string;
  // Relations
  reflection?: CapsuleReflection;
  echo?: CapsuleEcho;
  reactions?: ReactionCounts;
  my_reactions?: ReactionType[];
  days_until_reveal?: number;
}

export interface CapsuleReflection {
  id: string;
  capsule_id: string;
  reflection: string;
  generated_at: string;
}

export interface CapsuleEcho {
  id: string;
  capsule_id: string;
  content: string;
  mood?: Mood;
  created_at: string;
}

export interface ReactionCounts {
  heart: number;
  heartbreak: number;
  fire: number;
  candle: number;
}

export interface CourtSession {
  id: string;
  capsule_id: string;
  capsule?: Capsule;
  scheduled_for: string;
  status: CourtStatus;
  verdict?: string;
  verdict_count: {
    stayed: number;
    left: number;
    understood: number;
    unknown: number;
  };
}

export interface CourtQuestion {
  id: string;
  session_id: string;
  user?: Pick<User, "id" | "display_name">;
  question: string;
  is_answered: boolean;
  answer?: string;
  upvotes: number;
  created_at: string;
}

export interface GuardianReport {
  id: string;
  week_start: string;
  content: string;
  stats?: {
    sealed_count: number;
    revealed_count: number;
    top_mood: Mood;
  };
  generated_at: string;
}

export interface PersonalReport {
  id: string;
  content: string;
  capsule_count: number;
  generated_at: string;
}

export interface Subscription {
  id: string;
  plan: "plus" | "premium";
  provider: "razorpay" | "paypal";
  status: "active" | "cancelled" | "expired";
  current_period_end: string;
}

// API response wrappers
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  has_more: boolean;
}

export interface CommunityStats {
  total_sealed: number;
  total_revealed: number;
  total_users: number;
  mood_distribution: Record<Mood, number>;
  revealing_tonight: number;
}

// UI state
export interface CapsuleFilters {
  category?: Category;
  mood?: Mood;
  sort: "recent" | "reactions" | "discussed";
}

export const MOOD_COLORS: Record<Mood, { primary: string; bg: string; glow: string }> = {
  Fear:    { primary: "#FF6B78", bg: "rgba(255,107,120,0.1)",  glow: "rgba(255,107,120,0.4)" },
  Hope:    { primary: "#52C4A0", bg: "rgba(82,196,160,0.1)",   glow: "rgba(82,196,160,0.4)" },
  Love:    { primary: "#FF7BAC", bg: "rgba(255,123,172,0.1)",  glow: "rgba(255,123,172,0.4)" },
  Regret:  { primary: "#9B88C4", bg: "rgba(155,136,196,0.1)", glow: "rgba(155,136,196,0.4)" },
  Unknown: { primary: "#6FB8E0", bg: "rgba(111,184,224,0.1)",  glow: "rgba(111,184,224,0.4)" },
};

export const PLAN_LIMITS: Record<Plan, number> = {
  free: 3,
  plus: 25,
  premium: Infinity,
};

export const PLAN_PRICES = {
  plus:    { inr: 149, display: "₹149/month" },
  premium: { inr: 399, display: "₹399/month" },
};
