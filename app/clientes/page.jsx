"use client";

import React, { useState } from 'react';
import { StocklyAppShell } from '../../components/stockly/StocklyAppShell';

// Custom hook simulado
function useClientes() {
    const [clientes, setClientes] = useState([
        { id: 1, nombre: "Cliente Corporativo S.A.", telefono: "555-0101", direccion: "Av. Principal 123" },
        { id: 2, nombre: "Tiendas del Centro", telefono: "555-0202", direccion: "Calle Comercial 45" }
    ]);

    const agregarCliente = (nuevoCliente) => {
        const newId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
        setClientes([{ id: newId, ...nuevoCliente }, ...clientes]);
    };

    return { clientes, agregarCliente };
}

export default function ClientesPage() {
    const { clientes, agregarCliente } = useClientes();
    const [formData, setFormData] = useState({ nombre: "", telefono: "", direccion: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGuardar = (e) => {
        e.preventDefault();
        if (!formData.nombre.trim()) return;
        agregarCliente(formData);
        setFormData({ nombre: "", telefono: "", direccion: "" });
    };

    return (
        <StocklyAppShell>
            <div className="p-6 max-w-7xl mx-auto bg-slate-50 min-h-screen text-slate-700">
                <h1 className="text-2xl font-bold mb-6 text-slate-800">Gestión de Clientes</h1>

                {/* Formulario */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <h2 className="text-lg font-semibold mb-4 text-slate-800">Registrar Nuevo Cliente</h2>
                    <form onSubmit={handleGuardar} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Ej. Distribuidora XYZ"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
                            <input
                                type="text"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Ej. 555-1234"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Dirección</label>
                            <input
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Ej. Calle 10 #20-30"
                                required
                            />
                        </div>
                        <div className="md:col-span-3 flex justify-end mt-2">
                            <button
                                type="submit"
                                className="bg-blue-800 text-white font-medium py-2 px-6 rounded-md shadow hover:bg-blue-900 transition-colors"
                            >
                                Guardar Cliente
                            </button>
                        </div>
                    </form>
                </div>

                {/* Tabla */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse table-fixed min-w-[600px]">
                            <thead className="bg-slate-100 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-slate-500 uppercase w-16">ID</th>
                                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-slate-500 uppercase w-1/3">Nombre Completo</th>
                                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-slate-500 uppercase w-1/4">Teléfono</th>
                                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-slate-500 uppercase w-1/3">Dirección</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {clientes.map((cliente) => (
                                    <tr key={cliente.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {cliente.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 truncate" title={cliente.nombre}>
                                            {cliente.nombre}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm truncate text-slate-600" title={cliente.telefono}>
                                            {cliente.telefono}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm truncate text-slate-600" title={cliente.direccion}>
                                            {cliente.direccion}
                                        </td>
                                    </tr>
                                ))}
                                {clientes.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-sm text-slate-500">
                                            No hay clientes registrados.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </StocklyAppShell>
    );
}
