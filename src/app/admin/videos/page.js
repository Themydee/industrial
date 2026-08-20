"use client";
import { useState, useEffect } from "react";

export default function AdminVideosPage() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingVideo, setEditingVideo] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [previewId, setPreviewId] = useState("");

    // Form state
    const [title, setTitle] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [episodeNumber, setEpisodeNumber] = useState("");
    const [minTierRequired, setMinTierRequired] = useState("Foundation");
    const [description, setDescription] = useState("");

    const extractYoutubeId = (url) => {
        if (!url) return null;
        const cleanUrl = url.trim();
        if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) return cleanUrl;
        const match = cleanUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\/#]+)/);
        return match ? match[1] : null;
    };

    const handleUrlChange = (val) => {
        setYoutubeUrl(val);
        const extracted = extractYoutubeId(val);
        setPreviewId(extracted || "");
    };

    const fetchVideos = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/videos");
            const data = await res.json();
            if (data.success) {
                setVideos(data.videos);
            }
        } catch (err) {
            console.error("Failed to load videos:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const openCreateModal = () => {
        setEditingVideo(null);
        setTitle("");
        setYoutubeUrl("");
        setEpisodeNumber("");
        setMinTierRequired("Foundation");
        setDescription("");
        setPreviewId("");
        setError("");
        setShowModal(true);
    };

    const openEditModal = (video) => {
        setEditingVideo(video);
        setTitle(video.title || "");
        setYoutubeUrl(video.youtubeUrl || "");
        setEpisodeNumber(video.episodeNumber || "");
        setMinTierRequired(video.minTierRequired || "Foundation");
        setDescription(video.description || "");
        setPreviewId(video.youtubeId || "");
        setError("");
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!title.trim() || !youtubeUrl.trim()) {
            setError("Title and YouTube Link are required.");
            return;
        }

        const ytId = extractYoutubeId(youtubeUrl);
        if (!ytId) {
            setError("Invalid YouTube Link. Please check the URL format.");
            return;
        }

        try {
            setSubmitting(true);
            const payload = {
                title,
                youtubeUrl,
                episodeNumber,
                minTierRequired,
                description
            };

            let res;
            if (editingVideo) {
                res = await fetch(`/api/admin/videos/${editingVideo.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
            } else {
                res = await fetch("/api/admin/videos", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
            }

            const data = await res.json();
            if (data.success) {
                setShowModal(false);
                fetchVideos();
            } else {
                setError(data.error || "Operation failed.");
            }
        } catch (err) {
            setError("An error occurred while saving the video.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this video entry?")) return;
        try {
            const res = await fetch(`/api/admin/videos/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                fetchVideos();
            } else {
                alert(data.error || "Failed to delete video");
            }
        } catch (err) {
            alert("Error deleting video");
        }
    };

    return (
        <div style={{ padding: "40px 48px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40, borderBottom: "1px solid var(--color-rule)", paddingBottom: 20 }}>
                <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-grey)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>Admin Dashboard</div>
                    <h1 className="serif-heading" style={{ fontSize: 32, color: "var(--color-dark)", margin: 0 }}>YouTube Videos</h1>
                </div>
                <button
                    onClick={openCreateModal}
                    style={{ background: "var(--color-dark)", color: "var(--color-white)", padding: "12px 20px", border: "none", fontSize: 12, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}
                >
                    <span>+</span> Post YouTube Video
                </button>
            </div>

            {loading ? (
                <div style={{ padding: 48, textAlign: "center", color: "var(--color-grey)", fontFamily: "var(--font-mono)", fontSize: 13 }}>
                    Loading videos...
                </div>
            ) : (
                <div style={{ background: "var(--color-white)", border: "1px solid var(--color-rule-lt)", boxShadow: "var(--shadow-sm)" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, textAlign: "left" }}>
                        <thead>
                            <tr style={{ background: "var(--color-ivory-2)", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-dark)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                                <th style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-rule)", width: 140 }}>Preview</th>
                                <th style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-rule)" }}>Episode & Title</th>
                                <th style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-rule)" }}>YouTube Link</th>
                                <th style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-rule)" }}>Tier Access</th>
                                <th style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-rule)" }}>Posted Date</th>
                                <th style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-rule)", textAlign: "right" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {videos.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ padding: "48px 20px", textAlign: "center", color: "var(--color-grey)" }}>
                                        <div style={{ fontSize: 32, marginBottom: 12 }}>🎬</div>
                                        <div style={{ fontWeight: 500, color: "var(--color-dark)", marginBottom: 4 }}>No YouTube videos posted yet</div>
                                        <div style={{ fontSize: 13 }}>Click "+ Post YouTube Video" above to publish your first video link.</div>
                                    </td>
                                </tr>
                            ) : videos.map((item) => (
                                <tr key={item.id} style={{ borderBottom: "1px solid var(--color-rule-lt)" }}>
                                    <td style={{ padding: "16px 20px" }}>
                                        <div style={{ position: "relative", width: 110, height: 62, background: "#000", borderRadius: 4, overflow: "hidden" }}>
                                            <img
                                                src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                                                alt={item.title}
                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            />
                                            <a
                                                href={item.youtubeUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)", color: "#fff", textDecoration: "none", fontSize: 14 }}
                                                title="Watch on YouTube"
                                            >
                                                ▶
                                            </a>
                                        </div>
                                    </td>
                                    <td style={{ padding: "16px 20px" }}>
                                        {item.episodeNumber && (
                                            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-red)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 2 }}>
                                                Episode {item.episodeNumber}
                                            </span>
                                        )}
                                        <div style={{ fontWeight: 600, color: "var(--color-dark)", fontSize: 15 }}>{item.title}</div>
                                        {item.description && (
                                            <div style={{ fontSize: 12, color: "var(--color-grey)", marginTop: 4, maxWidth: 320, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                {item.description}
                                            </div>
                                        )}
                                    </td>
                                    <td style={{ padding: "16px 20px" }}>
                                        <a
                                            href={item.youtubeUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-dark)", textDecoration: "underline" }}
                                        >
                                            youtube.com/watch?v={item.youtubeId}
                                        </a>
                                    </td>
                                    <td style={{ padding: "16px 20px" }}>
                                        <span style={{ padding: "4px 10px", background: "var(--color-ivory)", color: "var(--color-gold)", border: "1px solid var(--color-gold)", fontSize: 11, fontFamily: "var(--font-mono)", borderRadius: 12 }}>
                                            {item.minTierRequired}
                                        </span>
                                    </td>
                                    <td style={{ padding: "16px 20px", color: "var(--color-grey)", fontSize: 13 }}>
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                    <td style={{ padding: "16px 20px", textAlign: "right" }}>
                                        <button
                                            onClick={() => openEditModal(item)}
                                            style={{ color: "var(--color-dark)", background: "none", border: "none", cursor: "pointer", fontSize: 13, marginRight: 16, textDecoration: "underline", fontWeight: 500 }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            style={{ color: "var(--color-red)", background: "none", border: "none", cursor: "pointer", fontSize: 13, textDecoration: "underline" }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal for Creating / Editing Video */}
            {showModal && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
                    <div style={{ background: "var(--color-white)", width: "100%", maxWidth: 640, borderRadius: 8, overflow: "hidden", boxShadow: "var(--shadow-md)", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
                        <div style={{ padding: "20px 24px", background: "var(--color-ivory-2)", borderBottom: "1px solid var(--color-rule-lt)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h3 className="serif-heading" style={{ fontSize: 20, color: "var(--color-dark)", margin: 0 }}>
                                {editingVideo ? "Edit YouTube Video" : "Post New YouTube Video"}
                            </h3>
                            <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "var(--color-grey)" }}>×</button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ padding: 24, overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
                            {error && (
                                <div style={{ padding: "12px 16px", background: "var(--color-redLt)", border: "1px solid var(--color-red)", color: "var(--color-red)", fontSize: 13, borderRadius: 4 }}>
                                    {error}
                                </div>
                            )}

                            <div>
                                <label style={{ display: "block", fontSize: 12, fontFamily: "var(--font-mono)", textTransform: "uppercase", color: "var(--color-dark)", marginBottom: 6 }}>
                                    YouTube Video Link *
                                </label>
                                <input
                                    type="text"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    value={youtubeUrl}
                                    onChange={(e) => handleUrlChange(e.target.value)}
                                    required
                                    style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--color-rule-lt)", fontSize: 14, outline: "none" }}
                                />
                                <span style={{ fontSize: 11, color: "var(--color-grey)", marginTop: 4, display: "block" }}>
                                    Paste any YouTube video URL or share link.
                                </span>
                            </div>

                            {/* Live Preview Embed */}
                            {previewId && (
                                <div style={{ border: "1px solid var(--color-rule-lt)", borderRadius: 6, padding: 12, background: "var(--color-ivory)" }}>
                                    <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", textTransform: "uppercase", color: "var(--color-dark)", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                                        <span style={{ color: "var(--color-gold)" }}>●</span> Live Video Preview
                                    </div>
                                    <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#000" }}>
                                        <iframe
                                            src={`https://www.youtube.com/embed/${previewId}`}
                                            title="YouTube Preview"
                                            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                                            allowFullScreen
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label style={{ display: "block", fontSize: 12, fontFamily: "var(--font-mono)", textTransform: "uppercase", color: "var(--color-dark)", marginBottom: 6 }}>
                                    Video Title *
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Engines of Growth"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--color-rule-lt)", fontSize: 14, outline: "none" }}
                                />
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                <div>
                                    <label style={{ display: "block", fontSize: 12, fontFamily: "var(--font-mono)", textTransform: "uppercase", color: "var(--color-dark)", marginBottom: 6 }}>
                                        Episode Number / Tag
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 01 or 06"
                                        value={episodeNumber}
                                        onChange={(e) => setEpisodeNumber(e.target.value)}
                                        style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--color-rule-lt)", fontSize: 14, outline: "none" }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: "block", fontSize: 12, fontFamily: "var(--font-mono)", textTransform: "uppercase", color: "var(--color-dark)", marginBottom: 6 }}>
                                        Minimum Tier Required
                                    </label>
                                    <select
                                        value={minTierRequired}
                                        onChange={(e) => setMinTierRequired(e.target.value)}
                                        style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--color-rule-lt)", fontSize: 14, background: "var(--color-white)", outline: "none" }}
                                    >
                                        <option value="Foundation">Foundation (Public)</option>
                                        <option value="Builder">Builder</option>
                                        <option value="Catalyst">Catalyst</option>
                                        <option value="Vanguard">Vanguard</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: 12, fontFamily: "var(--font-mono)", textTransform: "uppercase", color: "var(--color-dark)", marginBottom: 6 }}>
                                    Description / Key Takeaway
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="Brief description of the video content..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--color-rule-lt)", fontSize: 14, outline: "none", resize: "vertical" }}
                                />
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 8 }}>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    style={{ padding: "10px 20px", border: "1px solid var(--color-rule-lt)", background: "transparent", fontSize: 13, cursor: "pointer" }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    style={{ padding: "10px 24px", background: "var(--color-dark)", color: "var(--color-white)", border: "none", fontSize: 13, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", fontWeight: 600, opacity: submitting ? 0.7 : 1 }}
                                >
                                    {submitting ? "Saving..." : (editingVideo ? "Update Video" : "Publish Video")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
