"use client";

import { useState } from "react";
import { T } from "@/lib/constants";
import Link from "next/link";

export default function VideoClientPlayer({ video }) {
  const [audioOnly, setAudioOnly] = useState(false);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <button 
          onClick={() => setAudioOnly(!audioOnly)}
          style={{ 
            padding: "8px 16px", 
            background: audioOnly ? T.primary : T.white, 
            color: audioOnly ? T.white : T.dark, 
            border: `1px solid ${audioOnly ? T.primary : T.rule}`, 
            borderRadius: 20, 
            fontSize: 13, 
            fontWeight: 600, 
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          {audioOnly ? "🎧 Audio Only Mode On" : "🎧 Switch to Audio Only"}
        </button>
      </div>

      <div style={{ width: "100%", aspectRatio: audioOnly ? "auto" : "16/9", background: audioOnly ? "#F1F5F9" : "#000", borderRadius: 16, overflow: "hidden", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center", padding: audioOnly ? 48 : 0 }}>
        {audioOnly ? (
          <div style={{ width: "100%", maxWidth: 500, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 24 }}>🎧</div>
            <audio 
              src={video.url} 
              controls 
              style={{ width: "100%" }}
            >
              Your browser does not support HTML audio.
            </audio>
          </div>
        ) : (
          <video 
            src={video.url} 
            controls 
            playsInline
            preload="metadata"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          >
            Your browser does not support HTML video.
          </video>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: T.dark, marginBottom: 8 }}>{video.title}</h1>
          <div style={{ display: "inline-block", background: "#E2E8F0", padding: "4px 10px", borderRadius: 4, fontSize: 12, fontWeight: 700, color: T.mid, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {video.tier} Exclusive
          </div>
        </div>
        
        {video.resourcePdfUrl && (
          <Link href={video.resourcePdfUrl} target="_blank" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "#0F172A", color: T.white, textDecoration: "none", borderRadius: 8, fontWeight: 600, fontSize: 14 }}>
            <span>📄</span> Download Resources
          </Link>
        )}
      </div>

      {video.description && (
        <p style={{ fontSize: 16, color: T.mid, lineHeight: 1.6, paddingBottom: 32, borderBottom: `1px solid ${T.ruleLt}` }}>
          {video.description}
        </p>
      )}
    </div>
  );
}
