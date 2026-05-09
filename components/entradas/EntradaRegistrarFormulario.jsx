'use client';

import { useState } from 'react';
import { stockTotal } from '../../lib/stocklyInventarioSimulado';
import { TIPOS_ENTRADA, UBICACIONES_STOCKLY } from '../../lib/entradasReglas';

const crearEntradaVacia = () => ({
  productoId: '',
  cantidad: '1',
  tipoEntrada: TIPOS_ENTRADA[0],
  usuario: '',
  ubicacion: UBICACIONES_STOCKLY[0],
  documento: '',
  proveedor: '',
});

/**
 * @param {{
 *   productos: object[],
 *   onRegistrarEntrada: (payload: {
 *     productoId: string,
 *     cantidad: number,
 *     tipoEntrada: string,
 *     usuario: string,
 *     ubicacion: string,
 *     documento: string,
 *     proveedor: string,
 *   }) => void
 * }} props
 */
export function EntradaRegistrarFormulario({ productos, onRegistrarEntrada }) {
  const [campos, setCampos] = useState(() => crearEntradaVacia());
  const [mensajeExito, setMensajeExito] = useState(null);

  const cantidadNum = Math.max(0, Math.floor(Number(campos.cantidad) || 0));
  const esCompra = campos.tipoEntrada === 'Compra';

  function cambiarCampo(clave, valor) {
    setCampos((c) => ({ ...c, [clave]: valor }));
    setMensajeExito(null);
  }

  function enviar(evento) {
    evento.preventDefault();
    setMensajeExito(null);
    if (!campos.productoId) return;
    if (!campos.usuario.trim()) return;
    if (cantidadNum < 1) return;
    if (esCompra && !campos.proveedor.trim()) return;

    onRegistrarEntrada({
      productoId: campos.productoId,
      cantidad: cantidadNum,
      tipoEntrada: campos.tipoEntrada,
      usuario: campos.usuario.trim(),
      ubicacion: campos.ubicacion,
      documento: campos.documento.trim(),
      proveedor: esCompra ? campos.proveedor.trim() : '',
    });
    setCampos(crearEntradaVacia());
    setMensajeExito('Entrada registrada y stock actualizado en el simulador.');
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="titulo-entrada-registro">
      <header className="mb-6 flex flex-col gap-2">
        <h2 id="titulo-entrada-registro" className="text-lg font-semibold text-slate-700">
          Registrar entrada
        </h2>
        <p className="max-w-2xl break-words text-sm leading-relaxed text-slate-500">
          Unidades enteras. Indica en qué ubicación se suma el stock (Bodega o Vitrina). En compras se solicita el proveedor.
        </p>
      </header>

      <form className="grid grid-cols-1 gap-6 md:grid-cols-2" onSubmit={enviar}>
        <div className="flex min-w-0 flex-col gap-2 md:col-span-2">
          <label htmlFor="entrada-producto" className="text-sm font-medium text-slate-700">
            Producto
          </label>
          <select
            id="entrada-producto"
            name="productoId"
            required
            value={campos.productoId}
            onChange={(e) => cambiarCampo('productoId', e.target.value)}
            className="min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          >
            <option value="">Selecciona un producto existente…</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.codigo} — {p.nombre} (total {stockTotal(p)} u.)
              </option>
            ))}
          </select>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="entrada-cantidad" className="text-sm font-medium text-slate-700">
            Cantidad (unidades)
          </label>
          <input
            id="entrada-cantidad"
            name="cantidad"
            type="number"
            inputMode="numeric"
            min="1"
            step="1"
            required
            value={campos.cantidad}
            onChange={(e) => cambiarCampo('cantidad', e.target.value)}
            className="min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm tabular-nums text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          />
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="entrada-tipo" className="text-sm font-medium text-slate-700">
            Tipo de entrada
          </label>
          <select
            id="entrada-tipo"
            name="tipoEntrada"
            value={campos.tipoEntrada}
            onChange={(e) => cambiarCampo('tipoEntrada', e.target.value)}
            className="min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          >
            {TIPOS_ENTRADA.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="entrada-usuario" className="text-sm font-medium text-slate-700">
            Usuario
          </label>
          <input
            id="entrada-usuario"
            name="usuario"
            type="text"
            required
            placeholder="Ej. Luis Ortega"
            autoComplete="name"
            value={campos.usuario}
            onChange={(e) => cambiarCampo('usuario', e.target.value)}
            className="min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          />
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="entrada-ubicacion" className="text-sm font-medium text-slate-700">
            Ubicación
          </label>
          <select
            id="entrada-ubicacion"
            name="ubicacion"
            value={campos.ubicacion}
            onChange={(e) => cambiarCampo('ubicacion', e.target.value)}
            className="min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          >
            {UBICACIONES_STOCKLY.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        <div className="flex min-w-0 flex-col gap-2 md:col-span-2">
          <label htmlFor="entrada-documento" className="text-sm font-medium text-slate-700">
            Documento o referencia <span className="font-normal text-slate-500">(opcional)</span>
          </label>
          <input
            id="entrada-documento"
            name="documento"
            type="text"
            value={campos.documento}
            onChange={(e) => cambiarCampo('documento', e.target.value)}
            placeholder="Guía de remisión, factura, acta…"
            className="min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          />
        </div>

        {esCompra ? (
          <div className="flex min-w-0 flex-col gap-2 md:col-span-2">
            <label htmlFor="entrada-proveedor" className="text-sm font-medium text-slate-700">
              Proveedor
            </label>
            <input
              id="entrada-proveedor"
              name="proveedor"
              type="text"
              required={esCompra}
              value={campos.proveedor}
              onChange={(e) => cambiarCampo('proveedor', e.target.value)}
              className="min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            />
          </div>
        ) : null}

        <div className="flex flex-col gap-4 md:col-span-2">
          {mensajeExito ? (
            <p className="break-words text-sm text-sky-600" role="status">
              {mensajeExito}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={!campos.productoId}
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-lg bg-blue-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Confirmar entrada
            </button>
            <button
              type="button"
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
              onClick={() => {
                setCampos(crearEntradaVacia());
                setMensajeExito(null);
              }}
            >
              Limpiar
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
