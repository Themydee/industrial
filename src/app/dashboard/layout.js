export default function DashboardLayout({ children }) {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--color-ivory-2)" }}>
            <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {children}
            </main>
        </div>
    );
}
