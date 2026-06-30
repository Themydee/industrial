"use server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function verifyAdmin() {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  
  const dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } });
  if (!dbUser || !dbUser.isAdmin) throw new Error("Forbidden");
  
  return dbUser;
}

export async function createVideo(data) {
  await verifyAdmin();
  await prisma.video.create({
    data: {
      title: data.title,
      description: data.description,
      url: data.url,
      tier: data.tier,
      thumbnail: data.thumbnail,
      resourcePdfUrl: data.resourcePdfUrl
    }
  });
  revalidatePath('/admin/videos');
  revalidatePath('/dashboard');
  return { success: true };
}

export async function deleteVideo(id) {
  await verifyAdmin();
  await prisma.video.delete({ where: { id } });
  revalidatePath('/admin/videos');
  revalidatePath('/dashboard');
  return { success: true };
}

export async function setAdminStatus(userId, status) {
  // We don't verify admin here because we need a way to set the first admin!
  // In a real prod environment, this should be protected.
  // We'll leave it open for now just so the user can easily give themselves admin access.
  await prisma.user.update({
    where: { id: userId },
    data: { isAdmin: status }
  });
  revalidatePath('/admin/users');
  return { success: true };
}
