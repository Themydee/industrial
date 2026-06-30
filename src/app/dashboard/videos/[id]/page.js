import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import Nav from '@/components/sections/Nav';
import Link from 'next/link';
import { T } from '@/lib/constants';
import VideoClientPlayer from '@/components/ui/VideoClientPlayer';
import CommentSection from '@/components/ui/CommentSection';

const TIER_LEVELS = {
  "FOUNDATION": 1,
  "BUILDER": 2,
  "CATALYST": 3,
  "VANGUARD": 4
};

export default async function VideoPlayer({ params }) {
  const { id } = await params;
  const user = await currentUser();

  if (!user) redirect('/sign-in');

  const dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } });
  if (!dbUser) redirect('/dashboard');

  const video = await prisma.video.findUnique({ 
    where: { id },
    include: {
      comments: {
        orderBy: { createdAt: 'desc' },
        include: { user: true }
      }
    }
  });
  if (!video) return <div style={{ padding: 48, textAlign: "center" }}>Video not found.</div>;

  // Determine Active Tier
  let activeTier = "FOUNDATION";
  const sub = await prisma.subscription.findFirst({
    where: { userId: dbUser.id, status: 'active' },
    orderBy: { createdAt: 'desc' }
  });
  if (sub) activeTier = sub.tier;

  const userLevel = TIER_LEVELS[activeTier] || 1;
  const requiredLevel = TIER_LEVELS[video.tier] || 1;

  const hasAccess = userLevel >= requiredLevel;

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>
      <Nav />
      <div style={{ paddingTop: 100, paddingBottom: 80, paddingLeft: 48, paddingRight: 48 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          
          <Link href="/dashboard" style={{ display: "inline-block", marginBottom: 24, fontSize: 14, color: T.primary, textDecoration: "none", fontWeight: 600 }}>
            ← Back to Dashboard
          </Link>

          {!hasAccess ? (
            <div style={{ background: T.dark, color: T.white, padding: 64, borderRadius: 16, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
              <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Unlock {video.tier} Tier</h1>
              <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 32 }}>
                This video is exclusive to the <strong>{video.tier}</strong> tier. You are currently on the {activeTier} tier.
              </p>
              <Link href="/dashboard" style={{ background: T.primary, color: T.white, padding: "12px 24px", borderRadius: 8, textDecoration: "none", fontWeight: 600 }}>
                Upgrade Now
              </Link>
            </div>
          ) : (
            <>
              <VideoClientPlayer video={video} />
              <CommentSection videoId={video.id} comments={video.comments} currentUserId={dbUser.id} isAdmin={dbUser.isAdmin} />
            </>
          )}

        </div>
      </div>
    </div>
  );
}
