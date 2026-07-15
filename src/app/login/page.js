"use client";
import { useState } from "react";
import Btn from "@/components/ui/Btn";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/member/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (res.ok && data.success) {
                window.location.href = data.redirect;
            } else {
                setError(data.error || "Login failed");
            }
        } catch (err) {
            setError("Network error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-ivory-2)", padding: 24 }}>
            <div style={{ width: "100%", maxWidth: 400, background: "var(--color-white)", padding: 48, border: "1px solid var(--color-rule-lt)", boxShadow: "var(--shadow-md)" }}>
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <div className="serif-heading" style={{ fontSize: 32, color: "var(--color-dark)", marginBottom: 8 }}>Member Login</div>
                    <div style={{ color: "var(--color-grey)", fontSize: 14 }}>Sign in to access your dashboard</div>
                </div>

                {error && <div style={{ color: "var(--color-red)", background: "rgba(220,38,38,0.1)", padding: 12, fontSize: 13, marginBottom: 24, borderRadius: 4 }}>{error}</div>}

                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div>
                        <label style={{ display: "block", fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--color-dark)", marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>Email Address</label>
                        <input 
                            type="email" 
                            required 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-rule)", background: "var(--color-ivory-2)", fontSize: 16 }}
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--color-dark)", marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>Password</label>
                        <input 
                            type="password" 
                            required 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-rule)", background: "var(--color-ivory-2)", fontSize: 16 }}
                        />
                    </div>
                    <button 
                        type="submit"
                        disabled={loading}
                        style={{ background: "var(--color-dark)", color: "var(--color-white)", padding: "16px", fontSize: 13, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 8, opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

            </div>
        </div>
    );
}
