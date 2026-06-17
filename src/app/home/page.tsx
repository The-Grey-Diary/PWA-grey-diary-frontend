"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function HomePage() {
  const router = useRouter()
  const [caps, setCaps] = useState<any[]>([])
  const [guardian, setGuardian] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const API = process.env.NEXT_PUBLIC_API_URL || ""

  useEffect(() => {
    const token = localStorage.getItem("gd_token")
    if (!token) { router.push("/"); return }
    try { const u = localStorage.getItem("gd_user"); if(u) setUser(JSON.parse(u)) } catch {}
    const h = {Authorization:"Bearer "+token}
    Promise.all([
      fetch(API+"/guardian/weekly",{headers:h}).then(r=>r.ok?r.json():null).catch(()=>null),
      fetch(API+"/capsules/mine",{headers:h}).then(r=>r.ok?r.json():null).catch(()=>null),
      fetch(API+"/auth/me",{headers:h}).then(r=>r.ok?r.json():null).catch(()=>null),
    ]).then(([g,c,u])=>{
      setGuardian(g); setCaps(c?.items||[])
      if(u){setUser(u);localStorage.setItem("gd_user",JSON.stringify(u))}
      setLoading(false)
    })
  },[API,router])

  const logout=()=>{localStorage.removeItem("gd_token");localStorage.removeItem("gd_user");router.push("/")}

  if(loading) return (
    <div style={{background:"#0B0B0D",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{width:36,height:36,border:"2px solid rgba(139,124,255,.2)",borderTop:"2px solid #8B7CFF",borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
      <style>{"@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}"}</style>
    </div>
  )

  return (
    <div style={{background:"#0B0B0D",minHeight:"100vh",color:"#F5F5F5",fontFamily:"Inter,system-ui,sans-serif"}}>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(11,11,13,.9)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(139,124,255,.07)",height:56,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px"}}>
        <span style={{fontFamily:"Instrument Serif,serif",fontSize:16,fontStyle:"italic"}}>The Grey Diary</span>
        <div style={{display:"flex",gap:18,alignItems:"center"}}>
          <Link href="/explore" style={{color:"#7B7B8F",fontSize:13,textDecoration:"none"}}>Explore</Link>
          <Link href="/capsule/new" style={{color:"#7B7B8F",fontSize:13,textDecoration:"none"}}>+ Seal</Link>
          <button onClick={logout} style={{background:"transparent",border:"1px solid rgba(139,124,255,.2)",borderRadius:6,padding:"5px 12px",color:"#7B7B8F",fontSize:12,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>Sign out</button>
        </div>
      </nav>
      <div style={{maxWidth:720,margin:"0 auto",padding:"76px 24px 60px"}}>
        {user&&<div style={{marginBottom:24}}><div style={{fontFamily:"Instrument Serif,serif",fontSize:22,fontStyle:"italic",color:"#E0E0F0"}}>Welcome, {user.display_name||"Grey Writer"}</div><div style={{fontSize:12,color:"#6B6B80",marginTop:2}}>Plan: <span style={{color:"#8B7CFF",textTransform:"capitalize" as const}}>{user.plan||"free"}</span></div></div>}
        {guardian&&<div style={{background:"#141417",border:"1px solid rgba(139,124,255,.22)",borderRadius:14,padding:22,marginBottom:28,animation:"gs 4s ease-in-out infinite"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}><span style={{fontSize:16}}>🔮</span><span style={{fontSize:10,color:"#8B7CFF",fontWeight:600,letterSpacing:".1em",textTransform:"uppercase" as const}}>Grey Guardian · This Week</span></div><p style={{fontFamily:"Instrument Serif,serif",fontSize:15,fontStyle:"italic",color:"#D0D0E0",lineHeight:1.72}}>{guardian.content}</p></div>}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:28}}>
          <Link href="/capsule/new" style={{background:"linear-gradient(135deg,#8B7CFF,#5A4FCC)",borderRadius:12,padding:"18px 20px",textDecoration:"none",display:"block"}}><div style={{fontSize:20,marginBottom:8}}>🔒</div><div style={{fontSize:14,fontWeight:500,color:"#fff",marginBottom:4}}>Seal a Capsule</div><div style={{fontSize:12,color:"rgba(255,255,255,.6)"}}>Write before you know</div></Link>
          <Link href="/explore" style={{background:"#141417",border:"1px solid rgba(139,124,255,.2)",borderRadius:12,padding:"18px 20px",textDecoration:"none",display:"block"}}><div style={{fontSize:20,marginBottom:8}}>📖</div><div style={{fontSize:14,fontWeight:500,color:"#F5F5F5",marginBottom:4}}>Explore Stories</div><div style={{fontSize:12,color:"#6B6B80"}}>Community capsules</div></Link>
        </div>
        <div style={{fontSize:11,color:"#6B6B80",letterSpacing:".08em",textTransform:"uppercase" as const,marginBottom:14}}>Your Capsules ({caps.length})</div>
        {caps.length===0?(
          <div style={{background:"#141417",border:"1px solid rgba(139,124,255,.1)",borderRadius:12,padding:"36px",textAlign:"center"}}><div style={{fontSize:32,marginBottom:12}}>📔</div><p style={{fontFamily:"Instrument Serif,serif",fontSize:16,fontStyle:"italic",color:"#9090A8",marginBottom:16}}>You haven't sealed anything yet.</p><Link href="/capsule/new" style={{color:"#8B7CFF",fontSize:13,textDecoration:"none"}}>Seal your first story →</Link></div>
        ):(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {caps.slice(0,8).map((c:any)=>(
              <div key={c.id} style={{background:"#141417",border:`1px solid ${c.status==="revealed"?"rgba(196,168,74,.18)":"rgba(139,124,255,.14)"}`,borderRadius:10,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontFamily:"Instrument Serif,serif",fontSize:14,fontStyle:"italic",color:"#E0E0F0",marginBottom:3}}>"{c.title}"</div><div style={{fontSize:10,color:"#6B6B80"}}>{c.mood} · {c.category}</div></div>
                <span style={{fontSize:9,color:c.status==="revealed"?"#C4A84A":"#8B7CFF",background:c.status==="revealed"?"rgba(196,168,74,.1)":"rgba(139,124,255,.1)",border:`1px solid ${c.status==="revealed"?"rgba(196,168,74,.2)":"rgba(139,124,255,.2)"}`,borderRadius:20,padding:"3px 10px",fontWeight:600,textTransform:"uppercase" as const,letterSpacing:".06em",flexShrink:0}}>{c.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{"@keyframes gs{0%,100%{box-shadow:0 0 18px rgba(139,124,255,.15)}50%{box-shadow:0 0 36px rgba(139,124,255,.35)}}"}</style>
    </div>
  )
}
