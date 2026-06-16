import Link from "next/link";
import AppLogo from "./AppLogo";

export default function AppFooter() {
  return (
    <footer className="border-t border-[#DCEBE6] bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <AppLogo />
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#607D8B]">
              Une application simple et rassurante pour aider les seniors à garder le lien avec leurs proches, sans complexité.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#263238]">Application</h3>
            <div className="mt-4 space-y-3 text-sm text-[#607D8B]">
              <Link href="/senior" className="block hover:text-[#4F9F8A]">Espace senior</Link>
              <Link href="/proches" className="block hover:text-[#4F9F8A]">Mes proches</Link>
              <Link href="/aidant" className="block hover:text-[#4F9F8A]">Espace aidant</Link>
              <Link href="/installation" className="block hover:text-[#4F9F8A]">Installer</Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-[#263238]">Virginie Assistance</h3>
            <div className="mt-4 space-y-3 text-sm text-[#607D8B]">
              <Link href="/activation" className="block hover:text-[#4F9F8A]">Demande d’activation</Link>
              <a href="https://virginieassistance.fr" className="block hover:text-[#4F9F8A]" target="_blank" rel="noopener noreferrer">Site principal</a>
              <p>Accompagnement numérique seniors</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-[#263238]">Informations</h3>
            <div className="mt-4 space-y-3 text-sm text-[#607D8B]">
              <Link href="/confidentialite" className="block hover:text-[#4F9F8A]">Confidentialité</Link>
              <Link href="/mentions-legales" className="block hover:text-[#4F9F8A]">Mentions légales</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#DCEBE6] pt-6 text-center text-xs text-[#78909C]">
          © {new Date().getFullYear()} Je vais bien — Virginie Assistance Numérique. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
