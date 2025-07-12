import { useEffect, useState } from 'react'
import { getCriptoPrices } from '../services/criptoService'

const cache = {}

export function useCriptoData(moneda) {
  const [precios, setPrecios] = useState({})
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null)

  const refrescar = () => {
    delete cache[moneda.toLowerCase()]
    setCargando(true)

    getCriptoPrices(moneda)
      .then(data => {
        if (data) {
          cache[moneda.toLowerCase()] = data
          setPrecios(data)
          setError(false)
          setUltimaActualizacion(new Date())
        } else {
          setError(true)
        }
      })
      .catch(err => {
        if (err.message.includes('429')) {
          setError('limit') // Error por demasiadas consultas
        } else {
          setError(true)
        }
      })
      .finally(() => setCargando(false))
  }

  useEffect(() => {
    const key = moneda.toLowerCase()

    if (cache[key]) {
      setPrecios(cache[key])
      setCargando(false)
      setUltimaActualizacion(new Date())
      return
    }

    setCargando(true)
    getCriptoPrices(moneda)
      .then(data => {
        if (data) {
          cache[key] = data
          setPrecios(data)
          setError(false)
          setUltimaActualizacion(new Date())
        } else {
          setError(true)
        }
      })
      .catch(err => {
        if (err.message.includes('429')) {
          setError('limit')
        } else {
          setError(true)
        }
      })
      .finally(() => setCargando(false))
  }, [moneda])

  return { precios, cargando, error, refrescar, ultimaActualizacion }
}
