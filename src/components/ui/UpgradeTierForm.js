"use client";
import { useState } from "react";
import { updateTier } from "@/app/actions/update-tier";
import { T } from "@/lib/constants";

export default function UpgradeTierForm({ currentTier }) {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(currentTier);

  const handleUpgrade = async () => {
    if (selected === currentTier) return;
    setLoading(true);
    try {
      await updateTier(selected);
    } catch (err) {
      alert("Failed to update tier");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 24, padding: 16, background: "rgba(255,255,255,0.05)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)" }}>
      <label style={{ display: "block", fontSize: 13, marginBottom: 8, color: "rgba(255,255,255,0.7)" }}>Want to upgrade?</label>
      <div style={{ display: "flex", gap: 12 }}>
        <select 
          value={selected} 
          onChange={(e) => setSelected(e.target.value)}
          style={{ flex: 1, padding: 10, borderRadius: 6, border: "none", background: "#fff", color: "#000", fontSize: 14 }}
        >
          <option value="FOUNDATION">Foundation (Free)</option>
          <option value="BUILDER">Builder ($15/mo)</option>
          <option value="CATALYST">Catalyst ($75/mo)</option>
          <option value="VANGUARD">Vanguard ($500/mo)</option>
        </select>
        {selected !== currentTier && (
          <button 
            onClick={handleUpgrade}
            disabled={loading}
            style={{ padding: "10px 16px", background: T.white, color: T.dark, borderRadius: 6, fontWeight: 600, border: "none", cursor: "pointer", fontSize: 13 }}
          >
            {loading ? "..." : "Change"}
          </button>
        )}
      </div>
    </div>
  );
}
