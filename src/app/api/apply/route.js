import { db } from '@/db';
import { applications } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();

        // Basic validation
        if (!body.type || !body.name || !body.email || !body.phone) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Insert into database
        await db.insert(applications).values({
            type: body.type, // 'community' or 'membership'
            name: body.name,
            email: body.email,
            phone: body.phone,
            country: body.country,
            state: body.state,
            age: body.age,
            role: body.role,
            sector: body.sector,
            stage: body.stage,
            source: body.source,
            why: body.why,
            challenge: body.challenge,
            topic: body.topic,
            network: body.network,
            sponsorRef: body.sponsorRef,
            tier: body.tier,
            extra: body.extra,
            feature: body.feature,
            billingPref: body.billingPref
        });

        return NextResponse.json({ success: true });
        
    } catch (error) {
        console.error("Failed to save application:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
