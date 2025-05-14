// src/components/Header.jsx
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>SINTERPI</div>
      <nav className={styles.navLinks}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/sobre" className={styles.link}>Sobre</Link>
        <Link to="/contato" className={styles.link}>Contato</Link>
        <Link to="/cadastro" className={styles.link}>Cadastro</Link>
      </nav>
    </header>
  );
}

export default Header;
