"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function SeniorPage() {
  const [message, setMessage] = useState("");

  const handleWellnessCheck = () => {
    const check = {
      checkedAt: new Date().toISOString(),
      status: "ok",
      message: "Je vais bien, tout va bien, je rassure les miens.",
    };

    localStorage.setItem("lastWellnessCheck", JSON.stringify(check));
    setMessage("Merci, vos proches sont rassurés.");
  };

  return (
    <main className="min-h-screen bg-rose-50 px-4 py-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-[2rem] bg-white p-6 text-center shadow-sm">
          <h1 className="text-4xl font-bold text-slate-900">Bonjour</h1>

          <p className="mt-3 text-xl font-semibold text-rose-700">
            Que souhaitez-vous faire ?
          </p>

          {message && (
            <div className="mt-6 rounded-3xl bg-green-100 p-5 text-xl font-bold text-green-800">
              {message}
            </div>
          )}

          <div className="mt-8 space-y-5">
            <button
              type="button"
              onClick={handleWellnessCheck}
              className="min-h-32 w-full rounded-[2rem] bg-green-500 px-6 text-3xl font-bold text-white shadow transition hover:bg-green-600"
            >
              <Image
                src="/icons/je-vais-bien-heart-192.png"
                alt=""
                width={64}
                height={64}
                className="mx-auto mb-3 rounded-2xl"
                priority
              />
              Je vais bien
            </button>

            <Link
              href="/proches"
              className="flex min-h-32 w-full flex-col items-center justify-center rounded-[2rem] bg-blue-500 px-6 text-center text-3xl font-bold text-white shadow transition hover:bg-blue-600"
            >
              <Image
                src="/icons/appeler-proche-phone-192.png"
                alt=""
                width={64}
                height={64}
                className="mb-3 rounded-2xl"
                priority
              />
              Appeler un proche
            </Link>
          </div>

          <p className="mt-6 text-base text-slate-500">
            Deux choix simples pour rester serein.
          </p>
        </div>
      </div>
    </main>
  );
}
