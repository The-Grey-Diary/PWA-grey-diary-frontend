import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div style={{ background: "#0B0B0D", minHeight: "100vh", color: "#F5F5F5", fontFamily: "Inter,system-ui,sans-serif" }}>
      <nav style={{ height: 56, display: "flex", alignItems: "center", padding: "0 24px", borderBottom: "1px solid rgba(139,124,255,.07)" }}>
        <Link href="/" style={{ fontFamily: "Instrument Serif,serif", fontSize: 16, fontStyle: "italic", textDecoration: "none", color: "#F5F5F5" }}>The Grey Diary</Link>
      </nav>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px 80px", fontSize: 14, color: "#B0B0C8", lineHeight: 1.8 }}>
        <h1 className="serif" style={{ fontSize: 32, color: "#F5F5F5", marginBottom: 8, fontWeight: 400 }}>Privacy Policy</h1>
        <p style={{ color: "#6B6B80", fontSize: 12, marginBottom: 32 }}>Last updated: June 2026</p>

        <p style={{ marginBottom: 20 }}>The Grey Diary ("we", "the app") is a personal reflection platform operated as an independent project by Shiladitya Mallick. This policy explains what we collect, why, and how it's handled.</p>

        <h2 className="serif" style={{ fontSize: 20, color: "#E0E0F0", marginTop: 28, marginBottom: 10 }}>What we collect</h2>
        <p style={{ marginBottom: 12 }}>When you sign in with Google, we receive your name, email address, and Google account ID to create your profile. We do not receive or store your Google password.</p>
        <p style={{ marginBottom: 12 }}>Content you write into a capsule is stored so it can be sealed and revealed to you later. If you mark a capsule public, its content becomes visible to other users once revealed; if kept private, only you can read it.</p>
        <p style={{ marginBottom: 12 }}>If you subscribe to a paid plan, payment is processed by Razorpay. We receive confirmation that payment succeeded and your plan tier — we do not receive or store your card or UPI details.</p>

        <h2 className="serif" style={{ fontSize: 20, color: "#E0E0F0", marginTop: 28, marginBottom: 10 }}>How AI features work</h2>
        <p style={{ marginBottom: 12 }}>The Grey Observer and Grey Guardian features send capsule text to a third-party AI provider (via OpenRouter) to generate a short reflection. This text is processed to generate a response and is not used to train third-party models by agreement with our provider at time of writing.</p>

        <h2 className="serif" style={{ fontSize: 20, color: "#E0E0F0", marginTop: 28, marginBottom: 10 }}>What we don't do</h2>
        <p style={{ marginBottom: 12 }}>We do not sell your data to advertisers or third parties. We do not run ads inside the app. We do not read private capsules except as required to operate the service (e.g. debugging a reported error).</p>

        <h2 className="serif" style={{ fontSize: 20, color: "#E0E0F0", marginTop: 28, marginBottom: 10 }}>Your control</h2>
        <p style={{ marginBottom: 12 }}>You can delete any unsealed draft capsule at any time. Sealed capsules are held until their reveal date by design — that's the core mechanic of the product. You can request full account deletion by contacting us; this removes your profile and associated capsules from our active database.</p>

        <h2 className="serif" style={{ fontSize: 20, color: "#E0E0F0", marginTop: 28, marginBottom: 10 }}>Contact</h2>
        <p style={{ marginBottom: 12 }}>For privacy questions or deletion requests, reach out via the contact details on our Instagram or YouTube channel @byshiladityamallick.</p>

        <p style={{ marginTop: 32, fontSize: 12, color: "#6B6B80" }}>This policy may be updated as the product evolves. Material changes will be reflected here with an updated date.</p>
      </div>
    </div>
  )
}
