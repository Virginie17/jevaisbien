import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { SubscriptionPlan } from "@/lib/types";

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe non configuré." }, { status: 500 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook Stripe non configuré." }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Signature Stripe absente." }, { status: 400 });
  }

  const rawBody = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Signature invalide";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const planName = session.metadata?.plan_name as SubscriptionPlan | undefined;
    const userEmail = session.customer_details?.email || session.customer_email;

    if (supabaseAdmin && planName && userEmail) {
      const amount = typeof session.amount_total === "number" ? session.amount_total / 100 : null;

      const { error } = await supabaseAdmin.from("subscriptions").insert({
        user_email: userEmail,
        plan_name: planName,
        status: "active",
        stripe_session_id: session.id,
        amount,
        started_at: new Date().toISOString(),
      });

      if (error) {
        console.warn(`[Stripe webhook] Impossible d'enregistrer l'abonnement : ${JSON.stringify(error)}`);
      }
    }
  }

  return NextResponse.json({ received: true });
}
