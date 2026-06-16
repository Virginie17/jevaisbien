import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F7FBF9]">
      <AppHeader />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <p className="mb-4 inline-block rounded-full border border-[#DCEBE6] bg-white px-4 py-2 text-sm font-semibold text-[#4F9F8A] shadow-sm">
          Contact
        </p>

        <h1 className="text-4xl font-bold text-[#263238]">Besoin d’aide pour installer Je vais bien ?</h1>
        <p className="mt-4 text-lg leading-8 text-[#607D8B]">
          Virginie Assistance Numérique peut accompagner les familles, les seniors et les aidants pour installer l’application et configurer les proches.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-[#DCEBE6] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#263238]">Accompagnement</h2>
            <p className="mt-3 leading-7 text-[#607D8B]">
              Installation sur téléphone, explication au senior, ajout des proches et vérification du bon fonctionnement.
            </p>
          </article>

          <article className="rounded-3xl border border-[#DCEBE6] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#263238]">Demande</h2>
            <p className="mt-3 leading-7 text-[#607D8B]">
              Pour demander une activation ou un accompagnement, utilisez le formulaire prévu dans l’application.
            </p>
            <a href="/activation" className="mt-5 inline-flex rounded-full bg-[#4F9F8A] px-6 py-3 font-semibold text-white hover:bg-[#428B78]">
              Faire une demande
            </a>
          </article>
        </div>
      </section>

      <AppFooter />
    </main>
  );
}
