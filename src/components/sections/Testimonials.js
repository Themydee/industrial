"use client";
import { useState } from "react";
import { TESTIMONIALS } from "@/lib/constants";
import Tag from "@/components/ui/Tag";

export default function Testimonials() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section className="section-padding" style={{ background: "var(--color-white)", borderTop: "1px solid var(--color-rule-lt)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 48 }} className="animate-up">
                    <Tag color="var(--color-gold)">What Members Say</Tag>
                    <h2 className="serif-heading" style={{ fontSize: "clamp(32px, 4vw, 44px)", color: "var(--color-dark)", marginTop: 12 }}>The network in action</h2>
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }} className="bento-grid">
                    {TESTIMONIALS.map(({ quote, name, org }, i) => {
                        const isHovered = hoveredIndex === i;

                        return (
                            <div 
                                key={name} 
                                className={`animate-up animate-delay-${i}`} 
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                style={{ 
                                    background: "var(--color-ivory)", 
                                    padding: "18px 16px", 
                                    borderTop: `2px solid var(--color-gold)`,
                                    borderLeft: isHovered ? "1px solid var(--color-rule)" : "1px solid transparent",
                                    borderRight: isHovered ? "1px solid var(--color-rule)" : "1px solid transparent",
                                    borderBottom: isHovered ? "1px solid var(--color-rule)" : "1px solid transparent",
                                    transform: isHovered ? "translateY(-4px)" : "none",
                                    boxShadow: isHovered ? "var(--shadow-sm)" : "none",
                                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                                }}
                            >
                                <div className="serif-heading" style={{ fontSize: 24, color: "var(--color-gold)", lineHeight: 1, marginBottom: 6 }}>"</div>
                                <p style={{ fontSize: 13, fontStyle: "italic", color: "var(--color-mid)", lineHeight: 1.5, marginBottom: 16, fontWeight: 300 }}>{quote}</p>
                                
                                <div style={{ height: 1, background: "var(--color-rule-lt)", marginBottom: 12 }} />
                                
                                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-dark)", marginBottom: 2 }}>{name}</div>
                                <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--color-grey)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{org}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
