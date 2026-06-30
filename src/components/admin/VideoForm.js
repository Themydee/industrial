"use client";
import { useState } from "react";
import { createVideo } from "@/app/actions/admin";
import { T } from "@/lib/constants";

export default function VideoForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    tier: "FOUNDATION"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createVideo(formData);
      setFormData({ title: "", description: "", url: "", tier: "FOUNDATION", resourcePdfUrl: "", thumbnail: "" });
      alert("Video added successfully!");
    } catch (err) {
      alert("Failed to add video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Video Title</label>
        <input 
          required 
          type="text" 
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #CBD5E1" }} 
        />
      </div>

      <div>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Cloudinary Video URL</label>
        <input 
          required 
          type="url" 
          value={formData.url}
          onChange={(e) => setFormData({...formData, url: e.target.value})}
          placeholder="https://res.cloudinary.com/.../video.mp4"
          style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #CBD5E1" }} 
        />
      </div>

      <div>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Thumbnail URL (Optional)</label>
        <input 
          type="url" 
          value={formData.thumbnail || ""}
          onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
          placeholder="Leave blank to auto-generate from Cloudinary"
          style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #CBD5E1" }} 
        />
      </div>

      <div>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Resource URL (Optional)</label>
        <input 
          type="url" 
          value={formData.resourcePdfUrl || ""}
          onChange={(e) => setFormData({...formData, resourcePdfUrl: e.target.value})}
          placeholder="https://.../slides.pdf"
          style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #CBD5E1" }} 
        />
      </div>

      <div>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Minimum Tier Required</label>
        <select 
          value={formData.tier}
          onChange={(e) => setFormData({...formData, tier: e.target.value})}
          style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #CBD5E1" }}
        >
          <option value="FOUNDATION">Foundation (Free for all)</option>
          <option value="BUILDER">Builder</option>
          <option value="CATALYST">Catalyst</option>
          <option value="VANGUARD">Vanguard</option>
        </select>
      </div>

      <button disabled={loading} style={{ padding: "12px", background: T.primary, color: T.white, borderRadius: 6, fontWeight: 600, border: "none", cursor: "pointer", marginTop: 8 }}>
        {loading ? "Adding..." : "Upload Video"}
      </button>
    </form>
  );
}
