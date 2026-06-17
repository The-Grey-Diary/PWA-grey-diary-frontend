"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
const MOODS=["Fear","Hope","Love","Regret","Unknown"]
const CATS=["Love","Family","Career","Regret","Dreams","Life Change"]
const MC:Record<string,string>={Fear:"#FF6B78",Hope:"#52C4A0",Love:"#FF7BAC",Regret:"#9B88C4",Unknown:"#6FB8E0"}
export default function NewCapsulePage(){
  const router=useRouter()
  const [form,setForm]=useState({title:"",content:"",category:"Career",mood:"Fear",reveal_date:"",is_public:true})
  const [busy,setBusy]=useState(false); const [err,setErr]=useState("")
  const API=process.env.NEXT_PUBLIC_API_URL||""
  const set=(k:string,v:any)=>setForm(p=>({...p,[k]:v}))
  const seal=async()=>{
    if(!form.title||!form.content||!form.reveal_date){setErr("Please fill all fields.");return}
    const token=localStorage.getItem("gd_token"); if(!token){router.push("/");return}
    setBusy(true);setErr("")
    try{
      const r=await fetch(API+"/capsules/",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify({...form,status:"sealed",reveal_date:new Date(form.reveal_date).toISOString()})})
      if(!r.ok){const d=await r.json().catch(()=>({}));throw new Error(d.detail||"Failed")}
      router.push("/home")
    }catch(e:any){setErr(e.message||"Failed");setBusy(false)}
  }
  const inp={background:"#0F0F14",border:"1px solid rgba(139,124,255,.2)",borderRadius:8,padding:"11px 14px",color:"#F5F5F5",fontSize:14,width:"100%",fontFamily:"Inter,sans-serif",outline:"none"} as any
  return(
    <div style={{background:"#0B0B0D",minHeight:"100vh",color:"#F5F5F5",fontFamily:"Inter,system-ui,sans-serif"}}>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(11,11,13,.9)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(139,124,255,.07)",height:56,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px"}}>
        <span style={{fontFamily:"Instrument Serif,serif",fontSize:16,fontStyle:"italic"}}>The Grey Diary</span>
        <Link href="/home" style={{color:"#7B7B8F",fontSize:13,textDecoration:"none"}}>← Home</Link>
      </nav>
      <div style={{maxWidth:580,margin:"0 auto",padding:"76px 24px 60px"}}>
        <div style={{marginBottom:28}}>
          <div style={{fontSize:10,color:"#8B7CFF",letterSpacing:".12em",textTransform:"uppercase" as const,marginBottom:10}}>New Capsule</div>
          <h1 style={{fontFamily:"Instrument Serif,serif",fontSize:30,fontWeight:400,letterSpacing:"-.02em",lineHeight:1.2}}>Write before you know<br/><em style={{color:"#8B7CFF"}}>what happens next.</em></h1>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:18}}>
          <div><label style={{fontSize:11,color:"#6B6B80",letterSpacing:".08em",textTransform:"uppercase" as const,display:"block",marginBottom:7}}>Title</label><input style={inp} placeholder="The thing you can't say out loud" value={form.title} onChange={e=>set("title",e.target.value)}/></div>
          <div><label style={{fontSize:11,color:"#6B6B80",letterSpacing:".08em",textTransform:"uppercase" as const,display:"block",marginBottom:7}}>Your story</label><textarea style={{...inp,minHeight:170,resize:"vertical",lineHeight:1.7}} placeholder="Write what you feel right now. No one sees this until the seal breaks." value={form.content} onChange={e=>set("content",e.target.value)}/></div>
          <div>
            <label style={{fontSize:11,color:"#6B6B80",letterSpacing:".08em",textTransform:"uppercase" as const,display:"block",marginBottom:7}}>Mood</label>
            <div style={{display:"flex",gap:8,flexWrap:"wrap" as const}}>
              {MOODS.map(m=><button key={m} onClick={()=>set("mood",m)} style={{background:form.mood===m?MC[m]+"22":"#141417",border:`1px solid ${form.mood===m?MC[m]:"rgba(139,124,255,.15)"}`,borderRadius:20,padding:"6px 14px",fontSize:12,color:form.mood===m?MC[m]:"#7878A0",cursor:"pointer",fontFamily:"Inter,sans-serif",transition:"all .2s"}}>{m}</button>)}
            </div>
          </div>
          <div><label style={{fontSize:11,color:"#6B6B80",letterSpacing:".08em",textTransform:"uppercase" as const,display:"block",marginBottom:7}}>Category</label><select style={{...inp,cursor:"pointer"}} value={form.category} onChange={e=>set("category",e.target.value)}>{CATS.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
          <div><label style={{fontSize:11,color:"#6B6B80",letterSpacing:".08em",textTransform:"uppercase" as const,display:"block",marginBottom:7}}>Reveal date</label><input type="date" style={inp} value={form.reveal_date} onChange={e=>set("reveal_date",e.target.value)} min={new Date().toISOString().split("T")[0]}/><p style={{fontSize:11,color:"#6B6B80",marginTop:6}}>Cannot be changed once sealed.</p></div>
          <div style={{display:"flex",alignItems:"center",gap:12}}><input type="checkbox" id="pub" checked={form.is_public} onChange={e=>set("is_public",e.target.checked)} style={{accentColor:"#8B7CFF",width:15,height:15}}/><label htmlFor="pub" style={{fontSize:13,color:"#9090A8",cursor:"pointer"}}>Share publicly when revealed</label></div>
          {err&&<p style={{color:"#FF6B78",fontSize:13,background:"rgba(255,107,120,.08)",border:"1px solid rgba(255,107,120,.2)",borderRadius:8,padding:"10px 14px"}}>{err}</p>}
          <button onClick={seal} disabled={busy} style={{background:busy?"rgba(139,124,255,.3)":"linear-gradient(135deg,#8B7CFF,#5A4FCC)",border:"none",borderRadius:10,padding:14,color:"#fff",fontSize:15,fontWeight:500,cursor:busy?"not-allowed":"pointer",fontFamily:"Inter,sans-serif"}}>{busy?"Sealing...":"🔒 Seal This Capsule"}</button>
        </div>
      </div>
    </div>
  )
}
