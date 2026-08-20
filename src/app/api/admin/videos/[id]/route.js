import { db } from "@/db";
import { videos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function extractYoutubeId(url) {
    if (!url) return null;
    const cleanUrl = url.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
        return cleanUrl;
    }
    const match = cleanUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\/#]+)/);
    return match ? match[1] : null;
}

export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { title, description, youtubeUrl, episodeNumber, minTierRequired, status } = body;

        const videoId = parseInt(id, 10);
        if (isNaN(videoId)) {
            return NextResponse.json({ success: false, error: "Invalid video ID" }, { status: 400 });
        }

        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (episodeNumber !== undefined) updateData.episodeNumber = episodeNumber;
        if (minTierRequired !== undefined) updateData.minTierRequired = minTierRequired;
        if (status !== undefined) updateData.status = status;

        if (youtubeUrl) {
            const youtubeId = extractYoutubeId(youtubeUrl);
            if (!youtubeId) {
                return NextResponse.json({ success: false, error: "Invalid YouTube URL" }, { status: 400 });
            }
            updateData.youtubeUrl = youtubeUrl;
            updateData.youtubeId = youtubeId;
        }

        const [updatedVideo] = await db.update(videos)
            .set(updateData)
            .where(eq(videos.id, videoId))
            .returning();

        return NextResponse.json({ success: true, video: updatedVideo });
    } catch (error) {
        console.error("Error updating video:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = await params;
        const videoId = parseInt(id, 10);
        if (isNaN(videoId)) {
            return NextResponse.json({ success: false, error: "Invalid video ID" }, { status: 400 });
        }

        await db.delete(videos).where(eq(videos.id, videoId));
        return NextResponse.json({ success: true, message: "Video deleted successfully" });
    } catch (error) {
        console.error("Error deleting video:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
