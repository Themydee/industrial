"use client";
import { useState } from "react";
import { TIERS } from "@/lib/constants";
import Tag from "@/components/ui/Tag";
import Btn from "@/components/ui/Btn";

export default function Membership({ onJoin }) {
    const [expanded, setExpanded] = useState({});
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const toggleExpand = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <section id="membership" className="section-padding" style={{ background: "var(--color-ivory)", borderTop: "1px solid var(--color-rule-lt)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 48 }} className="animate-up">
                    <Tag color="var(--color-red)">Join My Network</Tag>
                    <h2 className="serif-heading" style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "var(--color-dark)", margin: "12px 0 16px" }}>Advisory & Access</h2>
                    <p style={{ fontSize: 14, color: "var(--color-grey)", lineHeight: 1.5, maxWidth: 500, margin: "0 auto", fontWeight: 300 }}>Direct access to my expertise, network, and masterclasses. Structured to support everyone from students to institutional leaders.</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }} className="bento-grid">
                    {TIERS.map((tier, i) => {
                        const isVanguard = tier.id === "vanguard";
                        const isExpanded = !!expanded[tier.id];
                        const isHovered = hoveredIndex === i;
                        const visibleFeatures = isExpanded ? tier.features : tier.features.slice(0, 4);
                        const hasMore = tier.features.length > 4;
                        
                        return (
                            <div 
                                key={tier.id} 
                                className={`animate-up animate-delay-${i}`} 
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                style={{ 
                                    background: "var(--color-white)", 
                                    border: isVanguard || isHovered ? `1px solid var(--color-gold)` : "1px solid var(--color-rule-lt)",
                                    padding: "20px 18px",
                                    display: "flex", 
                                    flexDirection: "column", 
                                    position: "relative",
                                    boxShadow: isHovered || isVanguard ? "var(--shadow-md)" : "none",
                                    transform: isHovered ? "translateY(-4px)" : "none",
                                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                                }}
                            >
                                
                                {(isVanguard || isHovered) && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--color-gold)" }} />}

                                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: isVanguard ? "var(--color-gold)" : "var(--color-red)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>{tier.name}</div>
                                <div className="serif-heading" style={{ fontSize: 22, color: "var(--color-dark)", lineHeight: 1, marginBottom: 6 }}>{tier.price}</div>
                                <div style={{ fontSize: 11, color: "var(--color-grey)", marginBottom: 8, lineHeight: 1.4 }}>{tier.sub}</div>
                                {tier.annual && <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--color-mid)", letterSpacing: "0.05em", lineHeight: 1.4 }}>{tier.annual}</div>}
                                
                                <div style={{ height: 1, background: "var(--color-rule-lt)", margin: "16px 0" }} />

                                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", marginBottom: 20 }}>
                                    <ul style={{ listStyle: "none" }}>
                                        {visibleFeatures.map(f => (
                                            <li key={f} style={{ fontSize: 11, color: "var(--color-mid)", padding: "4px 0", display: "flex", gap: 8, alignItems: "flex-start", lineHeight: 1.3, fontWeight: 300 }}>
                                                <span style={{ color: "var(--color-gold)", flexShrink: 0, fontFamily: "var(--font-mono)", fontSize: 10, marginTop: 1 }}>—</span>{f}
                                            </li>
                                        ))}
                                    </ul>
                                    {hasMore && (
                                        <button 
                                            onClick={() => toggleExpand(tier.id)} 
                                            style={{ 
                                                fontFamily: "var(--font-mono)", 
                                                fontSize: 9, 
                                                color: "var(--color-red)", 
                                                background: "none", 
                                                border: "none", 
                                                cursor: "pointer", 
                                                padding: "6px 0 0 0", 
                                                textAlign: "left", 
                                                fontWeight: 600,
                                                letterSpacing: "0.05em",
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: 4
                                            }}
                                        >
                                            {isExpanded ? "Show Less —" : `Show All ${tier.features.length} Features +`}
                                        </button>
                                    )}
                                </div>

                                <Btn variant={isVanguard ? "primary" : "outline"} onClick={() => onJoin(tier.id)} style={{ width: "100%", justifyContent: "center", fontSize: 12, padding: "10px 16px" }}>
                                    {tier.cta}
                                </Btn>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
