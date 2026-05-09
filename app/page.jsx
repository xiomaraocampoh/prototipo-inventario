'use client';

import { useEffect, useState } from 'react';
import { StocklyAppShell } from '../components/stockly/StocklyAppShell';
import { DashboardAlertas } from '../components/dashboard/DashboardAlertas';
import { DashboardKpiGrid } from '../components/dashboard/DashboardKpiGrid';
import { useProductosSimulados } from '../hooks/useProductosSimulados';
import {
  asegurarMetricasInicializadas,
  leerMetricasDashboard,
  snapshotMetricasDemostracion,
} from '../lib/stocklyDashboardSesion';

export default function DashboardPage() {
  const { productos } = useProductosSimulados();
  const [metricas, setMetricas] = useState(snapshotMetricasDemostracion);

  useEffect(() => {
    asegurarMetricasInicializadas();
    setMetricas(leerMetricasDashboard());
  }, [productos]);

  return (
    <StocklyAppShell>
      <main className="flex flex-1 flex-col gap-8 p-6 sm:p-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <section className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-700 sm:text-3xl">Dashboard</h1>
            <p className="max-w-2xl break-words text-base leading-relaxed text-slate-500">
              Indicadores operativos (RF-21) y alertas de caducidad y refrigeración (RF-22, RF-23). Los KPIs de movimiento
              se actualizan al registrar entradas o salidas en el prototipo.
            </p>
          </section>

          <section aria-label="Resumen de KPIs">
            <DashboardKpiGrid
              productos={productos}
              piezasDespachadas={metricas.piezasDespachadasAcumulado}
              numeroEntradas={metricas.registrosEntrada}
              ventasPorCliente={metricas.ventasPorClienteUnidades}
            />
          </section>

          <DashboardAlertas productos={productos} />
        </div>
      </main>
    </StocklyAppShell>
  );
}
