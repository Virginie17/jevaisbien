import Image from "next/image";
import { FavoriteContact } from "@/lib/types";

type ContactCardProps = {
  contact: FavoriteContact;
  onSelect: (contact: FavoriteContact) => void;
};

export default function ContactCard({ contact, onSelect }: ContactCardProps) {
  const initials = contact.firstName.slice(0, 1).toUpperCase();

  return (
    <button
      type="button"
      onClick={() => onSelect(contact)}
      className="w-full rounded-[2rem] bg-white p-5 text-left shadow-sm ring-2 ring-rose-100 transition hover:bg-rose-50 focus:outline-none focus:ring-4 focus:ring-rose-300"
    >
      <div className="flex items-center gap-5">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-rose-100 text-4xl font-bold text-rose-700">
          {contact.photoUrl ? (
            <Image
              src={contact.photoUrl}
              alt={contact.firstName}
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          ) : (
            initials
          )}
        </div>

        <div>
          <p className="text-3xl font-bold text-slate-900">{contact.firstName}</p>
          <p className="mt-1 text-xl text-slate-500">{contact.relationship}</p>
          {contact.isPrimary && (
            <p className="mt-2 inline-block rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-700">
              Contact principal
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
