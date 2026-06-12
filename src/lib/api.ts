/**
 * THE GREY DIARY — API Client
 * Typed wrapper around all backend endpoints.
 */
import {
  Capsule, CapsuleEcho, CourtSession, CourtQuestion,
  GuardianReport, PersonalReport, User, PaginatedResponse,
  CommunityStats, CapsuleFilters, Mood, Category, ReactionType
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new ApiError(res.status, err.detail || "Request failed");
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}


// ─── AUTH ────────────────────────────────────────────────────────────────────
export const auth = {
  getMe: () => request<User>("/auth/me"),
  logout: () => request<void>("/auth/logout", { method: "POST" }),
  googleLoginUrl: () => `${API_URL}/auth/google`,
};


// ─── CAPSULES ────────────────────────────────────────────────────────────────
export const capsules = {
  create: (data: {
    title: string; content: string; category: Category;
    mood: Mood; reveal_date: string; is_public?: boolean;
  }) => request<Capsule>("/capsules/", { method: "POST", body: JSON.stringify(data) }),

  explore: (filters: CapsuleFilters & { page?: number }) => {
    const params = new URLSearchParams({
      page: String(filters.page || 1),
      sort: filters.sort,
      ...(filters.category && { category: filters.category }),
      ...(filters.mood && { mood: filters.mood }),
    });
    return request<PaginatedResponse<Capsule>>(`/capsules/?${params}`);
  },

  mine: (page = 1, status?: string) => {
    const params = new URLSearchParams({ page: String(page) });
    if (status) params.set("status", status);
    return request<PaginatedResponse<Capsule>>(`/capsules/mine?${params}`);
  },

  getById: (id: string) => request<Capsule>(`/capsules/${id}`),

  update: (id: string, data: Partial<Capsule>) =>
    request<Capsule>(`/capsules/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  delete: (id: string) =>
    request<void>(`/capsules/${id}`, { method: "DELETE" }),

  seal: (id: string, reveal_date: string) =>
    request<Capsule>(`/capsules/${id}/seal`, {
      method: "POST",
      body: JSON.stringify({ reveal_date }),
    }),

  react: (id: string, type: ReactionType) =>
    request<void>(`/capsules/${id}/react?reaction_type=${type}`, { method: "POST" }),

  unreact: (id: string, type: ReactionType) =>
    request<void>(`/capsules/${id}/react?reaction_type=${type}`, { method: "DELETE" }),

  stats: () => request<CommunityStats>("/capsules/stats"),
};


// ─── ECHOES ──────────────────────────────────────────────────────────────────
export const echoes = {
  add: (capsule_id: string, content: string, mood?: Mood) =>
    request<CapsuleEcho>(`/capsules/${capsule_id}/echo`, {
      method: "POST",
      body: JSON.stringify({ content, mood }),
    }),

  update: (capsule_id: string, content: string, mood?: Mood) =>
    request<CapsuleEcho>(`/capsules/${capsule_id}/echo`, {
      method: "PUT",
      body: JSON.stringify({ content, mood }),
    }),
};


// ─── COURT ───────────────────────────────────────────────────────────────────
export const court = {
  today: () => request<CourtSession>("/court/today"),

  archive: (page = 1) =>
    request<PaginatedResponse<CourtSession>>(`/court/archive?page=${page}`),

  askQuestion: (session_id: string, question: string) =>
    request<CourtQuestion>(`/court/${session_id}/question`, {
      method: "POST",
      body: JSON.stringify({ question }),
    }),

  answerQuestion: (session_id: string, question_id: string, answer: string) =>
    request<CourtQuestion>(`/court/${session_id}/answer`, {
      method: "PUT",
      body: JSON.stringify({ question_id, answer }),
    }),

  vote: (session_id: string, verdict: string) =>
    request<void>(`/court/${session_id}/vote`, {
      method: "POST",
      body: JSON.stringify({ verdict }),
    }),
};


// ─── GUARDIAN ────────────────────────────────────────────────────────────────
export const guardian = {
  weekly: () => request<GuardianReport>("/guardian/weekly"),

  weeklyArchive: (page = 1) =>
    request<PaginatedResponse<GuardianReport>>(`/guardian/weekly/archive?page=${page}`),

  personal: () => request<PersonalReport>("/guardian/personal"),

  generatePersonal: () =>
    request<PersonalReport>("/guardian/personal/generate", { method: "POST" }),
};


// ─── PAYMENTS ────────────────────────────────────────────────────────────────
export const payments = {
  createOrder: (plan: "plus" | "premium", provider: "razorpay" | "paypal") =>
    request<{ order_id: string; amount: number; currency: string; key?: string }>(
      "/payments/create-order",
      { method: "POST", body: JSON.stringify({ plan, provider }) }
    ),

  verify: (data: {
    provider: string;
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
    paypal_order_id?: string;
  }) => request<{ success: boolean; plan: string }>(
    "/payments/verify",
    { method: "POST", body: JSON.stringify(data) }
  ),

  cancel: () => request<void>("/payments/cancel", { method: "POST" }),

  plans: () => request<{
    plus: { price_inr: number; price_usd: number; features: string[] };
    premium: { price_inr: number; price_usd: number; features: string[] };
  }>("/payments/plans"),
};


// ─── NOTIFICATIONS ───────────────────────────────────────────────────────────
export const notifications = {
  subscribe: (subscription: PushSubscription) =>
    request<void>("/notifications/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription.toJSON()),
    }),

  unsubscribe: () =>
    request<void>("/notifications/unsubscribe", { method: "POST" }),
};


export default { auth, capsules, echoes, court, guardian, payments, notifications };
