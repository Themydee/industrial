"use client";
import { useState, useEffect } from "react";
import { T } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Nav({ onApply }) {
  const [mob, setMob] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    ["/#about", "The Professor"],
    ["/#membership", "Membership"]
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 300,
        background: T.white,
        borderBottom: scrolled ? `1px solid ${T.rule}` : "1px solid transparent",
        height: 72, padding: "0 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.2s ease"
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, background: T.primary, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "6px" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: T.white }}>IA</span>
          </div>
          <span style={{ fontSize: 18, fontWeight: 600, color: T.dark }}>
            Industrialise Africa
          </span>
        </a>
        
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="hide-mob">
          {links.map(([h, l]) => (
            <a key={h} href={h} style={{
              fontSize: 14, color: T.mid, fontWeight: 500,
              transition: "color 0.2s"
            }} onMouseEnter={e => e.target.style.color = T.primary} onMouseLeave={e => e.target.style.color = T.mid}>
              {l}
            </a>
          ))}
          
          {!userId ? (
            <Button variant="primary" href="/sign-in" style={{ fontSize: 14, color: T.dark, fontWeight: 600 }}>Sign In</Button>
          ) : (
            <>
              <Link href="/dashboard" style={{ fontSize: 14, color: T.primary, fontWeight: 600 }}>Dashboard</Link>
              <Link href="/dashboard/directory" style={{ fontSize: 14, color: T.dark, fontWeight: 600 }}>Directory</Link>
              <UserButton afterSignOutUrl="/" />
            </>
          )}

          {/* {!userId && (
            <Button variant="primary" href="/sign-up">
              Apply to Join
            </Button>
          )} */}
        </div>
        
        <button onClick={() => setMob(!mob)} style={{ display: "none", flexDirection: "column", gap: 5 }} className="mob-ham">
          {[0, 1, 2].map(i => <span key={i} style={{ display: "block", width: 24, height: 2, background: T.dark, borderRadius: "2px" }} />)}
        </button>
      </nav>

      {mob && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 299, background: T.white,
          padding: "100px 32px 40px",
          display: "flex", flexDirection: "column", gap: 4
        }}>
          {links.map(([h, l]) => (
            <a key={h} href={h} onClick={() => setMob(false)} style={{
              fontSize: 24, fontWeight: 600, color: T.dark,
              padding: "16px 0", borderBottom: `1px solid ${T.rule}`, display: "block"
            }}>
              {l}
            </a>
          ))}
          <Button variant="primary" href="/sign-in" onClick={() => setMob(false)} style={{ marginTop: 32, justifyContent: "center", padding: "16px" }}>
            Sign In
          </Button>
        </div>
      )}

      <style>{`
        .mob-ham { display: none !important; }
        @media(max-width: 900px) {
          .hide-mob { display: none !important; }
          .mob-ham { display: flex !important; }
          nav { padding: 0 24px !important; }
        }
      `}</style>
    </>
  );
}
