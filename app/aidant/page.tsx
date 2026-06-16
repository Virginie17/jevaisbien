"use client";

import AppHeader from "@/components/AppHeader";
import { demoContacts } from "@/lib/contacts";
import { useEffect, useState } from "react";

type LastCheck = {
  checkedAt: string;
  status: string;
  message: string;
};

export default function AidantPage() {
  const [lastCheck, setLastCheck] = useState<LastCheck | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("lastWellnessCheck");
    if (stored) {
      setLastCheck(JSON.parse(stored));
    }
  }, []);

  return (
    <main className="min-h-screen bg-rose-50">
      <AppHeader />

      <section className="mx-auto max-w-4xl px-4 py-10">
        <p className="mb-4 inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm">
          Espace famille
        </p>
        <h1 className="text-4xl font-bold text-slate-900">Espace aidant</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Retrouvez ici les dernières informations du senior et les contacts configurés.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Dernier signal</h2>
            {lastCheck ? (
              <div className="mt-4 rounded-2xl bg-green-100 p-5 text-green-800">
                <p className="text-xl font-bold">{lastCheck.message}</p>
                <p className="mt-2 text-sm">
                  Envoyé le {new Date(lastCheck.checkedAt).toLocaleString("fr-FR")}
                </p>
              </div>
            ) : (
              <p className="mt-4 text-slate-600">Aucun signal enregistré pour le moment.</p>
            )}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Ma formule</h2>
            <p className="mt-3 text-slate-600">Formule actuelle : Découverte gratuite.</p>
            <p className="mt-2 text-sm text-slate-500">
              Le paiement en ligne pourra être ajouté plus tard avec Stripe.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Contacts du senior</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {demoContacts.map((contact) => (
              <div key={contact.id} className="rounded-2xl bg-rose-50 p-4">
                <p className="text-xl font-bold text-slate-900">{contact.firstName}</p>
                <p className="text-slate-600">{contact.relationship}</p>
                <p className="mt-2 text-sm text-slate-500">{contact.phoneNumber}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
