import { db } from "@/db";
import { applications } from "@/db/schema";
import { desc } from "drizzle-orm";
import AdminClientPage from "./ClientPage";

// Server Component fetching data securely
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    let data = [];
    try {
        data = await db.select().from(applications).orderBy(desc(applications.createdAt));
    } catch (e) {
        console.error("Failed to fetch applications. DB might not be configured yet.");
    }

    return <AdminClientPage initialData={data} />;
}
