"use server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function submitOnboarding(data) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  await prisma.user.create({
    data: {
      clerkId: user.id,
      email: user.emailAddresses[0].emailAddress,
      name: data.name,
      phone: data.phone,
      country: data.country,
      state: data.state,
      role: data.role,
      sector: data.sector,
      stage: data.stage,
      source: data.source,
      why: data.why,
      challenge: data.challenge,
      topic: data.topic,
      network: data.network,
      sponsorRef: data.sponsorRef,
      feature: data.feature,
      extra: data.extra,
      tier: (data.tier || "").includes("Builder") ? "BUILDER" 
          : (data.tier || "").includes("Catalyst") ? "CATALYST" 
          : (data.tier || "").includes("Vanguard") ? "VANGUARD" 
          : "FOUNDATION"
    }
  });

  revalidatePath('/dashboard');
  return { success: true };
}
