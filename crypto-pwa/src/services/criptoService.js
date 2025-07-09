// src/services/criptoService.js

export async function getCriptoPrices(moneda = 'USD') {
  const apiKey = import.meta.env.VITE_CRYPTO_API_KEY
  const symbols = ['BTC', 'ETH', 'USDT', 'LTC', 'SOL']
  const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbols.join(',')}&tsyms=${moneda.toUpperCase()}`

  try {
    const response = await fetch(url, {
      headers: {
        authorization: `Apikey ${apiKey}`
      }
    })

    if (!response.ok) throw new Error('Error al obtener datos')

    const data = await response.json()

    // Adaptamos el formato de respuesta para mantener compatibilidad con tu app
    // Ej: { BTC: { USD: 61500 }, ... } → { bitcoin: { usd: 61500 }, ... }
    const adaptado = {
      bitcoin: { [moneda]: data.BTC?.[moneda.toUpperCase()] },
      ethereum: { [moneda]: data.ETH?.[moneda.toUpperCase()] },
      tether: { [moneda]: data.USDT?.[moneda.toUpperCase()] },
      litecoin: { [moneda]: data.LTC?.[moneda.toUpperCase()] },
      solana: { [moneda]: data.SOL?.[moneda.toUpperCase()] }
    }

    return adaptado
  } catch (error) {
    console.error('Error al consultar CryptoCompare:', error)
    return null
  }
}
