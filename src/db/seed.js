import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { adminUsers } from './schema.js';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function seed() {
    if (!process.env.DATABASE_URL) {
        console.error("❌ DATABASE_URL is not set in .env.local");
        process.exit(1);
    }

    const sql = neon(process.env.DATABASE_URL);
    const db = drizzle(sql);

    const username = "admin";
    const password = "password123";

    console.log(`Creating admin user: ${username}`);
    
    const hash = await bcrypt.hash(password, 10);
    
    try {
        await db.insert(adminUsers).values({
            username: username,
            passwordHash: hash
        });
        console.log("✅ Admin user created successfully.");
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
        console.log("\n⚠️ PLEASE CHANGE THIS PASSWORD LATER!");
    } catch (e) {
        console.error("❌ Failed to create admin user. They might already exist.");
        console.error(e.message);
    }
    
    process.exit(0);
}

seed();
