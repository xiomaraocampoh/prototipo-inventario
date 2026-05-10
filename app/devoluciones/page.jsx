'use client';

import { useMemo, useState } from 'react';
import { StocklyAppShell } from '../../components/stockly/StocklyAppShell';

const PRODUCTOS_MOCK = [
  { id: 'pe1', nombre: 'Electroestimulador portátil Pro-200', categoria: 'Eléctrico' },
  { id: 'pe2', nombre: 'Ultrasonido terapéutico US-50', categoria: 'Electroterapia' },
  { id: 'px1', nombre: 'Gel conductor ultrasonido 1 L', categoria: 'Consumible' },
  { id: 'px2', nombre: 'Bandas elásticas terapéuticas (kit)', categoria: 'Rehabilitación' },
];

const CLIENTES_MOCK = [
  { id: 'c1', nombre: 'Clínica Fisio Norte' },
  { id: 'c2', nombre: 'Rehabilitar Centro' },
];

const CATEGORIAS_PERMITIDAS_DEVOLUCION = new Set(['Eléctrico', 'Electroterapia']);

const MENSAJE_RN04 = 'Solo productos eléctricos permiten devoluciones';

export default function DevolucionesPage() {
  const [productoId, setProductoId] = useState('');
  const [clienteId, setClienteId] = useState(CLIENTES_MOCK[0]?.id ?? '');
  const [cantidad, setCantidad] = useState('1');
  const [causa, setCausa] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [usuarioRecibe, setUsuarioRecibe] = useState('María Gómez');
  const [mensajeExito, setMensajeExito] = useState('');

  const productoSeleccionado = useMemo(
    () => PRODUCTOS_MOCK.find((p) => p.id === productoId) ?? null,
    [productoId],
  );

  const categoriaPermiteDevolucion =
    productoSeleccionado != null && CATEGORIAS_PERMITIDAS_DEVOLUCION.has(productoSeleccionado.categoria);

  const mostrarErrorRn04 = productoSeleccionado != null && !categoriaPermiteDevolucion;

  const formularioValido =
    productoSeleccionado != null &&
    categoriaPermiteDevolucion &&
    clienteId !== '' &&
    cantidad.trim() !== '' &&
    Number(cantidad) > 0 &&
    causa.trim() !== '' &&
    usuarioRecibe.trim() !== '';

  function guardarDevolucion(evento) {
    evento.preventDefault();
    if (!formularioValido) return;
    setMensajeExito('Devolución registrada (simulada). Stock y auditoría se actualizarían en backend.');
    window.setTimeout(() => setMensajeExito(''), 5000);
  }

  return (
    <StocklyAppShell>
      <main className="flex flex-1 flex-col gap-8 bg-slate-50 p-6 text-slate-700 sm:p-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
          <header className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-700 sm:text-3xl">Devoluciones</h1>
            <p className="max-w-2xl text-base leading-relaxed text-slate-500">
              Registro de devoluciones de cliente (RF-12). La regla de negocio RN-04 restringe el producto a categorías eléctricas.
            </p>
          </header>

          {mensajeExito ? (
            <div
              className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-emerald-900 shadow-sm"
              role="status"
              aria-live="polite"
            >
              <p className="text-sm font-semibold">{mensajeExito}</p>
            </div>
          ) : null}

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-slate-700">Nueva devolución</h2>
            <form onSubmit={guardarDevolucion} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="dev-producto" className="text-sm font-medium text-slate-700">
                  Producto
                </label>
                <select
                  id="dev-producto"
                  value={productoId}
                  onChange={(e) => setProductoId(e.target.value)}
                  required
                  className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                >
                  <option value="" disabled>
                    Seleccione un producto…
                  </option>
                  {PRODUCTOS_MOCK.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre} — {p.categoria}
                    </option>
                  ))}
                </select>
                {productoSeleccionado ? (
                  <p className="text-xs text-slate-500">
                    Categoría en sistema: <span className="font-medium text-slate-600">{productoSeleccionado.categoria}</span>
                  </p>
                ) : null}
              </div>

              {mostrarErrorRn04 ? (
                <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700" role="alert">
                  {MENSAJE_RN04}
                </p>
              ) : null}

              <div className="flex flex-col gap-2">
                <label htmlFor="dev-cliente" className="text-sm font-medium text-slate-700">
                  Cliente
                </label>
                <select
                  id="dev-cliente"
                  value={clienteId}
                  onChange={(e) => setClienteId(e.target.value)}
                  required
                  className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                >
                  {CLIENTES_MOCK.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap">
                <div className="flex min-w-[12rem] flex-1 flex-col gap-2">
                  <label htmlFor="dev-cantidad" className="text-sm font-medium text-slate-700">
                    Cantidad
                  </label>
                  <input
                    id="dev-cantidad"
                    type="number"
                    min={1}
                    step={1}
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    required
                    className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-700 tabular-nums focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  />
                </div>
                <div className="flex min-w-0 flex-[2] flex-col gap-2">
                  <label htmlFor="dev-usuario" className="text-sm font-medium text-slate-700">
                    Usuario que recibe
                  </label>
                  <input
                    id="dev-usuario"
                    type="text"
                    value={usuarioRecibe}
                    onChange={(e) => setUsuarioRecibe(e.target.value)}
                    required
                    placeholder="Nombre del responsable en almacén"
                    className="w-full min-w-0 rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="dev-causa" className="text-sm font-medium text-slate-700">
                  Causa
                </label>
                <input
                  id="dev-causa"
                  type="text"
                  value={causa}
                  onChange={(e) => setCausa(e.target.value)}
                  required
                  placeholder="Ej. Garantía, error de pedido, daño en transporte…"
                  className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="dev-descripcion" className="text-sm font-medium text-slate-700">
                  Descripción adicional
                </label>
                <textarea
                  id="dev-descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  rows={4}
                  placeholder="Detalle libre: estado del empaque, serial, acuerdo con el cliente…"
                  className="w-full resize-y rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>

              <div className="flex flex-wrap justify-end gap-4">
                <button
                  type="submit"
                  disabled={!formularioValido}
                  className="rounded-lg bg-blue-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
                >
                  Guardar devolución
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </StocklyAppShell>
  );
}
