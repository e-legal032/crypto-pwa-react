import styles from './Header.module.css'
import logo from '../assets/logo-crypto1.png'

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.contenedor}>
        <img src={logo} alt="CryptoPWA Logo" className={styles.logo} />
        <h1 className={styles.titulo}>CryptoPWA</h1>
      </div>
    </header>
  )
}

export default Header
