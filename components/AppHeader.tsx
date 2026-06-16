import Link from "next/link";
import Image from "next/image";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-rose-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <Image
            src="/icon-192.png"
            alt="Icône Je vais bien"
            width={42}
            height={42}
            className="rounded-2xl"
            priority
          />

          <div className="leading-tight">
            <p className="text-lg font-bold text-slate-900">Je vais bien</p>
            <p className="hidden text-xs font-semibold text-rose-700 sm:block">
              Je rassure les miens
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-semibold text-slate-600 sm:gap-3">
          <Link href="/senior" className="rounded-full px-3 py-2 transition hover:bg-rose-50 hover:text-rose-700">
            Senior
          </Link>
          <Link href="/aidant" className="rounded-full px-3 py-2 transition hover:bg-rose-50 hover:text-rose-700">
            Aidant
          </Link>
          <Link href="/installation" className="hidden rounded-full px-3 py-2 transition hover:bg-rose-50 hover:text-rose-700 sm:inline-block">
            Installer
          </Link>
        </nav>
      </div>
    </header>
  );
}
