import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const isStripeConfigured = Boolean(stripeSecretKey);

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2026-02-25.clover",
      typescript: true,
    })
  : null;

export const stripePriceIds = {
  Famille: process.env.STRIPE_PRICE_FAMILLE,
  Sérénité: process.env.STRIPE_PRICE_SERENITE,
} as const;
