"use client";
import { useState } from "react";

export default function AdminClientPage({ initialData }) {
    const [data, setData] = useState(initialData);

    const logout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/admin/login";
    };

    return (
        <div style={{ padding: "40px 48px", flex: 1 }}>
            <div style={{ maxWidth: 1400, margin: "0 auto" }}>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40, borderBottom: "1px solid var(--color-rule)", paddingBottom: 20 }}>
                    <div className="serif-heading" style={{ fontSize: 32, color: "var(--color-dark)" }}>Application Dashboard</div>
                    <button onClick={logout} style={{ fontSize: 13, color: "var(--color-red)", fontWeight: 500 }}>Sign Out</button>
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
                                {data.map(app => (
                                    <tr key={app.id} style={{ borderBottom: "1px solid var(--color-rule-lt)" }}>
                                        <td style={{ padding: "16px 20px", color: "var(--color-grey)" }}>{new Date(app.createdAt).toLocaleDateString()}</td>
                                        <td style={{ padding: "16px 20px", fontWeight: 600, color: "var(--color-dark)" }}>{app.name}</td>
                                        <td style={{ padding: "16px 20px" }}>
                                            <div style={{ color: "var(--color-dark)" }}>{app.email}</div>
                                            <div style={{ color: "var(--color-grey)", fontSize: 12 }}>{app.phone}</div>
                                        </td>
                                        <td style={{ padding: "16px 20px" }}>
                                            <span style={{ display: "inline-block", background: "var(--color-ivory-2)", padding: "4px 8px", borderRadius: 2, fontFamily: "var(--font-mono)", fontSize: 9, textTransform: "uppercase" }}>{app.type}</span>
                                            <div style={{ marginTop: 4, color: "var(--color-dark)", fontWeight: 500 }}>{app.tier || app.billingPref || "-"}</div>
                                        </td>
                                        <td style={{ padding: "16px 20px", color: "var(--color-grey)" }}>{app.role || "-"} <br/> {app.country || "-"}</td>
                                        <td style={{ padding: "16px 20px" }}>
                                            <span style={{ color: app.status === "Pending" ? "var(--color-gold-2)" : app.status === "Approved" ? "green" : "var(--color-red)" }}>
                                                ● {app.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: "16px 20px" }}>
                                            <button style={{ color: "var(--color-gold)", fontWeight: 600, textDecoration: "underline" }} onClick={() => alert(JSON.stringify(app, null, 2))}>View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
