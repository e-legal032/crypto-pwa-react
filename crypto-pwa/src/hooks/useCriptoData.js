// src/hooks/useCriptoData.js
import { useEffect, useState } from 'react'
import { getCriptoPrices } from '../services/criptoService'

export function useCriptoData(moneda) {
  const [precios, setPrecios] = useState({})
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setCargando(true)
    getCriptoPrices(moneda)
      .then(data => {
        if (data) {
          setPrecios(data)
          setError(false)
        } else {
          setError(true)
        }
      })
      .finally(() => setCargando(false))
  }, [moneda])

  return { precios, cargando, error }
}
