import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { T } from '@/lib/constants';
import Nav from '@/components/sections/Nav';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import OnboardingModal from '@/components/ui/OnboardingModal';
import PaystackButton from '@/components/ui/PaystackButton';
import UpgradeTierForm from '@/components/ui/UpgradeTierForm';

export default async function Dashboard() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  let dbUser = null;
  try {
    dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } });
  } catch (e) {
    console.warn("Database not connected yet", e);
  }

  const needsOnboarding = !dbUser;
  const tier = dbUser?.tier || "FOUNDATION";

  let activeTier = "FOUNDATION";
  if (dbUser) {
    const sub = await prisma.subscription.findFirst({
      where: { userId: dbUser.id, status: 'active' },
      orderBy: { createdAt: 'desc' }
    });
    if (sub) activeTier = sub.tier;
  }

  // Check access levels based on PAID tier
  const isBuilder = ["BUILDER", "CATALYST", "VANGUARD"].includes(activeTier);
  const isCatalyst = ["CATALYST", "VANGUARD"].includes(activeTier);

  const videos = await prisma.video.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const deals = await prisma.deal.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const TIER_LEVELS = { "FOUNDATION": 1, "BUILDER": 2, "CATALYST": 3, "VANGUARD": 4 };
  const userLevel = TIER_LEVELS[activeTier] || 1;

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>
      {needsOnboarding && <OnboardingModal userFirstName={user.firstName} userEmail={user.emailAddresses[0]?.emailAddress} />}
      <Nav />
      <div style={{ paddingTop: 100, paddingBottom: 80, paddingLeft: 48, paddingRight: 48 }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          
          <header style={{ marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <h1 style={{ fontSize: 32, fontWeight: 700, color: T.dark, marginBottom: 8, letterSpacing: "-0.01em" }}>
                Welcome, {user.firstName || "Member"}
              </h1>
              <p style={{ fontSize: 16, color: T.mid }}>
                Here is your Industrialise Africa command center.
              </p>
            </div>
            <div style={{ padding: "8px 16px", background: T.white, border: `1px solid ${T.ruleLt}`, borderRadius: "20px", fontSize: 13, fontWeight: 600, color: T.primary }}>
              Active Tier: {activeTier}
            </div>
          </header>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 32 }}>
            {/* Left Column: Content */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              
              {/* Podcasts & Videos Section */}
              <section style={{ background: T.white, padding: 32, borderRadius: 16, border: `1px solid ${T.ruleLt}` }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: T.dark, marginBottom: 24 }}>Podcasts & Video Library</h2>
                
                {videos.length === 0 ? (
                  <p style={{ color: T.mid, fontSize: 14 }}>No videos available yet.</p>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    {videos.map(video => {
                      const requiredLevel = TIER_LEVELS[video.tier] || 1;
                      const hasAccess = userLevel >= requiredLevel;
                      const displayThumb = video.thumbnail || (video.url.includes("cloudinary.com") ? video.url.replace(".mp4", ".jpg").replace(".webm", ".jpg") : null);

                      return (
                        <div key={video.id} style={{ border: `1px solid ${T.ruleLt}`, borderRadius: 12, overflow: "hidden", opacity: hasAccess ? 1 : 0.6 }}>
                          <div style={{ height: 140, background: "#E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                            {!hasAccess && <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, zIndex: 10 }}>🔒</div>}
                            {displayThumb ? (
                              <img src={displayThumb} alt={video.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            ) : (
                              <div style={{ width: 48, height: 48, background: T.white, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>▶</div>
                            )}
                          </div>
                          <div style={{ padding: 16 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: hasAccess ? T.primary : T.grey, textTransform: "uppercase" }}>
                              {hasAccess ? "Unlocked" : `${video.tier} Exclusive`}
                            </span>
                            <h3 style={{ fontSize: 15, fontWeight: 600, color: T.dark, margin: "4px 0 8px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {video.title}
                            </h3>
                            <Link href={`/dashboard/videos/${video.id}`} style={{ fontSize: 13, fontWeight: 600, color: T.primary, textDecoration: "none" }}>
                              {hasAccess ? "Watch Now →" : "Upgrade to Watch →"}
                            </Link>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </section>

              {/* Deal Board Section */}
              {userLevel >= 3 && (
                <div style={{ background: T.white, border: `1px solid ${T.ruleLt}`, borderRadius: 16, padding: 32, marginTop: 48 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: T.dark }}>Catalyst Deal Board</h2>
                    <div style={{ fontSize: 12, fontWeight: 600, color: T.primary, background: T.primaryLight, padding: "4px 12px", borderRadius: 16 }}>Exclusive</div>
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {deals.length === 0 ? (
                      <div style={{ padding: 24, textAlign: "center", border: `1px dashed ${T.ruleLt}`, borderRadius: 8, color: T.mid }}>
                        No active deals at the moment.
                      </div>
                    ) : (
                      deals.map(deal => {
                        const reqLevel = TIER_LEVELS[deal.tier] || 1;
                        const canAccessDeal = userLevel >= reqLevel;
                        if (!canAccessDeal) return null; // Hide if they somehow see it but don't have access

                        return (
                          <div key={deal.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "#F8FAFC", borderRadius: 8, border: "1px solid #E2E8F0" }}>
                            <div>
                              <div style={{ fontSize: 15, fontWeight: 600, color: T.dark, marginBottom: 4 }}>{deal.title}</div>
                              <div style={{ fontSize: 13, color: T.mid }}>{deal.description}</div>
                              {deal.deadline && (
                                <div style={{ fontSize: 12, color: T.grey, marginTop: 8, fontWeight: 500 }}>
                                  Deadline: {new Date(deal.deadline).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                            {deal.url && (
                              <Link href={deal.url} target="_blank" style={{ padding: "8px 16px", background: T.white, border: `1px solid ${T.rule}`, borderRadius: 6, fontSize: 13, fontWeight: 600, color: T.dark, textDecoration: "none", whiteSpace: "nowrap" }}>
                                View Details
                              </Link>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              <div style={{ background: T.dark, padding: 32, borderRadius: 16, color: T.white }}>
                {activeTier === tier && tier !== "FOUNDATION" ? (
                  <>
                    <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Subscription Active</h3>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: 24, lineHeight: 1.6 }}>
                      You are currently on the <strong>{activeTier}</strong> tier. You have full access to your benefits.
                    </p>
                    <UpgradeTierForm currentTier={tier} />
                  </>
                ) : (
                  <>
                    <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Pay for Subscription</h3>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: 24, lineHeight: 1.6 }}>
                      Complete your payment for the <strong>{tier}</strong> tier to unlock your benefits.
                    </p>
                    <PaystackButton tier={tier} />
                    <UpgradeTierForm currentTier={tier} />
                  </>
                )}
              </div>

              <div style={{ background: T.white, padding: 24, borderRadius: 16, border: `1px solid ${T.ruleLt}` }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: T.dark, marginBottom: 16 }}>Your Profile</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ color: T.mid }}>Email</span>
                    <span style={{ color: T.dark, fontWeight: 500 }}>{user.emailAddresses[0]?.emailAddress}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ color: T.mid }}>Joined</span>
                    <span style={{ color: T.dark, fontWeight: 500 }}>{new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
