import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import CheckoutButton from "@/components/CheckoutButton";
import { SubscriptionPlan } from "@/lib/types";

const steps = [
  { title: "1. Je clique", text: "Le senior appuie sur le bouton Je vais bien depuis un écran très simple." },
  { title: "2. Je rassure", text: "Un message de confirmation s'affiche immédiatement." },
  { title: "3. Je garde le lien", text: "Le senior accède facilement à ses proches depuis de grandes cartes lisibles." },
];

type Plan = {
  name: "Découverte" | SubscriptionPlan;
  price: string;
  description: string;
  features: string[];
};

const plans: Plan[] = [
  { name: "Découverte", price: "Gratuit", description: "Pour tester l'application avec une configuration simple.", features: ["1 senior", "1 aidant", "3 contacts", "Bouton Je vais bien"] },
  { name: "Famille", price: "4,90 € / mois", description: "Pour une utilisation familiale plus complète.", features: ["Plusieurs aidants", "Jusqu'à 6 contacts", "Suivi simple", "Contacts favoris"] },
  { name: "Sérénité", price: "9,90 € / mois", description: "Avec accompagnement par Virginie Assistance Numérique.", features: ["Installation accompagnée", "Configuration", "Explication", "Suivi personnalisé"] },
];

function isPaidPlan(planName: Plan["name"]): planName is SubscriptionPlan {
  return planName === "Famille" || planName === "Sérénité";
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F7FBF9]">
      <AppHeader />

      <section className="relative overflow-hidden px-4 py-16 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#DCEBE6,transparent_35%),radial-gradient(circle_at_bottom_right,#EAF6F2,transparent_40%)]" />
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 inline-block rounded-full border border-[#DCEBE6] bg-white px-4 py-2 text-sm font-semibold text-[#4F9F8A] shadow-sm">
            Application pensée pour les seniors et leurs proches
          </p>

          <h1 className="text-5xl font-bold tracking-tight text-[#263238] sm:text-6xl">Je vais bien</h1>

          <p className="mx-auto mt-5 max-w-2xl text-2xl font-semibold text-[#4F9F8A] sm:text-3xl">
            Je vais bien, tout va bien, je rassure les miens.
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#607D8B]">
            Une application ultra simple pour aider les seniors à garder le lien avec leur famille, avec un écran clair et de très gros boutons.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/senior" className="rounded-full bg-[#4F9F8A] px-8 py-4 text-lg font-semibold text-white shadow hover:bg-[#428B78]">
              Ouvrir l’espace senior
            </Link>
            <Link href="/installation" className="rounded-full border border-[#DCEBE6] bg-white px-8 py-4 text-lg font-semibold text-[#4F9F8A] shadow hover:bg-[#EAF6F2]">
              Installer l’application
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 pb-16 md:grid-cols-3">
        {steps.map((step) => (
          <div key={step.title} className="rounded-3xl border border-[#DCEBE6] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#263238]">{step.title}</h2>
            <p className="mt-3 leading-7 text-[#607D8B]">{step.text}</p>
          </div>
        ))}
      </section>

      <section className="bg-white/70 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#263238]">Des offres simples</h2>
            <p className="mx-auto mt-3 max-w-2xl text-[#607D8B]">
              Choisissez une formule ou demandez une activation accompagnée.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.name} className="rounded-3xl border border-[#DCEBE6] bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-[#263238]">{plan.name}</h3>
                <p className="mt-3 text-2xl font-bold text-[#4F9F8A]">{plan.price}</p>
                <p className="mt-3 min-h-14 text-[#607D8B]">{plan.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-[#607D8B]">
                  {plan.features.map((feature) => <li key={feature}>✓ {feature}</li>)}
                </ul>
                {isPaidPlan(plan.name) ? (
                  <CheckoutButton planName={plan.name} label={`Choisir ${plan.name}`} />
                ) : (
                  <Link href="/activation" className="mt-6 flex min-h-12 items-center justify-center rounded-full bg-[#4F9F8A] px-5 font-semibold text-white hover:bg-[#428B78]">
                    Demander l’activation
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <AppFooter />
    </main>
  );
}
