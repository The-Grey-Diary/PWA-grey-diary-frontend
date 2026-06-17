"use client"
import { Suspense, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function Handler() {
  const router = useRouter()
  const params = useSearchParams()
  useEffect(() => {
    const token = params.get("token")
    const error = params.get("error")
    if (error) { router.replace("/?error=" + error); return }
    if (token) { localStorage.setItem("gd_token", token); router.replace("/home") }
    else { router.replace("/?error=no_token") }
  }, [params, router])
  return (
    <div style={{background:"#0B0B0D",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20,fontFamily:"Inter,sans-serif"}}>
      <div style={{width:42,height:42,border:"2px solid rgba(139,124,255,.2)",borderTop:"2px solid #8B7CFF",borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
      <p style={{color:"#9090B0",fontSize:14}}>Signing you in...</p>
      <style>{"@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}"}</style>
    </div>
  )
}
export default function AuthSuccessPage() {
  return (
    <Suspense fallback={<div style={{background:"#0B0B0D",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}><p style={{color:"#6B6B80",fontSize:14}}>Loading...</p></div>}>
      <Handler/>
    </Suspense>
  )
}
