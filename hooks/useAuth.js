import { useEffect, useMemo, useState } from 'react';

const CLAVE_STORAGE_CORREO = 'auth.correoCorporativo';
const CLAVE_STORAGE_RECORDAR = 'auth.recordarme';

function esCorreoValido(correo) {
  const valor = String(correo || '').trim();
  if (!valor) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(valor);
}

function validarCampo(nombreCampo, valorCampo) {
  const valor = String(valorCampo ?? '');

  if (nombreCampo === 'correoCorporativo') {
    if (!valor.trim()) return 'El correo corporativo es obligatorio.';
    if (!esCorreoValido(valor)) return 'Ingresa un correo válido (ej: usuario@empresa.com).';
    return '';
  }

  if (nombreCampo === 'contrasena') {
    if (!valor) return 'La contraseña es obligatoria.';
    if (valor.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
    return '';
  }

  if (nombreCampo === 'recordarme') return '';

  return '';
}

function validarFormulario(valores) {
  return {
    correoCorporativo: validarCampo('correoCorporativo', valores.correoCorporativo),
    contrasena: validarCampo('contrasena', valores.contrasena),
  };
}

function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useAuth() {
  const [valores, setValores] = useState({
    correoCorporativo: '',
    contrasena: '',
    recordarme: false,
  });

  const [tocados, setTocados] = useState({
    correoCorporativo: false,
    contrasena: false,
  });

  const [errores, setErrores] = useState({
    correoCorporativo: '',
    contrasena: '',
  });

  const [estaEnviando, setEstaEnviando] = useState(false);
  const [mensajeEstado, setMensajeEstado] = useState({ tipo: '', texto: '' });

  useEffect(() => {
    const recordar = localStorage.getItem(CLAVE_STORAGE_RECORDAR) === 'true';
    const correoGuardado = localStorage.getItem(CLAVE_STORAGE_CORREO) || '';
    if (recordar && correoGuardado) {
      setValores((previo) => ({ ...previo, correoCorporativo: correoGuardado, recordarme: true }));
    }
  }, []);

  useEffect(() => {
    if (valores.recordarme) {
      localStorage.setItem(CLAVE_STORAGE_RECORDAR, 'true');
      localStorage.setItem(CLAVE_STORAGE_CORREO, String(valores.correoCorporativo || '').trim());
    } else {
      localStorage.setItem(CLAVE_STORAGE_RECORDAR, 'false');
      localStorage.removeItem(CLAVE_STORAGE_CORREO);
    }
  }, [valores.recordarme, valores.correoCorporativo]);

  useEffect(() => {
    setErrores(validarFormulario(valores));
  }, [valores]);

  const esFormularioValido = useMemo(() => {
    const e = validarFormulario(valores);
    return !e.correoCorporativo && !e.contrasena;
  }, [valores]);

  function manejarCambio(evento) {
    const { name, type, checked, value } = evento.target;
    setMensajeEstado({ tipo: '', texto: '' });
    setValores((previo) => ({
      ...previo,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function manejarBlur(evento) {
    const { name } = evento.target;
    if (name === 'correoCorporativo' || name === 'contrasena') {
      setTocados((previo) => ({ ...previo, [name]: true }));
    }
  }

  function forzarMostrarErrores() {
    setTocados({ correoCorporativo: true, contrasena: true });
    const nuevosErrores = validarFormulario(valores);
    setErrores(nuevosErrores);
    return nuevosErrores;
  }

  async function iniciarSesion() {
    await esperar(900);
    const correo = String(valores.correoCorporativo || '').trim().toLowerCase();
    const contrasena = String(valores.contrasena || '');

    if (correo === 'admin@stockly.com' && contrasena === 'Admin1234') {
      return { ok: true };
    }

    if (correo === 'admin@quindio.com' && contrasena === 'Admin1234') {
      return { ok: true };
    }

    if (correo === 'admin@gmail.com' && contrasena === 'Admin1234') {
      return { ok: true };
    }

    return { ok: false, mensaje: 'Credenciales inválidas. Verifica tu correo y contraseña.' };
  }

  async function manejarSubmit(evento) {
    evento.preventDefault();
    if (estaEnviando) return;

    const nuevosErrores = forzarMostrarErrores();
    if (nuevosErrores.correoCorporativo || nuevosErrores.contrasena) {
      setMensajeEstado({ tipo: 'error', texto: 'Revisa los campos marcados antes de continuar.' });
      return;
    }

    setEstaEnviando(true);
    setMensajeEstado({ tipo: '', texto: '' });
    try {
      const resultado = await iniciarSesion();
      if (resultado.ok) {
        setMensajeEstado({ tipo: 'exito', texto: 'Acceso concedido. Redirigiendo…' });
      } else {
        setMensajeEstado({ tipo: 'error', texto: resultado.mensaje || 'No fue posible ingresar.' });
      }
    } catch {
      setMensajeEstado({ tipo: 'error', texto: 'Ocurrió un error inesperado. Intenta de nuevo.' });
    } finally {
      setEstaEnviando(false);
    }
  }

  const erroresVisibles = {
    correoCorporativo: tocados.correoCorporativo ? errores.correoCorporativo : '',
    contrasena: tocados.contrasena ? errores.contrasena : '',
  };

  return {
    valores,
    errores: erroresVisibles,
    estaEnviando,
    esFormularioValido,
    mensajeEstado,
    manejarCambio,
    manejarBlur,
    manejarSubmit,
    forzarMostrarErrores,
  };
}
