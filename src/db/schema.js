import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const applications = pgTable('applications', {
    id: serial('id').primaryKey(),
    type: varchar('type', { length: 50 }).notNull(), // 'community' or 'membership'
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 50 }).notNull(),
    country: varchar('country', { length: 100 }),
    state: varchar('state', { length: 100 }),
    age: varchar('age', { length: 50 }),
    role: varchar('role', { length: 255 }),
    sector: varchar('sector', { length: 255 }),
    stage: varchar('stage', { length: 255 }),
    source: varchar('source', { length: 255 }),
    why: text('why'),
    challenge: text('challenge'),
    topic: varchar('topic', { length: 255 }),
    network: varchar('network', { length: 50 }),
    sponsorRef: varchar('sponsor_ref', { length: 255 }),
    tier: varchar('tier', { length: 100 }),
    extra: text('extra'),
    feature: varchar('feature', { length: 100 }),
    billingPref: varchar('billing_pref', { length: 50 }),
    status: varchar('status', { length: 50 }).default('Pending').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const adminUsers = pgTable('admin_users', {
    id: serial('id').primaryKey(),
    username: varchar('username', { length: 255 }).notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});
