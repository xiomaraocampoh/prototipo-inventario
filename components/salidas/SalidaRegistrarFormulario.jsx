'use client';

import { useMemo, useState } from 'react';
import {
  stockEnUbicacion,
  stockTotal,
} from '../../lib/stocklyInventarioSimulado';
import { TIPOS_CLIENTE_VENTA, TIPOS_SALIDA, UBICACIONES_STOCKLY } from '../../lib/salidasReglas';

const crearSalidaVacia = () => ({
  productoId: '',
  cantidad: '1',
  tipoSalida: TIPOS_SALIDA[0],
  usuario: '',
  ubicacion: UBICACIONES_STOCKLY[0],
  cliente: '',
  tipoCliente: TIPOS_CLIENTE_VENTA[0].value,
  pesoTotal: '',
});

/**
 * @param {{
 *   productos: object[],
 *   onRegistrarSalida: (payload: {
 *     productoId: string,
 *     cantidad: number,
 *     tipoSalida: string,
 *     usuario: string,
 *     ubicacion: string,
 *     cliente?: string,
 *     tipoCliente?: string,
 *     pesoTotalKg?: number,
 *   }) => void
 * }} props
 */
export function SalidaRegistrarFormulario({ productos, onRegistrarSalida }) {
  const [campos, setCampos] = useState(() => crearSalidaVacia());
  const [mensajeExito, setMensajeExito] = useState(null);

  const seleccionado = useMemo(
    () => productos.find((p) => p.id === campos.productoId) ?? null,
    [productos, campos.productoId]
  );

  const disponibleUbicacion = seleccionado ? stockEnUbicacion(seleccionado, campos.ubicacion) : 0;

  const cantidadNum = Math.max(0, Math.floor(Number(campos.cantidad) || 0));
  const excedeStock = seleccionado && cantidadNum > disponibleUbicacion;
  const esVenta = campos.tipoSalida === 'Venta';

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
    if (excedeStock) return;
    if (esVenta) {
      const kg = Number(campos.pesoTotal);
      if (!campos.cliente.trim()) return;
      if (!Number.isFinite(kg) || kg <= 0) return;
      onRegistrarSalida({
        productoId: campos.productoId,
        cantidad: cantidadNum,
        tipoSalida: campos.tipoSalida,
        usuario: campos.usuario.trim(),
        ubicacion: campos.ubicacion,
        cliente: campos.cliente.trim(),
        tipoCliente: campos.tipoCliente,
        pesoTotalKg: kg,
      });
    } else {
      onRegistrarSalida({
        productoId: campos.productoId,
        cantidad: cantidadNum,
        tipoSalida: campos.tipoSalida,
        usuario: campos.usuario.trim(),
        ubicacion: campos.ubicacion,
      });
    }
    setCampos(crearSalidaVacia());
    setMensajeExito('Salida registrada y stock actualizado en el simulador.');
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="titulo-salida-registro">
      <header className="mb-6 flex flex-col gap-2">
        <h2 id="titulo-salida-registro" className="text-lg font-semibold text-slate-700">
          Registrar salida
        </h2>
        <p className="max-w-2xl break-words text-sm leading-relaxed text-slate-500">
          Cantidades en unidades enteras. Ubicación Bodega o Vitrina. Si la cantidad supera el stock disponible en esa
          ubicación, el envío queda bloqueado y verás una alerta.
        </p>
      </header>

      {excedeStock ? (
        <aside
          className="mb-6 flex flex-wrap items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"
          role="alert"
        >
          <span className="mt-0.5 inline-flex shrink-0 rounded-lg bg-amber-200 px-2 py-0.5 text-xs font-semibold text-amber-900">
            Stock insuficiente
          </span>
          <p className="min-w-0 flex-1 break-words">
            Intentas despachar <strong className="font-semibold text-amber-950">{cantidadNum}</strong> unidad(es),
            pero en <strong className="font-semibold text-amber-950">{campos.ubicacion}</strong> hay solo{' '}
            <strong className="font-semibold text-amber-950">{disponibleUbicacion}</strong>.
          </p>
        </aside>
      ) : null}

      <form className="grid grid-cols-1 gap-6 md:grid-cols-2" onSubmit={enviar}>
        <div className="flex min-w-0 flex-col gap-2 md:col-span-2">
          <label htmlFor="salida-producto" className="text-sm font-medium text-slate-700">
            Producto
          </label>
          <select
            id="salida-producto"
            name="productoId"
            required
            value={campos.productoId}
            onChange={(e) => cambiarCampo('productoId', e.target.value)}
            className="min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          >
            <option value="">Selecciona un producto…</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.codigo} — {p.nombre} (total {stockTotal(p)} u.)
              </option>
            ))}
          </select>
          {seleccionado ? (
            <p className="text-xs leading-relaxed text-slate-500">
              Stock total:{' '}
              <span className="font-medium text-slate-700">{stockTotal(seleccionado)}</span> · En bodega:{' '}
              <span className="font-medium text-slate-700">{seleccionado.stockBodega ?? 0}</span> · En vitrina:{' '}
              <span className="font-medium text-slate-700">{seleccionado.stockVitrina ?? 0}</span>
            </p>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="salida-cantidad" className="text-sm font-medium text-slate-700">
            Cantidad (unidades)
          </label>
          <input
            id="salida-cantidad"
            name="cantidad"
            type="number"
            inputMode="numeric"
            min="1"
            step="1"
            required
            value={campos.cantidad}
            onChange={(e) => cambiarCampo('cantidad', e.target.value)}
            aria-invalid={excedeStock}
            className={`min-w-0 rounded-lg border px-4 py-3 text-sm tabular-nums shadow-sm focus:outline-none focus:ring-2 ${
              excedeStock
                ? 'border-amber-300 bg-amber-50 text-amber-950 focus:border-amber-500 focus:ring-amber-400/35'
                : 'border-slate-200 bg-white text-slate-700 focus:border-sky-500 focus:ring-sky-500/30'
            }`}
          />
          {seleccionado ? (
            <p className="text-xs text-slate-500">
              Disponible en {campos.ubicacion}:{' '}
              <span className="font-semibold text-slate-700">{disponibleUbicacion}</span> u.
            </p>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="salida-tipo" className="text-sm font-medium text-slate-700">
            Tipo de salida
          </label>
          <select
            id="salida-tipo"
            name="tipoSalida"
            value={campos.tipoSalida}
            onChange={(e) => cambiarCampo('tipoSalida', e.target.value)}
            className="min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          >
            {TIPOS_SALIDA.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="salida-usuario" className="text-sm font-medium text-slate-700">
            Usuario
          </label>
          <input
            id="salida-usuario"
            name="usuario"
            type="text"
            required
            placeholder="Ej. María López"
            autoComplete="name"
            value={campos.usuario}
            onChange={(e) => cambiarCampo('usuario', e.target.value)}
            className="min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          />
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="salida-ubicacion" className="text-sm font-medium text-slate-700">
            Ubicación
          </label>
          <select
            id="salida-ubicacion"
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

        {esVenta ? (
          <>
            <div className="flex min-w-0 flex-col gap-2 md:col-span-2">
              <label htmlFor="salida-cliente" className="text-sm font-medium text-slate-700">
                Cliente
              </label>
              <input
                id="salida-cliente"
                name="cliente"
                type="text"
                required={esVenta}
                value={campos.cliente}
                onChange={(e) => cambiarCampo('cliente', e.target.value)}
                className="min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              />
            </div>
            <div className="flex min-w-0 flex-col gap-2">
              <label htmlFor="salida-tipo-cliente" className="text-sm font-medium text-slate-700">
                Tipo de cliente
              </label>
              <select
                id="salida-tipo-cliente"
                name="tipoCliente"
                value={campos.tipoCliente}
                onChange={(e) => cambiarCampo('tipoCliente', e.target.value)}
                className="min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              >
                {TIPOS_CLIENTE_VENTA.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex min-w-0 flex-col gap-2">
              <label htmlFor="salida-peso-total" className="text-sm font-medium text-slate-700">
                Peso total (kg)
              </label>
              <input
                id="salida-peso-total"
                name="pesoTotal"
                type="number"
                inputMode="decimal"
                min="0.01"
                step="0.01"
                required={esVenta}
                value={campos.pesoTotal}
                onChange={(e) => cambiarCampo('pesoTotal', e.target.value)}
                className="min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm tabular-nums text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              />
            </div>
          </>
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
              disabled={excedeStock || !campos.productoId}
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-lg bg-blue-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Confirmar salida
            </button>
            <button
              type="button"
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
              onClick={() => {
                setCampos(crearSalidaVacia());
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
