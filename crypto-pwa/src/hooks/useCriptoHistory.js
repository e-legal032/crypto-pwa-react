// src/hooks/useCriptoHistory.js
import { useEffect, useState } from 'react'

export function useCriptoHistory(id, moneda, rango) {
  const [datos, setDatos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setCargando(true)
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${moneda}&days=${rango}`
        )
        if (!res.ok) throw new Error('No se pudo obtener la evolución')
        const data = await res.json()
        setDatos(data.prices)
        setError(false)
      } catch (err) {
        console.error('Error al obtener historial:', err)
        setError(true)
      } finally {
        setCargando(false)
      }
    }

    fetchData()
  }, [id, moneda, rango])

  return { datos, cargando, error }
}
