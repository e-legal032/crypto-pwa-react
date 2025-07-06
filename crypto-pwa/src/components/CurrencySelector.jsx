// src/components/CurrencySelector.jsx
function CurrencySelector({ moneda, setMoneda }) {
  const opciones = ['usd', 'ars']

  return (
    <section style={{ margin: '1rem', textAlign: 'center' }}>
      {opciones.map(op => (
        <button
          key={op}
          onClick={() => setMoneda(op)}
          style={{
            margin: '0 0.5rem',
            padding: '0.5rem 1rem',
            border: moneda === op ? '2px solid #333' : '1px solid #ccc',
            background: moneda === op ? '#dff0d8' : '#f8f8f8',
            cursor: 'pointer'
          }}
        >
          {op.toUpperCase()}
        </button>
      ))}
    </section>
  )
}

export default CurrencySelector
