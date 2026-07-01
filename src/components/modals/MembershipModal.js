"use client";
import { useState } from "react";
import { F, T, TIERS } from "@/lib/constants";
import Btn from "@/components/ui/Btn";

export default function MembershipModal({ tierId, onClose }) {
    const tier = TIERS.find(t => t.id === tierId);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [billing, setBilling] = useState("monthly");
    const [done, setDone] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!tier) return null;

    const is = v => ({ width: "100%", padding: "10px 13px", border: `1px solid var(--color-rule-lt)`, background: "var(--color-white)", fontSize: 14, color: "var(--color-dark)", outline: "none", borderRadius: 0, ...v });

    const submit = async () => {
        if (!name || !email || !phone) { alert("Please complete all fields."); return; }
        if (!email.includes("@")) { alert("Please enter a valid email."); return; }
        setLoading(true);
        try {
            await fetch("/api/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "membership", tier: tierId, name, email, phone, password, billingPref: billing })
            });
            setDone(true);
        } catch (e) {
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div onClick={e => { if (e.target === e.currentTarget) onClose() }} style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div style={{ background: T.white, maxWidth: 440, width: "100%", maxHeight: "90vh", overflowY: "auto", animation: "modalIn 0.2s ease", borderTop: `3px solid ${tier.color}` }}>
                <div style={{ background: T.dark, padding: "22px 26px", position: "relative" }}>
                    <button onClick={onClose} style={{ position: "absolute", top: 12, right: 12, background: "rgba(255,255,255,0.08)", border: "none", width: 28, height: 28, cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                    <div style={{ fontFamily: F.mono, fontSize: 10, color: tier.color, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>{tier.name}</div>
                    <div style={{ fontFamily: F.display, fontSize: 28, fontWeight: 700, color: T.white, marginBottom: 3 }}>{tier.price}<span style={{ fontSize: 13, fontWeight: 400 }}> / month</span></div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{tier.sub}</div>
                </div>
                <div style={{ padding: "22px 26px" }}>
                    {done ? (
                        <div style={{ textAlign: "center", padding: "28px 0" }}>
                            <div style={{ fontSize: 40, marginBottom: 14 }}>✅</div>
                            <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 700, color: T.dark, marginBottom: 8 }}>Confirmed, {name.split(" ")[0]}</div>
                            <p style={{ fontSize: 14, color: T.grey, lineHeight: 1.65 }}>Your <strong>{tier.name}</strong> interest is received.<br /><br />We'll be in touch at <strong>{email}</strong> within {tierId === "vanguard" ? "24" : "48"} hours.</p>
                            <Btn variant="dark" onClick={onClose} style={{ marginTop: 20, justifyContent: "center" }}>Close</Btn>
                        </div>
                    ) : (
                        <>
                            {tierId !== "foundation" && (
                                <div style={{ marginBottom: 16 }}>
                                    <div style={{ fontFamily: F.mono, fontSize: 10, color: T.dark, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 7 }}>Billing preference</div>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }} className="billing-grid">
                                        {["monthly", "annual"].map(b => (
                                            <button key={b} onClick={() => setBilling(b)} style={{ padding: 10, border: `1px solid ${billing === b ? T.red : T.ruleLt}`, background: billing === b ? T.redLt : T.white, fontSize: 12, fontWeight: 600, color: billing === b ? T.red : T.dark, cursor: "pointer", transition: "all 0.2s" }}>
                                                {b === "monthly" ? "Monthly" : "Annual (save 2 months)"}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div style={{ fontSize: 12, color: T.grey, background: T.goldLt, borderLeft: `2px solid ${T.red}`, padding: "11px 13px", marginBottom: 18, lineHeight: 1.6, fontWeight: 300 }}>
                                <strong style={{ color: T.dark, fontWeight: 600 }}>Payment: </strong>
                                {tierId === "foundation" ? "No payment required — free forever." :
                                    tierId === "vanguard" ? `Monthly: $500 (₦700,000) or annual upfront: $5,000 (₦7,000,000). Limited to 50 members — we'll contact you within 24 hours.` :
                                        tierId === "builder" ? `Monthly: $15 (₦21,000) or annually: $150 (₦210,000). Via Paystack (Nigeria) or Stripe. Link sent within 48 hours.` :
                                            `Monthly: $75 (₦105,000) or annually: $750 (₦1,050,000). Via Paystack (Nigeria) or Stripe. Link sent within 48 hours.`}
                            </div>
                            <div style={{ marginBottom: 12 }}>
                                <div style={{ fontFamily: F.mono, fontSize: 10, color: T.dark, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Full Name</div>
                                <input value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" style={is({})} onFocus={e => e.target.style.borderColor = T.red} onBlur={e => e.target.style.borderColor = T.ruleLt} />
                            </div>
                            <div style={{ marginBottom: 12 }}>
                                <div style={{ fontFamily: F.mono, fontSize: 10, color: T.dark, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Email Address</div>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={is({})} onFocus={e => e.target.style.borderColor = T.red} onBlur={e => e.target.style.borderColor = T.ruleLt} />
                            </div>
                            <div style={{ marginBottom: 12 }}>
                                <div style={{ fontFamily: F.mono, fontSize: 10, color: T.dark, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Set Password</div>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password" style={is({})} onFocus={e => e.target.style.borderColor = T.red} onBlur={e => e.target.style.borderColor = T.ruleLt} />
                            </div>
                            <div style={{ marginBottom: 18 }}>
                                <div style={{ fontFamily: F.mono, fontSize: 10, color: T.dark, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>WhatsApp Number</div>
                                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+234 or +44..." style={is({})} onFocus={e => e.target.style.borderColor = T.red} onBlur={e => e.target.style.borderColor = T.ruleLt} />
                            </div>
                            <Btn variant={tierId === "vanguard" ? "red" : tierId === "catalyst" ? "primary" : "dark"} onClick={submit} style={{ width: "100%", justifyContent: "center", padding: 12 }} disabled={loading}>
                                {loading ? "Submitting..." : tierId === "vanguard" ? "Apply for Vanguard →" : "Confirm Interest →"}
                            </Btn>
                            <p style={{ fontSize: 11, color: T.grey, textAlign: "center", marginTop: 10 }}>🔒 Secure · Confidential · Cancel anytime</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
