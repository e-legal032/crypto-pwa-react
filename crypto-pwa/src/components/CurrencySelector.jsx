import styles from './CurrencySelector.module.css'

function CurrencySelector({ moneda, setMoneda }) {
  const opciones = ['usd', 'ars']

  return (
    <section className={styles.selector}>
      {opciones.map(op => (
        <button
          key={op}
          onClick={() => setMoneda(op)}
          className={`${styles.boton} ${moneda === op ? styles.activo : ''}`}
        >
          {op.toUpperCase()}
        </button>
      ))}
    </section>
  )
}

export default CurrencySelector
