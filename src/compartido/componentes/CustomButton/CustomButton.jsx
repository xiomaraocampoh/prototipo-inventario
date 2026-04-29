import styles from './CustomButton.module.css';

export function CustomButton({
  children,
  tipo = 'button',
  variante = 'primario',
  estaCargando = false,
  deshabilitado = false,
  ...props
}) {
  const estaDeshabilitado = deshabilitado || estaCargando;

  return (
    <button
      type={tipo}
      className={`${styles.boton} ${styles[`variante_${variante}`] || ''}`}
      disabled={estaDeshabilitado}
      aria-busy={estaCargando ? 'true' : 'false'}
      {...props}
    >
      <span className={styles.contenido}>
        {estaCargando ? <span className={styles.cargador} aria-hidden="true" /> : null}
        <span className={styles.texto}>{children}</span>
      </span>
    </button>
  );
}

