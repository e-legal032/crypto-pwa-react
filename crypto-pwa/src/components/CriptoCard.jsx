import { useNavigate } from 'react-router-dom'
import styles from './CriptoCard.module.css'

function CriptoCard({ id, nombre, simbolo, icono, precio, moneda }) {
  const navigate = useNavigate()

  const manejarClick = () => {
    navigate(`/grafico/${id}`)
  }

  return (
    <div
      className={styles.card}
      onClick={manejarClick}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <div className={styles.icon}>{icono}</div>
      <h3 className={styles.nombre}>{nombre}</h3>
      <p className={styles.simbolo}>{simbolo}</p>
      <strong className={styles.precio}>
        {precio ? `${precio.toLocaleString()} ${moneda.toUpperCase()}` : '–'}
      </strong>
    </div>
  )
}

export default CriptoCard
