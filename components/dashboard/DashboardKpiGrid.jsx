'use client';

import { stockTotal } from '../../lib/stocklyInventarioSimulado';
import { clienteConMasVentasPiezas } from '../../lib/stocklyDashboardSesion';
import { porcentajeLineasSobreMinimo } from '../../lib/dashboardAlertas';

/**
 * @param {{
 *   productos: object[],
 *   piezasDespachadas: number,
 *   numeroEntradas: number,
 *   ventasPorCliente: Record<string, number>,
 * }} props
 */
export function DashboardKpiGrid({ productos, piezasDespachadas, numeroEntradas, ventasPorCliente }) {
  const topCliente = clienteConMasVentasPiezas(ventasPorCliente);

  let mayor = null;
  let menor = null;
  if (productos.length) {
    mayor = productos.reduce((a, b) => (stockTotal(a) >= stockTotal(b) ? a : b));
    menor = productos.reduce((a, b) => (stockTotal(a) <= stockTotal(b) ? a : b));
  }

  const pctDisponible = porcentajeLineasSobreMinimo(productos);

  const tarjetas = [
    {
      titulo: 'Productos despachados',
      valor: piezasDespachadas.toLocaleString('es-PE'),
      subtitulo: 'Unidades retiradas del inventario acumuladas (simulado).',
    },
    {
      titulo: 'Número de entradas',
      valor: numeroEntradas.toLocaleString('es-PE'),
      subtitulo: 'Registros de recepción sumados en la sesión compartida.',
    },
    {
      titulo: 'Cliente con más ventas',
      valor: topCliente.nombre,
      subtitulo:
        topCliente.piezas > 0
          ? `${topCliente.piezas.toLocaleString('es-PE')} u. vendidas (simulado).`
          : 'Sin ventas registradas aún en el prototipo.',
      valorEsTexto: true,
    },
    {
      titulo: 'Mayor stock',
      valor: mayor ? `${mayor.codigo}` : '—',
      subtitulo: mayor ? `${mayor.nombre} · ${stockTotal(mayor).toLocaleString('es-PE')} u.` : 'Sin productos.',
      valorEsTexto: true,
    },
    {
      titulo: 'Menor stock',
      valor: menor ? `${menor.codigo}` : '—',
      subtitulo: menor ? `${menor.nombre} · ${stockTotal(menor).toLocaleString('es-PE')} u.` : 'Sin productos.',
      valorEsTexto: true,
    },
    {
      titulo: '% stock disponible',
      valor: `${pctDisponible} %`,
      subtitulo: 'Líneas de inventario por encima del stock mínimo (indicador de cobertura).',
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Indicadores clave">
      {tarjetas.map((k) => (
        <article
          key={k.titulo}
          className="flex min-w-0 flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2 className="text-sm font-medium text-slate-500">{k.titulo}</h2>
          <p
            className={`min-w-0 break-words font-semibold tracking-tight text-slate-700 ${
              k.valorEsTexto ? 'text-xl sm:text-2xl' : 'text-3xl tabular-nums'
            }`}
          >
            {k.valor}
          </p>
          <p className="break-words text-sm leading-relaxed text-slate-500">{k.subtitulo}</p>
        </article>
      ))}
    </section>
  );
}
