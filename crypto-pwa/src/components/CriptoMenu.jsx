import { useNavigate } from 'react-router-dom'
import styles from './CriptoMenu.module.css'

const criptosFavoritas = [
  { id: 'bitcoin', nombre: 'Bitcoin', icono: '🟠' },
  { id: 'ethereum', nombre: 'Ethereum', icono: '🟣' },
  { id: 'tether', nombre: 'Tether', icono: '🟢' },
  { id: 'litecoin', nombre: 'Litecoin', icono: '⚪' },
  { id: 'solana', nombre: 'Solana', icono: '🟪' }
]

function CriptoMenu() {
  const navigate = useNavigate()

  return (
    <section className={styles.menu}>
      <h1 className={styles.titulo}>💰 Seleccioná una criptomoneda</h1>

      <div className={styles.grid}>
        {criptosFavoritas.map(cripto => (
          <div key={cripto.id} className={styles.card}>
            <div className={styles.icon}>{cripto.icono}</div>
            <p className={styles.nombre}>{cripto.nombre}</p>
            <button
              className={styles.boton}
              onClick={() => navigate(`/detalle/${cripto.id}`)}
            >
              Ver detalles →
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CriptoMenu
