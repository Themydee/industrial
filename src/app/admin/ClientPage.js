"use client";
import { useState } from "react";

export default function AdminClientPage({ initialData, metrics = { totalMembers: 0, activeMembers: 0, pendingVanguard: 0, revenue: 0 } }) {
    const [data, setData] = useState(initialData);
    const [filter, setFilter] = useState("All");
    const [viewApp, setViewApp] = useState(null);
    const [loadingAction, setLoadingAction] = useState(false);
    const [confirmApp, setConfirmApp] = useState(null);
    const [customAlert, setCustomAlert] = useState(null);
    const [paymentLink, setPaymentLink] = useState("");

    const logout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/admin/login";
    };

    const approveApplication = (app) => {
        setPaymentLink("");
        setConfirmApp(app);
    };

    const handleApproveConfirm = async (app) => {
        setConfirmApp(null);
        setLoadingAction(true);
        try {
            const res = await fetch("/api/admin/approve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ applicationId: app.id, email: app.email, paymentLink })
            });
            if (!res.ok) throw new Error("Approval failed");
            // Update local state to reflect changes instantly without refresh
            setData(data.map(d => d.id === app.id ? { ...d, status: "Approved" } : d));
            if (viewApp && viewApp.id === app.id) setViewApp(null);
            setCustomAlert({ message: `Successfully approved ${app.name}! An onboarding email has been sent.`, isSuccess: true });
        } catch (e) {
            setCustomAlert({ message: `Failed to approve ${app.name}. Please try again.`, isSuccess: false });
        } finally {
            setLoadingAction(false);
        }
    };

    return (
        <div style={{ padding: "40px 48px", flex: 1 }}>
            <div style={{ maxWidth: 1400, margin: "0 auto" }}>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30, borderBottom: "1px solid var(--color-rule)", paddingBottom: 20 }}>
                    <div className="serif-heading" style={{ fontSize: 32, color: "var(--color-dark)" }}>Application Dashboard</div>
                    <button onClick={logout} style={{ fontSize: 13, color: "var(--color-red)", fontWeight: 500, cursor: "pointer", background: "none", border: "none" }}>Sign Out</button>
                </div>

                {/* Metrics Row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 40 }}>
                    <div style={{ background: "var(--color-white)", border: "1px solid var(--color-rule-lt)", padding: 24, boxShadow: "var(--shadow-sm)" }}>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-grey)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Total Members</div>
                        <div style={{ fontSize: 32, fontWeight: 700, color: "var(--color-dark)" }}>{metrics.totalMembers}</div>
                    </div>
                    <div style={{ background: "var(--color-white)", border: "1px solid var(--color-rule-lt)", padding: 24, boxShadow: "var(--shadow-sm)" }}>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-grey)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Active Subscriptions</div>
                        <div style={{ fontSize: 32, fontWeight: 700, color: "var(--color-gold)" }}>{metrics.activeMembers}</div>
                    </div>
                    <div style={{ background: "var(--color-white)", border: "1px solid var(--color-rule-lt)", padding: 24, boxShadow: "var(--shadow-sm)", borderLeft: metrics.pendingVanguard > 0 ? "4px solid var(--color-red)" : "1px solid var(--color-rule-lt)" }}>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-grey)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Pending Vanguard</div>
                        <div style={{ fontSize: 32, fontWeight: 700, color: metrics.pendingVanguard > 0 ? "var(--color-red)" : "var(--color-dark)" }}>{metrics.pendingVanguard}</div>
                    </div>
                    <div style={{ background: "var(--color-white)", border: "1px solid var(--color-rule-lt)", padding: 24, boxShadow: "var(--shadow-sm)" }}>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-grey)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Total Revenue (USD)</div>
                        <div style={{ fontSize: 32, fontWeight: 700, color: "green" }}>${metrics.revenue.toLocaleString()}</div>
                    </div>
                </div>

                {/* Filters */}
                <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                    {["All", "Pending", "Vanguard"].map(f => (
                        <button key={f} onClick={() => setFilter(f)} style={{ padding: "6px 14px", fontSize: 12, borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 500, background: filter === f ? "var(--color-dark)" : "var(--color-rule-lt)", color: filter === f ? "var(--color-white)" : "var(--color-dark)" }}>
                            {f}
                        </button>
                    ))}
                </div>

                {data.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "80px 0", color: "var(--color-grey)", background: "var(--color-white)", border: "1px solid var(--color-rule-lt)" }}>
                        <div style={{ fontSize: 40, marginBottom: 16 }}>📭</div>
                        <p>No applications received yet.</p>
                    </div>
                ) : (
                    <div style={{ overflowX: "auto", background: "var(--color-white)", border: "1px solid var(--color-rule-lt)", boxShadow: "var(--shadow-sm)" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
                            <thead>
                                <tr style={{ background: "var(--color-ivory-2)", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-dark)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                                    <th style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-rule)" }}>Date</th>
                                    <th style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-rule)" }}>Name</th>
                                    <th style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-rule)" }}>Email / Phone</th>
                                    <th style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-rule)" }}>Type / Tier</th>
                                    <th style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-rule)" }}>Role / Country</th>
                                    <th style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-rule)" }}>Status</th>
                                    <th style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-rule)" }}>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.filter(app => {
                                    if (filter === "Pending") return app.status === "Pending";
                                    if (filter === "Vanguard") return app.tier?.toLowerCase().includes("vanguard");
                                    return true;
                                }).map(app => (
                                    <tr key={app.id} style={{ borderBottom: "1px solid var(--color-rule-lt)" }}>
                                        <td style={{ padding: "16px 20px", color: "var(--color-grey)" }}>{new Date(app.createdAt).toLocaleDateString()}</td>
                                        <td style={{ padding: "16px 20px", fontWeight: 600, color: "var(--color-dark)" }}>{app.name}</td>
                                        <td style={{ padding: "16px 20px" }}>
                                            <div style={{ color: "var(--color-dark)" }}>{app.email}</div>
                                            <div style={{ color: "var(--color-grey)", fontSize: 12 }}>{app.phone}</div>
                                        </td>
                                        <td style={{ padding: "16px 20px" }}>
                                            <span style={{ display: "inline-block", background: "var(--color-ivory-2)", padding: "4px 8px", borderRadius: 2, fontFamily: "var(--font-mono)", fontSize: 9, textTransform: "uppercase" }}>{app.type}</span>
                                            <div style={{ marginTop: 4, color: (app.tier?.toLowerCase() === "vanguard") ? "var(--color-red)" : "var(--color-dark)", fontWeight: 600 }}>{app.tier || app.billingPref || "-"}</div>
                                        </td>
                                        <td style={{ padding: "16px 20px", color: "var(--color-grey)" }}>{app.role || "-"} <br/> {app.country || "-"}</td>
                                        <td style={{ padding: "16px 20px" }}>
                                            <span style={{ color: app.status === "Pending" ? "var(--color-gold-2)" : app.status === "Approved" ? "green" : "var(--color-red)" }}>
                                                ● {app.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: "16px 20px", display: "flex", gap: 12, alignItems: "center" }}>
                                            <button style={{ color: "var(--color-gold)", background: "none", border: "none", fontWeight: 600, textDecoration: "underline", cursor: "pointer" }} onClick={() => setViewApp(app)}>View</button>
                                            {app.status === "Pending" && (
                                                <button onClick={() => approveApplication(app)} disabled={loadingAction} style={{ background: "var(--color-red)", color: "white", border: "none", padding: "4px 10px", fontSize: 11, borderRadius: 2, cursor: loadingAction ? "not-allowed" : "pointer", opacity: loadingAction ? 0.6 : 1 }}>
                                                    {loadingAction ? "..." : "Approve"}
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Application Details Modal */}
            {viewApp && (
                <div onClick={e => { if (e.target === e.currentTarget) setViewApp(null) }} style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
                    <div style={{ background: "var(--color-white)", maxWidth: 640, width: "100%", maxHeight: "90vh", overflowY: "auto", borderTop: "4px solid var(--color-gold)", animation: "modalIn 0.2s ease" }}>
                        <div style={{ background: "var(--color-dark)", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
                            <div>
                                <div style={{ color: "var(--color-gold)", fontSize: 11, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Application Details</div>
                                <div style={{ color: "var(--color-white)", fontSize: 20, fontWeight: 600, fontFamily: "var(--font-display)" }}>{viewApp.name}</div>
                            </div>
                            <button onClick={() => setViewApp(null)} style={{ background: "none", border: "none", color: "var(--color-grey)", fontSize: 20, cursor: "pointer" }}>✕</button>
                        </div>
                        
                        <div style={{ padding: "24px", fontSize: 14, color: "var(--color-dark)", lineHeight: 1.6 }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 24px" }}>
                                
                                <div style={{ gridColumn: "1 / -1", fontSize: 13, color: "var(--color-grey)", borderBottom: "1px solid var(--color-rule-lt)", paddingBottom: 8, marginBottom: 8, fontWeight: 600 }}>1. Basic & Contact Information</div>
                                <div><div style={{ fontSize: 11, color: "var(--color-grey)", textTransform: "uppercase", marginBottom: 4 }}>Full Name</div><div style={{ fontWeight: 500 }}>{viewApp.name || "N/A"}</div></div>
                                <div><div style={{ fontSize: 11, color: "var(--color-grey)", textTransform: "uppercase", marginBottom: 4 }}>Email Address</div><div style={{ fontWeight: 500 }}>{viewApp.email || "N/A"}</div></div>
                                <div><div style={{ fontSize: 11, color: "var(--color-grey)", textTransform: "uppercase", marginBottom: 4 }}>Phone / WhatsApp</div><div style={{ fontWeight: 500 }}>{viewApp.phone || "N/A"}</div></div>
                                <div><div style={{ fontSize: 11, color: "var(--color-grey)", textTransform: "uppercase", marginBottom: 4 }}>Location</div><div style={{ fontWeight: 500 }}>{viewApp.country || "N/A"}{viewApp.state ? ` - ${viewApp.state}` : ''}</div></div>
                                <div><div style={{ fontSize: 11, color: "var(--color-grey)", textTransform: "uppercase", marginBottom: 4 }}>Age Range</div><div style={{ fontWeight: 500 }}>{viewApp.age || "N/A"}</div></div>
                                
                                <div style={{ gridColumn: "1 / -1", fontSize: 13, color: "var(--color-grey)", borderBottom: "1px solid var(--color-rule-lt)", paddingBottom: 8, marginBottom: 8, marginTop: 16, fontWeight: 600 }}>2. Professional Details</div>
                                <div><div style={{ fontSize: 11, color: "var(--color-grey)", textTransform: "uppercase", marginBottom: 4 }}>Primary Role</div><div style={{ fontWeight: 500 }}>{viewApp.role || "N/A"}</div></div>
                                <div><div style={{ fontSize: 11, color: "var(--color-grey)", textTransform: "uppercase", marginBottom: 4 }}>Sector</div><div style={{ fontWeight: 500 }}>{viewApp.sector || "N/A"}</div></div>
                                <div style={{ gridColumn: "1 / -1" }}><div style={{ fontSize: 11, color: "var(--color-grey)", textTransform: "uppercase", marginBottom: 4 }}>Current Stage</div><div style={{ fontWeight: 500 }}>{viewApp.stage || "N/A"}</div></div>
                                <div style={{ gridColumn: "1 / -1" }}><div style={{ fontSize: 11, color: "var(--color-grey)", textTransform: "uppercase", marginBottom: 4 }}>Company Staff Size</div><div style={{ fontWeight: 500 }}>{viewApp.network || "N/A"}</div></div>
                                
                                <div style={{ gridColumn: "1 / -1", fontSize: 13, color: "var(--color-grey)", borderBottom: "1px solid var(--color-rule-lt)", paddingBottom: 8, marginBottom: 8, marginTop: 16, fontWeight: 600 }}>3. Questionnaire & Intent</div>
                                <div style={{ gridColumn: "1 / -1" }}>
                                    <div style={{ fontSize: 11, color: "var(--color-grey)", textTransform: "uppercase", marginBottom: 6 }}>Why does industrialisation matter to you?</div>
                                    <div style={{ background: "var(--color-ivory)", padding: 12, border: "1px solid var(--color-rule-lt)", borderRadius: 4 }}>{viewApp.why || "N/A"}</div>
                                </div>
                                <div style={{ gridColumn: "1 / -1" }}>
                                    <div style={{ fontSize: 11, color: "var(--color-grey)", textTransform: "uppercase", marginBottom: 6 }}>Biggest challenge faced in sector</div>
                                    <div style={{ background: "var(--color-ivory)", padding: 12, border: "1px solid var(--color-rule-lt)", borderRadius: 4 }}>{viewApp.challenge || "N/A"}</div>
                                </div>
                                <div style={{ gridColumn: "1 / -1" }}>
                                    <div style={{ fontSize: 11, color: "var(--color-grey)", textTransform: "uppercase", marginBottom: 6 }}>Topic most eager to explore</div>
                                    <div style={{ background: "var(--color-ivory)", padding: 12, border: "1px solid var(--color-rule-lt)", borderRadius: 4 }}>{viewApp.topic || "N/A"}</div>
                                </div>
                                <div style={{ gridColumn: "1 / -1" }}>
                                    <div style={{ fontSize: 11, color: "var(--color-grey)", textTransform: "uppercase", marginBottom: 6 }}>Anything else you want us to know?</div>
                                    <div style={{ background: "var(--color-ivory)", padding: 12, border: "1px solid var(--color-rule-lt)", borderRadius: 4 }}>{viewApp.extra || "N/A"}</div>
                                </div>

                                <div style={{ gridColumn: "1 / -1", fontSize: 13, color: "var(--color-grey)", borderBottom: "1px solid var(--color-rule-lt)", paddingBottom: 8, marginBottom: 8, marginTop: 16, fontWeight: 600 }}>4. Membership & Marketing</div>
                                <div><div style={{ fontSize: 11, color: "var(--color-grey)", textTransform: "uppercase", marginBottom: 4 }}>Application Type</div><div style={{ fontWeight: 500 }}>{viewApp.type || "N/A"}</div></div>
                                <div><div style={{ fontSize: 11, color: "var(--color-grey)", textTransform: "uppercase", marginBottom: 4 }}>Selected Tier</div><span style={{ display: "inline-block", padding: "4px 8px", background: "var(--color-dark)", color: "var(--color-gold)", fontSize: 11, fontFamily: "var(--font-mono)", borderRadius: 4 }}>{viewApp.tier || "N/A"}</span></div>
                                <div><div style={{ fontSize: 11, color: "var(--color-grey)", textTransform: "uppercase", marginBottom: 4 }}>Billing Preference</div><div style={{ fontWeight: 500 }}>{viewApp.billingPref || "N/A"}</div></div>
                                <div><div style={{ fontSize: 11, color: "var(--color-grey)", textTransform: "uppercase", marginBottom: 4 }}>Feature Preference</div><div style={{ fontWeight: 500 }}>{viewApp.feature || "N/A"}</div></div>
                                <div><div style={{ fontSize: 11, color: "var(--color-grey)", textTransform: "uppercase", marginBottom: 4 }}>Potential Sponsor Ref</div><div style={{ fontWeight: 500 }}>{viewApp.sponsorRef || "N/A"}</div></div>
                                <div><div style={{ fontSize: 11, color: "var(--color-grey)", textTransform: "uppercase", marginBottom: 4 }}>Acquisition Source</div><div style={{ fontWeight: 500 }}>{viewApp.source || "N/A"}</div></div>

                            </div>
                        </div>

                        <div style={{ padding: "16px 24px", background: "var(--color-ivory-2)", borderTop: "1px solid var(--color-rule)", display: "flex", justifyContent: "flex-end", gap: 12 }}>
                            {viewApp.status === "Pending" && (
                                <button onClick={() => approveApplication(viewApp)} disabled={loadingAction} style={{ background: "var(--color-red)", color: "white", border: "none", padding: "8px 16px", fontSize: 13, fontWeight: 500, borderRadius: 2, cursor: loadingAction ? "not-allowed" : "pointer", opacity: loadingAction ? 0.6 : 1 }}>
                                    {loadingAction ? "Approving..." : "Approve Application"}
                                </button>
                            )}
                            <button onClick={() => setViewApp(null)} style={{ background: "var(--color-dark)", color: "var(--color-white)", border: "none", padding: "8px 16px", fontSize: 13, fontWeight: 500, borderRadius: 2, cursor: "pointer" }}>Close</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Custom Confirm Modal */}
            {confirmApp && (
                <div onClick={e => { if (e.target === e.currentTarget) setConfirmApp(null) }} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
                    <div style={{ background: "var(--color-white)", maxWidth: 400, width: "100%", borderTop: "4px solid var(--color-red)", padding: 28, animation: "modalIn 0.2s ease" }}>
                        <h3 className="serif-heading" style={{ fontSize: 24, color: "var(--color-dark)", marginBottom: 12 }}>Confirm Approval</h3>
                        <p style={{ fontSize: 14, color: "var(--color-grey)", lineHeight: 1.6, marginBottom: 24 }}>
                            Are you sure you want to approve <strong>{confirmApp.name}</strong>? This will activate their account or set it to 'Pending Payment' and send an email notification.
                        </p>
                        <div style={{ marginBottom: 24 }}>
                            <label style={{ display: "block", fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--color-dark)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Stripe / Paystack Payment Link</label>
                            <input 
                                type="url" 
                                placeholder="https://buy.stripe.com/... or https://paystack.com/pay/..."
                                value={paymentLink}
                                onChange={e => setPaymentLink(e.target.value)}
                                style={{ width: "100%", padding: "10px 12px", border: "1px solid var(--color-rule-lt)", fontSize: 13, outline: "none", boxSizing: "border-box" }}
                            />
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                            <button onClick={() => setConfirmApp(null)} style={{ padding: "8px 16px", background: "none", border: "1px solid var(--color-rule-lt)", cursor: "pointer", fontSize: 13, fontWeight: 500 }}>
                                Cancel
                            </button>
                            <button onClick={() => handleApproveConfirm(confirmApp)} style={{ padding: "8px 16px", background: "var(--color-red)", color: "white", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500 }}>
                                Approve Application
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Alert Modal */}
            {customAlert && (
                <div onClick={e => { if (e.target === e.currentTarget) setCustomAlert(null) }} style={{ position: "fixed", inset: 0, zIndex: 1001, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
                    <div style={{ background: "var(--color-white)", maxWidth: 400, width: "100%", borderTop: `4px solid ${customAlert.isSuccess ? "green" : "var(--color-red)"}`, padding: 28, textAlign: "center", animation: "modalIn 0.2s ease" }}>
                        <div style={{ fontSize: 40, marginBottom: 12 }}>{customAlert.isSuccess ? "✅" : "❌"}</div>
                        <h3 className="serif-heading" style={{ fontSize: 24, color: "var(--color-dark)", marginBottom: 12 }}>
                            {customAlert.isSuccess ? "Success" : "Error"}
                        </h3>
                        <p style={{ fontSize: 14, color: "var(--color-grey)", lineHeight: 1.6, marginBottom: 24 }}>
                            {customAlert.message}
                        </p>
                        <button onClick={() => setCustomAlert(null)} style={{ padding: "8px 24px", background: "var(--color-dark)", color: "white", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500 }}>
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
