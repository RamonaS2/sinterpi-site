import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}><Link to="/">Início</Link></li>
        <li className={styles.navItem}><Link to="/sobre">Sobre</Link></li>
        <li className={styles.navItem}><Link to="/contato">Contato</Link></li>
        <li className={styles.navItem}><Link to="/cadastro">Cadastro</Link></li>
      </ul>
    </nav>
  );
}

export default Header;
