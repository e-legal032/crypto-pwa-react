// src/components/ErrorMessage.jsx
function ErrorMessage({ mensaje }) {
  return (
    <div style={{
      padding: '1rem',
      margin: '1rem auto',
      backgroundColor: '#fdecea',
      color: '#a94442',
      border: '1px solid #ebccd1',
      borderRadius: '4px',
      maxWidth: '400px',
      textAlign: 'center'
    }}>
      ⚠️ {mensaje}
    </div>
  )
}

export default ErrorMessage
