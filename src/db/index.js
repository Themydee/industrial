import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Required for Next.js to not throw error during build if env var is missing
const connectionString = process.env.DATABASE_URL || 'postgres://placeholder';

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });
