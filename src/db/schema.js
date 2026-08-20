import { pgTable, serial, text, timestamp, varchar, boolean, integer, numeric } from "drizzle-orm/pg-core";

export const applications = pgTable('applications', {
    id: serial('id').primaryKey(),
    type: varchar('type', { length: 50 }).notNull(),
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

export const members = pgTable('members', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    phone: varchar('phone', { length: 50 }),
    passwordHash: text('password_hash').notNull(),
    tier: varchar('tier', { length: 50 }).notNull(), // Foundation, Builder, Catalyst, Vanguard
    subscriptionStatus: varchar('subscription_status', { length: 50 }).default('Active'),
    billingCycle: varchar('billing_cycle', { length: 50 }), // monthly, annual
    directoryOptIn: boolean('directory_opt_in').default(true),
    profileData: text('profile_data'), // JSON stringified or detailed text
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const payments = pgTable('payments', {
    id: serial('id').primaryKey(),
    memberId: integer('member_id').references(() => members.id),
    transactionRef: varchar('transaction_ref', { length: 255 }).notNull(),
    amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
    currency: varchar('currency', { length: 10 }).notNull(), // USD, NGN
    provider: varchar('provider', { length: 50 }), // Stripe, Paystack
    status: varchar('status', { length: 50 }).notNull(),
    type: varchar('type', { length: 50 }), // recurring, one-off
    tierPaidFor: varchar('tier_paid_for', { length: 50 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const content = pgTable('content', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    body: text('body'),
    type: varchar('type', { length: 50 }).notNull(), // article, transcript, digest
    minTierRequired: varchar('min_tier_required', { length: 50 }).notNull(),
    fileUrl: text('file_url'),
    publishedAt: timestamp('published_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const deals = pgTable('deals', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    deadline: timestamp('deadline'),
    contactLink: text('contact_link'),
    minTierRequired: varchar('min_tier_required', { length: 50 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const events = pgTable('events', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    date: timestamp('date').notNull(),
    price: numeric('price', { precision: 12, scale: 2 }).default('0'),
    minTierRequired: varchar('min_tier_required', { length: 50 }).notNull(),
    status: varchar('status', { length: 50 }).default('Upcoming'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const eventRegistrations = pgTable('event_registrations', {
    id: serial('id').primaryKey(),
    eventId: integer('event_id').references(() => events.id).notNull(),
    memberId: integer('member_id').references(() => members.id).notNull(),
    paymentStatus: varchar('payment_status', { length: 50 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const sponsorEnquiries = pgTable('sponsor_enquiries', {
    id: serial('id').primaryKey(),
    companyName: varchar('company_name', { length: 255 }).notNull(),
    contactName: varchar('contact_name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    message: text('message'),
    status: varchar('status', { length: 50 }).default('New'), // New, Contacted, In Progress, Closed
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const emailLogs = pgTable('email_logs', {
    id: serial('id').primaryKey(),
    recipient: varchar('recipient', { length: 255 }).notNull(),
    subject: varchar('subject', { length: 255 }).notNull(),
    type: varchar('type', { length: 50 }), // welcome, receipt, reminder, etc.
    status: varchar('status', { length: 50 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const videos = pgTable('videos', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    youtubeUrl: text('youtube_url').notNull(),
    youtubeId: varchar('youtube_id', { length: 100 }).notNull(),
    episodeNumber: varchar('episode_number', { length: 50 }),
    minTierRequired: varchar('min_tier_required', { length: 50 }).default('Foundation').notNull(),
    status: varchar('status', { length: 50 }).default('Published'),
    publishedAt: timestamp('published_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

