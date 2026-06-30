"use client";
import { useState } from "react";
import Btn from "@/components/ui/Btn";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (res.ok) {
                window.location.href = "/admin"; // Force reload to apply middleware
            } else {
                const data = await res.json();
                setError(data.error || "Login failed");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div style={{ background: "var(--color-white)", padding: "48px 40px", borderTop: "4px solid var(--color-gold)", width: "100%", maxWidth: 400, boxShadow: "var(--shadow-md)" }}>
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <div className="serif-heading" style={{ fontSize: 24, color: "var(--color-dark)" }}>Admin Login</div>
                    <div style={{ fontSize: 13, color: "var(--color-grey)", marginTop: 8 }}>Secure Access Only</div>
                </div>

                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {error && (
                        <div style={{ background: "var(--color-red-lt)", color: "var(--color-red)", padding: 12, fontSize: 13, textAlign: "center", border: "1px solid rgba(139,26,26,0.2)" }}>
                            {error}
                        </div>
                    )}
                    
                    <div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-dark)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Username</div>
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} required style={{ width: "100%", padding: 12, border: "1px solid var(--color-rule)", outline: "none", background: "var(--color-ivory-2)", fontSize: 14 }} onFocus={e => e.target.style.borderColor="var(--color-gold)"} onBlur={e => e.target.style.borderColor="var(--color-rule)"} />
                    </div>

                    <div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-dark)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Password</div>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: "100%", padding: 12, border: "1px solid var(--color-rule)", outline: "none", background: "var(--color-ivory-2)", fontSize: 14 }} onFocus={e => e.target.style.borderColor="var(--color-gold)"} onBlur={e => e.target.style.borderColor="var(--color-rule)"} />
                    </div>

                    <Btn variant="dark" style={{ width: "100%", justifyContent: "center", marginTop: 12 }}>
                        {loading ? "Authenticating..." : "Sign In"}
                    </Btn>
                </form>
            </div>
        </div>
    );
}
