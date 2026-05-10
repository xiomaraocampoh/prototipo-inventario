'use client';

import { useState } from 'react';
import { StocklyAppShell } from '../../components/stockly/StocklyAppShell';

const clientesIniciales = [
  { id: 1, nombre: 'Clínica Fisio Norte', telefono: '+57 601 555 0101', direccion: 'Carrera 15 # 90-20, Bogotá' },
  { id: 2, nombre: 'Rehabilitar Centro', telefono: '+57 604 555 0202', direccion: 'Calle 48 # 12-33, Medellín' },
];

export default function ClientesPage() {
  const [clientes, setClientes] = useState(clientesIniciales);
  const [formulario, setFormulario] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
  });

  function actualizarCampo(evento) {
    const { name, value } = evento.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  }

  function guardarCliente(evento) {
    evento.preventDefault();
    if (!formulario.nombre.trim()) return;

    const siguienteId =
      clientes.length === 0 ? 1 : Math.max(...clientes.map((c) => c.id)) + 1;

    setClientes([
      {
        id: siguienteId,
        nombre: formulario.nombre.trim(),
        telefono: formulario.telefono.trim(),
        direccion: formulario.direccion.trim(),
      },
      ...clientes,
    ]);
    setFormulario({ nombre: '', telefono: '', direccion: '' });
  }

  return (
    <StocklyAppShell>
      <main className="flex flex-1 flex-col gap-8 bg-slate-50 p-6 text-slate-700 sm:p-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <header className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-700 sm:text-3xl">Clientes</h1>
            <p className="max-w-2xl text-base leading-relaxed text-slate-500">
              Registro de clientes (RF-19, RF-20). Alta con datos de contacto y listado en tabla semántica.
            </p>
          </header>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-slate-700">Registrar cliente</h2>
            <form onSubmit={guardarCliente} className="flex flex-col gap-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:flex-wrap">
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <label htmlFor="cliente-nombre" className="text-sm font-medium text-slate-700">
                    Nombre
                  </label>
                  <input
                    id="cliente-nombre"
                    name="nombre"
                    type="text"
                    value={formulario.nombre}
                    onChange={actualizarCampo}
                    required
                    autoComplete="organization"
                    placeholder="Ej. Centro de rehabilitación Los Andes"
                    className="w-full min-w-0 rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <label htmlFor="cliente-telefono" className="text-sm font-medium text-slate-700">
                    Teléfono
                  </label>
                  <input
                    id="cliente-telefono"
                    name="telefono"
                    type="tel"
                    value={formulario.telefono}
                    onChange={actualizarCampo}
                    required
                    autoComplete="tel"
                    placeholder="Ej. +57 601 555 1234"
                    className="w-full min-w-0 rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  />
                </div>
                <div className="flex min-w-[min(100%,16rem)] flex-[2] flex-col gap-2 lg:min-w-0">
                  <label htmlFor="cliente-direccion" className="text-sm font-medium text-slate-700">
                    Dirección
                  </label>
                  <input
                    id="cliente-direccion"
                    name="direccion"
                    type="text"
                    value={formulario.direccion}
                    onChange={actualizarCampo}
                    required
                    autoComplete="street-address"
                    placeholder="Ej. Avenida Siempre Viva 742"
                    className="w-full min-w-0 rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  />
                </div>
              </div>
              <div className="flex flex-wrap justify-end gap-4">
                <button
                  type="submit"
                  className="rounded-lg bg-blue-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
                >
                  Guardar cliente
                </button>
              </div>
            </form>
          </section>

          <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-700">Clientes registrados</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] table-fixed border-collapse text-left">
                <thead className="border-b border-slate-200 bg-slate-100">
                  <tr>
                    <th scope="col" className="w-16 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Nombre
                    </th>
                    <th scope="col" className="w-44 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Teléfono
                    </th>
                    <th scope="col" className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Dirección
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {clientes.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-sm text-slate-500">
                        No hay clientes registrados.
                      </td>
                    </tr>
                  ) : (
                    clientes.map((cliente) => (
                      <tr key={cliente.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm tabular-nums text-slate-500">{cliente.id}</td>
                        <td className="max-w-0 px-6 py-4 text-sm font-medium text-slate-700">
                          <span className="block truncate" title={cliente.nombre}>
                            {cliente.nombre}
                          </span>
                        </td>
                        <td className="max-w-0 px-6 py-4 text-sm text-slate-600">
                          <span className="block truncate" title={cliente.telefono}>
                            {cliente.telefono}
                          </span>
                        </td>
                        <td className="max-w-0 px-6 py-4 text-sm text-slate-600">
                          <span className="block truncate" title={cliente.direccion}>
                            {cliente.direccion}
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
