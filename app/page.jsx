'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { STOCKLY_SESSION_KEY } from '../lib/stocklySession';
import {
  Bell,
  Boxes,
  LayoutDashboard,
  Menu,
  Package,
  Search,
  Truck,
  Users,
  X,
} from 'lucide-react';

const NAV = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/recepcion', label: 'Recepción', icon: Package },
  { href: '/despacho', label: 'Despacho', icon: Truck },
  { href: '/inventario', label: 'Inventario', icon: Boxes },
  { href: '/usuarios', label: 'Usuarios', icon: Users },
];

const KPIS = [
  { title: 'Productos Totales', value: '12.847', subtitle: '+2,4 % vs. mes anterior' },
  { title: 'Recepciones Pendientes', value: '23', subtitle: '5 con documentación incompleta' },
  { title: 'Despachos de Hoy', value: '156', subtitle: 'Meta diaria 180' },
  { title: 'Alertas de Stock', value: '8', subtitle: 'SKU bajo punto de reorden' },
];

const MOVEMENTS = [
  {
    producto: 'Tornillo hexagonal M10 × 30',
    tipo: 'Despacho',
    cantidad: '-240',
    fecha: '09/05/2026 · 14:22',
    estado: 'Completado',
    estadoTone: 'ok',
  },
  {
    producto: 'Cable subterráneo 3×2,5 mm',
    tipo: 'Recepción',
    cantidad: '+120',
    fecha: '09/05/2026 · 11:08',
    estado: 'En proceso',
    estadoTone: 'warn',
  },
  {
    producto: 'Válvula esférica 2"',
    tipo: 'Ajuste inventario',
    cantidad: '-3',
    fecha: '09/05/2026 · 09:51',
    estado: 'Completado',
    estadoTone: 'ok',
  },
  {
    producto: 'Pallet soporte galvanizado',
    tipo: 'Recepción',
    cantidad: '+45',
    fecha: '08/05/2026 · 16:33',
    estado: 'Pendiente',
    estadoTone: 'pending',
  },
  {
    producto: 'Contactor 40A bobina 220V',
    tipo: 'Despacho',
    cantidad: '-18',
    fecha: '08/05/2026 · 15:09',
    estado: 'En proceso',
    estadoTone: 'warn',
  },
];

function LogoMark() {
  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-900 text-white shadow-sm ring-1 ring-white/10"
      aria-hidden
    >
      <Boxes className="h-5 w-5" strokeWidth={2} />
    </div>
  );
}

