import styles from './Loader.module.css'

function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner} />
      <p>Cargando datos en tiempo real...</p>
    </div>
  )
}

export default Loader
