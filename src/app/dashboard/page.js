import { getMemberSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { members } from "@/db/schema";
import { eq } from "drizzle-orm";
import ClientDashboard from "./ClientDashboard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const session = await getMemberSession();

    if (!session || !session.memberId) {
        redirect("/login");
    }

    const userRecord = await db.select().from(members).where(eq(members.id, session.memberId)).limit(1);

    if (userRecord.length === 0) {
        redirect("/login");
    }

    const member = userRecord[0];

    // Remove sensitive info
    const safeMember = {
        id: member.id,
        name: member.name,
        email: member.email,
        tier: member.tier,
        subscriptionStatus: member.subscriptionStatus,
        paymentLink: member.profileData
    };

    return <ClientDashboard member={safeMember} />;
}
