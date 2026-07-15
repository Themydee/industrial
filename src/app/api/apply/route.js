import { db } from '@/db';
import { applications, members } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();

        // Basic validation including password (only for paid/interested memberships)
        if (!body.type || !body.name || !body.email || !body.phone) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const rawTier = body.tier || 'Builder';
        const isPaid = !rawTier.toLowerCase().includes('foundation');

        if (isPaid && !body.password) {
            return NextResponse.json({ error: "Password is required for membership account creation" }, { status: 400 });
        }

        if (isPaid) {
            const existing = await db.select().from(members).where(eq(members.email, body.email)).limit(1);
            if (existing.length > 0) {
                return NextResponse.json({ error: "Account already exists with this email" }, { status: 400 });
            }
        }

        // Insert into applications
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

        // Determine initial subscription status
        let initialStatus = 'Pending Review'; // ALL tiers require admin approval now
        let assignedTier = 'Builder';

        if (rawTier.toLowerCase().includes('builder')) {
            assignedTier = 'Builder';
        } else if (rawTier.toLowerCase().includes('catalyst')) {
            assignedTier = 'Catalyst';
        } else if (rawTier.toLowerCase().includes('vanguard')) {
            assignedTier = 'Vanguard';
        } else if (rawTier.toLowerCase().includes('foundation')) {
            assignedTier = 'Foundation';
        }

        if (isPaid) {
            const passwordHash = await bcrypt.hash(body.password, 10);

            // Insert into members
            await db.insert(members).values({
                name: body.name,
                email: body.email,
                phone: body.phone,
                passwordHash,
                tier: assignedTier,
                subscriptionStatus: initialStatus,
            });
        }

        return NextResponse.json({ success: true });
        
    } catch (error) {
        console.error("Failed to save application:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
