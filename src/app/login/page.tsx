"use client"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { api, saveToken } from "@/lib/api"

export default function LoginPage() {
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const code = params.get("code")
    if (!code) return
    api.auth.googleCallback(code).then(({ access_token }) => {
      saveToken(access_token)
      router.push("/home")
    }).catch(() => router.push("/?error=auth"))
  }, [params, router])

  return (
    <div style={{ background: "#0B0B0D", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 40, height: 40, border: "2px solid rgba(139,124,255,.3)", borderTop: "2px solid #8B7CFF", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ color: "#6B6B80", fontSize: 14 }}>Signing you in...</p>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
