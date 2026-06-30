"use client";
import { useState } from "react";
import { F, T, STATES } from "@/lib/constants";
import Btn from "@/components/ui/Btn";

export default function AppModal({ onClose }) {
    const [step, setStep] = useState(1);
    const TOTAL = 4;
    const [f, setF] = useState({ name: "", email: "", phone: "", country: "", state: "", age: "", role: "", sector: "", stage: "", source: "", why: "", challenge: "", topic: "", network: "", sponsorRef: "", tier: "", extra: "", feature: "Yes — with my full name" });
    const set = (k, v) => setF(p => ({ ...p, [k]: v }));
    const [done, setDone] = useState(false);

    const canNext = () => {
        if (step === 1) return f.name && f.email && f.phone && f.country;
        if (step === 2) return f.role && f.sector;
        if (step === 3) return f.why;
        return true;
    };

    const [loading, setLoading] = useState(false);

    const submit = async () => {
        if (!f.name || !f.email || !f.phone || !f.country || !f.role || !f.why) { alert("Please complete required fields."); return; }
        setLoading(true);
        try {
            await fetch("/api/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "community", ...f })
            });
            setDone(true);
        } catch (e) {
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const is = { width: "100%", padding: "10px 13px", border: `1px solid ${T.ruleLt}`, background: T.white, fontSize: 14, color: T.dark, outline: "none", borderRadius: 0, marginTop: 4, transition: "border-color 0.2s" };
    const ss = { ...is, appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236B6B6B' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", backgroundColor: T.white };
    const ta = { ...is, height: 72, resize: "vertical" };
    const L = ({ t }) => <div style={{ fontFamily: F.mono, fontSize: 10, color: T.dark, letterSpacing: "0.06em", textTransform: "uppercase" }}>{t}</div>;
    const FG = ({ children }) => <div style={{ marginBottom: 13 }}>{children}</div>;

    if (done) return (
        <div style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div style={{ background: T.white, maxWidth: 440, width: "100%", padding: "44px 36px", textAlign: "center", borderTop: `3px solid ${T.gold}`, animation: "modalIn 0.2s ease" }}>
                <div style={{ fontSize: 44, marginBottom: 16 }}>🌍</div>
                <div style={{ fontFamily: F.display, fontSize: 26, fontWeight: 700, color: T.dark, marginBottom: 10 }}>Welcome to the Movement</div>
                <p style={{ fontSize: 14, color: T.grey, lineHeight: 1.75, marginBottom: 24 }}>Thank you for applying.<br /><em>Watch. Learn. Build. Share.</em><br /><br />Prof. Banji's team will be in touch at <strong>{f.email}</strong> within 48 hours.</p>
                <Btn variant="dark" onClick={onClose} style={{ justifyContent: "center" }}>Close</Btn>
            </div>
        </div>
    );

    return (
        <div onClick={e => { if (e.target === e.currentTarget) onClose() }} style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div style={{ background: T.white, maxWidth: 500, width: "100%", maxHeight: "92vh", overflowY: "auto", animation: "modalIn 0.2s ease", borderTop: `3px solid ${T.gold}` }}>
                <div style={{ background: T.dark, padding: "20px 26px", position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                        <div style={{ fontFamily: F.mono, fontSize: 9, color: T.gold, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 3 }}>Community Interest Form · Step {step} of {TOTAL}</div>
                        <div style={{ fontFamily: F.display, fontSize: 19, fontWeight: 700, color: T.white }}>
                            {step === 1 ? "About You" : step === 2 ? "Your Work" : step === 3 ? "Your Mission" : "Final Details"}
                        </div>
                    </div>
                    <button onClick={onClose} style={{ background: "rgba(255,255,255,0.08)", border: "none", width: 28, height: 28, cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                </div>
                <div style={{ height: 3, background: T.ruleLt }}>
                    <div style={{ height: "100%", background: T.red, width: `${(step / TOTAL) * 100}%`, transition: "width 0.3s ease" }} />
                </div>
                <div style={{ padding: "24px 26px" }}>
                    {step === 1 && <>
                        <FG><L t="Full Name *" /><input value={f.name} onChange={e => set("name", e.target.value)} placeholder="Your full name" style={is} onFocus={e => e.target.style.borderColor = T.red} onBlur={e => e.target.style.borderColor = T.ruleLt} /></FG>
                        <FG><L t="Email Address *" /><input type="email" value={f.email} onChange={e => set("email", e.target.value)} placeholder="your@email.com" style={is} onFocus={e => e.target.style.borderColor = T.red} onBlur={e => e.target.style.borderColor = T.ruleLt} /></FG>
                        <FG><L t="WhatsApp (with country code) *" /><input type="tel" value={f.phone} onChange={e => set("phone", e.target.value)} placeholder="+234 or +44..." style={is} onFocus={e => e.target.style.borderColor = T.red} onBlur={e => e.target.style.borderColor = T.ruleLt} /></FG>
                        <FG><L t="Country of Residence *" /><select value={f.country} onChange={e => set("country", e.target.value)} style={ss}><option value="">Select...</option>{["Nigeria", "Ghana", "Kenya", "South Africa", "Ethiopia", "Rwanda", "Senegal", "Tanzania", "Uganda", "Egypt", "Morocco", "Other African Country", "United Kingdom", "United States", "Canada", "Europe", "Other"].map(c => <option key={c}>{c}</option>)}</select></FG>
                        {f.country === "Nigeria" && <FG><L t="Which State?" /><select value={f.state} onChange={e => set("state", e.target.value)} style={ss}><option value="">Select...</option>{STATES.map(s => <option key={s}>{s}</option>)}</select></FG>}
                        <FG><L t="Age Range" /><select value={f.age} onChange={e => set("age", e.target.value)} style={ss}><option value="">Select...</option>{["Under 25", "25–34", "35–44", "45–54", "55–64", "65 and above"].map(a => <option key={a}>{a}</option>)}</select></FG>
                    </>}
                    {step === 2 && <>
                        <FG><L t="Primary Role *" /><select value={f.role} onChange={e => set("role", e.target.value)} style={ss}><option value="">Select...</option>{["Farmer / Agripreneur / Livestock Producer", "Agribusiness Owner / Food Processing", "Technology Entrepreneur / Founder", "Corporate Executive / Senior Manager", "Government / Public Sector Official", "Development Finance / Investment Professional", "Policy Analyst / Think Tank / NGO", "Academic / Researcher / Lecturer", "Student / Graduate", "Journalist / Media / Content Creator", "Diaspora Professional / Investor", "Retired but Active / Elder Statesman", "Other"].map(r => <option key={r}>{r}</option>)}</select></FG>
                        <FG><L t="Primary Sector *" /><select value={f.sector} onChange={e => set("sector", e.target.value)} style={ss}><option value="">Select...</option>{["Agriculture & Food Systems", "Livestock & Animal Production", "Agro-Processing & Manufacturing", "Technology & Digital Innovation", "Energy & Infrastructure", "Financial Services & Development Finance", "Trade & Export", "Education & Human Capital", "Policy & Governance", "Media & Communications", "Other"].map(s => <option key={s}>{s}</option>)}</select></FG>
                        <FG><L t="Current Stage" /><select value={f.stage} onChange={e => set("stage", e.target.value)} style={ss}><option value="">Select...</option>{["Still learning / building knowledge", "Have ideas but not started yet", "Early stage — just getting started", "Actively running a business", "Scaling an established operation", "I advise, invest or fund others", "I shape policy or institutional strategy"].map(s => <option key={s}>{s}</option>)}</select></FG>
                        <FG><L t="How did you hear about us?" /><select value={f.source} onChange={e => set("source", e.target.value)} style={ss}><option value="">Select...</option>{["YouTube", "Instagram", "LinkedIn", "TikTok", "X / Twitter", "WhatsApp / Forwarded message", "Friend or colleague", "I know Prof. Banji personally", "Email or newsletter", "News article / media"].map(s => <option key={s}>{s}</option>)}</select></FG>
                    </>}
                    {step === 3 && <>
                        <FG><L t="Why does Africa's industrialisation matter to you personally? *" /><textarea value={f.why} onChange={e => set("why", e.target.value)} placeholder="In your own words..." style={ta} onFocus={e => e.target.style.borderColor = T.red} onBlur={e => e.target.style.borderColor = T.ruleLt} /></FG>
                        <FG><L t="Biggest challenge you face in your sector?" /><textarea value={f.challenge} onChange={e => set("challenge", e.target.value)} placeholder="Be as specific as you like..." style={ta} onFocus={e => e.target.style.borderColor = T.red} onBlur={e => e.target.style.borderColor = T.ruleLt} /></FG>
                        <FG><L t="Topic most eager to explore" /><select value={f.topic} onChange={e => set("topic", e.target.value)} style={ss}><option value="">Select...</option>{["Agro-Industrial Processing Zones", "Livestock value chain development", "Access to development finance and grants", "Building generational / family wealth", "Export trade and AfCFTA opportunities", "Starting or scaling an agribusiness", "Digital transformation in African industries", "Manufacturing and value-added production", "Policy advocacy and government engagement", "Attracting foreign direct investment", "Youth and women in agriculture", "Leadership and institutional development"].map(t => <option key={t}>{t}</option>)}</select></FG>
                    </>}
                    {step === 4 && <>
                        <FG><L t="Professional network size (approx.)" /><select value={f.network} onChange={e => set("network", e.target.value)} style={ss}><option value="">Select...</option>{["Under 100", "100–500", "500–2,000", "2,000–10,000", "Over 10,000"].map(n => <option key={n}>{n}</option>)}</select></FG>
                        <FG><L t="Know a potential sponsor or partner? (optional)" /><input value={f.sponsorRef} onChange={e => set("sponsorRef", e.target.value)} placeholder="Name, organisation, contact..." style={is} onFocus={e => e.target.style.borderColor = T.red} onBlur={e => e.target.style.borderColor = T.ruleLt} /></FG>
                        <FG><L t="Membership tier interest" /><select value={f.tier} onChange={e => set("tier", e.target.value)} style={ss}><option value="">Foundation (Free) to start</option><option>Foundation — Free</option><option>Builder — $15/mo (₦21,000)</option><option>Catalyst — $75/mo (₦105,000)</option><option>Vanguard — $500/mo (₦700,000)</option><option>Not sure yet</option></select></FG>
                        <FG><L t="Anything else you want us to know?" /><textarea value={f.extra} onChange={e => set("extra", e.target.value)} placeholder="This is your space..." style={ta} onFocus={e => e.target.style.borderColor = T.red} onBlur={e => e.target.style.borderColor = T.ruleLt} /></FG>
                        <FG><L t="May we feature your story in community content?" /><select value={f.feature} onChange={e => set("feature", e.target.value)} style={ss}><option>Yes — with my full name</option><option>Yes — anonymously only</option><option>No — keep responses private</option></select></FG>
                    </>}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20, paddingTop: 18, borderTop: `1px solid ${T.ruleLt}` }}>
                        {step > 1 ? <button onClick={() => setStep(s => s - 1)} style={{ fontFamily: F.mono, fontSize: 10, color: T.grey, letterSpacing: "0.1em", textTransform: "uppercase", background: "none", border: "none", cursor: "pointer" }}>← Back</button> : <div />}
                        {step < TOTAL ?
                            <Btn variant="dark" onClick={() => canNext() && setStep(s => s + 1)} style={{ opacity: canNext() ? 1 : 0.4 }}>Next →</Btn> :
                            <Btn variant="primary" onClick={submit} disabled={loading}>{loading ? "Submitting..." : "Submit Application →"}</Btn>
                        }
                    </div>
                    <p style={{ fontSize: 11, color: T.grey, textAlign: "center", marginTop: 10 }}>🔒 Confidential · No spam · We respond within 48 hours</p>
                </div>
            </div>
        </div>
    );
}
