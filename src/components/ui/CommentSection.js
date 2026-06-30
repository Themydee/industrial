"use client";

import { useState } from "react";
import { T } from "@/lib/constants";
import { postComment, deleteComment } from "@/app/actions/comments";

export default function CommentSection({ videoId, comments, currentUserId, isAdmin }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await postComment(videoId, text);
      setText("");
    } catch (err) {
      alert("Failed to post comment.");
      console.error(err);
    }
    setLoading(false);
  };

  const handleDelete = async (commentId) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    try {
      await deleteComment(commentId, videoId);
    } catch (err) {
      alert("Failed to delete comment.");
    }
  };

  return (
    <div style={{ marginTop: 64 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: T.dark, marginBottom: 24 }}>Discussion ({comments.length})</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: 40, display: "flex", gap: 16, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <textarea 
            required
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Add to the discussion..."
            rows={3}
            style={{ width: "100%", padding: 16, borderRadius: 12, border: `1px solid ${T.rule}`, fontSize: 14, resize: "vertical" }}
          />
        </div>
        <button disabled={loading} type="submit" style={{ padding: "12px 24px", background: T.primary, color: T.white, fontWeight: 600, borderRadius: 8, border: "none", cursor: "pointer" }}>
          {loading ? "Posting..." : "Post"}
        </button>
      </form>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {comments.length === 0 ? (
          <div style={{ color: T.mid, textAlign: "center", padding: 32, border: `1px dashed ${T.ruleLt}`, borderRadius: 12 }}>
            No comments yet. Be the first to start the discussion!
          </div>
        ) : (
          comments.map(c => {
            const isAuthor = currentUserId === c.user.id;
            return (
              <div key={c.id} style={{ display: "flex", gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: T.primaryLight, color: T.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, flexShrink: 0 }}>
                  {c.user.name ? c.user.name.charAt(0).toUpperCase() : c.user.email.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: T.dark }}>
                      {c.user.name || "Anonymous Member"}
                    </span>
                    <span style={{ fontSize: 12, color: T.grey }}>
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div style={{ fontSize: 15, color: "#334155", lineHeight: 1.5, whiteSpace: "pre-wrap" }}>
                    {c.text}
                  </div>
                  {(isAuthor || isAdmin) && (
                    <button onClick={() => handleDelete(c.id)} style={{ background: "none", border: "none", color: "#ef4444", fontSize: 12, fontWeight: 600, cursor: "pointer", padding: 0, marginTop: 8 }}>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
