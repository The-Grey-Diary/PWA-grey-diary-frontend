"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

export default function DesktopNav() {
  const pathname = usePathname()
  const router = useRouter()

  const logout = () => {
    localStorage.removeItem("gd_token")
    localStorage.removeItem("gd_user")
    router.push("/")
  }

  const linkStyle = (href: string) => ({
    color: pathname === href ? "#8B7CFF" : "#7B7B8F",
    fontSize: 13,
    textDecoration: "none",
    fontWeight: pathname === href ? 600 : 400,
  })

  return (
    <nav
      className="desktop-nav-wrap"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(11,11,13,.9)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(139,124,255,.07)",
        height: 56,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      <Link href="/" style={{ fontFamily: "Instrument Serif,serif", fontSize: 16, fontStyle: "italic", textDecoration: "none", color: "#F5F5F5" }}>
        The Grey Diary
      </Link>
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <Link href="/home/" style={linkStyle("/home/")}>Home</Link>
        <Link href="/explore/" style={linkStyle("/explore/")}>Explore</Link>
        <Link href="/capsule/new/" style={linkStyle("/capsule/new/")}>+ Seal</Link>
        <Link href="/wrapped/" style={linkStyle("/wrapped/")}>Wrapped</Link>
        <button
          onClick={logout}
          style={{
            background: "transparent",
            border: "1px solid rgba(139,124,255,.2)",
            borderRadius: 6,
            padding: "5px 12px",
            color: "#7B7B8F",
            fontSize: 12,
            cursor: "pointer",
            fontFamily: "Inter,sans-serif",
          }}
        >
          Sign out
        </button>
      </div>
    </nav>
  )
}
