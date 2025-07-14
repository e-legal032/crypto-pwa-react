import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Splash from './pages/Splash'
import Header from './components/Header'
import CurrencySelector from './components/CurrencySelector'
import CriptoMenu from './components/CriptoMenu'
import CriptoDetalle from './pages/CriptoDetalle'
import CriptoChart from './pages/CriptoChart'
import Footer from './components/Footer'

function App() {
  const [moneda, setMoneda] = useState('usd')
  const [modoOscuro, setModoOscuro] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('dark', modoOscuro)
  }, [modoOscuro])

  return (
    <>
      {/* 🌙 Toggle de modo oscuro */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setModoOscuro(prev => !prev)}
          className="modoToggle"
        >
          {modoOscuro ? '☀️ Modo claro' : '🌙 Modo oscuro'}
        </button>
      </div>

      <Header />

      {/* 🧩 Layout flexible */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/menu" element={<CriptoMenu modoOscuro={modoOscuro} />} />
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
            <Route
              path="/grafico/:id"
              element={<CriptoChart moneda={moneda} />}
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default App
