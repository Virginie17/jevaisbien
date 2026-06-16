"use client";

import AppHeader from "@/components/AppHeader";
import { SubscriptionPlan, SubscriptionRequest } from "@/lib/types";
import { saveSubscriptionRequest } from "@/lib/storage";
import { FormEvent, useState } from "react";

export default function ActivationPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    selectedPlan: "Famille" as SubscriptionPlan,
    message: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const request: SubscriptionRequest = {
      id: crypto.randomUUID(),
      ...form,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    saveSubscriptionRequest(request);
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-rose-50">
      <AppHeader />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <p className="mb-4 inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm">
          Demande d’activation
        </p>
        <h1 className="text-4xl font-bold text-slate-900">Activer une formule</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Le paiement en ligne sera bientôt disponible. Pour le moment, Virginie Assistance Numérique vous recontacte pour activer votre formule.
        </p>

        {sent ? (
          <div className="mt-8 rounded-3xl bg-green-100 p-6 text-green-800">
            <h2 className="text-2xl font-bold">Demande enregistrée</h2>
            <p className="mt-2">Votre demande a bien été enregistrée dans cette version de démonstration.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="Prénom" value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} className="rounded-2xl border border-rose-100 px-4 py-3" />
              <input required placeholder="Nom" value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} className="rounded-2xl border border-rose-100 px-4 py-3" />
              <input required type="email" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="rounded-2xl border border-rose-100 px-4 py-3" />
              <input required placeholder="Téléphone" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="rounded-2xl border border-rose-100 px-4 py-3" />
              <select value={form.selectedPlan} onChange={(event) => setForm({ ...form, selectedPlan: event.target.value as SubscriptionPlan })} className="rounded-2xl border border-rose-100 px-4 py-3 sm:col-span-2">
                <option>Découverte</option>
                <option>Famille</option>
                <option>Sérénité</option>
              </select>
              <textarea placeholder="Votre message" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className="min-h-32 rounded-2xl border border-rose-100 px-4 py-3 sm:col-span-2" />
            </div>
            <button className="mt-6 w-full rounded-full bg-rose-700 px-6 py-4 text-lg font-semibold text-white hover:bg-rose-800">
              Envoyer ma demande
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
