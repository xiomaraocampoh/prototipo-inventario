'use client';

import { CATEGORIA_ELECTROTERAPIA, CATEGORIAS_INSUMO } from '../../lib/inventarioCategorias';

/** @param {{ productos: object[], filtroCategoria: string, onFiltroChange: (c: string) => void }} props */
export function InventarioTablaFiltrada({ productos, filtroCategoria, onFiltroChange }) {
  const filas =
    filtroCategoria === 'todas'
      ? productos
      : productos.filter((p) => p.categoria === filtroCategoria);

  return (
    <section className="flex flex-col gap-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm" aria-labelledby="titulo-inventario-tabla">
      <div className="flex flex-col gap-6 border-b border-slate-200 p-6 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1">
          <h2 id="titulo-inventario-tabla" className="text-lg font-semibold text-slate-700">
            Inventario actual
          </h2>
          <p className="mt-2 break-words text-sm leading-relaxed text-slate-500">
            Filtra por categoría. Los productos Electroterapia muestran su serial cuando aplica.
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-2 sm:w-72">
          <label htmlFor="filtro-categoria" className="text-sm font-medium text-slate-700">
            Categoría
          </label>
          <select
            id="filtro-categoria"
            value={filtroCategoria}
            onChange={(e) => onFiltroChange(e.target.value)}
            className="min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          >
            <option value="todas">Todas las categorías</option>
            {CATEGORIAS_INSUMO.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th scope="col" className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Código
              </th>
              <th scope="col" className="min-w-[10rem] px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Nombre
              </th>
              <th scope="col" className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Categoría
              </th>
              <th scope="col" className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Serial
              </th>
              <th scope="col" className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Peso (kg)
              </th>
              <th scope="col" className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Refrig.
              </th>
              <th scope="col" className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Vencimiento
              </th>
              <th scope="col" className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Stock
              </th>
              <th scope="col" className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Mínimo
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filas.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-10 text-center text-sm text-slate-500">
                  No hay productos en esta categoría. Ajusta el filtro o registra uno nuevo.
                </td>
              </tr>
            ) : (
              filas.map((p) => {
                const bajoMinimo = p.stock <= p.stockMinimo;
                return (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="max-w-[8rem] px-6 py-4 align-top">
                      <span className="block truncate font-mono text-xs font-medium text-slate-700" title={p.codigo}>
                        {p.codigo}
                      </span>
                    </td>
                    <td className="max-w-xs px-6 py-4 align-top">
                      <span className="block break-words font-medium text-slate-700">{p.nombre}</span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 align-top text-slate-600">{p.categoria}</td>
                    <td className="max-w-[10rem] px-6 py-4 align-top">
                      {p.categoria === CATEGORIA_ELECTROTERAPIA && p.codigoSerial ? (
                        <span className="block truncate font-mono text-xs text-slate-700" title={p.codigoSerial}>
                          {p.codigoSerial}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 align-top tabular-nums text-slate-600">{p.pesoKg}</td>
                    <td className="whitespace-nowrap px-6 py-4 align-top">
                      {p.refrigeracion ? (
                        <span className="inline-flex rounded-lg bg-sky-500/15 px-2 py-1 text-xs font-medium text-sky-700">
                          Sí
                        </span>
                      ) : (
                        <span className="text-slate-400">No</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 align-top tabular-nums text-slate-600">{formatearFecha(p.fechaVencimiento)}</td>
                    <td className="whitespace-nowrap px-6 py-4 align-top tabular-nums font-semibold text-slate-700">
                      <span className={bajoMinimo ? 'text-amber-700' : undefined}>{p.stock}</span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 align-top tabular-nums text-slate-600">{p.stockMinimo}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <footer className="border-t border-slate-200 bg-slate-50 px-6 py-4">
        <p className="text-sm text-slate-500">
          Mostrando <span className="font-medium text-slate-700">{filas.length}</span> de{' '}
          <span className="font-medium text-slate-700">{productos.length}</span> productos.
        </p>
      </footer>
    </section>
  );
}

function formatearFecha(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}
