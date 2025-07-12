import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      © {new Date().getFullYear()} AnaSposito — Licencia MIT
    </footer>
  )
}

export default Footer
