"use server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const TIER_PRICES = {
  BUILDER: 21000 * 100, // Paystack uses kobo (amounts * 100)
  CATALYST: 105000 * 100,
  VANGUARD: 700000 * 100,
};

export async function initializePayment() {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id }
  });

  if (!dbUser) throw new Error("User profile not found");
  if (dbUser.tier === "FOUNDATION") throw new Error("Foundation tier is free");

  const amount = TIER_PRICES[dbUser.tier];
  if (!amount) throw new Error("Invalid tier pricing");

  // Call Paystack API
  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: dbUser.email,
      amount: amount,
      metadata: {
        userId: dbUser.id,
        tier: dbUser.tier,
      },
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?payment=success`,
    }),
  });

  const data = await response.json();
  
  if (!data.status) {
    console.error("Paystack Error:", data);
    throw new Error(data.message || "Failed to initialize payment");
  }

  return { authorization_url: data.data.authorization_url };
}
