import { db } from "@/db";
import { applications, members, payments } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import AdminClientPage from "./ClientPage";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    let data = [];
    let metrics = { totalMembers: 0, activeMembers: 0, pendingVanguard: 0, revenue: 0 };

    try {
        data = await db.select().from(applications).orderBy(desc(applications.createdAt));
        
        const allMembers = await db.select().from(members);
        metrics.totalMembers = allMembers.length;
        metrics.activeMembers = allMembers.filter(m => m.subscriptionStatus === 'Active').length;
        metrics.pendingVanguard = allMembers.filter(m => m.tier === 'Vanguard' && m.subscriptionStatus === 'Pending Review').length;

        // Calculate total revenue from successful payments
        const allPayments = await db.select().from(payments).where(eq(payments.status, 'Success'));
        metrics.revenue = allPayments.reduce((sum, p) => sum + parseFloat(p.amount), 0);

    } catch (e) {
        console.error("Failed to fetch admin data. DB might not be configured yet.", e);
    }

    return <AdminClientPage initialData={data} metrics={metrics} />;
}
