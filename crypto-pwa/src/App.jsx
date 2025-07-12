import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Splash from './pages/Splash'
import Header from './components/Header'
import CurrencySelector from './components/CurrencySelector'
import CriptoMenu from './components/CriptoMenu' // Nuevo componente menú visual
import CriptoDetalle from './pages/CriptoDetalle' // Pantalla intermedia
import CriptoChart from './pages/CriptoChart'
import Footer from './components/Footer'

function App() {
  const [moneda, setMoneda] = useState('usd')

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Splash />} />
        {/* 🏠 Nueva pantalla principal: menú visual */}
        <Route path="/menu" element={<CriptoMenu />} />

        {/* 🧩 Pantalla intermedia para cada cripto */}
        <Route
          path="/detalle/:id"
          element={
            <>
              <CurrencySelector moneda={moneda} setMoneda={setMoneda} />
              <main>
                <CriptoDetalle moneda={moneda} />
              </main>
            </>
          }
        />

        {/* 📈 Gráfico de evolución */}
        <Route
          path="/grafico/:id"
          element={<CriptoChart moneda={moneda} />}
        />
      </Routes>
      <Footer />
    </>
  )
}

export default App
