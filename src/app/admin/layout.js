import "../globals.css";

export const metadata = {
  title: "Admin | Industrialise Africa",
};

export default function AdminLayout({ children }) {
  return (
    <div style={{ background: "var(--color-ivory)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {children}
    </div>
  );
}
