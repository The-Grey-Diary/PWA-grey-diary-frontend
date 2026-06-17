"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
const MC:Record<string,string>={Fear:"#FF6B78",Hope:"#52C4A0",Love:"#FF7BAC",Regret:"#9B88C4",Unknown:"#6FB8E0"}
export default function ExplorePage(){
  const [caps,setCaps]=useState<any[]>([]); const [loading,setLoading]=useState(true); const [mood,setMood]=useState("")
  const API=process.env.NEXT_PUBLIC_API_URL||""
  useEffect(()=>{
    const p=new URLSearchParams({page:"1",sort:"recent"}); if(mood)p.set("mood",mood)
    fetch(API+"/capsules/?"+p).then(r=>r.ok?r.json():null).then(d=>{setCaps(d?.items||[]);setLoading(false)}).catch(()=>setLoading(false))
  },[mood,API])
  return(
    <div style={{background:"#0B0B0D",minHeight:"100vh",color:"#F5F5F5",fontFamily:"Inter,system-ui,sans-serif"}}>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(11,11,13,.9)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(139,124,255,.07)",height:56,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px"}}>
        <Link href="/" style={{fontFamily:"Instrument Serif,serif",fontSize:16,fontStyle:"italic",textDecoration:"none",color:"#F5F5F5"}}>The Grey Diary</Link>
        <div style={{display:"flex",gap:18}}><Link href="/home" style={{color:"#7B7B8F",fontSize:13,textDecoration:"none"}}>Home</Link><Link href="/capsule/new" style={{color:"#7B7B8F",fontSize:13,textDecoration:"none"}}>+ Seal</Link></div>
      </nav>
      <div style={{maxWidth:780,margin:"0 auto",padding:"76px 24px 60px"}}>
        <h1 style={{fontFamily:"Instrument Serif,serif",fontSize:36,fontWeight:400,letterSpacing:"-.02em",marginBottom:24}}>Revealed stories.</h1>
        <div style={{display:"flex",gap:8,marginBottom:28,flexWrap:"wrap" as const}}>
          {["","Fear","Hope","Love","Regret","Unknown"].map(m=>(
            <button key={m} onClick={()=>setMood(m)} style={{background:mood===m?"rgba(139,124,255,.2)":"#141417",border:`1px solid ${mood===m?"rgba(139,124,255,.5)":"rgba(139,124,255,.15)"}`,borderRadius:20,padding:"5px 14px",fontSize:12,color:mood===m?"#A89BFF":"#7878A0",cursor:"pointer",fontFamily:"Inter,sans-serif"}}>{m||"All"}</button>
          ))}
        </div>
        {loading?<div style={{textAlign:"center",padding:"60px 0",color:"#6B6B80"}}>Loading stories...</div>
        :caps.length===0?<div style={{textAlign:"center",padding:"60px 0"}}><p style={{fontFamily:"Instrument Serif,serif",fontSize:18,fontStyle:"italic",color:"#6B6B80",marginBottom:16}}>No revealed stories yet.</p><Link href="/capsule/new" style={{color:"#8B7CFF",fontSize:13,textDecoration:"none"}}>Seal one →</Link></div>
        :<div style={{display:"flex",flexDirection:"column",gap:16}}>
          {caps.map((c:any)=>(
            <div key={c.id} style={{background:"#141417",border:"1px solid rgba(196,168,74,.22)",borderRadius:14,padding:22}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><span style={{fontSize:10,color:MC[c.mood]||"#8B7CFF",fontWeight:600,letterSpacing:".08em",textTransform:"uppercase" as const}}>{c.mood}</span><span style={{fontSize:9,color:"#C4A84A",background:"rgba(196,168,74,.1)",border:"1px solid rgba(196,168,74,.2)",borderRadius:20,padding:"2px 9px",fontWeight:600}}>Revealed</span></div>
              <div style={{fontFamily:"Instrument Serif,serif",fontSize:17,fontStyle:"italic",color:"#E8E8F0",lineHeight:1.45,marginBottom:8}}>"{c.title}"</div>
              <p style={{fontSize:13,color:"#8888A8",lineHeight:1.65,marginBottom:8}}>{(c.content||"").slice(0,200)}{(c.content||"").length>200?"...":""}</p>
              <div style={{fontSize:10,color:"#6B6B80"}}>{c.category}</div>
            </div>
          ))}
        </div>}
      </div>
    </div>
  )
}
