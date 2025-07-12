import styles from './AvisoLimite.module.css'

function AvisoLimite() {
  return (
    <div className={styles.aviso}>
      🚫 <strong>Demasiadas consultas</strong>. Esperá unos segundos y volvé a intentar.
    </div>
  )
}

export default AvisoLimite
