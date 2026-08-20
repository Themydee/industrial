import { db } from "@/db";
import { videos } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function extractYoutubeId(url) {
    if (!url) return null;
    const cleanUrl = url.trim();
    // Handle standard video ID string if user just enters 11 chars ID directly
    if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
        return cleanUrl;
    }
    const match = cleanUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\/#]+)/);
    return match ? match[1] : null;
}

export async function GET() {
    try {
        const data = await db.select().from(videos).orderBy(desc(videos.createdAt));
        return NextResponse.json({ success: true, videos: data });
    } catch (error) {
        console.error("Error fetching videos:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { title, description, youtubeUrl, episodeNumber, minTierRequired } = body;

        if (!title || !youtubeUrl) {
            return NextResponse.json({ success: false, error: "Title and YouTube URL are required." }, { status: 400 });
        }

        const youtubeId = extractYoutubeId(youtubeUrl);
        if (!youtubeId) {
            return NextResponse.json({ success: false, error: "Invalid YouTube URL provided. Please enter a valid YouTube link." }, { status: 400 });
        }

        const [newVideo] = await db.insert(videos).values({
            title,
            description: description || "",
            youtubeUrl,
            youtubeId,
            episodeNumber: episodeNumber || "",
            minTierRequired: minTierRequired || "Foundation",
            status: "Published",
        }).returning();

        return NextResponse.json({ success: true, video: newVideo }, { status: 201 });
    } catch (error) {
        console.error("Error creating video:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
