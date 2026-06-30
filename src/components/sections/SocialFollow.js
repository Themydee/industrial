"use client";

import { T } from "@/lib/constants";
import Tag from "@/components/ui/Tag";

export default function SocialFollow() {
  const socials = [
    { name: "YouTube", url: "https://www.youtube.com/@OyebanjiOyelaran", icon: "▶", color: "#FF0000" },
    { name: "LinkedIn", url: "hhttps://www.linkedin.com/in/prof-oyebanji-oyelaran-424625412//", icon: "in", color: "#0A66C2" },
    { name: "X / Twitter", url: "https://x.com/banjioyeyinka?s=11", icon: "𝕏", color: T.dark },
    { name: "Instagram", url: "https://x.com/banjioyeyinka?s=11", icon: "📸", color: "#E1306C" },
  ];

  return (
    <section style={{ background: T.white, padding: "80px 48px", borderTop: `1px solid ${T.ruleLt}` }}>
      <div className="container" style={{ textAlign: "center" }}>
        <Tag color={T.primary}>Connect</Tag>
        <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700, color: T.dark, marginTop: 16, marginBottom: 12, letterSpacing: "-0.02em" }}>Join the Conversation</h2>
        <p style={{ fontSize: 16, color: T.mid, marginBottom: 40, maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.6 }}>
          Follow Prof. Banji and the Industrialise Africa community across our social platforms for daily insights, episode clips, and live discussions.
        </p>
        
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          {socials.map(s => (
            <a key={s.name} href={s.url} target="_blank" rel="noreferrer" style={{
              display: "flex", alignItems: "center", gap: 12, padding: "16px 24px",
              background: T.ivory, border: `1px solid ${T.rule}`, borderRadius: "8px",
              textDecoration: "none", color: T.dark, fontWeight: 600, transition: "all 0.2s ease"
            }} 
            onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${s.color}15`; }} 
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.rule; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <span style={{ color: s.color, fontSize: 20 }}>{s.icon}</span>
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
