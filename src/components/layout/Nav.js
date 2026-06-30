"use client";
import { useState, useEffect } from "react";
import Btn from "@/components/ui/Btn";

export default function Nav({ onApply }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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
        <>
        <nav className="nav-padding" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid var(--color-rule-lt)" : "1px solid transparent", transition: "all 0.4s ease" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <a href="#home" className="serif-heading" style={{ fontSize: 24, color: "var(--color-dark)", fontWeight: 600, letterSpacing: "-0.02em" }}>
                    Industrialise<span style={{ color: "var(--color-red)" }}>Africa</span>
                </a>
                
                {/* Desktop Nav */}
                <div style={{ display: "flex", gap: 40, alignItems: "center" }} className="hide-mob">
                    {links.map(l => (
                        <a key={l.l} href={l.h} style={{ fontSize: 13, color: "var(--color-mid)", fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "var(--color-red)"} onMouseLeave={e => e.target.style.color = "var(--color-mid)"}>
                            {l.l}
                        </a>
                    ))}
                    <Btn variant={scrolled ? "primary" : "outline"} onClick={onApply}>Apply to Join</Btn>
                </div>

                {/* Mobile Hamburger */}
                <button 
                    className="show-mob" 
                    onClick={() => setMenuOpen(true)}
                    style={{ fontSize: 24, color: "var(--color-dark)", display: "none" }}
                >
                    ☰
                </button>
            </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
            <div style={{ position: "fixed", inset: 0, background: "var(--color-ivory)", zIndex: 1000, padding: 24, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 60 }}>
                    <div className="serif-heading" style={{ fontSize: 24, color: "var(--color-dark)", fontWeight: 600 }}>
                        Industrialise<span style={{ color: "var(--color-red)" }}>Africa</span>
                    </div>
                    <button onClick={() => setMenuOpen(false)} style={{ fontSize: 32, color: "var(--color-dark)", lineHeight: 1 }}>×</button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 32, flex: 1 }}>
                    {links.map(l => (
                        <a key={l.l} href={l.h} onClick={() => setMenuOpen(false)} style={{ fontSize: 24, color: "var(--color-dark)", fontWeight: 500, borderBottom: "1px solid var(--color-rule-lt)", paddingBottom: 16 }}>
                            {l.l}
                        </a>
                    ))}
                </div>

                <div style={{ paddingBottom: 40 }}>
                    <Btn variant="primary" onClick={() => { setMenuOpen(false); onApply(); }} style={{ width: "100%", justifyContent: "center" }}>Apply to Join</Btn>
                </div>
            </div>
        )}
        </>
    );
}
