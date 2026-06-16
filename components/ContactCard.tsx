interface ContactCardProps {
  name: string;
  phone: string;
  relation: string;
  onCall?: () => void;
}

export default function ContactCard({ name, phone, relation, onCall }: ContactCardProps) {
  return (
    <div className="bg-purple-800/50 backdrop-blur-sm rounded-xl p-4 border border-purple-700 hover:border-purple-500 transition">
      <h3 className="text-xl font-serif font-bold text-white mb-2">{name}</h3>
      <p className="text-purple-200 text-sm mb-3">{relation}</p>
      <p className="text-white mb-4">{phone}</p>
      {onCall && (
        <button
          onClick={onCall}
          className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition"
        >
          Appeler
        </button>
      )}
    </div>
  );
}
