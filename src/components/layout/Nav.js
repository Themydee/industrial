"use client";
import { useState, useEffect } from "react";
import Btn from "@/components/ui/Btn";

export default function Nav({ onApply }) {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", h);
        return () => window.removeEventListener("scroll", h);
    }, []);

    const links = [
        { l: "The Movement", h: "#home" },
        { l: "The Founder", h: "#about" },
        { l: "Masterclasses", h: "#podcast" },
        { l: "Membership", h: "#membership" },
    ];

    return (
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "20px 48px", background: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid var(--color-rule-lt)" : "1px solid transparent", transition: "all 0.4s ease" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <a href="#home" className="serif-heading" style={{ fontSize: 24, color: "var(--color-dark)", fontWeight: 600, letterSpacing: "-0.02em" }}>
                    Industrialise<span style={{ color: "var(--color-red)" }}>Africa</span>
                </a>
                <div style={{ display: "flex", gap: 40, alignItems: "center" }} className="hide-mob">
                    {links.map(l => (
                        <a key={l.l} href={l.h} style={{ fontSize: 13, color: "var(--color-mid)", fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "var(--color-red)"} onMouseLeave={e => e.target.style.color = "var(--color-mid)"}>
                            {l.l}
                        </a>
                    ))}
                    <Btn variant={scrolled ? "primary" : "outline"} onClick={onApply}>Apply to Join</Btn>
                </div>
            </div>
        </nav>
    );
}
