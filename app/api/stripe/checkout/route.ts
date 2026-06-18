import { NextRequest, NextResponse } from "next/server";
import { stripe, stripePriceIds } from "@/lib/stripe";
import { SubscriptionPlan } from "@/lib/types";

const validPlans: SubscriptionPlan[] = ["Famille", "Sérénité"];

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe n’est pas encore configuré." },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const planName = body?.planName as SubscriptionPlan | undefined;
  const customerEmail = typeof body?.email === "string" ? body.email : undefined;

  if (!planName || !validPlans.includes(planName)) {
    return NextResponse.json({ error: "Offre invalide." }, { status: 400 });
  }

  const priceId = stripePriceIds[planName];

  if (!priceId) {
    return NextResponse.json(
      { error: `Le prix Stripe de l’offre ${planName} n’est pas configuré.` },
      { status: 500 }
    );
  }

  const origin = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    customer_email: customerEmail,
    success_url: `${origin}/paiement/succes?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/paiement/annule`,
    metadata: {
      plan_name: planName,
    },
    subscription_data: {
      metadata: {
        plan_name: planName,
      },
    },
    allow_promotion_codes: true,
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "Impossible de créer la session de paiement." },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: session.url });
}
