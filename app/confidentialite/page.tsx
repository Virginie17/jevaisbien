import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";

export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen bg-[#F7FBF9]">
      <AppHeader />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <p className="mb-4 inline-block rounded-full border border-[#DCEBE6] bg-white px-4 py-2 text-sm font-semibold text-[#4F9F8A] shadow-sm">
          Confidentialité
        </p>

        <h1 className="text-4xl font-bold text-[#263238]">Politique de confidentialité</h1>
        <p className="mt-4 text-lg leading-8 text-[#607D8B]">
          Je vais bien est une application pensée pour rester simple, rassurante et respectueuse des données personnelles.
        </p>

        <div className="mt-8 space-y-6">
          <article className="rounded-3xl border border-[#DCEBE6] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#263238]">Données utilisées</h2>
            <p className="mt-3 leading-7 text-[#607D8B]">
              Dans cette version, les informations saisies restent stockées localement dans le navigateur de l’utilisateur : contacts, dernier signal et paramètres du senior.
            </p>
          </article>

          <article className="rounded-3xl border border-[#DCEBE6] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#263238]">Objectif</h2>
            <p className="mt-3 leading-7 text-[#607D8B]">
              Ces données servent uniquement à faire fonctionner l’application : afficher les proches, enregistrer un signal de réassurance et faciliter l’utilisation quotidienne.
            </p>
          </article>

          <article className="rounded-3xl border border-[#DCEBE6] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#263238]">Évolution prévue</h2>
            <p className="mt-3 leading-7 text-[#607D8B]">
              Si une synchronisation entre plusieurs téléphones est ajoutée, une base de données sécurisée et des règles de confidentialité complètes devront être mises en place.
            </p>
          </article>
        </div>
      </section>

      <AppFooter />
    </main>
  );
}
