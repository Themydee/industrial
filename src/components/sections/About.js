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
        <section id="about" style={{ background: "var(--color-white)", padding: "100px 48px", borderTop: "1px solid var(--color-rule-lt)" }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                
                <div className="animate-up" style={{ textAlign: "center", marginBottom: 80 }}>
                    <Tag color="var(--color-gold)">The Founder</Tag>
                    <h2 className="serif-heading" style={{ fontSize: "clamp(32px, 4vw, 48px)", color: "var(--color-dark)", marginTop: 16 }}>The Mind Behind the Movement</h2>
                    <p style={{ fontSize: 16, color: "var(--color-grey)", lineHeight: 1.8, maxWidth: 600, margin: "24px auto 0", fontWeight: 300 }}>
                        Prof. Banji Oyelaran-Oyeyinka is the first Nigerian Professor in Industrialisation. He has spent four decades inside the rooms where Africa's development was decided.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "start" }} className="hero-grid animate-up animate-delay-2">
                    
                    <div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-red)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>The Adesina Connection</div>
                        <p className="serif-heading" style={{ fontSize: 22, fontStyle: "italic", color: "var(--color-dark)", lineHeight: 1.5, marginBottom: 24 }}>
                            "When Dr. Adesina concluded his presidency of the African Development Bank, it was Prof. Banji he trusted to document that legacy in full."
                        </p>
                        <p style={{ fontSize: 14, color: "var(--color-grey)", lineHeight: 1.8, fontWeight: 300 }}>
                            Dr. Akinwumi Adesina personally appointed Prof. Banji as Chief of Staff and Special Adviser on Industrialisation—placing Africa's foremost industrialisation thinker at the very heart of the continent's largest development finance institution.
                        </p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 32, paddingLeft: 40, borderLeft: "1px solid var(--color-rule-lt)" }}>
                        {creds.map(({ label, value }) => (
                            <div key={label}>
                                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-dark)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>{label}</div>
                                <div style={{ fontSize: 15, color: "var(--color-grey)", fontWeight: 300, lineHeight: 1.6, whiteSpace: "pre-line" }}>{value}</div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
