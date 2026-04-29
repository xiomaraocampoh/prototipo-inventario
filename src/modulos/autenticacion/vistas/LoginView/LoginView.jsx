import { useMemo, useState } from 'react';
import styles from './LoginView.module.css';
import { useAuth } from '../../hooks/useAuth';
import { CustomInput } from '../../../../compartido/componentes/CustomInput/CustomInput';
import { CustomButton } from '../../../../compartido/componentes/CustomButton/CustomButton';

function BotonVerContrasena({ estaVisible, alAlternar, deshabilitado }) {
  const etiqueta = estaVisible ? 'Ocultar contraseña' : 'Ver contraseña';
  return (
    <button
      type="button"
      className={styles.botonVer}
      onClick={alAlternar}
      disabled={deshabilitado}
      aria-label={etiqueta}
      title={etiqueta}
    >
      {estaVisible ? 'Ocultar' : 'Ver'}
    </button>
  );
}

export function LoginView() {
  const { valores, errores, estaEnviando, esFormularioValido, mensajeEstado, manejarCambio, manejarBlur, manejarSubmit } =
    useAuth();

  const [contrasenaVisible, setContrasenaVisible] = useState(false);

  const tituloEstado = useMemo(() => {
    if (!mensajeEstado?.texto) return '';
    if (mensajeEstado.tipo === 'exito') return 'Estado: éxito';
    if (mensajeEstado.tipo === 'error') return 'Estado: error';
    return 'Estado';
  }, [mensajeEstado]);

  return (
    <main className={styles.pagina}>
      <section className={styles.split} aria-label="Acceso al sistema">
        <aside className={styles.izquierda} aria-label="Bienvenida">
          <div className={styles.marca}>
            <div className={styles.isotipo} aria-hidden="true">
              GI
            </div>
            <div className={styles.marcaTexto}>
              <p className={styles.marcaNombre}>Gestor de Inventarios Quindío</p>
              <p className={styles.marcaSubtitulo}>Logística inteligente para centros de distribución</p>
            </div>
          </div>

          <div className={styles.bienvenida}>
            <h1 className={styles.titulo}>Bienvenido.</h1>
            <p className={styles.mensaje}>
              Optimiza tu operación con trazabilidad en tiempo real, control de stock y flujos logísticos eficientes. Menos
              pérdidas, más precisión, mejores decisiones.
            </p>

            <ul className={styles.lista}>
              <li className={styles.itemLista}>Visibilidad de inventario por ubicación y estado.</li>
              <li className={styles.itemLista}>Seguridad por roles y auditoría de movimientos.</li>
              <li className={styles.itemLista}>Alertas y reportes para decisiones rápidas.</li>
            </ul>
          </div>

          <div className={styles.pieIzquierdo}>
            <p className={styles.pieNota}>Conexión segura • Estándares empresariales • Operación 24/7</p>
          </div>
        </aside>

        <section className={styles.derecha} aria-label="Formulario de ingreso">
          <div className={styles.tarjeta}>
            <header className={styles.encabezado}>
              <h2 className={styles.tituloDerecha}>Acceso al Sistema</h2>
              <p className={styles.subtituloDerecha}>Ingresa tus credenciales corporativas para continuar.</p>
            </header>

            <form className={styles.formulario} onSubmit={manejarSubmit} noValidate>
              <CustomInput
                etiqueta="Correo Corporativo"
                name="correoCorporativo"
                type="email"
                value={valores.correoCorporativo}
                onChange={manejarCambio}
                onBlur={manejarBlur}
                placeholder="ejemplo@empresa.com"
                autoComplete="username"
                required
                error={errores.correoCorporativo}
                deshabilitado={estaEnviando}
              />

              <CustomInput
                etiqueta="Contraseña"
                name="contrasena"
                type={contrasenaVisible ? 'text' : 'password'}
                value={valores.contrasena}
                onChange={manejarCambio}
                onBlur={manejarBlur}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                error={errores.contrasena}
                deshabilitado={estaEnviando}
                derecha={
                  <BotonVerContrasena
                    estaVisible={contrasenaVisible}
                    alAlternar={() => setContrasenaVisible((v) => !v)}
                    deshabilitado={estaEnviando}
                  />
                }
              />

              <div className={styles.filaOpciones}>
                <label className={styles.recordarme}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    name="recordarme"
                    checked={valores.recordarme}
                    onChange={manejarCambio}
                    disabled={estaEnviando}
                  />
                  Recordarme
                </label>

                <a className={styles.enlaceSecundario} href="/recuperar-acceso">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {mensajeEstado?.texto ? (
                <div
                  className={`${styles.estado} ${
                    mensajeEstado.tipo === 'exito' ? styles.estadoExito : mensajeEstado.tipo === 'error' ? styles.estadoError : ''
                  }`}
                  role="status"
                  aria-label={tituloEstado}
                >
                  {mensajeEstado.texto}
                </div>
              ) : null}

              <CustomButton
                tipo="submit"
                variante="primario"
                estaCargando={estaEnviando}
                deshabilitado={!esFormularioValido}
              >
                Ingresar
              </CustomButton>

              <div className={styles.separador} aria-hidden="true">
                <span />
                <span className={styles.separadorTexto}>o</span>
                <span />
              </div>

              <a className={styles.enlacePrincipal} href="/solicitar-acceso">
                Solicitar Acceso
              </a>

              <footer className={styles.pieDerecha}>
                <small className={styles.legal}>© {new Date().getFullYear()} Gestor de Inventarios Quindío</small>
              </footer>
            </form>
          </div>
        </section>
      </section>
    </main>
  );
}

