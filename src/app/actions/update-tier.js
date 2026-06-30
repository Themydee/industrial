"use server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateTier(newTier) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const validTiers = ["FOUNDATION", "BUILDER", "CATALYST", "VANGUARD"];
  if (!validTiers.includes(newTier)) throw new Error("Invalid tier");

  await prisma.user.update({
    where: { clerkId: user.id },
    data: { tier: newTier }
  });

  revalidatePath("/dashboard");
  return { success: true };
}
