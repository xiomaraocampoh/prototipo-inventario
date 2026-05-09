'use client';

import { useState } from 'react';
import { StocklyAppShell } from '../../components/stockly/StocklyAppShell';
import { InventarioTablaFiltrada } from '../../components/inventario/InventarioTablaFiltrada';
import { ProductoRegistrarFormulario } from '../../components/inventario/ProductoRegistrarFormulario';
import { useProductosSimulados } from '../../hooks/useProductosSimulados';

export default function InventarioPage() {
  const { productos, registrarProducto } = useProductosSimulados();
  const [filtroCategoria, setFiltroCategoria] = useState('todas');

  return (
    <StocklyAppShell>
      <main className="flex flex-1 flex-col gap-8 p-6 sm:p-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <section className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-700 sm:text-3xl">Inventario</h1>
            <p className="max-w-2xl break-words text-base leading-relaxed text-slate-500">
              Alta de insumos y consulta por categoría. Stock total incluye unidades en bodega y en vitrina. Reglas Stockly:
              unidades enteras; serial únicamente en Electroterapia.
            </p>
          </section>

          <ProductoRegistrarFormulario onRegistrar={registrarProducto} />

          <InventarioTablaFiltrada
            productos={productos}
            filtroCategoria={filtroCategoria}
            onFiltroChange={setFiltroCategoria}
          />
        </div>
      </main>
    </StocklyAppShell>
  );
}
