"use client";
import { useState } from "react";
import { FAQS } from "@/lib/constants";
import Tag from "@/components/ui/Tag";

export default function FAQ() {
    const [open, setOpen] = useState(null);
    return (
        <section style={{ background: "var(--color-ivory-2)", padding: "120px 48px", borderTop: "1px solid var(--color-rule-lt)" }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 64 }} className="animate-up">
                    <Tag color="var(--color-gold)">FAQ</Tag>
                    <h2 className="serif-heading" style={{ fontSize: "clamp(32px, 4vw, 48px)", color: "var(--color-dark)", marginTop: 16 }}>Common Questions</h2>
                </div>
                
                <div className="animate-up animate-delay-2">
                    {FAQS.map(({ q, a }, i) => (
                        <div key={q} style={{ borderBottom: "1px solid var(--color-rule)" }}>
                            <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", textAlign: "left", padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
                                <span className="serif-heading" style={{ fontSize: 20, color: "var(--color-dark)" }}>{q}</span>
                                <span style={{ fontFamily: "var(--font-mono)", fontSize: 20, color: open === i ? "var(--color-red)" : "var(--color-grey)", transition: "transform 0.3s ease", transform: open === i ? "rotate(45deg)" : "none", display: "block" }}>+</span>
                            </button>
                            {open === i && (
                                <div style={{ paddingBottom: 24, animation: "fadeUp 0.3s ease forwards" }}>
                                    <p style={{ fontSize: 15, color: "var(--color-grey)", lineHeight: 1.8, fontWeight: 300 }}>{a}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
