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
      className="w-full rounded-[2rem] border border-[#DCEBE6] bg-white p-5 text-left shadow-sm transition hover:bg-[#EAF6F2] focus:outline-none focus:ring-4 focus:ring-[#B9DED3]"
    >
      <div className="flex items-center gap-5">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#EAF6F2] text-4xl font-bold text-[#4F9F8A]">
          {contact.photoUrl ? (
            <Image src={contact.photoUrl} alt={contact.firstName} width={96} height={96} className="h-full w-full object-cover" />
          ) : (
            initials
          )}
        </div>

        <div>
          <p className="text-3xl font-bold text-[#263238]">{contact.firstName}</p>
          <p className="mt-1 text-xl text-[#607D8B]">{contact.relationship}</p>
          {contact.isPrimary && (
            <p className="mt-2 inline-block rounded-full bg-[#EAF6F2] px-3 py-1 text-sm font-semibold text-[#4F9F8A]">
              Contact principal
            </p>
          )}
          {contact.isEmergency && (
            <p className="mt-2 inline-block rounded-full bg-[#FFF3E0] px-3 py-1 text-sm font-semibold text-[#C77700]">
              Contact utile
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
