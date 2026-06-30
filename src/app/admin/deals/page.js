import prisma from "@/lib/prisma";
import DealForm from "@/components/admin/DealForm";
import { T } from "@/lib/constants";
import { deleteDeal } from "@/app/actions/deals";

export const dynamic = "force-dynamic";

export default async function AdminDeals() {
  const deals = await prisma.deal.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div style={{ padding: 48, maxWidth: 800 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: T.dark }}>Manage Deal Board</h1>
      <p style={{ color: T.mid, marginBottom: 32 }}>Post grants, funding opportunities, and tenders for Catalyst and Vanguard members.</p>

      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: T.dark }}>Post a New Opportunity</h2>
        <DealForm />
      </div>

      <div>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: T.dark }}>Active Deals ({deals.length})</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {deals.length === 0 ? (
            <div style={{ padding: 32, textAlign: "center", border: `1px dashed ${T.rule}`, borderRadius: 8, color: T.mid }}>
              No deals posted yet.
            </div>
          ) : deals.map(deal => (
            <div key={deal.id} style={{ padding: 24, background: T.white, border: `1px solid ${T.ruleLt}`, borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.primary, textTransform: "uppercase", letterSpacing: "0.05em" }}>{deal.tier} Minimum</span>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: T.dark, margin: "4px 0 8px" }}>{deal.title}</h3>
                <div style={{ fontSize: 14, color: T.mid }}>{deal.description}</div>
                {deal.deadline && (
                  <div style={{ fontSize: 12, color: T.grey, marginTop: 8, fontWeight: 600 }}>
                    Deadline: {new Date(deal.deadline).toLocaleDateString()}
                  </div>
                )}
              </div>
              <form action={async () => {
                "use server";
                await deleteDeal(deal.id);
              }}>
                <button type="submit" style={{ padding: "8px 16px", background: "#fee2e2", color: "#dc2626", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                  Delete
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
