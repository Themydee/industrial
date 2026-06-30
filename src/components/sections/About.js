import Tag from "@/components/ui/Tag";

export default function About() {
    const creds = [
        { label: "Education", value: "First Class, Chemical Engineering — University of Ife\nMasters — University of Toronto\nDPhil, Development Economics — University of Sussex" },
        { label: "United Nations (20 Years)", value: "Director, Regional Office for Africa\nChief Scientific Advisor, UN-HABITAT" },
        { label: "African Development Bank", value: "Chief of Staff & Director of Cabinet to the President\nSpecial Adviser on Industrialisation\nCoordinator, Agro-Industrial Processing Zones" },
        { label: "Publications", value: "20+ books · Endorsed by President Obasanjo and historian Toyin Falola\nNational Productivity Order of Merit" },
        { label: "Advisory", value: "Member, AfCFTA Advisory Council on Industrialisation" },
    ];
    
    return (
        <section id="about" className="about-padding" style={{ background: "var(--color-white)", borderTop: "1px solid var(--color-rule-lt)" }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                
                <div className="founder-header animate-up">
                    <Tag color="var(--color-gold)">The Founder</Tag>
                    <h2 className="serif-heading" style={{ fontSize: "clamp(32px, 4vw, 48px)", color: "var(--color-dark)", marginTop: 16 }}>The Mind Behind the Movement</h2>
                    <p className="founder-desc">
                        Prof. Banji Oyelaran-Oyeyinka is the first Nigerian Professor in Industrialisation. He has spent four decades inside the rooms where Africa's development was decided.
                    </p>
                    <div style={{ marginTop: 24 }}>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--color-red)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "1px solid var(--color-red)", paddingBottom: 2 }}>
                            <span>Connect on LinkedIn</span>
                            <span>↗</span>
                        </a>
                    </div>
                </div>

                <div className="about-grid animate-up animate-delay-2">
                    
                    <div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-red)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>The Adesina Connection</div>
                        <p className="serif-heading" style={{ fontSize: 22, fontStyle: "italic", color: "var(--color-dark)", lineHeight: 1.5, marginBottom: 24 }}>
                            "When Dr. Adesina concluded his presidency of the African Development Bank, it was Prof. Banji he trusted to document that legacy in full."
                        </p>
                        <p style={{ fontSize: 14, color: "var(--color-red)", lineHeight: 1.8, fontWeight: 600 }}>
                            Dr. Akinwumi Adesina personally appointed Prof. Banji as Chief of Staff and Special Adviser on Industrialisation—placing Africa's foremost industrialisation thinker at the very heart of the continent's largest development finance institution.
                        </p>
                    </div>

                    <div className="about-creds">
                        {creds.map(({ label, value }) => (
                            <div key={label}>
                                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-red)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>{label}</div>
                                <div style={{ fontSize: 15, color: "var(--color-grey)", fontWeight: 300, lineHeight: 1.6, whiteSpace: "pre-line" }}>{value}</div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
