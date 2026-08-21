import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST() {
  try {
    const { userId } = await auth();
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!secretKey) {
      return Response.json(
        { error: "Stripe is not configured." },
        { status: 500 }
      );
    }

    const snap = await adminDb
      .collection("subscriptions")
      .doc(userId)
      .get();

    const customerId = snap.data()?.stripeCustomerId;

    if (!customerId) {
      return Response.json(
        { error: "No Stripe customer found." },
        { status: 404 }
      );
    }

    const stripe = new Stripe(secretKey);

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: "https://www.tradenestxacademy.com/",
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("STRIPE PORTAL ERROR:", error);

    return Response.json(
      { error: "Unable to open billing portal." },
      { status: 500 }
    );
  }
}