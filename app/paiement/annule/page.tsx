import Link from "next/link";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";

export default function PaiementAnnulePage() {
  return (
    <main className="min-h-screen bg-[#F7FBF9]">
      <AppHeader />
      <section className="mx-auto max-w-3xl px-4 py-12 text-center">
        <p className="mb-4 inline-block rounded-full border border-[#FFE0B2] bg-[#FFF3E0] px-4 py-2 text-sm font-semibold text-[#C77700]">
          Action annulée
        </p>
        <h1 className="text-4xl font-bold text-[#263238]">Aucune formule n’a été activée</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#607D8B]">
          Vous pouvez réessayer ou demander une activation manuelle avec l’aide de Virginie Assistance Numérique.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/" className="rounded-full bg-[#4F9F8A] px-8 py-4 font-semibold text-white hover:bg-[#428B78]">
            Revoir les offres
          </Link>
          <Link href="/activation" className="rounded-full border border-[#DCEBE6] bg-white px-8 py-4 font-semibold text-[#4F9F8A] hover:bg-[#EAF6F2]">
            Demander une activation
          </Link>
        </div>
      </section>
      <AppFooter />
    </main>
  );
}
