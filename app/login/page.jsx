'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Boxes } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { STOCKLY_SESSION_KEY } from '../../lib/stocklySession';

function FieldLabel({ htmlFor, children, required }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700">
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
    <div className="flex min-h-screen flex-col bg-slate-50 lg:grid lg:min-h-screen lg:grid-cols-2">
      <aside
        className="flex flex-col gap-8 bg-blue-800 p-8 text-white lg:min-h-screen lg:gap-10 lg:p-10 xl:p-12"
        aria-label="Bienvenida"
      >
        <div className="flex flex-wrap items-start gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-900 shadow-sm ring-1 ring-white/10"
            aria-hidden
          >
            <Boxes className="h-6 w-6 text-white" strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">Stockly</p>
            <p className="mt-1 break-words text-base leading-snug text-blue-100">Inventario y logística para centros de distribución</p>
          </div>
        </div>

        <div className="flex max-w-lg flex-col gap-4">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">Bienvenido</h1>
          <p className="break-words text-base leading-relaxed text-blue-100">
            Optimiza tu operación con trazabilidad en tiempo real, control de stock y flujos logísticos eficientes. Menos
            pérdidas, más precisión, mejores decisiones.
          </p>
          <ul className="mt-2 flex list-disc flex-col gap-3 pl-5 text-sm leading-relaxed text-blue-100">
            <li className="break-words pl-1">Visibilidad de inventario por ubicación y estado.</li>
            <li className="break-words pl-1">Seguridad por roles y auditoría de movimientos.</li>
            <li className="break-words pl-1">Alertas y reportes para decisiones rápidas.</li>
          </ul>
        </div>

        <p className="mt-auto border-t border-blue-700/60 pt-6 text-sm text-blue-100">
          Conexión segura · Estándares empresariales · Operación 24/7
        </p>
      </aside>

      <main className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12" aria-label="Formulario de ingreso">
        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col gap-8 rounded-lg border border-slate-200 bg-white p-8 shadow-sm sm:p-8">
            <header className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-700">Acceso al sistema</h2>
              <p className="break-words text-sm leading-relaxed text-slate-500">
                Ingresa tus credenciales corporativas para continuar.
              </p>
            </header>

            <form className="flex flex-col gap-6" onSubmit={manejarSubmit} noValidate>
              <div className="flex flex-col gap-4">
                <FieldLabel htmlFor="login-correo" required>
                  Correo corporativo
                </FieldLabel>
                <input
                  id="login-correo"
                  name="correoCorporativo"
                  type="email"
                  value={valores.correoCorporativo}
                  onChange={manejarCambio}
                  onBlur={manejarBlur}
                  placeholder="ejemplo@empresa.com"
                  autoComplete="username"
                  required
                  disabled={estaEnviando}
                  aria-invalid={errores.correoCorporativo ? 'true' : 'false'}
                  aria-describedby={errores.correoCorporativo ? 'login-correo-error' : undefined}
                  className="min-h-[2.75rem] w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-500 shadow-sm transition focus-visible:border-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/30 disabled:opacity-60"
                />
                {errores.correoCorporativo ? (
                  <p id="login-correo-error" className="break-words text-sm text-slate-700" role="alert">
                    {errores.correoCorporativo}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-4">
                <FieldLabel htmlFor="login-password" required>
                  Contraseña
                </FieldLabel>
                <div className="flex min-w-0 flex-row flex-wrap items-stretch gap-0 rounded-lg border border-slate-200 bg-white shadow-sm focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/30">
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
                    className="min-h-[2.75rem] min-w-0 flex-1 rounded-l-lg border-0 bg-transparent px-4 py-3 text-sm text-slate-700 placeholder:text-slate-500 focus:outline-none focus:ring-0 disabled:opacity-60"
                  />
                  <button
                    type="button"
                    className="shrink-0 rounded-r-lg px-4 text-xs font-semibold text-blue-800 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:opacity-60"
                    onClick={() => setContrasenaVisible((v) => !v)}
                    disabled={estaEnviando}
                    aria-label={contrasenaVisible ? 'Ocultar contraseña' : 'Ver contraseña'}
                  >
                    {contrasenaVisible ? 'Ocultar' : 'Ver'}
                  </button>
                </div>
                {errores.contrasena ? (
                  <p id="login-password-error" className="break-words text-sm text-slate-700" role="alert">
                    {errores.contrasena}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-row flex-wrap items-center justify-between gap-4">
                <label className="flex min-w-0 cursor-pointer flex-row flex-wrap items-center gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    name="recordarme"
                    checked={valores.recordarme}
                    onChange={manejarCambio}
                    disabled={estaEnviando}
                    className="h-4 w-4 shrink-0 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
                  />
                  <span className="break-words">Recordarme</span>
                </label>
                <button
                  type="button"
                  className="shrink-0 text-sm font-semibold text-blue-800 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {mensajeEstado?.texto ? (
                <div
                  className={`rounded-lg border p-4 text-sm leading-relaxed break-words ${
                    mensajeEstado.tipo === 'exito'
                      ? 'border-slate-200 bg-slate-50 text-slate-700'
                      : mensajeEstado.tipo === 'error'
                        ? 'border-sky-500/40 bg-sky-500/10 text-slate-700'
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
                className="flex min-h-[2.75rem] w-full flex-row flex-wrap items-center justify-center gap-3 rounded-lg bg-blue-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                aria-busy={estaEnviando ? 'true' : 'false'}
              >
                {estaEnviando ? (
                  <span
                    className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-white border-t-transparent"
                    aria-hidden
                  />
                ) : null}
                <span>{estaEnviando ? 'Ingresando…' : 'Ingresar'}</span>
              </button>

              <div className="flex flex-row flex-wrap items-center gap-4" aria-hidden="true">
                <span className="h-px min-w-[2rem] flex-1 bg-slate-200" />
                <span className="shrink-0 text-xs font-medium text-slate-500">o</span>
                <span className="h-px min-w-[2rem] flex-1 bg-slate-200" />
              </div>

              <Link
                href="/solicitar-acceso"
                className="flex min-h-[2.75rem] w-full flex-row flex-wrap items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-blue-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
              >
                Solicitar acceso
              </Link>

              <p className="text-center text-xs text-slate-500">© {new Date().getFullYear()} Stockly</p>
            </form>
          </div>

          {process.env.NODE_ENV === 'development' ? (
            <p className="mt-6 break-words text-center text-xs text-slate-500">
              Demo: <span className="font-mono text-slate-700">admin@stockly.com</span> ·{' '}
              <span className="font-mono text-slate-700">Admin1234</span>
            </p>
          ) : null}
        </div>
      </main>
    </div>
  );
}
