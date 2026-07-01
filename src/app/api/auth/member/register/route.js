import { db } from '@/db';
import { members } from '@/db/schema';
import { setMemberSession } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, password, tier } = body;

        if (!name || !email || !password || !tier) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const existing = await db.select().from(members).where(eq(members.email, email)).limit(1);
        
        if (existing.length > 0) {
            return NextResponse.json({ error: "Account already exists" }, { status: 400 });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        
        const [newUser] = await db.insert(members).values({
            name,
            email,
            passwordHash,
            tier,
            subscriptionStatus: 'Active', // Mocking this for registration for now until Stripe/Paystack is wired
        }).returning();

        // Create secure session
        await setMemberSession(newUser.id, newUser.tier);

        return NextResponse.json({ success: true, redirect: "/dashboard" });
        
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
