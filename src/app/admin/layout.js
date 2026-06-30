import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminLayout({ children }) {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } });

  if (!dbUser || !dbUser.isAdmin) {
    // If not an admin, kick them back to dashboard
    redirect('/dashboard');
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F1F5F9" }}>
      {/* Admin Sidebar */}
      <aside style={{ width: 250, background: "#0F172A", color: "#fff", padding: 24, display: "flex", flexDirection: "column" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 40, letterSpacing: "-0.02em" }}>Admin Panel</h2>
        
        <nav style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
          <Link href="/admin/users" style={{ display: "block", padding: "12px 16px", color: "#fff", textDecoration: "none", borderRadius: 8, background: "rgba(255,255,255,0.05)", marginBottom: 8, fontWeight: 500 }}>
            Users & Tiers
          </Link>
          <Link href="/admin/videos" style={{ display: "block", padding: "12px 16px", color: "#fff", textDecoration: "none", borderRadius: 8, background: "rgba(255,255,255,0.05)", marginBottom: 8, fontWeight: 500 }}>
            Video Library
          </Link>
          <Link href="/admin/deals" style={{ display: "block", padding: "12px 16px", color: "#fff", textDecoration: "none", borderRadius: 8, background: "rgba(255,255,255,0.05)", fontWeight: 500 }}>
            Deal Board
          </Link>
        </nav>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20 }}>
          <Link href="/dashboard" style={{ color: "#fff", textDecoration: "none", fontSize: 13, display: "block", textAlign: "center", background: "rgba(255,255,255,0.1)", padding: "10px", borderRadius: 6 }}>
            Back to Dashboard
          </Link>
        </div>
      </aside>

      {/* Admin Content Area */}
      <main style={{ flex: 1, padding: 48, overflowY: "auto" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
