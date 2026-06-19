"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { motion } from "framer-motion"
import AppShell from "@/components/layout/AppShell"

const PLAN_DETAILS: Record<string, { name: string; price: string; gold: boolean; features: string[] }> = {
  plus: {
    name: "Grey Plus", price: "₹149/mo", gold: false,
    features: ["25 active capsules", "Guardian archive", "Emotional themes", "Early reveals"],
  },
  premium: {
    name: "Grey Premium", price: "₹399/mo", gold: true,
    features: ["Unlimited capsules", "Private vault", "Future letters", "Personal Guardian — reads your whole journey"],
  },
}

declare global {
  interface Window { Razorpay: any }
}

export default function UpgradePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState<string>("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const API = process.env.NEXT_PUBLIC_API_URL || ""

  useEffect(() => {
    const token = localStorage.getItem("gd_token")
    if (!token) { router.push("/"); return }
    fetch(API + "/users/me", { headers: { Authorization: "Bearer " + token } })
      .then((r) => (r.ok ? r.json() : null))
      .then((u) => { setUser(u); setLoading(false) })
      .catch(() => setLoading(false))
  }, [API, router])

  const upgrade = async (plan: string) => {
    setError(""); setPaying(plan)
    const token = localStorage.getItem("gd_token")
    if (!token) { router.push("/"); return }

    try {
      const orderRes = await fetch(API + "/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
        body: JSON.stringify({ plan, provider: "razorpay" }),
      })
      if (!orderRes.ok) {
        const d = await orderRes.json().catch(() => ({}))
        throw new Error(d.detail || "Could not start payment. Please try again.")
      }
      const order = await orderRes.json()

      if (!window.Razorpay) {
        throw new Error("Payment system is still loading — please wait a moment and try again.")
      }

      const rzp = new window.Razorpay({
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        order_id: order.order_id,
        name: "The Grey Diary",
        description: order.plan_name + " Subscription",
        theme: { color: "#8B7CFF" },
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch(API + "/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
              body: JSON.stringify({
                provider: "razorpay",
                plan,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            })
            if (!verifyRes.ok) throw new Error("Payment could not be verified.")
            const result = await verifyRes.json()
            setSuccess(order.plan_name + " is now active.")
            setUser((u: any) => ({ ...u, plan: result.plan }))
            const cached = localStorage.getItem("gd_user")
            if (cached) {
              try {
                const parsed = JSON.parse(cached)
                localStorage.setItem("gd_user", JSON.stringify({ ...parsed, plan: result.plan }))
              } catch {}
            }
            setTimeout(() => router.push("/home/"), 1800)
          } catch (e: any) {
            setError(e.message || "Verification failed. If money was deducted, contact support.")
          } finally {
            setPaying("")
          }
        },
        modal: { ondismiss: () => setPaying("") },
      })
      rzp.open()
    } catch (e: any) {
      setError(e.message || "Something went wrong.")
      setPaying("")
    }
  }

  const currentPlan = user?.plan || "free"

  return (
    <AppShell>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "20px 20px 40px" }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 10, color: "#8B7CFF", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 10 }}>Upgrade</div>
          <h1 className="serif" style={{ fontSize: 28, fontWeight: 400, letterSpacing: "-.02em", lineHeight: 1.2 }}>
            Carry more of your<br /><em style={{ color: "#8B7CFF" }}>uncertain moments.</em>
          </h1>
        </div>

        {!loading && currentPlan !== "free" && (
          <div style={{ background: "rgba(82,196,160,.08)", border: "1px solid rgba(82,196,160,.25)", borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#80D8C8" }}>
            You're currently on <strong style={{ textTransform: "capitalize" }}>{currentPlan}</strong>.
          </div>
        )}

        {success && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} style={{ background: "rgba(82,196,160,.1)", border: "1px solid rgba(82,196,160,.3)", borderRadius: 10, padding: "14px 18px", marginBottom: 20, fontSize: 14, color: "#80D8C8", textAlign: "center" }}>
            ✓ {success}
          </motion.div>
        )}
        {error && (
          <div style={{ background: "rgba(255,107,120,.08)", border: "1px solid rgba(255,107,120,.2)", borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#FF9BA3" }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {Object.entries(PLAN_DETAILS).map(([key, plan]) => {
            const isCurrent = currentPlan === key
            return (
              <div
                key={key}
                style={{
                  background: "#141417",
                  border: "1px solid " + (plan.gold ? "rgba(196,168,74,.3)" : "rgba(139,124,255,.25)"),
                  borderRadius: 18,
                  padding: "24px 22px",
                  animation: (plan.gold ? "gg" : "gs") + " 5s ease-in-out infinite",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                  <div className="serif" style={{ fontSize: 20, color: plan.gold ? "#E8D080" : "#A89BFF" }}>{plan.name}</div>
                  <div style={{ fontSize: 16, fontWeight: 500 }}>{plan.price}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "16px 0 20px" }}>
                  {plan.features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#C0C0D0" }}>
                      <div style={{ width: 3, height: 3, borderRadius: "50%", background: plan.gold ? "#C4A84A" : "#8B7CFF", flexShrink: 0 }} />
                      {f}
                    </div>
                  ))}
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  disabled={isCurrent || paying === key}
                  onClick={() => upgrade(key)}
                  className="tap-shrink"
                  style={{
                    width: "100%",
                    padding: 13,
                    borderRadius: 10,
                    border: "none",
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: isCurrent ? "default" : "pointer",
                    fontFamily: "Inter,sans-serif",
                    background: isCurrent ? "rgba(82,196,160,.15)" : plan.gold ? "linear-gradient(135deg,#C4A84A,#A8893A)" : "linear-gradient(135deg,#8B7CFF,#5A4FCC)",
                    color: isCurrent ? "#80D8C8" : "#fff",
                  }}
                >
                  {isCurrent ? "Current Plan" : paying === key ? "Opening checkout..." : "Upgrade to " + plan.name}
                </motion.button>
              </div>
            )
          })}
        </div>

        <p style={{ fontSize: 11, color: "#555570", textAlign: "center", marginTop: 24, lineHeight: 1.6 }}>
          Payments secured by Razorpay. Cancel anytime — no refunds for partial months.
        </p>
      </div>
    </AppShell>
  )
}
