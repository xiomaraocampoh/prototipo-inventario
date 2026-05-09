import Link from 'next/link';
import { Boxes } from 'lucide-react';

export const metadata = {
  title: 'Solicitar acceso — Stockly',
  description: 'Solicitud de acceso a Stockly',
};

export default function SolicitarAccesoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-blue-800 text-white shadow-sm">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-4 px-6 py-6 sm:gap-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900 shadow-sm ring-1 ring-white/10" aria-hidden>
            <Boxes className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-blue-100">Stockly</p>
            <h1 className="mt-1 break-words text-xl font-semibold text-white">Solicitar acceso</h1>
          </div>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 p-6 sm:p-8">
        <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <p className="break-words text-base leading-relaxed text-slate-500">
            Este flujo está en preparación. Si necesitas una cuenta corporativa, contacta al administrador de tu centro de distribución.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href="/login"
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-lg bg-blue-800 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
            >
              Volver al acceso
            </Link>
            <Link
              href="/login"
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-blue-800 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              Ya tengo cuenta
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
