import { useNavigate } from 'react-router-dom'

function CriptoCard({ id, nombre, simbolo, icono, precio, moneda }) {
  const navigate = useNavigate()

  const manejarClick = () => {
    navigate(`/grafico/${id}`)
  }

  return (
    <div
      onClick={manejarClick}
      style={{
        width: '160px',
        border: '1px solid #ddd',
        padding: '1rem',
        borderRadius: '8px',
        textAlign: 'center',
        backgroundColor: '#fefefe',
        boxShadow: '0 0 6px rgba(0,0,0,0.05)',
        cursor: 'pointer',
        transition: 'transform 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
     >
      <div style={{ fontSize: '2rem' }}>{icono}</div>
      <h3>{nombre}</h3>
      <p>{simbolo}</p>
      <strong style={{ fontSize: '1.1rem' }}>
        {precio ? `${precio.toLocaleString()} ${moneda.toUpperCase()}` : '–'}
      </strong>
    </div>
  )
}

export default CriptoCard
