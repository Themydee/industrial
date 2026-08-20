import { db } from "@/db";
import { videos } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const data = await db.select()
            .from(videos)
            .where(eq(videos.status, "Published"))
            .orderBy(desc(videos.createdAt));
        return NextResponse.json({ success: true, videos: data });
    } catch (error) {
        console.error("Error fetching public videos:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
