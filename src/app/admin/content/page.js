import { db } from "@/db";
import { content } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
    const data = await db.select().from(content).orderBy(desc(content.createdAt));

    return (
        <div style={{ padding: "40px 48px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40, borderBottom: "1px solid var(--color-rule)", paddingBottom: 20 }}>
                <div className="serif-heading" style={{ fontSize: 32, color: "var(--color-dark)" }}>Content Management</div>
                <button style={{ background: "var(--color-dark)", color: "var(--color-white)", padding: "10px 16px", border: "none", fontSize: 13, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer" }}>+ New Content</button>
            </div>

            <div style={{ background: "var(--color-white)", border: "1px solid var(--color-rule-lt)", boxShadow: "var(--shadow-sm)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, textAlign: "left" }}>
                    <thead>
                        <tr style={{ background: "var(--color-ivory-2)", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-dark)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                            <th style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-rule)" }}>Title</th>
                            <th style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-rule)" }}>Type</th>
                            <th style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-rule)" }}>Tier Access</th>
                            <th style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-rule)" }}>Published</th>
                            <th style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-rule)" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr><td colSpan="5" style={{ padding: "32px", textAlign: "center", color: "var(--color-grey)" }}>No content published yet.</td></tr>
                        ) : data.map(item => (
                            <tr key={item.id} style={{ borderBottom: "1px solid var(--color-rule-lt)" }}>
                                <td style={{ padding: "16px 20px", fontWeight: 600, color: "var(--color-dark)" }}>{item.title}</td>
                                <td style={{ padding: "16px 20px", color: "var(--color-grey)" }}>{item.type}</td>
                                <td style={{ padding: "16px 20px" }}><span style={{ padding: "4px 8px", background: "var(--color-gold-lt)", color: "var(--color-gold)", fontSize: 11, fontFamily: "var(--font-mono)", borderRadius: 4 }}>{item.minTierRequired}</span></td>
                                <td style={{ padding: "16px 20px", color: "var(--color-grey)" }}>{new Date(item.publishedAt).toLocaleDateString()}</td>
                                <td style={{ padding: "16px 20px" }}>
                                    <button style={{ color: "var(--color-red)", background: "none", border: "none", cursor: "pointer", fontSize: 13, textDecoration: "underline" }}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
