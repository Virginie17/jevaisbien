import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-[#F7FBF9]">
      <AppHeader />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <p className="mb-4 inline-block rounded-full border border-[#DCEBE6] bg-white px-4 py-2 text-sm font-semibold text-[#4F9F8A] shadow-sm">
          Informations légales
        </p>

        <h1 className="text-4xl font-bold text-[#263238]">Mentions légales</h1>
        <p className="mt-4 text-lg leading-8 text-[#607D8B]">
          Cette page présente les informations de base relatives à l’application Je vais bien.
        </p>

        <div className="mt-8 space-y-6">
          <article className="rounded-3xl border border-[#DCEBE6] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#263238]">Éditeur</h2>
            <p className="mt-3 leading-7 text-[#607D8B]">
              Application éditée par Virginie Assistance Numérique. Les informations administratives définitives devront être complétées avant publication commerciale.
            </p>
          </article>

          <article className="rounded-3xl border border-[#DCEBE6] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#263238]">Objet du service</h2>
            <p className="mt-3 leading-7 text-[#607D8B]">
              Je vais bien est un outil d’aide au lien familial. Il ne remplace pas un dispositif médical, un service d’urgence ou une solution de télésurveillance.
            </p>
          </article>

          <article className="rounded-3xl border border-[#DCEBE6] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#263238]">Responsabilité</h2>
            <p className="mt-3 leading-7 text-[#607D8B]">
              L’application vise à simplifier le contact et la réassurance. En cas d’urgence réelle, les numéros d’urgence habituels doivent être contactés directement.
            </p>
          </article>
        </div>
      </section>

      <AppFooter />
    </main>
  );
}
