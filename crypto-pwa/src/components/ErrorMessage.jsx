import styles from './ErrorMessage.module.css'

function ErrorMessage({ mensaje }) {
  return (
    <div className={styles.error}>
      ⚠️ {mensaje}
    </div>
  )
}

export default ErrorMessage
