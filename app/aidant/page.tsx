"use client";

import AppHeader from "@/components/AppHeader";
import { FavoriteContact, SeniorProfile } from "@/lib/types";
import {
  defaultSeniorProfile,
  getLastWellnessCheck,
  getSeniorProfile,
  getStoredContacts,
  saveSeniorProfile,
  saveStoredContacts,
} from "@/lib/storage";
import { FormEvent, useEffect, useState } from "react";

type LastCheck = {
  checkedAt: string;
  status: string;
  message: string;
};

const emptyContact: FavoriteContact = {
  id: "",
  firstName: "",
  relationship: "",
  phoneNumber: "",
  isPrimary: false,
  isEmergency: false,
  displayOrder: 1,
};

export default function AidantPage() {
  const [lastCheck, setLastCheck] = useState<LastCheck | null>(null);
  const [contacts, setContacts] = useState<FavoriteContact[]>([]);
  const [profile, setProfile] = useState<SeniorProfile>(defaultSeniorProfile);
  const [form, setForm] = useState<FavoriteContact>(emptyContact);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setLastCheck(getLastWellnessCheck());
    setContacts(getStoredContacts().sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)));
    setProfile(getSeniorProfile());
  }, []);

  const persistContacts = (nextContacts: FavoriteContact[]) => {
    const sorted = nextContacts.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    setContacts(sorted);
    saveStoredContacts(sorted);
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.firstName || !form.relationship || !form.phoneNumber) return;

    const nextContact: FavoriteContact = {
      ...form,
      id: editingId ?? crypto.randomUUID(),
      displayOrder: Number(form.displayOrder) || contacts.length + 1,
    };

    const nextContacts = editingId
      ? contacts.map((contact) => (contact.id === editingId ? nextContact : contact))
      : [...contacts, nextContact];

    persistContacts(nextContacts);
    setForm(emptyContact);
    setEditingId(null);
  };

  const handleEditContact = (contact: FavoriteContact) => {
    setEditingId(contact.id);
    setForm(contact);
  };

  const handleDeleteContact = (id: string) => {
    persistContacts(contacts.filter((contact) => contact.id !== id));
  };

  const handleProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveSeniorProfile(profile);
  };

  return (
    <main className="min-h-screen bg-rose-50">
      <AppHeader />

      <section className="mx-auto max-w-5xl px-4 py-10">
        <p className="mb-4 inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm">
          Espace famille
        </p>
        <h1 className="text-4xl font-bold text-slate-900">Espace aidant</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Configurez les informations du senior et les proches visibles depuis son écran.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Dernier signal</h2>
            {lastCheck ? (
              <div className="mt-4 rounded-2xl bg-green-100 p-5 text-green-800">
                <p className="text-xl font-bold">{lastCheck.message}</p>
                <p className="mt-2 text-sm">Envoyé le {new Date(lastCheck.checkedAt).toLocaleString("fr-FR")}</p>
              </div>
            ) : (
              <p className="mt-4 text-slate-600">Aucun signal enregistré pour le moment.</p>
            )}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Ma formule</h2>
            <p className="mt-3 text-slate-600">Formule actuelle : Découverte gratuite.</p>
            <p className="mt-2 text-sm text-slate-500">Le paiement en ligne pourra être ajouté plus tard avec Stripe.</p>
          </div>
        </div>

        <form onSubmit={handleProfileSubmit} className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Paramètres du senior</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Prénom</span>
              <input value={profile.firstName} onChange={(event) => setProfile({ ...profile, firstName: event.target.value })} className="w-full rounded-2xl border border-rose-100 px-4 py-3" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Heure de rappel</span>
              <input type="time" value={profile.reminderTime} onChange={(event) => setProfile({ ...profile, reminderTime: event.target.value })} className="w-full rounded-2xl border border-rose-100 px-4 py-3" />
            </label>
            <label className="space-y-2 md:col-span-3">
              <span className="text-sm font-semibold text-slate-700">Message de réassurance</span>
              <input value={profile.message} onChange={(event) => setProfile({ ...profile, message: event.target.value })} className="w-full rounded-2xl border border-rose-100 px-4 py-3" />
            </label>
          </div>
          <button className="mt-5 rounded-full bg-rose-700 px-6 py-3 font-semibold text-white hover:bg-rose-800">Enregistrer les paramètres</button>
        </form>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <form onSubmit={handleContactSubmit} className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">{editingId ? "Modifier un proche" : "Ajouter un proche"}</h2>
            <div className="mt-5 space-y-4">
              <input placeholder="Prénom" value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} className="w-full rounded-2xl border border-rose-100 px-4 py-3" />
              <input placeholder="Lien familial" value={form.relationship} onChange={(event) => setForm({ ...form, relationship: event.target.value })} className="w-full rounded-2xl border border-rose-100 px-4 py-3" />
              <input placeholder="Numéro de téléphone" value={form.phoneNumber} onChange={(event) => setForm({ ...form, phoneNumber: event.target.value })} className="w-full rounded-2xl border border-rose-100 px-4 py-3" />
              <input type="number" placeholder="Ordre d'affichage" value={form.displayOrder ?? 1} onChange={(event) => setForm({ ...form, displayOrder: Number(event.target.value) })} className="w-full rounded-2xl border border-rose-100 px-4 py-3" />
              <label className="flex items-center gap-3 text-slate-700"><input type="checkbox" checked={!!form.isPrimary} onChange={(event) => setForm({ ...form, isPrimary: event.target.checked })} /> Contact principal</label>
              <label className="flex items-center gap-3 text-slate-700"><input type="checkbox" checked={!!form.isEmergency} onChange={(event) => setForm({ ...form, isEmergency: event.target.checked })} /> Contact utile</label>
            </div>
            <button className="mt-5 w-full rounded-full bg-rose-700 px-6 py-3 font-semibold text-white hover:bg-rose-800">{editingId ? "Enregistrer" : "Ajouter"}</button>
          </form>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Contacts du senior</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {contacts.map((contact) => (
                <div key={contact.id} className="rounded-2xl bg-rose-50 p-4">
                  <p className="text-xl font-bold text-slate-900">{contact.firstName}</p>
                  <p className="text-slate-600">{contact.relationship}</p>
                  <p className="mt-2 text-sm text-slate-500">{contact.phoneNumber}</p>
                  <div className="mt-4 flex gap-2">
                    <button type="button" onClick={() => handleEditContact(contact)} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-rose-700">Modifier</button>
                    <button type="button" onClick={() => handleDeleteContact(contact.id)} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Supprimer</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
