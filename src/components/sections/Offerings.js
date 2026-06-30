import { F, T, OFFERINGS } from "@/lib/constants";
import Tag from "@/components/ui/Tag";

export default function Offerings() {
    return (
        <section id="offerings" style={{ background: "var(--color-white)", padding: "120px 48px", borderTop: "1px solid var(--color-rule-lt)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 24 }} className="animate-up">
                    <div>
                        <Tag color="var(--color-gold)">What We Build</Tag>
                        <h2 className="serif-heading" style={{ fontSize: "clamp(36px, 5vw, 56px)", color: "var(--color-dark)", margin: "0 0 16px" }}>Beyond the Podcast</h2>
                    </div>
                    <p style={{ fontSize: 16, color: "var(--color-grey)", fontWeight: 300, maxWidth: 400, textAlign: "right", lineHeight: 1.6 }}>An ecosystem of learning, connection, and opportunity.</p>
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 32 }}>
                    {OFFERINGS.map(({ ico, title, desc, price }, i) => (
                        <div key={title} className={`animate-up animate-delay-${i}`} style={{ 
                            padding: "48px 0", 
                            borderTop: "1px solid var(--color-rule-lt)",
                            position: "relative"
                        }}>
                            <div style={{ fontSize: 32, marginBottom: 24 }}>{ico}</div>
                            <div className="serif-heading" style={{ fontSize: 28, color: "var(--color-dark)", marginBottom: 16 }}>{title}</div>
                            <p style={{ fontSize: 15, color: "var(--color-mid)", lineHeight: 1.7, marginBottom: 32, fontWeight: 300 }}>{desc}</p>
                            
                            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-grey)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{price}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
