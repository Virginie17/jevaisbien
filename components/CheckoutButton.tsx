"use client";

import { useState } from "react";
import { SubscriptionPlan } from "@/lib/types";

type CheckoutButtonProps = {
  planName: SubscriptionPlan;
  label?: string;
};

export default function CheckoutButton({ planName, label }: CheckoutButtonProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planName, email: email || undefined }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Redirection impossible.");
      }

      window.location.href = data.url;
    } catch (checkoutError) {
      const message = checkoutError instanceof Error ? checkoutError.message : "Redirection impossible.";
      setError(message);
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 space-y-3">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="w-full rounded-2xl border border-[#DCEBE6] px-4 py-3 text-sm text-[#263238] outline-none focus:border-[#4F9F8A] focus:ring-4 focus:ring-[#B9DED3]/50"
      />
      <button
        type="button"
        onClick={handleCheckout}
        disabled={isLoading}
        className="flex min-h-12 w-full items-center justify-center rounded-full bg-[#4F9F8A] px-5 font-semibold text-white hover:bg-[#428B78] disabled:opacity-70"
      >
        {isLoading ? "Redirection..." : label ?? `Choisir ${planName}`}
      </button>
      {error && <p className="rounded-2xl bg-[#FFF3E0] px-4 py-3 text-sm font-semibold text-[#C77700]">{error}</p>}
    </div>
  );
}
