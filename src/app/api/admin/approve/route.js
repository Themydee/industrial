import { db } from "@/db";
import { applications, members } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(req) {
    try {
        const body = await req.json();
        const { applicationId, email, paymentLink } = body;

        if (!applicationId || !email) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 1. Mark application as Approved
        await db.update(applications)
            .set({ status: "Approved" })
            .where(eq(applications.id, applicationId));

        // 2. Find the member record associated with this email and update status
        const memberRecord = await db.select().from(members).where(eq(members.email, email)).limit(1);
        
        let assignedTier = "Builder";
        if (memberRecord.length > 0) {
            const member = memberRecord[0];
            assignedTier = member.tier;
            // If they are Foundation (Free), they become Active immediately. Paid tiers become Pending Payment.
            const newStatus = (member.tier === 'Foundation' || member.tier === 'foundation') ? 'Active' : 'Pending Payment';
            
            await db.update(members)
                .set({ 
                    subscriptionStatus: newStatus,
                    profileData: paymentLink || null
                })
                .where(eq(members.id, member.id));
        }

        // 3. Send the approval email with payment link instructions
        const emailHtml = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
                <h2>Your ${assignedTier} Application is Approved</h2>
                <p>Congratulations!</p>
                <p>The Industrialise Africa team has reviewed your application and we are thrilled to invite you to join the ${assignedTier} tier.</p>
                <p>To finalize your onboarding and activate your dashboard access, please complete your payment using the secure link below.</p>
                <a href="${paymentLink || 'https://industrialiseafrica.com/login'}" style="display: inline-block; padding: 12px 24px; background: #c61c28; color: white; text-decoration: none; font-weight: bold; margin-top: 16px;">Complete Payment</a>
            </div>
        `;
        
        await sendEmail(email, `Your ${assignedTier} Application is Approved!`, emailHtml, "approval");

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to approve application:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
