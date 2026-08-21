import Stripe from "stripe";
import { auth, currentUser } from "@clerk/nextjs/server";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;

  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  return new Stripe(key);
}

export async function POST() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const priceId = process.env.STRIPE_PRICE_ID;

    if (!priceId) {
      return Response.json(
        { error: "STRIPE_PRICE_ID is not configured." },
        { status: 500 }
      );
    }

    const stripe = getStripe();
    const email = user.primaryEmailAddress?.emailAddress;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      client_reference_id: userId,
      customer_email: email,
      metadata: { clerkUserId: userId },
      subscription_data: {
        metadata: { clerkUserId: userId },
      },
      success_url:
        "https://www.tradenestxacademy.com/?subscription=success",
      cancel_url:
        "https://www.tradenestxacademy.com/?subscription=cancelled",
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("STRIPE CHECKOUT ERROR:", error);

    return Response.json(
      { error: "Unable to start checkout." },
      { status: 500 }
    );
  }
}