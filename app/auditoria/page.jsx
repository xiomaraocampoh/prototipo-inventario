"use client";

import React, { useState } from 'react';
import { StocklyAppShell } from '../../components/stockly/StocklyAppShell';

const mockAuditoria = [
    { id: 101, fecha: "2023-11-20 08:30:00", tipo: "Entrada", producto: "Laptop HP ProBook", cantidad: 50, usuario: "María Gómez", detalle: "Recepción de proveedor" },
    { id: 102, fecha: "2023-11-20 10:15:22", tipo: "Venta", producto: "Monitor Dell 24", cantidad: 2, usuario: "Carlos Ruiz", detalle: "Cliente S.A." },
    { id: 103, fecha: "2023-11-21 09:45:10", tipo: "Ajuste", producto: "Teclado Mecánico", cantidad: -1, usuario: "Juan Pérez", detalle: "Inventario físico" },
    { id: 104, fecha: "2023-11-21 14:20:05", tipo: "Daño", producto: "Mouse Inalámbrico", cantidad: 1, usuario: "Carlos Ruiz", detalle: "Defecto de fábrica" },
    { id: 105, fecha: "2023-11-22 11:00:00", tipo: "Entrada", producto: "Cable HDMI", cantidad: 100, usuario: "María Gómez", detalle: "Reabastecimiento" },
];

const getBadgeStyle = (tipo) => {
    switch (tipo) {
        case 'Entrada':
            return "bg-emerald-100 text-emerald-800";
        case 'Venta':
        case 'Daño':
        case 'Devolución':
            return "bg-orange-100 text-orange-800";
        case 'Ajuste':
            return "bg-sky-100 text-sky-800";
        default:
            return "bg-slate-100 text-slate-800";
    }
};

export default function AuditoriaPage() {
    const [filtroUsuario, setFiltroUsuario] = useState("");
    const [filtroProducto, setFiltroProducto] = useState("");

    const historial = mockAuditoria.filter(mov => {
        const coincideUsuario = mov.usuario.toLowerCase().includes(filtroUsuario.toLowerCase());
        const coincideProducto = mov.producto.toLowerCase().includes(filtroProducto.toLowerCase());
        return coincideUsuario && coincideProducto;
    });

    return (
        <StocklyAppShell>
            <div className="p-6 max-w-7xl mx-auto text-slate-700 bg-slate-50 min-h-screen">
                <h1 className="text-2xl font-bold mb-6 text-slate-800">Trazabilidad y Auditoría</h1>

                {/* Barra de filtros */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 align-middle">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-600 mb-1">Filtrar por Usuario</label>
                        <input
                            type="text"
                            value={filtroUsuario}
                            onChange={(e) => setFiltroUsuario(e.target.value)}
                            placeholder="Buscar usuario..."
                            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-600 mb-1">Filtrar por Producto</label>
                        <input
                            type="text"
                            value={filtroProducto}
                            onChange={(e) => setFiltroProducto(e.target.value)}
                            placeholder="Buscar producto..."
                            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Tabla de Historial */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-slate-200">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px] table-fixed">
                            <thead className="bg-slate-100 border-b border-slate-200">
                                <tr>
                                    <th className="px-4 py-3 text-xs font-semibold tracking-wider text-slate-500 uppercase w-36">Fecha/Hora</th>
                                    <th className="px-4 py-3 text-xs font-semibold tracking-wider text-slate-500 uppercase w-28">Tipo</th>
                                    <th className="px-4 py-3 text-xs font-semibold tracking-wider text-slate-500 uppercase w-1/4">Producto</th>
                                    <th className="px-4 py-3 text-xs font-semibold tracking-wider text-slate-500 uppercase w-16 text-center">Cant.</th>
                                    <th className="px-4 py-3 text-xs font-semibold tracking-wider text-slate-500 uppercase w-32">Usuario</th>
                                    <th className="px-4 py-3 text-xs font-semibold tracking-wider text-slate-500 uppercase">Detalle</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {historial.map((mov) => (
                                    <tr key={mov.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">
                                            {mov.fecha}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                                            <span className={`inline-flex px-2 py-1 text-[11px] font-semibold rounded-full ${getBadgeStyle(mov.tipo)}`}>
                                                {mov.tipo}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900 truncate" title={mov.producto}>
                                            {mov.producto}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-700 text-center font-semibold">
                                            {mov.cantidad}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600 truncate" title={mov.usuario}>
                                            {mov.usuario}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 truncate" title={mov.detalle}>
                                            {mov.detalle}
                                        </td>
                                    </tr>
                                ))}
                                {historial.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-sm text-slate-500">
                                            No se encontraron movimientos registrados con esos filtros.
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
