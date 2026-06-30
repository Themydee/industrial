import { T } from "@/lib/constants";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";

export default function Hero({ onApply }) {
  return (
    <section id="home" style={{ 
      minHeight: "80vh", 
      background: T.white, 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      padding: "120px 48px 80px", 
      position: "relative", 
      borderBottom: `1px solid ${T.ruleLt}`
    }}>
      <div className="container" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        maxWidth: 800
      }}>
        <Tag color={T.primary}>Industrialise Africa Community</Tag>
        
        <h1 style={{ 
          fontSize: "clamp(40px, 5vw, 64px)", 
          fontWeight: 700, 
          lineHeight: 1.1, 
          color: T.dark, 
          margin: "24px 0", 
          letterSpacing: "-0.02em" 
        }}>
          Africa has the answers.<br />
          <span style={{ color: T.primary }}>Let's build them together.</span>
        </h1>
        
        <p style={{ 
          fontSize: 18, 
          color: T.mid, 
          lineHeight: 1.6, 
          marginBottom: 40, 
          fontWeight: 400 
        }}>
          The premier community for Africa's industrialisation — led by Prof. Banji Oyelaran-Oyeyinka (Triple O), the continent's foremost authority on industrial policy, agro-processing and transgenerational wealth creation.
        </p>
        
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <Button variant="primary" href="/sign-up">Apply to Join</Button>
          <Button variant="outline" href="#podcast">Watch Episode One</Button>
        </div>
        
        <div style={{ 
          display: "flex", 
          gap: 40, 
          marginTop: 64, 
          paddingTop: 40, 
          borderTop: `1px solid ${T.ruleLt}`,
          flexWrap: "wrap",
          justifyContent: "center"
        }}>
          {[
            ["40+", "Years Expertise"], 
            ["20", "Years at UN"], 
            ["20+", "Books Published"], 
            ["50", "Vanguard Places"]
          ].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: T.dark, lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 12, color: T.grey, marginTop: 8, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
