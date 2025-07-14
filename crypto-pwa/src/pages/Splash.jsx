import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Splash.module.css'
import logo from '../assets/logo-crypto1.png'

function Splash() {
  const navigate = useNavigate()
  const [salida, setSalida] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSalida(true) // inicia animación de salida
    }, 2200)

    const navegar = setTimeout(() => {
      navigate('/menu')
    }, 3300)

    return () => {
      clearTimeout(timer)
      clearTimeout(navegar)
    }
  }, [navigate])

 return (
  <div className={`${styles.splash} ${salida ? styles.salir : ''}`}>
    <div className={styles.contenido}>
      <img src={logo} alt="CryptoPWA logo" className={styles.logo} />
      <h1 className={styles.titulo}>CryptoPWA 💰</h1>
    </div>
  </div>
)

}

export default Splash
