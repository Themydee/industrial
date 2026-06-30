import prisma from "@/lib/prisma";
import VideoForm from "@/components/admin/VideoForm";

export default async function AdminVideos() {
  const videos = await prisma.video.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Manage Videos</h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 32 }}>
        
        {/* Upload Form */}
        <section style={{ background: "#fff", padding: 24, borderRadius: 12, border: "1px solid #E2E8F0" }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Add New Video</h2>
          <VideoForm />
        </section>

        {/* Video List */}
        <section style={{ background: "#fff", padding: 24, borderRadius: 12, border: "1px solid #E2E8F0" }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Uploaded Videos ({videos.length})</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {videos.length === 0 ? (
              <p style={{ color: "#64748B", fontSize: 14 }}>No videos uploaded yet.</p>
            ) : (
              videos.map(video => (
                <div key={video.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, border: "1px solid #E2E8F0", borderRadius: 8 }}>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 600 }}>{video.title}</h3>
                    <div style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>
                      Required Tier: <strong>{video.tier}</strong>
                    </div>
                  </div>
                  <div style={{ color: "#EF4444", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>Delete</div>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
