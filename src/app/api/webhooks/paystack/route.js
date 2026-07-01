import { db } from '@/db';
import { members, payments } from '@/db/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

// Placeholder for Paystack Secret
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || 'sk_placeholder';

export async function POST(req) {
    try {
        const body = await req.text();
        const signature = req.headers.get('x-paystack-signature');

        // Verify the event is from Paystack
        const hash = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY).update(body).digest('hex');
        
        // Disable signature check if we are using the placeholder
        if (PAYSTACK_SECRET_KEY !== 'sk_placeholder' && hash !== signature) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }
        
        const event = JSON.parse(body);

        if (event.event === 'charge.success') {
            const data = event.data;
            const memberEmail = data.customer.email;
            const amount = data.amount / 100; // Paystack amounts are in kobo
            const currency = data.currency;
            
            // Extract the tier they paid for
            const tierPaidFor = data.metadata?.tier || 'Builder'; 

            // Find member by email
            const memberRecord = await db.select().from(members).where(eq(members.email, memberEmail)).limit(1);

            if (memberRecord.length > 0) {
                const memberId = memberRecord[0].id;

                // Record the payment
                await db.insert(payments).values({
                    memberId: memberId,
                    transactionRef: data.reference,
                    amount: amount.toString(),
                    currency,
                    provider: 'Paystack',
                    status: 'Success',
                    type: data.plan ? 'recurring' : 'one-off',
                    tierPaidFor
                });

                // Upgrade the member
                await db.update(members)
                    .set({ tier: tierPaidFor, subscriptionStatus: 'Active' })
                    .where(eq(members.id, memberId));

                // TODO: Trigger "Payment Received" email workflow here
            }
        } else if (event.event === 'subscription.disable') {
            // Handle cancellations
        } else if (event.event === 'invoice.payment_failed') {
            // Handle failed renewals
        }

        return NextResponse.json({ received: true });
        
    } catch (error) {
        console.error("Paystack webhook error:", error);
        return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
    }
}
