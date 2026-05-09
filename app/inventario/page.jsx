'use client';

import { useState } from 'react';
import { StocklyAppShell } from '../../components/stockly/StocklyAppShell';
import { InventarioTablaFiltrada } from '../../components/inventario/InventarioTablaFiltrada';
import { ProductoRegistrarFormulario } from '../../components/inventario/ProductoRegistrarFormulario';
import { CATEGORIA_ELECTROTERAPIA } from '../../lib/inventarioCategorias';

const HOY_BASE = new Date('2026-05-09');

/** @returns {string} yyyy-mm-dd */
function diasDesde(offset) {
  const d = new Date(HOY_BASE);
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

const SEMILLA = [
  {
    id: 'seed-1',
    codigo: 'ET-7712',
    nombre: 'Electrodo autos adhesivo 5×5 cm (caja 4 u.)',
    pesoKg: 0.12,
    categoria: CATEGORIA_ELECTROTERAPIA,
    refrigeracion: false,
    fechaVencimiento: diasDesde(400),
    stock: 48,
    stockMinimo: 20,
    codigoSerial: 'SN-ET-009244',
  },
  {
    id: 'seed-2',
    codigo: 'ORT-902',
    nombre: 'Rodillera rehabilitación talla M',
    pesoKg: 0.35,
    categoria: 'Ortopedia',
    refrigeracion: false,
    fechaVencimiento: diasDesde(730),
    stock: 12,
    stockMinimo: 15,
    codigoSerial: null,
  },
  {
    id: 'seed-3',
    codigo: 'HYD-220',
    nombre: 'Gel conductor ultrasonido 1 L',
    pesoKg: 1.05,
    categoria: CATEGORIA_ELECTROTERAPIA,
    refrigeracion: false,
    fechaVencimiento: diasDesde(180),
    stock: 6,
    stockMinimo: 8,
    codigoSerial: 'SN-GEL-44102',
  },
  {
    id: 'seed-4',
    codigo: 'VND-551',
    nombre: 'Venda elástica 10 cm × 5 m',
    pesoKg: 0.22,
    categoria: 'Vendaje y compresión',
    refrigeracion: false,
    fechaVencimiento: diasDesde(900),
    stock: 80,
    stockMinimo: 30,
    codigoSerial: null,
  },
  {
    id: 'seed-5',
    codigo: 'HIG-331',
    nombre: 'Solución antiséptica 500 ml',
    pesoKg: 0.55,
    categoria: 'Higiene y desinfección',
    refrigeracion: false,
    fechaVencimiento: diasDesde(45),
    stock: 25,
    stockMinimo: 10,
    codigoSerial: null,
  },
  {
    id: 'seed-6',
    codigo: 'REH-102',
    nombre: 'Banda de resistencia nivel medio',
    pesoKg: 0.18,
    categoria: 'Rehabilitación activa',
    refrigeracion: false,
    fechaVencimiento: diasDesde(1200),
    stock: 3,
    stockMinimo: 10,
    codigoSerial: null,
  },
];

export default function InventarioPage() {
  const [productos, setProductos] = useState(SEMILLA);
  const [filtroCategoria, setFiltroCategoria] = useState('todas');

  return (
    <StocklyAppShell>
      <main className="flex flex-1 flex-col gap-8 p-6 sm:p-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <section className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-700 sm:text-3xl">Inventario</h1>
            <p className="max-w-2xl break-words text-base leading-relaxed text-slate-500">
              Alta de insumos y consulta por categoría. Reglas Stockly: unidades enteras; serial únicamente en Electroterapia.
            </p>
          </section>

          <ProductoRegistrarFormulario onRegistrar={(p) => setProductos((lista) => [p, ...lista])} />

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
