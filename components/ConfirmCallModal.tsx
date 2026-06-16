import { FavoriteContact } from "@/lib/types";

type ConfirmCallModalProps = {
  contact: FavoriteContact;
  onClose: () => void;
};

export default function ConfirmCallModal({ contact, onClose }: ConfirmCallModalProps) {
  const handleCall = () => {
    if (!contact.phoneNumber) {
      alert("Ce contact n’a pas encore de numéro configuré.");
      return;
    }

    window.location.href = `tel:${contact.phoneNumber}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-6 text-center shadow-xl">
        <h2 className="text-3xl font-bold text-slate-900">Appeler {contact.firstName} ?</h2>
        <p className="mt-4 text-xl text-slate-600">Voulez-vous lancer l’appel maintenant ?</p>

        <div className="mt-8 space-y-4">
          <button
            type="button"
            onClick={handleCall}
            className="min-h-20 w-full rounded-3xl bg-green-600 px-6 text-2xl font-bold text-white transition hover:bg-green-700"
          >
            Oui, appeler
          </button>

          <button
            type="button"
            onClick={onClose}
            className="min-h-20 w-full rounded-3xl bg-slate-100 px-6 text-2xl font-bold text-slate-700 transition hover:bg-slate-200"
          >
            Non, annuler
          </button>
        </div>
      </div>
    </div>
  );
}
