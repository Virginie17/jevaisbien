"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FavoriteContact } from "@/lib/types";
import { getStoredContacts, saveStoredContacts } from "@/lib/storage";
import { fetchFavoriteContacts } from "@/lib/supabase-queries";
import ContactCard from "@/components/ContactCard";
import ConfirmCallModal from "@/components/ConfirmCallModal";

export default function ProchesPage() {
  const [contacts, setContacts] = useState<FavoriteContact[]>([]);
  const [selectedContact, setSelectedContact] = useState<FavoriteContact | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadContacts() {
      const localContacts = getStoredContacts().sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
      setContacts(localContacts);

      const remoteContacts = await fetchFavoriteContacts();
      if (remoteContacts) {
        setContacts(remoteContacts);
        saveStoredContacts(remoteContacts);
      }

      setIsLoading(false);
    }

    loadContacts();
  }, []);

  return (
    <main className="min-h-screen bg-[#F7FBF9] px-4 py-8">
      <div className="mx-auto max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-[#263238]">Qui voulez-vous joindre ?</h1>
          <p className="mt-3 text-xl text-[#607D8B]">Touchez une carte, puis confirmez.</p>
        </div>

        {isLoading && <p className="mb-4 text-center text-[#607D8B]">Chargement...</p>}

        <div className="space-y-4">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} onSelect={setSelectedContact} />
          ))}
        </div>

        <Link href="/senior" className="mt-8 flex min-h-16 w-full items-center justify-center rounded-3xl bg-[#263238] px-6 text-xl font-bold text-white hover:bg-[#37474F]">
          Retour à mon accueil
        </Link>
      </div>

      {selectedContact && <ConfirmCallModal contact={selectedContact} onClose={() => setSelectedContact(null)} />}
    </main>
  );
}
