export const STOCKLY_DASHBOARD_METRICAS_KEY = 'stockly.dashboard.metricas.v1';

/** Valores base simulados (RF-21) hasta que el usuario opere en Recepción/Despacho. */
export function snapshotMetricasDemostracion() {
  return {
    version: 1,
    piezasDespachadasAcumulado: 1840,
    registrosEntrada: 96,
    ventasPorClienteUnidades: {
      'Clínica rehabilitación Norte': 420,
      'Fisio Center del Sur': 310,
      'Hospital del Valle': 186,
    },
  };
}

function fusionarMetricas(rawParsed) {
  const base = snapshotMetricasDemostracion();
  if (!rawParsed || typeof rawParsed !== 'object') return { ...base };
  return {
    version: 1,
    piezasDespachadasAcumulado:
      typeof rawParsed.piezasDespachadasAcumulado === 'number'
        ? rawParsed.piezasDespachadasAcumulado
        : base.piezasDespachadasAcumulado,
    registrosEntrada:
      typeof rawParsed.registrosEntrada === 'number' ? rawParsed.registrosEntrada : base.registrosEntrada,
    ventasPorClienteUnidades: {
      ...base.ventasPorClienteUnidades,
      ...(rawParsed.ventasPorClienteUnidades && typeof rawParsed.ventasPorClienteUnidades === 'object'
        ? rawParsed.ventasPorClienteUnidades
        : {}),
    },
  };
}

export function leerMetricasDashboard() {
  if (typeof window === 'undefined') return snapshotMetricasDemostracion();
  try {
    const raw = sessionStorage.getItem(STOCKLY_DASHBOARD_METRICAS_KEY);
    if (!raw) return snapshotMetricasDemostracion();
    return fusionarMetricas(JSON.parse(raw));
  } catch {
    return snapshotMetricasDemostracion();
  }
}

export function guardarMetricasDashboard(datos) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(STOCKLY_DASHBOARD_METRICAS_KEY, JSON.stringify(datos));
}

/** Primera visita al dashboard: fija snapshot en sesión para unificar la base simulada. */
export function asegurarMetricasInicializadas() {
  if (typeof window === 'undefined') return;
  if (sessionStorage.getItem(STOCKLY_DASHBOARD_METRICAS_KEY)) return;
  guardarMetricasDashboard(snapshotMetricasDemostracion());
}

export function registrarSalidaEnMetricas(payload) {
  const d = leerMetricasDashboard();
  d.piezasDespachadasAcumulado += Math.max(0, Math.floor(payload.cantidad || 0));
  if (payload.tipoSalida === 'Venta' && payload.cliente?.trim()) {
    const k = payload.cliente.trim();
    d.ventasPorClienteUnidades[k] = (d.ventasPorClienteUnidades[k] || 0) + Math.max(0, Math.floor(payload.cantidad || 0));
  }
  guardarMetricasDashboard(d);
}

export function registrarEntradaEnMetricas() {
  const d = leerMetricasDashboard();
  d.registrosEntrada += 1;
  guardarMetricasDashboard(d);
}

export function clienteConMasVentasPiezas(ventasPorClienteUnidades) {
  const entradas = Object.entries(ventasPorClienteUnidades || {});
  if (!entradas.length) return { nombre: '—', piezas: 0 };
  entradas.sort((a, b) => b[1] - a[1]);
  return { nombre: entradas[0][0], piezas: entradas[0][1] };
}
