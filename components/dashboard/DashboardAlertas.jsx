'use client';

import { construirAlertasInventario } from '../../lib/dashboardAlertas';

/** @param {{ productos: object[] }} props */
export function DashboardAlertas({ productos }) {
  const alertas = construirAlertasInventario(productos);

  return (
    <section
      className="flex flex-col gap-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
      aria-labelledby="titulo-dashboard-alertas"
    >
      <header className="border-b border-slate-200 p-6 sm:p-8">
        <h2 id="titulo-dashboard-alertas" className="text-lg font-semibold text-slate-700">
          Alertas de inventario
        </h2>
        <p className="mt-2 max-w-2xl break-words text-sm leading-relaxed text-slate-500">
          RF-22: caducidad y planificación. RF-23: insumos que requieren refrigeración. Los estilos usan acentos en sky-500
          o tonos rojo/ámbar suaves.
        </p>
      </header>

      {alertas.length === 0 ? (
        <p className="p-6 text-sm text-slate-500 sm:p-8">No hay alertas activas con los datos simulados actuales.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-slate-200">
          {alertas.map((a) => (
            <li key={a.id}>
              <article
                className={`flex flex-col gap-3 p-6 sm:flex-row sm:flex-wrap sm:items-start sm:gap-6 sm:p-8 ${estiloFondo(
                  a.severidad,
                  a.tipo
                )}`}
              >
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-semibold ${estiloPill(a)}`}>
                      {a.tipo === 'refrigeracion' ? 'Refrigeración' : 'Vencimiento'}
                    </span>
                    <h3 className="text-base font-semibold text-slate-700">{a.titulo}</h3>
                  </div>
                  <p className="break-words text-sm leading-relaxed text-slate-600">{a.detalle}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function estiloFondo(severidad, tipo) {
  if (tipo === 'refrigeracion') return 'bg-sky-500/8';
  if (severidad === 'critico') return 'bg-red-50/80';
  if (severidad === 'atencion') return 'bg-amber-50/70';
  return 'bg-slate-50';
}

function estiloPill(a) {
  if (a.tipo === 'refrigeracion') return 'bg-sky-500 text-white shadow-sm';
  if (a.severidad === 'critico') return 'border border-red-200 bg-red-100 text-red-800';
  if (a.severidad === 'atencion') return 'border border-amber-200 bg-amber-100 text-amber-900';
  return 'border border-slate-200 bg-white text-slate-700';
}
