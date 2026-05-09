import { CATEGORIA_ELECTROTERAPIA } from './inventarioCategorias';

export const STOCKLY_INVENTARIO_STORAGE_KEY = 'stockly.inventario.productos.v1';

const HOY_BASE = new Date('2026-05-09');

/** @returns {string} */
function diasDesde(offset) {
  const d = new Date(HOY_BASE);
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

/** Productos demo con inventario dividido entre bodega y vitrina. */
export function crearSemillaProductos() {
  return [
    {
      id: 'seed-1',
      codigo: 'ET-7712',
      nombre: 'Electrodo autos adhesivo 5×5 cm (caja 4 u.)',
      pesoKg: 0.12,
      categoria: CATEGORIA_ELECTROTERAPIA,
      refrigeracion: false,
      fechaVencimiento: diasDesde(400),
      stockBodega: 32,
      stockVitrina: 16,
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
      stockBodega: 8,
      stockVitrina: 4,
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
      stockBodega: 4,
      stockVitrina: 2,
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
      stockBodega: 50,
      stockVitrina: 30,
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
      stockBodega: 18,
      stockVitrina: 7,
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
      stockBodega: 2,
      stockVitrina: 1,
      stockMinimo: 10,
      codigoSerial: null,
    },
  ];
}

/** Compatibilidad con datos antiguos que solo tenían `stock`. */
export function normalizarProducto(raw) {
  const hasSplit =
    raw != null &&
    (Object.prototype.hasOwnProperty.call(raw, 'stockBodega') ||
      Object.prototype.hasOwnProperty.call(raw, 'stockVitrina'));
  let stockBodega = Math.max(0, Math.floor(Number(raw.stockBodega) || 0));
  let stockVitrina = Math.max(0, Math.floor(Number(raw.stockVitrina) || 0));
  if (!hasSplit && raw.stock != null) {
    stockBodega = Math.max(0, Math.floor(Number(raw.stock) || 0));
    stockVitrina = 0;
  }
  const { stock: _omitStock, ...rest } = raw;
  return { ...rest, stockBodega, stockVitrina };
}

export function stockTotal(p) {
  return (p.stockBodega ?? 0) + (p.stockVitrina ?? 0);
}

/** @param {string} ubicacion 'Bodega' | 'Vitrina' */
export function stockEnUbicacion(p, ubicacion) {
  if (ubicacion === 'Bodega') return p.stockBodega ?? 0;
  if (ubicacion === 'Vitrina') return p.stockVitrina ?? 0;
  return 0;
}
