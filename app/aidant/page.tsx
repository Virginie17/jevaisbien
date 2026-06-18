"use client";

import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import { FavoriteContact, SeniorProfile, SubscriptionRequest, WellnessCheck } from "@/lib/types";
import {
  defaultSeniorProfile,
  getLastWellnessCheck,
  getSeniorProfile,
  getStoredContacts,
  getSubscriptionRequests,
  saveSeniorProfile,
  saveStoredContacts,
} from "@/lib/storage";
import {
  deleteFavoriteContact,
  fetchFavoriteContacts,
  fetchLastWellnessCheck,
  fetchSeniorProfile,
  fetchSubscriptionRequests,
  saveRemoteSeniorProfile,
  upsertFavoriteContact,
} from "@/lib/supabase-queries";
import { FormEvent, useEffect, useState } from "react";

const emptyContact: FavoriteContact = {
  id: "",
  firstName: "",
  relationship: "",
  phoneNumber: "",
  isPrimary: false,
  displayOrder: 0,
};

const inputClass = "w-full rounded-2xl border border-[#DCEBE6] bg-white px-4 py-3 text-[#263238] outline-none transition focus:border-[#4F9F8A] focus:ring-4 focus:ring-[#B9DED3]/50";
const cardClass = "rounded-3xl border border-[#DCEBE6] bg-white p-6 shadow-sm";

