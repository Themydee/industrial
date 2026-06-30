import prisma from "@/lib/prisma";

export default async function AdminUsers() {
  const users = await prisma.user.findMany({
    include: {
      subscriptions: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Manage Users</h1>

      <div style={{ background: "#fff", padding: 24, borderRadius: 12, border: "1px solid #E2E8F0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #E2E8F0", textAlign: "left" }}>
              <th style={{ padding: "12px 16px", fontSize: 13, color: "#64748B" }}>Name</th>
              <th style={{ padding: "12px 16px", fontSize: 13, color: "#64748B" }}>Email</th>
              <th style={{ padding: "12px 16px", fontSize: 13, color: "#64748B" }}>Role/Sector</th>
              <th style={{ padding: "12px 16px", fontSize: 13, color: "#64748B" }}>Target Tier</th>
              <th style={{ padding: "12px 16px", fontSize: 13, color: "#64748B" }}>Paid Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => {
              const activeSub = u.subscriptions.find(s => s.status === 'active');
              return (
                <tr key={u.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <td style={{ padding: "16px", fontSize: 14, fontWeight: 500 }}>
                    {u.name || "N/A"}
                    {u.isAdmin && <span style={{ marginLeft: 8, fontSize: 10, background: "#EF4444", color: "#fff", padding: "2px 6px", borderRadius: 4 }}>ADMIN</span>}
                  </td>
                  <td style={{ padding: "16px", fontSize: 14 }}>{u.email}</td>
                  <td style={{ padding: "16px", fontSize: 14, color: "#64748B" }}>{u.role} - {u.sector}</td>
                  <td style={{ padding: "16px", fontSize: 14 }}>{u.tier}</td>
                  <td style={{ padding: "16px", fontSize: 14 }}>
                    {activeSub ? (
                      <span style={{ color: "#10B981", fontWeight: 600 }}>Paid ({activeSub.tier})</span>
                    ) : (
                      <span style={{ color: "#94A3B8" }}>Unpaid</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
