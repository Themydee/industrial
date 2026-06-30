"use client";
import { useState } from "react";

export default function Btn({ children, variant = "primary", onClick, href, style = {} }) {
    const [h, setH] = useState(false);

    const base = { 
        display: "inline-flex", 
        alignItems: "center", 
        justifyContent: "center",
        gap: 12, 
        padding: "14px 32px", 
        fontSize: 11, 
        fontFamily: "var(--font-mono)",
        fontWeight: 700, 
        letterSpacing: "0.15em", 
        textTransform: "uppercase", 
        transition: "all 0.3s ease", 
        cursor: "pointer", 
        border: "none", 
        ...style 
    };

    const styles = {
        primary: { 
            ...base, 
            background: h ? "var(--color-red-2)" : "var(--color-red)", 
            color: "var(--color-white)",
            boxShadow: h ? "var(--shadow-md)" : "none",
        },
        ghost: { 
            ...base, 
            background: "transparent", 
            color: h ? "var(--color-red)" : "var(--color-dark)", 
            border: `1px solid ${h ? "var(--color-red)" : "var(--color-rule)"}`,
        },
        dark: { 
            ...base, 
            background: h ? "var(--color-mid)" : "var(--color-dark)", 
            color: "var(--color-white)", 
        },
        outline: { 
            ...base, 
            background: h ? "var(--color-ivory-2)" : "transparent", 
            color: "var(--color-dark)", 
            border: `1px solid var(--color-rule)` 
        },
    };

    const s = styles[variant] || styles.primary;

    if (href) {
        return (
            <a href={href} style={s} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
                {children}
            </a>
        );
    }
    
    return (
        <button onClick={onClick} style={s} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
            {children}
        </button>
    );
}
