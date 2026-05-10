'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { STOCKLY_SESSION_KEY } from '../../lib/stocklySession';

const FONDO_FORMULARIO = '#f4f6f8';

function LogoStockly() {
  return (
    <div
      className="grid h-14 w-14 shrink-0 grid-cols-2 gap-1 rounded-xl bg-white/10 p-2 ring-1 ring-white/15"
      aria-hidden
    >
      <span className="rounded-md bg-slate-300/90" />
      <span className="rounded-md bg-slate-300/90" />
      <span className="rounded-md bg-slate-300/90" />
      <span className="rounded-md bg-orange-400 shadow-sm" />
    </div>
  );
}

/** Onda suave entre panel y fondo (borde curvo hacia la derecha). */
function OndaDivisoriaSuave({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 56 800"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill={FONDO_FORMULARIO}
        d="M0 0 C32 133 32 267 0 400 C32 533 32 667 0 800 L56 800 L56 0 Z"
      />
    </svg>
  );
}

function FieldLabel({ htmlFor, children, required }) {
  return (
    <label htmlFor={htmlFor} className="text-xs font-bold uppercase tracking-wide text-slate-500">
      {children}
      {required ? <span className="text-sky-500"> *</span> : null}
    </label>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { valores, errores, estaEnviando, esFormularioValido, mensajeEstado, manejarCambio, manejarBlur, manejarSubmit } =
    useAuth();

  const [contrasenaVisible, setContrasenaVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (sessionStorage.getItem(STOCKLY_SESSION_KEY)) {
      router.replace('/');
    }
    return undefined;
  }, [router]);

  useEffect(() => {
    if (mensajeEstado.tipo !== 'exito') return undefined;
    if (typeof window === 'undefined') return undefined;
    sessionStorage.setItem(STOCKLY_SESSION_KEY, '1');
    const id = window.setTimeout(() => {
      router.replace('/');
    }, 650);
    return () => window.clearTimeout(id);
  }, [mensajeEstado.tipo, router]);

  const tituloEstado = useMemo(() => {
    if (!mensajeEstado?.texto) return '';
    if (mensajeEstado.tipo === 'exito') return 'Estado: éxito';
    if (mensajeEstado.tipo === 'error') return 'Estado: error';
    return 'Estado';
  }, [mensajeEstado]);

  return (
    <div className="flex min-h-screen flex-col bg-blue-950 lg:flex-row">
      {/* Panel marca (izquierda escritorio / arriba móvil) */}
      <aside
        className="relative flex min-h-[42vh] flex-col overflow-hidden bg-blue-950 px-6 pb-10 pt-6 text-white lg:min-h-screen lg:w-[42%] lg:max-w-xl lg:shrink-0 lg:px-10 lg:pb-12 lg:pt-8"
        aria-label="Marca Stockly"
      >
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-900/35 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-28 -left-16 h-80 w-80 rounded-full bg-blue-900/30 blur-3xl"
          aria-hidden
        />

        <OndaDivisoriaSuave className="pointer-events-none absolute -right-px top-0 hidden h-full w-[min(18vw,5.5rem)] lg:block" />

        <div className="relative z-10 flex flex-1 flex-col">
          <Link
            href="/"
            className="inline-flex max-w-full items-center gap-2 truncate text-sm font-medium text-blue-100/90 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950"
          >
            <ChevronLeft className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            Volver al inicio
          </Link>

          <div className="flex flex-1 flex-col items-center justify-center gap-6 py-10 text-center lg:py-0">
            <LogoStockly />
            <div className="flex max-w-md flex-col gap-3 px-2">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Stockly</h1>
              <p className="text-sm leading-relaxed text-blue-100/90 sm:text-base">
                Sistema de gestión de inventario para equipos profesionales
              </p>
            </div>
          </div>

          <p className="relative z-10 mt-auto text-center text-xs text-blue-200/80 lg:text-left">Stockly © 2026</p>
        </div>

        {/* Onda inferior en móvil */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-14 overflow-hidden lg:hidden"
          style={{ color: FONDO_FORMULARIO }}
          aria-hidden
        >
          <svg className="h-full w-full" viewBox="0 0 400 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill={FONDO_FORMULARIO}
              d="M0 56V0c80 40 160 40 240 20s120-20 160 0v36H0z"
            />
          </svg>
        </div>
      </aside>

      {/* Formulario */}
      <main
        className="relative flex flex-1 flex-col justify-center px-6 py-10 sm:px-10 lg:px-16 lg:py-12"
        style={{ backgroundColor: FONDO_FORMULARIO }}
        aria-label="Formulario de ingreso"
      >
        <div className="mx-auto w-full max-w-md">
          <header className="mb-10 flex flex-col gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">Bienvenido de nuevo</h2>
            <p className="text-sm leading-relaxed text-slate-500 sm:text-base">Ingresa tus credenciales para acceder</p>
          </header>

          <form className="flex flex-col gap-8" onSubmit={manejarSubmit} noValidate>
            <div className="flex flex-col gap-2">
              <FieldLabel htmlFor="login-correo" required>
                Correo electrónico
              </FieldLabel>
              <input
                id="login-correo"
                name="correoCorporativo"
                type="email"
                value={valores.correoCorporativo}
                onChange={manejarCambio}
                onBlur={manejarBlur}
                placeholder="admin@gmail.com"
                autoComplete="username"
                required
                disabled={estaEnviando}
                aria-invalid={errores.correoCorporativo ? 'true' : 'false'}
                aria-describedby={errores.correoCorporativo ? 'login-correo-error' : undefined}
                className="min-h-[3rem] w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition placeholder:text-slate-400 focus-visible:border-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/25 disabled:opacity-60"
              />
              {errores.correoCorporativo ? (
                <p id="login-correo-error" className="text-sm text-red-600" role="alert">
                  {errores.correoCorporativo}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <FieldLabel htmlFor="login-password" required>
                Contraseña
              </FieldLabel>
              <div className="flex min-w-0 flex-row flex-wrap items-stretch gap-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/25">
                <input
                  id="login-password"
                  name="contrasena"
                  type={contrasenaVisible ? 'text' : 'password'}
                  value={valores.contrasena}
                  onChange={manejarCambio}
                  onBlur={manejarBlur}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  disabled={estaEnviando}
                  aria-invalid={errores.contrasena ? 'true' : 'false'}
                  aria-describedby={errores.contrasena ? 'login-password-error' : undefined}
                  className="min-h-[3rem] min-w-0 flex-1 border-0 bg-transparent px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-0 disabled:opacity-60"
                />
                <button
                  type="button"
                  className="shrink-0 px-4 text-xs font-semibold text-blue-950 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500 disabled:opacity-60"
                  onClick={() => setContrasenaVisible((v) => !v)}
                  disabled={estaEnviando}
                  aria-label={contrasenaVisible ? 'Ocultar contraseña' : 'Ver contraseña'}
                >
                  {contrasenaVisible ? 'Ocultar' : 'Ver'}
                </button>
              </div>
              {errores.contrasena ? (
                <p id="login-password-error" className="text-sm text-red-600" role="alert">
                  {errores.contrasena}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <label className="flex min-w-0 cursor-pointer items-center gap-3 text-sm text-slate-600">
                <input
                  type="checkbox"
                  name="recordarme"
                  checked={valores.recordarme}
                  onChange={manejarCambio}
                  disabled={estaEnviando}
                  className="h-4 w-4 shrink-0 rounded border-slate-300 text-blue-950 focus:ring-sky-500"
                />
                <span className="break-words">Recordarme</span>
              </label>
              <button
                type="button"
                className="shrink-0 text-sm font-semibold text-blue-950 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {mensajeEstado?.texto ? (
              <div
                className={`rounded-lg border p-4 text-sm leading-relaxed break-words ${
                  mensajeEstado.tipo === 'exito'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                    : mensajeEstado.tipo === 'error'
                      ? 'border-red-200 bg-red-50 text-red-800'
                      : 'border-slate-200 bg-white text-slate-700'
                }`}
                role="status"
                aria-label={tituloEstado}
              >
                {mensajeEstado.texto}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={!esFormularioValido || estaEnviando}
              className="flex min-h-[3rem] w-full items-center justify-center gap-3 rounded-lg bg-blue-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              aria-busy={estaEnviando ? 'true' : 'false'}
            >
              {estaEnviando ? (
                <span
                  className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-white border-t-transparent"
                  aria-hidden
                />
              ) : null}
              <span>{estaEnviando ? 'Ingresando…' : 'Iniciar sesión'}</span>
            </button>

            <Link
              href="/solicitar-acceso"
              className="text-center text-sm font-semibold text-blue-950 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              Solicitar acceso
            </Link>

            {process.env.NODE_ENV === 'development' ? (
              <p className="text-center text-xs text-slate-500">
                Demo: <span className="font-mono text-slate-700">admin@gmail.com</span> ·{' '}
                <span className="font-mono text-slate-700">Admin1234</span>
                {' · también '}
                <span className="font-mono text-slate-700">admin@stockly.com</span>
              </p>
            ) : null}
          </form>
        </div>
      </main>
    </div>
  );
}
