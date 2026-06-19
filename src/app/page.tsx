import GuardianHero from "@/components/ui/GuardianHero"
import CapsuleVaultSection from "@/components/ui/CapsuleVaultSection"
import { PHOTO_DATA_URI } from "@/lib/photo"

const MOOD_C: Record<string, string> = { Fear: "#FF6B78", Hope: "#52C4A0", Love: "#FF7BAC", Regret: "#9B88C4", Unknown: "#6FB8E0" }

const STEPS: [string, string, string][] = [
  ["✍️", "Write", "During uncertainty. Before you know the ending."],
  ["🔒", "Seal", "Choose when it unlocks. The Observer leaves one reflection."],
  ["⏳", "Wait", "The capsule counts down. Time becomes the third character."],
  ["🌅", "Return", "The seal breaks. The community bears witness."],
  ["🌊", "Echo", "You add what happened. The story becomes whole."],
]

const SAMPLE = [
  { t: "The letter I couldn't send", m: "Regret", c: "Love", d: "127d", r: false },
  { t: "Before the interview", m: "Fear", c: "Career", d: "Revealed", r: true },
  { t: "The dream I almost gave up", m: "Hope", c: "Dreams", d: "44d", r: false },
  { t: "Starting over at 34", m: "Hope", c: "Life Change", d: "Revealed", r: true },
]

const PLANS = [
  { n: "Free", p: "₹0", per: "", d: "Begin your practice", f: ["3 active capsules", "Explore stories", "Court access", "Echoes"], hl: false, gd: false },
  { n: "Grey Plus", p: "₹149", per: "/mo", d: "For the dedicated writer", f: ["25 active capsules", "Guardian archive", "Emotional themes", "Early reveals"], hl: true, gd: false },
  { n: "Grey Premium", p: "₹399", per: "/mo", d: "For those who go deep", f: ["Unlimited capsules", "Private vault", "Future letters", "Personal Guardian"], hl: false, gd: true },
]

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

