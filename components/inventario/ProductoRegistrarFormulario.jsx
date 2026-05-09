'use client';

import { useState } from 'react';
import { CATEGORIA_ELECTROTERAPIA, CATEGORIAS_INSUMO } from '../../lib/inventarioCategorias';

const vacio = {
  codigo: '',
  nombre: '',
  peso: '',
  categoria: CATEGORIAS_INSUMO[0],
  refrigeracion: false,
  fechaVencimiento: '',
  stock: '',
  stockMinimo: '',
  codigoSerial: '',
};

/** @param {{ onRegistrar: (producto: object) => void }} props */
export function ProductoRegistrarFormulario({ onRegistrar }) {
  const [form, setForm] = useState(vacio);
  const [mensaje, setMensaje] = useState(null);
  const esElectro = form.categoria === CATEGORIA_ELECTROTERAPIA;

  function actualizar(campo, valor) {
    setForm((f) => {
      const next = { ...f, [campo]: valor };
      if (campo === 'categoria' && valor !== CATEGORIA_ELECTROTERAPIA) {
        next.codigoSerial = '';
      }
      return next;
    });
  }

  function enviar(evento) {
    evento.preventDefault();
    const stock = Math.max(0, Math.floor(Number(form.stock) || 0));
    const stockMinimo = Math.max(0, Math.floor(Number(form.stockMinimo) || 0));
    const peso = Number(form.peso);
    if (!form.codigo.trim() || !form.nombre.trim()) {
      setMensaje({ tipo: 'error', texto: 'Completa código y nombre del producto.' });
      return;
    }
    if (!form.fechaVencimiento) {
      setMensaje({ tipo: 'error', texto: 'Indica la fecha de vencimiento.' });
      return;
    }
    if (esElectro && !form.codigoSerial.trim()) {
      setMensaje({ tipo: 'error', texto: 'Los productos de Electroterapia requieren código serial.' });
      return;
    }

    onRegistrar({
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `p-${Date.now()}`,
      codigo: form.codigo.trim(),
      nombre: form.nombre.trim(),
      pesoKg: Number.isFinite(peso) && peso >= 0 ? peso : 0,
      categoria: form.categoria,
      refrigeracion: Boolean(form.refrigeracion),
      fechaVencimiento: form.fechaVencimiento,
      stockBodega: stock,
      stockVitrina: 0,
      stockMinimo,
      codigoSerial: esElectro ? form.codigoSerial.trim() : null,
    });
    setForm(vacio);
    setMensaje({ tipo: 'ok', texto: 'Producto agregado al inventario simulado.' });
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="titulo-registro-producto">
      <div className="mb-6 flex flex-col gap-2">
        <h2 id="titulo-registro-producto" className="text-lg font-semibold text-slate-700">
          Registrar producto
        </h2>
        <p className="max-w-2xl break-words text-sm leading-relaxed text-slate-500">
          Unidades enteras de stock. El campo <span className="font-medium text-slate-700">Código serial</span> solo aplica a
          categoría Electroterapia.
        </p>
      </div>

      <form className="grid grid-cols-1 gap-6 md:grid-cols-2" onSubmit={enviar} noValidate>
        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="prod-codigo" className="text-sm font-medium text-slate-700">
            Código
          </label>
          <input
            id="prod-codigo"
            name="codigo"
            type="text"
            required
            value={form.codigo}
            onChange={(e) => actualizar('codigo', e.target.value)}
            className="min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            autoComplete="off"
          />
        </div>

        <div className="flex min-w-0 flex-col gap-2 md:col-span-2">
          <label htmlFor="prod-nombre" className="text-sm font-medium text-slate-700">
            Nombre
          </label>
          <input
            id="prod-nombre"
            name="nombre"
            type="text"
            required
            value={form.nombre}
            onChange={(e) => actualizar('nombre', e.target.value)}
            className="min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          />
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="prod-peso" className="text-sm font-medium text-slate-700">
            Peso (kg)
          </label>
          <input
            id="prod-peso"
            name="peso"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={form.peso}
            onChange={(e) => actualizar('peso', e.target.value)}
            className="min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm tabular-nums text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          />
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="prod-categoria" className="text-sm font-medium text-slate-700">
            Categoría
          </label>
          <select
            id="prod-categoria"
            name="categoria"
            value={form.categoria}
            onChange={(e) => actualizar('categoria', e.target.value)}
            className="min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          >
            {CATEGORIAS_INSUMO.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {esElectro ? (
          <div className="flex min-w-0 flex-col gap-2 md:col-span-2">
            <label htmlFor="prod-serial" className="text-sm font-medium text-slate-700">
              Código serial
            </label>
            <input
              id="prod-serial"
              name="codigoSerial"
              type="text"
              value={form.codigoSerial}
              onChange={(e) => actualizar('codigoSerial', e.target.value)}
              className="min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              placeholder="Ej. SN-88421-CLM"
              autoComplete="off"
            />
          </div>
        ) : null}

        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="prod-venc" className="text-sm font-medium text-slate-700">
            Fecha de vencimiento
          </label>
          <input
            id="prod-venc"
            name="fechaVencimiento"
            type="date"
            required
            value={form.fechaVencimiento}
            onChange={(e) => actualizar('fechaVencimiento', e.target.value)}
            className="min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          />
        </div>

        <div className="flex min-w-0 flex-wrap items-center gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4 md:col-span-2">
          <input
            id="prod-ref"
            name="refrigeracion"
            type="checkbox"
            checked={form.refrigeracion}
            onChange={(e) => actualizar('refrigeracion', e.target.checked)}
            className="h-4 w-4 shrink-0 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
          />
          <label htmlFor="prod-ref" className="min-w-0 flex-1 text-sm text-slate-700">
            Requiere refrigeración
          </label>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="prod-stock" className="text-sm font-medium text-slate-700">
            Stock inicial (unidades)
          </label>
          <input
            id="prod-stock"
            name="stock"
            type="number"
            inputMode="numeric"
            min="0"
            step="1"
            required
            value={form.stock}
            onChange={(e) => actualizar('stock', e.target.value)}
            className="min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm tabular-nums text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          />
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="prod-min" className="text-sm font-medium text-slate-700">
            Stock mínimo (unidades)
          </label>
          <input
            id="prod-min"
            name="stockMinimo"
            type="number"
            inputMode="numeric"
            min="0"
            step="1"
            required
            value={form.stockMinimo}
            onChange={(e) => actualizar('stockMinimo', e.target.value)}
            className="min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm tabular-nums text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          />
        </div>

        <div className="flex flex-col gap-4 md:col-span-2">
          {mensaje ? (
            <p
              role="status"
              className={`break-words text-sm ${mensaje.tipo === 'ok' ? 'text-sky-600' : 'text-amber-700'}`}
            >
              {mensaje.texto}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-4">
            <button
              type="submit"
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-lg bg-blue-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
            >
              Guardar en inventario
            </button>
            <button
              type="button"
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
              onClick={() => {
                setForm(vacio);
                setMensaje(null);
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
