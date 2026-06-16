export default function SeniorHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h1 className="text-5xl font-serif font-bold">Bienvenue</h1>
            <p className="text-xl opacity-90">
              Votre application pour rester connecté avec vos proches et accéder à l'aide dont vous avez besoin.
            </p>
            <div className="flex flex-col gap-4">
              <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 px-8 rounded-2xl text-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition">
                Mes Contacts
              </button>
              <button className="bg-purple-800/50 backdrop-blur-sm text-white py-4 px-8 rounded-2xl text-lg font-semibold border border-purple-700 hover:border-purple-500 transition">
                Appeler un Aidant
              </button>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <div className="w-full h-96 bg-purple-800/30 rounded-2xl border border-purple-700 flex items-center justify-center">
              <p className="text-purple-300">Image placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
