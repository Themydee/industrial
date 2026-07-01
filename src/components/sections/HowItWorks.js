import Tag from "@/components/ui/Tag";
import Btn from "@/components/ui/Btn";

export default function HowItWorks({ onApply }) {
    const steps = [
        { n: "01", title: "Apply to Join", desc: "Complete the 4-step community interest form. Tell us who you are, what you're building and what you want. Takes 5–7 minutes." },
        { n: "02", title: "Choose Your Tier", desc: "Our team matches you to the right membership level and sends your payment link within 48 hours. Start free, upgrade any time." },
        { n: "03", title: "Get Access", desc: "Within 48 hours of payment: your WhatsApp groups, Deal Board access, Peer Circle placement and masterclass calendar are activated." },
        { n: "04", title: "Show Up & Build", desc: "Engage with content, attend masterclasses, work your peer circle, use the deal board. The community compounds for those who participate." },
    ];
    
    return (
        <section className="section-padding" style={{ background: "var(--color-ivory-2)", borderTop: "1px solid var(--color-rule-lt)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 64 }} className="animate-up">
                    <Tag color="var(--color-red)">The Process</Tag>
                    <h2 className="serif-heading" style={{ fontSize: "clamp(32px, 4vw, 48px)", color: "var(--color-dark)", marginTop: 16 }}>From curious to connected</h2>
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
                    {steps.map(({ n, title, desc }, i) => (
                        <div key={n} className={`animate-up animate-delay-${i}`} style={{ background: "var(--color-white)", padding: "20px", border: "1px solid var(--color-rule-lt)" }}>
                            <div className="serif-heading" style={{ fontSize: 32, color: "var(--color-red)", marginBottom: 16, lineHeight: 1 }}>{n}</div>
                            <div className="serif-heading" style={{ fontSize: 20, color: "var(--color-dark)", marginBottom: 12 }}>{title}</div>
                            <p style={{ fontSize: 13, color: "var(--color-grey)", lineHeight: 1.6, fontWeight: 300 }}>{desc}</p>
                        </div>
                    ))}
                </div>
                
                <div style={{ textAlign: "center", marginTop: 64 }} className="animate-up">
                    <Btn variant="primary" onClick={onApply}>Start Your Application →</Btn>
                </div>
            </div>
        </section>
    );
}
