export default function PricingSection() {
  return (
    <section className="py-16 bg-purple-900/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif font-bold text-white text-center mb-12">Nos Tarifs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-purple-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-700 hover:border-purple-500 transition">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">Gratuit</h3>
            <p className="text-4xl font-bold text-purple-200 mb-6">0€<span className="text-lg">/mois</span></p>
            <ul className="space-y-3 text-purple-200 mb-8">
              <li>• 5 contacts</li>
              <li>• Appels illimités</li>
              <li>• Support basique</li>
            </ul>
            <button className="w-full bg-purple-700 text-white py-3 px-6 rounded-xl hover:bg-purple-600 transition">
              Commencer
            </button>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 border border-purple-400 transform scale-105">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">Premium</h3>
            <p className="text-4xl font-bold text-white mb-6">9.99€<span className="text-lg">/mois</span></p>
            <ul className="space-y-3 text-white mb-8">
              <li>• Contacts illimités</li>
              <li>• Appels illimités</li>
              <li>• Support prioritaire</li>
              <li>• Fonctionnalités avancées</li>
            </ul>
            <button className="w-full bg-white text-purple-600 py-3 px-6 rounded-xl hover:bg-purple-100 transition font-semibold">
              Choisir Premium
            </button>
          </div>
          <div className="bg-purple-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-700 hover:border-purple-500 transition">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">Famille</h3>
            <p className="text-4xl font-bold text-purple-200 mb-6">19.99€<span className="text-lg">/mois</span></p>
            <ul className="space-y-3 text-purple-200 mb-8">
              <li>• Jusqu'à 5 membres</li>
              <li>• Contacts illimités</li>
              <li>• Support dédié</li>
              <li>• Toutes les fonctionnalités</li>
            </ul>
            <button className="w-full bg-purple-700 text-white py-3 px-6 rounded-xl hover:bg-purple-600 transition">
              Choisir Famille
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
