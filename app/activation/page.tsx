"use client";

import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import { SubscriptionPlan, SubscriptionRequest } from "@/lib/types";
import { saveSubscriptionRequest } from "@/lib/storage";
import { createSubscriptionRequest } from "@/lib/supabase-queries";
import { FormEvent, useState } from "react";

const inputClass = "rounded-2xl border border-[#DCEBE6] bg-white px-4 py-3 text-[#263238] outline-none transition focus:border-[#4F9F8A] focus:ring-4 focus:ring-[#B9DED3]/50";

export default function ActivationPage() {
  const [sent, setSent] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    selectedPlan: "Famille" as SubscriptionPlan,
    message: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    const request: SubscriptionRequest = {
      id: crypto.randomUUID(),
      ...form,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    saveSubscriptionRequest(request);
    await createSubscriptionRequest(request);
    setSent(true);
    setIsSaving(false);
  };

  return (
    <main className="min-h-screen bg-[#F7FBF9]">
      <AppHeader />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <p className="mb-4 inline-block rounded-full border border-[#DCEBE6] bg-white px-4 py-2 text-sm font-semibold text-[#4F9F8A] shadow-sm">
          Demande d’activation
        </p>
        <h1 className="text-4xl font-bold text-[#263238]">Activer une formule</h1>
        <p className="mt-4 text-lg leading-8 text-[#607D8B]">
          Le paiement en ligne sera bientôt disponible. Pour le moment, Virginie Assistance Numérique vous recontacte pour activer votre formule.
        </p>

        {sent ? (
          <div className="mt-8 rounded-3xl border border-[#B9DED3] bg-[#EAF6F2] p-6 text-[#2F7D6A]">
            <h2 className="text-2xl font-bold">Demande enregistrée</h2>
            <p className="mt-2">Votre demande a bien été enregistrée.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 rounded-3xl border border-[#DCEBE6] bg-white p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="Prénom" value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} className={inputClass} />
              <input required placeholder="Nom" value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} className={inputClass} />
              <input required type="email" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className={inputClass} />
              <input required placeholder="Téléphone" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className={inputClass} />
              <select value={form.selectedPlan} onChange={(event) => setForm({ ...form, selectedPlan: event.target.value as SubscriptionPlan })} className={`${inputClass} sm:col-span-2`}>
                <option>Découverte</option>
                <option>Famille</option>
                <option>Sérénité</option>
              </select>
              <textarea placeholder="Votre message" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className={`${inputClass} min-h-32 sm:col-span-2`} />
            </div>
            <button disabled={isSaving} className="mt-6 w-full rounded-full bg-[#4F9F8A] px-6 py-4 text-lg font-semibold text-white hover:bg-[#428B78] disabled:opacity-70">
              {isSaving ? "Envoi..." : "Envoyer ma demande"}
            </button>
          </form>
        )}
      </section>

      <AppFooter />
    </main>
  );
}
