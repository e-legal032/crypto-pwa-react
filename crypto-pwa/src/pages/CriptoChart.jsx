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

ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Filler)

function CriptoChart({ moneda }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [rango, setRango] = useState('1') // '1' para 24h, '7' para 7 días

  const { datos, cargando, error } = useCriptoHistory(id, moneda, rango)
  const nombre = id.charAt(0).toUpperCase() + id.slice(1)

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
    <div style={{ padding: '1rem', maxWidth: '700px', margin: '0 auto' }}>
      <button
        onClick={() => navigate('/')}
        style={{
          background: '#f0f0f0',
          border: 'none',
          padding: '0.5rem 1rem',
          marginBottom: '1rem',
          cursor: 'pointer',
          borderRadius: '6px'
        }}
      >
        ← Volver
      </button>

      <h2 style={{ textAlign: 'center' }}>📈 Gráfico de {nombre}</h2>
      <p style={{ textAlign: 'center' }}>Moneda: {moneda.toUpperCase()}</p>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <button
          onClick={() => setRango('1')}
          style={{
            marginRight: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: rango === '1' ? '#d0f0fd' : '#f0f0f0',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Últimas 24h
        </button>

        <button
          onClick={() => setRango('7')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: rango === '7' ? '#d0f0fd' : '#f0f0f0',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Últimos 7 días
        </button>
      </div>

      {cargando ? (
        <p>Cargando datos históricos...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>⚠️ No se pudo cargar el gráfico</p>
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </div>
  )
}

export default CriptoChart
