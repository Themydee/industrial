"use client";
import Btn from "@/components/ui/Btn";

export default function ClientDashboard({ member }) {
    const logout = async () => {
        await fetch("/api/auth/member/logout", { method: "POST" });
        window.location.href = "/login";
    };

    const isPremium = member.tier === "Builder" || member.tier === "Catalyst" || member.tier === "Vanguard";

    return (
        <div style={{ padding: "64px 48px", flex: 1 }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48, borderBottom: "1px solid var(--color-rule)", paddingBottom: 24 }}>
                    <div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-grey)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Member Portal</div>
                        <h1 className="serif-heading" style={{ fontSize: 40, color: "var(--color-dark)", lineHeight: 1.1 }}>Welcome, {member.name.split(' ')[0]}</h1>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-gold)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 12px", background: "var(--color-ivory)", border: "1px solid var(--color-gold)", borderRadius: 20, display: "inline-block", marginBottom: 12 }}>
                            {member.tier} Tier
                        </div>
                        <div>
                            <button onClick={logout} style={{ fontSize: 13, color: "var(--color-red)", fontWeight: 500 }}>Sign Out</button>
                        </div>
                    </div>
                </div>

                {member.subscriptionStatus === "Pending Payment" ? (
                    <div style={{ background: "var(--color-white)", padding: 48, border: "1px solid var(--color-red)", boxShadow: "var(--shadow-md)", textAlign: "center", maxWidth: 600, margin: "40px auto 0" }}>
                        <div style={{ fontSize: 44, marginBottom: 16 }}>💳</div>
                        <h2 className="serif-heading" style={{ fontSize: 32, color: "var(--color-dark)", marginBottom: 12 }}>Activate Your Membership</h2>
                        <p style={{ fontSize: 14, color: "var(--color-grey)", lineHeight: 1.65, marginBottom: 28 }}>
                            Your application for the <strong>{member.tier}</strong> membership has been approved! <br />Please complete your payment below to unlock full access to the member portal, masterclasses, and community groups.
                        </p>
                        <Btn 
                            variant="primary" 
                            href={member.paymentLink || "#"} 
                            style={{ padding: "16px 40px", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em" }}
                        >
                            Complete Payment →
                        </Btn>
                        <p style={{ fontSize: 11, color: "var(--color-grey)", marginTop: 20 }}>
                            Once your payment is verified, your portal access will be unlocked instantly.
                        </p>
                    </div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
                        
                        <div style={{ background: "var(--color-white)", padding: 32, border: "1px solid var(--color-rule-lt)", boxShadow: "var(--shadow-sm)" }}>
                            <h3 className="serif-heading" style={{ fontSize: 24, color: "var(--color-dark)", marginBottom: 16 }}>Masterclass Videos</h3>
                            <p style={{ fontSize: 14, color: "var(--color-grey)", lineHeight: 1.6, marginBottom: 24 }}>Access the entire archive of high-definition industrialisation masterclasses.</p>
                            <Btn variant="primary" href="/#podcast" style={{ width: "100%", justifyContent: "center" }}>Watch Episodes</Btn>
                        </div>

                        <div style={{ background: "var(--color-white)", padding: 32, border: "1px solid var(--color-rule-lt)", boxShadow: "var(--shadow-sm)" }}>
                            <h3 className="serif-heading" style={{ fontSize: 24, color: "var(--color-dark)", marginBottom: 16 }}>Community Network</h3>
                            <p style={{ fontSize: 14, color: "var(--color-grey)", lineHeight: 1.6, marginBottom: 24 }}>Connect with other leaders, policymakers and industrialists on WhatsApp.</p>
                            <Btn variant="outline" style={{ width: "100%", justifyContent: "center" }}>Join WhatsApp Group</Btn>
                        </div>

                        {isPremium && (
                            <div style={{ background: "var(--color-white)", padding: 32, border: "1px solid var(--color-gold)", boxShadow: "var(--shadow-md)" }}>
                                <h3 className="serif-heading" style={{ fontSize: 24, color: "var(--color-dark)", marginBottom: 16 }}>The Deal Board</h3>
                                <p style={{ fontSize: 14, color: "var(--color-grey)", lineHeight: 1.6, marginBottom: 24 }}>Exclusive access to active partnerships, investments and opportunities.</p>
                                <Btn variant="primary" style={{ width: "100%", justifyContent: "center" }}>View Deal Board</Btn>
                            </div>
                        )}

                    </div>
                )}

            </div>
        </div>
    );
}
