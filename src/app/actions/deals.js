"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createDeal(data) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  
  const dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } });
  if (!dbUser || !dbUser.isAdmin) throw new Error("Unauthorized: Admin only");

  await prisma.deal.create({
    data: {
      title: data.title,
      description: data.description,
      url: data.url,
      deadline: data.deadline ? new Date(data.deadline) : null,
      tier: data.tier,
    }
  });

  revalidatePath('/admin/deals');
  revalidatePath('/dashboard');
}

export async function deleteDeal(id) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  
  const dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } });
  if (!dbUser || !dbUser.isAdmin) throw new Error("Unauthorized: Admin only");

  await prisma.deal.delete({ where: { id } });

  revalidatePath('/admin/deals');
  revalidatePath('/dashboard');
}
