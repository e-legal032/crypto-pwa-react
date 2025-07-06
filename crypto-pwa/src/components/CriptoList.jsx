import CriptoCard from './CriptoCard'
import { useCriptoData } from '../hooks/useCriptoData'
import Loader from './Loader'
import ErrorMessage from './ErrorMessage'

const criptosFavoritas = [
  { id: 'bitcoin', nombre: 'Bitcoin', simbolo: 'BTC', icono: '🟠' },
  { id: 'ethereum', nombre: 'Ethereum', simbolo: 'ETH', icono: '🟣' },
  { id: 'tether', nombre: 'Tether', simbolo: 'USDT', icono: '🟢' },
  { id: 'litecoin', nombre: 'Litecoin', simbolo: 'LTC', icono: '⚪' },
  { id: 'solana', nombre: 'Solana', simbolo: 'SOL', icono: '🟪' }
]

function CriptoList({ moneda }) {
  const { precios, cargando, error } = useCriptoData(moneda)

  if (cargando) return <Loader />
  if (error) return <ErrorMessage mensaje="No se pudieron cargar los precios." />

  return (
    <section style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
      {criptosFavoritas.map(cripto => (
        <CriptoCard
          key={cripto.id}
          {...cripto}
          precio={precios[cripto.id]?.[moneda]}
          moneda={moneda}
        />
      ))}
    </section>
  )
}

export default CriptoList
