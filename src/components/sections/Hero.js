import Tag from "@/components/ui/Tag";
import Btn from "@/components/ui/Btn";

export default function Hero({ onApply }) {
    return (
        <section id="home" style={{ 
            minHeight: "100vh", 
            background: "var(--color-ivory)", 
            display: "flex", 
            alignItems: "center", 
            padding: "0 48px", 
            position: "relative", 
            overflow: "hidden", 
            paddingTop: 120 
        }}>
            
            <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", paddingBottom: 80 }} className="hero-grid">
                
                <div className="animate-up">
                    <Tag color="var(--color-red)">The Premier Leadership Community</Tag>
                    
                    <h1 className="serif-heading" style={{ fontSize: "clamp(50px, 6vw, 84px)", lineHeight: 0.95, color: "var(--color-dark)", margin: "0 0 32px" }}>
                        Industrialise<br />
                        <span style={{ fontStyle: "italic", color: "var(--color-mid)" }}>Africa</span>
                    </h1>
                    
                    <p style={{ fontSize: 18, color: "var(--color-grey)", lineHeight: 1.8, maxWidth: 500, marginBottom: 48, fontWeight: 300 }}>
                        Africa has the answers. Let's build them together. Join the continent's most exclusive network of policymakers, agribusiness leaders, and industrialists, led by Prof. Banji Oyelaran-Oyeyinka.
                    </p>
                    
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                        <Btn variant="primary" onClick={onApply}>Apply to Join</Btn>
                        <Btn variant="outline" href="#about">The Founder ↓</Btn>
                    </div>
                    
                    <div style={{ display: "flex", gap: 40, marginTop: 52, paddingTop: 36, borderTop: `1px solid var(--color-rule)` }}>
                        {[["40+", "Years of Insight"], ["20", "Years at UN"], ["20+", "Books Published"]].map(([n, l]) => (
                            <div key={l}>
                                <div className="serif-heading" style={{ fontSize: 36, color: "var(--color-dark)", lineHeight: 1 }}>{n}</div>
                                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-grey)", marginTop: 8, letterSpacing: "0.15em", textTransform: "uppercase" }}>{l}</div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="hide-mob animate-up animate-delay-2" style={{ position: "relative" }}>
                    <div style={{ 
                        width: "100%", 
                        aspectRatio: "3/4", 
                        background: "var(--color-ivory-2)",
                        backgroundImage: "url('/prof.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: 4,
                        boxShadow: "var(--shadow-lg)"
                    }} />
                    
                    {/* Decorative elegant border */}
                    <div style={{ 
                        position: "absolute", 
                        inset: "-16px", 
                        border: "1px solid var(--color-gold)", 
                        pointerEvents: "none",
                        zIndex: -1 
                    }} />
                    
                    <div style={{ position: "absolute", bottom: -24, right: -24, background: "var(--color-white)", padding: "20px 24px", border: "1px solid var(--color-rule-lt)", boxShadow: "var(--shadow-md)" }}>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-gold)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Led By</div>
                        <div className="serif-heading" style={{ fontSize: 20, color: "var(--color-dark)" }}>Prof. Banji Oyelaran-Oyeyinka</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
