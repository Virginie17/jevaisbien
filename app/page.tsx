import Link from "next/link";
import AppHeader from "@/components/AppHeader";

const steps = [
  {
    title: "1. Je clique",
    text: "Le senior appuie sur le bouton Je vais bien depuis un écran très simple.",
  },
  {
    title: "2. Je rassure",
    text: "Un message de confirmation s'affiche immédiatement.",
  },
  {
    title: "3. Je garde le lien",
    text: "Le senior peut accéder facilement à ses proches depuis de grandes cartes lisibles.",
  },
];

const plans = [
  {
    name: "Découverte",
    price: "Gratuit",
    description: "Pour tester l'application avec une configuration simple.",
    features: ["1 senior", "1 aidant", "3 contacts", "Bouton Je vais bien"],
  },
  {
    name: "Famille",
    price: "4,90 € / mois",
    description: "Pour une utilisation familiale plus complète.",
    features: ["Plusieurs aidants", "Jusqu'à 6 contacts", "Suivi simple", "Contacts favoris"],
  },
  {
    name: "Sérénité",
    price: "9,90 € / mois",
    description: "Avec accompagnement par Virginie Assistance Numérique.",
    features: ["Installation accompagnée", "Configuration", "Explication", "Suivi personnalisé"],
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-rose-50">
      <AppHeader />

      <section className="mx-auto max-w-5xl px-4 py-16 text-center">
        <p className="mb-4 inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm">
          Application pensée pour les seniors et leurs proches
        </p>

        <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Je vais bien
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-2xl font-semibold text-rose-700 sm:text-3xl">
          Je vais bien, tout va bien, je rassure les miens.
        </p>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Une application ultra simple pour aider les seniors à garder le lien avec leur famille, avec un écran clair et de très gros boutons.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/senior" className="rounded-full bg-rose-700 px-8 py-4 text-lg font-semibold text-white shadow hover:bg-rose-800">
            Ouvrir l’espace senior
          </Link>
          <Link href="/installation" className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-rose-700 shadow hover:bg-rose-100">
            Installer l’application
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 pb-16 md:grid-cols-3">
        {steps.map((step) => (
          <div key={step.title} className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">{step.title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{step.text}</p>
          </div>
        ))}
      </section>

      <section className="bg-white/60 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">Des offres simples</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Une base commerciale claire pour présenter le service et préparer l'ajout du paiement en ligne.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.name} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-rose-100">
                <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                <p className="mt-3 text-2xl font-bold text-rose-700">{plan.price}</p>
                <p className="mt-3 min-h-14 text-slate-600">{plan.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-slate-600">
                  {plan.features.map((feature) => (
                    <li key={feature}>✓ {feature}</li>
                  ))}
                </ul>
                <Link href="/aidant" className="mt-6 flex min-h-12 items-center justify-center rounded-full bg-rose-700 px-5 font-semibold text-white hover:bg-rose-800">
                  Choisir cette formule
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
