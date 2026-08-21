import Stripe from "stripe";
import { headers } from "next/headers";
import { adminDb } from "@/lib/firebaseAdmin";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured.");
  return new Stripe(key);
}

async function saveSubscription(subscription: Stripe.Subscription) {
  const userId = subscription.metadata.clerkUserId;
  if (!userId) return;

  await adminDb.collection("subscriptions").doc(userId).set(
    {
      status: subscription.status,
      stripeCustomerId: subscription.customer,
      stripeSubscriptionId: subscription.id,
      priceId: subscription.items.data[0]?.price.id ?? null,
      currentPeriodEnd: subscription.items.data[0]?.current_period_end ?? null,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

export async function POST(req: Request) {
  try {
    const stripe = getStripe();
    const body = await req.text();
    const signature = (await headers()).get("stripe-signature");
    const secret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature || !secret) {
      return new Response("Webhook not configured.", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    if (
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      await saveSubscription(event.data.object as Stripe.Subscription);
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error("STRIPE WEBHOOK ERROR:", error);
    return new Response("Webhook error.", { status: 400 });
  }
}