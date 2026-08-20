"use client";
import { useState, useEffect } from "react";
import Tag from "@/components/ui/Tag";



export default function Podcast() {
    const [episodes, setEpisodes] = useState(defaultEpisodes);
    const [embedUrl, setEmbedUrl] = useState("https://www.youtube.com/embed/y5ksLCvHtoQ");

    const getEmbed = (url) => {
        if (!url) return "";
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
        const id = match ? match[1] : url;
        return `https://www.youtube.com/embed/${id}?autoplay=1`;
    };

    useEffect(() => {
        async function loadVideos() {
            try {
                const res = await fetch("/api/videos");
                const data = await res.json();
                if (data.success && data.videos && data.videos.length > 0) {
                    const mapped = data.videos.map((v, idx) => ({
                        n: v.episodeNumber || String(idx + 1).padStart(2, '0'),
                        t: v.title,
                        d: v.description,
                        link: v.youtubeUrl,
                        youtubeId: v.youtubeId
                    }));
                    setEpisodes(mapped);
                    setEmbedUrl(`https://www.youtube.com/embed/${mapped[0].youtubeId}?autoplay=0`);
                }
            } catch (err) {
                console.error("Failed to load videos from API:", err);
            }
        }
        loadVideos();
    }, []);

    return (
        <section id="podcast" className="section-padding" style={{ background: "var(--color-white)", borderTop: "1px solid var(--color-rule-lt)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 24 }} className="animate-up">
                    <div>
                        <Tag color="var(--color-red)">The Masterclass Series</Tag>
                        <h2 className="serif-heading" style={{ fontSize: "clamp(28px, 5vw, 56px)", color: "var(--color-dark)", margin: "0 0 16px" }}>Industrialisation & Development</h2>
                    </div>
                    <p style={{ fontSize: 16, color: "var(--color-grey)", fontWeight: 300, maxWidth: 400, textAlign: "right", lineHeight: 1.6 }}>Free to the public. Recorded in high definition. Supported by the community.</p>
                </div>

                <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "var(--color-ivory-2)", border: "1px solid var(--color-rule-lt)" }} className="animate-up animate-delay-2">
                    {embedUrl ? (
                        <iframe width="100%" height="100%" src={embedUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
                    ) : null}
                </div>

                <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }} className="animate-up animate-delay-3">
                    {episodes.map(({ n, t, d, link, isUpcoming }) => (
                        <button
                            key={n + t}
                            onClick={() => !isUpcoming && setEmbedUrl(getEmbed(link))}
                            style={{
                                padding: "18px 16px",
                                border: "1px solid var(--color-rule-lt)",
                                background: "var(--color-ivory)",
                                textAlign: "left",
                                cursor: isUpcoming ? "default" : "pointer",
                                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                                display: "block",
                                width: "100%",
                                opacity: isUpcoming ? 0.7 : 1
                            }}
                            onMouseEnter={e => {
                                if (!isUpcoming) {
                                    e.currentTarget.style.borderColor = "var(--color-gold)";
                                    e.currentTarget.style.transform = "translateY(-4px)";
                                    e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                                }
                            }}
                            onMouseLeave={e => {
                                if (!isUpcoming) {
                                    e.currentTarget.style.borderColor = "var(--color-rule-lt)";
                                    e.currentTarget.style.transform = "none";
                                    e.currentTarget.style.boxShadow = "none";
                                }
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                                {(() => {
                                    const tagText = (n || "").trim();
                                    const isSpecialTag = tagText && (
                                        tagText.toLowerCase().includes("special") ||
                                        tagText.toLowerCase().includes("bonus") ||
                                        tagText.toLowerCase().startsWith("se")
                                    );

                                    if (isSpecialTag) {
                                        return (
                                            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#B8860B", background: "rgba(212, 175, 55, 0.12)", border: "1px solid rgba(212, 175, 55, 0.3)", padding: "2px 8px", borderRadius: 4, letterSpacing: "0.1em", fontWeight: 600 }}>
                                                ⭐ {tagText.toUpperCase()}
                                            </div>
                                        );
                                    }

                                    return (
                                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--color-red)", letterSpacing: "0.1em" }}>
                                            {tagText ? (isNaN(tagText) ? tagText.toUpperCase() : `EPISODE ${tagText}`) : "EPISODE"}
                                        </div>
                                    );
                                })()}
                                {isUpcoming ? (
                                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, background: "var(--color-rule-lt)", padding: "3px 6px", borderRadius: 3, letterSpacing: "0.08em" }}>ANTICIPATE</div>
                                ) : (
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 4,
                                        fontFamily: "var(--font-mono)",
                                        fontSize: 9,
                                        color: "var(--color-dark)",
                                        background: "rgba(0,0,0,0.04)",
                                        padding: "3px 8px",
                                        borderRadius: 20,
                                        fontWeight: 600,
                                        letterSpacing: "0.05em"
                                    }}>
                                        <span style={{ fontSize: 9, color: "var(--color-red)" }}>▶</span> WATCH
                                    </div>
                                )}
                            </div>
                            <div className="serif-heading" style={{ fontSize: 16, color: "var(--color-dark)", marginBottom: 6 }}>{t}</div>
                            <p style={{ fontSize: 12, color: "var(--color-grey)", lineHeight: 1.4, fontWeight: 300 }}>{d}</p>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
