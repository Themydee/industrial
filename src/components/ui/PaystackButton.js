"use client";
import { useState } from "react";
import { initializePayment } from "@/app/actions/paystack";

export default function PaystackButton({ tier }) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await initializePayment();
      if (res.authorization_url) {
        window.location.href = res.authorization_url;
      }
    } catch (err) {
      alert(err.message || "Something went wrong initializing payment.");
    } finally {
      setLoading(false);
    }
  };

  if (tier === "FOUNDATION") {
    return (
      <button disabled style={{ width: "100%", padding: "12px", background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", borderRadius: 6, fontSize: 14, fontWeight: 600, border: "none", cursor: "not-allowed" }}>
        Already on Foundation
      </button>
    );
  }

  return (
    <button 
      onClick={handlePay} 
      disabled={loading}
      style={{ width: "100%", padding: "12px", background: "#f26d21", color: "#fff", borderRadius: 6, fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer" }}
    >
      {loading ? "Connecting to Paystack..." : `Pay for ${tier}`}
    </button>
  );
}
