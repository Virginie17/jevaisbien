"use client";

import Link from "next/link";
import { useState } from "react";
import { demoContacts } from "@/lib/contacts";
import { FavoriteContact } from "@/lib/types";
import ContactCard from "@/components/ContactCard";
import ConfirmCallModal from "@/components/ConfirmCallModal";

export default function ProchesPage() {
  const [selectedContact, setSelectedContact] =
    useState<FavoriteContact | null>(null);

  const contacts = demoContacts.sort(
    (a: FavoriteContact, b: FavoriteContact) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
  );

  return (
    <main className="min-h-screen bg-rose-50 px-4 py-8">
      <div className="mx-auto max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            Qui voulez-vous appeler ?
          </h1>
          <p className="mt-3 text-xl text-slate-600">
            Touchez une photo, puis confirmez.
          </p>
        </div>

        <div className="space-y-4">
          {contacts.map((contact: FavoriteContact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onSelect={setSelectedContact}
            />
          ))}
        </div>

        <Link
          href="/senior"
          className="mt-8 flex min-h-16 w-full items-center justify-center rounded-3xl bg-slate-900 px-6 text-xl font-bold text-white"
        >
          Retour à mon accueil
        </Link>
      </div>

      {selectedContact && (
        <ConfirmCallModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}
    </main>
  );
}