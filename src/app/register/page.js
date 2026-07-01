"use client";
import { useState } from "react";
import Btn from "@/components/ui/Btn";

export default function RegisterPage() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", tier: "Foundation" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/member/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (res.ok && data.success) {
                window.location.href = data.redirect;
            } else {
                setError(data.error || "Registration failed");
            }
        } catch (err) {
            setError("Network error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-ivory-2)", padding: 24 }}>
            <div style={{ width: "100%", maxWidth: 450, background: "var(--color-white)", padding: 48, border: "1px solid var(--color-rule-lt)", boxShadow: "var(--shadow-md)" }}>
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <div className="serif-heading" style={{ fontSize: 32, color: "var(--color-dark)", marginBottom: 8 }}>Create Account</div>
                    <div style={{ color: "var(--color-grey)", fontSize: 14 }}>Join the Industrialise Africa community</div>
                </div>

                {error && <div style={{ color: "var(--color-red)", background: "rgba(220,38,38,0.1)", padding: 12, fontSize: 13, marginBottom: 24, borderRadius: 4 }}>{error}</div>}

                <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div>
                        <label style={{ display: "block", fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--color-dark)", marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>Full Name</label>
                        <input 
                            type="text" 
                            required 
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-rule)", background: "var(--color-ivory-2)", fontSize: 16 }}
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--color-dark)", marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>Email Address</label>
                        <input 
                            type="email" 
                            required 
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-rule)", background: "var(--color-ivory-2)", fontSize: 16 }}
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--color-dark)", marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>Password</label>
                        <input 
                            type="password" 
                            required 
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                            style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-rule)", background: "var(--color-ivory-2)", fontSize: 16 }}
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--color-dark)", marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>Select Tier</label>
                        <select 
                            value={formData.tier}
                            onChange={e => setFormData({...formData, tier: e.target.value})}
                            style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-rule)", background: "var(--color-ivory-2)", fontSize: 16, cursor: "pointer", appearance: "none" }}
                        >
                            <option value="Foundation">Foundation</option>
                            <option value="Builder">Builder</option>
                            <option value="Catalyst">Catalyst</option>
                            <option value="Vanguard">Vanguard</option>
                        </select>
                        <div style={{ fontSize: 11, color: "var(--color-grey)", marginTop: 8 }}>Note: Paid tiers will require payment verification later.</div>
                    </div>
                    <button 
                        type="submit"
                        disabled={loading}
                        style={{ background: "var(--color-dark)", color: "var(--color-white)", padding: "16px", fontSize: 13, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 8, opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                </form>

                <div style={{ marginTop: 24, textAlign: "center", fontSize: 13, color: "var(--color-grey)" }}>
                    Already have an account? <a href="/login" style={{ color: "var(--color-gold)", textDecoration: "underline" }}>Sign In</a>
                </div>
            </div>
        </div>
    );
}
