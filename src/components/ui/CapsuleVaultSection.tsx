"use client"
import { useEffect, useRef } from "react"

const CAPS = [
  {title:"The letter I couldn't send",mood:"Regret",cat:"Love",days:"127d",st:"sealed"},
  {title:"Before I knew",mood:"Fear",cat:"Family",days:"3d",st:"sealed"},
  {title:"What the silence meant",mood:"Unknown",cat:"Career",days:"",st:"revealed"},
  {title:"The dream I almost gave up",mood:"Hope",cat:"Dreams",days:"44d",st:"sealed"},
  {title:"If this is the last time",mood:"Love",cat:"Love",days:"12d",st:"sealed"},
  {title:"After the diagnosis",mood:"Fear",cat:"Life Change",days:"89d",st:"sealed"},
  {title:"Starting over at 34",mood:"Hope",cat:"Life Change",days:"",st:"revealed"},
  {title:"Things I should have said",mood:"Regret",cat:"Family",days:"201d",st:"sealed"},
]
const MC: Record<string,string> = {Fear:"#FF6B78",Hope:"#52C4A0",Love:"#FF7BAC",Regret:"#9B88C4",Unknown:"#6FB8E0"}
const ORBITS = [200,135,165,135,210,165,210,135]
const SPEEDS = [.003,-.004,.002,-.003,.0025,-.002,.0033,-.0035]

export default function CapsuleVaultSection() {
  const stageRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement|null)[]>([])
  const anglesRef = useRef(CAPS.map((_,i)=>(i/CAPS.length)*Math.PI*2))
  const rafRef = useRef<number>()

  useEffect(()=>{
    const animate = () => {
      const stage = stageRef.current
      if(!stage) return
      const cx = stage.offsetWidth/2, cy = 280
      anglesRef.current = anglesRef.current.map((a,i)=>a+SPEEDS[i])
      const positions = CAPS.map((_,i)=>{
        const r=ORBITS[i], a=anglesRef.current[i]
        const x=cx+r*Math.cos(a), y=cy+r*0.36*Math.sin(a), z=Math.sin(a)
        return {x:x-82,y:y-42,z,scale:0.72+0.28*((z+1)/2),op:0.38+0.62*((z+1)/2)}
      })
      const sorted=positions.map((_,idx)=>idx).sort((a,b)=>positions[a].z-positions[b].z)
      sorted.forEach((i,rank)=>{
        const el=cardsRef.current[i], p=positions[i]
        if(el){el.style.left=p.x+"px";el.style.top=p.y+"px";el.style.transform=`scale(${p.scale})`;el.style.opacity=String(p.op);el.style.zIndex=String(rank+1)}
      })
      rafRef.current=requestAnimationFrame(animate)
    }
    rafRef.current=requestAnimationFrame(animate)
    return()=>{if(rafRef.current)cancelAnimationFrame(rafRef.current)}
  },[])

  return (
    <div ref={stageRef} style={{position:"relative",width:"100%",maxWidth:620,height:560,margin:"0 auto"}}>
      {[200,135,210].map((r,i)=>(
        <div key={i} style={{position:"absolute",top:"50%",left:"50%",width:r*2,height:r*0.72,marginLeft:-r,marginTop:-r*0.36,border:"1px solid rgba(139,124,255,.06)",borderRadius:"50%",pointerEvents:"none"}}/>
      ))}
      <div style={{position:"absolute",top:"50%",left:"50%",width:38,height:38,marginLeft:-19,marginTop:-19,background:"radial-gradient(circle,#8B7CFF,#5A4FCC)",borderRadius:"50%",border:"1px solid rgba(139,124,255,.5)",zIndex:20,animation:"gs 3s ease-in-out infinite"}}/>
      {CAPS.map((c,i)=>(
        <div key={i} ref={el=>{cardsRef.current[i]=el}}
          style={{position:"absolute",width:164,background:"#141417",border:`1px solid ${c.st==="revealed"?"rgba(196,168,74,.3)":"rgba(139,124,255,.22)"}`,borderRadius:12,padding:"12px 14px",willChange:"transform,opacity",animation:`${c.st==="revealed"?"gg":"gs"} 4s ease-in-out infinite`}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
            <span style={{fontSize:9,fontWeight:600,color:MC[c.mood]||"#8B7CFF",textTransform:"uppercase" as const,letterSpacing:".08em"}}>{c.mood}</span>
            <span style={{fontSize:8,color:c.st==="revealed"?"#C4A84A":"#8B7CFF",background:c.st==="revealed"?"rgba(196,168,74,.1)":"rgba(139,124,255,.1)",border:`1px solid ${c.st==="revealed"?"rgba(196,168,74,.2)":"rgba(139,124,255,.2)"}`,borderRadius:20,padding:"2px 7px",fontWeight:600}}>
              {c.st==="revealed"?"REVEALED":c.days}
            </span>
          </div>
          <div className="serif" style={{fontSize:11,fontStyle:"italic",color:"#E8E8F0",lineHeight:1.4,marginBottom:5}}>"{c.title}"</div>
          <div style={{fontSize:9,color:"#6B6B80"}}>{c.cat}</div>
        </div>
      ))}
    </div>
  )
}
