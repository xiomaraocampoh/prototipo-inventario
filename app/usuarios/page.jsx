"use client";

import React, { useState } from 'react';

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Juan Pérez", rol: "Admin" },
    { id: 2, nombre: "María Gómez", rol: "Almacenista" },
    { id: 3, nombre: "Carlos Ruiz", rol: "Despachador" }
  ]);

  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    rol: "Admin"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario(prev => ({ ...prev, [name]: value }));
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    if (!nuevoUsuario.nombre.trim()) return;

    const newId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    setUsuarios([...usuarios, { id: newId, nombre: nuevoUsuario.nombre, rol: nuevoUsuario.rol }]);
    setNuevoUsuario({ nombre: "", rol: "Admin" });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Usuarios</h1>
        <button className="bg-blue-800 text-white px-4 py-2 rounded shadow hover:bg-blue-900 transition-colors">
          + Nuevo Usuario
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Registrar Usuario</h2>
            <form onSubmit={handleGuardar} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  name="nombre"
                  value={nuevoUsuario.nombre}
                  onChange={handleInputChange}
                  placeholder="Ej. Ana Martínez"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                <select
                  name="rol"
                  value={nuevoUsuario.rol}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Admin">Admin</option>
                  <option value="Almacenista">Almacenista</option>
                  <option value="Despachador">Despachador</option>
                  <option value="Visualizador">Visualizador</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-800 text-white font-medium py-2 px-4 rounded-md shadow hover:bg-blue-900 transition-colors mt-2"
              >
                Guardar
              </button>
            </form>
          </div>
        </div>

        {/* Tabla */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse table-fixed">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-500 uppercase w-20">ID</th>
                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-500 uppercase w-1/2">Nombre</th>
                    <th className="px-6 py-3 text-xs font-semibold tracking-wider text-gray-500 uppercase w-1/3">Rol</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {usuario.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate" title={usuario.nombre}>
                        {usuario.nombre}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-sky-100 text-sky-700">
                          {usuario.rol}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {usuarios.length === 0 && (
                    <tr>
                      <td colSpan="3" className="px-6 py-8 text-center text-sm text-gray-500">
                        No hay usuarios registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
