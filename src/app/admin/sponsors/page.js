import { db } from "@/db";
import { sponsorEnquiries } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function AdminSponsorsPage() {
    let data = [];
    try {
        data = await db.select().from(sponsorEnquiries).orderBy(desc(sponsorEnquiries.createdAt));
    } catch (e) {
        console.error("Failed to fetch sponsor enquiries", e);
    }

    return (
        <div style={{ padding: "40px 48px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40, borderBottom: "1px solid var(--color-rule)", paddingBottom: 20 }}>
                <div className="serif-heading" style={{ fontSize: 32, color: "var(--color-dark)" }}>Sponsor Enquiries</div>
            </div>

            <div style={{ background: "var(--color-white)", border: "1px solid var(--color-rule-lt)", boxShadow: "var(--shadow-sm)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, textAlign: "left" }}>
                    <thead>
                        <tr style={{ background: "var(--color-ivory-2)", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-dark)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                            <th style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-rule)" }}>Date</th>
                            <th style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-rule)" }}>Company & Contact</th>
                            <th style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-rule)" }}>Budget Level</th>
                            <th style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-rule)" }}>Message</th>
                            <th style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-rule)" }}>Status</th>
                            <th style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-rule)" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr><td colSpan="6" style={{ padding: "32px", textAlign: "center", color: "var(--color-grey)" }}>No sponsor enquiries yet.</td></tr>
                        ) : data.map(item => (
                            <tr key={item.id} style={{ borderBottom: "1px solid var(--color-rule-lt)", verticalAlign: "top" }}>
                                <td style={{ padding: "16px 20px", color: "var(--color-grey)", whiteSpace: "nowrap" }}>{new Date(item.createdAt).toLocaleDateString()}</td>
                                <td style={{ padding: "16px 20px" }}>
                                    <div style={{ fontWeight: 600, color: "var(--color-dark)", marginBottom: 4 }}>{item.company}</div>
                                    <div style={{ color: "var(--color-grey)", fontSize: 12 }}>{item.name} <br/> {item.email}</div>
                                </td>
                                <td style={{ padding: "16px 20px" }}><span style={{ padding: "4px 8px", background: "var(--color-gold-lt)", color: "var(--color-gold)", fontSize: 11, fontFamily: "var(--font-mono)", borderRadius: 4 }}>{item.budget}</span></td>
                                <td style={{ padding: "16px 20px", color: "var(--color-grey)", maxWidth: 300 }}>{item.message}</td>
                                <td style={{ padding: "16px 20px" }}>
                                    <span style={{ color: item.status === "New" ? "var(--color-red)" : "var(--color-grey)", fontWeight: 500 }}>
                                        {item.status === "New" && "● "} {item.status}
                                    </span>
                                </td>
                                <td style={{ padding: "16px 20px" }}>
                                    <button style={{ color: "var(--color-gold)", background: "none", border: "none", cursor: "pointer", fontSize: 13, textDecoration: "underline" }}>Reply</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
