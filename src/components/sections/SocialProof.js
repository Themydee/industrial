import { F, T } from "@/lib/constants";

export default function SocialProof() {
    return (
        <div style={{ background: T.ivory, borderBottom: `1px solid ${T.ruleLt}`, padding: "18px 48px" }}>
            <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
                <span style={{ fontFamily: F.mono, fontSize: 9, color: T.grey, letterSpacing: "0.12em", textTransform: "uppercase", flexShrink: 0 }}>Endorsed & recognised by</span>
                <div style={{ width: 1, height: 14, background: T.ruleLt }} />
                {["AfDB", "UN-HABITAT", "AfCFTA Advisory Council", "FTID", "Former President Obasanjo"].map(l => (
                    <div key={l} style={{ fontFamily: F.mono, fontSize: 10, color: T.grey, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700, opacity: 0.6 }}>{l}</div>
                ))}
            </div>
        </div>
    );
}
