"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { saveWellnessCheck } from "@/lib/storage";

export default function SeniorPage() {
  const [message, setMessage] = useState("");

  const handleWellnessCheck = () => {
    const check = {
      checkedAt: new Date().toISOString(),
      status: "ok" as const,
      message: "Je vais bien, tout va bien, je rassure les miens.",
    };

    saveWellnessCheck(check);
    setMessage("Merci, vos proches sont rassurés.");
  };

  return (
    <main className="min-h-screen bg-[#F7FBF9] px-4 py-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-[2rem] border border-[#DCEBE6] bg-white p-6 text-center shadow-sm">
          <h1 className="text-4xl font-bold text-[#263238]">Bonjour</h1>

          <p className="mt-3 text-xl font-semibold text-[#4F9F8A]">Que souhaitez-vous faire ?</p>

          {message && (
            <div className="mt-6 rounded-3xl bg-[#EAF6F2] p-5 text-xl font-bold text-[#2F7D6A]">
              {message}
            </div>
          )}

          <div className="mt-8 space-y-5">
            <button
              type="button"
              onClick={handleWellnessCheck}
              className="min-h-32 w-full rounded-[2rem] bg-[#4F9F8A] px-6 text-3xl font-bold text-white shadow transition hover:bg-[#428B78]"
            >
              <Image src="/icons/je-vais-bien-heart-192.png" alt="" width={64} height={64} className="mx-auto mb-3 rounded-2xl" priority />
              Je vais bien
            </button>

            <Link href="/proches" className="flex min-h-32 w-full flex-col items-center justify-center rounded-[2rem] bg-[#5BA7D1] px-6 text-center text-3xl font-bold text-white shadow transition hover:bg-[#4A91B8]">
              <Image src="/icons/appeler-proche-phone-192.png" alt="" width={64} height={64} className="mb-3 rounded-2xl" priority />
              Appeler un proche
            </Link>
          </div>

          <p className="mt-6 text-base text-[#78909C]">Deux choix simples pour rester serein.</p>
        </div>
      </div>
    </main>
  );
}
