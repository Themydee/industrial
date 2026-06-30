"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { T, STATES } from "@/lib/constants";
import { submitOnboarding } from "@/app/actions/onboarding";

const L = ({ t }) => <div style={{ fontSize: 13, fontWeight: 500, color: T.dark, marginBottom: 4 }}>{t}</div>;
const FG = ({ children }) => <div style={{ marginBottom: 16 }}>{children}</div>;

export default function OnboardingModal({ userFirstName, userEmail }) {
  const [step, setStep] = useState(1);
  const TOTAL = 4;
  const [f, setF] = useState({ name: userFirstName || "", email: userEmail || "", phone: "", country: "", state: "", age: "", role: "", sector: "", stage: "", source: "", why: "", challenge: "", topic: "", network: "", sponsorRef: "", tier: "", extra: "", feature: "Yes — with my full name" });
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  const [loading, setLoading] = useState(false);

  const canNext = () => {
    if (step === 1) return f.name && f.phone && f.country;
    if (step === 2) return f.role && f.sector;
    if (step === 3) return f.why;
    return true;
  };

  const submit = async () => {
    if (!f.name || !f.phone || !f.country || !f.role || !f.why) { alert("Please complete required fields."); return; }
    setLoading(true);
    try {
      await submitOnboarding(f);
    } catch(err) {
      alert("Error saving profile. Please make sure the database is connected.");
      console.error(err);
      setLoading(false);
    }
  };

  const is = { width: "100%", padding: "12px 16px", border: `1px solid ${T.rule}`, background: T.white, fontSize: 14, color: T.dark, outline: "none", borderRadius: "6px", marginTop: 4, transition: "border-color 0.2s" };
  const ss = { ...is, appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2364748b' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center", backgroundColor: T.white };
  const ta = { ...is, height: 96, resize: "vertical" };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(15,23,42,0.8)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: T.white, maxWidth: 500, width: "100%", maxHeight: "90vh", overflowY: "auto", borderRadius: "12px", boxShadow: "0 20px 40px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column" }}>
        
        <div style={{ padding: "24px 32px", borderBottom: `1px solid ${T.ruleLt}`, position: "relative" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: T.primary, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Step {step} of {TOTAL}</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: T.dark, letterSpacing: "-0.01em", margin: 0 }}>
            {step === 1 ? "Complete Profile" : step === 2 ? "Your Work" : step === 3 ? "Your Mission" : "Final Details"}
          </h2>
          <p style={{ fontSize: 13, color: T.mid, marginTop: 4 }}>Please complete your profile to access the dashboard.</p>
        </div>
        
        <div style={{ height: 4, background: T.ruleLt }}>
          <div style={{ height: "100%", background: T.primary, width: `${(step / TOTAL) * 100}%`, transition: "width 0.3s ease" }} />
        </div>
        
        <div style={{ padding: "32px" }}>
          {step === 1 && <>
            <FG><L t="Full Name *" /><input value={f.name} onChange={e => set("name", e.target.value)} placeholder="Your full name" style={is} onFocus={e => e.target.style.borderColor = T.primary} onBlur={e => e.target.style.borderColor = T.rule} /></FG>
            <FG><L t="Email Address" /><input value={f.email} disabled style={{ ...is, background: T.ivory, color: T.mid }} /></FG>
            <FG><L t="WhatsApp (with country code) *" /><input type="tel" value={f.phone} onChange={e => set("phone", e.target.value)} placeholder="+234 or +44..." style={is} onFocus={e => e.target.style.borderColor = T.primary} onBlur={e => e.target.style.borderColor = T.rule} /></FG>
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
            <FG><L t="Why does Africa's industrialisation matter to you personally? *" /><textarea value={f.why} onChange={e => set("why", e.target.value)} placeholder="In your own words..." style={ta} onFocus={e => e.target.style.borderColor = T.primary} onBlur={e => e.target.style.borderColor = T.rule} /></FG>
            <FG><L t="Biggest challenge you face in your sector?" /><textarea value={f.challenge} onChange={e => set("challenge", e.target.value)} placeholder="Be as specific as you like..." style={ta} onFocus={e => e.target.style.borderColor = T.primary} onBlur={e => e.target.style.borderColor = T.rule} /></FG>
            <FG><L t="Topic most eager to explore" /><select value={f.topic} onChange={e => set("topic", e.target.value)} style={ss}><option value="">Select...</option>{["Agro-Industrial Processing Zones", "Livestock value chain development", "Access to development finance and grants", "Building generational / family wealth", "Export trade and AfCFTA opportunities", "Starting or scaling an agribusiness", "Digital transformation in African industries", "Manufacturing and value-added production", "Policy advocacy and government engagement", "Attracting foreign direct investment", "Youth and women in agriculture", "Leadership and institutional development"].map(t => <option key={t}>{t}</option>)}</select></FG>
          </>}
          
          {step === 4 && <>
            <FG><L t="Professional network size (approx.)" /><select value={f.network} onChange={e => set("network", e.target.value)} style={ss}><option value="">Select...</option>{["Under 100", "100–500", "500–2,000", "2,000–10,000", "Over 10,000"].map(n => <option key={n}>{n}</option>)}</select></FG>
            <FG><L t="Know a potential sponsor or partner? (optional)" /><input value={f.sponsorRef} onChange={e => set("sponsorRef", e.target.value)} placeholder="Name, organisation, contact..." style={is} onFocus={e => e.target.style.borderColor = T.primary} onBlur={e => e.target.style.borderColor = T.rule} /></FG>
            <FG><L t="Membership tier interest" /><select value={f.tier} onChange={e => set("tier", e.target.value)} style={ss}><option value="">Foundation (Free) to start</option><option>Foundation — Free</option><option>Builder — $15/mo (₦21,000)</option><option>Catalyst — $75/mo (₦105,000)</option><option>Vanguard — $500/mo (₦700,000)</option><option>Not sure yet</option></select></FG>
            <FG><L t="Anything else you want us to know?" /><textarea value={f.extra} onChange={e => set("extra", e.target.value)} placeholder="This is your space..." style={ta} onFocus={e => e.target.style.borderColor = T.primary} onBlur={e => e.target.style.borderColor = T.rule} /></FG>
            <FG><L t="May we feature your story in community content?" /><select value={f.feature} onChange={e => set("feature", e.target.value)} style={ss}><option>Yes — with my full name</option><option>Yes — anonymously only</option><option>No — keep responses private</option></select></FG>
          </>}
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32, paddingTop: 24, borderTop: `1px solid ${T.ruleLt}` }}>
            {step > 1 ? <button onClick={() => setStep(s => s - 1)} disabled={loading} style={{ fontSize: 14, fontWeight: 500, color: T.mid, background: "none", border: "none", cursor: "pointer" }}>← Back</button> : <div />}
            {step < TOTAL ?
              <Button onClick={() => canNext() && setStep(s => s + 1)} style={{ opacity: canNext() ? 1 : 0.5 }}>Next Step →</Button> :
              <Button variant="primary" onClick={submit} disabled={loading}>{loading ? "Saving..." : "Complete Profile"}</Button>
            }
          </div>
          
        </div>
      </div>
    </div>
  );
}
