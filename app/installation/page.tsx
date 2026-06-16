import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";

export default function InstallationPage() {
  return (
    <main className="min-h-screen bg-[#F7FBF9]">
      <AppHeader />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <p className="mb-4 inline-block rounded-full border border-[#DCEBE6] bg-white px-4 py-2 text-sm font-semibold text-[#4F9F8A] shadow-sm">
          Installation sur téléphone
        </p>

        <h1 className="text-4xl font-bold text-[#263238]">Installer l’application</h1>
        <p className="mt-4 text-lg leading-8 text-[#607D8B]">
          L’application peut être ajoutée sur l’écran d’accueil du téléphone, comme une vraie application.
        </p>

        <div className="mt-8 space-y-6">
          <div className="rounded-3xl border border-[#DCEBE6] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#263238]">Sur Android</h2>
            <ol className="mt-4 space-y-3 text-[#607D8B]">
              <li>1. Ouvrez le site dans Chrome.</li>
              <li>2. Appuyez sur les trois petits points.</li>
              <li>3. Choisissez Ajouter à l’écran d’accueil.</li>
              <li>4. L’icône Je vais bien apparaît sur le téléphone.</li>
            </ol>
          </div>

          <div className="rounded-3xl border border-[#DCEBE6] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#263238]">Sur iPhone</h2>
            <ol className="mt-4 space-y-3 text-[#607D8B]">
              <li>1. Ouvrez le site avec Safari.</li>
              <li>2. Appuyez sur le bouton de partage.</li>
              <li>3. Choisissez Sur l’écran d’accueil.</li>
              <li>4. Appuyez sur Ajouter.</li>
            </ol>
          </div>
        </div>
      </section>

      <AppFooter />
    </main>
  );
}
