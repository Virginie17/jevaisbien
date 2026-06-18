"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { saveWellnessCheck } from "@/lib/storage";
import { createWellnessCheck } from "@/lib/supabase-queries";
import { WellnessStatus } from "@/lib/types";

export default function SeniorPage() {
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleWellnessCheck = async (status: WellnessStatus) => {
    setIsSaving(true);

    const check = {
      checkedAt: new Date().toISOString(),
      status,
      message: status === "bien" ? "Je vais bien, tout va bien, je rassure les miens." : "J’ai besoin d’aide.",
    };

    saveWellnessCheck(check);
    await createWellnessCheck(check);

    setMessage(status === "bien" ? "Merci, vos proches sont rassurés." : "Votre demande d’aide a été enregistrée.");
    setIsSaving(false);
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
              onClick={() => handleWellnessCheck("bien")}
              disabled={isSaving}
              className="min-h-32 w-full rounded-[2rem] bg-[#4F9F8A] px-6 text-3xl font-bold text-white shadow transition hover:bg-[#428B78] disabled:opacity-70"
            >
              <Image src="/icons/je-vais-bien-heart-192.png" alt="" width={64} height={64} className="mx-auto mb-3 rounded-2xl" priority />
              {isSaving ? "Envoi..." : "Je vais bien"}
            </button>

            <button
              type="button"
              onClick={() => handleWellnessCheck("besoin_aide")}
              disabled={isSaving}
              className="min-h-28 w-full rounded-[2rem] bg-[#F59E0B] px-6 text-3xl font-bold text-white shadow transition hover:bg-[#D97706] disabled:opacity-70"
            >
              J’ai besoin d’aide
            </button>

            <Link href="/proches" className="flex min-h-32 w-full flex-col items-center justify-center rounded-[2rem] bg-[#5BA7D1] px-6 text-center text-3xl font-bold text-white shadow transition hover:bg-[#4A91B8]">
              <Image src="/icons/appeler-proche-phone-192.png" alt="" width={64} height={64} className="mb-3 rounded-2xl" priority />
              Appeler un proche
            </Link>
          </div>

          <p className="mt-6 text-base text-[#78909C]">Trois choix simples pour rester serein.</p>
        </div>
      </div>
    </main>
  );
}
