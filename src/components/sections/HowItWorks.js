"use client";
import { useState } from "react";
import Tag from "@/components/ui/Tag";
import Btn from "@/components/ui/Btn";

export default function HowItWorks({ onApply }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const steps = [
        { n: "01", title: "Apply to Join", desc: "Complete the 4-step community interest form. Takes 5–7 minutes." },
        { n: "02", title: "Choose Your Tier", desc: "Get matched to the right membership level. Upgrades are available anytime." },
        { n: "03", title: "Get Access", desc: "Unlock WhatsApp groups, Deal Board, and Peer Circles within 48 hours." },
        { n: "04", title: "Show Up & Build", desc: "Engage, attend masterclasses, and participate to build together." },
    ];
    
    return (
        <section className="section-padding" style={{ background: "var(--color-ivory-2)", borderTop: "1px solid var(--color-rule-lt)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 48 }} className="animate-up">
                    <Tag color="var(--color-red)">The Process</Tag>
                    <h2 className="serif-heading" style={{ fontSize: "clamp(32px, 4vw, 44px)", color: "var(--color-dark)", marginTop: 12 }}>From curious to connected</h2>
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
                    {steps.map(({ n, title, desc }, i) => {
                        const isHovered = hoveredIndex === i;

                        return (
                            <div 
                                key={n} 
                                className={`animate-up animate-delay-${i}`} 
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                style={{ 
                                    background: "var(--color-white)", 
                                    padding: "18px 16px", 
                                    border: isHovered ? "1px solid var(--color-gold)" : "1px solid var(--color-rule-lt)",
                                    transform: isHovered ? "translateY(-4px)" : "none",
                                    boxShadow: isHovered ? "var(--shadow-sm)" : "none",
                                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                                }}
                            >
                                <div className="serif-heading" style={{ fontSize: 26, color: "var(--color-red)", marginBottom: 12, lineHeight: 1 }}>{n}</div>
                                <div className="serif-heading" style={{ fontSize: 16, color: "var(--color-dark)", marginBottom: 8 }}>{title}</div>
                                <p style={{ fontSize: 12, color: "var(--color-grey)", lineHeight: 1.4, fontWeight: 300 }}>{desc}</p>
                            </div>
                        );
                    })}
                </div>
                
                <div style={{ textAlign: "center", marginTop: 48 }} className="animate-up">
                    <Btn variant="primary" onClick={onApply}>Start Your Application →</Btn>
                </div>
            </div>
        </section>
    );
}
