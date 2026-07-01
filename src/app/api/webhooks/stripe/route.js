import { db } from '@/db';
import { members, payments } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// Placeholder for Stripe Secret
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';

export async function POST(req) {
    try {
        const body = await req.text();
        const signature = req.headers.get('stripe-signature');

        // In a real implementation with the stripe SDK:
        // const event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
        
        // For now, we'll parse the raw JSON to scaffold the logic
        const event = JSON.parse(body);

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const memberId = session.client_reference_id;
            const amount = session.amount_total / 100; // Stripe amounts are in cents
            const currency = session.currency.toUpperCase();
            
            // Extract the tier they paid for (ideally passed in metadata)
            const tierPaidFor = session.metadata?.tier || 'Builder'; 

            if (memberId) {
                // Record the payment
                await db.insert(payments).values({
                    memberId: parseInt(memberId),
                    transactionRef: session.id,
                    amount: amount.toString(),
                    currency,
                    provider: 'Stripe',
                    status: 'Success',
                    type: session.mode === 'subscription' ? 'recurring' : 'one-off',
                    tierPaidFor
                });

                // Upgrade the member
                await db.update(members)
                    .set({ tier: tierPaidFor, subscriptionStatus: 'Active' })
                    .where(eq(members.id, parseInt(memberId)));

                // TODO: Trigger "Payment Received" email workflow here
            }
        } else if (event.type === 'invoice.payment_failed') {
            // Handle failed renewals
            const invoice = event.data.object;
            // Lookup member by Stripe customer ID and set status to 'Past Due'
            // TODO: Trigger "Payment Failed" email workflow here
        } else if (event.type === 'customer.subscription.deleted') {
            // Handle cancellations
            // Update member status to 'Cancelled'
        }

        return NextResponse.json({ received: true });
        
    } catch (error) {
        console.error("Stripe webhook error:", error);
        return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
    }
}
