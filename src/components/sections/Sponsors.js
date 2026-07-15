"use client";
import { useState } from "react";
import Tag from "@/components/ui/Tag";
import Btn from "@/components/ui/Btn";

export default function Sponsors() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const pkgs = [
        { name: "Episode Sponsor", price: "$2,000–$3,500/mo", features: ["Named presenting sponsor", "60-sec branded segment", "Logo in episode + thumbnail", "Newsletter mention"] },
        { name: "Event Lead Sponsor", price: "$6,000–$18,000", features: ["Naming rights to event", "Speaking or panel slot", "Full brand visibility", "Opt-in delegate contacts"] },
        { name: "Community Partner", price: "$12,000–$35,000/yr", features: ["Full-year integration", "All-episode sponsorship", "Event priority presence", "Verified Partner badge"] },
    ];
    
    return (
        <section id="sponsors" className="section-padding" style={{ background: "var(--color-ivory)", borderTop: "1px solid var(--color-rule-lt)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Tag color="var(--color-red)">Partner With Us</Tag>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start", marginTop: 24 }} className="hero-grid">
                    <div className="animate-up">
                        <h2 className="serif-heading" style={{ fontSize: "clamp(36px, 4.5vw, 44px)", color: "var(--color-dark)", marginBottom: 20, lineHeight: 1.1 }}>Reach Africa's industrial leadership community</h2>
                        <p style={{ fontSize: 14, color: "var(--color-grey)", lineHeight: 1.7, fontWeight: 300, marginBottom: 32 }}>The most targeted audience of agribusiness leaders, DFI professionals, policymakers and industrialists on the continent.</p>
                        
                        <div style={{ padding: "24px 0", borderTop: "1px solid var(--color-rule-lt)", borderBottom: "1px solid var(--color-rule-lt)", marginBottom: 32 }}>
                            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-gold)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Priority targets</div>
                            <p style={{ fontSize: 13, color: "var(--color-mid)", lineHeight: 1.7, fontWeight: 300 }}>
                                <strong>Banks:</strong> Access, Zenith, GTB, UBA, FCMB, Sterling&nbsp;·&nbsp;
                                <strong>DFIs:</strong> AfDB, USAID, EU, GIZ, FCDO&nbsp;·&nbsp;
                                <strong>Agencies:</strong> NIRSAL, NADF, Bank of Agriculture
                            </p>
                        </div>
                        
                        <Btn variant="dark" href="mailto:industrialiseafrica@gmail.com?subject=Partnership Enquiry">Enquire About Partnership →</Btn>
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }} className="animate-up animate-delay-2">
                        {pkgs.map(({ name, price, features }, i) => {
                            const isHovered = hoveredIndex === i;

                            return (
                                <div 
                                    key={name} 
                                    onMouseEnter={() => setHoveredIndex(i)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    style={{ 
                                        background: "var(--color-white)", 
                                        padding: "20px 24px", 
                                        border: isHovered ? "1px solid var(--color-gold)" : "1px solid var(--color-rule-lt)",
                                        transform: isHovered ? "translateY(-4px)" : "none",
                                        boxShadow: isHovered ? "var(--shadow-sm)" : "none",
                                        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                                    }}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12, flexWrap: "wrap", gap: 12 }}>
                                        <div className="serif-heading" style={{ fontSize: 18, color: "var(--color-dark)" }}>{name}</div>
                                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, color: "var(--color-red)" }}>{price}</div>
                                    </div>
                                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                                        {features.map(f => (
                                            <span key={f} style={{ fontSize: 11, color: "var(--color-mid)", display: "flex", alignItems: "center", gap: 6, fontWeight: 300 }}>
                                                <span style={{ color: "var(--color-gold)" }}>–</span>{f}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
