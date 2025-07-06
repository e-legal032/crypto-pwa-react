// src/services/criptoService.js
export async function getCriptoPrices(moneda = 'usd') {
  const ids = ['bitcoin', 'ethereum', 'tether', 'litecoin', 'solana']
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(',')}&vs_currencies=${moneda}`

  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('Error al obtener datos')

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error al consultar CoinGecko:', error)
    return null
  }
}
