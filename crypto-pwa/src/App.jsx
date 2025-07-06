import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import CurrencySelector from './components/CurrencySelector'
import CriptoList from './components/CriptoList'
import CriptoChart from './pages/CriptoChart' // lo vas a crear ahora

function App() {
  const [moneda, setMoneda] = useState('usd') // estado global de la moneda

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <CurrencySelector moneda={moneda} setMoneda={setMoneda} />
              <main>
                <CriptoList moneda={moneda} />
              </main>
            </>
          }
        />
        <Route
          path="/grafico/:id"
          element={<CriptoChart moneda={moneda} />}
        />
      </Routes>
    </>
  )
}

export default App
