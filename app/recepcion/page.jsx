'use client';

import { useCallback, useState } from 'react';
import { StocklyAppShell } from '../../components/stockly/StocklyAppShell';
import { EntradaRegistrarFormulario } from '../../components/entradas/EntradaRegistrarFormulario';
import { useProductosSimulados } from '../../hooks/useProductosSimulados';
import { registrarEntradaEnMetricas } from '../../lib/stocklyDashboardSesion';

export default function RecepcionPage() {
  const { productos, registrarEntrada } = useProductosSimulados();
  const [historial, setHistorial] = useState([]);

  const registrar = useCallback(
    (payload) => {
      const prod = productos.find((p) => p.id === payload.productoId);
      const productoEtiqueta = prod ? `${prod.codigo} — ${prod.nombre}` : payload.productoId;
      registrarEntrada(payload.productoId, payload.ubicacion, payload.cantidad);
      registrarEntradaEnMetricas();
      setHistorial((h) => [
        {
          id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `e-${Date.now()}`,
          ...payload,
          productoEtiqueta,
          cuando: new Date().toISOString(),
        },
        ...h,
      ]);
    },
    [registrarEntrada, productos]
  );

  return (
    <StocklyAppShell>
      <main className="flex flex-1 flex-col gap-8 p-6 sm:p-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <section className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-700 sm:text-3xl">Entradas (recepción)</h1>
            <p className="max-w-2xl break-words text-base leading-relaxed text-slate-500">
              Registro de ingreso de mercancía al inventario simulado. El stock aumenta solo en la ubicación elegida
              (bodega o vitrina) y se comparte con Inventario mediante la sesión del navegador.
            </p>
          </section>

          <EntradaRegistrarFormulario productos={productos} onRegistrarEntrada={registrar} />

          <section
            className="flex flex-col gap-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
            aria-labelledby="titulo-historial-entradas"
          >
            <header className="border-b border-slate-200 p-6">
              <h2 id="titulo-historial-entradas" className="text-lg font-semibold text-slate-700">
                Últimas entradas (simuladas)
              </h2>
              <p className="mt-2 text-sm text-slate-500">Historial solo en esta sesión de prototipo.</p>
            </header>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th scope="col" className="min-w-[10rem] px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Producto
                    </th>
                    <th scope="col" className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Tipo
                    </th>
                    <th scope="col" className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Cantidad
                    </th>
                    <th scope="col" className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Ubicación
                    </th>
                    <th scope="col" className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Usuario
                    </th>
                    <th scope="col" className="min-w-[12rem] px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Documento / proveedor
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {historial.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-500">
                        Aún no registras entradas en esta vista.
                      </td>
                    </tr>
                  ) : (
                    historial.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50">
                        <td className="max-w-xs px-6 py-4 align-top">
                          <span className="block break-words text-sm text-slate-700">{row.productoEtiqueta}</span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-700">{row.tipoEntrada}</td>
                        <td className="whitespace-nowrap px-6 py-4 tabular-nums text-slate-700">+{row.cantidad}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-slate-600">{row.ubicacion}</td>
                        <td className="max-w-[10rem] px-6 py-4 align-top">
                          <span className="block truncate" title={row.usuario}>
                            {row.usuario}
                          </span>
                        </td>
                        <td className="max-w-md px-6 py-4 align-top text-slate-600">
                          <span className="break-words">
                            {row.documento ? <span className="block">{row.documento}</span> : null}
                            {row.proveedor ? (
                              <span className="block text-slate-500">Proveedor: {row.proveedor}</span>
                            ) : null}
                            {!row.documento && !row.proveedor ? <span className="text-slate-400">—</span> : null}
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
