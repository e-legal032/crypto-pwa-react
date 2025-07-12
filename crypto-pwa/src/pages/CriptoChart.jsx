import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useCriptoHistory } from '../hooks/useCriptoHistory'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Filler
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import styles from './CriptoChart.module.css'

ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Filler)

function CriptoChart({ moneda }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [rango, setRango] = useState('1')

  const { datos, cargando, error } = useCriptoHistory(id, moneda, rango)
  const nombre = id.charAt(0).toUpperCase() + id.slice(1)

  const sitiosOficiales = {
    bitcoin: 'https://bitcoin.org/es/',
    ethereum: 'https://ethereum.org/es/',
    tether: 'https://tether.to/es/',
    litecoin: 'https://litecoin.org/es/',
    solana: 'https://solana.com/es'
  }

  const chartData = {
    labels: datos.map(p => new Date(p[0])),
    datasets: [
      {
        label: `Precio (${moneda.toUpperCase()})`,
        data: datos.map(p => p[1]),
        fill: true,
        backgroundColor: 'rgba(59,130,246,0.1)',
        borderColor: '#3b82f6',
        pointRadius: 0,
        tension: 0.3
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: rango === '1' ? 'hour' : 'day'
        }
      },
      y: {
        beginAtZero: false,
        ticks: {
          callback: value => `${value.toLocaleString()}`
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: context =>
            `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`
        }
      }
    }
  }

  return (
    <div className={styles.chart}>
      <button className={styles.volver} onClick={() => navigate('/menu')}>
        ← Volver
      </button>

      <h2 className={styles.titulo}>📈 Gráfico de {nombre}</h2>
      <p className={styles.moneda}>Moneda: {moneda.toUpperCase()}</p>

      <div className={styles.rangos}>
        <button
          className={`${styles.botonRango} ${rango === '1' ? styles.activo : ''}`}
          onClick={() => setRango('1')}
        >
          Últimas 24h
        </button>

        <button
          className={`${styles.botonRango} ${rango === '7' ? styles.activo : ''}`}
          onClick={() => setRango('7')}
        >
          Últimos 7 días
        </button>
      </div>

      {cargando ? (
        <p className={styles.estado}>Cargando datos históricos...</p>
      ) : error ? (
        <p className={styles.error}>⚠️ No se pudo cargar el gráfico</p>
      ) : (
        <>
          <Line data={chartData} options={chartOptions} />

          {sitiosOficiales[id] && (
            <p className={styles.link}>
              🌐 <a href={sitiosOficiales[id]} target="_blank" rel="noopener noreferrer">
                Visitar sitio oficial de {nombre}
              </a>
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default CriptoChart
