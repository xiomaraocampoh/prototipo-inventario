'use client';

import { StocklyAppShell } from '../components/stockly/StocklyAppShell';

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
  return (
    <StocklyAppShell>
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
    </StocklyAppShell>
  );
}