export default function LandingPage() {
  const API = process.env.NEXT_PUBLIC_API_URL || "https://orb-grey-diary-backend-632388399077.us-central1.run.app"
  const googleUrl = API + "/auth/google"

  return (
    <div style={{ background: "#0B0B0D", color: "#F5F5F5", fontFamily: "Inter,system-ui,sans-serif" }}>

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: "rgba(11,11,13,.9)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(139,124,255,.08)", height: 58, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, background: "linear-gradient(135deg,#8B7CFF,#5A4FCC)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>📔</div>
          <span style={{ fontFamily: "Instrument Serif,serif", fontSize: 16, fontStyle: "italic", whiteSpace: "nowrap" }}>The Grey Diary</span>
        </div>
        <div className="nav-links-desktop">
          <a href="#vault" className="nav-text-link" style={{ color: "#7B7B8F", fontSize: 13, textDecoration: "none" }}>Vault</a>
          <a href="#founder" className="nav-text-link" style={{ color: "#7B7B8F", fontSize: 13, textDecoration: "none" }}>Story</a>
          <a href="#plans" className="nav-text-link" style={{ color: "#7B7B8F", fontSize: 13, textDecoration: "none" }}>Plans</a>
          <a href={googleUrl} className="tap-shrink" style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", borderRadius: 8, padding: "8px 16px", color: "#111", fontSize: 13, fontWeight: 500, textDecoration: "none", whiteSpace: "nowrap" }}>
            <GoogleIcon />
            <span className="nav-text-link">Begin Writing</span>
          </a>
        </div>
      </nav>

      <GuardianHero apiUrl={API} />

      <section id="vault" style={{ padding: "72px 24px", background: "#0C0C0F", borderTop: "1px solid rgba(139,124,255,.06)" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <div style={{ height: 1, width: 36, background: "rgba(196,168,74,.4)" }} />
            <span style={{ fontSize: 10, color: "#C4A84A", letterSpacing: ".14em", textTransform: "uppercase" }}>How It Feels</span>
            <div style={{ height: 1, width: 36, background: "rgba(196,168,74,.4)" }} />
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 400, letterSpacing: "-.02em", marginBottom: 10 }}>Every story waits in the dark.</h2>
          <p style={{ fontSize: 14, color: "#7B7B8F", maxWidth: 400, margin: "0 auto" }}>Some sealed for 3 days. Some for 201. This is what your vault will look like.</p>
        </div>
        <CapsuleVaultSection />
        <p className="serif" style={{ textAlign: "center", fontSize: 17, color: "#7B7B8F", fontStyle: "italic", marginTop: 16 }}>"Every story waits for its ending."</p>
      </section>

      <section style={{ padding: "72px 24px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 9, color: "#6B6B80", background: "#141417", border: "1px solid rgba(139,124,255,.12)", borderRadius: 20, padding: "3px 11px", letterSpacing: ".06em", textTransform: "uppercase" }}>Illustrative example</span>
        </div>
        <h2 className="serif" style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 400, letterSpacing: "-.02em", textAlign: "center", marginBottom: 40 }}>What a sealed story looks like.</h2>
        <div className="sample-cards-grid">
          {SAMPLE.map((c, i) => (
            <div key={i} style={{ background: "#141417", border: "1px solid " + (c.r ? "rgba(196,168,74,.28)" : "rgba(139,124,255,.2)"), borderRadius: 14, padding: 22, animation: (c.r ? "gg" : "gs") + " 4s ease-in-out infinite" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: MOOD_C[c.m] || "#8B7CFF", letterSpacing: ".08em", textTransform: "uppercase" }}>{c.m}</span>
                <span style={{ fontSize: 9, color: c.r ? "#C4A84A" : "#8B7CFF", background: c.r ? "rgba(196,168,74,.1)" : "rgba(139,124,255,.1)", border: "1px solid " + (c.r ? "rgba(196,168,74,.2)" : "rgba(139,124,255,.2)"), borderRadius: 20, padding: "2px 9px", fontWeight: 600 }}>{c.d}</span>
              </div>
              <div className="serif" style={{ fontSize: 16, fontStyle: "italic", color: "#E8E8F0", lineHeight: 1.45 }}>"{c.t}"</div>
              <div style={{ fontSize: 10, color: "#6B6B80", marginTop: 8 }}>{c.c}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "72px 24px", background: "#0C0C0F", borderTop: "1px solid rgba(139,124,255,.06)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 className="serif" style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 400, letterSpacing: "-.02em", textAlign: "center", marginBottom: 52 }}>Five moments.<br /><em style={{ color: "#8B7CFF" }}>One story.</em></h2>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom,transparent,rgba(139,124,255,.25) 10%,rgba(139,124,255,.25) 90%,transparent)", transform: "translateX(-50%)" }} />
            {STEPS.map(([icon, title, desc], i) => {
              const iconBox = <div className="step-icon" style={{ width: 56, height: 56, background: "#141417", border: "1px solid rgba(139,124,255,.22)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, position: "relative", zIndex: 1, animation: "gs 4s ease-in-out infinite" }}>{icon}</div>
              const textBox = (align: "right" | "left") => <div className="step-text" style={{ textAlign: align }}><div className="serif" style={{ fontSize: 21, marginBottom: 5 }}>{title}</div><div style={{ fontSize: 13, color: "#7B7B8F", lineHeight: 1.65 }}>{desc}</div></div>
              const spacer = <div className="step-spacer" />
              return (
                <div key={i} className="steps-grid" style={{ marginBottom: 44 }}>
                  {i % 2 === 0 ? (<>{textBox("right")}{iconBox}{spacer}</>) : (<>{spacer}{iconBox}{textBox("left")}</>)}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section style={{ padding: "72px 24px", maxWidth: 780, margin: "0 auto" }}>
        <h2 className="serif" style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 400, letterSpacing: "-.02em", textAlign: "center", marginBottom: 44 }}>One story. <em style={{ color: "#C4A84A" }}>Two moments.</em></h2>
        <div className="echo-grid">
          <div style={{ background: "#141417", border: "1px solid rgba(139,124,255,.22)", borderRadius: 14, padding: 24, animation: "gs 5s ease-in-out infinite" }}>
            <div style={{ fontSize: 9, color: "#8B7CFF", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>SEALED · 127 DAYS AGO</div>
            <div className="serif" style={{ fontSize: 14, fontStyle: "italic", color: "#D0D0E0", lineHeight: 1.72, marginBottom: 10 }}>
              "The interview is tomorrow and I have never wanted anything more. My hands won't stop shaking. If I don't get this, I don't know who I am anymore."
            </div>
            <div style={{ fontSize: 10, color: "#6B6B80" }}>Grey Sparrow · Career</div>
          </div>
          <div className="echo-arrow" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom,rgba(139,124,255,.3),rgba(196,168,74,.3))" }} />
            <div style={{ width: 7, height: 7, borderRight: "1px solid rgba(196,168,74,.6)", borderBottom: "1px solid rgba(196,168,74,.6)", transform: "rotate(45deg)" }} />
            <div className="serif" style={{ fontSize: 10, color: "#6B6B80", fontStyle: "italic" }}>127 days</div>
          </div>
          <div style={{ background: "#141417", border: "1px solid rgba(196,168,74,.25)", borderRadius: 14, padding: 24, animation: "gg 5s ease-in-out infinite" }}>
            <div style={{ fontSize: 9, color: "#C4A84A", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>ECHO · REVEALED</div>
            <div className="serif" style={{ fontSize: 14, fontStyle: "italic", color: "#D0D0E0", lineHeight: 1.72, marginBottom: 10 }}>
              "I got it. Reading this, I want to tell that person: the shaking hands were not weakness. They were a sign of how much it mattered."
            </div>
            <div style={{ height: 1, background: "linear-gradient(90deg,rgba(196,168,74,.4),transparent)", marginBottom: 10 }} />
            <div style={{ display: "flex", gap: 12 }}>
              {["❤️ 2.1k", "💔 89", "🔥 341", "🕯️ 1.4k"].map(r => <span key={r} style={{ fontSize: 11, color: "#7B7B8F" }}>{r}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "72px 24px", background: "#0C0C0F", borderTop: "1px solid rgba(139,124,255,.06)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ fontSize: 10, color: "#8B7CFF", letterSpacing: ".14em", textTransform: "uppercase", textAlign: "center", marginBottom: 14 }}>Powered by OpenRouter</div>
          <h2 className="serif" style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 400, letterSpacing: "-.02em", textAlign: "center", marginBottom: 44, lineHeight: 1.2 }}>Two AI minds.<br /><em style={{ color: "#8B7CFF" }}>Different roles.</em></h2>
          <div className="two-col-grid" style={{ marginBottom: 18 }}>
            <div style={{ background: "#141417", border: "1px solid rgba(139,124,255,.18)", borderRadius: 18, padding: 28, animation: "gs 6s ease-in-out infinite" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(139,124,255,.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 18 }}>👁</div>
              <div className="serif" style={{ fontSize: 20, marginBottom: 9 }}>Grey Observer</div>
              <div style={{ fontSize: 13, color: "#7B7B8F", lineHeight: 1.65, marginBottom: 16 }}>Attached to every story the moment it's sealed. One short reflection. Not advice. Not therapy. A mirror.</div>
              <div style={{ borderTop: "1px solid rgba(139,124,255,.18)", paddingTop: 14, marginBottom: 12 }}>
                <div className="serif" style={{ fontSize: 12, fontStyle: "italic", color: "#9595A8", lineHeight: 1.6 }}>"There is something in this that you already know. The writing of it was the beginning of knowing."</div>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {["Runs once", "Cached", "Never repeated"].map(t => <span key={t} style={{ fontSize: 9, color: "#6B6B80", background: "#1A1A20", border: "1px solid rgba(139,124,255,.18)", borderRadius: 20, padding: "3px 10px" }}>{t}</span>)}
              </div>
            </div>
            <div style={{ background: "#141417", border: "1px solid rgba(196,168,74,.18)", borderRadius: 18, padding: 28, animation: "gg 6s ease-in-out infinite" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(196,168,74,.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 18 }}>🔮</div>
              <div className="serif" style={{ fontSize: 20, marginBottom: 9 }}>Grey Guardian</div>
              <div style={{ fontSize: 13, color: "#7B7B8F", lineHeight: 1.65, marginBottom: 16 }}>The community narrator. Every Sunday, it surveys the week's emotional landscape and writes a chronicle.</div>
              <div style={{ borderTop: "1px solid rgba(196,168,74,.18)", paddingTop: 14, marginBottom: 12 }}>
                <div className="serif" style={{ fontSize: 12, fontStyle: "italic", color: "#9595A8", lineHeight: 1.6 }}>"The fears of this week clustered around what cannot be controlled. The hopes were quieter. Both were real."</div>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {["Weekly", "OpenRouter", "Community-wide"].map(t => <span key={t} style={{ fontSize: 9, color: "#6B6B80", background: "#1A1A20", border: "1px solid rgba(196,168,74,.18)", borderRadius: 20, padding: "3px 10px" }}>{t}</span>)}
              </div>
            </div>
          </div>
          <div style={{ background: "#141417", border: "1px solid rgba(196,168,74,.15)", borderRadius: 18, padding: "22px 28px", display: "flex", alignItems: "center", gap: 22 }}>
            <div style={{ width: 46, height: 46, background: "linear-gradient(135deg,#C4A84A,#8B7CFF)", borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>✨</div>
            <div style={{ flex: 1 }}>
              <div className="serif" style={{ fontSize: 18, marginBottom: 5 }}>Personal Guardian</div>
              <div style={{ fontSize: 13, color: "#7B7B8F", lineHeight: 1.6 }}>Premium only. Reads your entire journey and reflects back who you are becoming over time.</div>
            </div>
            <div style={{ background: "linear-gradient(135deg,rgba(196,168,74,.15),rgba(139,124,255,.15))", border: "1px solid rgba(196,168,74,.2)", borderRadius: 7, padding: "5px 14px", fontSize: 10, color: "#C4A84A", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", flexShrink: 0 }}>Grey Premium</div>
          </div>
        </div>
      </section>

      <section id="founder" style={{ padding: "88px 24px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ height: 1, width: 44, background: "rgba(139,124,255,.3)" }} />
            <span style={{ fontSize: 10, color: "#8B7CFF", letterSpacing: ".14em", textTransform: "uppercase" }}>The Reason It Exists</span>
            <div style={{ height: 1, width: 44, background: "rgba(139,124,255,.3)" }} />
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(24px,3.8vw,44px)", fontWeight: 400, letterSpacing: "-.03em", lineHeight: 1.1 }}>Built by one person.<br /><em style={{ color: "#8B7CFF" }}>For a moment no one else could hold.</em></h2>
        </div>
        <div className="founder-grid">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <div style={{ width: 168, height: 168, borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(139,124,255,.3)", animation: "gs 4s ease-in-out infinite" }}>
              <img src={PHOTO_DATA_URI} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} alt="Shiladitya Mallick" />
            </div>
            <div style={{ background: "#141417", border: "1px solid rgba(139,124,255,.18)", borderRadius: 12, padding: "18px 22px", width: "100%", textAlign: "center" }}>
              <div className="serif" style={{ fontSize: 20, fontWeight: 400, marginBottom: 4 }}>Shiladitya Mallick</div>
              <div style={{ fontSize: 11, color: "#7B7B8F", lineHeight: 1.6 }}>Solo Developer &amp; Creator<br />Kolkata, India</div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
              <a href="https://www.instagram.com/byshiladityamallick/" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, background: "#141417", border: "1px solid rgba(139,124,255,.15)", borderRadius: 8, padding: "7px 12px", textDecoration: "none" }}><span>📸</span><span style={{ fontSize: 10, color: "#8B7CFF" }}>Instagram</span></a>
              <a href="https://www.youtube.com/@byshiladityamallick" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, background: "#141417", border: "1px solid rgba(139,124,255,.15)", borderRadius: 8, padding: "7px 12px", textDecoration: "none" }}><span>▶️</span><span style={{ fontSize: 10, color: "#8B7CFF" }}>YouTube</span></a>
            </div>
          </div>
          <div>
            <div style={{ background: "#141417", border: "1px solid rgba(139,124,255,.22)", borderRadius: 16, padding: "24px 26px", marginBottom: 24, animation: "gs 5s ease-in-out infinite" }}>
              <div style={{ fontSize: 9, color: "#8B7CFF", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>SEALED · BEFORE I BUILT ANYTHING</div>
              <div className="serif" style={{ fontSize: 15, fontStyle: "italic", color: "#D0D0E0", lineHeight: 1.78 }}>
                "I don't know what's going to happen. But right now — I am afraid, I am hopeful, and I am completely unsure. I want to remember exactly what this feels like. Before the person I am right now disappears forever."
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
              <p style={{ fontSize: 13.5, color: "#9090A8", lineHeight: 1.78 }}>I built The Grey Diary because I kept <strong style={{ color: "#D0D0E0" }}>losing the most honest version of myself</strong> — the one who didn't know yet.</p>
              <blockquote className="serif" style={{ fontSize: "clamp(16px,2vw,19px)", color: "#E8E8F5", fontStyle: "italic", lineHeight: 1.55, borderLeft: "2px solid rgba(139,124,255,.4)", paddingLeft: 20, margin: 0 }}>
                "By the time I knew what happened, the person who wrote it was already gone. I had no proof he ever existed."
              </blockquote>
              <p style={{ fontSize: 13.5, color: "#9090A8", lineHeight: 1.78 }}>I'm a solo developer who has built YouTube channels, apps, and bots. <strong style={{ color: "#D0D0E0" }}>The Grey Diary is the first thing I built because I couldn't find it anywhere else.</strong> Nothing was designed to hold uncertainty and then reunite you with it after time passed.</p>
              <p style={{ fontSize: 13.5, color: "#9090A8", lineHeight: 1.78 }}>People cannot be me anymore — once those moments pass, no one can retroactively become the witness you needed. The only answer is to seal it when it happens. And let the community meet you there.</p>
            </div>
            <div style={{ background: "#141417", border: "1px solid rgba(196,168,74,.22)", borderRadius: 16, padding: "22px 26px", animation: "gg 5s ease-in-out infinite" }}>
              <div style={{ fontSize: 9, color: "#C4A84A", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>ECHO · WHAT I KNOW NOW</div>
              <div className="serif" style={{ fontSize: 14, fontStyle: "italic", color: "#D0D0E0", lineHeight: 1.75, marginBottom: 12 }}>
                "The Grey Diary exists because of the person I was before I knew. Every feature, every word, every design decision is for him. For you. For the version of you sitting with uncertainty right now."
              </div>
              <div style={{ height: 1, background: "linear-gradient(90deg,rgba(196,168,74,.4),transparent)", marginBottom: 12 }} />
              <div style={{ fontSize: 11, color: "#7B7B8F" }}>Shiladitya Mallick · Solo Developer &amp; Founder · <span style={{ color: "#8B7CFF" }}>The Grey Diary</span></div>
            </div>
            <div style={{ display: "flex", background: "#141417", border: "1px solid rgba(139,124,255,.12)", borderRadius: 10, overflow: "hidden", marginTop: 16 }}>
              {[["1", "Developer"], ["₹0", "Funding"], ["∞", "Reason"], ["24/7", "Building"]].map(([n, l], i) => (
                <div key={i} style={{ flex: 1, textAlign: "center", padding: "13px 8px", borderRight: i < 3 ? "1px solid rgba(139,124,255,.08)" : "none" }}>
                  <div className="serif" style={{ fontSize: 21, color: "#F5F5F5", marginBottom: 2 }}>{n}</div>
                  <div style={{ fontSize: 9, color: "#6B6B80", textTransform: "uppercase", letterSpacing: ".08em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="plans" style={{ padding: "72px 24px", background: "#0C0C0F", borderTop: "1px solid rgba(139,124,255,.06)" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <h2 className="serif" style={{ fontSize: "clamp(24px,3.5vw,44px)", fontWeight: 400, letterSpacing: "-.02em", textAlign: "center", marginBottom: 10, lineHeight: 1.2 }}>Start free.<br /><em style={{ color: "#8B7CFF" }}>Unlock depth.</em></h2>
          <p style={{ fontSize: 14, color: "#7B7B8F", textAlign: "center", marginBottom: 44 }}>Three ways to carry your stories.</p>
          <div className="three-col-grid">
            {PLANS.map((pl, i) => (
              <div key={i} style={{ background: "#141417", border: "1px solid " + (pl.gd ? "rgba(196,168,74,.28)" : pl.hl ? "rgba(139,124,255,.35)" : "rgba(139,124,255,.13)"), borderRadius: 18, padding: "26px 22px", position: "relative" }}>
                {pl.hl && <div style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#8B7CFF,#7060EE)", borderRadius: 20, padding: "4px 14px", fontSize: 9, fontWeight: 600, color: "#fff", letterSpacing: ".09em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Most Popular</div>}
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".09em", textTransform: "uppercase", marginBottom: 6, color: pl.gd ? "#C4A84A" : pl.hl ? "#A89BFF" : "#8B7CFF" }}>{pl.n}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 3 }}>
                  <span className="serif" style={{ fontSize: 34, fontWeight: 400 }}>{pl.p}</span>
                  {pl.per && <span style={{ fontSize: 12, color: "#6B6B80" }}>{pl.per}</span>}
                </div>
                <div style={{ fontSize: 12, color: "#6B6B80", marginBottom: 20 }}>{pl.d}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 24 }}>
                  {pl.f.map(feat => (
                    <div key={feat} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#C0C0D0" }}>
                      <div style={{ width: 3, height: 3, borderRadius: "50%", background: pl.gd ? "#C4A84A" : "#8B7CFF", flexShrink: 0 }} />{feat}
                    </div>
                  ))}
                </div>
                <a href={googleUrl} style={{ display: "block", width: "100%", padding: 11, borderRadius: 9, textAlign: "center", textDecoration: "none", fontSize: 13, fontWeight: 500, background: pl.hl ? "linear-gradient(135deg,#8B7CFF,#7060EE)" : pl.gd ? "transparent" : "#1A1A20", border: pl.gd ? "1px solid rgba(196,168,74,.4)" : pl.hl ? "none" : "1px solid rgba(139,124,255,.15)", color: pl.hl ? "#fff" : pl.gd ? "#C4A84A" : "#8B7CFF" }}>
                  {pl.n === "Free" ? "Start Writing" : "Get " + pl.n}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "72px 24px 100px", textAlign: "center" }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <h2 className="serif" style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 400, letterSpacing: "-.03em", lineHeight: 1.12, marginBottom: 20 }}>
            "I wrote this<br /><em>before</em> I knew<br />what would happen."
          </h2>
          <p style={{ fontSize: 14, color: "#7B7B8F", lineHeight: 1.7, marginBottom: 44 }}>Every reveal becomes a shareable card. A story with a beginning and an ending, separated by time itself.</p>
          <a href={googleUrl} style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", borderRadius: 10, padding: "13px 28px", color: "#111", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
            <GoogleIcon />
            Seal Your First Story
          </a>
        </div>
      </section>

      <footer style={{ padding: "24px 28px", borderTop: "1px solid rgba(139,124,255,.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div className="serif" style={{ fontSize: 15, fontStyle: "italic" }}>The Grey Diary</div>
        <div style={{ fontSize: 11, color: "#6B6B80" }}>thegreydiary.online · Where stories wait for their endings</div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <a href="/privacy/" style={{ fontSize: 11, color: "#6B6B80", textDecoration: "none" }}>Privacy</a>
          <a href="/terms/" style={{ fontSize: 11, color: "#6B6B80", textDecoration: "none" }}>Terms</a>
          <span style={{ fontSize: 11, color: "#6B6B80" }}>Built by Shiladitya Mallick</span>
        </div>
      </footer>
    </div>
  )
}
