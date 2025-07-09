// src/hooks/useCriptoHistory.js
import { useEffect, useState } from 'react'

export function useCriptoHistory(id, moneda, rango) {
  const [datos, setDatos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const apiKey = import.meta.env.VITE_CRYPTO_API_KEY
    const baseUrl = 'https://min-api.cryptocompare.com/data/v2/'
    const endpoint = rango === '1' ? 'histohour' : 'histoday'

    // Mapeo manual de ID a símbolo para CryptoCompare
    const simbolos = {
      bitcoin: 'BTC',
      ethereum: 'ETH',
      tether: 'USDT',
      litecoin: 'LTC',
      solana: 'SOL'
    }

    const symbol = simbolos[id] || id.toUpperCase()
    const url = `${baseUrl}${endpoint}?fsym=${symbol}&tsym=${moneda.toUpperCase()}&limit=${rango === '1' ? 24 : 7}`

    async function fetchData() {
      setCargando(true)
      try {
        const res = await fetch(url, {
          headers: {
            authorization: `Apikey ${apiKey}`
          }
        })

        const data = await res.json()

        if (data.Response !== 'Success') throw new Error('Sin datos válidos')

        // Transformamos: [{ time, close }] → [[timestamp, precio]]
        const valores = data.Data.Data.map(p => [p.time * 1000, p.close])

        setDatos(valores)
        setError(false)
      } catch (err) {
        console.error('Error al obtener historial desde CryptoCompare:', err)
        setError(true)
      } finally {
        setCargando(false)
      }
    }

    fetchData()
  }, [id, moneda, rango])

  return { datos, cargando, error }
}
