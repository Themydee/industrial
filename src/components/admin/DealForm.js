"use client";

import { useState } from "react";
import { T } from "@/lib/constants";
import { createDeal } from "@/app/actions/deals";

export default function DealForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    deadline: "",
    tier: "CATALYST"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createDeal(formData);
      setFormData({ title: "", description: "", url: "", deadline: "", tier: "CATALYST" });
      alert("Deal posted successfully!");
    } catch (err) {
      alert("Failed to post deal.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: T.white, padding: 32, borderRadius: 16, border: `1px solid ${T.ruleLt}`, display: "flex", flexDirection: "column", gap: 20 }}>
      
      <div>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Opportunity Title</label>
        <input 
          required 
          type="text" 
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          placeholder="e.g. AfDB $50M Agro-Processing Grant"
          style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #CBD5E1" }} 
        />
      </div>

      <div>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Description</label>
        <textarea 
          required 
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={3}
          placeholder="Brief details about the opportunity..."
          style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #CBD5E1" }} 
        />
      </div>

      <div>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Application / Read More URL (Optional)</label>
        <input 
          type="url" 
          value={formData.url}
          onChange={(e) => setFormData({...formData, url: e.target.value})}
          placeholder="https://..."
          style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #CBD5E1" }} 
        />
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Minimum Tier required</label>
          <select 
            value={formData.tier}
            onChange={(e) => setFormData({...formData, tier: e.target.value})}
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #CBD5E1", background: T.white }}
          >
            <option value="FOUNDATION">Foundation</option>
            <option value="BUILDER">Builder</option>
            <option value="CATALYST">Catalyst</option>
            <option value="VANGUARD">Vanguard</option>
          </select>
        </div>

        <div style={{ flex: 1 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Deadline (Optional)</label>
          <input 
            type="date" 
            value={formData.deadline}
            onChange={(e) => setFormData({...formData, deadline: e.target.value})}
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #CBD5E1" }} 
          />
        </div>
      </div>

      <button disabled={loading} type="submit" style={{ padding: "12px 24px", background: T.primary, color: T.white, fontWeight: 600, borderRadius: 8, border: "none", cursor: "pointer", marginTop: 8 }}>
        {loading ? "Posting..." : "Post Deal"}
      </button>

    </form>
  );
}
