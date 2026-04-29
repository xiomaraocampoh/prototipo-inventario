import { useId } from 'react';
import styles from './CustomInput.module.css';

export function CustomInput({
  etiqueta,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  autoComplete,
  required = false,
  error = '',
  descripcion = '',
  deshabilitado = false,
  derecha = null,
}) {
  const idBase = useId();
  const idInput = `${idBase}-${name}-input`;
  const idError = `${idBase}-${name}-error`;
  const idDescripcion = `${idBase}-${name}-desc`;

  const ariaDescribedBy = [descripcion ? idDescripcion : null, error ? idError : null]
    .filter(Boolean)
    .join(' ');

  const tieneError = Boolean(error);

  return (
    <div className={styles.campo}>
      <label className={styles.etiqueta} htmlFor={idInput}>
        {etiqueta} {required ? <span className={styles.requerido}>*</span> : null}
      </label>

      <div className={`${styles.contenedorInput} ${tieneError ? styles.conError : ''}`}>
        <input
          id={idInput}
          name={name}
          className={styles.input}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          disabled={deshabilitado}
          aria-invalid={tieneError ? 'true' : 'false'}
          aria-describedby={ariaDescribedBy || undefined}
        />

        {derecha ? <div className={styles.derecha}>{derecha}</div> : null}
      </div>

      {descripcion ? (
        <div id={idDescripcion} className={styles.descripcion}>
          {descripcion}
        </div>
      ) : null}

      {error ? (
        <div id={idError} className={styles.error} role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}

