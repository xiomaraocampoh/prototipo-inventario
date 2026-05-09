'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  STOCKLY_INVENTARIO_STORAGE_KEY,
  crearSemillaProductos,
  normalizarProducto,
} from '../lib/stocklyInventarioSimulado';

function leerSesion() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(STOCKLY_INVENTARIO_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return null;
    return data.map(normalizarProducto);
  } catch {
    return null;
  }
}

function escribirSesion(lista) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(STOCKLY_INVENTARIO_STORAGE_KEY, JSON.stringify(lista));
}

export function useProductosSimulados() {
  const [productos, setProductos] = useState(() => crearSemillaProductos().map(normalizarProducto));
  const [persistir, setPersistir] = useState(false);

  useEffect(() => {
    const cargado = leerSesion();
    if (cargado?.length) setProductos(cargado);
    setPersistir(true);
  }, []);

  useEffect(() => {
    if (!persistir) return;
    escribirSesion(productos);
  }, [productos, persistir]);

  const registrarProducto = useCallback((p) => {
    const n = normalizarProducto(p);
    setProductos((lista) => [n, ...lista]);
  }, []);

  const descontarSalida = useCallback((productoId, ubicacion, cantidad) => {
    const c = Math.max(0, Math.floor(cantidad));
    setProductos((lista) =>
      lista.map((p) => {
        if (p.id !== productoId) return p;
        if (ubicacion === 'Bodega') {
          return { ...p, stockBodega: Math.max(0, (p.stockBodega ?? 0) - c) };
        }
        if (ubicacion === 'Vitrina') {
          return { ...p, stockVitrina: Math.max(0, (p.stockVitrina ?? 0) - c) };
        }
        return p;
      })
    );
  }, []);

  return { productos, setProductos, registrarProducto, descontarSalida };
}
