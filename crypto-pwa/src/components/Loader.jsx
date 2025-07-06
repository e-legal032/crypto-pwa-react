// src/components/Loader.jsx
function Loader() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '2rem',
      fontSize: '1.2rem',
      color: '#555'
    }}>
      <div style={{
        margin: '0 auto 1rem',
        border: '4px solid #ccc',
        borderTop: '4px solid #3b82f6',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite'
      }} />
      <p>Cargando datos en tiempo real...</p>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default Loader
