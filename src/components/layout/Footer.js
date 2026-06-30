import Btn from "@/components/ui/Btn";

export default function Footer() {
    return (
        <footer className="footer-padding" style={{ background: "var(--color-ivory-2)", borderTop: "1px solid var(--color-rule-lt)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40, marginBottom: 80 }}>
                    <div>
                        <div className="serif-heading" style={{ fontSize: 24, color: "var(--color-dark)", fontWeight: 600, marginBottom: 16 }}>Industrialise Africa</div>
                        <p style={{ fontSize: 14, color: "var(--color-grey)", lineHeight: 1.8, maxWidth: 300, fontWeight: 300 }}>The premier leadership community for Africa's industrialisation, founded by Prof. Banji Oyelaran-Oyeyinka.</p>
                    </div>
                    <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
                        <div>
                            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-dark)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>Explore</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                <a href="#about" style={{ fontSize: 14, color: "var(--color-grey)", fontWeight: 300 }}>The Founder</a>
                                <a href="#podcast" style={{ fontSize: 14, color: "var(--color-grey)", fontWeight: 300 }}>Masterclasses</a>
                                <a href="#membership" style={{ fontSize: 14, color: "var(--color-grey)", fontWeight: 300 }}>Membership Tiers</a>
                            </div>
                        </div>
                        <div>
                            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-dark)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>Contact</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                <a href="mailto:industrialiseafrica@gmail.com" style={{ fontSize: 14, color: "var(--color-grey)", fontWeight: 300 }}>Partnerships</a>
                                <a href="mailto:industrialiseafrica@gmail.com" style={{ fontSize: 14, color: "var(--color-grey)", fontWeight: 300 }}>Press & Media</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style={{ borderTop: "1px solid var(--color-rule-lt)", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
                    <div style={{ fontSize: 13, color: "var(--color-grey)", fontWeight: 300 }}>© {new Date().getFullYear()} Industrialise Africa. All rights reserved.</div>
                    <div style={{ display: "flex", gap: 24 }}>
                        <a href="https://www.youtube.com/@OyebanjiOyelaran" target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "var(--color-grey)", fontWeight: 300 }}>YouTube</a>
                        <a href="#" style={{ fontSize: 13, color: "var(--color-grey)", fontWeight: 300 }}>LinkedIn</a>
                        <a href="#" style={{ fontSize: 13, color: "var(--color-grey)", fontWeight: 300 }}>Twitter</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
