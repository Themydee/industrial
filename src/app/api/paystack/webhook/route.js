import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const rawBody = await req.text();
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
      .update(rawBody)
      .digest("hex");

    if (hash !== req.headers.get("x-paystack-signature")) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    if (event.event === "charge.success") {
      const { metadata, reference } = event.data;
      
      if (metadata && metadata.userId) {
        // Find existing subscription or create new
        const existingSub = await prisma.subscription.findFirst({
          where: { userId: metadata.userId }
        });

        if (existingSub) {
          await prisma.subscription.update({
            where: { id: existingSub.id },
            data: {
              status: "active",
              paystackId: reference,
              tier: metadata.tier || "BUILDER",
              updatedAt: new Date(),
            }
          });
        } else {
          await prisma.subscription.create({
            data: {
              userId: metadata.userId,
              status: "active",
              paystackId: reference,
              tier: metadata.tier || "BUILDER",
            }
          });
        }
      }
    }

    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
