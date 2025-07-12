import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Splash.module.css'

function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/menu')
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className={styles.splash}>
      🚀 Crypto PWA
    </div>
  )
}

export default Splash
