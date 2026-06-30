"use server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function postComment(videoId, text) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  
  const dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } });
  if (!dbUser) throw new Error("User not found");

  if (!text || text.trim().length === 0) {
    throw new Error("Comment cannot be empty");
  }

  await prisma.comment.create({
    data: {
      text: text.trim(),
      userId: dbUser.id,
      videoId: videoId
    }
  });

  revalidatePath(`/dashboard/videos/${videoId}`);
  return { success: true };
}

export async function deleteComment(commentId, videoId) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  
  const dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } });
  if (!dbUser) throw new Error("User not found");

  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) throw new Error("Comment not found");

  // Only the author or an admin can delete a comment
  if (comment.userId !== dbUser.id && !dbUser.isAdmin) {
    throw new Error("Forbidden");
  }

  await prisma.comment.delete({ where: { id: commentId } });

  revalidatePath(`/dashboard/videos/${videoId}`);
  return { success: true };
}
