"use client"
import { useEffect, useRef, useState } from "react"

const FALLBACK = "This week, 417 stories were entrusted to time.\n\n63 returned with answers.\n\nMost fears never arrived as imagined.\n\nThe Grey Diary holds what you cannot carry alone."

// Adjust this to your actual public launch date — powers the "Day N" badge
const LAUNCH_DATE = new Date("2026-06-15T00:00:00+05:30")

export default function GuardianHero({ apiUrl }: { apiUrl: string }) {
  const [text, setText] = useState("")
  const [typing, setTyping] = useState(true)
  const [stats, setStats] = useState({ sealed: 0, revealed: 0, users: 0 })
  const starsRef = useRef(Array.from({length:70},(_,i)=>({
    x:(i*137.5)%100, y:(i*97.3)%100,
    s:((i%3)*0.5)+0.5, d:1.5+(i%5)*0.8, del:(i%7)*0.4
  })))

  useEffect(() => {
    Promise.all([
      fetch(apiUrl+"/guardian/weekly").then(r=>r.ok?r.json():null).catch(()=>null),
      fetch(apiUrl+"/capsules/stats").then(r=>r.ok?r.json():null).catch(()=>null),
    ]).then(([g,s]) => {
      const msg = g?.content || FALLBACK
      let i = 0
      const iv = setInterval(()=>{ if(i<=msg.length){setText(msg.slice(0,i));i++}else{setTyping(false);clearInterval(iv)} },14)
      if(s&&(s.total_sealed>0||s.total_users>0)){
        const t={sealed:s.total_sealed||0,revealed:s.total_revealed||0,users:s.total_users||0}
        let fr=0; const si=setInterval(()=>{ fr++; const p=Math.min(fr/60,1); setStats({sealed:Math.floor(p*t.sealed),revealed:Math.floor(p*t.revealed),users:Math.floor(p*t.users)}); if(p>=1)clearInterval(si) },25)
      }
    })
  },[apiUrl])

  // Real-numbers grid only appears once there's genuine activity to show —
  // gating on signups alone (which hits 1 the instant anyone tests it)
  // produced an embarrassing "0 Sealed · 0 Revealed · 1 Writers" row.
  const hasCounts = stats.sealed >= 10
  const daysSinceLaunch = Math.max(1, Math.ceil((Date.now() - LAUNCH_DATE.getTime()) / 86400000))

  return (
    <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"80px 24px 60px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>
        {starsRef.current.map((s,i)=>(
          <div key={i} style={{position:"absolute",left:s.x+"%",top:s.y+"%",width:s.s,height:s.s,background:"#F5F5F5",borderRadius:"50%",animation:`pulse ${s.d}s ${s.del}s ease-in-out infinite`,opacity:0.3}}/>
        ))}
      </div>
      <div style={{position:"absolute",top:"15%",left:"10%",width:360,height:360,background:"radial-gradient(circle,rgba(139,124,255,.06) 0%,transparent 70%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"15%",right:"10%",width:280,height:280,background:"radial-gradient(circle,rgba(196,168,74,.04) 0%,transparent 70%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(139,124,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(139,124,255,.022) 1px,transparent 1px)",backgroundSize:"56px 56px",pointerEvents:"none"}}/>

      <div style={{position:"relative",zIndex:1,maxWidth:680,animation:"fadeup .9s ease forwards"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(139,124,255,.08)",border:"1px solid rgba(139,124,255,.2)",borderRadius:20,padding:"5px 14px",marginBottom:28}}>
          <div style={{width:6,height:6,background:"#52C4A0",borderRadius:"50%",animation:"pulse 2s ease-in-out infinite"}}/>
          <span style={{fontSize:10,color:"#8B7CFF",fontWeight:500,letterSpacing:".12em",textTransform:"uppercase" as const}}>Social Reflection Platform</span>
        </div>

        <h1 className="serif" style={{fontSize:"clamp(42px,7vw,70px)",lineHeight:1.08,fontWeight:400,letterSpacing:"-.03em",marginBottom:20}}>
          Write before you know<br/>
          <em style={{background:"linear-gradient(135deg,#A89BFF,#D4CCFF,#8B7CFF)",WebkitBackgroundClip:"text" as any,WebkitTextFillColor:"transparent" as any}}>
            what happens next.
          </em>
        </h1>
        <p style={{fontSize:16,color:"#7B7B8F",lineHeight:1.65,maxWidth:440,margin:"0 auto 44px"}}>
          Seal your story. Let time pass. Return to discover what became of your fears, hopes, and questions.
        </p>

        <div style={{background:"#141417",border:"1px solid rgba(139,124,255,.22)",borderRadius:14,padding:"22px 26px",maxWidth:520,margin:"0 auto 44px",textAlign:"left",animation:"gs 4s ease-in-out infinite"}}>
          <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:14}}>
            <div style={{width:30,height:30,borderRadius:"50%",background:"radial-gradient(circle,#8B7CFF,#5A4FCC)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>🔮</div>
            <div>
              <div style={{fontSize:10,color:"#8B7CFF",fontWeight:600,letterSpacing:".1em",textTransform:"uppercase" as const}}>Grey Guardian</div>
              <div style={{fontSize:10,color:"#6B6B80"}}>Weekly Chronicle · AI Generated</div>
            </div>
            <div style={{marginLeft:"auto",width:7,height:7,background:"#52C4A0",borderRadius:"50%",animation:"pulse 2s ease-in-out infinite"}}/>
          </div>
          {!text ? (
            <div style={{display:"flex",gap:5,padding:"8px 0"}}>
              {[0,.2,.4].map(d=><div key={d} style={{width:5,height:5,background:"#8B7CFF",borderRadius:"50%",animation:`pulse .9s ${d}s ease-in-out infinite`}}/>)}
            </div>
          ) : (
            <div className="serif" style={{fontSize:15,fontStyle:"italic",color:"#D0D0E0",lineHeight:1.72}}>
              {text}{typing&&<span style={{animation:"blink 1s infinite",color:"#8B7CFF"}}>|</span>}
            </div>
          )}
        </div>

        <div style={{display:"flex",gap:36,justifyContent:"center",marginBottom:44,flexWrap:"wrap" as const}}>
          {hasCounts ? [["Sealed",stats.sealed],["Revealed",stats.revealed],["Writers",stats.users]].map(([l,v])=>(
            <div key={String(l)} style={{textAlign:"center"}}>
              <div className="serif" style={{fontSize:28,fontWeight:400,letterSpacing:"-.03em"}}>{Number(v).toLocaleString()}</div>
              <div style={{fontSize:10,color:"#6B6B80",marginTop:3,letterSpacing:".06em",textTransform:"uppercase" as const}}>{l}</div>
            </div>
          )) : (
            <div style={{background:"linear-gradient(135deg,rgba(196,168,74,.08),rgba(139,124,255,.06))",border:"1px solid rgba(196,168,74,.22)",borderRadius:12,padding:"18px 28px",textAlign:"center",maxWidth:380}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:8}}>
                <span style={{fontSize:18}}>🕯️</span>
                <span style={{fontSize:10,color:"#C4A84A",fontWeight:600,letterSpacing:".1em",textTransform:"uppercase" as const}}>Founding Writer</span>
              </div>
              <div className="serif" style={{fontSize:22,fontStyle:"italic",color:"#E8D8B0",marginBottom:6}}>
                You'd be writer #{stats.users + 1}
              </div>
              <div style={{fontSize:11.5,color:"#8888A8",lineHeight:1.5,marginBottom:10}}>
                The first 1,000 writers earn the Founding Writer badge forever. This is page one.
              </div>
              <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(139,124,255,.08)",border:"1px solid rgba(139,124,255,.18)",borderRadius:20,padding:"3px 11px"}}>
                <div style={{width:5,height:5,background:"#52C4A0",borderRadius:"50%",animation:"pulse 2s ease-in-out infinite"}}/>
                <span style={{fontSize:9.5,color:"#9595B5"}}>Day {daysSinceLaunch} · Built in public, solo</span>
              </div>
            </div>
          )}
        </div>

        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" as const}}>
          <a href={apiUrl+"/auth/google"} style={{display:"flex",alignItems:"center",gap:10,background:"#fff",borderRadius:10,padding:"12px 24px",color:"#111",fontSize:14,fontWeight:500,textDecoration:"none"}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Seal Your First Story
          </a>
          <a href="#vault" style={{background:"transparent",border:"1px solid rgba(139,124,255,.3)",borderRadius:10,padding:"12px 20px",color:"#8B7CFF",fontSize:14,fontWeight:500,textDecoration:"none"}}>
            Explore Stories →
          </a>
        </div>
      </div>

      <div style={{position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:6,color:"#6B6B80",fontSize:10,letterSpacing:".1em",textTransform:"uppercase" as const,animation:"float 2.5s ease-in-out infinite"}}>
        <div style={{width:1,height:36,background:"linear-gradient(to bottom,transparent,rgba(139,124,255,.4))"}}/>Scroll
      </div>
    </section>
  )
}