/** Badges: secundario sky-500 para alerta moderada; resto corporativo sin negro puro */
function StatusBadge({ estado, tone }) {
  const styles = {
    ok: 'border border-slate-200 bg-slate-50 text-slate-700',
    warn: 'border border-white/25 bg-sky-500 text-white',
    pending: 'border border-slate-200 bg-white text-slate-700',
  };
  return (
    <span
      className={`inline-flex max-w-full min-w-0 items-center justify-center rounded-lg px-2.5 py-1 text-xs font-medium break-words ${styles[tone]}`}
    >
      <span className="min-w-0 text-center">{estado}</span>
    </span>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [authReady, setAuthReady] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!sessionStorage.getItem(STOCKLY_SESSION_KEY)) {
      router.replace('/login');
      return;
    }
    setAuthReady(true);
  }, [router]);

  if (!authReady) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-6" role="status">
        <div
          className="h-10 w-10 animate-spin rounded-full border-2 border-blue-800 border-t-transparent"
          aria-hidden
        />
        <p className="text-sm text-slate-500">Cargando…</p>
      </div>
    );
  }

  function cerrarSesion() {
    sessionStorage.removeItem(STOCKLY_SESSION_KEY);
    router.push('/login');
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 lg:flex-row">
      <button
        type="button"
        className={`fixed inset-0 z-40 bg-slate-900/40 transition-opacity lg:hidden ${mobileNavOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        aria-hidden={!mobileNavOpen}
        tabIndex={-1}
        onClick={() => setMobileNavOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(100%,18rem)] flex-col bg-blue-800 text-white shadow-lg transition-transform duration-200 ease-out lg:static lg:z-0 lg:w-64 lg:max-w-none lg:translate-x-0 lg:shadow-none ${mobileNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        aria-label="Navegación principal"
      >
        <div className="flex flex-col gap-4 border-b border-blue-900/60 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <Link href="/" className="flex min-w-0 flex-1 flex-wrap items-center gap-4" onClick={() => setMobileNavOpen(false)}>
              <LogoMark />
              <div className="min-w-0 flex-1 basis-[8rem]">
                <p className="truncate text-lg font-semibold text-white">Stockly</p>
                <p className="mt-1 break-words text-sm leading-snug text-blue-100">Inventario y logística</p>
              </div>
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-800 lg:hidden"
              aria-label="Cerrar menú"
              onClick={() => setMobileNavOpen(false)}
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-6 lg:px-6">
          <ul className="flex flex-col gap-2">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = href === '/';
              return (
                <li key={href} className="min-w-0">
                  <Link
                    href={href}
                    onClick={() => setMobileNavOpen(false)}
                    className={`flex min-h-[2.75rem] flex-row flex-wrap items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-800 ${
                      active
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'text-blue-100 hover:bg-blue-900 hover:text-white'
                    }`}
                  >
                    <Icon className="h-[1.125rem] w-[1.125rem] shrink-0" strokeWidth={2} aria-hidden />
                    <span className="min-w-0 flex-1 break-words">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto border-t border-blue-900/60 p-6">
          <div className="flex flex-col gap-4 rounded-lg border border-blue-700/50 bg-blue-900/40 p-6 shadow-sm">
            <div className="flex min-w-0 flex-row flex-wrap items-start gap-4">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sky-500 text-sm font-semibold text-white shadow-sm"
                aria-hidden
              >
                CM
              </div>
              <div className="min-w-0 flex-1">
                <p className="break-words text-sm font-semibold text-white">Camila Méndez</p>
                <p className="mt-1 break-words text-sm leading-snug text-blue-100">Jefe de Almacén</p>
              </div>
            </div>
            <button
              type="button"
              onClick={cerrarSesion}
              className="w-full rounded-lg border border-blue-600/60 bg-transparent py-3 text-sm font-medium text-blue-100 transition hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-blue-900 bg-blue-800 text-white shadow-sm">
          <div className="flex flex-row flex-wrap items-center gap-4 p-6 sm:gap-6">
            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-800 lg:hidden"
              aria-label="Abrir menú"
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>

            <div className="flex min-h-[2.75rem] min-w-0 flex-1 flex-row flex-wrap items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/30">
              <Search className="h-4 w-4 shrink-0 text-slate-500" aria-hidden />
              <label htmlFor="dashboard-search" className="sr-only">
                Buscar en Stockly
              </label>
              <input
                id="dashboard-search"
                type="search"
                placeholder="Buscar productos, lotes, guías…"
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-500 focus:outline-none"
                autoComplete="off"
              />
            </div>

            <button
              type="button"
              className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-800 text-white shadow-sm transition-colors hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-800"
              aria-label="Notificaciones (3 sin leer)"
            >
              <Bell className="h-5 w-5" aria-hidden />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-sky-500 ring-2 ring-blue-800" />
            </button>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-8 p-6 sm:p-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-700 sm:text-3xl">Dashboard</h1>
              <p className="max-w-2xl break-words text-base leading-relaxed text-slate-500">
                Resumen operativo del almacén: existencias, recepciones, despachos y alertas en un solo lugar.
              </p>
            </div>

            <section aria-label="Indicadores clave">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {KPIS.map((kpi) => (
                  <article
                    key={kpi.title}
                    className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-8 shadow-sm"
                  >
                    <h2 className="text-sm font-medium text-slate-500">{kpi.title}</h2>
                    <p className="text-3xl font-semibold tabular-nums tracking-tight text-slate-700">{kpi.value}</p>
                    <p className="break-words text-sm leading-relaxed text-slate-500">{kpi.subtitle}</p>
                  </article>
                ))}
              </div>
            </section>

            <section
              className="flex flex-col gap-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
              aria-label="Últimos movimientos"
            >
              <div className="flex flex-col gap-4 border-b border-slate-200 p-8">
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-slate-700">Últimos movimientos</h2>
                  <p className="mt-2 break-words text-sm leading-relaxed text-slate-500">
                    Actividad reciente en recepción y despacho.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th scope="col" className="whitespace-nowrap px-8 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Producto
                      </th>
                      <th scope="col" className="whitespace-nowrap px-8 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Tipo
                      </th>
                      <th scope="col" className="whitespace-nowrap px-8 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Cantidad
                      </th>
                      <th scope="col" className="whitespace-nowrap px-8 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Fecha
                      </th>
                      <th scope="col" className="whitespace-nowrap px-8 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {MOVEMENTS.map((row) => (
                      <tr key={`${row.producto}-${row.fecha}`} className="hover:bg-slate-50">
                        <td className="max-w-xs px-8 py-5 align-top">
                          <span className="block break-words font-medium text-slate-700">{row.producto}</span>
                        </td>
                        <td className="px-8 py-5 align-top text-slate-500">
                          <span className="block break-words">{row.tipo}</span>
                        </td>
                        <td className="whitespace-nowrap px-8 py-5 align-top tabular-nums font-medium text-slate-700">
                          {row.cantidad}
                        </td>
                        <td className="whitespace-nowrap px-8 py-5 align-top text-slate-500">{row.fecha}</td>
                        <td className="min-w-[8rem] max-w-[12rem] px-8 py-5 align-top">
                          <StatusBadge estado={row.estado} tone={row.estadoTone} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
