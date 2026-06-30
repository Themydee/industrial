import { F, T } from "@/lib/constants";

export default function Ticker() {
    const items = ["Industrialise Africa", "Transgenerational Wealth", "Agro-Industrial Development", "AfCFTA Opportunities", "Development Finance", "African Industrial Policy", "Livestock Value Chain", "Build · Grow · Lead"];
    return (
        <div style={{ background: T.red, padding: "11px 0", overflow: "hidden" }}>
            <div style={{ display: "flex", width: "max-content", animation: "tick 45s linear infinite" }}>
                {[...items, ...items].map((t, i) => (
                    <div key={i} style={{ whiteSpace: "nowrap", padding: "0 30px", fontFamily: F.mono, fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.85)", letterSpacing: "0.14em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 12 }}>
                        {t}<span style={{ opacity: 0.3, fontSize: 5 }}>◆</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
