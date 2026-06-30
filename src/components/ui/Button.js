"use client";
import { useState } from "react";
import { T } from "@/lib/constants";

export default function Button({ children, variant = "primary", onClick, href, style = {}, className = "" }) {
  const [h, setH] = useState(false);
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "10px 24px",
    fontSize: 14,
    fontWeight: 500,
    transition: "all 0.2s ease",
    cursor: "pointer",
    border: "none",
    borderRadius: "6px",
    ...style
  };

  const styles = {
    primary: {
      ...base,
      background: h ? T.primaryHover : T.primary,
      color: T.white,
    },
    ghost: {
      ...base,
      background: "transparent",
      color: h ? T.primary : T.dark,
      border: `1px solid ${T.rule}`,
    },
    dark: {
      ...base,
      background: h ? T.dark2 : T.dark,
      color: T.white,
    },
    red: { // Mapping legacy red to dark
      ...base,
      background: h ? T.dark2 : T.dark,
      color: T.white,
    },
    outline: {
      ...base,
      background: h ? T.ivory : "transparent",
      color: T.dark,
      border: `1px solid ${T.rule}`,
    },
  };

  const s = styles[variant] || styles.primary;

  if (href) {
    return (
      <a href={href} style={s} className={className} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} style={s} className={className} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      {children}
    </button>
  );
}
