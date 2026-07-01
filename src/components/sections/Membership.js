import { TIERS } from "@/lib/constants";
import Tag from "@/components/ui/Tag";
import Btn from "@/components/ui/Btn";

export default function Membership({ onJoin }) {
    return (
        <section id="membership" className="section-padding" style={{ background: "var(--color-ivory)", borderTop: "1px solid var(--color-rule-lt)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 80 }} className="animate-up">
                    <Tag color="var(--color-red)">Join My Network</Tag>
                    <h2 className="serif-heading" style={{ fontSize: "clamp(28px, 5vw, 56px)", color: "var(--color-dark)", margin: "16px 0 24px" }}>Advisory & Access</h2>
                    <p style={{ fontSize: 16, color: "var(--color-grey)", lineHeight: 1.6, maxWidth: 500, margin: "0 auto" }}>Direct access to my expertise, network, and masterclasses. Structured to support everyone from students to institutional leaders.</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }} className="bento-grid">
                    {TIERS.map((tier, i) => {
                        const isVanguard = tier.id === "vanguard";
                        
                        return (
                            <div key={tier.id} className={`animate-up animate-delay-${i}`} style={{ 
                                background: "var(--color-white)", 
                                border: isVanguard ? `1px solid var(--color-gold)` : "1px solid var(--color-rule-lt)",
                                padding: "24px 20px",
                                display: "flex", 
                                flexDirection: "column", 
                                position: "relative",
                                boxShadow: isVanguard ? "var(--shadow-md)" : "none",
                            }}>
                                
                                {isVanguard && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "var(--color-gold)" }} />}

                                <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 600, color: isVanguard ? "var(--color-gold)" : "var(--color-red)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>{tier.name}</div>
                                <div className="serif-heading" style={{ fontSize: 24, color: "var(--color-dark)", lineHeight: 1, marginBottom: 8 }}>{tier.price}</div>
                                <div style={{ fontSize: 12, color: "var(--color-grey)", marginBottom: 12, lineHeight: 1.5 }}>{tier.sub}</div>
                                {tier.annual && <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--color-mid)", letterSpacing: "0.08em", lineHeight: 1.5 }}>{tier.annual}</div>}
                                
                                <div style={{ height: 1, background: "var(--color-rule-lt)", margin: "32px 0" }} />

                                <ul style={{ listStyle: "none", flex: 1, marginBottom: 32 }}>
                                    {tier.features.map(f => (
                                        <li key={f} style={{ fontSize: 12, color: "var(--color-mid)", padding: "6px 0", display: "flex", gap: 10, alignItems: "flex-start", lineHeight: 1.4, fontWeight: 300 }}>
                                            <span style={{ color: "var(--color-gold)", flexShrink: 0, fontFamily: "var(--font-mono)", fontSize: 10, marginTop: 2 }}>—</span>{f}
                                        </li>
                                    ))}
                                </ul>

                                <Btn variant={isVanguard ? "primary" : "outline"} onClick={() => onJoin(tier.id)} style={{ width: "100%", justifyContent: "center" }}>
                                    {tier.cta}
                                </Btn>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
