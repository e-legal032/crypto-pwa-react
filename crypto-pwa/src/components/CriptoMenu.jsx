import { useNavigate } from 'react-router-dom'
import styles from './CriptoMenu.module.css'

const criptosFavoritas = [
  { id: 'bitcoin', nombre: 'Bitcoin', simbolo: 'BTC', icono: '🟠' },
  { id: 'ethereum', nombre: 'Ethereum', simbolo: 'ETH', icono: '🟣' },
  { id: 'tether', nombre: 'Tether', simbolo: 'USDT', icono: '🟢' },
  { id: 'litecoin', nombre: 'Litecoin', simbolo: 'LTC', icono: '⚪' },
  { id: 'solana', nombre: 'Solana', simbolo: 'SOL', icono: '🟪' }
]

function CriptoMenu({ modoOscuro }) {
  const navigate = useNavigate()

  return (
    <div className={styles.menu}>
      
        <h1 className={styles.titulo}>💰 Seleccioná una criptomoneda</h1>
        <div className={styles.grid}>
          {criptosFavoritas.map(cripto => (
            <div
              key={cripto.id}
              className={`${styles.card} ${modoOscuro ? styles.cardDark : ''}`}
            >
              <div className={styles.icon}>{cripto.icono}</div>
              <div className={styles.nombre}>{cripto.nombre}</div>
              <button
                className={styles.boton}
                onClick={() => navigate(`/detalle/${cripto.id}`)}
              >
                Ver detalles →
              </button>
            </div>
          ))}
        </div>
     
    </div>
  )
}

export default CriptoMenu
