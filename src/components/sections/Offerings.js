"use client";
import { useState } from "react";
import { F, T, OFFERINGS } from "@/lib/constants";
import Tag from "@/components/ui/Tag";

export default function Offerings() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section id="offerings" className="section-padding" style={{ background: "var(--color-white)", borderTop: "1px solid var(--color-rule-lt)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 20 }} className="animate-up">
                    <div>
                        <Tag color="var(--color-gold)">What We Build</Tag>
                        <h2 className="serif-heading" style={{ fontSize: "clamp(28px, 5vw, 44px)", color: "var(--color-dark)", margin: "8px 0" }}>Beyond the Podcast</h2>
                    </div>
                    <p style={{ fontSize: 14, color: "var(--color-grey)", fontWeight: 300, maxWidth: 360, textAlign: "right", lineHeight: 1.5 }}>An ecosystem of learning, connection, and opportunity.</p>
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
                    {OFFERINGS.map(({ ico, title, desc, price }, i) => {
                        const isHovered = hoveredIndex === i;

                        return (
                            <div 
                                key={title} 
                                className={`animate-up animate-delay-${i}`} 
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                style={{ 
                                    padding: "20px 18px", 
                                    background: "var(--color-ivory)",
                                    border: isHovered ? "1px solid var(--color-gold)" : "1px solid var(--color-rule-lt)",
                                    position: "relative",
                                    transform: isHovered ? "translateY(-4px)" : "none",
                                    boxShadow: isHovered ? "var(--shadow-sm)" : "none",
                                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between"
                                }}
                            >
                                <div>
                                    <div style={{ fontSize: 20, marginBottom: 12 }}>{ico}</div>
                                    <div className="serif-heading" style={{ fontSize: 18, color: "var(--color-dark)", marginBottom: 8 }}>{title}</div>
                                    <p style={{ fontSize: 13, color: "var(--color-mid)", lineHeight: 1.5, marginBottom: 16, fontWeight: 300 }}>{desc}</p>
                                </div>
                                
                                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--color-grey)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{price}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
