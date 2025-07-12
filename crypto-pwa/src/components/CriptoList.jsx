import CriptoCard from './CriptoCard'
import { useCriptoData } from '../hooks/useCriptoData'
import Loader from './Loader'
import ErrorMessage from './ErrorMessage'
import AvisoLimite from './AvisoLimite'
import styles from './CriptoList.module.css'

const criptosFavoritas = [
  { id: 'bitcoin', nombre: 'Bitcoin', simbolo: 'BTC', icono: '🟠' },
  { id: 'ethereum', nombre: 'Ethereum', simbolo: 'ETH', icono: '🟣' },
  { id: 'tether', nombre: 'Tether', simbolo: 'USDT', icono: '🟢' },
  { id: 'litecoin', nombre: 'Litecoin', simbolo: 'LTC', icono: '⚪' },
  { id: 'solana', nombre: 'Solana', simbolo: 'SOL', icono: '🟪' }
]

function calcularMinutos(fecha) {
  const ahora = new Date()
  const diferencia = Math.floor((ahora - fecha) / 60000)
  return diferencia <= 1 ? 'menos de un minuto' : `${diferencia}`
}

function CriptoList({ moneda }) {
  const { precios, cargando, error, refrescar, ultimaActualizacion } = useCriptoData(moneda)

  return (
    <div className={styles.listado}>
      <button className={styles.boton} onClick={refrescar}>
        🔄 Actualizar precios
      </button>

      {ultimaActualizacion && (
        <p className={styles.actualizado}>
          Precios actualizados hace {calcularMinutos(ultimaActualizacion)} minutos
        </p>
      )}

      {cargando && <Loader />}

      {error === 'limit' && <AvisoLimite />}
      {error === true && <ErrorMessage mensaje="No se pudieron cargar los precios." />}

      {!cargando && !error && (
        <section className={styles.grid}>
          {criptosFavoritas.map(cripto => (
            <CriptoCard
              key={cripto.id}
              {...cripto}
              precio={precios[cripto.id]?.[moneda]}
              moneda={moneda}
            />
          ))}
        </section>
      )}
    </div>
  )
}

export default CriptoList