export default function AidantPage() {
  const [lastCheck, setLastCheck] = useState<WellnessCheck | null>(null);
  const [contacts, setContacts] = useState<FavoriteContact[]>([]);
  const [requests, setRequests] = useState<SubscriptionRequest[]>([]);
  const [profile, setProfile] = useState<SeniorProfile>(defaultSeniorProfile);
  const [form, setForm] = useState<FavoriteContact>(emptyContact);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingContact, setIsSavingContact] = useState(false);

  useEffect(() => {
    async function loadDashboard() {
      setLastCheck(getLastWellnessCheck());
      setContacts(getStoredContacts().sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)));
      setRequests(getSubscriptionRequests());
      setProfile(getSeniorProfile());

      const [remoteCheck, remoteContacts, remoteRequests, remoteProfile] = await Promise.all([
        fetchLastWellnessCheck(),
        fetchFavoriteContacts(),
        fetchSubscriptionRequests(),
        fetchSeniorProfile(),
      ]);

      if (remoteCheck) setLastCheck(remoteCheck);
      if (remoteContacts) {
        setContacts(remoteContacts);
        saveStoredContacts(remoteContacts);
      }
      if (remoteRequests) setRequests(remoteRequests);
      if (remoteProfile) {
        setProfile(remoteProfile);
        saveSeniorProfile(remoteProfile);
      }

      setIsLoading(false);
    }

    loadDashboard();
  }, []);

  const persistContacts = (nextContacts: FavoriteContact[]) => {
    const sorted = nextContacts.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    setContacts(sorted);
    saveStoredContacts(sorted);
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.firstName || !form.relationship || !form.phoneNumber) return;

    setIsSavingContact(true);

    const localContact: FavoriteContact = {
      ...form,
      id: editingId ?? form.id ?? crypto.randomUUID(),
      seniorId: profile.id,
      displayOrder: Number(form.displayOrder) || contacts.length,
    };

    const remoteContact = await upsertFavoriteContact(localContact);
    const nextContact = remoteContact ?? localContact;

    const nextContacts = editingId
      ? contacts.map((contact) => (contact.id === editingId ? nextContact : contact))
      : [...contacts, nextContact];

    persistContacts(nextContacts);
    setForm(emptyContact);
    setEditingId(null);
    setIsSavingContact(false);
  };

  const handleEditContact = (contact: FavoriteContact) => {
    setEditingId(contact.id);
    setForm(contact);
  };

  const handleDeleteContact = async (id: string) => {
    await deleteFavoriteContact(id);
    persistContacts(contacts.filter((contact) => contact.id !== id));
  };

  const handleProfileSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSavingProfile(true);
    saveSeniorProfile(profile);
    await saveRemoteSeniorProfile(profile);
    const remoteProfile = await fetchSeniorProfile();
    if (remoteProfile) {
      setProfile(remoteProfile);
      saveSeniorProfile(remoteProfile);
    }
    setIsSavingProfile(false);
  };

  return (
    <main className="min-h-screen bg-[#F7FBF9]">
      <AppHeader />

      <section className="mx-auto max-w-5xl px-4 py-10">
        <p className="mb-4 inline-block rounded-full border border-[#DCEBE6] bg-white px-4 py-2 text-sm font-semibold text-[#4F9F8A] shadow-sm">
          Espace famille
        </p>
        <h1 className="text-4xl font-bold text-[#263238]">Espace aidant</h1>
        <p className="mt-4 text-lg leading-8 text-[#607D8B]">
          Configurez les informations du senior et les proches visibles depuis son écran.
        </p>

        {isLoading && <p className="mt-4 text-sm font-semibold text-[#4F9F8A]">Synchronisation Supabase en cours...</p>}

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className={cardClass}>
            <h2 className="text-2xl font-bold text-[#263238]">Dernier signal</h2>
            {lastCheck ? (
              <div className={`mt-4 rounded-2xl p-5 ${lastCheck.status === "besoin_aide" ? "bg-[#FFF3E0] text-[#C77700]" : "bg-[#EAF6F2] text-[#2F7D6A]"}`}>
                <p className="text-xl font-bold">{lastCheck.message ?? (lastCheck.status === "bien" ? "Tout va bien" : "Besoin d’aide")}</p>
                <p className="mt-2 text-sm">Envoyé le {new Date(lastCheck.checkedAt).toLocaleString("fr-FR")}</p>
              </div>
            ) : (
              <p className="mt-4 text-[#607D8B]">Aucun signal enregistré pour le moment.</p>
            )}
          </div>

          <div className={cardClass}>
            <h2 className="text-2xl font-bold text-[#263238]">Ma formule</h2>
            <p className="mt-3 text-[#607D8B]">Formule actuelle : Découverte gratuite.</p>
            <p className="mt-2 text-sm text-[#78909C]">Le paiement en ligne pourra être ajouté plus tard avec Stripe.</p>
          </div>

          <div className={cardClass}>
            <h2 className="text-2xl font-bold text-[#263238]">Demandes</h2>
            <p className="mt-3 text-4xl font-bold text-[#4F9F8A]">{requests.length}</p>
            <p className="mt-2 text-sm text-[#78909C]">Demande(s) d’activation enregistrée(s)</p>
          </div>
        </div>

        {requests.length > 0 && (
          <div className={`mt-6 ${cardClass}`}>
            <h2 className="text-2xl font-bold text-[#263238]">Demandes d’activation</h2>
            <div className="mt-5 space-y-3">
              {requests.map((request) => (
                <div key={request.id} className="rounded-2xl bg-[#EAF6F2] p-4">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <p className="text-lg font-bold text-[#263238]">{request.firstName} {request.lastName}</p>
                      <p className="text-sm text-[#607D8B]">{request.email} · {request.phone}</p>
                      {request.message && <p className="mt-2 text-sm text-[#607D8B]">{request.message}</p>}
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#4F9F8A]">{request.selectedPlan}</p>
                      <p className="mt-2 text-xs text-[#78909C]">{new Date(request.createdAt).toLocaleDateString("fr-FR")}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleProfileSubmit} className={`mt-6 ${cardClass}`}>
          <h2 className="text-2xl font-bold text-[#263238]">Paramètres du senior</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-[#607D8B]">Prénom</span>
              <input value={profile.firstName} onChange={(event) => setProfile({ ...profile, firstName: event.target.value })} className={inputClass} />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-[#607D8B]">Nom</span>
              <input value={profile.lastName ?? ""} onChange={(event) => setProfile({ ...profile, lastName: event.target.value })} className={inputClass} />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-[#607D8B]">Heure de rappel</span>
              <input type="time" value={profile.reminderTime} onChange={(event) => setProfile({ ...profile, reminderTime: event.target.value })} className={inputClass} />
            </label>
            <label className="flex items-center gap-3 text-[#607D8B] md:col-span-3">
              <input type="checkbox" checked={profile.isActive} onChange={(event) => setProfile({ ...profile, isActive: event.target.checked })} /> Senior actif
            </label>
          </div>
          <button disabled={isSavingProfile} className="mt-5 rounded-full bg-[#4F9F8A] px-6 py-3 font-semibold text-white hover:bg-[#428B78] disabled:opacity-70">
            {isSavingProfile ? "Enregistrement..." : "Enregistrer les paramètres"}
          </button>
        </form>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <form onSubmit={handleContactSubmit} className={cardClass}>
            <h2 className="text-2xl font-bold text-[#263238]">{editingId ? "Modifier un proche" : "Ajouter un proche"}</h2>
            <div className="mt-5 space-y-4">
              <input placeholder="Prénom" value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} className={inputClass} />
              <input placeholder="Lien familial" value={form.relationship} onChange={(event) => setForm({ ...form, relationship: event.target.value })} className={inputClass} />
              <input placeholder="Numéro de téléphone" value={form.phoneNumber} onChange={(event) => setForm({ ...form, phoneNumber: event.target.value })} className={inputClass} />
              <input type="number" placeholder="Ordre d'affichage" value={form.displayOrder ?? 0} onChange={(event) => setForm({ ...form, displayOrder: Number(event.target.value) })} className={inputClass} />
              <label className="flex items-center gap-3 text-[#607D8B]"><input type="checkbox" checked={!!form.isPrimary} onChange={(event) => setForm({ ...form, isPrimary: event.target.checked })} /> Contact principal</label>
            </div>
            <button disabled={isSavingContact} className="mt-5 w-full rounded-full bg-[#4F9F8A] px-6 py-3 font-semibold text-white hover:bg-[#428B78] disabled:opacity-70">{isSavingContact ? "Enregistrement..." : editingId ? "Enregistrer" : "Ajouter"}</button>
          </form>

          <div className={cardClass}>
            <h2 className="text-2xl font-bold text-[#263238]">Contacts du senior</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {contacts.map((contact) => (
                <div key={contact.id} className="rounded-2xl bg-[#EAF6F2] p-4">
                  <p className="text-xl font-bold text-[#263238]">{contact.firstName}</p>
                  <p className="text-[#607D8B]">{contact.relationship}</p>
                  <p className="mt-2 text-sm text-[#78909C]">{contact.phoneNumber}</p>
                  <div className="mt-4 flex gap-2">
                    <button type="button" onClick={() => handleEditContact(contact)} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#4F9F8A]">Modifier</button>
                    <button type="button" onClick={() => handleDeleteContact(contact.id)} className="rounded-full bg-[#263238] px-4 py-2 text-sm font-semibold text-white">Supprimer</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AppFooter />
    </main>
  );
}
