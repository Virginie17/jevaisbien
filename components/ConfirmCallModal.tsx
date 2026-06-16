interface ConfirmCallModalProps {
  isOpen: boolean;
  contactName: string;
  contactPhone: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmCallModal({
  isOpen,
  contactName,
  contactPhone,
  onConfirm,
  onCancel,
}: ConfirmCallModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-purple-900 rounded-2xl p-6 max-w-md w-full mx-4 border border-purple-700">
        <h2 className="text-2xl font-serif font-bold text-white mb-4">Confirmer l'appel</h2>
        <p className="text-purple-200 mb-2">
          Voulez-vous vraiment appeler <span className="text-white font-semibold">{contactName}</span> ?
        </p>
        <p className="text-purple-300 mb-6">{contactPhone}</p>
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 bg-purple-700 text-white py-3 px-4 rounded-xl hover:bg-purple-600 transition"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition"
          >
            Appeler
          </button>
        </div>
      </div>
    </div>
  );
}
