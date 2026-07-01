import "../globals.css";

export const metadata = {
  title: "Admin | Industrialise Africa",
};

export default function AdminLayout({ children }) {
  return (
    <div style={{ background: "var(--color-ivory)", minHeight: "100vh", display: "flex" }}>
      
      {/* Sidebar Navigation */}
      <aside style={{ width: 260, background: "var(--color-dark)", color: "var(--color-white)", padding: "40px 24px", display: "flex", flexDirection: "column" }}>
        <div className="serif-heading" style={{ fontSize: 20, marginBottom: 40, letterSpacing: "0.05em" }}>Admin Portal</div>
        
        <nav style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
          <a href="/admin" style={{ color: "var(--color-ivory)", textDecoration: "none", fontSize: 14, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Applications</a>
          <a href="/admin/content" style={{ color: "var(--color-ivory)", textDecoration: "none", fontSize: 14, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Content & Articles</a>
          <a href="/admin/deals" style={{ color: "var(--color-ivory)", textDecoration: "none", fontSize: 14, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Deal Board</a>
          <a href="/admin/events" style={{ color: "var(--color-ivory)", textDecoration: "none", fontSize: 14, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Events</a>
          <a href="/admin/sponsors" style={{ color: "var(--color-ivory)", textDecoration: "none", fontSize: 14, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Sponsors</a>
        </nav>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, marginTop: "auto" }}>
            <a href="/" style={{ color: "var(--color-gold)", textDecoration: "none", fontSize: 12 }}>← Back to Website</a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
