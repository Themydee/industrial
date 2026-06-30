import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import Nav from '@/components/sections/Nav';
import { T } from '@/lib/constants';

export const dynamic = "force-dynamic";

export default async function MemberDirectory() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  const dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } });
  if (!dbUser) redirect('/dashboard');

  // Determine Active Tier
  let activeTier = "FOUNDATION";
  const sub = await prisma.subscription.findFirst({
    where: { userId: dbUser.id, status: 'active' },
    orderBy: { createdAt: 'desc' }
  });
  if (sub) activeTier = sub.tier;

  const TIER_LEVELS = { "FOUNDATION": 1, "BUILDER": 2, "CATALYST": 3, "VANGUARD": 4 };
  const userLevel = TIER_LEVELS[activeTier] || 1;

  if (userLevel < 3 && !dbUser.isAdmin) {
    return (
      <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>
        <Nav />
        <div style={{ paddingTop: 100, paddingBottom: 80, paddingLeft: 48, paddingRight: 48, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Catalyst Exclusive</h1>
          <p style={{ color: T.mid, marginBottom: 32 }}>The Member Directory is only available to Catalyst and Vanguard members.</p>
        </div>
      </div>
    );
  }

  // Fetch all users who are on Catalyst or Vanguard (this is a simplified check, in reality we'd join with active subscriptions)
  // For now, since we only set activeTier in Subscriptions, we need to query users with active subs >= Catalyst
  const activeSubs = await prisma.subscription.findMany({
    where: {
      status: 'active',
      tier: { in: ['CATALYST', 'VANGUARD'] }
    },
    include: { user: true }
  });

  // Also include admins for testing/networking
  const admins = await prisma.user.findMany({ where: { isAdmin: true } });
  
  // Merge and deduplicate
  const directoryMap = new Map();
  activeSubs.forEach(s => directoryMap.set(s.user.id, { ...s.user, activeTier: s.tier }));
  admins.forEach(a => {
    if (!directoryMap.has(a.id)) directoryMap.set(a.id, { ...a, activeTier: 'VANGUARD' }); // Give admins vanguard badge visually
  });

  const directoryUsers = Array.from(directoryMap.values());

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>
      <Nav />
      <div style={{ paddingTop: 100, paddingBottom: 80, paddingLeft: 48, paddingRight: 48 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: T.dark, marginBottom: 8 }}>Member Directory</h1>
          <p style={{ fontSize: 16, color: T.mid, marginBottom: 48 }}>Connect with fellow Catalyst and Vanguard members across the continent.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {directoryUsers.map(u => (
              <div key={u.id} style={{ background: T.white, padding: 24, borderRadius: 16, border: `1px solid ${T.ruleLt}`, boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: T.primaryLight, color: T.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700 }}>
                    {u.name ? u.name.charAt(0).toUpperCase() : u.email.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: u.activeTier === 'VANGUARD' ? T.dark : T.primary, background: u.activeTier === 'VANGUARD' ? "#fde047" : T.primaryLight, padding: "4px 8px", borderRadius: 12, letterSpacing: "0.05em" }}>
                    {u.activeTier}
                  </div>
                </div>
                
                <h3 style={{ fontSize: 18, fontWeight: 700, color: T.dark, marginBottom: 4 }}>{u.name || "Anonymous Member"}</h3>
                <div style={{ fontSize: 14, color: T.mid, marginBottom: 12 }}>{u.role || "Professional"} · {u.sector || "Industry"}</div>
                
                {u.country && (
                  <div style={{ display: "inline-block", fontSize: 12, fontWeight: 600, color: T.grey, border: `1px solid ${T.rule}`, padding: "2px 8px", borderRadius: 4, marginBottom: 16 }}>
                    📍 {u.state ? `${u.state}, ` : ""}{u.country}
                  </div>
                )}
                
                <div style={{ fontSize: 13, color: T.primary, fontWeight: 600, cursor: "pointer" }}>
                  Connect →
                </div>
              </div>
            ))}
          </div>

          {directoryUsers.length === 0 && (
            <div style={{ textAlign: "center", padding: 64, color: T.mid }}>
              No members found in this tier yet.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
