import { stockTotal } from './stocklyInventarioSimulado';

export const HOY_DASHBOARD = new Date('2026-05-09T12:00:00');

/** Días hasta vencimiento (negativo = vencido). */
export function diasHastaVencimiento(isoFecha) {
  if (!isoFecha) return null;
  const fin = new Date(`${isoFecha}T12:00:00`);
  if (Number.isNaN(fin.getTime())) return null;
  return Math.ceil((fin.getTime() - HOY_DASHBOARD.getTime()) / 86400000);
}

/**
 * @param {object[]} productos
 * @returns {{ id: string, tipo: 'vencimiento' | 'refrigeracion', severidad: 'critico' | 'atencion' | 'info', titulo: string, detalle: string, producto: object }[]}
 */
export function construirAlertasInventario(productos) {
  /** @type {ReturnType<typeof construirAlertasInventario>} */
  const lista = [];

  for (const p of productos) {
    if (p.refrigeracion) {
      lista.push({
        id: `${p.id}-ref`,
        tipo: 'refrigeracion',
        severidad: 'info',
        titulo: 'Cadena de frío',
        detalle: `${p.codigo} — ${p.nombre}: requiere refrigeración y control de temperatura.`,
        producto: p,
      });
    }

    const dias = diasHastaVencimiento(p.fechaVencimiento);
    if (dias === null) continue;

    if (dias < 0) {
      lista.push({
        id: `${p.id}-vencido`,
        tipo: 'vencimiento',
        severidad: 'critico',
        titulo: 'Lote vencido',
        detalle: `${p.codigo} — ${p.nombre}: vencimiento superado (${Math.abs(dias)} días). Retirar de circulación.`,
        producto: p,
      });
    } else if (dias <= 30) {
      lista.push({
        id: `${p.id}-v30`,
        tipo: 'vencimiento',
        severidad: 'critico',
        titulo: 'Vencimiento crítico',
        detalle: `${p.codigo} — ${p.nombre}: vence en ${dias} día(s). Stock total ${stockTotal(p)} u.`,
        producto: p,
      });
    } else if (dias <= 90) {
      lista.push({
        id: `${p.id}-v90`,
        tipo: 'vencimiento',
        severidad: 'atencion',
        titulo: 'Próximo a vencer',
        detalle: `${p.codigo} — ${p.nombre}: vence en ${dias} días. Planificar rotación.`,
        producto: p,
      });
    } else if (dias <= 120) {
      lista.push({
        id: `${p.id}-v120`,
        tipo: 'vencimiento',
        severidad: 'atencion',
        titulo: 'Vigilar caducidad',
        detalle: `${p.codigo} — ${p.nombre}: vence en ${dias} días.`,
        producto: p,
      });
    }
  }

  const orden = { critico: 0, atencion: 1, info: 2 };
  lista.sort((a, b) => orden[a.severidad] - orden[b.severidad]);
  return lista;
}

/** % de líneas con stock total estrictamente por encima del mínimo (indicador de disponibilidad). */
export function porcentajeLineasSobreMinimo(productos) {
  if (!productos.length) return 0;
  const ok = productos.filter((p) => stockTotal(p) > (p.stockMinimo ?? 0)).length;
  return Math.round((ok / productos.length) * 100);
}
