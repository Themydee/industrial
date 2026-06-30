import Btn from "@/components/ui/Btn";

export default function CTABand({ onApply }) {
    return (
        <section className="section-padding" style={{ background: "var(--color-dark)", textAlign: "center" }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }} className="animate-up">
                <h2 className="serif-heading" style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "var(--color-white)", lineHeight: 1.1, marginBottom: 32 }}>
                    Africa doesn't lack great minds.<br />
                    <span style={{ fontStyle: "italic", color: "var(--color-gold)" }}>It lacks people listening to them.</span>
                </h2>
                <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", fontWeight: 300, marginBottom: 48 }}>Join the community that is changing that.</p>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
                    <Btn variant="primary" onClick={onApply}>Apply to Join</Btn>
                    <a href="https://www.youtube.com/@OyebanjiOyelaran" target="_blank" rel="noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                        Or watch free on YouTube
                    </a>
                </div>
            </div>
        </section>
    );
}
