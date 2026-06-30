"use client";
import { useState } from "react";
import Tag from "@/components/ui/Tag";

export default function Podcast() {
    const episodes = [
        { n: "01", t: "Engines of Growth", d: "Why did some nations industrialise and others did not?", link: "https://www.youtube.com/watch?v=y5ksLCvHtoQ" },
        { n: "02", t: "Manufacturing as the Engine of Growth", d: "How did manufacturing become the driving force behind economic growth and global influence?", link: "https://www.youtube.com/watch?v=H4qHEOjd968&t=1s" },
        { n: "03", t: "Manufacturing as the Engine of Growth II", d: " Can a nation achieve lasting economic prosperity without a strong manufacturing sector?", link: "https://www.youtube.com/watch?v=RFVXd7KHe3o" },
        { n: "04", t: "Coming Soon...", d: "Anticipate the next episode in the Industrialisation series.", link: "", isUpcoming: true }
    ];
    const [embedUrl, setEmbedUrl] = useState("https://www.youtube.com/embed/y5ksLCvHtoQ");

    const getEmbed = (url) => {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
        const id = match ? match[1] : url; // Fallback to whatever string was provided if match fails
        return `https://www.youtube.com/embed/${id}?autoplay=1`;
    };

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
                    <iframe width="100%" height="100%" src={embedUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
                </div>
                
                <div style={{ marginTop: 40 }} className="bento-grid animate-up animate-delay-3">
                    {episodes.map(({ n, t, d, link, isUpcoming }) => (
                        <button 
                            key={n} 
                            onClick={() => !isUpcoming && setEmbedUrl(getEmbed(link))}
                            style={{ 
                                padding: "32px", 
                                border: "1px solid var(--color-rule-lt)", 
                                background: "var(--color-ivory)", 
                                textAlign: "left", 
                                cursor: isUpcoming ? "default" : "pointer", 
                                transition: "all 0.2s ease", 
                                display: "block", 
                                width: "100%",
                                opacity: isUpcoming ? 0.7 : 1
                            }}
                            onMouseEnter={e => { if(!isUpcoming) e.currentTarget.style.borderColor = "var(--color-gold)" }}
                            onMouseLeave={e => { if(!isUpcoming) e.currentTarget.style.borderColor = "var(--color-rule-lt)" }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-red)", letterSpacing: "0.15em" }}>EPISODE {n}</div>
                                {isUpcoming && <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, background: "var(--color-rule-lt)", padding: "2px 6px", borderRadius: 4 }}>ANTICIPATE</div>}
                            </div>
                            <div className="serif-heading" style={{ fontSize: 20, color: "var(--color-dark)", marginBottom: 12 }}>{t}</div>
                            <p style={{ fontSize: 14, color: "var(--color-grey)", lineHeight: 1.6, fontWeight: 300 }}>{d}</p>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
