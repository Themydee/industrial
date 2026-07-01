const { db } = require('./src/db');
const { members, applications } = require('./src/db/schema');
const { eq } = require('drizzle-orm');

async function fix() {
  await db.update(members).set({ subscriptionStatus: 'Pending Review' }).where(eq(members.email, 'ngozi@wto.org'));
  await db.update(applications).set({ status: 'Pending' }).where(eq(applications.email, 'ngozi@wto.org'));
  console.log("Fixed Ngozi");
  process.exit(0);
}
fix();
