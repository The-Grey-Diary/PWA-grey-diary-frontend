const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("gd_token")
}

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Request failed" }))
    throw new Error(err.detail || "Request failed")
  }
  if (res.status === 204) return undefined as T
  return res.json()
}

export const api = {
  auth: {
    me: () => request("/auth/me"),
    googleCallback: (code: string) =>
      request<{ access_token: string; user: any }>("/auth/google/callback", {
        method: "POST",
        body: JSON.stringify({ code }),
      }),
    logout: () => request("/auth/logout", { method: "POST" }),
    googleUrl: () => `${API}/auth/google`,
  },
  capsules: {
    explore: (page = 1, category?: string, mood?: string) => {
      const p = new URLSearchParams({ page: String(page), sort: "recent" })
      if (category) p.set("category", category)
      if (mood) p.set("mood", mood)
      return request<any>(`/capsules/?${p}`)
    },
    mine: (page = 1) => request<any>(`/capsules/mine?page=${page}`),
    get: (id: string) => request<any>(`/capsules/${id}`),
    create: (data: any) => request<any>("/capsules/", { method: "POST", body: JSON.stringify(data) }),
    seal: (id: string, reveal_date: string) =>
      request<any>(`/capsules/${id}/seal`, { method: "POST", body: JSON.stringify({ reveal_date }) }),
    stats: () => request<any>("/capsules/stats"),
    react: (id: string, type: string) =>
      request<any>(`/capsules/${id}/react?reaction_type=${type}`, { method: "POST" }),
  },
  guardian: {
    weekly: () => request<any>("/guardian/weekly"),
  },
  court: {
    today: () => request<any>("/court/today"),
  },
}

export function saveToken(token: string) {
  localStorage.setItem("gd_token", token)
}
export function clearToken() {
  localStorage.removeItem("gd_token")
}
