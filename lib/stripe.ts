import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const isStripeConfigured = Boolean(stripeSecretKey);

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2025-11-17.clover",
      typescript: true,
    })
  : null;

export const stripePriceIds = {
  Famille: process.env.STRIPE_PRICE_FAMILLE,
  Sérénité: process.env.STRIPE_PRICE_SERENITE,
} as const;
