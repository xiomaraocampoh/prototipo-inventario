'use client';

import { useState } from 'react';
import { StocklyAppShell } from '../../components/stockly/StocklyAppShell';

const PRODUCTOS_MOCK = [
  { id: 'p1', nombre: 'Electroestimulador portátil Pro-200' },
  { id: 'p2', nombre: 'Ultrasonido terapéutico US-50' },
  { id: 'p3', nombre: 'Gel conductor ultrasonido 1 L' },
  { id: 'p4', nombre: 'Bandas elásticas terapéuticas (kit)' },
];

export default function AjustesInventarioPage() {
  const [productoId, setProductoId] = useState(PRODUCTOS_MOCK[0]?.id ?? '');
  const [tipoAjuste, setTipoAjuste] = useState('ingreso');
  const [cantidad, setCantidad] = useState('1');
  const [motivo, setMotivo] = useState('');
  const [usuario, setUsuario] = useState('Camila Méndez');
  const [exito, setExito] = useState(false);

  function enviarAjuste(evento) {
    evento.preventDefault();
    setExito(true);
    window.setTimeout(() => setExito(false), 4500);
  }

  return (
    <StocklyAppShell>
      <main className="flex flex-1 flex-col gap-8 bg-slate-50 p-6 text-slate-700 sm:p-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
          <header className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-700 sm:text-3xl">Ajustes de inventario</h1>
            <p className="max-w-2xl text-base leading-relaxed text-slate-500">
              Corrección de diferencias físicas frente al stock del sistema (RF-13, RF-14). Esta acción queda trazada en auditoría en un entorno real.
            </p>
          </header>

          {exito ? (
            <div
              className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-emerald-900 shadow-sm"
              role="status"
              aria-live="polite"
            >
              <p className="text-sm font-semibold">Ajuste registrado correctamente (simulado).</p>
              <p className="mt-2 text-sm text-emerald-800">
                El movimiento de tipo «Ajuste» se habría enviado al módulo de auditoría con el usuario y motivo indicados.
              </p>
            </div>
          ) : null}

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-slate-700">Registrar ajuste</h2>
            <form onSubmit={enviarAjuste} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="ajuste-producto" className="text-sm font-medium text-slate-700">
                  Producto
                </label>
                <select
                  id="ajuste-producto"
                  value={productoId}
                  onChange={(e) => setProductoId(e.target.value)}
                  className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                >
                  {PRODUCTOS_MOCK.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <fieldset className="flex flex-col gap-3 rounded-lg border border-slate-200 p-6">
                <legend className="px-2 text-sm font-medium text-slate-700">Tipo de ajuste</legend>
                <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                  <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                    <input
                      type="radio"
                      name="tipo-ajuste"
                      value="ingreso"
                      checked={tipoAjuste === 'ingreso'}
                      onChange={() => setTipoAjuste('ingreso')}
                      className="h-4 w-4 border-slate-300 text-blue-800 focus:ring-sky-500"
                    />
                    Ingreso (incrementa stock)
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                    <input
                      type="radio"
                      name="tipo-ajuste"
                      value="salida"
                      checked={tipoAjuste === 'salida'}
                      onChange={() => setTipoAjuste('salida')}
                      className="h-4 w-4 border-slate-300 text-blue-800 focus:ring-sky-500"
                    />
                    Salida (reduce stock)
                  </label>
                </div>
              </fieldset>

              <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap">
                <div className="flex min-w-[12rem] flex-1 flex-col gap-2">
                  <label htmlFor="ajuste-cantidad" className="text-sm font-medium text-slate-700">
                    Cantidad ajustada
                  </label>
                  <input
                    id="ajuste-cantidad"
                    type="number"
                    min={1}
                    step={1}
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    required
                    className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-700 tabular-nums focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  />
                </div>
                <div className="flex min-w-0 flex-[2] flex-col gap-2 sm:flex-[3]">
                  <label htmlFor="ajuste-usuario" className="text-sm font-medium text-slate-700">
                    Usuario
                  </label>
                  <input
                    id="ajuste-usuario"
                    type="text"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                    placeholder="Responsable del ajuste"
                    className="w-full min-w-0 rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="ajuste-motivo" className="text-sm font-medium text-slate-700">
                  Motivo
                </label>
                <textarea
                  id="ajuste-motivo"
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  required
                  rows={4}
                  placeholder="Describa la inconsistencia detectada y la evidencia del conteo físico."
                  className="w-full resize-y rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>

              <div className="flex flex-wrap justify-end gap-4">
                <button
                  type="submit"
                  className="rounded-lg bg-blue-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
                >
                  Guardar ajuste
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </StocklyAppShell>
  );
}
