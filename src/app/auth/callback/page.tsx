"use client"
import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function CallbackHandler() {
  const router = useRouter()
  const params = useSearchParams()
  const [status, setStatus] = useState("Signing you in...")
  const [error, setError] = useState("")

  useEffect(() => {
    const code = params.get("code")
    const err  = params.get("error")

    if (err) {
      setError("Google sign-in was cancelled.")
      setTimeout(() => router.push("/"), 2000)
      return
    }

    if (!code) {
      router.push("/")
      return
    }

    const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

    setStatus("Exchanging token...")

    fetch(`${API}/auth/google/callback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    })
      .then(r => {
        if (!r.ok) throw new Error("Auth failed — " + r.status)
        return r.json()
      })
      .then(data => {
        if (data.access_token) {
          localStorage.setItem("gd_token", data.access_token)
          if (data.user) localStorage.setItem("gd_user", JSON.stringify(data.user))
          setStatus("Success! Redirecting...")
          router.push("/home")
        } else {
          throw new Error("No token received")
        }
      })
      .catch(e => {
        console.error("Auth error:", e)
        setError(e.message || "Sign-in failed. Please try again.")
        setTimeout(() => router.push("/?error=auth"), 2500)
      })
  }, [params, router])

  return (
    <div style={{ background:"#0B0B0D", minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:20, fontFamily:"Inter,sans-serif" }}>
      {error ? (
        <>
          <div style={{ fontSize:32 }}>⚠️</div>
          <p style={{ color:"#FF6B78", fontSize:14 }}>{error}</p>
          <p style={{ color:"#6B6B80", fontSize:12 }}>Redirecting back...</p>
        </>
      ) : (
        <>
          <div style={{ width:40, height:40, border:"2px solid rgba(139,124,255,.2)", borderTop:"2px solid #8B7CFF", borderRadius:"50%", animation:"spin 1s linear infinite" }} />
          <p style={{ color:"#9090B0", fontSize:14 }}>{status}</p>
        </>
      )}
      <style>{`@keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }`}</style>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div style={{ background:"#0B0B0D", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <p style={{ color:"#6B6B80", fontSize:14, fontFamily:"Inter,sans-serif" }}>Loading...</p>
      </div>
    }>
      <CallbackHandler />
    </Suspense>
  )
}
