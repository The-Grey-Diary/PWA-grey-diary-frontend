import Link from "next/link"

export default function TermsPage() {
  return (
    <div style={{ background: "#0B0B0D", minHeight: "100vh", color: "#F5F5F5", fontFamily: "Inter,system-ui,sans-serif" }}>
      <nav style={{ height: 56, display: "flex", alignItems: "center", padding: "0 24px", borderBottom: "1px solid rgba(139,124,255,.07)" }}>
        <Link href="/" style={{ fontFamily: "Instrument Serif,serif", fontSize: 16, fontStyle: "italic", textDecoration: "none", color: "#F5F5F5" }}>The Grey Diary</Link>
      </nav>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px 80px", fontSize: 14, color: "#B0B0C8", lineHeight: 1.8 }}>
        <h1 className="serif" style={{ fontSize: 32, color: "#F5F5F5", marginBottom: 8, fontWeight: 400 }}>Terms of Service</h1>
        <p style={{ color: "#6B6B80", fontSize: 12, marginBottom: 32 }}>Last updated: June 2026</p>

        <p style={{ marginBottom: 20 }}>By using The Grey Diary, you agree to these terms. If you don't agree, please don't use the service.</p>

        <h2 className="serif" style={{ fontSize: 20, color: "#E0E0F0", marginTop: 28, marginBottom: 10 }}>The service</h2>
        <p style={{ marginBottom: 12 }}>The Grey Diary lets you write a private reflection ("capsule"), choose a future date for it to unlock, and optionally share it publicly once revealed. Reveal dates are honored as set — we don't unlock capsules early.</p>

        <h2 className="serif" style={{ fontSize: 20, color: "#E0E0F0", marginTop: 28, marginBottom: 10 }}>Your content</h2>
        <p style={{ marginBottom: 12 }}>You own what you write. By marking a capsule public, you grant other users of the platform the ability to view it and react to it once it reveals. Don't post anything that isn't yours to share, anything illegal, or anything intended to harass or identify another person without consent.</p>

        <h2 className="serif" style={{ fontSize: 20, color: "#E0E0F0", marginTop: 28, marginBottom: 10 }}>AI reflections</h2>
        <p style={{ marginBottom: 12 }}>The Grey Observer and Grey Guardian are AI-generated reflections, not professional advice of any kind — medical, legal, financial, or psychological. If you're going through something serious, please reach out to a real professional or a trusted person in your life.</p>

        <h2 className="serif" style={{ fontSize: 20, color: "#E0E0F0", marginTop: 28, marginBottom: 10 }}>Subscriptions</h2>
        <p style={{ marginBottom: 12 }}>Grey Plus and Grey Premium are paid monthly subscriptions processed via Razorpay. Subscriptions do not auto-renew with stored payment methods at this time — you'll need to renew manually each cycle unless stated otherwise in-app. We don't offer refunds for partial months already used.</p>

        <h2 className="serif" style={{ fontSize: 20, color: "#E0E0F0", marginTop: 28, marginBottom: 10 }}>Service availability</h2>
        <p style={{ marginBottom: 12 }}>This is an independently run product. We aim for reliability but don't guarantee uninterrupted uptime. We'll do our best to give notice before any planned downtime or major changes.</p>

        <h2 className="serif" style={{ fontSize: 20, color: "#E0E0F0", marginTop: 28, marginBottom: 10 }}>Account termination</h2>
        <p style={{ marginBottom: 12 }}>We may suspend accounts that violate these terms, particularly around harassment, illegal content, or abuse of the platform. You can request deletion of your account at any time.</p>

        <h2 className="serif" style={{ fontSize: 20, color: "#E0E0F0", marginTop: 28, marginBottom: 10 }}>Changes</h2>
        <p style={{ marginBottom: 12 }}>These terms may be updated as the product grows. Continued use after a change means you accept the updated terms.</p>

        <p style={{ marginTop: 32, fontSize: 12, color: "#6B6B80" }}>Questions about these terms can be directed via our Instagram or YouTube channel @byshiladityamallick.</p>
      </div>
    </div>
  )
}
