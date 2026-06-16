import Link from "next/link";
import AppLogo from "./AppLogo";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#DCEBE6] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <AppLogo />

        <nav className="flex items-center gap-1 text-sm font-semibold text-[#607D8B] sm:gap-3">
          <Link href="/senior" className="rounded-full px-3 py-2 transition hover:bg-[#EAF6F2] hover:text-[#4F9F8A]">
            Senior
          </Link>
          <Link href="/aidant" className="rounded-full px-3 py-2 transition hover:bg-[#EAF6F2] hover:text-[#4F9F8A]">
            Aidant
          </Link>
          <Link href="/installation" className="hidden rounded-full px-3 py-2 transition hover:bg-[#EAF6F2] hover:text-[#4F9F8A] sm:inline-block">
            Installer
          </Link>
        </nav>
      </div>
    </header>
  );
}
