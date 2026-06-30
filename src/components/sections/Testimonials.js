import { TESTIMONIALS } from "@/lib/constants";
import Tag from "@/components/ui/Tag";

export default function Testimonials() {
    return (
        <section className="section-padding" style={{ background: "var(--color-white)", borderTop: "1px solid var(--color-rule-lt)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 64 }} className="animate-up">
                    <Tag color="var(--color-gold)">What Members Say</Tag>
                    <h2 className="serif-heading" style={{ fontSize: "clamp(32px, 4vw, 48px)", color: "var(--color-dark)", marginTop: 16 }}>The network in action</h2>
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }} className="bento-grid">
                    {TESTIMONIALS.map(({ quote, name, org }, i) => (
                        <div key={name} className={`animate-up animate-delay-${i}`} style={{ background: "var(--color-ivory)", padding: "40px", borderTop: `2px solid var(--color-gold)` }}>
                            <div className="serif-heading" style={{ fontSize: 40, color: "var(--color-gold)", lineHeight: 1, marginBottom: 16 }}>"</div>
                            <p style={{ fontSize: 15, fontStyle: "italic", color: "var(--color-mid)", lineHeight: 1.8, marginBottom: 32, fontWeight: 300 }}>{quote}</p>
                            
                            <div style={{ height: 1, background: "var(--color-rule-lt)", marginBottom: 24 }} />
                            
                            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-dark)", marginBottom: 4 }}>{name}</div>
                            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-grey)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{org}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
