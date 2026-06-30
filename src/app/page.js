import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import { T, F, TIERS, OFFERINGS, TESTIMONIALS, FAQS, STATES } from "@/lib/constants";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import SocialFollow from "@/components/sections/SocialFollow";

import prisma from "@/lib/prisma";
import Link from "next/link";

// Ticker component removed

function SocialProof() {
  return (
    <div style={{ background: T.ivory, borderBottom: `1px solid ${T.ruleLt}`, padding: "24px 48px" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
        <span style={{ fontSize: 12, color: T.mid, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", flexShrink: 0 }}>Endorsed & recognised by</span>
        <div style={{ width: 1, height: 16, background: T.ruleLt }} />
        {["AfDB", "UN-HABITAT", "AfCFTA Advisory Council", "FTID", "Former President Obasanjo"].map(l => (
          <div key={l} style={{ fontSize: 14, color: T.grey, fontWeight: 600 }}>{l}</div>
        ))}
      </div>
    </div>
  );
}

async function VideoGallery() {
  const videos = await prisma.video.findMany({
    orderBy: { createdAt: 'desc' },
    take: 6
  });

  if (videos.length === 0) return null;

  return (
    <section style={{ background: T.white, padding: "96px 48px" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <Tag color={T.primary}>Exclusive Content</Tag>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: T.dark, margin: "16px 0 12px", letterSpacing: "-0.02em" }}>Podcasts & Masterclasses</h2>
          <p style={{ fontSize: 16, color: T.mid, maxWidth: 600, margin: "0 auto" }}>Join to unlock hundreds of hours of exclusive interviews, deal breakdowns, and strategies.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 32 }}>
          {videos.map(video => {
            const displayThumb = video.thumbnail || (video.url.includes("cloudinary.com") ? video.url.replace(".mp4", ".jpg").replace(".webm", ".jpg") : null);

            return (
              <Link key={video.id} href="/sign-up" style={{ textDecoration: "none", display: "block", border: `1px solid ${T.ruleLt}`, borderRadius: 16, overflow: "hidden", cursor: "pointer" }}>
                <div style={{ height: 180, background: "#E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 56, height: 56, background: "rgba(255,255,255,0.9)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", fontSize: 20 }}>▶</div>
                  </div>
                  {displayThumb && <img src={displayThumb} alt={video.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                </div>
              <div style={{ padding: 24 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.primary, textTransform: "uppercase", letterSpacing: "0.05em" }}>{video.tier} Tier</span>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: T.dark, margin: "8px 0", lineHeight: 1.4 }}>{video.title}</h3>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.primary, marginTop: 16 }}>Sign up to watch →</div>
              </div>
            </Link>
          )})}
        </div>
      </div>
    </section>
  );
}

function Membership({ onJoin }) {
  return (
    <section id="membership" style={{ background: T.ivory, padding: "96px 48px" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
          <div>
            <Tag color={T.primary}>Membership</Tag>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: T.dark, margin: "16px 0 12px", letterSpacing: "-0.02em" }}>Four tiers. One mission.</h2>
            <p style={{ fontSize: 16, color: T.mid }}>Priced to reflect the genuine, rare access Prof. Banji's standing makes possible.</p>
          </div>
          <div style={{ fontSize: 13, color: T.mid, textAlign: "right", background: T.white, padding: "12px 20px", borderRadius: "6px", border: `1px solid ${T.rule}` }}>
            Annual plans save 2 months<br/>Nigeria: Paystack · International: Stripe
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {TIERS.map((tier, i) => (
            <div key={tier.id} style={{ 
              display: "flex", flexDirection: "column", 
              background: T.white, 
              border: `1px solid ${tier.badge === "Most Popular" ? T.primary : T.rule}`, 
              borderRadius: "8px",
              boxShadow: tier.badge === "Most Popular" ? "0 12px 32px rgba(0,0,0,0.08)" : "0 4px 12px rgba(0,0,0,0.02)",
              position: "relative",
              overflow: "hidden"
            }}>
              {tier.badge && <div style={{ background: tier.badge === "Most Popular" ? T.primary : T.mid, padding: "6px 12px", fontSize: 11, fontWeight: 600, color: T.white, textAlign: "center", letterSpacing: "0.05em", textTransform: "uppercase" }}>{tier.badge}</div>}
              
              <div style={{ padding: "32px 24px", borderBottom: `1px solid ${T.ruleLt}`, background: tier.badge === "Most Popular" ? T.primaryLight : "transparent" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: tier.badge === "Most Popular" ? T.primary : T.dark, marginBottom: 12 }}>{tier.name}</div>
                <div style={{ fontSize: 40, fontWeight: 700, color: T.dark, lineHeight: 1, marginBottom: 8 }}>{tier.price}</div>
                <div style={{ fontSize: 14, color: T.mid, marginBottom: 12 }}>{tier.sub}</div>
                {tier.annual && <div style={{ fontSize: 12, color: T.mid, fontWeight: 500 }}>{tier.annual}</div>}
                <div style={{ fontSize: 14, color: T.mid, marginTop: 16 }}>{tier.tagline}</div>
              </div>

              <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <ul style={{ listStyle: "none", flex: 1 }}>
                  {tier.features.map(f => (
                    <li key={f} style={{ fontSize: 14, color: T.dark, padding: "10px 0", display: "flex", gap: 12, alignItems: "flex-start", lineHeight: 1.5 }}>
                      <span style={{ color: T.primary, flexShrink: 0 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Button variant={tier.id === "catalyst" ? "primary" : "outline"} href="/sign-up" style={{ width: "100%", marginTop: 24 }}>
                  {tier.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <SocialProof />
      <VideoGallery />
      <Membership />
      <SocialFollow />
    </>
  );
}
