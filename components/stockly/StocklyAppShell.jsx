'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { STOCKLY_SESSION_KEY } from '../../lib/stocklySession';
import {
  Bell,
  Boxes,
  LayoutDashboard,
  Menu,
  Package,
  Search,
  SlidersHorizontal,
  Truck,
  Undo2,
  Users,
  X,
  UserCircle,
  FileText
} from 'lucide-react';

export const NAV = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/recepcion', label: 'Recepción', icon: Package },
  { href: '/despacho', label: 'Despacho', icon: Truck },
  { href: '/inventario', label: 'Inventario', icon: Boxes },
  { href: '/ajustes', label: 'Ajustes', icon: SlidersHorizontal },
  { href: '/devoluciones', label: 'Devoluciones', icon: Undo2 },
  { href: '/usuarios', label: 'Usuarios', icon: Users },
  { href: '/clientes', label: 'Clientes', icon: UserCircle },
  { href: '/auditoria', label: 'Auditoría', icon: FileText },
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

/** @param {{ children: import('react').ReactNode }} props */
export function StocklyAppShell({ children }) {
  const pathname = usePathname();
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
      <section className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-6" aria-busy="true">
        <div
          className="h-10 w-10 animate-spin rounded-full border-2 border-blue-800 border-t-transparent"
          aria-hidden
        />
        <p className="text-sm text-slate-500">Cargando…</p>
      </section>
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
                <p className="mt-1 break-words text-sm leading-snug text-blue-100">Insumos médicos · fisioterapia</p>
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
              const active = pathname === href;
              return (
                <li key={href} className="min-w-0">
                  <Link
                    href={href}
                    onClick={() => setMobileNavOpen(false)}
                    className={`flex min-h-[2.75rem] flex-row flex-wrap items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-800 ${active
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
              <label htmlFor="stockly-global-search" className="sr-only">
                Buscar en Stockly
              </label>
              <input
                id="stockly-global-search"
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

        {children}
      </div>
    </div>
  );
}
