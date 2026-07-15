import { db } from '@/db';
import { emailLogs } from '@/db/schema';

// Placeholder for Resend API Key
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_placeholder';
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

/**
 * Sends an email using the Resend API and logs it in the database.
 * 
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} html - HTML body of the email
 * @param {string} type - Type of email for logging (e.g., 'welcome', 'receipt')
 */
export async function sendEmail(to, subject, html, type = 'general') {
    try {
        if (RESEND_API_KEY === 're_placeholder') {
            console.log(`[Email MOCK] To: ${to} | Subject: ${subject} | Type: ${type}`);
            
            // Log it as simulated success
            await db.insert(emailLogs).values({
                recipient: to,
                subject,
                type,
                status: 'Simulated'
            });
            return { success: true, simulated: true };
        }

        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: `Industrialise Africa <${FROM_EMAIL}>`,
                to,
                subject,
                html
            })
        });

        const data = await res.json();

        if (res.ok) {
            await db.insert(emailLogs).values({
                recipient: to,
                subject,
                type,
                status: 'Sent'
            });
            return { success: true, data };
        } else {
            throw new Error(data.message || 'Failed to send email');
        }

    } catch (error) {
        console.error("Email sending failed:", error);
        
        await db.insert(emailLogs).values({
            recipient: to,
            subject,
            type,
            status: 'Failed'
        });

        return { success: false, error: error.message };
    }
}

/**
 * Email Templates
 */
export const EmailTemplates = {
    welcomeFoundation: (name) => `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
            <h2>Welcome to Industrialise Africa, ${name}</h2>
            <p>Your Foundation access is now active. You can log in to your Member Dashboard immediately to start exploring our resources.</p>
            <a href="https://industrialiseafrica.com/login" style="display: inline-block; padding: 12px 24px; background: #c61c28; color: white; text-decoration: none; font-weight: bold; margin-top: 16px;">Log in to your Dashboard</a>
        </div>
    `,
    paymentReceived: (name, tier, amount) => `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
            <h2>Payment Received</h2>
            <p>Hi ${name},</p>
            <p>We have successfully received your payment of ${amount}. Your <strong>${tier}</strong> membership is now active!</p>
            <a href="https://industrialiseafrica.com/login" style="display: inline-block; padding: 12px 24px; background: #c61c28; color: white; text-decoration: none; font-weight: bold; margin-top: 16px;">Access your Premium Dashboard</a>
        </div>
    `,
    vanguardReview: (name) => `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
            <h2>Vanguard Application Under Review</h2>
            <p>Hi ${name},</p>
            <p>Thank you for applying for the Vanguard tier. Our team is currently reviewing your application.</p>
            <p>Since Vanguard is strictly capped at 50 members, we take time to ensure alignment with our community's goals. We will be in touch within 24 hours.</p>
        </div>
    `
};
