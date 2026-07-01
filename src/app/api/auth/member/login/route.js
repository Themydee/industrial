import { db } from '@/db';
import { members } from '@/db/schema';
import { setMemberSession } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
        }

        const user = await db.select().from(members).where(eq(members.email, email)).limit(1);
        
        if (user.length === 0) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const isValid = await bcrypt.compare(password, user[0].passwordHash);
        
        if (!isValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        if (user[0].subscriptionStatus === 'Pending Review') {
            return NextResponse.json({ error: "Your application is still under review. You will receive an email once approved." }, { status: 403 });
        }

        if (user[0].subscriptionStatus !== 'Active' && user[0].subscriptionStatus !== 'Comped') {
            return NextResponse.json({ error: "Your subscription is not active. Please complete payment." }, { status: 403 });
        }

        // Create secure session
        await setMemberSession(user[0].id, user[0].tier);

        return NextResponse.json({ success: true, redirect: "/dashboard" });
        
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
