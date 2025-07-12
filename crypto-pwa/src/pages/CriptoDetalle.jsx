import { useParams, useNavigate } from 'react-router-dom'
import { useCriptoData } from '../hooks/useCriptoData'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import styles from './CriptoDetalle.module.css'

const simbolos = {
  bitcoin: 'BTC',
  ethereum: 'ETH',
  tether: 'USDT',
  litecoin: 'LTC',
  solana: 'SOL'
}

const iconos = {
  bitcoin: '🟠',
  ethereum: '🟣',
  tether: '🟢',
  litecoin: '⚪',
  solana: '🟪'
}

function CriptoDetalle({ moneda }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { precios, cargando, error, refrescar, ultimaActualizacion } = useCriptoData(moneda)

  const nombre = id.charAt(0).toUpperCase() + id.slice(1)
  const simbolo = simbolos[id] || id.toUpperCase()
  const icono = iconos[id] || '🪙'
  const precio = precios[id]?.[moneda]

  return (
    <div className={styles.detalle}>
      <button className={styles.volver} onClick={() => navigate('/menu')}>
        ← Volver al menú
      </button>

      <h2>{icono} {nombre}</h2>
      <p className={styles.moneda}>Moneda: <strong>{moneda.toUpperCase()}</strong></p>

      {cargando && <Loader />}
      {error && <ErrorMessage mensaje="No se pudo cargar el precio." />}

      {!cargando && !error && (
        <>
          <h3>💸 Precio actual</h3>
          <p className={styles.precio}>
            {precio?.toLocaleString()} {moneda.toUpperCase()}
          </p>

          {ultimaActualizacion && (
            <p className={styles.actualizado}>
              Actualizado hace {calcularMinutos(ultimaActualizacion)} min
            </p>
          )}

          <button className={styles.botonActualizar} onClick={refrescar}>
            🔄 Actualizar precio
          </button>

          <hr className={styles.divisor} />

          <button
            className={styles.botonGrafico}
            onClick={() => navigate(`/grafico/${id}`)}
          >
            📈 Ver evolución
          </button>
        </>
      )}
    </div>
  )
}

function calcularMinutos(fecha) {
  const ahora = new Date()
  const diff = Math.floor((ahora - fecha) / 60000)
  return diff <= 1 ? 'menos de un minuto' : diff
}

export default CriptoDetalle
