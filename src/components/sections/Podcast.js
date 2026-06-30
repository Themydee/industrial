import Tag from "@/components/ui/Tag";

export default function Podcast() {
    return (
        <section id="podcast" style={{ background: "var(--color-white)", padding: "120px 48px", borderTop: "1px solid var(--color-rule-lt)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 24 }} className="animate-up">
                    <div>
                        <Tag color="var(--color-red)">The Masterclass Series</Tag>
                        <h2 className="serif-heading" style={{ fontSize: "clamp(36px, 5vw, 56px)", color: "var(--color-dark)", margin: "0 0 16px" }}>Industrialisation & Development</h2>
                    </div>
                    <p style={{ fontSize: 16, color: "var(--color-grey)", fontWeight: 300, maxWidth: 400, textAlign: "right", lineHeight: 1.6 }}>Free to the public. Recorded in high definition. Supported by the community.</p>
                </div>
                
                <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "var(--color-ivory-2)", border: "1px solid var(--color-rule-lt)" }} className="animate-up animate-delay-2">
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/videoseries?list=UULFx3x_8m5lU72lEltwZp6kGg" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
                </div>
                
                <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32 }} className="bento-grid animate-up animate-delay-3">
                    {[
                        ["01", "Engines of Growth", "Why did some nations industrialise and others did not?"],
                        ["02", "The Knowledge Economy", "How technology transfer actually works in practice."],
                        ["03", "Financing the Future", "The role of DFIs and local banks in structural transformation."]
                    ].map(([n, t, d]) => (
                        <div key={n} style={{ padding: "32px", border: "1px solid var(--color-rule-lt)", background: "var(--color-ivory)" }}>
                            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-red)", letterSpacing: "0.15em", marginBottom: 12 }}>EPISODE {n}</div>
                            <div className="serif-heading" style={{ fontSize: 20, color: "var(--color-dark)", marginBottom: 12 }}>{t}</div>
                            <p style={{ fontSize: 14, color: "var(--color-grey)", lineHeight: 1.6, fontWeight: 300 }}>{d}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
