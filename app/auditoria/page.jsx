'use client';

import { useMemo, useState } from 'react';
import { StocklyAppShell } from '../../components/stockly/StocklyAppShell';

const MOVIMIENTOS_MOCK = [
  {
    id: 1,
    fecha: '2026-05-08 08:30',
    tipo: 'Entrada',
    producto: 'Electroestimulador portátil Pro-200',
    cantidad: 24,
    usuario: 'María Gómez',
    detalle: 'OC-4401 · proveedor MedSupply',
  },
  {
    id: 2,
    fecha: '2026-05-08 11:15',
    tipo: 'Venta',
    producto: 'Bandas elásticas terapéuticas (kit)',
    cantidad: 6,
    usuario: 'Carlos Ruiz',
    detalle: 'Pedido cliente Clínica Fisio Norte',
  },
  {
    id: 3,
    fecha: '2026-05-09 09:05',
    tipo: 'Vitrina',
    producto: 'Ultrasonido terapéutico US-50',
    cantidad: 2,
    usuario: 'Ana López',
    detalle: 'Traslado bodega → vitrina exhibición',
  },
  {
    id: 4,
    fecha: '2026-05-09 14:22',
    tipo: 'Daño',
    producto: 'Cable para electroestimulador',
    cantidad: 3,
    usuario: 'Juan Pérez',
    detalle: 'Daño en manipulación durante inventario',
  },
  {
    id: 5,
    fecha: '2026-05-10 10:00',
    tipo: 'Devolución',
    producto: 'Electroestimulador portátil Pro-200',
    cantidad: 1,
    usuario: 'María Gómez',
    detalle: 'RN-04 · producto eléctrico · garantía',
  },
  {
    id: 6,
    fecha: '2026-05-10 16:40',
    tipo: 'Ajuste',
    producto: 'Gel conductor ultrasonido 1 L',
    cantidad: -4,
    usuario: 'Camila Méndez',
    detalle: 'Ajuste por conteo físico vs sistema',
  },
];

function claseBadgePorTipo(tipo) {
  switch (tipo) {
    case 'Entrada':
      return 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200';
    case 'Venta':
      return 'bg-blue-100 text-blue-800 ring-1 ring-blue-200';
    case 'Daño':
      return 'bg-red-100 text-red-800 ring-1 ring-red-200';
    case 'Devolución':
      return 'bg-amber-100 text-amber-900 ring-1 ring-amber-200';
    case 'Ajuste':
      return 'bg-sky-100 text-sky-900 ring-1 ring-sky-200';
    case 'Vitrina':
      return 'bg-violet-100 text-violet-900 ring-1 ring-violet-200';
    default:
      return 'bg-slate-100 text-slate-800 ring-1 ring-slate-200';
  }
}

export default function AuditoriaPage() {
  const [filtroUsuario, setFiltroUsuario] = useState('');
  const [filtroProducto, setFiltroProducto] = useState('');

  const historialFiltrado = useMemo(() => {
    const u = filtroUsuario.trim().toLowerCase();
    const p = filtroProducto.trim().toLowerCase();
    return MOVIMIENTOS_MOCK.filter((mov) => {
      const okUsuario = u === '' || mov.usuario.toLowerCase().includes(u);
      const okProducto = p === '' || mov.producto.toLowerCase().includes(p);
      return okUsuario && okProducto;
    });
  }, [filtroUsuario, filtroProducto]);

  return (
    <StocklyAppShell>
      <main className="flex flex-1 flex-col gap-8 bg-slate-50 p-6 text-slate-700 sm:p-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <header className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-700 sm:text-3xl">Auditoría</h1>
            <p className="max-w-2xl text-base leading-relaxed text-slate-500">
              Historial inmutable de movimientos (RF-17, RF-18). Filtre por usuario y por producto; los tipos se distinguen con etiquetas de color.
            </p>
          </header>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <label htmlFor="filtro-usuario" className="text-sm font-medium text-slate-700">
                  Por Usuario
                </label>
                <input
                  id="filtro-usuario"
                  type="search"
                  value={filtroUsuario}
                  onChange={(e) => setFiltroUsuario(e.target.value)}
                  placeholder="Nombre del usuario…"
                  className="w-full min-w-0 rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  autoComplete="off"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <label htmlFor="filtro-producto" className="text-sm font-medium text-slate-700">
                  Por Producto
                </label>
                <input
                  id="filtro-producto"
                  type="search"
                  value={filtroProducto}
                  onChange={(e) => setFiltroProducto(e.target.value)}
                  placeholder="Nombre del producto…"
                  className="w-full min-w-0 rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  autoComplete="off"
                />
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-700">Historial de movimientos</h2>
              <p className="mt-2 text-sm text-slate-500">Solo lectura: la tabla refleja eventos registrados en el dominio Stockly.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px] table-fixed border-collapse text-left">
                <thead className="border-b border-slate-200 bg-slate-100">
                  <tr>
                    <th scope="col" className="w-36 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Fecha
                    </th>
                    <th scope="col" className="w-36 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Tipo
                    </th>
                    <th scope="col" className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Producto
                    </th>
                    <th scope="col" className="w-20 px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Cantidad
                    </th>
                    <th scope="col" className="w-40 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Usuario
                    </th>
                    <th scope="col" className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Detalle
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {historialFiltrado.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-500">
                        No hay movimientos que coincidan con los filtros.
                      </td>
                    </tr>
                  ) : (
                    historialFiltrado.map((mov) => (
                      <tr key={mov.id} className="hover:bg-slate-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm tabular-nums text-slate-600">{mov.fecha}</td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`inline-flex max-w-full truncate rounded-full px-3 py-1 text-xs font-semibold ${claseBadgePorTipo(mov.tipo)}`}
                            title={mov.tipo}
                          >
                            {mov.tipo}
                          </span>
                        </td>
                        <td className="max-w-0 px-6 py-4 text-sm font-medium text-slate-700">
                          <span className="block truncate" title={mov.producto}>
                            {mov.producto}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center text-sm font-semibold tabular-nums text-slate-700">
                          {mov.cantidad}
                        </td>
                        <td className="max-w-0 px-6 py-4 text-sm text-slate-600">
                          <span className="block truncate" title={mov.usuario}>
                            {mov.usuario}
                          </span>
                        </td>
                        <td className="max-w-0 px-6 py-4 text-sm text-slate-600">
                          <span className="block truncate" title={mov.detalle}>
                            {mov.detalle}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </StocklyAppShell>
  );
}
